import React from "react"
import styled from "@emotion/styled"
import { CONFIG } from "../../site.config"
import MetaConfig from "src/components/MetaConfig"
import {
  ICON_CATALOG,
  ICON_CATALOG_GROUPS,
  ICON_CATEGORY_LABELS,
  IconCategory,
  TechIcon,
} from "src/constants/icons"
import { NextPageWithLayout } from "../types"

const groupedIcons = Object.entries(ICON_CATALOG_GROUPS) as [
  IconCategory,
  Record<string, unknown>
][]

const IconsPage: NextPageWithLayout = () => {
  const totalCount = Object.keys(ICON_CATALOG).length
  const meta = {
    title: `아이콘 카탈로그 | ${CONFIG.blog.title}`,
    description: "프로젝트에 등록된 기술 아이콘 목록",
    type: "website",
    url: `${CONFIG.link}/icons`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <StyledWrapper>
        <header className="header">
          <h1>아이콘 카탈로그</h1>
          <p>현재 등록된 아이콘 {totalCount}개</p>
        </header>

        {groupedIcons.map(([category, iconGroup]) => {
          const iconNames = Object.keys(iconGroup)

          return (
            <section key={category} className="category-section">
              <div className="section-title">
                <h2>{ICON_CATEGORY_LABELS[category]}</h2>
                <span>{iconNames.length}개</span>
              </div>

              <ul className="icon-grid">
                {iconNames.map((name) => (
                  <li key={name} className="icon-card">
                    <div className="icon-preview">
                      <TechIcon name={name} />
                    </div>
                    <p className="icon-name">{name}</p>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </StyledWrapper>
    </>
  )
}

export default IconsPage

const StyledWrapper = styled.div`
  padding: 1.5rem 0 3rem;
  color: ${({ theme }) => theme.colors.gray12};

  .header {
    margin-bottom: 1.5rem;

    h1 {
      margin: 0;
      font-size: 1.75rem;
      line-height: 2.25rem;
    }

    p {
      margin: 0.5rem 0 0;
      color: ${({ theme }) => theme.colors.gray10};
      font-size: 0.95rem;
    }
  }

  .category-section {
    margin-bottom: 1.5rem;
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.875rem;
    background: ${({ theme }) =>
      theme.scheme === "dark" ? theme.colors.gray2 : theme.colors.gray1};
  }

  .section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.875rem;

    h2 {
      margin: 0;
      font-size: 1.05rem;
      line-height: 1.45rem;
    }

    span {
      color: ${({ theme }) => theme.colors.gray10};
      font-size: 0.8125rem;
    }
  }

  .icon-grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 0.625rem;
  }

  .icon-card {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    min-height: 2.75rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.625rem;
    padding: 0.625rem 0.75rem;
    background: ${({ theme }) =>
      theme.scheme === "dark" ? theme.colors.gray3 : theme.colors.gray2};
  }

  .icon-preview {
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg,
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .icon-name {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.15rem;
    color: ${({ theme }) => theme.colors.gray11};
    word-break: break-word;
  }

  @media (max-width: 640px) {
    .icon-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`
