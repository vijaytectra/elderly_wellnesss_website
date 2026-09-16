import http from 'node:http';

http.get('http://localhost:3000/blogs/benefits-of-professional-geriatric-care-services/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    // Find meta keywords
    const kwMatch = data.match(/<meta[^>]*name="keywords"[^>]*>/i);
    console.log('Meta keywords tag in HTML:', kwMatch ? kwMatch[0] : 'NOT FOUND');

    // Find all links in the HTML
    const aMatches = [...data.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
    console.log(`Total <a> tags in rendered HTML: ${aMatches.length}`);
    const internalLinks = aMatches.filter(m => m[1].startsWith('/') || m[1].includes('theelderlywellness.com'));
    console.log(`Internal links: ${internalLinks.length}`);
    internalLinks.forEach(m => {
      console.log(`  - href: ${m[1]} | text: "${m[2].replace(/<[^>]*>/g, '').trim()}"`);
    });
  });
}).on('error', err => console.error(err));
