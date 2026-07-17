"use client";

import { useEffect, useState } from "react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { getReadMap } from "@/lib/readTracking";

/** Small "Read" check chip shown on roadmap cards for finished articles. */
export function ReadBadge({ slug, accent }: { slug: string; accent: string }) {
  const [read, setRead] = useState(false);
  useEffect(() => {
    setRead(Boolean(getReadMap()[slug]));
  }, [slug]);
  if (!read) return null;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-cream"
      style={{ background: accent }}
    >
      <Check className="h-3 w-3" weight="bold" />
      Read
    </span>
  );
}

/** Thin live progress bar for topic cards; renders nothing until started. */
export function TopicBar({
  slugs,
  color,
}: {
  slugs: string[];
  color: string;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const read = getReadMap();
    setCount(slugs.filter((s) => read[s]).length);
  }, [slugs]);
  if (count === 0) return null;
  return (
    <div className="mt-3">
      <div className="h-1 w-full overflow-hidden rounded-full bg-sand">
        <div
          className="h-full rounded-full"
          style={{ width: `${(count / slugs.length) * 100}%`, background: color }}
        />
      </div>
      <p className="mt-1 text-[11px] font-semibold" style={{ color }}>
        {count} of {slugs.length} read
      </p>
    </div>
  );
}

/** "You've read X of N" line for the topic-hub roadmap header. */
export function TopicProgress({
  slugs,
  accent,
}: {
  slugs: string[];
  accent: string;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const read = getReadMap();
    setCount(slugs.filter((s) => read[s]).length);
  }, [slugs]);
  if (count === 0) return null;
  return (
    <span className="font-semibold" style={{ color: accent }}>
      {" "}
      You&apos;ve read {count} of {slugs.length}.
    </span>
  );
}
