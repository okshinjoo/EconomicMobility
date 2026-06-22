import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTopic, type TopicId } from "@/lib/topics";
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
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
          Your Results
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Here&apos;s Where to Start
        </h1>
      </div>

      {/* Part 1: Financial Profile */}
      <section className="mt-10 rounded-2xl bg-forest p-8 text-cream">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
          Your Financial Profile
        </h2>
        <p className="mt-3 text-lg leading-7">{profile}</p>
      </section>

      {/* Part 2: Knowledge Check Feedback (or "not sure" / "skipped" framing) */}
      <section className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
          {skippedKc
            ? "Based on What You Told Us"
            : pureNotSure
              ? "Let's Figure It Out Together"
              : "Your Knowledge Check"}
        </h2>

        {skippedKc ? (
          <p className="mt-4 text-base leading-7 text-stone/80">
            You skipped the knowledge check — no problem at all. We&apos;ve built
            your recommendations below from your goals and how confident you said
            you feel. If you ever want a quick gut-check, you can retake the quiz
            and answer those questions anytime.
          </p>
        ) : pureNotSure && general ? (
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-ink/10 bg-white p-5">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-ink">Quick knowledge check</h3>
                <span className="ml-auto flex-shrink-0 text-sm font-medium text-stone/50">
                  {general.correct}/{general.total}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-stone/70">
                {getGeneralCheckFeedback(general.correct, general.total)}
              </p>
            </div>
            <p className="text-base leading-7 text-stone/80">
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
                  className="rounded-2xl border border-ink/10 bg-white p-5"
                >
                  <div className="flex items-center gap-2">
                    <topic.icon
                      className="h-5 w-5 text-amber"
                      strokeWidth={1.5}
                    />
                    <h3 className="font-semibold text-ink">{topic.title}</h3>
                    <span className="ml-auto flex-shrink-0 text-sm font-medium text-stone/50">
                      {score}/{KC_QUESTIONS_PER_TOPIC}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-stone/70">
                    {feedback}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Part 3: Where to Start */}
      <section className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
          Where to Start
        </h2>
        <p className="mt-4 text-base leading-7 text-stone/70">
          Based on your answers, here&apos;s the order we&apos;d suggest
          tackling your topics:
        </p>
        <ol className="mt-4 space-y-4">
          {whereToStart.map((step, i) => {
            const topic = getTopic(step.topicId);
            return (
              <li
                key={step.topicId}
                className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-5"
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber/15 text-sm font-bold text-ink">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber">
                    {step.label}: {topic.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-stone/70">
                    {step.why}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Part 4: Resource Cards */}
      <section className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
          Your Resources
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {allCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-5 transition-colors hover:border-amber/50 hover:bg-amber/5"
            >
              <h3 className="font-semibold text-ink">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone/70">
                {card.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-amber">
                Explore
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Closing line */}
      <p className="mt-10 text-center text-sm leading-6 text-stone/60">
        {CLOSING_LINE}
      </p>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-8 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
        >
          Retake the Quiz
        </button>
      </div>
    </div>
  );
}
