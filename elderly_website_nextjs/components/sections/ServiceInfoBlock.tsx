import Image from "next/image";
import { Container } from "@/components/Container";
import { IconCheck } from "@/components/icons";

export interface ServiceInfoBullet {
  title: string;
  body: string;
}

interface ServiceInfoBlockProps {
  heading: string;
  /** Optional intro paragraph above the bullet list. */
  intro?: string;
  bullets: readonly ServiceInfoBullet[];
  image: string;
  imageAlt: string;
  /** When true, image renders on the left (default is right). */
  reversed?: boolean;
  /** When true, applies a tinted section background. */
  tinted?: boolean;
}

/**
 * Two-column block used repeatedly on service pages: heading + intro + a
 * bulleted list of icon+title+body items on one side, illustration on the
 * other. Alternates left/right via the `reversed` prop.
 */
export function ServiceInfoBlock({
  heading,
  intro,
  bullets,
  image,
  imageAlt,
  reversed = false,
  tinted = false,
}: ServiceInfoBlockProps) {
  const sectionClass = tinted
    ? "section-y bg-[color:var(--color-highlight)]"
    : "section-y";
  return (
    <section className={sectionClass}>
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center lg:gap-8">
          <div className={reversed ? "md:order-2" : ""}>
            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-2xl leading-tight sm:text-3xl md:text-4xl">
              {heading}
            </h2>
            {intro ? (
              <p className="mb-6 text-base leading-relaxed text-[color:var(--color-muted-foreground)] sm:text-lg">
                {intro}
              </p>
            ) : null}
            <ul className="space-y-5">
              {bullets.map((b) => (
                <li key={b.title} className="flex items-start gap-4">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-white">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">{b.title}</h3>
                    <p className="text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
                      {b.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={reversed ? "md:order-1" : ""}>
            <Image quality={95}
              src={image}
              alt={imageAlt}
              width={720}
              height={720}
              className="mx-auto w-full max-w-[520px] rounded-[var(--radius-lg)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
