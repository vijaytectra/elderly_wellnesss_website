import type { ReactNode } from "react";
import { Container } from "@/components/Container";

export interface WhyChooseUsFeature {
  title: string;
  body: string;
  /** Kept for callers; cards use high-contrast SVGs instead of tiny PNGs. */
  icon?: string;
}

interface WhyChooseUsProps {
  heading: ReactNode;
  features: readonly WhyChooseUsFeature[];
}

function FeatureGlyph({ title }: { title: string }) {
  const className = "h-8 w-8";
  if (title.includes("Discovery")) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
        <circle cx="21" cy="21" r="10" stroke="currentColor" strokeWidth="2.6" />
        <path d="m29 29 8 8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M17 21h8M21 17v8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (title.includes("Affordable") || title.includes("Transparent")) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
        <rect x="10" y="8" width="28" height="32" rx="4" stroke="currentColor" strokeWidth="2.6" />
        <path d="M18 18h12M18 24h12M18 30h7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (title.includes("Reliable")) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
        <path
          d="M24 8 10 14v12c0 8.2 5.6 13.6 14 16.2 8.4-2.6 14-8 14-16.2V14L24 8Z"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <path d="m18 24 4.2 4.2L31 19.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (title.includes("Quality")) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
        <path
          d="M24 8 28.5 17.2 38.5 18.6 31.2 25.6 33 35.5 24 30.8 15 35.5 16.8 25.6 9.5 18.6 19.5 17.2 24 8Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2.6" />
      <path d="M24 16v8l5 3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhyChooseUs({ heading, features }: WhyChooseUsProps) {
  return (
    <section className="section-y">
      <Container>
        <div className="mx-auto section-head max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-3xl leading-tight sm:text-4xl">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[color:var(--color-brand)] text-white">
                <FeatureGlyph title={f.title} />
              </div>
              <h3 className="font-[family-name:var(--font-serif)] text-xl font-semibold">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
