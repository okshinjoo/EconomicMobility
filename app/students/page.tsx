import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import StudentStageDash from "@/components/StudentStageDash";
import TopicMark from "@/components/TopicMark";
import ReadOrderedGrid from "@/components/ReadOrderedGrid";
import { ReadBadge } from "@/components/ReadBadge";
import { getArticleBySlug, getTopicArticles } from "@/lib/articles";
import { getTopic } from "@/lib/topics";
import { getCourse } from "@/lib/courses";
import { studentCalendar } from "@/lib/studentCalendar";
import { STUDENT_TOOL_PATHS } from "@/lib/studentShelf";
import { frameHref } from "@/lib/frame";
import Image from "next/image";
import { deadlines } from "@/lib/deadlines";
import { scholarships } from "@/lib/scholarships";
import { opportunities } from "@/lib/opportunities";

// The microsite HOMEPAGE (July 13 owner pass: "it's too wordy" — adopt the
// main homepage's style: introduce, tease, and link to the hubs). The full
// inventories live on the subheader pages now — /students/deadlines,
// /students/learn/college, /students/scholarships, /students/tools — so
// every band here is a door, not a warehouse. Don't re-inline content the
// hubs own.
//
// SIX BANDS (July 14, nav-audit §4b — 10 → 6, owner directive "prioritize
// clarity"): hero · StageDash · five pillar posters (Opportunities joined
// the grid with a New chip; the Deadlines poster carries the first-two-dates
// line, so #calendar lands here) · the starter-guides + stay-on-track
// editorial band · community · one compact everything-else band (#shelf:
// shelf / tools / ASSIST as one-line doors). The old calendar rows, shelf
// cards, tools chips, and ASSIST card all live on their hub pages; the
// ASSIST launcher also rotates through the cc StageDash pool. Don't re-add
// bands — a cut here means the hub owns it.

export const metadata: Metadata = {
  title: "For Students | Empower — Economic Mobility Project",
  description:
    "Everything a student needs in one place: FAFSA and scholarship deadlines, the college money path, the guides that matter first, and the calculators that run your real numbers.",
};

// The four guides we'd hand a student first — money-in-school essentials.
const STARTER_SLUGS = [
  "fafsa-step-by-step",
  "student-loans-before-you-sign",
  "your-first-paycheck",
  "filing-taxes-first-time",
];

