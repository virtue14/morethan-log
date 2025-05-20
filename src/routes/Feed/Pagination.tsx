import React from 'react'
import styled from '@emotion/styled'

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <StyledWrapper>
      <button
        className="nav-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>
      <div className="pages">
        {pages.map((page) => (
          <button
            key={page}
            className={`page-btn ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className="nav-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </StyledWrapper>
  )
}

export default Pagination

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;

  .pages {
    display: flex;
    gap: 0.5rem;
  }

  .page-btn, .nav-btn {
    padding: 0.5rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    background: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray10};
    
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.gray5};
    }
    
    &.active {
      background: ${({ theme }) => theme.colors.gray5};
      color: ${({ theme }) => theme.colors.gray12};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
` 