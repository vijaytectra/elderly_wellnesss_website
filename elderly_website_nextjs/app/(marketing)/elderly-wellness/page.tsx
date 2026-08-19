import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { WhyChooseApp } from "@/components/sections/WhyChooseApp";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Elderly Wellness: Personalized Care for Senior Citizens",
  description:
    "Explore Elderly Wellness, offering tailored health services for seniors. We connect you with qualified care providers for personalized in-home care.",
  path: "/elderly-wellness/",
});

const features = [
  {
    title: "Find Experienced Health and Home Care Experts",
    body:
      "Easily connect with certified physiotherapists, nursing assistants, caregivers, and other specialists near you, ensuring quality care for the elderly.",
  },
  {
    title: "Simple and Convenient Bookings",
    body:
      "Effortlessly book health and home care services through a user-friendly interface. Choose from various time slots and get assistance at your preferred schedule.",
  },
  {
    title: "Personalized Care at Your Doorstep",
    body:
      "Get tailored services like physiotherapy, nursing care, or companionship delivered right to your home.",
  },
  {
    title: "Manage Multiple Services in One Place",
    body:
      "Access a range of wellness services and manage them within a single app for seamless coordination.",
  },
  {
    title: "Monitor Health and Care Plans",
    body:
      "Keep track of care schedules, medical appointments, and health updates for continuous and consistent care.",
  },
  {
    title: "Secure Payment Gateway",
    body:
      "Enjoy effortless and secure payments with multiple options and transparent billing.",
  },
  {
    title: "24/7 Customer Support",
    body:
      "A dedicated support team to assist you anytime, ensuring a smooth experience.",
  },
] as const;

const steps = [
  {
    step: "01",
    title: "Download app",
    icon: "/images/howstep1.png",
    body:
      "Download App. It will work on Android and iOS mobile phones.",
    apps: true,
  },
  {
    step: "02",
    title: "Create account",
    icon: "/images/howstep2.png",
    tag: "Users can create account and add patients",
    body:
      "Service providers can sign up, complete KYC, and start offering services on the app.",
  },
  {
    step: "03",
    title: "Use the app",
    icon: "/images/howstep3.png",
    tag: "Make Use of the App",
    body: "App where compassion meets convenience through technology",
  },
] as const;

const patientBenefits = [
  "Comprehensive Service Booking: Easily access detailed profiles of service providers, including their name, age, experience, and service locations, along with testimonials for added assurance.",
  "Flexible Listing Sorting: Customize your search by sorting listings based on location, services offered, price, and specialties. Refine options further by experience level and customer ratings for personalized care.",
  "Convenient In-App Transactions and Feedback: Seamlessly pay for services within the app using online payment options. After completion, rate your service provider and share your patient story to contribute to the community's collective experience and improvement.",
] as const;

const providerBenefits = [
  "Effortless Booking Management: Stay organized with easy access to booking requests and appointment schedules. Track patient updates and manage your schedule seamlessly with the in-built calendar feature.",
  "Transparent Earnings Overview: Keep track of your earnings, ratings, and reviews through an intuitive dashboard. Gain insights into your performance and patient feedback to continually enhance your services.",
  "Customized Service Provision: Tailor your services by updating your profile with additional certifications and specifying available time slots. Provide flexibility to patients by mentioning unbooked/free slots, enabling them to schedule appointments conveniently.",
] as const;

const whyElderly = [
  {
    title: "Automate all task",
    body:
      "Streamline scheduling, medication reminders, and daily check-ins with our automated care management features.",
  },
  {
    title: "Get notify lorem",
    body:
      "Stay informed with instant updates about your loved one's care, including health monitoring, appointments, and progress reports.",
  },
  {
    title: "Comprehensive care support",
    body:
      "Access a wide range of resources and services tailored to the unique needs of elderly care, ensuring peace of mind for families and professionals alike.",
  },
] as const;

