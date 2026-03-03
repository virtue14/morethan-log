import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"
import { DEFAULT_CATEGORY } from "src/constants"
import useHydrated from "src/hooks/useHydrated"
import type { ParsedUrlQueryInput } from "querystring"

type Props = {
  q: string
  onClearSearch: () => void
}

const parseOrder = (value: string | string[] | undefined): "asc" | "desc" => {
  if (typeof value !== "string") {
    return "desc"
  }

  return value.toLowerCase() === "asc" || value.toLowerCase() === "acc"
    ? "asc"
    : "desc"
}

const parseView = (value: string | string[] | undefined): "grid" | "list" => {
  if (typeof value !== "string") {
    return "grid"
  }
  return value === "list" ? "list" : "grid"
}

const ActiveFilters: React.FC<Props> = ({ q, onClearSearch }) => {
  const router = useRouter()
  const hydrated = useHydrated()
  const isReady = hydrated && router.isReady
  const currentCategory =
    isReady && typeof router.query.category === "string"
      ? router.query.category
      : DEFAULT_CATEGORY
  const currentTag =
    isReady && typeof router.query.tag === "string" ? router.query.tag : undefined
  const currentOrder = isReady ? parseOrder(router.query.order) : "desc"
  const currentView = isReady ? parseView(router.query.view) : "grid"

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

  const removeQueryKey = (key: "category" | "tag" | "order" | "view") => {
    if (!isReady) return
    const nextQuery: ParsedUrlQueryInput = { ...router.query }
    delete nextQuery[key]
    delete nextQuery.page
    replaceQuery(nextQuery)
  }

  const chips: { key: string; label: string; onRemove: () => void }[] = []

  if (q.trim().length > 0) {
    chips.push({
      key: "search",
      label: `검색: ${q.trim()}`,
      onRemove: onClearSearch,
    })
  }
  if (currentCategory !== DEFAULT_CATEGORY) {
    chips.push({
      key: "category",
      label: `카테고리: ${currentCategory}`,
      onRemove: () => removeQueryKey("category"),
    })
  }
  if (currentTag) {
    chips.push({
      key: "tag",
      label: `태그: ${currentTag}`,
      onRemove: () => removeQueryKey("tag"),
    })
  }
  if (currentOrder === "asc") {
    chips.push({
      key: "order",
      label: "정렬: 오래된순",
      onRemove: () => removeQueryKey("order"),
    })
  }
  if (currentView === "list") {
    chips.push({
      key: "view",
      label: "보기: 리스트",
      onRemove: () => removeQueryKey("view"),
    })
  }

  if (chips.length === 0) {
    return null
  }

  return (
    <StyledWrapper aria-label="적용된 필터">
      <span className="title">적용 중</span>
      <div className="chip-list">
        {chips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            className="chip"
            onClick={chip.onRemove}
            aria-label={`${chip.label} 해제`}
          >
            <span className="text">{chip.label}</span>
            <span className="close" aria-hidden>
              ×
            </span>
          </button>
        ))}
      </div>
    </StyledWrapper>
  )
}

export default ActiveFilters

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.25rem 0.25rem 1rem;
  flex-wrap: wrap;

  .title {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.gray10};
    font-weight: 600;
  }

  .chip-list {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .chip {
    min-height: 36px;
    padding: 0.375rem 0.625rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    background: ${({ theme }) => theme.colors.gray3};
    color: ${({ theme }) => theme.colors.gray12};
    border-radius: 9999px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      background: ${({ theme }) => theme.colors.gray4};
    }
  }

  .text {
    font-size: 0.8125rem;
    line-height: 1rem;
    white-space: nowrap;
  }

  .close {
    font-size: 0.875rem;
    line-height: 1;
    opacity: 0.7;
  }
`
