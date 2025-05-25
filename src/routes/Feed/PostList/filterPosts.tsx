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
      const getStartDate = (post: TPost) => {
        const startDate = post.date?.start_date;
        if (!startDate || startDate.trim() === "") return null;
        
        const timestamp = new Date(startDate).getTime();
        return isNaN(timestamp) ? null : timestamp;
      }

      const dateA = getStartDate(a);
      const dateB = getStartDate(b);

      // 한쪽만 날짜가 있는 경우, 날짜 있는 것을 앞으로
      if (dateA !== null && dateB === null) return -1;
      if (dateA === null && dateB !== null) return 1;

      // 둘 다 날짜가 있는 경우
      if (dateA !== null && dateB !== null) {
        // desc: 최신순(큰 날짜가 앞으로), asc: 오래된순(작은 날짜가 앞으로)
        return order === "desc" ? dateB - dateA : dateA - dateB;
      }

      // 둘 다 날짜가 없는 경우
      // desc: 제목 내림차순(Z->A), asc: 제목 오름차순(A->Z)
      return order === "desc" 
        ? b.title.localeCompare(a.title)  // 내림차순
        : a.title.localeCompare(b.title); // 오름차순
    })
}
