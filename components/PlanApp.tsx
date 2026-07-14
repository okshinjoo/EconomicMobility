"use client";

// The plan builder's front door (session 1 of plan-builder-spec.md): the
// five-question intake, then the saved plan as a living checklist. Guide/
// tool/course/challenge items check themselves off from the same trackers
// journeys use; deadline and habit items are manual checkboxes stored in
// the plan itself. The dashboard polish (Now/Next grouping, projections)
// is session 2 — this ships the loop end to end.

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Compass, Flag, List, Map as MapIcon, RotateCcw } from "lucide-react";
import { GOAL_OPTIONS, readLocalProfile } from "@/lib/profile";
import {
  loadPlan,
  savePlan,
  clearPlan,
  toggleItem,
  type IntakeAnswers,
  type MyPlan,
  type PlanItem,
  type PlanStage,
} from "@/lib/plan";
import { getReadMap } from "@/lib/readTracking";
import { readBudgetSummary } from "@/lib/calcImports";
import { getBadges } from "@/components/CourseQuiz";
import { STORAGE_KEYS, loadJSON, saveJSON } from "@/lib/storage";
import { frameHref, type Frame } from "@/lib/frame";
import { readAboutYou } from "@/lib/aboutYou";
import { readStudentStage } from "@/lib/studentStage";
import { useFrame } from "@/components/useFrame";
import SaveToProfile from "@/components/SaveToProfile";

const CHALLENGE_BADGES_KEY = "empower:challenge-badges:v1";
const QUIZ_SCORES_KEY = "empower:article-quizzes:v1";
/** Path-vs-list preference for the plan view (session 6). */
const PLAN_VIEW_KEY = "empower:plan-view:v1";

/** Done-awareness (July 13 addendum): what this device has already read,
 *  used, and earned — sent with every plan request so the AI never assigns
 *  a step the person already finished. Client-only (call post-mount). */
function gatherDone() {
  const cap = (o: Record<string, unknown>) => Object.keys(o).slice(0, 100);
  return {
    reads: cap(getReadMap()),
    tools: cap(loadJSON<Record<string, number>>(STORAGE_KEYS.visitedTools) ?? {}),
    courses: cap(getBadges()),
  };
}

const STAGE_OPTIONS: Array<[IntakeAnswers["stage"], string]> = [
  ["high-school", "In high school"],
  ["community-college", "At a community college"],
  ["four-year", "At a four-year school"],
  ["transferring", "Transferring soon"],
  ["working", "Working"],
  ["between", "Between things"],
];

const INCOME_OPTIONS: Array<[IntakeAnswers["income"], string]> = [
  ["steady", "Steady paycheck"],
  ["irregular", "Money comes in unevenly"],
  ["none", "No income yet"],
  ["supported", "Family covers most things"],
];

const FAMILY_OPTIONS: Array<[IntakeAnswers["family"], string]> = [
  ["on-my-own", "I'm on my own financially"],
  ["family-helps", "Family helps me out"],
  ["i-help-family", "I help support my family"],
];

function useDoneChecker(): (item: PlanItem) => boolean {
  const [state, setState] = useState<{
    read: Record<string, number>;
    tools: Record<string, number>;
    courseBadges: Record<string, unknown>;
    challengeBadges: Record<string, unknown>;
    quizScores: Record<string, unknown>;
  } | null>(null);

  useEffect(() => {
    setState({
      read: getReadMap(),
      tools: loadJSON<Record<string, number>>(STORAGE_KEYS.visitedTools) ?? {},
      courseBadges: getBadges(),
      challengeBadges:
        loadJSON<Record<string, unknown>>(CHALLENGE_BADGES_KEY) ?? {},
      quizScores: loadJSON<Record<string, unknown>>(QUIZ_SCORES_KEY) ?? {},
    });
  }, []);

  return useMemo(() => {
    if (!state) return () => false;
    return (item: PlanItem) => {
      if (item.checked) return true;
      if (!item.doneKey) return false;
      switch (item.kind) {
        case "guide":
          return Boolean(state.read[item.doneKey]);
        case "tool":
          return Boolean(state.tools[item.doneKey]);
        case "course":
          return Boolean(state.courseBadges[item.doneKey]);
        case "challenge":
          return Boolean(state.challengeBadges[item.doneKey]);
        default:
          return false;
      }
    };
  }, [state]);
}

