/** @jsxImportSource @emotion/react */
import React, { Dispatch, SetStateAction } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { Theme } from "@emotion/react"
import { Colors } from "src/styles/colors"

declare module "@emotion/react" {
  export interface Theme {
    scheme: "light" | "dark"
    colors: Colors
  }
}

type ViewType = 'list' | 'grid'

type FeedHeaderProps = {
  view: ViewType
  onViewChange: (view: ViewType) => void
}

export const FeedHeader: React.ComponentType<FeedHeaderProps> = ({ view, onViewChange }) => {
  const router = useRouter()
  const currentOrder = `${router.query.order || ``}` || "desc"

  const handleOrderChange = (order: string) => {
    router.push({
      query: {
        ...router.query,
        order,
      },
    })
  }

  return (
    <StyledWrapper>
      <div className="left">
        <div className="category-title">
          <div className="wrapper">
            📂 All Posts <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="view-toggle">
          <button
            className={view === 'grid' ? 'active' : ''}
            title="카드 뷰"
            onClick={() => onViewChange('grid')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>
          </button>
          <button
            className={view === 'list' ? 'active' : ''}
            title="리스트 뷰"
            onClick={() => onViewChange('list')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-left"><path d="M15 12H3"></path><path d="M17 18H3"></path><path d="M21 6H3"></path></svg>
          </button>
        </div>
        <div className="order-toggle">
          <a
            data-active={currentOrder === "desc"}
            onClick={() => handleOrderChange("desc")}
          >
            Desc
          </a>
          <a
            data-active={currentOrder === "asc"}
            onClick={() => handleOrderChange("asc")}
          >
            Asc
          </a>
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
    .category-title {
      .wrapper {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 1.125rem;
        font-weight: 600;
        cursor: pointer;
        color: ${({ theme }) => theme.colors.gray12};

        svg {
          margin-top: 1px;
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
        padding: 0.375rem;
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

      a {
        padding: 0.375rem 0.5rem;
        cursor: pointer;
        color: ${({ theme }) => theme.colors.gray10};
        font-size: 0.875rem;
        border-radius: 0.375rem;
        transition: all 0.2s;

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