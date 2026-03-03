import styled from "@emotion/styled"
import React, { useEffect, useRef, useState } from "react"
import {
  AiFillLinkedin,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai"
import { CONFIG } from "site.config"
import { Emoji } from "src/components/Emoji"

type CopyState = "idle" | "success" | "error"

const ContactCard: React.FC = () => {
  const [copyState, setCopyState] = useState<CopyState>("idle")
  const copiedTimerRef = useRef<number | null>(null)

  const handleCopyEmail = async () => {
    const email = CONFIG.profile.email
    if (!email) {
      return
    }

    let copied = false
    try {
      await navigator.clipboard.writeText(email)
      copied = true
    } catch (error) {
      try {
        const textarea = document.createElement("textarea")
        textarea.value = email
        textarea.style.position = "fixed"
        textarea.style.opacity = "0"
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        copied = document.execCommand("copy")
        document.body.removeChild(textarea)
      } catch (fallbackError) {
        copied = false
      }
    }

    setCopyState(copied ? "success" : "error")
    if (copiedTimerRef.current) {
      window.clearTimeout(copiedTimerRef.current)
    }
    copiedTimerRef.current = window.setTimeout(() => {
      setCopyState("idle")
    }, 1800)
  }

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current) {
        window.clearTimeout(copiedTimerRef.current)
      }
    }
  }, [])

  return (
    <>
      <StyledTitle>
        <Emoji>💬</Emoji> Contact
      </StyledTitle>
      <StyledWrapper>
        {CONFIG.profile.github && (
          <a
            href={`https://github.com/${CONFIG.profile.github}`}
            rel="noreferrer"
            target="_blank"
          >
            <span className="icon-wrapper" aria-hidden>
              <AiOutlineGithub className="icon" />
            </span>
            <div className="name">github</div>
          </a>
        )}
        {CONFIG.profile.instagram && (
          <a
            href={`https://www.instagram.com/${CONFIG.profile.instagram}`}
            rel="noreferrer"
            target="_blank"
          >
            <span className="icon-wrapper" aria-hidden>
              <AiOutlineInstagram className="icon" />
            </span>
            <div className="name">instagram</div>
          </a>
        )}
        {CONFIG.profile.email && (
          <button
            type="button"
            onClick={handleCopyEmail}
            title={CONFIG.profile.email}
            css={{ overflow: "hidden" }}
          >
            <span className="icon-wrapper" aria-hidden>
              <AiOutlineMail className="icon" />
            </span>
            <div className="name-row">
              <div className="name">email</div>
              {copyState === "success" && (
                <div
                  role="status"
                  aria-live="polite"
                  className="copy-state"
                >
                  Copied
                </div>
              )}
            </div>
          </button>
        )}
        {CONFIG.profile.linkedin && (
          <a
            href={`https://www.linkedin.com/in/${CONFIG.profile.linkedin}`}
            rel="noreferrer"
            target="_blank"
          >
            <span className="icon-wrapper" aria-hidden>
              <AiFillLinkedin className="icon" />
            </span>
            <div className="name">linkedin</div>
          </a>
        )}
      </StyledWrapper>
    </>
  )
}

export default ContactCard

const StyledTitle = styled.div`
  padding: 0.25rem;
  margin-bottom: 0.75rem;
`
const StyledWrapper = styled.div`
  display: flex;
  padding: 0.25rem;
  flex-direction: column;
  border-radius: 1rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  a,
  button {
    display: grid;
    grid-template-columns: 1.5rem minmax(0, 1fr);
    padding: 0.75rem;
    gap: 0.75rem;
    align-items: center;
    border-radius: 1rem;
    color: ${({ theme }) => theme.colors.gray11};
    cursor: pointer;
    width: 100%;
    border: none;
    background: transparent;
    text-align: left;
    appearance: none;
    -webkit-appearance: none;

    :hover {
      color: ${({ theme }) => theme.colors.gray12};
      background-color: ${({ theme }) => theme.colors.gray5};
    }

    .icon-wrapper {
      width: 1.5rem;
      height: 1.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .icon {
      font-size: 1.5rem;
      line-height: 1;
    }
    .name {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .name-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: 0.5rem;
      min-width: 0;
    }

    .copy-state {
      font-size: 0.75rem;
      line-height: 1rem;
      padding: 0;
      border-radius: 9999px;
      font-weight: 600;
      flex-shrink: 0;
      color: ${({ theme }) =>
        theme.scheme === "light" ? "#166534" : "#dcfce7"};
    }
  }
`
