import { Container } from "@/components/Container";

const VALUES = [
  {
    label: "Supportive",
    blurb: "A specialist beside every family, from first call to daily care.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true">
        <path
          d="M8 18c0-4 3-7 8-7s8 3 8 7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M6 22.5c2.2-1.6 4.8-2.5 10-2.5s7.8.9 10 2.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        <circle cx="20" cy="12" r="2.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Engaging",
    blurb: "Clear updates so relatives abroad stay close to what matters.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true">
        <path
          d="M7 10h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-4l-5 4v-4H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="11" cy="16" r="1.2" fill="currentColor" />
        <circle cx="16" cy="16" r="1.2" fill="currentColor" />
        <circle cx="21" cy="16" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Empathetic",
    blurb: "Care shaped around dignity, routine, and how your parent actually lives.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true">
        <path
          d="M16 26s-9-5.8-9-12.2C7 10.2 9.4 8 12.2 8c1.7 0 3.2.9 3.8 2.2C16.6 8.9 18.1 8 19.8 8 22.6 8 25 10.2 25 13.8 25 20.2 16 26 16 26Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Reliable",
    blurb: "Vetted caregivers, with a replacement promised within two hours.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true">
        <path
          d="M16 5 7 9v8.2c0 5.2 3.7 8.6 9 10.3 5.3-1.7 9-5.1 9-10.3V9l-9-4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="m12 16 2.6 2.6L20.5 13"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Appealing",
    blurb: "A calm app experience that families and elders can use without fuss.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true">
        <path
          d="M16 6.5 17.8 12h5.7l-4.6 3.4 1.8 5.6L16 17.8 11.3 21l1.8-5.6L8.5 12h5.7L16 6.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
] as const;

/**
 * Homepage / about / investors strip. Five values as a connected "care
 * constellation" rather than a plain word list.
 */
export function WhyChooseApp() {
  return (
    <section className="section-y">
      <Container>
        <div className="section-head text-center">
          <span className="inline-block rounded-full border border-[color:var(--color-border)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand)]">
            Why choose our app
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl leading-tight sm:text-4xl">
            Built on values that
            <span className="text-[color:var(--color-brand)]">
              {" "}
              put families first
            </span>
          </h2>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[8%] right-[8%] top-[42px] hidden h-px bg-[color:var(--color-brand)]/25 lg:block"
          />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((item, i) => (
              <li
                key={item.label}
                className={`relative rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-white p-5 text-center shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1 ${
                  i % 2 === 1 ? "lg:mt-8" : "lg:mt-0"
                }`}
              >
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--color-brand)]/20 text-[color:var(--color-brand)]">
                  {item.icon}
                </span>
                <p className="font-[family-name:var(--font-serif)] text-xl font-semibold">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
                  {item.blurb}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
