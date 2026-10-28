"use client";

import { useState, useId, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { CAREER_OPENINGS, type JobOpening } from "@/data/careers";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/data/site";

const SERVICE_FILTERS = [
  { id: "all", label: "All Roles (5)" },
  { id: "nursing", label: "Critical Care Nursing" },
  { id: "elderly-care", label: "Elderly Caregiver" },
  { id: "post-operative", label: "Post-Operative Nurse" },
  { id: "physiotherapy", label: "Physiotherapy" },
  { id: "nurse-procedures", label: "Clinical Procedures" },
] as const;

const emptySubscribe = () => () => {};

export function CareersContent() {
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const [selectedService, setSelectedService] = useState<string>("all");
  const [activeModalJob, setActiveModalJob] = useState<JobOpening | null>(null);
  const [modalTab, setModalTab] = useState<"requirements" | "apply">("requirements");

  // Application Form State (used both in modal and page bottom)
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>(
    CAREER_OPENINGS[0]?.title ?? "ICU & Critical Care Staff Nurse"
  );
  const [qualification, setQualification] = useState("GNM / B.Sc Nursing");
  const [experience, setExperience] = useState("1 - 3 years");
  const [preferredShift, setPreferredShift] = useState("12-Hour Day Shift");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const pageFormId = useId();
  const modalFormId = useId();

  // Filter jobs based on selected category
  const filteredJobs = selectedService === "all"
    ? CAREER_OPENINGS
    : CAREER_OPENINGS.filter((j) => j.serviceId === selectedService);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (!activeModalJob) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalJob(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModalJob]);

  const handleCardClick = (job: JobOpening) => {
    setActiveModalJob(job);
    setSelectedRole(job.title);
    setModalTab("requirements");
    setSubmitted(false);
    setErrorMessage("");
  };

  const handleApplyFromModal = (job: JobOpening) => {
    setSelectedRole(job.title);
    setModalTab("apply");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage("Please enter both your name and WhatsApp/contact phone number.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "career_application",
          subject: `Healthcare Staff Application: ${selectedRole} - ${fullName}`,
          heading: "New Healthcare Staff Application via Website",
          fields: {
            "Applicant Name": fullName,
            "Phone / WhatsApp": phone,
            "Email Address": email || "Not provided",
            "Role Applied For": selectedRole,
            "Highest Qualification": qualification,
            "Years of Clinical Experience": experience,
            "Preferred Shift Timing": preferredShift,
            "Preferred Locality in Chennai": preferredLocation || "Any zone in Chennai",
            "Additional Experience / Notes": notes || "None",
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit. Please reach out to HR on WhatsApp directly.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please call or WhatsApp us.";
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppHrefForJob = (jobTitle: string) => {
    const text = encodeURIComponent(
      `Hello HR Team, I am interested in applying for the position of "${jobTitle}" at Elderly Wellness Chennai. Please let me know the interview schedule.`
    );
    return `https://wa.me/918122666490?text=${text}`;
  };

  // Job Detail Modal Content
  const renderJobModal = () => {
    if (!isMounted || !activeModalJob) return null;

    const modalContent = (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="career-modal-title"
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-900/65 backdrop-blur-sm animate-modal-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setActiveModalJob(null);
          }
        }}
      >
        <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden my-auto animate-modal-content">
          {/* Top Gradient Accent Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-[#1f6b85] via-[#2786a5] to-[#57c4e3] shrink-0" />

          {/* Modal Header */}
          <div className="px-6 pt-5 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 bg-white shrink-0">
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-3 py-0.5 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {activeModalJob.badge}
                </span>
                <span className="rounded-full bg-slate-100 text-slate-700 px-2.5 py-0.5 text-xs font-semibold">
                  {activeModalJob.department}
                </span>
                <span className="rounded-full bg-blue-50 text-blue-700 px-2.5 py-0.5 text-xs font-semibold">
                  {activeModalJob.openings}
                </span>
              </div>

              <h3
                id="career-modal-title"
                className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug"
              >
                {activeModalJob.title}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                <span>Mapped Service:</span>
                <Link
                  href={activeModalJob.serviceHref}
                  className="font-bold text-[color:var(--color-brand)] hover:underline inline-flex items-center gap-0.5"
                >
                  {activeModalJob.serviceName}
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </Link>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveModalJob(null)}
              aria-label="Close job details"
              className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#2786a5] shrink-0 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Modal Tab Switcher */}
          <div className="flex items-center border-b border-slate-100 px-6 bg-slate-50/80 shrink-0">
            <button
              type="button"
              onClick={() => setModalTab("requirements")}
              className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                modalTab === "requirements"
                  ? "border-[color:var(--color-brand)] text-[color:var(--color-brand)]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Requirements &amp; Scope
            </button>
            <button
              type="button"
              onClick={() => setModalTab("apply")}
              className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                modalTab === "apply"
                  ? "border-[color:var(--color-brand)] text-[color:var(--color-brand)]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Quick Apply Form
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto overscroll-contain p-6 space-y-6">
            {modalTab === "requirements" ? (
              <>
                {/* Highlights Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Salary Package</p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">{activeModalJob.salary}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Experience</p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">{activeModalJob.experience}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Education</p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">{activeModalJob.qualification}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Shifts Available</p>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">{activeModalJob.shifts[0]}</p>
                  </div>
                </div>

                {/* Role Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Role Summary
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-[#f8fbfd] p-4 rounded-2xl border border-[#e2eff5]">
                    {activeModalJob.summary}
                  </p>
                </div>

                {/* Specific Staff Requirements */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-white text-[11px] font-bold">
                      ✓
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      Exact Staff &amp; Clinical Requirements
                    </h4>
                  </div>
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                      {activeModalJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-[color:var(--color-brand)] font-bold mt-0.5 shrink-0">▸</span>
                          <span className="leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Daily Responsibilities */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-white text-[11px] font-bold">
                      ★
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      Daily On-Duty Responsibilities
                    </h4>
                  </div>
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                      {activeModalJob.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-emerald-600 font-bold mt-0.5 shrink-0">•</span>
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Shift Timings & Chennai Zones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#fcfdfd] p-4 rounded-2xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-900 mb-1.5">Shift Options Available</p>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {activeModalJob.shifts.map((s, idx) => (
                        <li key={idx}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#fcfdfd] p-4 rounded-2xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-900 mb-1.5">Chennai Deployment Zones</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {activeModalJob.locations.join(", ")}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              /* Modal Quick Application Form */
              <div className="space-y-4">
                {submitted ? (
                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mx-auto font-bold">
                      ✓
                    </div>
                    <h4 className="text-lg font-bold text-emerald-900">Application Submitted!</h4>
                    <p className="text-xs sm:text-sm text-emerald-800">
                      Thank you <span className="font-semibold">{fullName}</span>. Our healthcare HR coordinator will call or WhatsApp you within 24 hours.
                    </p>
                    <div className="pt-2">
                      <a
                        href={`https://wa.me/918122666490?text=${encodeURIComponent(
                          `Hi HR Team, I have just applied for "${activeModalJob.title}" at Elderly Wellness. My name is ${fullName}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp rounded-full px-5 py-2 text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        Confirm on WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={`${modalFormId}-name`} className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          id={`${modalFormId}-name`}
                          type="text"
                          required
                          placeholder="Your Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-[#2786a5] focus:outline-none focus:ring-2 focus:ring-[#2786a5]/20"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${modalFormId}-phone`} className="block text-xs font-bold text-slate-700 mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          id={`${modalFormId}-phone`}
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-[#2786a5] focus:outline-none focus:ring-2 focus:ring-[#2786a5]/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={`${modalFormId}-qualification`} className="block text-xs font-bold text-slate-700 mb-1">
                          Qualification
                        </label>
                        <select
                          id={`${modalFormId}-qualification`}
                          value={qualification}
                          onChange={(e) => setQualification(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-[#2786a5] focus:outline-none focus:ring-2 focus:ring-[#2786a5]/20 bg-white"
                        >
                          <option value="GNM / B.Sc Nursing">Diploma in GNM / B.Sc Nursing</option>
                          <option value="ANM / Certified Nursing Assistant">ANM / Nursing Assistant (CNA)</option>
                          <option value="Geriatric Care Attendant">Geriatric Care Attendant</option>
                          <option value="BPT / MPT (Physiotherapy)">BPT / MPT (Physiotherapy)</option>
                          <option value="Other Medical Certificate">Other Medical Certificate</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor={`${modalFormId}-experience`} className="block text-xs font-bold text-slate-700 mb-1">
                          Experience
                        </label>
                        <select
                          id={`${modalFormId}-experience`}
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-[#2786a5] focus:outline-none focus:ring-2 focus:ring-[#2786a5]/20 bg-white"
                        >
                          <option value="Fresher (< 1 year)">Fresher (&lt; 1 year)</option>
                          <option value="1 - 3 years">1 – 3 years</option>
                          <option value="3 - 5 years">3 – 5 years</option>
                          <option value="5+ years">5+ years</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={`${modalFormId}-shift`} className="block text-xs font-bold text-slate-700 mb-1">
                          Preferred Shift
                        </label>
                        <select
                          id={`${modalFormId}-shift`}
                          value={preferredShift}
                          onChange={(e) => setPreferredShift(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-[#2786a5] focus:outline-none focus:ring-2 focus:ring-[#2786a5]/20 bg-white"
                        >
                          <option value="12-Hour Day Shift">12-Hour Day Shift</option>
                          <option value="12-Hour Night Shift">12-Hour Night Shift</option>
                          <option value="24-Hour Live-in Care">24-Hour Live-in</option>
                          <option value="8-Hour Day Shift">8-Hour Day Shift</option>
                          <option value="Per-Visit Sessions">Per-Visit Sessions</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor={`${modalFormId}-loc`} className="block text-xs font-bold text-slate-700 mb-1">
                          Preferred Locality in Chennai
                        </label>
                        <input
                          id={`${modalFormId}-loc`}
                          type="text"
                          placeholder="e.g. Velachery, Anna Nagar..."
                          value={preferredLocation}
                          onChange={(e) => setPreferredLocation(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-[#2786a5] focus:outline-none focus:ring-2 focus:ring-[#2786a5]/20"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-brand w-full rounded-full py-2.5 text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all disabled:opacity-60"
                    >
                      {submitting ? "Submitting Application..." : `Submit Application for ${activeModalJob.title}`}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <a
                href={getWhatsAppHrefForJob(activeModalJob.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp rounded-full px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition hover:scale-102"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.969.53 1.83.81 2.79.81 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.766-5.766zm9.969 5.766c0 5.503-4.469 9.972-9.97 9.972-.1 0-.203-.002-.303-.005-1.706-.051-3.32-.55-4.739-1.397l-6.988 1.834 1.87-6.822c-.931-1.464-1.465-3.195-1.465-5.045 0-5.503 4.469-9.972 9.97-9.972 5.501 0 9.97 4.469 9.97 9.972z" />
                </svg>
                WhatsApp HR
              </a>
              <a
                href={SITE_PHONE_TEL}
                className="btn-dark rounded-full px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition hover:scale-102"
              >
                Call: {SITE_PHONE}
              </a>
            </div>

            {modalTab === "requirements" ? (
              <button
                type="button"
                onClick={() => handleApplyFromModal(activeModalJob)}
                className="btn-brand rounded-full px-5 py-2 text-xs sm:text-sm font-bold shadow-sm transition hover:scale-102 cursor-pointer"
              >
                Apply Online Now →
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setModalTab("requirements")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                ← Back to Requirements
              </button>
            )}
          </div>
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  };

  return (
    <div className="space-y-16">
      {/* Introduction Hero Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#1f6b85] to-[#2786a5] p-8 md:p-12 text-white shadow-xl">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold tracking-wide uppercase backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Active Hiring in Chennai
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Work with Dignity, Respect &amp; Industry-Leading Compensation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed">
            Elderly Wellness delivers hospital-grade clinical and bedside elder care in Chennai homes. We are looking for registered nurses, certified geriatric caregivers, and physiotherapists who take pride in patient compassion.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#career-application-form"
              className="btn-brand bg-white text-[#1f6b85] hover:bg-slate-100 rounded-full px-6 py-2.5 text-sm font-bold shadow-md transition-all hover:scale-102"
            >
              Apply Online Now
            </a>
            <a
              href="https://wa.me/918122666490?text=Hi%2C%20I%20am%20interested%20in%20applying%20for%20a%20healthcare%20job%20at%20Elderly%20Wellness"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp rounded-full px-5 py-2.5 text-sm font-bold shadow-md inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.969.53 1.83.81 2.79.81 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.766-5.766zm9.969 5.766c0 5.503-4.469 9.972-9.97 9.972-.1 0-.203-.002-.303-.005-1.706-.051-3.32-.55-4.739-1.397l-6.988 1.834 1.87-6.822c-.931-1.464-1.465-3.195-1.465-5.045 0-5.503 4.469-9.972 9.97-9.972 5.501 0 9.97 4.469 9.97 9.972z" />
              </svg>
              Quick Apply via WhatsApp
            </a>
            <a
              href={SITE_PHONE_TEL}
              className="btn-dark rounded-full px-5 py-2.5 text-sm font-bold shadow-md inline-flex items-center gap-2"
            >
              Call HR: {SITE_PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* Filter Header & Pills */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Service-Wise Openings &amp; Staff Roles
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Click on any role card below to inspect full staff clinical requirements, certifications, and shift options.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
            {filteredJobs.length} Active Positions
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pb-2">
          {SERVICE_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setSelectedService(filter.id)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedService === filter.id
                  ? "bg-[color:var(--color-brand)] text-white shadow-md scale-102"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* CARD GRID: Clickable Cards with Rich Aesthetics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => handleCardClick(job)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(job);
                }
              }}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#2786a5]/60 cursor-pointer overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-[#2786a5]"
            >
              {/* Card Top Accent on Hover */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2786a5] to-[#57c4e3] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Badges Bar */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className="rounded-full bg-slate-100 text-slate-700 px-2.5 py-0.5 text-xs font-semibold">
                    {job.department}
                  </span>
                  <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2 py-0.5 text-[11px] font-bold">
                    {job.badge}
                  </span>
                </div>

                {/* Job Title */}
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[color:var(--color-brand)] transition-colors leading-snug">
                  {job.title}
                </h4>

                {/* Mapped Service Tag */}
                <div className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#1f6b85] bg-[#eaf3f7] px-2.5 py-1 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2786a5]" />
                  <span className="truncate max-w-[240px]">{job.serviceName}</span>
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3.5 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Salary</p>
                    <p className="font-bold text-slate-800 truncate mt-0.5">{job.salary.split("+")[0]}</p>
                  </div>
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Experience</p>
                    <p className="font-bold text-slate-800 truncate mt-0.5">{job.experience.split("in")[0]}</p>
                  </div>
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 col-span-2">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Qualification</p>
                    <p className="font-semibold text-slate-700 truncate mt-0.5">{job.qualification}</p>
                  </div>
                </div>

                {/* Brief Summary Snippet */}
                <p className="text-xs text-slate-500 mt-3.5 line-clamp-2 leading-relaxed">
                  {job.summary}
                </p>
              </div>

              {/* Card Footer / Action Prompt */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[color:var(--color-brand)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  View Full Requirements &amp; Apply
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="h-7 w-7 rounded-full bg-slate-100 group-hover:bg-[#2786a5] group-hover:text-white flex items-center justify-center text-xs font-bold transition-colors">
                  ↗
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Render Portal Modal if a card was clicked */}
      {renderJobModal()}

      {/* Why Join Elderly Wellness / Benefits */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-[color:var(--color-brand)] bg-[#eaf3f7] px-3.5 py-1 rounded-full">
            Why Caregivers Choose Us
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
            A Supportive, Safe &amp; Rewarding Career
          </h3>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            We value our frontline healthcare heroes. Here is why over 150+ nurses and caregivers love being part of Elderly Wellness Chennai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900 text-base">Punctual &amp; Fair Compensation</h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              Guaranteed on-time monthly direct bank transfers, overtime bonuses, and travel incentives for mobile visiting nurses.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900 text-base">Verified, Safe Home Environments</h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              We strictly pre-screen all patient families before deployment to ensure your dignity, safety, and respect are never compromised.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900 text-base">24/7 Clinical Manager Support</h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              Never feel alone on duty. Senior clinical supervisors and medical officers are on instant call for any emergency or guidance.
            </p>
          </div>
        </div>
      </div>

      {/* 4-Step Transparent Hiring Process */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-12 shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-800/40">
            Fast 4-Step Onboarding
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold mt-3">
            How to Join the Elderly Wellness Care Team
          </h3>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            From application to deployment near your home in Chennai within 48 to 72 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80">
            <span className="text-3xl font-extrabold text-[#57c4e3]">01</span>
            <h4 className="font-bold text-base mt-2">Submit Details</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Fill out the fast application form below or drop your nursing/caregiver resume on WhatsApp.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80">
            <span className="text-3xl font-extrabold text-[#57c4e3]">02</span>
            <h4 className="font-bold text-base mt-2">Clinical Screening</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Quick telephonic interview followed by verification of nursing council credentials, certificates, and Aadhaar.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80">
            <span className="text-3xl font-extrabold text-[#57c4e3]">03</span>
            <h4 className="font-bold text-base mt-2">Care Protocol Briefing</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Receive company uniform, ID card, clinical handbook, and patient dignity orientation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80">
            <span className="text-3xl font-extrabold text-[#57c4e3]">04</span>
            <h4 className="font-bold text-base mt-2">Patient Placement</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Get deployed on a scheduled shift near your preferred Chennai locality with full supervisor backup.
            </p>
          </div>
        </div>
      </div>

      {/* Online Application Form (Accessible on page and scrolled to from cards) */}
      <div
        id="career-application-form"
        className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 md:p-12 shadow-lg"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold tracking-widest uppercase text-[color:var(--color-brand)] bg-[#eaf3f7] px-3.5 py-1 rounded-full">
              Join Our Care Family
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Apply for a Healthcare Position
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Fill in your details below and our Healthcare HR team in Chennai will contact you within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mx-auto font-bold">
                ✓
              </div>
              <h4 className="text-xl font-bold text-emerald-900">Application Submitted Successfully!</h4>
              <p className="text-sm text-emerald-800 max-w-md mx-auto">
                Thank you for applying to Elderly Wellness, <span className="font-semibold">{fullName}</span>. Our HR coordinator will review your profile and reach out via phone or WhatsApp shortly.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/918122666490?text=${encodeURIComponent(
                    `Hi HR Team, I have just submitted my job application for "${selectedRole}" on your website. My name is ${fullName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp rounded-full px-6 py-2.5 text-xs font-bold inline-flex items-center gap-2 shadow-sm"
                >
                  Confirm Application via WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`${pageFormId}-name`} className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id={`${pageFormId}-name`}
                    type="text"
                    required
                    placeholder="e.g. Priya Sundaram"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#2786a5] focus:outline-none focus:ring-2 focus:ring-[#2786a5]/20"
                  />
                </div>

                <div>
                  <label htmlFor={`${pageFormId}-phone`} className="block text-xs font-bold text-slate-700 mb-1.5">
                    WhatsApp / Contact Number *
                  </label>
                  <input
                    id={`${pageFormId}-phone`}
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#2786a5] focus:outline-none focus:ring-2 focus:ring-[#2786a5]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`${pageFormId}-email`} className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    id={`${pageFormId}-email`}
                    type="email"
                    placeholder="e.g. priya@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#2786a5] focus:outline-none focus:ring-2 focus:ring-[#2786a5]/20"
                  />
                </div>

                <div>
                  <label htmlFor={`${pageFormId}-role`} className="block text-xs font-bold text-slate-700 mb-1.5">
                    Service / Role Applying For *
                  </label>
                  <select
                    id={`${pageFormId}-role`}
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#2786a5] focus:outline-none focus:ring-2 focus:ring-[#2786a5]/20 bg-white"
                  >
                    {CAREER_OPENINGS.map((op) => (
                      <option key={op.id} value={op.title}>
                        {op.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`${pageFormId}-qualification`} className="block text-xs font-bold text-slate-700 mb-1.5">
                    Highest Qualification *
                  </label>
                  <select
                    id={`${pageFormId}-qualification`}
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#2786a5] focus:outline-none focus:ring-2 focus:ring-[#2786a5]/20 bg-white"
                  >
                    <option value="GNM / B.Sc Nursing">Diploma in GNM / B.Sc Nursing</option>
                    <option value="ANM / Certified Nursing Assistant">ANM / Certified Nursing Assistant (CNA)</option>
                    <option value="Geriatric Care Attendant / Bedside Aide">Geriatric Care Attendant / Bedside Aide</option>
                    <option value="BPT / MPT (Physiotherapy)">BPT / MPT (Physiotherapy)</option>
                    <option value="Other Medical Certificate">Other Healthcare Qualification</option>
                  </select>
                </div>

                <div>
                  <label htmlFor={`${pageFormId}-experience`} className="block text-xs font-bold text-slate-700 mb-1.5">
                    Years of Clinical Experience *
                  </label>
                  <select
                    id={`${pageFormId}-experience`}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#2786a5] focus:outline-none focus:ring-2 focus:ring-[#2786a5]/20 bg-white"
                  >
                    <option value="Fresher (< 1 year)">Fresher (&lt; 1 year with training)</option>
                    <option value="1 - 3 years">1 – 3 years</option>
                    <option value="3 - 5 years">3 – 5 years</option>
                    <option value="5+ years">5+ years (Senior Specialist)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`${pageFormId}-shift`} className="block text-xs font-bold text-slate-700 mb-1.5">
                    Preferred Shift Timing *
                  </label>
                  <select
                    id={`${pageFormId}-shift`}
                    value={preferredShift}
                    onChange={(e) => setPreferredShift(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#2786a5] focus:outline-none focus:ring-2 focus:ring-[#2786a5]/20 bg-white"
                  >
                    <option value="12-Hour Day Shift">12-Hour Day Shift (8 AM – 8 PM)</option>
                    <option value="12-Hour Night Shift">12-Hour Night Shift (8 PM – 8 AM)</option>
                    <option value="24-Hour Live-in Care">24-Hour Resident Live-in Care</option>
                    <option value="8-Hour Day Shift">8-Hour Day Shift</option>
                    <option value="Per-Visit / Home Procedures">Per-Visit Sessions / Mobile Care</option>
                  </select>
                </div>

                <div>
                  <label htmlFor={`${pageFormId}-loc`} className="block text-xs font-bold text-slate-700 mb-1.5">
                    Preferred Area in Chennai
                  </label>
                  <input
                    id={`${pageFormId}-loc`}
                    type="text"
                    placeholder="e.g. Velachery, Anna Nagar, Tambaram..."
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#2786a5] focus:outline-none focus:ring-2 focus:ring-[#2786a5]/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`${pageFormId}-notes`} className="block text-xs font-bold text-slate-700 mb-1.5">
                  Brief Clinical Background / Previous Hospital (Optional)
                </label>
                <textarea
                  id={`${pageFormId}-notes`}
                  rows={3}
                  placeholder="Mention previous hospital names, ICU skills, or special certifications..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#2786a5] focus:outline-none focus:ring-2 focus:ring-[#2786a5]/20"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-brand w-full rounded-full py-3 text-center text-sm font-bold shadow-md hover:scale-101 cursor-pointer transition-all disabled:opacity-60"
                >
                  {submitting ? "Submitting Application..." : "Submit Staff Application"}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2 text-xs text-slate-500">
                <span>Confidential application</span>
                <span>•</span>
                <span>24-Hour HR response</span>
                <span>•</span>
                <span>Direct employment</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
