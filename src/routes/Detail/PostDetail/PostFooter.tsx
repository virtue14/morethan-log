import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"

type Props = {}
const FEED_SCROLL_RESTORE_KEY = "feed:scroll-restore"

const Footer: React.FC<Props> = () => {
  const router = useRouter()

  const handleBack = async () => {
    if (typeof window !== "undefined") {
      const restoreRaw = window.sessionStorage.getItem(FEED_SCROLL_RESTORE_KEY)
      if (restoreRaw) {
        try {
          const parsed = JSON.parse(restoreRaw) as { path?: string }
          if (typeof parsed.path === "string" && parsed.path.startsWith("/")) {
            await router.push(parsed.path, undefined, { scroll: false })
            return
          }
        } catch {
          // ignore invalid restore payload
        }
      }

      if (window.history.length > 1) {
        router.back()
        return
      }
    }

    await router.push("/", undefined, { scroll: false })
  }

  return (
    <StyledWrapper>
      <button type="button" onClick={() => void handleBack()}>
        ← Back
      </button>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑ Top
      </button>
    </StyledWrapper>
  )
}

export default Footer

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray10};
  button {
    margin-top: 0.5rem;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.gray12};
    }
  }
`
