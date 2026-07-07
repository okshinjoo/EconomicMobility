import Link from "next/link";
import { getTopic, type TopicId } from "@/lib/topics";
import TopicMark from "@/components/TopicMark";
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
  selectedTopicIds: TopicId[];
  kcAnswers: KCAnswers;
  onRetake: () => void;
}

export default function QuizResults({
  answers,
  tier,
  isNotSure,
  skippedKc = false,
  selectedTopicIds,
  kcAnswers,
  onRetake,
}: QuizResultsProps) {
  const profile = getFinancialProfile(answers.q1, answers.q2, tier);

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
            {selectedTopicIds.map((topicId) => {
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
                </div>
              </li>
            );
          })}
        </ol>
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
              href={card.href}
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
