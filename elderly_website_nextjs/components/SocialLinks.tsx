import { SOCIAL_LINKS } from "@/data/site";

interface SocialLinksProps {
  className?: string;
}

/**
 * Renders the site's social icon row using the IcoFont icon set loaded in
 * `app/globals.css`. Mirrors the footer social row in about.html:1012–1025.
 */
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
            <i className={`icofont-${link.icon}`} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
