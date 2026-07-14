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
 * End-of-article knowledge check, deliberately small: one question at a
 * time with a "Question 1 of 3" counter and an Optional chip, so it reads
 * as a nudge rather than a test. Answers lock on selection with instant
 * feedback; the final score is saved locally (same no-login localStorage
 * layer as read tracking).
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
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<{ score: number; total: number } | null>(
    null
  );

  const answered = picked.filter((p) => p !== undefined).length;
  const score = picked.filter((p, i) => p === questions[i].answer).length;
  const done = answered === questions.length && current >= questions.length;

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

  const reset = () => {
    setPicked(new Array(questions.length).fill(undefined));
    setCurrent(0);
  };

  const q = questions[Math.min(current, questions.length - 1)];
  const chosen = picked[current];
  const isAnswered = chosen !== undefined;
  const isLast = current === questions.length - 1;

  return (
    <section
      aria-label="Quick check (optional)"
      className="mt-10 rounded-2xl border border-sand bg-cream p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <div className="flex items-center gap-2.5">
          <h2 className="font-display text-lg font-semibold text-ink">
            Quick check
          </h2>
          <span className="rounded-md border border-sand bg-paper px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-stone">
            Optional
          </span>
        </div>
        {!done && (
          <span className="text-sm font-medium tabular-nums text-stone">
            Question {Math.min(current + 1, questions.length)} of {questions.length}
          </span>
        )}
      </div>

      {done ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.95rem] font-semibold text-ink">
            {score} of {questions.length}.
            <span className="ml-2 font-normal text-stone">
              {score === questions.length
                ? "All of them. Nothing to reread."
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
      ) : (
        <>
          {current === 0 && !isAnswered && (
            <p className="mt-1 text-sm leading-6 text-stone">
              Feel like testing what stuck? Skip it freely; nothing is graded
              or sent anywhere.
              {previous && (
                <span className="ml-1">
                  Last time: {previous.score}/{previous.total}.
                </span>
              )}
            </p>
          )}

          <p className="mt-4 font-semibold leading-snug text-ink">
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
                      next[current] = oi;
                      return next;
                    })
                  }
                  className={`flex w-full items-start gap-3 rounded-lg border px-4 py-2.5 text-left text-sm leading-6 text-ink transition-colors disabled:cursor-default ${cls}`}
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
            <div className="mt-3">
              <p className="rounded-lg bg-paper-deep px-4 py-3 text-sm leading-6 text-stone">
                {chosen === q.answer ? "Right. " : "Not quite. "}
                {q.explain}
              </p>
              <button
                type="button"
                onClick={() => setCurrent((c) => c + 1)}
                className="mt-3 rounded-md px-5 py-2 text-sm font-bold text-cream transition-opacity hover:opacity-90"
                style={{ background: accent }}
              >
                {isLast ? "See my score" : "Next question"}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
