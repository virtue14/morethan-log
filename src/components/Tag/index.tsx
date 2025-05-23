import React from "react"
import styled from "@emotion/styled"
import { TECH_ICONS } from "src/constants/icons"
import Image from "next/image"

type Props = {
  tags: string[]
  maxDisplay?: number
}

const Tag: React.FC<Props> = ({ tags, maxDisplay = 5 }) => {
  const displayTags = tags.slice(0, maxDisplay)
  const remainingCount = tags.length - maxDisplay

  return (
    <StyledWrapper>
      <div className="icons-container">
        {displayTags.map((tag, idx) => {
          const icon = TECH_ICONS[tag]
          if (!icon) return null
          
          return (
            <div key={idx} className="icon-wrapper">
              <Image
                src={icon.src}
                alt={`${icon.name}-image`}
                width={36}
                height={36}
                loading="lazy"
              />
            </div>
          )
        })}
      </div>
      {remainingCount > 0 && (
        <div className="remaining-count">+{remainingCount}개</div>
      )}
    </StyledWrapper>
  )
}

export default Tag

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icons-container {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .remaining-count {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray11};
  }
` 