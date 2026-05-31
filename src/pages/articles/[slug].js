import Layout from "@/components/Layout";
import { SITE_AUTHOR, SITE_NAME, SITE_TWITTER, SITE_URL } from "@/data/site";
import { getAllSlugs, getArticleBySlug } from "@/lib/article";
import Head from "next/head";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

export default function ArticleDetail({ frontmatter, content, slug }) {
  const canonicalUrl = `${SITE_URL}/articles/${slug}`;
  const ogImage = frontmatter.cover
    ? `${SITE_URL}${frontmatter.cover}`
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: SITE_URL,
    },
    url: canonicalUrl,
    ...(ogImage && { image: ogImage }),
    ...(frontmatter.tags && { keywords: frontmatter.tags.join(", ") }),
  };

  return (
    <>
      <Head>
        <title>{`${frontmatter.title} | ${SITE_NAME}`}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:site_name" content={SITE_NAME} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogImage && <meta property="og:image:width" content="1200" />}
        {ogImage && <meta property="og:image:height" content="600" />}
        {frontmatter.date && (
          <meta property="article:published_time" content={frontmatter.date} />
        )}
        {frontmatter.tags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SITE_TWITTER} />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="w-full flex justify-center dark:text-light">
        <Layout className="pt-16 max-w-5xl">
          {frontmatter.cover && (
            <Image
              src={frontmatter.cover}
              alt={frontmatter.title}
              width={1200}
              height={600}
              className="rounded-xl mb-8"
              priority
            />
          )}

          <h1 className="text-4xl font-bold mb-2">{frontmatter.title}</h1>

          <span className="text-primary text-sm">
            {frontmatter.date} · {frontmatter.time}
          </span>

          {frontmatter.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-dark/10 dark:bg-light/10 text-dark dark:text-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <article className="prose prose-lg dark:prose-invert max-w-none mt-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {content}
            </ReactMarkdown>
          </article>
        </Layout>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug);
  return { props: article };
}
