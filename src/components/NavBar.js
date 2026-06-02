import { NAV_LINKS, SOCIAL_LINKS } from "@/data/navigation";
import { THEMES, getThemeById } from "@/data/themes";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GithubIcon, LinkedInIcon, TwitterIcon } from "./Icon";
import Logo from "./Logo";

const ICON_MAP = {
  twitter: TwitterIcon,
  github: GithubIcon,
  linkedin: LinkedInIcon,
};

const ChevronDownIcon = ({ className = "" }) => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className={className} fill="none">
    <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

const ThemeMenu = ({ themeId, setThemeId, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeTheme = getThemeById(themeId);

  const selectTheme = (nextThemeId) => {
    setThemeId(nextThemeId);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-10 min-w-[128px] items-center justify-between gap-2 rounded-lg border border-dark/20 bg-light px-3 text-sm font-semibold text-dark transition hover:border-primary dark:border-light/20 dark:bg-dark dark:text-light dark:hover:border-primaryDark sm:min-w-[112px]"
        aria-expanded={isOpen}
        aria-label="Choose theme"
      >
        <span className="flex items-center gap-2">
          <span className="flex -space-x-1">
            {activeTheme.swatches.slice(0, 3).map((color) => (
              <span
                key={color}
                className="h-3.5 w-3.5 rounded-full border border-dark/20 dark:border-light/20"
                style={{ backgroundColor: color }}
              />
            ))}
          </span>
          <span>{activeTheme.name}</span>
        </span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="absolute right-0 top-12 z-50 w-48 rounded-lg border border-dark bg-light p-1 shadow-[4px_4px_0px_0px_#333333] dark:border-light dark:bg-dark dark:shadow-[4px_4px_0px_0px_#F2E7D5]"
        >
          {THEMES.map((theme) => {
            const isActive = theme.id === activeTheme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => selectTheme(theme.id)}
                className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition ${
                  isActive
                    ? "bg-dark text-light dark:bg-light dark:text-dark"
                    : "text-dark hover:bg-dark/10 dark:text-light dark:hover:bg-light/10"
                }`}
              >
                <span>{theme.name}</span>
                <span className="flex gap-1">
                  {theme.swatches.map((color) => (
                    <span
                      key={color}
                      className="h-3 w-3 rounded-full border border-dark/20 dark:border-light/20"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </span>
              </button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

const LiteModeToggle = ({ className = "" }) => {
  const [isLiteMode, setIsLiteMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsLiteMode(window.localStorage.getItem("portfolioLiteMode") === "true");
    setIsMounted(true);
  }, []);

  const toggleLiteMode = () => {
    const nextValue = !isLiteMode;
    setIsLiteMode(nextValue);
    window.localStorage.setItem("portfolioLiteMode", String(nextValue));
    window.dispatchEvent(
      new CustomEvent("portfolio-lite-mode-change", {
        detail: { isLiteMode: nextValue },
      })
    );
  };

  return (
    <button
      type="button"
      onClick={toggleLiteMode}
      className={`flex h-10 items-center gap-2 rounded-lg border border-dark/20 bg-light px-3 text-sm font-semibold text-dark transition hover:border-primary dark:border-light/20 dark:bg-dark dark:text-light dark:hover:border-primaryDark ${
        isLiteMode ? "border-primary dark:border-primaryDark" : ""
      } ${className}`}
      aria-pressed={isLiteMode}
      aria-label="Toggle lite portfolio mode"
      disabled={!isMounted}
    >
      <span>Lite</span>
      <span
        className={`relative h-5 w-9 rounded-full border border-dark/20 transition dark:border-light/20 ${
          isLiteMode ? "bg-primary dark:bg-primaryDark" : "bg-dark/10 dark:bg-light/10"
        }`}
      >
        <span
          className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-light transition dark:bg-dark ${
            isLiteMode ? "left-[18px]" : "left-1"
          }`}
        />
      </span>
    </button>
  );
};

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
  const [themeId, setThemeId, isThemeMounted] = useThemeSwitcher();
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
          <LiteModeToggle className="ml-3" />
          <div className="ml-3 h-10 min-w-[128px] sm:min-w-[112px]">
            {isThemeMounted && <ThemeMenu themeId={themeId} setThemeId={setThemeId} />}
          </div>
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
              <div className="flex items-center gap-3">
                <LiteModeToggle />
                <div className="h-10 min-w-[128px] sm:min-w-[112px]">
                  {isThemeMounted && <ThemeMenu themeId={themeId} setThemeId={setThemeId} />}
                </div>
              </div>
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
