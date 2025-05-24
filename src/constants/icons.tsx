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
  "Kotlin": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1635384696/noticon/t2v5vtq6gp7d0bgspmyh.png"
    alt="Kotlin Logo"
  />,
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
  "JWT": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1569654347/noticon/mdujedvj9w8c9rz9phny.png"
    alt="JWT Logo"
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
  "TypeScript": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913457/noticon/eh4d0dnic4n1neth3fui.png"
    alt="TypeScript Logo"
  />,
  "React": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566557331/noticon/d5hqar2idkoefh6fjtpu.png"
    alt="React Logo"
  />,
  "React Native": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1613069004/noticon/ugcstxkq5uzhbhknrr80.png"
    alt="React Native Logo"
  />,
  "Expo": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1614791745/noticon/kn284gq14vuajigbjeym.png"
    alt="Expo Logo"
  />,
  "Vue": <IconWrapper
    src="https://www.svgrepo.com/show/452130/vue.svg"
    alt="Vue Logo"
  />,
  "Thymeleaf": <IconWrapper
    src="https://www.thymeleaf.org/images/thymeleaf.png"
    alt="Thymeleaf Logo"
  />,

  // Database
  "MariaDB": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566920129/noticon/r9gn1ilil1r8ar4w59dj.png"
    alt="MariaDB Logo"
  />,
  "MySQL": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1603423163/noticon/az0cvs28lm7gxoowlsva.png"
    alt="MySQL Logo"
  />,
  "PostgreSQL": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913379/noticon/uiite75rxvkvcki3mr4u.png"
    alt="PostgreSQL Logo"
  />,
  "Redis": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913679/noticon/xlnsjihvjxllech0hawu.png"
    alt="Redis Logo"
  />,
  "MongoDB": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1581824691/noticon/hmvqgvug8zl7etwmabuq.png"
    alt="MongoDB Logo"
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
  "OpenWeatherMap": <IconWrapper
    src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_32x32.png"
    alt="OpenWeatherMap Logo"
  />,
  "OpenAI": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1715781781/noticon/imvwynltyfkcz4dsvw8v.png"
    alt="OpenAI Logo"
  />,

  // Testing
  "JUnit": <IconWrapper
    src="https://junit.org/junit5/assets/img/junit5-logo.png"
    alt="JUnit Logo"
  />,
  "Kotest": <IconWrapper
    src="https://kotest.io/img/logo.png"
    alt="Kotest Logo"
  />,
  "Mockito": <IconWrapper
    src="https://raw.githubusercontent.com/mockito/mockito.github.io/master/img/logo%402x.png"
    alt="Mockito Logo"
  />,

  // DevOps & Infra
  "Docker": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1698294991/noticon/seoaznmbzm3pcp2um3d3.png"
    alt="Docker Logo"
  />,
  "GitHub Actions": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1673248072/noticon/uj1sljza7nnsj0lpilwk.png"
    alt="GitHub Actions Logo"
  />,
  "Jenkins": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566778391/noticon/l0uiouhpeiq31huqu7ft.jpg"
    alt="Jenkins Logo"
  />,
  "Prometheus": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1629972087/noticon/uhlx0ddln1ygz7kxhkjw.png"
    alt="Prometheus Logo"
  />,
  "Grafana": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1616658979/noticon/lcugxam6owivokgw1psc.png"
    alt="Grafana Logo"
  />,
  "Sentry": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1600767958/noticon/qreyezxkjkizie43tguj.png"
    alt="Sentry Logo"
  />,
  "Kubernetes": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1643226154/noticon/wdbbwmhayat3eptf80zb.png"
    alt="Kubernetes Logo"
  />,
  "AWS": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1593063747/noticon/v54j0lavn52l6ff61sga.png"
    alt="AWS Logo"
  />,
  "Oracle Cloud": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1610429880/noticon/dpxowdqcrxyipzhsb0y1.png"
    alt="Oracle Cloud Logo"
  />,
  "AWS Elastic Beanstalk": <IconWrapper
    src="https://a.b.cdn.console.awsstatic.com/a/v1/WWHSRL5VGMSHMYFU2N56KMDGDT3LKEEACUMREKPRNIFSVSN65XYA/icon/d43b67a293d39d11b046bd1813c804cb-4bc0ce71c93950e1ad695b25a4f1d4b5.svg"
    alt="AWS Elastic Beanstalk Logo"
  />,
  "AWS EC2": <IconWrapper
    src="https://a.b.cdn.console.awsstatic.com/a/v1/RHSMMGZKYJXPPNI2IOC6Z63HJEW4FD5ZYMKJSXD7HQ5IPUTQR2TQ/icon/d88319dfa5d204f019b4284149886c59-7d586ea82f792b61a8c87de60565133d.svg"
    alt="AWS EC2 Logo"
  />,
  "AWS Route 53": <IconWrapper
    src="https://a.b.cdn.console.awsstatic.com/a/v1/HNYUD5LSRDESBT7YPQWDDWYOM2WXFQZBY44MBW4XDC4S2NIYAG4Q/icon/f5d2c00d40914bff4f82f29f9ef768bc-53a84099cf556710383a52b4612a8612.svg"
    alt="AWS Route 53 Logo"
  />,
  "AWS S3": <IconWrapper
    src="https://a.b.cdn.console.awsstatic.com/a/v1/DKY2SIL5N3MJQCULDNOQE7TKLNQIUXRSOHBJKJGQAHLZO7TLH3TQ/icon/c0828e0381730befd1f7a025057c74fb-43acc0496e64afba82dbc9ab774dc622.svg"
    alt="AWS S3 Logo"
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
  "Discord": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1640152045/noticon/albswwsjaaxvxbyhmwig.png"
    alt="Discord Logo"
  />,

  // Link Icons
  "Deploy": <IconWrapper
    src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1590043914/noticon/xe5nasyjil6mn6vk8c4s.png"
    alt="Deploy Logo"
  />,
}