import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { getChennaiLocationBlogs } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Chennai",
  description:
    "Elderly care services across Chennai — physiotherapy, nursing, geriatric care, and assisted living support in neighbourhoods including Adyar, Ambattur, Alwarpet, and more.",
  path: "/locations/chennai/",
});

export default function ChennaiLocationsPage() {
  const posts = getChennaiLocationBlogs();

  const collectionSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/locations/chennai/#webpage`,
    url: `${SITE_URL}/locations/chennai/`,
    name: `Chennai | ${SITE_NAME}`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "en-US",
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
        name: "Chennai",
        item: `${SITE_URL}/locations/chennai/`,
      },
    ],
  };

  return (
    <div>
      <JsonLd id="chennai-collection-schema" data={collectionSchema} />
      <JsonLd id="chennai-breadcrumb-schema" data={breadcrumbSchema} />

      <section className="pt-6 sm:pt-10">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Locations" },
              { label: "Chennai" },
            ]}
          />
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <SectionTitle
            badge="Locations"
            heading={
              <>
                Elderly care in{" "}
                <span className="text-[color:var(--color-brand)]">Chennai</span>
              </>
            }
            description="Home physiotherapy, nursing, geriatric care, and assisted living support across Chennai neighbourhoods. Choose your area to see how we care for families nearby."
          />
        </Container>
      </section>

      <section className="pb-4 sm:pb-6">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <BlogCard key={p.slug} blog={p} priority={i < 3} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
