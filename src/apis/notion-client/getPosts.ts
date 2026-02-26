import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"
import { BlockMap, CollectionPropertySchemaMap } from "notion-types"

import { mapWithConcurrency } from "src/libs/utils/mapWithConcurrency"
import getAllPageIds from "src/libs/utils/notion/getAllPageIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { retryWithBackoff } from "src/libs/utils/retryWithBackoff"
import { TPosts } from "src/types"

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */

// TODO: react query를 사용해서 처음 불러온 뒤로는 해당데이터만 사용하도록 수정
export const getPosts = async () => {
  const notionPageId = CONFIG.notionConfig.pageId as string | undefined
  if (!notionPageId) {
    return []
  }

  const api = new NotionAPI()
  try {
    const response = await retryWithBackoff(() => api.getPage(notionPageId))
    const rootPageId = idToUuid(notionPageId)
    const collectionValue = Object.values(response.collection || {})[0]
      ?.value as any
    const collection = collectionValue?.value ?? collectionValue
    const block = response.block as BlockMap
    const schema = collection?.schema as CollectionPropertySchemaMap | undefined

    const blockValue =
      (block[rootPageId]?.value as any)?.value ?? block[rootPageId]?.value
    const rawMetadata = blockValue

    // Check Type
    if (
      rawMetadata?.type !== "collection_view_page" &&
      rawMetadata?.type !== "collection_view"
    ) {
      return []
    }

    if (!schema) {
      return []
    }

    const pageIds = getAllPageIds(response)
    const userCache = new Map()

    const pageProperties = await mapWithConcurrency(
      pageIds,
      6,
      async (pageId) => {
        const pageBlockEntry = block?.[pageId]?.value as any
        const pageBlockValue = pageBlockEntry?.value ?? pageBlockEntry
        if (!pageBlockValue) {
          return null
        }

        const properties = await retryWithBackoff(async () => {
          const props = await getPageProperties(pageId, block, schema, {
            api,
            userCache,
          })
          return props || null
        })

        if (!properties) {
          return null
        }

        properties.createdTime = new Date(pageBlockValue?.created_time).toString()
        properties.fullWidth =
          (pageBlockValue?.format as any)?.page_full_width ?? false
        return properties
      }
    )

    const data = pageProperties.filter(
      (item): item is NonNullable<typeof item> => Boolean(item)
    )

    // Sort by date
    data.sort((a: any, b: any) => {
      const dateA: any = new Date(a?.date?.start_date || a.createdTime)
      const dateB: any = new Date(b?.date?.start_date || b.createdTime)
      return dateB - dateA
    })

    const posts = data as TPosts
    return posts
  } catch (error) {
    const errorCode =
      typeof (error as { code?: unknown })?.code === "string"
        ? (error as { code: string }).code
        : undefined
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.warn("getPosts warning: fallback to empty posts", {
      code: errorCode,
      message: errorMessage,
    })
    return []
  }
}
