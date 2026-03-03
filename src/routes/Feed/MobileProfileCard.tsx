import { CONFIG } from "site.config"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import {
  AiFillLinkedin,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai"

type Props = {
  className?: string
}

type CopyState = "idle" | "success" | "error"

const MobileProfileCard: React.FC<Props> = () => {
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
    } catch {
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
      } catch {
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
    <StyledWrapper>
      <div className="mid">
        <div className="wrapper">
          <Image
            src={CONFIG.profile.image}
            width={90}
            height={90}
            css={{ position: "relative" }}
            alt={`${CONFIG.profile.name} profile image`}
          />
          <div className="wrapper">
            <div className="top">{CONFIG.profile.name}</div>
            <div className="mid">{CONFIG.profile.role}</div>
            <div className="btm">{CONFIG.profile.bio}</div>
          </div>
        </div>
        <div className="contacts" aria-label="연락처">
          {CONFIG.profile.github && (
            <a
              href={`https://github.com/${CONFIG.profile.github}`}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <AiOutlineGithub />
            </a>
          )}
          {CONFIG.profile.instagram && (
            <a
              href={`https://www.instagram.com/${CONFIG.profile.instagram}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <AiOutlineInstagram />
            </a>
          )}
          {CONFIG.profile.email && (
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="이메일 복사"
              title={CONFIG.profile.email}
            >
              <AiOutlineMail />
              {copyState === "success" && <span className="copy-state">Copied</span>}
            </button>
          )}
          {CONFIG.profile.linkedin && (
            <a
              href={`https://www.linkedin.com/in/${CONFIG.profile.linkedin}`}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <AiFillLinkedin />
            </a>
          )}
        </div>
      </div>
    </StyledWrapper>
  )
}

export default MobileProfileCard

const StyledWrapper = styled.div`
  display: block;

  @media (min-width: 1024px) {
    display: none;
  }

  > .mid {
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    > .wrapper {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      > .wrapper {
        height: fit-content;
        > .top {
          font-size: 1.25rem;
          line-height: 1.75rem;
          font-style: italic;
          font-weight: 700;
        }
        > .mid {
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: ${({ theme }) => theme.colors.gray11};
        }
        > .btm {
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
      }
    }

    .contacts {
      margin-top: 0.75rem;
      padding-top: 0.75rem;
      border-top: 1px solid ${({ theme }) => theme.colors.gray6};
      display: flex;
      align-items: center;
      gap: 0.375rem;

      a,
      button {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 9999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: ${({ theme }) => theme.colors.gray11};
        border: none;
        background: transparent;
        position: relative;
        padding: 0;

        &:hover {
          color: ${({ theme }) => theme.colors.gray12};
          background: ${({ theme }) => theme.colors.gray5};
        }

        svg {
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      .copy-state {
        position: absolute;
        bottom: -1.25rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.6875rem;
        line-height: 1;
        font-weight: 700;
        color: ${({ theme }) =>
          theme.scheme === "light" ? "#166534" : "#dcfce7"};
        white-space: nowrap;
      }
    }
  }
`
