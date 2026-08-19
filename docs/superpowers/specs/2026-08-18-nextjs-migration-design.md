# Elderly Wellness — HTML to Next.js Migration Design

**Date:** 2026-08-18
**Branch:** `migration/nextjs` (off `windows-local`)
**Target:** `C:\Projects\thelderly_website\elderly_website_nextjs\`
**Production domain:** `https://www.theelderlywellness.com`
**Deployment:** Vercel (do NOT push `main` — Vercel auto-deploys)

## Context

The existing site is a static export of a WordPress site (Rank Math SEO, Jinko theme, Contact Form 7, Chaty, TFM Theme Boost). It lives at the repo root as ~10 top-level `.html` pages plus a `blogs/` directory containing per-post folders with `index.html`, a `blog-manifest.json`, and WordPress artifacts (`wp-content`, `wp-includes`, `wp-json`, `author`, `category`, `tag`, `page`).

The migration goal is content, URL, SEO, and visual parity with materially better performance and a maintainable Next.js codebase. URL parity is non-negotiable — every currently indexed URL must either continue to resolve at the same path or return a documented 301.

## Decisions (from brainstorming)

1. **Target folder:** `elderly_website_nextjs/` as a subfolder inside the current repo, side-by-side with legacy HTML during migration. Vercel Root Directory switches to this folder at cutover.
2. **Branch:** `migration/nextjs` off `windows-local` (Windows cannot check out `origin/main` because of `?` in some legacy WordPress asset filenames). Never push `main`.
3. **Blog storage:** Hybrid — parse-at-build extraction from source HTML now, MDX conversion in a follow-up phase after live verification.
4. **Execution model:** Phased with explicit user approval between phases 1→2→3→4→5.

## Architecture

### Directory layout

```
elderly_website_nextjs/
├── app/
│   ├── layout.tsx                    (root layout — Header, Footer, JsonLd site-wide schema)
│   ├── page.tsx                      (homepage)
│   ├── not-found.tsx                 (404, matches site design)
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── (marketing)/
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── investors/page.tsx
│   │   ├── board-of-advisors/page.tsx
│   │   ├── elderly-wellness/page.tsx
│   │   ├── how-elderly-wellness-works/page.tsx
│   │   ├── nursing-services-for-elders/page.tsx
│   │   ├── physiotherapy-services-for-elders/page.tsx
│   │   ├── geriatric-care-services-for-elders/page.tsx
│   │   └── assisted-living-support-services-for-elders/page.tsx
│   └── blogs/
│       ├── page.tsx                  (listing from blog-manifest.json)
│       └── [slug]/page.tsx           (dynamic, static-generated via generateStaticParams)
├── components/
│   ├── Header.tsx, Footer.tsx, DesktopNav.tsx
│   ├── MobileNav.tsx                 (client — menu toggle)
│   ├── SocialLinks.tsx, Container.tsx
│   ├── JsonLd.tsx                    (server-rendered <script type="application/ld+json">)
│   ├── BlogCard.tsx, BlogListing.tsx, ArticleBody.tsx
│   ├── Hero.tsx, Section.tsx, CTA.tsx
│   └── ContactForm.tsx               (client — form state + submit)
├── content/blogs/                    (build artifact — {slug}.html + {slug}.meta.json + _index.json)
├── lib/
│   ├── blog.ts                       (loaders for content/blogs artifacts)
│   ├── seo.ts                        (metadata helpers, canonical URL builder)
│   └── site.ts                       (SITE_URL, org info constants)
├── scripts/
│   └── extract-blogs.ts              (prebuild — parses ../blogs/**/index.html → content/blogs/*)
├── public/                           (mirrored from source: images/, fonts/, assets/, wp-content/uploads/)
├── tests/                            (Playwright — route parity, SEO, a11y)
├── types/
├── package.json, tsconfig.json, next.config.ts, tailwind.config.ts, postcss.config.mjs, eslint.config.mjs
└── docs/                             (per-project docs, distinct from repo-root docs/)
```

### Stack

- **Next.js** — latest stable at time of scaffolding (verify with `pnpm create next-app@latest`)
- **React 19** (paired with Next 15+)
- **TypeScript strict**, `noUncheckedIndexedAccess: true`
- **Tailwind CSS v4** with `@tailwindcss/typography` for article rendering
- **`next/font`** for local fonts (whichever the audit finds)
- **`node-html-parser`** or **`cheerio`** for build-time HTML extraction
- **Playwright** for E2E and route-parity tests
- **App Router only**, no Pages Router
- **No jQuery**, no Owl Carousel — replace with lightweight vanilla or `embla-carousel-react` if needed
- Package manager: **pnpm** (fastest install, best monorepo-friendly, works on Vercel out of the box)

