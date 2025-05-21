import { CONFIG } from "site.config"
import { TPost } from "src/types"
import { formatDate } from "src/libs/utils"
import Image from "next/image"
import React from "react"
import styled from "@emotion/styled"

type Props = {
  data: TPost
}

const PostHeader: React.FC<Props> = ({ data }) => {
  return (
    <StyledWrapper>
      <h1 className="title">{data.title}</h1>
      {data.type[0] !== "Paper" && (
        <nav>
          <div className="links">
            {data.github && (
              <div className="link-item">
                <a href={data.github.startsWith('http') ? data.github : `https://${data.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="link github">
                  <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                  <span className="url">GitHub 바로가기</span>
                </a>
              </div>
            )}
            {data.swagger && (
              <div className="link-item">
                <a href={data.swagger.startsWith('http') ? data.swagger : `https://${data.swagger}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="link swagger">
                  <img 
                    src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.21.0/favicon-32x32.png"
                    alt="Swagger Logo"
                    width={20}
                    height={20}
                  />
                  <span className="url">Swagger 바로가기</span>
                </a>
              </div>
            )}
            {data.deploy && (
              <div className="link-item">
                <a href={data.deploy.startsWith('http') ? data.deploy : `https://${data.deploy}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="link deploy">
                  <svg height="20" width="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                  <span className="url">홈페이지 바로가기</span>
                </a>
              </div>
            )}
          </div>
          <div className="info">
            <div className="info-row">
              {(data?.date?.start_date || data?.date?.end_date) && (
                <div className="date">
                  <span className="period">기간</span>
                  {data?.date?.start_date && data?.date?.end_date
                    ? `${formatDate(data.date.start_date, CONFIG.lang)} ~ ${formatDate(data.date.end_date, CONFIG.lang)}`
                    : formatDate(data?.date?.start_date || data.createdTime, CONFIG.lang)}
                </div>
              )}
            </div>
            <div className="info-row">
              {data.role && (
                <div className="info-item">
                  <span className="label">역할</span>
                  {data.role}
                </div>
              )}
            </div>
            <div className="info-row">
              {data.personnel && (
                <div className="info-item">
                  <span className="label">인원</span>
                  {data.personnel}
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </StyledWrapper>
  )
}

export default PostHeader

const StyledWrapper = styled.div`
  .title {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 700;
  }
  nav {
    color: ${({ theme }) => theme.colors.gray11};
    
    .links {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem;
      padding-top: 0.5rem;
      
      .link-item {
        .link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: ${({ theme }) => theme.colors.gray11};
          transition: color 0.2s ease;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          max-width: 100%;
          padding: 0.25rem;
          
          &:hover {
            color: ${({ theme }) => theme.colors.gray12};
          }

          .url {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            @media (max-width: 768px) {
              display: none;
            }
          }

          @media (max-width: 768px) {
            padding: 0.5rem;
            background-color: ${({ theme }) => theme.colors.gray5};
            border-radius: 9999px;
          }
        }
      }
    }

    .info {
      display: flex;
      margin-top: 1rem;
      margin-bottom: 0.75rem;
      flex-direction: column;
      gap: 0.75rem;

      .info-row {
        display: flex;
        gap: 0.75rem;
        align-items: center;
      }
      
      .date, .info-item {
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.colors.gray11};
      }

      .period, .label {
        margin-right: 0.5rem;
        color: ${({ theme }) => theme.colors.gray12};
      }
    }
  }

  .date {
    margin-right: 0.5rem;
    @media (min-width: 768px) {
      margin-left: 0;
    }

    .period {
      margin-right: 0.5rem;
      color: ${({ theme }) => theme.colors.gray12};
    }
  }
`
