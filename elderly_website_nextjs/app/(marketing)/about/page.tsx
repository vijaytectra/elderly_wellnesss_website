import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { ServiceFAQ } from "@/components/sections/ServiceFAQ";
import { WhyChooseApp } from "@/components/sections/WhyChooseApp";
import { IconGear, IconLinkedin } from "@/components/icons";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Elderly: Supporting Health & Wellness for the Elderly",
  description:
    "Learn how Elderly is transforming elderly care with professional physiotherapists, caregivers, and nursing assistants. Tailored services ensuring dignity and care.",
  path: "/about/",
});

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

const team: readonly TeamMember[] = [
  {
    name: "Santosh Kumar",
    role: "Founder & CEO",
    image: "/images/profile/1.png",
    linkedin: "https://www.linkedin.com/in/santosh-kumar-94168b39/",
  },
  {
    name: "Jaffar A",
    role: "Product Architect",
    image: "/images/profile/3.png",
  },
  {
    name: "Andrew Athisayaraj",
    role: "Data Analyst",
    image: "/images/profile/4.png",
    linkedin: "https://www.linkedin.com/in/andrewathisayaraj/",
  },
  {
    name: "Deugul",
    role: "Business Operation",
    image: "/images/profile/5.png",
    linkedin:
      "https://www.linkedin.com/in/deugul-b-s-219462190?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Danny Lalwani",
    role: "Technical Architect",
    image: "/images/profile/Danny.png",
    linkedin: "https://www.linkedin.com/in/danny-lalwani/",
  },
];

const slides = [
  { src: "/images/abt-slide1.jpg", alt: "Elderly care moment" },
  { src: "/images/abt-slide2.jpg", alt: "Elderly care moment" },
  { src: "/images/abt-slide3.jpg", alt: "Elderly care moment" },
  { src: "/images/abt-slide4.jpg", alt: "Elderly care moment" },
] as const;

interface FaqItem {
  q: string;
  a: string;
}

