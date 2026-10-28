export interface NurseProcedure {
  slug: string;
  title: string;
  desc: string;
  price: number | null;
  oldPrice?: number;
  image: string;
  scopeOfCare: readonly string[];
}

export const NURSE_PROCEDURES: readonly NurseProcedure[] = [
  {
    slug: "sc-im-injection-vaccination",
    title: "S/C INJECTION/IM INJECTION/VACCINATION",
    desc: "Professional in-home IM and SC injection administration by certified nursing staff. Consumables will be charged as per MRP.",
    price: 1360,
    oldPrice: 1600,
    image: "/images/procedures/sc-im-injection-vaccination.jpg",
    scopeOfCare: [
      "Clinical assessment before injection administration",
      "Sterile preparation of the injection site",
      "Safe administration of IM or SC injection",
      "Post-injection monitoring for adverse reactions",
      "Proper disposal of biomedical waste",
    ],
  },
  {
    slug: "ryles-tube-insertion",
    title: "RYLES TUBE INSERTION",
    desc: "Safe in-home nasogastric Ryle's tube insertion and replacement by certified nurses. Consumables will be charged as per MRP.",
    price: 1275,
    oldPrice: 1500,
    image: "/images/procedures/ryles-tube-insertion.jpg",
    scopeOfCare: [
      "Patient assessment for contraindications",
      "Measurement and proper insertion of Ryles tube",
      "Confirmation of tube placement",
      "Securing the tube comfortably",
      "Guidance on feeding and maintenance",
    ],
  },
  {
    slug: "foley-cath-insertion",
    title: "FOLEY CATH INSERTION",
    desc: "Safe in-home Foley catheter insertion by certified nurses. Consumables to be charged as per MRP.",
    price: 1530,
    oldPrice: 1800,
    image: "/images/procedures/foley-cath-insertion.jpg",
    scopeOfCare: [
      "Perineal hygiene assessment and preparation",
      "Strict aseptic insertion of Foley catheter",
      "Balloon inflation and securing of the catheter",
      "Urine bag attachment and positioning",
      "Patient and family education on catheter care",
    ],
  },
  {
    slug: "enema",
    title: "ENEMA",
    desc: "Safe in-home enema administration by certified nurses. Consumables to be charged as per MRP.",
    price: 1530,
    oldPrice: 1800,
    image: "/images/procedures/enema.jpg",
    scopeOfCare: [
      "Assessment of patient's bowel habits and medical history",
      "Preparation of enema solution",
      "Gentle and safe administration",
      "Assistance with toileting post-administration",
      "Post-procedure hygiene and comfort",
    ],
  },
  {
    slug: "colostomy-bag-change",
    title: "Colostomy Bag Change",
    desc: "Safe bedside colostomy bag change and peristomal skin care. Consumables to be charged as per MRP.",
    price: 1700,
    oldPrice: 2000,
    image: "/images/procedures/colostomy-bag-change.jpg",
    scopeOfCare: [
      "Careful removal of existing colostomy bag",
      "Cleaning and inspection of the stoma and peristomal skin",
      "Application of skin barriers if needed",
      "Secure placement of the new colostomy bag",
      "Guidance on stoma care and hygiene",
    ],
  },
  {
    slug: "iv-injection-cannula-in-place",
    title: "IV INJECTION (Cannula already in place)",
    desc: "Safe, sterile home injection administration by certified nurses with vital sign checks.",
    price: null,
    image: "/images/procedures/iv-injection-cannula-in-place.jpg",
    scopeOfCare: [
      "Verification of the existing cannula patency",
      "Sterile preparation of the injection port",
      "Slow and safe administration of the IV medication",
      "Flushing of the cannula post-injection",
      "Observation for any immediate reactions",
    ],
  },
  {
    slug: "general-random-blood-sugar-grbs",
    title: "General Random Blood Sugar (GRBS)",
    desc: "Accurate in-home random blood sugar testing with sterile lancets and immediate results.",
    price: null,
    image: "/images/procedures/general-random-blood-sugar-grbs.jpg",
    scopeOfCare: [
      "Preparation of the testing site",
      "Sterile finger prick using a lancet",
      "Accurate blood sugar reading using a calibrated glucometer",
      "Documentation of the reading",
      "Immediate consultation if the reading is critical",
    ],
  },
  {
    slug: "iv-cannula-insertion-antibiotics",
    title: "I/V Cannula Insertion For Antibiotics",
    desc: "Sterile peripheral IV cannula insertion at home by certified nurses. Consumables to be charged as per MRP.",
    price: null,
    image: "/images/procedures/iv-cannula-insertion-antibiotics.jpg",
    scopeOfCare: [
      "Assessment of suitable veins",
      "Aseptic preparation of the insertion site",
      "Safe insertion of the IV cannula",
      "Securing the cannula with a transparent dressing",
      "Flushing to check patency",
    ],
  },
  {
    slug: "iv-infusion-cannula-in-place",
    title: "IV Infusion Cannula already in place",
    desc: "Safe in-home IV infusion via existing cannula by certified nurses. Consumables to be charged as per MRP",
    price: null,
    image: "/images/procedures/iv-infusion-cannula-in-place.jpg",
    scopeOfCare: [
      "Checking the patency of the existing cannula",
      "Setting up the IV infusion with correct drip rate",
      "Continuous monitoring during the infusion",
      "Disconnecting and flushing the line post-infusion",
      "Monitoring for signs of fluid overload or phlebitis",
    ],
  },
  {
    slug: "abg-collection",
    title: "ABG COLLECTION",
    desc: "Sterile in-home arterial blood gas sampling by trained nurses. Consumables to be charged as per MRP.",
    price: null,
    image: "/images/procedures/abg-collection.jpg",
    scopeOfCare: [
      "Performing the Allen's test to check collateral circulation",
      "Aseptic preparation of the arterial puncture site",
      "Skillful collection of the arterial blood sample",
      "Applying firm pressure to prevent hematoma",
      "Proper storage and immediate dispatch of the sample",
    ],
  },
  {
    slug: "chemo-port-handling-nurse",
    title: "Chemo Port handling by Nurse",
    desc: "Safe in-home chemo port flushing and Huber needle care. Consumables to be charged as per MRP.",
    price: null,
    image: "/images/procedures/chemo-port-handling.jpg",
    scopeOfCare: [
      "Strict sterile technique preparation",
      "Accessing the chemo port using a Huber needle",
      "Flushing the port with saline or heparin as protocol",
      "Dressing the site securely",
      "Providing guidance on port maintenance",
    ],
  },
  {
    slug: "wound-debridement",
    title: "WOUND DEBRIDMENT",
    desc: "Safe in-home wound debridement by certified nurses. Consumables to be charged as per MRP.",
    price: null,
    image: "/images/procedures/wound-debridement.jpg",
    scopeOfCare: [
      "Comprehensive wound assessment",
      "Preparation of a sterile field",
      "Gentle removal of necrotic or infected tissue",
      "Cleaning and applying appropriate dressings",
      "Monitoring for signs of infection or delayed healing",
    ],
  },
  {
    slug: "suture-removal",
    title: "SUTURE REMOVAL",
    desc: "Safe in-home surgical suture and clip removal by trained nurses. Consumables to be charged as per MRP.",
    price: null,
    image: "/images/procedures/suture-removal.jpg",
    scopeOfCare: [
      "Assessment of wound healing and edge approximation",
      "Sterile cleaning of the suture site",
      "Careful removal of sutures or staples",
      "Application of steri-strips if necessary",
      "Providing post-removal wound care instructions",
    ],
  },
];

export function getNurseProcedureBySlug(slug: string): NurseProcedure | undefined {
  return NURSE_PROCEDURES.find((p) => p.slug === slug);
}
