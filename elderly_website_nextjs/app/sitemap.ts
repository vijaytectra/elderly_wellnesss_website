import type { MetadataRoute } from "next";
import { MARKETING_SITEMAP, getSitemapBlogs } from "@/lib/sitemap";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = MARKETING_SITEMAP.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const blogs: MetadataRoute.Sitemap = getSitemapBlogs().map((b) => ({
    url: `${SITE_URL}${b.path}`,
    lastModified: new Date(b.modifiedTime || b.publishedTime),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...blogs];
}
