import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { StoreBadge } from "@/components/StoreBadge";
import { HomepageBlogStrip } from "@/components/sections/HomepageBlogStrip";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Elderly Wellness | Elder Care Services in Chennai",
  description:
    "Contact us today at +91 99448 90577 for expert elder care services in Chennai. Elderly Wellness provides compassionate and personalized care for your loved ones.",
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
  image: string;
  icon: string;
}

const steps: readonly Step[] = [
  {
    step: "Step 01",
    title: "Simplified Discovery Process",
    body:
      "Finding the right care provider can be overwhelming, but our care specialists make it easy. They assess your loved one's needs and match them with the most suitable caregiver, saving you time and effort.",
    image: "/images/feature1a.webp",
    icon: "/images/feature-icon1.svg",
  },
  {
    step: "Step 02",
    title: "Affordable, Transparent Care",
    body:
      "We offer flexible, slab-based pricing, ensuring top-quality care that fits within your budget. Our transparent pricing system helps you choose the right service without any surprises.",
    image: "/images/feature2a.webp",
    icon: "/images/feature-icon3.svg",
  },
  {
    step: "Step 03",
    title: "Reliable, Long-term Support",
    body:
      "At Elderly Wellness, we ensure consistent, reliable care. Our caregivers are carefully vetted and trained at our Elderly Academy of Caretaking & Hospitality (EACH). In case of delays or no-shows, we guarantee a replacement caregiver within 2 hours, ensuring continuous care for your loved ones.",
    image: "/images/feature3a.webp",
    icon: "/images/feature-icon2.svg",
  },
];

const whyChoose = [
  "Supportive",
  "Engaging",
  "Empathetic",
  "Reliable",
  "Appealing",
] as const;

export default function HomePage() {
  return (
    <div>
      <JsonLd id="home-product-schema" data={productSchema} />

      {/* Banner / Hero */}
      <section className="py-8 sm:py-12">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="mb-6 font-[family-name:var(--font-serif)] text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
                <span className="font-[family-name:var(--font-display)] text-[color:var(--color-brand)]">
                  Age
                </span>{" "}
                <span className="font-[family-name:var(--font-serif)]">
                  MEETS
                </span>
                <span className="mt-1 block font-[family-name:var(--font-serif)]">
                  ASSISTANCE.
                </span>
              </h1>
              <p className="mb-6 max-w-lg text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
                At Elderly, we bridge the gap between physiotherapists, nursing
                assistants, caregivers, and the elderly.
              </p>
              <ul className="flex flex-wrap items-center gap-4">
                <li>
                  <StoreBadge kind="google-play" size="md" />
                </li>
                <li>
                  <StoreBadge kind="app-store" size="md" />
                </li>
              </ul>
            </div>
            <div className="relative aspect-square w-full max-w-[560px] overflow-hidden rounded-[40px] bg-[#181a22] md:ml-auto">
              <Image quality={90}
                src="/videos/home/poster-1.jpg"
                alt="Elderly care at home"
                width={800}
                height={800}
                priority
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <video
                src="/videos/home/1.mp4"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                poster="/videos/home/poster-1.jpg"
                className="relative z-10 h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="relative py-12 sm:py-16">
        <Image quality={90}
          src="/images/blue_dotes.png"
          alt=""
          width={200}
          height={200}
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-40 w-40 opacity-40"
        />
        <Container>
          <SectionTitle heading="Elder Care Services" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link
                href={s.href}
                key={s.title}
                className="group block overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-card)] transition hover:shadow-lg"
              >
                <div className="relative aspect-square w-full bg-[color:var(--color-muted)]">
                  <Image quality={90}
                    src={s.image}
                    alt={s.title}
                    width={400}
                    height={400}
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
      <section className="py-12 sm:py-16">
        <Container>
          <SectionTitle
            badge="About us"
            heading={
              <>
                Application where Touch of Care <br />
                <span className="text-[color:var(--color-brand)]">
                  meets the Ease of Technology.
                </span>
              </>
            }
          />
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <ul className="grid grid-cols-2 gap-4">
              {aboutBullets.map((b) => (
                <li
                  key={b}
                  className="flex h-36 items-center justify-center rounded-full bg-[color:var(--color-highlight)] p-6 text-center text-sm font-medium text-[color:var(--color-brand)]"
                >
                  <p>{b}</p>
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <Image quality={90}
                src="/images/appscreen.webp"
                alt="Elderly Wellness app preview"
                width={450}
                height={912}
                className="w-full max-w-[320px] object-contain"
              />
            </div>
            <div className="space-y-4">
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
              <div className="relative overflow-hidden rounded-[var(--radius-lg)]">
                <Image quality={90}
                  src="/images/applicationvideothumb.jpg"
                  alt="Elderly Wellness application video"
                  width={1000}
                  height={596}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Task/steps */}
      <section className="py-12 sm:py-16">
        <div className="space-y-8">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="mx-auto max-w-[1200px] rounded-[28px] bg-[color:var(--color-brand)] p-8 shadow-[0_18px_40px_rgba(39,134,165,0.28)] sm:p-12"
            >
              <div
                className={`grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="flex justify-center">
                  <Image quality={90}
                    src={s.image}
                    alt={s.title}
                    width={720}
                    height={926}
                    className="max-h-[360px] w-auto object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="text-white">
                  <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white/80">
                    {s.step}
                  </span>
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-[16px] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                    <Image quality={90}
                      src={s.icon}
                      alt=""
                      width={30}
                      height={30}
                      className="h-8 w-8"
                    />
                  </span>
                  <h2 className="mb-3 text-2xl font-extrabold leading-tight sm:text-3xl">
                    {s.title}
                  </h2>
                  <p className="max-w-[38ch] text-sm leading-relaxed text-white/90 sm:text-base">
                    {s.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose our app strip */}
      <section className="py-8 sm:py-12">
        <Container>
          <div className="mb-4 text-center">
            <span className="inline-block rounded-full bg-[color:var(--color-highlight)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand)]">
              Why choose our app
            </span>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-4 text-2xl font-[family-name:var(--font-serif)] text-[color:var(--color-foreground)] sm:gap-8 sm:text-3xl">
            {whyChoose.map((w) => (
              <li key={w} className="flex items-center gap-4">
                <span>{w}</span>
                <span className="text-[color:var(--color-brand)]">•</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Image / banner */}
      <section className="py-8 sm:py-12">
        <Container>
          <Image quality={90}
            src="/images/e4.jpg"
            alt="Elderly care family moment"
            width={1200}
            height={700}
            className="h-auto w-full rounded-[var(--radius-lg)] object-cover"
          />
        </Container>
      </section>

      {/* Download */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-[520px] text-center">
            <Image quality={90}
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
