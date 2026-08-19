# Elderly Wellness — Migration Inventory (Phase 1)

Source: `C:\Projects\thelderly_website` (branch `windows-local`, exported from WordPress).
Production domain: `https://www.theelderlywellness.com`.
Target: `elderly_website_nextjs/` (not yet created).

All findings are read-only observations from the on-disk source. No source files were modified.

---

## 1. Top-level pages

Eleven top-level `.html` files exist at the repo root, plus three legal pages inside `company/`. The site's production URLs currently include the `.html` suffix; the migration will move each to a clean route (`/about/` etc.). All existing `.html` URLs must be preserved via 301 redirect (see `REDIRECT_MAP.md`).

| Existing URL | Source file | Target Next route | Page type | Title | Meta description | Canonical | Notes |
|---|---|---|---|---|---|---|---|
| `/` and `/index.html` | `index.html` | `/` | Home | `Elderly Wellness \| Elder Care Services in Chennai` | " Contact us today at +91 99448 90577 for expert elder care services in Chennai. Elderly Wellness provides compassionate and personalized care for your loved ones." | `https://www.theelderlywellness.com/` | Robots `index, follow`. Hero uses Owl Carousel + 3 local mp4s. `og:url` is literally `.` (bug — must set absolute). |
| `/about.html` | `about.html` | `/about/` | About | `About Elderly: Supporting Health & Wellness for the Elderly` | "Learn how Elderly is transforming elderly care with professional physiotherapists, caregivers, and nursing assistants. Tailored services ensuring dignity and care." | `https://www.theelderlywellness.com/about.html` | No explicit robots tag (defaults index,follow). |
| `/contact.html` | `contact.html` | `/contact/` | Contact form | `Get in Touch with Elderly Wellness for Care and Support` | "Contact Elderly Wellness for inquiries about our elderly care services or app support. We're here to help you and your loved ones receive the best care." | `https://www.theelderlywellness.com/contact.html` | Hosts the ONLY real form (see §8). Google map iframe is commented out. |
| `/investors.html` | `investors.html` | `/investors/` | Investor pitch | `Invest in the Future of Elderly Care with Elderly Wellness` | "Join Elderly Wellness as an investor and support a platform revolutionizing elderly care through technology and professional service providers." | `https://www.theelderlywellness.com/investors.html` | — |
| `/board-of-advisors.html` | `board-of-advisors.html` | `/board-of-advisors/` | Team page | `Meet the Experts Behind Elderly Wellness: Our Board of Advisors` (multi-line in source) | "Get to know the expert team guiding Elderly Wellness. Learn about our advisory board's expertise in healthcare, elderly support, and wellness." | `https://www.theelderlywellness.com/board-of-advisors.html` | Robots `index, follow`. |
| `/elderly-wellness.html` | `elderly-wellness.html` | `/elderly-wellness/` | Info page | `Elderly Wellness: Personalized Care for Senior Citizens` | "Explore Elderly Wellness, offering tailored health services for seniors. We connect you with qualified care providers for personalized in-home care." | `https://www.theelderlywellness.com/elderly-wellness.html` | NOT in sitemap.xml. |
| `/how-elderly-wellness-works.html` | `how-elderly-wellness-works.html` | `/how-elderly-wellness-works/` | How-it-works | `How Elderly Wellness Works ? : Revolutionizing Elderly Care at Home` | "Elderly Wellness is revolutionizing home care, providing a seamless, stress-free solution to elderly care right in the comfort of your home. Learn how Elderly Wellness works." | `https://www.theelderlywellness.com/how-elderly-wellness-works.html` | Note: a duplicate blog also exists at `/blogs/how-elderly-wellness-works/` — decide canonical target. |
| `/physiotherapy-services-for-elders.html` | `physiotherapy-services-for-elders.html` | `/services/physiotherapy/` (recommended) or `/physiotherapy-services-for-elders/` | Service | `Best Physiotherapy Services for Elders at Home - Elderly Wellness` | " Contact us today +919944890577. Offering professional home physiotherapy for elders, Elderly Wellness improves mobility and quality of life for seniors." | `https://www.theelderlywellness.com/physiotherapy-services-for-elders.html` | Robots `index, follow`. |
| `/nursing-services-for-elders.html` | `nursing-services-for-elders.html` | `/services/nursing/` or `/nursing-services-for-elders/` | Service | `Best Nursing Services for Elders at Home - Elderly Wellness` | " Contact us today +919944890577. Offering professional home nursing for elders, Elderly Wellness improves mobility and quality of life for seniors." | `https://www.theelderlywellness.com/nursing-services-for-elders.html` | — |
| `/geriatric-care-services-for-elders.html` | `geriatric-care-services-for-elders.html` | `/services/geriatric-care/` or `/geriatric-care-services-for-elders/` | Service | `Best Geriatric Care Services for Elders at Home – Elderly Wellness` | "Offering professional home geriatric care for seniors. Elderly Wellness ensures your loved ones receive the best care at home. Contact us today at +919944890577." | `https://www.theelderlywellness.com/geriatric-care-services-for-elders.html` | — |
| `/assisted-living-support-services-for-elders.html` | `assisted-living-support-services-for-elders.html` | `/services/assisted-living-support/` or `/assisted-living-support-services-for-elders/` | Service | `Best Assisted Living Support Services for Elders at Home – Elderly Wellness` | "Offering professional home assisted living support for seniors. Elderly Wellness ensures your loved ones receive the best care at home. Contact us today at +919944890577." | `https://www.theelderlywellness.com/assisted-living-support-services-for-elders.html` | — |
| `/company/privacy-policy.html` | `company/privacy-policy.html` | `/privacy-policy/` | Legal | (not extracted — recommend re-read during Phase 2) | (same) | in sitemap | Linked from footer of every page. |
| `/company/refund-and-cancellation-policies.html` | `company/refund-and-cancellation-policies.html` | `/refund-and-cancellation-policy/` | Legal | — | — | in sitemap | Linked from footer. |
| `/company/terms-and-conditions.html` | `company/terms-and-conditions.html` | `/terms-and-conditions/` | Legal | — | — | in sitemap | Linked from footer. |

**IMPORTANT — recommendation on service page slugs:** the existing filenames are keyword-heavy for SEO. Changing to `/services/physiotherapy/` would break the current URL (must 301). Recommend keeping the exact filenames as clean-path routes (`/physiotherapy-services-for-elders/`) to preserve SEO equity, and only 301 the `.html` suffix off. See `REDIRECT_MAP.md` for the exact rules.

**Titles that are multi-line in the source** (they render fine to browsers, but Next `metadata` should collapse them): `board-of-advisors.html`, `how-elderly-wellness-works.html`, `physiotherapy-…`, `geriatric-…`, `assisted-living-…`.

