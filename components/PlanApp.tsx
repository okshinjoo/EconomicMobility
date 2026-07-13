"use client";

// The plan builder's front door (session 1 of plan-builder-spec.md): the
// five-question intake, then the saved plan as a living checklist. Guide/
// tool/course/challenge items check themselves off from the same trackers
// journeys use; deadline and habit items are manual checkboxes stored in
// the plan itself. The dashboard polish (Now/Next grouping, projections)
// is session 2 — this ships the loop end to end.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { GOAL_OPTIONS, readLocalProfile } from "@/lib/profile";
import {
  loadPlan,
  savePlan,
  clearPlan,
  toggleItem,
  type IntakeAnswers,
  type MyPlan,
  type PlanItem,
} from "@/lib/plan";
import { getReadMap } from "@/lib/readTracking";
import { readBudgetSummary } from "@/lib/calcImports";
import { getBadges } from "@/components/CourseQuiz";
import { STORAGE_KEYS, loadJSON } from "@/lib/storage";

const CHALLENGE_BADGES_KEY = "empower:challenge-badges:v1";
const QUIZ_SCORES_KEY = "empower:article-quizzes:v1";

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

  useEffect(() => {
    setPlan(loadPlan());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!plan) {
    return (
      <Intake
        building={building}
        initial={lastIntake}
        onSubmit={async (intake) => {
          setBuilding(true);
          try {
            const res = await fetch("/api/plan", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ intake }),
            });
            if (!res.ok) throw new Error(String(res.status));
            const data = (await res.json()) as { plan: MyPlan };
            savePlan(data.plan);
            setPlan(data.plan);
          } catch {
            // Route already falls back internally; reaching here means the
            // network itself failed. Stay on the intake with a note.
            alert(
              "Couldn't reach the plan builder just now — check your connection and try again."
            );
          } finally {
            setBuilding(false);
          }
        }}
      />
    );
  }

  return (
    <PlanView
      plan={plan}
      onUpdate={setPlan}
      onReset={() => {
        setLastIntake(plan.intake);
        clearPlan();
        setPlan(null);
      }}
    />
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
    initial?.income ?? ""
  );
  const [family, setFamily] = useState<IntakeAnswers["family"] | "">(
    initial?.family ?? ""
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
            href="/tools/budget"
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
            href="/tools/budget"
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
          href="/tools/budget"
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

function PlanView({
  plan,
  onUpdate,
  onReset,
}: {
  plan: MyPlan;
  onUpdate: (p: MyPlan) => void;
  onReset: () => void;
}) {
  const isDone = useDoneChecker();
  const done = plan.items.filter(isDone).length;

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
        </div>
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

      <ProjectionCard target={plan.intake.target} />

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
                    href={item.href}
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
            </li>
                  );
                })}
              </ol>
            </div>
          ));
      })()}

      <p className="mt-6 text-sm leading-6 text-stone">
        Steps check themselves off as you read and use the site, wherever you
        do it. Deadlines and habits have real checkboxes — those are yours to
        tick.
      </p>
    </div>
  );
}
