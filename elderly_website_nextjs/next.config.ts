import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Phase 5 wires up the full redirect map from docs/REDIRECT_MAP.md
    return [];
  },
};

export default nextConfig;