**Common `<head>` quirks found:**
- All top-level pages carry the same `google-site-verification` token `BgdLTr1rRUPNF1uD96e921lVhaEuBoFSUE8OHHpD1k0` — must be preserved.
- Two `<script type="application/ld+json">` blocks on `index.html` (WebSite + Product w/ AggregateRating 4.9 / 45 reviews). The `Product` block claims ratings; if not substantiated it's a schema-spam risk.
- `og:url` on `index.html` is `"."` — malformed, must be an absolute URL in Next.
- The `<title>` tag typo `"Elderly Eellness"` inside the JSON-LD `WebSite.name` is present on **both** `index.html` and `contact.html` — this is a pre-existing bug; flag for content decision.

---

## 2. Blog inventory

- **Blog manifest entries:** 36 (`blogs/blog-manifest.json`)
- **Blog post directories on disk (excluding `author/`, `category/`, `tag/`, `page/`, `wp-content/`, `wp-includes/`, `wp-json/`):** 36
- **Reconciled:** exact 1-to-1 match — no missing folders, no orphan folders. Blog count = **36**.

Location pages included in the blog set: 9 total — `elderly-care-services-in-adambakkam`, `-adyar`, `-alandur`, `-alapakkam`, `-alwarpet`, `-alwarthirunagari`, `-ambattur`, `-chennai`, plus the "hub" post `elderly-care-services-in-chennai` (category `Locations > Chennai`).

Note: two blog slugs duplicate top-level page names — `blogs/how-elderly-wellness-works/` overlaps with `/how-elderly-wellness-works.html`, and content-topic slugs `what-is-elderly`, `activities-of-daily-living-adls-for-parents`, `essential-grooming-hygiene-tips-elderly`, `how-to-increase-sodium-levels-in-elderly-at-home` overlap with `.html` files listed in `sitemap.xml` (which point at nonexistent root files — see §9).

