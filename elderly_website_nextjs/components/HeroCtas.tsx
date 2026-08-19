import Link from "next/link";
import { SITE_PHONE_TEL } from "@/data/site";

const headsetIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const phoneIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

interface HeroCtasProps {
  primaryHref?: string;
  primaryLabel?: string;
  callLabel?: string;
}

export function HeroCtas({
  primaryHref = "/contact/",
  primaryLabel = "Request a Callback",
  callLabel = "Call Now",
}: HeroCtasProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={primaryHref}
        className="btn-brand inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-[var(--shadow-card)]"
      >
        {headsetIcon}
        {primaryLabel}
      </Link>
      <a
        href={SITE_PHONE_TEL}
        className="btn-dark inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-[var(--shadow-card)]"
      >
        {phoneIcon}
        {callLabel}
      </a>
    </div>
  );
}
