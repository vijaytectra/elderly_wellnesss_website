#!/usr/bin/env node
/**
 * Builds one purged, minified CSS bundle per content page and rewrites each
 * page to load it instead of six separate stylesheets.
 *
 * Every non-home page loaded, render-blocking and unminified:
 *   icofont.min.css (90K) + owl.carousel.min.css + bootstrap.min.css (220K)
 *   + aos.css + style.css (112K) + responsive.css (56K)   ~= 510K
 *
 * Each page only uses a small slice of that. Bundling in the original document
 * order preserves the cascade exactly; purging against that page's own markup
 * removes the rest. IcoFont is swapped for the generated subset.
 *
 * Run scripts/build-icon-subset.js first.
 *
 * Usage: PURGECSS_PATH=<dir with node_modules> node scripts/build-page-bundles.js
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

const PAGES = [
  'about.html',
  'contact.html',
  'elderly-wellness.html',
  'how-elderly-wellness-works.html',
  'investors.html',
  'board-of-advisors.html',
  'nursing-services-for-elders.html',
  'physiotherapy-services-for-elders.html',
  'geriatric-care-services-for-elders.html',
  'assisted-living-support-services-for-elders.html',
  'company/privacy-policy.html',
  'company/refund-and-cancellation-policies.html',
  'company/terms-and-conditions.html',
];

// Same order the pages declared them, with IcoFont replaced by the subset.
const SOURCES = [
  'icofont-subset.css',
  'owl.carousel.min.css',
  'bootstrap.min.css',
  'aos.css',
  'style.css',
  'responsive.css',
  // Last: must override owl.carousel.min.css's `.owl-carousel{display:none}`.
  'ew-carousel-reserve.css',
  'ew-a11y.css',
];

const node = process.execPath;
let totalBefore = 0;
let totalAfter = 0;

for (const page of PAGES) {
  const name = path.basename(page, '.html');
  const abs = path.join(ROOT, page);
  const depth = page.includes('/') ? '../' : '';

  execFileSync(node, [path.join(__dirname, 'build-css-bundle.js'), name, ...SOURCES],
    { cwd: ROOT, stdio: 'pipe' });
  execFileSync(node, [path.join(__dirname, 'purge-css-bundle.js'), `css/${name}.bundle.css`, page],
    { cwd: ROOT, stdio: 'pipe' });

  const purged = path.join(ROOT, 'css', `${name}.bundle.purged.css`);
  const final = path.join(ROOT, 'css', `${name}.bundle.css`);
  fs.renameSync(purged, final);

  // Rewrite the page: first stylesheet link becomes the bundle, the rest go.
  let html = fs.readFileSync(abs, 'utf8');
  const before = Buffer.byteLength(html);
  let replaced = 0;

  html = html.replace(/[ \t]*<link rel="stylesheet" href="[^"]+"\s*\/?>\n?/g, () => {
    replaced++;
    return replaced === 1
      ? `    <!-- Single purged, render-blocking CSS bundle (was 6 stylesheets, ~510K) -->\n` +
        `    <link rel="stylesheet" href="${depth}css/${name}.bundle.css?v=20260728"/>\n`
      : '';
  });

  fs.writeFileSync(abs, html);

  const raw = fs.statSync(final).size;
  const br = require('zlib').brotliCompressSync(fs.readFileSync(final)).length;
  totalBefore += 510 * 1024;
  totalAfter += raw;
  console.log(
    `  ${page.padEnd(50)} ${replaced} links -> 1   bundle ${(raw / 1024).toFixed(0)}K raw / ${(br / 1024).toFixed(1)}K br` +
    `   html ${(before / 1024).toFixed(0)}K`
  );
}

console.log(`\n  render-blocking CSS per page: ~510K -> ~${(totalAfter / PAGES.length / 1024).toFixed(0)}K raw (avg)`);
