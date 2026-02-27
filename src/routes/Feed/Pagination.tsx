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
    <StyledWrapper role="navigation" aria-label="포스트 페이지 이동">
      <button
        type="button"
        className="nav-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        이전
      </button>
      <div className="pages">
        {pages.map((page) => (
          <button
            type="button"
            key={page}
            className={`page-btn ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={`${page}페이지`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="nav-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
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
