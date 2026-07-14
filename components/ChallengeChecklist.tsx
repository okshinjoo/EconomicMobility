"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Flag, MessageCircle } from "lucide-react";
import type { Challenge } from "@/lib/challenges";
import { BadgeMedal } from "@/components/CourseQuiz";
import { loadJSON, saveJSON } from "@/lib/storage";
import BadgeBurst from "@/components/BadgeBurst";

const PROGRESS_KEY = "empower:challenge-progress:v1";
const CHALLENGE_BADGES_KEY = "empower:challenge-badges:v1";

interface ChallengeProgress {
  joinedAt: number;
  /** stepId -> epoch ms checked off */
  done: Record<string, number>;
}
export type ChallengeProgressMap = Record<string, ChallengeProgress>;

export interface ChallengeBadge {
  earnedAt: number;
}
export type ChallengeBadgeMap = Record<string, ChallengeBadge>;

export function getChallengeProgress(): ChallengeProgressMap {
  return loadJSON<ChallengeProgressMap>(PROGRESS_KEY) ?? {};
}
export function getChallengeBadges(): ChallengeBadgeMap {
  return loadJSON<ChallengeBadgeMap>(CHALLENGE_BADGES_KEY) ?? {};
}

export default function ChallengeChecklist({
  challenge,
}: {
  challenge: Challenge;
}) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<ChallengeProgress | null>(null);
  const [badge, setBadge] = useState<ChallengeBadge | null>(null);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    setProgress(getChallengeProgress()[challenge.id] ?? null);
    setBadge(getChallengeBadges()[challenge.id] ?? null);
    setMounted(true);
  }, [challenge.id]);

  const persist = (next: ChallengeProgress) => {
    const map = getChallengeProgress();
    map[challenge.id] = next;
    saveJSON(PROGRESS_KEY, map);
    setProgress(next);
    // Award the badge the moment the last step is checked.
    if (
      challenge.steps.every((s) => next.done[s.id]) &&
      !getChallengeBadges()[challenge.id]
    ) {
      const badges = getChallengeBadges();
      const earned = { earnedAt: Date.now() };
      badges[challenge.id] = earned;
      saveJSON(CHALLENGE_BADGES_KEY, badges);
      setBadge(earned);
      setCelebrate(true);
    }
  };

  const join = () => persist({ joinedAt: Date.now(), done: {} });

  const toggle = (stepId: string) => {
    // Read the latest from storage (not React state) so rapid toggles can't
    // clobber each other.
    const current = getChallengeProgress()[challenge.id];
    if (!current) return;
    const done = { ...current.done };
    if (done[stepId]) delete done[stepId];
    else done[stepId] = Date.now();
    persist({ ...current, done });
  };

  if (!mounted) return null;

  const accent = challenge.color;
  const doneCount = progress
    ? challenge.steps.filter((s) => progress.done[s.id]).length
    : 0;
  const total = challenge.steps.length;
  const complete = doneCount === total && total > 0;

  return (
    <div>
      {/* Join / progress header */}
      {!progress ? (
        <div className="card-ink rounded-2xl bg-cream p-6 sm:p-8">
          <p className="font-display text-xl font-semibold text-ink">
            Ready? It&apos;s {total} steps, at your own pace.
          </p>
          <p className="mt-2 text-sm leading-6 text-stone">
            Joining just starts your checklist on this device: no account, no
            email. Share how it goes in the challenge thread.
          </p>
          <button
            type="button"
            onClick={join}
            className="btn-ink mt-5 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-cream"
            style={{ background: accent }}
          >
            <Flag className="h-4 w-4" />
            Join the challenge
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-sand bg-cream p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-semibold text-ink">
              {complete
                ? "Challenge complete."
                : `${doneCount} of ${total} steps done`}
            </p>
            <span className="text-xs font-medium text-stone">
              Joined {new Date(progress.joinedAt).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
            </span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-sand">
            <div
              className="h-full rounded-full transition-[width] duration-300"
              style={{ width: `${(doneCount / total) * 100}%`, background: accent }}
            />
          </div>
        </div>
      )}

      {/* Steps */}
      <ol className="mt-6 space-y-4">
        {challenge.steps.map((step, i) => {
          const checked = Boolean(progress?.done[step.id]);
          return (
            <li
              key={step.id}
              className={`rounded-2xl bg-cream p-5 transition-all ${
                checked ? "card-ink" : "border-2 border-ink shadow-[3px_3px_0_#11211c]"
              }`}
              style={checked ? { background: `${accent}0d` } : undefined}
            >
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  disabled={!progress}
                  onClick={() => toggle(step.id)}
                  aria-pressed={checked}
                  aria-label={checked ? `Uncheck: ${step.title}` : `Check off: ${step.title}`}
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                    checked ? "text-cream" : "bg-paper"
                  }`}
                  style={{
                    borderColor: accent,
                    background: checked ? accent : undefined,
                  }}
                >
                  {checked && <Check className="h-4 w-4" strokeWidth={3} />}
                </button>
                <div className="min-w-0">
                  <p className={`font-semibold leading-snug text-ink ${checked ? "line-through decoration-2 opacity-70" : ""}`}>
                    <span className="mr-2 font-display tabular-nums" style={{ color: accent }}>
                      {i + 1}.
                    </span>
                    {step.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-stone">
                    {step.detail}
                  </p>
                  {step.link && (
                    <p className="mt-2">
                      <Link
                        href={step.link.href}
                        className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                      >
                        {step.link.label}
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Completion */}
      {complete && (
        <div className="card-ink-lg mt-8 flex flex-wrap items-center gap-5 rounded-2xl bg-cream p-6 sm:p-8">
          <BadgeBurst fire={celebrate}>
            <BadgeMedal color={accent} />
          </BadgeBurst>
          <div className="min-w-0 flex-1">
            <p className="font-display text-xl font-semibold text-ink">
              You finished {challenge.title}.
            </p>
            <p className="mt-1 text-sm leading-6 text-stone">
              Badge earned{badge ? "" : " (already on your shelf)"}. It lives
              on the Challenges page and the homepage. Tell the thread how it
              went; your version helps the next person.
            </p>
            <Link
              href={`/community/post/${challenge.communityPostId}`}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              <MessageCircle className="h-4 w-4" />
              Open the challenge thread
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
