/**
 * Canonical primary care services — used by homepage cards, header nav,
 * and the four service detail pages.
 */

export interface PrimaryService {
  readonly id: string;
  readonly href: string;
  readonly navLabel: string;
  readonly navHint: string;
  readonly title: string;
  readonly body: string;
  readonly bullets: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
}

export const PRIMARY_SERVICES: readonly PrimaryService[] = [
  {
    id: "post-operative",
    href: "/geriatric-care-services-for-elders/",
    navLabel: "Post-Operative Care",
    navHint: "Recovery support after surgery or hospital discharge",
    title: "Post-Operative & Discharge Care at Home",
    body:
      "Professional care and support after surgery or hospital discharge, helping patients recover safely and comfortably at home.",
    bullets: [
      "Wound and dressing care",
      "Medicine and injection support",
      "BP, temperature, pulse and oxygen monitoring",
      "Personal hygiene and toileting support",
      "Walking, movement and daily activity assistance",
    ],
    image: "/images/abt-slide2.jpg",
    imageAlt: "Nurse supporting an elderly patient during recovery at home",
  },
  {
    id: "elderly-care",
    href: "/assisted-living-support-services-for-elders/",
    navLabel: "Elderly Care at Home",
    navHint: "Daily living assistance and compassionate companionship",
    title: "Elderly Care at Home",
    body:
      "Comfortable and compassionate daily care for seniors, helping them stay safe, active and comfortable at home.",
    bullets: [
      "Bathing, grooming and personal hygiene",
      "Feeding and meal assistance",
      "Walking and mobility support",
      "Medicine reminders",
      "Companionship and help with daily activities",
    ],
    image: "/images/blogs/caregivers.webp",
    imageAlt: "Caregiver with an elderly woman at home",
  },
  {
    id: "nursing",
    href: "/nursing-services-for-elders/",
    navLabel: "Critical & Skilled Nursing",
    navHint: "Medical nursing care for complex needs at home",
    title: "Critical & Skilled Nursing Support at Home",
    body:
      "Professional nursing support for patients who need regular medical care and special attention at home.",
    bullets: [
      "Vital signs monitoring",
      "Injections and IV care as prescribed",
      "Wound, dressing and bed-sore care",
      "Catheter, feeding-tube and tracheostomy care",
      "Stroke, paralysis and bedridden patient support",
    ],
    image: "/images/services/nursing/1.webp",
    imageAlt: "Nurse providing medication support to an elderly patient",
  },
  {
    id: "physiotherapy",
    href: "/physiotherapy-services-for-elders/",
    navLabel: "Physiotherapy & Rehabilitation",
    navHint: "Mobility, strength and recovery at home",
    title: "Personalised Physiotherapy & Rehabilitation at Home",
    body:
      "Personalised physiotherapy to improve movement, strength and balance and help patients return to their daily activities.",
    bullets: [
      "Stroke and paralysis rehabilitation",
      "Post-fracture and post-surgery recovery",
      "Joint replacement rehabilitation",
      "Strength, balance and walking exercises",
      "Mobility training and pain/stiffness management",
    ],
    image: "/images/services/geriatric/1.webp",
    imageAlt: "Physiotherapist guiding an elderly patient through exercises",
  },
] as const;

export function getPrimaryServiceByHref(href: string): PrimaryService | undefined {
  return PRIMARY_SERVICES.find((s) => s.href === href);
}

/** Labels used in ArrangeSteps “Step 3: Select the Service You Need”. */
export const STEP3_SERVICE_LABELS: readonly string[] = PRIMARY_SERVICES.map(
  (s) => s.title,
);

export function toServiceInfoBullets(
  bullets: readonly string[],
): { title: string; body: string }[] {
  return bullets.map((title) => ({ title, body: "" }));
}
