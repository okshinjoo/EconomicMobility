// Internships & opportunities (July 2026, owner ask: "fellowships,
// programs, research, etc."): the experience side of the student money
// story, built on the Scholarship Finder pattern — hand-verified list,
// audience doors, no forms about you. Student-native page (no main-site
// twin, like /students/scholarships).

import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Suspense } from "react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import OpportunityFinder from "@/components/OpportunityFinder";
import { frameHref } from "@/lib/frame";
import { opportunities } from "@/lib/opportunities";

export const metadata: Metadata = {
  title: "Internships & Opportunities | Empower — Economic Mobility Project",
  description:
    "Hand-verified internships, fellowships, research programs, and college-access programs for first-gen, low-income, and immigrant students. Free to apply, many of them paid.",
};

const AUDIENCE_DOORS = [
  { label: "I'm in high school", href: "/students/opportunities?stage=high-school" },
  { label: "I'm in college now", href: "/students/opportunities?stage=college" },
  { label: "Paid internships", href: "/students/opportunities?type=internship" },
  { label: "Research programs", href: "/students/opportunities?type=research" },
  { label: "I don't have citizenship", href: "/students/opportunities?undoc=1" },
];

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">

      {/* Hero — A-voice amber field: getting paid deserves the loud color */}
      <section className="relative overflow-hidden border-y-2 border-ink bg-amber text-ink">
        <Briefcase
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-8 h-80 w-80 text-ink opacity-[0.07]"
          strokeWidth={1}
        />
        <div className="relative mx-auto max-w-5xl px-6 pb-12 pt-12">
          <nav className="text-sm font-medium text-ink/70">
            <Link
              href="/students"
              className="underline decoration-ink/40 decoration-2 underline-offset-4 hover:text-ink"
            >
              For Students
            </Link>{" "}
            / Opportunities
          </nav>
          <span className="mt-5 inline-block -rotate-1 rounded-md border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
            {opportunities.length} programs · verified · free to apply
          </span>
          <h1 className="mt-4 font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Get paid to{" "}
            <span className="relative whitespace-nowrap text-forest">
              get ahead.
              <svg
                aria-hidden="true"
                viewBox="0 0 300 18"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-cream"
                preserveAspectRatio="none"
              >
                <path
                  d="M3,13 C60,4 120,4 160,9 C210,15 260,8 297,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/80">
            {opportunities.length} real internships, fellowships, research
            programs, and college-access programs, each one verified by us,
            free to apply, and linked straight to its official page. Many pay
            you; none charge you.
          </p>
          <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-ink">
            These are the doors scholarships don&apos;t open: work
            experience, a research line on your resume, and a network,
            often with a stipend attached.
          </p>

          {/* Start from who you are — pre-sets the filters below */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink/70">
              Start from who you are
            </span>
            {AUDIENCE_DOORS.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="rounded-lg border-2 border-ink bg-cream px-3.5 py-1.5 text-sm font-bold text-ink shadow-[2px_2px_0_#11211c] transition-transform duration-150 hover:-translate-y-0.5"
              >
                {d.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <Suspense>
            <OpportunityFinder />
          </Suspense>
        </div>
      </section>

      {/* The money pairing */}
      <section className="border-t-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="card-ink flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-cream px-7 py-6">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                The other half of the money
              </span>
              <p className="mt-2 font-display text-xl font-bold text-ink">
                Scholarships pay for school. Opportunities pay you.
              </p>
              <p className="mt-1.5 text-sm leading-6 text-stone">
                Work both lists each season. The{" "}
                <Link
                  href="/students/scholarships"
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  Scholarship Finder
                </Link>{" "}
                has {""}the awards, and your{" "}
                <Link
                  href="/students/tracker"
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  tracker
                </Link>{" "}
                keeps the applications straight.
              </p>
            </div>
            <Link
              href={frameHref("/learn/college/work-study-explained", "student")}
              className="btn-ink inline-flex items-center rounded-md bg-forest px-6 py-3 text-sm font-bold text-cream"
            >
              Work-study, explained
            </Link>
          </div>
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
