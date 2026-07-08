"use client";

import { useEffect, useState, type ReactNode } from "react";
import { getReadMap } from "@/lib/readTracking";

/**
 * A grid that sinks already-read items to the bottom (stable within each
 * half, so the curated order survives). Server renders the curated order;
 * the reshuffle happens after mount from the device's read map, so there's
 * no hydration mismatch. The cards themselves keep their ReadBadge "Read"
 * chip as the indicator.
 *
 * `onlyWhenRead` items are the flip side of a featured banner elsewhere on
 * the page (see HideWhenRead): hidden until the read map says they've been
 * read, at which point the banner bows out and the compact card joins the
 * grid's read pile.
 */
export default function ReadOrderedGrid({
  items,
  className,
}: {
  items: { slug: string; node: ReactNode; onlyWhenRead?: boolean }[];
  className?: string;
}) {
  const [readSlugs, setReadSlugs] = useState<Set<string> | null>(null);

  useEffect(() => {
    setReadSlugs(new Set(Object.keys(getReadMap())));
  }, []);

  const visible = items.filter((i) =>
    i.onlyWhenRead ? Boolean(readSlugs?.has(i.slug)) : true
  );
  const ordered = readSlugs
    ? [
        ...visible.filter((i) => !readSlugs.has(i.slug)),
        ...visible.filter((i) => readSlugs.has(i.slug)),
      ]
    : visible;

  return (
    <div className={className}>
      {ordered.map((i) => (
        <div key={i.slug} className="h-full">
          {i.node}
        </div>
      ))}
    </div>
  );
}

/** Renders its children until the given article has been read, then nothing.
 *  Pairs with a ReadOrderedGrid `onlyWhenRead` item so content demotes
 *  instead of disappearing. */
export function HideWhenRead({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const [read, setRead] = useState(false);
  useEffect(() => {
    if (getReadMap()[slug]) setRead(true);
  }, [slug]);
  if (read) return null;
  return <>{children}</>;
}
