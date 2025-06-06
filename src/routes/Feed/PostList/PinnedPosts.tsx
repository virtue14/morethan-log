import PostCard from "src/routes/Feed/PostList/PostCard"
import React, { useMemo } from "react"
import usePostsQuery from "src/hooks/usePostsQuery"
import styled from "@emotion/styled"
import { filterPosts } from "./filterPosts"
import { DEFAULT_CATEGORY } from "src/constants"

type Props = {
  q: string
  view: 'list' | 'grid'
}

const PinnedPosts: React.FC<Props> = ({ q, view }) => {
  const data = usePostsQuery()

  const filteredPosts = useMemo(() => {
    const baseFiltered = filterPosts({
      posts: data,
      q,
      category: DEFAULT_CATEGORY,
      order: "desc",
    })
    return baseFiltered.filter((post) => post.tags?.includes("Pinned"))
  }, [data, q])

  if (filteredPosts.length === 0) return null

  return (
    <StyledWrapper view={view}>
      <div className="wrapper">
        <div className="header">📌 Pinned Posts</div>
      </div>
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} data={post} view={view} />
        ))}
      </div>
    </StyledWrapper>
  )
}

export default PinnedPosts

const StyledWrapper = styled.div<{ view: 'list' | 'grid' }>`
  position: relative;
  
  .wrapper {
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
  }
  
  .header {
    display: flex;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    gap: 0.25rem;
    align-items: center;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 700;
    cursor: pointer;
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
`