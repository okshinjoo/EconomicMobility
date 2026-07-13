"use client";

// The way home (July 2026): when someone leaves the For Students microsite
// for a shared page (a guide, a course, the glossary), a small floating
// chip keeps the road back one tap away. Per-tab memory via sessionStorage
// — set the moment any /students route renders, shown on non-student pages
// until dismissed or the tab closes. Mounted as a direct child of <body>,
// so position/z-index are INLINE (the unlayered body>* grain rule would
// pin utility classes). z 52: under the chat (55) and header (50 is the
// header itself; chip floats bottom-left, chat bottom-right).

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";

const KEY = "empower:from-students";

export default function StudentReturnChip() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (pathname.startsWith("/students")) {
        window.sessionStorage.setItem(KEY, "1");
        setShow(false);
      } else {
        setShow(window.sessionStorage.getItem(KEY) === "1");
      }
    } catch {
      setShow(false);
    }
  }, [pathname]);

  if (!show) return null;

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
          <ArrowLeft className="h-4 w-4" />
          Back to Students
        </Link>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            try {
              window.sessionStorage.removeItem(KEY);
            } catch {}
            setShow(false);
          }}
          className="flex h-7 w-7 items-center justify-center rounded-md border-2 border-ink bg-cream text-ink shadow-[2px_2px_0_#11211c] transition-transform hover:-translate-y-0.5"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
