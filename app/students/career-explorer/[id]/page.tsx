// Career profile — one SSG page per career (July 18, 2026 owner ask: "more
// info about each job"). Renders the richer BLS profile from lib/careers.ts +
// lib/careerDetails.ts: what the work is, the real pay RANGE (10th–90th
// percentile, not just the median), how many people do it, how you get in,
// the skills it takes, and similar careers. Numbers are BLS May 2025 (OEWS);
// a range shown as an em dash is pending the next data pull, never invented.
// Student-native page — the layout provides StudentHeader.

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HandCoins, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Footer from "@/components/Footer";
import ScrollDrift from "@/components/ScrollDrift";
import HeroRecede from "@/components/HeroRecede";
import TopicMark from "@/components/TopicMark";
import type { TopicId } from "@/lib/topics";
import {
  careers,
  growthLabel,
  payLabel,
  CAREER_DATA_VINTAGE,
  FIELD_LABELS,
  EDUCATION_LABELS,
  type Career,
} from "@/lib/careers";
import { getCareerDetail } from "@/lib/careerDetails";

const usd = (n: number) => `$${n.toLocaleString()}`;

// A ghost mark per field, reusing the TopicMark family (no new art).
const FIELD_MARK: Record<Career["field"], TopicId> = {
  trades: "budgeting",
  health: "investing",
  tech: "credit",
  business: "taxes",
  education: "college",
  public: "money-safety",
  engineering: "government-aid",
  service: "budgeting",
};

export function generateStaticParams() {
  return careers.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const c = careers.find((x) => x.id === id);
  if (!c) return { title: "Career not found | Empower" };
  const d = getCareerDetail(c.id);
  const range =
    d?.payLow && d?.payHigh
      ? ` Most earn ${usd(d.payLow)}–${usd(d.payHigh)}.`
      : "";
  return {
    title: `${c.title} — pay, training & outlook | Empower Career Explorer`,
    description: `What a ${c.title.toLowerCase()} does, real BLS numbers (median ${usd(
      c.medianPay
    )}/year), the training it takes, and similar careers.${range} Facts, not rankings.`,
  };
}

function Stat({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  tone?: "forest" | "ink";
}) {
  return (
    <div className="rounded-xl border-2 border-ink/12 bg-cream p-4">
      <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
        {label}
      </div>
      <div
        className={`mt-1 font-display text-2xl font-bold tabular-nums ${
          tone === "forest" ? "text-forest" : "text-ink"
        }`}
      >
        {value}
      </div>
      {sub && <div className="mt-0.5 text-[12px] font-medium text-stone">{sub}</div>}
    </div>
  );
}

