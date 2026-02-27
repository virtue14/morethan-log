import React from "react"
import { Icon as IconifyIcon } from "@iconify/react"
import type { IconifyIcon as IconifyIconData } from "@iconify/types"
import helpCircleOutline from "@iconify-icons/mdi/help-circle-outline"
import aws from "@iconify-icons/mdi/aws"
import type { LucideIcon } from "lucide-react"
import { Hexagon, Layers, Network, Rocket } from "lucide-react"
import type { SimpleIcon } from "simple-icons"
import {
  siDiscord,
  siExpo,
  siGithubactions,
  siKakao,
  siSentry,
  siSpringsecurity,
  siThymeleaf,
} from "simple-icons"

export type IconMeta = {
  alt: string
  color?: string
  icon:
    | { library: "image"; value: { src: string } }
    | { library: "simple"; value: SimpleIcon }
    | { library: "lucide"; value: LucideIcon }
    | { library: "iconify"; value: IconifyIconData }
}

export type IconCategory =
  | "language"
  | "framework"
  | "database"
  | "architecture"
  | "testing"
  | "apiAndIntegration"
  | "devOpsAndObservability"
  | "cloud"
  | "collaboration"

export const ICON_CATEGORY_LABELS: Record<IconCategory, string> = {
  language: "Language",
  framework: "Framework",
  database: "Database",
  architecture: "Architecture",
  testing: "Testing",
  apiAndIntegration: "API & Integration",
  devOpsAndObservability: "DevOps & Observability",
  cloud: "Cloud",
  collaboration: "Collaboration",
}

const createSimpleIconMeta = (value: SimpleIcon, alt: string): IconMeta => ({
  alt,
  icon: { library: "simple", value },
})

const createImageIconMeta = (src: string, alt: string): IconMeta => ({
  alt,
  icon: { library: "image", value: { src } },
})

const createLucideIconMeta = (
  value: LucideIcon,
  alt: string,
  color?: string
): IconMeta => ({
  alt,
  color,
  icon: { library: "lucide", value },
})

const createIconifyIconMeta = (
  value: IconifyIconData,
  alt: string,
  color?: string
): IconMeta => ({
  alt,
  color,
  icon: { library: "iconify", value },
})

const EXTERNAL_ICON_SOURCES = {
  oauth2: "https://oauth.net/images/oauth-2-sm.png",
  jwt: "https://jwt.io/img/pic_logo.svg",
  openWeatherMap:
    "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_32x32.png",
  openai: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  slack:
    "https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png",
  miro: "/icons/brands/miro-icon.svg",
  kotlin: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
  html5: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  css3: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  javascript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  typescript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  figma:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  jenkins:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg",
  logstash:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/logstash/logstash-original.svg",
  elasticsearch:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg",
  chrome:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg",
  springBoot: "https://spring.io/img/projects/spring-boot.svg",
  spring:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
  react:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  vue:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
  flutter:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
  nextjs:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  mariadb:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg",
  mysql:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  postgresql:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  redis:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  mongodb:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  selenium:
    "https://www.svgrepo.com/show/354321/selenium.svg",
  junit:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/junit/junit-original.svg",
  swagger:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg",
  docker:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  kafka:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg",
  prometheus:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg",
  grafana:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg",
  kubernetes:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
  github:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  notion:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg",
  jira:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg",
  googleStorage: "/icons/brands/google-storage.svg",
  wanted: "https://www.wanted.co.kr/brandcenter/assets/img/logo/2/pc/1-1.png",
  springData: "https://spring.io/img/projects/spring-data.svg",
  springCloud: "https://spring.io/img/projects/spring-cloud.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  kotest: "https://kotest.io/img/logo.png",
  mockito:
    "https://raw.githubusercontent.com/mockito/mockito.github.io/master/img/logo%402x.png",
  oracleCloud:
    "https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1610429880/noticon/dpxowdqcrxyipzhsb0y1.png",
  awsElasticBeanstalk:
    "https://a.b.cdn.console.awsstatic.com/a/v1/WWHSRL5VGMSHMYFU2N56KMDGDT3LKEEACUMREKPRNIFSVSN65XYA/icon/d43b67a293d39d11b046bd1813c804cb-4bc0ce71c93950e1ad695b25a4f1d4b5.svg",
  awsEc2:
    "https://a.b.cdn.console.awsstatic.com/a/v1/RHSMMGZKYJXPPNI2IOC6Z63HJEW4FD5ZYMKJSXD7HQ5IPUTQR2TQ/icon/d88319dfa5d204f019b4284149886c59-7d586ea82f792b61a8c87de60565133d.svg",
  awsRoute53:
    "https://a.b.cdn.console.awsstatic.com/a/v1/HNYUD5LSRDESBT7YPQWDDWYOM2WXFQZBY44MBW4XDC4S2NIYAG4Q/icon/f5d2c00d40914bff4f82f29f9ef768bc-53a84099cf556710383a52b4612a8612.svg",
  awsS3:
    "https://a.b.cdn.console.awsstatic.com/a/v1/DKY2SIL5N3MJQCULDNOQE7TKLNQIUXRSOHBJKJGQAHLZO7TLH3TQ/icon/c0828e0381730befd1f7a025057c74fb-43acc0496e64afba82dbc9ab774dc622.svg",
  awsAuroraRds:
    "https://a.b.cdn.console.awsstatic.com/a/v1/6JW3RZSXOZ4EFR2HZBU6IIOCUZEIFKRK6JZDCUDHQVQXRMAORYWQ/icon/1d374ed2a6bcf601d7bfd4fc3dfd3b5d-c9f69416d978016b3191175f35e59226.svg",
} as const

