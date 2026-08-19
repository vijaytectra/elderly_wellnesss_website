import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { SITE_PHONE_TEL } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Get in Touch with Elderly Wellness for Care and Support",
  description:
    "Contact Elderly Wellness for inquiries about our elderly care services or app support. We're here to help you and your loved ones receive the best care.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <div>
      {/* Contact Us intro + reach-out cards */}
      <section className="py-12 sm:py-16">
        <Container>
          <SectionTitle
            badge="Contact us"
            heading={
              <>
                Any query ?{" "}
                <span className="text-[color:var(--color-brand)]">
                  let&apos;s talk
                </span>
              </>
            }
            description={
              <p>
                If you have any questions or need assistance, feel free to
                reach out! We&apos;re here to help and provide the support you
                need.
              </p>
            }
          />

          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            <li className="flex flex-col items-center gap-3 rounded-[var(--radius-lg)] bg-white p-8 text-center shadow-[var(--shadow-card)]">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-brand)] shadow-[var(--shadow-card)]">
                <Image quality={95}
                  src="/images/mail_icon.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain"
                />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand)]">
                Email us
              </span>
              <a
                href="mailto:info@theelderlywellness.com"
                className="text-base font-semibold text-[color:var(--color-foreground)] hover:text-[color:var(--color-brand)]"
              >
                info@theelderlywellness.com
              </a>
            </li>

            <li className="flex flex-col items-center gap-3 rounded-[var(--radius-lg)] bg-white p-8 text-center shadow-[var(--shadow-card)]">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-brand)] shadow-[var(--shadow-card)]">
                <Image quality={95}
                  src="/images/phone_icon.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain"
                />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand)]">
                Call us
              </span>
              <a
                href={SITE_PHONE_TEL}
                className="text-base font-semibold text-[color:var(--color-foreground)] hover:text-[color:var(--color-brand)]"
              >
                +91 99448 90577
              </a>
            </li>

            <li className="flex flex-col items-center gap-3 rounded-[var(--radius-lg)] bg-white p-8 text-center shadow-[var(--shadow-card)]">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-brand)] shadow-[var(--shadow-card)]">
                <Image quality={95}
                  src="/images/location_icon.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain"
                />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand)]">
                Our location
              </span>
              <a
                className="text-sm font-semibold text-[color:var(--color-foreground)] hover:text-[color:var(--color-brand)]"
                target="_blank"
                href="https://www.google.com/maps"
                rel="noopener"
              >
                4214, 21st Floor, Tower 4, TVH Ouranya Bay, Rajiv Gandhi Salai,
                Old Mahabalipuram Road (OMR), Padur Kazhipattur, Chennai:
                603103 Tamilnadu, India
              </a>
              <div className="mt-2 text-sm text-[color:var(--color-foreground)]">
                <span className="text-[color:var(--color-brand)]">GST NO.</span>{" "}
                - 33AAICE1680K1ZK
              </div>
            </li>
          </ul>
        </Container>
      </section>

      {/* Contact form */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="rounded-[var(--radius-lg)] bg-[color:var(--color-highlight)] p-6 sm:p-10 lg:p-14">
            <SectionTitle
              badge="Message us"
              heading={<>Drop a message us</>}
              description={<p>Fill up form below, our team will get back soon</p>}
            />
            <div className="mx-auto mt-10 max-w-5xl">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Anchor target for the site-wide "Download" button in the header */}
      <section id="download-btn" className="py-4">
        <Container>
          <p className="sr-only">
            Download the Elderly Wellness app. Links to the Google Play Store and
            Apple App Store are available in the footer.
          </p>
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-[color:var(--color-brand)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-card)] transition-colors hover:bg-[color:var(--color-brand-dark)]"
            >
              Back to home
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
