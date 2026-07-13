import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import StudentStageDash from "@/components/StudentStageDash";
import TopicMark from "@/components/TopicMark";
import { ReadBadge } from "@/components/ReadBadge";
import { getArticleBySlug, getTopicArticles } from "@/lib/articles";
import { getTopic } from "@/lib/topics";
import { getCourse } from "@/lib/courses";
import { studentCalendar } from "@/lib/studentCalendar";
import { STUDENT_LIFE_SLUGS } from "@/lib/studentShelf";
import { frameHref } from "@/lib/frame";
import Image from "next/image";
import { deadlines } from "@/lib/deadlines";
import { scholarships } from "@/lib/scholarships";

// The microsite HOMEPAGE (July 13 owner pass: "it's too wordy" — adopt the
// main homepage's style: introduce, tease, and link to the hubs). The full
// inventories live on the subheader pages now — /students/deadlines,
// /students/learn/college, /students/scholarships, /students/tools — so
// every band here is a door, not a warehouse. Don't re-inline content the
// hubs own.

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

// Pastel tints per tile (the tools-hub tile language): category-ish hues,
// dark enough for ink text on top.
const TOOL_TEASERS = [
  { title: "College Cost", href: "/students/tools/college-cost", tint: "#c9842a" },
  { title: "Compare Aid Offers", href: "/students/tools/compare-offers", tint: "#b3762f" },
  { title: "Student Loan", href: "/students/tools/student-loan", tint: "#c4573b" },
  { title: "Paycheck", href: "/students/tools/paycheck", tint: "#15624b" },
  { title: "Budget Planner", href: "/students/tools/budget", tint: "#0c4a39" },
  { title: "Rent Affordability", href: "/students/tools/rent", tint: "#7a5230" },
  { title: "Emergency Fund", href: "/students/tools/emergency-fund", tint: "#2f6d80" },
  { title: "Reality Check", href: "/students/tools/reality-check", tint: "#d26a4c" },
];

