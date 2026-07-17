import Link from "next/link";
import CourseGrid, { type CourseCardData } from "@/components/CourseGrid";
import TopicMark from "@/components/TopicMark";
import ScrollDrift from "@/components/ScrollDrift";
import HeroRecede from "@/components/HeroRecede";
import HeadlineRise from "@/components/HeadlineRise";
import { courses, getCourseFlashcards } from "@/lib/courses";
import { frameHref, type Frame } from "@/lib/frame";


/**
 * The whole courses hub below the header, shared by /courses and its
 * /students mirror (July 2026 full-containment pass).
 */
export default function CoursesHubView({ frame }: { frame: Frame }) {
  const href = (h: string) => frameHref(h, frame);
  const items: CourseCardData[] = courses.map((c) => ({
    id: c.id,
    title: c.title,
    goal: c.goal,
    description: c.description,
    color: c.color,
    articleSlugs: c.articleSlugs,
    cardCount: getCourseFlashcards(c).length,
    quizCount: c.finalQuiz.length,
    draft: c.draft,
  }));

  return (
    <>

      {/* Hero — C: editorial maximal on a forest field */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <ScrollDrift range={60} driftX={28} rotate={-5}>
          <TopicMark
            id="college"
            color="#fbf8f1"
            className="pointer-events-none absolute -right-16 -top-12 h-[26rem] w-[26rem] opacity-[0.16]"
          />
        </ScrollDrift>
        <HeroRecede className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
            Courses
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.95] tracking-tight sm:text-7xl">
            {/* Letter-by-letter blur-lift on the amber phrase (July 16). */}
            One goal{" "}
            <span className="italic text-amber">
              <HeadlineRise chars>at a time.</HeadlineRise>
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-cream/75">
            Each module is a short, ordered reading path built around one real
            goal, with sharper focus than the nine big topics. Read the guides,
            drill the flashcards, pass the final, earn the badge. Your progress
            saves on this device, no account needed.
          </p>
          <p className="mt-4 text-sm text-cream/60">
            Prefer to wander? The full{" "}
            <Link
              href={href("/learn")}
              className="font-semibold text-cream underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
            >
              library
            </Link>{" "}
            is always open.
          </p>
        </HeroRecede>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-amber px-6 py-5 text-ink">
            <p className="font-display text-lg font-semibold">
              Not sure which one? Start from your goal instead.
            </p>
            <Link
              href={href("/journey")}
              className="btn-ink rounded-md bg-cream px-4 py-2 text-sm font-bold text-ink"
            >
              Find your path
            </Link>
          </div>
          {frame === "student" && (() => {
            const pfc = items.find((c) => c.id === "paying-for-college");
            if (!pfc) return null;
            return (
              <Link
                href="/students/courses/paying-for-college"
                className="card-ink-lg mb-8 block rounded-2xl border-2 border-ink bg-forest p-7 text-cream shadow-[6px_6px_0_#e7a33c] transition-transform duration-200 hover:-translate-y-1 sm:p-8"
              >
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber">
                  The student course
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                  {pfc.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-cream/75">
                  {pfc.goal}
                </p>
              </Link>
            );
          })()}
          {frame === "student" && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-stone">
              Every other goal, when you want it
            </p>
          )}
          <CourseGrid items={items} frame={frame} />
        </div>
      </section>

    </>
  );
}
