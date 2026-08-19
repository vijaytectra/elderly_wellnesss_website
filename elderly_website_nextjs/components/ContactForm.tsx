"use client";

import { useState, type FormEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvoeleov";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface FieldConfig {
  name: string;
  type: "text" | "number" | "tel" | "email";
  placeholder: string;
  ariaLabel: string;
  required: boolean;
}

// Field definitions match `contact.html` exactly (lines 209–275). Do not
// rename `name` attributes — Formspree templates depend on them.
const FIELDS: readonly FieldConfig[] = [
  { name: "full-name", type: "text", placeholder: "Full Name *", ariaLabel: "Full Name", required: true },
  { name: "age", type: "number", placeholder: "Age *", ariaLabel: "Age", required: true },
  { name: "phone", type: "tel", placeholder: "Phone *", ariaLabel: "Phone", required: true },
  { name: "email", type: "email", placeholder: "Email *", ariaLabel: "Email", required: true },
  { name: "experience", type: "text", placeholder: "Experience (Years) *", ariaLabel: "Experience (Years)", required: true },
  { name: "education", type: "text", placeholder: "Education *", ariaLabel: "Education", required: true },
  { name: "additional-certification", type: "text", placeholder: "Additional Certification", ariaLabel: "Additional Certification", required: false },
  { name: "area-of-expertise", type: "text", placeholder: "Area of Expertise *", ariaLabel: "Area of Expertise", required: true },
  { name: "physio-device", type: "text", placeholder: "Physio Device for Service *", ariaLabel: "Physio Device for Service", required: true },
];

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const data = new FormData(form);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        const payload: unknown = await response.json().catch(() => null);
        const message =
          payload &&
          typeof payload === "object" &&
          "errors" in payload &&
          Array.isArray((payload as { errors: unknown }).errors)
            ? ((payload as { errors: Array<{ message?: string }> }).errors
                .map((e) => e.message)
                .filter(Boolean)
                .join(", ") || "Submission failed. Please try again.")
            : "Submission failed. Please try again.";
        setErrorMessage(message);
        setStatus("error");
      }
    } catch {
      setErrorMessage(
        "Network error. Please check your connection and try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-lg)] bg-white p-8 text-center shadow-[var(--shadow-card)]"
      >
        <h3 className="mb-2 font-[family-name:var(--font-serif)] text-2xl text-[color:var(--color-brand)]">
          Thank you!
        </h3>
        <p className="text-base text-[color:var(--color-muted-foreground)]">
          Your message has been sent. Our team will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FIELDS.map((f) => (
          <div key={f.name}>
            <label htmlFor={`cf-${f.name}`} className="sr-only">
              {f.ariaLabel}
            </label>
            <input
              id={`cf-${f.name}`}
              type={f.type}
              name={f.name}
              placeholder={f.placeholder}
              aria-label={f.ariaLabel}
              required={f.required}
              className="w-full rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-white px-4 py-3 text-base text-[color:var(--color-foreground)] outline-none transition focus:border-[color:var(--color-brand)] focus:ring-2 focus:ring-[color:var(--color-brand)]/20"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center">
        <div className="md:col-span-2">
          <label
            htmlFor="term_checkbox"
            className="flex cursor-pointer items-start gap-3 text-sm text-[color:var(--color-muted-foreground)]"
          >
            <input
              id="term_checkbox"
              type="checkbox"
              name="terms"
              className="mt-1 h-4 w-4 shrink-0 rounded border-[color:var(--color-border)] text-[color:var(--color-brand)] focus:ring-[color:var(--color-brand)]"
            />
            <span>
              I agree to receive emails, newsletters and promotional messages
            </span>
          </label>
        </div>
        <div className="md:text-right">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-brand inline-flex items-center rounded-full px-8 py-3 text-sm font-semibold shadow-[var(--shadow-card)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : "Submit"}
          </button>
        </div>
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="mt-4 rounded-[var(--radius-md)] border border-red-500 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
