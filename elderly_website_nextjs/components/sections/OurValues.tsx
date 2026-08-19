import Image from "next/image";
import { Container } from "@/components/Container";

interface Value {
  title: string;
  body: string;
  image: string;
}

const VALUES: readonly Value[] = [
  {
    title: "Skilled Team",
    image: "/images/ourvalue_1.png",
    body:
      "The Elderly app boasts a skilled team dedicated to enhancing elder care through expertise and innovation.",
  },
  {
    title: "Creative Thinking",
    image: "/images/ourvalue_2.png",
    body:
      "Inspired by empathy, Elderly fosters creative thinking to revolutionize elder care.",
  },
  {
    title: "Growth Support",
    image: "/images/ourvalue_3.png",
    body:
      "The Elderly app offers tailored growth support, enhancing the elder-caregiver experience with personalized resources and guidance.",
  },
];

/**
 * "Our values driven by relations" three-up card grid. Same content across
 * all four service pages.
 */
export function OurValues() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[color:var(--color-highlight)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand)]">
            Our values
          </span>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl leading-tight sm:text-4xl">
            <span className="text-[color:var(--color-brand)]">Our values</span>{" "}
            driven by relations
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] bg-white p-8 text-center shadow-[var(--shadow-card)]"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[color:var(--color-highlight)]">
                <Image quality={90}
                  src={v.image}
                  alt={v.title}
                  width={96}
                  height={96}
                  className="h-16 w-16 object-contain"
                />
              </div>
              <h3 className="font-[family-name:var(--font-serif)] text-xl font-semibold">
                {v.title}
              </h3>
              <p className="text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
