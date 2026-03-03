import { useRouter } from "next/router"
import React from "react"
import styled from "@emotion/styled"
import { DEFAULT_CATEGORY, TEAM, PERSONAL } from "src/constants"
import { useCategoriesQuery } from "src/hooks/useCategoriesQuery"
import useHydrated from "src/hooks/useHydrated"

type Props = {}

const CategoryList: React.FC<Props> = () => {
  const router = useRouter()
  const hydrated = useHydrated()
  const categories = useCategoriesQuery()
  const currentCategory =
    hydrated && typeof router.query.category === "string"
      ? router.query.category
      : DEFAULT_CATEGORY

  const handleCategoryClick = (category: string) => {
    if (!hydrated || !router.isReady) {
      return
    }

    const nextQuery = { ...router.query }
    if (category === DEFAULT_CATEGORY) {
      delete nextQuery.category
    } else {
      nextQuery.category = category
    }
    delete nextQuery.page

    void router.replace(
      {
        pathname: router.pathname,
        query: nextQuery,
      },
      undefined,
      { shallow: true, scroll: false }
    )
  }

  return (
    <StyledWrapper>
      <div className="list">
        <button
          type="button"
          data-active={currentCategory === DEFAULT_CATEGORY}
          onClick={() => handleCategoryClick(DEFAULT_CATEGORY)}
        >
          {DEFAULT_CATEGORY}
          <span className="count">({Object.values(categories).reduce((acc, curr) => acc + curr, 0)})</span>
        </button>
        <button
          type="button"
          data-active={currentCategory === TEAM}
          onClick={() => handleCategoryClick(TEAM)}
        >
          {TEAM}
          <span className="count">({categories[TEAM] || 0})</span>
        </button>
        <button
          type="button"
          data-active={currentCategory === PERSONAL}
          onClick={() => handleCategoryClick(PERSONAL)}
        >
          {PERSONAL}
          <span className="count">({categories[PERSONAL] || 0})</span>
        </button>
      </div>
    </StyledWrapper>
  )
}

export default CategoryList

const StyledWrapper = styled.div`
  @media (max-width: 1023px) {
    display: none;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    button {
      display: flex;
      padding: 0.5rem;
      gap: 0.5rem;
      align-items: center;
      border-radius: 0.75rem;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.gray11};
      border: 0;
      background: transparent;
      width: 100%;
      text-align: left;
      
      &[data-active="true"] {
        color: ${({ theme }) => theme.colors.gray12};
        background-color: ${({ theme }) => theme.colors.gray5};
        font-weight: 500;
      }

      &:hover {
        color: ${({ theme }) => theme.colors.gray12};
        background-color: ${({ theme }) => theme.colors.gray5};
      }

      .count {
        font-size: 0.875rem;
        color: ${({ theme }) => theme.colors.gray10};
      }
    }
  }
` 
