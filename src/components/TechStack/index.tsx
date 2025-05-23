import React, { useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import { ICONS } from "src/constants/icons"

type Props = {
  tags: string[]
  size?: 'small' | 'large'
}

const TechStack: React.FC<Props> = ({ tags, size = 'large' }) => {
  const [visibleCount, setVisibleCount] = useState(tags.length)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateVisibleIcons = () => {
      if (!containerRef.current) return
      
      const container = containerRef.current
      const containerWidth = container.offsetWidth
      const iconWidth = size === 'small' ? 28 : 44 // icon size + gap
      const possibleCount = Math.floor(containerWidth / iconWidth)
      
      setVisibleCount(Math.min(possibleCount, tags.length))
    }

    calculateVisibleIcons()
    window.addEventListener('resize', calculateVisibleIcons)
    
    return () => {
      window.removeEventListener('resize', calculateVisibleIcons)
    }
  }, [tags, size])

  const displayTags = tags.slice(0, visibleCount)
  const remainingCount = tags.length - visibleCount

  return (
    <StyledWrapper size={size}>
      <div className="tech-container" ref={containerRef}>
        {displayTags.map((tag, idx) => {
          const icon = ICONS[tag]
          if (!icon) return null
          
          return (
            <div key={idx} className="icon-group">
              <div className="icon-wrapper">
                {icon}
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