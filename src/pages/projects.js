import AnimatedText from "@/components/AnimatedText";
import { GithubIcon } from "@/components/Icon";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import bizbookly from "../../public/images/projects/bizbookly.png";
import bizbooklyStaff from "../../public/images/projects/bizbookly_staff.png";
import gonsa from "../../public/images/projects/gonsa.png";
import lady from "../../public/images/projects/lady.png";
import rpsgame from "../../public/images/projects/rpsgame.png";
import winerydao from "../../public/images/projects/winerydao.png";
import lendme from "../../public/images/projects/lendme.png";
import danet from "../../public/images/projects/danet.jpg";
import dshorts from "../../public/images/projects/dshorts.png";

const FramerImage = motion(Image);

const FuturedProject = ({ type, title, summary, img, link, github }) => {
  return (
    <article
      className="w-full flex items-center justify-between relative rounded-br-2xl rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light
    lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4
    "
    >
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]" />
      <Link
        href={link}
        target="_blank"
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg flex justify-center shadow-md drop-shadow-sm lg:w-full"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </Link>

      <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <span className="text-primary dark:text-primaryDark font-medium text-xl xs:text-base">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light sm:text-sm">
            {title}
          </h2>
        </Link>

        <p className="my-2 font-medium text-dark dark:text-light sm:text-sm">
          {summary}
        </p>

        <div className="mt-2 flex items-center ">
          <Link href={github} target="_blank" className="w-10">
            <GithubIcon />
          </Link>

          <Link
            href={link}
            target="_blank"
            className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base"
          >
            Private
          </Link>
        </div>
      </div>
    </article>
  );
};

const Project = ({ title, type, img, link, github }) => {
  return (
    <article
      className="w-full flex flex-col items-center justify-center rounded-2xl border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light xs:p-4
    "
    >
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]" />
      <Link
        href={link}
        target="_blank"
        className="w-full cursor-pointer overflow-hidden rounded-lg drop-shadow-sm h-100"
      >
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <FramerImage
            src={img}
            alt={title}
            fill
            className="object-contain"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>

      <div className="w-full flex flex-col items-start justify-between ">
        <span className="text-primary dark:text-primaryDark font-medium text-xl lg:text-lg md:text-base text-clip pt-5">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-3xl font-bold lg:text-2xl lg:truncate lg:text-ellipsis lg:w-[90%] sm:w-full">
            {title}
          </h2>
        </Link>

        <div className="w-full mt-2 flex items-center justify-between">
          <Link
            href={link}
            target="_blank"
            className="text-lg font-semibold underline md:text-base"
          >
            Private
          </Link>
          <Link href={""} className="w-8 md:w-6">
            <GithubIcon />
          </Link>
        </div>
      </div>
    </article>
  );
};

const projects = () => {
  return (
    <>
      <Head>
        <title>Huy | Projects</title>
        <meta name="description" content="any description" />
      </Head>
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Projects show case"
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <FuturedProject
                title={"Lend Me"}
                summary={
                  "Pawn shop management app."
                }
                link={"https://app.lendme.vn/"}
                type={"Featured Project"}
                img={lendme}
                github={"/"}
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title={"Danet"}
                link={
                  "https://apps.apple.com/vn/app/danet/id1099577795?l=vi"
                }
                type={"Project"}
                img={danet}
                github={"/"}
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title={"DShorts"}
                link={"https://apps.apple.com/vn/app/apple-store/id1630656771"}
                type={"Project"}
                img={dshorts}
                github={"/"}
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title={"Trung Tâm Dược Phẩm"}
                link={
                  "https://apps.apple.com/us/app/trung-t%C3%A2m-d%C6%B0%E1%BB%A3c-ph%E1%BA%A9m/id6451052186"
                }
                type={"Project"}
                img={gonsa}
                github={"/"}
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title={"SalonBookly"}
                link={"https://apps.apple.com/vn/app/apple-store/id1630656771"}
                type={"Project"}
                img={bizbookly}
                github={"/"}
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title={"SalonBookly Staff"}
                link={
                  "https://apps.apple.com/vn/app/salonbookly-staff/id1630657030"
                }
                type={"Project"}
                img={bizbooklyStaff}
                github={"/"}
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title={"Yakult Lady"}
                link={"/"}
                type={"Project"}
                img={lady}
                github={"/"}
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title={"Legend of RPS"}
                link={"https://rpsgame.world/"}
                type={"Project"}
                img={rpsgame}
                github={"/"}
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title={"Winery DAO"}
                link={"https://winerydao.day/ "}
                type={"Project"}
                img={winerydao}
                github={"/"}
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default projects;
