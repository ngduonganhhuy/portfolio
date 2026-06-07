import AnimatedText from "@/components/AnimatedText";
import HireMe from "@/components/HireMe";
import { LinkArrow } from "@/components/Icon";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { SOCIAL_LINKS } from "@/data/navigation";
import { FEATURED_PROJECTS, PROJECTS } from "@/data/projects";
import { SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "@/data/site";
import { SKILLS } from "@/data/skills";
import {
  DEFAULT_SEO,
  getKeywords,
  getPersonJsonLd,
  getTwitterSite,
  getWebsiteJsonLd,
} from "@/lib/seo";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import profilePic from "../../public/images/profile/face_focus.png";
import lightBulb from "../../public/images/svgs/miscellaneous_icons_1.svg";

const NAV_ITEMS = [
  { id: "profile", label: "Profile", shortcut: "P" },
  { id: "projects", label: "Projects", shortcut: "J" },
  { id: "skills", label: "Skills", shortcut: "S" },
  { id: "notes", label: "Notes", shortcut: "N" },
  { id: "contact", label: "Contact", shortcut: "C" },
];

const FILTERS = ["All", "Mobile", "Frontend", "Web3", "Private"];
const RESUME_PDF_PATH = "/NguyenDuongAnhHuy_SoftwareEngineer.pdf";
const RESUME_FILE_NAME = "NguyenDuongAnhHuy_SoftwareEngineer.pdf";

const QUICK_PROMPTS = [
  "Summarize Holmes in 30 seconds",
  "Show proof of mobile experience",
  "Which project is strongest for hiring?",
];

const PROJECT_INSIGHTS = {
  "Lend Me": ["Mobile", "Product systems", "Operations"],
  Danet: ["Mobile", "Streaming", "Scale"],
  DShorts: ["Mobile", "Media", "Consumer"],
  "Trung Tâm Dược Phẩm": ["Mobile", "Healthcare", "Operations"],
  SalonBookly: ["Mobile", "Booking", "SaaS"],
  "SalonBookly Staff": ["Mobile", "Staff tools", "SaaS"],
  "Yakult Lady": ["Mobile", "Private", "Field operations"],
  "Legend of RPS": ["Frontend", "Web3", "Game"],
  "Winery DAO": ["Frontend", "Web3", "Community"],
};

const SYSTEM_NOTES = [
  {
    title: "Builds production mobile products",
    body: "Flutter, React Native, clean architecture, app-store delivery, reusable boilerplate thinking, and long-running product maintenance.",
  },
  {
    title: "Designs starter projects that can scale",
    body: "The portfolio emphasizes product context, clean architecture tradeoffs, starter project structure, and the business problem behind each build.",
  },
  {
    title: "AI-readable public profile",
    body: "Holmes AI uses the public profile, projects, experience, articles, and skills as its answer base.",
  },
];

const HOME_TITLE = DEFAULT_SEO.title;
const HOME_DESCRIPTION = DEFAULT_SEO.description;
const HOME_KEYWORDS = getKeywords([
  "Flutter clean architech",
  "Flutter app starter",
  "Flutter template",
  "Dart clean architecture",
  "mobile starter project",
]);
const HOME_JSON_LD = [getPersonJsonLd(), getWebsiteJsonLd()];
const LITE_ONLY_VIEWPORT_QUERY = "(max-width: 1279px)";

const Icon = ({ children, className = "" }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
    {children}
  </svg>
);

const SearchIcon = ({ className = "" }) => (
  <Icon className={className}>
    <path
      d="m20 20-4.4-4.4M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </Icon>
);

const SendIcon = ({ className = "" }) => (
  <Icon className={className}>
    <path
      d="M20 4 9.5 14.5M20 4l-6.5 18-3.75-7.75L2 10.5 20 4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

const CloseIcon = ({ className = "" }) => (
  <Icon className={className}>
    <path
      d="M6 6l12 12M18 6 6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Icon>
);

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content:
      "Ask me about Holmes, projects, mobile experience, architecture, or what proof matters for hiring.",
  },
];

