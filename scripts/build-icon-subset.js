#!/usr/bin/env node
/**
 * Builds a minimal icon font from IcoFont containing only the glyphs this site
 * actually uses.
 *
 * IcoFont ships ~2100 icons: 528K of WOFF2 + 92K of CSS, for the ~2 dozen icons
 * the site references. This scans the markup and scripts for `icofont-*`
 * classes, reads each one's codepoint out of icofont.min.css, and emits:
 *
 *   fonts/icofont-subset.woff2   - only the used glyphs (via pyftsubset)
 *   css/icofont-subset.css       - @font-face + only the used classes
 *
 * Requires Python with fonttools + brotli (`pip install fonttools brotli`).
 *
 * Usage: node scripts/build-icon-subset.js
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SRC_CSS = path.join(ROOT, 'css', 'icofont.min.css');
const SRC_FONT = path.join(ROOT, 'fonts', 'icofont.woff2');
const OUT_FONT = path.join(ROOT, 'fonts', 'icofont-subset.woff2');
const OUT_CSS = path.join(ROOT, 'css', 'icofont-subset.css');

// 1. Which icon classes does the site reference?
function scanDir(dir, exts, skip) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.includes(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(scanDir(p, exts, skip));
    else if (exts.includes(path.extname(entry.name))) out.push(p);
  }
  return out;
}

const files = scanDir(ROOT, ['.html', '.js'], ['blogs', 'node_modules', '.git', 'scripts']);
const used = new Set();
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8');
  for (const m of text.matchAll(/icofont-[a-z0-9-]+/g)) used.add(m[0]);
}
used.delete('icofont-');

// 2. Map class -> codepoint from the full stylesheet.
const css = fs.readFileSync(SRC_CSS, 'utf8');
const cp = new Map();
for (const m of css.matchAll(/\.(icofont-[a-z0-9-]+):before\s*\{\s*content:\s*"\\([0-9a-fA-F]+)"/g)) {
  cp.set(m[1], m[2]);
}

const resolved = [];
const missing = [];
for (const cls of [...used].sort()) {
  if (cp.has(cls)) resolved.push([cls, cp.get(cls)]);
  else missing.push(cls);
}

console.log(`  referenced: ${used.size}   resolved: ${resolved.length}` + (missing.length ? `   unmapped: ${missing.join(', ')}` : ''));

// 3. Subset the WOFF2 to just those codepoints.
const unicodes = resolved.map(([, c]) => 'U+' + c).join(',');
execFileSync('python', [
  '-m', 'fontTools.subset', SRC_FONT,
  '--unicodes=' + unicodes,
  '--flavor=woff2',
  '--output-file=' + OUT_FONT,
  '--no-hinting', '--desubroutinize', '--layout-features=',
], { stdio: 'inherit' });

// 4. Emit a stylesheet with only the used classes.
//    The base .icofont selector list is reproduced so sizing/inheritance match.
const rules = resolved.map(([cls, code]) => `.${cls}:before{content:"\\${code}"}`).join('');
const out =
  `@font-face{font-family:IcoFont;font-weight:400;font-style:normal;font-display:block;` +
  `src:url(../fonts/icofont-subset.woff2) format("woff2")}` +
  `[class*=" icofont-"]:before,[class^=icofont-]:before{` +
  `font-family:IcoFont!important;font-style:normal;font-weight:400;font-variant:normal;` +
  `text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;` +
  `display:inline-block;text-decoration:inherit;speak:none}` +
  rules;
fs.writeFileSync(OUT_CSS, out);

const kb = (p) => (fs.statSync(p).size / 1024).toFixed(1) + 'K';
console.log(`  font: ${kb(SRC_FONT)} -> ${kb(OUT_FONT)}`);
console.log(`  css:  ${kb(SRC_CSS)} -> ${kb(OUT_CSS)}`);