export default function PlanApp() {
  const [plan, setPlan] = useState<MyPlan | null>(null);
  const [mounted, setMounted] = useState(false);
  const [building, setBuilding] = useState(false);
  const [lastIntake, setLastIntake] = useState<IntakeAnswers | null>(null);
  // Conversational intake (owner ask, July 2026): chat first, classic form
  // as the fallback and the re-plan path. After a build, review mode asks
  // "does this look right?" and flagged items + feedback drive a revision.
  const [mode, setMode] = useState<"chat" | "form">("chat");
  const [confirmedSummary, setConfirmedSummary] = useState("");
  const [reviewing, setReviewing] = useState(false);
  const [flagged, setFlagged] = useState<Set<string>>(new Set());

  useEffect(() => {
    setPlan(loadPlan());
    setMounted(true);
  }, []);

  const buildPlan = async (intake: IntakeAnswers, summary?: string) => {
    setBuilding(true);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          intake,
          confirmedSummary: summary ?? "",
          done: gatherDone(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { plan: MyPlan };
      savePlan(data.plan);
      setPlan(data.plan);
      setConfirmedSummary(summary ?? "");
      setReviewing(true);
    } catch {
      // Route already falls back internally; reaching here means the
      // network itself failed. Stay on the intake with a note.
      alert(
        "Couldn't reach the plan builder just now — check your connection and try again."
      );
    } finally {
      setBuilding(false);
    }
  };

  if (!mounted) return null;

  if (!plan) {
    if (mode === "chat") {
      return (
        <ChatIntake
          building={building}
          onConfirmed={(intake, summary) => void buildPlan(intake, summary)}
          onUseForm={() => setMode("form")}
        />
      );
    }
    return (
      <Intake
        building={building}
        initial={lastIntake}
        onSubmit={(intake) => void buildPlan(intake)}
      />
    );
  }

  return (
    <>
      {reviewing && (
        <ReviewBar
          plan={plan}
          confirmedSummary={confirmedSummary}
          flagged={flagged}
          onFlagsUsed={() => setFlagged(new Set())}
          onDone={() => {
            setReviewing(false);
            setFlagged(new Set());
          }}
          onRevised={(p) => setPlan(p)}
        />
      )}
      <PlanView
        plan={plan}
        reviewing={reviewing}
        flagged={flagged}
        onToggleFlag={(id) =>
          setFlagged((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
          })
        }
        onUpdate={setPlan}
        onReset={() => {
          setLastIntake(plan.intake);
          clearPlan();
          setPlan(null);
          setReviewing(false);
          setMode("form");
        }}
      />
    </>
  );
}

/* --- Conversational intake ----------------------------------------------- */

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

const OPENER =
  "Hey — I'll build your money plan with you. It takes a couple of minutes and nothing you say leaves this plan. First up: what's the one money thing you want to get done right now?";

/** Standing answers the interview can skip re-asking: About-you signals,
 *  the profile's student stage (mapped to the intake's stage ids), and
 *  profile goals as a confirm-don't-ask hint. Client-only (mounted). */
function gatherKnowns() {
  const about = readAboutYou();
  const stage = readStudentStage();
  const profile = readLocalProfile();
  const stageMap = { hs: "high-school", cc: "community-college", uni: "four-year" } as const;
  return {
    stage: stage ? stageMap[stage] : undefined,
    income: about.income || undefined,
    family: about.family || undefined,
    goals: profile?.goals?.length ? profile.goals : undefined,
  };
}