export const ICON_CATALOG_GROUPS: Record<IconCategory, Record<string, IconMeta>> = {
  language: {
    "Kotlin": createImageIconMeta(EXTERNAL_ICON_SOURCES.kotlin, "Kotlin Logo"),
    "Java": createImageIconMeta(EXTERNAL_ICON_SOURCES.java, "Java Logo"),
    "HTML": createImageIconMeta(EXTERNAL_ICON_SOURCES.html5, "HTML5 Logo"),
    "CSS": createImageIconMeta(EXTERNAL_ICON_SOURCES.css3, "CSS Logo"),
    "JavaScript": createImageIconMeta(
      EXTERNAL_ICON_SOURCES.javascript,
      "JavaScript Logo"
    ),
    "TypeScript": createImageIconMeta(
      EXTERNAL_ICON_SOURCES.typescript,
      "TypeScript Logo"
    ),
  },
  framework: {
    "Spring": createImageIconMeta(EXTERNAL_ICON_SOURCES.spring, "Spring Logo"),
    "Spring Boot": createImageIconMeta(
      EXTERNAL_ICON_SOURCES.springBoot,
      "Spring Boot Logo"
    ),
    "Spring Data JPA": createImageIconMeta(
      EXTERNAL_ICON_SOURCES.springData,
      "Spring Data JPA Logo"
    ),
    "Spring Security": createSimpleIconMeta(siSpringsecurity, "Spring Security Logo"),
    "Spring Cloud": createImageIconMeta(
      EXTERNAL_ICON_SOURCES.springCloud,
      "Spring Cloud Logo"
    ),
    "React": createImageIconMeta(EXTERNAL_ICON_SOURCES.react, "React Logo"),
    "React Native": createImageIconMeta(EXTERNAL_ICON_SOURCES.react, "React Native Logo"),
    "Expo": createSimpleIconMeta(siExpo, "Expo Logo"),
    "Vue": createImageIconMeta(EXTERNAL_ICON_SOURCES.vue, "Vue Logo"),
    "Thymeleaf": createSimpleIconMeta(siThymeleaf, "Thymeleaf Logo"),
    "Flutter": createImageIconMeta(EXTERNAL_ICON_SOURCES.flutter, "Flutter Logo"),
    "Next.js": createImageIconMeta(EXTERNAL_ICON_SOURCES.nextjs, "Next.js Logo"),
  },
  database: {
    "MariaDB": createImageIconMeta(EXTERNAL_ICON_SOURCES.mariadb, "MariaDB Logo"),
    "MySQL": createImageIconMeta(EXTERNAL_ICON_SOURCES.mysql, "MySQL Logo"),
    "PostgreSQL": createImageIconMeta(
      EXTERNAL_ICON_SOURCES.postgresql,
      "PostgreSQL Logo"
    ),
    "Redis": createImageIconMeta(EXTERNAL_ICON_SOURCES.redis, "Redis Logo"),
    "MongoDB": createImageIconMeta(EXTERNAL_ICON_SOURCES.mongodb, "MongoDB Logo"),
    "Elastic Search": createImageIconMeta(
      EXTERNAL_ICON_SOURCES.elasticsearch,
      "Elastic Search Logo"
    ),
  },
  architecture: {
    "Microservices Architecture(MSA)": createLucideIconMeta(
      Network,
      "Microservices Architecture Logo",
      "#60A5FA"
    ),
    "Hexagonal Architecture": createLucideIconMeta(
      Hexagon,
      "Hexagonal Architecture Logo",
      "#A78BFA"
    ),
    "Layered Architecture": createLucideIconMeta(
      Layers,
      "Layered Architecture Logo",
      "#38BDF8"
    ),
  },
  testing: {
    "Selenium": createImageIconMeta(EXTERNAL_ICON_SOURCES.selenium, "Selenium Logo"),
    "Chrome Driver": createImageIconMeta(
      EXTERNAL_ICON_SOURCES.chrome,
      "Chrome Driver Logo"
    ),
    "JUnit": createImageIconMeta(EXTERNAL_ICON_SOURCES.junit, "JUnit Logo"),
    "Kotest": createImageIconMeta(EXTERNAL_ICON_SOURCES.kotest, "Kotest Logo"),
    "Mockito": createImageIconMeta(EXTERNAL_ICON_SOURCES.mockito, "Mockito Logo"),
  },
  apiAndIntegration: {
    "Oauth2.0": createImageIconMeta(EXTERNAL_ICON_SOURCES.oauth2, "OAuth Logo"),
    "JWT": createImageIconMeta(EXTERNAL_ICON_SOURCES.jwt, "JWT Logo"),
    "Swagger": createImageIconMeta(EXTERNAL_ICON_SOURCES.swagger, "Swagger Logo"),
    "OpenWeatherMap": createImageIconMeta(
      EXTERNAL_ICON_SOURCES.openWeatherMap,
      "OpenWeatherMap Logo"
    ),
    "OpenAI": createImageIconMeta(EXTERNAL_ICON_SOURCES.openai, "OpenAI Logo"),
    "Kakao Map": createSimpleIconMeta(siKakao, "Kakao Map Logo"),
  },
  devOpsAndObservability: {
    "Docker": createImageIconMeta(EXTERNAL_ICON_SOURCES.docker, "Docker Logo"),
    "GitHub Actions": createSimpleIconMeta(
      siGithubactions,
      "GitHub Actions Logo"
    ),
    "Jenkins": createImageIconMeta(EXTERNAL_ICON_SOURCES.jenkins, "Jenkins Logo"),
    "Kafka": createImageIconMeta(EXTERNAL_ICON_SOURCES.kafka, "Kafka Logo"),
    "Logstash": createImageIconMeta(EXTERNAL_ICON_SOURCES.logstash, "Logstash Logo"),
    "Prometheus": createImageIconMeta(EXTERNAL_ICON_SOURCES.prometheus, "Prometheus Logo"),
    "Grafana": createImageIconMeta(EXTERNAL_ICON_SOURCES.grafana, "Grafana Logo"),
    "Sentry": createSimpleIconMeta(siSentry, "Sentry Logo"),
    "Kubernetes": createImageIconMeta(EXTERNAL_ICON_SOURCES.kubernetes, "Kubernetes Logo"),
    "Deploy": createLucideIconMeta(Rocket, "Deploy Logo", "#818CF8"),
  },
  cloud: {
    "AWS": createIconifyIconMeta(aws, "AWS Logo", "#FF9900"),
    "Oracle Cloud": createImageIconMeta(
      EXTERNAL_ICON_SOURCES.oracleCloud,
      "Oracle Cloud Logo"
    ),
    "Google Storage": createImageIconMeta(
      EXTERNAL_ICON_SOURCES.googleStorage,
      "Google Cloud Storage Logo"
    ),
    "AWS Elastic Beanstalk": createImageIconMeta(
      EXTERNAL_ICON_SOURCES.awsElasticBeanstalk,
      "AWS Elastic Beanstalk Logo"
    ),
    "AWS EC2": createImageIconMeta(EXTERNAL_ICON_SOURCES.awsEc2, "AWS EC2 Logo"),
    "AWS Route 53": createImageIconMeta(
      EXTERNAL_ICON_SOURCES.awsRoute53,
      "AWS Route 53 Logo"
    ),
    "AWS S3": createImageIconMeta(EXTERNAL_ICON_SOURCES.awsS3, "AWS S3 Logo"),
    "AWS Aurora and RDS": createImageIconMeta(
      EXTERNAL_ICON_SOURCES.awsAuroraRds,
      "AWS Aurora and RDS Logo"
    ),
  },
  collaboration: {
    "GitHub": createImageIconMeta(EXTERNAL_ICON_SOURCES.github, "GitHub Logo"),
    "Slack": createImageIconMeta(EXTERNAL_ICON_SOURCES.slack, "Slack Logo"),
    "Notion": createImageIconMeta(EXTERNAL_ICON_SOURCES.notion, "Notion Logo"),
    "Figma": createImageIconMeta(EXTERNAL_ICON_SOURCES.figma, "Figma Logo"),
    "Miro": createImageIconMeta(EXTERNAL_ICON_SOURCES.miro, "Miro Logo"),
    "Wanted": createImageIconMeta(EXTERNAL_ICON_SOURCES.wanted, "Wanted Logo"),
    "Discord": createSimpleIconMeta(siDiscord, "Discord Logo"),
    "JIRA": createImageIconMeta(EXTERNAL_ICON_SOURCES.jira, "JIRA Logo"),
  },
}

