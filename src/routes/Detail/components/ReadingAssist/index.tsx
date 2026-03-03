import styled from "@emotion/styled"
import React, { useCallback, useEffect, useState } from "react"

type Props = {
  contentRef: React.RefObject<HTMLElement | null>
  enabled: boolean
}

type TocItem = {
  id: string
  text: string
  level: 1 | 2 | 3
}

const HEADING_SELECTOR =
  "h1, h2, h3, .notion-h1, .notion-h2, .notion-h3"
const CONTENT_TOP_OFFSET = 120
const ANCHOR_SCROLL_OFFSET = 96

const normalizeHeadingText = (value: string) => value.replace(/\s+/g, " ").trim()

const toHeadingLevel = (element: HTMLElement): 1 | 2 | 3 => {
  const tag = element.tagName.toLowerCase()
  if (tag === "h1" || element.classList.contains("notion-h1")) return 1
  if (tag === "h2" || element.classList.contains("notion-h2")) return 2
  return 3
}

const buildHeadingId = (text: string, index: number) => {
  const normalized = text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
  const suffix = normalized || `section-${index + 1}`
  return `toc-${index + 1}-${suffix}`
}

const ReadingAssist: React.FC<Props> = ({ contentRef, enabled }) => {
  const [mounted, setMounted] = useState(false)
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const collectHeadings = useCallback(() => {
    if (!enabled || !contentRef.current) {
      setTocItems([])
      return
    }

    const headingElements = Array.from(
      contentRef.current.querySelectorAll<HTMLElement>(HEADING_SELECTOR)
    )

    const nextItems: TocItem[] = headingElements
      .map((element, index) => {
        const text = normalizeHeadingText(element.textContent ?? "")
        if (!text) return null

        const id = element.id || buildHeadingId(text, index)
        if (!element.id) {
          element.id = id
        }

        return {
          id,
          text,
          level: toHeadingLevel(element),
        } satisfies TocItem
      })
      .filter((item): item is TocItem => item !== null)

    setTocItems(nextItems)
  }, [contentRef, enabled])

  const updateReadingState = useCallback(() => {
    if (!enabled || !contentRef.current) {
      setProgress(0)
      setActiveId(undefined)
      return
    }

    const content = contentRef.current
    const rect = content.getBoundingClientRect()
    const scrollY = window.scrollY || window.pageYOffset

    const startY = scrollY + rect.top - CONTENT_TOP_OFFSET
    const readableHeight = Math.max(
      content.offsetHeight - window.innerHeight * 0.35,
      1
    )
    const nextProgress = Math.min(
      Math.max((scrollY - startY) / readableHeight, 0),
      1
    )
    setProgress(nextProgress)

    if (tocItems.length === 0) {
      setActiveId(undefined)
      return
    }

    let nextActive = tocItems[0].id
    for (const item of tocItems) {
      const element = document.getElementById(item.id)
      if (!element) continue

      if (element.getBoundingClientRect().top <= CONTENT_TOP_OFFSET) {
        nextActive = item.id
      } else {
        break
      }
    }
    setActiveId(nextActive)
  }, [contentRef, enabled, tocItems])

  useEffect(() => {
    collectHeadings()

    if (!enabled || !contentRef.current) {
      return
    }

    const observer = new MutationObserver(() => {
      collectHeadings()
    })

    observer.observe(contentRef.current, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [collectHeadings, contentRef, enabled])

  useEffect(() => {
    if (!enabled) {
      return
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) {
        return
      }
      ticking = true
      window.requestAnimationFrame(() => {
        updateReadingState()
        ticking = false
      })
    }

    const onResize = () => {
      updateReadingState()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    updateReadingState()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [enabled, updateReadingState])

  const handleMoveToHeading = (id: string) => {
    const target = document.getElementById(id)
    if (!target) {
      return
    }
    const scrollTop = window.scrollY + target.getBoundingClientRect().top - ANCHOR_SCROLL_OFFSET
    window.scrollTo({
      top: scrollTop,
      behavior: "smooth",
    })
  }

  if (!enabled || !mounted) {
    return null
  }

  return (
    <>
      <ProgressBar aria-hidden>
        <div className="indicator" style={{ transform: `scaleX(${progress})` }} />
      </ProgressBar>

      {tocItems.length > 0 && (
        <>
          <DesktopToc aria-label="본문 목차">
            <p className="title">On this page</p>
            <ul>
              {tocItems.map((item) => (
                <li key={item.id} data-level={item.level}>
                  <button
                    type="button"
                    data-active={activeId === item.id}
                    aria-current={activeId === item.id ? "location" : undefined}
                    onClick={() => handleMoveToHeading(item.id)}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </DesktopToc>

          <MobileToc aria-label="모바일 목차">
            <div className="list">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  data-active={activeId === item.id}
                  aria-current={activeId === item.id ? "location" : undefined}
                  onClick={() => handleMoveToHeading(item.id)}
                >
                  {item.text}
                </button>
              ))}
            </div>
          </MobileToc>
        </>
      )}
    </>
  )
}

export default ReadingAssist

const ProgressBar = styled.div`
  position: fixed;
  top: 72px;
  left: 0;
  width: 100%;
  height: 3px;
  background: ${({ theme }) => theme.colors.gray4};
  z-index: 45;

  .indicator {
    width: 100%;
    height: 100%;
    transform-origin: left center;
    background: ${({ theme }) => (theme.scheme === "dark" ? "#93c5fd" : "#2563eb")};
    transition: transform 0.12s ease-out;
  }
`

const DesktopToc = styled.aside`
  display: none;

  @media (min-width: 1280px) {
    display: block;
    position: fixed;
    right: 1.25rem;
    top: 8.5rem;
    width: 15rem;
    max-height: calc(100vh - 10rem);
    overflow: auto;
    padding: 0.875rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.875rem;
    background: ${({ theme }) =>
      theme.scheme === "dark" ? theme.colors.gray3 : theme.colors.gray1};
    z-index: 35;
  }

  .title {
    margin: 0 0 0.625rem;
    font-size: 0.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray11};
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin: 0;
    &[data-level="2"] button {
      padding-left: 0.75rem;
    }
    &[data-level="3"] button {
      padding-left: 1.25rem;
    }
  }

  button {
    width: 100%;
    text-align: left;
    min-height: 40px;
    border-radius: 0.5rem;
    padding: 0.5rem 0.5rem;
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.8125rem;
    line-height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      background: ${({ theme }) => theme.colors.gray4};
      color: ${({ theme }) => theme.colors.gray12};
    }

    &[data-active="true"] {
      background: ${({ theme }) => theme.colors.gray4};
      color: ${({ theme }) => theme.colors.gray12};
      font-weight: 700;
    }
  }
`

const MobileToc = styled.nav`
  position: fixed;
  left: 0.75rem;
  right: 0.75rem;
  bottom: 0.875rem;
  padding: 0.5rem;
  border-radius: 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  background: ${({ theme }) =>
    theme.scheme === "dark"
      ? "rgba(31, 31, 34, 0.92)"
      : "rgba(255, 255, 255, 0.95)"};
  backdrop-filter: blur(8px);
  z-index: 35;

  @media (min-width: 1024px) {
    display: none;
  }

  .list {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  button {
    flex-shrink: 0;
    max-width: 14rem;
    min-height: 40px;
    border-radius: 9999px;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    line-height: 1rem;
    color: ${({ theme }) => theme.colors.gray12};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &[data-active="true"] {
      color: ${({ theme }) => theme.colors.gray12};
      border-color: ${({ theme }) => theme.colors.gray9};
      background: ${({ theme }) => theme.colors.gray5};
      font-weight: 700;
    }
  }
`
