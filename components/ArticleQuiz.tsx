"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import type { ArticleQuizQuestion } from "@/lib/articles/types";
import { loadJSON, saveJSON } from "@/lib/storage";

const QUIZ_SCORES_KEY = "empower:article-quizzes:v1";

/** slug -> { score, total, at } for finished checks. */
type QuizScoreMap = Record<
  string,
  { score: number; total: number; at: number }
>;

/**
 * End-of-article knowledge check: a short multiple-choice quiz rendered after
 * the article body on articles that define `quiz`. Answers lock on selection
 * with instant right/wrong feedback and an explanation; the final score is
 * saved locally (same no-login localStorage layer as read tracking).
 */
export default function ArticleQuiz({
  slug,
  questions,
  accent,
}: {
  slug: string;
  questions: ArticleQuizQuestion[];
  accent: string;
}) {
  // picked[i] = option index chosen for question i (undefined = unanswered)
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
    if (saved?.[slug]) setPrevious(saved[slug]);
  }, [slug]);

  useEffect(() => {
    if (!done) return;
    const map = loadJSON<QuizScoreMap>(QUIZ_SCORES_KEY) ?? {};
    map[slug] = { score, total: questions.length, at: Date.now() };
    saveJSON(QUIZ_SCORES_KEY, map);
  }, [done, score, slug, questions.length]);

  const reset = () =>
    setPicked(new Array(questions.length).fill(undefined));

  return (
    <section
      aria-label="Check your understanding"
      className="mt-12 rounded-2xl border border-sand bg-cream p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
          Check your understanding
        </h2>
        {previous && !done && (
          <span className="text-sm font-medium text-stone">
            Last time: {previous.score}/{previous.total}
          </span>
        )}
      </div>
      <p className="mt-1.5 text-sm leading-6 text-stone">
        {questions.length} quick questions on what you just read. Nothing is
        graded or sent anywhere.
      </p>

      <ol className="mt-6 space-y-8">
        {questions.map((q, qi) => {
          const chosen = picked[qi];
          const isAnswered = chosen !== undefined;
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
                  let cls =
                    "border-sand bg-paper hover:border-ink/30";
                  if (isAnswered) {
                    if (isCorrect) {
                      cls = "border-forest bg-forest/[0.08]";
                    } else if (isChosen) {
                      cls = "border-terracotta bg-terracotta/[0.08]";
                    } else {
                      cls = "border-sand bg-paper opacity-60";
                    }
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
                  {chosen === q.answer ? "Right. " : "Not quite. "}
                  {q.explain}
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
                ? "Solid — you've got this concept."
                : "Worth a skim back through the parts you missed."}
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
    </section>
  );
}
