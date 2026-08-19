import type { NextConfig } from "next";
import { getLegacyRedirects } from "./lib/internal-urls";

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // Hobby Image Optimization returns 402 (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED).
    unoptimized: true,
    formats: ["image/webp"],
    qualities: [75, 80, 85, 90, 95, 100],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  compress: true,
  async redirects() {
    return getLegacyRedirects();
  },
};

export default nextConfig;
