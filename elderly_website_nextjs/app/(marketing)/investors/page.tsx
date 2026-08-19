import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { OurValues } from "@/components/sections/OurValues";
import { WhyChooseApp } from "@/components/sections/WhyChooseApp";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Invest in the Future of Elderly Care with Elderly Wellness",
  description:
    "Join Elderly Wellness as an investor and support a platform revolutionizing elderly care through technology and professional service providers.",
  path: "/investors/",
});

function ApplyButton() {
  return (
    <Link
      href="/contact/"
      className="btn-brand inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold shadow-[var(--shadow-card)]"
    >
      Apply for Investment
    </Link>
  );
}

export default function InvestorsPage() {
  return (
    <div>
      <section className="section-y">
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

      <section className="section-y">
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

      <OurValues />
      <div className="flex justify-center pb-8">
        <ApplyButton />
      </div>
      <WhyChooseApp />
    </div>
  );
}
