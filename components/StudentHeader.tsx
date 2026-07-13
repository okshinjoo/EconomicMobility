"use client";

// The For Students microsite header (July 2026): its own subnav with REAL
// dropdowns — every entry resolves to actual content — plus the door back
// to the main site. CSS-only hover dropdowns (same pattern as the main
// Header: pt-3 bridge, group-hover/focus-within). On touch screens there's
// no hover, so each dropdown trigger navigates to its primary destination;
// the subnav row scrolls horizontally instead of collapsing.

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  BookOpen,
  GraduationCap,
  ArrowRightLeft,
  Wallet,
  Map,
  Compass,
  CalendarDays,
  Mail,
  FileText,
  Award,
  Search,
  Landmark,
  HeartHandshake,
  Briefcase,
  Wrench,
  ClipboardList,
  Calculator,
  Scale,
  Banknote,
  Users,
  MessageCircle,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { topics } from "@/lib/topics";
import AccountButton from "@/components/AccountButton";
import SearchDialog from "@/components/SearchDialog";
import type { SearchItem } from "@/lib/search";

interface StudentDropItem {
  label: string;
  href: string;
  desc: string;
  icon?: LucideIcon;
  color?: string;
}

interface StudentNavEntry {
  label: string;
  href: string;
  exact?: boolean;
  items?: StudentDropItem[];
  /** Small link row under the items, main-Header style. */
  footer?: { label: string; href: string }[];
  /** Two-column panel for long lists. */
  columns?: 2;
}


