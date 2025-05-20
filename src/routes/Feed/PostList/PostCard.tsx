import Link from "next/link"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import Tag from "../../../components/Tag"
import { TPost } from "../../../types"
import Image from "next/image"
import Category from "../../../components/Category"
import styled from "@emotion/styled"

type Props = {
  data: TPost
  view: 'list' | 'grid'
}

const PostCard: React.FC<Props> = ({ data, view }) => {
  const category = (data.category && data.category?.[0]) || undefined

  const getFormattedDate = () => {
    const startDate = data?.date?.start_date || null;
    const endDate = data?.date?.end_date || null;

    if (startDate && endDate) {
      return `${formatDate(startDate, CONFIG.lang)} ~ ${formatDate(endDate, CONFIG.lang)}`;
    } else if (startDate) {
      return formatDate(startDate, CONFIG.lang);
    } else {
      return "날짜 없음";
    }
  };

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
          <div className="date">
            <div className="content">{getFormattedDate()}</div>
          </div>
          <div className="summary">
            <p>{data.summary}</p>
          </div>
          <div className="tags">
            {data.tags &&
              data.tags.map((tag: string, idx: number) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
          </div>
        </div>
      </article>
    </StyledWrapper>
  )
}

export default PostCard

const StyledWrapper = styled(Link)<{ view: 'list' | 'grid' }>`
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
    height: ${({ view }) => view === 'grid' ? '100%' : 'auto'};

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
    }

    > .thumbnail {
      display: ${({ view }) => view === 'grid' ? 'block' : 'none'};
      position: relative;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.gray2};
      padding-bottom: 66%;
    }

    > .content {
      padding: 1rem;

      > .top {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (min-width: 768px) {
          flex-direction: row;
          align-items: baseline;
        }

        h2 {
          margin-bottom: 0.5rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
          font-weight: 500;
          cursor: pointer;

          @media (min-width: 768px) {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
        }
      }

      > .date {
        display: flex;
        margin-bottom: 1rem;
        gap: 0.5rem;
        align-items: center;
        .content {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: ${({ theme }) => theme.colors.gray11};
        }
      }

      > .summary {
        p {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          color: ${({ theme }) => theme.colors.gray11};
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }
      }

      > .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    }
  }
`
