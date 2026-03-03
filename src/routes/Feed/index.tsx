import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import SearchInput from "./SearchInput"
import FeedHeader from "./FeedHeader/index"
import Footer from "./Footer"
import styled from "@emotion/styled"
import MobileProfileCard from "./MobileProfileCard"
import ProfileCard from "./ProfileCard"
import ServiceCard from "./ServiceCard"
import ContactCard from "./ContactCard"
import PostList from "./PostList"
import PinnedPosts from "./PostList/PinnedPosts"
import CategoryList from "./CategoryList"
import useHydrated from "src/hooks/useHydrated"
import useDebouncedValue from "src/hooks/useDebouncedValue"
import ActiveFilters from "./ActiveFilters"

const HEADER_HEIGHT = 73
const FEED_VIEW_STORAGE_KEY = "feed:view"

type Props = {}

const getViewFromStorage = (value: string | null): "list" | "grid" => {
  return value === "list" ? "list" : "grid"
}

const Feed: React.FC<Props> = () => {
  const router = useRouter()
  const hydrated = useHydrated()
  const [q, setQ] = useState("")
  const debouncedQuery = useDebouncedValue(q, 250)
  const [filteredCount, setFilteredCount] = useState(0)
  const [view, setView] = useState<"list" | "grid">("grid")

  useEffect(() => {
    if (!hydrated) {
      return
    }

    const storedView = window.localStorage.getItem(FEED_VIEW_STORAGE_KEY)
    setView(getViewFromStorage(storedView))
  }, [hydrated])

  useEffect(() => {
    if (!hydrated || !router.isReady) {
      return
    }

    if (typeof router.query.view !== "string") {
      return
    }

    const nextQuery = { ...router.query }
    delete nextQuery.view

    void router.replace(
      {
        pathname: router.pathname,
        query: nextQuery,
      },
      undefined,
      { shallow: true, scroll: false }
    )
  }, [hydrated, router.isReady, router.pathname, router.query])

  const handleViewChange = (newView: 'list' | 'grid') => {
    setView(newView)
    if (hydrated) {
      window.localStorage.setItem(FEED_VIEW_STORAGE_KEY, newView)
    }
  }

  return (
    <StyledWrapper>
      <div
        className="lt"
        css={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <CategoryList />
      </div>
      <div className="mid">
        <MobileProfileCard />
        <PinnedPosts q={debouncedQuery} view={view} />
        <SearchInput
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onClear={() => setQ("")}
          resultCount={filteredCount}
        />
        <ActiveFilters q={q} onClearSearch={() => setQ("")} />
        <div className="tags">
          <CategoryList />
        </div>
        <div>
          <FeedHeader view={view} onViewChange={handleViewChange} />
        </div>
        <hr className="divider" />
        <PostList
          q={debouncedQuery}
          view={view}
          onFilteredCountChange={setFilteredCount}
          onResetSearch={() => setQ("")}
        />
        <div className="footer">
          <Footer />
        </div>
      </div>
      <div
        className="rt"
        css={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <ProfileCard />
        <ServiceCard />
        <ContactCard />
        <div className="footer">
          <Footer />
        </div>
      </div>
    </StyledWrapper>
  )
}

export default Feed

const StyledWrapper = styled.div`
  grid-template-columns: repeat(12, minmax(0, 1fr));

  padding: 2rem 0;
  display: grid;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: block;
    padding: 0.5rem 0;
  }

  > .lt {
    display: none;
    overflow: scroll;
    position: sticky;
    grid-column: span 2 / span 2;
    top: ${HEADER_HEIGHT - 10}px;

    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: 1024px) {
      display: block;
    }
  }

  > .mid {
    grid-column: span 12 / span 12;

    @media (min-width: 1024px) {
      grid-column: span 7 / span 7;
    }

    > .tags {
      display: block;

      @media (min-width: 1024px) {
        display: none;
      }
    }

    > .divider {
      margin: 0 0.5rem 2rem;
      border: none;
      border-top: 1px solid ${({ theme }) => theme.colors.gray6};
    }

    > .footer {
      padding-bottom: 2rem;
      @media (min-width: 1024px) {
        display: none;
      }
    }
  }

  > .rt {
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    display: none;
    overflow: scroll;
    position: sticky;
    top: ${HEADER_HEIGHT - 10}px;

    @media (min-width: 1024px) {
      display: block;
      grid-column: span 3 / span 3;
    }

    .footer {
      padding-top: 1rem;
    }
  }
`
