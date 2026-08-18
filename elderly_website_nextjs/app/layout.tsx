import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { SITE_EMAIL, SITE_PHONE, SOCIAL_LINKS } from "@/data/site";
import { cormorant, playball } from "./fonts";
import "./globals.css";

const description =
  "Contact us today at +91 99448 90577 for expert elder care services in Chennai. Elderly Wellness provides compassionate and personalized care for your loved ones.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Elder Care Services in Chennai`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description:
      "Discover trusted elderly care services in Chennai and explore wellness blogs dedicated to senior health, safety, and holistic well-being.",
    url: SITE_URL,
    images: [{ url: "/images/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description,
    images: ["/images/logo.png"],
  },
};

const organizationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo.png`,
  email: SITE_EMAIL,
  telephone: SITE_PHONE,
  sameAs: SOCIAL_LINKS.map((link) => link.href),
};

const websiteSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playball.variable}`}
    >
      <body>
        <JsonLd id="organization-schema" data={organizationSchema} />
        <JsonLd id="website-schema" data={websiteSchema} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
