import { NextPage } from "next"
import { AppProps } from "next/app"
import { ExtendedRecordMap } from "notion-types"
import { ReactElement, ReactNode } from "react"

// TODO: refactor types
export type NextPageWithLayout<PageProps = {}> = NextPage<PageProps> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type TPostStatus = "Private" | "Public" | "PublicOnDetail"
export type TPostType = "Post" | "Paper" | "Page"

export type TPost = {
  id: string
  date?: {
    start_date?: string | undefined;
    end_date?: string | undefined;
  } | undefined;
  role?: string;
  personnel?: string;
  type: TPostType[]
  slug: string
  tags?: string[]
  category?: string[]
  summary?: string
  author?: {
    id: string
    name: string
    profile_photo?: string
  }[]
  title: string
  status: TPostStatus[]
  createdTime: string
  fullWidth: boolean
  thumbnail?: string
  github?: string
  swagger?: string
  deploy?: string
  backend?: string[]
  frontend?: string[]
  database?: string[]
  architecture?: string[]
  api?: string[]
  testing?: string[]
  devopsinfra?: string[]
  collaboration?: string[]
}

export type PostDetail = TPost & {
  recordMap: ExtendedRecordMap
}

export type TPosts = TPost[]

export type TTags = {
  [tagName: string]: number
}
export type TCategories = {
  [category: string]: number
}

export type SchemeType = "light" | "dark"
