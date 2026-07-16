// Career Explorer — LIVE (July 16, 2026; the last parked preview ships,
// same path Compare Colleges took). 100 careers on public BLS data: median
// pay, growth outlook, training path, and the audience-defining
// "earn while you train" filter (paid apprenticeships/academies/employer
// training). Data in lib/careers.ts (vintage-tagged, re-verify when BLS
// refreshes). Student-native page — the layout provides StudentHeader.

import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import HeadlineRise from "@/components/HeadlineRise";
import CareerExplorer from "@/components/CareerExplorer";
import { careers, CAREER_DATA_VINTAGE } from "@/lib/careers";

export const metadata: Metadata = {
  title: "Career Explorer | Empower — Economic Mobility Project",
  description:
    "100 careers with real BLS numbers: median pay, growth outlook, what training each actually needs — and which ones pay you while you learn. Facts, not rankings.",
};

export default function CareerExplorerPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Hero — C voice on forest, sitewide letter-reveal accent */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <div className="relative mx-auto max-w-6xl px-6 py-14 lg:py-20">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber">
            For Students · Tool
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.98] tracking-tight sm:text-6xl">
            What does that job{" "}
            <span className="italic text-amber">
              <HeadlineRise chars>actually pay?</HeadlineRise>
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/75">
            Real numbers for {careers.length} careers: the median paycheck,
            whether the field is growing, what training it truly requires —
            and the paths that <em>pay you</em> while you learn, from union
            apprenticeships to the FAA&apos;s academy. No rankings, no
            gatekeeping, no &ldquo;follow your passion&rdquo; hand-waving.
          </p>
          <p className="mt-4 text-sm font-semibold text-cream/60">
            {CAREER_DATA_VINTAGE} · every figure from public federal data
          </p>
        </div>
      </section>

      {/* How to read this */}
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <p className="max-w-3xl text-sm leading-6 text-stone">
            <span className="font-bold text-ink">How to read this:</span>{" "}
            figures come from the Bureau of Labor Statistics — median pay from
            the May 2024 wage survey, growth from the official 2024–34
            projections. &ldquo;Median&rdquo; means half earn more and half
            earn less; big cities and experience push it up.
            &ldquo;Earn while you train&rdquo; is strict: it marks only paths
            with a genuinely paid pathway — apprenticeships, academies,
            employer-funded training — not just &ldquo;no degree
            required.&rdquo; Every figure was re-verified against bls.gov in July 2026.
          </p>
        </div>
      </section>

      {/* The tool */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <CareerExplorer />
        </div>
      </section>

      {/* Next steps — the tools this pairs with */}
      <section className="border-t-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Turn a career into a plan
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
            Found a number you like? Work backward from it.
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/students/tools/reality-check"
              className="card-ink group flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <h3 className="font-display text-base font-bold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                The Reality Check
              </h3>
              <p className="mt-1 text-sm leading-6 text-stone">
                Pick the life you want — apartment, car, groceries — and see
                the salary it takes. Then come back and find the careers that
                clear it.
              </p>
            </Link>
            <Link
              href="/students/opportunities"
              className="card-ink group flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <h3 className="font-display text-base font-bold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                Internships &amp; Opportunities
              </h3>
              <p className="mt-1 text-sm leading-6 text-stone">
                68 verified internships, fellowships, and programs — many paid
                — that lead into the careers on this page.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
