import AnimatedText from "@/components/AnimatedText";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import ScrollReveal from "@/components/ScrollReveal";
import Section from "@/components/Section";
import Skills from "@/components/Skills";
import { SITE_NAME, SITE_OG_IMAGE, SITE_TWITTER, SITE_URL } from "@/data/site";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";
import profilePic from "../../public/images/profile/ava.png";

const AnimatedNumbers = ({ val }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionValue.set(val);
  }, [isInView, val, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current && latest.toFixed(0) <= val) {
        ref.current.textContent = latest.toFixed(0);
      }
    });
  }, [springValue, val]);

  return <span ref={ref}></span>;
};

const STATS = [
  { val: 4, label: "Satisfied Clients", suffix: "k+" },
  { val: 10, label: "Projects Completed", suffix: "+" },
  { val: 4, label: "Years Of Experience", suffix: "+" },
];

const About = () => {
  return (
    <>
      <Head>
        <title>{`About | ${SITE_NAME}`}</title>
        <meta name="description" content="Learn about Nguyen Duong Anh Huy — Mobile Developer with 4+ years of Flutter experience, passionate about clean code and scalable mobile architecture." />
        <link rel="canonical" href={`${SITE_URL}/about`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/about`} />
        <meta property="og:title" content={`About | ${SITE_NAME}`} />
        <meta property="og:description" content="Mobile Developer with 4+ years of Flutter experience, passionate about clean code and scalable mobile architecture." />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={SITE_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SITE_TWITTER} />
        <meta name="twitter:image" content={SITE_OG_IMAGE} />
      </Head>

      {/* Section 1: Bio */}
      <Section>
        <AnimatedText
          text="About Me"
          className="mb-12 lg:!text-7xl sm:!text-6xl xs:!text-4xl"
        />
        <div className="grid w-full grid-cols-10 gap-16 sm:gap-8">
          <ScrollReveal
            variant="fadeLeft"
            className="col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-12"
          >
            <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">Bio</h2>
            <p className="font-medium">
              As a passionate Software Engineer with over four years of experience
              in designing, developing, and delivering scalable software solutions,
              I am seeking a Solution Architect role where I can leverage my
              technical expertise, system design knowledge, and leadership skills
              to solve complex business challenges.
            </p>
            <p className="my-4 font-medium">
              I am passionate about continuously learning new technologies,
              architectural patterns, and industry best practices. My commitment
              to professional growth enables me to deliver high-quality solutions
              that align with both technical and business objectives.
            </p>
          </ScrollReveal>

          <ScrollReveal
            variant="fadeUp"
            delay={0.1}
            className="w-full col-span-4 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light xl:col-span-4 md:order-1 md:col-span-12 shadow-[-8px_8px_0px_0px_#333333] dark:shadow-[-8px_8px_0px_0px_#F2E7D5]"
          >
            <Image
              src={profilePic}
              alt="Holmes"
              className="w-full h-auto rounded-2xl"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </ScrollReveal>

          <ScrollReveal
            variant="fadeRight"
            delay={0.05}
            className="col-span-3 md:col-span-12 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3"
          >
            {STATS.map(({ val, label, suffix }) => (
              <div key={label} className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers val={val} />{suffix}
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  {label}
                </h2>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </Section>

      {/* Section 2: Skills */}
      <Section fullHeight className="!flex-col">
        <Skills />
      </Section>

      {/* Section 3: Experience */}
      <Section>
        <Experience />
      </Section>

      {/* Section 4: Education */}
      <Section>
        <Education />
      </Section>
    </>
  );
};

export default About;
