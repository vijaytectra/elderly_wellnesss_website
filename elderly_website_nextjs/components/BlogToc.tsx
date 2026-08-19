"use client";

import { useEffect, useState } from "react";
import type { BlogTocItem } from "@/lib/blog";

export function BlogToc({ items }: { items: readonly BlogTocItem[] }) {
  const [active, setActive] = useState(items[0]?.href ?? "");

  useEffect(() => {
    if (items.length === 0) return;
    const nodes = items
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el != null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-120px 0px -55% 0px", threshold: [0, 0.2, 0.6, 1] },
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="In this article" className="ew-blog-toc">
      <p className="ew-blog-toc__title">In This Article</p>
      <ol className="ew-blog-toc__list">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={active === item.href ? "is-active" : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
