/**
 * Site-wide constants extracted from the source HTML footers/headers.
 * Do not invent values here — every URL, phone, or email must appear in the
 * legacy static site.
 *
 * Sources:
 *  - about.html footer (phone, email, socials, app links)
 *  - about.html header (nav items, brochure download)
 */

export const SITE_PHONE = "+91 99448 90577";
/** `tel:` href-friendly form (no spaces, includes country code) */
export const SITE_PHONE_TEL = "tel:919944890577";

export const SITE_EMAIL = "info@theelderlywellness.com";

/**
 * The legacy footer does not print a postal address; only phone + email.
 * Left null intentionally so Footer components can conditionally render it
 * once (if ever) real address copy is provided by the business.
 */
export const SITE_ADDRESS: string | null = null;

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  /** icofont class name without the `icofont-` prefix, e.g. "facebook" */
  readonly icon: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: "Elderly Wellness on Facebook",
    href: "https://www.facebook.com/profile.php?id=100089074061784",
    icon: "facebook",
  },
  {
    label: "Elderly Wellness on X",
    href: "https://x.com/elderly____?s=11",
    icon: "twitter",
  },
  {
    label: "Elderly Wellness on Instagram",
    href: "https://www.instagram.com/elderly__wellness?igsh=MW43cmZpb2liaGNzdA==",
    icon: "instagram",
  },
  {
    label: "Elderly Wellness on LinkedIn",
    href: "https://www.linkedin.com/company/elderly-wellness-service-pvt-ltd/about/",
    icon: "linkedin",
  },
];

export const APP_LINKS = {
  googlePlay: "https://play.google.com/store/apps/details?id=com.elderly.nri",
  appStore: "https://apps.apple.com/in/app/elderly-care-plus/id6740391242",
} as const;

/** Brochure download used by the header "Download" CTA on the legacy site. */
export const BROCHURE_HREF = "/assets/elderly_wellness.pdf";

/** External developer credit shown in the footer bottom bar. */
export const DEVELOPER_CREDIT = {
  name: "Tectra Technologies",
  href: "https://www.tectratechnologies.com/",
} as const;
