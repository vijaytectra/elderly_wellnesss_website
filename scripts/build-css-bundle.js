#!/usr/bin/env node
/**
 * Concatenates a page's stylesheets into one render-blocking bundle.
 *
 * Why: the site previously inlined two big <style> blocks and loaded the rest
 * with `media="print" onload="this.media='all'"`. That makes the async sheets
 * apply *after* first paint, so the above-the-fold layout reflows on every
 * load -- the single largest source of CLS (measured up to 1.4).
 *
 * A single render-blocking bundle makes first paint == final layout, which is
 * deterministic regardless of connection speed. It costs one request, and the
 * bundle compresses to a fraction of its raw size with Brotli/gzip.
 *
 * Files MUST be listed in the same order they appeared in the document, so the
 * cascade is preserved exactly.
 *
 * Usage: node scripts/build-css-bundle.js <bundle-name> <file1.css> <file2.css> ...
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CSS_DIR = path.join(ROOT, 'css');

function minify(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')       // comments
    .replace(/\s*\n\s*/g, '')                // newlines + surrounding indentation
    .replace(/\s{2,}/g, ' ')                 // runs of spaces
    .replace(/\s*([{}:;,>])\s*/g, '$1')      // space around separators
    .replace(/;}/g, '}')                     // trailing semicolons
    .trim();
}

function braceBalance(css) {
  let depth = 0;
  let stray = 0;
  for (const ch of css) {
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth < 0) { stray++; depth = 0; }
    }
  }
  return { unclosed: depth, stray };
}

const [name, ...files] = process.argv.slice(2);
if (!name || !files.length) {
  console.error('usage: build-css-bundle.js <bundle-name> <file1.css> ...');
  process.exit(1);
}

const parts = [];
let rawTotal = 0;

for (const file of files) {
  const abs = path.join(CSS_DIR, file);
  if (!fs.existsSync(abs)) {
    console.error(`  MISSING ${file}`);
    process.exit(1);
  }
  const src = fs.readFileSync(abs, 'utf8');
  rawTotal += Buffer.byteLength(src);

  const bal = braceBalance(src);
  const warn = bal.unclosed || bal.stray
    ? `  <-- unbalanced braces (unclosed:${bal.unclosed} stray:${bal.stray})`
    : '';
  console.log(`  + ${file.padEnd(28)} ${String(Math.round(Buffer.byteLength(src) / 1024)).padStart(4)}K${warn}`);

  parts.push(`/* ${file} */\n${minify(src)}`);
}

const out = parts.join('\n');
const outPath = path.join(CSS_DIR, `${name}.bundle.css`);
fs.writeFileSync(outPath, out);

console.log(
  `\n  = css/${name}.bundle.css  ${Math.round(Buffer.byteLength(out) / 1024)}K ` +
  `(from ${Math.round(rawTotal / 1024)}K raw)`
);
