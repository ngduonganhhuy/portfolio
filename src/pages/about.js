import AnimatedText from "@/components/AnimatedText";
import Education from "@/components/Education";
import Exp from "@/components/Exp";
import Layout from "@/components/Layout";
import Skills from "@/components/Skills";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";
import profilePic from "../../public/images/profile/ava.jpeg";

const AnimatedNumbers = ({ val }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(val);
    }
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

const about = () => {
  return (
    <>
      <Head>
        <title>Holmes | About</title>
        <meta name="description" content="any description" />
      </Head>
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="About Me"
            className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />
          <div className="grid w-full grid-cols-10 gap-16 sm:gap-8 ">
            <div className="col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-12">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
                Bio
              </h2>

              <p className="font-medium">
              As a passionate Mobile Developer
              with four years of Flutter experience, I
              seek a Middle - Senior role to further
              refine my skills, tackle new challenges,
              and contribute to impactful projects.
              My strong problem-solving abilities
              and commitment to clean, efficient
              code make me a valuable asset to
              any team.
              </p>

              <p className="my-4 font-medium">
                I am deeply passionate about continuously acquiring new
                languages and technologies, and my unwavering dedication to my
                work ensures that I am an ideal candidate for this position.
                With a strong work ethic and a relentless drive for
                self-improvement, I am committed to making a significant impact
                and contributing to the success of any project I am involved in.
              </p>
            </div>

            <div className="w-full col-span-4 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light xl:col-span-4 md:order-1 md:col-span-12">
              <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
              <Image
                src={profilePic}
                alt="Holmes"
                className="w-full h-auto rounded-2xl"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="col-span-3 md:col-span-12 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3">
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers val={4} />
                  k+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  Satisfied Clients
                </h2>
              </div>

              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold  md:text-6xl sm:text-5xl xs:text-4xl ">
                  <AnimatedNumbers val={10} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  Projects Completed
                </h2>
              </div>

              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold  md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers val={4} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  Years Of Experience
                </h2>
              </div>
            </div>
          </div>
          <Skills />
          <Exp />
          <Education />
        </Layout>
      </main>
    </>
  );
};

export default about;
