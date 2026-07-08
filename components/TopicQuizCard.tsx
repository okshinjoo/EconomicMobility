"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ListChecks } from "lucide-react";
import { loadJSON } from "@/lib/storage";

const QUIZ_SCORES_KEY = "empower:article-quizzes:v1";
type QuizScoreMap = Record<string, { score: number; total: number; at: number }>;

/**
 * The end-of-article suggestion for a topic's mini quiz. Sits just above the
 * tool/roadmap suggestions. Shows the visitor's best run once they've taken
 * it (renders that chip only after mount, so no hydration mismatch).
 */
export default function TopicQuizCard({
  topicId,
  topicShort,
  accent,
}: {
  topicId: string;
  topicShort: string;
  accent: string;
}) {
  const [best, setBest] = useState<{ score: number; total: number } | null>(null);

  useEffect(() => {
    const saved = loadJSON<QuizScoreMap>(QUIZ_SCORES_KEY);
    if (saved?.[`topic-quiz:${topicId}`]) setBest(saved[`topic-quiz:${topicId}`]);
  }, [topicId]);

  return (
    <Link
      href={`/learn/${topicId}/quiz`}
      className="group flex items-center gap-4 rounded-2xl border-2 border-ink p-6 shadow-[4px_4px_0_#11211c] transition-transform duration-150 hover:-translate-y-0.5"
      style={{ background: `${accent}14` }}
    >
      <span
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-cream"
        style={{ color: accent }}
      >
        <ListChecks className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone">
          {best ? `Your best: ${best.score}/${best.total} · take it again` : "Test yourself"}
        </p>
        <h3 className="mt-0.5 font-display text-lg font-semibold text-ink">
          The {topicShort.toLowerCase()} mini quiz
        </h3>
      </div>
      <ArrowRight className="h-5 w-5 text-stone transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
