"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/data/site";

interface BookingModalProps {
  isOpen: boolean;
  serviceName?: string;
  onClose: () => void;
}

const FORM_EMBED_URL = "https://www.thelead101.com/forms/cmub26cke02jqk6nkci4dr6ik?embed=1&v=1";
const emptySubscribe = () => () => {};

export function BookingModal({ isOpen, serviceName, onClose }: BookingModalProps) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset iframeLoaded state when modal re-opens
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setIframeLoaded(false);
    }
  }

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const whatsappMsg = serviceName
    ? `Hi, I would like to book ${serviceName} with Elderly Wellness`
    : `Hi, I would like to inquire about Elderly Wellness care services`;
  const whatsappHref = `https://wa.me/918122666490?text=${encodeURIComponent(whatsappMsg)}`;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/65 backdrop-blur-sm animate-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden my-auto animate-modal-content"
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#2786a5] via-[#57c4e3] to-[#1f6b85] shrink-0" />

        {/* Modal Header */}
        <div className="px-5 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-3.5 border-b border-slate-100 flex items-start justify-between gap-3 bg-white shrink-0">
          <div className="flex-1 min-w-0 pr-2">
            {serviceName ? (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf3f7] px-3 py-1 text-xs font-bold text-[#1f6b85] mb-2 max-w-full">
                <span className="w-2 h-2 rounded-full bg-[#2786a5] shrink-0 animate-pulse" />
                <span className="truncate">{serviceName}</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf3f7] px-3 py-1 text-xs font-bold text-[#1f6b85] mb-2">
                <span className="w-2 h-2 rounded-full bg-[#2786a5] shrink-0 animate-pulse" />
                Fast 2-Hour Response
              </div>
            )}
            <h2
              id="booking-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug"
            >
              Request a Care Callback
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              Fill in your details below and our senior care specialist in Chennai will reach out to you shortly.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking form"
            className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#2786a5] shrink-0"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Body / Request Form */}
        <div className="overflow-y-auto overscroll-contain relative bg-white px-3 sm:px-6 pt-3 pb-1">
          {/* Skeleton Loader while iframe is loading */}
          {!iframeLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white p-4 space-y-3">
              <div className="w-8 h-8 border-3 border-[#2786a5]/20 border-t-[#2786a5] rounded-full animate-spin" />
              <div className="text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-700">Loading Request Form...</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Connecting to Elderly Wellness Chennai Care Desk</p>
              </div>

              {/* Wireframe skeleton cards */}
              <div className="w-full max-w-md space-y-2.5 pt-1 opacity-60">
                <div className="h-8 bg-slate-100 rounded-lg animate-pulse" />
                <div className="h-8 bg-slate-100 rounded-lg animate-pulse" />
                <div className="h-10 bg-[#2786a5]/20 rounded-lg animate-pulse" />
              </div>
            </div>
          )}

          {/* Form Iframe */}
          <iframe
            src={FORM_EMBED_URL}
            title="Request Care Callback Form"
            onLoad={() => setIframeLoaded(true)}
            className="w-full h-[340px] sm:h-[305px] border-0 bg-white block"
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        {/* Modal Footer / Immediate Help */}
        <div className="px-5 py-3 sm:px-6 sm:py-3.5 bg-slate-50 border-t border-slate-100 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <span className="text-xs font-semibold text-slate-500">
              Need immediate assistance?
            </span>
            <div className="flex items-center gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold shadow-xs transition hover:scale-102"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.969.53 1.83.81 2.79.81 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.766-5.766zm9.969 5.766c0 5.503-4.469 9.972-9.97 9.972-.1 0-.203-.002-.303-.005-1.706-.051-3.32-.55-4.739-1.397l-6.988 1.834 1.87-6.822c-.931-1.464-1.465-3.195-1.465-5.045 0-5.503 4.469-9.972 9.97-9.972 5.501 0 9.97 4.469 9.97 9.972z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={SITE_PHONE_TEL}
                className="btn-dark inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold shadow-xs transition hover:scale-102"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call: {SITE_PHONE}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
