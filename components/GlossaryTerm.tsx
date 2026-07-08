"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlossaryTerm({
  slug,
  term,
  definition,
  articleHref,
}: {
  slug: string;
  term: string;
  definition: string;
  /** The term's dedicated guide, when one exists. Hidden when it's the
   *  page you're already on. */
  articleHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const guide = articleHref && articleHref !== pathname ? articleHref : undefined;

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="cursor-help font-medium text-forest underline decoration-forest/40 decoration-dotted underline-offset-2 transition-colors hover:text-amber-deep hover:decoration-amber-deep"
      >
        {term}
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-40 mb-2 block w-64 -translate-x-1/2 rounded-2xl border border-sand bg-cream p-4 text-left shadow-xl"
        >
          <span className="block text-xs font-bold uppercase tracking-wide text-forest">
            {term}
          </span>
          <span className="mt-1.5 block text-sm leading-6 text-ink/80">
            {definition}
          </span>
          <span className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
            {guide && (
              <Link
                href={guide}
                className="inline-block text-xs font-bold text-forest underline decoration-amber decoration-2 underline-offset-2 hover:text-amber-deep"
              >
                Read the full guide
              </Link>
            )}
            <Link
              href={`/glossary#${slug}`}
              className="inline-block text-xs font-semibold text-forest hover:text-amber-deep"
            >
              Open in glossary →
            </Link>
          </span>
          <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-sand bg-cream" />
        </span>
      )}
    </span>
  );
}
