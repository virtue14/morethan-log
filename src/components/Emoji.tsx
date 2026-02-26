import React, { ReactNode } from "react"

type Props = {
  className?: string
  children?: ReactNode
}

export const Emoji = ({ className, children }: Props) => {
  return (
    <span
      className={className}
      css={{
        fontFamily:
          '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Segoe UI Symbol", sans-serif',
      }}
    >
      {children}
    </span>
  )
}
