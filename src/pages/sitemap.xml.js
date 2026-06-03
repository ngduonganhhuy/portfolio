import { SITE_URL } from "@/data/site";
import { getAllSlugs } from "@/lib/article";

const STATIC_ROUTES = [
  "",
  "/about",
  "/projects",
  "/articles",
  "/ebooks",
  "/extensions",
];

function buildSitemap(routes) {
  const lastmod = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route === "" ? "weekly" : "monthly"}</changefreq>
    <priority>${route === "" ? "1.0" : "0.8"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const articleRoutes = getAllSlugs().map((slug) => `/articles/${slug}`);
  const sitemap = buildSitemap([...STATIC_ROUTES, ...articleRoutes]);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
