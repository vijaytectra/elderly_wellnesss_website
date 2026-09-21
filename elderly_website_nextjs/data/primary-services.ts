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
  readonly imagePosition?: string;
}

export const PRIMARY_SERVICES: readonly PrimaryService[] = [
  {
    id: "post-operative",
    href: "/post-operative-discharge-care-at-home/",
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
    image: "/images/services/hero/post-operative.jpg",
    imageAlt: "Indian nurse checking blood pressure for an elderly patient at home",
  },
  {
    id: "elderly-care",
    href: "/elderly-care-at-home/",
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
    image: "/images/services/hero/elderly-care.jpg",
    imageAlt: "Indian caregiver helping an elderly woman walk at home",
  },
  {
    id: "nursing",
    href: "/critical-skilled-nursing-at-home/",
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
    image: "/images/services/hero/nursing.jpg",
    imageAlt: "Indian nurse giving medication to an elderly patient at home",
  },
  {
    id: "physiotherapy",
    href: "/physiotherapy-rehabilitation-at-home/",
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
    image: "/images/services/hero/physiotherapy.jpg",
    imageAlt: "Indian physiotherapist guiding an elderly woman through exercises at home",
    imagePosition: "object-top",
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
