// Career profile — one statically generated page per catalog career. Pay and
// employment are May 2025 OEWS; projections are 2024–34 BLS data.

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
  careerPayLabel,
  careerPayPeriod,
  growthLabel,
  CAREER_SOURCE_URLS,
  CAREER_DATA_VINTAGE,
  FIELD_LABELS,
  EDUCATION_LABELS,
  type Career,
} from "@/lib/careers";
import { getCareerDetail } from "@/lib/careerDetails";
import { getCareerEnrichment, ONET_DATA_VINTAGE } from "@/lib/careerEnrichment";
import {
  getCareerWorkContext,
  type CareerWorkContext,
} from "@/lib/careerWorkContext";
import {
  CAREER_INDUSTRY_SOURCE_URL,
  CAREER_INDUSTRY_VINTAGE,
  getCareerIndustries,
} from "@/lib/careerIndustries";
import {
  CAREER_COST_SOURCE,
  biggestTradeoff,
  educationCostBaseline,
  physicalDemandLabel,
  remoteCompatibilityLabel,
  scheduleLabel,
  timeToEntry,
} from "@/lib/careerDecisionFacts";
import CareerSaveButton from "@/components/CareerSaveButton";
import CareerLocalPay from "@/components/CareerLocalPay";
import CareerLocalPathways from "@/components/CareerLocalPathways";

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

const INTEREST_COPY: Record<string, string> = {
  Realistic: "working with tools, equipment, materials, or the physical world",
  Investigative: "solving problems, analyzing evidence, and figuring out how things work",
  Artistic: "creating, designing, performing, or working without a rigid script",
  Social: "helping, teaching, caring for, or supporting other people",
  Enterprising: "leading, persuading, selling, or turning an idea into action",
  Conventional: "organizing information, following systems, and getting details right",
};

const JOB_ZONE_COPY: Record<number, string> = {
  1: "Little or no preparation is usually needed.",
  2: "Some preparation—often a high school credential and on-the-job learning—is usually needed.",
  3: "Medium preparation—often vocational training, an associate degree, or substantial experience—is usually needed.",
  4: "High preparation—usually a four-year degree plus experience—is common.",
  5: "Extensive preparation—often graduate education and significant experience—is common.",
};

function peopleContactCopy(score: number) {
  if (score >= 4.25) return "Contact with other people is frequent and close to constant.";
  if (score >= 3.25) return "Regular contact with coworkers, customers, or the public is part of the day.";
  if (score >= 2.25) return "The day mixes independent work with some interaction.";
  return "The work is relatively independent, with less contact than most jobs.";
}

function timePressureCopy(score: number) {
  if (score >= 4.25) return "Deadlines or time pressure tend to come up every day.";
  if (score >= 3.25) return "Time pressure is usually a weekly part of the work.";
  if (score >= 2.25) return "Time pressure tends to come up occasionally, around monthly.";
  return "Urgent deadlines tend to be less common.";
}

function decisionFreedomCopy(score: number) {
  if (score >= 4.25) return "Workers usually have a lot of freedom to make decisions.";
  if (score >= 3.25) return "The job usually gives workers considerable decision-making room.";
  if (score >= 2.25) return "Workers usually have some decision-making room within set procedures.";
  return "The work is usually guided by established procedures or close direction.";
}

function consequenceCopy(score: number) {
  if (score >= 4.25) return "Mistakes can have extremely serious consequences.";
  if (score >= 3.25) return "Mistakes can have very serious consequences, so accuracy matters.";
  if (score >= 2.25) return "Mistakes can have meaningful consequences.";
  return "The consequences of a typical error tend to be more limited.";
}

function conflictCopy(score: number) {
  if (score >= 4.25) return "Conflict or difficult interactions are usually part of most days.";
  if (score >= 3.25) return "Conflict or difficult interactions tend to come up regularly.";
  if (score >= 2.25) return "Conflict or difficult interactions come up occasionally.";
  return "Conflict and difficult interactions tend to be less common.";
}

