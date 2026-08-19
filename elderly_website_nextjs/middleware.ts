import { NextResponse, type NextRequest } from "next/server";

/**
 * Legacy WordPress CSS/JS (Chaty, CF7, GeneratePress, jQuery, Rank Math TOC)
 * is not part of the Next.js site. Return 410 so crawlers stop treating
 * those plugin files as broken resources on blog pages.
 */
export function middleware(_request: NextRequest) {
  return new NextResponse(null, {
    status: 410,
    headers: { "X-Robots-Tag": "noindex" },
  });
}

export const config = {
  matcher: [
    "/wp-includes/:path*",
    "/wp-content/:path*",
    "/wp-admin/:path*",
    "/company/js/:path*",
    "/company/css/:path*",
    "/blogs/js/:path*",
    "/blogs/css/:path*",
  ],
};
