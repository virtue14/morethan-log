import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { queryKey } from "src/constants/queryKey"
import { PostDetail } from "src/types"
import { useMemo } from "react"

const getSlugFromPath = (asPath: string): string | undefined => {
  const path = asPath.split("?")[0]?.replace(/^\/+/, "")
  return path || undefined
}

const usePostQuery = (initialSlug?: string) => {
  const router = useRouter()
  const slug = useMemo(() => {
    if (initialSlug) return initialSlug
    if (typeof router.query.slug === "string") return router.query.slug
    if (Array.isArray(router.query.slug)) return router.query.slug[0]
    return getSlugFromPath(router.asPath)
  }, [initialSlug, router.query.slug, router.asPath])

  const { data } = useQuery<PostDetail>({
    queryKey: queryKey.post(slug ?? ""),
    enabled: Boolean(slug),
  })

  return data
}

export default usePostQuery
