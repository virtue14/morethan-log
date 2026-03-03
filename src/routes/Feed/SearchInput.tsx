import styled from "@emotion/styled"
import React, { InputHTMLAttributes } from "react"
import { Emoji } from "src/components/Emoji"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  resultCount?: number
  onClear?: () => void
}

const SearchInput: React.FC<Props> = ({ resultCount, onClear, ...props }) => {
  const currentValue = typeof props.value === "string" ? props.value : ""

  return (
    <StyledWrapper>
      <div className="top">
        <div className="left">
          <Emoji>🔎</Emoji> Search
        </div>
        {typeof resultCount === "number" && (
          <div className="count" aria-live="polite">
            {resultCount} results
          </div>
        )}
      </div>
      <div className="input-wrapper">
        <input
          className="mid"
          type="text"
          placeholder="Search Keyword..."
          aria-label="포스트 검색어 입력"
          enterKeyHint="search"
          {...props}
        />
        {currentValue.length > 0 && (
          <button
            type="button"
            className="clear-btn"
            onClick={onClear}
            aria-label="검색어 지우기"
          >
            ×
          </button>
        )}
      </div>
    </StyledWrapper>
  )
}

export default SearchInput

const StyledWrapper = styled.div`
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
  > .top {
    padding: 0.25rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .left {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }

    > .count {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.gray10};
      font-weight: 500;
      margin-right: 0.25rem;
    }
  }

  > .input-wrapper {
    position: relative;
  }

  .input-wrapper > .mid {
    height: 44px;
    padding-left: 1.25rem;
    padding-right: 3rem;
    border-radius: 1rem;
    outline-style: none;
    border: none;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.gray4};
    color: ${({ theme }) => theme.colors.gray12};

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray10};
    }

    &:focus {
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.gray7};
    }
  }

  .clear-btn {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.gray10};
    width: 28px;
    height: 28px;
    font-size: 1rem;
    line-height: 1;
    padding: 0;
    border-radius: 9999px;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.gray12};
      background: ${({ theme }) => theme.colors.gray5};
    }
  }
`
