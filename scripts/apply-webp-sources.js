#!/usr/bin/env node
/**
 * Wraps <img> tags in <picture> so browsers can pick the generated WebP,
 * falling back to the original file everywhere else.
 *
 * Run scripts/optimize-images.py first -- this only touches images that
 * actually have a .webp sibling on disk.
 *
 * Images already inside a <picture> (the hero poster) are left alone, and a
 * `picture{display:contents}` rule in css/ew-a11y.css keeps the extra wrapper
 * out of the layout tree so no existing CSS changes behaviour.
 *
 * Usage: node scripts/apply-webp-sources.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const PAGES = [
  'index.html', 'about.html', 'contact.html', 'elderly-wellness.html',
  'how-elderly-wellness-works.html', 'investors.html', 'board-of-advisors.html',
  'nursing-services-for-elders.html', 'physiotherapy-services-for-elders.html',
  'geriatric-care-services-for-elders.html',
  'assisted-living-support-services-for-elders.html',
  'company/privacy-policy.html', 'company/refund-and-cancellation-policies.html',
  'company/terms-and-conditions.html',
];

let totalWrapped = 0;

for (const page of PAGES) {
  const abs = path.join(ROOT, page);
  if (!fs.existsSync(abs)) continue;
  const depth = page.includes('/') ? '../' : '';
  let html = fs.readFileSync(abs, 'utf8');
  let wrapped = 0;

  // Spans of the document already inside a <picture>; those imgs are skipped.
  const guarded = [];
  for (const m of html.matchAll(/<picture[\s>][\s\S]*?<\/picture>/gi)) {
    guarded.push([m.index, m.index + m[0].length]);
  }
  const insidePicture = (i) => guarded.some(([s, e]) => i >= s && i < e);

  html = html.replace(/<img\s[^>]*?>/gi, (tag, offset) => {
    if (insidePicture(offset)) return tag;

    const srcMatch = tag.match(/\ssrc="([^"]+)"/i);
    if (!srcMatch) return tag;

    const src = srcMatch[1];
    if (/^(https?:)?\/\//.test(src) || /^data:/.test(src)) return tag;
    if (!/\.(png|jpe?g)$/i.test(src)) return tag;

    // Resolve the src the same way the browser will, relative to the page.
    const rel = src.replace(/^\//, '').replace(/^\.\//, '');
    const onDisk = path.join(ROOT, page.includes('/') ? path.dirname(page) : '', rel);
    const webpOnDisk = onDisk.replace(/\.(png|jpe?g)$/i, '.webp');
    if (!fs.existsSync(webpOnDisk)) return tag;

    const webpSrc = src.replace(/\.(png|jpe?g)$/i, '.webp');
    wrapped++;
    return `<picture><source srcset="${webpSrc}" type="image/webp"/>${tag}</picture>`;
  });

  if (wrapped) {
    fs.writeFileSync(abs, html);
    console.log(`  ${page.padEnd(50)} ${wrapped} images now offer WebP`);
    totalWrapped += wrapped;
  }
  void depth;
}

console.log(`\n  ${totalWrapped} <img> wrapped in <picture>`);
