import { EDUCATION } from "@/data/education";
import { MY_EXTENSIONS } from "@/data/extensions";
import { EXPERIENCES } from "@/data/experience";
import { FEATURED_PROJECTS, PROJECTS } from "@/data/projects";
import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "@/data/site";
import { SKILLS } from "@/data/skills";
import { getAllSlugs, getArticleBySlug } from "@/lib/article";
import fs from "fs";
import path from "path";

function compactText(text = "") {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`~]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function readPublicProfileMarkdown() {
  const fullPath = path.join(process.cwd(), "src/contents/chatbot/public-profile.md");

  if (!fs.existsSync(fullPath)) return "";

  return fs.readFileSync(fullPath, "utf8");
}

function plainTextLines(text = "") {
  return text
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .split("\n")
    .map((line) =>
      line
        .replace(/^\s*[-+]\s+/, "- ")
        .replace(/[#>*_`~]/g, "")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean)
    .join("\n");
}

function extractMarkdownSection(markdown = "", heading) {
  const startIndex = markdown.indexOf(heading);
  if (startIndex < 0) return "";

  const sectionStart = startIndex + heading.length;
  const rest = markdown.slice(sectionStart);
  const nextHeadingIndex = rest.search(/\n(?:#{1,6}\s|\*\*[^*\n]+\*\*)/);
  const section = nextHeadingIndex >= 0 ? rest.slice(0, nextHeadingIndex) : rest;

  return plainTextLines(`${heading}\n${section}`);
}

function listProjects(projects) {
  return projects
    .map((project) => {
      const link = project.link ? ` Link: ${project.link}.` : " Link: private/not public.";
      const summary = project.summary ? ` ${project.summary}` : "";
      return `- ${project.title} (${project.type}).${summary}${link}`;
    })
    .join("\n");
}

function listExperiences() {
  return EXPERIENCES.map(
    (item) =>
      `- ${item.position} at ${item.company}, ${item.time}, ${item.address}. Work: ${compactText(item.work)}`
  ).join("\n");
}

function listArticles() {
  return getAllSlugs()
    .map((slug) => {
      const article = getArticleBySlug(slug);
      const { title, date, time, summary, tags = [] } = article.frontmatter;
      const body = compactText(article.content).slice(0, 2200);
      return [
        `Article: ${title}`,
        `URL: ${SITE_URL}/articles/${slug}`,
        `Date: ${date || "unknown"}, read time: ${time || "unknown"}`,
        `Tags: ${tags.join(", ") || "none"}`,
        `Summary: ${summary || article.frontmatter.description || "No summary"}`,
        `Content excerpt: ${body}`,
      ].join("\n");
    })
    .join("\n\n");
}

function getPublicProfileKnowledge() {
  return compactText(readPublicProfileMarkdown());
}

export function buildChatbotGoldenRules() {
  const rules = extractMarkdownSection(
    readPublicProfileMarkdown(),
    "**Quy tắc vàng trong conversation**",
  );

  return (
    rules ||
    [
      "Quy tắc vàng trong conversation",
      "- Trả lời ngắn gọn, tự nhiên theo văn nói.",
      "- Chỉ trả về text thường, không dùng HTML hay Markdown phức tạp.",
      "- Format output rõ ràng, dễ đọc.",
    ].join("\n")
  );
}

export function buildChatbotKnowledge() {
  return [
    `Site: ${SITE_NAME} (${SITE_URL})`,
    `Owner: ${SITE_AUTHOR}, also uses the nickname Holmes.`,
    "Primary profile: Mobile Developer / Software Engineer with 5+ years of experience, focused on Swift, Flutter, React Native, scalable mobile architecture, clean code, and growing toward Solution Architect work.",
    "Contact: ngduonganhhuy@gmail.com. Resume: /NguyenDuongAnhHuy_SoftwareEngineer.pdf.",
    "",
    "Public profile knowledge:",
    getPublicProfileKnowledge(),
    "",
    "Skills:",
    SKILLS.map((skill) => `- ${skill.name}`).join("\n"),
    "",
    "Experience:",
    listExperiences(),
    "",
    "Education:",
    EDUCATION.map((item) => `- ${item.type}, ${item.time}, ${item.place}. ${item.info}`).join("\n"),
    "",
    "Featured projects:",
    listProjects(FEATURED_PROJECTS),
    "",
    "Projects:",
    listProjects(PROJECTS),
    "",
    "Extensions/tools by Holmes:",
    MY_EXTENSIONS.map(
      (item) =>
        `- ${item.title}: ${item.description} Category: ${item.category}. Tags: ${item.tags.join(", ")}. Link: ${item.link}.`
    ).join("\n"),
    "",
    "Articles:",
    listArticles(),
  ].join("\n");
}