export const ICON_CATALOG: Record<string, IconMeta> = (
  Object.values(ICON_CATALOG_GROUPS) as Record<string, IconMeta>[]
).reduce<Record<string, IconMeta>>((acc, group) => {
  Object.assign(acc, group)
  return acc
}, {})

const normalizeIconName = (value: string): string =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "")

const ICON_ALIASES: Record<string, string> = {
  msa: "Microservices Architecture(MSA)",
  oauth2: "Oauth2.0",
  oauth20: "Oauth2.0",
  route53: "AWS Route 53",
  awsroute53: "AWS Route 53",
  amazonroute53: "AWS Route 53",
  s3: "AWS S3",
  awss3: "AWS S3",
  amazons3: "AWS S3",
  awss3bucket: "AWS S3",
  rds: "AWS Aurora and RDS",
  awsrds: "AWS Aurora and RDS",
  awsaurora: "AWS Aurora and RDS",
  awselasticbeanstalk: "AWS Elastic Beanstalk",
  amazonwebservices: "AWS",
  oci: "Oracle Cloud",
  oracle: "Oracle Cloud",
  oraclecloudinfrastructure: "Oracle Cloud",
  java8: "Java",
  java11: "Java",
  java17: "Java",
  java21: "Java",
  mokito: "Mockito",
  mockitoframework: "Mockito",
  kotestframework: "Kotest",
  wanted: "Wanted",
  elasticsearch: "Elastic Search",
  apachekafka: "Kafka",
  jpa: "Spring Data JPA",
  springjpa: "Spring Data JPA",
  springdatajpa: "Spring Data JPA",
  springframework: "Spring",
  springcore: "Spring",
  reactnative: "React Native",
}

