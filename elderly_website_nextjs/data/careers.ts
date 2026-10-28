export interface JobOpening {
  id: string;
  title: string;
  serviceId: "nursing" | "elderly-care" | "post-operative" | "physiotherapy" | "nurse-procedures";
  serviceName: string;
  serviceHref: string;
  department: string;
  badge: string;
  openings: string;
  salary: string;
  experience: string;
  qualification: string;
  summary: string;
  requirements: readonly string[];
  responsibilities: readonly string[];
  shifts: readonly string[];
  locations: readonly string[];
}

export const CAREER_OPENINGS: readonly JobOpening[] = [
  {
    id: "critical-care-nurse",
    title: "ICU & Critical Care Staff Nurse (Home Care)",
    serviceId: "nursing",
    serviceName: "Critical & Skilled Nursing Support at Home",
    serviceHref: "/critical-skilled-nursing-at-home/",
    department: "Clinical Nursing",
    badge: "Urgent Requirement",
    openings: "12 Openings",
    salary: "₹26,000 – ₹42,000 / month + Shift Allowances",
    experience: "1 – 5+ years in ICU / CCU / HDU or Home Critical Care",
    qualification: "Diploma in GNM / B.Sc Nursing (Registered with TNC / State Council)",
    summary:
      "Deliver compassionate, high-dependency bedside medical nursing for seniors requiring round-the-clock clinical observation, tracheostomy management, ventilator/BiPAP support, and infusion therapy in home environments.",
    requirements: [
      "Valid registration with Tamil Nadu Nurses and Midwives Council (TNC) or equivalent State Nursing Council",
      "Mandatory clinical experience in handling ICU, HDU, or high-dependency bedridden patients",
      "Proficiency in Tracheostomy suctioning, inner cannula cleaning, stoma dressing, and emergency decannulation handling",
      "Hands-on expertise in BiPAP / CPAP ventilator settings, oxygen concentrators, and SpO2 vital titration",
      "Enteral nutrition mastery: Ryles tube feeding, PEG tube care, and medication administration via tubes",
      "Aseptic urinary catheterization (Foley/Silicone catheter insertion, bladder irrigation, and bag drainage)",
      "Central venous line and PICC line heparin flushing, sterile dressing, and infusion pump administration",
      "Advanced pressure injury (Bed Sore) management (Grade 2–4 staging, surgical debridement dressing, air-bed maintenance)",
      "BLS (Basic Life Support) certification preferred",
    ],
    responsibilities: [
      "Maintain continuous, meticulous vital signs charting (BP, Pulse, RR, SpO2, Blood Sugar, GCS) and timely medical escalation",
      "Administer prescribed IV, IM, and Subcutaneous medications strictly according to treating physician orders",
      "Prevent hospital readmission through proactive clinical assessment of fluid balance and respiratory status",
      "Maintain strict sterile aseptic protocols to prevent catheter-associated infections (CAUTI) and central-line infections (CLABSI)",
      "Provide empathetic emotional support and clinical counseling to the patient's family members",
    ],
    shifts: ["12-Hour Day Shift (8:00 AM – 8:00 PM)", "12-Hour Night Shift (8:00 PM – 8:00 AM)", "24-Hour Residential Care"],
    locations: ["Adyar", "Anna Nagar", "T. Nagar", "Velachery", "OMR / ECR", "Porur", "Kilpauk", "Tambaram"],
  },
  {
    id: "geriatric-caregiver",
    title: "Geriatric Caregiver / Senior Patient Care Attendant",
    serviceId: "elderly-care",
    serviceName: "Elderly Care at Home",
    serviceHref: "/elderly-care-at-home/",
    department: "Elderly Care",
    badge: "Immediate Joining",
    openings: "25+ Openings",
    salary: "₹18,000 – ₹28,000 / month + Food & Accommodation for Live-in",
    experience: "6 months – 3+ years in Home Eldercare, Assisted Living, or Geriatric Wards",
    qualification: "10th / 12th Pass + ANM, CNA, or Certified Geriatric Attendant Certificate",
    summary:
      "Provide heartfelt, respectful bedside care and everyday living assistance to senior citizens, helping them maintain dignity, hygiene, safety, and emotional companionship in their own homes.",
    requirements: [
      "Certified in Patient Care Assistance (PCA), Auxiliary Nurse Midwifery (ANM), or Geriatric Attendant training",
      "Demonstrated patience, kindness, and deep empathy for senior citizens and individuals with memory loss",
      "Proficient in full bed bathing, sponge bathing, hair washing, oral hygiene, and adult diaper changing",
      "Skilled in safe patient transfers (Bed to Wheelchair, Wheelchair to Commode, assisted walking with walker)",
      "Strict Q2H (2-hourly) patient repositioning skills to prevent bedsores and friction burns",
      "Feeding assistance for seniors with chewing difficulties, dysphagia awareness, and hydration tracking",
      "Familiarity with taking basic vitals: Digital Blood Pressure, Pulse Oximeter, and Glucometer blood sugar checks",
      "Patience and communication techniques for Dementia, Alzheimer's, and Parkinson's patients",
    ],
    responsibilities: [
      "Assist seniors with all Activities of Daily Living (ADLs) with warmth, dignity, and respect",
      "Ensure timely reminders and administration of doctor-prescribed oral medications",
      "Engage senior in cognitive activities, gentle light walks, conversation, and reading to fight isolation",
      "Maintain a clean, hygienic, and fall-safe bedroom environment around the patient's bed",
      "Promptly alert the Elderly Wellness Care Manager and family of any sudden change in appetite, mood, or vitals",
    ],
    shifts: ["8-Hour Day Shift", "12-Hour Day Shift", "12-Hour Night Shift", "24-Hour Live-in Care (Room & Board provided)"],
    locations: ["Mylapore", "Besant Nagar", "Nungambakkam", "Alwarpet", "Guindy", "Chromepet", "Perambur", "Ambattur"],
  },
  {
    id: "post-operative-nurse",
    title: "Post-Surgical Discharge & Recovery Nurse",
    serviceId: "post-operative",
    serviceName: "Post-Operative & Discharge Care at Home",
    serviceHref: "/post-operative-discharge-care-at-home/",
    department: "Surgical Recovery",
    badge: "High Demand",
    openings: "10 Openings",
    salary: "₹24,000 – ₹38,000 / month + Travel Perks",
    experience: "1 – 4 years in Surgical Wards, Post-Anesthesia Care, or Orthopedic Units",
    qualification: "GNM / B.Sc Nursing with State Nursing Registration",
    summary:
      "Help patients heal smoothly and avoid surgical complications following hospital discharge for major cardiac, orthopedic (knee/hip replacement), abdominal, or oncological surgeries.",
    requirements: [
      "Registered Nurse (GNM / B.Sc) with hands-on surgical ward or post-op recovery experience",
      "Comprehensive wound assessment skills: Redness, Edema, Ecchymosis, Discharge, and Approximation (REEDA scale)",
      "Strict aseptic technique for surgical incision dressings, vacuum-assisted wound therapy, and stoma care",
      "Management of surgical closed-suction drains (Hemovac, Jackson-Pratt) and fluid measurement",
      "Suture and surgical skin staple removal as authorized by the treating operating surgeon",
      "Deep Vein Thrombosis (DVT) prevention: Anti-embolism stocking placement, pneumatic compression, and calf pump exercises",
      "Acute post-operative pain evaluation and administration of analgesics and antiemetics as charted",
      "Assistance with early ambulation and mobilization post orthopedic and spine surgery",
    ],
    responsibilities: [
      "Execute individualized surgeon discharge protocols and wound hygiene regimens at the patient's bedside",
      "Monitor for early signs of surgical site infection (SSI), seroma, hematoma, or wound breakdown",
      "Educate patient and caregivers on post-surgical posture, coughing techniques with splinting, and fluid intake",
      "Coordinate with the Elderly Wellness clinical desk for timely medical progress updates to the family",
    ],
    shifts: ["12-Hour Day Shift", "12-Hour Night Shift", "Daily Procedure & Dressing Visits"],
    locations: ["Anna Nagar", "T. Nagar", "OMR", "Velachery", "Adyar", "Mogappair", "Sholinganallur"],
  },
  {
    id: "home-physiotherapist",
    title: "Consultant Home Physiotherapist (Neuro / Ortho / Geriatric)",
    serviceId: "physiotherapy",
    serviceName: "Personalised Physiotherapy & Rehabilitation at Home",
    serviceHref: "/physiotherapy-rehabilitation-at-home/",
    department: "Physical Rehabilitation",
    badge: "Flexible Sessions",
    openings: "8 Openings",
    salary: "₹30,000 – ₹50,000 / month (or ₹600 – ₹1,000 per session)",
    experience: "1 – 5 years in Clinical Physiotherapy, Hospital Rehab, or Home Care",
    qualification: "BPT / MPT (Bachelor / Master of Physiotherapy) with State Council / IAP Membership",
    summary:
      "Deliver tailored one-on-one physiotherapy sessions to elderly and post-op patients at home, helping them restore balance, recover from stroke or joint replacements, and regain functional independence.",
    requirements: [
      "Degree in Physiotherapy (BPT / MPT) from a recognized university with active professional registration",
      "Proficiency in Neuro-Rehabilitation: Post-stroke hemiplegia recovery, balance retraining, spasticity management, Parkinson's gait training",
      "Expertise in Orthopedic Rehabilitation: Post-Total Knee Replacement (TKR), Total Hip Replacement (THR), fracture recovery, cervical/lumbar spondylosis",
      "Geriatric fall prevention strategies, vestibular rehabilitation, and functional independence measure (FIM)",
      "Chest physiotherapy for bedridden seniors: Postural drainage, percussion, incentive spirometry, and deep breathing drills",
      "Skills with portable electrotherapy modalities (TENS, IFT, Muscle Stimulator) and manual therapy techniques",
      "Strong patient motivational skills, empathy, and transparent session-by-session milestone tracking",
    ],
    responsibilities: [
      "Conduct in-home baseline physical assessment, range-of-motion (ROM) checks, and muscle power grading (MMT)",
      "Design personalized home rehabilitation plans matching the senior's daily living requirements",
      "Conduct 45–60 minute focused therapy sessions using safe progressive overload and mobility drills",
      "Document recovery milestones and share objective progress summaries with treating physicians and family",
    ],
    shifts: ["Per-Visit Home Sessions (Morning / Evening Flexible Slots)", "Full-Time Cluster Specialist"],
    locations: ["South Chennai (Adyar, Velachery, Thiruvanmiyur, OMR)", "Central Chennai (T. Nagar, Alwarpet, Kilpauk)", "West Chennai (Anna Nagar, Porur)"],
  },
  {
    id: "clinical-procedure-nurse",
    title: "Visiting Clinical Procedure Nurse",
    serviceId: "nurse-procedures",
    serviceName: "Nurse Procedures at Home",
    serviceHref: "/nurse-procedures-at-home/",
    department: "Clinical Procedures",
    badge: "Per-Visit / Full-Time",
    openings: "10 Openings",
    salary: "₹25,000 – ₹40,000 / month (or High Per-Procedure Payout + Travel)",
    experience: "1 – 4 years in Hospital Daycare, Emergency Room, or Home Clinical Procedures",
    qualification: "Registered GNM or B.Sc Nursing with Council Registration",
    summary:
      "Provide prompt, sterile, first-prick clinical interventions at patient doorsteps in Chennai—ranging from IV infusions, injections, and catheterization to Ryle's tube and stoma care.",
    requirements: [
      "Valid GNM / B.Sc Nursing license with council registration",
      "Exceptional cannulation proficiency: Single-attempt peripheral IV cannula insertion, even in fragile or collapsed veins",
      "Sterile urinary catheterization: Foley and silicone catheter insertion, maintenance, and bladder irrigation",
      "Nasogastric Ryle's tube insertion, aspirate pH verification, and secure tape fixation",
      "Safe parenteral administration: SC, IM, IV push injections, and vaccination protocols",
      "In-home infusion monitoring: Human Albumin, IV antibiotics, iron sucrose, and fluid therapy",
      "Colostomy / Ileostomy bag changes, peristomal skin hygiene, and leak prevention",
      "Chemo-port flushing with Huber needles, saline/heparin lock under aseptic precautions",
      "Strict compliance with biomedical waste management and biohazard sharps disposal protocols",
    ],
    responsibilities: [
      "Respond punctually to scheduled clinical procedure bookings across assigned Chennai neighborhood clusters",
      "Verify doctor prescriptions, patient identification, and drug expiry before every procedure",
      "Administer procedure with zero-compromise aseptic standards and gentle patient reassurance",
      "Record pre- and post-procedure vital signs and submit digital clinical sign-off report",
    ],
    shifts: ["On-Demand Cluster Visits", "Scheduled Slot Blocks (8 AM–1 PM / 2 PM–7 PM)", "Full-Time Mobile Nurse"],
    locations: ["All Neighborhoods Across Greater Chennai"],
  },
];