function bodyAndWeatherCopy(context: CareerWorkContext) {
  const standing = context.standing ?? 0;
  const sitting = context.sitting ?? 0;
  const outdoors = context.outdoors ?? 0;
  const posture =
    standing >= 4 && sitting < 3
      ? "Most of the day is spent standing or moving."
      : sitting >= 4 && standing < 3
        ? "Most of the day is spent seated."
        : standing - sitting >= 0.8
          ? "The day leans more toward standing than sitting."
          : sitting - standing >= 0.8
            ? "The day leans more toward sitting than standing."
            : "The day usually mixes sitting and standing.";
  const weather =
    outdoors >= 4.25
      ? " Outdoor exposure is a daily or near-daily part of the work."
      : outdoors >= 3.25
        ? " Outdoor work is common."
        : outdoors >= 2.25
          ? " Some outdoor work comes with the role."
          : "";
  return posture + weather;
}

function workRealityRows(context: CareerWorkContext) {
  const conflictScore = Math.max(
    context.conflictExposure ?? 0,
    context.difficultPeople ?? 0
  );
  return [
    context.peopleContact != null
      ? ["People contact", peopleContactCopy(context.peopleContact)]
      : null,
    ["Time pressure", timePressureCopy(context.timePressure)],
    context.decisionFreedom != null
      ? ["Decision-making room", decisionFreedomCopy(context.decisionFreedom)]
      : null,
    context.consequenceOfError != null
      ? ["Stakes of mistakes", consequenceCopy(context.consequenceOfError)]
      : null,
    conflictScore > 0
      ? ["Conflict & difficult interactions", conflictCopy(conflictScore)]
      : null,
    context.sitting != null || context.standing != null
      ? ["Body & weather", bodyAndWeatherCopy(context)]
      : null,
  ].filter((row): row is [string, string] => Boolean(row));
}

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
    d?.payLow != null && d?.payHigh != null
      ? ` Most earn ${usd(d.payLow)}–${usd(d.payHigh)}.`
      : d?.hourlyPayLow != null && d?.hourlyPayHigh != null
        ? ` Most earn $${d.hourlyPayLow.toFixed(2)}–$${d.hourlyPayHigh.toFixed(2)} an hour.`
      : "";
  const payFact =
    c.medianPay != null
      ? `median ${careerPayLabel(c)} a year`
      : c.medianHourlyPay != null
        ? `median ${careerPayLabel(c)} an hour`
        : "BLS does not publish a wage estimate";
  return {
    title: `${c.title} — pay, training & outlook | Empower Career Explorer`,
    description: `What a ${c.title.toLowerCase()} does, real BLS numbers (${payFact}), the training it takes, and similar careers.${range} Facts, not rankings.`,
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
  const enrichment = getCareerEnrichment(c.id);
  const workContext = getCareerWorkContext(c.id);
  const industries = getCareerIndustries(c.id);
  const hasAnnualRange = d?.payLow != null && d?.payHigh != null;
  const hasHourlyRange =
    !hasAnnualRange && d?.hourlyPayLow != null && d?.hourlyPayHigh != null;
  const rangeValue = hasAnnualRange
    ? `${usd(d!.payLow!)} – ${usd(d!.payHigh!)}`
    : hasHourlyRange
      ? `$${d!.hourlyPayLow!.toFixed(2)} – $${d!.hourlyPayHigh!.toFixed(2)}`
      : "Not published";

  const related = (d?.related ?? [])
    .map((rid) => careers.find((x) => x.id === rid))
    .filter((x): x is Career => Boolean(x));

  const growthTone =
    c.growth >= 9 ? "forest" : c.growth < 2 ? "terracotta" : "ink";

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Hero */}
      <section id="main-content" tabIndex={-1} className="relative overflow-hidden bg-forest text-cream">
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

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <CareerSaveButton careerId={c.id} inverse />
            <Link
              href={`/students/career-explorer/plan?career=${c.id}`}
              className="text-sm font-bold text-cream underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
            >
              Make a plan for this career
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap items-end gap-x-10 gap-y-4">
            <div>
              <div className="font-display text-4xl font-bold tabular-nums text-cream sm:text-5xl">
                {careerPayLabel(c)}
              </div>
              <div className="mt-1 text-sm font-semibold text-cream/60">
                {careerPayPeriod(c)}
              </div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold tabular-nums text-amber">
                {rangeValue}
              </div>
              <div className="mt-1 text-sm font-semibold text-cream/60">
                {hasAnnualRange
                  ? "what most earn per year (10th–90th percentile)"
                  : hasHourlyRange
                    ? "what most earn per hour (10th–90th percentile)"
                    : "BLS does not publish wage data for this occupation"}
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
            {enrichment && enrichment.alternateTitles.length > 0 && (
              <p className="mt-3 max-w-4xl text-sm leading-6 text-stone">
                <span className="font-bold text-ink/75">You may also see this posted as:</span>{" "}
                {enrichment.alternateTitles.join(", ")}.
              </p>
            )}
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

      {/* Decision facts — concise enough to scan before comparing paths. */}
      <section className="border-b-2 border-ink bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <h2 className="font-display text-2xl font-bold text-ink">What this path asks of you</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone">These are broad planning baselines. Local programs, employers, financial aid, and schedules can change the real path.</p>
          <dl className="mt-6 divide-y-2 divide-ink/10 border-y-2 border-ink">
            {[
              ["Time to entry", timeToEntry(c, d)],
              ["Public tuition baseline", educationCostBaseline(c)],
              ["Training pay", c.earnWhileTraining ? "A paid pathway exists" : "Usually unpaid or self-funded"],
              ["Physical demands", physicalDemandLabel(workContext)],
              ["Typical schedule", scheduleLabel(d, workContext)],
              ["Remote compatibility", remoteCompatibilityLabel(workContext)],
              ["Biggest trade-off", biggestTradeoff(c, d, workContext)],
            ].map(([label, value]) => (
              <div key={label} className="grid gap-1 bg-cream px-4 py-3 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-5 sm:px-5">
                <dt className="text-xs font-bold uppercase tracking-[0.1em] text-stone">{label}</dt>
                <dd className="text-sm font-medium leading-6 text-ink/85">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-5 text-stone">Tuition uses {CAREER_COST_SOURCE.vintage} public averages before aid and living costs. Remote compatibility is an Empower estimate from O*NET work-context data, not an employer policy or telework rate.</p>
        </div>
      </section>

      {/* Day-to-day fit, from O*NET */}
      {enrichment && (
        <section className="border-b-2 border-ink bg-cream">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <div className="grid grid-cols-1 gap-9 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta">The day to day</span>
                <h2 className="mt-2 font-display text-2xl font-bold text-ink">What you&apos;d actually spend time doing</h2>
                {enrichment.coreTasks.length > 0 ? (
                  <ul className="mt-4 space-y-3">
                    {enrichment.coreTasks.map((task) => (
                      <li key={task} className="flex gap-3 text-sm leading-6 text-ink/85">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber ring-1 ring-ink" />
                        {task}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm leading-6 text-stone">O*NET has not designated core tasks for this occupation.</p>
                )}
              </div>
              <div className="lg:col-span-2">
                <h2 className="font-display text-2xl font-bold text-ink">Good fit if you like…</h2>
                <div className="mt-4 divide-y-2 divide-ink/10 border-y-2 border-ink/15">
                  {enrichment.interests.map((interest) => (
                    <div key={interest} className="py-3">
                      <p className="text-sm font-bold text-forest">{interest}</p>
                      <p className="mt-0.5 text-[13px] leading-5 text-stone">{INTEREST_COPY[interest] ?? "work that uses this interest"}</p>
                    </div>
                  ))}
                </div>
                {enrichment.jobZone && (
                  <div className="mt-5 border-l-4 border-amber pl-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">O*NET job zone {enrichment.jobZone} of 5</p>
                    <p className="mt-1 text-sm leading-6 text-ink/85">{JOB_ZONE_COPY[enrichment.jobZone]}</p>
                  </div>
                )}
              </div>
            </div>

            {(enrichment.workStyles.length > 0 || enrichment.transferableSkills.length > 0 || enrichment.knowledge.length > 0 || enrichment.software.length > 0) && (
              <div className="mt-9 grid grid-cols-1 gap-x-10 gap-y-8 border-t-2 border-ink/15 pt-7 md:grid-cols-2">
                {enrichment.workStyles.length > 0 && (
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">Work styles that matter most</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {enrichment.workStyles.map((style) => (
                        <span key={style} className="rounded-md border-2 border-ink/15 bg-paper px-3 py-1.5 text-sm font-bold text-ink/75">{style}</span>
                      ))}
                    </div>
                  </div>
                )}
                {enrichment.transferableSkills.length > 0 && (
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">Transferable skills used most</h3>
                    <p className="mt-1 text-[13px] leading-5 text-stone">O*NET ranks these by how important they are in the work.</p>
                    <ul className="mt-3 space-y-2">
                      {enrichment.transferableSkills.map((skill) => (
                        <li key={skill} className="flex items-start gap-2 text-sm font-semibold leading-5 text-ink/80">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-terracotta" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {enrichment.knowledge.length > 0 && (
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">Knowledge the job draws on</h3>
                    <p className="mt-1 text-[13px] leading-5 text-stone">Subjects workers report using—not a list of required college courses.</p>
                    <ul className="mt-3 space-y-2">
                      {enrichment.knowledge.map((area) => (
                        <li key={area} className="flex items-start gap-2 text-sm font-semibold leading-5 text-ink/80">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-forest" />
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {enrichment.software.length > 0 && (
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">Software that shows up in the work</h3>
                    <p className="mt-1 text-[13px] leading-5 text-stone">Examples employers report—not a checklist you must already know.</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {enrichment.software.map((software) => (
                        <span key={software} className="rounded-md border-2 border-ink/15 bg-paper px-3 py-1.5 text-sm font-bold text-ink/75">{software}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Work reality — O*NET survey signals translated into plain language. */}
      {workContext && (
        <section className="border-b-2 border-ink bg-paper">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta">The work environment</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink">What the work tends to feel like</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-stone">These patterns summarize O*NET worker surveys nationwide. A specific employer or shift can feel different.</p>
            <dl className="mt-6 grid border-y-2 border-ink md:grid-cols-2">
              {workRealityRows(workContext).map(([label, value], index) => (
                <div
                  key={label}
                  className={`px-4 py-4 md:px-5 ${index > 0 ? "border-t-2 border-ink/10 md:border-t-0" : ""} ${index >= 2 ? "md:border-t-2 md:border-ink/10" : ""} ${index % 2 === 1 ? "md:border-l-2 md:border-ink/10" : ""}`}
                >
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-stone">{label}</dt>
                  <dd className="mt-1 text-sm font-medium leading-6 text-ink/85">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* By the numbers */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <h2 className="font-display text-2xl font-bold text-ink">By the numbers</h2>
          <p className="mt-1 text-sm text-stone">{CAREER_DATA_VINTAGE}.</p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <Stat
              label="Median pay"
              value={careerPayLabel(c)}
              sub={careerPayPeriod(c).replace("median / ", "per ")}
              tone="forest"
            />
            {c.medianPay != null && d?.hourlyMedian != null && (
              <Stat
                label="Hourly median"
                value={`$${d.hourlyMedian.toFixed(2)}`}
                sub="per hour"
              />
            )}
            <Stat
              label="What most earn"
              value={rangeValue.replace(" – ", "–")}
              sub={
                hasAnnualRange
                  ? "yearly, 10th to 90th percentile"
                  : hasHourlyRange
                    ? "hourly, 10th to 90th percentile"
                    : "not collected by OEWS"
              }
            />
            <Stat
              label="Openings a year"
              value={d?.annualOpenings != null ? `~${d.annualOpenings.toLocaleString()}` : "—"}
              sub={d?.annualOpenings != null ? "projected, 2024–34" : "—"}
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
              value={d?.numJobs != null ? d.numJobs.toLocaleString() : "—"}
              sub={d?.numJobs != null ? "people, nationwide" : "not published"}
            />
          </div>
          <p className="mt-3 text-[13px] leading-6 text-stone">
            <span className="font-semibold text-ink/70">Openings a year</span> counts
            new jobs plus the ones that open when people retire or move on — a truer
            picture of your odds than growth alone.
          </p>
          {(c.medianPay != null || c.medianHourlyPay != null) && (
            <p className="mt-4 text-[13px] leading-6 text-stone">
              &ldquo;Median&rdquo; means half earn more and half earn less. Your
              city, employer, and years on the job move it a lot — that is what the
              10th-to-90th range shows.
            </p>
          )}
          {d?.selfEmployedPercent != null && (
            <p className="mt-2 text-[13px] leading-6 text-stone">
              BLS estimates {d.selfEmployedPercent}% of workers in this occupation are
              self-employed.
            </p>
          )}
          <CareerLocalPay
            careerId={c.id}
            nationalAnnual={c.medianPay}
            nationalHourly={c.medianHourlyPay ?? d?.hourlyMedian}
          />
        </div>
      </section>

      {/* Where the occupation is employed, from BLS sector estimates. */}
      {industries.length > 0 && (
        <section className="border-t-2 border-ink bg-cream">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta">The job market</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink">Where people in this job work</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-stone">The largest U.S. industry sectors employing this occupation—not just examples of possible employers.</p>
            <div className="mt-6 divide-y-2 divide-ink/10 border-y-2 border-ink">
              {industries.map((industry) => (
                <div key={industry.name} className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_13rem] sm:items-center sm:gap-8">
                  <div>
                    <h3 className="text-sm font-bold leading-5 text-ink">{industry.name}</h3>
                    <p className="mt-0.5 text-[13px] leading-5 text-stone">About {industry.employment.toLocaleString()} workers</p>
                  </div>
                  {industry.share != null && (
                    <div>
                      <div className="flex items-baseline justify-between gap-3 text-[12px] font-bold text-ink/75">
                        <span>Share of this occupation</span>
                        <span className="tabular-nums text-forest">{industry.share}%</span>
                      </div>
                      <div className="mt-1.5 h-2 border border-ink/20 bg-paper" aria-hidden="true">
                        <div className="h-full bg-amber" style={{ width: `${industry.share}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs leading-5 text-stone">{CAREER_INDUSTRY_VINTAGE} BLS OEWS. This shows the largest sectors with published estimates; BLS-suppressed estimates may affect the ordering. <a href={CAREER_INDUSTRY_SOURCE_URL} target="_blank" rel="noreferrer" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">View the industry tables</a>.</p>
          </div>
        </section>
      )}

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
              {d?.workExperience && (
                <p className="mt-2 text-sm leading-6 text-stone">
                  Related work experience: {d.workExperience}.
                </p>
              )}
              {d?.onJobTraining && (
                <p className="text-sm leading-6 text-stone">
                  On-the-job training: {d.onJobTraining}.
                </p>
              )}
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

          <CareerLocalPathways
            careerId={c.id}
            careerTitle={enrichment?.onetTitle ?? c.title}
            onetSoc={enrichment?.onetSoc ?? `${d?.soc ?? ""}.00`}
          />
        </div>
      </section>

      {/* Skills + honest take */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {d && d.skills.length > 0 && (
              <div className="lg:col-span-2">
                <h2 className="font-display text-2xl font-bold text-ink">
                  Useful strengths
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
                    {careerPayLabel(r)}
                  </div>
                  <div className="text-[11px] font-semibold text-stone">
                    {careerPayPeriod(r)}
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
            {c.medianPay != null || c.medianHourlyPay != null ? (
              <>
                Pay and employment from the{" "}
                <a
                  href={CAREER_SOURCE_URLS.wages}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  BLS May 2025 OEWS survey
                </a>
                ; outlook and openings from the{" "}
              </>
            ) : (
              <>BLS does not publish an OEWS wage for this occupation; employment, outlook, and openings come from the{" "}</>
            )}
            <a
              href={CAREER_SOURCE_URLS.projections}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              2024–34 employment projections
            </a>
            {d?.oohUrl && (
              <>
                ; job context from the{" "}
                <a
                  href={d.oohUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  Occupational Outlook Handbook
                </a>
              </>
            )}
            {enrichment && (
              <>
                ; tasks, interests, work styles, skills, knowledge, software examples, job zone, and work-context patterns from{" "}
                <a
                  href={enrichment.onetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  {ONET_DATA_VINTAGE}
                </a>
              </>
            )}
            . See something off?{" "}
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
