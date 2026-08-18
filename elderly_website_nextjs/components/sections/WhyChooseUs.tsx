import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/Container";

export interface WhyChooseUsFeature {
  icon: string;
  title: string;
  body: string;
}

interface WhyChooseUsProps {
  /** Heading text; may include an accent span/word via ReactNode. */
  heading: ReactNode;
  features: readonly WhyChooseUsFeature[];
}

/**
 * "Why Choose Elderly Wellness for X?" grid used on all four service pages.
 * Renders the five service-differentiator cards from the source.
 */
export function WhyChooseUs({ heading, features }: WhyChooseUsProps) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-3xl leading-tight sm:text-4xl">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-start gap-4 rounded-[var(--radius-lg)] bg-white p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-highlight)]">
                <Image
                  src={f.icon}
                  alt=""
                  width={64}
                  height={64}
                  className="h-10 w-10 object-contain"
                />
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
