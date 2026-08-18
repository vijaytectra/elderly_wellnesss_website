import type { ReactNode } from "react";

interface SectionTitleProps {
  /** Small pill above the heading. e.g. "About us" */
  badge?: string;
  /** Main heading content (can include <span> for the accent word/line). */
  heading: ReactNode;
  /** Optional paragraph beneath the heading. */
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

/**
 * Reusable heading block seen on About, Investors, Board of Advisors,
 * Elderly Wellness, and Home. Mirrors the legacy `.section_title` markup.
 */
export function SectionTitle({
  badge,
  heading,
  description,
  align = "center",
  className = "",
}: SectionTitleProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignment} ${className}`.trim()}>
      {badge ? (
        <span className="mb-4 inline-block rounded-full bg-[color:var(--color-highlight)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand)]">
          {badge}
        </span>
      ) : null}
      <h2 className="font-[family-name:var(--font-serif)] text-3xl leading-tight text-[color:var(--color-foreground)] sm:text-4xl md:text-5xl">
        {heading}
      </h2>
      {description ? (
        <div className="mt-4 text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
          {description}
        </div>
      ) : null}
    </div>
  );
}
