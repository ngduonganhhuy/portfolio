import Head from "next/head";
import Layout from "@/components/Layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import { getArticleBySlug, getAllSlugs } from "../../lib/article";

export default function ArticleDetail({ frontmatter, content }) {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
      </Head>

      <main className="w-full flex justify-center align-center dark:text-light">
        <Layout className="pt-16 max-w-5xl">
          {/* Cover */}
          {frontmatter.cover && (
            <Image
              src={frontmatter.cover}
              alt={frontmatter.title}
              width={1200}
              height={600}
              className="rounded-xl mb-8"
            />
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold mb-2">{frontmatter.title}</h1>

          <span className="text-primary text-sm">
            {frontmatter.date} · {frontmatter.time}
          </span>

          {/* Markdown preview */}
          <article className="prose prose-lg  dark:prose-invert max-w-none mt-8">
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
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug);

  return {
    props: article,
  };
}
