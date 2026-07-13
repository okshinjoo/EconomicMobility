"use client";

// The For Students microsite header (July 2026, owner call modeled on the
// program-site pattern: enter /students and the section runs on its own
// subnav, with an explicit door back to the main site). Applied to every
// /students/* route by app/students/layout.tsx — those pages do NOT render
// the main <Header />. Mobile: the subnav scrolls horizontally instead of
// collapsing into a drawer, so every section stays one tap away.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AccountButton from "@/components/AccountButton";

const LINKS: Array<{ label: string; href: string; exact?: boolean }> = [
  { label: "Overview", href: "/students", exact: true },
  { label: "Deadlines", href: "/students#calendar" },
  { label: "Scholarships", href: "/students/scholarships" },
  { label: "Tracker", href: "/students/tracker" },
];

export default function StudentHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-forest/95 text-cream backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5">
        {/* Lockup: the brand plus the section sticker */}
        <Link
          href="/students"
          className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber font-display text-lg font-bold text-ink">
            E
          </span>
          <span className="hidden font-display text-xl font-semibold tracking-tight sm:block">
            <span className="text-amber">EMP</span>ower
          </span>
          <span className="-rotate-2 rounded-md border-2 border-ink bg-amber px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink shadow-[2px_2px_0_#11211c]">
            Students
          </span>
        </Link>

        {/* Section subnav — scrolls sideways on small screens */}
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto text-sm font-medium">
          {LINKS.map((l) => {
            const active = l.exact
              ? pathname === l.href
              : !l.href.includes("#") && pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap rounded-full px-3 py-2 transition-colors ${
                  active
                    ? "font-bold text-amber"
                    : "text-cream/80 hover:text-amber"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* The door back, then the account */}
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-cream/80 underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-amber"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Main site
          </Link>
          <AccountButton />
        </div>
      </nav>
    </header>
  );
}
