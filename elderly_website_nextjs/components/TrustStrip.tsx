import { IconCheck } from "@/components/icons";

const ITEMS = [
  "Trained & Verified Care Professionals",
  "Personalised Care Plans",
  "Regular Family Updates",
  "Serving Tamil Nadu",
] as const;

export function TrustStrip({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      className={
        compact
          ? "flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-semibold text-slate-800"
          : "mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-2.5"
      }
      aria-label="Why families trust Elderly Wellness"
    >
      {ITEMS.map((label) => (
        <li
          key={label}
          className="inline-flex items-start gap-2 text-[13.5px] font-semibold leading-snug text-slate-800"
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand)]/10 text-[color:var(--color-brand)]">
            <IconCheck className="h-3.5 w-3.5" />
          </span>
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}
