import { useRouter } from "next/router"
import React from "react"
import styled from "@emotion/styled"
import { DEFAULT_CATEGORY, TEAM, PERSONAL } from "src/constants"
import { useCategoriesQuery } from "src/hooks/useCategoriesQuery"

type Props = {}

const CategoryList: React.FC<Props> = () => {
  const router = useRouter()
  const categories = useCategoriesQuery()
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY

  const handleCategoryClick = (category: string) => {
    router.push({
      query: {
        ...router.query,
        category,
      },
    })
  }

  return (
    <StyledWrapper>
      <div className="list">
        <a
          data-active={currentCategory === DEFAULT_CATEGORY}
          onClick={() => handleCategoryClick(DEFAULT_CATEGORY)}
        >
          {DEFAULT_CATEGORY}
          <span className="count">({Object.values(categories).reduce((acc, curr) => acc + curr, 0)})</span>
        </a>
        <a
          data-active={currentCategory === TEAM}
          onClick={() => handleCategoryClick(TEAM)}
        >
          {TEAM}
          <span className="count">({categories[TEAM] || 0})</span>
        </a>
        <a
          data-active={currentCategory === PERSONAL}
          onClick={() => handleCategoryClick(PERSONAL)}
        >
          {PERSONAL}
          <span className="count">({categories[PERSONAL] || 0})</span>
        </a>
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

    a {
      display: flex;
      padding: 0.5rem;
      gap: 0.5rem;
      align-items: center;
      border-radius: 0.75rem;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.gray11};
      
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