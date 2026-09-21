"use client";

import { usePathname } from "next/navigation";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/data/site";
import { Container } from "@/components/Container";
import { TrustStrip } from "@/components/TrustStrip";
import { LeadFormWidget } from "@/components/LeadFormWidget";

function whatsappHref(pathname: string): string {
  const p = pathname.toLowerCase();
  let text = "Hi, I would like to inquire about Elderly Wellness care services";
  if (p.includes("physiotherapy")) text = "Hi, I would like to know about Physiotherapy & Rehabilitation services";
  else if (p.includes("nursing")) text = "Hi, I would like to know about Critical & Skilled Nursing services";
  else if (p.includes("post-operative")) text = "Hi, I would like to know about Post-Operative & Discharge Care";
  else if (p.includes("elderly-care-at-home")) text = "Hi, I would like to know about Elderly Care at Home";
  else if (p.includes("contact")) text = "Hi, I would like to contact Elderly Wellness";
  return `https://wa.me/918122666490?text=${encodeURIComponent(text)}`;
}

export function CallbackForm() {
  const pathname = usePathname() ?? "/";

  return (
    <section id="callback-form-section" className="pt-2 pb-6 sm:pt-3 sm:pb-8 lg:pt-4 lg:pb-10">
      <Container>
        <div className="mx-auto max-w-3xl flex flex-col gap-6">
          <div className="text-center px-4">
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

          <LeadFormWidget
            code="3F3DE62225FA"
            primaryColor="#2786a5"
            secondaryColor="#f3f4f6"
            borderRadius="8px"
            shadow="none"
          />

          <div className="mt-4 text-center px-4">
            <p className="mb-4 text-[12.5px] font-bold uppercase tracking-wider text-slate-500">
              Or Choose How to Reach Us
            </p>
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row">
              <a
                href={whatsappHref(pathname)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-sm"
              >
                Chat on WhatsApp
              </a>
              <a
                href={SITE_PHONE_TEL}
                className="btn-dark inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-sm"
              >
                Call Now: {SITE_PHONE}
              </a>
            </div>
            <div className="mt-6 flex justify-center">
              <TrustStrip compact />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
