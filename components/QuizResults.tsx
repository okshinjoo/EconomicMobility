import Link from "next/link";
import { frameHref } from "@/lib/frame";
import { useFrame } from "@/components/useFrame";
import { useEffect, useState } from "react";
import { getReadMap } from "@/lib/readTracking";
import { loadJSON } from "@/lib/storage";
import { getTopic, type TopicId } from "@/lib/topics";
import { journeyByTopic, getJourney } from "@/lib/journeys";
import TopicMark from "@/components/TopicMark";
import SaveToProfile from "@/components/SaveToProfile";
import {
  readContext,
  rankedPriorities,
  journeySlugForGoal,
  GOAL_LABEL,
} from "@/lib/personalization";
import {
  ALL_TOPIC_IDS,
  CLOSING_LINE,
  KC_QUESTIONS_PER_TOPIC,
  NOT_SURE_MESSAGE,
  extraResourceCards,
  getFinancialProfile,
  getGeneralCheckFeedback,
  getKnowledgeCheckFeedback,
  getWhereToStart,
  scoreGeneralCheck,
  scoreKnowledgeCheck,
  topicResourceCards,
  type KCAnswers,
  type QuizAnswers,
  type ResourceCard,
  type Tier,
} from "@/lib/quizData";

interface QuizResultsProps {
  answers: QuizAnswers;
  tier: Tier;
  isNotSure: boolean;
  skippedKc?: boolean;
  /** Topics that actually got knowledge-check questions (first MAX_KC_TOPICS
   *  of the selection). Older snapshots omit it — fall back to all. */
  quizzedTopicIds?: TopicId[];
  selectedTopicIds: TopicId[];
  kcAnswers: KCAnswers;
  onRetake: () => void;
  /** TopicId -> roadmap article for the "follow the path" links (server-derived). */
  roadmapsByTopic?: Partial<Record<string, { title: string; href: string }>>;
}

/** Done-state from this device: read slugs + earned badges (mounted-only). */
function useDoneState() {
  const [done, setDone] = useState<{
    read: Set<string>;
    courseBadges: Set<string>;
    challengeBadges: Set<string>;
  }>({ read: new Set(), courseBadges: new Set(), challengeBadges: new Set() });
  useEffect(() => {
    setDone({
      read: new Set(Object.keys(getReadMap())),
      courseBadges: new Set(
        Object.keys(loadJSON<Record<string, unknown>>("empower:course-badges:v1") ?? {})
      ),
      challengeBadges: new Set(
        Object.keys(loadJSON<Record<string, unknown>>("empower:challenge-badges:v1") ?? {})
      ),
    });
  }, []);
  return done;
}

/** The person's top saved-goal path (from their profile, NOT the quiz) — an
 *  additive nudge shown alongside the quiz recommendation. Null when they
 *  haven't saved any goals. Mounted-only (localStorage). */
function useProfileGoalPath(): { label: string; href: string } | null {
  const [path, setPath] = useState<{ label: string; href: string } | null>(
    null
  );
  useEffect(() => {
    const top = rankedPriorities(readContext())[0];
    if (top)
      setPath({
        label: GOAL_LABEL[top.goal],
        href: `/journey/${journeySlugForGoal(top.goal)}`,
      });
  }, []);
  return path;
}

