import Head from "next/head";
import Link from "next/link";

const REPO_URL = "https://github.com/ngduonganhhuy/holmes-cli";

const TEMPLATE_LANGUAGES = [
  "TypeScript",
  "JavaScript",
  "Go",
  "Rust",
  "Python",
  "Dart",
  "Swift",
  "Kotlin",
  "Java",
  "C#",
  "PHP",
];

const COMMANDS = [
  {
    command: "holmes my-api --language go --template clean-architecture",
    label: "Create a project from a language template.",
  },
  {
    command: "holmes mobile-core --language dart --github-actions --docker",
    label: "Include optional tooling when the project needs it.",
  },
  {
    command: "holmes upgrade --dry-run",
    label: "Preview the upgrade command before changing your install.",
  },
];

const FEATURES = [
  {
    title: "Multi-language scaffolding",
    body: "Generate starting projects for backend, mobile, and systems stacks from one CLI.",
  },
  {
    title: "Template options",
    body: "Pick language, architecture, license, tests, Docker, GitHub Actions, package manager, and output directory.",
  },
  {
    title: "Built for repeatable setup",
    body: "The CLI is written in TypeScript, ships a `holmes` binary, and supports dry-run previews.",
  },
];

function ArrowIcon({ className = "" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className} fill="none">
      <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GithubIcon({ className = "" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.5v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.66.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.34 9.34 0 0 1 12 6.96c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.57 5.06.36.33.68.97.68 1.95v2.9c0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function TerminalWindow() {
  return (
    <div className="border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-[10px_10px_0px_0px_rgba(20,184,166,0.55)]">
      <div className="flex h-11 items-center gap-2 border-b border-zinc-800 px-4">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-500" />
        <span className="ml-3 text-xs font-semibold text-zinc-500">cli.holmes.id.vn</span>
      </div>
      <div className="space-y-5 p-5 font-mono text-sm leading-7 sm:text-xs">
        <p><span className="text-teal-300">$</span> holmes new checkout-api --language typescript --template clean-architecture</p>
        <div className="space-y-1 text-zinc-300">
          <p><span className="text-emerald-300">?</span> Include tests? yes</p>
          <p><span className="text-emerald-300">?</span> Include Dockerfile? yes</p>
          <p><span className="text-emerald-300">?</span> Include GitHub Actions? yes</p>
        </div>
        <div className="border-l border-teal-400/60 pl-4 text-zinc-400">
          <p>Creating project scaffold</p>
          <p>Writing template files</p>
          <p className="text-teal-200">Done. Your project is ready.</p>
        </div>
      </div>
    </div>
  );
}

export default function HolmesCliPage() {
  return (
    <>
      <Head>
        <title>Holmes CLI | Project template generator</title>
        <meta
          name="description"
          content="Holmes CLI generates project scaffolding for TypeScript, Go, Rust, Python, Dart, Swift, Kotlin, Java, C#, PHP, and JavaScript."
        />
        <meta property="og:title" content="Holmes CLI" />
        <meta property="og:description" content="Generate project scaffolding for multiple programming languages from one terminal command." />
        <meta property="og:url" content="https://cli.holmes.id.vn" />
        <meta property="og:type" content="website" />
      </Head>

      <main className="min-h-screen bg-[#f6f1e8] text-zinc-950">
        <section className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-[1fr_0.9fr] items-center gap-12 px-8 py-8 lg:grid-cols-1 lg:items-start lg:py-6 sm:px-5">
          <div className="flex min-h-[calc(100vh-4rem)] flex-col justify-between gap-10 lg:min-h-0">
            <header className="flex items-center justify-between gap-4">
              <Link href="https://holmes.id.vn" className="text-sm font-black uppercase tracking-[0.18em]">
                Holmes
              </Link>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 border border-zinc-950 bg-zinc-950 px-4 text-sm font-bold text-white transition hover:bg-teal-500 hover:text-zinc-950"
              >
                <GithubIcon className="h-5 w-5" />
                GitHub
              </a>
            </header>

            <div className="max-w-3xl">
              <p className="mb-5 inline-flex border border-zinc-950 bg-teal-300 px-3 py-1 text-sm font-black uppercase tracking-[0.16em]">
                Holmes CLI
              </p>
              <h1 className="text-7xl font-black leading-[0.95] tracking-normal xl:text-6xl md:text-5xl sm:text-4xl">
                Generate project templates from the terminal.
              </h1>
              <p className="mt-7 max-w-2xl text-xl font-medium leading-8 text-zinc-700 md:text-lg md:leading-7">
                A Node.js CLI that scaffolds projects across multiple languages, with switches for architecture, tests, Docker, GitHub Actions, license, package manager, and output path.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center gap-2 border border-zinc-950 bg-zinc-950 px-5 text-base font-black text-white transition hover:bg-teal-500 hover:text-zinc-950"
                >
                  View repository
                  <ArrowIcon className="h-5 w-5" />
                </a>
                <a
                  href="#usage"
                  className="inline-flex h-12 items-center border border-zinc-950 bg-white px-5 text-base font-black text-zinc-950 transition hover:bg-amber-200"
                >
                  See commands
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
              {FEATURES.map((feature) => (
                <article key={feature.title} className="border border-zinc-950 bg-white p-5 shadow-[5px_5px_0px_0px_#18181b]">
                  <h2 className="text-lg font-black">{feature.title}</h2>
                  <p className="mt-3 text-sm font-medium leading-6 text-zinc-700">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:pb-10">
            <TerminalWindow />
            <div className="border border-zinc-950 bg-white p-5 shadow-[6px_6px_0px_0px_#14b8a6]">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-zinc-500">Template languages</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {TEMPLATE_LANGUAGES.map((language) => (
                  <span key={language} className="border border-zinc-950 bg-[#f6f1e8] px-3 py-1 text-sm font-bold">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="usage" className="border-t border-zinc-950 bg-white px-8 py-20 sm:px-5">
          <div className="mx-auto grid max-w-7xl grid-cols-[0.65fr_1fr] gap-10 lg:grid-cols-1">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-teal-700">Usage</p>
              <h2 className="mt-3 text-4xl font-black leading-tight md:text-3xl">Commands that match the current CLI surface.</h2>
              <p className="mt-5 text-base font-medium leading-7 text-zinc-700">
                The repository currently exposes a `holmes` binary, a default project creation command, and an `upgrade` command. Install from the repo or a published package when available.
              </p>
            </div>

            <div className="grid gap-4">
              {COMMANDS.map((item) => (
                <article key={item.command} className="border border-zinc-950 bg-zinc-950 p-5 text-white">
                  <p className="font-mono text-sm text-teal-200">$ {item.command}</p>
                  <p className="mt-3 text-sm font-medium text-zinc-300">{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

HolmesCliPage.hideSiteChrome = true;
