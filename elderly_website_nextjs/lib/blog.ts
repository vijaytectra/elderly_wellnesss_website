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
