import type { MetadataRoute } from "next";
import { MARKETING_SITEMAP, getSitemapBlogs } from "@/lib/sitemap";
import { SITE_URL } from "@/lib/site";

/**
 * XML sitemap.
 *
 * `lastModified` is never taken from the build clock. Marketing pages carry a
 * hand-maintained date from lib/sitemap.ts; blog posts use the real
 * published/modified timestamps extracted from the source articles. A sitemap
 * that reports every URL as changed on every deploy trains crawlers to ignore
 * its lastmod entirely.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = MARKETING_SITEMAP.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: p.lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // llms.txt is generated from the marketing pages, so it is only as fresh as
  // the most recently updated one.
  const llmsLastModified = MARKETING_SITEMAP.reduce<string>(
    (latest, p) => (p.lastModified > latest ? p.lastModified : latest),
    "",
  );

  const llms: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: llmsLastModified,
      changeFrequency: "weekly",
      priority: 0.3,
    },
  ];

  const blogs: MetadataRoute.Sitemap = getSitemapBlogs().map((b) => ({
    url: `${SITE_URL}${b.path}`,
    lastModified: (b.modifiedTime || b.publishedTime).slice(0, 10),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...llms, ...blogs];
}
