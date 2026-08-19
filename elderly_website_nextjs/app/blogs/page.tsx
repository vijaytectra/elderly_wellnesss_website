import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { getAllBlogs } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Blog | Elderly Wellness",
  description:
    "Guides, checklists, and expert advice on elderly care from Elderly Wellness — home safety, health, nutrition, and caregiving in Chennai.",
  path: "/blogs/",
});

export default function BlogsIndexPage() {
  const blogs = getAllBlogs();

  const collectionSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/blogs/#collectionpage`,
    url: `${SITE_URL}/blogs/`,
    name: `Blog | ${SITE_NAME}`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "en-US",
    hasPart: blogs.map((b) => ({
      "@type": "BlogPosting",
      headline: b.title,
      url: `${SITE_URL}${b.path}`,
      datePublished: b.publishedTime,
      dateModified: b.modifiedTime,
      image: b.image.startsWith("http") ? b.image : `${SITE_URL}${b.image}`,
    })),
  };

  const breadcrumbSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blogs/`,
      },
    ],
  };

  return (
    <div>
      <JsonLd id="blog-collection-schema" data={collectionSchema} />
      <JsonLd id="blog-breadcrumb-schema" data={breadcrumbSchema} />

      <section className="py-12 sm:py-16">
        <Container>
          <SectionTitle
            badge="Blog"
            heading={
              <>
                Insights and guides for{" "}
                <span className="text-[color:var(--color-brand)]">elder care</span>
              </>
            }
            description="Room-by-room home safety checklists, symptom guides, nutrition and caregiving essentials — written by our Elderly Wellness team in Chennai."
          />
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b, i) => (
              <BlogCard key={b.slug} blog={b} priority={i < 3} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
