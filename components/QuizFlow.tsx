"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  Lock,
  Clock,
  X,
} from "lucide-react";
import { getTopic, topics, type TopicId } from "@/lib/topics";
import {
  quizQuestions,
  confidenceTier,
  knowledgeCheckBank,
  KC_QUESTIONS_PER_TOPIC,
  MAX_KC_TOPICS,
  GENERAL_KC_PICKS,
  TOPIC_NOT_SURE,
  type QuizAnswers,
  type KCAnswers,
  type QuizQuestion,
  type Tier,
} from "@/lib/quizData";
import QuizResults from "@/components/QuizResults";
import TopicMark from "@/components/TopicMark";
import { STORAGE_KEYS, loadJSON, saveJSON } from "@/lib/storage";

type StepId = "welcome" | "q1" | "q2" | "q3" | "q4" | "q5" | "kc" | "results";

interface QuizSnapshot {
  answers: QuizAnswers;
  kcAnswers: KCAnswers;
  skippedKc?: boolean;
  savedAt: number;
}

const QUESTION_STEPS: StepId[] = ["q1", "q2", "q3", "q4", "q5"];

interface KCQuestionInstance {
  topicId: TopicId;
  indexInTopic: number;
  question: string;
  options: string[];
  correctIndex: number;
}

// Gentle in-flow feedback for the knowledge check (owner directive: nudge,
// don't grade). Keyed by the question's index within its topic (0 or 1), so
// two questions in a row don't repeat the same line.
const KC_RIGHT = [
  "Nice, that's right.",
  "Exactly. You clearly know some of this already.",
];
const KC_WRONG = [
  "Not quite, and that's completely okay. The answer is",
  "No worries, this is exactly the kind of thing we're here for. The one to remember is",
];

const emptyAnswers: QuizAnswers = { q1: "", q2: "", q3: [], q4: [], q5: "" };

/** TopicId -> its roadmap article, server-derived (see app/quiz/page.tsx). */
export type RoadmapsByTopic = Partial<
  Record<string, { title: string; href: string }>
>;

