// Compare Colleges — PREVIEW (July 13, 2026, owner ask: parked project,
// "subheadings with mockups, but that's it for now... show that it's in
// progress"). ASSIST.org-inspired two-rail design: sort by the school on
// one side (cost, location, selectivity), by the student profile they
// look for on the other (CDS section C7 factors, GPA, need policy).
// EVERYTHING below the hero is a static, non-interactive mockup with
// clearly-labeled approximate sample figures — no live data, no sitemap
// entry, noindex until it ships. Student-native (no main twin).

import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Compare Colleges (in progress) | Empower — Economic Mobility Project",
  description:
    "A preview of the college comparer we're building: sort schools by cost and selectivity on one side, and by the student profile they actually look for on the other.",
  robots: { index: false },
};

// Approximate 2026 figures, used ONLY to make the preview honest about
// what the real page will show. Live rows will come from each college's
// published Common Data Set + the federal College Scorecard.
const SAMPLE_COLLEGES = [
  {
    name: "UCLA",
    place: "Los Angeles, CA · Public · ~33,000 undergrads",
    coa: "≈ $42,000/yr in-state",
    accept: "≈ 9% admitted",
    gpa: "4.2+ weighted (middle of admits)",
    values: ["Course rigor: very important", "Essays: very important", "Test scores: not considered", "Interest: not considered"],
    aid: "Strong in-state aid (Blue & Gold covers tuition under ~$80k income)",
  },
  {
    name: "Amherst College",
    place: "Amherst, MA · Private · ~1,900 undergrads",
    coa: "≈ $92,000/yr sticker, but meets 100% of need, no loans",
    accept: "≈ 9% admitted",
    gpa: "3.9+ unweighted (middle of admits)",
    values: ["Rigor + essays: very important", "Need-blind", "First-gen: a plus", "Interest: not considered"],
    aid: "Need-blind and meets full need; often cheaper than a state school for low-income families",
  },
  {
    name: "UT Austin",
    place: "Austin, TX · Public · ~42,000 undergrads",
    coa: "≈ $31,000/yr in-state",
    accept: "≈ 29% admitted (auto-admit ~top 5–6% of Texas classes)",
    gpa: "Top-of-class rank matters most",
    values: ["Class rank: decisive (auto-admit)", "Test scores: required", "Essays: important", "Legacy: not considered"],
    aid: "Texas Advance: tuition covered under ~$100k income (2026)",
  },
];

const SCHOOL_SORTS = ["Cost of attendance", "Net price after aid", "Location", "Size", "Selectivity", "Graduation rate"];
const PROFILE_SORTS = ["Values essays", "Test-optional", "Need-blind", "Counts interest", "First-gen friendly", "Religious affiliation"];

