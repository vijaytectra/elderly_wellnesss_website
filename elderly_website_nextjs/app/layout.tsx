import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { StickyBookingBar } from "@/components/StickyBookingBar";
import { SITE_EMAIL, SOCIAL_LINKS } from "@/data/site";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { cormorant, manrope, playball } from "./fonts";
import "./globals.css";

const CallbackForm = dynamic(
  () => import("@/components/CallbackForm").then((mod) => mod.CallbackForm),
  { ssr: true },
);

const description =
  "Home nursing, physiotherapy, geriatric care, and assisted living in Chennai. Police-verified caregivers, 2-hour replacement, no lock-in. Call +91 99448 90577.";

export const viewport: Viewport = {
  themeColor: "#2786a5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} | Elder Care Services in Chennai`,
  description,
  keywords: [
    "elderly care Chennai",
    "home nursing Chennai",
    "physiotherapy at home",
    "geriatric care",
    "assisted living support",
    "Elderly Wellness",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Elder Care Services in Chennai`,
    description,
    url: SITE_URL,
    images: [{ url: "/images/logo.png", alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Elder Care Services in Chennai`,
    description,
    images: ["/images/logo.png"],
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

const organizationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "HomeHealthCareService",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/logo.png`,
  email: SITE_EMAIL,
  telephone: "+91-99448-90577",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "4214, 21st Floor, Tower 4, TVH Ouranya Bay, Rajiv Gandhi Salai, OMR, Padur Kazhipattur",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "603103",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.837,
    longitude: 80.229,
  },
  areaServed: {
    "@type": "City",
    name: "Chennai",
  },
  sameAs: SOCIAL_LINKS.map((link) => link.href),
};

const websiteSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${manrope.variable} ${cormorant.variable} ${playball.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <JsonLd id="organization-schema" data={organizationSchema} />
        <JsonLd id="website-schema" data={websiteSchema} />
        <Header />
        <main id="main">{children}</main>
        <CallbackForm />
        <Footer />
        <StickyBookingBar />
      </body>
    </html>
  );
}
