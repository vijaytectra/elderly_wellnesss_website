import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow high-quality renders — components request quality={90} to
    // preserve the crispness of source PNG/WebP assets. Next 16 requires
    // any non-default quality to be pre-declared here.
    qualities: [75, 85, 90, 95, 100],
  },
  async redirects() {
    // Phase 5 wires up the full redirect map from docs/REDIRECT_MAP.md
    return [];
  },
};

export default nextConfig;