export default function QuizFlow({
  roadmapsByTopic,
}: {
  roadmapsByTopic?: RoadmapsByTopic;
}) {
  const [step, setStep] = useState<StepId>("welcome");
  const [answers, setAnswers] = useState<QuizAnswers>(emptyAnswers);
  const [kcIndex, setKcIndex] = useState(0);
  const [kcAnswers, setKcAnswers] = useState<KCAnswers>({});
  const [skippedKc, setSkippedKc] = useState(false);
  const [savedResult, setSavedResult] = useState<QuizSnapshot | null>(null);

  // Load any previously saved result so we can offer "pick up where you left off".
  useEffect(() => {
    const saved = loadJSON<QuizSnapshot>(STORAGE_KEYS.quizResult);
    if (saved?.answers) setSavedResult(saved);
  }, []);

  // Persist the result whenever the user reaches (or returns to) the results screen.
  useEffect(() => {
    if (step !== "results") return;
    const snapshot: QuizSnapshot = {
      answers,
      kcAnswers,
      skippedKc,
      savedAt: Date.now(),
    };
    saveJSON(STORAGE_KEYS.quizResult, snapshot);
    setSavedResult(snapshot);
  }, [step, answers, kcAnswers, skippedKc]);

  const tier: Tier = confidenceTier[answers.q5] ?? "beginner";
  const isNotSure = answers.q3.includes(TOPIC_NOT_SURE);
  const selectedTopicIds = useMemo(
    () => answers.q3.filter((id) => id !== TOPIC_NOT_SURE) as TopicId[],
    [answers.q3]
  );

  // Only the first MAX_KC_TOPICS picks get quizzed — keeps the check at
  // four questions no matter how many topics were selected.
  const kcTopicIds = useMemo(
    () => selectedTopicIds.slice(0, MAX_KC_TOPICS),
    [selectedTopicIds]
  );

  const kcQuestions: KCQuestionInstance[] = useMemo(() => {
    // If the user chose specific topics, quiz them on those (even if they also
    // picked "I'm not sure").
    if (kcTopicIds.length > 0) {
      return kcTopicIds.flatMap((topicId) =>
        knowledgeCheckBank[topicId][tier]
          .slice(0, KC_QUESTIONS_PER_TOPIC)
          .map((q, i) => ({
            topicId,
            indexInTopic: i,
            question: q.question,
            options: q.options,
            correctIndex: q.correctIndex,
          }))
      );
    }
    // Pure "I'm not sure" (no topics) → a short, beginner general check.
    if (isNotSure) {
      return GENERAL_KC_PICKS.map(({ topicId, index }) => {
        const q = knowledgeCheckBank[topicId].beginner[index];
        return {
          topicId,
          indexInTopic: index,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
        };
      });
    }
    return [];
  }, [kcTopicIds, tier, isNotSure]);

  const isLastBeforeResults =
    (step === "q5" && kcQuestions.length === 0) ||
    (step === "kc" && kcIndex + 1 >= kcQuestions.length);

  const canProceed = (() => {
    switch (step) {
      case "q1":
        return answers.q1 !== "";
      case "q2":
        return answers.q2 !== "";
      case "q3":
        return answers.q3.length > 0;
      case "q4":
        return answers.q4.length > 0;
      case "q5":
        return answers.q5 !== "";
      case "kc": {
        const q = kcQuestions[kcIndex];
        return q ? kcAnswers[q.topicId]?.[q.indexInTopic] !== undefined : false;
      }
      default:
        return true;
    }
  })();

  function handleOptionClick(questionId: QuizQuestion["id"], optionId: string) {
    setAnswers((prev) => {
      switch (questionId) {
        case "q1":
          return { ...prev, q1: optionId };
        case "q2":
          return { ...prev, q2: optionId };
        case "q5":
          return { ...prev, q5: optionId };
        case "q3": {
          // "I'm not sure" is now combinable with specific topics — plain toggle.
          const next = prev.q3.includes(optionId)
            ? prev.q3.filter((id) => id !== optionId)
            : [...prev.q3, optionId];
          return { ...prev, q3: next };
        }
        case "q4": {
          const next = prev.q4.includes(optionId)
            ? prev.q4.filter((id) => id !== optionId)
            : [...prev.q4, optionId];
          return { ...prev, q4: next };
        }
        default:
          return prev;
      }
    });
  }

  function setKcAnswer(topicId: TopicId, indexInTopic: number, optionIndex: number) {
    setKcAnswers((prev) => {
      const existing = prev[topicId] ? [...prev[topicId]] : [];
      existing[indexInTopic] = optionIndex;
      return { ...prev, [topicId]: existing };
    });
  }

  function goNext() {
    const currentIndex = QUESTION_STEPS.indexOf(step as (typeof QUESTION_STEPS)[number]);
    if (currentIndex !== -1) {
      if (step === "q5") {
        if (kcQuestions.length > 0) {
          setKcIndex(0);
          setStep("kc");
        } else {
          setStep("results");
        }
        return;
      }
      setStep(QUESTION_STEPS[currentIndex + 1]);
      return;
    }
    if (step === "kc") {
      if (kcIndex + 1 < kcQuestions.length) {
        setKcIndex((i) => i + 1);
      } else {
        setStep("results");
      }
    }
  }

  function goBack() {
    if (step === "kc") {
      if (kcIndex > 0) {
        setKcIndex((i) => i - 1);
      } else {
        setStep("q5");
      }
      return;
    }
    const currentIndex = QUESTION_STEPS.indexOf(step as (typeof QUESTION_STEPS)[number]);
    if (currentIndex > 0) {
      setStep(QUESTION_STEPS[currentIndex - 1]);
    } else if (currentIndex === 0) {
      setStep("welcome");
    }
  }

  // Skip the current knowledge-check question (leaves it unanswered and moves on).
  function skipQuestion() {
    goNext();
  }

  // Skip the entire knowledge check — straight to results, no test scores shown.
  function skipKnowledgeCheck() {
    setSkippedKc(true);
    setStep("results");
  }

  function handleRetake() {
    setAnswers(emptyAnswers);
    setKcIndex(0);
    setKcAnswers({});
    setSkippedKc(false);
    setStep("welcome");
  }

  function handleResume(snapshot: QuizSnapshot) {
    setAnswers(snapshot.answers);
    setKcAnswers(snapshot.kcAnswers);
    setSkippedKc(snapshot.skippedKc ?? false);
    setStep("results");
  }

  function isOptionSelected(question: QuizQuestion, optionId: string): boolean {
    switch (question.id) {
      case "q1":
        return answers.q1 === optionId;
      case "q2":
        return answers.q2 === optionId;
      case "q5":
        return answers.q5 === optionId;
      case "q3":
        return answers.q3.includes(optionId);
      case "q4":
        return answers.q4.includes(optionId);
      default:
        return false;
    }
  }

  // Progress: Q1-5 are 5 of 6 segments, the knowledge check is the 6th
  // (sub-divided by however many KC questions there are). Results = 100%.
  const progress = (() => {
    const idx = QUESTION_STEPS.indexOf(step as (typeof QUESTION_STEPS)[number]);
    if (idx !== -1) return (idx / 6) * 100;
    if (step === "kc") {
      const frac = kcQuestions.length > 0 ? kcIndex / kcQuestions.length : 0;
      return ((5 + frac) / 6) * 100;
    }
    if (step === "results") return 100;
    return 0;
  })();

  const progressLabel =
    step === "kc"
      ? `Knowledge Check (optional): Question ${kcIndex + 1} of ${kcQuestions.length}`
      : QUESTION_STEPS.includes(step as (typeof QUESTION_STEPS)[number])
        ? `Question ${QUESTION_STEPS.indexOf(step as (typeof QUESTION_STEPS)[number]) + 1} of 5`
        : "";

  function renderQuestion() {
    if (step === "kc") {
      const q = kcQuestions[kcIndex];
      if (!q) return null;
      const topic = getTopic(q.topicId);
      const selected = kcAnswers[q.topicId]?.[q.indexInTopic];
      const answered = selected !== undefined;
      const gotIt = answered && selected === q.correctIndex;
      const nudge = answered
        ? gotIt
          ? KC_RIGHT[q.indexInTopic % KC_RIGHT.length]
          : KC_WRONG[q.indexInTopic % KC_WRONG.length]
        : null;
      return (
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-forest/10 py-1.5 pl-1.5 pr-4 text-xs font-semibold uppercase tracking-wide text-forest">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream">
              <TopicMark id={topic.id} className="h-4.5 w-4.5" />
            </span>
            {topic.title} · Quick Check
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
            {q.question}
          </h2>
          <div className="mt-6 space-y-3">
            {q.options.map((opt, i) => {
              // Once answered, options lock and reveal: the correct one turns
              // green, a wrong pick turns terracotta, the rest dim.
              const state = !answered
                ? undefined
                : i === q.correctIndex
                  ? "correct"
                  : i === selected
                    ? "wrong"
                    : "muted";
              return (
                <OptionButton
                  key={i}
                  label={opt}
                  index={i}
                  selected={selected === i}
                  answerState={state}
                  disabled={answered}
                  onClick={() => setKcAnswer(q.topicId, q.indexInTopic, i)}
                />
              );
            })}
          </div>
          {nudge && (
            <div
              className={`mt-4 flex items-start gap-3 rounded-2xl border-2 p-4 ${
                gotIt
                  ? "border-forest/30 bg-forest/[0.06]"
                  : "border-terracotta/30 bg-terracotta/[0.06]"
              }`}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-cream ${
                  gotIt ? "bg-forest" : "bg-terracotta"
                }`}
              >
                {gotIt ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                ) : (
                  <X className="h-3.5 w-3.5" strokeWidth={3} />
                )}
              </span>
              <p className="text-sm leading-6 text-ink/80">
                {nudge}
                {!gotIt && (
                  <>
                    {" "}
                    <span className="font-semibold text-ink">
                      {q.options[q.correctIndex]}
                    </span>
                    .
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      );
    }

    const question = quizQuestions.find((qq) => qq.id === step);
    if (!question) return null;

    return (
      <div>
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          {question.title}
        </h2>
        {question.helper && (
          <p className="mt-2 text-sm text-stone/60">{question.helper}</p>
        )}
        <div className="mt-6 space-y-3">
          {question.options.map((opt, i) => (
            <OptionButton
              key={opt.id}
              label={opt.label}
              index={i}
              selected={isOptionSelected(question, opt.id)}
              multi={question.multiSelect}
              onClick={() => handleOptionClick(question.id, opt.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        {step === "welcome" && (
          <WelcomeScreen
            onStart={() => setStep("q1")}
            savedResult={savedResult}
            onResume={() => savedResult && handleResume(savedResult)}
          />
        )}

        {step !== "welcome" && step !== "results" && (
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-sand bg-cream shadow-sm">
            {/* Progress header */}
            <div className="border-b border-sand bg-paper-deep px-6 py-5 sm:px-10">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-bold text-ink">{progressLabel}</p>
                <p className="text-sm font-bold text-ink">
                  {Math.round(progress)}%
                </p>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-sand">
                <div
                  className="h-full rounded-full bg-amber transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="px-6 py-8 sm:px-10 sm:py-10">
              {step === "kc" && (
                <div className="mb-6 flex flex-wrap items-center gap-2.5 rounded-lg border border-amber/40 bg-amber/10 px-4 py-2.5 text-sm">
                  <span className="rounded-full bg-amber px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink">
                    Optional
                  </span>
                  <span className="font-medium text-ink/80">
                    A quick gut-check to fine-tune your results; nothing is
                    graded, and you can skip it.
                  </span>
                </div>
              )}
              {renderQuestion()}

              <div className="mt-10 flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canProceed}
                className="btn-ink inline-flex items-center gap-2 rounded-md bg-amber px-8 py-3 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                {isLastBeforeResults ? "See My Results" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {step === "kc" && (
              <div className="mt-6 border-t border-sand pt-5 text-center">
                <p className="text-sm text-stone">
                  Not into being quizzed? This part is optional.
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-semibold">
                  <button
                    type="button"
                    onClick={skipQuestion}
                    className="text-stone underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    Skip this question
                  </button>
                  <span className="text-sand">·</span>
                  <button
                    type="button"
                    onClick={skipKnowledgeCheck}
                    className="rounded-md border-2 border-forest px-4 py-2 font-bold text-forest transition-colors hover:bg-forest hover:text-cream"
                  >
                    Skip to my results
                  </button>
                </div>
              </div>
              )}
            </div>
          </div>
        )}

        {step === "results" && (
          <div className="mx-auto max-w-3xl">
          <QuizResults
            roadmapsByTopic={roadmapsByTopic}
            answers={answers}
            tier={tier}
            isNotSure={isNotSure}
            skippedKc={skippedKc}
            quizzedTopicIds={kcTopicIds}
            selectedTopicIds={selectedTopicIds}
            kcAnswers={kcAnswers}
            onRetake={handleRetake}
          />
          </div>
        )}
      </div>
    </section>
  );
}

const welcomePromises = [
  { icon: Compass, label: "A personalized path" },
  { icon: Lock, label: "No sign-up, no email" },
  { icon: Clock, label: "About 2 minutes" },
];

// Short labels for the topic-icon panel (the full titles are too long here).
const TOPIC_SHORT: Record<TopicId, string> = {
  credit: "Credit",
  budgeting: "Budgeting",
  taxes: "Taxes",
  college: "College",
  investing: "Investing",
  "home-ownership": "Home",
  "government-aid": "Aid & relief",
  "money-safety": "Fraud & safety",
  insurance: "Insurance",
};

const welcomeOutcomes = [
  {
    title: "Your money profile",
    desc: "An honest read on where you stand right now.",
  },
  {
    title: "A clear first step",
    desc: "Exactly what to read or use first, without the overwhelm.",
  },
  {
    title: "Tailored resources",
    desc: "Guides, tools, and help matched to your life.",
  },
];

function WelcomeScreen({
  onStart,
  savedResult,
  onResume,
}: {
  onStart: () => void;
  savedResult: QuizSnapshot | null;
  onResume: () => void;
}) {
  return (
    <div>
      {savedResult && (
        <div className="card-ink mb-10 flex flex-col items-start gap-4 rounded-3xl bg-cream p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-ink">
              Welcome back
            </p>
            <p className="mt-1 text-sm text-stone">
              You have a saved result from{" "}
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(savedResult.savedAt))}
              .
            </p>
          </div>
          <button
            type="button"
            onClick={onResume}
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-md bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-ink-700"
          >
            View your results
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Hero: copy + topics panel */}
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            2-Minute Quiz
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Find your{" "}
            <span className="relative whitespace-nowrap text-forest">
              starting point.
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
          <p className="mt-5 max-w-xl text-lg leading-8 text-stone">
            Answer a few quick questions and we&apos;ll point you to the tools,
            guides, and resources most relevant to you. It's free, and there are
            no wrong answers.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="btn-ink mt-8 inline-flex items-center gap-2 rounded-md bg-amber px-8 py-4 text-base font-bold text-ink"
          >
            Start the Quiz
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {welcomePromises.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 text-sm font-medium text-stone"
              >
                <item.icon className="h-4 w-4 text-forest" strokeWidth={1.75} />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Topics panel — reuses the topic illustration icons */}
        <div className="rounded-3xl bg-forest p-7 text-cream shadow-[7px_7px_0_#e7a33c] sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
            What it covers
          </p>
          <p className="mt-2 font-display text-xl font-semibold leading-snug">
            All {topics.length} money topics, one quick quiz.
          </p>
          <div className="mt-7 grid grid-cols-3 gap-x-2 gap-y-6">
            {topics.map((t) => (
              <div
                key={t.id}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream shadow-sm">
                  <TopicMark id={t.id} className="h-8 w-8" />
                </span>
                <span className="text-[11px] font-medium leading-tight text-cream/85">
                  {TOPIC_SHORT[t.id]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What you'll walk away with */}
      <div className="mt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
          What you&apos;ll walk away with
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {welcomeOutcomes.map((c, i) => (
            <div
              key={c.title}
              className="card-ink rounded-2xl bg-cream p-6"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full font-display text-base font-semibold"
                style={{
                  background: `${["#c9842a", "#0c4a39", "#d26a4c"][i % 3]}1c`,
                  color: ["#c9842a", "#0c4a39", "#d26a4c"][i % 3],
                }}
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">
                {c.title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-stone">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OptionButton({
  label,
  selected,
  multi,
  index,
  onClick,
  /** Knowledge-check reveal: once answered, options lock and show a soft
   *  right/wrong state. Undefined for the Q1–Q5 preference questions. */
  answerState,
  disabled,
}: {
  label: string;
  selected: boolean;
  multi?: boolean;
  index?: number;
  onClick: () => void;
  answerState?: "correct" | "wrong" | "muted";
  disabled?: boolean;
}) {
  const letter =
    index !== undefined ? String.fromCharCode(65 + index) : undefined;

  // Locked reveal states take priority over the plain selected style.
  let shell: string;
  let badge: string;
  if (answerState === "correct") {
    shell = "border-2 border-forest bg-forest/[0.08] font-semibold text-ink";
    badge = "bg-forest text-cream";
  } else if (answerState === "wrong") {
    shell = "border-2 border-terracotta bg-terracotta/[0.07] text-ink";
    badge = "bg-terracotta text-cream";
  } else if (answerState === "muted") {
    shell = "border-2 border-sand bg-white text-ink/55";
    badge = "bg-ink/5 text-stone";
  } else if (selected) {
    shell = "card-ink bg-amber font-semibold text-ink";
    badge = "bg-ink text-cream";
  } else {
    shell =
      "border-2 border-sand bg-white text-ink hover:-translate-y-0.5 hover:border-ink/40 hover:shadow-md";
    badge = "bg-ink/5 text-stone group-hover:bg-amber/20 group-hover:text-amber-deep";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left text-base font-medium transition-all duration-150 disabled:cursor-default ${shell}`}
    >
      {letter && (
        <span
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors ${badge}`}
        >
          {letter}
        </span>
      )}
      <span className="flex-1">{label}</span>
      <span
        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 ${
          multi ? "rounded-md" : "rounded-full"
        } ${
          answerState === "correct"
            ? "border-forest bg-forest text-cream"
            : answerState === "wrong"
              ? "border-terracotta bg-terracotta text-cream"
              : answerState === "muted"
                ? "border-ink/15 bg-transparent"
                : selected
                  ? "border-ink bg-ink text-amber"
                  : "border-ink/20 bg-transparent"
        }`}
      >
        {answerState === "correct" && <Check className="h-4 w-4" strokeWidth={3} />}
        {answerState === "wrong" && <X className="h-4 w-4" strokeWidth={3} />}
        {!answerState && selected && <Check className="h-4 w-4" strokeWidth={3} />}
      </span>
    </button>
  );
}
