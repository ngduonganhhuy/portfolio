import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TWITTER,
  SITE_URL,
} from "@/data/site";

export const DEFAULT_SEO = {
  title: `${SITE_NAME} | Flutter & Mobile Developer Portfolio`,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  image: SITE_OG_IMAGE,
  type: "website",
};

export function getKeywords(extraKeywords = []) {
  return [...new Set([...SITE_KEYWORDS, ...extraKeywords])].join(", ");
}

export function getSeoTitle(title) {
  return title ? `${title} | ${SITE_NAME}` : DEFAULT_SEO.title;
}

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_AUTHOR,
    alternateName: SITE_NAME,
    url: SITE_URL,
    image: SITE_OG_IMAGE,
    jobTitle: "Mobile Developer",
    knowsAbout: [
      "Flutter",
      "Dart",
      "React Native",
      "Clean Architecture",
      "Flutter Boilerplate",
      "Starter Projects",
      "Cross-platform Mobile Development",
      "Software Architecture",
    ],
    sameAs: [
      "https://github.com/ngduonganhhuy",
      "https://www.linkedin.com/in/ngduonganhhuy/",
    ],
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    author: getPersonJsonLd(),
  };
}

export function getBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getTwitterSite() {
  return SITE_TWITTER;
}
