import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const body = `# robots.txt for ${SITE_URL}/
# Elder Care Services in Chennai

User-agent: *
Allow: /

# Form-handling endpoint only — nothing here is a page worth indexing.
# /_next/ is deliberately NOT blocked: Google needs the JS and CSS to render.
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
