import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"
import styled from "@emotion/styled"
import Pagination from "../Pagination"
import { filterPosts } from "./filterPosts"

type Props = {
  q: string
  view: 'list' | 'grid'
}

const POSTS_PER_PAGE = 4

const PostList: React.FC<Props> = ({ q, view }) => {
  const router = useRouter()
  const data = usePostsQuery()
  const [filteredPosts, setFilteredPosts] = useState(data)
  const [currentPage, setCurrentPage] = useState(1)

  const currentTag = `${router.query.tag || ``}` || undefined
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY
  const currentOrder = `${router.query.order || ``}` || "desc"

  useEffect(() => {
    setFilteredPosts(() => {
      return filterPosts({
        posts: data,
        q,
        tag: currentTag,
        category: currentCategory,
        order: currentOrder
      })
    })
  }, [q, currentTag, currentCategory, currentOrder, data])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

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
          onPageChange={setCurrentPage}
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
