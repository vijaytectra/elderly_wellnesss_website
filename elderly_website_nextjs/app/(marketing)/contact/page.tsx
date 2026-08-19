import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Get in Touch with Elderly Wellness for Care and Support",
  description:
    "Request a callback from Elderly Wellness. A senior care specialist in Chennai will reach out about physiotherapy, nursing, geriatric care, or assisted living.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <section className="pt-6 pb-2 sm:pt-8">
      <Container>
        <SectionTitle
          badge="Book Care"
          heading={
            <>
              Request a callback from our{" "}
              <span className="text-[color:var(--color-brand)]">
                Chennai care team
              </span>
            </>
          }
          description={
            <p>
              Leave your details in the form below, chat on WhatsApp, or call{" "}
              <a
                href={SITE_PHONE_TEL}
                className="font-semibold text-[color:var(--color-brand)]"
              >
                {SITE_PHONE}
              </a>
              . We typically respond within 2 hours.
            </p>
          }
        />
      </Container>
    </section>
  );
}
