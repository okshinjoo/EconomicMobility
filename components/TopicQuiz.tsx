"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { loadJSON, saveJSON } from "@/lib/storage";

const QUIZ_SCORES_KEY = "empower:article-quizzes:v1";

type QuizScoreMap = Record<string, { score: number; total: number; at: number }>;

export interface TopicQuizItem {
  question: string;
  options: string[];
  answer: number;
  explain: string;
  /** Resolved server-side from the question's sourceSlug. */
  reviewHref: string;
  reviewTitle: string;
}

/**
 * The topic mini quiz: same lock-on-click instant-feedback UX as the
 * article-level ArticleQuiz, plus a "Review: <guide>" link whenever an
 * answer is wrong. Scores share the article-quiz storage map under a
 * `topic-quiz:` key, so nothing new to back up.
 */
export default function TopicQuiz({
  topicId,
  questions,
  accent,
}: {
  topicId: string;
  questions: TopicQuizItem[];
  accent: string;
}) {
  const storageSlug = `topic-quiz:${topicId}`;
  const [picked, setPicked] = useState<(number | undefined)[]>(() =>
    new Array(questions.length).fill(undefined)
  );
  const [previous, setPrevious] = useState<{ score: number; total: number } | null>(
    null
  );

  const answered = picked.filter((p) => p !== undefined).length;
  const score = picked.filter((p, i) => p === questions[i].answer).length;
  const done = answered === questions.length;

  useEffect(() => {
    const saved = loadJSON<QuizScoreMap>(QUIZ_SCORES_KEY);
    if (saved?.[storageSlug]) setPrevious(saved[storageSlug]);
  }, [storageSlug]);

  useEffect(() => {
    if (!done) return;
    const map = loadJSON<QuizScoreMap>(QUIZ_SCORES_KEY) ?? {};
    map[storageSlug] = { score, total: questions.length, at: Date.now() };
    saveJSON(QUIZ_SCORES_KEY, map);
  }, [done, score, storageSlug, questions.length]);

  const reset = () => setPicked(new Array(questions.length).fill(undefined));

  return (
    <div className="rounded-2xl border-2 border-ink bg-cream p-6 shadow-[5px_5px_0_#11211c] sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-medium text-stone">
          {questions.length} questions, drawn from across the guides. Nothing
          is graded or sent anywhere.
        </p>
        {previous && !done && (
          <span className="text-sm font-medium text-stone">
            Last time: {previous.score}/{previous.total}
          </span>
        )}
      </div>

      <ol className="mt-6 space-y-8">
        {questions.map((q, qi) => {
          const chosen = picked[qi];
          const isAnswered = chosen !== undefined;
          const wrong = isAnswered && chosen !== q.answer;
          return (
            <li key={qi}>
              <p className="font-semibold leading-snug text-ink">
                <span
                  className="mr-2 font-display tabular-nums"
                  style={{ color: accent }}
                >
                  {qi + 1}.
                </span>
                {q.question}
              </p>
              <div className="mt-3 space-y-2">
                {q.options.map((opt, oi) => {
                  const isCorrect = oi === q.answer;
                  const isChosen = chosen === oi;
                  let cls = "border-sand bg-paper hover:border-ink/30";
                  if (isAnswered) {
                    if (isCorrect) cls = "border-forest bg-forest/[0.08]";
                    else if (isChosen)
                      cls = "border-terracotta bg-terracotta/[0.08]";
                    else cls = "border-sand bg-paper opacity-60";
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={isAnswered}
                      onClick={() =>
                        setPicked((prev) => {
                          const next = [...prev];
                          next[qi] = oi;
                          return next;
                        })
                      }
                      className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-[0.95rem] leading-6 text-ink transition-colors disabled:cursor-default ${cls}`}
                    >
                      {isAnswered && isCorrect && (
                        <Check
                          className="mt-1 h-4 w-4 shrink-0 text-forest"
                          strokeWidth={3}
                        />
                      )}
                      {isAnswered && isChosen && !isCorrect && (
                        <X
                          className="mt-1 h-4 w-4 shrink-0 text-terracotta"
                          strokeWidth={3}
                        />
                      )}
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {isAnswered && (
                <p className="mt-3 rounded-lg bg-paper-deep px-4 py-3 text-sm leading-6 text-stone">
                  {wrong ? "Not quite. " : "Right. "}
                  {q.explain}
                  {wrong && (
                    <>
                      {" "}
                      <Link
                        href={q.reviewHref}
                        className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                      >
                        Review: {q.reviewTitle}
                      </Link>
                    </>
                  )}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {done && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-sand pt-5">
          <p className="font-semibold text-ink">
            You got {score} of {questions.length}.
            <span className="ml-2 font-normal text-stone">
              {score === questions.length
                ? "All of it. You could write these guides."
                : score >= questions.length - 1
                  ? "Nearly perfect. The review link above closes the gap."
                  : "The review links above go straight to what you missed."}
            </span>
          </p>
          <button
            type="button"
            onClick={reset}
            className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
