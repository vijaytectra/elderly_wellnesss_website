import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { HeroCtas } from "@/components/HeroCtas";
import { HeroVideos } from "@/components/HeroVideos";
import { StoreBadge } from "@/components/StoreBadge";
import { TrustStrip } from "@/components/TrustStrip";
import { HomepageBlogStrip } from "@/components/sections/HomepageBlogStrip";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseApp } from "@/components/sections/WhyChooseApp";
import { buildMetadata } from "@/lib/seo";
import { IconCheck } from "@/components/icons";

export const metadata: Metadata = buildMetadata({
  title: "Elderly Wellness | Elder Care Services in Chennai",
  description:
    "Home nursing, physiotherapy, geriatric care, and assisted living in Chennai. Police-verified caregivers, 2-hour replacement, no lock-in. Call +91 81226 66490.",
  ogTitle: "Elder Care at Your Parent's Doorstep",
  ogDescription:
    "Nursing, physiotherapy, geriatric care and assisted living support, delivered at home across Chennai by police-verified caregivers.",
  path: "/",
  image: "/videos/home/poster-1.jpg",
  dcType: "Text.Homepage",
});

interface ServiceCard {
  href: string;
  title: string;
  body: string;
  bullets?: readonly string[];
  image: string;
}

const services: readonly ServiceCard[] = [
  {
    href: "/geriatric-care-services-for-elders/",
    title: "Post-Operative & Discharge Care at Home",
    body:
      "Professional care and support after surgery or hospital discharge, helping patients recover safely and comfortably at home.",
    bullets: [
      "Wound and dressing care",
      "Medicine and injection support",
      "BP, temperature, pulse and oxygen monitoring",
      "Personal hygiene and toileting support",
      "Walking, movement and daily activity assistance",
    ],
    image: "/images/services/geriatric/2.webp",
  },
  {
    href: "/assisted-living-support-services-for-elders/",
    title: "Elderly Care at Home",
    body:
      "Comfortable and compassionate daily care for seniors, helping them stay safe, active and comfortable at home.",
    bullets: [
      "Bathing, grooming and personal hygiene",
      "Feeding and meal assistance",
      "Walking and mobility support",
      "Medicine reminders",
      "Companionship and help with daily activities",
    ],
    image: "/images/services/assisted/2.webp",
  },
  {
    href: "/nursing-services-for-elders/",
    title: "Critical & Skilled Nursing Support at Home",
    body:
      "Professional nursing support for patients who need regular medical care and special attention at home.",
    bullets: [
      "Vital signs monitoring",
      "Injections and IV care as prescribed",
      "Wound, dressing and bed-sore care",
      "Catheter and feeding-tube care",
      "Tracheostomy, oxygen and respiratory care",
      "Stroke, Paralysis, Bedridden Patients, Feeding-Tube Care",
    ],
    image: "/images/services/nursing/2.webp",
  },
  {
    href: "/physiotherapy-services-for-elders/",
    title: "Personalised Physiotherapy & Rehabilitation at Home",
    body:
      "Personalised physiotherapy to improve movement, strength and balance and help patients return to their daily activities.",
    bullets: [
      "Stroke and paralysis rehabilitation",
      "Post-fracture and post-surgery recovery",
      "Joint replacement rehabilitation",
      "Strength, balance and walking exercises",
      "Mobility training and pain/stiffness management",
    ],
    image: "/images/services/2.webp",
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
    title: "Tell Us About Your Care Needs",
    body:
      "Share your family's unique situation and what kind of support your loved one needs. Our care team will listen carefully to understand your requirements.",
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
      "We conduct a thorough assessment of the patient's condition and recommend a personalized care plan that ensures their safety, comfort, and recovery at home.",
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
      "We match your loved one with a qualified, background-checked professional—whether a nurse, physiotherapist, or caregiver—who has the right skills for the job.",
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
      "We provide continuous support and open communication. You'll stay informed about your loved one's progress, and we'll adjust the care plan as their needs evolve.",
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
      <section className="section-y">
        <Container>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-center md:gap-8">
            <div>
              <h1 className="mb-4 font-[family-name:var(--font-serif)] text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
                <span className="font-[family-name:var(--font-display)] text-[color:var(--color-brand)]">
                  Care at home
                </span>
                <span className="mt-1 block font-[family-name:var(--font-serif)]">
                  for your parents.
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
          <div className="mt-5 grid grid-cols-1 gap-6 sm:mt-8 lg:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.title}
                className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-card)] transition hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] w-full shrink-0 bg-[color:var(--color-muted)]">
                  <Image quality={95}
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                    className="object-cover transition group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="mb-3 font-[family-name:var(--font-serif)] text-xl font-semibold text-[color:var(--color-brand)] sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-base">
                    {s.body}
                  </p>
                  <ul className="mb-6 space-y-2.5">
                    {s.bullets?.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[color:var(--color-foreground)] sm:text-base">
                        <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-brand)] sm:h-5 sm:w-5" />
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4">
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
                quality={95}
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
          <div className="mb-10 text-center">
            <h2 className="font-[family-name:var(--font-serif)] text-3xl font-semibold sm:text-4xl text-[color:var(--color-brand)]">
              HOW IT WORKS
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                <h2 className="mb-3 font-[family-name:var(--font-serif)] text-xl font-semibold leading-tight sm:text-2xl">
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

      {/* Closing CTA */}
      <section className="section-y bg-[color:var(--color-highlight)]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-3xl font-semibold text-[color:var(--color-brand)] sm:text-4xl">
              Need Help Choosing the Right Care?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
              Our care specialists are here to answer your questions and help you build a personalized care plan for your loved one.
            </p>
            <div className="flex justify-center">
              <HeroCtas primaryLabel="Book a Care Assessment" callLabel="Call Us" primaryHref="/contact/" />
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
