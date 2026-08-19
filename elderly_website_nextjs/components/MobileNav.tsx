"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/data/site";
import { NAV_ITEMS, type NavItem } from "./nav-items";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setOpenSubmenu(null);
    queueMicrotask(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((current) => (current === label ? null : label));
  };

  const panel =
    mounted && isOpen
      ? createPortal(
          <div
            id="mobile-nav-panel"
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Primary navigation"
            className="fixed inset-0 z-[80] flex flex-col bg-white lg:hidden"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-4">
              <p className="text-sm font-bold text-[color:var(--color-brand)]">
                Menu
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 text-slate-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto px-4 pb-28">
              {NAV_ITEMS.map((item: NavItem) => {
                const hasChildren = !!item.children?.length;
                if (!hasChildren) {
                  return (
                    <li
                      key={item.label}
                      className="border-b border-slate-200"
                    >
                      <Link
                        href={item.href}
                        onClick={close}
                        className="block py-3.5 text-base font-semibold text-slate-900"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                const open = openSubmenu === item.label;
                return (
                  <li
                    key={item.label}
                    className="border-b border-slate-200"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={close}
                        className="flex-1 py-3.5 text-base font-semibold text-slate-900"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        className="px-3 py-3.5 text-slate-900"
                        aria-expanded={open}
                        aria-label={`${item.label} menu`}
                        onClick={() => toggleSubmenu(item.label)}
                      >
                        <span className="text-lg leading-none">
                          {open ? "−" : "+"}
                        </span>
                      </button>
                    </div>
                    {open ? (
                      <ul className="pb-3 pl-3">
                        {item.children?.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={close}
                              className="block py-2 text-sm text-slate-800"
                            >
                              <span className="block font-medium">
                                {child.label}
                              </span>
                              {child.hint ? (
                                <span className="block text-xs text-slate-500">
                                  {child.hint}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
              <li className="pt-4">
                <a
                  href={SITE_PHONE_TEL}
                  className="mb-3 block py-2 text-center text-base font-bold text-[color:var(--color-brand)]"
                >
                  {SITE_PHONE}
                </a>
                <Link
                  href="/contact/"
                  onClick={close}
                  className="btn-brand block rounded-full py-3 text-center text-base font-semibold"
                >
                  Book Care
                </Link>
              </li>
            </ul>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-900 lg:hidden"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label="Open menu"
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.4}
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {panel}
    </>
  );
}
