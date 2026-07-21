# Blog Editorial Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every blog detail page the same white, full-column editorial canvas and spacing rhythm.

**Architecture:** Add shared `body.single-post` rules to `css/blog-pages.css`, normalizing article-level block spacing without changing HTML or JavaScript. Preserve the 316px desktop sidebar and existing responsive stack.

**Tech Stack:** CSS3, static HTML, headless Chrome verification.

## Global Constraints

- Apply to every blog detail page through shared selectors.
- Keep the desktop sidebar.
- Do not change HTML content or JavaScript.
- Preserve listing/archive presentation.
- Do not commit unless explicitly requested.

### Task 1: Normalize the Shared Article Canvas

**Files:**
- Modify: `css/blog-pages.css`

**Interfaces:**
- Consumes: shared `body.single-post`, `.inside-article`, `header.entry-header`, `.entry-content`, and Gutenberg block classes.
- Produces: consistent article edges, spacing, and white background across all blog details.

- [ ] Add a CSS invariant check for white single-post background, equal header/content inline padding, normalized block margins, and unchanged sidebar width.
- [ ] Run it before changes and confirm it fails.
- [ ] Implement shared white canvas, subtle article border/shadow, fluid 28–36px desktop insets, 18px phone insets, and normalized paragraph/heading/list/media/CTA/TOC spacing.
- [ ] Keep figures, images, tables, and embeds at `max-width: 100%`.
- [ ] Run the invariant check, responsive markup checker, `git diff --check`, and confirm JavaScript remains unchanged.
- [ ] Inspect representative detail pages at 320px, 768px, 1024px, and 1440px for equal article edges, white background, compact spacing, no overflow, and correct sidebar behavior.
