#!/usr/bin/env node
/**
 * Removes selectors no page actually uses from a CSS bundle.
 *
 * Motivation: with all CSS render-blocking, style recalculation became the
 * single largest main-thread cost (~1.6s of styleLayout on a 4x-throttled
 * mobile profile). Most of that work is Bootstrap and theme rules the site
 * never uses.
 *
 * Content sources include the JS files so class names that only ever appear in
 * scripts (Owl, AOS, Bootstrap collapse/modal state classes) are retained.
 *
 * Usage: node scripts/purge-css-bundle.js <bundle.css> <page1.html> [page2.html ...]
 *
 * Requires purgecss to be resolvable; pass PURGECSS_PATH to point at an
 * install outside the project.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const req = (name) => {
  const extra = process.env.PURGECSS_PATH;
  try {
    return require(name);
  } catch (e) {
    if (!extra) throw e;
    return require(path.join(extra, 'node_modules', name));
  }
};
const { PurgeCSS } = req('purgecss');

const [bundleArg, ...pages] = process.argv.slice(2);
if (!bundleArg || !pages.length) {
  console.error('usage: purge-css-bundle.js <bundle.css> <page1.html> ...');
  process.exit(1);
}

const bundlePath = path.resolve(ROOT, bundleArg);

// Only classes that are added at runtime and therefore never appear literally
// in the HTML. Anything the markup uses is found by scanning content, so
// safelisting whole Bootstrap utility families here would defeat the purge --
// an earlier over-broad safelist retained ~68K of unused rules.
const SAFELIST = {
  standard: [
    'active', 'show', 'showing', 'open', 'collapse', 'collapsing', 'collapsed',
    'fade', 'in', 'disabled', 'current', 'selected', 'loading', 'loaded',
    'modal-open', 'modal-backdrop', 'modal-dialog', 'modal-content',
    'modal-header', 'modal-body', 'modal-footer', 'modal-lg', 'modal-sm',
    'aos-init', 'aos-animate', 'no-js', 'sr-only', 'ew-sr-only',
    'navbar-toggler-icon', 'toggle-wrap', 'toggle-bar',
  ],
  // Owl and AOS build their own DOM, so their classes exist only at runtime.
  greedy: [/owl-/, /^aos/, /\bicofont-/],
  deep: [/\.owl-/, /\[data-aos/, /\.modal/, /\.collapsing/, /\.show$/],
};

(async () => {
  const before = fs.readFileSync(bundlePath);

  const result = await new PurgeCSS().purge({
    // Only this site's own scripts. Scanning vendor bundles (jQuery, Bootstrap,
    // Owl, AOS) makes PurgeCSS treat every identifier inside them as a possible
    // class name, which retained tens of KB of dead rules.
    content: [
      ...pages.map((p) => path.resolve(ROOT, p)),
      ...['main.js', 'article.js', 'home-perf.js', 'blog-faq.js', 'blog-sidebar.js']
        .map((f) => path.join(ROOT, 'js', f))
        .filter((f) => fs.existsSync(f)),
    ],
    css: [bundlePath],
    safelist: SAFELIST,
    // Keep @font-face and @keyframes; removing them risks silent visual loss
    // for rules applied only from script.
    fontFace: false,
    keyframes: false,
    variables: false,
  });

  if (!result.length || !result[0].css) {
    console.error('  purge produced no output; leaving bundle untouched');
    process.exit(1);
  }

  const out = Buffer.from(result[0].css);
  const outPath = bundlePath.replace(/\.css$/, '.purged.css');
  fs.writeFileSync(outPath, out);

  const zlib = require('zlib');
  const br = (b) => (zlib.brotliCompressSync(b).length / 1024).toFixed(1) + 'K';
  console.log(`  before ${(before.length / 1024).toFixed(1)}K raw / ${br(before)} br`);
  console.log(`  after  ${(out.length / 1024).toFixed(1)}K raw / ${br(out)} br`);
  console.log(`  -> ${path.relative(ROOT, outPath)}`);
})();
