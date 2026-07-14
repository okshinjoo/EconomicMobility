// Renders a JSON-LD structured-data block (July 2026, SEO pass — owner:
// "nobody can find my site"). Server-only by nature; drop one of these on
// any page with a schema object from lib/structuredData. Google reads these
// to understand the page and to grant rich results (article bylines, FAQ
// accordions, breadcrumbs, the sitelinks search box).

export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify escapes the payload; no user input flows in here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