const faqs: readonly FaqItem[] = [
  {
    q: "What happens after I sign up and select the service I need?",
    a: "Once you sign up and select the service you need, our Elderly Wellness specialist will call you. The specialist will discuss your requirements and assign the most suitable physiotherapist, nurse, or caregiver based on the elderly person's needs and preferences.",
  },
  {
    q: "Can I book more than one session in a day?",
    a: "Yes, you can book multiple sessions for the same day. During the call with our specialist, you can confirm the availability of the service provider and schedule additional sessions if needed.",
  },
  {
    q: "How do I pay for the service?",
    a: "Once the service provider is assigned, you'll receive the details and can make a secure payment directly through the app. After the payment is confirmed, the booking will be finalized.",
  },
  {
    q: "How can I change the contact information or address of the elderly person?",
    a: "You can update the contact details and address of the elderly person directly in your account settings within the app. Please ensure that these details are updated before finalizing any service bookings.",
  },
  {
    q: "How do I track the status of my booking or service?",
    a: "Once the service provider is assigned, you will receive notifications via the app about their arrival time and status updates. You can track the status of the service through the app, including real-time updates as the session progresses.",
  },
  {
    q: "How will I know which service provider is assigned to my booking?",
    a: "After our Elderly Wellness specialist contacts you, they will assign a service provider based on the elderly person's needs. You will receive the details of the physiotherapist, nurse, or caregiver, including their profile, qualifications, and experience in the app.",
  },
  {
    q: "What if the service provider does not arrive on time?",
    a: "If there is any delay, you will be notified via the app. In case of significant delays, please contact our customer support team for assistance, and we'll help resolve the issue.",
  },
  {
    q: "Can I request the same service provider for future sessions?",
    a: "Yes, you can request the same service provider for future sessions by noting their profile and mentioning it when booking. If the provider is available, they can be scheduled for additional sessions.",
  },
  {
    q: "Is my payment information safe?",
    a: "Yes, all payment transactions are processed securely through encrypted methods. Your payment and personal information are fully protected and stored securely according to the highest standards of privacy and security.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* About us hero */}
      <section className="section-y">
        <Container>
          <SectionTitle
            badge="About us"
            heading={
              <>
                Elderly <br />
                <span className="text-[color:var(--color-brand)]">
                  Where Age meets Assistance
                </span>
              </>
            }
            description={
              <p>
                Elderly Wellness is a comprehensive platform that connects
                families with professional, vetted caregivers providing nursing
                care, physiotherapy, and assisted living support—all in the
                comfort of home.
              </p>
            }
          />
        </Container>

        <div className="mt-5 overflow-hidden sm:mt-6">
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 px-4 sm:grid-cols-4">
            {slides.map((s, idx) => (
              <div
                key={s.src}
                className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)]"
              >
                <Image quality={95}
                  src={s.src}
                  alt={s.alt}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <Container className="mt-12">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <h2 className="font-[family-name:var(--font-serif)] text-2xl leading-tight sm:text-3xl">
                <span className="text-[color:var(--color-brand)]">
                  Our story
                </span>{" "}
                behind our success &amp; achievement
              </h2>
            </div>
            <div className="md:col-span-7 space-y-4">
              <p className="text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
                At Eldery, our story is deeply rooted in a personal journey of
                love, concern, and the relentless pursuit of a solution. It all
                began with a simple realization: the challenges of balancing a
                demanding career while ensuring the well-being of a beloved
                elderly parent.
              </p>
              <div>
                <Link
                  href="/blogs/journey-of-eldery/"
                  aria-label="Read more: the inspiring journey of Elderly"
                  className="btn-brand inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold shadow-[var(--shadow-card)]"
                >
                  Read More
                  <span className="sr-only">
                    {" "}
                    about the inspiring journey of Elderly
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <WhyChooseApp />

      {/* Process / Overview */}
      <section className="section-y">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-8">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-highlight)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand)]">
                <IconGear className="h-3.5 w-3.5" />
                <span>Process</span>
              </div>
              <h2 className="mb-4 font-[family-name:var(--font-serif)] text-3xl sm:text-4xl">
                <span className="text-[color:var(--color-brand)]">
                  Overview
                </span>
              </h2>
              <p className="mb-4 text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
                At Elderly Wellness, we&apos;re focused on making elderly care
                easy, reliable, and accessible. By connecting families with
                highly trained professionals who specialize in nursing care,
                physiotherapy, and assisted living support, we ensure peace of
                mind for families, and quality of life for seniors.
              </p>
              <p className="mb-4 text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
                Elderly Wellness offers a full range of services to meet the
                varied needs of elderly individuals, helping them live safely,
                independently, and with dignity at home. Our services include:
              </p>
              <ul className="mb-6 space-y-1 pl-5 text-base leading-relaxed text-[color:var(--color-foreground)] [list-style-type:disc]">
                <li>Physiotherapy</li>
                <li>Nursing Services</li>
                <li>Geriatric Care</li>
                <li>Assisted Living Support</li>
              </ul>
              <a
                href="https://play.google.com/store/apps/details?id=com.elderly.nri"
                className="btn-brand inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold shadow-[var(--shadow-card)]"
              >
                Download App
              </a>
            </div>
            <div>
              <Image quality={95}
                src="/images/process.png"
                alt="Elderly Wellness process overview"
                width={720}
                height={720}
                className="mx-auto w-full max-w-[560px] rounded-[var(--radius-lg)]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="section-y">
        <Container>
          <SectionTitle
            badge="Experts"
            heading={
              <>
                Meet{" "}
                <span className="text-[color:var(--color-brand)]">
                  our team
                </span>
              </>
            }
          />
          <div className="mt-5 grid grid-cols-1 gap-6 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <div
                key={m.name}
                className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-card)]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--color-muted)] sm:aspect-square">
                  <Image
                    quality={95}
                    unoptimized
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-col items-start gap-2 p-6">
                  <h3 className="font-[family-name:var(--font-serif)] text-xl font-semibold">
                    {m.name}
                  </h3>
                  <span className="text-sm text-[color:var(--color-muted-foreground)]">
                    {m.role}
                  </span>
                  {m.linkedin ? (
                    <ul className="mt-2 flex gap-2">
                      <li>
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener"
                          aria-label={`${m.name} on LinkedIn`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-white transition hover:bg-[color:var(--color-brand-dark)]"
                        >
                          <IconLinkedin className="h-4 w-4" />
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

      <ServiceFAQ items={faqs} />
    </div>
  );
}
