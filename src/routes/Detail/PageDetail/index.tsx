import React from "react"
import dynamic from "next/dynamic"
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

const PageDetail: React.FC<Props> = ({ data }) => {
  const recordMap = useRecordMapQuery(data.id, data.recordMap)

  return (
    <StyledWrapper>
      {recordMap ? (
        <NotionRenderer recordMap={recordMap} />
      ) : (
        <LoadingMessage>페이지를 불러오는 중입니다...</LoadingMessage>
      )}
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
