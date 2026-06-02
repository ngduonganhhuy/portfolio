import fs from "fs";
import path from "path";

const booksDir = path.join(process.cwd(), "public/images/books");

function titleFromFileName(fileName) {
  return fileName
    .replace(/\.pdf$/i, "")
    .replace(/\s+-\s+/g, " - ")
    .trim();
}

export function getAllEbooks() {
  if (!fs.existsSync(booksDir)) return [];

  return fs
    .readdirSync(booksDir)
    .filter((fileName) => fileName.toLowerCase().endsWith(".pdf"))
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => ({
      fileName,
      title: titleFromFileName(fileName),
      href: encodeURI(`/images/books/${fileName}`),
    }));
}