export default async function CareerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const career = careers.find((c) => c.id === id);
  if (!career) notFound();
  const c = career as Career;
  const d = getCareerDetail(c.id);
  const hasRange = Boolean(d?.payLow && d?.payHigh);

  const related = (d?.related ?? [])
    .map((rid) => careers.find((x) => x.id === rid))
    .filter((x): x is Career => Boolean(x));

  const growthTone =
    c.growth >= 9 ? "forest" : c.growth < 2 ? "terracotta" : "ink";

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <ScrollDrift range={54} driftX={26} rotate={-5}>
          <TopicMark
            id={FIELD_MARK[c.field]}
            color="#fbf8f1"
            className="pointer-events-none absolute -right-16 -top-12 h-[22rem] w-[22rem] opacity-[0.14]"
          />
        </ScrollDrift>
        <HeroRecede className="relative mx-auto max-w-5xl px-6 py-12 lg:py-16">
          <Link
            href="/students/career-explorer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cream/70 transition-colors hover:text-amber"
          >
            <ArrowLeft className="h-4 w-4" weight="bold" />
            All careers
          </Link>
          <span className="mt-6 block text-xs font-bold uppercase tracking-[0.25em] text-amber">
            {FIELD_LABELS[c.field]}
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-[2.4rem] font-medium leading-[1.05] tracking-tight sm:text-5xl">
            {c.title}
          </h1>

          <div className="mt-7 flex flex-wrap items-end gap-x-10 gap-y-4">
            <div>
              <div className="font-display text-4xl font-bold tabular-nums text-cream sm:text-5xl">
                {payLabel(c.medianPay)}
              </div>
              <div className="mt-1 text-sm font-semibold text-cream/60">
                median pay per year
              </div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold tabular-nums text-amber">
                {hasRange ? `${usd(d!.payLow!)} – ${usd(d!.payHigh!)}` : "—"}
              </div>
              <div className="mt-1 text-sm font-semibold text-cream/60">
                {hasRange
                  ? "what most earn (10th–90th percentile)"
                  : "full range coming in the next data update"}
              </div>
            </div>
          </div>
        </HeroRecede>
      </section>

      {/* What it is */}
      {d && (
        <section className="border-b-2 border-ink bg-paper">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <h2 className="font-display text-2xl font-bold text-ink">
              What the job actually is
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-ink/90">
              {d.whatTheyDo}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-ink/12 bg-cream p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-terracotta">
                  Where you work
                </div>
                <p className="mt-1.5 text-sm leading-6 text-ink/85">{d.workSetting}</p>
              </div>
              <div className="rounded-xl border-2 border-ink/12 bg-cream p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-terracotta">
                  The hours
                </div>
                <p className="mt-1.5 text-sm leading-6 text-ink/85">{d.hours}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* By the numbers */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <h2 className="font-display text-2xl font-bold text-ink">By the numbers</h2>
          <p className="mt-1 text-sm text-stone">{CAREER_DATA_VINTAGE}.</p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <Stat label="Median pay" value={payLabel(c.medianPay)} sub="per year" tone="forest" />
            <Stat
              label="What most earn"
              value={hasRange ? `${usd(d!.payLow!)}–${usd(d!.payHigh!)}` : "—"}
              sub={hasRange ? "10th to 90th percentile" : "range coming soon"}
            />
            <Stat
              label="Openings a year"
              value={d?.annualOpenings ? `~${d.annualOpenings.toLocaleString()}` : "—"}
              sub={d?.annualOpenings ? "projected, 2024–34" : "—"}
              tone="forest"
            />
            <Stat
              label="Outlook to 2034"
              value={`${c.growth > 0 ? "+" : ""}${c.growth}%`}
              sub={growthLabel(c.growth)}
              tone={growthTone === "forest" ? "forest" : "ink"}
            />
            <Stat
              label="Working in the U.S."
              value={d?.numJobs ? d.numJobs.toLocaleString() : "—"}
              sub={d?.numJobs ? "people, nationwide" : "coming soon"}
            />
          </div>
          <p className="mt-3 text-[13px] leading-6 text-stone">
            <span className="font-semibold text-ink/70">Openings a year</span> counts
            new jobs plus the ones that open when people retire or move on — a truer
            picture of your odds than growth alone.
          </p>
          <p className="mt-4 text-[13px] leading-6 text-stone">
            &ldquo;Median&rdquo; means half earn more and half earn less. Your
            city, employer, and years on the job move it a lot — that is what the
            10th-to-90th range shows.
          </p>
        </div>
      </section>

      {/* How you get in */}
      <section className="border-t-2 border-ink bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <h2 className="font-display text-2xl font-bold text-ink">How you get in</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border-2 border-ink/12 bg-cream p-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
                Typical starting education
              </div>
              <p className="mt-1.5 font-display text-lg font-bold text-ink">
                {EDUCATION_LABELS[c.education]}
              </p>
              <p className="mt-1 text-sm leading-6 text-stone">
                Training path: {c.trainingNote}.
              </p>
            </div>
            {d?.license ? (
              <div className="rounded-xl border-2 border-ink/12 bg-cream p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
                  License or certification
                </div>
                <p className="mt-1.5 text-sm leading-6 text-ink/85">{d.license}</p>
              </div>
            ) : (
              <div className="rounded-xl border-2 border-ink/12 bg-cream p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
                  License or certification
                </div>
                <p className="mt-1.5 text-sm leading-6 text-stone">
                  No license required to start in most places.
                </p>
              </div>
            )}
          </div>

          {c.earnWhileTraining && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border-2 border-forest/30 bg-forest/[0.06] p-4">
              <HandCoins className="mt-0.5 h-5 w-5 shrink-0 text-forest" weight="bold" />
              <p className="text-sm leading-6 text-ink/85">
                <span className="font-bold text-forest">You can earn while you train.</span>{" "}
                This field has a genuinely paid pathway in — an apprenticeship,
                a paid academy, or employer-funded training — so you draw a
                paycheck instead of taking on debt to learn it.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Skills + honest take */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {d && d.skills.length > 0 && (
              <div className="lg:col-span-2">
                <h2 className="font-display text-2xl font-bold text-ink">
                  What it takes
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {d.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border-2 border-ink/15 bg-cream px-3 py-1.5 text-sm font-bold text-ink/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="lg:col-span-3">
              <h2 className="font-display text-2xl font-bold text-ink">
                The honest take
              </h2>
              <p className="mt-4 border-l-4 border-amber pl-4 text-lg italic leading-8 text-ink/85">
                {c.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Similar careers */}
      {related.length > 0 && (
        <section className="border-t-2 border-ink bg-paper">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <h2 className="font-display text-2xl font-bold text-ink">
              Similar careers to compare
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/students/career-explorer/${r.id}`}
                  className="card-ink group flex flex-col rounded-xl bg-cream p-4 transition-transform duration-200 hover:-translate-y-1"
                >
                  <h3 className="font-display text-base font-bold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                    {r.title}
                  </h3>
                  <p className="mt-0.5 text-[12px] font-medium text-stone">
                    {FIELD_LABELS[r.field]}
                  </p>
                  <div className="mt-3 font-display text-xl font-bold tabular-nums text-forest">
                    {payLabel(r.medianPay)}
                  </div>
                  <div className="text-[11px] font-semibold text-stone">
                    median / year
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Turn it into a plan */}
      <section className="border-t-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Turn a number into a plan
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
            Like this one? Here&apos;s what to do next.
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/students/tools/reality-check"
              className="card-ink group flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <h3 className="font-display text-base font-bold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                Does this pay for your life?
              </h3>
              <p className="mt-1 text-sm leading-6 text-stone">
                Run the Reality Check — build the life you want and see the
                salary it takes, then compare it to this one.
              </p>
            </Link>
            <Link
              href="/students/opportunities"
              className="card-ink group flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <h3 className="font-display text-base font-bold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                Get your foot in the door
              </h3>
              <p className="mt-1 text-sm leading-6 text-stone">
                Browse verified internships, fellowships, and programs — many
                paid — that lead into fields like this.
              </p>
            </Link>
            <Link
              href="/students/careers"
              className="card-ink group flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <h3 className="font-display text-base font-bold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                Land the job
              </h3>
              <p className="mt-1 text-sm leading-6 text-stone">
                Free resume templates, interview practice, and getting-hired
                guides in the Careers kit.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Source line */}
      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <p className="text-[13px] leading-6 text-stone">
            {d?.soc && (
              <>
                Standard Occupational Classification{" "}
                <span className="font-semibold text-ink/70">{d.soc}</span>.{" "}
              </>
            )}
            Pay, employment, and outlook from the U.S. Bureau of Labor Statistics
            (OEWS wage survey and 2024–34 employment projections). See something
            off?{" "}
            <Link
              href="/contact"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              Tell us
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
