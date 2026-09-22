import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { HeroCtas } from "@/components/HeroCtas";

import dynamic from "next/dynamic";
import { StoreBadge } from "@/components/StoreBadge";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { buildMetadata } from "@/lib/seo";
import { PRIMARY_SERVICES } from "@/data/primary-services";

const HomepageBlogStrip = dynamic(() => import("@/components/sections/HomepageBlogStrip").then(m => m.HomepageBlogStrip));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(m => m.Testimonials));
const WhyChooseApp = dynamic(() => import("@/components/sections/WhyChooseApp").then(m => m.WhyChooseApp));

export const metadata: Metadata = buildMetadata({
  title: "Elderly Wellness | Elder Care Services in Chennai",
  description:
    "Post-operative care, elderly care, skilled nursing and physiotherapy at home in Chennai. Police-verified caregivers, 2-hour replacement, no lock-in. Call +91 81226 66490.",
  ogTitle: "Elder Care at Your Parent's Doorstep",
  ogDescription:
    "Skilled nursing, physiotherapy, post-operative care and elderly home care, delivered across Chennai by police-verified caregivers.",
  path: "/",
  image: "/videos/home/poster-1.jpg",
  dcType: "Text.Homepage",
});

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
  pointsLabel: string;
  points: readonly string[];
  icon: ReactNode;
}