export default function CompareCollegesPreview() {
  return (
    <div className="min-h-screen bg-paper text-ink">

      {/* Hero — honest about the state of things */}
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-5xl px-6 pb-10 pt-12">
          <nav className="text-sm font-medium text-stone">
            <Link
              href="/students"
              className="underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              For Students
            </Link>{" "}
            / Compare Colleges
          </nav>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-[2.4rem] font-bold leading-[1.07] tracking-tight text-ink sm:text-5xl">
              Compare colleges the way they compare you.
            </h1>
          </div>
          <p className="mt-3 inline-block -rotate-1 rounded-md border-2 border-ink bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
            In progress: design preview, nothing live yet
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone">
            We&apos;re building a comparer that works both directions: sort
            schools by cost, location, and selectivity on one side, and by
            the student profile they actually look for on the other, pulled
            from each college&apos;s published{" "}
            <Link
              href="/students/glossary#common-data-set"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              Common Data Set
            </Link>
            . The mockup below shows the plan; the numbers are approximate
            2026 figures for illustration only.
          </p>
        </div>
      </section>

      {/* The mockup — static, clearly labeled */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="relative">
            <span className="absolute -top-3 left-6 z-10 -rotate-2 rounded-md border-2 border-ink bg-terracotta px-3 py-1 text-xs font-bold uppercase tracking-wide text-cream shadow-[3px_3px_0_#11211c]">
              Mockup: sample data
            </span>
            <div
              aria-hidden
              className="card-ink-lg pointer-events-none select-none rounded-2xl bg-cream p-6 sm:p-8"
            >
              {/* Two sort rails, ASSIST-style */}
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border-2 border-ink/15 bg-paper p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone">
                    Sort by the school
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {SCHOOL_SORTS.map((s, i) => (
                      <span
                        key={s}
                        className={`rounded-md border-2 px-3 py-1.5 text-sm font-bold ${
                          i === 0
                            ? "border-ink bg-forest text-cream shadow-[2px_2px_0_#11211c]"
                            : "border-ink/15 bg-cream text-stone"
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border-2 border-ink/15 bg-paper p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone">
                    Sort by who they look for
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {PROFILE_SORTS.map((s, i) => (
                      <span
                        key={s}
                        className={`rounded-md border-2 px-3 py-1.5 text-sm font-bold ${
                          i === 2
                            ? "border-ink bg-amber text-ink shadow-[2px_2px_0_#11211c]"
                            : "border-ink/15 bg-cream text-stone"
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compare rows */}
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {SAMPLE_COLLEGES.map((c) => (
                  <div
                    key={c.name}
                    className="flex h-full flex-col rounded-xl border-2 border-ink bg-paper p-5 shadow-[3px_3px_0_#11211c]"
                  >
                    <h3 className="font-display text-xl font-bold text-ink">
                      {c.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-stone">
                      {c.place}
                    </p>
                    <dl className="mt-3 space-y-2 text-sm leading-6">
                      <div>
                        <dt className="font-bold uppercase tracking-wide text-[11px] text-stone">Cost of attendance</dt>
                        <dd className="font-semibold text-ink">{c.coa}</dd>
                      </div>
                      <div>
                        <dt className="font-bold uppercase tracking-wide text-[11px] text-stone">Selectivity</dt>
                        <dd className="font-semibold text-ink">{c.accept}</dd>
                      </div>
                      <div>
                        <dt className="font-bold uppercase tracking-wide text-[11px] text-stone">Typical admit GPA</dt>
                        <dd className="font-semibold text-ink">{c.gpa}</dd>
                      </div>
                    </dl>
                    <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-stone">
                      What they weigh (from their CDS)
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {c.values.map((v) => (
                        <span
                          key={v}
                          className="rounded-full border border-ink/20 bg-cream px-2.5 py-0.5 text-[11px] font-semibold text-ink/80"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 flex-1 rounded-lg bg-forest/[0.07] p-2.5 text-xs leading-5 text-ink/85">
                      <span className="font-bold text-forest">The money: </span>
                      {c.aid}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What's coming / what we won't do */}
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <div className="card-ink rounded-2xl bg-cream p-6">
              <h2 className="font-display text-lg font-bold text-ink">
                What the real page will do
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-stone">
                <li>— A hand-verified profile for each college: selectivity, typical admit GPA, cost, and the &quot;what they consider&quot; table straight from its Common Data Set, checked the same way we verify every scholarship.</li>
                <li>— Sorting that works both directions: the school&apos;s numbers on one side, the student they&apos;re looking for on the other.</li>
                <li>— Aid policy front and center: need-blind, meets-full-need, and no-loan pledges beside every sticker price.</li>
                <li>— A handoff to{" "}
                  <Link href="/students/tools/compare-offers" className="pointer-events-auto font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
                    Compare Aid Offers
                  </Link>{" "}
                  when your real award letters arrive.
                </li>
              </ul>
            </div>
            <div className="card-ink rounded-2xl bg-cream p-6">
              <h2 className="font-display text-lg font-bold text-ink">
                What it deliberately won&apos;t do
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-stone">
                <li>— Republish paywalled magazine rankings. You&apos;ll sort by facts (cost, selectivity, graduation rates, aid promises), not by someone&apos;s editorial list.</li>
                <li>— Show numbers we haven&apos;t verified. Every profile ships with a verified-as-of date, like the scholarship and opportunity finders.</li>
                <li>— Ask for anything about you. Filters are for exploring, not for building a profile of you to sell.</li>
              </ul>
              <p className="mt-4 text-sm leading-6 text-stone">
                In the meantime, the thinking behind it is already readable:{" "}
                <Link href="/students/learn/college/how-colleges-read-applications" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
                  how colleges evaluate you
                </Link>{" "}
                and{" "}
                <Link href="/students/learn/college/need-blind-colleges" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
                  what the aid labels promise
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
