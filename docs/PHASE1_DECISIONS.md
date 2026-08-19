# Phase 1 Decisions Log

**Date:** 2026-08-18
**Confirmed by:** user
**Supersedes:** any conflicting recommendations in `MIGRATION_INVENTORY.md` or `REDIRECT_MAP.md`.

## 1. `how-elderly-wellness-works` canonical

**Blog post is canonical.** Both of these must resolve:

- `/blogs/how-elderly-wellness-works/` — canonical, HTTP 200, indexed
- `/how-elderly-wellness-works.html` — HTTP 301 → `/blogs/how-elderly-wellness-works/`
- `/how-elderly-wellness-works/` — HTTP 301 → `/blogs/how-elderly-wellness-works/`

Do NOT create a top-level `/how-elderly-wellness-works/` route in Next. Update `REDIRECT_MAP.md` §1 accordingly.

## 2. Broken sitemap URLs — 301 targets accepted as-proposed

All 7 URLs currently in `sitemap.xml` that 404 today are 301'd to the targets proposed in `REDIRECT_MAP.md` §4:

| From | To |
|---|---|
| `/comprehensive-guide-to-caregivers.html` | `/blogs/what-is-caregivers/` |
| `/form.html` | `/contact/` |
| `/the-inspiring-journey-of-eldery.html` | `/blogs/journey-of-eldery/` |
| `/what-is-elderly.html` | `/blogs/what-is-elderly/` |
| `/activities-of-daily-living-adls-for-parents.html` | `/blogs/activities-of-daily-living-adls-for-parents/` |
| `/essential-grooming-hygiene-tips-elderly.html` | `/blogs/essential-grooming-hygiene-tips-elderly/` |
| `/how-to-increase-sodium-levels-in-elderly-at-home.html` | `/blogs/how-to-increase-sodium-levels-in-elderly-at-home/` |

## 3. Contact form — keep as recruitment form on `/contact/`

The existing `contact.html` form (fields: Name, Email, Phone, Experience, Education, Area of Expertise, Physio Device → Formspree `https://formspree.io/f/mvoeleov`, POST) stays exactly as-is on `/contact/`.

- No general contact form is added.
- No `/careers/` route is created.
- Preserve the Formspree action URL exactly.
- Preserve every field name (Formspree relies on field names for its email templating).
- Navigation stays unchanged from what exists today (no new careers link).

## 4. Canonical host — unify on `www`

- `SITE_URL = "https://www.theelderlywellness.com"` (with `www`, no trailing slash).
- Every canonical, `og:url`, sitemap entry, robots reference, and JSON-LD `@id`/`url` in the Next app uses this constant.
- Ignore the current apex-only entries in `sitemap.xml` — regenerate from Next.
- The current bugs (blog `og:url=""`, home `og:url="."`) are FIXED in the migration by emitting an absolute per-page canonical.
