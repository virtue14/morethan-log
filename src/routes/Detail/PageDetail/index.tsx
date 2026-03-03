import React, { useRef } from "react"
import dynamic from "next/dynamic"
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

const PageDetail: React.FC<Props> = ({ data }) => {
  const notionContentRef = useRef<HTMLDivElement>(null)
  const { recordMap, isError, isLoading, retry } = useRecordMapQuery(
    data.id,
    data.recordMap
  )

  return (
    <StyledWrapper>
      <div ref={notionContentRef}>
        {recordMap ? (
          <NotionRenderer recordMap={recordMap} />
        ) : isError ? (
          <ErrorPanel role="alert">
            <p>페이지를 불러오지 못했습니다.</p>
            <button type="button" onClick={() => void retry()}>
              다시 시도
            </button>
          </ErrorPanel>
        ) : (
          <LoadingMessage>
            {isLoading ? "페이지를 불러오는 중입니다..." : "페이지 데이터를 준비하는 중입니다..."}
          </LoadingMessage>
        )}
      </div>
      <ReadingAssist contentRef={notionContentRef} enabled={Boolean(recordMap)} />
    </StyledWrapper>
  )
}

export default PageDetail

const StyledWrapper = styled.div`
  margin: 0 auto;
  max-width: 56rem;
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