function downloadResumePdf() {
  const link = document.createElement("a");
  link.href = RESUME_PDF_PATH;
  link.download = RESUME_FILE_NAME;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function classifyProject(project) {
  if (!project.link) return "Private";
  const tags = PROJECT_INSIGHTS[project.title] || [];
  if (tags.includes("Web3")) return "Web3";
  if (tags.includes("Frontend")) return "Frontend";
  return "Mobile";
}

function ProjectLink({ project, children, className = "" }) {
  if (!project.link) return <div className={className}>{children}</div>;

  return (
    <Link href={project.link} target="_blank" className={className}>
      {children}
    </Link>
  );
}

function StatusDot({ tone = "primary" }) {
  const tones = {
    primary: "bg-primary dark:bg-primaryDark",
    green: "bg-emerald-500",
    amber: "bg-amber-500",
  };

  return <span className={`h-2.5 w-2.5 rounded-full ${tones[tone]}`} />;
}

function Sidebar({ activeView, onChangeView, viewButtonRefs }) {
  return (
    <aside className="flex h-full min-h-0 flex-col border-r border-dark/15 bg-dark/[0.03] dark:border-light/15 dark:bg-light/[0.04] lg:border-b lg:border-r-0">
      <div className="border-b border-dark/15 px-5 py-5 dark:border-light/15 lg:px-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-dark/20 bg-light dark:border-light/20 dark:bg-dark">
            <Image
              src={profilePic}
              alt="Holmes"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold uppercase tracking-[0.18em] text-dark/55 dark:text-light/55">
              Holmes OS
            </p>
            <h1 className="truncate text-xl font-black text-dark dark:text-light">
              Nguyen Duong Anh Huy
            </h1>
          </div>
        </div>
      </div>

      <nav className="grid gap-2 p-3 lg:grid-cols-5 sm:grid-cols-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            ref={(element) => {
              viewButtonRefs.current[item.id] = element;
            }}
            type="button"
            onClick={() => onChangeView(item.id)}
            className={`flex min-h-[44px] items-center justify-between rounded-lg border px-3 text-left text-sm font-semibold transition ${
              activeView === item.id
                ? "border-dark bg-dark text-light dark:border-light dark:bg-light dark:text-dark"
                : "border-transparent text-dark/70 hover:border-dark/20 hover:bg-light/60 dark:text-light/70 dark:hover:border-light/20 dark:hover:bg-dark/50"
            }`}
          >
            <span>{item.label}</span>
            <span className="text-xs opacity-55">{item.shortcut}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-dark/15 p-5 text-xs leading-relaxed text-dark/60 dark:border-light/15 dark:text-light/60 lg:hidden">
        <p className="font-semibold text-dark dark:text-light">Current mode</p>
        <p>
          Mobile engineer moving toward solution architecture, with AI support
          for faster portfolio discovery.
        </p>
      </div>
    </aside>
  );
}

