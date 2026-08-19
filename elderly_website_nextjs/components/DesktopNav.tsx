"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "./nav-items";
import { IconChevronDown } from "./icons";

const CLOSE_DELAY_MS = 220;

/**
 * Desktop nav. Dropdowns stay open while the pointer is over the item or
 * the menu (with a short leave delay so the gap cannot close it). Clicking
 * a child link — or the parent label — closes the menu.
 */
export function DesktopNav() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openMenu(label: string) {
    clearCloseTimer();
    setOpenLabel(label);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenLabel(null), CLOSE_DELAY_MS);
  }

  function closeMenu() {
    clearCloseTimer();
    setOpenLabel(null);
  }

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (rootRef.current.contains(e.target as Node)) return;
      closeMenu();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
      clearCloseTimer();
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
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => openMenu(item.label)}
              onMouseLeave={scheduleClose}
            >
              <div className="inline-flex items-center">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="inline-flex items-center rounded-l px-3 py-2 text-sm font-medium text-[color:var(--color-foreground)] transition-colors hover:text-[color:var(--color-brand)]"
                >
                  {item.label}
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    isOpen ? closeMenu() : openMenu(item.label)
                  }
                  className="inline-flex items-center rounded-r py-2 pr-3 text-[color:var(--color-foreground)] transition-colors hover:text-[color:var(--color-brand)]"
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  aria-label={`${item.label} menu`}
                >
                  <IconChevronDown
                    className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              {isOpen ? (
                <div
                  role="menu"
                  className="absolute left-0 top-full z-50 min-w-[220px] pt-2"
                >
                  <div className="min-w-[280px] rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-white p-2 shadow-[var(--shadow-card)]">
                    <ul className="flex flex-col">
                      {item.children?.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            role="menuitem"
                            onClick={closeMenu}
                            className="block rounded px-3 py-2 text-sm text-[color:var(--color-foreground)] transition-colors hover:bg-[color:var(--color-muted)] hover:text-[color:var(--color-brand)]"
                          >
                            <span className="block font-semibold">{child.label}</span>
                            {child.hint ? (
                              <span className="mt-0.5 block text-xs font-normal text-[color:var(--color-muted-foreground)]">
                                {child.hint}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
