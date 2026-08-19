import { APP_LINKS } from "@/data/site";

type Kind = "google-play" | "app-store";

interface StoreBadgeProps {
  kind: Kind;
  size?: "sm" | "md";
}

const BADGES: Record<
  Kind,
  { href: string; src: string; alt: string; width: number; height: number }
> = {
  "google-play": {
    href: APP_LINKS.googlePlay,
    src: "/images/store/google-play-badge.svg",
    alt: "Get it on Google Play",
    width: 180,
    height: 53,
  },
  "app-store": {
    href: APP_LINKS.appStore,
    src: "/images/store/app-store-badge.svg",
    alt: "Download on the App Store",
    width: 135,
    height: 40,
  },
};

/**
 * Official Google Play / App Store badges (vector). Rendered as <img>
 * so Next does not recompress them.
 */
export function StoreBadge({ kind, size = "md" }: StoreBadgeProps) {
  const badge = BADGES[kind];
  const heightClass = size === "md" ? "h-12" : "h-10";

  return (
    <a
      href={badge.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={badge.alt}
      className="inline-block leading-none"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={badge.src}
        alt={badge.alt}
        width={badge.width}
        height={badge.height}
        className={`${heightClass} w-auto`}
      />
    </a>
  );
}
