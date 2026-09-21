import { PRIMARY_SERVICES } from "@/data/primary-services";

export interface NavChild {
  readonly label: string;
  readonly href: string;
  readonly hint?: string;
}

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly children?: readonly NavChild[];
}

/** Matches site header — service labels stay in sync with PRIMARY_SERVICES. */
export const NAV_ITEMS: readonly NavItem[] = [
  {
    label: "Services",
    href: "/#elder-care-services",
    children: PRIMARY_SERVICES.map((s) => ({
      label: s.navLabel,
      href: s.href,
      hint: s.navHint,
    })),
  },
  { label: "How It Works", href: "/how-elderly-wellness-works/" },
  { label: "About", href: "/about/" },
  { label: "Blogs", href: "/blogs/" },
  { label: "Serving Chennai", href: "/locations/chennai/" },
];
