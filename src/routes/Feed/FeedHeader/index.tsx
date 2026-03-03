/** @jsxImportSource @emotion/react */
import React from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { Colors } from "../../../styles/colors"
import { DEFAULT_CATEGORY } from "../../../constants"
import { useCategoriesQuery } from "../../../hooks/useCategoriesQuery"
import useDropdown from "../../../hooks/useDropdown"
import { MdExpandMore } from "react-icons/md"
import useHydrated from "src/hooks/useHydrated"
import type { ParsedUrlQueryInput } from "querystring"

declare module "@emotion/react" {
  export interface Theme {
    scheme: "light" | "dark"
    colors: Colors
  }
}

type ViewType = 'list' | 'grid'

interface Props {
  view: ViewType
  onViewChange: (view: ViewType) => void
}

const parseOrder = (value: string | string[] | undefined): "asc" | "desc" => {
  if (typeof value !== "string") {
    return "desc"
  }

  const normalized = value.toLowerCase()
  return normalized === "asc" || normalized === "acc" ? "asc" : "desc"
}

const FeedHeader = ({ view, onViewChange }: Props): JSX.Element => {
  const router = useRouter()
  const hydrated = useHydrated()
  const currentOrder = hydrated ? parseOrder(router.query.order) : "desc"
  const data = useCategoriesQuery()
  const [dropdownRef, opened, handleOpen] = useDropdown()
  const currentCategory =
    hydrated && typeof router.query.category === "string"
      ? router.query.category
      : DEFAULT_CATEGORY

  const replaceQuery = (nextQuery: ParsedUrlQueryInput) => {
    void router.replace(
      {
        pathname: router.pathname,
        query: nextQuery,
      },
      undefined,
      { shallow: true, scroll: false }
    )
  }

  const handleOrderChange = (order: "asc" | "desc") => {
    if (!hydrated || !router.isReady) {
      return
    }

    const nextQuery: ParsedUrlQueryInput = { ...router.query }
    if (order === "desc") {
      delete nextQuery.order
    } else {
      nextQuery.order = order
    }
    delete nextQuery.page
    replaceQuery(nextQuery)
  }

  const handleCategoryChange = (category: string) => {
    if (!hydrated || !router.isReady) {
      return
    }

    const nextQuery: ParsedUrlQueryInput = { ...router.query }
    if (category === DEFAULT_CATEGORY) {
      delete nextQuery.category
    } else {
      nextQuery.category = category
    }
    delete nextQuery.page
    replaceQuery(nextQuery)
  }

  return (
    <StyledWrapper>
      <div className="left">
        <div className="category-select" ref={dropdownRef}>
          <button
            type="button"
            className="wrapper"
            onClick={handleOpen}
            aria-haspopup="listbox"
            aria-expanded={opened}
            aria-label="카테고리 선택 열기"
          >
            {currentCategory} Posts <MdExpandMore />
          </button>
          <div
            className="content"
            data-open={opened}
            role="listbox"
            aria-label="카테고리 목록"
          >
            {Object.keys(data).map((key, idx) => (
                <button
                  type="button"
                  className="item"
                  key={idx}
                  onClick={() => {
                    handleCategoryChange(key)
                    handleOpen()
                  }}
                  aria-selected={currentCategory === key}
                  data-active={currentCategory === key}
                >
                <span>{`${key} (${data[key]})`}</span>
                <span className="item-check" aria-hidden>
                  ✓
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="right">
        <div className="view-toggle">
          <button
            type="button"
            className={view === 'grid' ? 'active' : ''}
            title="카드 뷰"
            aria-label="카드 보기"
            aria-pressed={view === "grid"}
            onClick={() => onViewChange('grid')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>
          </button>
          <button
            type="button"
            className={view === 'list' ? 'active' : ''}
            title="리스트 뷰"
            aria-label="리스트 보기"
            aria-pressed={view === "list"}
            onClick={() => onViewChange('list')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-left"><path d="M15 12H3"></path><path d="M17 18H3"></path><path d="M21 6H3"></path></svg>
          </button>
        </div>
        <div className="order-toggle">
          <button
            type="button"
            data-active={currentOrder === "desc"}
            onClick={() => handleOrderChange("desc")}
            aria-pressed={currentOrder === "desc"}
          >
            최신순
          </button>
          <button
            type="button"
            data-active={currentOrder === "asc"}
            onClick={() => handleOrderChange("asc")}
            aria-pressed={currentOrder === "asc"}
          >
            오래된순
          </button>
        </div>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;

  .left {
    .category-select {
      position: relative;
      
      .wrapper {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 1.125rem;
        font-weight: 600;
        cursor: pointer;
        color: ${({ theme }) => theme.colors.gray12};
        border: none;
        background: transparent;
        min-height: 44px;
        padding: 0 0.25rem;
        border-radius: 0.5rem;

        svg {
          margin-top: 1px;
        }

        &:hover {
          background-color: ${({ theme }) => theme.colors.gray4};
        }
      }

      .content {
        position: absolute;
        z-index: 40;
        padding: 0.25rem;
        border-radius: 0.75rem;
        background-color: ${({ theme }) => theme.colors.gray2};
        color: ${({ theme }) => theme.colors.gray10};
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
        min-width: 12rem;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(-4px) scale(0.98);
        transition: opacity 0.12s ease, transform 0.12s ease, visibility 0.12s step-end;

        &[data-open="true"] {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateY(0) scale(1);
          transition: opacity 0.12s ease, transform 0.12s ease;
        }
        
        .item {
          padding: 0.5rem 0.625rem;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          line-height: 1.2rem;
          white-space: nowrap;
          cursor: pointer;
          border: none;
          background: transparent;
          color: inherit;
          width: 100%;
          min-height: 44px;
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;

          .item-check {
            opacity: 0;
            color: ${({ theme }) => theme.colors.gray12};
            font-weight: 600;
          }

          &:hover {
            background-color: ${({ theme }) => theme.colors.gray4};
          }

          &[data-active="true"] {
            color: ${({ theme }) => theme.colors.gray12};
            background-color: ${({ theme }) => theme.colors.gray4};
            font-weight: 600;

            .item-check {
              opacity: 1;
            }
          }
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 1rem;

    .view-toggle {
      display: flex;
      gap: 0.25rem;
      padding: 0.25rem;
      background-color: ${({ theme }) => theme.colors.gray4};
      border-radius: 0.5rem;

      button {
        width: 44px;
        height: 44px;
        border: none;
        border-radius: 0.375rem;
        background: none;
        cursor: pointer;
        color: ${({ theme }) => theme.colors.gray10};
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:hover {
          color: ${({ theme }) => theme.colors.gray12};
        }
        
        &.active {
          background-color: ${({ theme }) => theme.colors.gray2};
          color: ${({ theme }) => theme.colors.gray12};
        }
      }
    }

    .order-toggle {
      display: flex;
      gap: 0.25rem;
      padding: 0.25rem;
      background-color: ${({ theme }) => theme.colors.gray4};
      border-radius: 0.5rem;

      button {
        min-height: 44px;
        padding: 0.375rem 0.625rem;
        cursor: pointer;
        color: ${({ theme }) => theme.colors.gray10};
        font-size: 0.875rem;
        border-radius: 0.375rem;
        transition: all 0.2s;
        border: none;
        background: transparent;

        &[data-active="true"] {
          background-color: ${({ theme }) => theme.colors.gray2};
          color: ${({ theme }) => theme.colors.gray12};
          font-weight: 500;
        }

        &:hover {
          color: ${({ theme }) => theme.colors.gray12};
        }
      }
    }
  }
`

export default FeedHeader 
