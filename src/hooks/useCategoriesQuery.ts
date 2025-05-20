import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { TPost } from "src/types"

export const useCategoriesQuery = () => {
  const { data } = useQuery<TPost[]>({
    queryKey: queryKey.posts(),
    initialData: [],
    enabled: false,
  })

  if (!data) return {}

  const categories: Record<string, number> = {}
  
  data.forEach((post) => {
    if (post.category && post.category.length > 0) {
      post.category.forEach((category) => {
        categories[category] = (categories[category] || 0) + 1
      })
    }
  })

  return categories
}
