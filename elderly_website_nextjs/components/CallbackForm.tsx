"use client";

import { useMemo, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/data/site";
import { Container } from "@/components/Container";
import { TrustStrip } from "@/components/TrustStrip";

const ENQUIRY_ENDPOINT = "/api/enquiry";

const SERVICES = [
  { value: "Physiotherapy", label: "Physiotherapy at Home" },
  { value: "Home Nursing", label: "Home Nursing Care" },
  { value: "Geriatric Care", label: "Geriatric Care" },
  { value: "Assisted Living", label: "Assisted Living Support" },
  { value: "General Care Inquiry", label: "General Care Inquiry" },
] as const;

const TIMES = [
  "Morning (9 AM - 12 PM)",
  "Afternoon (12 PM - 4 PM)",
  "Evening (4 PM - 8 PM)",
  "Anytime (ASAP)",
] as const;

function defaultServiceFromPath(pathname: string): string {
  const p = pathname.toLowerCase();
  if (p.includes("physiotherapy")) return "Physiotherapy";
  if (p.includes("nursing")) return "Home Nursing";
  if (p.includes("geriatric")) return "Geriatric Care";
  if (p.includes("assisted-living")) return "Assisted Living";
  return "General Care Inquiry";
}

function whatsappHref(pathname: string): string {
  const p = pathname.toLowerCase();
  let text = "Hi, I would like to inquire about Elderly Wellness care services";
  if (p.includes("physiotherapy")) text = "Hi, I would like to know about Physiotherapy services";
  else if (p.includes("nursing")) text = "Hi, I would like to know about Home Nursing services";
  else if (p.includes("geriatric")) text = "Hi, I would like to know about Geriatric Care services";
  else if (p.includes("assisted-living")) text = "Hi, I would like to know about Assisted Living services";
  else if (p.includes("contact")) text = "Hi, I would like to contact Elderly Wellness";
  return `https://wa.me/919944890577?text=${encodeURIComponent(text)}`;
}

type Status = "idle" | "submitting" | "success" | "error";

export function CallbackForm() {
  const pathname = usePathname() ?? "/";
  const defaultService = useMemo(() => defaultServiceFromPath(pathname), [pathname]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [summary, setSummary] = useState<{
    name: string;
    phone: string;
    service: string;
    time_to_call: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const time_to_call = String(data.get("time_to_call") ?? "").trim();
    const consent = data.get("consent_service") === "on";

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Please enter your full name.";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) nextErrors.phone = "Please enter a valid 10-digit phone number.";
    if (!service) nextErrors.service = "Please select a service option.";
    if (!time_to_call) nextErrors.time_to_call = "Please select a preferred callback time.";
    if (!consent) nextErrors.consent = "You must agree to be contacted to submit this enquiry.";
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("submitting");
    setErrorMessage("");

    const payload = {
      _subject: `New Lead: Callback Request from ${name} (${service})`,
      name,
      phone,
      service,
      time_to_call,
      consent_service: "yes",
      consent_marketing: data.get("consent_marketing") === "on" ? "yes" : "no",
      submitted_from_page:
        typeof window !== "undefined" ? window.location.href : pathname,
      submitted_at: new Date().toLocaleString(),
    };

    try {
      const response = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          type: "callback",
          subject: payload._subject,
          heading: "New callback request",
          fields: {
            Name: name,
            Phone: phone,
            Service: service,
            "Best time to call": time_to_call,
            "Service consent": payload.consent_service,
            "Marketing consent": payload.consent_marketing,
            "Submitted from": payload.submitted_from_page,
            "Submitted at": payload.submitted_at,
          },
        }),
      });
      if (!response.ok) {
        const result: unknown = await response.json().catch(() => null);
        const message =
          result &&
          typeof result === "object" &&
          "error" in result &&
          typeof result.error === "string"
            ? result.error
            : "Could not send right now. Please call us or try WhatsApp.";
        setErrorMessage(message);
        setStatus("error");
        return;
      }
      setSummary({ name, phone, service, time_to_call });
      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Could not send right now. Please call us or try WhatsApp.");
      setStatus("error");
    }
  }

  return (
    <section id="callback-form-section" className="pt-2 pb-6 sm:pt-3 sm:pb-8 lg:pt-4 lg:pb-10">
      <Container>
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
          {status === "success" && summary ? (
            <div className="text-center">
              <h3 className="mb-2 text-2xl font-extrabold text-slate-900">
                Callback Request Submitted!
              </h3>
              <p className="mb-6 text-slate-600">
                Thank you. A senior care specialist will call you within 2 hours.
              </p>
              <dl className="mx-auto max-w-md space-y-2 text-left text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Name:</dt>
                  <dd className="font-semibold">{summary.name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Phone:</dt>
                  <dd className="font-semibold">{summary.phone}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Service:</dt>
                  <dd className="font-semibold">{summary.service}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Best Time:</dt>
                  <dd className="font-semibold">{summary.time_to_call}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brand)]/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[color:var(--color-brand)]">
                  Fast 2-Hour Response
                </span>
                <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                  Request a Callback
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Leave your details below and our senior care specialist in
                  Chennai will reach out to you.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <div>
                  <label htmlFor="ew_name" className="mb-1 block text-sm font-semibold text-slate-800">
                    Full Name <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="ew_name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Rajesh Kumar"
                    className="h-[46px] w-full rounded-[10px] border border-slate-300 px-3.5 text-[14.5px] outline-none focus:border-[color:var(--color-brand)]"
                  />
                  {fieldErrors.name ? (
                    <p className="mt-1 text-[13px] font-medium text-red-700">{fieldErrors.name}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="ew_phone" className="mb-1 block text-sm font-semibold text-slate-800">
                    Phone Number <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="ew_phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="e.g. +91 98765 43210"
                    className="h-[46px] w-full rounded-[10px] border border-slate-300 px-3.5 text-[14.5px] outline-none focus:border-[color:var(--color-brand)]"
                  />
                  {fieldErrors.phone ? (
                    <p className="mt-1 text-[13px] font-medium text-red-700">{fieldErrors.phone}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="ew_service" className="mb-1 block text-sm font-semibold text-slate-800">
                    Select Service <span className="text-red-700">*</span>
                  </label>
                  <select
                    id="ew_service"
                    name="service"
                    defaultValue={defaultService}
                    className="h-[46px] w-full rounded-[10px] border border-slate-300 bg-white px-3.5 text-[14.5px] outline-none focus:border-[color:var(--color-brand)]"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.service ? (
                    <p className="mt-1 text-[13px] font-medium text-red-700">{fieldErrors.service}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="ew_time" className="mb-1 block text-sm font-semibold text-slate-800">
                    Best Time to Call <span className="text-red-700">*</span>
                  </label>
                  <select
                    id="ew_time"
                    name="time_to_call"
                    defaultValue="Anytime (ASAP)"
                    className="h-[46px] w-full rounded-[10px] border border-slate-300 bg-white px-3.5 text-[14.5px] outline-none focus:border-[color:var(--color-brand)]"
                  >
                    {TIMES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.time_to_call ? (
                    <p className="mt-1 text-[13px] font-medium text-red-700">{fieldErrors.time_to_call}</p>
                  ) : null}
                </div>

                <div className="rounded-[10px] border border-slate-200 bg-white p-4 sm:col-span-2">
                  <label className="mb-2 flex items-start gap-2.5 text-[13.5px] font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      name="consent_service"
                      required
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[color:var(--color-brand)]"
                    />
                    <span>
                      I agree to be contacted regarding senior care services{" "}
                      <span className="text-red-700">*</span>
                    </span>
                  </label>
                  {fieldErrors.consent ? (
                    <p className="mb-2 ml-7 text-[13px] font-medium text-red-700">
                      {fieldErrors.consent}
                    </p>
                  ) : null}
                  <label className="flex items-start gap-2.5 text-[13.5px] font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      name="consent_marketing"
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[color:var(--color-brand)]"
                    />
                    <span>Send me newsletters, health tips, and special offers</span>
                  </label>
                </div>

                <div className="flex justify-center pt-1 sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-brand inline-flex min-h-11 items-center justify-center rounded-full px-7 py-2.5 text-sm font-semibold disabled:opacity-60"
                  >
                    {status === "submitting" ? "Submitting…" : "Request Callback Now"}
                  </button>
                </div>

                {status === "error" ? (
                  <p role="alert" className="sm:col-span-2 text-sm text-red-700">
                    {errorMessage}
                  </p>
                ) : null}
              </form>
            </>
          )}

          <div className="mt-8 border-t border-dashed border-slate-300 pt-6 text-center">
            <p className="mb-4 text-[12.5px] font-bold uppercase tracking-wider text-slate-500">
              Or Choose How to Reach Us
            </p>
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row">
              <a
                href={whatsappHref(pathname)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold"
              >
                Chat on WhatsApp
              </a>
              <a
                href={SITE_PHONE_TEL}
                className="btn-dark inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold"
              >
                Call Now: {SITE_PHONE}
              </a>
            </div>
            <div className="mt-5">
              <TrustStrip compact />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