const NAV: StudentNavEntry[] = [
  { label: "Overview", href: "/students", exact: true },
  {
    label: "Guides",
    href: "/students/learn/college",
    items: [
      { label: "College & aid guides", href: "/students/learn/college", desc: "All 20 — FAFSA, aid letters, loans, transfer, repayment.", icon: GraduationCap, color: "#c9842a" },
      { label: "FAFSA, Step by Step", href: "/students/learn/college/fafsa-step-by-step", desc: "The one form that unlocks most college aid.", icon: FileText, color: "#0c4a39" },
      { label: "The transfer money guide", href: "/students/learn/college/community-college-transfer-money", desc: "Protect the community-college discount.", icon: ArrowRightLeft, color: "#c4573b" },
      { label: "Student life essentials", href: "/students#shelf", desc: "Paychecks, taxes, first cards — beyond tuition.", icon: Wallet, color: "#15624b" },
      { label: "Paying for College (course)", href: "/students/courses/paying-for-college", desc: "The focused module, badge at the end.", icon: BookOpen, color: "#c9842a" },
      { label: "The pay-for-college path", href: "/students/journey/college", desc: "Milestone by milestone, FAFSA to signing day.", icon: Map, color: "#0c4a39" },
    ],
    footer: [
      { label: "All nine money topics", href: "/students/learn" },
      { label: "Glossary", href: "/students/glossary" },
    ],
  },
  {
    label: "Your Path",
    href: "/students/journey/college",
    items: [
      { label: "Pay for college — the path", href: "/students/journey/college", desc: "Ordered milestones, FAFSA to signing day.", icon: Map, color: "#c9842a" },
      { label: "Paying for College (course)", href: "/students/courses/paying-for-college", desc: "The focused module, badge at the end.", icon: BookOpen, color: "#c4573b" },
      { label: "Student Tracker", href: "/students/tracker", desc: "Units, grades, GPA — for HS, CC, and university.", icon: ClipboardList, color: "#0c4a39" },
      { label: "My Plan", href: "/students/plan", desc: "Five questions, one personal plan that checks itself off.", icon: Compass, color: "#15624b" },
    ],
    footer: [
      { label: "All guided paths", href: "/students/journey" },
      { label: "All courses", href: "/students/courses" },
      { label: "The 2-minute quiz", href: "/students/quiz" },
    ],
  },
  {
    label: "Deadlines",
    href: "/students/deadlines",
    columns: 2,
    items: [
      { label: "The money calendar", href: "/students/deadlines", desc: "Six dates that move real money, every year.", icon: CalendarDays, color: "#c4573b" },
      { label: "Email reminders", href: "/students/deadlines#reminders", desc: "Deadline nudges + college advice — pick what you want.", icon: Mail, color: "#0c4a39" },
      { label: "FAFSA, Step by Step", href: "/students/learn/college/fafsa-step-by-step", desc: "The one deadline that outranks the rest.", icon: FileText, color: "#c9842a" },
      { label: "FAFSA mistakes to avoid", href: "/students/learn/college/fafsa-mistakes", desc: "The errors that delay aid, and their fixes.", icon: FileText, color: "#15624b" },
      { label: "First-time taxes", href: "/students/learn/taxes/filing-taxes-first-time", desc: "April 15, minus the fear — where to start.", icon: Landmark, color: "#0c4a39" },
      { label: "Repaying student loans", href: "/students/learn/college/repaying-student-loans", desc: "Plans, forgiveness, and the July 1 rate reset.", icon: Banknote, color: "#c4573b" },
    ],
    footer: [
      { label: "Scholarship season", href: "/students/learn/college/finding-scholarships" },
      { label: "Before you sign a loan", href: "/students/learn/college/student-loans-before-you-sign" },
    ],
  },
  {
    label: "Scholarships",
    href: "/students/scholarships",
    columns: 2,
    items: [
      { label: "The Scholarship Finder", href: "/students/scholarships", desc: "25 vetted national awards, filters for your stage.", icon: Award, color: "#c9842a" },
      { label: "Big national databases", href: "/students/scholarships#more", desc: "BigFuture, Immigrants Rising, UNCF — the deep wells.", icon: Search, color: "#0c4a39" },
      { label: "Winning scholarships", href: "/students/learn/college/finding-scholarships", desc: "Where to look and how to actually win.", icon: FileText, color: "#c4573b" },
      { label: "Grants vs. loans vs. scholarships", href: "/students/learn/college/grants-loans-scholarships", desc: "Free money first — know the difference.", icon: Landmark, color: "#15624b" },
      { label: "Undocumented & DACA aid", href: "/students/learn/college/undocumented-daca-aid", desc: "Real aid paths that don't require citizenship.", icon: HeartHandshake, color: "#c9842a" },
      { label: "Work-study, explained", href: "/students/learn/college/work-study-explained", desc: "The campus job that comes with your aid letter.", icon: Briefcase, color: "#0c4a39" },
    ],
    footer: [
      { label: "In high school?", href: "/students/scholarships?stage=high-school" },
      { label: "Transferring?", href: "/students/scholarships?stage=transfer" },
      { label: "No citizenship?", href: "/students/scholarships?undoc=1" },
      { label: "Reading an award letter", href: "/students/learn/college/reading-aid-award-letter" },
      { label: "Appealing your aid", href: "/students/learn/college/appealing-financial-aid" },
    ],
  },
  {
    label: "Community",
    href: "/students/community",
    items: [
      { label: "The Students channel", href: "/students/community", desc: "Aid, loans, first paychecks — people in your semester.", icon: Users, color: "#0c4a39" },
      { label: "Introduce yourself", href: "/students/community/post/say-hello", desc: "The start-here thread — say hi, no stakes.", icon: MessageCircle, color: "#c9842a" },
      { label: "Ask a question anonymously", href: "/ask", desc: "No account, no name — we answer the good ones.", icon: HelpCircle, color: "#c4573b" },
    ],
  },
  {
    label: "Tools",
    href: "/students/tools",
    columns: 2,
    items: [
      { label: "All tools", href: "/students/tools", desc: "Every calculator, in-house — numbers follow you.", icon: Wrench, color: "#0c4a39" },
      { label: "Student Tracker", href: "/students/tracker", desc: "Units, grades, GPA — for HS, CC, and university.", icon: ClipboardList, color: "#c4573b" },
      { label: "College Cost", href: "/students/tools/college-cost", desc: "The gap after aid, and what filling it costs.", icon: Calculator, color: "#c9842a" },
      { label: "Compare Aid Offers", href: "/students/tools/compare-offers", desc: "Two award letters, side by side.", icon: Scale, color: "#15624b" },
      { label: "Student Loan", href: "/students/tools/student-loan", desc: "The real monthly cost of borrowing.", icon: Banknote, color: "#0c4a39" },
      { label: "Paycheck", href: "/students/tools/paycheck", desc: "What a campus job pays after taxes.", icon: Wallet, color: "#c9842a" },
      { label: "Budget Planner", href: "/students/tools/budget", desc: "Take-home pay against real expenses.", icon: Calculator, color: "#c4573b" },
      { label: "Reality Check", href: "/students/tools/reality-check", desc: "Pick the life you want; see the salary it takes.", icon: Compass, color: "#15624b" },
    ],
    footer: [
      { label: "Rent", href: "/students/tools/rent" },
      { label: "Emergency Fund", href: "/students/tools/emergency-fund" },
      { label: "Templates", href: "/students/tools/templates" },
      { label: "Letter Generator", href: "/students/tools/letters" },
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
        <div
          className={`rounded-2xl border border-ink-600 bg-ink p-2 shadow-2xl ${
            entry.columns === 2 ? "w-[31rem]" : "w-80"
          }`}
        >
          <div
            className={entry.columns === 2 ? "grid grid-cols-2 gap-1" : "space-y-0.5"}
          >
            {entry.items!.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-ink-700"
              >
                {item.icon && (
                  <span
                    className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${item.color}1f`, color: item.color ?? "#e7a33c" }}
                  >
                    <item.icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-cream">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-cream/55">
                    {item.desc}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          {entry.footer && (
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 border-t border-ink-600 px-3 pb-1 pt-2">
              {entry.footer.map((f) => (
                <Link
                  key={f.href}
                  href={f.href}
                  className="text-xs font-semibold text-amber transition-colors hover:text-cream"
                >
                  {f.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StudentHeader({
  searchItems,
}: {
  searchItems: SearchItem[];
}) {
  const pathname = usePathname();

  return (
    <header
      // Direct child of <body> (students layout renders a fragment), so the
      // unlayered body>* grain rule would pin position/z-index — sticky and
      // z-50 MUST be inline here (same gotcha as MobileNav/SearchDialog).
      style={{ position: "sticky", top: 0, zIndex: 50 }}
      className="border-b border-white/10 bg-forest/95 text-cream backdrop-blur"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5">
        <Link
          href="/students"
          className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber font-display text-lg font-bold text-ink">
            E
          </span>
          <span className="hidden font-display text-xl font-semibold tracking-tight 2xl:block">
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
          <SearchDialog items={searchItems} />
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
