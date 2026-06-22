"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  Lock,
  Clock,
} from "lucide-react";
import { getTopic, topics, type TopicId } from "@/lib/topics";
import {
  quizQuestions,
  confidenceTier,
  knowledgeCheckBank,
  KC_QUESTIONS_PER_TOPIC,
  GENERAL_KC_PICKS,
  TOPIC_NOT_SURE,
  type QuizAnswers,
  type KCAnswers,
  type QuizQuestion,
  type Tier,
} from "@/lib/quizData";
import QuizResults from "@/components/QuizResults";
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
}

const emptyAnswers: QuizAnswers = { q1: "", q2: "", q3: [], q4: [], q5: "" };

export default function QuizFlow() {
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

  const kcQuestions: KCQuestionInstance[] = useMemo(() => {
    // If the user chose specific topics, quiz them on those (even if they also
    // picked "I'm not sure").
    if (selectedTopicIds.length > 0) {
      return selectedTopicIds.flatMap((topicId) =>
        knowledgeCheckBank[topicId][tier]
          .slice(0, KC_QUESTIONS_PER_TOPIC)
          .map((q, i) => ({
            topicId,
            indexInTopic: i,
            question: q.question,
            options: q.options,
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
        };
      });
    }
    return [];
  }, [selectedTopicIds, tier, isNotSure]);

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
      ? `Knowledge Check — Question ${kcIndex + 1} of ${kcQuestions.length}`
      : QUESTION_STEPS.includes(step as (typeof QUESTION_STEPS)[number])
        ? `Question ${QUESTION_STEPS.indexOf(step as (typeof QUESTION_STEPS)[number]) + 1} of 5`
        : "";

  function renderQuestion() {
    if (step === "kc") {
      const q = kcQuestions[kcIndex];
      if (!q) return null;
      const topic = getTopic(q.topicId);
      const selected = kcAnswers[q.topicId]?.[q.indexInTopic];
      return (
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-forest/10 py-1.5 pl-1.5 pr-4 text-xs font-semibold uppercase tracking-wide text-forest">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream">
              <Image
                src={`/images/illustrations/${topic.id}.png`}
                alt=""
                unoptimized
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
            </span>
            {topic.title} — Quick Check
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
            {q.question}
          </h2>
          <div className="mt-6 space-y-3">
            {q.options.map((opt, i) => (
              <OptionButton
                key={i}
                label={opt}
                index={i}
                selected={selected === i}
                onClick={() => setKcAnswer(q.topicId, q.indexInTopic, i)}
              />
            ))}
          </div>
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
                <p className="text-sm font-semibold text-ink">{progressLabel}</p>
                <p className="text-xs font-semibold text-stone">
                  {Math.round(progress)}%
                </p>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-amber transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="px-6 py-8 sm:px-10 sm:py-10">
              {renderQuestion()}

              <div className="mt-10 flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canProceed}
                className="inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3 text-sm font-semibold text-ink transition-colors enabled:hover:bg-ink enabled:hover:text-cream disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isLastBeforeResults ? "See My Results" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {step === "kc" && (
              <div className="mt-6 border-t border-sand pt-5 text-center">
                <p className="text-sm text-stone">
                  Not into being quizzed? That&apos;s okay — it&apos;s optional.
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
                    className="text-forest underline-offset-4 transition-colors hover:text-ink hover:underline"
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
            answers={answers}
            tier={tier}
            isNotSure={isNotSure}
            skippedKc={skippedKc}
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
    desc: "Exactly what to read or use first — no overwhelm.",
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
        <div className="mb-10 flex flex-col items-start gap-4 rounded-3xl border border-sand bg-cream p-6 sm:flex-row sm:items-center sm:justify-between">
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
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-ink-700"
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
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Find your starting point.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-stone">
            Answer a few quick questions and we&apos;ll point you to the tools,
            guides, and resources most relevant to you — no jargon, no pressure,
            completely free.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber px-8 py-4 text-base font-semibold text-ink shadow-sm transition-colors hover:bg-amber-deep hover:text-cream"
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
        <div className="rounded-3xl bg-forest p-7 text-cream shadow-lg sm:p-9">
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
                  <Image
                    src={`/images/illustrations/${t.id}.png`}
                    alt=""
                    unoptimized
                    width={44}
                    height={44}
                    className="h-9 w-9 object-contain"
                  />
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
              className="rounded-2xl border border-sand bg-cream p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber/15 font-display text-base font-semibold text-amber-deep">
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
}: {
  label: string;
  selected: boolean;
  multi?: boolean;
  index?: number;
  onClick: () => void;
}) {
  const letter =
    index !== undefined ? String.fromCharCode(65 + index) : undefined;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left text-base font-medium transition-all duration-150 ${
        selected
          ? "border-amber bg-amber/10 text-ink shadow-sm"
          : "border-ink/10 bg-white text-ink hover:-translate-y-0.5 hover:border-amber/60 hover:shadow-md"
      }`}
    >
      {letter && (
        <span
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
            selected
              ? "bg-amber text-ink"
              : "bg-ink/5 text-stone group-hover:bg-amber/20 group-hover:text-amber-deep"
          }`}
        >
          {letter}
        </span>
      )}
      <span className="flex-1">{label}</span>
      <span
        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 ${
          multi ? "rounded-md" : "rounded-full"
        } ${
          selected
            ? "border-amber bg-amber text-ink"
            : "border-ink/20 bg-transparent"
        }`}
      >
        {selected && <Check className="h-4 w-4" strokeWidth={3} />}
      </span>
    </button>
  );
}