export default function ElderlyWellnessPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-y">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <h1 className="mb-4 font-[family-name:var(--font-serif)] text-3xl leading-tight sm:text-4xl md:text-5xl">
                Elderly Wellness{" "}
                <span className="block text-[color:var(--color-brand)]">
                  Your <br />
                  Gateway to Quality Care
                </span>
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
                At Elderly, we bring together two powerful apps designed to
                provide comprehensive health and home care solutions for the
                elderly and a robust platform for care professionals to grow
                and succeed.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="rounded-[var(--radius-lg)] bg-[color:var(--color-highlight)] p-6 text-center">
                <h3 className="mb-2 font-[family-name:var(--font-serif)] text-2xl text-[color:var(--color-brand)]">
                  100+ Service providers registered
                </h3>
                <p className="text-sm text-[color:var(--color-muted-foreground)]">
                  The best application to manage your customer worldwide
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* App Feature */}
      <section className="section-y">
        <Container>
          <SectionTitle heading="App Feature" />
          <div className="mt-5 grid grid-cols-1 gap-6 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="mb-3 font-[family-name:var(--font-serif)] text-xl font-semibold">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="section-y">
        <Container>
          <div className="mb-6 text-center sm:mb-8">
            <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl">
              How it works in 3 steps
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.step}
                className="relative rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-card)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-border)]">
                  <Image
                    quality={95}
                    src={s.icon}
                    alt=""
                    width={28}
                    height={28}
                    unoptimized
                    className="h-6 w-6 object-contain"
                  />
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-serif)] text-2xl">
                  {s.title}
                </h3>
                {"apps" in s && s.apps ? (
                  <ul className="mb-3 flex gap-2">
                    <li>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.elderly.nri"
                        aria-label="Get it on Google Play"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-brand)] hover:bg-[color:var(--color-muted)]"
                      >
                        <i
                          className="icofont-brand-android-robot"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://apps.apple.com/in/app/elderly-care-plus/id6740391242"
                        aria-label="Download on the App Store"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-brand)] hover:bg-[color:var(--color-muted)]"
                      >
                        <i
                          className="icofont-brand-apple"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </li>
                  </ul>
                ) : null}
                {"tag" in s && s.tag ? (
                  <span className="mb-2 block text-sm font-semibold text-[color:var(--color-brand)]">
                    {s.tag}
                  </span>
                ) : null}
                <p className="text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
                  {s.body}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-6 font-[family-name:var(--font-display)] text-4xl text-[color:var(--color-brand)]/20"
                >
                  {s.step}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Premium Services — Patients */}
      <section className="section-y">
        <Container>
          <SectionTitle
            badge="Services"
            heading={
              <>
                Premium{" "}
                <span className="text-[color:var(--color-brand)]">
                  services
                </span>{" "}
                of <br />
                Elderly
              </>
            }
          />

          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-8">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-highlight)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand)]">
                <i className="icofont-tasks-alt" aria-hidden="true"></i>
                <span>Elderly for Patients</span>
              </div>
              <h3 className="mb-4 font-[family-name:var(--font-serif)] text-2xl leading-tight sm:text-3xl">
                <span className="text-[color:var(--color-brand)]">
                  Personalized Booking,
                </span>{" "}
                Tailored Sorting, and Seamless Engagement
              </h3>
              <ul className="space-y-4">
                {patientBenefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-base leading-relaxed text-[color:var(--color-foreground)]"
                  >
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-xs text-white">
                      <i className="icofont-ui-check" aria-hidden="true"></i>
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Image quality={95}
                src="/images/service1.png"
                alt="Elderly for Patients app preview"
                width={720}
                height={720}
                className="mx-auto w-full max-w-[520px]"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-8">
            <div className="order-1 md:order-2">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-highlight)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand)]">
                <i className="icofont-ui-clock" aria-hidden="true"></i>
                <span>Elderly for Service Providers</span>
              </div>
              <h3 className="mb-4 font-[family-name:var(--font-serif)] text-2xl leading-tight sm:text-3xl">
                <span className="text-[color:var(--color-brand)]">
                  Streamlined Booking Management,
                </span>{" "}
                Transparent Earnings, and Customized Service Provision
              </h3>
              <ul className="space-y-4">
                {providerBenefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-base leading-relaxed text-[color:var(--color-foreground)]"
                  >
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-xs text-white">
                      <i
                        className="icofont-check-circled"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-2 md:order-1">
              <Image quality={95}
                src="/images/service2.png"
                alt="Elderly for Service Providers app preview"
                width={720}
                height={720}
                className="mx-auto w-full max-w-[520px]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Why Elderly */}
      <section className="section-y">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start md:gap-8">
            <div>
              <h2 className="mb-4 font-[family-name:var(--font-serif)] text-3xl sm:text-4xl">
                <span className="text-[color:var(--color-brand)]">Why</span>{" "}
                Elderly?
              </h2>
              <p className="mb-6 text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
                Whether you are a family member looking for trusted elderly
                care services or a healthcare professional aiming to expand
                your career, the Elderly Wellness and CarePros apps are your
                ideal partners. Download today to experience care excellence
                and professional growth like never before!
              </p>
              <ul className="space-y-6">
                {whyElderly.map((w) => (
                  <li key={w.title} className="flex items-start gap-4">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-white">
                      <i className="icofont-ui-check" aria-hidden="true"></i>
                    </span>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold">
                        {w.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
                        {w.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
      <WhyChooseApp />
    </div>
  );
}
