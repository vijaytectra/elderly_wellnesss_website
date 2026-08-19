import Link from "next/link";
import { SITE_PHONE_TEL } from "@/data/site";

export function StickyBookingBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-2.5 border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] md:hidden">
      <Link
        href="/contact/"
        className="btn-brand flex-1 rounded-full py-2.5 text-center text-sm font-bold"
      >
        Book Care Now
      </Link>
      <a
        href={SITE_PHONE_TEL}
        className="btn-dark inline-flex items-center rounded-full px-4 py-2.5 text-sm font-bold"
      >
        Call
      </a>
    </div>
  );
}
