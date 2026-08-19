import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/tmp/",
          "/wp-admin/",
          "/wp-includes/",
          "/wp-content/",
          "/company/js/",
          "/company/css/",
          "/blogs/js/",
          "/blogs/css/",
        ],
      },
    ],
    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
