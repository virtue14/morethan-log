import React from "react"
import styled from "@emotion/styled"
import { ICONS } from "src/constants/icons"

type Props = {
  children: string
}

const Tag: React.FC<Props> = ({ children }) => {
  const icon = ICONS[children]

  return (
    <StyledWrapper>
      {icon && (
        <div className="icon-wrapper">
          {icon}
        </div>
      )}
      <span className="tag-name">{children}</span>
    </StyledWrapper>
  )
}

export default Tag

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.gray4};
  color: ${({ theme }) => theme.colors.gray11};
  font-size: 0.875rem;

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .tag-name {
    line-height: 1.25rem;
  }
` 