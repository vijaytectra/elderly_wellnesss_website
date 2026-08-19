import { Container } from "@/components/Container";
import { rewriteHrefsInHtml } from "@/lib/internal-urls";

interface LegalPageProps {
  /** Page heading shown once at the top of the page. */
  title: string;
  /**
   * Raw HTML extracted verbatim from the source `<section class="privacy-policy">`
   * (or `terms-and-conditions`) block. Cleaned of AOS attributes; internal
   * `.html` links rewritten to Next clean paths; no <script>/<style>.
   */
  html: string;
}

/**
 * Shared layout for the three legal pages (privacy, terms, refund). The legacy
 * markup uses `.column-privacy-ploicy` (sic — original spelling preserved from
 * source class names). We pass the extracted body through
 * `dangerouslySetInnerHTML` so the exact wording is preserved without any risk
 * of paraphrasing, then style it with the CSS classes below scoped to
 * `.legal-body`.
 */
export function LegalPage({ title, html }: LegalPageProps) {
  return (
    <section className="legal-body section-y">
      <Container>
        <h1 className="mb-8 font-[family-name:var(--font-serif)] text-3xl leading-tight text-[color:var(--color-foreground)] sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <div
          className="legal-body__content space-y-6 text-base leading-relaxed text-[color:var(--color-foreground)]"
          dangerouslySetInnerHTML={{ __html: rewriteHrefsInHtml(html) }}
        />
      </Container>
      <style>{`
        .legal-body__content h2 { font-size: 1.75rem; font-weight: 700; margin: 2rem 0 1rem; color: var(--color-brand); }
        .legal-body__content h3 { font-size: 1.25rem; font-weight: 700; margin: 1.75rem 0 0.75rem; color: var(--color-foreground); }
        .legal-body__content p { margin: 0 0 1rem; }
        .legal-body__content ul,
        .legal-body__content ol { padding-left: 1.5rem; margin: 0 0 1rem; }
        .legal-body__content ul li,
        .legal-body__content ol li { margin: 0 0 0.5rem; }
        .legal-body__content ul ul,
        .legal-body__content ul ol,
        .legal-body__content ol ul,
        .legal-body__content ol ol { margin-top: 0.5rem; }
        .legal-body__content a { color: var(--color-brand); text-decoration: underline; }
        .legal-body__content a:hover { color: var(--color-brand-dark); }
        .legal-body__content strong { font-weight: 700; }
        .legal-body__content .column-privacy-ploicy { margin-bottom: 1.5rem; }
        .legal-body__content .row-privacy-policy > h2 { display: none; }
        .legal-body__content section.privacy-policy > .container,
        .legal-body__content section.terms-and-conditions > .container { padding: 0; }
        .legal-body__content span { display: inline; }
      `}</style>
    </section>
  );
}