function ChatIntake({
  building,
  onConfirmed,
  onUseForm,
}: {
  building: boolean;
  onConfirmed: (intake: IntakeAnswers, summary: string) => void;
  onUseForm: () => void;
}) {
  // Computed once on mount (ChatIntake only renders client-side).
  const [knowns] = useState(gatherKnowns);
  const [doneSignals] = useState(gatherDone);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [msgs, setMsgs] = useState<ChatMsg[]>(() => [
    {
      role: "assistant",
      content:
        Object.values(knowns).some(Boolean)
          ? OPENER +
            " (I already know a bit from your profile, so I'll skip what you've told us.)"
          : OPENER,
    },
  ]);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [draft, setDraft] = useState<{
    summary: string;
    intake: IntakeAnswers;
  } | null>(null);

  // Keep the newest bubble in view as the conversation grows.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  });

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || waiting) return;
    const next = [...msgs, { role: "user" as const, content: trimmed }];
    setMsgs(next);
    setInput("");
    setWaiting(true);
    setDraft(null);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          phase: "interview",
          messages: next,
          knowns,
          done: doneSignals,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as {
        reply?: string;
        done?: boolean;
        summary?: string;
        intake?: IntakeAnswers;
        unavailable?: boolean;
      };
      if (data.unavailable) {
        onUseForm();
        return;
      }
      if (data.done && data.summary && data.intake) {
        setMsgs([...next, { role: "assistant", content: data.summary }]);
        setDraft({ summary: data.summary, intake: data.intake });
      } else {
        setMsgs([
          ...next,
          { role: "assistant", content: data.reply ?? "Go on…" },
        ]);
      }
    } catch {
      onUseForm();
    } finally {
      setWaiting(false);
    }
  };

  return (
    <div className="card-ink-lg rounded-2xl bg-cream p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-2xl font-bold text-ink">
          Let&apos;s build your plan
        </h2>
        <button
          type="button"
          onClick={onUseForm}
          className="text-sm font-semibold text-stone underline-offset-4 hover:text-ink hover:underline"
        >
          Prefer the quick form?
        </button>
      </div>

      <div ref={scrollRef} className="mt-5 max-h-[26rem] space-y-3 overflow-y-auto pr-1">
        {msgs.map((m, i) =>
          m.role === "assistant" ? (
            <div key={i} className="chat-pop flex items-end gap-2.5">
              <span className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
                <Compass className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-forest/10 bg-forest/[0.07] px-4 py-2.5 text-sm leading-6 text-ink">
                {m.content}
              </div>
            </div>
          ) : (
            <div
              key={i}
              className="chat-pop ml-auto max-w-[80%] rounded-2xl rounded-br-md border border-amber/40 bg-amber/25 px-4 py-2.5 text-sm leading-6 text-ink"
            >
              {m.content}
            </div>
          )
        )}
        {(waiting || building) && (
          <div className="chat-pop flex items-end gap-2.5">
            <span className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
              <Compass className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
            <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-forest/10 bg-forest/[0.07] px-4 py-3">
              {building && (
                <span className="text-sm font-medium text-stone">
                  Building your plan
                </span>
              )}
              <span
                className="flex items-center gap-1"
                role="status"
                aria-label={building ? "Building your plan" : "The guide is typing"}
              >
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="chat-dot h-1.5 w-1.5 rounded-full bg-forest"
                    style={{ animationDelay: `${d * 0.16}s` }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}
      </div>

      {draft ? (
        <div className="mt-5 rounded-xl border-2 border-ink bg-paper p-4">
          <p className="text-sm font-bold text-ink">Did I get that right?</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={building}
              onClick={() => onConfirmed(draft.intake, draft.summary)}
              className="btn-ink inline-flex items-center rounded-md bg-forest px-5 py-2.5 text-sm font-bold text-cream disabled:opacity-60"
            >
              That&apos;s right — build my plan
            </button>
            <button
              type="button"
              disabled={building}
              onClick={() => {
                setDraft(null);
                setMsgs((m) => [
                  ...m,
                  {
                    role: "assistant",
                    content: "No problem — what did I get wrong?",
                  },
                ]);
              }}
              className="inline-flex items-center rounded-md border-2 border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink"
            >
              Not quite
            </button>
          </div>
        </div>
      ) : (
        <form
          className="mt-5 flex gap-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer…"
            disabled={waiting || building}
            className="min-w-0 flex-1 rounded-lg border-2 border-ink/15 bg-paper px-4 py-2.5 text-base text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
          />
          <button
            type="submit"
            disabled={waiting || building || !input.trim()}
            className="btn-ink inline-flex items-center rounded-md bg-amber px-5 py-2.5 text-sm font-bold text-ink disabled:opacity-60"
          >
            Send
          </button>
        </form>
      )}
      <p className="mt-4 text-xs leading-5 text-stone">
        The guide only listens and builds from real pages on this site — it
        never gives personal financial advice. Anonymous until you save;
        nothing here is sold, ever.
      </p>
    </div>
  );
}

/* --- Review: "does this look right?" -------------------------------------- */

function ReviewBar({
  plan,
  confirmedSummary,
  flagged,
  onFlagsUsed,
  onDone,
  onRevised,
}: {
  plan: MyPlan;
  confirmedSummary: string;
  flagged: Set<string>;
  onFlagsUsed: () => void;
  onDone: () => void;
  onRevised: (p: MyPlan) => void;
}) {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const revise = async () => {
    if (busy) return;
    setBusy(true);
    setNote(null);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          phase: "revise",
          intake: plan.intake,
          confirmedSummary,
          feedback,
          done: gatherDone(),
          currentPlan: {
            headline: plan.headline,
            items: plan.items.map((it) => ({
              href: it.href,
              title: it.title,
              flagged: flagged.has(it.id),
            })),
          },
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as {
        plan?: MyPlan;
        unavailable?: boolean;
      };
      if (data.plan) {
        savePlan(data.plan);
        onRevised(data.plan);
        onFlagsUsed();
        setFeedback("");
        setOpen(false);
        setNote("Reworked — how about now?");
      } else {
        setNote(
          "Couldn't rework it just now — your plan is unchanged. Try again in a minute."
        );
      }
    } catch {
      setNote(
        "Couldn't rework it just now — your plan is unchanged. Try again in a minute."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card-ink mb-6 rounded-2xl bg-amber/15 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-lg font-bold text-ink">
          {note ?? "Does this plan look right?"}
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={onDone}
            className="btn-ink inline-flex items-center rounded-md bg-forest px-4 py-2 text-sm font-bold text-cream"
          >
            Looks right
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center rounded-md border-2 border-ink/25 bg-cream px-4 py-2 text-sm font-semibold text-ink hover:border-ink"
          >
            Something&apos;s off
          </button>
        </div>
      </div>
      {open && (
        <div className="mt-4">
          <p className="text-sm leading-6 text-stone">
            Tell the guide what doesn&apos;t fit (and use the{" "}
            <span className="font-semibold text-ink">flag</span> on any step
            below that isn&apos;t right for you) — it&apos;ll rework the plan
            from the same real guides and tools.
          </p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={2}
            placeholder="e.g. I already filed the FAFSA, and the investing steps feel too early for me…"
            className="mt-2.5 w-full rounded-lg border-2 border-ink/15 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
          />
          <button
            type="button"
            disabled={busy || (!feedback.trim() && flagged.size === 0)}
            onClick={() => void revise()}
            className="btn-ink mt-2.5 inline-flex items-center rounded-md bg-amber px-5 py-2.5 text-sm font-bold text-ink disabled:opacity-60"
          >
            {busy ? "Reworking…" : "Rework my plan"}
          </button>
        </div>
      )}
    </div>
  );
}

/* --- Intake -------------------------------------------------------------- */

function Chip({
  on,
  label,
  onClick,
}: {
  on: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-md border-2 px-3.5 py-2 text-sm font-bold transition-colors ${
        on
          ? "border-ink bg-amber text-ink shadow-[2px_2px_0_#11211c]"
          : "border-ink/15 bg-cream text-stone hover:border-ink/40 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function Intake({
  building,
  initial,
  onSubmit,
}: {
  building: boolean;
  /** Re-plan passes the previous answers so nobody types twice. */
  initial: IntakeAnswers | null;
  onSubmit: (intake: IntakeAnswers) => void;
}) {
  const profile = readLocalProfile();
  const [goal, setGoal] = useState(initial?.goal ?? profile?.goals?.[0] ?? "");
  const [detail, setDetail] = useState(initial?.detail ?? "");
  const [stage, setStage] = useState<IntakeAnswers["stage"] | "">(
    initial?.stage ??
      (profile?.role === "working" ? "working" : "")
  );
  const [income, setIncome] = useState<IntakeAnswers["income"] | "">(
    initial?.income ?? readAboutYou().income ?? ""
  );
  const [family, setFamily] = useState<IntakeAnswers["family"] | "">(
    initial?.family ?? readAboutYou().family ?? ""
  );
  const [target, setTarget] = useState(initial?.target ?? "");

  const ready = goal && stage && income && family;

  return (
    <div className="card-ink rounded-2xl bg-cream p-6 sm:p-8">
      <div className="space-y-7">
        <fieldset>
          <legend className="font-display text-lg font-bold text-ink">
            1. What&apos;s the one money thing you want to get done?
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {GOAL_OPTIONS.map((g) => (
              <Chip
                key={g.id}
                on={goal === g.id}
                label={g.label}
                onClick={() => setGoal(g.id)}
              />
            ))}
          </div>
          <input
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            maxLength={200}
            placeholder="Optional: say it in your own words — “transfer with under $20k of debt”"
            className="mt-3 w-full rounded-lg border-2 border-ink/15 bg-paper px-4 py-2.5 text-base text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
          />
        </fieldset>

        <fieldset>
          <legend className="font-display text-lg font-bold text-ink">
            2. Where are you right now?
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {STAGE_OPTIONS.map(([value, label]) => (
              <Chip
                key={value}
                on={stage === value}
                label={label}
                onClick={() => setStage(value)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-lg font-bold text-ink">
            3. What&apos;s money like month to month?
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {INCOME_OPTIONS.map(([value, label]) => (
              <Chip
                key={value}
                on={income === value}
                label={label}
                onClick={() => setIncome(value)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-lg font-bold text-ink">
            4. Anyone counting on you, or helping you?
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {FAMILY_OPTIONS.map(([value, label]) => (
              <Chip
                key={value}
                on={family === value}
                label={label}
                onClick={() => setFamily(value)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-lg font-bold text-ink">
            5. Any date or number attached?{" "}
            <span className="font-sans text-sm font-normal text-stone">
              (optional)
            </span>
          </legend>
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            maxLength={100}
            placeholder="“$1,200 saved by August” · “FAFSA before my state deadline”"
            className="mt-3 w-full rounded-lg border-2 border-ink/15 bg-paper px-4 py-2.5 text-base text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
          />
        </fieldset>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sand pt-5">
          <p className="max-w-sm text-xs leading-5 text-stone">
            Your answers stay on this device (and sync to your account if you
            have one). Nothing is sold, ever —{" "}
            <Link href="/privacy" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4">
              privacy
            </Link>
            .
          </p>
          <button
            type="button"
            disabled={!ready || building}
            onClick={() =>
              onSubmit({
                goal,
                detail: detail.trim(),
                stage: stage as IntakeAnswers["stage"],
                income: income as IntakeAnswers["income"],
                family: family as IntakeAnswers["family"],
                target: target.trim(),
              })
            }
            className="btn-ink inline-flex items-center gap-2 rounded-md bg-amber px-7 py-3 text-base font-bold text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            {building ? "Building your plan…" : "Build my plan"}
            {!building && <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

/* --- Projection ----------------------------------------------------------- */

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/** Light parse of the free-text target: a $ amount and/or a month name.
 *  Anything unparseable just means the generic projection shows instead. */
function parseTarget(target: string): { amount: number | null; monthIdx: number | null } {
  const amtMatch = target.replace(/,/g, "").match(/\$?\s?(\d{2,7})(?:\b|$)/);
  const amount = amtMatch ? parseInt(amtMatch[1], 10) : null;
  const lower = target.toLowerCase();
  let monthIdx: number | null = null;
  for (let i = 0; i < 12; i++) {
    if (lower.includes(MONTHS[i]) || lower.includes(MONTHS[i].slice(0, 3) + " ")) {
      monthIdx = i;
      break;
    }
  }
  return { amount, monthIdx };
}

function usd(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

/** Deterministic "you're on track" math from the visitor's own Budget
 *  Planner snapshot (readBudgetSummary recomputes from their saved inputs).
 *  Client-only by construction: PlanApp renders nothing until mounted, so
 *  the Date use here never touches hydration. */
function ProjectionCard({ target }: { target: string }) {
  const frame = useFrame();
  const summary = readBudgetSummary();

  if (!summary) {
    return (
      <div className="mt-6 rounded-xl border border-sand bg-cream p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">
          Make this plan do math
        </p>
        <p className="mt-1.5 text-sm leading-6 text-stone">
          Run the{" "}
          <Link
            href={frameHref("/tools/budget", frame)}
            className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Budget Planner
          </Link>{" "}
          once and this plan starts projecting with your real numbers — how
          much you&apos;re on track to set aside, by when.
        </p>
      </div>
    );
  }

  const { leftover } = summary;
  if (leftover <= 0) {
    return (
      <div className="mt-6 rounded-xl border border-sand bg-cream p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">
          Your numbers right now
        </p>
        <p className="mt-1.5 text-sm leading-6 text-stone">
          Your saved budget currently shows more going out than coming in,
          which makes the budgeting steps below the real first move. Update
          the{" "}
          <Link
            href={frameHref("/tools/budget", frame)}
            className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Budget Planner
          </Link>{" "}
          anytime and this updates with you.
        </p>
      </div>
    );
  }

  const { amount, monthIdx } = parseTarget(target);
  const now = new Date();
  let line: string;
  if (monthIdx !== null) {
    let months = monthIdx - now.getMonth();
    if (months <= 0) months += 12;
    const monthName = MONTHS[monthIdx][0].toUpperCase() + MONTHS[monthIdx].slice(1);
    const projected = leftover * months;
    line =
      amount !== null
        ? projected >= amount
          ? `At your current ${usd(leftover)}/month leftover, you're on track for about ${usd(projected)} by ${monthName} — past your ${usd(amount)} target.`
          : `At your current ${usd(leftover)}/month leftover, you're on track for about ${usd(projected)} by ${monthName} — about ${usd(amount - projected)} short of your ${usd(amount)} target, so a step below may be worth moving up.`
        : `At your current ${usd(leftover)}/month leftover, you're on track to set aside about ${usd(projected)} by ${monthName}.`;
  } else {
    line = `At your current ${usd(leftover)}/month leftover, that's about ${usd(leftover * 6)} set aside in six months.`;
  }

  return (
    <div className="mt-6 rounded-xl border-2 border-forest/25 bg-forest/[0.05] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">
        Your numbers right now
      </p>
      <p className="mt-1.5 text-sm leading-6 text-ink">{line}</p>
      <p className="mt-2 text-xs leading-5 text-stone">
        An estimate, not a promise — it&apos;s your own Budget Planner
        numbers, recomputed every time you visit.{" "}
        <Link
          href={frameHref("/tools/budget", frame)}
          className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
        >
          Update them
        </Link>{" "}
        and this moves with you.
      </p>
    </div>
  );
}

/* --- Plan view ------------------------------------------------------------ */

/** The stages usable for the trail view: well-formed, with itemIds that
 *  resolve to real items. Old plans (no stages) return [] and render the
 *  checklist only. */
function usableStages(plan: MyPlan): PlanStage[] {
  if (!Array.isArray(plan.stages)) return [];
  const ids = new Set(plan.items.map((i) => i.id));
  const out: PlanStage[] = [];
  for (const s of plan.stages) {
    if (!s || typeof s.title !== "string" || !Array.isArray(s.itemIds)) continue;
    const itemIds = s.itemIds.filter((id) => typeof id === "string" && ids.has(id));
    if (itemIds.length > 0)
      out.push({ title: s.title, why: typeof s.why === "string" ? s.why : "", itemIds });
  }
  return out.length >= 2 ? out : [];
}

function PlanView({
  plan,
  onUpdate,
  onReset,
  reviewing = false,
  flagged,
  onToggleFlag,
}: {
  plan: MyPlan;
  onUpdate: (p: MyPlan) => void;
  onReset: () => void;
  /** Post-build review mode: rows grow a "doesn't fit" flag toggle. */
  reviewing?: boolean;
  flagged?: Set<string>;
  onToggleFlag?: (id: string) => void;
}) {
  const frame = useFrame();
  const isDone = useDoneChecker();
  const done = plan.items.filter(isDone).length;
  const stages = useMemo(() => usableStages(plan), [plan]);
  // Trail is the default; the preference persists per device. PlanView only
  // renders after PlanApp mounts, so reading storage here is client-safe.
  const [view, setView] = useState<"trail" | "list">(() =>
    loadJSON<string>(PLAN_VIEW_KEY) === "list" ? "list" : "trail"
  );
  const pickView = (v: "trail" | "list") => {
    setView(v);
    saveJSON(PLAN_VIEW_KEY, v);
  };
  const showTrail = stages.length > 0 && view === "trail";

  const rowProps = { plan, isDone, reviewing, flagged, onToggleFlag, onUpdate, frame };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {plan.headline}
          </h2>
          <p className="mt-1.5 text-sm font-semibold text-ink/70">
            {done} of {plan.items.length} steps done
            {!plan.aiComposed && " · built from your goal's guided path"}
          </p>
          <SaveToProfile thing="plan" className="mt-2" />
        </div>
        <div className="flex items-center gap-4">
          {stages.length > 0 && (
            <div className="flex rounded-md border-2 border-ink/15 bg-cream p-0.5">
              {(
                [
                  ["trail", "Path", MapIcon],
                  ["list", "List view", List],
                ] as const
              ).map(([v, label, Icon]) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  onClick={() => pickView(v)}
                  className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-bold transition-colors ${
                    view === v
                      ? "bg-forest text-cream"
                      : "text-stone hover:text-ink"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Start over with new answers? Your current plan will be replaced.")) onReset();
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Re-plan
          </button>
        </div>
      </div>

      <ProjectionCard target={plan.intake.target} />

      {showTrail ? (
        <PlanTrailView stages={stages} {...rowProps} />
      ) : (
        <PlanChecklist {...rowProps} />
      )}

      <p className="mt-6 text-sm leading-6 text-stone">
        Steps check themselves off as you read and use the site, wherever you
        do it. Deadlines and habits have real checkboxes — those are yours to
        tick.
      </p>
    </div>
  );
}

/* --- The Now/Next/Done checklist (the original view) ---------------------- */

interface RowProps {
  plan: MyPlan;
  isDone: (item: PlanItem) => boolean;
  reviewing?: boolean;
  flagged?: Set<string>;
  onToggleFlag?: (id: string) => void;
  onUpdate: (p: MyPlan) => void;
  frame: Frame;
}

function PlanChecklist({
  plan,
  isDone,
  reviewing,
  flagged,
  onToggleFlag,
  onUpdate,
  frame,
}: RowProps) {
  return (
    <>
      {(() => {
        const undone = plan.items.filter((i) => !isDone(i));
        const groups: Array<[string, string, PlanItem[]]> = [
          ["Now", "Start with these", undone.slice(0, 3)],
          ["Next", "Then keep going", undone.slice(3)],
          ["Done", "Behind you", plan.items.filter((i) => isDone(i))],
        ];
        const numberOf = new Map(plan.items.map((it, idx) => [it.id, idx + 1]));
        return groups
          .filter(([, , items]) => items.length > 0)
          .map(([label, sub, items]) => (
            <div key={label} className="mt-7 first:mt-6">
              <p className="flex items-baseline gap-2.5">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta">
                  {label}
                </span>
                <span className="text-xs font-medium text-stone">{sub}</span>
              </p>
              <ol className="mt-3 space-y-3">
                {items.map((item) => {
                  const i = (numberOf.get(item.id) ?? 1) - 1;
                  const checked = isDone(item);
                  const manual = !item.doneKey;
                  return (
            <li
              key={item.id}
              className={`card-ink flex items-start gap-3 rounded-xl p-4 ${
                checked ? "bg-paper" : "bg-cream"
              }`}
            >
              {manual ? (
                <button
                  type="button"
                  aria-pressed={Boolean(item.checked)}
                  onClick={() => onUpdate(toggleItem(plan, item.id))}
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                    item.checked
                      ? "border-forest bg-forest text-cream"
                      : "border-ink/25 bg-cream hover:border-forest"
                  }`}
                  aria-label={item.checked ? "Mark not done" : "Mark done"}
                >
                  {item.checked && <Check className="h-4 w-4" strokeWidth={3} />}
                </button>
              ) : (
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold ${
                    checked
                      ? "bg-forest text-cream"
                      : "border border-ink/20 bg-paper text-stone"
                  }`}
                >
                  {checked ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <Link
                    href={frameHref(item.href, frame)}
                    className={`font-display text-base font-bold leading-snug underline-offset-4 hover:underline ${
                      checked ? "text-ink/55" : "text-ink"
                    }`}
                  >
                    {item.title}
                  </Link>
                  {item.due && (
                    <span className="text-xs font-bold uppercase tracking-wide text-terracotta">
                      {item.due}
                    </span>
                  )}
                </div>
                <p className={`mt-1 text-sm leading-6 ${checked ? "text-stone/70" : "text-stone"}`}>
                  {item.why}
                </p>
              </div>
              {reviewing && onToggleFlag && (
                <button
                  type="button"
                  onClick={() => onToggleFlag(item.id)}
                  aria-pressed={flagged?.has(item.id) ?? false}
                  title="Flag this step as not right for you"
                  className={`mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors ${
                    flagged?.has(item.id)
                      ? "border-terracotta bg-terracotta text-cream"
                      : "border-ink/20 bg-paper text-stone hover:border-terracotta hover:text-terracotta"
                  }`}
                >
                  <Flag className="h-3 w-3" />
                  {flagged?.has(item.id) ? "Flagged" : "Doesn't fit?"}
                </button>
              )}
            </li>
                  );
                })}
              </ol>
            </div>
          ));
      })()}
    </>
  );
}

/* --- The roadmap trail (session 6 — JourneyPath's language, plan-driven) --- */

type StageStatus = "completed" | "current" | "upcoming";

// Same winding trail geometry as components/JourneyPath.tsx, but milestone
// nodes are measured off the path at runtime so 3-5 plan stages all sit
// exactly on the curve (journeys are always 4; plans vary).
const TRAIL =
  "M 150 34 C 150 74, 292 92, 222 144 C 152 202, 128 242, 78 302 C 38 362, 182 412, 232 464 C 282 522, 118 582, 150 682";
const TRAIL_LEN = 870;
const DOTS = [
  { x: 162, y: 58 },
  { x: 228, y: 92 },
  { x: 260, y: 122 },
  { x: 196, y: 184 },
  { x: 122, y: 234 },
  { x: 90, y: 274 },
  { x: 52, y: 340 },
  { x: 170, y: 394 },
  { x: 222, y: 438 },
  { x: 270, y: 504 },
  { x: 152, y: 566 },
  { x: 146, y: 642 },
];

function PlanTrail({
  fraction,
  statuses,
}: {
  fraction: number;
  statuses: StageStatus[];
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [nodes, setNodes] = useState<Array<{ x: number; y: number }>>([]);
  const n = statuses.length;
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const L = p.getTotalLength();
    setNodes(
      Array.from({ length: n }, (_, i) => {
        const pt = p.getPointAtLength((L * (i + 1)) / n);
        return { x: pt.x, y: pt.y };
      })
    );
  }, [n]);

  // Arm the draw-in two frames after `fraction` lands (JourneyPath pattern)
  // so the stroke visibly fills instead of snapping.
  const [drawn, setDrawn] = useState(0);
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setDrawn(fraction));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [fraction]);
  const litDots = Math.round(drawn * DOTS.length);

  return (
    <div className="relative w-full" aria-hidden>
      <svg
        viewBox="0 0 300 745"
        className="h-auto w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="planTrailGreen" x1="0%" y1="0%" x2="30%" y2="100%">
            <stop offset="0%" stopColor="#1f9069" />
            <stop offset="50%" stopColor="#15624b" />
            <stop offset="100%" stopColor="#0c4a39" />
          </linearGradient>
          <filter id="planTrailGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="planStartGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(31,144,105,0.3)" />
            <stop offset="100%" stopColor="rgba(31,144,105,0)" />
          </radialGradient>
        </defs>

        <text
          x="150"
          y="18"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#44514a"
          letterSpacing="3"
        >
          START
        </text>
        <circle cx="150" cy="34" r="20" fill="url(#planStartGlow)" />

        {DOTS.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={i < litDots ? 3 : 2.5}
            fill={i < litDots ? "#1f9069" : "#e4d8c1"}
            style={{ transition: `fill 0.4s ease ${0.3 + i * 0.04}s` }}
          />
        ))}

        <path
          ref={pathRef}
          d={TRAIL}
          stroke="#e4d8c1"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="2 12"
          opacity="0.8"
        />
        <path
          d={TRAIL}
          stroke="url(#planTrailGreen)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#planTrailGlow)"
          style={{
            strokeDasharray: TRAIL_LEN,
            strokeDashoffset: TRAIL_LEN * (1 - drawn),
            transition: "stroke-dashoffset 1.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        <circle cx="150" cy="34" r="7" fill="#0c4a39" />
        <circle cx="150" cy="34" r="3.5" fill="#fbf8f1" />

        {nodes.map((pt, i) => {
          const status = statuses[i] ?? "upcoming";
          const done = status === "completed";
          const here = status === "current";
          return (
            <g key={i}>
              {here && (
                <circle
                  className="roadmap-pulse"
                  cx={pt.x}
                  cy={pt.y}
                  r="16"
                  fill="none"
                  stroke="#e7a33c"
                  strokeWidth="2"
                />
              )}
              {done && (
                <circle cx={pt.x} cy={pt.y} r="20" fill="rgba(12,74,57,0.1)" />
              )}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="16"
                fill={done ? "#0c4a39" : "#fbf8f1"}
                stroke={done ? "#0c4a39" : here ? "#e7a33c" : "#e4d8c1"}
                strokeWidth="2.5"
                style={{ transition: "fill 0.4s ease, stroke 0.4s ease" }}
              />
              {done ? (
                <path
                  d={`M ${pt.x - 5} ${pt.y + 1} L ${pt.x - 1} ${pt.y + 5} L ${pt.x + 5} ${pt.y - 4}`}
                  stroke="#fbf8f1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              ) : (
                <text
                  x={pt.x}
                  y={pt.y + 4.5}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={here ? "#e7a33c" : "#44514a"}
                >
                  {i + 1}
                </text>
              )}
            </g>
          );
        })}

        <text
          x="150"
          y="732"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#44514a"
          letterSpacing="3"
        >
          FINISH
        </text>
      </svg>
    </div>
  );
}

/** One plan step inside a trail stage card. Manual items keep their real
 *  checkbox; derived items show read-only done state; review mode keeps
 *  the "Doesn't fit?" flag in this view too. */
function TrailItemRow({
  item,
  plan,
  isDone,
  reviewing,
  flagged,
  onToggleFlag,
  onUpdate,
  frame,
}: RowProps & { item: PlanItem }) {
  const checked = isDone(item);
  const manual = !item.doneKey;
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
        checked
          ? "border-forest/15 bg-forest/5"
          : "border-sand bg-paper hover:border-ink/20"
      }`}
    >
      {manual ? (
        <button
          type="button"
          aria-pressed={Boolean(item.checked)}
          onClick={() => onUpdate(toggleItem(plan, item.id))}
          aria-label={item.checked ? "Mark not done" : "Mark done"}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
            item.checked
              ? "border-forest bg-forest text-cream"
              : "border-ink/25 bg-cream hover:border-forest"
          }`}
        >
          {item.checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </button>
      ) : (
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
            checked
              ? "border-forest bg-forest text-cream"
              : "border-sand bg-cream text-stone"
          }`}
        >
          {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
          <Link
            href={frameHref(item.href, frame)}
            className={`text-sm font-semibold leading-snug underline-offset-4 transition-colors hover:text-amber-deep hover:underline ${
              checked ? "text-stone line-through" : "text-ink"
            }`}
          >
            {item.title}
          </Link>
          {item.due && (
            <span className="text-[11px] font-bold uppercase tracking-wide text-terracotta">
              {item.due}
            </span>
          )}
        </div>
        <p className={`mt-0.5 text-xs leading-5 ${checked ? "text-stone/70" : "text-stone"}`}>
          {item.why}
        </p>
      </div>
      {reviewing && onToggleFlag && (
        <button
          type="button"
          onClick={() => onToggleFlag(item.id)}
          aria-pressed={flagged?.has(item.id) ?? false}
          title="Flag this step as not right for you"
          className={`mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors ${
            flagged?.has(item.id)
              ? "border-terracotta bg-terracotta text-cream"
              : "border-ink/20 bg-paper text-stone hover:border-terracotta hover:text-terracotta"
          }`}
        >
          <Flag className="h-3 w-3" />
          {flagged?.has(item.id) ? "Flagged" : "Doesn't fit?"}
        </button>
      )}
    </div>
  );
}

function PlanTrailView({ stages, ...rowProps }: RowProps & { stages: PlanStage[] }) {
  const { plan, isDone, frame } = rowProps;
  const byId = new Map(plan.items.map((i) => [i.id, i]));
  const stageItems = stages.map(
    (s) => s.itemIds.map((id) => byId.get(id)).filter(Boolean) as PlanItem[]
  );
  // Defensive: anything the stages don't cover still renders (memory
  // contract — nothing on the plan ever hides).
  const covered = new Set(stages.flatMap((s) => s.itemIds));
  const extras = plan.items.filter((i) => !covered.has(i.id));

  const doneCount = plan.items.filter(isDone).length;
  const fraction = plan.items.length ? doneCount / plan.items.length : 0;
  const orderedItems = [...stageItems.flat(), ...extras];
  const nextItem = orderedItems.find((i) => !isDone(i)) ?? null;
  const hereIndex = stageItems.findIndex((items) => items.some((i) => !isDone(i)));
  const finished = hereIndex === -1 && extras.every(isDone);
  const statuses: StageStatus[] = stageItems.map((items, i) =>
    items.every(isDone) ? "completed" : i === hereIndex ? "current" : "upcoming"
  );

  return (
    <div className="mt-7 grid items-start gap-8 md:grid-cols-2">
      {/* Sticky trail card */}
      <div className="md:sticky md:top-24">
        <div
          className="relative overflow-hidden rounded-3xl border-2 border-ink/10 p-5"
          style={{
            background:
              "linear-gradient(to bottom, rgba(31,144,105,0.14), #fbf8f1 45%)",
          }}
        >
          <div className="mb-2 text-center">
            <p className="font-display text-4xl font-bold text-forest">
              {doneCount}
              <span className="text-xl text-stone">/{plan.items.length}</span>
            </p>
            <p className="text-xs uppercase tracking-wider text-stone">
              steps completed
            </p>
          </div>

          <PlanTrail fraction={fraction} statuses={statuses} />

          {nextItem ? (
            <div className="mt-4 rounded-xl border border-amber/20 bg-amber/10 p-4">
              <p className="mb-1 text-xs uppercase tracking-wider text-stone">
                Next up
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium leading-tight text-ink">
                  {nextItem.title}
                </p>
                <Link
                  href={frameHref(nextItem.href, frame)}
                  className="flex shrink-0 items-center gap-1 text-xs font-bold text-amber-deep transition-colors hover:text-ink"
                >
                  {doneCount === 0 ? "Start" : "Continue"}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-forest/20 bg-forest/10 p-4 text-center">
              <p className="font-display text-lg font-bold text-forest">
                Plan complete!
              </p>
              <p className="text-xs text-stone">
                You&apos;ve finished every step.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stage cards */}
      <div className="space-y-4">
        {stages.map((stage, si) => {
          const status = statuses[si];
          const stageDone = status === "completed";
          const isHere = status === "current" && !finished;
          return (
            <div
              key={si}
              className={`rounded-2xl border-2 bg-cream p-5 transition-all ${
                isHere
                  ? "border-amber shadow-lg"
                  : stageDone
                    ? "border-forest/30"
                    : "border-ink/10"
              }`}
            >
              <div className="mb-4 flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display font-bold ${
                    stageDone
                      ? "bg-forest text-cream"
                      : isHere
                        ? "bg-amber/15 text-amber-deep"
                        : "bg-paper text-stone"
                  }`}
                >
                  {stageDone ? <Check className="h-5 w-5" /> : si + 1}
                </div>
                <div className="min-w-0 flex-1">
                  {isHere && (
                    <span className="mb-1 inline-block rounded-full bg-amber px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink">
                      You are here
                    </span>
                  )}
                  <h3 className="font-display text-lg font-bold leading-tight text-ink">
                    {stage.title}
                  </h3>
                  {stage.why && (
                    <p className="mt-0.5 text-sm text-stone">{stage.why}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                {stageItems[si].map((item) => (
                  <TrailItemRow key={item.id} item={item} {...rowProps} />
                ))}
              </div>
            </div>
          );
        })}

        {extras.length > 0 && (
          <div className="rounded-2xl border-2 border-ink/10 bg-cream p-5">
            <h3 className="mb-4 font-display text-lg font-bold leading-tight text-ink">
              Also on your plan
            </h3>
            <div className="space-y-2">
              {extras.map((item) => (
                <TrailItemRow key={item.id} item={item} {...rowProps} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