export default function StudentsPage() {
  const starters = STARTER_SLUGS.map((slug) => getArticleBySlug(slug)).filter(
    (a): a is NonNullable<ReturnType<typeof getArticleBySlug>> => Boolean(a)
  );
  const course = getCourse("paying-for-college");
  const collegeGuides = getTopicArticles("college");
  const studentLife = STUDENT_LIFE_SLUGS.map((slug) =>
    getArticleBySlug(slug)
  ).filter((a): a is NonNullable<ReturnType<typeof getArticleBySlug>> =>
    Boolean(a)
  );

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
                  [`${TOOL_TEASERS.length}+`, "calculators"],
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

      {/* The four doors — poster cards (CourseGrid language): a solid color
          band carries the live number huge, the cream body sells the door */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                },
                {
                  href: "/students/scholarships",
                  stat: String(scholarships.length),
                  statLabel: "verified awards",
                  title: "Scholarships",
                  desc: "Real, hand-checked awards — filter by where you are in school.",
                  color: "#c9842a",
                  tilt: "lg:rotate-[0.5deg]",
                },
                {
                  href: "/students/tracker",
                  stat: "3",
                  statLabel: "tracks: HS, CC, uni",
                  title: "Tracker",
                  desc: "Units, grades, GPA, and your scholarship pipeline — kept score for you.",
                  color: "#15624b",
                  tilt: "",
                },
                {
                  href: frameHref("/learn/college", "student"),
                  stat: `${collegeGuides.length}`,
                  statLabel: "college guides",
                  title: "Guides",
                  desc: "The whole student shelf, from FAFSA to your first paycheck.",
                  color: "#b3762f",
                  tilt: "lg:-rotate-[0.5deg]",
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities door — the experience half of the money story */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 pb-12">
          <Link
            href="/students/opportunities"
            className="card-ink-lg flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-forest p-7 text-cream shadow-[6px_6px_0_#e7a33c] transition-transform duration-200 hover:-translate-y-1 sm:p-8"
          >
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber">
                New · Internships &amp; opportunities
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                Scholarships pay for school. These pay you.
              </h2>
              <p className="mt-2 text-sm leading-6 text-cream/75">
                Verified internships, fellowships, and research programs —
                free to apply, many with stipends attached.
              </p>
            </div>
            <span className="btn-ink inline-flex shrink-0 items-center rounded-md bg-amber px-6 py-3 text-sm font-bold text-ink">
              Browse opportunities
            </span>
          </Link>
        </div>
      </section>

      {/* Calendar teaser — the dates as one glance; the page has the rest */}
      <section id="calendar" className="scroll-mt-20 border-y-2 border-ink bg-amber">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <span className="inline-block -rotate-1 rounded-lg border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
            The student money calendar
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
            The dates that decide your money year
          </h2>
          {/* QuestionBoxes card language (the saved Base44 template — owner
              asked for it here so the dates read clearly on the amber):
              light boxed rows, date in the numeral-chip position, arrow is
              the template's owner-excepted detail. */}
          <ul className="mt-6 grid gap-3.5 lg:grid-cols-2">
            {studentCalendar.map((d) => (
              <li key={d.title}>
                <Link
                  href="/students/deadlines"
                  className="group flex h-full items-center gap-4 rounded-lg border-2 border-ink bg-cream px-5 py-3.5 text-ink transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span
                    aria-hidden
                    className="flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-amber/15 px-3 font-display text-sm font-bold leading-none text-terracotta transition-colors group-hover:bg-amber group-hover:text-ink"
                  >
                    {d.when}
                  </span>
                  <span className="min-w-0 flex-1 font-display text-base font-semibold leading-snug">
                    {d.title}
                  </span>
                  <span className="hidden shrink-0 text-sm text-stone transition-colors group-hover:text-terracotta sm:block">
                    Details &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base font-medium text-ink/80">
            Reminders, calendar downloads, and the guide behind each date live
            on{" "}
            <Link
              href="/students/deadlines"
              className="font-bold text-ink underline decoration-ink/40 decoration-2 underline-offset-4 hover:decoration-ink"
            >
              the deadlines page
            </Link>
            .
          </p>
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
              <div className="mt-6 space-y-3">
                {starters.map((a) => {
                  const topic = getTopic(a.topicId);
                  return (
                    <div
                      key={a.slug}
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
                  );
                })}
              </div>
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

            {/* Stay on track — three doors */}
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
                <Link
                  href="/students/tracker"
                  className="card-ink block rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta">
                    Your tracker
                  </span>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-ink">
                    Every unit, counted
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The shelf, as doors — the guides live on their hub pages */}
      <section id="shelf" className="scroll-mt-20 border-t-2 border-ink bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-5 lg:grid-cols-2">
            <Link
              href={frameHref("/learn/college", "student")}
              className="card-ink-lg group flex flex-col rounded-2xl bg-cream p-7 transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                The college shelf
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                {`All ${collegeGuides.length} college & aid guides`}
              </h2>
              <p className="mt-2 flex-1 text-base leading-7 text-stone">
                FAFSA to award letters to repayment, in reading order — basics
                first, read ones sink to the bottom.
              </p>
              <span className="mt-4 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 group-hover:text-ink">
                Browse the shelf
              </span>
            </Link>
            <div className="card-ink-lg rounded-2xl bg-cream p-7 lg:rotate-[0.3deg]">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Student life, beyond tuition
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                The first-time essentials
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                {studentLife.map((a) => (
                  <Link
                    key={a.slug}
                    href={frameHref(`/learn/${a.topicId}/${a.slug}`, "student")}
                    className="group flex items-center gap-2 border-b border-sand py-2 text-sm font-semibold text-ink hover:text-forest"
                  >
                    <TopicMark id={a.topicId} className="h-4 w-4 shrink-0" />
                    <span className="min-w-0 flex-1 truncate">{a.title}</span>
                    <ReadBadge slug={a.slug} accent="#11211c" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transferring — one sentence, two doors */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-2">
          <div className="card-ink flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-cream px-7 py-6 lg:-rotate-[0.3deg]">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Transferring from community college?
              </span>
              <p className="mt-2 font-display text-xl font-bold text-ink">
                Every course that transfers is a course you don&apos;t pay for
                twice.
              </p>
              <p className="mt-1.5 text-sm leading-6 text-stone">
                <Link
                  href={frameHref("/learn/college/community-college-transfer-money", "student")}
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  The transfer money guide
                </Link>{" "}
                walks the whole play; ASSIST.org is California&apos;s official
                course-by-course map.
              </p>
            </div>
            <a
              href="https://assist.org"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink inline-flex items-center rounded-md bg-forest px-6 py-3 text-sm font-bold text-cream"
            >
              Open ASSIST.org
            </a>
          </div>
        </div>
      </section>

      {/* Tools teaser — names only; the hub has the descriptions */}
      <section className="border-t-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Run your numbers
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                Every calculator, in-house
              </h2>
            </div>
            <Link
              href="/students/tools"
              className="btn-ink inline-flex items-center rounded-md bg-amber px-5 py-2.5 text-sm font-bold text-ink"
            >
              All tools
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TOOL_TEASERS.map((t, i) => (
              <Link
                key={t.href}
                href={t.href}
                className={`card-ink flex items-center justify-between gap-2 rounded-xl px-4 py-3.5 text-sm font-bold text-ink transition-transform duration-150 hover:-translate-y-1 ${
                  i === 2 || i === 5 ? "lg:rotate-[0.6deg]" : ""
                }`}
                style={{
                  background: `color-mix(in srgb, ${t.tint} 14%, #fbf8f1)`,
                }}
              >
                <span className="min-w-0">{t.title}</span>
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: t.tint }}
                />
              </Link>
            ))}
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
                paychecks, transfer plans — asked and answered by people in
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
                  src="/images/students-collab.jpg"
                  alt="Students working together"
                  fill
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
