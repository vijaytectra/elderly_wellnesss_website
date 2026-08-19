/**
 * Blog extraction pipeline (Phase 4).
 *
 * Reads the legacy WordPress-exported HTML at `../blogs/{slug}/index.html`,
 * extracts the article body via the confirmed `.entry-content` selector,
 * strips WordPress chrome (scripts, styles, comment sections, sidebars,
 * post-navigation, byline, share bars, breadcrumb widgets, etc.), rewrites
 * legacy asset/link URLs to Next-friendly paths, and emits:
 *
 *   content/blogs/{slug}.html          -- cleaned article HTML
 *   content/blogs/{slug}.meta.json     -- metadata (title, description,
 *                                         canonical, ogImage, published/modified,
 *                                         keywords, author, wordCount, readingMinutes)
 *   content/blogs/_index.json          -- listing feed (newest first)
 *
 * Runs before `next build` via the `prebuild` script in package.json.
 * Deterministic: given the same source HTML + manifest, the output is
 * byte-stable.
 *
 * Design notes are in
 *   docs/superpowers/specs/2026-08-18-nextjs-migration-design.md
 *   docs/MIGRATION_INVENTORY.md §3 (article selector + strip list)
 *   docs/PHASE1_DECISIONS.md §4 (canonical host = https://www.theelderlywellness.com)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse, HTMLElement } from "node-html-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const NEXT_APP_ROOT = resolve(__dirname, "..");
const REPO_ROOT = resolve(NEXT_APP_ROOT, "..");
const BLOGS_SRC_DIR = resolve(REPO_ROOT, "blogs");
const MANIFEST_PATH = resolve(BLOGS_SRC_DIR, "blog-manifest.json");
const OUT_DIR = resolve(NEXT_APP_ROOT, "content", "blogs");

const SITE_URL_WWW = "https://www.theelderlywellness.com";
const SITE_URL_APEX = "https://theelderlywellness.com";
const DEFAULT_OG_IMAGE = "/images/logo.png";
const DEFAULT_AUTHOR = "Elderly Wellness";

interface ManifestEntry {
  title: string;
  description: string;
  date: string;
  link: string;
  slug: string;
  image: string;
}

interface BlogMeta {
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

interface IndexEntry {
  slug: string;
  title: string;
  description: string;
  image: string;
  publishedTime: string;
  modifiedTime: string;
  path: string;
}

/* ------------------------------------------------------------------------ */
/* HTML entity decoding for titles (manifest sometimes has &amp;, &#8217;) */
/* ------------------------------------------------------------------------ */

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
};

function decodeEntities(input: string): string {
  return input
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) =>
      String.fromCodePoint(parseInt(code, 16)),
    )
    .replace(/&([a-zA-Z]+);/g, (whole, name) =>
      Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, name)
        ? (NAMED_ENTITIES[name] ?? whole)
        : whole,
    );
}

/* ------------------------------------------------------------------------ */
/* URL rewrites                                                              */
/* ------------------------------------------------------------------------ */

/**
 * Rewrite a single URL discovered in article HTML.
 * Rules (documented in the Phase 4 task spec):
 *   1. Absolute canonical origin (with or without www) -> strip origin
 *   2. `.../blogs/{slug}/index.html` -> `/blogs/{slug}/`
 *   3. `.../blogs/{slug}/` (relative or absolute) -> `/blogs/{slug}/`
 *   4. `../wp-content/uploads/...` or `blogs/wp-content/...` ->
 *      `/blogs/wp-content/uploads/...`
 *   5. `../../images/...` -> `/images/...`
 *   6. `../foo.html` (parent = top-level page) -> `/foo/`
 *   7. Root-relative `/foo.html` -> `/foo/`
 *   8. Root-relative `/images/...`, `/blogs/...`, `/wp-content/...` preserved
 *   9. `#anchor`, `tel:`, `mailto:`, external URLs preserved as-is
 *  10. Author URL (`../author/elderly` etc.) -> `/blogs/` (author archive is dropped)
 *  11. Category/tag URLs (`../category/...`, `../tag/...`) -> `/blogs/`
 *  12. Root-relative `/known-blog-slug/` -> `/blogs/{slug}/` (WP mixed permalinks)
 */