| slug | title | date | image | canonical | notes |
|---|---|---|---|---|---|
| fall-prevention-home-safety-checklist-elderly-chennai | Fall Prevention Checklist for Elderly Parents in Chennai \| Elderly Wellness | 2026-07-20 | /images/blogs/fall-prevention-home-safety-elderly-chennai.png | (in-page canonical) `https://www.theelderlywellness.com/blogs/fall-prevention-home-safety-checklist-elderly-chennai` | Newest post. |
| early-signs-of-dementia-in-elderly-parents | Early Signs of Dementia in Elderly Parents: A Family Guide \| Elderly Wellness | 2026-07-20 | /images/blogs/early-signs-dementia-elderly-parents.png | (in-page) | — |
| post-hospital-recovery-care-at-home-chennai | Post-Hospital Recovery Care at Home in Chennai \| Elderly Wellness | 2026-07-20 | /images/blogs/post-hospital-recovery-care-at-home-chennai.png | (in-page) | — |
| loneliness-mental-wellbeing-elderly-parents | Loneliness &amp; Mental Wellbeing in Elderly Parents \| Elderly Wellness | 2026-07-20 | /images/blogs/loneliness-mental-wellbeing-elderly-parents.png | (in-page) | Title has HTML entity — decode in Next. |
| home-care-vs-assisted-living-chennai | Home Care vs Assisted Living in Chennai: Which to Choose \| Elderly Wellness | 2026-07-20 | /images/blogs/home-care-vs-assisted-living-chennai.png | (in-page) | — |
| exercises-for-seniors-over-75 | Exercises for Seniors Over 75 - Elderly Wellness | 2025-12-31 | /blogs/wp-content/uploads/2025/12/exercise-for-seniors-over-75.png | (in-page) | — |
| how-to-hire-best-caregiver-for-seniors-in-chennai | How to Hire Caregiver for Seniors in Chennai - Elderly Wellness | 2025-12-26 | /blogs/wp-content/uploads/2025/12/Caregiver-for-seniors-in-Chennai-…png | (in-page) | Long filename. |
| what-is-the-importance-of-regular-exercising-for-senior-citizens | What is the Importance of Regular Exercising for Senior Citizens? - Elderly Wellness | 2025-09-10 | /blogs/wp-content/uploads/2025/09/senior-workout-indian.png | (in-page) | — |
| essential-care-regarding-arthritis-for-senior-citizens-to-enhance-their-mobility-and-comfort | Essential Care Regarding Arthritis for Senior Citizens … - Elderly Wellness | 2025-09-02 | /blogs/wp-content/uploads/2025/09/Arthritis-for-Senior-Citizens.png | (in-page) | Extremely long slug. |
| necessary-lifestyle-changes-to-prevent-cardiovascular-diseases-for-elderly-citizens | Necessary Lifestyle Changes to Prevent Cardiovascular Diseases … | 2025-08-23 | /blogs/wp-content/uploads/2025/09/Cardiovascular-Diseases-in-Senior-Citizens.png | (in-page) | Image is in `/2025/09/` but date is 2025-08-23. |
| different-ways-to-prevent-osteoporosis-in-senior-citizens-for-stronger-bone-health | Different Ways to Prevent Osteoporosis in Senior Citizens … | 2025-08-08 | /blogs/wp-content/uploads/2025/09/Osteoporosis-in-Senior-Citizens-.png | (in-page) | Trailing hyphen in image filename. |
| finding-the-right-balance-between-professional-care-and-family-involvement-for-senior-citizens | Finding the Right Balance Between Professional Care and Family Involvement … | 2025-06-08 | /blogs/wp-content/uploads/2025/06/Family-Involvement-for-Senior-Citizens.png | (in-page) | — |
| heres-why-regular-checkups-matter-so-much-for-seniors | Here's Why Regular Checkups Matter So Much for Seniors - Elderly Wellness | 2025-06-03 | /blogs/wp-content/uploads/2025/06/Seniors-Regular-Checkups.png | (in-page) | Curly apostrophe in title (title has smart quote). |
| age-related-health-conditions | 8 Most Common Age-Related Health Conditions - Elderly Wellness | 2025-05-26 | /blogs/wp-content/uploads/2025/05/Age-Related-Health-Conditions.png | (in-page) | — |
| nutritious-diets-for-senior-health | Nutritious Diets for Senior Health - Elderly Wellness | 2025-05-19 | /blogs/wp-content/uploads/2025/05/Crafting-Nutritious-Diets-for-Senior-Health.png | (in-page) | — |
| address-loneliness-and-depression-in-senior-citizens | Address Loneliness and Depression in Senior Citizens - Elderly Wellness | 2025-04-29 | /blogs/wp-content/uploads/2025/04/Lonliness-and-Depression-in-Older-Adults.png | (in-page) | Typo in image filename ("Lonliness"). |
| home-modifications-for-elder-safety | Home Modifications for Elder Safety \| ElderlyWellness - Elderly Wellness | 2025-04-29 | /blogs/wp-content/uploads/2025/04/Home-Modifications-for-Elder-Safety.png | (in-page) | Same image reused by `home-modifications-for-seniors`. |
| elderly-care-services-in-ambattur | Elderly Care Services in Ambattur \| CareTaker Services Ambattur - Elderly Wellness | 2025-04-27 | /blogs/wp-content/uploads/2025/04/Elderly-Care-Services-in-Ambattur.png | (in-page) | Location page. |
| elderly-care-services-in-alwarthirunagari | Elderly Care Services in Alwarthirunagari … | 2025-04-27 | /blogs/wp-content/uploads/2025/04/Elderly-Care-Services-in-Alwarthirunagar.png | (in-page) | Location page. Image filename spells "Alwarthirunagar" (missing i), slug spells "Alwarthirunagari". |
| elderly-care-services-in-alwarpet | Elderly Care Services in Alwarpet … | 2025-04-18 | /blogs/wp-content/uploads/2025/04/Elderly-Care-Services-in-alwarpet.png | (in-page) | Location page. |
| elderly-care-services-in-alapakkam | Elderly Care Services in Alapakkam … | 2025-04-18 | /blogs/wp-content/uploads/2025/04/Elderly-Care-Services-in-Alapakkam.png | (in-page) | Location page. |
| elderly-care-services-in-alandur | Elderly Care Services in Alandur … | 2025-04-18 | /blogs/wp-content/uploads/2025/04/Elderly-Care-Services-in-Alandur.png | (in-page) | Location page. |
| elderly-care-services-in-adyar | Elderly Care Services in Adyar … | 2025-04-18 | /blogs/wp-content/uploads/2025/04/Elderly-Care-Services-in-Adyar.png | (in-page) | Location page. |
| elderly-care-services-in-adambakkam | Elderly Care Services in Adambakkam … | 2025-04-17 | /blogs/wp-content/uploads/2025/04/ADLs-What-Are-Activities-of-Daily-Living-…-1.png | (in-page) | Image is unrelated (ADL image, wrong asset). |
| elderly-care-services-in-chennai | Elderly Care Services in Chennai \| CareTaker Services Chennai - Elderly Wellness | 2025-04-17 | /blogs/wp-content/uploads/2025/04/Elderly-Care-Services-in-Chennai.png | (in-page) | Location HUB. Linked from main navbar Locations dropdown. |
| personal-hygiene-and-diaper-change-services-for-senior-citizens | Hygiene &amp; Diaper Change Services for Senior Citizens \| Elderly Wellness | 2025-04-16 | /blogs/wp-content/uploads/2025/04/Personal-Hygiene-and-Diaper-Change-Services-for-Senior-Citizens.png | (in-page) | Title has HTML entity. |
| alzheimers-and-dementia-care-services-for-senior-citizens | Providing Alzheimer's and Dementia Care Services for Senior Citizens - Elderly Wellness | 2025-04-10 | /blogs/wp-content/uploads/2025/04/alzheimers-and-dementia-care-services-for-senior-citizens.png | (in-page) | Smart quote in title. |
| how-proper-meals-and-medication-assistance-improve-senior-health-and-well-being | How Proper Meals and Medication Assistance Improve Senior Health and Well-Being? - Elderly Wellness | 2025-04-09 | /blogs/wp-content/uploads/2025/04/How-Proper-Meals-and-Medication-Assistance-Improve-Senior-Health-and-Well-Being-1.png | (in-page) | — |
| activities-of-daily-living-adls-for-parents | ADLs: What Are Activities of Daily Living? How Can ADLs Help Your Parents? - Elderly Wellness | 2025-04-09 | /blogs/wp-content/uploads/2025/04/Activities-of-Daily-Living.png | (in-page) | Also referenced by sitemap under `/activities-of-daily-living-adls-for-parents.html` (nonexistent root file). |
| what-is-elderly | What is Elderly? Understanding the Elderly Age Group - Elderly Wellness | 2025-04-09 | /blogs/wp-content/uploads/2025/04/What-is-Elderly.png | (in-page) | Also referenced by sitemap as `/what-is-elderly.html`. |
| essential-grooming-hygiene-tips-elderly | Essential Grooming and Hygiene Guide for the Elderly - Elderly Wellness | 2025-04-09 | /blogs/wp-content/uploads/2025/04/essential-grooming-hygiene-tips-elderly.png | (in-page) | Also referenced by sitemap as `/essential-grooming-hygiene-tips-elderly.html`. |
| journey-of-eldery | How It Started: The Inspiring Journey of Eldery - Elderly Wellness | 2025-04-08 | /blogs/wp-content/uploads/2025/04/Journey-of-Eldery.jpeg | (in-page) | Slug/title use "Eldery" (missing "l"). Sitemap references `/the-inspiring-journey-of-eldery.html`. |
| how-elderly-wellness-works | How Elderly Wellness Works? Elderly Care at Home \| Elderly Wellness | 2025-04-08 | /blogs/wp-content/uploads/2025/04/elderly-wellness-works.png | (in-page) | **Duplicates** the top-level `how-elderly-wellness-works.html`. Requires editorial call on canonical. |
| how-to-increase-sodium-levels-in-elderly-at-home | How to Increase Sodium Levels in Elderly at Home?: A Caregiver's Guide … | 2025-04-08 | /blogs/wp-content/uploads/2025/04/How-to-Increase-Sodium-Levels-in-Elderly-at-Home.png | (in-page) | Also referenced by sitemap as `/how-to-increase-sodium-levels-in-elderly-at-home.html`. |
| what-is-caregivers | What is Caregivers?: Duties, Responsibilities, and Benefits - Elderly Wellness | 2025-04-08 | /blogs/wp-content/uploads/2025/04/What-is-Caregivers.jpg | (in-page) | Sitemap references `/comprehensive-guide-to-caregivers.html` — different slug. |
| home-modifications-for-seniors | 16 Modifications for Seniors to Enhance Safety and Comfort - Elderly Wellness | 2025-03-29 | /blogs/wp-content/uploads/2025/04/Home-Modifications-for-Elder-Safety.png | (in-page) | Image duplicated from `home-modifications-for-elder-safety`. |

**Missing folders vs manifest:** none.
**Orphan folders vs manifest:** none.

**Data-quality flags found:**
- 5 image references in the manifest sit in `/images/blogs/` (the newer posts) while the older 31 sit in `/blogs/wp-content/uploads/YYYY/MM/`. Both directories must be preserved and reachable at these exact paths.
- `elderly-care-services-in-adambakkam` uses an ADL image, not a locality image (visible mismatch).
- Post `home-modifications-for-elder-safety` and `home-modifications-for-seniors` share the same featured image.
- Smart quotes and HTML entities in several titles must be normalized when read from the manifest for use in Next `metadata.title`.

