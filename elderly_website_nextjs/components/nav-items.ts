/**
 * Nav structure extracted from about.html (lines 74–145) and cross-verified
 * against index.html — identical items, identical order.
 *
 * `href` values are already remapped to the Next.js clean-path routes that
 * Phase 3 will implement. See docs/MIGRATION_INVENTORY.md §1 for the
 * .html → clean-path mapping.
 */

export interface NavChild {
  readonly label: string;
  readonly href: string;
}

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly children?: readonly NavChild[];
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/" },
  {
    label: "Services",
    href: "#",
    children: [
      { label: "Physiotherapy", href: "/physiotherapy-services-for-elders/" },
      { label: "Nursing Service", href: "/nursing-services-for-elders/" },
      { label: "Geriatric Care", href: "/geriatric-care-services-for-elders/" },
      {
        label: "Assisted Living Support",
        href: "/assisted-living-support-services-for-elders/",
      },
    ],
  },
  {
    label: "Locations",
    href: "#",
    children: [
      { label: "Chennai", href: "/blogs/elderly-care-services-in-chennai/" },
    ],
  },
  { label: "Board of Advisors", href: "/board-of-advisors/" },
  { label: "Investors", href: "/investors/" },
  { label: "Blogs", href: "/blogs/" },
  { label: "Contact Us", href: "/contact/" },
];
