import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ScholarshipFinder from "@/components/ScholarshipFinder";
import ScholarshipDbSearch from "@/components/ScholarshipDbSearch";
import { scholarships } from "@/lib/scholarships";

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
          <p className="mt-4 text-sm font-semibold text-forest">
            First time scholarship hunting?{" "}
            <Link
              href="/learn/college/finding-scholarships"
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
          <ScholarshipFinder />
        </div>
      </section>

      {/* The full national database — renders only once the CareerOneStop
          credentials exist in the environment (docs/scholarship-db-setup.md) */}
      {process.env.CAREERONESTOP_USER_ID &&
        process.env.CAREERONESTOP_TOKEN && (
          <section className="border-t-2 border-ink bg-paper-deep">
            <div className="mx-auto max-w-5xl px-6 py-12">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Go wider
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                Search the full national database
              </h2>
              <p className="mt-2 max-w-2xl text-base leading-7 text-stone">
                Thousands more awards, searched live from the U.S. Department
                of Labor&apos;s public scholarship database. Broader but less
                hand-checked than our list above — read each one&apos;s
                official page with{" "}
                <Link
                  href="/learn/money-safety/how-to-spot-a-scam"
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  your scam radar on
                </Link>
                .
              </p>
              <div className="mt-6">
                <ScholarshipDbSearch />
              </div>
            </div>
          </section>
        )}

      {/* More places to search — launcher tier (link the respected free
          searchers; their databases are theirs, our trust tier is ours) */}
      <section className="border-t-2 border-ink bg-paper">
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
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
              href="/learn/college/finding-scholarships"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              here&apos;s how to work them
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
