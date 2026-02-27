import { CONFIG } from "site.config"
import Script from "next/script"
import { useEffect } from "react"
import styled from "@emotion/styled"
import useScheme from "src/hooks/useScheme"

type Props = {
  id: string
  slug: string
  title: string
}

const Cusdis: React.FC<Props> = ({ id, slug, title }) => {
  const [scheme] = useScheme()

  useEffect(() => {
    if (typeof window !== "undefined") {
      type CusdisWindow = Window & {
        CUSDIS?: {
          initial?: () => void
        }
      }
      const cusdis = (window as CusdisWindow).CUSDIS
      if (cusdis?.initial) {
        cusdis.initial()
      }
    }
  }, [id, slug, title, scheme])

  return (
    <>
      <StyledWrapper id="comments">
        <Script
          src={`${CONFIG.cusdis.config.host}/js/cusdis.es.js`}
          strategy="lazyOnload"
          onLoad={() => {
            if (typeof window !== "undefined") {
              type CusdisWindow = Window & {
                CUSDIS?: {
                  initial?: () => void
                }
              }
              const cusdis = (window as CusdisWindow).CUSDIS
              if (cusdis?.initial) {
                cusdis.initial()
              }
            }
          }}
        />
        <div
          id="cusdis_thread"
          data-host={CONFIG.cusdis.config.host}
          data-app-id={CONFIG.cusdis.config.appid}
          data-page-id={id}
          data-page-title={title}
          data-page-url={`${CONFIG.link}/${slug}`}
          data-theme={scheme}
        />
      </StyledWrapper>
    </>
  )
}

export default Cusdis

const StyledWrapper = styled.div`
  margin-top: 2.5rem;
`
