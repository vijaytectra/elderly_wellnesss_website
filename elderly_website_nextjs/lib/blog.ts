import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import indexData from "@/content/blogs/_index.json";

export interface BlogIndexEntry {
  slug: string;
  title: string;
  description: string;
  image: string;
  publishedTime: string;
  modifiedTime: string;
  path: string;
}

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  publishedTime: string;
  modifiedTime: string;
  keywords?: string;
  author: { name: string };
  wordCount: number;
  readingMinutes: number;
}

const CONTENT_DIR = resolve(process.cwd(), "content", "blogs");
const INDEX: readonly BlogIndexEntry[] = indexData as BlogIndexEntry[];

export function getAllBlogs(): readonly BlogIndexEntry[] {
  return INDEX;
}

export function getAllSlugs(): readonly string[] {
  return INDEX.map((e) => e.slug);
}

export function getBlogIndexEntry(slug: string): BlogIndexEntry | null {
  return INDEX.find((e) => e.slug === slug) ?? null;
}

/**
 * Read the extracted article HTML + metadata for a given slug from disk.
 * Called at build time only (Server Components). Throws if the slug does
 * not exist — callers should check `getBlogIndexEntry(slug)` first and
 * call `notFound()` on a miss.
 */
export function getBlogBySlug(slug: string): { meta: BlogMeta; html: string } {
  const meta = JSON.parse(
    readFileSync(resolve(CONTENT_DIR, `${slug}.meta.json`), "utf8"),
  ) as BlogMeta;
  const html = readFileSync(resolve(CONTENT_DIR, `${slug}.html`), "utf8");
  return { meta, html };
}

/**
 * Return up to `count` blog entries that are not `excludeSlug`, in
 * newest-first order. Used for the "related posts" strip and the
 * homepage's latest-3 section.
 */
export function getRelatedBlogs(excludeSlug: string, count: number): readonly BlogIndexEntry[] {
  return INDEX.filter((e) => e.slug !== excludeSlug).slice(0, count);
}
