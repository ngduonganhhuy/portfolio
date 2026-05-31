import fs from "fs";
import matter from "gray-matter";
import path from "path";

const articlesDir = path.join(process.cwd(), "src/contents/articles");

function extractDescription(content, maxLength = 160) {
  const text = content
    .replace(/#{1,6}\s+.+/g, "")
    .replace(/[*_`~>]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + "…" : text;
}

export function getAllSlugs() {
  return fs.readdirSync(articlesDir).map((file) => file.replace(".md", ""));
}

export function getArticleBySlug(slug) {
  const fullPath = path.join(articlesDir, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const description = data.summary || extractDescription(content);
  return { frontmatter: { ...data, description }, content, slug };
}

export function getAllArticles() {
  return getAllSlugs().map((slug) => {
    const { frontmatter } = getArticleBySlug(slug);
    return { slug, ...frontmatter };
  });
}
