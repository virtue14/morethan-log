import { useRouter } from "next/router"
import React from "react"
import styled from "@emotion/styled"
import { DEFAULT_CATEGORY } from "src/constants"
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
        </a>
        {Object.entries(categories)
          .filter(([key]) => key !== DEFAULT_CATEGORY)
          .map(([category]) => (
            <a
              key={category}
              data-active={currentCategory === category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </a>
          ))}
      </div>
    </StyledWrapper>
  )
}

export default CategoryList

const StyledWrapper = styled.div`
  .list {
    display: flex;
    overflow-x: auto;
    padding: 0.5rem;
    gap: 1rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: 1024px) {
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    a {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.gray10};
      font-size: 0.875rem;
      padding: 0.375rem 0.75rem;
      border-radius: 0.375rem;
      transition: all 0.2s;
      white-space: nowrap;
      flex-shrink: 0;

      &:hover {
        color: ${({ theme }) => theme.colors.gray12};
      }

      &[data-active="true"] {
        color: ${({ theme }) => theme.colors.gray12};
        font-weight: 500;
      }
    }
  }
` 