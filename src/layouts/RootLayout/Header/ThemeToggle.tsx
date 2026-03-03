import styled from "@emotion/styled"
import React from "react"
import { Emoji } from "src/components/Emoji"
import useScheme from "src/hooks/useScheme"

type Props = {}

const ThemeToggle: React.FC<Props> = () => {
  const [scheme, setScheme] = useScheme()
  const nextTheme = scheme === "light" ? "dark" : "light"

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
      <Emoji>{scheme === "light" ? "☀️" : "🌙"}</Emoji>
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
