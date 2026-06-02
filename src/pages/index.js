import AnimatedText from "@/components/AnimatedText";
import HireMe from "@/components/HireMe";
import { LinkArrow } from "@/components/Icon";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE_NAME, SITE_OG_IMAGE, SITE_TWITTER, SITE_URL } from "@/data/site";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import profilePic from "../../public/images/profile/face_focus.png";
import lightBulb from "../../public/images/svgs/miscellaneous_icons_1.svg";

export default function Home() {
  return (
    <>
      <Head>
        <title>{`${SITE_NAME} | Mobile Developer Portfolio`}</title>
        <meta name="description" content="Nguyen Duong Anh Huy — Mobile Developer specializing in Flutter and React Native. Building scalable, high-quality cross-platform apps." />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={`${SITE_NAME} | Mobile Developer Portfolio`} />
        <meta property="og:description" content="Mobile Developer specializing in Flutter and React Native. Building scalable, high-quality cross-platform apps." />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={SITE_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SITE_TWITTER} />
        <meta name="twitter:image" content={SITE_OG_IMAGE} />
      </Head>
      <main className="flex items-center text-dark w-full min-h-screen dark:text-light">
        <Layout className="pt-0 md:pt-16 sm:pt-8">
          <div className="flex items-center justify-between w-full lg:flex-col">
            <ScrollReveal variant="fadeLeft" className="w-1/3 md:w-1/2">
              <Image
                src={profilePic}
                alt="Holmes"
                className="w-full h-auto lg:hidden md:inline-block md:w-full"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            </ScrollReveal>

            <ScrollReveal
              variant="fadeRight"
              delay={0.15}
              className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center"
            >
              <AnimatedText
                text="Transforming Ideas into Immersive Mobile Experiences."
                className="!text-6xl !text-left xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl"
              />
              <p className="my-4 text-base font-medium md:text-sm sm:text-xs">
                As an aspiring Solution Architect and experienced Software
                Engineer, I am passionate about bridging business needs with
                technology solutions. I specialize in designing scalable
                architectures, leading technical decision-making, and delivering
                end-to-end software systems that drive business value. Through
                my projects and technical writings, I share insights on software
                architecture, system design, cloud-native applications, and
                modern engineering practices.
              </p>
              <div className="flex items-center self-start mt-2 lg:self-center">
                <Link
                  href="NguyenDuongAnhHuy_SoftwareEngineer.pdf"
                  target="_blank"
                  className="flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark
                  border border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base"
                  download={true}
                >
                  Resume <LinkArrow className="w-6 ml-1" />
                </Link>
                <Link
                  href="mailto:ngduonganhhuy@gmail.com"
                  target="_blank"
                  className="ml-4 text-lg font-medium capitalize text-dark underline dark:text-light md:text-base"
                >
                  Contact
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </Layout>
        <HireMe />
        <div className="absolute right-8 bottom-8 inline-block w-24 md:hidden">
          <Image src={lightBulb} alt="Holmes" className="w-full h-auto" />
        </div>
      </main>
    </>
  );
}
