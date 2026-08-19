import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { HeroCtas } from "@/components/HeroCtas";
import { HeroVideos } from "@/components/HeroVideos";
import { JsonLd } from "@/components/JsonLd";
import { StoreBadge } from "@/components/StoreBadge";
import { TrustStrip } from "@/components/TrustStrip";
import { HomepageBlogStrip } from "@/components/sections/HomepageBlogStrip";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseApp } from "@/components/sections/WhyChooseApp";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Elderly Wellness | Elder Care Services in Chennai",
  description:
    "Home nursing, physiotherapy, geriatric care, and assisted living in Chennai. Police-verified caregivers, 2-hour replacement, no lock-in. Call +91 99448 90577.",
  path: "/",
  image: "/videos/home/poster-1.jpg",
});

// Fixed pre-existing typo — source JSON-LD used "Elderly Eellness" for WebSite.name.
const productSchema: Record<string, unknown> = {
  "@context": "https://schema.org/",
  "@type": "Product",
  name: SITE_NAME,
  image: `${SITE_URL}/images/logo.png`,
  description:
    "Elderly Wellness connects families with trained professionals providing nursing care, physiotherapy, and assisted living support, ensuring peace of mind and improved quality of life for seniors.",
  brand: { "@type": "Brand", name: SITE_NAME },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "45",
  },
};

interface ServiceCard {
  href: string;
  title: string;
  body: string;
  image: string;
}

const services: readonly ServiceCard[] = [
  {
    href: "/physiotherapy-services-for-elders/",
    title: "Physiotherapy",
    body:
      "Personalized therapy to help you regain strength, mobility, and live pain-free with expert care.",
    image: "/videos/home/Physiotherapy.jpg",
  },
  {
    href: "/nursing-services-for-elders/",
    title: "Nursing Service",
    body:
      "Compassionate nursing care at your doorstep, ensuring comfort, recovery, and peace of mind.",
    image: "/videos/home/Nurse.jpg",
  },
  {
    href: "/geriatric-care-services-for-elders/",
    title: "Geriatric Care",
    body:
      "Dedicated support for elderly loved ones, promoting independence, health, and emotional well-being.",
    image: "/videos/home/geriatric-care.jpg",
  },
  {
    href: "/assisted-living-support-services-for-elders/",
    title: "Assisted Living Support",
    body:
      "Helping seniors with daily tasks while ensuring dignity, safety, and a better quality of life.",
    image: "/videos/home/assisted-living-care.jpg",
  },
];

const aboutBullets = [
  "Experienced Health and Home Care Experts",
  "Simple and Convenient Bookings",
  "Personalized Care at Your Doorstep",
  "24/7 Customer Support",
] as const;

interface Step {
  step: string;
  title: string;
  body: string;
  icon: ReactNode;
}

