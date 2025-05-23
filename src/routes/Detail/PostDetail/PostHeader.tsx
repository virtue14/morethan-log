import { CONFIG } from "site.config"
import { TPost } from "src/types"
import { formatDate } from "src/libs/utils"
import React, { useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import { ICONS } from "src/constants/icons"

type Props = {
  data: TPost
}

type Category = 'Backend' | 'Frontend' | 'Database' | 'Architecture' | 'DevOps&Infra' | 'API' | 'Testing' | 'Collaboration';

type TechStacksType = {
  [key: string]: string[] | undefined;
};

const PostHeader: React.FC<Props> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<Category>('Backend');
  const [isExpanded, setIsExpanded] = useState(false);
  const techListRef = useRef<HTMLUListElement>(null);
  const techContainerRef = useRef<HTMLDivElement>(null);
  const [needsExpand, setNeedsExpand] = useState(false);
  const [itemHeight, setItemHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (techListRef.current && techContainerRef.current) {
      const list = techListRef.current;
      const container = techContainerRef.current;
      const firstItem = list.children[0];
      
      if (firstItem) {
        const itemHeight = firstItem.getBoundingClientRect().height;
        const containerHeight = list.scrollHeight;
        setItemHeight(itemHeight);
        setContainerHeight(containerHeight);
        
        // 두 줄을 넘어가는지 체크 (여백 포함)
        const twoLinesHeight = itemHeight * 2 + 16; // 16px는 아이템 간 간격
        setNeedsExpand(containerHeight > twoLinesHeight);
        
        // 두 줄로 제한
        if (!isExpanded) {
          list.style.maxHeight = `${twoLinesHeight}px`;
        } else {
          list.style.maxHeight = 'none';
        }
      }
    }
  }, [activeTab, isExpanded]);

  const categories: Category[] = ['Backend', 'Frontend', 'Database', 'Architecture', 'DevOps&Infra', 'API', 'Testing', 'Collaboration'];

  const getAvailableCategories = (): Category[] => {
    const categoryMap: { [key in Category]: keyof TPost } = {
      'Backend': 'backend',
      'Frontend': 'frontend',
      'Database': 'database',
      'Architecture': 'architecture',
      'DevOps&Infra': 'devopsinfra',
      'API': 'api',
      'Testing': 'testing',
      'Collaboration': 'collaboration'
    };

    return categories.filter(category => {
      const key = categoryMap[category];
      const value = data[key];
      return Array.isArray(value) && value.length > 0;
    });
  };

  const availableCategories = getAvailableCategories();
  
  useEffect(() => {
    if (availableCategories.length > 0 && !availableCategories.includes(activeTab)) {
      setActiveTab(availableCategories[0]);
    }
  }, [availableCategories]);

  const getFilteredTechStacks = (): TechStacksType => {
    const categoryMap: { [key in Category]: keyof TPost } = {
      'Backend': 'backend',
      'Frontend': 'frontend',
      'Database': 'database',
      'Architecture': 'architecture',
      'DevOps&Infra': 'devopsinfra',
      'API': 'api',
      'Testing': 'testing',
      'Collaboration': 'collaboration'
    };

    const key = categoryMap[activeTab];
    return {
      [key]: data[key] as string[] | undefined
    };
  };

  const renderTechStacks = () => {
    const filteredStacks = getFilteredTechStacks();
    return Object.entries(filteredStacks).map(([category, items]) => {
      if (!items) return null;
      return items.map((item: string, index: number) => (
        <li 
          key={`${category}-${index}`} 
          className="tech-item"
        >
          <span className="tech-icon">
            {ICONS[item]}
          </span>
          <span className="tech-name">{item}</span>
        </li>
      ));
    });
  };

  return (
    <StyledWrapper>
      <h1 className="title">{data.title}</h1>
      {data.type && data.type[0] !== "Paper" && (
        <nav>
          <div className="links">
            {data.github && (
              <div className="link-item">
                <a href={data.github.startsWith('http') ? data.github : `https://${data.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="link github">
                  {ICONS.GitHub}
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
                  {ICONS['Swagger']}
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
                  {ICONS.Deploy}
                  <span className="url">홈페이지 바로가기</span>
                </a>
              </div>
            )}
          </div>
          <div className="info">
            <div className="info-row">
              {(data?.date?.start_date || data?.date?.end_date) && (
                <div className="date">
                  <h3 className="info-title">기간</h3>
                  <span className="info-content">
                    {data?.date?.start_date && data?.date?.end_date
                      ? `${formatDate(data.date.start_date, CONFIG.lang)} ~ ${formatDate(data.date.end_date, CONFIG.lang)}`
                      : formatDate(data?.date?.start_date || data.createdTime, CONFIG.lang)}
                  </span>
                </div>
              )}
            </div>
            <div className="info-row">
              {data.role && (
                <div className="info-item">
                  <h3 className="info-title">역할</h3>
                  <span className="info-content">{data.role}</span>
                </div>
              )}
            </div>
            <div className="info-row">
              {data.personnel && (
                <div className="info-item">
                  <h3 className="info-title">인원</h3>
                  <span className="info-content">{data.personnel}</span>
                </div>
              )}
            </div>
            {availableCategories.length > 0 && (
              <div className="tech-stacks">
                <h3 className="tech-title">사용 기술</h3>
                <div className="tabs-container">
                  <ul className="tabs">
                    {availableCategories.map((category) => (
                      <li 
                        key={category} 
                        className={`tab-item ${activeTab === category ? 'active' : ''}`}
                      >
                        <button onClick={() => {
                          setActiveTab(category);
                          setIsExpanded(false);
                        }}>
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tech-list-container" ref={techContainerRef}>
                  <ul 
                    ref={techListRef} 
                    className={`tech-list ${isExpanded ? 'expanded' : ''}`}
                  >
                    {renderTechStacks()}
                  </ul>
                  {needsExpand && (
                    <button 
                      className="expand-button"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      <span className="button-label">{isExpanded ? '접기' : '더보기'}</span>
                      <span className="button-interaction"></span>
                    </button>
                  )}
                </div>
              </div>
            )}
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
        gap: 1.5rem;
        align-items: center;
      }
      
      .date, .info-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: ${({ theme }) => theme.colors.gray11};
      }

      .info-title, .tech-title {
        font-size: 1rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.gray12};
        margin: 0;
        padding: 0;
        line-height: 1.5;
      }

      .info-content {
        color: ${({ theme }) => theme.colors.gray11};
        font-size: 0.875rem;
        line-height: 1.5;
      }

      .tech-stacks {
        .tech-title {
          font-size: 1rem;
          font-weight: 700;
          color: ${({ theme }) => theme.colors.gray12};
          padding: 0;
          line-height: 1.5;
        }

        .tabs-container {
          margin-bottom: 2rem;
          border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          
          &::-webkit-scrollbar {
            display: none;
          }

          .tabs {
            display: flex;
            gap: 2rem;
            white-space: nowrap;
            padding: 0;
            margin: 0;
            list-style: none;
            
            .tab-item {
              position: relative;
              margin-bottom: -1px;

              button {
                padding: 0.75rem 0;
                color: ${({ theme }) => theme.colors.gray11};
                font-size: 0.875rem;
                border: none;
                background: none;
                cursor: pointer;
                transition: all 0.2s ease;
                outline: none;
                font-weight: 400;
                white-space: nowrap;

                &:hover {
                  color: ${({ theme }) => theme.colors.gray12};
                }
              }

              &.active {
                button {
                  color: ${({ theme }) => theme.colors.gray12};
                  font-weight: 500;
                }

                &::after {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  height: 2px;
                  background-color: ${({ theme }) => theme.colors.gray12};
                  border-radius: 2px 2px 0 0;
                }
              }
            }
          }
        }

        .tech-list-container {
          position: relative;
          overflow: hidden;
          
          .tech-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 0;
            padding: 0;
            list-style: none;
            width: 100%;
            text-align: left;
            transition: max-height 0.3s ease-in-out;
            overflow: hidden;

            &.expanded {
              max-height: none !important;
            }

            .tech-item {
              height: 36px; // 고정 높이 설정
              margin: 0;
              padding: 6px 10px;
              border: 1px solid hsla(225, 5%, 46%, 0.08);
              box-sizing: border-box;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 8px;
              gap: 6px;
              font-family: inherit;
              font-size: inherit;
              line-height: inherit;
              color: inherit;
              transition: all 0.2s ease;
              cursor: default;
              white-space: nowrap;

              @media (max-width: 768px) {
                height: 32px; // 모바일에서 더 작은 높이
                padding: 4px 8px;
                font-size: 0.875rem;
              }

              &:hover {
                transform: translateY(-2px);
                box-shadow: ${({ theme }) => theme.colors.gray1 === '#fff' 
                  ? '0 4px 8px rgba(0, 0, 0, 0.1)'
                  : '0 4px 8px rgba(0, 0, 0, 0.3)'
                };
                border-color: ${({ theme }) => theme.colors.gray6};
              }

              .tech-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 1.5rem;
                height: 1.5rem;
                margin: 0;
                padding: 0;
                border: 0;
                box-sizing: border-box;
                
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                }
              }

              .tech-name {
                margin: 0;
                padding: 0;
                border: 0;
                box-sizing: border-box;
                font-size: 0.875rem;
                line-height: 1.25rem;
                letter-spacing: 0.0145em;
                font-weight: 500;
                color: ${({ theme }) => theme.colors.gray12};
                font-family: inherit;
              }
            }
          }

          .expand-button {
            margin: 0;
            background: none;
            font-family: inherit;
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            vertical-align: middle;
            box-sizing: border-box;
            line-height: normal;
            cursor: pointer;
            white-space: nowrap;
            padding: 0 20px;
            min-width: 64px;
            font-size: 15px;
            border-radius: 10px;
            width: 100%;
            height: 48px;
            border: 1px solid hsla(225, 5%, 46%, 0.08);
            background-color: ${({ theme }) => theme.colors.gray1};
            color: rgba(46, 47, 51, 0.88);
            font-weight: 500;
            box-shadow: none;
            margin-top: 0.5rem;
            transition: all 0.2s ease;

            &:hover {
              border-color: hsla(225, 5%, 46%, 0.16);
              background-color: ${({ theme }) => theme.colors.gray3};
            }

            .button-label {
              position: relative;
              font-size: 15px;
              font-weight: 500;
              color: rgba(46, 47, 51, 0.88);
            }

            .button-interaction {
              position: absolute;
              inset: 0;
              border-radius: inherit;
              transition: background-color 0.2s ease;
            }
          }
        }
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
