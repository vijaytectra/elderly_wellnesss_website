import type { MetadataRoute } from "next";
import { getAllBlogs, type BlogIndexEntry } from "@/lib/blog";

export type SitemapChangeFrequency =
  MetadataRoute.Sitemap[number]["changeFrequency"];

export interface SitemapPage {
  path: string;
  title: string;
  group: "Pages" | "Services" | "Company" | "Legal";
  changeFrequency: SitemapChangeFrequency;
  priority: number;
  /**
   * Date this page's content or metadata last genuinely changed (YYYY-MM-DD).
   *
   * MAINTAIN THIS BY HAND when you edit a page. It must NOT be derived from
   * the build clock: stamping `new Date()` tells search engines every page
   * changed on every deploy, and once a site's lastmod is shown to be
   * unreliable, crawlers stop trusting it. A slightly stale honest date is
   * worth more than a fresh dishonest one.
   */
  lastModified: string;
}

export const MARKETING_SITEMAP: readonly SitemapPage[] = [
  { path: "/", title: "Home", group: "Pages", changeFrequency: "weekly", priority: 1, lastModified: "2026-09-08" },
  { path: "/about/", title: "About Us", group: "Pages", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-09-08" },
  { path: "/how-elderly-wellness-works/", title: "How It Works", group: "Pages", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-09-08" },
  { path: "/locations/chennai/", title: "Serving Chennai", group: "Pages", changeFrequency: "weekly", priority: 0.8, lastModified: "2026-09-08" },
  { path: "/contact/", title: "Contact / Book Care", group: "Pages", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-09-08" },
  { path: "/blogs/", title: "Blog", group: "Pages", changeFrequency: "weekly", priority: 0.7, lastModified: "2026-09-08" },
  { path: "/site-map/", title: "Sitemap", group: "Pages", changeFrequency: "weekly", priority: 0.3, lastModified: "2026-09-08" },
  {
    path: "/physiotherapy-rehabilitation-at-home/",
    title: "Physiotherapy & Rehabilitation",
    group: "Services",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: "2026-09-21",
  },
  {
    path: "/critical-skilled-nursing-at-home/",
    title: "Critical & Skilled Nursing",
    group: "Services",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: "2026-09-21",
  },
  {
    path: "/post-operative-discharge-care-at-home/",
    title: "Post-Operative & Discharge Care",
    group: "Services",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: "2026-09-21",
  },
  {
    path: "/elderly-care-at-home/",
    title: "Elderly Care at Home",
    group: "Services",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: "2026-09-21",
  },
  {
    path: "/elderly-wellness/",
    title: "Elderly Wellness",
    group: "Company",
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: "2026-09-08",
  },
  {
    path: "/board-of-advisors/",
    title: "Board of Advisors",
    group: "Company",
    changeFrequency: "yearly",
    priority: 0.5,
    lastModified: "2026-09-08",
  },
  {
    path: "/investors/",
    title: "Investors",
    group: "Company",
    changeFrequency: "yearly",
    priority: 0.4,
    lastModified: "2026-09-08",
  },
  {
    path: "/privacy-policy/",
    title: "Privacy Policy",
    group: "Legal",
    changeFrequency: "yearly",
    priority: 0.3,
    lastModified: "2026-09-08",
  },
  {
    path: "/terms-and-conditions/",
    title: "Terms & Conditions",
    group: "Legal",
    changeFrequency: "yearly",
    priority: 0.3,
    lastModified: "2026-09-08",
  },
  {
    path: "/refund-and-cancellation-policy/",
    title: "Refund & Cancellation Policy",
    group: "Legal",
    changeFrequency: "yearly",
    priority: 0.3,
    lastModified: "2026-09-08",
  },
];

export function getSitemapBlogs(): readonly BlogIndexEntry[] {
  return getAllBlogs();
}
