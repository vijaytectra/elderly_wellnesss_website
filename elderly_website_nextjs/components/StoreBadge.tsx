import Image from "next/image";
import { APP_LINKS } from "@/data/site";

type Kind = "google-play" | "app-store";

interface StoreBadgeProps {
  kind: Kind;
  /** Visual size preset. `md` matches hero CTAs, `sm` matches inline strips. */
  size?: "sm" | "md";
}

const LABELS: Record<Kind, { top: string; bottom: string; href: string; icon: string; alt: string }> = {
  "google-play": {
    top: "GET IT ON",
    bottom: "Google Play",
    href: APP_LINKS.googlePlay,
    icon: "/images/googleplay.png",
    alt: "Google Play",
  },
  "app-store": {
    top: "Download on the",
    bottom: "App Store",
    href: APP_LINKS.appStore,
    icon: "/images/appstorebtn.png",
    alt: "App Store",
  },
};

/**
 * Consistent dark-pill app-store badge. Source assets are just tiny 150x36
 * icons, so we wrap them with the descriptive text on a dark background so
 * the badge is recognizable at any size (source's bare icons looked lost).
 */
export function StoreBadge({ kind, size = "md" }: StoreBadgeProps) {
  const meta = LABELS[kind];
  const dims =
    size === "md"
      ? { pad: "px-5 py-2.5", iconBox: "h-8 w-8", top: "text-[10px]", bottom: "text-base" }
      : { pad: "px-4 py-2", iconBox: "h-6 w-6", top: "text-[9px]", bottom: "text-sm" };

  return (
    <a
      href={meta.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Get the Elderly Wellness app on ${meta.alt}`}
      className={`inline-flex items-center gap-3 rounded-[var(--radius-md)] bg-black text-white shadow-[var(--shadow-card)] transition-transform hover:scale-[1.03] ${dims.pad}`}
    >
      <span className={`relative ${dims.iconBox} shrink-0`}>
        <Image
          src={meta.icon}
          alt=""
          fill
          sizes="32px"
          quality={95}
          className="object-contain"
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`${dims.top} font-medium uppercase tracking-wider text-white/85`}>
          {meta.top}
        </span>
        <span className={`${dims.bottom} font-semibold`}>{meta.bottom}</span>
      </span>
    </a>
  );
}