const steps: readonly Step[] = [
  {
    step: "01",
    title: "Simplified Discovery Process",
    body:
      "Finding the right care provider can be overwhelming, but our care specialists make it easy. They assess your loved one's needs and match them with the most suitable caregiver, saving you time and effort.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden="true">
        <circle cx="21" cy="21" r="10" stroke="currentColor" strokeWidth="2.4" />
        <path d="m29 29 8 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M17 21h8M21 17v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Affordable, Transparent Care",
    body:
      "We offer flexible, slab-based pricing, ensuring top-quality care that fits within your budget. Our transparent pricing system helps you choose the right service without any surprises.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden="true">
        <rect x="10" y="8" width="28" height="32" rx="4" stroke="currentColor" strokeWidth="2.4" />
        <path d="M18 18h12M18 24h12M18 30h7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Reliable, Long-term Support",
    body:
      "At Elderly Wellness, we ensure consistent, reliable care. Our caregivers are carefully vetted and trained at our Elderly Academy of Caretaking & Hospitality (EACH). In case of delays or no-shows, we guarantee a replacement caregiver within 2 hours, ensuring continuous care for your loved ones.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden="true">
        <path
          d="M24 8 10 14v12c0 8.2 5.6 13.6 14 16.2 8.4-2.6 14-8 14-16.2V14L24 8Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path d="m18 24 4.2 4.2L31 19.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div>
      <JsonLd id="home-product-schema" data={productSchema} />

      {/* Banner / Hero */}
      <section className="section-y">
        <Container>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-center md:gap-8">
            <div>
              <h1 className="mb-4 font-[family-name:var(--font-serif)] text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
                <span className="font-[family-name:var(--font-display)] text-[color:var(--color-brand)]">
                  Age
                </span>{" "}
                <span className="font-[family-name:var(--font-serif)]">
                  Meets
                </span>
                <span className="mt-1 block font-[family-name:var(--font-serif)]">
                  Assistance.
                </span>
              </h1>
              <p className="mb-4 max-w-lg text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
                At Elderly Wellness, we bridge the gap between physiotherapists,
                nursing assistants, caregivers, and the elderly.
              </p>
              <p className="mb-6 max-w-lg text-base font-semibold text-[color:var(--color-brand)]">
                Elderly Wellness is our care service. Elderly Care Plus is our
                app.
              </p>
              <HeroCtas />
              <div className="mt-5">
                <p className="mb-2 text-sm text-[color:var(--color-muted-foreground)]">
                  Or download our app:
                </p>
                <ul className="flex flex-wrap items-center gap-3">
                  <li>
                    <StoreBadge kind="google-play" size="sm" />
                  </li>
                  <li>
                    <StoreBadge kind="app-store" size="sm" />
                  </li>
                </ul>
              </div>
              <TrustStrip />
            </div>
            <HeroVideos />
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="elder-care-services" className="section-y">
        <Container>
          <SectionTitle heading="Elder Care Services" />
          <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link
                href={s.href}
                key={s.title}
                className="group block overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-card)] transition hover:shadow-lg"
              >
                <div className="relative aspect-square w-full bg-[color:var(--color-muted)]">
                  <Image quality={80}
                    src={s.image}
                    alt={s.title}
                    width={400}
                    height={400}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 font-[family-name:var(--font-serif)] text-xl font-semibold text-[color:var(--color-brand)]">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
                    {s.body}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* About us */}
      <section className="section-y">
        <Container>
          <SectionTitle
            badge="About us"
            heading={
              <>
                Application where Touch of Care{" "}
                <span className="text-[color:var(--color-brand)]">
                  meets the Ease of Technology.
                </span>
              </>
            }
          />
          <div className="mt-5 grid grid-cols-1 items-start gap-6 lg:mt-6 lg:grid-cols-2 lg:gap-8">
            <div className="order-2 space-y-5 lg:order-1">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {aboutBullets.map((b) => (
                  <li
                    key={b}
                    className="rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-white px-4 py-4 text-sm font-medium leading-snug text-[color:var(--color-foreground)] shadow-[var(--shadow-card)]"
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <p className="text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
                As the global population ages, the need for reliable, quality
                elderly care services has never been greater. Finding the right
                care for aging loved ones can be a daunting task, especially
                when managing it from afar. That&apos;s where Elderly Wellness
                steps in, a comprehensive platform that connects families with
                professional, vetted caregivers providing nursing care,
                physiotherapy, and assisted living support—all in the comfort
                of home.
              </p>
              <p className="text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
                Currently serving in Chennai with plans to expand to Bangalore
                in the coming months, Elderly Wellness is designed to simplify
                the elderly care experience for families, ensuring your loved
                ones receive the best possible care when and where they need
                it.
              </p>
            </div>
            <div className="order-1 mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:order-2 lg:max-w-none">
              <Image
                quality={80}
                src="/images/appscreen.webp"
                alt="Elderly Wellness app preview"
                width={450}
                height={912}
                className="mx-auto h-auto w-full max-w-[280px] object-contain sm:max-w-[320px]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Task/steps */}
      <section className="section-y">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <article
                key={s.step}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[var(--shadow-card)]"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[color:var(--color-brand)] text-white">
                  {s.icon}
                </div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--color-brand)]">
                  Step {s.step}
                </p>
                <h2 className="mb-3 font-[family-name:var(--font-serif)] text-2xl font-semibold leading-tight">
                  {s.title}
                </h2>
                <p className="text-sm leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-base">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Testimonials />

      <WhyChooseApp />

      {/* Image / banner */}
      <section className="section-y">
        <Container>
          <Image quality={80}
            src="/images/e4.jpg"
            alt="Elderly care family moment"
            width={1200}
            height={700}
            className="h-auto w-full rounded-[var(--radius-lg)] object-cover"
          />
        </Container>
      </section>

      {/* Download */}
      <section className="section-y">
        <Container>
          <div className="mx-auto max-w-[520px] text-center">
            <Image quality={80}
              src="/images/downloadScreen.webp"
              alt="Download Elderly Wellness app"
              width={450}
              height={440}
              className="mx-auto w-full max-w-[320px] object-contain"
            />
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <li>
                <StoreBadge kind="google-play" size="md" />
              </li>
              <li>
                <StoreBadge kind="app-store" size="md" />
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Latest 3 blog posts + CTA (Phase 4) */}
      <HomepageBlogStrip />
    </div>
  );
}