export default function QuizResults({
  answers,
  tier,
  isNotSure,
  skippedKc = false,
  quizzedTopicIds,
  selectedTopicIds,
  kcAnswers,
  onRetake,
  roadmapsByTopic,
}: QuizResultsProps) {
  const frame = useFrame();
  const profile = getFinancialProfile(answers.q1, answers.q2, tier);
  const doneState = useDoneState();
  const goalPath = useProfileGoalPath();

  const hasTopics = selectedTopicIds.length > 0;
  // "Pure" not-sure = unsure with no specific topics → general check + broad guidance.
  const pureNotSure = isNotSure && !hasTopics;
  const general = pureNotSure ? scoreGeneralCheck(kcAnswers) : null;

  const whereToStartTopics = hasTopics ? selectedTopicIds : ALL_TOPIC_IDS;
  const whereToStart = getWhereToStart(
    whereToStartTopics,
    answers.q2,
    answers.q1,
    tier
  );

  const topicCards: ResourceCard[] = whereToStart.map(
    (step) => topicResourceCards[step.topicId][tier]
  );
  const extraCards: ResourceCard[] = answers.q4
    .map((id) => extraResourceCards[id])
    .filter((card): card is ResourceCard => Boolean(card));
  const allCards = [...topicCards, ...extraCards].slice(0, 5);

  return (
    <div>
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-deep">
          Your Results
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Here&apos;s Where to Start
        </h1>
        <div className="mt-3 flex justify-center">
          <SaveToProfile thing="quiz results" />
        </div>
      </div>

      {/* Part 1: Financial Profile — celebratory B-voice card */}
      <section className="relative mt-10 overflow-hidden rounded-2xl border-2 border-ink bg-forest p-8 text-cream shadow-[7px_7px_0_#e7a33c] sm:-rotate-[0.5deg]">
        <TopicMark
          id={selectedTopicIds[0] ?? "budgeting"}
          color="#fbf8f1"
          className="pointer-events-none absolute -bottom-10 -right-8 h-44 w-44 opacity-[0.08]"
        />
        <h2 className="inline-block -rotate-2 rounded-md border-2 border-ink bg-amber px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-ink">
          Your Financial Profile
        </h2>
        <p className="relative mt-4 text-lg leading-8">{profile}</p>
      </section>

      {/* Part 2: Knowledge Check Feedback (or "not sure" / "skipped" framing) */}
      <section className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-deep">
          {skippedKc
            ? "Based on What You Told Us"
            : pureNotSure
              ? "Let's Figure It Out Together"
              : "Your Knowledge Check"}
        </h2>

        {skippedKc ? (
          <p className="mt-4 text-base leading-7 text-stone">
            You skipped the knowledge check, which is completely fine. Your
            recommendations below are built from your goals and how confident you
            said you feel. If you ever want a quick gut-check, retake the quiz
            and answer those questions anytime.
          </p>
        ) : pureNotSure && general ? (
          <div className="mt-4 space-y-4">
            <div className="card-ink rounded-xl bg-cream p-5">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-ink">Quick knowledge check</h3>
                <span className="ml-auto flex-shrink-0 font-display text-base font-bold tabular-nums text-ink/60">
                  {general.correct}/{general.total}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-stone">
                {getGeneralCheckFeedback(general.correct, general.total)}
              </p>
            </div>
            <p className="text-base leading-7 text-stone">
              {NOT_SURE_MESSAGE}
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {(quizzedTopicIds ?? selectedTopicIds).map((topicId) => {
              const topic = getTopic(topicId);
              const score = scoreKnowledgeCheck(
                topicId,
                tier,
                kcAnswers[topicId] ?? []
              );
              const feedback = getKnowledgeCheckFeedback(
                topic.title,
                score,
                tier
              );
              return (
                <div
                  key={topicId}
                  className="card-ink rounded-xl bg-cream p-5"
                >
                  <div className="flex items-center gap-2.5">
                    <TopicMark id={topicId} className="h-6 w-6 flex-shrink-0" />
                    <h3 className="font-semibold text-ink">{topic.title}</h3>
                    <span className="ml-auto flex-shrink-0 font-display text-base font-bold tabular-nums text-ink/60">
                      {score}/{KC_QUESTIONS_PER_TOPIC}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-stone">
                    {feedback}
                  </p>
                </div>
              );
            })}
            {quizzedTopicIds &&
              quizzedTopicIds.length < selectedTopicIds.length && (
                <p className="text-sm leading-6 text-stone">
                  To keep the quiz short, we only spot-checked your first{" "}
                  {quizzedTopicIds.length === 1 ? "topic" : "two topics"};
                  the plan below still covers everything you picked.
                </p>
              )}
          </div>
        )}
      </section>

      {/* Part 3: Where to Start — editorial numbered list */}
      <section className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-deep">
          Where to Start
        </h2>
        <p className="mt-4 text-base leading-7 text-stone">
          Based on your answers, here&apos;s the order we&apos;d suggest
          tackling your topics:
        </p>
        <ol className="mt-4">
          {whereToStart.map((step, i) => {
            const topic = getTopic(step.topicId);
            return (
              <li
                key={step.topicId}
                className="group flex gap-5 border-b border-sand py-5 first:border-t first:border-t-sand"
              >
                <span className="w-12 flex-shrink-0 font-display text-5xl font-bold leading-none text-sand transition-colors group-hover:text-amber">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-base font-bold text-ink">
                    {step.label}: {topic.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-stone">
                    {step.why}
                  </p>
                  {roadmapsByTopic?.[step.topicId] &&
                    !doneState.read.has(
                      roadmapsByTopic[step.topicId]!.href.split("/").pop() ?? ""
                    ) && (
                    <p className="mt-2 text-sm">
                      <Link
                        href={frameHref(roadmapsByTopic[step.topicId]!.href, frame)}
                        className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
                      >
                        Follow the roadmap: {roadmapsByTopic[step.topicId]!.title}
                      </Link>
                    </p>
                  )}
                  {journeyByTopic[step.topicId] && (
                    <p className="mt-2 text-sm">
                      <Link
                        href={frameHref(`/journey/${journeyByTopic[step.topicId]}`, frame)}
                        className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
                      >
                        Or let us walk you through it: the{" "}
                        {getJourney(journeyByTopic[step.topicId]!)?.title.toLowerCase()}{" "}
                        path
                      </Link>
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Handoff: turn these results into a living plan */}
      <section className="mt-10">
        <Link
          href={frameHref("/plan", frame)}
          className="card-ink flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-forest p-6 text-cream shadow-[5px_5px_0_#e7a33c] transition-transform duration-200 hover:-translate-y-1"
        >
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber">
              Want this as one plan?
            </p>
            <p className="mt-1.5 font-display text-xl font-bold sm:text-2xl">
              Five more questions and it&apos;s a living checklist.
            </p>
            <p className="mt-1 text-sm leading-6 text-cream/75">
              Your goal, your deadlines, your next step: saved, and checking
              itself off as you read and use the site.
            </p>
          </div>
          <span className="btn-ink inline-flex shrink-0 items-center rounded-md bg-amber px-6 py-3 text-sm font-bold text-ink">
            Build my plan
          </span>
        </Link>
      </section>

      {/* Part 4: Resource Cards — B voice, one tilted */}
      <section className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-deep">
          Your Resources
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {allCards.map((card, i) => (
            <Link
              key={card.title}
              href={frameHref(card.href, frame)}
              className={`card-ink group flex flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1 ${
                i === 1 ? "sm:rotate-[0.5deg]" : ""
              }`}
            >
              <h3 className="font-display font-semibold text-ink">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-stone">
                {card.description}
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4">
                Explore
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Course recommendation from selected topics */}
      {(() => {
        const courseByTopic: Partial<Record<string, { title: string; href: string; kind: string }>> = {
          credit: { title: "Credit From Zero", href: "/courses/credit-from-zero", kind: "course" },
          budgeting: { title: "Your First Paycheck", href: "/courses/first-paycheck", kind: "course" },
          taxes: { title: "Your First Paycheck", href: "/courses/first-paycheck", kind: "course" },
          college: { title: "Paying for College", href: "/courses/paying-for-college", kind: "course" },
          investing: { title: "Start Investing", href: "/courses/start-investing", kind: "course" },
          "home-ownership": { title: "Your First Apartment", href: "/courses/first-apartment", kind: "course" },
          "money-safety": { title: "Scam-Proof", href: "/courses/scam-proof", kind: "course" },
          "government-aid": { title: "The Money Reset Week", href: "/challenges/money-reset-week", kind: "challenge" },
          insurance: { title: "Your First Paycheck", href: "/courses/first-paycheck", kind: "course" },
        };
        const earned = (r: { href: string; kind: string }) => {
          const id = r.href.split("/").pop() ?? "";
          return r.kind === "course"
            ? doneState.courseBadges.has(id)
            : doneState.challengeBadges.has(id);
        };
        const rec = selectedTopicIds
          .map((t) => courseByTopic[t])
          .filter((r): r is NonNullable<typeof r> => Boolean(r))
          .find((r) => !earned(r));
        if (!rec) return null;
        return (
          <section className="mt-10">
            <div className="card-ink flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-forest p-6 text-cream sm:p-8 lg:-rotate-[0.3deg]">
              <div className="max-w-md">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber">
                  Want the guided version?
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold">
                  {rec.kind === "course"
                    ? `The ${rec.title} module fits your picks.`
                    : `The ${rec.title} challenge fits your picks.`}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-cream/75">
                  {rec.kind === "course"
                    ? "A short ordered reading path, flashcards, a final quiz, and a badge at the end."
                    : "Real action steps, a shared community thread, and a badge when you finish."}
                </p>
              </div>
              <Link
                href={frameHref(rec.href, frame)}
                className="inline-flex items-center rounded-md bg-amber px-7 py-3.5 text-base font-bold text-ink transition-colors hover:bg-cream"
              >
                {rec.kind === "course" ? "Start the module" : "Join the challenge"}
              </Link>
            </div>
          </section>
        );
      })()}

      {/* Additive: a path from the goals they saved on their profile — kept
          distinct from the quiz-topic recommendation above (it's from what
          they told us, not from this quiz). Only shows if they've saved a
          goal. */}
      {goalPath && (
        <section className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-forest/20 bg-forest/[0.05] p-5">
            <p className="text-base text-ink">
              <span className="font-semibold">From your profile:</span> you said
              you&apos;re working on {goalPath.label}.
            </p>
            <Link
              href={frameHref(goalPath.href, frame)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              Open that path
            </Link>
          </div>
        </section>
      )}

      {/* Closing line */}
      <p className="mt-10 text-center text-sm leading-6 text-stone/70">
        {CLOSING_LINE}
      </p>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={onRetake}
          className="btn-ink inline-flex items-center rounded-md bg-cream px-8 py-3 text-sm font-bold text-ink"
        >
          Retake the Quiz
        </button>
      </div>
    </div>
  );
}
