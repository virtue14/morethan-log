/**
 * @param {string | undefined} url
 */
const ensureAbsoluteUrl = (url) => {
  if (!url) return ""
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url
  }
  return `https://${url}`
}

/**
 * @param {string} url
 */
const removeTrailingSlash = (url) => url.replace(/\/+$/, "")

const SITE_URL = removeTrailingSlash(
  ensureAbsoluteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_URL ||
      "http://localhost:3000"
  )
)

const CONFIG = {
  // profile setting (required)
  profile: {
    name: "Noah",
    image: "/noah.png", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "Backend Developer",
    bio: "항상 꾸준함과 집요함으로",
    email: "gdpark.dev@gmail.com",
    github: "virtue14",
    linkedin: "virtue-gdpark",
    instagram: "virtue_gd",
  },
  projects: [
    {
      name: `올림 - 감정을 올리는 순간`,
      href: "https://github.com/MIL-LO",
    },
  ],
  // blog setting (required)
  blog: {
    title: "Project.zip",
    description: "나만의 프로젝트 모음집입니다.",
    scheme: "light", // 'light' | 'dark' | 'system'
  },

  // CONFIG configration (required)
  link: SITE_URL,
  since: 2025, // If leave this empty, current year will be used.
  lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: `${SITE_URL}/noah.png`,

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: false,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 21600, // 6시간, revalidate time for [slug], index
}

module.exports = { CONFIG }
