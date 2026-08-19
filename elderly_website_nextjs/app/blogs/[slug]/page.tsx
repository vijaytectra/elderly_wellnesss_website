import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import { BlogToc } from "@/components/BlogToc";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import {
  getAllSlugs,
  getBlogBySlug,
  getBlogIndexEntry,
  getBlogTocItems,
  getRelatedBlogs,
  splitBlogToc,
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
  const { tocHtml, bodyHtml } = splitBlogToc(html);
  const tocItems = getBlogTocItems(tocHtml);
  const heroImage = entry.image || meta.ogImage;
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

      <section className="pt-6 sm:pt-8">
        <Container>
          <Link
            href="/blogs/"
            className="mb-5 inline-flex text-sm font-semibold text-[color:var(--color-brand)]"
          >
            ← Back to Blogs
          </Link>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blogs/" },
              { label: meta.title },
            ]}
          />
        </Container>
      </section>

      <section className="pb-10 sm:pb-12">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0 lg:order-1">
              <header className="max-w-3xl">
                <h1 className="mb-3 font-[family-name:var(--font-serif)] text-3xl leading-tight text-[color:var(--color-foreground)] sm:text-4xl md:text-[2.75rem]">
                  {meta.title}
                </h1>
                <p className="text-sm text-[color:var(--color-muted-foreground)]">
                  <span>{meta.author.name}</span>
                  <span aria-hidden="true"> · </span>
                  <time dateTime={meta.publishedTime}>
                    {formatDate(meta.publishedTime)}
                  </time>
                  <span aria-hidden="true"> · </span>
                  <span>{meta.readingMinutes} min read</span>
                </p>
              </header>
              {heroImage ? (
                <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-lg)] bg-[color:var(--color-muted)]">
                  <Image
                    src={heroImage}
                    alt={meta.title}
                    fill
                    priority
                    quality={80}
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <article
                className="prose prose-lg mt-8 max-w-none prose-headings:font-[family-name:var(--font-sans)] prose-h1:font-[family-name:var(--font-serif)] prose-h2:font-[family-name:var(--font-serif)] prose-a:text-[color:var(--color-brand)] prose-img:rounded-[var(--radius-md)]"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
                suppressHydrationWarning
              />
            </div>

            {tocItems.length > 0 ? (
              <aside className="order-first lg:sticky lg:top-24 lg:order-2 lg:self-start">
                <BlogToc items={tocItems} />
              </aside>
            ) : null}
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-[color:var(--color-border)] section-y">
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
