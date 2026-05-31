import { SKILLS } from "@/data/skills";
import { motion } from "framer-motion";
import Link from "next/link";

const SkillBadge = ({ name, x, y, url }) => {
  return (
    <Link href={url ?? "#"} target="_blank">
      <motion.div
        className="items-center justify-center rounded-full font-semibold bg-dark text-light py-3 px-6 shadow-dark cursor-pointer absolute dark:text-dark dark:bg-light lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3 xs:bg-transparent xs:dark:bg-transparent xs:text-dark xs:dark:text-light xs:font-bold"
        whileHover={{ scale: 1.05 }}
        initial={{ x: 0, y: 0 }}
        whileInView={{ x, y, transition: { duration: 1.5 } }}
        animate={{ x, y }}
        transition={{ duration: 1.5 }}
      >
        {name}
      </motion.div>
    </Link>
  );
};

const Skills = () => {
  return (
    <>
      <h2 className="font-bold text-8xl w-full text-center dark:text-light md:text-6xl xs:text-4xl">
        Skills
      </h2>
      <div
        className="w-full flex-1 relative flex items-center justify-center bg-circularLight dark:bg-circularDark
        lg:bg-circularLightLg lg:dark:bg-circularDarkLg
        md:bg-circularLightMd md:dark:bg-circularDarkMd
        sm:bg-circularLightSm sm:dark:bg-circularDarkSm"
      >
        <motion.div className="flex items-center justify-center rounded-full font-semibold bg-dark text-light p-8 shadow-dark cursor-pointer dark:text-dark dark:bg-light lg:p-6 md:p-4 xs:text-xs xs:p-2">
          Mobile
        </motion.div>
        {SKILLS.map((skill) => (
          <SkillBadge key={skill.name} {...skill} />
        ))}
      </div>
    </>
  );
};

export default Skills;
