# Sitewide Responsive Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all 107 static HTML pages usable from 320px through large desktop widths, with shared fixes for the navbar, blog index, archives, and every blog detail page.

**Architecture:** Keep Bootstrap, existing HTML structures, and JavaScript intact. Correct global behavior in `css/responsive.css`, correct shared blog behavior in the blog CSS files, and remove the duplicate `blog-pages.css` import so one authoritative cascade applies to every blog template.

**Tech Stack:** Static HTML5, CSS3, Bootstrap 4 responsive navbar, vanilla JavaScript, Python 3 standard library for repository checks.

## Global Constraints

- Support viewport widths from 320px upward.
- Focus adjustments at 576px, 768px, 992px, and 1200px.
- Do not change existing JavaScript.
- Restrict HTML changes to stylesheet deduplication or load-order corrections.
- Preserve content, semantic page structure, visual identity, and URL structure.
- Do not create commits unless the user explicitly requests them.

---

### Task 1: Add Repeatable Responsive Markup Checks

**Files:**
- Create: `scripts/check-responsive-markup.py`

**Interfaces:**
- Consumes: every repository `*.html` file and its `<head>` markup.
- Produces: process exit code `0` when viewport declarations and blog stylesheet references are valid; exit code `1` with file-specific messages otherwise.

- [ ] **Step 1: Write the checker with assertions for all page families**

Create a Python standard-library script that:

```python
#!/usr/bin/env python3
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(ROOT.rglob("*.html"))
errors = []

for path in HTML_FILES:
    text = path.read_text(encoding="utf-8")
    rel = path.relative_to(ROOT)

    if not re.search(
        r'<meta\s+name=["\']viewport["\']\s+content=["\'][^"\']*width=device-width',
        text,
        re.IGNORECASE,
    ):
        errors.append(f"{rel}: missing responsive viewport meta")

    if rel.parts and rel.parts[0] == "blogs":
        direct = len(re.findall(r'href=["\'][^"\']*css/blog-pages\.css["\']', text))
        if direct != 1:
            errors.append(f"{rel}: expected one direct blog-pages.css link, found {direct}")

if errors:
    print("\n".join(errors))
    sys.exit(1)

print(f"Responsive markup checks passed for {len(HTML_FILES)} HTML files.")
```

- [ ] **Step 2: Run the checker before CSS changes**

Run:

```bash
python3 scripts/check-responsive-markup.py
```

Expected: either a pass for all 107 files or exact filenames showing pre-existing missing/duplicate references. Any reported blog stylesheet inconsistency becomes input to Task 4.

### Task 2: Correct Global Navbar and Page Responsiveness

**Files:**
- Modify: `css/responsive.css:37-297`
- Modify: `css/responsive.css:678-1966`

**Interfaces:**
- Consumes: existing Bootstrap `.navbar-expand-lg`, `.navbar-collapse`, `.navbar-toggler`, `.show`, container, grid, image, form, and footer classes.
- Produces: a collapsed navbar below 1200px and safe shared sizing from 320px upward.

- [ ] **Step 1: Move shared narrow-navigation behavior to the 1200px boundary**

Add rules inside `@media screen and (max-width: 1199.98px)` that explicitly override Bootstrap’s 992px expansion:

```css
.navbar-expand-lg {
  flex-wrap: wrap;
}

.navbar-expand-lg .navbar-toggler {
  display: block;
  min-width: 44px;
  min-height: 44px;
  margin-left: auto;
}

.navbar-expand-lg .navbar-collapse {
  flex-basis: 100%;
  width: 100%;
}

.navbar-expand-lg .navbar-collapse.collapse:not(.show) {
  display: none !important;
}

.navbar-expand-lg .navbar-collapse.show,
.navbar-expand-lg .navbar-collapse.collapsing {
  display: block !important;
}

.navbar-expand-lg .navbar-nav {
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-height: calc(100vh - 72px);
  overflow-y: auto;
}
```

Move or broaden the existing mobile menu, dropdown, full-width item, and button-spacing selectors currently limited to `max-width: 992px` so they apply through `1199.98px`. Keep desktop hover dropdown behavior at 1200px and wider.

- [ ] **Step 2: Add global overflow prevention at the source**

Add shared intrinsic sizing without using page-level horizontal clipping:

```css
img,
svg,
video,
canvas,
iframe {
  max-width: 100%;
}

.row > *,
.navbar-collapse,
.page_wrapper,
main,
article,
section {
  min-width: 0;
}

input,
select,
textarea,
button {
  max-width: 100%;
}
```

Ensure long links in footer, policy, contact, and card content use `overflow-wrap: anywhere` only on text-bearing selectors, not globally.

- [ ] **Step 3: Normalize phone gutters and fluid typography**

Inside `max-width: 767.98px`, keep `.container` gutters at 15px, use `clamp()` for major headings, remove fixed child widths that exceed the container, stack button rows, and make controls at least 44px tall where existing design permits.

Inside `max-width: 575.98px`, reduce only section-level padding; do not add a second set of nested 10–20px horizontal paddings.

- [ ] **Step 4: Verify CSS syntax and unchanged JavaScript**

Run:

```bash
git diff --check
git diff -- js
```

Expected: no whitespace errors and no JavaScript diff.

### Task 3: Correct Shared Blog Layouts

**Files:**
- Modify: `css/blog-pages.css:17-94`
- Modify: `css/blog-pages.css:96-252`
- Modify: `css/blog-pages.css:254-681`
- Modify: `css/blog-main-header.css:1-63`
- Modify: `css/blog-main-header.css:120-254`
- Modify: `css/blog-sidebar.css:225-230`

