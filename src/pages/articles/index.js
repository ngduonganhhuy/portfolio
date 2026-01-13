import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import { motion, useMotionValue } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import article1 from "../../../public/images/articles/best_practice_writing_clean_code_with_flutter.webp";

const FramerImage = motion(Image);

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

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
      <h2 className="text-xl font-semibold hover:underline">
        {title}
      </h2>

      <FramerImage
        ref={imgRef}
        src={img}
        alt={title}
        style={{ x, y }}
        initial={{ opacity: 0 }}
        className="pointer-events-none absolute z-10 w-80 rounded-lg"
      />
    </Link>
  );
};

const Article = ({ img, title, date, link }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="relative w-full p-4 py-6 my-4 rounded-xl flex items-center justify-between bg-light text-dark first:mt-0 border border-solid border-dark border-r-4 border-b-4 dark:border-light dark:bg-dark dark:text-light"
    >
      <MovingImg title={title} img={img} link={link} />
      <span className="text-primary dark:text-primaryDark font-semibold pl-4">
        {date}
      </span>
    </motion.li>
  );
};

const FeaturedArticle = ({ img, title, time, summary, link }) => {
  return (
    <li className="relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl dark:bg-dark dark:border-light">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl" />
      <Link
        href={link}
        className="w-full inline-block cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          priority
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          50vw"
        />
      </Link>
      <Link href={link}>
        <h2 className="capitalize text-2xl font-bold my-2 mt-4 hover:underline">
          {title}
        </h2>
      </Link>
      <p className="text-sm mb-2">{summary}</p>
      <span className="text-primary dark:text-primaryDark font-semibold">
        {time}
      </span>
    </li>
  );
};

const Articles = () => {
  const size = useWindowSize();
  return (
    <>
      <Head>
        <title>Holmes | Articles</title>
        <meta name="description" content="any description" />
      </Head>
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text={"Articles"}
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <ul className="grid grid-cols-2 gap-16 md:grid-cols-1">
            <FeaturedArticle
              img={article1}
              title={"Best practices writing Clean Code with Flutter 💻 🧑🏻‍💻"}
              summary={
                'Learn how to writing clean code with Flutter and can answer the question: "Why clean code with Flutter"'
              }
              time={"9 min read"}
              link={`/articles/clean-code-flutter`}
            />
            <FeaturedArticle
              img={article1}
              title={"Best practices writing Clean Code with Flutter 💻 🧑🏻‍💻"}
              summary={
                'Learn how to writing clean code with Flutter and can answer the question: "Why clean code with Flutter"'
              }
              time={"9 min read"}
              link={
                "/articles/clean-code-flutter"
              }
            />
          </ul>
          {size.width > 768 && (
            <>
              <h2 className="font-bold text-4xl w-full text-center my-16 mt-32">
                All Articles
              </h2>
              <ul>
                <Article
                  title={"Best practices writing Clean Code with Flutter 💻 🧑🏻‍💻"}
                  date={"October 30, 2023"}
                  link={`/articles/clean-code-flutter`}
                  img={article1}
                />
              </ul>
            </>
          )}
        </Layout>
      </main>
    </>
  );
};

export default Articles;
