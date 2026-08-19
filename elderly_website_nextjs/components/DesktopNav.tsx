"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "./nav-items";

/**
 * Horizontal navigation for the desktop viewport (>= lg). Dropdowns for
 * Services and Locations are click-toggle (client component) — the previous
 * hover-only pattern closed as soon as the pointer briefly left the trigger
 * or gap between trigger and menu, making the dropdown items hard to reach.
 *
 * Behavior:
 *   - Click a parent to open its menu; click again (or the trigger of a
 *     different parent) to switch.
 *   - Click outside any dropdown to close.
 *   - Press Escape to close and return focus to the trigger.
 *   - Clicking a child link closes the menu (Link handles navigation).
 */
export function DesktopNav() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (rootRef.current.contains(e.target as Node)) return;
      setOpenLabel(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenLabel(null);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <nav aria-label="Primary" className="hidden lg:block" ref={rootRef}>
      <ul className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const hasChildren = !!item.children?.length;
          if (!hasChildren) {
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="inline-flex items-center rounded px-3 py-2 text-sm font-medium text-[color:var(--color-foreground)] transition-colors hover:text-[color:var(--color-brand)]"
                >
                  {item.label}
                </Link>
              </li>
            );
          }
          const isOpen = openLabel === item.label;
          return (
            <li key={item.label} className="relative">
              <button
                type="button"
                onClick={() => setOpenLabel(isOpen ? null : item.label)}
                className="inline-flex items-center gap-1 rounded px-3 py-2 text-sm font-medium text-[color:var(--color-foreground)] transition-colors hover:text-[color:var(--color-brand)]"
                aria-haspopup="menu"
                aria-expanded={isOpen}
              >
                {item.label}
                <i
                  className={`icofont-rounded-down text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {isOpen ? (
                <div
                  role="menu"
                  className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-white p-2 shadow-[var(--shadow-card)]"
                >
                  <ul className="flex flex-col">
                    {item.children?.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          role="menuitem"
                          onClick={() => setOpenLabel(null)}
                          className="block rounded px-3 py-2 text-sm text-[color:var(--color-foreground)] transition-colors hover:bg-[color:var(--color-muted)] hover:text-[color:var(--color-brand)]"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
