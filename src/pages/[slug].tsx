import dynamic from "next/dynamic"
import { filterPosts } from "src/libs/utils/notion"
import { CONFIG } from "site.config"
import { NextPageWithLayout } from "../types"
import CustomError from "src/routes/Error"
import { getPosts } from "src/apis"
import MetaConfig from "src/components/MetaConfig"
import { GetStaticProps } from "next"
import { createQueryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { dehydrate } from "@tanstack/react-query"
import usePostQuery from "src/hooks/usePostQuery"
import { FilterPostsOptions } from "src/libs/utils/notion/filterPosts"

const Detail = dynamic(() => import("src/routes/Detail"), {
  ssr: false,
})

const filter: FilterPostsOptions = {
  acceptStatus: ["Public", "PublicOnDetail"],
  acceptType: ["Paper", "Post", "Page"],
}

export const getStaticPaths = async () => {
  const posts = await getPosts()
  const filteredPost = filterPosts(posts, filter)

  return {
    paths: filteredPost.map((row) => `/${row.slug}`),
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = createQueryClient()
  const slug = context.params?.slug

  const posts = await getPosts()

  const detailPosts = filterPosts(posts, filter)
  const postDetail = detailPosts.find((t: any) => t.slug === slug)

  if (!postDetail || !postDetail.id) {
    return {
      notFound: true
    }
  }

  await queryClient.prefetchQuery(queryKey.post(postDetail.slug), () => postDetail)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      slug: postDetail.slug,
    },
    revalidate: CONFIG.revalidateTime,
  }
}

type DetailPageProps = {
  slug: string
}

const DetailPage: NextPageWithLayout<DetailPageProps> = ({ slug }) => {
  const post = usePostQuery(slug)

  if (!post) return <CustomError />

  const image =
    post.thumbnail ??
    CONFIG.ogImageGenerateURL ??
    `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(post.title)}.png`

  const date = post.date?.start_date || post.createdTime || ""

  const meta = {
    title: post.title,
    date: new Date(date).toISOString(),
    image: image,
    description: post.summary || "",
    type: post.type?.[0] || "Post",
    url: `${CONFIG.link}/${post.slug}`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <Detail data={post} />
    </>
  )
}

DetailPage.getLayout = (page) => {
  return <>{page}</>
}

export default DetailPage
