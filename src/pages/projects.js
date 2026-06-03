import AnimatedText from "@/components/AnimatedText";
import { GithubIcon } from "@/components/Icon";
import ScrollReveal from "@/components/ScrollReveal";
import Section from "@/components/Section";
import { FEATURED_PROJECTS, PROJECTS } from "@/data/projects";
import { SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "@/data/site";
import {
  getBreadcrumbJsonLd,
  getKeywords,
  getPersonJsonLd,
  getTwitterSite,
} from "@/lib/seo";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const FramerImage = motion(Image);
const PAGE_URL = `${SITE_URL}/projects`;
const PAGE_TITLE = `Flutter Projects & Mobile Starter Work | ${SITE_NAME}`;
const PAGE_DESCRIPTION =
  "Explore Flutter, React Native, clean architecture, boilerplate, and starter project experience from Nguyen Duong Anh Huy's mobile developer portfolio.";
const PAGE_KEYWORDS = getKeywords([
  "Flutter projects",
  "Flutter clean architecture projects",
  "Flutter boilerplate examples",
  "starter project portfolio",
  "mobile app starter project",
  "clean architech portfolio",
]);
const PROJECTS_JSON_LD = [
  getBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Projects", url: PAGE_URL },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    author: getPersonJsonLd(),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [...FEATURED_PROJECTS, ...PROJECTS].map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: project.link || PAGE_URL,
      })),
    },
  },
];

const ProjectImage = ({ img, title, link, priority = false, fill = false, width, height }) => {
  const image = fill ? (
    <FramerImage
      src={img}
      alt={title}
      fill
      className="object-contain"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    />
  ) : (
    <FramerImage
      src={img}
      alt={title}
      width={width}
      height={height}
      className="w-full h-auto"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
    />
  );

  if (!link) return image;
  return (
    <Link href={link} target="_blank" className="w-full cursor-pointer overflow-hidden rounded-lg">
      {image}
    </Link>
  );
};

const FeaturedProject = ({ type, title, summary, img, link, github }) => {
  return (
    <article className="w-full flex items-center justify-between relative rounded-br-2xl rounded-3xl border border-solid border-dark bg-light p-12 dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4 shadow-[8px_8px_0px_0px_#333333] dark:shadow-[8px_8px_0px_0px_#F2E7D5]">
      <div className="w-1/2 cursor-pointer overflow-hidden rounded-lg flex justify-center shadow-md drop-shadow-sm lg:w-full">
        <ProjectImage img={img} title={title} link={link} priority width={600} height={400} />
      </div>

      <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <span className="text-primary dark:text-primaryDark font-medium text-xl xs:text-base">{type}</span>
        {link ? (
          <Link href={link} target="_blank" className="hover:underline underline-offset-2">
            <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light sm:text-sm">{title}</h2>
          </Link>
        ) : (
          <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light sm:text-sm">{title}</h2>
        )}
        <p className="my-2 font-medium text-dark dark:text-light sm:text-sm">{summary}</p>
        <div className="mt-2 flex items-center gap-4">
          {github && (
            <Link href={github} target="_blank" className="w-10">
              <GithubIcon />
            </Link>
          )}
          {link ? (
            <Link href={link} target="_blank" className="rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base">
              Visit
            </Link>
          ) : (
            <span className="rounded-lg bg-dark/30 text-dark/60 dark:bg-light/20 dark:text-light/60 p-2 px-6 text-lg font-semibold sm:px-4 sm:text-base cursor-default">
              Private
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

const Project = ({ title, type, img, link, github }) => {
  return (
    <article className="w-full flex flex-col items-center justify-center rounded-2xl border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light xs:p-4 shadow-[8px_8px_0px_0px_#333333] dark:shadow-[8px_8px_0px_0px_#F2E7D5]">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        <ProjectImage img={img} title={title} link={link} fill />
      </div>

      <div className="w-full flex flex-col items-start justify-between">
        <span className="text-primary dark:text-primaryDark font-medium text-xl lg:text-lg md:text-base text-clip pt-5">{type}</span>
        {link ? (
          <Link href={link} target="_blank" className="hover:underline underline-offset-2">
            <h2 className="my-2 w-full text-left text-3xl font-bold lg:text-2xl lg:truncate lg:text-ellipsis lg:w-[90%] sm:w-full">{title}</h2>
          </Link>
        ) : (
          <h2 className="my-2 w-full text-left text-3xl font-bold lg:text-2xl">{title}</h2>
        )}
        <div className="w-full mt-2 flex items-center justify-between">
          {link ? (
            <Link href={link} target="_blank" className="text-lg font-semibold underline md:text-base">
              Visit
            </Link>
          ) : (
            <span className="text-lg font-semibold text-dark/40 dark:text-light/40 md:text-base">Private</span>
          )}
          {github && (
            <Link href={github} className="w-8 md:w-6">
              <GithubIcon />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="keywords" content={PAGE_KEYWORDS} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={SITE_OG_IMAGE} />
        <meta property="og:image:alt" content="Flutter and mobile projects by Nguyen Duong Anh Huy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={getTwitterSite()} />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_OG_IMAGE} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PROJECTS_JSON_LD) }}
        />
      </Head>

      {/* Section 1: Featured Projects */}
      <Section>
        <AnimatedText
          text="Projects show case"
          className="mb-12 lg:!text-7xl sm:!text-6xl xs:!text-4xl"
        />
        {FEATURED_PROJECTS.map((project) => (
          <ScrollReveal key={project.title} variant="fadeUp">
            <FeaturedProject {...project} />
          </ScrollReveal>
        ))}
      </Section>

      {/* Section 2: All Projects Grid */}
      <Section>
        <AnimatedText
          text="All Projects"
          className="mb-12 lg:!text-7xl sm:!text-6xl xs:!text-4xl"
        />
        <div className="grid grid-cols-12 gap-16 gap-y-20 xl:gap-x-12 lg:gap-x-8 md:gap-y-16 sm:gap-x-0">
          {PROJECTS.map((project, index) => (
            <div key={project.title} className="col-span-6 sm:col-span-12">
              <ScrollReveal variant="fadeUp" delay={(index % 2) * 0.15}>
                <Project {...project} />
              </ScrollReveal>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Projects;
