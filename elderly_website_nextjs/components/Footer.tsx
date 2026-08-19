import Image from "next/image";
import Link from "next/link";
import {
  BROCHURE_HREF,
  DEVELOPER_CREDIT,
  SITE_EMAIL,
  SITE_PHONE,
  SITE_PHONE_TEL,
} from "@/data/site";
import { Container } from "./Container";
import { SocialLinks } from "./SocialLinks";
import { StoreBadge } from "./StoreBadge";

const quickLinks: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  {
    label: "Refund & Cancellation Policy",
    href: "/refund-and-cancellation-policy/",
  },
  { label: "Terms & Conditions", href: "/terms-and-conditions/" },
  { label: "Contact Us", href: "/contact/" },
];

/**
 * Site-wide footer. Structure and content mirror about.html:991–1081:
 *   col 1 — logo + Contact Us (phone, email, socials)
 *   col 2 — Quick Links (legal + Contact)
 *   col 3 — Download app (Google Play + App Store)
 *   bottom bar — copyright + developer credit
 */
export function Footer() {
  return (
    <footer className="bg-[color:var(--color-foreground)] pb-24 text-white md:pb-0">
      <Container className="section-y">
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="Elderly Wellness — home">
              <Image quality={80}
                src="/images/ft_logo.png"
                alt="Elderly Wellness"
                width={180}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
            <h3 className="mt-6 mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={SITE_PHONE_TEL}
                  className="text-white/85 transition-colors hover:text-white"
                >
                  {SITE_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="text-white/85 transition-colors hover:text-white"
                >
                  {SITE_EMAIL}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={BROCHURE_HREF}
                  download="elderly_wellness.pdf"
                  className="text-white/85 transition-colors hover:text-white"
                >
                  Company Brochure (PDF, 3.2 MB)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Download app</h3>
            <ul className="flex flex-wrap items-center gap-3">
              <li>
                <StoreBadge kind="google-play" size="md" />
              </li>
              <li>
                <StoreBadge kind="app-store" size="md" />
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-4 text-xs text-white/70 sm:flex-row">
          <p>© Copyrights 2026. All rights reserved.</p>
          <p>
            Developed by{" "}
            <a
              href={DEVELOPER_CREDIT.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors hover:text-[color:var(--color-brand)]"
            >
              {DEVELOPER_CREDIT.name}
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
