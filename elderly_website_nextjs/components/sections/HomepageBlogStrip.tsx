import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { getAllBlogs } from "@/lib/blog";

/**
 * Homepage strip showing the 3 newest blog posts + a "Read our blog" CTA.
 * Server component — reads `_index.json` at build time.
 */
export function HomepageBlogStrip() {
  const latest = getAllBlogs().slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionTitle
          badge="Latest updates"
          heading={
            <>
              Our latest{" "}
              <span className="text-[color:var(--color-brand)]">blog posts</span>
            </>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((b, i) => (
            <BlogCard key={b.slug} blog={b} priority={i === 0} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/blogs/"
            className="inline-flex items-center rounded-full bg-[color:var(--color-brand)] px-6 py-3 text-sm font-semibold text-[color:var(--color-brand-foreground)] shadow-[var(--shadow-card)] transition hover:bg-[color:var(--color-brand-dark)]"
          >
            Read our blog
          </Link>
        </div>
      </Container>
    </section>
  );
}
