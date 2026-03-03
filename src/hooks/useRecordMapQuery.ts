import { QueryClient, useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { NotionRendererRecordMap } from "src/types"

type RecordMapResponse = {
  recordMap: NotionRendererRecordMap
}

export const fetchRecordMap = async (
  pageId: string
): Promise<NotionRendererRecordMap> => {
  const response = await fetch(`/api/record-map?pageId=${encodeURIComponent(pageId)}`)
  if (!response.ok) {
    throw new Error(`Failed to load recordMap: ${response.status}`)
  }

  const payload = (await response.json()) as RecordMapResponse
  return payload.recordMap
}

export const getRecordMapQueryOptions = (pageId: string) => ({
  queryKey: queryKey.recordMap(pageId),
  queryFn: () => fetchRecordMap(pageId),
  staleTime: 1000 * 60 * 30,
  cacheTime: 1000 * 60 * 60,
  retry: 1,
})

export const prefetchRecordMap = (queryClient: QueryClient, pageId: string) => {
  if (!pageId) {
    return Promise.resolve(undefined)
  }
  return queryClient.prefetchQuery(getRecordMapQueryOptions(pageId))
}

const useRecordMapQuery = (pageId?: string, initialRecordMap?: NotionRendererRecordMap) => {
  const query = useQuery<NotionRendererRecordMap>({
    ...getRecordMapQueryOptions(pageId ?? ""),
    enabled: Boolean(pageId) && !initialRecordMap,
  })

  return {
    recordMap: initialRecordMap ?? query.data,
    isLoading: !initialRecordMap && query.isLoading,
    isError: !initialRecordMap && query.isError,
    retry: query.refetch,
  }
}

export default useRecordMapQuery
