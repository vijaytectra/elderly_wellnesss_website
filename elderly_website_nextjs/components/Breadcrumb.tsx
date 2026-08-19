import Link from "next/link";
import type { ReactNode } from "react";

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Href — omitted for the trailing (current) item */
  href?: string;
}

interface BreadcrumbProps {
  items: readonly BreadcrumbItem[];
  className?: string;
}

/**
 * Server-rendered breadcrumb trail. Uses a chevron separator drawn in text
 * so we do not depend on any icon font glyph. The final item is rendered as
 * plain text (represents the current page).
 */
export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const parts: ReactNode[] = [];
  items.forEach((item, i) => {
    const isLast = i === items.length - 1;
    parts.push(
      <li key={`item-${i}`} className={isLast ? "text-[color:var(--color-foreground)]" : ""}>
        {item.href && !isLast ? (
          <Link
            href={item.href}
            className="text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-brand)]"
          >
            {item.label}
          </Link>
        ) : (
          <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
        )}
      </li>,
    );
    if (!isLast) {
      parts.push(
        <li key={`sep-${i}`} aria-hidden="true" className="text-[color:var(--color-muted-foreground)]">
          /
        </li>,
      );
    }
  });

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm">{parts}</ol>
    </nav>
  );
}