function CommandPalette({ isOpen, query, setQuery, commands, onClose }) {
  const filteredCommands = commands.filter((command) =>
    command.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen, setQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-start bg-dark/40 px-4 pt-28 backdrop-blur-sm dark:bg-black/55 sm:pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.section
            className="mx-auto w-full max-w-2xl overflow-hidden rounded-lg border border-dark bg-light text-dark shadow-[8px_8px_0px_0px_#333333] dark:border-light dark:bg-dark dark:text-light dark:shadow-[8px_8px_0px_0px_#F2E7D5]"
            initial={{ y: -12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -12, scale: 0.98 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-dark/15 px-4 py-3 dark:border-light/15">
              <SearchIcon className="h-5 w-5 text-dark/55 dark:text-light/55" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search commands, projects, contact..."
                className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-dark/40 dark:placeholder:text-light/40"
              />
              <button
                type="button"
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-lg border border-dark/15 dark:border-light/15"
                aria-label="Close command palette"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[420px] overflow-y-auto p-2">
              {filteredCommands.map((command) => (
                <button
                  key={command.label}
                  type="button"
                  onClick={() => {
                    command.action();
                    onClose();
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition hover:bg-dark/5 dark:hover:bg-light/10"
                >
                  <span>
                    <span className="block font-bold">{command.label}</span>
                    <span className="block text-xs text-dark/55 dark:text-light/55">
                      {command.meta}
                    </span>
                  </span>
                  <span className="text-xs font-semibold text-primary dark:text-primaryDark">
                    {command.group}
                  </span>
                </button>
              ))}
              {filteredCommands.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-dark/55 dark:text-light/55">
                  No command found.
                </p>
              )}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TopBar({ onOpenCommand }) {
  return (
    <header className="flex min-h-[68px] items-center justify-between gap-4 border-b border-dark/15 px-5 dark:border-light/15 md:flex-col md:items-stretch md:py-4">
      <button
        type="button"
        onClick={onOpenCommand}
        className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-lg border border-dark/15 bg-light/70 px-3 text-left text-sm text-dark/60 transition hover:border-dark/35 dark:border-light/15 dark:bg-dark/60 dark:text-light/60 dark:hover:border-light/35 md:w-full"
      >
        <SearchIcon className="h-5 w-5 shrink-0" />
        <span className="truncate">Search Holmes OS</span>
        <kbd className="ml-auto rounded border border-dark/15 px-2 py-1 text-[11px] font-bold dark:border-light/15">
          ⌘K
        </kbd>
      </button>
      <div className="flex items-center gap-3 text-sm font-semibold">
        <span className="flex items-center gap-2 rounded-lg border border-dark/15 px-3 py-2 dark:border-light/15">
          <StatusDot tone="green" />
          Available
        </span>
        <Link
          href={RESUME_PDF_PATH}
          download={RESUME_FILE_NAME}
          className="flex items-center gap-1 rounded-lg bg-dark px-4 py-2 font-bold text-light dark:bg-light dark:text-dark"
        >
          Resume <LinkArrow className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}

function ProfileView() {
  return (
    <div className="grid h-full min-h-0 grid-cols-[1.1fr_0.9fr] gap-5 overflow-y-auto p-5 pr-3 xl:grid-cols-1">
      <section className="flex min-h-[430px] min-w-0 flex-col justify-between overflow-hidden rounded-lg border border-dark/15 bg-transparent p-6 dark:border-light/15">
        <div className="min-w-0">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary dark:text-primaryDark">
            Mobile Developer / Software Engineer
          </p>
          <h2 className="max-w-4xl break-words text-5xl font-black leading-tight text-dark dark:text-light lg:text-4xl sm:text-3xl">
            A portfolio that works like a product desk, not a static resume.
          </h2>
          <p className="mt-5 max-w-3xl break-words text-base font-medium leading-8 text-dark/70 dark:text-light/70 sm:text-sm sm:leading-7">
            As an aspiring Solution Architect and experienced Software Engineer,
            I am passionate about bridging business needs with technology
            solutions. I specialize in designing scalable architectures, leading
            technical decision-making, and delivering end-to-end software
            systems that drive business value. Through my projects and technical
            writings, I share insights on software architecture, system design,
            cloud-native applications, and modern engineering practices.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-1">
          {[
            ["4+", "Years building software"],
            ["9", "Public project signals"],
            ["AI", "Profile assistant"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="min-w-0 overflow-hidden rounded-lg border border-dark/15 bg-light px-4 py-4 dark:border-light/15 dark:bg-dark"
            >
              <p className="text-3xl font-black">{value}</p>
              <p className="mt-1 break-words text-xs font-semibold uppercase tracking-[0.12em] text-dark/55 dark:text-light/55">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="min-w-0 overflow-hidden rounded-lg border border-dark/15 bg-transparent p-5 dark:border-light/15">
        <div className="relative mx-auto aspect-[4/5] max-h-[480px] overflow-hidden rounded-lg border border-dark/15 bg-light dark:border-light/15 dark:bg-dark">
          <Image
            src={profilePic}
            alt="Holmes portrait"
            fill
            sizes="(max-width: 1024px) 100vw, 36vw"
            className="object-cover object-top"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 border-t border-dark/15 bg-light/90 p-4 backdrop-blur dark:border-light/15 dark:bg-dark/90">
            <p className="text-sm font-black">Holmes</p>
            <p className="break-words text-xs font-medium text-dark/60 dark:text-light/60">
              Mobile architecture, product delivery, AI-assisted discovery.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectsView({ activeFilter, setActiveFilter }) {
  const projects = [...FEATURED_PROJECTS, ...PROJECTS];
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => classifyProject(project) === activeFilter);

  return (
    <div className="flex h-full min-h-0 flex-col p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-black">Project Desk</h2>
          <p className="mt-1 text-sm font-medium text-dark/60 dark:text-light/60">
            Filter by signal, then open the strongest proof.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`h-10 rounded-lg border px-3 text-sm font-bold transition ${
                activeFilter === filter
                  ? "border-dark bg-dark text-light dark:border-light dark:bg-light dark:text-dark"
                  : "border-dark/15 text-dark/65 hover:border-dark/35 dark:border-light/15 dark:text-light/65 dark:hover:border-light/35"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-2 gap-4 overflow-y-auto pr-1 xl:grid-cols-1">
        {filteredProjects.map((project) => {
          const tags = PROJECT_INSIGHTS[project.title] || [
            classifyProject(project),
          ];
          return (
            <ProjectLink
              key={project.title}
              project={project}
              className="group rounded-lg border border-dark/15 bg-transparent p-4 transition hover:border-dark/40 hover:shadow-[4px_4px_0px_0px_#333333] dark:border-light/15 dark:hover:border-light/40 dark:hover:shadow-[4px_4px_0px_0px_#F2E7D5]"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-dark/10 bg-white dark:border-light/10 dark:bg-black/20">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="object-contain p-2 transition duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary dark:text-primaryDark">
                    {classifyProject(project)}
                  </p>
                  <h3 className="mt-1 text-xl font-black">{project.title}</h3>
                </div>
                <span className="shrink-0 rounded-lg border border-dark/15 px-2 py-1 text-xs font-bold dark:border-light/15">
                  {project.link ? "Open" : "Private"}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-primary px-2 py-1 text-xs font-bold text-light dark:bg-primaryDark dark:text-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ProjectLink>
          );
        })}
      </div>
    </div>
  );
}

function SkillsView() {
  const groups = [
    {
      title: "Mobile",
      items: ["Flutter", "Dart", "ReactNative", "SwiftUI/UIKit"],
    },
    { title: "Frontend", items: ["HTML", "CSS", "Javascript", "ReactJS"] },
    { title: "Backend & Data", items: ["NodeJS", "MySQL", "MongoDB"] },
  ];

  return (
    <div className="grid h-full min-h-0 grid-cols-[0.8fr_1.2fr] gap-5 overflow-y-auto p-5 pr-3 xl:grid-cols-1">
      <section className="rounded-lg border border-dark/15 bg-transparent p-6 dark:border-light/15">
        <h2 className="text-3xl font-black">Skill Map</h2>
        <p className="mt-3 text-sm font-medium leading-7 text-dark/65 dark:text-light/65">
          The strongest signal is mobile product delivery, supported by
          frontend, backend, database, and architecture thinking.
        </p>
        <div className="mt-6 grid gap-3">
          {groups.map((group) => (
            <div
              key={group.title}
              className="rounded-lg border border-dark/15 bg-light px-4 py-4 dark:border-light/15 dark:bg-dark"
            >
              <h3 className="font-black">{group.title}</h3>
              <p className="mt-2 text-sm text-dark/60 dark:text-light/60">
                {group.items.join(" / ")}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="grid content-start gap-3 rounded-lg border border-dark/15 bg-transparent p-5 dark:border-light/15">
        {SKILLS.map((skill) => (
          <Link
            key={skill.name}
            href={skill.url}
            target="_blank"
            className="flex items-center justify-between rounded-lg border border-dark/15 bg-light px-4 py-3 text-sm font-bold transition hover:border-dark/35 dark:border-light/15 dark:bg-dark dark:hover:border-light/35"
          >
            <span>{skill.name}</span>
            <span className="text-xs text-primary dark:text-primaryDark">
              Reference
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}

function NotesView() {
  return (
    <div className="grid h-full min-h-0 content-start gap-4 overflow-y-auto p-5">
      <div>
        <h2 className="text-3xl font-black">Build Log</h2>
        <p className="mt-1 text-sm font-medium text-dark/60 dark:text-light/60">
          A living profile is easier to trust than a static claim.
        </p>
      </div>
      {SYSTEM_NOTES.map((note, index) => (
        <article
          key={note.title}
          className="rounded-lg border border-dark/15 bg-transparent p-5 dark:border-light/15"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary dark:text-primaryDark">
            Entry 0{index + 1}
          </p>
          <h3 className="mt-2 text-2xl font-black">{note.title}</h3>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-dark/65 dark:text-light/65">
            {note.body}
          </p>
        </article>
      ))}
      <Link
        href="/articles"
        className="inline-flex w-fit items-center rounded-lg bg-dark px-4 py-3 text-sm font-bold text-light dark:bg-light dark:text-dark"
      >
        Open Articles
      </Link>
    </div>
  );
}

function ContactView() {
  return (
    <div className="grid h-full min-h-0 place-items-center p-5">
      <section className="w-full max-w-2xl rounded-lg border border-dark/15 bg-transparent p-8 text-center dark:border-light/15 sm:p-5">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary dark:text-primaryDark">
          Contact
        </p>
        <h2 className="mt-3 text-4xl font-black sm:text-3xl">
          Need mobile product delivery or architecture support?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-7 text-dark/65 dark:text-light/65">
          Email is the fastest path. Holmes AI can also answer basic fit
          questions before you reach out.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="mailto:ngduonganhhuy@gmail.com"
            className="rounded-lg bg-dark px-5 py-3 text-sm font-bold text-light dark:bg-light dark:text-dark"
          >
            Email Holmes
          </Link>
          {SOCIAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              className="rounded-lg border border-dark/15 px-5 py-3 text-sm font-bold dark:border-light/15"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Workspace({ activeView, activeFilter, setActiveFilter }) {
  return (
    <main className="h-full min-h-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          className="h-full min-h-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {activeView === "profile" && <ProfileView />}
          {activeView === "projects" && (
            <ProjectsView
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          )}
          {activeView === "skills" && <SkillsView />}
          {activeView === "notes" && <NotesView />}
          {activeView === "contact" && <ContactView />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

function LiteHome() {
  return (
    <>
      <Head>
        <title>{HOME_TITLE}</title>
        <meta name="description" content={HOME_DESCRIPTION} />
        <meta name="keywords" content={HOME_KEYWORDS} />
        <meta name="author" content="Nguyen Duong Anh Huy" />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESCRIPTION} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={SITE_OG_IMAGE} />
        <meta property="og:image:alt" content="Nguyen Duong Anh Huy mobile developer portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={getTwitterSite()} />
        <meta name="twitter:title" content={HOME_TITLE} />
        <meta name="twitter:description" content={HOME_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_OG_IMAGE} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_JSON_LD) }}
        />
      </Head>
      <main className="relative flex min-h-screen w-full items-start overflow-visible text-dark dark:text-light">
        <Layout className="pt-0 md:pt-16 sm:pt-8">
          <div className="flex w-full items-center justify-between gap-10 lg:flex-col">
            <ScrollReveal variant="fadeLeft" className="w-1/3 md:w-1/2">
              <Image
                src={profilePic}
                alt="Holmes"
                className="h-auto w-full lg:hidden md:inline-block md:w-full"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            </ScrollReveal>

            <ScrollReveal
              variant="fadeRight"
              delay={0.15}
              className="flex w-1/2 min-w-0 flex-col items-center self-center overflow-hidden lg:w-full lg:text-center"
            >
              <AnimatedText
                text="Transforming Ideas into Immersive Mobile Experiences."
                className="!break-words !text-left !text-6xl xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl"
              />
              <p className="my-4 max-w-full break-words text-base font-medium leading-7 md:text-sm sm:text-xs">
                As an aspiring Solution Architect and experienced Software Engineer, I am passionate about bridging
                business needs with technology solutions. I specialize in designing scalable architectures, leading
                technical decision-making, and delivering end-to-end software systems that drive business value. Through
                my projects and technical writings, I share insights on software architecture, system design,
                cloud-native applications, and modern engineering practices.
              </p>
              <div className="mt-2 flex items-center self-start lg:self-center">
                <Link
                  href={RESUME_PDF_PATH}
                  target="_blank"
                  className="flex items-center rounded-lg border border-solid border-transparent bg-dark p-2.5 px-6 text-lg font-semibold text-light hover:border-dark hover:bg-light hover:text-dark dark:bg-light dark:text-dark hover:dark:border-light hover:dark:bg-dark hover:dark:text-light md:p-2 md:px-4 md:text-base"
                  download={RESUME_FILE_NAME}
                >
                  Resume <LinkArrow className="ml-1 w-6" />
                </Link>
                <Link
                  href="mailto:ngduonganhhuy@gmail.com"
                  target="_blank"
                  className="ml-4 text-lg font-medium capitalize text-dark underline dark:text-light md:text-base"
                >
                  Contact
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </Layout>
        <HireMe />
        <div className="absolute bottom-8 right-8 inline-block w-24 md:hidden">
          <Image src={lightBulb} alt="Holmes" className="h-auto w-full" />
        </div>
      </main>
    </>
  );
}

function AssistantPanel() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isLoading]);

  const submitMessage = async (event, prompt) => {
    event?.preventDefault();
    const trimmed = (prompt || input).trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(1),
          currentPath: "/",
        }),
      });
      const data = await response.json();

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: response.ok
            ? data.reply
            : data.error || "Holmes AI is unavailable right now.",
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "Could not connect to Holmes AI. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="flex min-h-0 flex-col border-l border-dark/15 bg-dark/[0.03] dark:border-light/15 dark:bg-light/[0.04] xl:border-l-0 xl:border-t">
      <div className="border-b border-dark/15 p-5 dark:border-light/15">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary dark:text-primaryDark">
              AI assisted
            </p>
            <h2 className="mt-1 text-xl font-black">Ask Holmes AI</h2>
          </div>
          <StatusDot tone="primary" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={(event) => submitMessage(event, prompt)}
              className="rounded-lg border border-dark/15 px-3 py-2 text-left text-xs font-semibold text-dark/65 transition hover:border-dark/35 dark:border-light/15 dark:text-light/65 dark:hover:border-light/35"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={listRef}
        className="min-h-[300px] min-w-0 flex-1 space-y-3 overflow-y-auto overflow-x-hidden p-4"
      >
        {messages.map((message, index) => {
          const isUser = message.role === "user";
          return (
            <div
              key={`${message.role}-${index}`}
              className={`flex min-w-0 ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`min-w-0 max-w-[88%] overflow-hidden break-words whitespace-pre-wrap rounded-lg px-3 py-2 text-sm font-medium leading-6 ${
                  isUser
                    ? "bg-dark text-light dark:bg-light dark:text-dark"
                    : "border border-dark/15 bg-light text-dark dark:border-light/15 dark:bg-dark dark:text-light"
                }`}
                style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
              >
                {message.content}
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex min-w-0 justify-start">
            <div
              className="min-w-0 max-w-[88%] overflow-hidden break-words whitespace-pre-wrap rounded-lg border border-dark/15 bg-light px-3 py-2 text-sm font-medium dark:border-light/15 dark:bg-dark"
              style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
            >
              Thinking...
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={submitMessage}
        className="flex gap-2 border-t border-dark/15 p-3 dark:border-light/15"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about fit, projects, skills..."
          className="h-11 min-w-0 flex-1 rounded-lg border border-dark/15 bg-light px-3 text-sm font-medium outline-none transition focus:border-primary dark:border-light/15 dark:bg-dark dark:focus:border-primaryDark"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="grid h-11 w-11 place-items-center rounded-lg bg-dark text-light transition hover:bg-primary disabled:opacity-45 dark:bg-light dark:text-dark dark:hover:bg-primaryDark"
          aria-label="Send message"
        >
          <SendIcon className="h-5 w-5" />
        </button>
      </form>
    </aside>
  );
}

export default function Home() {
  const [activeView, setActiveView] = useState("profile");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isLiteMode, setIsLiteMode] = useState(false);
  const [isLiteModeMounted, setIsLiteModeMounted] = useState(false);
  const [isLiteOnlyViewport, setIsLiteOnlyViewport] = useState(false);
  const viewButtonRefs = useRef({});

  const changeActiveView = useCallback((nextView) => {
    setActiveView(nextView);
    window.requestAnimationFrame(() => {
      viewButtonRefs.current[nextView]?.focus();
    });
  }, []);

  const commands = useMemo(() => {
    const viewCommands = NAV_ITEMS.map((item) => ({
      label: `Open ${item.label}`,
      meta: `Switch workspace to ${item.label.toLowerCase()}`,
      group: "View",
      action: () => changeActiveView(item.id),
    }));

    const filterCommands = FILTERS.map((filter) => ({
      label: `Filter projects: ${filter}`,
      meta: "Open Project Desk and apply filter",
      group: "Project",
      action: () => {
        changeActiveView("projects");
        setActiveFilter(filter);
      },
    }));

    const projectCommands = [...FEATURED_PROJECTS, ...PROJECTS].map(
      (project) => ({
        label: project.title,
        meta: project.link ? "Open project link" : "Private project signal",
        group: "Project",
        action: () => {
          if (project.link)
            window.open(project.link, "_blank", "noopener,noreferrer");
          changeActiveView("projects");
        },
      }),
    );

    return [
      ...viewCommands,
      ...filterCommands,
      ...projectCommands,
      {
        label: "Email Holmes",
        meta: "ngduonganhhuy@gmail.com",
        group: "Contact",
        action: () => {
          window.location.href = "mailto:ngduonganhhuy@gmail.com";
        },
      },
      {
        label: "Open resume",
        meta: "Software Engineer PDF",
        group: "Contact",
        action: downloadResumePdf,
      },
    ];
  }, [changeActiveView]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsCommandOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setIsCommandOpen(false);
        return;
      }

      if (
        isTyping ||
        isCommandOpen ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      )
        return;

      const matchingView = NAV_ITEMS.find(
        (item) => item.shortcut.toLowerCase() === event.key.toLowerCase(),
      );
      if (matchingView) {
        event.preventDefault();
        changeActiveView(matchingView.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeActiveView, isCommandOpen]);

  useEffect(() => {
    const syncLiteMode = () => {
      setIsLiteMode(window.localStorage.getItem("portfolioLiteMode") === "true");
      setIsLiteModeMounted(true);
    };

    const handleLiteModeChange = (event) => {
      setIsLiteMode(Boolean(event.detail?.isLiteMode));
      setIsLiteModeMounted(true);
    };

    syncLiteMode();
    window.addEventListener("portfolio-lite-mode-change", handleLiteModeChange);
    window.addEventListener("storage", syncLiteMode);

    return () => {
      window.removeEventListener("portfolio-lite-mode-change", handleLiteModeChange);
      window.removeEventListener("storage", syncLiteMode);
    };
  }, []);

  useEffect(() => {
    const liteOnlyQuery = window.matchMedia(LITE_ONLY_VIEWPORT_QUERY);
    const syncLiteOnlyViewport = () => {
      const isLiteOnly = liteOnlyQuery.matches;
      setIsLiteOnlyViewport(isLiteOnly);

      if (isLiteOnly) {
        window.localStorage.setItem("portfolioLiteMode", "true");
        setIsLiteMode(true);
        setIsLiteModeMounted(true);
        window.dispatchEvent(
          new CustomEvent("portfolio-lite-mode-change", {
            detail: { isLiteMode: true },
          }),
        );
      }
    };

    syncLiteOnlyViewport();
    liteOnlyQuery.addEventListener("change", syncLiteOnlyViewport);

    return () => liteOnlyQuery.removeEventListener("change", syncLiteOnlyViewport);
  }, []);

  if (isLiteModeMounted && (isLiteMode || isLiteOnlyViewport)) {
    return <LiteHome />;
  }

  return (
    <>
      <Head>
        <title>{HOME_TITLE}</title>
        <meta name="description" content={HOME_DESCRIPTION} />
        <meta name="keywords" content={HOME_KEYWORDS} />
        <meta name="author" content="Nguyen Duong Anh Huy" />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESCRIPTION} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={SITE_OG_IMAGE} />
        <meta property="og:image:alt" content="Nguyen Duong Anh Huy mobile developer portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={getTwitterSite()} />
        <meta name="twitter:title" content={HOME_TITLE} />
        <meta name="twitter:description" content={HOME_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_OG_IMAGE} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_JSON_LD) }}
        />
      </Head>

      <section className="portfolio-os w-full bg-light px-8 py-10 text-dark dark:bg-dark dark:text-light xl:px-5 sm:px-3">
        <div className="mx-auto grid h-[calc(100vh-8rem)] min-h-[720px] max-w-[1500px] grid-cols-[280px_minmax(0,1fr)_360px] overflow-hidden rounded-lg border border-dark bg-light shadow-[10px_10px_0px_0px_#333333] dark:border-light dark:bg-dark dark:shadow-[10px_10px_0px_0px_#F2E7D5] xl:h-auto xl:min-h-0 xl:grid-cols-1">
          <Sidebar
            activeView={activeView}
            onChangeView={changeActiveView}
            viewButtonRefs={viewButtonRefs}
          />
          <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden xl:h-[calc(100dvh-12rem)] xl:min-h-[560px]">
            <TopBar onOpenCommand={() => setIsCommandOpen(true)} />
            <Workspace
              activeView={activeView}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </div>
          <AssistantPanel />
        </div>
      </section>

      <CommandPalette
        isOpen={isCommandOpen}
        query={query}
        setQuery={setQuery}
        commands={commands}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  );
}
