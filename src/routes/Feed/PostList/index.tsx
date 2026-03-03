import { useRouter } from "next/router"
import React, { useEffect, useMemo, useRef, useState } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"
import styled from "@emotion/styled"
import Pagination from "../Pagination"
import { filterPosts } from "./filterPosts"
import useHydrated from "src/hooks/useHydrated"
import { useQueryClient } from "@tanstack/react-query"
import { prefetchRecordMap } from "src/hooks/useRecordMapQuery"

type Props = {
  q: string
  view: 'list' | 'grid'
  order: "asc" | "desc"
  onFilteredCountChange?: (count: number) => void
  onResetSearch?: () => void
  onResetOrder?: () => void
}

const POSTS_PER_PAGE = 4
const FEED_SCROLL_RESTORE_KEY = "feed:scroll-restore"
type ScrollRestorePayload = {
  path: string
  y: number
  visibleCount?: number
}

const parsePage = (value: string | string[] | undefined): number => {
  if (typeof value !== "string") {
    return 1
  }

  const page = Number.parseInt(value, 10)
  if (!Number.isFinite(page) || page < 1) {
    return 1
  }

  return page
}

const PostList: React.FC<Props> = ({
  q,
  view,
  order,
  onFilteredCountChange,
  onResetSearch,
  onResetOrder,
}) => {
  const router = useRouter()
  const hydrated = useHydrated()
  const isQueryReady = hydrated && router.isReady
  const data = usePostsQuery()
  const queryClient = useQueryClient()
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)
  const infiniteTriggerRef = useRef<HTMLDivElement>(null)
  const restoreLoadedRef = useRef(false)
  const [restorePayload, setRestorePayload] = useState<ScrollRestorePayload | null>(null)
  const previousFilterSignatureRef = useRef<string>()
  const query = isQueryReady ? router.query : {}

  const currentTag =
    typeof query.tag === "string" ? query.tag : undefined
  const currentCategory =
    typeof query.category === "string"
      ? query.category
      : DEFAULT_CATEGORY

  const filteredPosts = useMemo(() => {
    return filterPosts({
      posts: data,
      q,
      tag: currentTag,
      category: currentCategory,
      order,
    })
  }, [q, currentTag, currentCategory, order, data])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const hasActiveFilters =
    q.trim().length > 0 ||
    Boolean(currentTag) ||
    currentCategory !== DEFAULT_CATEGORY ||
    order !== "desc"
  const showDataError = data.length === 0 && !hasActiveFilters
  const queryPage = parsePage(isQueryReady ? router.query.page : undefined)
  const currentPage = totalPages > 0 ? Math.min(queryPage, totalPages) : 1
  const filterSignature = JSON.stringify({
    q,
    tag: currentTag ?? "",
    category: currentCategory ?? "",
    order,
  })

  const syncPageToQuery = (nextPage: number) => {
    if (!isQueryReady) {
      return
    }

    const normalizedNextPage = Math.max(1, nextPage)
    const normalizedCurrentPage = parsePage(router.query.page)
    if (normalizedNextPage === normalizedCurrentPage) {
      return
    }

    const nextQuery = { ...router.query }
    if (normalizedNextPage === 1) {
      delete nextQuery.page
    } else {
      nextQuery.page = String(normalizedNextPage)
    }

    void router.replace(
      {
        pathname: router.pathname,
        query: nextQuery,
      },
      undefined,
      { shallow: true, scroll: false }
    )
  }

  useEffect(() => {
    onFilteredCountChange?.(filteredPosts.length)
  }, [filteredPosts.length, onFilteredCountChange])

  useEffect(() => {
    if (!hydrated) {
      return
    }

    const mediaQuery = window.matchMedia("(max-width: 768px)")
    const updateViewport = () => {
      setIsMobileViewport(mediaQuery.matches)
    }

    updateViewport()

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateViewport)
      return () => {
        mediaQuery.removeEventListener("change", updateViewport)
      }
    }

    mediaQuery.addListener(updateViewport)
    return () => {
      mediaQuery.removeListener(updateViewport)
    }
  }, [hydrated])

  useEffect(() => {
    if (!isQueryReady) {
      return
    }
    if (isMobileViewport) {
      return
    }
    if (totalPages === 0) {
      return
    }

    if (queryPage !== currentPage) {
      syncPageToQuery(currentPage)
    }
  }, [isQueryReady, queryPage, currentPage, isMobileViewport, totalPages])

  useEffect(() => {
    if (!isQueryReady || restoreLoadedRef.current) {
      return
    }

    const raw = window.sessionStorage.getItem(FEED_SCROLL_RESTORE_KEY)
    restoreLoadedRef.current = true
    if (!raw) {
      return
    }

    window.sessionStorage.removeItem(FEED_SCROLL_RESTORE_KEY)

    try {
      const parsed = JSON.parse(raw) as ScrollRestorePayload
      const currentPath = `${window.location.pathname}${window.location.search}`
      if (parsed.path !== currentPath) {
        return
      }

      const y = Number(parsed.y)
      if (!Number.isFinite(y) || y < 0) {
        return
      }

      setRestorePayload({
        path: parsed.path,
        y,
        visibleCount:
          typeof parsed.visibleCount === "number"
            ? Math.max(parsed.visibleCount, POSTS_PER_PAGE)
            : undefined,
      })
    } catch {
      // ignore broken session payload
    }
  }, [isQueryReady])

  useEffect(() => {
    if (!restorePayload) {
      return
    }
    if (filteredPosts.length === 0) {
      return
    }

    if (isMobileViewport && typeof restorePayload.visibleCount === "number") {
      const targetVisibleCount = Math.min(restorePayload.visibleCount, filteredPosts.length)
      if (visibleCount < targetVisibleCount) {
        setVisibleCount(targetVisibleCount)
        return
      }
    }

    // Wait until cards are painted before restoring position.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: restorePayload.y, behavior: "auto" })
      })
    })
    setRestorePayload(null)
  }, [restorePayload, filteredPosts.length, isMobileViewport, visibleCount])

  useEffect(() => {
    if (!isQueryReady) {
      return
    }

    const previousFilterSignature = previousFilterSignatureRef.current
    if (previousFilterSignature === undefined) {
      previousFilterSignatureRef.current = filterSignature
      return
    }

    if (previousFilterSignature !== filterSignature) {
      previousFilterSignatureRef.current = filterSignature
      if (isMobileViewport) {
        setVisibleCount(POSTS_PER_PAGE)
        return
      }
      syncPageToQuery(1)
    }
  }, [isQueryReady, filterSignature, isMobileViewport])

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)
  }, [filteredPosts, currentPage])
  const visibleMobilePosts = useMemo(
    () => filteredPosts.slice(0, visibleCount),
    [filteredPosts, visibleCount]
  )
  const hasMoreMobilePosts =
    isMobileViewport && visibleMobilePosts.length < filteredPosts.length
  const postsToRender = isMobileViewport ? visibleMobilePosts : paginatedPosts

  useEffect(() => {
    // Prefetch the first cards' recordMap to reduce detail first-view latency.
    const sourcePosts = isMobileViewport ? visibleMobilePosts : paginatedPosts
    const prefetchTargets = sourcePosts
      .slice(0, 2)
      .map((post) => post.id)
      .filter((id): id is string => Boolean(id))

    prefetchTargets.forEach((pageId) => {
      void prefetchRecordMap(queryClient, pageId)
    })
  }, [paginatedPosts, queryClient, isMobileViewport, visibleMobilePosts])

  const handlePageChange = (page: number) => {
    const maxPage = Math.max(totalPages, 1)
    const nextPage = Math.min(Math.max(page, 1), maxPage)
    syncPageToQuery(nextPage)
  }

  const loadMoreMobilePosts = () => {
    setVisibleCount((previous) =>
      Math.min(previous + POSTS_PER_PAGE, filteredPosts.length)
    )
  }

  useEffect(() => {
    if (!isMobileViewport || !hasMoreMobilePosts || !infiniteTriggerRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting) {
          loadMoreMobilePosts()
        }
      },
      {
        root: null,
        rootMargin: "200px 0px",
        threshold: 0.1,
      }
    )

    observer.observe(infiniteTriggerRef.current)
    return () => {
      observer.disconnect()
    }
  }, [isMobileViewport, hasMoreMobilePosts, filteredPosts.length])

  const handleResetFilters = () => {
    onResetSearch?.()

    if (!isQueryReady) {
      return
    }

    const nextQuery = { ...router.query }
    delete nextQuery.tag
    delete nextQuery.category
    delete nextQuery.page

    void router.replace(
      {
        pathname: router.pathname,
        query: nextQuery,
      },
      undefined,
      { shallow: true, scroll: false }
    )

    onResetOrder?.()
  }

  const handleRetryLoad = () => {
    router.reload()
  }

  return (
    <StyledWrapper view={view}>
      <div className="posts-container">
        {showDataError && (
          <div className="error-state" role="alert">
            <p className="message">글 데이터를 불러오지 못했습니다.</p>
            <button type="button" className="retry-btn" onClick={handleRetryLoad}>
              다시 시도
            </button>
          </div>
        )}
        {!showDataError && !filteredPosts.length && (
          <div className="empty-state" role="status" aria-live="polite">
            <p className="message">조건에 맞는 글이 없어요</p>
            <button type="button" className="reset-btn" onClick={handleResetFilters}>
              필터 초기화
            </button>
          </div>
        )}
        {postsToRender.map((post) => (
          <PostCard
            key={post.id}
            data={post}
            view={view}
            visibleCountSnapshot={isMobileViewport ? visibleMobilePosts.length : undefined}
          />
        ))}
        {isMobileViewport && hasMoreMobilePosts && (
          <div
            ref={infiniteTriggerRef}
            className="infinite-trigger"
            aria-live="polite"
          >
            콘텐츠를 불러오는 중...
          </div>
        )}
      </div>
      {!isMobileViewport && filteredPosts.length > POSTS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </StyledWrapper>
  )
}

