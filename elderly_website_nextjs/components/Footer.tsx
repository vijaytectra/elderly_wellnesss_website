import Image from "next/image";
import Link from "next/link";
import {
  APP_LINKS,
  DEVELOPER_CREDIT,
  SITE_EMAIL,
  SITE_PHONE,
  SITE_PHONE_TEL,
} from "@/data/site";
import { Container } from "./Container";
import { SocialLinks } from "./SocialLinks";

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
    <footer className="mt-20 bg-[color:var(--color-foreground)] text-white">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="Elderly Wellness — home">
              <Image
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
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Download app</h3>
            <ul className="flex flex-wrap items-center gap-3">
              <li>
                <a
                  href={APP_LINKS.googlePlay}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get the Elderly Wellness app on Google Play"
                >
                  <Image
                    src="/images/googleplay.png"
                    alt="Google Play"
                    width={160}
                    height={48}
                    className="h-12 w-auto"
                  />
                </a>
              </li>
              <li>
                <a
                  href={APP_LINKS.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get the Elderly Wellness app on the App Store"
                >
                  <Image
                    src="/images/appstorebtn.png"
                    alt="App Store"
                    width={160}
                    height={48}
                    className="h-12 w-auto"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-4 text-xs text-white/70 sm:flex-row">
          <p>© Copyrights 2024. All rights reserved.</p>
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
