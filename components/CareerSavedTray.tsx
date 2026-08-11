"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Scales, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { readSavedCareerIds, SAVED_CAREERS_EVENT } from "@/lib/savedCareers";

export default function CareerSavedTray() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const refresh = () => setCount(readSavedCareerIds().length);
    refresh();
    window.addEventListener(SAVED_CAREERS_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(SAVED_CAREERS_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  if (count === 0) return null;

  return (
    <div className="mt-5 flex flex-col gap-3 border-y-2 border-ink bg-amber/35 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-center gap-2 text-sm font-bold text-ink">
        <Scales className="h-5 w-5 text-forest" weight="bold" />
        {count} saved {count === 1 ? "career" : "careers"}
        <span className="font-medium text-stone">· compare pay, openings, training, and fit</span>
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <Link
          href="/students/career-explorer/compare"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
        >
          Compare
          <ArrowRight className="h-4 w-4" weight="bold" />
        </Link>
        <Link
          href="/students/career-explorer/plan"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
        >
          Make a plan
          <ArrowRight className="h-4 w-4" weight="bold" />
        </Link>
      </div>
    </div>
  );
}
