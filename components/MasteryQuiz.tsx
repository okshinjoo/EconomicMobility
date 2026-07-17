"use client";

// The mastery test-out dialog (July 16, 2026 — see lib/skillMastery.ts).
// Launched from skill-tree tier pills / branch cards. Intro offers the
// honest alternative (keep reading) and, from a tier, the whole-topic
// version; questions lock on answer with instant feedback; mastery is
// granted ONLY on a passing score. Failing stores nothing and retakes are
// unlimited — the quiz is the gate, not a punishment.

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, X } from "@phosphor-icons/react/dist/ssr";
import type { MasteryQuestion } from "@/lib/skillMastery";

export default function MasteryQuiz({
  title,
  questions,
  need,
  continueHref,
  continueLabel,
  alt,
  onPass,
  onClose,
}: {
  /** e.g. "Credit · Start here" or "All of Credit" */
  title: string;
  questions: MasteryQuestion[];
  /** Correct answers required to pass (ceil of 80%). */
  need: number;
  /** The honest alternative: the next unread guide. */
  continueHref?: string;
  continueLabel?: string;
  /** Optional scope switch, e.g. "Test out of the whole topic instead". */
  alt?: { label: string; onClick: () => void };
  onPass: (score: number) => void;
  onClose: () => void;
}) {
  const [stage, setStage] = useState<"intro" | "quiz" | "done">("intro");
  const [idx, setIdx] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const q = questions[idx];
  const last = idx === questions.length - 1;

  const choose = (i: number) => {
    if (pick !== null) return;
    setPick(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const advance = () => {
    if (pick === null) return;
    if (!last) {
      setIdx(idx + 1);
      setPick(null);
      return;
    }
    const ok = score >= need;
    setPassed(ok);
    if (ok) onPass(score);
    setStage("done");
  };

  const retake = () => {
    setIdx(0);
    setPick(null);
    setScore(0);
    setPassed(false);
    setStage("quiz");
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Mastery test: ${title}`}
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-ink bg-cream p-6 shadow-[6px_6px_0_#11211c]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
              Test out
            </span>
            <h2 className="mt-1 font-display text-xl font-bold leading-snug text-ink">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-stone hover:bg-ink/5 hover:text-ink"
          >
            <X className="h-5 w-5" weight="bold" />
          </button>
        </div>

        {stage === "intro" && (
          <div className="mt-4">
            <p className="text-sm leading-6 text-stone">
              Already know this material? Prove it: {questions.length}{" "}
              questions pulled from these guides and checkpoints. Get{" "}
              <span className="font-bold text-ink">
                {need} of {questions.length}
              </span>{" "}
              right and this part of the tree is marked{" "}
              <span className="font-bold text-ink">mastered</span> — no
              reading required. Nothing is ever locked either way, and you
              can retake it as many times as you like.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setStage("quiz")}
                className="btn-ink rounded-md bg-amber px-4 py-2 text-sm font-bold text-ink"
              >
                Start the quiz
              </button>
              {continueHref && (
                <Link
                  href={continueHref}
                  className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  {continueLabel ?? "Keep reading instead"}
                </Link>
              )}
            </div>
            {alt && (
              <button
                type="button"
                onClick={alt.onClick}
                className="mt-3 text-[13px] font-semibold text-stone underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
              >
                {alt.label}
              </button>
            )}
          </div>
        )}

        {stage === "quiz" && (
          <div className="mt-4">
            <p className="text-[12px] font-bold uppercase tracking-wide text-stone">
              Question {idx + 1} of {questions.length}
            </p>
            <p className="mt-2 text-base font-semibold leading-7 text-ink">
              {q.q}
            </p>
            <div className="mt-3 space-y-2">
              {q.options.map((opt, i) => {
                const locked = pick !== null;
                const isPick = pick === i;
                const isRight = i === q.answer;
                let cls =
                  "w-full rounded-lg border-2 px-3.5 py-2.5 text-left text-sm font-medium transition-colors ";
                if (!locked)
                  cls +=
                    "border-ink/15 bg-paper text-ink hover:border-ink/50";
                else if (isRight)
                  cls += "border-forest bg-forest/10 text-forest";
                else if (isPick)
                  cls += "border-terracotta bg-terracotta/10 text-terracotta";
                else cls += "border-ink/10 bg-paper text-stone";
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={pick !== null}
                    onClick={() => choose(i)}
                    className={cls}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {pick !== null && (
              <div className="mt-3">
                {q.explain && (
                  <p className="rounded-lg bg-ink/[0.05] px-3.5 py-2.5 text-sm leading-6 text-stone">
                    {q.explain}
                  </p>
                )}
                <button
                  type="button"
                  onClick={advance}
                  className="btn-ink mt-3 rounded-md bg-amber px-4 py-2 text-sm font-bold text-ink"
                >
                  {last ? "See my result" : "Next question"}
                </button>
              </div>
            )}
          </div>
        )}

        {stage === "done" && (
          <div className="mt-4">
            {passed ? (
              <>
                <p className="inline-flex items-center gap-2 font-display text-2xl font-bold text-forest">
                  <Star
                    className="h-6 w-6 text-amber" weight="bold"
                    fill="currentColor"
                  />
                  Mastered — {score}/{questions.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-stone">
                  This section is marked on your tree and added to your
                  skill points. The guides are still there whenever you want
                  the details.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-ink mt-4 rounded-md bg-amber px-4 py-2 text-sm font-bold text-ink"
                >
                  Back to the tree
                </button>
              </>
            ) : (
              <>
                <p className="font-display text-2xl font-bold text-ink">
                  Not this time — {score}/{questions.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-stone">
                  You needed {need}. No points lost, nothing locked — the
                  guides in this section teach exactly what these questions
                  asked, and you can retake the test whenever.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={retake}
                    className="btn-ink rounded-md bg-amber px-4 py-2 text-sm font-bold text-ink"
                  >
                    Retake it
                  </button>
                  {continueHref && (
                    <Link
                      href={continueHref}
                      className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                    >
                      {continueLabel ?? "Read the guides"}
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
