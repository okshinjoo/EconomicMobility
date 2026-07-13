// The Deadlines hub (July 2026, owner ask: every subheader gets its own
// real page, modeled on the main site's hubs): the student money calendar
// in full, add-to-calendar downloads, the email-reminder signup, the
// guides behind each date, and the calculators you'll want open when a
// date lands. Everything in the student frame.

import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ReminderSignup from "@/components/ReminderSignup";
import { AddOneToCalendar, AddAllToCalendar } from "@/components/AddToCalendar";
import { ReadBadge } from "@/components/ReadBadge";
import { studentCalendar } from "@/lib/studentCalendar";
import { getArticleBySlug } from "@/lib/articles";
import { getTopic } from "@/lib/topics";
import { frameHref } from "@/lib/frame";

export const metadata: Metadata = {
  title: "Deadlines | Empower Students",
  description:
    "The student money calendar: FAFSA, scholarship season, state aid, tax day — every date that moves real money, with reminders and the guides behind each one.",
};

// The guides that make each date on the calendar survivable — read BEFORE
// the deadline, not the night of.
const DEADLINE_GUIDE_SLUGS = [
  "fafsa-step-by-step",
  "fafsa-mistakes",
  "finding-scholarships",
  "filing-taxes-first-time",
  "student-loans-before-you-sign",
  "repaying-student-loans",
];

const DEADLINE_TOOLS = [
  { title: "College Cost", href: "/students/tools/college-cost", note: "Know your gap before aid season starts." },
  { title: "Compare Aid Offers", href: "/students/tools/compare-offers", note: "Two award letters, side by side, before you commit." },
  { title: "Student Loan", href: "/students/tools/student-loan", note: "The real monthly cost, before you sign anything." },
  { title: "Student Tracker", href: "/students/tracker", note: "Put each deadline on your to-do list next to your units." },
];

export default function StudentDeadlinesPage() {
  const guides = DEADLINE_GUIDE_SLUGS.map((slug) => getArticleBySlug(slug)).filter(
    (a): a is NonNullable<ReturnType<typeof getArticleBySlug>> => Boolean(a)
  );

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Hero */}
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-12">
          <nav className="text-sm font-medium text-stone">
            <Link
              href="/students"
              className="underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              For Students
            </Link>{" "}
            / Deadlines
          </nav>
          <h1 className="mt-4 font-display text-[2.4rem] font-bold leading-[1.07] tracking-tight text-ink sm:text-5xl">
            The dates that{" "}
            <span className="relative whitespace-nowrap text-forest">
              move money.
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
            Eleven dates decide most of a student&apos;s money year. Miss one and
            it can cost thousands; hit them and school gets cheaper. They roll
            every year — these are current for 2026–27, and you can hand them
            to your calendar or your inbox below.
          </p>
        </div>
      </section>

      {/* The calendar — full cards */}
      <section className="border-b-2 border-ink bg-amber">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <span className="inline-block -rotate-1 rounded-lg border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
            The student money calendar
          </span>
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studentCalendar.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 70} className="h-full">
                <div className="card-ink flex h-full flex-col rounded-xl bg-cream p-5">
                  <p className="font-display text-lg font-bold text-terracotta">
                    {d.when}
                  </p>
                  <h2 className="mt-1 font-display text-base font-bold leading-snug text-ink">
                    {d.title}
                  </h2>
                  <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                    {d.detail}
                  </p>
                  <Link
                    href={frameHref(d.href, "student")}
                    className="mt-3 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                  >
                    {d.linkLabel}
                  </Link>
                  <AddOneToCalendar deadlineId={d.deadlineId} />
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <AddAllToCalendar />
            <p className="max-w-md text-sm font-medium leading-6 text-ink/75">
              One file, every date as a yearly-repeating event — your own calendar app
              reminds you a week ahead, every year, no sign-up.
            </p>
          </div>
        </div>
      </section>

      {/* Email reminders */}
      {process.env.RESEND_API_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY && (
        <section id="reminders" className="scroll-mt-20 bg-paper">
          <div className="mx-auto max-w-3xl px-6 pt-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              Never miss one
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Get a nudge before each deadline
            </h2>
            <p className="mt-2 text-base leading-7 text-stone">
              Pick the dates you care about and we email a few weeks ahead.
              Want more than dates? Opt into college advice — aid-season
              heads-ups written by a human, never a bot.
            </p>
            <div className="mt-5">
              <ReminderSignup />
            </div>
          </div>
        </section>
      )}

      {/* The guides behind the dates */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Read before the date, not the night of
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-7 text-stone">
            Each deadline has a guide that walks you through it — what to
            gather, what trips people up, and what happens after you file.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((a) => {
              const topic = getTopic(a.topicId);
              return (
                <Link
                  key={a.slug}
                  href={frameHref(`/learn/${a.topicId}/${a.slug}`, "student")}
                  className="group flex h-full flex-col rounded-2xl border border-sand bg-cream p-5 transition-all duration-200 hover:-translate-y-1 hover:border-ink/15 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[11px] font-bold uppercase tracking-wide"
                      style={{ color: topic.color }}
                    >
                      {topic.short}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ReadBadge slug={a.slug} accent={topic.color} />
                      <span className="text-[11px] font-semibold text-stone">
                        {a.readMinutes} min
                      </span>
                    </span>
                  </div>
                  <h3 className="mt-2 font-semibold leading-snug text-ink">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                    {a.dek}
                  </p>
                  <span
                    className="mt-3 text-sm font-semibold underline decoration-2 underline-offset-4"
                    style={{ color: topic.color, textDecorationColor: `${topic.color}55` }}
                  >
                    Read
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* When a date lands, run your numbers */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            When a date lands, run your numbers
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEADLINE_TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="card-ink flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
              >
                <h3 className="font-display text-base font-bold text-ink">
                  {t.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                  {t.note}
                </p>
                <span className="mt-3 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4">
                  Open
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm leading-6 text-stone">
            State grant deadlines vary — some land as early as February.{" "}
            <Link
              href={frameHref("/resources", "student")}
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              Find your state&apos;s programs
            </Link>{" "}
            — state grants and programs, by state.
          </p>
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
