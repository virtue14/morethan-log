import Link from "next/link"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import { TPost } from "../../../types"
import Image from "next/image"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import { useEffect, useRef, useState } from "react"
import { ICONS } from "src/constants/icons"

type Props = {
  data: TPost
  view: 'list' | 'grid'
}

const PostCard: React.FC<Props> = ({ data, view }) => {
  const category = (data.category && data.category?.[0]) || undefined
  const [displayTags, setDisplayTags] = useState<string[]>([])
  const techStackRef = useRef<HTMLDivElement>(null)

  const getFormattedDate = () => {
    const startDate = data?.date?.start_date || null;
    const endDate = data?.date?.end_date || null;

    if (startDate && endDate) {
      return `${formatDate(startDate, CONFIG.lang)} ~ ${formatDate(endDate, CONFIG.lang)}`;
    } else if (startDate) {
      return `${formatDate(startDate, CONFIG.lang)} ~ Present`;
    } else {
      return null;
    }
  };

  useEffect(() => {
    const updateDisplayTags = () => {
      if (!techStackRef.current || !data.tags) return;

      const containerWidth = techStackRef.current.offsetWidth;
      const iconWidth = 44; // 아이콘 크기(36) + 간격(8)
      const maxVisibleTags = Math.floor(containerWidth / iconWidth);
      
      setDisplayTags(data.tags.slice(0, Math.max(1, maxVisibleTags)));
    };

    updateDisplayTags();
    window.addEventListener('resize', updateDisplayTags);
    
    return () => {
      window.removeEventListener('resize', updateDisplayTags);
    };
  }, [data.tags, techStackRef]);

  const formattedDate = getFormattedDate();
  const remainingTagsCount = data.tags ? data.tags.length - displayTags.length : 0;

  return (
    <StyledWrapper href={`/${data.slug}`} view={view}>
      <article>
        {category && (
          <div className="category">
            <Category>{category}</Category>
          </div>
        )}
        {data.thumbnail && view === 'grid' && (
          <div className="thumbnail">
            <Image
              src={data.thumbnail}
              fill
              alt={data.title}
              css={{ objectFit: "cover" }}
            />
          </div>
        )}
        <div data-thumb={view === 'grid' && !!data.thumbnail} data-category={!!category} className="content">
          <header className="top">
            <h2>{data.title}</h2>
          </header>
          {formattedDate && (
            <div className="date">
              <div className="content">{formattedDate}</div>
            </div>
          )}
          <div className="summary">
            <p>{data.summary}</p>
          </div>
          <div className="tech-stack" ref={techStackRef}>
            <div className="icons-container">
              {displayTags.map((tag, index) => {
                const icon = ICONS[tag];
                return icon ? (
                  <div key={index} className="icon-wrapper" title={tag}>
                    {icon}
                  </div>
                ) : null;
              })}
            </div>
            {remainingTagsCount > 0 && (
              <div className="more-count">
                +{remainingTagsCount}개
              </div>
            )}
          </div>
        </div>
      </article>
    </StyledWrapper>
  )
}

export default PostCard

const StyledWrapper = styled(Link)<{ view: 'list' | 'grid' }>`
  display: block;
  height: 100%;
  
  article {
    overflow: hidden;
    position: relative;
    margin-bottom: ${({ view }) => view === 'list' ? '1.5rem' : '0'};
    border-radius: 1rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    transition-property: box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    height: 100%;
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      margin-bottom: ${({ view }) => view === 'list' ? '2rem' : '0'};
    }

    :hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    > .category {
      position: absolute;
      top: 1rem;
      left: ${({ view }) => view === 'grid' ? '1rem' : 'auto'};
      right: ${({ view }) => view === 'grid' ? 'auto' : '1rem'};
      z-index: 10;
      
      > div {
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 500;
        background-color: ${({ theme }) =>
          theme.scheme === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.5)"};
        backdrop-filter: blur(4px);
      }
    }

    > .thumbnail {
      display: ${({ view }) => view === 'grid' ? 'block' : 'none'};
      position: relative;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.gray2};
      padding-bottom: 56.25%;
      flex: 0 0 auto;
    }

    > .content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: ${({ view }) => view === 'grid' ? '220px' : 'auto'};

      > .top {
        margin-bottom: 0.75rem;
        flex-shrink: 0;

        h2 {
          font-size: 1.25rem;
          line-height: 1.75rem;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-word;
        }
      }

      > .date {
        display: flex;
        margin-bottom: 0.75rem;
        gap: 0.5rem;
        align-items: center;
        flex-shrink: 0;
        
        .content {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: ${({ theme }) => theme.colors.gray11};
        }
      }

      > .summary {
        margin-bottom: 1rem;
        
        p {
          color: ${({ theme }) => theme.colors.gray11};
          font-size: 0.875rem;
          line-height: 1.5;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-word;
        }
      }

      > .tech-stack {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        margin-top: auto;
        flex-shrink: 0;
        min-height: 2rem;

        .icons-container {
          display: flex;
          gap: 0.375rem;
          overflow: hidden;
        }

        .icon-wrapper {
          width: 1.75rem;
          height: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;

          svg, img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .more-count {
          flex-shrink: 0;
          font-size: 0.75rem;
          color: ${({ theme }) => theme.colors.gray11};
          white-space: nowrap;
          background-color: ${({ theme }) => theme.colors.gray3};
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
        }
      }
    }
  }
`
