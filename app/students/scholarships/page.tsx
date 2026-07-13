import Link from "next/link";
import { Suspense } from "react";
import { frameHref } from "@/lib/frame";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ScholarshipFinder from "@/components/ScholarshipFinder";
import SuggestScholarship from "@/components/SuggestScholarship";
import StateResources from "@/components/StateResources";
import { scholarships } from "@/lib/scholarships";

// Audience doors (July 2026, borrowed from the one good idea on the
// lead-gen scholarship sites: sliced entry points — minus their data toll).
// Each pre-sets the finder's filters via query params.
const AUDIENCE_DOORS = [
  { label: "I'm in high school", href: "/students/scholarships?stage=high-school" },
  { label: "I'm in college now", href: "/students/scholarships?stage=college" },
  { label: "I'm transferring", href: "/students/scholarships?stage=transfer" },
  { label: "I don't have citizenship", href: "/students/scholarships?undoc=1" },
];

export const metadata: Metadata = {
  title: "Scholarship Finder | Empower — Economic Mobility Project",
  description:
    "A curated, verified list of real national scholarships for first-gen, low-income, immigrant, and transfer students — filterable by where you are in school, ordered by application season.",
};

export default function ScholarshipsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">

      {/* Hero — compact, light */}
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-5xl px-6 pb-10 pt-12">
          <nav className="text-sm font-medium text-stone">
            <Link
              href="/students"
              className="underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              For Students
            </Link>{" "}
            / Scholarships
          </nav>
          <h1 className="mt-4 font-display text-[2.4rem] font-bold leading-[1.07] tracking-tight text-ink sm:text-5xl">
            The scholarship{" "}
            <span className="relative whitespace-nowrap text-forest">
              starting lineup.
              <svg
                aria-hidden="true"
                viewBox="0 0 300 18"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-amber"
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
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone">
            {scholarships.length} real, established awards — each one verified
            by us, linked straight to its official site, and ordered by where
            it falls in the school year. No fees, no data harvesting, no
            sweepstakes dressed up as scholarships.
          </p>
          <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-ink">
            And no forms about you: other sites make you hand over your
            ethnicity, citizenship, and GPA before showing you a single
            award. Here you just look.
          </p>

          {/* Start from who you are — pre-sets the filters below */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-stone">
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
          <p className="mt-4 text-sm font-semibold text-forest">
            First time scholarship hunting?{" "}
            <Link
              href={frameHref("/learn/college/finding-scholarships", "student")}
              className="underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              Read how to actually win these
            </Link>{" "}
            first.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <Suspense>
            <ScholarshipFinder />
          </Suspense>
          <div className="mt-6">
            <SuggestScholarship />
          </div>
        </div>
      </section>

      {/* Your state's own money — the finder above is national; states run
          their own grants, promise programs, and aid nobody's database
          shows. Same live state finder as /resources. */}
      <section id="states" className="scroll-mt-20 border-t-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Closer to home
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Your state has its own money
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-7 text-stone">
            Beyond the national awards above, most states run their own grant
            and promise programs — some cover community college entirely, and
            many award first-come, first-served with{" "}
            <Link
              href="/students/deadlines"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              deadlines as early as February
            </Link>
            . Pick your state to see what it offers.
          </p>
          <div className="mt-6">
            <StateResources />
          </div>
        </div>
      </section>


      {/* More places to search — launcher tier (link the respected free
          searchers; their databases are theirs, our trust tier is ours) */}
      <section id="more" className="scroll-mt-20 border-t-2 border-ink bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Go even wider
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
            More places to search
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-7 text-stone">
            Free, reputable searchers worth your time — no fees, and no
            handing your data to a marketing machine.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="https://bigfuture.collegeboard.org/scholarship-search"
              target="_blank"
              rel="noopener noreferrer"
              className="card-ink flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <h3 className="font-display text-lg font-bold text-ink">
                BigFuture
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                The College Board&apos;s search — the largest reputable free
                database, searchable without an account.
              </p>
              <span className="mt-3 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4">
                Search BigFuture
              </span>
            </a>
            <a
              href="https://immigrantsrising.org"
              target="_blank"
              rel="noopener noreferrer"
              className="card-ink flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <h3 className="font-display text-lg font-bold text-ink">
                Immigrants Rising
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                Keeps the gold-standard list of scholarships and fellowships
                that don&apos;t require citizenship or residency — look for
                their scholarship list under Resources.
              </p>
              <span className="mt-3 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4">
                Visit Immigrants Rising
              </span>
            </a>
            <a
              href="https://www.careeronestop.org/toolkit/training/find-scholarships.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="card-ink flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <h3 className="font-display text-lg font-bold text-ink">
                CareerOneStop
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                The U.S. Department of Labor&apos;s free scholarship finder —
                thousands of awards, no account needed.
              </p>
              <span className="mt-3 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4">
                Search CareerOneStop
              </span>
            </a>
            <a
              href="https://uncf.org/scholarships"
              target="_blank"
              rel="noopener noreferrer"
              className="card-ink flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <h3 className="font-display text-lg font-bold text-ink">
                UNCF
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                The country&apos;s largest scholarship provider for Black
                students — one portal, many awards on rolling deadlines.
              </p>
              <span className="mt-3 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4">
                Browse UNCF awards
              </span>
            </a>
          </div>
          <p className="mt-6 text-sm leading-6 text-stone">
            And the source no database has: local money. Community
            foundations, employers, and your counselor&apos;s list have the
            best odds in the whole game —{" "}
            <Link
              href={frameHref("/learn/college/finding-scholarships", "student")}
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              here&apos;s how to work them
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
