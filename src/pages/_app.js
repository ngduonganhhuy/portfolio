import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";

const DogCursor = dynamic(() => import("@/components/DogCursor"), { ssr: false });
const IntroOverlay = dynamic(() => import("@/components/IntroOverlay"), { ssr: false });

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="WPQ-Hwe1ebuIznz2anSsPjojb2FaRTGCH12qTPrELME" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen`}>
        <IntroOverlay />
        <DogCursor />
        <NavBar />
        <AnimatePresence mode="wait">
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
}
