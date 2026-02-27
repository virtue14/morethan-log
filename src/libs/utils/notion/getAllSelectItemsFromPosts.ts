import { TPosts } from "src/types"

export function getAllSelectItemsFromPosts(
  key: "tags" | "category",
  posts: TPosts
) {
  const selectedPosts = posts.filter((post) => post?.[key])
  const items = [
    ...selectedPosts
      .map((p) => p[key])
      .flat()
      .map((item) => item?.trim())
      .filter((item): item is string => Boolean(item)),
  ]
  const itemObj: { [itemName: string]: number } = {}
  items.forEach((item) => {
    if (item in itemObj) {
      itemObj[item]++
    } else {
      itemObj[item] = 1
    }
  })
  return itemObj
}
