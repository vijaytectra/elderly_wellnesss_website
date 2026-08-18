import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";

interface ServiceHeroProps {
  image: string;
  imageAlt: string;
  /** Plain lead text (renders as H1 first line). */
  headingLead: string;
  /** Accent text (renders inside the H1 as the accent span). */
  headingAccent: string;
  /** Sub-heading rendered under the H1. */
  subheading: string;
  /** Paragraphs of intro copy under the sub-heading. */
  paragraphs: readonly React.ReactNode[];
}

/**
 * Hero used by the four service pages. Two-column layout on md+ with
 * lead image on the left and heading + CTAs on the right.
 */
export function ServiceHero({
  image,
  imageAlt,
  headingLead,
  headingAccent,
  subheading,
  paragraphs,
}: ServiceHeroProps) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <div>
            <Image
              src={image}
              alt={imageAlt}
              width={720}
              height={720}
              priority
              className="mx-auto w-full max-w-[560px]"
            />
          </div>
          <div>
            <h1 className="mb-3 font-[family-name:var(--font-serif)] text-3xl leading-tight sm:text-4xl md:text-5xl">
              {headingLead}{" "}
              <span className="block text-[color:var(--color-brand)]">
                {headingAccent}
              </span>
            </h1>
            <h2 className="mb-4 text-lg font-semibold text-[color:var(--color-muted-foreground)] sm:text-xl">
              {subheading}
            </h2>
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="mb-3 text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg"
              >
                {p}
              </p>
            ))}
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="#download-btn"
                className="inline-flex items-center rounded-full bg-[color:var(--color-brand)] px-6 py-3 text-sm font-semibold text-[color:var(--color-brand-foreground)] shadow-[var(--shadow-card)] transition hover:bg-[color:var(--color-brand-dark)]"
              >
                Download the App
              </Link>
              <a
                href="https://wa.me/919944890577"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center rounded-full border border-[color:var(--color-brand)] bg-white px-6 py-3 text-sm font-semibold text-[color:var(--color-brand)] shadow-[var(--shadow-card)] transition hover:bg-[color:var(--color-highlight)]"
              >
                Book An Appointment
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
