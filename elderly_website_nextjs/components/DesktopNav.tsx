import Link from "next/link";
import { NAV_ITEMS } from "./nav-items";

/**
 * Horizontal navigation for the desktop viewport (>= lg). Dropdowns for
 * Services and Locations use pure CSS `group-hover` — no client state, no JS.
 * Legacy source: about.html header `<nav class="navbar navbar-expand-lg">`.
 */
export function DesktopNav() {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
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
          return (
            <li key={item.label} className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded px-3 py-2 text-sm font-medium text-[color:var(--color-foreground)] transition-colors hover:text-[color:var(--color-brand)]"
                aria-haspopup="menu"
              >
                {item.label}
                <i
                  className="icofont-rounded-down text-xs"
                  aria-hidden="true"
                />
              </button>
              <div
                role="menu"
                className="pointer-events-none invisible absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-white p-2 opacity-0 shadow-[var(--shadow-card)] transition-opacity duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100"
              >
                <ul className="flex flex-col">
                  {item.children?.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        role="menuitem"
                        className="block rounded px-3 py-2 text-sm text-[color:var(--color-foreground)] transition-colors hover:bg-[color:var(--color-muted)] hover:text-[color:var(--color-brand)]"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
