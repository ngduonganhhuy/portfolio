import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "src/contents/articles");

export function getAllSlugs() {
  return fs.readdirSync(articlesDir).map((file) => file.replace(".md", ""));
}

export function getArticleBySlug(slug) {
  const fullPath = path.join(articlesDir, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    frontmatter: data,
    content,
  };
}
