export interface MedicalProcedure {
  slug: string;
  title: string;
  desc: string;
  price: number | null;
  oldPrice?: number;
  image: string;
  scopeOfCare: readonly string[];
}

export const MEDICAL_PROCEDURES: readonly MedicalProcedure[] = [
  {
    slug: "picc-line-dressing",
    title: "PICC LINE dressing",
    desc: "Expert in-home PICC line dressing, heparin flushing, and catheter maintenance care.",
    price: 1350,
    oldPrice: 1500,
    image: "/images/services/hero/nursing.jpg",
    scopeOfCare: [
      "Expert PICC line dressing",
      "Heparin flushing",
      "Catheter maintenance care",
    ],
  },
  {
    slug: "albumin-infusion",
    title: "Albumin Infusion",
    desc: "Safe in-home human albumin infusion administered by certified clinical nurses.",
    price: 8100,
    image: "/images/services/hero/nursing.jpg",
    scopeOfCare: [
      "In-home human albumin infusion",
      "Administered by certified nurses",
      "Vital signs monitoring",
    ],
  },
  {
    slug: "drug-administration",
    title: "Drug Administration & Injection Service at Home",
    desc: "Safe in-home medication delivery via IV, IM, and subcutaneous routes by certified nurses. Consumables to be charged as per MRP.",
    price: null,
    image: "/images/services/hero/nursing.jpg",
    scopeOfCare: [
      "Safe in-home medication delivery",
      "IV, IM, and subcutaneous routes",
      "Administration by certified nurses",
    ],
  },
  {
    slug: "plasma-infusion",
    title: "Plasma Infusion",
    desc: "Hospital-grade plasma administration at home with continuous monitoring of vital signs.",
    price: null,
    image: "/images/services/hero/nursing.jpg",
    scopeOfCare: [
      "Hospital-grade plasma administration",
      "Continuous monitoring of vital signs",
      "Safe home environment",
    ],
  },
  {
    slug: "blood-transfusion",
    title: "Blood Transfusion",
    desc: "Convenient bedside blood product transfusion delivering safe oncotic and anemia support.",
    price: null,
    image: "/images/services/hero/nursing.jpg",
    scopeOfCare: [
      "Bedside blood product transfusion",
      "Safe oncotic and anemia support",
      "Continuous monitoring during transfusion",
    ],
  },
  {
    slug: "wound-dressing",
    title: "Wound Dressing",
    desc: "Professional bedside wound care by certified nurses. Consumables to be charged as per MRP.",
    price: null,
    image: "/images/services/hero/nursing.jpg",
    scopeOfCare: [
      "Professional bedside wound care",
      "Cleaning and dressing application",
      "Monitoring for signs of infection",
    ],
  },
];

export function getMedicalProcedureBySlug(slug: string): MedicalProcedure | undefined {
  return MEDICAL_PROCEDURES.find((p) => p.slug === slug);
}
