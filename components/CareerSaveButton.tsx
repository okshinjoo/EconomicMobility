"use client";

import { useState, useSyncExternalStore } from "react";
import { BookmarkSimple } from "@phosphor-icons/react/dist/ssr";
import {
  isCareerSaved,
  MAX_SAVED_CAREERS,
  subscribeSavedCareers,
  toggleSavedCareer,
} from "@/lib/savedCareers";

export default function CareerSaveButton({
  careerId,
  compact = false,
  inverse = false,
}: {
  careerId: string;
  compact?: boolean;
  inverse?: boolean;
}) {
  const [full, setFull] = useState(false);
  const saved = useSyncExternalStore(
    subscribeSavedCareers,
    () => isCareerSaved(careerId),
    () => false
  );

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        aria-pressed={saved}
        onClick={() => {
          const result = toggleSavedCareer(careerId);
          if (result === "full") {
            setFull(true);
            return;
          }
          setFull(false);
        }}
        className={`inline-flex items-center gap-1.5 rounded-md border-2 font-bold transition-colors ${
          compact ? "px-2.5 py-1.5 text-xs" : "px-3.5 py-2 text-sm"
        } ${
          saved
            ? inverse
              ? "border-amber bg-amber text-ink"
              : "border-forest bg-forest text-cream"
            : inverse
              ? "border-cream/35 bg-transparent text-cream hover:border-amber hover:text-amber"
              : "border-ink/20 bg-cream text-stone hover:border-ink/50 hover:text-ink"
        }`}
      >
        <BookmarkSimple className="h-4 w-4" weight={saved ? "fill" : "bold"} />
        {saved ? "Saved" : "Save"}
      </button>
      {full && (
        <span className={`max-w-48 text-[11px] font-medium ${inverse ? "text-cream/75" : "text-terracotta"}`}>
          Your shortlist holds {MAX_SAVED_CAREERS}. Remove one to add another.
        </span>
      )}
    </span>
  );
}