### URL preservation

- `next.config.ts` sets `trailingSlash: true` to match the existing `/blogs/{slug}/` convention.
- Each top-level `X.html` → `/X/`. A 301 redirect from `/X.html` → `/X/` covers external links to the old paths.
- All blog URLs remain identical: `/blogs/{slug}/`.
- Legacy WordPress paths (`/author/*`, `/category/*`, `/tag/*`, `/page/*`, `/wp-json/*`, etc.) will be handled per the audit — most likely 301 to `/blogs/` or `/` depending on whether they carry inbound traffic.

## Blog extraction pipeline (Option C — parse-at-build)

**`scripts/extract-blogs.ts`** runs before `next build` (`"prebuild": "tsx scripts/extract-blogs.ts"`).

1. Read `../blogs/blog-manifest.json` (from the source at repo root).
2. For each entry, read `../blogs/{slug}/index.html`.
3. Extract the article body — selector priority: `article.entry-content`, `article`, `main .entry-content`, `main`. Actual selector confirmed during Phase 1 audit.
4. Strip WordPress chrome: author bio widgets, related-post sidebars, comment sections, sticky share bars, injected ads, `<script>` and `<style>` tags inside the article. Selector list finalized during Phase 1 audit and encoded as a config constant.
5. Rewrite asset URLs:
   - `blogs/wp-content/uploads/...` → `/wp-content/uploads/...` (assets copied to `public/wp-content/uploads/`).
   - Root-relative image paths preserved (e.g. `/images/blogs/*.png`).
   - Internal blog links (`href="/blogs/other-slug/"`) preserved as-is.
6. Extract per-page metadata from `<head>`: `title`, `meta[name=description]`, `link[rel=canonical]`, `meta[property^=og:]`, `script[type="application/ld+json"]`.
7. Emit:
   - `content/blogs/{slug}.html` — cleaned article HTML
   - `content/blogs/{slug}.meta.json` — `{ title, description, canonical, ogImage, publishedTime, modifiedTime, keywords, jsonLd }`
   - `content/blogs/_index.json` — array combining manifest + extracted meta for the listing page

**Runtime:**
- `app/blogs/[slug]/page.tsx` reads `content/blogs/{slug}.*` at build time.
- `generateStaticParams` returns every slug from `_index.json`.
- `generateMetadata` returns metadata from `.meta.json`.
- Article rendered via `dangerouslySetInnerHTML` inside a styled `ArticleBody` shell with Tailwind Typography.
- `BlogPosting` and `BreadcrumbList` JSON-LD emitted from `.meta.json`.

**Why this works:** Content parity is guaranteed (extraction is deterministic and diff-able). SEO metadata comes from the same source as production today. Future MDX conversion is a straight swap of the extractor without touching runtime code.

## SEO strategy

- **`lib/site.ts`:** exports `SITE_URL = 'https://www.theelderlywellness.com'` (no trailing slash). Every canonical URL is built from this constant. Never accepts localhost / Vercel preview URLs in production metadata.
- **`app/sitemap.ts`:** builds `MetadataRoute.Sitemap` from top-level page inventory + `_index.json`.
- **`app/robots.ts`:** ports rules from existing `robots.txt` (verified in Phase 1). References the sitemap at absolute URL.
- **`lib/seo.ts`:** shared `buildMetadata({ title, description, path, image, type })` helper.
- **Redirects:** declared in `next.config.ts.redirects()` from a typed table in `lib/redirects.ts` (imported also by the route-parity test).
- **Structured data:** `Organization` + `WebSite` in root layout; per-page `WebPage` / `Article` / `BreadcrumbList` where applicable; blog articles carry `BlogPosting`. All server-rendered.

## Component boundaries

Server Components by default. Client components restricted to genuinely interactive UI:

