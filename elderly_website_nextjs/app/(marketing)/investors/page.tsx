import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Invest in the Future of Elderly Care with Elderly Wellness",
  description:
    "Join Elderly Wellness as an investor and support a platform revolutionizing elderly care through technology and professional service providers.",
  path: "/investors/",
});

const values = [
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
] as const;

const whyChoose = [
  "Supportive",
  "Engaging",
  "Empathetic",
  "Reliable",
  "Appealing",
] as const;

function ApplyButton() {
  return (
    <Link
      href="/contact/"
      className="inline-flex items-center rounded-full bg-[color:var(--color-brand)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-card)] transition hover:bg-[color:var(--color-brand-dark)]"
    >
      Apply for Investment
    </Link>
  );
}

export default function InvestorsPage() {
  return (
    <div>
      <section className="py-12 sm:py-16">
        <Container>
          <SectionTitle
            badge="Investors"
            heading={
              <>
                Empower Aging Gracefully{" "}
                <br />
                <span className="text-[color:var(--color-brand)]">
                  Invest in Elderly, Where Age meets Assistance
                </span>
              </>
            }
            description={
              <p>
                We&apos;re embarking on a transformative journey to connect
                technology and elderly care! To realize this bold vision, we
                welcome partnerships with exceptional individuals who share our
                long-term commitment and can journey with us towards success.
              </p>
            }
          />
          <div className="mt-8 flex justify-center">
            <ApplyButton />
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="font-[family-name:var(--font-serif)] text-3xl leading-tight text-[color:var(--color-foreground)] sm:text-4xl">
                <span className="text-[color:var(--color-brand)]">
                  Our story
                </span>{" "}
                behind our success &amp; achievement
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
                We&apos;re on a mission to create real value for people, aiming
                to build a billion-dollar company without compromising our
                culture. We&apos;re not just after money; we want partners who
                believe in our vision and can help us grow strategically. We
                value trust and respect over signed papers, and we believe in
                making decisions together for the greater good. While we welcome
                suggestions, the final call rests with us. Our aim is a
                long-term relationship built on trust and mutual respect.
                We&apos;ll keep you updated regularly, but day-to-day operations
                remain our responsibility. Your time is valuable, and we&apos;ll
                ensure it&apos;s respected.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <SectionTitle
            badge="Our values"
            heading={
              <>
                <span className="text-[color:var(--color-brand)]">
                  Our values
                </span>{" "}
                driven by relations
              </>
            }
          />
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] bg-white p-8 text-center shadow-[var(--shadow-card)]"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[color:var(--color-highlight)]">
                  <Image quality={95}
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
          <div className="mt-10 flex justify-center">
            <ApplyButton />
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="mb-4 text-center">
            <span className="inline-block rounded-full bg-[color:var(--color-highlight)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand)]">
              Why choose our app
            </span>
          </div>
          <div className="overflow-hidden">
            <ul className="flex flex-wrap items-center justify-center gap-4 text-2xl font-[family-name:var(--font-serif)] text-[color:var(--color-foreground)] sm:gap-8 sm:text-3xl">
              {whyChoose.map((word) => (
                <li key={word} className="flex items-center gap-4">
                  <span>{word}</span>
                  <span className="text-[color:var(--color-brand)]">•</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </div>
  );
}
