# Sitewide Responsive Design

## Goal

Make every site page usable without horizontal page scrolling at viewport widths from 320px upward, while preserving existing content, HTML structure, and JavaScript behavior. The navbar, blog index, all blog detail pages, blog archives, and standard marketing pages are in scope.

## Current Problems

- Shared styles, generated WordPress styles, and blog-specific styles overlap and compete.
- Blog pages load some shared styles more than once.
- The desktop navbar remains expanded at widths where its links no longer fit.
- Nested containers apply too much horizontal padding on narrow phones.
- Some tables and media blocks can exceed their content columns.
- Global overflow clipping hides layout defects.
- All 36 blog detail pages share the same layout problems, so per-page patches would duplicate work.

## Chosen Approach

Use shared, mobile-first responsive rules rather than page-by-page patches.

- `css/responsive.css` remains the authoritative responsive layer for the global navbar, footer, and standard pages.
- Existing blog CSS files remain authoritative for blog index, archive, article, and sidebar layouts.
- Minimal HTML cleanup may remove duplicate stylesheet references or resolve load-order conflicts. It must not change content, semantic page structure, or JavaScript behavior.
- Shared selectors will cover all blog detail pages, including the supplied dementia article example.

## Breakpoints

The layout supports fluid sizing between breakpoints, with focused adjustments at:

- Base: 320px and wider
- Small phones and landscape phones: 576px and wider
- Tablets: 768px and wider
- Small laptops: 992px and wider
- Full desktop navigation: 1200px and wider

The navbar will use its collapsed interaction below 1200px because the current link set cannot reliably fit in the 992–1199px range.

## Component Behavior

### Global Navigation

- Keep branding and the hamburger on one row.
- Ensure the toggle has a usable touch target and visible state.
- Constrain the expanded mobile menu to the viewport and allow vertical scrolling when needed.
- Make dropdown links readable and tappable.
- Prevent desktop links, buttons, and branding from wrapping or colliding.

### Standard Pages

- Use fluid containers with safe phone gutters.
- Allow flex and grid children to shrink using `min-width: 0`.
- Scale headings and section spacing without making text too small.
- Keep images, embeds, forms, and buttons within their containers.
- Stack multi-column sections at the breakpoint appropriate to their content.

### Blog Index and Archives

- Keep cards and metadata within the available width.
- Use one column on phones, increasing columns only where cards remain readable.
- Preserve image aspect ratios and prevent title or excerpt overflow.
- Normalize pagination and category/tag navigation for touch.

### Blog Detail Pages

- Use one content column below 992px and move the sidebar below the article.
- Remove redundant nested phone padding.
- Keep headings, lists, callouts, CTAs, author information, and related content readable.
- Wrap wide tables in their existing scroll region without making the page itself scroll horizontally.
- Make article images, figures, videos, and embeds responsive.
- Apply these rules through shared classes to all 36 article pages.

### Footer

- Stack columns and controls cleanly on phones.
- Permit long links and contact text to wrap.
- Maintain consistent alignment and spacing at tablet and desktop sizes.

## Compatibility and Constraints

- No JavaScript behavior changes are part of this responsive pass.
- HTML changes are limited to stylesheet deduplication or load-order corrections.
- Existing visual identity, content, and URL structure remain unchanged.
- CSS must not rely on browser-specific device detection.

## Verification

Serve the repository locally and inspect representative pages from every template family at 320, 375, 576, 768, 992, 1024, 1200, 1280, and wide desktop widths.

Representative pages include:

- Home and one standard service page
- Blog index
- Dementia article and at least one structurally different article
- Blog tag/category/archive page
- Company policy page

Verification checks:

- No horizontal page overflow
- Navigation opens, closes, and remains usable
- Text and controls remain readable and tappable
- Images, tables, embeds, and cards stay within their containers
- Article/sidebar stacking is consistent
- Shared stylesheet references are consistent across all HTML files
- Existing JavaScript files remain unchanged

## Out of Scope

- Content rewriting
- Visual rebranding
- JavaScript refactoring
- Accessibility remediation unrelated to responsive layout
- Backend or deployment changes
