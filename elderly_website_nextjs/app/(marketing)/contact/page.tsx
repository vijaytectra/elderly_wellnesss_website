import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Contact Elderly Wellness | Chennai Elder Care",
  description:
    "Tell us what your parent needs and a senior care specialist in Chennai will call you back about physiotherapy, nursing, geriatric care or assisted living.",
  ogTitle: "Talk to a Senior Care Specialist",
  ogDescription:
    "Request a callback and we will help you work out what level of care your parent actually needs.",
  path: "/contact/",
});

const PATH = "/contact/";

// ContactPoint only — no PostalAddress. No street address is published in
// visible copy anywhere on this site, and schema must not assert what the
// page does not show. See lib/schema.ts.
const pageSchemas = [
  contactPageSchema(PATH),
  breadcrumbSchema([{ name: "Contact", path: PATH }]),
];

export default function ContactPage() {
  return (
    <section className="pt-6 pb-2 sm:pt-8">
      <JsonLd id="page-schema" data={pageSchemas} />
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
