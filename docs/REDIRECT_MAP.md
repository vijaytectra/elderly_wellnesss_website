# Elderly Wellness — Redirect Map (Phase 1)

All redirects are recommendations for the Next.js migration. Every existing indexed URL must be handled — either preserved as-is or 301'd to a live route.

Legend:
- **301** = permanent redirect (preserve link equity, `next.config.js` `redirects()` with `permanent: true`).
- **410** = gone (return HTTP 410; Next: return `notFound()` from a dynamic route with no-index, or a `middleware` early exit).
- **rewrite** = URL stays the same in the browser, Next serves a different route.

Production domain: `https://www.theelderlywellness.com` (with `www`). Any request to the apex `theelderlywellness.com` should already 301 to `www` at the DNS/host layer — enforce again in Next if that layer is different.

---

## 1. Top-level `.html` → clean-path (all 301)

| From | To | Status | Reason |
|---|---|---|---|
| `/index.html` | `/` | 301 | Canonicalize to the root. Sitemap currently lists both — sitemap must be regenerated. |
| `/about.html` | `/about/` | 301 | Clean path. |
| `/contact.html` | `/contact/` | 301 | Clean path. |
| `/investors.html` | `/investors/` | 301 | Clean path. |
| `/board-of-advisors.html` | `/board-of-advisors/` | 301 | Clean path. |
| `/elderly-wellness.html` | `/elderly-wellness/` | 301 | Clean path. Not in current sitemap. |
| `/how-elderly-wellness-works.html` | `/how-elderly-wellness-works/` | 301 | Clean path. Also has a duplicate at `/blogs/how-elderly-wellness-works/` — see §5 below for canonical decision. |
| `/physiotherapy-services-for-elders.html` | `/physiotherapy-services-for-elders/` | 301 | Preserve keyword-rich slug. Do NOT rename to `/services/physiotherapy/` — SEO equity is on the current slug. |
| `/nursing-services-for-elders.html` | `/nursing-services-for-elders/` | 301 | Same reasoning. |
| `/geriatric-care-services-for-elders.html` | `/geriatric-care-services-for-elders/` | 301 | Same reasoning. |
| `/assisted-living-support-services-for-elders.html` | `/assisted-living-support-services-for-elders/` | 301 | Same reasoning. |

## 2. Company/legal pages (all 301)

| From | To | Status | Reason |
|---|---|---|---|
| `/company/privacy-policy.html` | `/privacy-policy/` | 301 | Flatten `/company/` prefix; matches typical convention and shortens URLs. |
| `/company/refund-and-cancellation-policies.html` | `/refund-and-cancellation-policy/` | 301 | Flatten and singularize slug (optional — if the business prefers the plural, keep as `/refund-and-cancellation-policies/`). |
| `/company/terms-and-conditions.html` | `/terms-and-conditions/` | 301 | Flatten. |
| `/company/` | `/` | 301 | The directory index (if ever hit) has no content. |

Add wildcard fallback: `/company/*` → `/` (301) to catch any future stragglers.

## 3. Blogs — MUST NOT redirect

Blog URLs are the site's SEO backbone. Every `/blogs/<slug>/` path must resolve at the exact same URL in Next. Do NOT redirect blog paths. This includes:

- `/blogs/` (blog index — 1 page in current sitemap)
- `/blogs/<one-of-36-slugs>/` — all 36 slugs listed in `docs/MIGRATION_INVENTORY.md §2`
- `/blogs/<slug>/index.html` (trailing `/index.html`) → 301 to `/blogs/<slug>/` (drop the `/index.html`).

| From | To | Status | Reason |
|---|---|---|---|
| `/blogs/<slug>/index.html` | `/blogs/<slug>/` | 301 | Canonicalize away from `index.html`. Applies to all 36 posts. |
| `/blogs/index.html` | `/blogs/` | 301 | Same reason. |

## 4. Sitemap-referenced URLs that are 404 today

The current `sitemap.xml` lists 6 URLs that do NOT exist on disk. Each has content living under `/blogs/`. All 301 to their true blog home:

| From | To | Status | Reason |
|---|---|---|---|
| `/comprehensive-guide-to-caregivers.html` | `/blogs/what-is-caregivers/` | 301 | Sitemap URL 404s. Best content match. |
| `/how-to-increase-sodium-levels-in-elderly-at-home.html` | `/blogs/how-to-increase-sodium-levels-in-elderly-at-home/` | 301 | Sitemap URL 404s. Slug matches. |
| `/the-inspiring-journey-of-eldery.html` | `/blogs/journey-of-eldery/` | 301 | Sitemap URL 404s. Slug matches (typo "eldery" preserved from source). |
| `/what-is-elderly.html` | `/blogs/what-is-elderly/` | 301 | Sitemap URL 404s. |
| `/activities-of-daily-living-adls-for-parents.html` | `/blogs/activities-of-daily-living-adls-for-parents/` | 301 | Sitemap URL 404s. |
| `/essential-grooming-hygiene-tips-elderly.html` | `/blogs/essential-grooming-hygiene-tips-elderly/` | 301 | Sitemap URL 404s. |
| `/form.html` | `/contact/` | 301 | Sitemap URL 404s and appears to reference a legacy caregiver-form page. Route to contact. |