export default PostList

const StyledWrapper = styled.div<{ view: 'list' | 'grid' }>`
  .error-state,
  .empty-state {
    padding: 2rem 1.25rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 1rem;
    background: ${({ theme }) => theme.colors.gray3};
    text-align: center;
    margin-bottom: 1.25rem;

    .message {
      margin: 0 0 0.75rem;
      color: ${({ theme }) => theme.colors.gray11};
      font-size: 0.9375rem;
    }

    .reset-btn,
    .retry-btn {
      border: none;
      border-radius: 0.625rem;
      min-height: 44px;
      padding: 0 0.875rem;
      background: ${({ theme }) => theme.colors.gray5};
      color: ${({ theme }) => theme.colors.gray12};
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background: ${({ theme }) => theme.colors.gray6};
      }
    }
  }

  .error-state {
    .retry-btn {
      background: ${({ theme }) => theme.colors.gray6};
    }
  }

  .posts-container {
    display: ${({ view }) => view === 'grid' ? 'grid' : 'block'};
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    max-width: 100%;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  .infinite-trigger {
    margin-top: 0.75rem;
    min-height: 2.5rem;
    border-radius: 0.75rem;
    border: 1px dashed ${({ theme }) => theme.colors.gray6};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.gray10};
    font-size: 0.8125rem;
  }
`
