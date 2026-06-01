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
  const isActive = router.asPath === href;
  const handleClick = () => {
    toggle();
    router.push(href);
  };
  return (
    <button
      className={`${className} relative group text-left py-3 px-2 text-lg font-medium w-full border-b border-dark/10 dark:border-light/10 last:border-0
        ${isActive ? "text-primary dark:text-primaryDark" : "text-dark dark:text-light"}
        hover:text-primary dark:hover:text-primaryDark transition-colors duration-200`}
      onClick={handleClick}
    >
      {title}
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
  const close = () => setIsOpen(false);

  return (
    <header className="w-full px-32 py-8 font-medium flex items-center justify-between dark:text-light bg-light dark:bg-dark lg:px-16 md:px-12 sm:px-8">
      {/* Hamburger — mobile only */}
      <button
        className="flex-col justify-center items-center hidden lg:flex z-50 relative"
        onClick={toggle}
        aria-label="Toggle menu"
      >
        <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`} />
        <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? "opacity-0" : "opacity-100"}`} />
        <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`} />
      </button>

      {/* Desktop nav */}
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

      {/* Mobile slide-down menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:block hidden"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-40 bg-light dark:bg-dark shadow-2xl px-8 pt-24 pb-8 hidden lg:flex flex-col gap-1 border-b border-dark/10 dark:border-light/10"
          >
            <nav className="flex flex-col">
              {NAV_LINKS.map(({ href, title }) => (
                <CustomMobileLink key={href} href={href} title={title} toggle={close} />
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-dark/20 dark:border-light/20 flex items-center justify-between">
              <SocialNav iconClassName="w-6" />
              <ThemeToggle mode={mode} setMode={setMode} />
            </div>
          </motion.div>
        </>
      )}

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Logo />
      </div>
    </header>
  );
};

export default NavBar;
