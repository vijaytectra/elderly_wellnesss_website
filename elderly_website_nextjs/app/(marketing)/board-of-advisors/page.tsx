import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { IconLinkedin } from "@/components/icons";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { aboutPageSchema, breadcrumbSchema, orgRef } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Our Board of Advisors | Elderly Wellness",
  description:
    "Trusting a service with your parent means knowing who stands behind it. Meet the healthcare and eldercare advisors guiding how Elderly Wellness is run.",
  ogTitle: "The People Behind the Standards",
  ogDescription:
    "Healthcare, geriatric and business advisors shaping how Elderly Wellness trains and vets its caregivers.",
  path: "/board-of-advisors/",
});

interface Advisor {
  name: string;
  role: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  linkedin?: string;
}

const advisors: readonly Advisor[] = [
  {
    name: "Suresh Samuel",
    role: "Executive Leadership, Higher Education Management, Healthcare Services & Digital Solutions",
    image: "/images/suresh.jpg",
    alt: "Suresh Samuel",
    width: 640,
    height: 640,
    linkedin: "https://www.linkedin.com/in/suresh-samuel-b853031/",
  },
  {
    name: "Dr Jothi Clara Micheal",
    role: "Director of Nursing, IHH Healthcare India",
    image: "/images/jothi.jpeg",
    alt: "Dr Jothi Clara Micheal",
    width: 640,
    height: 640,
    linkedin: "https://in.linkedin.com/in/jothi-clara-michael-82154231",
  },
  {
    name: "Harish",
    role: "Advisor - GTM",
    image: "/images/Shri-harish.png",
    alt: "Harish",
    width: 640,
    height: 640,
  },
  {
    name: "Rajaram",
    role: "Advisor - Business Operations & Scaling",
    image: "/images/Rajaraman-Sundaresan.png",
    alt: "Rajaram",
    width: 640,
    height: 640,
  },
  {
    name: "Deepa",
    role: "Head of Quality & Services",
    image: "/images/Deepa.png",
    alt: "Deepa",
    width: 640,
    height: 640,
  },
];

const PATH = "/board-of-advisors/";

// Person entries are built from the advisor list rendered on this page —
// real names, real roles, real LinkedIn profiles. Nothing is invented.
const pageSchemas = [
  aboutPageSchema({
    path: PATH,
    name: "Board of Advisors",
    description:
      "The healthcare, geriatric and business advisors guiding how Elderly Wellness trains, vets and deploys its care professionals in Chennai.",
  }),
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}${PATH}#advisors`,
    name: "Board of Advisors",
    itemListElement: advisors.map((advisor, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: advisor.name,
        jobTitle: advisor.role,
        image: `${SITE_URL}${advisor.image}`,
        affiliation: orgRef,
        ...(advisor.linkedin ? { sameAs: [advisor.linkedin] } : {}),
      },
    })),
  },
  breadcrumbSchema([{ name: "Board Of Advisors", path: PATH }]),
];

export default function BoardOfAdvisorsPage() {
  return (
    <div>
      <JsonLd id="page-schema" data={pageSchemas} />
      <section className="pt-6 sm:pt-10">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Board Of Advisors" },
            ]}
          />
        </Container>
      </section>
      <section className="section-y">
        <Container>
          <SectionTitle
            badge="Board of Advisors"
            heading={
              <>
                Introducing the Esteemed Board of Advisors{" "}
                <br />
                <span className="text-[color:var(--color-brand)]">
                  Steering Elderly&apos;s Vision of Empathetic Elder Care
                </span>
              </>
            }
          />
        </Container>
      </section>

      <section className="pb-4 sm:pb-6">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {advisors.map((a, idx) => (
              <div
                key={a.name}
                className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-card)] transition hover:shadow-lg"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--color-muted)] sm:aspect-square">
                  <Image
                    quality={95}
                    unoptimized
                    src={a.image}
                    alt={a.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                    className="object-cover object-top"
                    priority={idx === 0}
                  />
                </div>
                <div className="flex flex-col items-start gap-2 p-6">
                  <h3 className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[color:var(--color-foreground)]">
                    {a.name}
                  </h3>
                  <span className="text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
                    {a.role}
                  </span>
                  {a.linkedin ? (
                    <ul className="mt-3 flex gap-2">
                      <li>
                        <a
                          href={a.linkedin}
                          target="_blank"
                          rel="noopener"
                          aria-label={`${a.name} on LinkedIn`}
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
    </div>
  );
}
