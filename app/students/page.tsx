import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TopicMark from "@/components/TopicMark";
import { ReadBadge } from "@/components/ReadBadge";
import { getArticleBySlug, getTopicArticles } from "@/lib/articles";
import ReadOrderedGrid from "@/components/ReadOrderedGrid";
import { getTopic } from "@/lib/topics";
import { getCourse } from "@/lib/courses";
import { studentCalendar } from "@/lib/studentCalendar";
import ReminderSignup from "@/components/ReminderSignup";

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

const STUDENT_TOOLS = [
  { title: "College Cost", href: "/tools/college", note: "The gap after aid, and what filling it costs." },
  { title: "Compare Aid Offers", href: "/tools/college/compare-offers", note: "Two award letters, side by side." },
  { title: "Student Loan", href: "/tools/college/student-loan", note: "The real monthly cost of borrowing." },
  { title: "Paycheck", href: "/tools/budget/paycheck", note: "What your campus job actually pays after taxes." },
  { title: "Budget Planner", href: "/tools/budget", note: "Take-home pay against real expenses, in one screen." },
  { title: "Rent Affordability", href: "/tools/budget/rent", note: "What rent fits your income, before you sign." },
  { title: "Emergency Fund", href: "/tools/budget/emergency-fund", note: "How big yours should be, and how long it takes." },
  { title: "Reality Check", href: "/tools/budget/reality-check", note: "Pick the life you want; see the salary it takes." },
];

// The student money essentials that live OUTSIDE the college topic — the
// campus-job, first-tax-season, first-lease side of student life.
const STUDENT_LIFE_SLUGS = [
  "how-to-fill-out-w4",
  "how-to-read-a-pay-stub",
  "opening-first-bank-account",
  "choosing-first-credit-card",
  "building-a-savings-habit",
  "need-cash-fast",
  "turning-18-money",
  "your-first-benefits-enrollment",
];

