const fs = require('fs');

async function run() {
  const html = fs.readFileSync('/Users/akashsmac/.gemini/antigravity-ide/brain/4b0d46d1-2104-4e75-8dc1-6543d52ab72a/.system_generated/steps/5/content.md', 'utf-8');
  
  // Try to find the h2 titles and prices.
  const regex = /<h2[^>]*>(.*?)<\/h2>[\s\S]*?<p[^>]*>(.*?)<\/p>[\s\S]*?(?:₹([\d,]+\.\d{2})|Enquire Now)/g;
  
  let match;
  while ((match = regex.exec(html)) !== null) {
      console.log(`Service: ${match[1].trim()}`);
      console.log(`Desc: ${match[2].trim()}`);
      if (match[3]) {
          console.log(`Price: ₹${match[3]}`);
      } else {
          console.log(`Price: Enquire Now`);
      }
      console.log('---');
  }
}
run();
