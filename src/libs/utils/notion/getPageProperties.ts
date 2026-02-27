import { NotionAPI } from "notion-client"
import { getDateValue, getTextContent } from "notion-utils"
import { BlockMap, CollectionPropertySchemaMap } from "notion-types"

import { retryWithBackoff } from "src/libs/utils/retryWithBackoff"
import { customMapImageUrl } from "./customMapImageUrl"

type NotionUser = {
  id: string
  name?: string
  profile_photo?: string | null
}

type UserCache = Map<string, NotionUser | null>

type GetPagePropertiesOptions = {
  api?: NotionAPI
  userCache?: UserCache
}

const parseSelectValues = (raw: string): string[] =>
  raw
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value.length > 0)

const getCachedUser = async (
  api: NotionAPI,
  userCache: UserCache,
  userReference: any,
  userId: string
): Promise<NotionUser | null> => {
  if (userCache.has(userId)) {
    return userCache.get(userId) ?? null
  }

  try {
    const res: any = await retryWithBackoff(() => api.getUsers(userReference), {
      retries: 2,
      baseDelayMs: 300,
      maxDelayMs: 1500,
    })
    const resValue = res?.recordMapWithRoles?.notion_user?.[userId]?.value
    if (!resValue) {
      userCache.set(userId, null)
      return null
    }

    const fallbackName = `${resValue?.family_name || ""}${
      resValue?.given_name || ""
    }`.trim()
    const user = {
      id: resValue?.id,
      name: resValue?.name || fallbackName || undefined,
      profile_photo: resValue?.profile_photo || null,
    }

    userCache.set(userId, user)
    return user
  } catch (error) {
    userCache.set(userId, null)
    return null
  }
}

async function getPageProperties(
  id: string,
  block: BlockMap,
  schema: CollectionPropertySchemaMap,
  options: GetPagePropertiesOptions = {}
) {
  const api = options.api ?? new NotionAPI()
  const userCache = options.userCache ?? new Map<string, NotionUser | null>()
  const blockEntry = block?.[id]?.value as any
  const blockValue = blockEntry?.value ?? blockEntry

  if (!blockValue || !schema) {
    return null
  }

  const rawProperties = Object.entries(blockValue?.properties || [])
  const excludeProperties = ["date", "select", "multi_select", "person", "file"]
  const properties: any = { id }

  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val]: any = rawProperties[i]
    const propertySchema = schema[key]

    if (!propertySchema?.type) {
      continue
    }

    if (!excludeProperties.includes(propertySchema.type)) {
      properties[propertySchema.name] = getTextContent(val)
    } else {
      switch (propertySchema.type) {
        case "file": {
          try {
            const Block = blockValue
            const url: string = val[0][1][0][1]
            const newurl = customMapImageUrl(url, Block)
            properties[propertySchema.name] = newurl
          } catch (error) {
            properties[propertySchema.name] = undefined
          }
          break
        }
        case "date": {
          const dateProperty: any = getDateValue(val)
          delete dateProperty.type
          properties[propertySchema.name] = dateProperty
          break
        }
        case "select": {
          const selects = parseSelectValues(getTextContent(val))
          if (selects.length > 0) {
            properties[propertySchema.name] = selects
          }
          break
        }
        case "multi_select": {
          const selects = parseSelectValues(getTextContent(val))
          if (selects.length > 0) {
            properties[propertySchema.name] = selects
          }
          break
        }
        case "person": {
          const rawUsers = Array.isArray(val) ? val.flat() : []
          const users: NotionUser[] = []

          for (let i = 0; i < rawUsers.length; i++) {
            const userReference = rawUsers[i]?.[0]
            const userId = userReference?.[1]
            if (!userId) {
              continue
            }

            const user = await getCachedUser(
              api,
              userCache,
              userReference,
              userId
            )
            if (user) {
              users.push(user)
            }
          }

          properties[propertySchema.name] = users
          break
        }
        default:
          break
      }
    }
  }
  return properties
}

export { getPageProperties as default }
