import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MARKETING_SITEMAP, getSitemapBlogs } from "@/lib/sitemap";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sitemap | Elderly Wellness",
  description:
    "Browse every Elderly Wellness page and blog post — services, how it works, locations, and elder-care guides for Chennai families.",
  path: "/site-map/",
});

const GROUPS = ["Pages", "Services", "Company", "Legal"] as const;

export default function SiteMapPage() {
  const blogs = getSitemapBlogs();

  return (
    <section className="section-y">
      <Container>
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <h1 className="font-[family-name:var(--font-serif)] text-3xl text-[color:var(--color-foreground)] sm:text-4xl">
            Sitemap
          </h1>
          <p className="mt-3 text-[color:var(--color-muted-foreground)]">
            All public pages and articles on Elderly Wellness. Search engines
            can also read the XML feed at{" "}
            <Link href="/sitemap.xml" className="font-semibold text-[color:var(--color-brand)]">
              /sitemap.xml
            </Link>
            .
          </p>
        </header>

        <div className="grid gap-10 md:grid-cols-2">
          {GROUPS.map((group) => {
            const items = MARKETING_SITEMAP.filter((p) => p.group === group);
            return (
              <div key={group}>
                <h2 className="mb-3 font-[family-name:var(--font-serif)] text-2xl text-[color:var(--color-foreground)]">
                  {group}
                </h2>
                <ul className="space-y-2 text-sm">
                  {items.map((item) => (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className="text-[color:var(--color-foreground)] underline-offset-2 hover:text-[color:var(--color-brand)] hover:underline"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <h2 className="mb-4 font-[family-name:var(--font-serif)] text-2xl text-[color:var(--color-foreground)]">
            Blog posts
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {blogs.map((blog) => (
              <li key={blog.slug}>
                <Link
                  href={blog.path}
                  className="text-sm text-[color:var(--color-foreground)] underline-offset-2 hover:text-[color:var(--color-brand)] hover:underline"
                >
                  {blog.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
