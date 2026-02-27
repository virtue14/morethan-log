import styled from "@emotion/styled"
import React from "react"
import { Emoji } from "src/components/Emoji"
import useScheme from "src/hooks/useScheme"
import useHydrated from "src/hooks/useHydrated"

type Props = {}

const ThemeToggle: React.FC<Props> = () => {
  const hydrated = useHydrated()
  const [scheme, setScheme] = useScheme()
  const resolvedScheme = hydrated ? scheme : "dark"
  const nextTheme = resolvedScheme === "light" ? "dark" : "light"

  const handleClick = () => {
    setScheme(nextTheme)
  }

  return (
    <StyledWrapper
      type="button"
      onClick={handleClick}
      aria-label={`테마를 ${nextTheme} 모드로 변경`}
      title={`테마 변경: ${nextTheme}`}
    >
      <Emoji>{resolvedScheme === "light" ? "☀️" : "🌙"}</Emoji>
    </StyledWrapper>
  )
}

export default ThemeToggle

const StyledWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
