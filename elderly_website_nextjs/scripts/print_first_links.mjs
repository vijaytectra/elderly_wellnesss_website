import fs from 'node:fs';

const links = JSON.parse(fs.readFileSync('C:\\Users\\Vijayakumar R\\.gemini\\antigravity-ide\\brain\\0d8d2fb5-29d5-42ac-baad-1bbc0fcf861c\\scratch\\all_doc_links.json', 'utf8'));

console.log('First 10 links in doc:');
links.slice(0, 10).forEach((l, i) => {
  console.log(`[${i}] "${l.text}" -> ${l.href}`);
});
