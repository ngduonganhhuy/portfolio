# Portfolio Project Notes

## Overview

This is a Next.js Pages Router portfolio website for Holmes / Nguyen Duong Anh Huy.

Main features:

- Portfolio pages: Home, About, Projects, Articles, Extensions
- Markdown-based articles
- Gemini-powered AI chatbot
- Theme selector with multiple visual themes
- Theme-specific decorative animations

## Project Structure

```text
src/
  components/          Reusable UI components
  contents/
    articles/          Markdown articles rendered on /articles
    chatbot/           Markdown knowledge used only by the chatbot
  data/                Static portfolio data and theme definitions
  hooks/               Client-side React hooks
  lib/                 Server/helper logic
  pages/               Next.js Pages Router pages and API routes
  styles/              Global Tailwind/CSS
public/
  images/              Profile, project, article assets
```

Important files:

- `src/pages/_app.js`: mounts global layout pieces such as navbar, footer, chatbot, theme decorations.
- `src/pages/_document.js`: applies saved theme before hydration to reduce flash/mismatch.
- `src/styles/globals.css`: global CSS variables, theme colors, theme animations.
- `tailwind.config.js`: Tailwind theme tokens and responsive config.

## Pages

- `/`: home page.
- `/about`: bio, skills, experience, education.
- `/projects`: featured and normal projects from `src/data/projects.js`.
- `/articles`: article listing from markdown files in `src/contents/articles`.
- `/articles/[slug]`: individual article page.
- `/extensions`: extension/tool listing from `src/data/extensions.js`.
- `/api/chatbot`: server API route for chatbot messages.

## Articles

Articles live in:

```text
src/contents/articles/
```

Each article is a markdown file with frontmatter:

```md
---
title: "Article title"
date: "2026-06-01"
time: 5 min read
cover: /images/articles/image.png
summary: "Short description"
tags:
  - Tag
---
```

Article helper:

```text
src/lib/article.js
```

It reads markdown files, parses frontmatter with `gray-matter`, and exposes:

- `getAllSlugs()`
- `getArticleBySlug(slug)`
- `getAllArticles()`

## Chatbot

The chatbot UI is:

```text
src/components/AIChatbot.js
```

It renders:

- fixed floating chat button
- open/close animation
- message panel
- input form

The API route is:

```text
src/pages/api/chatbot.js
```

It calls Gemini `generateContent` REST API:

```text
POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
```

Required environment variable:

```bash
GEMINI_API_KEY=your_key
```

Optional environment variable:

```bash
GEMINI_MODEL=gemini-2.5-flash-lite
```

If `GEMINI_MODEL` is missing, the route defaults to:

```text
gemini-2.5-flash-lite
```

Quota/rate limit responses are mapped to:

```text
Tôi nghèo nhưng tôi vẫn làm chatbot. Vì tôi là một dev nổi loạn :>
```

## Chatbot Knowledge

The chatbot is not fine-tuned. It uses prompt context/RAG-style knowledge.

Knowledge builder:

```text
src/lib/chatbotKnowledge.js
```

It collects public data from:

- `src/data/education.js`
- `src/data/extensions.js`
- `src/data/experience.js`
- `src/data/projects.js`
- `src/data/site.js`
- `src/data/skills.js`
- `src/contents/articles/*.md`
- `src/contents/chatbot/public-profile.md`

To add private-to-bot but public-safe information, edit:

```text
src/contents/chatbot/public-profile.md
```

Use this file for public personal profile facts, work preferences, contact guidance, and chatbot answering rules.

## Theme System

Theme definitions live in:

```text
src/data/themes.js
```

Each theme has:

```js
{
  id: "theme-id",
  name: "Theme Name",
  mode: "light" | "dark",
  swatches: ["#color1", "#color2", "#color3", "#color4"],
}
```

Current themes:

- `spring`
- `kungfu`
- `tet`
- `noel`
- `ocean`
- `classic`

Theme hook:

```text
src/hooks/useThemeSwitcher.js
```

Responsibilities:

- Reads saved theme from `localStorage.theme`
- Normalizes legacy values `light` and `dark`
- Applies `data-theme` to `<html>`
- Adds/removes the `dark` class based on theme mode
- Returns `isMounted` to avoid hydration mismatch in the theme dropdown

Theme dropdown:

```text
src/components/NavBar.js
```

The old light/dark toggle has been replaced with a dropdown list. Each option shows color swatches.

Theme boot script:

```text
src/pages/_document.js
```

This runs before React hydration and sets:

- `document.documentElement.dataset.theme`
- `document.documentElement.classList.add("dark")` for dark themes

## Theme Colors

Theme colors are CSS variables in:

```text
src/styles/globals.css
```

Variables:

```css
--color-light
--color-dark
--color-primary
--color-primary-dark
```

Tailwind maps these in:

```text
tailwind.config.js
```

So existing classes automatically respond to theme changes:

- `bg-light`
- `bg-dark`
- `text-light`
- `text-dark`
- `text-primary`
- `text-primaryDark`
- `dark:*`

## Theme Decorations

Theme decoration component:

```text
src/components/ThemeDecorations.js
```

It always renders the decoration markup, but CSS only displays the active theme's scene using:

```css
:root[data-theme="theme-id"] .theme-name-scene
```

This avoids hydration mismatch because React markup stays stable.

Current theme decorations:

- `tet`: falling yellow mai flowers and a dancing lion.
- `noel`: falling snow, Santa, and reindeer.
- `kungfu`: falling chi energy and a rotating bagua/yin-yang symbol.

Decoration CSS lives in:

```text
src/styles/globals.css
```

The decoration wrapper uses:

```css
pointer-events: none;
position: fixed;
inset: 0;
z-index: 20;
```

This prevents decorations from blocking page interactions.

## Adding A New Theme

1. Add a theme object to `src/data/themes.js`.
2. Add CSS variables in `src/styles/globals.css`:

```css
:root[data-theme="new-theme"] {
  --color-light: 255 255 255;
  --color-dark: 0 0 0;
  --color-primary: 200 20 40;
  --color-primary-dark: 50 200 180;
}
```

3. If it is a dark theme, add its id to `darkThemes` in `src/pages/_document.js`.
4. If it needs animation, add markup to `src/components/ThemeDecorations.js`.
5. Add CSS selectors and keyframes in `src/styles/globals.css`.
6. Run:

```bash
npm run build
```

## Hydration Notes

Avoid rendering different HTML on server and client based on `localStorage`.

Current mitigation:

- `_document.js` applies theme before hydration.
- `useThemeSwitcher.js` exposes `isMounted`.
- `NavBar.js` only renders the theme dropdown after mount and keeps a placeholder size.

If hydration errors appear again, check components that conditionally render icons, SVGs, or layout based on client-only state.

## Build Notes

Build command:

```bash
npm run build
```

The build may need network access because `next/font/google` fetches Montserrat from Google Fonts.

Lint command currently uses:

```bash
npm run lint
```

The existing script is `next lint`, which is not compatible with the current Next.js version in this project.
