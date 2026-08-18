import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { inter } from "./fonts";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Header goes here — Phase 2b (Shared UI) */}
        {children}
        {/* Footer goes here — Phase 2b (Shared UI) */}
      </body>
    </html>
  );
}