export default function StudentsPage() {
  const starters = STARTER_SLUGS.map((slug) => getArticleBySlug(slug)).filter(
    (a): a is NonNullable<ReturnType<typeof getArticleBySlug>> => Boolean(a)
  );
  const course = getCourse("paying-for-college");
  const collegeGuides = getTopicArticles("college");

  return (
    <div className="min-h-screen bg-paper text-ink">

      {/* Hero — the microsite's homepage opening: field, photo, live stats */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <TopicMark
          id="college"
          color="#fbf8f1"
          className="pointer-events-none absolute -left-16 -bottom-16 h-[22rem] w-[22rem] opacity-[0.06]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
              For students
            </span>
            <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              The money side of school,{" "}
              <span className="italic text-amber">in one place.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-cream/75">
              Deadlines that actually move money, the guides worth reading
              first, a tracker that keeps score, and calculators for your
              real numbers. No jargon, no sign-up, no paywall.
            </p>
            <div className="mt-7 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-cream/20 bg-cream/20 sm:grid-cols-4">
              {(
                [
                  [String(scholarships.length), "verified awards"],
                  [String(collegeGuides.length), "college guides"],
                  [`${STUDENT_TOOL_PATHS.length}+`, "calculators"],
                  [String(deadlines.length), "deadlines"],
                ] as const
              ).map(([n, label]) => (
                <div key={label} className="bg-forest px-4 py-3">
                  <p className="font-display text-2xl font-bold text-amber">
                    {n}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-cream/70">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/students/deadlines"
                className="btn-ink inline-flex items-center rounded-md bg-amber px-6 py-3 text-base font-bold text-ink"
              >
                See what&apos;s due
              </Link>
              <Link
                href="/students/scholarships"
                className="inline-flex items-center rounded-md border border-cream/30 px-6 py-3 text-base font-semibold text-cream transition-colors hover:border-amber hover:text-amber"
              >
                Find scholarships
              </Link>
            </div>
            <p className="mt-5 text-sm text-cream/60">
              Not a student anymore?{" "}
              <Link
                href={frameHref("/learn", "student")}
                className="font-semibold text-cream underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
              >
                The whole library
              </Link>{" "}
              is still yours.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/3] rotate-1 overflow-hidden rounded-2xl border-2 border-ink shadow-[8px_8px_0_#11211c]">
              <Image
                src="/images/graduate.jpg"
                alt="A graduate celebrating"
                fill
                priority
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Made for you — stage picker that becomes six stage-right doors */}
      <StudentStageDash />

      {/* The five doors — poster cards (CourseGrid language): a solid color
          band carries the live number huge, the cream body sells the door.
          §4b absorbed two bands here: Opportunities is the fifth poster
          (New chip), and the calendar band collapsed to the first-two-dates
          line inside the Deadlines poster — #calendar lands on this grid. */}
      <section id="calendar" className="scroll-mt-20 bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {(
              [
                {
                  href: "/students/deadlines",
                  stat: String(deadlines.length),
                  statLabel: "dates tracked",
                  title: "Deadlines",
                  desc: "The dates that move real money, with reminders if you want them.",
                  color: "#c4573b",
                  tilt: "",
                  isNew: false,
                  dates: true,
                },
                {
                  href: "/students/scholarships",
                  stat: String(scholarships.length),
                  statLabel: "verified awards",
                  title: "Scholarships",
                  desc: "Real, hand-checked awards. Filter by where you are in school.",
                  color: "#c9842a",
                  tilt: "lg:rotate-[0.5deg]",
                  isNew: false,
                  dates: false,
                },
                {
                  href: "/students/opportunities",
                  stat: String(opportunities.length),
                  statLabel: "paid opportunities",
                  title: "Opportunities",
                  desc: "Scholarships pay for school. These internships and programs pay you.",
                  color: "#0c4a39",
                  tilt: "",
                  isNew: true,
                  dates: false,
                },
                {
                  href: "/students/tracker",
                  stat: "3",
                  statLabel: "tracks: HS, CC, uni",
                  title: "Tracker",
                  desc: "Units, grades, GPA, and your scholarship pipeline, kept score for you.",
                  color: "#15624b",
                  tilt: "lg:-rotate-[0.5deg]",
                  isNew: false,
                  dates: false,
                },
                {
                  href: frameHref("/learn/college", "student"),
                  stat: `${collegeGuides.length}`,
                  statLabel: "college guides",
                  title: "Guides",
                  desc: "The whole student shelf, from FAFSA to your first paycheck.",
                  color: "#b3762f",
                  tilt: "",
                  isNew: false,
                  dates: false,
                },
              ] as const
            ).map((door) => (
              <Link
                key={door.href}
                href={door.href}
                className={`card-ink group flex h-full flex-col overflow-hidden rounded-2xl bg-cream transition-transform duration-200 hover:-translate-y-1 ${door.tilt}`}
              >
                <div
                  className="relative overflow-hidden p-5 pb-4 text-cream"
                  style={{ background: door.color }}
                >
                  {door.isNew && (
                    <span className="absolute right-3 top-3 -rotate-2 rounded-md border-2 border-ink bg-amber px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink shadow-[2px_2px_0_#11211c]">
                      New
                    </span>
                  )}
                  <p className="font-display text-5xl font-bold leading-none">
                    {door.stat}
                  </p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-cream/80">
                    {door.statLabel}
                  </p>
                </div>
                <div className="flex flex-1 flex-col border-t-2 border-ink p-5">
                  <h2 className="font-display text-xl font-bold text-ink group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
                    {door.title}
                  </h2>
                  <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                    {door.desc}
                  </p>
                  {door.dates && (
                    <p className="mt-3 border-t border-sand pt-2.5 text-xs font-semibold leading-5 text-terracotta">
                      First up: FAFSA opens {studentCalendar[0].when} ·
                      scholarship season runs {studentCalendar[1].when}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Read these first + stay on track — teasers, not shelves */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Read these first
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                Four guides that pay for themselves
              </h2>
              {/* Read rows sink to the bottom (memory contract: lists never
                  hide read items — they demote them, ReadBadge stays). */}
              <ReadOrderedGrid
                className="mt-6 space-y-3"
                items={starters.map((a) => {
                  const topic = getTopic(a.topicId);
                  return {
                    slug: a.slug,
                    node: (
                      <div
                        className="card-ink group relative flex items-center gap-3 rounded-xl px-4 py-3.5 transition-transform duration-200 hover:-translate-y-0.5"
                        style={{
                          background: `color-mix(in srgb, ${topic.color} 10%, #fbf8f1)`,
                        }}
                      >
                        <TopicMark id={a.topicId} className="h-6 w-6 shrink-0" />
                        <Link
                          href={frameHref(`/learn/${a.topicId}/${a.slug}`, "student")}
                          className="min-w-0 flex-1 text-sm font-bold leading-snug text-ink after:absolute after:inset-0 group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4"
                          style={{ textDecorationColor: topic.color }}
                        >
                          {a.title}
                        </Link>
                        <span className="shrink-0 text-xs font-medium text-stone">
                          {a.readMinutes} min
                        </span>
                        <ReadBadge slug={a.slug} accent="#11211c" />
                      </div>
                    ),
                  };
                })}
              />
              <p className="mt-5 text-sm leading-6 text-stone">
                Then keep going:{" "}
                <Link
                  href={frameHref("/learn/college", "student")}
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  {`all ${collegeGuides.length} college & aid guides`}
                </Link>
                .
              </p>
            </div>

            {/* Stay on track — the page's only course/journey doors (§4b) */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Stay on track
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                Your college money path
              </h2>
              <div className="mt-6 space-y-4">
                <Link
                  href={frameHref("/journey/college", "student")}
                  className="card-ink block rounded-xl border-2 border-ink bg-forest p-5 text-cream shadow-[4px_4px_0_#e7a33c] transition-transform duration-200 hover:-translate-y-1"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber">
                    Guided path
                  </span>
                  <h3 className="mt-1.5 font-display text-xl font-bold">
                    Pay for college
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-cream/75">
                    Ordered milestones from FAFSA to signing day.
                  </p>
                </Link>
                {course && (
                  <Link
                    href={frameHref(`/courses/${course.id}`, "student")}
                    className="card-ink block rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta">
                      Course · badge at the end
                    </span>
                    <h3 className="mt-1.5 font-display text-xl font-bold text-ink">
                      {course.title}
                    </h3>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community band — split panel: solid forest text + ink-framed photo */}
      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber">
                You&apos;re not doing this alone
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                The Students channel is{" "}
                <span className="italic text-amber">your people.</span>
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-cream/75">
                Financial aid questions, student loan decisions, first
                paychecks, transfer plans, asked and answered by people in
                the same semester you&apos;re in.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/students/community"
                  className="btn-ink inline-flex items-center justify-center rounded-md bg-amber px-6 py-3 text-base font-bold text-ink"
                >
                  Visit the Students channel
                </Link>
                <Link
                  href="/students/community/post/say-hello"
                  className="inline-flex items-center justify-center rounded-md border border-cream/30 px-6 py-3 text-base font-semibold text-cream transition-colors hover:border-amber hover:text-amber"
                >
                  Introduce yourself
                </Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative aspect-[5/4] -rotate-1 overflow-hidden rounded-2xl border-2 border-ink shadow-[8px_8px_0_#e7a33c]">
                <Image
                  src="/images/mentor.jpg"
                  alt="Two people working through a problem together"
                  fill
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Everything else — the shelf, tools, and ASSIST bands' survivors as
          one-line doors (§4b band 6). The inventories live on the hubs;
          #shelf lands here (Guides ▾ "Student life essentials" points at it). */}
      <section id="shelf" className="scroll-mt-20 border-t-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Everything else, one click
          </span>
          <div className="mt-4 space-y-3">
            <div className="card-ink flex flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-xl bg-cream px-5 py-4">
              <p className="font-display text-base font-bold text-ink">
                The student shelf
                <span className="ml-2 font-sans text-sm font-medium text-stone">
                  {`All ${collegeGuides.length} college & aid guides, plus the first-time life essentials.`}
                </span>
              </p>
              <p className="text-sm font-semibold">
                <Link
                  href={frameHref("/learn/college", "student")}
                  className="text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  College shelf
                </Link>
                <span className="mx-2 text-stone/50">·</span>
                <Link
                  href={frameHref("/learn", "student")}
                  className="text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  All nine topics
                </Link>
              </p>
            </div>
            <div className="card-ink flex flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-xl bg-cream px-5 py-4 lg:rotate-[0.3deg]">
              <p className="font-display text-base font-bold text-ink">
                Run your numbers
                <span className="ml-2 font-sans text-sm font-medium text-stone">
                  {`${STUDENT_TOOL_PATHS.length} student calculators, in-house, no sign-up.`}
                </span>
              </p>
              <Link
                href="/students/tools"
                className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
              >
                All tools
              </Link>
            </div>
            <div className="card-ink flex flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-xl bg-cream px-5 py-4">
              <p className="font-display text-base font-bold text-ink">
                Transferring from community college?
                <span className="ml-2 font-sans text-sm font-medium text-stone">
                  Every course that transfers is a course you don&apos;t pay
                  for twice.
                </span>
              </p>
              <p className="text-sm font-semibold">
                <Link
                  href={frameHref(
                    "/learn/college/community-college-transfer-money",
                    "student"
                  )}
                  className="text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  The transfer money guide
                </Link>
                <span className="mx-2 text-stone/50">·</span>
                <a
                  href="https://assist.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  ASSIST.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
