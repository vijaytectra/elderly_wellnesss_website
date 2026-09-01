import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DeferredCallbackForm } from "@/components/DeferredCallbackForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { StickyBookingBar } from "@/components/StickyBookingBar";
import { SITE_EMAIL, SOCIAL_LINKS } from "@/data/site";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { cormorant, manrope, playball } from "./fonts";
import "./globals.css";

const GTM_ID = "GTM-5G9CTKBR";
const GOOGLE_SITE_VERIFICATION =
  "BgdLTr1rRUPNF1uD96e921lVhaEuBoFSUE8OHHpD1k0";

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
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
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
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
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
        <DeferredCallbackForm />
        <Footer />
        <StickyBookingBar />
        {/* Google Tag Manager */}
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </body>
    </html>
  );
}
