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
    <section className="section-y">
      <Container>
        <SectionTitle
          badge="Latest updates"
          heading={
            <>
              Our latest{" "}
              <span className="text-[color:var(--color-brand)]">blog post</span>
            </>
          }
        />
        <div className="mt-5 grid grid-cols-1 gap-6 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((b) => (
            <BlogCard key={b.slug} blog={b} />
          ))}
        </div>
        <div className="mt-6 text-center sm:mt-8">
          <Link
            href="/blogs/"
            className="btn-brand inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold shadow-[var(--shadow-card)]"
          >
            Read our blog
          </Link>
        </div>
      </Container>
    </section>
  );
}
