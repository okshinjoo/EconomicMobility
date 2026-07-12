"use client";

// The overlay chrome for the intercepted /account modal: a scrim that keeps
// the page you were on visible behind, an X (top right) that router.back()s
// you to exactly where you were, Escape + scrim-click to do the same, and a
// scroll-locked, scrollable sheet for the account content.
//
// NOTE: this renders as a direct child of <body> (the @modal slot), where
// the unlayered `body > *` grain rule pins z-index — position and zIndex
// must be INLINE styles (same gotcha as MobileNav/SearchDialog).

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function AccountOverlayShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [router]);

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 80 }}
      role="dialog"
      aria-modal="true"
      aria-label="Your account"
    >
      {/* scrim — the page behind stays visible through it */}
      <div
        onClick={() => router.back()}
        className="absolute inset-0 bg-ink/70 backdrop-blur-[2px]"
      />

      {/* sheet */}
      <div className="absolute inset-0 overflow-y-auto">
        <div className="pointer-events-none mx-auto flex min-h-full max-w-[88rem] items-start justify-center px-3 py-6 sm:px-6 lg:py-10">
          <div className="pointer-events-auto relative w-full">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Close and go back"
              title="Close (Esc)"
              className="absolute -top-2 right-0 z-10 flex h-10 w-10 -translate-y-full items-center justify-center rounded-full bg-cream text-ink shadow-md transition-colors hover:bg-amber"
            >
              <X className="h-5 w-5" strokeWidth={2.25} />
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
