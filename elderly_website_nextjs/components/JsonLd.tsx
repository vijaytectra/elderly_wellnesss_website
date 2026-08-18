interface JsonLdProps {
  data: Record<string, unknown> | ReadonlyArray<Record<string, unknown>>;
  /** Optional stable id so React can dedupe multiple JSON-LD blocks. */
  id?: string;
}

/**
 * Server-rendered JSON-LD `<script>` tag. Serializes `data` to JSON with
 * `<` escaping so the payload cannot break out of the script element.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
