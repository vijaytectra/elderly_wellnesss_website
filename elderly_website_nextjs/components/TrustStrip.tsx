const ITEMS = [
  {
    label: "2-Hour Replacement Guarantee",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2786a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Police-Verified, Trained Caregivers",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2786a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    label: "No Lock-In Contracts",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2786a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="16 9 10 15 7 12" />
      </svg>
    ),
  },
] as const;

export function TrustStrip({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-bold text-slate-800"
          : "mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-dashed border-[color:var(--color-brand)]/25 pt-4"
      }
    >
      {ITEMS.map((item) => (
        <div key={item.label} className="inline-flex items-center gap-2 text-[13.5px] font-bold text-slate-800">
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