| Client component | Reason |
|---|---|
| `MobileNav` | menu open/close state |
| `ContactForm` | submit state, validation errors, success/error UI |
| Any carousel (only if audit finds one that's structural, not decorative) | slide index state |

Everything else — Header, Footer, blog listing, article shell, all marketing pages, all JSON-LD — server-rendered.

## Forms

Phase 1 audit reads `contact.html` and any other forms to identify:
- form `action` endpoint
- HTTP method
- field names + validation
- success / error handling

Existing endpoint is preserved exactly. If audit reveals a Contact Form 7 shortcode with no working endpoint (likely for this static export), migration STOPS before Phase 3 for user decision on the intended submission target (email service, formspree, custom API, WhatsApp, etc.). No form ships that silently pretends to submit.

## Third-party scripts

Phase 1 audit lists every `<script>` tag across all pages. Each gets a keep/replace/drop decision:
- Analytics (GA/GTM) — keep with `next/script strategy="afterInteractive"` if in use
- Chaty widget — evaluate whether still needed
- Owl Carousel + jQuery — drop, replace behavior with modern equivalents
- Contact Form 7 assets — drop (form is re-implemented natively)
- Rank Math SEO output — dropped; SEO handled by Next.js Metadata API

## Verification

Run before every phase gate:

```
pnpm typecheck    (tsc --noEmit, zero errors)
pnpm lint         (eslint, zero errors)
pnpm build        (production build must succeed)
```

Phase-specific gates:

| Phase | Additional verification |
|---|---|
| 1 | audit deliverables reviewed |
| 2 | `pnpm build` green; visual smoke of layout in dev |
| 3 | each migrated page renders in dev; metadata smoke test |
| 4 | `generateStaticParams` produces all slugs; article render smoke |
| 5 | Playwright route-parity + SEO + a11y; Lighthouse against `pnpm start` production build |

**Route-parity test:** reads `lib/redirects.ts` + inventory → hits every URL against `pnpm start` → asserts each returns HTTP 200 or its documented 301. Any accidental 404 fails the build.

## Workstream ownership (parallel agents)

| Phase | Workstreams (agents dispatched in parallel where safe) | Writes to |
|---|---|---|
| 1 | Explore agent (source audit — read only) | `docs/MIGRATION_INVENTORY.md`, `docs/REDIRECT_MAP.md` |
| 2 | (a) Foundation (b) Shared UI | (a) `elderly_website_nextjs/{package.json,configs,app/layout,app/page stub,globals.css,fonts}` (b) `elderly_website_nextjs/components/*` |
| 3 | Up to 3 static-page agents split by page-group | `elderly_website_nextjs/app/(marketing)/**` (disjoint pages per agent) |
| 4 | Blog agent | `elderly_website_nextjs/scripts/extract-blogs.ts`, `elderly_website_nextjs/app/blogs/**`, `elderly_website_nextjs/content/blogs/**` |
| 5 | (a) SEO polish (b) Tests + reports | (a) `sitemap.ts, robots.ts, lib/redirects.ts, JsonLd polish` (b) `tests/**`, `playwright.config.ts`, `docs/*REPORT.md` |

**Agent governance:** each agent reports FILES_CHANGED, TESTS_RUN, ISSUES_FOUND, ASSUMPTIONS, REMAINING_WORK. No agent uses `git add .`. No agent modifies another agent's files. No agent invents content or metadata. No `any` types.

## Vercel deployment plan

- Current Vercel project auto-deploys `main` from the repo root (serving raw HTML).
- Cutover requires updating the Vercel project's **Root Directory** to `elderly_website_nextjs/`.
- Preview deploys of the `migration/nextjs` branch will build the Next.js app in the subfolder if we add a `vercel.json` at the repo root pointing at the subfolder, OR if the user manually creates a second Vercel preview project targeting the branch and subfolder. Approach confirmed during Phase 5.
- No pushes to `main` at any point without explicit user approval.

## Non-goals

- Do not redesign the site. Only surgical improvements for a11y, responsiveness, and performance where the current implementation is broken.
- Do not invent content, endpoints, or metadata.
- Do not migrate legacy WordPress admin / wp-json / xmlrpc endpoints.
- Do not introduce a CMS, headless backend, or content authoring UI in this migration.
- Do not add auth, analytics, or comment systems unless the audit shows they already exist.
- Do not replace real content with placeholders.

## Open questions carried forward

1. **Vercel Root Directory access** — user has not yet confirmed access to change it at cutover. Blocking only at Phase 5.
2. **Contact form endpoint** — resolved during Phase 1 audit. If no endpoint exists, pause before Phase 3.
3. **Legacy WordPress URL indexation** — Phase 1 audit will identify whether `/author/*`, `/category/*`, `/tag/*` receive traffic via `sitemap.xml`. Redirect vs 410 decided at Phase 5.
