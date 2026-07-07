"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
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
      <Check className="h-3 w-3" strokeWidth={3} />
      Read
    </span>
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
