"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_ITEMS, type NavItem } from "./nav-items";

/**
 * Client-only mobile drawer navigation. Renders a hamburger trigger; opens a
 * full-viewport panel. Same nav data as DesktopNav (hoisted into
 * `nav-items.ts`).
 *
 * A11y:
 *  - Escape closes the drawer.
 *  - Focus is moved into the drawer on open and returned to the trigger on close.
 *  - Background page scroll is locked while open.
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    setOpenSubmenu(null);
    // Return focus to the trigger for a11y.
    queueMicrotask(() => triggerRef.current?.focus());
  }, []);

  // Escape-to-close + background scroll lock.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus into the panel.
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((current) => (current === label ? null : label));
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[color:var(--color-foreground)] transition-colors hover:text-[color:var(--color-brand)] lg:hidden"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="sr-only">Toggle menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="h-6 w-6"
          aria-hidden="true"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen ? (
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Primary navigation"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white pt-20 outline-none lg:hidden"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-md text-[color:var(--color-foreground)] hover:text-[color:var(--color-brand)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
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
          <ul className="flex flex-col divide-y divide-[color:var(--color-border)] px-4 pb-8">
            {NAV_ITEMS.map((item: NavItem) => {
              const hasChildren = !!item.children?.length;
              if (!hasChildren) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block py-3 text-base font-medium text-[color:var(--color-foreground)] hover:text-[color:var(--color-brand)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const open = openSubmenu === item.label;
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-3 text-base font-medium text-[color:var(--color-foreground)] hover:text-[color:var(--color-brand)]"
                    aria-expanded={open}
                    onClick={() => toggleSubmenu(item.label)}
                  >
                    <span>{item.label}</span>
                    <i
                      className={`icofont-rounded-down transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {open ? (
                    <ul className="pb-2 pl-4">
                      {item.children?.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={close}
                            className="block py-2 text-sm text-[color:var(--color-foreground)] hover:text-[color:var(--color-brand)]"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
}
