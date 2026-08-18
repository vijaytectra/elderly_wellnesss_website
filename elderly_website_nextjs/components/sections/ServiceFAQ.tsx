import { Container } from "@/components/Container";

export interface ServiceFAQItem {
  q: string;
  a: string;
}

interface ServiceFAQProps {
  items: readonly ServiceFAQItem[];
  /** Index of the item that should be open by default. Defaults to 4 (item 5). */
  defaultOpenIndex?: number;
}

/**
 * "FAQs — Frequently Asked Questions" accordion used at the bottom of every
 * service page. Uses native <details>/<summary> for no-JS accessibility.
 */
export function ServiceFAQ({ items, defaultOpenIndex = 4 }: ServiceFAQProps) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-3xl leading-tight sm:text-4xl">
            <span className="text-[color:var(--color-brand)]">FAQs</span> -
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((f, i) => (
            <details
              key={f.q}
              className="group rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]"
              open={i === defaultOpenIndex}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-[color:var(--color-foreground)] marker:content-['']">
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className="ml-2 text-[color:var(--color-brand)] transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
