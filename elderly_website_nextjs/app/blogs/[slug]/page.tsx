import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import {
  getAllSlugs,
  getBlogBySlug,
  getBlogIndexEntry,
  getRelatedBlogs,
} from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

interface BlogPageParams {
  slug: string;
}

interface BlogPageProps {
  params: Promise<BlogPageParams>;
}

export function generateStaticParams(): BlogPageParams[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getBlogIndexEntry(slug);
  if (!entry) return {};
  const { meta } = getBlogBySlug(slug);
  const base = buildMetadata({
    title: meta.title,
    description: meta.description,
    path: entry.path,
    image: meta.ogImage,
    type: "article",
  });
  return {
    ...base,
    keywords: meta.keywords,
    authors: [{ name: meta.author.name }],
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: meta.publishedTime,
      modifiedTime: meta.modifiedTime,
      authors: [meta.author.name],
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogArticlePage({ params }: BlogPageProps) {
  const { slug } = await params;
  const entry = getBlogIndexEntry(slug);
  if (!entry) notFound();
  const { meta, html } = getBlogBySlug(slug);
  const related = getRelatedBlogs(slug, 3);

  const canonical = meta.canonical;
  const absoluteImage = meta.ogImage.startsWith("http")
    ? meta.ogImage
    : `${SITE_URL}${meta.ogImage}`;

  const blogPostingSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#blogposting`,
    headline: meta.title,
    description: meta.description,
    datePublished: meta.publishedTime,
    dateModified: meta.modifiedTime,
    inLanguage: "en-US",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
    image: absoluteImage,
    author: { "@type": "Organization", name: meta.author.name },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
    wordCount: meta.wordCount,
  };
  if (meta.keywords) blogPostingSchema.keywords = meta.keywords;

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
      {
        "@type": "ListItem",
        position: 3,
        name: meta.title,
        item: canonical,
      },
    ],
  };

  return (
    <div>
      <JsonLd id={`blog-${slug}-schema`} data={blogPostingSchema} />
      <JsonLd id={`blog-${slug}-breadcrumb`} data={breadcrumbSchema} />

      <section className="pt-6 sm:pt-10">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blogs/" },
              { label: meta.title },
            ]}
          />
        </Container>
      </section>

      <section className="py-8 sm:py-12">
        <Container>
          <header className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-[family-name:var(--font-serif)] text-3xl leading-tight text-[color:var(--color-foreground)] sm:text-4xl md:text-5xl">
              {meta.title}
            </h1>
            <p className="text-sm text-[color:var(--color-muted-foreground)]">
              <span>By {meta.author.name}</span>
              <span aria-hidden="true"> · </span>
              <time dateTime={meta.publishedTime}>
                {formatDate(meta.publishedTime)}
              </time>
              <span aria-hidden="true"> · </span>
              <span>{meta.readingMinutes} min read</span>
            </p>
          </header>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <article
            className="prose prose-lg mx-auto max-w-3xl prose-headings:font-[family-name:var(--font-serif)] prose-a:text-[color:var(--color-brand)] prose-img:rounded-[var(--radius-md)]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-[color:var(--color-border)] py-12 sm:py-16">
          <Container>
            <h2 className="mb-8 text-center font-[family-name:var(--font-serif)] text-2xl text-[color:var(--color-foreground)] sm:text-3xl">
              Related reads
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <BlogCard key={r.slug} blog={r} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </div>
  );
}
