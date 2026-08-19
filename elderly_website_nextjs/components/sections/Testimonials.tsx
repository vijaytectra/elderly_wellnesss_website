import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/sections/SectionTitle";

const TESTIMONIALS = [
  {
    quote:
      "Living in the US, I was worried about my mother's post-surgery care in Anna Nagar. Elderly Wellness assigned a professional nurse within hours. Highly recommended!",
    name: "Rajesh K., NRI Family (USA)",
  },
  {
    quote:
      "The physiotherapist came daily to our house in Adyar for my father's stroke rehabilitation. His walking has improved dramatically. The 2-hour replacement promise gave us immense confidence.",
    name: "Sundaram V., Adyar, Chennai",
  },
  {
    quote:
      "Transparent pricing with no hidden charges. The care manager sends daily health updates right on the app. Truly a lifesaver for elder care.",
    name: "Anita M., T. Nagar, Chennai",
  },
] as const;

export function Testimonials() {
  return (
    <section className="border-t border-slate-100 section-y">
      <Container>
        <SectionTitle
          badge="Patient & Family Proof"
          heading="Trusted by 500+ Families Across Chennai"
          description={
            <p>
              Read how our verified caregivers and nurses bring peace of mind to
              NRI sons, daughters, and elderly parents.
            </p>
          }
        />
        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3 sm:mt-6">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="h-full rounded-2xl border border-slate-200 bg-white p-7"
            >
              <p className="mb-3 text-base text-amber-500" aria-label="5 stars">
                ★★★★★
              </p>
              <p className="mb-5 text-sm leading-relaxed text-slate-600">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="text-sm font-bold text-slate-900">
                — {t.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
