import { NotionAPI } from "notion-client"

const MAX_RETRIES = 3

const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  retries = MAX_RETRIES
): Promise<T> => {
  try {
    return await fn()
  } catch (error) {
    if (retries === 0) {
      throw error
    }
    await new Promise(resolve => setTimeout(resolve, Math.pow(2, MAX_RETRIES - retries) * 1000))
    return retryWithBackoff(fn, retries - 1)
  }
}

export const getRecordMap = async (pageId: string) => {
  const api = new NotionAPI()
  return retryWithBackoff(() => api.getPage(pageId))
}
