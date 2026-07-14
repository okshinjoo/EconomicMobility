// Career Explorer — PREVIEW (July 13, 2026, owner ask: parked project,
// "subheadings with mockups, but that's it for now... show that it's in
// progress"). What a career actually pays, what training it needs, and
// which of our verified opportunities lead into it. EVERYTHING below the
// hero is a static, non-interactive mockup with clearly-labeled
// approximate figures (public BLS data will back the real page) — no
// live data, no sitemap entry, noindex until it ships. Student-native.

import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Career Explorer (in progress) | Empower — Economic Mobility Project",
  description:
    "A preview of the career explorer we're building: real median pay, the training each path needs, and the verified programs that lead into it.",
  robots: { index: false },
};

// Approximate figures (recent BLS medians), used ONLY to make the preview
// honest about what the real page will show.
const SAMPLE_CAREERS = [
  {
    name: "Registered Nurse",
    pay: "≈ $94,000/yr median",
    training: "Bachelor's (BSN) or associate + bridge",
    outlook: "Growing ~5%, steady everywhere",
    note: "Hospital tuition-repayment deals are common; SHPEP-style pipelines exist for the pre-health years.",
    tags: ["Health", "License", "Every city"],
  },
  {
    name: "Electrician",
    pay: "≈ $62,000/yr median",
    training: "Paid apprenticeship: earn while you train, no degree",
    outlook: "Growing ~9%, faster than average",
    note: "Union apprenticeships pay from day one and end with zero student debt.",
    tags: ["Trades", "No degree", "Paid training"],
  },
  {
    name: "Software Developer",
    pay: "≈ $133,000/yr median",
    training: "Bachelor's typical; strong portfolio routes exist",
    outlook: "Growing ~15%, much faster than average",
    note: "Free training pipelines (CodePath, NPower) and early-ID internships lead straight in.",
    tags: ["Tech", "Remote-friendly", "Portfolio counts"],
  },
];

const FILTER_CHIPS = ["Pays $60k+", "No degree needed", "Paid training", "Fast-growing", "Health", "Tech", "Trades"];

export default function CareerExplorerPreview() {
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
            / Career Explorer
          </nav>
          <h1 className="mt-4 font-display text-[2.4rem] font-bold leading-[1.07] tracking-tight text-ink sm:text-5xl">
            Know what the job pays before you pick the path.
          </h1>
          <p className="mt-3 inline-block -rotate-1 rounded-md border-2 border-ink bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
            In progress: design preview, nothing live yet
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone">
            We&apos;re building an explorer that answers the three questions
            that matter before you commit years to a path: what it really
            pays, what training it takes (and whether that training pays
            you), and which doors in our{" "}
            <Link
              href="/students/opportunities"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              Opportunity Finder
            </Link>{" "}
            lead into it. The mockup below shows the plan; figures are
            approximate, from public Bureau of Labor Statistics data.
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
              {/* Search + filters */}
              <div className="rounded-lg border-2 border-ink/15 bg-paper px-4 py-2.5 text-base text-stone/60">
                Search: nurse, electrician, teacher, coding…
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {FILTER_CHIPS.map((f, i) => (
                  <span
                    key={f}
                    className={`rounded-md border-2 px-3 py-1.5 text-sm font-bold ${
                      i === 2
                        ? "border-ink bg-forest text-cream shadow-[2px_2px_0_#11211c]"
                        : "border-ink/15 bg-cream text-stone"
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Career cards */}
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {SAMPLE_CAREERS.map((c) => (
                  <div
                    key={c.name}
                    className="flex h-full flex-col rounded-xl border-2 border-ink bg-paper p-5 shadow-[3px_3px_0_#11211c]"
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-2.5 font-display text-xl font-bold text-ink">
                      {c.name}
                    </h3>
                    <p className="mt-1 font-display text-lg font-bold text-forest">
                      {c.pay}
                    </p>
                    <dl className="mt-2 space-y-1.5 text-sm leading-6">
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-wide text-stone">Training</dt>
                        <dd className="font-semibold text-ink">{c.training}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-wide text-stone">Outlook</dt>
                        <dd className="font-semibold text-ink">{c.outlook}</dd>
                      </div>
                    </dl>
                    <p className="mt-3 flex-1 rounded-lg bg-forest/[0.07] p-2.5 text-xs leading-5 text-ink/85">
                      <span className="font-bold text-forest">The way in: </span>
                      {c.note}
                    </p>
                    <span className="mt-3 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4">
                      Programs that lead here →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What's coming */}
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <div className="card-ink rounded-2xl bg-cream p-6">
              <h2 className="font-display text-lg font-bold text-ink">
                What the real page will do
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-stone">
                <li>— Around a hundred careers curated from public BLS data: median pay, training required, growth outlook, and what the work actually looks like day to day.</li>
                <li>— Filters that respect every route: degree paths, paid apprenticeships, and certificate programs side by side. &quot;Earn while you train&quot; is a first-class filter, not a footnote.</li>
                <li>— Every career wired to the real doors: matching programs in the Opportunity Finder and awards in the Scholarship Finder.</li>
                <li>— Typo-tolerant search, like everything else on the site.</li>
              </ul>
            </div>
            <div className="card-ink rounded-2xl bg-cream p-6">
              <h2 className="font-display text-lg font-bold text-ink">
                Until it ships
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone">
                The pieces it will connect are already live: the{" "}
                <Link href="/students/opportunities" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
                  Opportunity Finder
                </Link>{" "}
                (paid internships, research, and training programs, many
                open in high school), the{" "}
                <Link href="/students/tools/paycheck" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
                  Paycheck calculator
                </Link>{" "}
                for turning any salary into take-home reality, and the{" "}
                <Link href="/students/tools/reality-check" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
                  Reality Check
                </Link>{" "}
                for finding the salary your life actually needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
