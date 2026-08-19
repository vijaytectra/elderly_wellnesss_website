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

/** Matches live https://www.theelderlywellness.com/ header. */
export const NAV_ITEMS: readonly NavItem[] = [
  {
    label: "Services",
    href: "/#elder-care-services",
    children: [
      {
        label: "Physiotherapy",
        href: "/physiotherapy-services-for-elders/",
        hint: "Mobility, pain relief & recovery after surgery",
      },
      {
        label: "Nursing Service",
        href: "/nursing-services-for-elders/",
        hint: "24/7 professional in-home medical care",
      },
      {
        label: "Geriatric Care",
        href: "/geriatric-care-services-for-elders/",
        hint: "Comprehensive elder health & wellness support",
      },
      {
        label: "Assisted Living Support",
        href: "/assisted-living-support-services-for-elders/",
        hint: "Daily living assistance & compassionate care",
      },
    ],
  },
  { label: "How It Works", href: "/how-elderly-wellness-works/" },
  { label: "About", href: "/about/" },
  { label: "Blogs", href: "/blogs/" },
  { label: "Serving Chennai", href: "/locations/chennai/" },
];
