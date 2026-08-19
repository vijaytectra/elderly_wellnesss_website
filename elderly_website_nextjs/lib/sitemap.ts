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
}

export const MARKETING_SITEMAP: readonly SitemapPage[] = [
  { path: "/", title: "Home", group: "Pages", changeFrequency: "weekly", priority: 1 },
  { path: "/about/", title: "About Us", group: "Pages", changeFrequency: "monthly", priority: 0.8 },
  { path: "/how-elderly-wellness-works/", title: "How It Works", group: "Pages", changeFrequency: "monthly", priority: 0.9 },
  { path: "/locations/chennai/", title: "Serving Chennai", group: "Pages", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact/", title: "Contact / Book Care", group: "Pages", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blogs/", title: "Blog", group: "Pages", changeFrequency: "weekly", priority: 0.7 },
  { path: "/site-map/", title: "Sitemap", group: "Pages", changeFrequency: "weekly", priority: 0.3 },
  {
    path: "/physiotherapy-services-for-elders/",
    title: "Physiotherapy",
    group: "Services",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/nursing-services-for-elders/",
    title: "Nursing Services",
    group: "Services",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/geriatric-care-services-for-elders/",
    title: "Geriatric Care",
    group: "Services",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/assisted-living-support-services-for-elders/",
    title: "Assisted Living Support",
    group: "Services",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/elderly-wellness/",
    title: "Elderly Wellness",
    group: "Company",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/board-of-advisors/",
    title: "Board of Advisors",
    group: "Company",
    changeFrequency: "yearly",
    priority: 0.5,
  },
  {
    path: "/investors/",
    title: "Investors",
    group: "Company",
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    path: "/privacy-policy/",
    title: "Privacy Policy",
    group: "Legal",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms-and-conditions/",
    title: "Terms & Conditions",
    group: "Legal",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/refund-and-cancellation-policy/",
    title: "Refund & Cancellation Policy",
    group: "Legal",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export function getSitemapBlogs(): readonly BlogIndexEntry[] {
  return getAllBlogs();
}
