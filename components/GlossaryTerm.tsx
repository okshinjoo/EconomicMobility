"use client";

import { useState } from "react";
import Link from "next/link";

export default function GlossaryTerm({
  slug,
  term,
  definition,
}: {
  slug: string;
  term: string;
  definition: string;
}) {
  const [open, setOpen] = useState(false);

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
          <Link
            href={`/glossary#${slug}`}
            className="mt-2.5 inline-block text-xs font-semibold text-forest hover:text-amber-deep"
          >
            Open in glossary →
          </Link>
          <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-sand bg-cream" />
        </span>
      )}
    </span>
  );
}
