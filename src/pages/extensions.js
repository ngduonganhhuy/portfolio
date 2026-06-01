import AnimatedText from "@/components/AnimatedText";
import { GithubIcon } from "@/components/Icon";
import ScrollReveal from "@/components/ScrollReveal";
import Section from "@/components/Section";
import { MY_EXTENSIONS, POPULAR_EXTENSIONS } from "@/data/extensions";
import { SITE_NAME, SITE_OG_IMAGE, SITE_TWITTER, SITE_URL } from "@/data/site";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const ExtensionCard = ({ title, description, category, icon, link, github, tags }) => {
  return (
    <article className="w-full flex flex-col items-start rounded-2xl border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light xs:p-4 shadow-[8px_8px_0px_0px_#333333] dark:shadow-[8px_8px_0px_0px_#F2E7D5]">

      <div className="flex items-center gap-4 w-full mb-4">
        <div className="w-14 h-14 flex-shrink-0 relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-1">
          <Image
            src={icon}
            alt={title}
            width={48}
            height={48}
            className="object-contain w-full h-full"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-primary dark:text-primaryDark font-medium text-sm">{category}</span>
          <h2 className="text-xl font-bold dark:text-light truncate">{title}</h2>
        </div>
      </div>

      <p className="text-sm font-medium text-dark/80 dark:text-light/80 mb-4 flex-1">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-full border border-dark/30 dark:border-light/30 text-dark/70 dark:text-light/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="w-full flex items-center justify-between mt-auto">
        <Link
          href={link}
          target="_blank"
          className="text-sm font-semibold px-4 py-2 rounded-lg bg-dark text-light dark:bg-light dark:text-dark hover:opacity-80 transition-opacity"
        >
          Visit
        </Link>
        {github && (
          <Link href={github} target="_blank" className="w-8">
            <GithubIcon />
          </Link>
        )}
      </div>
    </article>
  );
};

const Extensions = () => {
  return (
    <>
      <Head>
        <title>{`Extensions | ${SITE_NAME}`}</title>
        <meta name="description" content="A curated list of useful tools and browser extensions — ad blockers, DNS filters, security utilities and more." />
        <link rel="canonical" href={`${SITE_URL}/extensions`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/extensions`} />
        <meta property="og:title" content={`Extensions | ${SITE_NAME}`} />
        <meta property="og:description" content="Curated tools and extensions for blocking ads, DNS filtering, and online privacy." />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={SITE_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SITE_TWITTER} />
        <meta name="twitter:image" content={SITE_OG_IMAGE} />
      </Head>

      {/* Section 1: My Extensions */}
      <Section className="!min-h-0 !pb-4">
        <AnimatedText
          text="My Extensions"
          className="mb-4 lg:!text-7xl sm:!text-6xl xs:!text-4xl"
        />
        <p className="mb-12 text-dark/70 dark:text-light/70 text-lg sm:text-base">
          Tools and services I personally built and maintain.
        </p>
        <div className="grid grid-cols-12 gap-8 xl:gap-6 md:gap-y-10 sm:gap-x-0">
          {MY_EXTENSIONS.map((ext, index) => (
            <div key={ext.title} className="col-span-4 xl:col-span-6 sm:col-span-12">
              <ScrollReveal variant="fadeUp" delay={index * 0.1}>
                <ExtensionCard {...ext} />
              </ScrollReveal>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 2: Popular Extensions */}
      <Section className="!pt-4">
        <AnimatedText
          text="Popular Extensions"
          className="mb-4 lg:!text-7xl sm:!text-6xl xs:!text-4xl"
        />
        <p className="mb-12 text-dark/70 dark:text-light/70 text-lg sm:text-base">
          A curated collection of tools for ad blocking, DNS filtering, and online privacy.
        </p>
        <div className="grid grid-cols-12 gap-8 xl:gap-6 md:gap-y-10 sm:gap-x-0">
          {POPULAR_EXTENSIONS.map((ext, index) => (
            <div key={ext.title} className="col-span-4 xl:col-span-6 sm:col-span-12">
              <ScrollReveal variant="fadeUp" delay={(index % 3) * 0.1}>
                <ExtensionCard {...ext} />
              </ScrollReveal>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Extensions;
