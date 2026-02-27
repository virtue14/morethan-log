import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { NotionRendererRecordMap } from "src/types"

type RecordMapResponse = {
  recordMap: NotionRendererRecordMap
}

const fetchRecordMap = async (pageId: string): Promise<NotionRendererRecordMap> => {
  const response = await fetch(`/api/record-map?pageId=${encodeURIComponent(pageId)}`)
  if (!response.ok) {
    throw new Error(`Failed to load recordMap: ${response.status}`)
  }

  const payload = (await response.json()) as RecordMapResponse
  return payload.recordMap
}

const useRecordMapQuery = (pageId?: string, initialRecordMap?: NotionRendererRecordMap) => {
  const { data } = useQuery<NotionRendererRecordMap>({
    queryKey: queryKey.recordMap(pageId ?? ""),
    queryFn: () => fetchRecordMap(pageId ?? ""),
    enabled: Boolean(pageId) && !initialRecordMap,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  })

  return initialRecordMap ?? data
}

export default useRecordMapQuery