const EXTRA_ALIASES: Readonly<Record<string, string>> = {
  "exercise-for-seniors-over-75": "exercises-for-seniors-over-75",
  "comprehensive-guide-to-caregivers": "what-is-caregivers",
  "the-inspiring-journey-of-eldery": "journey-of-eldery",
};

let blogSlugSet = new Set<string>();

function rewriteUrl(raw: string): string {
  if (!raw) return raw;
  const url = raw.trim();

  // 1. Fragment / mailto / tel / javascript / data
  if (
    url.startsWith("#") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("javascript:") ||
    url.startsWith("data:")
  ) {
    return url;
  }

  // 2. Strip our own origin (http/https, www/apex)
  let s = url;
  const originMatch = s.match(
    /^https?:\/\/(?:www\.)?theelderlywellness\.com(?::\d+)?(\/.*)?$/i,
  );
  if (originMatch) {
    s = originMatch[1] || "/";
  } else if (/^https?:\/\//i.test(s) || s.startsWith("//")) {
    return s;
  }

  // Now `s` is a site-relative URL. Normalize `../` etc. against the source
  // blog post directory `/blogs/{slug}/`. But keep the results as clean paths.
  // Rather than a full URL resolver, apply the specific patterns we see.

  // Author archive.
  if (/\/?(\.\.\/)?author\//.test(s)) {
    return "/blogs/";
  }

  // Category / tag archives.
  if (/\/?(\.\.\/)?(category|tag)\//.test(s)) {
    return "/blogs/";
  }

  // `../../images/blogs/foo.png` -> `/images/blogs/foo.png`
  if (s.startsWith("../../images/")) {
    return "/" + s.slice("../../".length);
  }
  if (s === "../../" || s === "../.." || s === "../../.") {
    return "/";
  }
  if (s.startsWith("../../")) {
    // Any other `../../foo(.html)?(/)?` — treat as top-level page.
    const rest = s.slice("../../".length);
    return normalizeTopLevel(rest);
  }
  // `../` on its own resolves to the parent (i.e. `/blogs/`).
  if (s === "../" || s === ".." || s === "../.") {
    return "/blogs/";
  }

  // `../wp-content/uploads/...` -> `/blogs/wp-content/uploads/...`
  if (s.startsWith("../wp-content/")) {
    return "/blogs/" + s.slice("../".length);
  }

  // `../{other-slug}/index.html` or `../{other-slug}/` -> `/blogs/{other-slug}/`
  if (s.startsWith("../")) {
    const rest = s.slice("../".length);
    // Sibling blog folder (relative to /blogs/{slug}/ -> /blogs/{sibling}/)
    // If the first segment doesn't look like a top-level page, treat as
    // sibling blog slug.
    const firstSeg = rest.split(/[/#?]/)[0] ?? "";
    if (firstSeg && !firstSeg.endsWith(".html")) {
      return "/blogs/" + normalizeBlogRelative(rest);
    }
    // Otherwise a legacy top-level page reference (e.g. `../about.html`).
    return normalizeTopLevel(rest);
  }

  // Root-relative
  if (s.startsWith("/")) {
    // `/blogs/{slug}/index.html` -> `/blogs/{slug}/`
    if (s.endsWith("/index.html")) {
      return s.slice(0, -"index.html".length);
    }
    // `/blogs/wp-content/...` preserved
    if (s.startsWith("/blogs/wp-content/")) return s;
    // `/wp-content/uploads/...` -> `/blogs/wp-content/uploads/...`
    if (s.startsWith("/wp-content/uploads/")) {
      return "/blogs" + s;
    }
    // `/images/...` preserved
    if (s.startsWith("/images/")) return s;
    if (s === "/index" || s === "/index/" || s === "/index.html") return "/";
    if (/^\/blogs\/(?:page|author|category|tag)(?:\/|$)/i.test(s)) return "/blogs/";
    if (/^\/blogs\/\d+\/?$/.test(s)) return "/blogs/";
    const asBlog = maybeBlogPath(s);
    if (asBlog) return asBlog;
    // `/blogs/*` preserved (after alias check above)
    if (s.startsWith("/blogs/")) return s;
    // Root-relative `.html` -> clean path (blog slug.html included)
    if (s.endsWith(".html")) {
      const fromHtml = maybeBlogPath("/" + s.slice(1).replace(/\.html$/i, ""));
      if (fromHtml) return fromHtml;
      return normalizeTopLevel(s.slice(1));
    }
    return s;
  }

  // Bare relative (no `..` or `/`), rare inside article HTML.
  if (s.startsWith("blogs/wp-content/")) {
    return "/" + s;
  }
  if (s.endsWith(".html")) {
    return normalizeTopLevel(s);
  }

  return s;
}

/**
 * `/slug` or `/blogs/typo-slug` -> canonical `/blogs/{slug}/` when known.
 */
function maybeBlogPath(pathname: string): string | null {
  const m = pathname.match(/^\/(?:blogs\/)?([^/?#]+)\/?(?:index\.html)?([?#].*)?$/i);
  if (!m?.[1] || m[1] === "blogs") return null;
  const rawSlug = m[1].replace(/\.html$/i, "");
  if (rawSlug === "page" || rawSlug === "author" || rawSlug === "category" || rawSlug === "tag") {
    return "/blogs/";
  }
  const slug = EXTRA_ALIASES[rawSlug] ?? rawSlug;
  if (!blogSlugSet.has(slug)) return null;
  return `/blogs/${slug}/${m[2] ?? ""}`;
}

function normalizeTopLevel(rest: string): string {
  const m = rest.match(/^([^?#]+?)(?:\.html)?([?#].*)?$/);
  if (!m) return "/" + rest;
  const [, base, suffix] = m;
  if (!base) return "/" + rest;
  return "/" + base.replace(/\/+$/, "") + "/" + (suffix ?? "");
}

/**
 * Ensure a sibling-blog reference ends with `/` (not `/index.html`, not bare
 * slug). Preserves hash / query.
 */
function normalizeBlogRelative(rest: string): string {
  // strip trailing `index.html`
  let s = rest.replace(/\/index\.html(?=([?#]|$))/, "/");
  // ensure trailing slash before any hash/query
  const m = s.match(/^([^?#]*)([?#].*)?$/);
  if (!m) return s;
  const [, base, suffix] = m;
  if (!base) return s;
  const withSlash = base.endsWith("/") ? base : base + "/";
  return withSlash + (suffix ?? "");
}

/* ------------------------------------------------------------------------ */
/* Article extraction                                                        */
/* ------------------------------------------------------------------------ */

const STRIP_SELECTORS = [
  "script",
  "style",
  ".post-views",
  "nav.post-navigation",
  "#nav-below",
  "footer.entry-meta",
  ".sharedaddy",
  ".jetpack-sharing",
  ".addtoany_share_save_container",
  ".chaty-widget",
  "#chaty-widget",
  "#wpadminbar",
  ".wp-smiley",
  "img.wp-smiley",
] as const;

/**
 * Locate the article body inside a parsed WP-exported HTML document.
 * Selector priority per audit §3:
 *   1. `article > .inside-article > .entry-content`
 *   2. `article .entry-content`
 *   3. `main#main .entry-content`
 *   4. `main .entry-content`
 *   5. `main` (last-ditch)
 */
function findArticleBody(root: HTMLElement): HTMLElement | null {
  const selectors = [
    "article > .inside-article > .entry-content",
    "article .entry-content",
    "main#main .entry-content",
    "main .entry-content",
    "main",
  ];
  for (const sel of selectors) {
    const el = root.querySelector(sel);
    if (el) return el;
  }
  return null;
}

function stripUnwantedElements(article: HTMLElement): void {
  for (const sel of STRIP_SELECTORS) {
    for (const node of article.querySelectorAll(sel)) {
      node.remove();
    }
  }
  // Remove empty paragraphs at extremities.
  trimEmptyEdges(article);
}

function trimEmptyEdges(article: HTMLElement): void {
  const isEmpty = (n: HTMLElement) => {
    const t = n.text.replace(/ |\s/g, "");
    return t.length === 0 && n.querySelectorAll("img,figure,table,iframe,video").length === 0;
  };
  // Leading
  while (article.firstChild && article.firstChild instanceof HTMLElement) {
    const el = article.firstChild;
    if (el.tagName?.toLowerCase() === "p" && isEmpty(el)) {
      el.remove();
    } else {
      break;
    }
  }
  // Trailing
  while (article.lastChild && article.lastChild instanceof HTMLElement) {
    const el = article.lastChild;
    if (el.tagName?.toLowerCase() === "p" && isEmpty(el)) {
      el.remove();
    } else {
      break;
    }
  }
}

/**
 * Convert Rank Math FAQ blocks into native <details>/<summary> accordions.
 * Legacy structure:
 *   <div class="rank-math-list-item"><h3 class="rank-math-question">Q</h3>
 *     <div class="rank-math-answer"><p>A</p></div></div>
 * Emitted:
 *   <details class="ew-faq-item"><summary class="ew-faq-question">Q</summary>
 *     <div class="ew-faq-answer"><p>A</p></div></details>
 *
 * String-based transform (node-html-parser cannot rename tags in place).
 * Also unwraps the outer rank-math-list / rank-math-block containers so
 * they don't offset the newly-converted <details> elements visually.
 * The article CSS (app/globals.css .ew-faq-*) styles these as an
 * animated +/- accordion. Works without JS.
 */
function convertRankMathFaqToDetails(html: string): string {
  let out = html;
  // Replace each list-item block. The pattern tolerates whitespace variations
  // and arbitrary attribute order on the source divs.
  out = out.replace(
    /<div[^>]*class="[^"]*\brank-math-list-item\b[^"]*"[^>]*>\s*<h3[^>]*class="[^"]*\brank-math-question\b[^"]*"[^>]*>([\s\S]*?)<\/h3>\s*<div[^>]*class="[^"]*\brank-math-answer\b[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g,
    (_, q: string, a: string) =>
      `<details class="ew-faq-item"><summary class="ew-faq-question">${q.trim()}</summary><div class="ew-faq-answer">${a.trim()}</div></details>`,
  );
  // Unwrap the outer FAQ container divs so <details> sits at article level.
  // Strip the opening tag and its matching closing </div> counted from that
  // point — the containers only wrap our items; other content sits outside.
  out = out.replace(
    /<div[^>]*(?:id="rank-math-faq"|class="[^"]*\brank-math-(?:block|list)\b[^"]*")[^>]*>/g,
    "",
  );
  // Drop closing tags that belonged to the stripped rank-math wrappers.
  // They otherwise sit after the last <details> and break the article DOM.
  out = out.replace(/(<\/details>)(\s*<\/div>)+/g, "$1");
  return out;
}

/** Rewrite href/src attributes throughout the article body. */
function rewriteAssetUrls(article: HTMLElement): void {
  for (const a of article.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href");
    if (href !== undefined) a.setAttribute("href", rewriteUrl(href));
  }
  for (const el of article.querySelectorAll("[src]")) {
    const src = el.getAttribute("src");
    if (src !== undefined) el.setAttribute("src", rewriteUrl(src));
  }
  for (const el of article.querySelectorAll("[srcset]")) {
    const srcset = el.getAttribute("srcset");
    if (srcset === undefined) continue;
    const rewritten = srcset
      .split(",")
      .map((entry) => {
        const trimmed = entry.trim();
        const m = trimmed.match(/^(\S+)(\s+.+)?$/);
        if (!m) return trimmed;
        const [, url, descriptor] = m;
        if (!url) return trimmed;
        return rewriteUrl(url) + (descriptor ?? "");
      })
      .join(", ");
    el.setAttribute("srcset", rewritten);
  }
  for (const el of article.querySelectorAll("[data-src]")) {
    const src = el.getAttribute("data-src");
    if (src !== undefined) el.setAttribute("data-src", rewriteUrl(src));
  }
}

/* ------------------------------------------------------------------------ */
/* Metadata extraction                                                       */
/* ------------------------------------------------------------------------ */

function metaContent(root: HTMLElement, name: string, attr: "name" | "property"): string | null {
  const el = root.querySelector(`meta[${attr}="${name}"]`);
  if (!el) return null;
  const c = el.getAttribute("content");
  return c === undefined ? null : c;
}

function textContent(root: HTMLElement, selector: string): string | null {
  const el = root.querySelector(selector);
  return el ? el.text : null;
}

function attrContent(root: HTMLElement, selector: string, attr: string): string | null {
  const el = root.querySelector(selector);
  if (!el) return null;
  const v = el.getAttribute(attr);
  return v === undefined ? null : v;
}

function extractAuthor(root: HTMLElement): string {
  // Try inline JSON-LD blocks first — look for a BlogPosting / Article author.
  for (const s of root.querySelectorAll("script[type=\"application/ld+json\"]")) {
    const raw = s.text?.trim();
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      const name = findAuthorInJsonLd(parsed);
      if (name) return name;
    } catch {
      // Ignore malformed JSON-LD; not fatal.
    }
  }
  return DEFAULT_AUTHOR;
}

function findAuthorInJsonLd(node: unknown): string | null {
  if (!node) return null;
  if (Array.isArray(node)) {
    for (const item of node) {
      const found = findAuthorInJsonLd(item);
      if (found) return found;
    }
    return null;
  }
  if (typeof node !== "object") return null;
  const rec = node as Record<string, unknown>;
  const type = rec["@type"];
  const isPostLike =
    type === "BlogPosting" ||
    type === "Article" ||
    type === "NewsArticle" ||
    (Array.isArray(type) && type.some((t) => typeof t === "string" && /Article|Posting/.test(t)));
  if (isPostLike) {
    const author = rec["author"];
    const name = extractName(author);
    if (name && name !== "Elderly") return name; // Skip legacy placeholder
    if (name === "Elderly") return DEFAULT_AUTHOR;
  }
  // Recurse into @graph or nested values.
  const graph = rec["@graph"];
  if (Array.isArray(graph)) {
    const found = findAuthorInJsonLd(graph);
    if (found) return found;
  }
  return null;
}

function extractName(v: unknown): string | null {
  if (typeof v === "string") return v;
  if (v && typeof v === "object") {
    const name = (v as Record<string, unknown>)["name"];
    if (typeof name === "string") return name;
  }
  return null;
}

function stripSiteSuffix(title: string): string {
  // Trailing " | Elderly Wellness" or " - Elderly Wellness"
  return title.replace(/\s+[|–—-]\s+Elderly Wellness\s*$/i, "").trim();
}

function computeReading(html: string): { wordCount: number; readingMinutes: number } {
  // Cheap word count from stripped text.
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-zA-Z]+;|&#\d+;|&#x[0-9a-fA-F]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return { wordCount: 0, readingMinutes: 0 };
  const words = text.split(" ").filter(Boolean);
  const wordCount = words.length;
  const readingMinutes = Math.max(1, Math.round(wordCount / 220));
  return { wordCount, readingMinutes };
}

/* ------------------------------------------------------------------------ */
/* Main                                                                      */
/* ------------------------------------------------------------------------ */

function main(): void {
  if (!existsSync(MANIFEST_PATH)) {
    console.error(`[extract-blogs] manifest not found at ${MANIFEST_PATH}`);
    // If we've already got a committed content/blogs/_index.json, don't fail —
    // this happens on Vercel where the source `blogs/` folder is outside the
    // configured Root Directory. Detect and short-circuit.
    const indexOut = resolve(OUT_DIR, "_index.json");
    if (existsSync(indexOut)) {
      console.log(
        `[extract-blogs] using pre-committed content/blogs/ (source manifest not accessible)`,
      );
      return;
    }
    process.exit(1);
  }

  const manifestRaw = readFileSync(MANIFEST_PATH, "utf8");
  const manifest: ManifestEntry[] = JSON.parse(manifestRaw);
  if (!Array.isArray(manifest) || manifest.length === 0) {
    console.error(`[extract-blogs] manifest is empty or malformed`);
    process.exit(1);
  }
  blogSlugSet = new Set(manifest.map((e) => e.slug).filter(Boolean));

  mkdirSync(OUT_DIR, { recursive: true });

  const warnings: string[] = [];
  const indexEntries: IndexEntry[] = [];
  let processed = 0;

  for (const entry of manifest) {
    const slug = entry.slug;
    if (!slug) {
      warnings.push(`skipping manifest entry with no slug`);
      continue;
    }
    const srcHtmlPath = resolve(BLOGS_SRC_DIR, slug, "index.html");
    if (!existsSync(srcHtmlPath)) {
      console.error(`[extract-blogs] missing source HTML for slug "${slug}": ${srcHtmlPath}`);
      process.exit(1);
    }
    const html = readFileSync(srcHtmlPath, "utf8");
    const root = parse(html, { blockTextElements: { script: true, style: true } });

    const article = findArticleBody(root);
    if (!article) {
      console.error(`[extract-blogs] no article body found for slug "${slug}"`);
      process.exit(1);
    }

    stripUnwantedElements(article);
    rewriteAssetUrls(article);
    const cleanedHtml = convertRankMathFaqToDetails(article.innerHTML.trim());

    // Metadata from source <head> (fall back to manifest).
    const rawTitle =
      textContent(root, "title") ?? entry.title;
    const title = decodeEntities(rawTitle).trim();

    const description =
      metaContent(root, "description", "name") ??
      metaContent(root, "og:description", "property") ??
      decodeEntities(entry.description);

    // Canonical: ALWAYS force www + trailing-slash regardless of source.
    // (Source has known bugs — see PHASE1_DECISIONS §4.)
    const canonical = `${SITE_URL_WWW}/blogs/${slug}/`;

    let ogImageRaw =
      metaContent(root, "og:image:secure_url", "property") ??
      metaContent(root, "og:image", "property") ??
      entry.image ??
      DEFAULT_OG_IMAGE;
    // Rewrite relative og:image the same way we rewrite article assets.
    const ogImage = rewriteUrl(ogImageRaw) || entry.image || DEFAULT_OG_IMAGE;

    const publishedTime =
      metaContent(root, "article:published_time", "property") ?? entry.date;
    const modifiedTime =
      metaContent(root, "article:modified_time", "property") ?? publishedTime;

    const keywordsRaw = metaContent(root, "keywords", "name");
    const keywords = keywordsRaw?.trim() || undefined;

    const author = extractAuthor(root);
    const { wordCount, readingMinutes } = computeReading(cleanedHtml);

    const meta: BlogMeta = {
      slug,
      title,
      description: description.trim(),
      canonical,
      ogImage,
      publishedTime,
      modifiedTime,
      author: { name: author },
      wordCount,
      readingMinutes,
    };
    if (keywords) meta.keywords = keywords;

    // Emit files
    writeFileSync(resolve(OUT_DIR, `${slug}.html`), cleanedHtml + "\n", "utf8");
    writeFileSync(
      resolve(OUT_DIR, `${slug}.meta.json`),
      JSON.stringify(meta, null, 2) + "\n",
      "utf8",
    );

    // Index entry (prefer manifest image for listing; it's what the design uses).
    indexEntries.push({
      slug,
      title,
      description: meta.description,
      image: entry.image || ogImage,
      publishedTime,
      modifiedTime,
      path: `/blogs/${slug}/`,
    });

    processed += 1;
  }

  // Sort newest first by publishedTime.
  indexEntries.sort((a, b) => (a.publishedTime < b.publishedTime ? 1 : -1));

  writeFileSync(
    resolve(OUT_DIR, "_index.json"),
    JSON.stringify(indexEntries, null, 2) + "\n",
    "utf8",
  );

  console.log(`[extract-blogs] processed ${processed} blog posts`);
  console.log(`[extract-blogs] wrote ${indexEntries.length} entries to _index.json`);
  if (warnings.length > 0) {
    console.warn(`[extract-blogs] warnings:`);
    for (const w of warnings) console.warn(`  - ${w}`);
  }
}

main();
