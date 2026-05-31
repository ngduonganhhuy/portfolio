import { NAV_LINKS, SOCIAL_LINKS } from "@/data/navigation";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { GithubIcon, LinkedInIcon, MoonIcon, SunIcon, TwitterIcon } from "./Icon";
import Logo from "./Logo";

const ICON_MAP = {
  twitter: TwitterIcon,
  github: GithubIcon,
  linkedin: LinkedInIcon,
};

const CustomLink = ({ href, title, className = "" }) => {
  const router = useRouter();
  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          router.asPath === href ? "w-full" : "w-0"
        } dark:bg-light`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const CustomMobileLink = ({ href, title, className = "", toggle }) => {
  const router = useRouter();
  const handleClick = () => {
    toggle();
    router.push(href);
  };
  return (
    <button
      className={`${className} relative group text-light dark:text-dark my-2`}
      onClick={handleClick}
    >
      {title}
      <span
        className={`h-[1px] inline-block bg-light absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          router.asPath === href ? "w-full" : "w-0"
        } dark:bg-dark`}
      >
        &nbsp;
      </span>
    </button>
  );
};

const ThemeToggle = ({ mode, setMode, className = "" }) => (
  <button
    onClick={() => setMode(mode === "light" ? "dark" : "light")}
    className={`flex items-center justify-center rounded-full p-1 ${
      mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
    } ${className}`}
  >
    {mode === "dark" ? <SunIcon className="fill-dark" /> : <MoonIcon className="fill-dark" />}
  </button>
);

const SocialNav = ({ className = "", iconClassName = "" }) => (
  <nav className={`flex items-center justify-center flex-wrap ${className}`}>
    {SOCIAL_LINKS.map(({ href, label, icon }) => {
      const Icon = ICON_MAP[icon];
      return (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          aria-label={label}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className={`mx-3 ${iconClassName}`}
        >
          <Icon />
        </motion.a>
      );
    })}
  </nav>
);

const NavBar = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <header className="w-full px-32 py-8 font-medium flex items-center justify-between dark:text-light sticky top-0 z-10 bg-light dark:bg-dark lg:px-16 md:px-12 sm:px-8">
      <button
        className="flex-col justify-center items-center hidden lg:flex"
        onClick={toggle}
        aria-label="Toggle menu"
      >
        <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`} />
        <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? "opacity-0" : "opacity-100"}`} />
        <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`} />
      </button>

      <div className="w-full flex justify-between items-center lg:hidden">
        <nav>
          {NAV_LINKS.map(({ href, title }, i) => (
            <CustomLink
              key={href}
              href={href}
              title={title}
              className={i === 0 ? "mr-4" : i === NAV_LINKS.length - 1 ? "ml-4" : "mx-4"}
            />
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <SocialNav iconClassName="w-6" />
          <ThemeToggle mode={mode} setMode={setMode} className="ml-3" />
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, opacity: 1 }}
          className="min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32"
        >
          <nav className="flex items-center flex-col justify-center">
            {NAV_LINKS.map(({ href, title }) => (
              <CustomMobileLink key={href} href={href} title={title} toggle={toggle} />
            ))}
          </nav>
          <div className="flex items-center justify-center flex-wrap mt-2 gap-1">
            <SocialNav iconClassName="w-6 sm:mx-1" />
            <ThemeToggle mode={mode} setMode={setMode} className="ml-3" />
          </div>
        </motion.div>
      )}

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Logo />
      </div>
    </header>
  );
};

export default NavBar;
