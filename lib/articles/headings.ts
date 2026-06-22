import type { ArticleBlock } from "./types";

export interface Heading {
  id: string;
  text: string;
}

function slugifyHeading(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/**
 * Returns a stable id-generator that de-duplicates repeated headings. Both the
 * table of contents and the rendered <h2>s must call this in the same block
 * order so their ids line up for anchor links and scroll-spy.
 */
export function makeHeadingIder(): (text: string) => string {
  const seen = new Map<string, number>();
  return (text: string) => {
    const base = slugifyHeading(text) || "section";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n === 0 ? base : `${base}-${n}`;
  };
}

export function extractHeadings(blocks: ArticleBlock[]): Heading[] {
  const ider = makeHeadingIder();
  return blocks
    .filter((b) => b.type === "h2" && b.text)
    .map((b) => ({ id: ider(b.text!), text: b.text!.replace(/\*\*/g, "") }));
}