## 5. Duplicate content: `how-elderly-wellness-works`

Two live pages carry the "how elderly wellness works" content today:
- `/how-elderly-wellness-works.html` (top-level marketing page)
- `/blogs/how-elderly-wellness-works/` (WP blog post duplicate, dated 2025-04-08)

Business call needed. Recommended: keep the top-level marketing page (`/how-elderly-wellness-works/`) as canonical, and 301 the blog copy.

| From | To | Status | Reason |
|---|---|---|---|
| `/blogs/how-elderly-wellness-works/` | `/how-elderly-wellness-works/` | 301 (recommended; needs business sign-off) | Removes duplicate content. |

## 6. WordPress artifact paths — drop or 410

These paths were left by the WP export and are not linked from the top-level nav or footer. Some are linked from within blog post bodies (byline → author, breadcrumb → category), but per §3 of the inventory those blocks are stripped on migration.

| From | To | Status | Reason |
|---|---|---|---|
| `/blogs/wp-json/` and `/blogs/wp-json/*` | — | 410 | REST snapshots. No client depends on these. |
| `/blogs/wp-includes/*` | — | 410 | WP core assets. Duplicated by Next bundler. |
| `/blogs/wp-content/plugins/*` | — | 410 | Only referenced by the exported HTML we are removing. |
| `/blogs/wp-content/themes/*` | — | 410 | Same as above. |
| `/blogs/wp-content/uploads/*` | (leave in place) | — | KEEP. Blog manifest and older post bodies reference these image URLs directly. Serve from `public/blogs/wp-content/uploads/` in Next. |
| `/blogs/author/elderly/` | `/blogs/` | 301 | Only author page, linked from every blog post byline. |
| `/blogs/author/elderly/page/*/` | `/blogs/` | 301 | Paginated author archive. |
| `/blogs/category/caregiver/` | `/blogs/` | 301 | Not linked from top nav or footer. |
| `/blogs/category/elderly/` | `/blogs/` | 301 | Same. |
| `/blogs/category/elderly-care/` | `/blogs/` | 301 | Same. |
| `/blogs/category/elderly-care-services/` | `/blogs/` | 301 | Same. |
| `/blogs/category/locations/` | `/blogs/` | 301 | Same. |
| `/blogs/category/locations/chennai/` | `/blogs/elderly-care-services-in-chennai/` | 301 | The Chennai location hub lives at this blog slug and is linked from the site nav. |
| `/blogs/tag/*/` (43 tag pages, all listed in `docs/MIGRATION_INVENTORY.md`) | `/blogs/` | 301 | No tag feature in Next; not linked from top nav or footer. |
| `/blogs/page/2/`, `/blogs/page/3/`, `/blogs/page/4/` | `/blogs/` | 301 (or preserve if paginated blog listing is built) | If Next implements `/blogs/page/N/` routes, keep as-is. Otherwise 301 to `/blogs/`. |
| `/wp-login.php` | — | 410 | No WordPress admin. Blocks bot probes. |
| `/wp-admin/` and `/wp-admin/*` | — | 410 | Same. |
| `/xmlrpc.php` | — | 410 | Same — high spam-probe target. |
| `/blogs/wp-login.php` | — | 410 | Same. |
| `/blogs/wp-admin/` | — | 410 | Same. |

## 7. RSS/feed paths from blog post `<head>` alternates

Every blog `<head>` has `<link rel="alternate" type="application/rss+xml">` pointing at `../feed`, `../comments/feed`, and `../feed/index.html`. These are not present on disk.

| From | To | Status | Reason |
|---|---|---|---|
| `/blogs/feed/` and `/blogs/feed/index.html` | `/blogs/` | 301 (or implement an actual RSS feed in Next) | Recommend implementing `/blogs/rss.xml` via `next-sitemap` / manual route so feed readers keep working. |
| `/blogs/comments/feed/` | `/blogs/` | 301 | No comments feature. |
| `/blogs/<slug>/feed/` | `/blogs/<slug>/` | 301 | Per-post comment feeds. |

## 8. `oEmbed` alternate

Every blog `<head>` also has `<link rel="alternate" title="oEmbed (JSON)" href="../wp-json/oembed/1.0/embed"/>`.

| From | To | Status | Reason |
|---|---|---|---|
| `/blogs/wp-json/oembed/*` | — | 410 | Covered by the blanket wp-json rule above. |

## 9. The 27 dropped `?ver=...` files (windows-local branch)

Commit `23bb7aa Local: drop 27 mirror assets with '?' in filename (invalid on Windows)` removed WP-style versioned duplicate asset files (e.g. `chaty-front.min.css?ver=3.3.81744176417.css`). These files were only ever referenced from the WP-exported blog HTML via `<link href="…chaty-front.min.css%3Fver=3.3.81744176417.css">`. Since the blog HTML is being fully replaced in Next, none of these 27 files need to ship.

