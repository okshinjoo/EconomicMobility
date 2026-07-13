import Link from "next/link";
import JourneyIndex, {
  type JourneyCardData,
  type IndexStep,
} from "@/components/JourneyIndex";
import { journeys, journeyByTopic } from "@/lib/journeys";
import { frameHref, type Frame } from "@/lib/frame";


/**
 * The whole journey index below the header, shared by /journey and its
 * /students mirror (July 2026 full-containment pass). /plan and /quiz are
 * deliberate exits.
 */
export default function JourneyIndexView({ frame }: { frame: Frame }) {
  const href = (h: string) => frameHref(h, frame);
  const items: JourneyCardData[] = journeys.map((j) => {
    const steps: IndexStep[] = [];
    const stageSizes: number[] = [];
    for (const s of j.stages) {
      let size = 0;
      for (const slug of s.articleSlugs) {
        steps.push({ kind: "article", key: slug });
        size++;
      }
      if (s.tool) {
        steps.push({ kind: "tool", key: s.tool.href });
        size++;
      }
      if (s.courseId) {
        steps.push({ kind: "course", key: s.courseId });
        size++;
      }
      if (s.challengeId) {
        steps.push({ kind: "challenge", key: s.challengeId });
        size++;
      }
      if (s.topicQuiz) {
        steps.push({ kind: "quiz", key: s.topicQuiz });
        size++;
      }
      stageSizes.push(size);
    }
    return {
      id: j.id,
      title: j.title,
      promise: j.promise,
      color: j.color,
      stageCount: j.stages.length,
      guideCount: j.stages.reduce((n, s) => n + s.articleSlugs.length, 0),
      steps,
      milestones: j.stages.map((s) => s.milestone),
      stageSizes,
      topicId: j.topic,
      quizTopics: Object.entries(journeyByTopic)
        .filter(([, jid]) => jid === j.id)
        .map(([topic]) => topic),
    };
  });

  return (
    <>

      {/* Hero — C: editorial maximal */}
      <section className="relative overflow-hidden bg-forest text-cream">
        {/* Flowing path lines (Base44 direct copy, owner call July 2026) —
            faint white contours winding across the green, like a trail map. */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
          viewBox="0 0 800 500"
          preserveAspectRatio="xMidYMid slice"
        >
          {[60, 100, 140, 180, 220, 260, 300, 340, 380, 420].map((y) => (
            <path
              key={y}
              d={`M0,${y} Q200,${y - 30} 400,${y + 10} T800,${y - 15}`}
              stroke="white"
              strokeWidth="1.5"
              fill="none"
            />
          ))}
        </svg>
        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
            Your path
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Don&apos;t browse.{" "}
            <span className="italic text-amber">Follow a path.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/75">
            Pick the goal, and we&apos;ll walk you there: ordered milestones,
            the right guide at the right moment, a calculator when it&apos;s
            time to run your numbers, and a clear next step every time you come
            back. Progress saves on this device — no account needed.
          </p>
          <p className="mt-4 text-sm text-cream/60">
            Not sure which goal?{" "}
            <Link
              href={href("/quiz")}
              className="font-semibold text-cream underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
            >
              Take the 3-minute quiz
            </Link>{" "}
            and we&apos;ll point you at one.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          {/* The personal layer on top of the paths */}
          <Link
            href={href("/plan")}
            className="card-ink mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-amber p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-7"
          >
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink/70">
                New · My Plan
              </span>
              <p className="mt-1.5 font-display text-xl font-bold text-ink sm:text-2xl">
                Answer five questions, get one plan that&apos;s yours.
              </p>
              <p className="mt-1 text-sm leading-6 text-ink/75">
                The paths below, personalized: your goal, your situation, your
                deadlines — in the order that fits you, checking itself off as
                you go.
              </p>
            </div>
            <span className="btn-ink inline-flex shrink-0 items-center rounded-md bg-forest px-6 py-3 text-sm font-bold text-cream">
              Build my plan
            </span>
          </Link>
          {frame === "student" && (
            <Link
              href="/students/journey/college"
              className="card-ink-lg mb-8 block rounded-2xl border-2 border-ink bg-forest p-7 text-cream shadow-[6px_6px_0_#e7a33c] transition-transform duration-200 hover:-translate-y-1 sm:p-8"
            >
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber">
                The student path
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                Pay for college
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-cream/75">
                Ordered milestones from FAFSA to signing day — your progress
                fills the trail as you go.
              </p>
            </Link>
          )}
          {frame === "student" && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-stone">
              Every other goal, when you want it
            </p>
          )}
          <JourneyIndex items={items} frame={frame} />
          <p className="mt-10 text-sm text-stone">
            Every path is built from the same free library — a path just puts
            it in the right order. Prefer to wander? Head to{" "}
            <Link
              href={href("/learn")}
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              the library
            </Link>{" "}
            or{" "}
            <Link
              href={href("/life")}
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              start from a life moment
            </Link>
            .
          </p>
        </div>
      </section>

    </>
  );
}
