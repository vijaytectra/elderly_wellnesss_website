import type { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

const MARKETING: ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/how-elderly-wellness-works/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/physiotherapy-services-for-elders/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/nursing-services-for-elders/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/geriatric-care-services-for-elders/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/assisted-living-support-services-for-elders/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/locations/chennai/", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blogs/", changeFrequency: "weekly", priority: 0.7 },
  { path: "/board-of-advisors/", changeFrequency: "yearly", priority: 0.5 },
  { path: "/investors/", changeFrequency: "yearly", priority: 0.4 },
  { path: "/elderly-wellness/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy-policy/", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-and-conditions/", changeFrequency: "yearly", priority: 0.3 },
  { path: "/refund-and-cancellation-policy/", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = MARKETING.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const blogs: MetadataRoute.Sitemap = getAllBlogs().map((b) => ({
    url: `${SITE_URL}${b.path}`,
    lastModified: new Date(b.modifiedTime || b.publishedTime),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...blogs];
}
