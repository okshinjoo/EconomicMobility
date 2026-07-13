"use client";

// The way home (July 2026): once a tab has seen the For Students microsite,
// shared pages (guides, courses, the glossary) float a small chip back to
// it. Two moods (owner notes, July 13: "Back" reads wrong if you started on
// the homepage — and it must not linger once you're browsing the main site):
// "Back to Students" appears ONLY on the very first page after a client-side
// navigation out of /students (wherever that lands — it's a navigation aid).
// The "Check out For Students" invite is contextual instead (owner rule,
// July 13): it renders solely on student-RELEVANT pages — the college hub
// and its guides, the student-life guides, the eight student tools — never
// on the homepage or unrelated articles. That list is computed server-side
// (lib/studentShelf.getStudentPagePaths, passed by the root layout) so the
// client never bundles the article registry. sessionStorage just remembers
// the tab has seen the hub; dismiss clears everything for the tab. Mounted
// as a direct child of <body>, so position/z-index are INLINE (the
// unlayered body>* grain rule would pin utility classes). z 52: under the
// chat (55); chip floats bottom-left, chat bottom-right.

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, GraduationCap, X } from "lucide-react";

const KEY = "empower:from-students";

type Mode = "hidden" | "back" | "invite";

export default function StudentReturnChip({
  studentPaths,
}: {
  studentPaths: string[];
}) {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);
  const [mode, setMode] = useState<Mode>("hidden");
  const studentSet = useMemo(() => new Set(studentPaths), [studentPaths]);

  useEffect(() => {
    const prev = prevPath.current;
    prevPath.current = pathname;
    try {
      if (pathname.startsWith("/students")) {
        window.sessionStorage.setItem(KEY, "seen");
        setMode("hidden");
        return;
      }
      if (!window.sessionStorage.getItem(KEY)) {
        setMode("hidden");
        return;
      }
      // "Back" only on the single hop out of the hub. The invite needs a
      // student-relevant page; everywhere else the chip stays quiet.
      if (prev?.startsWith("/students")) setMode("back");
      else setMode(studentSet.has(pathname) ? "invite" : "hidden");
    } catch {
      setMode("hidden");
    }
  }, [pathname, studentSet]);

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
