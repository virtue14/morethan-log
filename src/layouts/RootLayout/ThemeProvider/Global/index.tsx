import { Global as _Global, css, useTheme } from "@emotion/react"

import { pretendard } from "src/assets"

export const Global = () => {
  const theme = useTheme()

  return (
    <_Global
      styles={css`
        body {
          margin: 0;
          padding: 0;
          color: ${theme.colors.gray12};
          background-color: ${theme.colors.gray2};
          font-family: ${pretendard.style.fontFamily};
          font-weight: ${pretendard.style.fontWeight};
          font-style: ${pretendard.style.fontStyle};
        }

        * {
          color-scheme: ${theme.scheme};
          box-sizing: border-box;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          font-weight: inherit;
          font-style: inherit;
        }

        a {
          color: inherit;
          text-decoration: none;
          cursor: pointer;
        }

        ul {
          padding: 0;
        }

        button {
          border: none;
          background-color: transparent;
          color: inherit;
          font: inherit;
          padding: 0;
          cursor: pointer;
        }

        input {
          box-sizing: border-box;
          color: inherit;
          font: inherit;
        }

        input::placeholder {
          color: ${theme.colors.gray10};
        }

        textarea {
          border: none;
          background-color: transparent;
          font-family: inherit;
          box-sizing: border-box;
          padding: 0;
          outline: none;
          resize: none;
          color: inherit;
        }

        a:focus-visible,
        button:focus-visible,
        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible,
        [tabindex]:not([tabindex="-1"]):focus-visible {
          outline: 3px solid ${theme.scheme === "dark"
            ? theme.colors.blue8
            : theme.colors.blue7};
          outline-offset: 2px;
          border-radius: 0.5rem;
        }

        hr {
          width: 100%;
          border: none;
          margin: 0;
          border-top: 1px solid ${theme.colors.gray6};
        }
      `}
    />
  )
}
