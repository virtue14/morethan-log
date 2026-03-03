import React, { useRef } from "react"
import dynamic from "next/dynamic"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import { PostDetail as PostDetailType } from "src/types"
import useRecordMapQuery from "src/hooks/useRecordMapQuery"
import ReadingAssist from "../components/ReadingAssist"

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

  const notionContentRef = useRef<HTMLDivElement>(null)
  const category = (data.category && data.category?.[0]) || undefined
  const isPost = data.type[0] === "Post"
  const { recordMap, isError, isLoading, retry } = useRecordMapQuery(
    data.id,
    data.recordMap
  )

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
        <div ref={notionContentRef}>
          {recordMap ? (
            <NotionRenderer recordMap={recordMap} />
          ) : isError ? (
            <ErrorPanel role="alert">
              <p>본문을 불러오지 못했습니다.</p>
              <button type="button" onClick={() => void retry()}>
                다시 시도
              </button>
            </ErrorPanel>
          ) : (
            <LoadingMessage>
              {isLoading ? "본문을 불러오는 중입니다..." : "본문 데이터를 준비하는 중입니다..."}
            </LoadingMessage>
          )}
        </div>
        <ReadingAssist contentRef={notionContentRef} enabled={Boolean(recordMap)} />
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

const ErrorPanel = styled.div`
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  background: ${({ theme }) => theme.colors.gray3};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.875rem;
  }

  button {
    border: none;
    border-radius: 0.5rem;
    min-height: 40px;
    padding: 0 0.75rem;
    background: ${({ theme }) => theme.colors.gray5};
    color: ${({ theme }) => theme.colors.gray12};
    font-weight: 600;
    cursor: pointer;
  }
`
