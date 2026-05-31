import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import { SITE_AUTHOR, SITE_NAME, SITE_OG_IMAGE, SITE_TWITTER, SITE_URL } from "@/data/site";
import { getAllArticles } from "@/lib/article";
import { motion, useMotionValue } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const PAGE_URL = `${SITE_URL}/articles`;
const PAGE_TITLE = `Articles | ${SITE_NAME}`;
const PAGE_DESCRIPTION = `Technical articles and insights on mobile development, Flutter, React Native, and software engineering by ${SITE_AUTHOR}.`;

const FramerImage = motion(Image);

const MovingImg = ({ title, img, link }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    imgRef.current.style.opacity = 1;
    x.set(e.pageX);
    y.set(-10);
  };

  const handleMouseLeave = () => {
    if (!imgRef.current) return;
    imgRef.current.style.opacity = 0;
    x.set(0);
    y.set(0);
  };

  return (
    <Link
      href={link}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <h2 className="text-xl font-semibold hover:underline">{title}</h2>
      <FramerImage
        ref={imgRef}
        src={img}
        alt={title}
        width={320}
        height={200}
        style={{ x, y }}
        initial={{ opacity: 0 }}
        className="pointer-events-none absolute z-10 w-80 rounded-lg"
      />
    </Link>
  );
};

const ArticleListItem = ({ cover, title, date, slug }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="relative w-full p-4 py-6 my-4 rounded-xl flex items-center justify-between bg-light text-dark first:mt-0 border border-solid border-dark border-r-4 border-b-4 dark:border-light dark:bg-dark dark:text-light"
    >
      <MovingImg title={title} img={cover} link={`/articles/${slug}`} />
      <span className="text-primary dark:text-primaryDark font-semibold pl-4">{date}</span>
    </motion.li>
  );
};

const FeaturedArticle = ({ cover, title, time, summary, slug }) => {
  return (
    <li className="relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl dark:bg-dark dark:border-light">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl" />
      <Link
        href={`/articles/${slug}`}
        className="w-full inline-block cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage
          src={cover}
          alt={title}
          width={800}
          height={400}
          className="w-full h-auto"
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </Link>
      <Link href={`/articles/${slug}`}>
        <h2 className="capitalize text-2xl font-bold my-2 mt-4 hover:underline">{title}</h2>
      </Link>
      <p className="text-sm mb-2">{summary}</p>
      <span className="text-primary dark:text-primaryDark font-semibold">{time}</span>
    </li>
  );
};

const Articles = ({ articles }) => {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={SITE_OG_IMAGE} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SITE_TWITTER} />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_OG_IMAGE} />
      </Head>
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Articles"
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <ul className="grid grid-cols-2 gap-16 md:grid-cols-1">
            {articles.map((article) => (
              <FeaturedArticle key={article.slug} {...article} />
            ))}
          </ul>
          <h2 className="font-bold text-4xl w-full text-center my-16 mt-32">
            All Articles
          </h2>
          <ul>
            {articles.map((article) => (
              <ArticleListItem key={article.slug} {...article} />
            ))}
          </ul>
        </Layout>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const articles = getAllArticles();
  return { props: { articles } };
}

export default Articles;
