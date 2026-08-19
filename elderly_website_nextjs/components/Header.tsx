import Image from "next/image";
import Link from "next/link";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/data/site";
import { Container } from "./Container";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-border)] bg-white shadow-[var(--shadow-header)]">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Elderly Wellness — home"
        >
          <Image
            src="/images/logo.png"
            alt="Elderly Wellness"
            width={180}
            height={48}
            quality={95}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={SITE_PHONE_TEL}
            className="hidden items-center gap-1.5 text-sm font-bold text-[color:var(--color-brand)] xl:inline-flex"
          >
            {SITE_PHONE}
          </a>
          <Link
            href="/contact/"
            className="btn-brand hidden rounded-full px-5 py-2 text-sm font-semibold shadow-[var(--shadow-card)] sm:inline-flex"
          >
            Book Care
          </Link>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
