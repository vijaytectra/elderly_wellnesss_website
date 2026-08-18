import Image from "next/image";
import Link from "next/link";
import { BROCHURE_HREF } from "@/data/site";
import { Container } from "./Container";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

/**
 * Site-wide sticky header. Structure mirrors about.html:70–149:
 *   [ logo ] [ desktop nav ] [ Download CTA ]      (mobile: hamburger)
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-border)] bg-white/95 backdrop-blur shadow-[var(--shadow-header)]">
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
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2">
          <a
            href={BROCHURE_HREF}
            download="elderly_wellness.pdf"
            className="hidden rounded-full bg-[color:var(--color-brand)] px-5 py-2 text-sm font-semibold text-[color:var(--color-brand-foreground)] shadow-[var(--shadow-card)] transition-colors hover:bg-[color:var(--color-brand-dark)] sm:inline-flex"
          >
            Download
          </a>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
