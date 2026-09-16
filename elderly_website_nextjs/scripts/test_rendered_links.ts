import fs from 'node:fs';
import { getBlogBySlug } from '../lib/blog';
import { parse } from 'node-html-parser';

const slug = 'calcium-for-seniors-bone-health';
const { meta, html } = getBlogBySlug(slug);

const root = parse(html);
const links = root.querySelectorAll('a');

console.log(`Rendered HTML length: ${html.length}`);
console.log(`Links found in rendered HTML (${links.length}):`);
links.forEach((a, i) => {
  console.log(`[${i}] text: "${a.text.trim()}", href: "${a.getAttribute('href')}"`);
});
