import React, { ReactNode } from "react"

interface IconProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

const IconWrapper: React.FC<IconProps> = ({ src, alt, width = "1.25rem", height = "1.25rem" }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width, height }}
    />
  )
}


export const ICONS: { [key: string]: ReactNode } = {
  // Backend
  "Java": <IconWrapper
    src="https://www.svgrepo.com/show/452234/java.svg"
    alt="Java Logo"
  />,
  "Spring Boot": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1583139980/noticon/vtzecmjzn39cifnjtonx.png"
    alt="Spring Boot Logo"
  />,
  "Spring Data JPA": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1741217250/noticon/iqqqbtkh6ybpkvz0opnm.png"
    alt="Spring Data JPA Logo"
  />,
  "Spring Security": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1686935854/noticon/r7w1ipwmdmhlfzqfw69h.png"
    alt="Spring Security Logo"
  />,
  "Spring Cloud": <IconWrapper
    src="https://spring.io/img/projects/spring-cloud.svg"
    alt="Spring Cloud Logo"
  />,
  "Selenium": <IconWrapper
    src="https://www.svgrepo.com/show/354321/selenium.svg"
    alt="Selenium Logo"
  />,
  "Chrome Driver": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566915196/noticon/rz3wogtdk6lbpejrxsbp.png"
    alt="Chrome Logo"
  />,
  "Google Storage": <IconWrapper
    src="https://k21academy.com/wp-content/uploads/2021/02/Google-Cloud-Storage-logo-1024x1024.png"
    alt="Google Cloud Storage Logo"
  />,
  "Oauth2.0": <IconWrapper
    src="https://oauth.net/images/oauth-2-sm.png"
    alt="OAuth Logo"
  />,

  // Frontend
  "HTML": <IconWrapper
    src="https://www.svgrepo.com/show/452228/html-5.svg"
    alt="HTML5 Logo"
  />,
  "CSS": <IconWrapper
    src="https://www.svgrepo.com/show/452185/css-3.svg"
    alt="CSS3 Logo"
  />,
  "JavaScript": <IconWrapper
    src="https://www.svgrepo.com/show/452045/js.svg"
    alt="JavaScript Logo"
  />,
  "VueJS": <IconWrapper
    src="https://www.svgrepo.com/show/452130/vue.svg"
    alt="Vue.js Logo"
  />,

  // Database
  "MariaDB": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566920129/noticon/r9gn1ilil1r8ar4w59dj.png"
    alt="MariaDB Logo"
  />,

  // Architecture
  "Microservices Architecture(MSA)": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1693318359/noticon/lvlbunsvuzy8hptgelpn.png"
    alt="MSA Logo"
  />,

  // API
  "Swagger": <IconWrapper
    src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.21.0/favicon-32x32.png"
    alt="Swagger Logo"
  />,
  "OpenWeatherMap API": <IconWrapper
    src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_32x32.png"
    alt="OpenWeatherMap Logo"
  />,

  // Testing
  "JUnit": <IconWrapper
    src="https://junit.org/junit5/assets/img/junit5-logo.png"
    alt="JUnit Logo"
  />,

  // Collaboration
  "GitHub": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566899596/noticon/slhw4nu8hybreryigopq.png"
    alt="GitHub Logo"
  />,
  "Slack": <IconWrapper
    src="https://www.svgrepo.com/show/452102/slack.svg"
    alt="Slack Logo"
  />,
  "Notion": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1570106347/noticon/hx52ypkqqdzjdvd8iaid.svg"
    alt="Notion Logo"
  />,
  "Figma": <IconWrapper
    src="https://www.svgrepo.com/show/452202/figma.svg"
    alt="Figma Logo"
  />,
  "Miro": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1628594643/noticon/lk9utdmbhqqm6mcrsj2j.png"
    alt="Miro Logo"
  />,

  // Link Icons
  "Deploy": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1590043914/noticon/xe5nasyjil6mn6vk8c4s.png"
    alt="Deploy Logo"
  />,
} 