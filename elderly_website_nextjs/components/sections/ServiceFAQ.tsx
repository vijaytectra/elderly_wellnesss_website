"use client";

import { useState } from "react";
import { Container } from "@/components/Container";

export interface ServiceFAQItem {
  q: string;
  a: string;
}

interface ServiceFAQProps {
  items: readonly ServiceFAQItem[];
  /** Index of the item that should be open by default. Defaults to none. */
  defaultOpenIndex?: number;
}

function AccordionRow({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-white shadow-[var(--shadow-card)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-[color:var(--color-foreground)]"
      >
        <span>{q}</span>
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-brand)] text-lg leading-none text-[color:var(--color-brand)]"
        >
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Accordion used on service pages and About. One panel at a time, with a
 * timed grid-row animation so open/close does not snap.
 */
export function ServiceFAQ({ items, defaultOpenIndex }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex ?? null,
  );

  return (
    <section className="section-y">
      <Container>
        <div className="mx-auto section-head max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-3xl leading-tight sm:text-4xl">
            <span className="text-[color:var(--color-brand)]">FAQs</span>
            {" - Frequently Asked Questions"}
          </h2>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((f, i) => (
            <AccordionRow
              key={f.q}
              q={f.q}
              a={f.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
