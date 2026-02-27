import React from "react"
import dynamic from "next/dynamic"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import { PostDetail as PostDetailType } from "src/types"
import useRecordMapQuery from "src/hooks/useRecordMapQuery"

const NotionRenderer = dynamic(
  () => import("../components/NotionRenderer"),
  {
    ssr: false,
  }
)

type Props = {
  data: PostDetailType
}

const PostDetail: React.FC<Props> = ({ data }) => {
  if (!data?.type) return null

  const category = (data.category && data.category?.[0]) || undefined
  const isPost = data.type[0] === "Post"
  const recordMap = useRecordMapQuery(data.id, data.recordMap)

  return (
    <StyledWrapper>
      <article>
        {category && (
          <div css={{ marginBottom: "0.5rem" }}>
            <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category}
            </Category>
          </div>
        )}
        {isPost && <PostHeader data={data} />}
        <div>
          {recordMap ? (
            <NotionRenderer recordMap={recordMap} />
          ) : (
            <LoadingMessage>본문을 불러오는 중입니다...</LoadingMessage>
          )}
        </div>
        {isPost && (
          <>
            <Footer />
            <CommentBox data={data} />
          </>
        )}
      </article>
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-radius: 1.5rem;
  max-width: 56rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin: 0 auto;
  > article {
    margin: 0 auto;
    max-width: 42rem;
  }
`

const LoadingMessage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray10};
`
