import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CareersContent } from "@/components/CareersContent";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Careers & Healthcare Staff Requirements in Chennai | Elderly Wellness",
  description:
    "Join the Elderly Wellness healthcare team in Chennai. View service-wise staff requirements for ICU nurses, geriatric caregivers, post-op nurses, and physiotherapists.",
  ogTitle: "Careers at Elderly Wellness Chennai | We Are Hiring Nurses & Caregivers",
  ogDescription:
    "Explore healthcare job openings with competitive salary packages, verified safe home environments, and continuous clinical support across Chennai.",
  path: "/careers/",
});

const pageBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Careers" },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd
        id="careers-breadcrumbs"
        data={breadcrumbSchema([
          { name: "Careers", path: "/careers/" },
        ])}
      />

      <div className="bg-[color:var(--color-background)] pb-24">
        {/* Breadcrumb Header */}
        <section className="border-b border-[color:var(--color-border)] bg-white py-4 sm:py-6">
          <Container>
            <Breadcrumb items={pageBreadcrumbs} />
          </Container>
        </section>

        {/* Hero Section */}
        <section className="pt-10 pb-6 sm:pt-14 sm:pb-8">
          <Container>
            <SectionTitle
              badge="Careers at Elderly Wellness"
              heading={
                <>
                  Healthcare Careers &amp;{" "}
                  <span className="text-[color:var(--color-brand)]">
                    Service Staff Requirements
                  </span>
                </>
              }
              description={
                <>
                  We connect verified healthcare professionals with patients needing specialized care at home in Chennai. Review the exact clinical requirements, certifications, and responsibilities for each of our core services below.
                </>
              }
            />
          </Container>
        </section>

        {/* Main Careers Content & Interactive Application Form */}
        <section className="pt-2">
          <Container>
            <CareersContent />
          </Container>
        </section>
      </div>
    </>
  );
}