---

## 3. Blog HTML structure

Inspected representative files: `blogs/fall-prevention-home-safety-checklist-elderly-chennai/index.html` (newest), `blogs/elderly-care-services-in-chennai/index.html` (location hub), `blogs/age-related-health-conditions/index.html` (health topic), `blogs/alzheimers-and-dementia-care-services-for-senior-citizens/index.html` (WP legacy), `blogs/index.html` (blog listing).

Every blog post has the same GeneratePress + Rank Math skeleton:

```
<div class="site grid-container container hfeed" id="page">
  <div class="site-content" id="content">
    <div class="content-area" id="primary">
      <main class="site-main" id="main">
        <article id="post-###" class="post-### post type-post status-publish format-standard hentry category-… tag-… has-tfm-read-time has-tfm-share-icons  icons-bottom" itemtype="https://schema.org/CreativeWork" itemscope>
          <div class="inside-article">
            <div class="featured-image page-header-image-single grid-container grid-parent">…</div>
            <header class="entry-header">
              <h1 class="entry-title" itemprop="headline">…</h1>
              <div class="entry-meta">…date + author…</div>
            </header>
            <div class="entry-content" itemprop="text">   ← EXTRACT THIS
              …body HTML: <p>, <h2 class="wp-block-heading">, <ul class="wp-block-list">, <ol>, <blockquote>,
              <div class="wp-block-rank-math-toc-block">, <div id="rank-math-faq">, custom
              <div class="ew-blog-cta ew-blog-cta--app">, inline images, internal <a>…
            </div>
            <div class="post-views …">…</div>
            <footer class="entry-meta">…category-links + post-navigation…</footer>
          </div>
        </article>
        <div class="comments-area">…comments + comment form…</div>
      </main>
    </div>
    <div class="widget-area sidebar is-right-sidebar" id="right-sidebar">
      <aside class="ew-sidebar" id="ew-blog-sidebar" data-manifest="/blogs/blog-manifest.json">…</aside>
    </div>
  </div>
</div>
```

### Article selector to use for extraction

**Primary:** `article > .inside-article > .entry-content` (equivalently `.entry-content[itemprop="text"]` inside the `<article>`).

Fall back to `main#main article .entry-content` for robustness. The `<article>` id (`post-###`) is not stable across sources — do not select by it.

### Elements to STRIP from the extracted body

- All `<script>` and inline `<style>` (WP block styles, Chaty, CF7, rank-math schema — replaced by Next). In particular strip everything with `id` prefix `wp-`, `chaty-`, `contact-form-7-`, `swv-`, `tfm-`, `generate-`.
- `.post-views` block (WP post-views counter, dynamic).
- The `<footer class="entry-meta">` inside `<article>` — has category links and prev/next nav using SVG icons; re-render prev/next from the manifest in Next.
- The sibling `.comments-area` and any `<form action="../wp-comments-post.php">` — no comments feature planned.
- The sibling `<aside class="ew-sidebar">` — re-render in Next from the manifest.
- The `<form class="ew-sidebar__search" data-ew-search-form>` inside the aside — re-implement as a Next client search.
- Breadcrumb widgets (breadcrumb JSON-LD in `<head>` and any inline breadcrumb divs) — regenerate from Next's route structure.
- Chaty widget markup + scripts (`#chaty-widget`, `chaty-front-end-js*`).
- WP emoji `<img class="wp-smiley">` if any (none seen).
- Author/byline `<span class="byline">` that links to `/blogs/author/elderly/` — this URL will be removed.
- Any post-navigation `<nav id="nav-below" class="post-navigation">` — replace.

### Elements to PRESERVE (semantic body content)