| From | To | Status | Reason |
|---|---|---|---|
| Any WP-versioned asset with `%3Fver=` (URL-encoded `?ver=`) in the path — e.g. `/blogs/wp-content/plugins/chaty/js/cht-front-script.min.js%3Fver=3.3.81744176417` | — | 410 (drop) | Files intentionally removed on `windows-local`. New site does not load Chaty, CF7, Jinko, or the versioned jQuery — see §7 of the inventory. Nothing on the migrated site will link to these URLs. |
| `/blogs/wp-content/plugins/chaty/admin/assets/js/picmo-latest-umd.min.js?ver=3.3.8` | — | 410 | Same. |
| `/blogs/wp-content/plugins/chaty/admin/assets/js/picmo-umd.min.js?ver=3.3.8` | — | 410 | Same. |
| `/blogs/wp-content/plugins/chaty/css/chaty-front.min.css?ver=3.3.81744176417.css` | — | 410 | Same. |
| `/blogs/wp-content/plugins/chaty/js/cht-front-script.min.js?ver=3.3.81744176417` | — | 410 | Same. |
| `/blogs/wp-content/plugins/contact-form-7/includes/css/styles.css?ver=6.0.6.css` | — | 410 | Same. |
| `/blogs/wp-content/plugins/contact-form-7/includes/js/index.js?ver=6.0.6` | — | 410 | Same. |
| `/blogs/wp-content/plugins/contact-form-7/includes/swv/js/index.js?ver=6.0.6` | — | 410 | Same. |
| `/blogs/wp-content/plugins/seo-by-rank-math/assets/css/toc_list_style.css?ver=1.0.242.css` | — | 410 | Same. |
| `/blogs/wp-content/plugins/tfm-theme-boost/css/style.css?ver=1.0.0.css` | — | 410 | Same. |
| `/blogs/wp-content/plugins/tfm-theme-boost/vendor/tfm-featured-posts/js/hero.js?ver=1.0.0` | — | 410 | Same. |
| `/blogs/wp-content/plugins/tfm-theme-boost/vendor/tfm-social-plugin/slick/slick.css?ver=1.0.0.css` | — | 410 | Same. |
| `/blogs/wp-content/plugins/tfm-theme-boost/vendor/tfm-social-plugin/slick/slick.min.js?ver=1.0.0` | — | 410 | Same. |
| `/blogs/wp-content/plugins/tfm-theme-boost/vendor/tfm-social-plugin/js/tfm-social.js?ver=1.0.0` | — | 410 | Same. |
| `/blogs/wp-content/themes/jinko/css/gutenberg.css?ver=1.0.0.css` | — | 410 | Same. |
| `/blogs/wp-content/themes/jinko/css/normalize.css?ver=1.0.0.css` | — | 410 | Same. |
| `/blogs/wp-content/themes/jinko/js/main.js?ver=1.0.0` | — | 410 | Same. |
| `/blogs/wp-content/themes/jinko/style.css?ver=1.0.css` | — | 410 | Same. |
| `/blogs/wp-includes/blocks/*/style.min.css?ver=6.8.1.css` and `?ver=6.8.css` | — | 410 | Same. |
| `/blogs/wp-includes/js/comment-reply.min.js?ver=6.8` and `?ver=6.8.1` | — | 410 | Same. |
| `/blogs/wp-includes/js/dist/hooks.min.js?ver=…` | — | 410 | Same. |
| `/blogs/wp-includes/js/dist/i18n.min.js?ver=…` | — | 410 | Same. |
| `/blogs/wp-includes/js/jquery/jquery-migrate.min.js?ver=3.4.1` | — | 410 | Same. |
| `/blogs/wp-includes/js/jquery/jquery.min.js?ver=3.7.1` | — | 410 | Same. |
| `/blogs/wp-content/uploads/…/…c62E6zd5wDD-jNM6Efs&skey=…&v=v21` (image with `&` in name) | — | 410 | This is an ephemeral CDN-cached image reference; not needed. |

**Blanket rule** (simpler than the 27 individual entries): any request to `/blogs/wp-content/*`, `/blogs/wp-includes/*`, or `/blogs/wp-json/*` that is not `/blogs/wp-content/uploads/*` returns 410. That single rule supersedes both §6 and §9 wp-* entries.

## 10. Sanity redirects

| From | To | Status | Reason |
|---|---|---|---|
| `https://theelderlywellness.com/*` | `https://www.theelderlywellness.com/*` | 301 | Apex → `www`. Enforce at the host layer; also enforce in Next `redirects()` as belt-and-braces. Current sitemap uses apex; current canonicals use `www` — this migration must pick one. Recommended: `www` (matches canonicals). |
| `http://www.theelderlywellness.com/*` | `https://www.theelderlywellness.com/*` | 301 | Scheme upgrade. |
| Any URL ending in `/index.html` | drop the suffix (301) | 301 | General cleanup. |
