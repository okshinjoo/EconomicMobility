// Career Explorer — a curated catalog audited against the full BLS detailed
// occupation table. Student-native page; the layout provides StudentHeader.

import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ScrollDrift from "@/components/ScrollDrift";
import HeroRecede from "@/components/HeroRecede";
import TopicMark from "@/components/TopicMark";
import HeadlineRise from "@/components/HeadlineRise";
import CareerExplorer from "@/components/CareerExplorer";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import {
  careers,
  CAREER_COVERAGE_AUDIT_TOTAL,
  CAREER_DATA_VINTAGE,
  CAREER_SOURCE_URLS,
} from "@/lib/careers";
import { opportunities } from "@/lib/opportunities";

export const metadata: Metadata = {
  title: "Career Explorer | Empower — Economic Mobility Project",
  description:
    `${careers.length} careers with real BLS numbers: median pay, growth outlook, what training each actually needs — and which ones pay you while you learn. Facts, not rankings.`,
};

export default function CareerExplorerPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Hero — C voice on forest, sitewide letter-reveal accent */}
      <section id="main-content" tabIndex={-1} className="relative overflow-hidden bg-forest text-cream">
        <ScrollDrift range={60} driftX={30} rotate={-6}>
          <TopicMark
            id="credit"
            color="#fbf8f1"
            className="pointer-events-none absolute -right-16 -top-12 h-[24rem] w-[24rem] opacity-[0.16]"
          />
        </ScrollDrift>
        <HeroRecede className="relative mx-auto max-w-6xl px-6 py-14 lg:py-20">
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
            Real numbers for {careers.length} distinct careers: the median paycheck,
            whether the field is growing, what training it truly requires —
            and the paths that <em>pay you</em>{" "}while you learn, from union
            apprenticeships to the FAA&apos;s academy. No rankings, no
            gatekeeping, no &ldquo;follow your passion&rdquo; hand-waving.
          </p>
          <p className="mt-4 text-sm font-semibold text-cream/60">
            {CAREER_DATA_VINTAGE} · every figure from public federal data
          </p>
        </HeroRecede>
      </section>

      {/* How to read this */}
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <p className="max-w-3xl text-sm leading-6 text-stone">
            <span className="font-bold text-ink">How to read this:</span>{" "}
            pay and national employment come from the Bureau of Labor
            Statistics&apos; May 2025 wage survey; growth, yearly openings, and
            typical entry education come from the official 2024–34 projections.
            Detailed tasks, interests, work styles, and alternate job titles come
            from O*NET 30.3. Choose a state and metro on any profile for local BLS
            medians, explore public programs and paid routes, or save careers to compare up to four side by side.
            &ldquo;Median&rdquo; means half earn more and half earn less; big
            cities and experience push it up. &ldquo;Earn while you train&rdquo;
            is strict: it marks only paths with a genuinely paid route in —
            apprenticeships, academies, employer-funded or on-the-job training —
            not just &ldquo;no degree required.&rdquo;
          </p>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="font-display text-xl font-bold text-ink">
            Broad coverage, without padding the count
          </h2>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-stone">
            We reviewed all {CAREER_COVERAGE_AUDIT_TOTAL} detailed occupations in the{" "}
            <a
              href={CAREER_SOURCE_URLS.projections}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              federal projections table
            </a>
            . The explorer includes jobs that are distinct and useful to search,
            while consolidating near-identical machine specialties,
            subject-by-subject professor codes, and catch-all &ldquo;all other&rdquo;
            categories. When BLS publishes hourly pay but not annual pay, we show
            it that way instead of guessing.
          </p>
        </div>
      </section>

      {/* The tool */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="mb-8 grid gap-4 border-y-2 border-ink bg-amber/20 px-5 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div>
              <h2 className="font-display text-xl font-bold text-ink">Not sure what to search for yet?</h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-stone">Try twelve everyday work activities and get a varied starting set based on O*NET career interests and work styles. It takes about two minutes.</p>
            </div>
            <Link href="/students/career-explorer/fit" className="inline-flex items-center gap-1.5 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
              Try the career-fit sampler <ArrowRight className="h-4 w-4" weight="bold" />
            </Link>
          </div>
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
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/students/career-explorer/plan"
              className="card-ink group flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <h3 className="font-display text-base font-bold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                Make a career plan
              </h3>
              <p className="mt-1 text-sm leading-6 text-stone">
                Turn a saved career into editable, dated steps for testing the work and applying to a real pathway.
              </p>
            </Link>
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
                {opportunities.length}{" "}verified internships, fellowships, and programs — many paid
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
