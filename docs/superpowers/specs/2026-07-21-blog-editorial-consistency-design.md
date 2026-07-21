# Blog Editorial Consistency Design

## Goal

Give every blog detail page the same professional editorial layout while retaining the desktop sidebar, existing content, HTML, and JavaScript.

## Shared Layout

- Use a white page background instead of the pale-blue blog background.
- Keep the desktop article/sidebar layout, with the article flexing into all remaining horizontal space.
- Use one shared horizontal inset for the hero title block and article body.
- Preserve compact safe gutters on phones.
- Replace heavy article-card decoration with a subtle border and restrained shadow.

## Content Rhythm

- Align titles, metadata, paragraphs, headings, figures, tables, CTAs, and other block content to the same article edges.
- Keep only semantic indentation, such as bullets and numbered lists.
- Normalize paragraph, heading, list, image, table, quote, TOC, and CTA margins so exported WordPress blocks cannot introduce page-specific spacing.
- Remove empty paragraph and break-only block space where CSS can identify it safely.
- Use moderate spacing between images and neighboring text.

## Responsive Behavior

- Desktop article padding: fluid within a 28–36px range.
- Mobile article padding: 18px, with no second nested content gutter.
- Sidebar remains 316px on desktop and stacks below the article under 992px.
- Media, tables, and embedded content remain contained within the article width.

## Scope

- Apply through shared `body.single-post` selectors to all blog detail pages.
- Modify shared blog CSS only.
- Do not rewrite article content, alter JavaScript, or create page-specific fixes.
- Blog listings and archive cards retain their existing presentation.

## Verification

Compare multiple structurally different articles at 320px, 768px, 1024px, and 1440px. Confirm equal title/body edges, consistent paragraph and heading rhythm, compact image spacing, a white page canvas, no horizontal overflow, and unchanged sidebar behavior.
