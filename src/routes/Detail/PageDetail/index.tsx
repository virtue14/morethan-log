import React from "react"
import dynamic from "next/dynamic"
import styled from "@emotion/styled"
import { PostDetail as PostDetailType } from "src/types"

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
  return (
    <StyledWrapper>
      <NotionRenderer recordMap={data.recordMap} />
    </StyledWrapper>
  )
}

export default PageDetail

const StyledWrapper = styled.div`
  margin: 0 auto;
  max-width: 56rem;
`
