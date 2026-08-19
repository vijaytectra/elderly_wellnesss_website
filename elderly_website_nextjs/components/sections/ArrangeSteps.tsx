import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/Container";

export interface ArrangeStep {
  image: string;
  title: string;
  body: ReactNode;
}

interface ArrangeStepsProps {
  heading: string;
  intro: string;
  steps: readonly ArrangeStep[];
}

/**
 * "How to Arrange Home X Services for Elders?" numbered walkthrough that
 * appears on every service page. Each step is an alternating image+text row.
 */
export function ArrangeSteps({ heading, intro, steps }: ArrangeStepsProps) {
  return (
    <section className="section-y">
      <Container>
        <div className="mx-auto section-head max-w-3xl text-center">
          <h2 className="mb-3 font-[family-name:var(--font-serif)] text-3xl leading-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
            {intro}
          </p>
        </div>
        <ol className="space-y-8">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="grid grid-cols-1 gap-4 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] md:grid-cols-[56px_1fr] md:items-center md:gap-5"
            >
              <div className="flex justify-center md:justify-start">
                <Image
                  src={s.image}
                  alt=""
                  width={56}
                  height={56}
                  quality={95}
                  unoptimized
                  className="h-12 w-12 object-contain"
                  loading={i > 1 ? "lazy" : undefined}
                />
              </div>
              <div>
                <h3 className="mb-2 font-[family-name:var(--font-serif)] text-xl font-semibold sm:text-2xl">
                  {s.title}
                </h3>
                <div className="text-sm leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-base space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
                  {s.body}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
