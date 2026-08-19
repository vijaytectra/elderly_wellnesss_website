import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    qualities: [75, 80, 85, 90, 95, 100],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  compress: true,
  async redirects() {
    return [
      {
        source: "/blogs/category/locations/chennai",
        destination: "/locations/chennai/",
        permanent: true,
      },
      {
        source: "/blogs/category/locations",
        destination: "/locations/chennai/",
        permanent: true,
      },
      {
        source: "/how-elderly-wellness-works.html",
        destination: "/how-elderly-wellness-works/",
        permanent: true,
      },
      {
        source: "/chennai.html",
        destination: "/locations/chennai/",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/contact/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
