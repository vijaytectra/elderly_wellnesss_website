import type { Redirect } from "next/dist/lib/load-custom-routes";
import indexData from "../content/blogs/_index.json";

const INDEX = indexData as ReadonlyArray<{ slug: string }>;

const BLOG_SLUGS = new Set(INDEX.map((e) => e.slug).filter(Boolean));

/** Paths that exist as marketing pages — never send these to `/blogs/...`. */
export const MARKETING_ROOT_SLUGS = new Set([
  "about",
  "how-elderly-wellness-works",
  "physiotherapy-services-for-elders",
  "nursing-services-for-elders",
  "geriatric-care-services-for-elders",
  "assisted-living-support-services-for-elders",
  "locations",
  "contact",
  "blogs",
  "board-of-advisors",
  "investors",
  "elderly-wellness",
  "privacy-policy",
  "terms-and-conditions",
  "refund-and-cancellation-policy",
  "site-map",
]);

const SLUG_ALIASES: Readonly<Record<string, string>> = {
  "exercise-for-seniors-over-75": "exercises-for-seniors-over-75",
  "comprehensive-guide-to-caregivers": "what-is-caregivers",
  "the-inspiring-journey-of-eldery": "journey-of-eldery",
};

const STATIC_PATH_ALIASES: Readonly<Record<string, string>> = {
  "/index": "/",
  "/index/": "/",
  "/index.html": "/",
  "/form.html": "/contact/",
  "/contact": "/contact/",
  "/company/privacy": "/privacy-policy/",
  "/company/privacy/": "/privacy-policy/",
  "/company/privacy-policy": "/privacy-policy/",
  "/company/privacy-policy.html": "/privacy-policy/",
  "/company/terms-and-conditions": "/terms-and-conditions/",
  "/company/terms-and-conditions.html": "/terms-and-conditions/",
  "/company/refund-and-cancellation-policies": "/refund-and-cancellation-policy/",
  "/company/refund-and-cancellation-policies.html": "/refund-and-cancellation-policy/",
};

function r(source: string, destination: string): Redirect {
  return { source, destination, permanent: true };
}

function stripOrigin(url: string): string {
  const m = url.match(
    /^https?:\/\/(?:www\.)?theelderlywellness\.com(?::\d+)?(\/.*)?$/i,
  );
  if (m) return m[1] || "/";
  return url;
}

function canonicalizeBlogSlug(rawSlug: string): string | null {
  const slug = SLUG_ALIASES[rawSlug] ?? rawSlug;
  if (BLOG_SLUGS.has(slug)) return slug;
  return null;
}

