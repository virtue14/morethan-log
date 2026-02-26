import { NotionAPI } from "notion-client"
import { retryWithBackoff } from "src/libs/utils/retryWithBackoff"

export const getRecordMap = async (pageId: string) => {
  const api = new NotionAPI()
  try {
    return await retryWithBackoff(() => api.getPage(pageId))
  } catch (error) {
    const errorCode =
      typeof (error as { code?: unknown })?.code === "string"
        ? (error as { code: string }).code
        : undefined
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.warn("getRecordMap warning: fallback to null recordMap", {
      code: errorCode,
      message: errorMessage,
    })
    return null
  }
}
