# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production server (uses server.js on port 3000)
npm run lint     # Run ESLint
```

There are no tests in this project.

## Architecture

This is a **Next.js 16** personal portfolio site using the Pages Router (not App Router). Styling is done with **Tailwind CSS** and animations with **Framer Motion**.

### Pages

- `/` — Home (index.js): hero section with profile image, intro text, resume download
- `/about` — About page with skills, experience, and education
- `/projects` — Projects showcase
- `/articles` — Article listing page with featured articles and an "All Articles" list
- `/articles/[slug]` — Dynamic article detail page

### Article System

Articles are Markdown files in `src/contents/articles/`. The `src/lib/article.js` utility reads them at build time using `gray-matter` for frontmatter parsing. Articles use `getStaticPaths` + `getStaticProps` for SSG.

Frontmatter fields: `title`, `date`, `time` (read time), `cover` (image path relative to `/public`), `tags`.

Articles are rendered via `react-markdown` with `remark-gfm` and `rehype-highlight` for syntax highlighting. The article detail page uses `@tailwindcss/typography` (`prose` class) for markdown styling.

**To add a new article:** create a `.md` file in `src/contents/articles/` with the required frontmatter, then manually add it to the articles listing in `src/pages/articles/index.js` (the listing is hardcoded, not auto-generated).

### Theme

Dark/light mode is toggled via the `useThemeSwitcher` hook (`src/components/hooks/useThemeSwitcher.js`) using Tailwind's `darkMode: "class"` strategy. Custom colors are defined in `tailwind.config.js`:
- `light`: `#F2E7D5`, `dark`: `#333333`
- `primary`: `#B63E96` (light mode accent), `primaryDark`: `#58E6D9` (dark mode accent)

### Path Alias

`@/` maps to `src/` (configured in `jsconfig.json`).

### Production Server

`npm run start` uses a custom `server.js` (Node.js HTTP + Next.js) instead of `next start`. This runs on port 3000.

### Responsive Breakpoints

Tailwind breakpoints are **max-width** (mobile-first inverted): `xs` ≤479px, `sm` ≤639px, `md` ≤767px, `lg` ≤1023px, `xl` ≤1279px, `2xl` ≤1535px.
