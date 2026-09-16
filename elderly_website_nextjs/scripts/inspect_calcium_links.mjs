import http from 'node:http';

http.get('http://localhost:3000/blogs/calcium-for-seniors-bone-health/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const aMatches = [...data.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
    console.log(`Total <a> tags: ${aMatches.length}`);
    const articleMatch = data.match(/<article[\s\S]*?<\/article>/);
    if (articleMatch) {
      const articleLinks = [...articleMatch[0].matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
      console.log(`Article links (${articleLinks.length}):`);
      articleLinks.forEach(m => console.log(`  href: ${m[1]} | text: "${m[2].trim()}"`));
    }
  });
});
