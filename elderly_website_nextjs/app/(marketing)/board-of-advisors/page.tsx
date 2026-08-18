import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Meet the Experts Behind Elderly Wellness: Our Board of Advisors",
  description:
    "Get to know the expert team guiding Elderly Wellness. Learn about our advisory board's expertise in healthcare, elderly support, and wellness.",
  path: "/board-of-advisors/",
});

interface Advisor {
  name: string;
  role: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  linkedin?: string;
}

const advisors: readonly Advisor[] = [
  {
    name: "Suresh Samuel",
    role: "Executive Leadership, Higher Education Management, Healthcare Services & Digital Solutions",
    image: "/images/suresh.jpg",
    alt: "Suresh Samuel",
    width: 640,
    height: 640,
    linkedin: "https://www.linkedin.com/in/suresh-samuel-b853031/",
  },
  {
    name: "Dr Jothi Clara Micheal",
    role: "Director of Nursing, IHH Healthcare India",
    image: "/images/jothi.jpeg",
    alt: "Dr Jothi Clara Micheal",
    width: 640,
    height: 640,
    linkedin: "https://in.linkedin.com/in/jothi-clara-michael-82154231",
  },
  {
    name: "Harish",
    role: "Advisor - GTM",
    image: "/images/Shri-harish.png",
    alt: "Harish",
    width: 640,
    height: 640,
  },
  {
    name: "Rajaram",
    role: "Advisor - Business Operations & Scaling",
    image: "/images/Rajaraman-Sundaresan.png",
    alt: "Rajaram",
    width: 640,
    height: 640,
  },
  {
    name: "Deepa",
    role: "Head of Quality & Services",
    image: "/images/Deepa.png",
    alt: "Deepa",
    width: 640,
    height: 640,
  },
];

export default function BoardOfAdvisorsPage() {
  return (
    <div>
      <section className="py-12 sm:py-16">
        <Container>
          <SectionTitle
            badge="Board of Advisors"
            heading={
              <>
                Introducing the Esteemed Board of Advisors{" "}
                <br />
                <span className="text-[color:var(--color-brand)]">
                  Steering Elderly&apos;s Vision of Empathetic Elder Care
                </span>
              </>
            }
          />
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {advisors.map((a, idx) => (
              <div
                key={a.name}
                className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-card)] transition hover:shadow-lg"
              >
                <div className="relative aspect-square w-full bg-[color:var(--color-muted)]">
                  <Image
                    src={a.image}
                    alt={a.alt}
                    width={a.width}
                    height={a.height}
                    className="h-full w-full object-cover"
                    priority={idx === 0}
                  />
                </div>
                <div className="flex flex-col items-start gap-2 p-6">
                  <h3 className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[color:var(--color-foreground)]">
                    {a.name}
                  </h3>
                  <span className="text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
                    {a.role}
                  </span>
                  {a.linkedin ? (
                    <ul className="mt-3 flex gap-2">
                      <li>
                        <a
                          href={a.linkedin}
                          target="_blank"
                          rel="noopener"
                          aria-label={`${a.name} on LinkedIn`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-white transition hover:bg-[color:var(--color-brand-dark)]"
                        >
                          <i
                            className="icofont-linkedin"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                    </ul>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
