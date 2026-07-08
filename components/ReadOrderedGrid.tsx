"use client";

import { useEffect, useState, type ReactNode } from "react";
import { getReadMap } from "@/lib/readTracking";

/**
 * A grid that sinks already-read items to the bottom (stable within each
 * half, so the curated order survives). Server renders the curated order;
 * the reshuffle happens after mount from the device's read map, so there's
 * no hydration mismatch. The cards themselves keep their ReadBadge "Read"
 * chip as the indicator.
 */
export default function ReadOrderedGrid({
  items,
  className,
}: {
  items: { slug: string; node: ReactNode }[];
  className?: string;
}) {
  const [readSlugs, setReadSlugs] = useState<Set<string> | null>(null);

  useEffect(() => {
    setReadSlugs(new Set(Object.keys(getReadMap())));
  }, []);

  const ordered = readSlugs
    ? [
        ...items.filter((i) => !readSlugs.has(i.slug)),
        ...items.filter((i) => readSlugs.has(i.slug)),
      ]
    : items;

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
