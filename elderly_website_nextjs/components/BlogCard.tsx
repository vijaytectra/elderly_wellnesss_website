import Image from "next/image";
import Link from "next/link";
import type { BlogIndexEntry } from "@/lib/blog";

interface BlogCardProps {
  blog: BlogIndexEntry;
  /** Set true for the first LCP image in a strip. Defaults to false. */
  priority?: boolean;
}

/**
 * Server component. Renders a single blog listing card:
 * featured image, title, and description. Card is fully clickable.
 * Matches the visual language of the homepage service cards.
 */
export function BlogCard({ blog, priority = false }: BlogCardProps) {
  return (
    <Link
      href={blog.path}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-card)] transition hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[color:var(--color-muted)]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 line-clamp-3 font-[family-name:var(--font-serif)] text-xl font-semibold leading-snug text-[color:var(--color-brand)]">
          {blog.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
          {blog.description}
        </p>
      </div>
    </Link>
  );
}
