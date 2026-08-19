import { SOCIAL_LINKS } from "@/data/site";
import { SocialIcon } from "./icons";

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className = "" }: SocialLinksProps) {
  const classes = ["flex flex-wrap items-center gap-3", className]
    .filter(Boolean)
    .join(" ");
  return (
    <ul className={classes}>
      {SOCIAL_LINKS.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-[color:var(--color-brand)]"
          >
            <SocialIcon name={link.icon} className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
