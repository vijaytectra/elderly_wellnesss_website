import fs from 'node:fs';
import { parse } from 'node-html-parser';

const html = fs.readFileSync('C:\\Users\\Vijayakumar R\\.gemini\\antigravity-ide\\brain\\0d8d2fb5-29d5-42ac-baad-1bbc0fcf861c\\scratch\\doc_body.html', 'utf8');

function decodeGoogleUrl(url) {
  if (!url) return url;
  const m = url.match(/q=([^&]+)/);
  if (m) {
    return decodeURIComponent(m[1]);
  }
  return url;
}

const root = parse(html);
const allA = root.querySelectorAll('a');
console.log(`Total <a> tags in Google Doc: ${allA.length}`);

const linksWithContext = [];
for (const a of allA) {
  const rawHref = a.getAttribute('href');
  const decoded = decodeGoogleUrl(rawHref);
  const text = a.text.trim();
  const parentText = a.parentNode ? a.parentNode.text.trim().replace(/\s+/g, ' ') : '';
  linksWithContext.push({ text, href: decoded, context: parentText.slice(0, 100) });
}

fs.writeFileSync('C:\\Users\\Vijayakumar R\\.gemini\\antigravity-ide\\brain\\0d8d2fb5-29d5-42ac-baad-1bbc0fcf861c\\scratch\\all_doc_links.json', JSON.stringify(linksWithContext, null, 2));

console.log('Saved all_doc_links.json');
linksWithContext.forEach((l, i) => {
  console.log(`[${i}] "${l.text}" -> ${l.href} | context: ${l.context}`);
});
