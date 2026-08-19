import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { HeroCtas } from "@/components/HeroCtas";
import { TrustStrip } from "@/components/TrustStrip";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { SITE_PHONE } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How Elderly Wellness Works : Revolutionizing Elderly Care at Home",
  description:
    "Elderly Wellness is revolutionizing home care, providing a seamless, stress-free solution to elderly care right in the comfort of your home. Learn how Elderly Wellness works.",
  path: "/how-elderly-wellness-works/",
});

const STEPS = [
  {
    n: "01",
    kicker: "Step One",
    title: "Personalized Care Consultation",
    body: "A dedicated Senior Care Manager connects with your family to assess your parent's mobility, medical history, chronic conditions, and routine preferences.",
    bullets: ["Free Telephonic Health Assessment", "Tailored Care Plan Creation"],
  },
  {
    n: "02",
    kicker: "Step Two",
    title: "Transparent Pricing & Options",
    body: "Review clear, slab-based pricing with zero hidden fees. Select flexible shift durations (12-hour, 24-hour, or per-visit sessions) that fit your budget.",
    bullets: ["Transparent Slab Rates", "Flexible Contract Options"],
  },
  {
    n: "03",
    kicker: "Step Three",
    title: "Academy-Trained Caregiver Matching",
    body: "We match your family with background-checked caregivers trained at the Elderly Academy of Caretaking & Hospitality (EACH).",
    bullets: ["Police-Verified Background Checks", "EACH Certified Professionals"],
  },
  {
    n: "04",
    kicker: "Step Four",
    title: "Real-Time Updates & 2-Hr Guarantee",
    body: "Track daily vitals, meal logs, and caregiver attendance via our app. If a caregiver is ever unavailable, our 2-hour replacement guarantee activates immediately.",
    bullets: [
      "Elderly Care Plus App Monitoring",
      "Guaranteed 2-Hour Standby Replacement",
    ],
  },
] as const;

export default function HowItWorksPage() {
  return (
    <div>
      <section className="section-y">
        <Container>
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[color:var(--color-brand)]">
                How It Works
              </p>
              <h1 className="mb-4 font-[family-name:var(--font-serif)] text-3xl leading-tight sm:text-4xl md:text-5xl">
                How Elderly Wellness Works{" "}
                <span className="mt-1 block text-[color:var(--color-brand)]">
                  Revolutionizing Senior Care at Home
                </span>
              </h1>
              <p className="mb-6 max-w-xl text-base leading-relaxed text-slate-600">
                We connect families with trained, police-verified caregivers,
                nurses, and physiotherapists. Learn how our 4-step care process
                ensures your aging parents receive compassionate, reliable
                support in Chennai.
              </p>
              <HeroCtas
                primaryHref="/contact/"
                primaryLabel="Book Free Assessment"
                callLabel={`Call ${SITE_PHONE}`}
              />
              <TrustStrip />
            </div>
            <div className="overflow-hidden rounded-3xl border-2 border-slate-200 shadow-xl">
              <Image
                quality={95}
                src="/images/blogs/elderly-wellness-works.webp"
                alt="How Elderly Wellness Works"
                width={900}
                height={600}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <SectionTitle
            badge="4-Step Care Journey"
            heading={
              <>
                How We Deliver{" "}
                <span className="text-[color:var(--color-brand)]">
                  Seamless Home Care
                </span>
              </>
            }
            description={
              <p>
                From initial consultation to daily supervision, here is how
                Elderly Wellness pairs your family with dedicated healthcare
                professionals.
              </p>
            }
          />
          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 sm:mt-6">
            {STEPS.map((step) => (
              <article
                key={step.n}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
              >
                <div className="mb-4 flex items-center gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color:var(--color-brand)] text-xl font-extrabold text-white">
                    {step.n}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--color-brand)]">
                      {step.kicker}
                    </p>
                    <h2 className="text-xl font-extrabold text-slate-900">
                      {step.title}
                    </h2>
                  </div>
                </div>
                <p className="mb-4 text-[15px] leading-relaxed text-slate-600">
                  {step.body}
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <i
                        className="icofont-check-circled text-[color:var(--color-brand)]"
                        aria-hidden="true"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-900 section-y text-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-sky-300">
              Need Guidance?
            </p>
            <h2 className="text-3xl font-extrabold">
              Not Sure Which Service Fits Your Parent Best?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300">
              Speak directly with our Senior Care Manager. We conduct a free
              telephonic health assessment and assign background-verified
              caregivers tailored to your parent&apos;s exact needs.
            </p>
            <div className="mt-8 flex justify-center">
              <HeroCtas
                primaryHref="/contact/"
                primaryLabel="Book Free Care Assessment"
                callLabel={`Call ${SITE_PHONE}`}
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
