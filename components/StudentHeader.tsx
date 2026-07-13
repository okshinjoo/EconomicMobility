"use client";

// The For Students microsite header (July 2026): its own subnav with REAL
// dropdowns — every entry resolves to actual content — plus the door back
// to the main site. CSS-only hover dropdowns (same pattern as the main
// Header: pt-3 bridge, group-hover/focus-within). On touch screens there's
// no hover, so each dropdown trigger navigates to its primary destination;
// the subnav row scrolls horizontally instead of collapsing.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
import AccountButton from "@/components/AccountButton";

interface StudentDropItem {
  label: string;
  href: string;
  desc: string;
}

interface StudentNavEntry {
  label: string;
  href: string;
  exact?: boolean;
  items?: StudentDropItem[];
}

const NAV: StudentNavEntry[] = [
  { label: "Overview", href: "/students", exact: true },
  {
    label: "Guides",
    href: "/students/learn/college",
    items: [
      { label: "All college & aid guides", href: "/students/learn/college", desc: "Every FAFSA, loan, and aid guide in one library." },
      { label: "The whole library", href: "/students/learn", desc: "All nine topics — credit, taxes, investing, and more." },
      { label: "The transfer money guide", href: "/students/learn/college/community-college-transfer-money", desc: "Protect the community-college discount." },
      { label: "Student life essentials", href: "/students#shelf", desc: "Paychecks, taxes, first cards — beyond tuition." },
      { label: "Paying for College (course)", href: "/students/courses/paying-for-college", desc: "The focused module, badge at the end." },
      { label: "The pay-for-college path", href: "/students/journey/college", desc: "Milestone by milestone, FAFSA to signing day." },
    ],
  },
  {
    label: "Deadlines",
    href: "/students#calendar",
    items: [
      { label: "The money calendar", href: "/students#calendar", desc: "Six dates that move real money, every year." },
      { label: "Email reminders", href: "/students#reminders", desc: "A nudge a few weeks ahead — pick your dates." },
      { label: "FAFSA, Step by Step", href: "/students/learn/college/fafsa-step-by-step", desc: "The one deadline that outranks the rest." },
    ],
  },
  { label: "Scholarships", href: "/students/scholarships" },
  { label: "Community", href: "/students/community" },
  {
    label: "Tools",
    href: "/students/tools",
    items: [
      { label: "All tools", href: "/students/tools", desc: "Every calculator, in-house — numbers follow you." },
      { label: "Student Tracker", href: "/students/tracker", desc: "Units, grades, GPA, and to-dos in one place." },
      { label: "College Cost", href: "/students/tools/college-cost", desc: "The gap after aid, and what filling it costs." },
      { label: "Compare Aid Offers", href: "/students/tools/compare-offers", desc: "Two award letters, side by side." },
      { label: "Student Loan", href: "/students/tools/student-loan", desc: "The real monthly cost of borrowing." },
      { label: "Paycheck", href: "/students/tools/paycheck", desc: "What a campus job pays after taxes." },
    ],
  },
];

function DropMenu({ entry }: { entry: StudentNavEntry }) {
  return (
    <div className="group relative">
      <Link
        href={entry.href}
        aria-haspopup="true"
        className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-cream/80 transition-colors hover:text-amber group-focus-within:text-amber"
      >
        {entry.label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
      </Link>
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="w-80 rounded-2xl border border-ink-600 bg-ink p-2 shadow-2xl">
          <div className="space-y-0.5">
            {entry.items!.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-ink-700"
              >
                <span className="block text-sm font-semibold text-cream">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-cream/55">
                  {item.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-forest/95 text-cream backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5">
        <Link
          href="/students"
          className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber font-display text-lg font-bold text-ink">
            E
          </span>
          <span className="hidden font-display text-xl font-semibold tracking-tight lg:block">
            <span className="text-amber">EMP</span>ower
          </span>
          <span className="-rotate-2 rounded-md border-2 border-ink bg-amber px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink shadow-[2px_2px_0_#11211c]">
            Students
          </span>
        </Link>

        <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto text-sm font-medium sm:overflow-visible">
          {NAV.map((entry) => {
            if (entry.items) return <DropMenu key={entry.label} entry={entry} />;
            const active = entry.exact
              ? pathname === entry.href
              : pathname.startsWith(entry.href);
            return (
              <Link
                key={entry.label}
                href={entry.href}
                className={`whitespace-nowrap rounded-full px-3 py-2 transition-colors ${
                  active
                    ? "font-bold text-amber"
                    : "text-cream/80 hover:text-amber"
                }`}
              >
                {entry.label}
              </Link>
            );
          })}
        </div>

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
