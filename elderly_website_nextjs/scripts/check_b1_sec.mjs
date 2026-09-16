import fs from 'node:fs';

const b1 = JSON.parse(fs.readFileSync('C:\\Users\\Vijayakumar R\\.gemini\\antigravity-ide\\brain\\0d8d2fb5-29d5-42ac-baad-1bbc0fcf861c\\scratch\\b1_raw.json', 'utf8'));

for (let i = 30; i < 45; i++) {
  const item = b1.find(x => x.idx === i);
  if (item) {
    console.log(`\n=== [${i}] <${item.tag}> ===`);
    console.log(item.html);
  }
}
