import { useRouter } from "next/router"
import React, { useEffect, useMemo, useRef } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"
import styled from "@emotion/styled"
import Pagination from "../Pagination"
import { filterPosts } from "./filterPosts"
import useHydrated from "src/hooks/useHydrated"

type Props = {
  q: string
  view: 'list' | 'grid'
}

const POSTS_PER_PAGE = 4

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

const parseOrder = (value: string | string[] | undefined): "asc" | "desc" => {
  if (typeof value !== "string") {
    return "desc"
  }

  const normalized = value.toLowerCase()
  return normalized === "asc" || normalized === "acc" ? "asc" : "desc"
}

const PostList: React.FC<Props> = ({ q, view }) => {
  const router = useRouter()
  const hydrated = useHydrated()
  const isQueryReady = hydrated && router.isReady
  const data = usePostsQuery()
  const previousFilterSignatureRef = useRef<string>()
  const query = isQueryReady ? router.query : {}

  const currentTag =
    typeof query.tag === "string" ? query.tag : undefined
  const currentCategory =
    typeof query.category === "string"
      ? query.category
      : DEFAULT_CATEGORY
  const currentOrder = parseOrder(query.order)

  const filteredPosts = useMemo(() => {
    return filterPosts({
      posts: data,
      q,
      tag: currentTag,
      category: currentCategory,
      order: currentOrder,
    })
  }, [q, currentTag, currentCategory, currentOrder, data])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const queryPage = parsePage(isQueryReady ? router.query.page : undefined)
  const currentPage = totalPages > 0 ? Math.min(queryPage, totalPages) : 1
  const filterSignature = JSON.stringify({
    q,
    tag: currentTag ?? "",
    category: currentCategory ?? "",
    order: currentOrder,
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
    if (!isQueryReady) {
      return
    }

    if (queryPage !== currentPage) {
      syncPageToQuery(currentPage)
    }
  }, [isQueryReady, queryPage, currentPage])

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
      syncPageToQuery(1)
    }
  }, [isQueryReady, filterSignature])

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)
  }, [filteredPosts, currentPage])

  const handlePageChange = (page: number) => {
    const maxPage = Math.max(totalPages, 1)
    const nextPage = Math.min(Math.max(page, 1), maxPage)
    syncPageToQuery(nextPage)
  }

  return (
    <StyledWrapper view={view}>
      <div className="posts-container">
        {!filteredPosts.length && (
          <p className="text-gray-500 dark:text-gray-300">Nothing! 😺</p>
        )}
        {paginatedPosts.map((post) => (
          <PostCard key={post.id} data={post} view={view} />
        ))}
      </div>
      {filteredPosts.length > POSTS_PER_PAGE && (
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
`
