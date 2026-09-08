/**
 * Central JSON-LD builders.
 *
 * Every page-level entity references the sitewide Organization by `@id`
 * rather than restating it, so the graph stays consistent and there is one
 * place to fix a brand fact.
 *
 * Deliberate omissions — do not "helpfully" add these back without a source:
 *  - No `address` / `geo` on the Organization. No postal address is published
 *    in visible copy anywhere on this site (see SITE_ADDRESS in data/site.ts),
 *    and schema must not assert facts the page does not show. Publish the
 *    address on /contact/ first, then add it here and switch the Organization
 *    back to a LocalBusiness subtype.
 *  - No `foundingDate`. No founding year is stated anywhere on the site.
 *  - No `aggregateRating` / `Review`. The site shows 3 testimonials; there is
 *    no verifiable review corpus behind a numeric rating.
 */
import { SITE_EMAIL, SITE_PHONE, SOCIAL_LINKS } from "@/data/site";
import { SITE_NAME, SITE_URL } from "./site";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Reference to the sitewide Organization, for use as provider/author/publisher. */
export const orgRef = { "@id": ORG_ID } as const;

function absolute(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/logo.png`,
    description:
      "A home elder-care service connecting families in Chennai with police-verified nurses, physiotherapists, caregivers, and geriatric-care specialists.",
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    areaServed: { "@type": "City", name: "Chennai" },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    publisher: orgRef,
    inLanguage: "en-IN",
  };
}

export interface BreadcrumbCrumb {
  name: string;
  path: string;
}

/**
 * Breadcrumb trail. Always pass the *real* URL path, not the nav path — a
 * breadcrumb that implies a URL structure the site doesn't have is worse than
 * none (the neighbourhood posts live under /blogs/, not /locations/).
 */
export function breadcrumbSchema(
  crumbs: readonly BreadcrumbCrumb[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map(
      (crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absolute(crumb.path),
      }),
    ),
  };
}

export interface ServiceSchemaInput {
  name: string;
  serviceType: string;
  description: string;
  path: string;
}

export function serviceSchema({
  name,
  serviceType,
  description,
  path,
}: ServiceSchemaInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absolute(path)}#service`,
    name,
    serviceType,
    description,
    provider: orgRef,
    areaServed: { "@type": "City", name: "Chennai" },
    url: absolute(path),
  };
}

export interface FaqEntry {
  q: string;
  a: string;
}

/**
 * FAQPage built from the Q&As actually rendered on the page.
 *
 * Note: Google removed FAQ rich results from Search in May 2026, so this
 * produces no SERP dropdown. It is here for entity understanding and
 * AI-citation value — do not sell it internally as a CTR win.
 */
export function faqPageSchema(
  path: string,
  items: readonly FaqEntry[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absolute(path)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export interface HowToStepInput {
  name: string;
  text: string;
}

/** Also rich-result-free since 2023 — added for structure, not CTR. */
export function howToSchema(
  path: string,
  name: string,
  description: string,
  steps: readonly HowToStepInput[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${absolute(path)}#howto`,
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function contactPageSchema(path: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${absolute(path)}#contactpage`,
    url: absolute(path),
    about: orgRef,
    mainEntity: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: SITE_PHONE,
      email: SITE_EMAIL,
      areaServed: "IN",
      availableLanguage: ["en", "ta"],
    },
  };
}

export interface AboutPageSchemaInput {
  path: string;
  name: string;
  description: string;
}

export function aboutPageSchema({
  path,
  name,
  description,
}: AboutPageSchemaInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${absolute(path)}#aboutpage`,
    url: absolute(path),
    name,
    description,
    about: orgRef,
  };
}