/** Map a site-relative or absolute-on-this-domain URL to the live Next path. */
export function rewriteInternalUrl(raw: string): string {
  if (!raw) return raw;
  const url = raw.trim();
  if (
    url.startsWith("#") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("javascript:") ||
    url.startsWith("data:")
  ) {
    return url;
  }

  let path = stripOrigin(url);
  if (/^https?:\/\//i.test(path) || path.startsWith("//")) return url;

  const hashQuery = path.match(/^([^?#]*)([?#].*)?$/);
  const pathname = (hashQuery?.[1] ?? path).replace(/\/+$/, "") || "/";
  const suffix = hashQuery?.[2] ?? "";

  if (STATIC_PATH_ALIASES[pathname] || STATIC_PATH_ALIASES[`${pathname}/`]) {
    const dest = STATIC_PATH_ALIASES[pathname] ?? STATIC_PATH_ALIASES[`${pathname}/`];
    return `${dest}${suffix}`;
  }

  if (
    /^\/(?:blogs\/)?author(?:\/|$)/i.test(pathname) ||
    /^\/blogs\/page(?:\/|$)/i.test(pathname) ||
    /^\/blogs\/(?:category|tag)(?:\/|$)/i.test(pathname) ||
    /^\/blogs\/\d+$/.test(pathname)
  ) {
    if (/^\/blogs\/category\/locations/i.test(pathname)) {
      return `/locations/chennai/${suffix}`;
    }
    return `/blogs/${suffix}`;
  }

  const blogMatch = pathname.match(
    /^\/(?:blogs\/)?([^/]+?)(?:\.html|\/index\.html)?$/i,
  );
  if (blogMatch?.[1] && blogMatch[1] !== "blogs") {
    const slug = canonicalizeBlogSlug(blogMatch[1]);
    if (slug && !MARKETING_ROOT_SLUGS.has(blogMatch[1])) {
      return `/blogs/${slug}/${suffix}`;
    }
    if (slug && pathname.startsWith("/blogs/")) {
      return `/blogs/${slug}/${suffix}`;
    }
  }

  if (pathname.endsWith(".html")) {
    const without = pathname.slice(0, -5);
    return `${without}/${suffix}`;
  }

  return path.startsWith("/") ? path : url;
}

const WP_ASSET =
  /(?:wp-includes|wp-content\/(?:plugins|themes)|\/blogs\/(?:js|css)\/|\/company\/(?:js|css)\/)/i;

/** Drop leftover WordPress plugin/theme script and stylesheet tags. */
export function stripWordpressAssetTags(html: string): string {
  return html
    .replace(
      /<script\b[^>]*\bsrc=["'][^"']*["'][^>]*>\s*<\/script>/gi,
      (tag) => (WP_ASSET.test(tag) ? "" : tag),
    )
    .replace(/<link\b[^>]*\bhref=["'][^"']*["'][^>]*\/?>/gi, (tag) =>
      WP_ASSET.test(tag) && /rel=["']stylesheet["']/i.test(tag) ? "" : tag,
    );
}

/** Rewrite href/src on HTML that Next.js injects into blog pages. */
export function rewriteHrefsInHtml(html: string): string {
  return stripWordpressAssetTags(html).replace(
    /\b(href|src)=("|')([^"']*)\2/gi,
    (_full, attr: string, quote: string, value: string) =>
      `${attr}=${quote}${rewriteInternalUrl(value)}${quote}`,
  );
}

export function getLegacyRedirects(): Redirect[] {
  const redirects: Redirect[] = [
    r("/author/:path*", "/blogs/"),
    r("/blogs/author/:path*", "/blogs/"),
    r("/blogs/page/:path*", "/blogs/"),
    r("/blogs/:page(\\d+)", "/blogs/"),
    r("/blogs/category/locations/chennai", "/locations/chennai/"),
    r("/blogs/category/locations/chennai/", "/locations/chennai/"),
    r("/blogs/category/locations", "/locations/chennai/"),
    r("/blogs/category/locations/", "/locations/chennai/"),
    r("/blogs/category/:path*", "/blogs/"),
    r("/blogs/tag/:path*", "/blogs/"),
    r("/blogs/:slug/index.html", "/blogs/:slug/"),

    r("/how-elderly-wellness-works.html", "/how-elderly-wellness-works/"),
    r("/chennai.html", "/locations/chennai/"),
    r("/contact.html", "/contact/"),
    r("/about.html", "/about/"),
    r("/board-of-advisors.html", "/board-of-advisors/"),
    r("/investors.html", "/investors/"),
    r("/form.html", "/contact/"),
    r("/index.html", "/"),
    r("/physiotherapy-services-for-elders.html", "/physiotherapy-services-for-elders/"),
    r("/nursing-services-for-elders.html", "/nursing-services-for-elders/"),
    r("/geriatric-care-services-for-elders.html", "/geriatric-care-services-for-elders/"),
    r("/assisted-living-support-services-for-elders.html", "/assisted-living-support-services-for-elders/"),

    r("/company/privacy", "/privacy-policy/"),
    r("/company/privacy/", "/privacy-policy/"),
    r("/company/privacy-policy", "/privacy-policy/"),
    r("/company/privacy-policy.html", "/privacy-policy/"),
    r("/company/terms-and-conditions", "/terms-and-conditions/"),
    r("/company/terms-and-conditions.html", "/terms-and-conditions/"),
    r("/company/refund-and-cancellation-policies", "/refund-and-cancellation-policy/"),
    r("/company/refund-and-cancellation-policies.html", "/refund-and-cancellation-policy/"),
    r("/company/terms-and-conditions/", "/terms-and-conditions/"),

    r("/exercise-for-seniors-over-75", "/blogs/exercises-for-seniors-over-75/"),
    r("/exercise-for-seniors-over-75/", "/blogs/exercises-for-seniors-over-75/"),
    r("/exercise-for-seniors-over-75.html", "/blogs/exercises-for-seniors-over-75/"),
    r("/blogs/exercise-for-seniors-over-75", "/blogs/exercises-for-seniors-over-75/"),
    r("/blogs/exercise-for-seniors-over-75/", "/blogs/exercises-for-seniors-over-75/"),

    r("/comprehensive-guide-to-caregivers", "/blogs/what-is-caregivers/"),
    r("/comprehensive-guide-to-caregivers/", "/blogs/what-is-caregivers/"),
    r("/comprehensive-guide-to-caregivers.html", "/blogs/what-is-caregivers/"),

    r("/the-inspiring-journey-of-eldery", "/blogs/journey-of-eldery/"),
    r("/the-inspiring-journey-of-eldery.html", "/blogs/journey-of-eldery/"),
  ];

  for (const entry of INDEX) {
    const slug = entry.slug;
    if (!slug || MARKETING_ROOT_SLUGS.has(slug)) continue;
    const dest = `/blogs/${slug}/`;
    redirects.push(r(`/${slug}`, dest), r(`/${slug}/`, dest), r(`/${slug}.html`, dest));
  }

  return redirects;
}
