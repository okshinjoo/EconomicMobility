"use client";

// "Save this tool to your profile" toggle (July 14 owner ask: save any tool
// into your profile). Sits in CalcSwitcher so every calculator page has it.
// Writes the tool's slug into the shared dashboard prefs (empower:dashboard-
// prefs:v1), the same set the profile's "Your tools" card reads and shows as
// a small mark grid. Local-first: works signed out, syncs when there's an
// account. Mounted-gated so there's no hydration mismatch.

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { isToolSaved, toggleSavedTool, MAX_PINNED_TOOLS } from "@/lib/dashboardPrefs";

export default function SaveToolButton({ slug }: { slug: string }) {
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [full, setFull] = useState(false);

  useEffect(() => {
    setSaved(isToolSaved(slug));
    setMounted(true);
  }, [slug]);

  if (!mounted) return null;

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        aria-pressed={saved}
        onClick={() => {
          const r = toggleSavedTool(slug);
          if (r === "full") {
            setFull(true);
            return;
          }
          setFull(false);
          setSaved(r === "saved");
        }}
        title={
          saved
            ? "Saved to your profile — find it under Your tools"
            : "Save this tool to your profile"
        }
        className={`inline-flex items-center gap-1.5 rounded-md border-2 px-3 py-2 text-sm font-semibold transition-colors ${
          saved
            ? "border-forest bg-forest text-cream"
            : "border-sand bg-cream text-stone hover:border-ink/40 hover:text-ink"
        }`}
      >
        {saved ? (
          <BookmarkCheck className="h-4 w-4" strokeWidth={2} />
        ) : (
          <Bookmark className="h-4 w-4" strokeWidth={2} />
        )}
        {saved ? "Saved to profile" : "Save to profile"}
      </button>
      {full && (
        <span className="text-[11px] font-medium text-terracotta">
          Profile holds {MAX_PINNED_TOOLS} tools — remove one first.
        </span>
      )}
    </span>
  );
}
