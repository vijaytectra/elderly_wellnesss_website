import type { ReactNode } from "react";

interface IconProps {
  className?: string;
}

function Svg({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-[1em] w-[1em]"}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconFacebook({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Svg>
  );
}

export function IconTwitter({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 4l11.5 16H20L8.5 4H4zM4 20l6.75-7.35M13.1 11.15 20 4" />
    </Svg>
  );
}

export function IconInstagram({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconLinkedin({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </Svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M20 6 9 17l-5-5" />
    </Svg>
  );
}

export function IconCheckCircle({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" />
    </Svg>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Svg>
  );
}

export function IconGear({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
    </Svg>
  );
}

export function IconTasks({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
    </Svg>
  );
}

export function IconAndroid({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M7 8h10v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8z" />
      <path d="m8 4 1.5 3M16 4l-1.5 3M7 13H5M19 13h-2" />
    </Svg>
  );
}

export function IconApple({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 4c1.5-2 4-2 4-2s.2 2.2-1.2 3.6C13.4 7 11 6.5 11 6.5M8 20c-2-1-3-3.2-3-6 0-3.4 2.4-6 5.2-6 1.2 0 2.2.4 2.8.4s1.7-.5 2.9-.5c1.6 0 3.1.8 4 2.1-2.8 1.6-2.3 5.8.6 7.1-.8 2.3-2.2 4.8-4.5 4.8-1.2 0-1.8-.6-3.2-.6S10.6 22 9.5 22C8.5 22 7.2 20.7 8 20z" />
    </Svg>
  );
}

export function IconChevronDown({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  );
}

const SOCIAL_ICONS = {
  facebook: IconFacebook,
  twitter: IconTwitter,
  instagram: IconInstagram,
  linkedin: IconLinkedin,
} as const;

export function SocialIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = SOCIAL_ICONS[name as keyof typeof SOCIAL_ICONS] ?? IconFacebook;
  return <Cmp className={className} />;
}
