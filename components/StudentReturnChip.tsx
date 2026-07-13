"use client";

// The way home (July 2026): once a tab has seen the For Students microsite,
// shared pages (guides, courses, the glossary) float a small chip back to
// it. Two moods (owner note, July 13: "Back" reads wrong if you started on
// the homepage): stepping OUT of /students mid-browse says "Back to
// Students"; any other arrival — landing on the homepage fresh, a reload —
// invites instead ("Check out For Students"). The distinction lives in the
// sessionStorage value: "seen" (been to the hub) upgrades to "exit" only on
// a client-side navigation out of /students, and a fresh page load decays
// "exit" back to "seen" so "Back" never outlives the browsing flow that
// earned it. Dismiss clears everything for the tab. Mounted as a direct
// child of <body>, so position/z-index are INLINE (the unlayered body>*
// grain rule would pin utility classes). z 52: under the chat (55); chip
// floats bottom-left, chat bottom-right.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, GraduationCap, X } from "lucide-react";

const KEY = "empower:from-students";

type Mode = "hidden" | "back" | "invite";

export default function StudentReturnChip() {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);
  const [mode, setMode] = useState<Mode>("hidden");

  useEffect(() => {
    const prev = prevPath.current;
    prevPath.current = pathname;
    try {
      if (pathname.startsWith("/students")) {
        window.sessionStorage.setItem(KEY, "seen");
        setMode("hidden");
        return;
      }
      const stored = window.sessionStorage.getItem(KEY);
      if (!stored) {
        setMode("hidden");
        return;
      }
      if (prev?.startsWith("/students")) {
        // Just walked out of the microsite — the road back matters.
        window.sessionStorage.setItem(KEY, "exit");
        setMode("back");
      } else if (prev === null && stored === "exit") {
        // Fresh page load: the old exit is a different browsing flow now.
        window.sessionStorage.setItem(KEY, "seen");
        setMode("invite");
      } else {
        setMode(stored === "exit" ? "back" : "invite");
      }
    } catch {
      setMode("hidden");
    }
  }, [pathname]);

  if (mode === "hidden") return null;

  return (
    <div
      className="pointer-events-none"
      style={{ position: "fixed", left: 16, bottom: 16, zIndex: 52 }}
    >
      <div className="pointer-events-auto flex items-center gap-1.5">
        <Link
          href="/students"
          className="btn-ink inline-flex items-center gap-1.5 rounded-md bg-amber px-4 py-2 text-sm font-bold text-ink"
        >
          {mode === "back" ? (
            <>
              <ArrowLeft className="h-4 w-4" />
              Back to Students
            </>
          ) : (
            <>
              <GraduationCap className="h-4 w-4" />
              Check out For Students
            </>
          )}
        </Link>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            try {
              window.sessionStorage.removeItem(KEY);
            } catch {}
            setMode("hidden");
          }}
          className="flex h-7 w-7 items-center justify-center rounded-md border-2 border-ink bg-cream text-ink shadow-[2px_2px_0_#11211c] transition-transform hover:-translate-y-0.5"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
