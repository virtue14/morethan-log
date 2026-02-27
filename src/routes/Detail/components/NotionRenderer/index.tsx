import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { NotionRenderer as _NotionRenderer } from "react-notion-x"
import useScheme from "src/hooks/useScheme"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"

// used for rendering equations (optional)

import "katex/dist/katex.min.css"
import { FC, useEffect } from "react"
import styled from "@emotion/styled"

const loadPrismLanguages = () =>
  Promise.all([
    import("prismjs/components/prism-markup-templating"),
    import("prismjs/components/prism-markup"),
    import("prismjs/components/prism-bash"),
    import("prismjs/components/prism-diff"),
    import("prismjs/components/prism-git"),
    import("prismjs/components/prism-go"),
    import("prismjs/components/prism-java"),
    import("prismjs/components/prism-js-templates"),
    import("prismjs/components/prism-jsx"),
    import("prismjs/components/prism-json"),
    import("prismjs/components/prism-markdown"),
    import("prismjs/components/prism-python"),
    import("prismjs/components/prism-rust"),
    import("prismjs/components/prism-sql"),
    import("prismjs/components/prism-typescript"),
    import("prismjs/components/prism-tsx"),
    import("prismjs/components/prism-yaml"),
  ])

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
)

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  recordMap: Parameters<typeof import("react-notion-x")["NotionRenderer"]>[0]["recordMap"]
}

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme()

  useEffect(() => {
    let mounted = true

    const highlight = async () => {
      try {
        const prismModule = await import("prismjs")
        const Prism = prismModule.default ?? prismModule
        await loadPrismLanguages()
        if (!mounted) {
          return
        }

        Prism.highlightAll()
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Prism highlight skipped:", error)
        }
      }
    }

    void highlight()

    return () => {
      mounted = false
    }
  }, [recordMap])

  return (
    <StyledWrapper>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={recordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        mapPageUrl={mapPageUrl}
      />
    </StyledWrapper>
  )
}

export default NotionRenderer

const StyledWrapper = styled.div`
  /* // TODO: why render? */
  .notion-collection-page-properties {
    display: none !important;
  }
  .notion-page {
    padding: 0;
  }
  .notion-list {
    width: 100%;
  }
  
  /* Add styles for horizontal rule */
  .css-776fao,
  hr,
  .notion-hr {
    margin: 2em 0;
    border: none;
    border-top: 1px solid #9E9E9E;
    width: 100%;
  }

  /* Dark mode support */
  [data-scheme='dark'] & {
    .css-776fao,
    hr,
    .notion-hr {
      border-top-color: #787878;
    }
  }
`
