import { DEFAULT_CATEGORY } from "src/constants"
import { TPost } from "src/types"

interface FilterPostsParams {
  posts: TPost[]
  q: string
  tag?: string
  category?: string
  order?: string
}

export function filterPosts({
                              posts,
                              q,
                              tag = undefined,
                              category = DEFAULT_CATEGORY,
                              order = "desc",
                            }: FilterPostsParams): TPost[] {
  return posts
    .filter((post) => {
      const tagContent = post.tags ? post.tags.join(" ") : ""
      const searchContent = post.title + (post.summary || "") + tagContent
      return (
        searchContent.toLowerCase().includes(q.toLowerCase()) &&
        (!tag || (post.tags && post.tags.includes(tag))) &&
        (category === DEFAULT_CATEGORY ||
          (post.category && post.category.includes(category)))
      )
    })
    .sort((a, b) => {
      const getValidDate = (dateStr?: string) => {
        if (!dateStr || dateStr.trim() === "") return Number.MAX_SAFE_INTEGER
        const timestamp = new Date(dateStr).getTime()
        return isNaN(timestamp) ? Number.MAX_SAFE_INTEGER : timestamp
      }

      const dateA = getValidDate(a.date?.end_date) || getValidDate(a.date?.start_date)
      const dateB = getValidDate(b.date?.end_date) || getValidDate(b.date?.start_date)

      return order === "desc" ? dateB - dateA : dateA - dateB
    })
}
