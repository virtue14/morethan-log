import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from "@emotion/styled"
import { TechIcon, hasIcon } from "src/constants/icons"

type Props = {
  tags: string[]
  size?: 'small' | 'large'
}

const TechStack: React.FC<Props> = ({ tags, size = 'large' }) => {
  const normalizedTags = useMemo(
    () =>
      tags
        .map((tag) => tag?.trim())
        .filter((tag): tag is string => Boolean(tag))
        .filter((tag) => hasIcon(tag)),
    [tags]
  )
  const [visibleCount, setVisibleCount] = useState(normalizedTags.length)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateVisibleIcons = () => {
      if (!containerRef.current) return
      
      const container = containerRef.current
      const containerWidth = container.offsetWidth
      const iconWidth = size === 'small' ? 28 : 44 // icon size + gap
      const possibleCount = Math.floor(containerWidth / iconWidth)
      
      setVisibleCount(Math.min(possibleCount, normalizedTags.length))
    }

    calculateVisibleIcons()
    window.addEventListener('resize', calculateVisibleIcons)
    
    return () => {
      window.removeEventListener('resize', calculateVisibleIcons)
    }
  }, [normalizedTags.length, size])

  const displayTags = normalizedTags.slice(0, visibleCount)
  const remainingCount = normalizedTags.length - visibleCount

  return (
    <StyledWrapper size={size}>
      <div className="tech-container" ref={containerRef}>
        {displayTags.map((tag, idx) => {
          return (
            <div key={idx} className="icon-group">
              <div className="icon-wrapper">
                <TechIcon name={tag} />
              </div>
            </div>
          )
        })}
        {remainingCount > 0 && (
          <div className="remaining-count">+{remainingCount}개</div>
        )}
      </div>
    </StyledWrapper>
  )
}

export default TechStack

const StyledWrapper = styled.div<{ size: 'small' | 'large' }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  .tech-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    gap: ${({ size }) => size === 'small' ? '0.5rem' : '0.75rem'};
    width: 100%;
    overflow: hidden;
  }

  .icon-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    overflow: hidden;
    
    svg,
    img {
      width: ${({ size }) => size === 'small' ? '20px' : '36px'};
      height: ${({ size }) => size === 'small' ? '20px' : '36px'};
      object-fit: contain;
    }
  }

  .remaining-count {
    flex-shrink: 0;
    font-size: ${({ size }) => size === 'small' ? '0.75rem' : '0.875rem'};
    color: ${({ theme }) => theme.colors.gray11};
    display: flex;
    align-items: center;
    height: ${({ size }) => size === 'small' ? '20px' : '36px'};
    padding-left: ${({ size }) => size === 'small' ? '0.5rem' : '0.75rem'};
  }
` 
