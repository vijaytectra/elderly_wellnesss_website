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
 * WordPress FAQ conversion sometimes leaves unmatched `</div>` after
 * `<details>` blocks. The browser then closes React layout wrappers
 * (Container) during parse, which shows up as a hydration mismatch.
 */
function dropOrphanClosingDivs(html: string): string {
  let depth = 0;
  return html.replace(/<div\b[^>]*\/?\s*>|<\/div\s*>/gi, (tag) => {
    const isClose = /^<\//.test(tag);
    const isSelfClosing = /\/\s*>$/.test(tag);
    if (isClose) {
      if (depth === 0) return "";
      depth -= 1;
      return tag;
    }
    if (!isSelfClosing) depth += 1;
    return tag;
  });
}

const DEFAULT_APP_CTA = `<div class="ew-blog-cta ew-blog-cta--app">
<p class="ew-blog-cta__eyebrow">ELDERLY CARE PLUS APP</p>
<h3>Find trusted care for your loved ones at home.</h3>
<p>Book vetted nurses, physiotherapists, and caregivers in Chennai from the Elderly Wellness app.</p>
<p class="ew-blog-cta__action"><a class="ew-blog-cta__btn" href="https://play.google.com/store/apps/details?id=com.elderly.nri">Download the App →</a></p>
</div>`;

export function getBlogBySlug(slug: string): { meta: BlogMeta; html: string } {
  const meta = JSON.parse(
    readFileSync(resolve(CONTENT_DIR, `${slug}.meta.json`), "utf8"),
  ) as BlogMeta;
  let html = dropOrphanClosingDivs(
    readFileSync(resolve(CONTENT_DIR, `${slug}.html`), "utf8"),
  );
  if (!html.includes("ew-blog-cta")) {
    html = `${html}\n${DEFAULT_APP_CTA}`;
  }
  return { meta, html };
}

/** Pull Rank Math / "In This Guide" TOC out of the article for a sidebar. */
export function splitBlogToc(html: string): { tocHtml: string | null; bodyHtml: string } {
  const start = html.search(/<div[^>]*class="[^"]*wp-block-rank-math-toc-block[^"]*"[^>]*>/i);
  if (start === -1) return { tocHtml: null, bodyHtml: html };

  let depth = 0;
  let i = start;
  while (i < html.length) {
    const nextOpen = html.indexOf("<div", i);
    const nextClose = html.indexOf("</div>", i);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
    } else {
      depth -= 1;
      i = nextClose + 6;
      if (depth === 0) {
        const tocHtml = html.slice(start, i);
        const bodyHtml = `${html.slice(0, start)}${html.slice(i)}`.trim();
        return { tocHtml, bodyHtml };
      }
    }
  }
  return { tocHtml: null, bodyHtml: html };
}

export interface BlogTocItem {
  href: string;
  label: string;
}

/** Top-level TOC links for the sticky “In This Article” sidebar. */
export function getBlogTocItems(tocHtml: string | null): BlogTocItem[] {
  if (!tocHtml) return [];
  const navMatch = tocHtml.match(/<nav[^>]*>([\s\S]*?)<\/nav>/i);
  const chunk = navMatch?.[1] ?? tocHtml;
  const topUl = chunk.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
  const list = topUl?.[1] ?? chunk;
  const items: BlogTocItem[] = [];
  const liRe = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
  let m: RegExpExecArray | null;
  while ((m = liRe.exec(list))) {
    const inner = m[1] ?? "";
    const a = inner.match(/<a\b[^>]*href="(#[^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
    if (!a?.[1]) continue;
    const label = a[2]?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (!label) continue;
    items.push({ href: a[1], label });
  }
  return items;
}

/**
 * Return up to `count` blog entries that are not `excludeSlug`, in
 * newest-first order. Used for the "related posts" strip and the
 * homepage's latest-3 section.
 */
export function getRelatedBlogs(excludeSlug: string, count: number): readonly BlogIndexEntry[] {
  return INDEX.filter((e) => e.slug !== excludeSlug).slice(0, count);
}

/** Locality posts listed on the legacy Chennai category archive. */
const CHENNAI_LOCATION_SLUGS: readonly string[] = [
  "elderly-care-services-in-ambattur",
  "elderly-care-services-in-alwarthirunagari",
  "elderly-care-services-in-alwarpet",
  "elderly-care-services-in-alapakkam",
  "elderly-care-services-in-alandur",
  "elderly-care-services-in-adyar",
  "elderly-care-services-in-adambakkam",
  "elderly-care-services-in-chennai",
];

export function getChennaiLocationBlogs(): readonly BlogIndexEntry[] {
  return CHENNAI_LOCATION_SLUGS.map((slug) =>
    INDEX.find((e) => e.slug === slug),
  ).filter((e): e is BlogIndexEntry => e != null);
}