const NORMALIZED_ICON_CATALOG = Object.entries(ICON_CATALOG).reduce<
  Record<string, IconMeta>
>((acc, [name, meta]) => {
  acc[normalizeIconName(name)] = meta
  return acc
}, {})

const getResolvedIconMeta = (name: string): IconMeta | undefined => {
  const normalized = normalizeIconName(name)
  const aliasedName = ICON_ALIASES[normalized]

  if (aliasedName) {
    return ICON_CATALOG[aliasedName]
  }

  return NORMALIZED_ICON_CATALOG[normalized]
}

const FALLBACK_ICON_META = createIconifyIconMeta(
  helpCircleOutline,
  "Unknown Tech Logo"
)

const UNMAPPED_ICON_NAMES = new Set<string>()

export const hasIcon = (name: string) => Boolean(getResolvedIconMeta(name))

export const getIconMeta = (name: string): IconMeta => {
  const resolved = getResolvedIconMeta(name)
  if (resolved) {
    return resolved
  }

  if (process.env.NODE_ENV !== "production") {
    const normalized = normalizeIconName(name)
    if (!UNMAPPED_ICON_NAMES.has(normalized)) {
      UNMAPPED_ICON_NAMES.add(normalized)
      console.warn(`[TechIcon] unmapped tag: "${name}"`)
    }
  }

  return FALLBACK_ICON_META
}

type TechIconProps = {
  name: string
  width?: string
  height?: string
  className?: string
  title?: string
}

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  width,
  height,
  className,
  title,
}) => {
  const { alt, color, icon } = getIconMeta(name)
  const resolvedLabel = title ?? name
  const resolvedWidth = width ?? "100%"
  const resolvedHeight = height ?? "100%"

  if (icon.library === "image") {
    return (
      <img
        src={icon.value.src}
        alt={resolvedLabel}
        className={className}
        loading="lazy"
        decoding="async"
        style={{ width: resolvedWidth, height: resolvedHeight }}
      />
    )
  }

  if (icon.library === "simple") {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        aria-label={alt}
        className={className}
        style={{ width: resolvedWidth, height: resolvedHeight }}
      >
        <title>{resolvedLabel}</title>
        <path d={icon.value.path} fill={`#${icon.value.hex}`} />
      </svg>
    )
  }

  if (icon.library === "lucide") {
    const LucideIconComponent = icon.value
    return (
      <LucideIconComponent
        aria-label={resolvedLabel}
        className={className}
        style={{ width: resolvedWidth, height: resolvedHeight, color }}
        strokeWidth={1.8}
      />
    )
  }

  return (
    <IconifyIcon
      icon={icon.value}
      aria-label={resolvedLabel}
      className={className}
      style={{ width: resolvedWidth, height: resolvedHeight, color }}
    />
  )
}
