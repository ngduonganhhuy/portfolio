import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import Lilcon from "./Lilcon";

const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]"
    >
      <Lilcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}&nbsp;
          <a
            href={companyLink}
            target="_blank"
            className="text-primary dark:text-primaryDark capitalize"
          >
            @{company}
          </a>
        </h3>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {address}
        </span>
        <p className="font-medium w-full whitespace-pre-line md:text-sm">
          {work}
        </p>
      </motion.div>
    </li>
  );
};

const Exp = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        Experience
      </h2>

      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light md:w-[2px] md:left-[30px] xs:left-[20px]"
        />

        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Details
            position="Website Developer"
            company="Playground"
            companyLink={"https://www.playgroundx.site/"}
            time="March 2021 – September 2021"
            address="Q2, TP.HCM"
            work={`● Building website landing page according to designer’s mockup on Figma, complete user-story according to BA’s arrangement and manage time to complete task on JIRA
            ● Source Code Management and learning more about Web3
            ●	Coding UI/UX, integration API with Redux, JWT, Scss,…`}
          />
          <Details
            position="Mobile Developer"
            company="Exnodes"
            companyLink={"https://www.exnodes.vn/"}
            time="September 2021 – September 2022"
            address="Q8, TP.HCM"
            work={`● Develop app according to designer’s mockup on Figma, complete user-story according to BA’s arrangement and manage time to complete task on JIRA
            ● Source Code Management and learning more about DevOps with AWS amazon (CodeCommit), handle image with s3 Bucket
            ●	Coding UI/UX, integration API with Flutter, GETX, JWT, Bloc,…
            ●	Configuration for building app on Android and IOS`}
          />
          <Details
            position="Mobile Developer"
            company="Runsystem"
            companyLink={"https://runsystem.net/vi/"}
            time="September 2022 - April 2024"
            address="Tan Binh, TP.HCM"
            work={`● Define user-story according to BA’s arrangement
            ● Provide solutions to support other members
            ●	Design according to defined user-story, develop app according this design on Adobe XD, Figma
            ●	Configuration for building app on Android and IOS for testing over third application (Testflight, Diawi)
            ●	Deploy app to CHPlay and AppStore`}
          />
           <Details
            position="Mobile Developer"
            company="Danet"
            companyLink={"https://danet.vn/"}
            time="April 2024 - Present"
            address="Sala, TP.HCM"
            work={`● Improve UX, Optimize product (Danet)
            ● Support content team
            ●	Design according to defined user-story, develop app according this design on Figma
            ●	Build new product (DShorts)
            ●	Deploy app to CHPlay and AppStore`}
          />
        </ul>
      </div>
    </div>
  );
};

export default Exp;