const steps: readonly Step[] = [
  {
    step: "01",
    title: "Tell Us About Your Care Needs",
    body:
      "Speak with our care team and share the patient's condition, daily routine, care requirements and preferred service.",
    pointsLabel: "We understand",
    points: [
      "Patient's current condition",
      "Type of care required",
      "Preferred timing and duration",
      "Home and family requirements",
    ],
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
    title: "Care Assessment & Plan",
    body:
      "We understand the patient's needs and recommend the right care option, whether it is elderly care, nursing, post-operative care or physiotherapy.",
    pointsLabel: "We provide",
    points: [
      "Care requirement assessment",
      "Suitable service recommendation",
      "Clear pricing and service details",
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden="true">
        <rect x="10" y="8" width="28" height="32" rx="4" stroke="currentColor" strokeWidth="2.4" />
        <path d="M18 18h12M18 24h12M18 30h7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Right Professional, Right Care",
    body:
      "We match your family with a suitable caregiver, nurse or physiotherapist based on the patient's needs and the required level of care.",
    pointsLabel: "Our focus",
    points: [
      "Suitable professional matching",
      "Verified and trained professionals",
      "Clear handover of care requirements",
      "Service start as scheduled",
    ],
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
  {
    step: "04",
    title: "Ongoing Care & Family Support",
    body:
      "Once care begins, our team stays connected with the family to understand how the service is going and address any concerns.",
    pointsLabel: "We provide",
    points: [
      "Regular follow-up",
      "Family communication",
      "Caregiver/nurse coordination",
      "Support for changes or additional care needs",
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden="true">
        <path d="M12 24c0-6.6 5.4-12 12-12s12 5.4 12 12M24 16v8M24 24l-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div>

      {/* Banner / Hero */}
      <section className="relative overflow-hidden flex flex-col justify-center min-h-[calc(100dvh-64px)] sm:min-h-[calc(100dvh-80px)] py-4 lg:py-0 before:absolute before:inset-0 before:-z-10 before:bg-[url('/images/blue_dotes.png')] before:bg-no-repeat before:bg-[length:20%] before:bg-[position:-5%_-10%] before:opacity-30">
        <Container className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center">
            {/* Left side content */}
            <div>
              <p className="mb-2 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#5c7a99]">
                COMPASSIONATE CARE &bull; SKILLED SUPPORT &bull; AT HOME
              </p>
              <h1 className="mb-3 font-[family-name:var(--font-serif)] text-[1.75rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#002f5e]">
                <span className="font-[family-name:var(--font-display)] text-[#1ba1b5] block mb-1 font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                  Trusted Home Healthcare
                </span>
                for Your Loved Ones
              </h1>
              <p className="mb-4 max-w-xl text-[12px] leading-snug text-[#3a5875] sm:text-[14px] lg:text-[17px] lg:leading-relaxed">
                From daily care to specialised nursing support, we bring trained professionals to your home &mdash; so your loved ones get the care, comfort and dignity they deserve.
              </p>
              
              {/* 4 Features */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-4 lg:mb-8">
                {/* Feature 1 */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px] rounded-full bg-[#eaf6f6] border border-[#d2ebeb] flex items-center justify-center text-[#1ba1b5]">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-[22px] lg:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4v1H8V6a4 4 0 0 1 4-4z"/><path d="M6 10v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10"/><path d="M9 14h6"/><path d="M12 11v6"/></svg>
                  </div>
                  <p className="text-[8px] sm:text-[10px] lg:text-[13px] font-semibold text-[#002f5e] leading-[1.2]">Trained &amp; Verified<br className="hidden sm:block"/> Care</p>
                </div>
                {/* Feature 2 */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px] rounded-full bg-[#f2f4ff] border border-[#dde4fc] flex items-center justify-center text-[#4a6cf7]">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-[22px] lg:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M12 17c-2 0-3.5-1.5-3.5-3.5S10 10 12 10s3.5 1.5 3.5 3.5S14 17 12 17z"/></svg>
                  </div>
                  <p className="text-[8px] sm:text-[10px] lg:text-[13px] font-semibold text-[#002f5e] leading-[1.2]">Personalised<br className="hidden sm:block"/> Plans</p>
                </div>
                {/* Feature 3 */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px] rounded-full bg-[#fff0f2] border border-[#ffe0e4] flex items-center justify-center text-[#ff5975]">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-[22px] lg:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <p className="text-[8px] sm:text-[10px] lg:text-[13px] font-semibold text-[#002f5e] leading-[1.2]">Recovery<br className="hidden sm:block"/> Care</p>
                </div>
                {/* Feature 4 */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px] rounded-full bg-[#eefaff] border border-[#d2f1ff] flex items-center justify-center text-[#00b0ff]">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-[22px] lg:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><path d="M12 13h-2l-1-4 3-6 2 4h1"/></svg>
                  </div>
                  <p className="text-[8px] sm:text-[10px] lg:text-[13px] font-semibold text-[#002f5e] leading-[1.2]">Critical<br className="hidden sm:block"/> Support</p>
                </div>
              </div>

              {/* Safe Badge */}
              <div className="inline-flex items-center gap-2 sm:gap-3 lg:gap-4 bg-[#ebf5f5] rounded-full px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3.5 mb-4 lg:mb-8 w-full sm:w-auto">
                <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-[#1ba1b5] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <div>
                  <p className="text-[10px] sm:text-[12px] lg:text-[14px] font-semibold text-[#002f5e]"><span className="font-bold">Safe &bull; Reliable &bull; Compassionate</span></p>
                  <p className="text-[9px] sm:text-[10px] lg:text-[12px] text-[#5c7a99] mt-0.5">Because every home deserves expert care.</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 lg:px-7 lg:py-3.5 text-[12px] sm:text-[13px] lg:text-[15px] font-bold text-white shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5" style={{ backgroundColor: "#007c91" }}>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  Book Care
                </Link>
                <a href="tel:+918122666490" className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border-2 border-[#002f5e] bg-white px-4 py-2 sm:px-5 sm:py-2.5 lg:px-7 lg:py-3.5 text-[12px] sm:text-[13px] lg:text-[15px] font-bold text-[#002f5e] hover:bg-[#002f5e] hover:text-white transition shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  Call Us
                </a>
              </div>
            </div>
            
            {/* Right side Image (animated e4) */}
            <div className="relative mt-4 lg:mt-0 pt-2 lg:pt-4">
              <div className="relative w-full aspect-[21/9] sm:aspect-[16/9] lg:aspect-[1.15] xl:aspect-[1.25] animate-float z-10 mx-auto max-w-2xl lg:max-w-none">
                <Image 
                  src="/images/e4.jpg" 
                  alt="Elderly care" 
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  className="object-cover rounded-[16px] sm:rounded-[24px] lg:rounded-[60px] shadow-xl lg:shadow-2xl" 
                  priority
                />
                
                {/* White shape overlapping bottom right with angled text */}
                <div className="absolute -bottom-3 -right-1 sm:-bottom-4 sm:-right-4 lg:-bottom-8 lg:-right-8 bg-white rounded-xl lg:rounded-3xl shadow-lg lg:shadow-2xl p-2 sm:p-3 lg:p-7 rotate-[-4deg] max-w-[140px] sm:max-w-[180px] lg:max-w-[280px] z-20">
                  <p className="font-[family-name:var(--font-display)] text-[#004f7a] text-[15px] sm:text-[18px] lg:text-4xl leading-[1.1] text-center px-1 lg:px-2">
                    Better Care.<br/> A Happier Tomorrow.
                  </p>
                  <svg className="absolute top-1 right-1 lg:top-4 lg:right-4 text-[#0099aa] w-3 h-3 lg:w-7 lg:h-7 opacity-90 rotate-[15deg]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </div>
              </div>
              
              {/* Background abstract decoration shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#f4fbff] rounded-full -z-10 blur-xl lg:blur-3xl opacity-80 pointer-events-none scale-110"></div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="elder-care-services" className="section-y">
        <Container>
          <SectionTitle heading="Services" />
          <div className="mt-5 grid grid-cols-1 gap-6 sm:mt-8 lg:grid-cols-2">
            {PRIMARY_SERVICES.map((s) => (
              <div
                key={s.id}
                className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-card)] transition hover:shadow-lg"
              >
                <Link
                  href={s.href}
                  className="relative aspect-[16/9] w-full shrink-0 overflow-hidden border-b border-[color:var(--color-border)] bg-[color:var(--color-muted)]"
                >
                  <Image
                    quality={90}
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                    className={`object-cover transition duration-300 group-hover:scale-[1.03] ${s.imagePosition || "object-center"}`}
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="mb-3 font-[family-name:var(--font-serif)] text-xl font-semibold text-[color:var(--color-brand)] sm:text-2xl">
                    <Link href={s.href} className="hover:underline">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-base">
                    {s.body}
                  </p>
                  <div className="mt-auto pt-2">
                    <HeroCtas primaryLabel="Book care" callLabel="Call Now" primaryHref={s.href} />
                  </div>
                </div>
              </div>
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
                physiotherapy and elderly care at home—all in the comfort
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
                quality={95}
                src="/images/appscreen.webp"
                alt="Elderly Wellness app preview"
                width={450}
                height={912}
                sizes="(max-width: 640px) 280px, 320px"
                className="mx-auto h-auto w-full max-w-[280px] object-contain sm:max-w-[320px]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section-y">
        <Container>
          <div className="mb-10 mx-auto max-w-3xl text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--color-brand)]">
              How It Works
            </p>
            <h2 className="mb-3 font-[family-name:var(--font-serif)] text-3xl font-semibold text-[color:var(--color-foreground)] sm:text-4xl">
              Simple, Personalised Care — From Your First Call to Ongoing Support
            </h2>
            <p className="text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
              We understand your family&apos;s needs, recommend the right care, and stay connected throughout the service.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {steps.map((s) => (
              <article
                key={s.step}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-[var(--shadow-card)]"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--color-brand)] text-white">
                    {s.icon}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--color-brand)]">
                    {s.step}
                  </p>
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-serif)] text-xl font-semibold leading-tight sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-base">
                  {s.body}
                </p>
                <p className="mb-2 text-sm font-semibold text-[color:var(--color-foreground)]">
                  {s.pointsLabel}:
                </p>
                <ul className="mt-auto space-y-2">
                  {s.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-snug text-[color:var(--color-foreground)]"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-brand)]"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="section-y bg-[color:var(--color-highlight)]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-3xl font-semibold text-[color:var(--color-brand)] sm:text-4xl">
              Need Help Choosing the Right Care?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
              Tell us about your loved one&apos;s needs. Our care team will guide
              you to the right service and support.
            </p>
            <div className="flex justify-center">
              <HeroCtas
                primaryLabel="Book a Care Assessment"
                callLabel="Call Us"
                primaryHref="/contact/"
              />
            </div>
          </div>
        </Container>
      </section>

      <Testimonials />

      <WhyChooseApp />

      {/* Image / banner */}
      <section className="section-y">
        <Container>
          <Image quality={95}
            src="/images/e4.jpg"
            alt="Elderly care family moment"
            width={1200}
            height={700}
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="h-auto w-full rounded-[var(--radius-lg)] object-cover"
          />
        </Container>
      </section>

      {/* Download */}
      <section className="section-y">
        <Container>
          <div className="mx-auto max-w-[520px] text-center">
            <Image quality={95}
              src="/images/downloadScreen.webp"
              alt="Download Elderly Wellness app"
              width={450}
              height={440}
              sizes="(max-width: 640px) 100vw, 320px"
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
