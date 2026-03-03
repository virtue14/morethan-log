import type { NextApiRequest, NextApiResponse } from "next"
import { getRecordMap } from "src/apis"

type ErrorResponse = {
  message: string
}

type SuccessResponse = {
  recordMap: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  const pageId = typeof req.query.pageId === "string" ? req.query.pageId : undefined
  if (!pageId) {
    return res.status(400).json({ message: "pageId is required" })
  }

  const recordMap = await getRecordMap(pageId)
  if (!recordMap) {
    return res.status(404).json({ message: "recordMap not found" })
  }

  res.setHeader(
    "Cache-Control",
    "public, max-age=600, s-maxage=21600, stale-while-revalidate=60"
  )
  return res.status(200).json({ recordMap })
}