export default function StudentsPage() {
  const starters = STARTER_SLUGS.map((slug) => getArticleBySlug(slug)).filter(
    (a): a is NonNullable<ReturnType<typeof getArticleBySlug>> => Boolean(a)
  );
  const roadmap = getArticleBySlug("college-money-roadmap");
  const course = getCourse("paying-for-college");
  const collegeGuides = getTopicArticles("college");
  const studentLife = STUDENT_LIFE_SLUGS.map((slug) =>
    getArticleBySlug(slug)
  ).filter((a): a is NonNullable<ReturnType<typeof getArticleBySlug>> =>
    Boolean(a)
  );

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero — C voice on the forest field */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <TopicMark
          id="college"
          color="#fbf8f1"
          className="pointer-events-none absolute -right-14 -top-10 h-[22rem] w-[22rem] opacity-[0.07]"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-14 lg:py-20">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
            For students
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            The money side of school,{" "}
            <span className="italic text-amber">in one place.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/75">
            Deadlines that actually move money, the guides worth reading
            first, a path that keeps you on track, and calculators for your
            real numbers. No jargon, no sign-up, no paywall.
          </p>
          <p className="mt-4 text-sm text-cream/60">
            Not a student anymore?{" "}
            <Link
              href="/learn"
              className="font-semibold text-cream underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
            >
              The whole library
            </Link>{" "}
            is still yours.
          </p>
        </div>
      </section>

      {/* The student money calendar — amber color field */}
      <section className="border-y-2 border-ink bg-amber">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <span className="inline-block -rotate-1 rounded-lg border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
            The student money calendar
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Deadlines that move real money
          </h2>
          <p className="mt-2 max-w-2xl text-base font-medium leading-7 text-ink/75">
            Miss one and it can cost you thousands — hit them and school gets
            cheaper. Dates roll every year; these are current for 2026–27.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studentCalendar.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 70} className="h-full">
                <div className="card-ink flex h-full flex-col rounded-xl bg-cream p-5">
                  <p className="font-display text-lg font-bold text-terracotta">
                    {d.when}
                  </p>
                  <h3 className="mt-1 font-display text-base font-bold leading-snug text-ink">
                    {d.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                    {d.detail}
                  </p>
                  <Link
                    href={d.href}
                    className="mt-3 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                  >
                    {d.linkLabel}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deadline reminders — renders only once the sending env exists
          (docs/reminders-setup.md) */}
      {process.env.RESEND_API_KEY &&
        process.env.SUPABASE_SERVICE_ROLE_KEY && (
          <section className="bg-paper">
            <div className="mx-auto max-w-3xl px-6 pt-12">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Never miss one
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                Get a nudge before each deadline
              </h2>
              <div className="mt-5">
                <ReminderSignup />
              </div>
            </div>
          </section>
        )}

      {/* Read these first + the transfer-ready path */}
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
                        href={`/learn/${a.topicId}/${a.slug}`}
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
                  href="/learn/college"
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  all the college &amp; student loan guides
                </Link>
                {roadmap && (
                  <>
                    {" "}
                    — or take{" "}
                    <Link
                      href={`/learn/${roadmap.topicId}/${roadmap.slug}`}
                      className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                    >
                      the whole path on one page
                    </Link>
                  </>
                )}
                .
              </p>
            </div>

            {/* Stay on track */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Stay on track
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                Your college money path
              </h2>
              <div className="mt-6 space-y-4">
                <Link
                  href="/journey/college"
                  className="card-ink block rounded-xl border-2 border-ink bg-forest p-5 text-cream shadow-[4px_4px_0_#e7a33c] transition-transform duration-200 hover:-translate-y-1"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber">
                    Guided path
                  </span>
                  <h3 className="mt-1.5 font-display text-xl font-bold">
                    Pay for college
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-cream/75">
                    Ordered milestones from FAFSA to signing day — your
                    progress fills the trail as you go.
                  </p>
                </Link>
                {course && (
                  <Link
                    href={`/courses/${course.id}`}
                    className="card-ink block rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta">
                      Course · badge at the end
                    </span>
                    <h3 className="mt-1.5 font-display text-xl font-bold text-ink">
                      {course.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-stone">
                      {course.goal}
                    </p>
                  </Link>
                )}
                <Link
                  href="/students/tracker"
                  className="card-ink block rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta">
                    New · your tracker
                  </span>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-ink">
                    Every unit, counted
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-stone">
                    Courses, grades, and to-dos — with your progress toward
                    the 60-unit transfer mark and the dollars each course
                    protects.
                  </p>
                </Link>
                <Link
                  href="/students/scholarships"
                  className="card-ink block rounded-xl bg-amber p-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink/70">
                    New · verified list
                  </span>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-ink">
                    The Scholarship Finder
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-ink/75">
                    Real national awards, filterable by where you are in
                    school — every one linked to its official site.
                  </p>
                </Link>
                <Link
                  href="/life"
                  className="card-ink block rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta">
                    Life moment
                  </span>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-ink">
                    I&apos;m heading to college
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-stone">
                    The three reads, one tool, and one course for exactly this
                    moment.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The whole student shelf — every college guide + the cross-topic
          student-life essentials. Read ones sink, never hide. */}
      <section className="border-t-2 border-ink bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            The whole student shelf
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Every guide that earns a student money
          </h2>

          <h3 className="mt-8 font-display text-xl font-bold text-ink">
            College &amp; financial aid — all {collegeGuides.length} guides
          </h3>
          <ReadOrderedGrid
            className="mt-4 grid gap-3 sm:grid-cols-2"
            items={collegeGuides.map((a, i) => ({
              slug: a.slug,
              node: (
                <Reveal key={a.slug} delay={(i % 2) * 50} className="h-full">
                  <Link
                    href={`/learn/${a.topicId}/${a.slug}`}
                    className="card-ink flex h-full items-center gap-3 rounded-xl bg-cream px-4 py-3 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <span className="flex-1 text-sm font-bold leading-snug text-ink">
                      {a.title}
                    </span>
                    <span className="shrink-0 text-xs font-medium text-stone">
                      {a.readMinutes} min
                    </span>
                    <ReadBadge slug={a.slug} accent="#11211c" />
                  </Link>
                </Reveal>
              ),
            }))}
          />

          <h3 className="mt-10 font-display text-xl font-bold text-ink">
            Student life, beyond tuition
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-stone">
            The campus-job, first-tax-season, first-lease side of being a
            student — pulled from across the library.
          </p>
          <ReadOrderedGrid
            className="mt-4 grid gap-3 sm:grid-cols-2"
            items={studentLife.map((a, i) => ({
              slug: a.slug,
              node: (
                <Reveal key={a.slug} delay={(i % 2) * 50} className="h-full">
                  <Link
                    href={`/learn/${a.topicId}/${a.slug}`}
                    className="card-ink flex h-full items-center gap-3 rounded-xl px-4 py-3 transition-transform duration-200 hover:-translate-y-0.5"
                    style={{
                      background: `color-mix(in srgb, ${getTopic(a.topicId).color} 10%, #fbf8f1)`,
                    }}
                  >
                    <TopicMark id={a.topicId} className="h-5 w-5 shrink-0" />
                    <span className="flex-1 text-sm font-bold leading-snug text-ink">
                      {a.title}
                    </span>
                    <span className="shrink-0 text-xs font-medium text-stone">
                      {a.readMinutes} min
                    </span>
                    <ReadBadge slug={a.slug} accent="#11211c" />
                  </Link>
                </Reveal>
              ),
            }))}
          />
        </div>
      </section>

      {/* Transferring — point at the official agreement map, don't copy it */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 pb-12">
          <div className="card-ink-lg flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-cream p-7 sm:p-8 lg:-rotate-[0.3deg]">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Transferring from community college?
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                The course-by-course transfer map already exists.
              </h2>
              <p className="mt-2 text-base leading-7 text-stone">
                In California, ASSIST.org is the official record of exactly
                which community college courses count at each UC and CSU, by
                major. Check it <em>before</em>{" "}you register each term — every
                course that transfers is a course you don&apos;t pay for
                twice. Outside California, your college&apos;s transfer center
                keeps the equivalent agreements; our{" "}
                <Link
                  href="/resources"
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  state finder
                </Link>{" "}
                points to your state&apos;s programs. New to all of this?{" "}
                <Link
                  href="/learn/college/community-college-transfer-money"
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  Our transfer money guide
                </Link>{" "}
                walks the whole play — and as you confirm each course,{" "}
                <Link
                  href="/students/tracker"
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  log it in your tracker
                </Link>{" "}
                so the units add up where you can see them.
              </p>
            </div>
            <a
              href="https://assist.org"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink inline-flex items-center rounded-md bg-forest px-7 py-3.5 text-base font-bold text-cream"
            >
              Open ASSIST.org
            </a>
          </div>
        </div>
      </section>

      {/* Tools row */}
      <section className="border-t-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Run your numbers
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
            The calculators students use most
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STUDENT_TOOLS.map((t, i) => (
              <Reveal key={t.href} delay={i * 60} className="h-full">
                <Link
                  href={t.href}
                  className="card-ink flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  <h3 className="font-display text-lg font-bold text-ink">
                    {t.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                    {t.note}
                  </p>
                  <span className="mt-3 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4">
                    Open
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Community band */}
      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
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
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/community"
                className="btn-ink inline-flex items-center justify-center rounded-md bg-amber px-6 py-3 text-base font-bold text-ink"
              >
                Visit the Students channel
              </Link>
              <Link
                href="/community/post/say-hello"
                className="inline-flex items-center justify-center rounded-md border border-cream/30 px-6 py-3 text-base font-semibold text-cream transition-colors hover:border-amber hover:text-amber"
              >
                Introduce yourself
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
