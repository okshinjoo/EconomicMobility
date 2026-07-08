"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { getReadMap } from "@/lib/readTracking";

/**
 * The three guide links inside a Life Moment card, read-aware: guides this
 * device has read sink to the bottom of the little list and wear a check,
 * same convention as every other article list on the site.
 */
export default function MomentReads({
  reads,
  color,
}: {
  reads: { label: string; href: string }[];
  color: string;
}) {
  const [readSlugs, setReadSlugs] = useState<Set<string>>(new Set());
  useEffect(() => {
    setReadSlugs(new Set(Object.keys(getReadMap())));
  }, []);

  const slugOf = (href: string) => href.split("/").pop() ?? "";
  const isRead = (r: { href: string }) => readSlugs.has(slugOf(r.href));
  const ordered = [...reads.filter((r) => !isRead(r)), ...reads.filter(isRead)];

  return (
    <ul
      className="mt-5 flex-1 space-y-2 border-t-2 pt-4"
      style={{ borderColor: `${color}33` }}
    >
      {ordered.map((r) => {
        const wasRead = isRead(r);
        return (
          <li key={r.href} className="flex items-center gap-2">
            <Link
              href={r.href}
              className={`text-sm font-semibold underline decoration-2 underline-offset-4 transition-colors hover:text-ink ${
                wasRead ? "text-ink/50" : "text-ink/85"
              }`}
              style={{ textDecorationColor: `${color}66` }}
            >
              {r.label}
            </Link>
            {wasRead && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-cream"
                style={{ background: color }}
              >
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
                Read
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