**Interfaces:**
- Consumes: shared `body.blog`, `body.archive`, `body.author`, `body.search`, `body.single-post`, `.site-content`, `.content-area`, `.entry-content`, and `#right-sidebar` markup.
- Produces: consistent listing cards, article/sidebar stacking, media, tables, and article typography across every blog page.

- [ ] **Step 1: Remove the duplicate stylesheet import**

Delete this line from `css/blog-main-header.css`:

```css
@import url("blog-pages.css");
```

All blog HTML pages must load `blog-pages.css` directly once, after `blog-main-header.css` where the current detail template already does so.

- [ ] **Step 2: Make the blog shell fluid and remove nested phone padding**

Retain the 1200px desktop maximum, but use one shell gutter and allow all flex children to shrink:

```css
body.blog .site.grid-container,
body.archive .site.grid-container,
body.author .site.grid-container,
body.search .site.grid-container,
body.single-post .site.grid-container {
  width: min(100%, 1200px);
  padding-inline: 15px;
}

body.single-post .content-area,
body.single-post #right-sidebar,
.inside-article,
.entry-content {
  min-width: 0;
}
```

At `max-width: 991.98px`, stack the article and sidebar at `width: 100%`. At `max-width: 767.98px`, remove the extra 15px `.content-area` padding from `blog-main-header.css`; article padding alone provides the readable gutter.

- [ ] **Step 3: Correct blog listing, article, and sidebar sizing**

Keep two listing columns only where each card remains at least about 360px wide. Use one column on phones/tablets, responsive card images with `aspect-ratio`, and margins that cannot exceed the card width.

For articles, use:

```css
body.single-post header.entry-header,
body.single-post .entry-content {
  padding-inline: clamp(16px, 4vw, 40px);
}

.entry-content,
.entry-content * {
  box-sizing: border-box;
}

.entry-content pre,
.entry-content code {
  max-width: 100%;
  overflow-x: auto;
}

.entry-content iframe,
.entry-content video,
.entry-content embed {
  width: 100%;
}
```

At phone widths, reduce TOC, blockquote, CTA, footer-meta, and sidebar panel padding to 16px. Keep sidebar cards full width below 992px and preserve sticky behavior only on desktop.

- [ ] **Step 4: Keep wide tables locally scrollable**

Make the table wrapper the only horizontal scroller:

```css
.entry-content .wp-block-table {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.entry-content .wp-block-table table {
  width: 100%;
  min-width: 480px;
}
```

Do not set `overflow-x: hidden` on the article or body to mask table overflow.

- [ ] **Step 5: Verify representative blog structures**

Check selectors against:

```text
blogs/index.html
blogs/early-signs-of-dementia-in-elderly-parents/index.html
blogs/exercises-for-seniors-over-75/index.html
blogs/category/elderly/index.html
blogs/tag/elderly-care/index.html
```

Run:

```bash
git diff --check
python3 scripts/check-responsive-markup.py
```

Expected: no CSS whitespace errors and all blog pages have one direct `blog-pages.css` reference.

### Task 4: Normalize Blog Stylesheet References

**Files:**
- Modify only if reported by Task 1: `blogs/**/*.html`

**Interfaces:**
- Consumes: each blog page `<head>`.
- Produces: exactly one direct path-correct `blog-pages.css` link per blog page, with no structural/content/JavaScript edits.

- [ ] **Step 1: List inconsistent files**

Run:

```bash
python3 scripts/check-responsive-markup.py
```

Expected before correction: exact file paths and counts for any inconsistent page.

- [ ] **Step 2: Apply mechanical stylesheet-only corrections**

For each reported page, retain exactly one path-correct link:

```html
<link rel="stylesheet" href="../../css/blog-pages.css"/>
```

The number of `../` segments must match that page’s depth. Preserve every non-stylesheet line byte-for-byte.

- [ ] **Step 3: Prove consistency and JavaScript preservation**

Run:

```bash
python3 scripts/check-responsive-markup.py
git diff -- js
git diff --check
```

Expected: markup checks pass, JavaScript diff is empty, and Git reports no whitespace errors.

### Task 5: Serve and Verify All Responsive Template Families

**Files:**
- Verify: all modified CSS and HTML files

**Interfaces:**
- Consumes: completed static site.
- Produces: a verified responsive site with no known overflow or navigation failures at supported widths.

- [ ] **Step 1: Start the static server**

Run:

```bash
python3 -m http.server 8000
```

Expected: `Serving HTTP on 0.0.0.0 port 8000`.

- [ ] **Step 2: Check representative routes at all target widths**

Inspect 320, 375, 576, 768, 992, 1024, 1200, 1280, and 1440px widths for:

```text
/
/physiotherapy-services-for-elders.html
/company/privacy-policy.html
/blogs/
/blogs/early-signs-of-dementia-in-elderly-parents/
/blogs/exercises-for-seniors-over-75/
/blogs/category/elderly/
```

At each width verify: no page-level horizontal scrollbar, no clipped text, contained images/media/tables, working navbar collapse/dropdowns, readable card and article typography, and article/sidebar stacking below 992px.

- [ ] **Step 3: Run final repository checks**

Run:

```bash
python3 scripts/check-responsive-markup.py
git diff --check
git status --short
```

Expected: responsive markup checks pass, no whitespace errors, and only the planned CSS, stylesheet-only HTML corrections, checker, spec, and plan files are modified.