- Headings `<h2 class="wp-block-heading" id="...">`, `<h3 class="wp-block-heading">`, `<h4>` — keep the `id`s (they're referenced by Rank Math TOC anchors and by the WebPage schema).
- `<p>`, including `<p class="has-drop-cap">` variants.
- `<ul class="wp-block-list">`, `<ol>`, nested lists.
- `<blockquote class="wp-block-quote">`.
- `<table class="wp-block-table">` including thead/tbody.
- `<figure class="wp-block-image">` and inline `<img>` (rewrite `src` to a Next-served path; preserve `alt`, `width`, `height`).
- Internal links `<a href="../slug/">…</a>` and cross-page relative `<a href="../../physiotherapy-services-for-elders.html">` — rewrite to Next routes.
- External links (`play.google.com`, `apps.apple.com`, phone `tel:`, mailto).
- The Rank Math TOC block `<div class="wp-block-rank-math-toc-block" id="rank-math-toc">` — either preserve as-is or re-render from the h2/h3 outline.
- The Rank Math FAQ block `<div id="rank-math-faq" class="rank-math-block">` — preserve markup so FAQPage schema remains correct.
- The house CTA blocks `<div class="ew-blog-cta ew-blog-cta--app">…</div>` (custom, non-WP).
- No YouTube/video embeds found in the sampled posts.
- Downloadable-doc links: only the site-wide `assets/elderly_wellness.pdf` (linked from header, not inside articles).

---

## 4. WordPress artifact paths

### `blogs/wp-content/`
- `plugins/` — 4 plugin bundles: `chaty` (WhatsApp/social chat widget), `contact-form-7` (CF7 core CSS/JS), `seo-by-rank-math` (has an `assets/css/toc_list_style.css` mirror only), `tfm-theme-boost` (Jinko helper).
- `themes/` — 3 themes: `generatepress` (active), `jinko`, `jinko-child`.
- `uploads/` — 51 image files under `2025/{04,05,06,09,12}` and `2026/07`.

**Keep after migration:** ONLY `blogs/wp-content/uploads/` — those images are referenced from the blog manifest and the blog post bodies (via relative `../wp-content/uploads/…` paths). Move the tree verbatim under `public/blogs/wp-content/uploads/` in Next so existing image URLs continue to resolve for cached/indexed content.

**Drop:** all of `plugins/`, `themes/` — they are only loaded by the exported HTML's own `<link>`/`<script>` tags, which we will not carry across.

### `blogs/wp-includes/`
- Two subdirs only: `css/` and `js/` (holding jQuery, jquery-migrate, comment-reply, block library, i18n, hooks). All are only referenced by the exported HTML and are duplicated by whatever bundler Next uses.

**Drop entirely.**

### `blogs/wp-json/`
- `wp/v2/posts/` contains at least two REST snapshots (post IDs `526`, `574`). Not linked from any user-facing HTML.

**Drop entirely** — no client relies on this. Optionally 301 `/blogs/wp-json/*` to `/` or 410 Gone.

### `blogs/author/`
- Only one author: `blogs/author/elderly/` with `index.html` and `page/2/`, `page/3/`, `page/4/`.

**Drop the pages** (no author feature in Next). Optionally 301 `/blogs/author/elderly/` → `/blogs/` (author page is not linked from the top-level nav; it is linked from every blog post's byline).

### `blogs/category/`
- 5 categories: `caregiver`, `elderly`, `elderly-care`, `elderly-care-services`, `locations` (with nested `locations/chennai/`).

**Drop or 301 to `/blogs/`** — none of these appear in the top-level nav or footer. Some appear in per-post category-link footers and breadcrumb JSON-LD; when we strip those blocks the internal linking disappears.

### `blogs/tag/`
- 43 tag pages. Not linked from top-level nav or footer.

**Drop or 301 to `/blogs/`.**

### `blogs/page/`
- Pagination stubs `blogs/page/2/`, `/3/`, `/4/`. The Next blog listing will paginate differently.

**301** each to `/blogs/` (or implement `/blogs/page/N/` route so the SEO signals survive — recommend implementing to avoid a mass 301 chain).

---

## 5. Assets inventory

### Images

Total under `images/`: **232 files**.
- `images/blogs/` — 32 (new blog featured images)
- `images/home/` — 23 (hero videos + posters, section decorations)
- `images/opt/` — 14 (WebP-optimized home assets: logo, googleplay/appstore btns, decor)
- `images/profile/` — 20 (advisor/team headshots)
- `images/services/` — 70 (service-page images)
- Plus files directly under `images/` (favicon, dotes, ft_logo, poster fallbacks): balance = 73.

Total under `blogs/wp-content/uploads/`: **51 files**.
- `2025/04` = 21, `2025/05` = 2, `2025/06` = 2, `2025/09` = 4, `2025/12` = 17
- `2026/07` = 5

### Fonts (`fonts/`)

- `cormorant-garamond-300.woff2` — 21 KB (weight 300)
- `playball.woff2` — 31 KB (single weight)
- `icofont.woff` (645 KB), `icofont.woff2` (537 KB), `icofont-subset.woff2` (3 KB) — the site is trimming icofont via a subset build.
- `fonts/gstatic/s/manrope/v20/*.ttf` — **7 Manrope weights self-hosted** (200/300/400/500/600/700/800), ~35 KB each. `css/manrope.css` still references `https://fonts.gstatic.com/...` URLs — the local files are shadow copies (probably prepared for a self-host swap that never landed).

### CSS files (`css/`, sizes in bytes)

Per-page bundles (built by `scripts/build-page-bundles.js`):
- `home.bundle.css` 107,943; `about.bundle.css` 79,038; `contact.bundle.css` 73,120
- `board-of-advisors.bundle.css` 70,350; `investors.bundle.css` 71,569; `elderly-wellness.bundle.css` 78,313
- `how-elderly-wellness-works.bundle.css` 66,059
- `physiotherapy-…bundle.css` 84,616; `nursing-…bundle.css` 84,653; `geriatric-…bundle.css` 84,613; `assisted-living-…bundle.css` 85,106
- `privacy-policy.bundle.css` 66,248; `refund-and-cancellation-policies.bundle.css` 65,890; `terms-and-conditions.bundle.css` 66,518

Blog-scoped: `blog-pages.css` 41,018; `blog-sidebar.css` 4,957; `blog-faq.css` 3,224; `blog-main-header.css` 7,114.

Vendor / shared: `bootstrap.min.css` 224,053; `bootstrap-home.min.css` 27,947; `owl.carousel.min.css` 3,186; `aos.css` 26,055; `icofont.min.css` 92,240; `icofont-subset.css` 1,411.

Design-token bases: `style.css` 106,607, `style.min.css` 80,791, `style-home.min.css` 22,272, `responsive.css` 53,825, `responsive.min.css` 40,831, `home-responsive.css` 16,417, `home-responsive.min.css` 12,210.

Fonts CSS: `cormorant-garamond.css` 22,065; `manrope.css` 1,596; `playball.css` 211; `hero-fonts.css` 452.

Accessibility/reserve helpers: `ew-a11y.css` 1,960; `ew-carousel-reserve.css` 1,610.

### JS files (`js/`, sizes in bytes)

- Vendor: `jquery.js` 89,392; `bootstrap.min.js` 62,206; `owl.carousel.min.js` 44,436; `aos.js` 14,245; `typed.min.js` 6,133.
- Custom: `main.js` 18,410 (nav, modal, misc UI glue), `article.js` 4,795 (home article/read-more logic), `home-perf.js` 2,853 (LCP/perf shims), `blog-faq.js` 1,820 (FAQ accordion), `blog-sidebar.js` 5,034 (renders the sidebar from blog-manifest).

### JS files (`scripts/`, build tools — Node/Python, not shipped)

- `apply-webp-sources.js`, `build-css-bundle.js`, `build-icon-subset.js`, `build-page-bundles.js`, `fix-a11y.js`, `fix-a11y-seo.js`, `measure-carousel-heights.js`, `optimize-images.py`, `purge-css-bundle.js`, `rebuild-blog-manifest.py`, `check-responsive-markup.py`, `create-new-blogs.py`, `fix-blog-html.py`.

These are the tools that produced the current bundles/manifest. Preserve as tooling reference; do not ship. Also contains `__pycache__/`.

### Videos / other media

- `images/home/1.mp4`, `2.mp4`, `3.mp4` — original hero videos (unused; superseded by `opt/` copies).
- `images/home/opt/1.mp4`, `2.mp4`, `3.mp4` — optimized hero videos referenced by `index.html` banner slider.
- `assets/elderly_wellness.pdf` — downloadable brochure (linked from the "Download" button in the top nav on every top-level page).

No `.webm`. No other PDFs.

### `assets/` folder

Contents: `elderly_wellness.pdf` only.

### `deploy/` folder

- `deploy-to-vultr.sh` — bash rsync script that pushes site to Vultr host.
- `nginx-theelderlywellness.conf` — nginx server block for the production host (gzip/brotli/etag/security-headers). Doc reference only; Next on Vercel/Node/etc. will not use it, but it's the current source of truth for cache/redirect rules.
- `setup-wordpress-blogs.sh` — one-shot bootstrap for the WP blog subfolder on the current server.

These are ops artifacts; do not ship into `elderly_website_nextjs/`.

### `company/` folder

Three routable legal pages: `privacy-policy.html`, `refund-and-cancellation-policies.html`, `terms-and-conditions.html`. All three appear in `sitemap.xml` and are linked from the footer of every top-level page. They must be migrated as first-class routes.

---

## 6. Navigation structure

Extracted from `index.html` (lines 316–388). Cross-verified in `about.html` (lines 89–139): identical menu items, same order.

Desktop navbar (Bootstrap `.navbar-expand-lg`, hamburgers to a single mobile drawer at `<lg`):

- **Home** → `index.html`
- **About Us** → `about.html`
- **Services** (dropdown, `<a href="index.html#">`)
  - Physiotherapy → `physiotherapy-services-for-elders.html`
  - Nursing Service → `nursing-services-for-elders.html`
  - Geriatric Care → `geriatric-care-services-for-elders.html`
  - Assisted Living Support → `assisted-living-support-services-for-elders.html`
- **Locations** (dropdown, `<a href="index.html#">`)
  - Chennai → `blogs/elderly-care-services-in-chennai/index.html`
- **Board of Advisors** → `board-of-advisors.html`
- **Investors** → `investors.html`
- **Blogs** → `blogs/index.html`
- **Contact Us** → `contact.html`
- **Download** (styled `dark_btn`, `<a download>`) → `assets/elderly_wellness.pdf`

Mobile drawer: same list, reordered/stacked via `@media (max-width:991px)` rules injected inline in `index.html` (lines 51–164). Dropdowns toggle via a right-side chevron `.drp_btn`.

### Footer (repeated on every top-level page)

Three columns:
1. **Contact column**: logo (`images/ft_logo.png` / `images/opt/logo.png`), Phone `+91 99448 90577` (`tel:919944890577`), Email `info@theelderlywellness.com`, social icon row (Facebook `https://www.facebook.com/profile.php?id=100089074061784`, X/Twitter `https://x.com/elderly____?s=11`, Instagram `https://www.instagram.com/elderly__wellness?igsh=MW43cmZpb2liaGNzdA==`, LinkedIn `https://www.linkedin.com/company/elderly-wellness-service-pvt-ltd/about/`).
2. **Quick Links**: Privacy Policy (`company/privacy-policy.html`), Refund & Cancellation Policy (`company/refund-and-cancellation-policies.html`), Terms & Conditions (`company/terms-and-conditions.html`), Contact Us (`contact.html`).
3. **Download app**: Google Play (`https://play.google.com/store/apps/details?id=com.elderly.nri`), App Store (`https://apps.apple.com/in/app/elderly-care-plus/id6740391242`).

Footer bottom bar: `© Copyrights 2024. All rights reserved.` and `Developed by Tectra Technologies` (`https://www.tectratechnologies.com/`, `target="blank"`).

---

## 7. Third-party scripts + integrations

### Loaded on top-level pages (index/about/contact/etc.)

- `js/jquery.js` (v-unknown, 89 KB) — Owl Carousel + Bootstrap JS both depend on it. **Replace** in Next: rebuild the hero as a React component (Embla or Swiper), then drop jQuery.
- `js/bootstrap.min.js` — used for navbar collapse + modal (video modal on home). **Replace** with headless component + Tailwind or a small custom collapse.
- `js/owl.carousel.min.js` — home hero + feature/testimonial carousels. **Replace** with Embla/Swiper.
- `js/aos.js` — reveal-on-scroll animations (used on almost every section via `data-aos="fade-up"` etc.). **Optionally replace** with framer-motion or CSS animations; the site is heavily annotated with `data-aos-*`, so a lightweight AOS replacement is easiest.
- `js/typed.min.js` — Typed.js typewriter effect. Loaded on index/about/contact/services pages. Search for usage in `main.js` before dropping.
- `js/main.js` — custom (18 KB): navbar toggle, dropdown, go-to-top, modal init, video modal, form-scroll helper. **Rewrite** as React components.
- `js/article.js` (only on index) — home page's "latest posts" injector; reads `blog-manifest.json` and renders 3 cards into `#blog-posts`. **Replace** with a server-rendered section in Next.
- `js/home-perf.js` (only on index) — LCP shim for Owl re-parenting bug (see inline comment in index.html:434). Delete once carousel is replaced.
- Two `<script type="application/ld+json">` blocks on `index.html` (WebSite + Product with AggregateRating).
- `google-site-verification` meta on every top-level page (token `BgdLTr1rRUPNF1uD96e921lVhaEuBoFSUE8OHHpD1k0`). **Preserve.**
- Comment placeholders `<!-- Google tag (gtag.js) -->` appear at the top of every top-level page's `<head>` and `<body>` (noscript). **No actual GA/GTM code is present** — the tags are stubs. Confirm with the business whether GA4 was ever installed; treat as "not shipped" today.
- Facebook Pixel, Hotjar, Clarity: **none found**.
- Chat popups on top-level pages: **none** (no Chaty on the root HTML).

### Loaded on blog pages (`blogs/*/index.html`)

Blog posts are full WordPress exports and pull a large stack:
- `wp-includes/js/jquery/jquery.min.js` (WP's jQuery 3.7.1) + `jquery-migrate.min.js`
- `wp-includes/js/dist/hooks.min.js`, `i18n.min.js`
- `wp-includes/js/comment-reply.min.js`
- `wp-content/plugins/contact-form-7/includes/js/index.js` (+ `swv/js/index.js`) — CF7 client, only used inside sidebar/comment forms (no user-facing CF7 form exists on any post — see §8)
- `wp-content/plugins/chaty/js/cht-front-script.min.js` + `picmo-umd.min.js` + `picmo-latest-umd.min.js` — floating chat widget
- `wp-content/themes/generatepress/assets/js/menu.min.js`
- Then re-loads the site-wide `../../js/jquery.js`, `../../js/bootstrap.min.js`, `../../js/main.js`, `../../js/blog-faq.js`, `../../js/blog-sidebar.js` for the shared header/footer.
- `<link rel="dns-prefetch" href="https://www.googletagmanager.com/">` in every post's `<head>`, but no GTM container ID is injected — again a stub.

**Recommendation:** on migration, blog posts should be rendered by Next with the shared site header/footer components and NONE of the WordPress runtime. The FAQ block (`#rank-math-faq`) needs a small client accordion; the sidebar needs a Next client component that reads the manifest; that's it. `blog-faq.js` (1.8 KB) + `blog-sidebar.js` (5 KB) are the only custom pieces to port.

### Integrations
- **WhatsApp/Chaty** — floating widget on every blog post. Business call: replace with a lightweight WhatsApp CTA button (`https://wa.me/919944890577`) or drop entirely.
- **Contact Form 7** — CSS/JS loaded but no CF7 shortcode rendered anywhere user-facing. The only real form (`contact.html`) uses Formspree, not CF7 (see §8).
- **Google Map iframe** on `contact.html` — commented out (source lines 282–293).
- **YouTube modal** on `index.html` — an empty `<iframe id="youtubevideo">` inside `#myModal`; the trigger button is not wired in the current HTML I inspected. Verify before dropping.
- **App store links** (Google Play, App Store) — external, keep.
- **`https://fonts.gstatic.com/` preconnect** in blog `<head>` (for Google-Fonts-hosted Manrope). Also `<link rel="stylesheet" href="../../css/manrope.css">` in blog `<head>` — that CSS still references `fonts.gstatic.com` URLs. Migrate to `next/font` and drop these external calls.

---

## 8. Forms — CRITICAL

### The ONLY real contact form: `contact.html`

- **Location:** `contact.html` lines 209–275.
- **`action`:** `https://formspree.io/f/mvoeleov`
- **`method`:** `POST`
- **Enctype:** default (`application/x-www-form-urlencoded`).
- **Fields (all `<input>`; all placeholders double as `aria-label`):**
  | name | type | required | placeholder |
  |---|---|---|---|
  | `full-name` | text | yes | Full Name * |
  | `age` | number | yes | Age * |
  | `phone` | tel | yes | Phone * |
  | `email` | email | yes | Email * |
  | `experience` | text | yes | Experience (Years) * |
  | `education` | text | yes | Education * |
  | `additional-certification` | text | no | Additional Certification |
  | `area-of-expertise` | text | yes | Area of Expertise * |
  | `physio-device` | text | yes | Physio Device for Service * |
  | `terms` | checkbox (id `term_checkbox`) | no | "I agree to receive emails, newsletters and promotional messages" |
  | submit button | button type=submit | — | "Submit" |
- **Field set implies target audience:** this is a caregiver-recruitment form, not a general "contact us" form. The page title/heading ("Get in Touch", "Drop a message us") does not match the field set. Flag for business decision — either rename the page or split into two forms.
- **Client JS:** none. Native HTML5 validation only. `main.js` has no submit handler for this form.
- **Success/error UX:** Formspree's hosted confirmation page. There is no `_next` hidden input to redirect to a local thank-you page and no AJAX success handler. **Recommendation for Next:** intercept the submit, POST via `fetch` to the same Formspree endpoint, render an in-page success state.

### Search form inside every blog post sidebar

- Selector: `<form class="ew-sidebar__search" data-ew-search-form role="search">`
- One `<input id="ew-blog-search" name="q" type="search">` + submit button.
- Wired by `js/blog-sidebar.js` — client-side filter over `blog-manifest.json` (no server call).
- **Recommendation:** re-implement as a small client component in Next reading the manifest at build time.

### WordPress comment form on every blog post

- `<form action="../wp-comments-post.php" method="post" id="commentform">` with fields `comment`, `author`, `email`, `url`, `wp-comment-cookies-consent`, plus hidden `comment_post_ID`, `comment_parent`, and `submit`.
- Endpoint (`wp-comments-post.php`) does not exist in this static export — the form would 404 today.
- **Recommendation:** drop entirely. No comments feature planned.

### Contact Form 7 shortcodes rendered anywhere

- **None.** CF7 CSS/JS is loaded on blog pages but no `<form>` with `class="wpcf7-form"` was found. Drop CF7 runtime.

### Summary

- **Real form endpoint the site depends on:** `https://formspree.io/f/mvoeleov` (Formspree free/paid form ID `mvoeleov`).
- **Everything else** (WP comments, CF7, blog search) is either local-only JS or dead markup.

---

## 9. SEO artifacts

### `robots.txt`

```
User-agent: *
Disallow: /private/
Disallow: /tmp/
Disallow: /scripts/
Allow: /public/
Sitemap: https://theelderlywellness.com/sitemap.xml
```

Interpretation:
- Only `/scripts/` is a real directory in this repo (build tools). Blocking it in robots is fine; the migration should not ship it anyway.
- `/private/`, `/tmp/`, `/public/` do not exist on disk — the rules are safe boilerplate.
- The sitemap URL is `http`-scheme-agnostic (no scheme mismatch), but uses the apex `theelderlywellness.com` while canonicals use `www.theelderlywellness.com`. **Bug to fix in Next**: robots + sitemap + canonical should all agree on `https://www.theelderlywellness.com`.

### `sitemap.xml`

- Total URLs: **18**.
- All URLs use `https://theelderlywellness.com/` (apex, no `www`). All canonicals in the HTML use `https://www.theelderlywellness.com/` (with `www`). This is a **live SEO inconsistency** — Google is being told two different canonicals.
- Sample entries and problems:

| URL in sitemap | Exists on disk? |
|---|---|
| `/` | yes (`index.html`) |
| `/index.html` | yes (duplicate — should be canonicalized to `/`) |
| `/about.html` | yes |
| `/board-of-advisors.html` | yes |
| `/investors.html` | yes |
| `/contact.html` | yes |
| `/comprehensive-guide-to-caregivers.html` | **NO** — 404. Content lives at `/blogs/what-is-caregivers/`. |
| `/how-to-increase-sodium-levels-in-elderly-at-home.html` | **NO** — 404. Content lives at `/blogs/how-to-increase-sodium-levels-in-elderly-at-home/`. |
| `/how-elderly-wellness-works.html` | yes (but also duplicated at `/blogs/how-elderly-wellness-works/`) |
| `/company/privacy-policy.html` | yes |
| `/company/refund-and-cancellation-policies.html` | yes |
| `/company/terms-and-conditions.html` | yes |
| `/the-inspiring-journey-of-eldery.html` | **NO** — 404. Content lives at `/blogs/journey-of-eldery/`. |
| `/form.html` | **NO** — 404. |
| `/what-is-elderly.html` | **NO** — 404. Content lives at `/blogs/what-is-elderly/`. |
| `/activities-of-daily-living-adls-for-parents.html` | **NO** — 404. Content lives at `/blogs/activities-of-daily-living-adls-for-parents/`. |
| `/essential-grooming-hygiene-tips-elderly.html` | **NO** — 404. Content lives at `/blogs/essential-grooming-hygiene-tips-elderly/`. |
| `/blogs/` | yes |

The sitemap **does not list any of the 36 blog posts** or the 4 top-level service pages or `/elderly-wellness.html`. It's ~7 broken URLs and only ~11 valid URLs out of a ~50-URL site. **Rebuild from scratch in Next** using `next-sitemap` or a manual `app/sitemap.ts`.

Redirect map (in `REDIRECT_MAP.md`) accounts for each of the 6 broken sitemap URLs.

### Sample JSON-LD

**Home page (`index.html`)** ships two blocks:

Block 1 — WebSite (bugged):
```json
{"@context":"https://schema.org/","@type":"WebSite","name":"Elderly Eellness","url":".",
 "potentialAction":{"@type":"SearchAction",
   "target":"https://www.google.com/search?q=theelderlywellness{search_term_string}",
   "query-input":"required name=search_term_string"}}
```
Bugs: name typo `"Elderly Eellness"`; url `"."`; search target points at Google, not the site.

Block 2 — Product with AggregateRating:
```json
{"@context":"https://schema.org/","@type":"Product","name":"Elderly Wellness",
 "image":"images/logo.png",
 "description":"…",
 "brand":{"@type":"Brand","name":"Elderly Wellness"},
 "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9",
   "bestRating":"5","worstRating":"1","ratingCount":"45"}}
```
Recommendation: verify the 45-review claim has a source; otherwise remove the AggregateRating (Google penalizes unsupported review rich-results).

**Blog post `fall-prevention…` (representative)** — a single Rank Math `class="rank-math-schema"` block with `@graph` containing: SiteNavigationElement per TOC entry, Organization, WebSite, ImageObject, BreadcrumbList, WebPage, Person (author), and BlogPosting. This is the pattern used by every WP-exported post.

### Rank Math meta tags (sample from `fall-prevention…`)

Every WP-exported blog post has:
- `<meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>`
- `<link rel="canonical" href="https://www.theelderlywellness.com/blogs/<slug>"/>`
- `<meta property="og:locale" content="en_US"/>`
- `<meta property="og:type" content="article"/>`
- `<meta property="og:title" content="…"/>`
- `<meta property="og:description" content="…"/>`
- `<meta property="og:url" content=""/>` — **BUG**: empty; browsers/OG scrapers fall back to `document.location`.
- `<meta property="og:site_name" content="Elderly Wellness"/>`
- `<meta property="article:section" content="…"/>` (and sometimes `article:tag`)
- `<meta property="og:updated_time"/>`, `<meta property="article:published_time"/>`, `<meta property="article:modified_time"/>`
- `<meta property="og:image"/>` (relative) and `<meta property="og:image:secure_url"/>` (absolute) + `og:image:width/height/alt/type`
- `<meta name="twitter:card" content="summary_large_image"/>` + `twitter:title/description/image`
- `<meta name="twitter:label1"/twitter:data1>` "Written by / Elderly"
- `<meta name="twitter:label2"/twitter:data2>` "Time to read / N minutes"

**To preserve in Next:** all of the above, sourced from the manifest + article body word-count. Use Next `generateMetadata()` per post; emit the JSON-LD via a `<script type="application/ld+json">` in the RSC tree.

---

## 10. Existing responsive behavior + design system

### Breakpoints

From `css/responsive.css` and inline critical CSS in `index.html`, the site uses Bootstrap 4-era breakpoints:
- `max-width: 1600px`
- `max-width: 1300px`
- `max-width: 1199.98px` (Bootstrap `xl`)
- `max-width: 991.98px` and `max-width: 991px` and `max-width: 992px` (Bootstrap `lg`)
- `max-width: 767.98px` and `max-width: 767px` (Bootstrap `md`)
- `max-width: 575.98px` (Bootstrap `sm`)

Mobile-first breakpoints are not used; every rule is `max-width` (desktop-first). Recommend flipping to Tailwind's mobile-first `sm/md/lg/xl/2xl` in Next.

### Primary colors

From `css/style.css` `:root` (and duplicated in `responsive.css` and inline critical CSS):
- `--primery: #2786a5` (teal) — the brand color. **Note the misspelling `primery` — retained here because it is used in dozens of CSS files.**
- `--dark-black: #2786a5` in `style.css` (same teal), but `#181a22` in `responsive.css` and `inline` (a near-black). Inconsistent.
- `--light-yellow: #fdf7ec`
- `--dark-greay: #9599ab`, `--greay: #afafaf`, `--text-greay: #848484` (grays, also misspelled)
- `--black: #000000`, `--bg-white: #ffffff`, `--text-white: #fff`, `--red-color: #ff0000`

### Primary font family

- Body: `Manrope, sans-serif` (declared in `css/style.css` body rule).
- Loaded from Google Fonts (`fonts.gstatic.com`) via `css/manrope.css`, **not** from the local `fonts/gstatic/s/manrope/v20/*.ttf` files that also exist on disk. The local files appear staged for a self-host swap but were never wired up.
- Hero display fonts: `Playball` (loaded from `fonts/playball.woff2` via `css/playball.css` and `hero-fonts.css`) and `Cormorant Garamond` weight 300 (loaded from `fonts/cormorant-garamond-300.woff2`). Used in `index.html` hero (`.hero-serif`, `.hero-age`).
- Fallback font: `Georgia, "Times New Roman", serif` for the hero.
- Icon font: `IcoFont` (`fonts/icofont.woff2` and a subset `icofont-subset.woff2`).

### Known-broken responsive behavior worth noting

- The huge inline `<style id="perf-critical">` block in `index.html` (lines 25–260) uses `!important` liberally to force the mobile navbar layout — an accretion of hotfixes for the base Bootstrap 4 navbar not fitting the design. **Recommend building the mobile nav from scratch in Next**, not porting these overrides.
- Comment in the source (`banner_slider` block) admits that the Owl Carousel init "grew the block 380px → 415px" and "reset LCP to carousel-init time (~5.7 s penalty)"; the workaround is the static `.hero_poster` layer. In Next, use `next/image` with `priority` and drop the workaround.
- Owl Carousel's "dots strip" reserve is a documented layout-shift patch (line 46 comment).
- Multiple pages set `<meta property="og:url" content=""/>` or `content="."` — broken.

---

## 11. Fonts

### Local files under `fonts/`

- **Cormorant Garamond**: `cormorant-garamond-300.woff2` (weight 300 only).
- **Playball**: `playball.woff2` (single weight).
- **IcoFont**: `icofont.woff` (645 KB), `icofont.woff2` (537 KB), and a hand-built subset `icofont-subset.woff2` (3.4 KB). The subset is loaded via `icofont-subset.css`.
- **Manrope (staged, unused)**: `fonts/gstatic/s/manrope/v20/*.ttf` — 7 weights (200/300/400/500/600/700/800).

### External font loads

- **Google Fonts (still active)**: `css/manrope.css` `@font-face` src URLs point at `https://fonts.gstatic.com/s/manrope/v20/*.ttf`. Blog pages also `<link rel="preconnect" href="https://fonts.gstatic.com/">`.
- No `<link href="https://fonts.googleapis.com/...">` was found on the top-level pages — the site talks to `gstatic` directly via the `@font-face` in `manrope.css`.

### Recommended in Next

- **Manrope** → `next/font/google` (variable, weights 200–800). Drop `css/manrope.css` and the local `.ttf` shadow copies. Eliminates the `fonts.gstatic.com` external call.
- **Cormorant Garamond 300** → `next/font/local` with the existing `.woff2`. Keep for hero display.
- **Playball** → `next/font/local` with the existing `.woff2`. Keep for hero display.
- **IcoFont** → strongly recommend replacing the icon-font approach with inline SVG icons (lucide-react or similar). If the design must retain icofont, ship only `icofont-subset.woff2` (3.4 KB) via `next/font/local` — never the 645 KB `.woff`.
