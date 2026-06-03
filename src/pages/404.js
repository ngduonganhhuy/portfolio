import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found | Holmes</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main className="flex w-full flex-col items-center justify-center min-h-screen dark:text-light">
        <Layout className="pt-16 flex flex-col items-center">
          <AnimatedText
            text="404"
            className="!text-[12rem] lg:!text-[8rem] sm:!text-[5rem] !leading-none mb-4"
          />
          <AnimatedText
            text="Page Not Found"
            className="!text-4xl sm:!text-2xl mb-8"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-lg text-dark/75 dark:text-light/75 text-center max-w-md">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
              href="/"
              className="mt-4 flex items-center bg-dark text-light px-8 py-3 rounded-lg text-lg font-semibold
              hover:bg-light hover:text-dark border border-solid border-transparent hover:border-dark
              dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light
              transition-colors duration-200"
            >
              Back to Home
            </Link>
          </motion.div>
        </Layout>
      </main>
    </>
  );
}
