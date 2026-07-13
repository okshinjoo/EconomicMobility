"use client";

// The student tracker UI (July 13: three tracks — high school, community
// college, university — one snapshot, one courses list, different money
// math per track; see lib/studentTracker). Renders nothing until mounted
// (client data, no hydration mismatch).

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Plus, Trash2 } from "lucide-react";
import { frameHref } from "@/lib/frame";
import { useFrame } from "@/components/useFrame";
import {
  loadTracker,
  saveTracker,
  summarize,
  unitsOf,
  GRADES,
  TRANSFER_UNITS,
  UNITS_PER_TERM,
  type Course,
  type CourseStatus,
  type Grade,
  type TrackerData,
  type TrackerMode,
  summarizeApps,
  dollarsOf,
  type ScholarshipApp,
  type AppStatus,
} from "@/lib/studentTracker";

const STATUS_LABELS: Record<CourseStatus, string> = {
  planned: "Planned",
  taking: "Taking now",
  done: "Done",
};

const MODES: { id: TrackerMode; label: string; blurb: string }[] = [
  {
    id: "hs",
    label: "High school",
    blurb:
      "Track your classes and GPA — and flag the AP, IB, and dual-enrollment ones, because those bank real college units before you've paid a tuition bill.",
  },
  {
    id: "cc",
    label: "Community college",
    blurb:
      "Every transferable unit is money you don't pay twice. Track your progress to the 60-unit transfer mark and confirm each course against the agreement.",
  },
  {
    id: "uni",
    label: "University",
    blurb:
      "Every extra term costs real money. Track your units against your degree target and watch the terms-to-go number instead of guessing.",
  },
];

/** The course flag means something different per track. */
const FLAG_LABELS: Record<TrackerMode, string | null> = {
  hs: "College credit",
  cc: "Transfers",
  uni: null,
};

function newId(): string {
  return `c${Math.random().toString(36).slice(2, 9)}`;
}

const selectCls =
  "rounded-md border-2 border-ink/15 bg-cream px-2 py-1.5 text-sm font-semibold text-ink focus:border-ink focus:outline-none";

const tileCls = "card-ink rounded-xl bg-cream p-5";
const tileNumCls = "font-display text-3xl font-bold text-forest";
const tileLabelCls =
  "mt-1 text-xs font-semibold uppercase tracking-wide text-stone";

export default function StudentTracker() {
  const frame = useFrame();
  const [data, setData] = useState<TrackerData | null>(null);

  useEffect(() => {
    setData(loadTracker());
  }, []);

  const update = (next: TrackerData) => {
    setData(next);
    saveTracker(next);
  };

  const summary = useMemo(() => (data ? summarize(data) : null), [data]);
  const appsSummary = useMemo(
    () => (data ? summarizeApps(data.apps) : null),
    [data]
  );

  if (!data || !summary || !appsSummary) return null;

  const mode = data.mode;
  const flagLabel = FLAG_LABELS[mode];
  const activeMode = MODES.find((m) => m.id === mode)!;

  const ccPct = Math.min(100, (summary.unitsDone / TRANSFER_UNITS) * 100);
  const uniPct = Math.min(
    100,
    (summary.unitsDone / summary.targetUnits) * 100
  );
  const flaggedTaking = summary.unitsTransferable - summary.unitsFlaggedDone;

  const costEditor = (
    <label className="mt-1.5 flex items-center gap-1.5 text-xs text-stone">
      at $
      <input
        value={data.costPerUnit}
        onChange={(e) => update({ ...data, costPerUnit: e.target.value })}
        inputMode="decimal"
        className="w-14 rounded border border-ink/20 bg-cream px-1.5 py-0.5 text-xs font-semibold text-ink focus:border-ink focus:outline-none"
      />
      /unit
    </label>
  );

  return (
    <div>
      {/* Which track are you on? */}
      <div className="flex flex-wrap items-center gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => update({ ...data, mode: m.id })}
            aria-pressed={mode === m.id}
            className={`rounded-md border-2 px-3.5 py-1.5 text-sm font-bold transition-colors ${
              mode === m.id
                ? "border-ink bg-amber text-ink shadow-[2px_2px_0_#11211c]"
                : "border-ink/15 bg-cream text-stone hover:border-ink/40 hover:text-ink"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-stone">
        {activeMode.blurb}
      </p>

      {/* The numbers — per track */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {mode === "hs" && (
          <>
            <div className={tileCls}>
              <p className={tileNumCls}>{summary.unitsFlaggedDone}</p>
              <p className={tileLabelCls}>College units banked early</p>
              {flaggedTaking > 0 && (
                <p className="mt-1.5 text-xs text-stone">
                  +{flaggedTaking} in progress
                </p>
              )}
            </div>
            <GpaTile summary={summary} />
            <div className={tileCls}>
              <p className={tileNumCls}>{summary.unitsTaking}</p>
              <p className={tileLabelCls}>Units in progress</p>
            </div>
            <div className={tileCls}>
              <p className={tileNumCls}>
                ${Math.round(summary.dollarsProtected).toLocaleString("en-US")}
              </p>
              <p className={tileLabelCls}>Tuition you may never pay</p>
              {costEditor}
              <p className="mt-1 text-[11px] leading-4 text-stone">
                priced at community-college rates
              </p>
            </div>
          </>
        )}

        {mode === "cc" && (
          <>
            <div className={tileCls}>
              <p className={tileNumCls}>
                {summary.unitsDone}
                <span className="text-lg text-stone">/{TRANSFER_UNITS}</span>
              </p>
              <p className={tileLabelCls}>Units banked toward transfer</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sand">
                <div
                  className="h-full rounded-full bg-forest transition-[width] duration-500"
                  style={{ width: `${ccPct}%` }}
                />
              </div>
              {summary.unitsTaking > 0 && (
                <p className="mt-1.5 text-xs text-stone">
                  +{summary.unitsTaking} in progress
                </p>
              )}
            </div>
            <GpaTile summary={summary} />
            <div className={tileCls}>
              <p className={tileNumCls}>{summary.unitsTransferable}</p>
              <p className={tileLabelCls}>Transferable units</p>
              {summary.unitsAtRisk > 0 && (
                <p className="mt-1.5 text-xs font-semibold text-terracotta">
                  {summary.unitsAtRisk} units not confirmed — check ASSIST
                </p>
              )}
            </div>
            <div className={tileCls}>
              <p className={tileNumCls}>
                ${Math.round(summary.dollarsProtected).toLocaleString("en-US")}
              </p>
              <p className={tileLabelCls}>Not paid twice</p>
              {costEditor}
            </div>
          </>
        )}

        {mode === "uni" && (
          <>
            <div className={tileCls}>
              <p className={tileNumCls}>
                {summary.unitsDone}
                <span className="text-lg text-stone">
                  /{summary.targetUnits}
                </span>
              </p>
              <p className={tileLabelCls}>Units toward your degree</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sand">
                <div
                  className="h-full rounded-full bg-forest transition-[width] duration-500"
                  style={{ width: `${uniPct}%` }}
                />
              </div>
              <label className="mt-1.5 flex items-center gap-1.5 text-xs text-stone">
                target
                <input
                  value={data.targetUnits}
                  onChange={(e) =>
                    update({ ...data, targetUnits: e.target.value })
                  }
                  inputMode="numeric"
                  className="w-14 rounded border border-ink/20 bg-cream px-1.5 py-0.5 text-xs font-semibold text-ink focus:border-ink focus:outline-none"
                />
                units
              </label>
            </div>
            <GpaTile summary={summary} />
            <div className={tileCls}>
              <p className={tileNumCls}>{summary.unitsTaking}</p>
              <p className={tileLabelCls}>Units in progress</p>
            </div>
            <div className={tileCls}>
              <p className={tileNumCls}>{summary.unitsToGo}</p>
              <p className={tileLabelCls}>Units to go</p>
              <p className="mt-1.5 text-xs leading-4 text-stone">
                {summary.unitsToGo === 0
                  ? "Target reached — check your degree audit."
                  : `≈ ${summary.termsToGo} full-time term${
                      summary.termsToGo === 1 ? "" : "s"
                    } at ${UNITS_PER_TERM}/term`}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Courses */}
      <div className="mt-10">
        <h2 className="font-display text-2xl font-bold text-ink">
          Your {mode === "hs" ? "classes" : "courses"}
        </h2>
        <p className="mt-1.5 text-sm leading-6 text-stone">
          {mode === "hs" && (
            <>
              Flag the classes that earn college credit — AP and IB (via the
              exams) and dual enrollment (units the moment you pass). Those
              flags are what the savings number counts.
            </>
          )}
          {mode === "cc" && (
            <>
              Mark a course transferable only after you&apos;ve seen it in a
              current agreement —{" "}
              <a
                href="https://assist.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
              >
                ASSIST.org
              </a>{" "}
              in California, your transfer center anywhere else.
            </>
          )}
          {mode === "uni" && (
            <>
              Log courses as you finish them and the degree bar keeps itself
              honest. Your official degree audit is the final word on what
              counts.
            </>
          )}
        </p>

        <div className="mt-4 space-y-2.5">
          {data.courses.map((c) => (
            <div
              key={c.id}
              className="card-ink flex flex-wrap items-center gap-3 rounded-xl bg-cream px-4 py-3"
            >
              <span className="min-w-0 flex-1 basis-40 text-sm font-bold leading-snug text-ink">
                {c.name}
                {c.term && (
                  <span className="ml-2 font-sans text-xs font-medium text-stone">
                    {c.term}
                  </span>
                )}
              </span>
              <span className="text-xs font-semibold text-stone">
                {unitsOf(c)} units
              </span>
              <select
                value={c.status}
                onChange={(e) =>
                  update({
                    ...data,
                    courses: data.courses.map((x) =>
                      x.id === c.id
                        ? { ...x, status: e.target.value as CourseStatus }
                        : x
                    ),
                  })
                }
                className={selectCls}
                aria-label="Course status"
              >
                {(Object.keys(STATUS_LABELS) as CourseStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
              {c.status === "done" && (
                <select
                  value={c.grade}
                  onChange={(e) =>
                    update({
                      ...data,
                      courses: data.courses.map((x) =>
                        x.id === c.id
                          ? { ...x, grade: e.target.value as Grade }
                          : x
                      ),
                    })
                  }
                  className={selectCls}
                  aria-label="Grade"
                >
                  <option value="">Grade…</option>
                  {GRADES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              )}
              {flagLabel && (
                <label className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-ink">
                  <input
                    type="checkbox"
                    checked={c.transferable}
                    onChange={(e) =>
                      update({
                        ...data,
                        courses: data.courses.map((x) =>
                          x.id === c.id
                            ? { ...x, transferable: e.target.checked }
                            : x
                        ),
                      })
                    }
                    className="h-4 w-4 accent-forest"
                  />
                  {flagLabel}
                </label>
              )}
              <button
                type="button"
                onClick={() =>
                  update({
                    ...data,
                    courses: data.courses.filter((x) => x.id !== c.id),
                  })
                }
                aria-label={`Remove ${c.name}`}
                className="rounded p-1 text-stone transition-colors hover:text-terracotta"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <AddCourse
          mode={mode}
          onAdd={(course) =>
            update({ ...data, courses: [...data.courses, course] })
          }
        />
      </div>

      {/* Scholarship pipeline — all tracks */}
      <div className="mt-10">
        <h2 className="font-display text-2xl font-bold text-ink">
          Scholarship applications
        </h2>
        <p className="mt-1.5 text-sm leading-6 text-stone">
          Treat it like a part-time job with a pipeline: what you&apos;re
          planning, what&apos;s in, what came back. Need more to apply to?{" "}
          <Link
            href="/students/scholarships"
            className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            The Scholarship Finder
          </Link>{" "}
          has {""}vetted awards filtered to your stage.
        </p>

        {data.apps.length > 0 && (
          <p className="mt-3 text-sm font-semibold text-ink">
            {appsSummary.sent} application{appsSummary.sent === 1 ? "" : "s"}{" "}
            sent
            {appsSummary.dollarsWon > 0 && (
              <>
                {" "}
                ·{" "}
                <span className="text-forest">
                  ${appsSummary.dollarsWon.toLocaleString("en-US")} won
                </span>
              </>
            )}
            {appsSummary.dollarsInPlay > 0 && (
              <>
                {" "}
                · ${appsSummary.dollarsInPlay.toLocaleString("en-US")} still
                in play
              </>
            )}
          </p>
        )}

        <div className="mt-4 space-y-2.5">
          {data.apps.map((a) => (
            <div
              key={a.id}
              className={`card-ink flex flex-wrap items-center gap-3 rounded-xl px-4 py-3 ${
                a.status === "won"
                  ? "bg-forest/10"
                  : a.status === "lost"
                    ? "bg-paper"
                    : "bg-cream"
              }`}
            >
              <span className="min-w-0 flex-1 basis-40 text-sm font-bold leading-snug text-ink">
                {a.name}
                {a.due && (
                  <span className="ml-2 font-sans text-xs font-medium text-stone">
                    due {a.due}
                  </span>
                )}
              </span>
              {dollarsOf(a) > 0 && (
                <span
                  className={`text-sm font-bold ${
                    a.status === "won" ? "text-forest" : "text-stone"
                  }`}
                >
                  ${dollarsOf(a).toLocaleString("en-US")}
                </span>
              )}
              <select
                value={a.status}
                onChange={(e) =>
                  update({
                    ...data,
                    apps: data.apps.map((x) =>
                      x.id === a.id
                        ? { ...x, status: e.target.value as AppStatus }
                        : x
                    ),
                  })
                }
                className={selectCls}
                aria-label="Application status"
              >
                <option value="planning">Planning</option>
                <option value="applied">Applied</option>
                <option value="won">Won</option>
                <option value="lost">Didn&apos;t get it</option>
              </select>
              <button
                type="button"
                onClick={() =>
                  update({
                    ...data,
                    apps: data.apps.filter((x) => x.id !== a.id),
                  })
                }
                aria-label={`Remove ${a.name}`}
                className="rounded p-1 text-stone transition-colors hover:text-terracotta"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <AddApp
          onAdd={(app) => update({ ...data, apps: [...data.apps, app] })}
        />
        {data.apps.some((a) => a.status === "lost") && (
          <p className="mt-3 text-xs leading-5 text-stone">
            A no isn&apos;t wasted — the essay you wrote is a draft for the
            next one. Most winners lost plenty first.
          </p>
        )}
      </div>

      {/* To-dos */}
      <div className="mt-10">
        <h2 className="font-display text-2xl font-bold text-ink">To-dos</h2>
        <p className="mt-1.5 text-sm leading-6 text-stone">
          The small stuff with real consequences: email the counselor, order
          the transcript, submit the thing.
        </p>
        <div className="mt-4 space-y-2">
          {data.todos.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 rounded-lg border border-sand bg-cream px-4 py-2.5"
            >
              <button
                type="button"
                aria-pressed={t.done}
                onClick={() =>
                  update({
                    ...data,
                    todos: data.todos.map((x) =>
                      x.id === t.id ? { ...x, done: !x.done } : x
                    ),
                  })
                }
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                  t.done
                    ? "border-forest bg-forest text-cream"
                    : "border-ink/25 bg-cream hover:border-forest"
                }`}
                aria-label={t.done ? "Mark not done" : "Mark done"}
              >
                {t.done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </button>
              <span
                className={`flex-1 text-sm font-medium ${
                  t.done ? "text-stone line-through" : "text-ink"
                }`}
              >
                {t.text}
              </span>
              <button
                type="button"
                onClick={() =>
                  update({
                    ...data,
                    todos: data.todos.filter((x) => x.id !== t.id),
                  })
                }
                aria-label="Remove to-do"
                className="rounded p-1 text-stone transition-colors hover:text-terracotta"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <AddTodo
          onAdd={(text) =>
            update({
              ...data,
              todos: [...data.todos, { id: newId(), text, done: false }],
            })
          }
        />
      </div>

      <p className="mt-10 rounded-xl border border-sand bg-cream p-4 text-sm leading-6 text-stone">
        Everything here stays on your device (and syncs to your account if
        you have one). The GPA is an unofficial estimate on the standard 4.0
        scale — your transcript is the real record.{" "}
        {mode === "hs" && (
          <>
            AP and IB credit depends on your exam score and where you enroll;
            dual-enrollment units are real the moment you pass.{" "}
            <Link
              href={frameHref("/learn/college/community-college-path", frame)}
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              The community college path
            </Link>{" "}
            shows what those cheap early units are worth.
          </>
        )}
        {mode === "cc" && (
          <>
            Transferability always belongs to the agreement, not this page:{" "}
            <Link
              href={frameHref(
                "/learn/college/community-college-transfer-money",
                frame
              )}
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              the transfer money guide
            </Link>{" "}
            shows how to check it.
          </>
        )}
        {mode === "uni" && (
          <>
            Fewer terms means less tuition:{" "}
            <Link
              href={frameHref("/learn/college/minimizing-college-debt", frame)}
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              minimizing college debt
            </Link>{" "}
            covers the levers that keep the bill down.
          </>
        )}
      </p>
    </div>
  );
}

function GpaTile({
  summary,
}: {
  summary: { gpa: number | null; gradedUnits: number };
}) {
  return (
    <div className={tileCls}>
      <p className={tileNumCls}>
        {summary.gpa === null ? "—" : summary.gpa.toFixed(2)}
      </p>
      <p className={tileLabelCls}>GPA (unofficial)</p>
      <p className="mt-1.5 text-xs leading-4 text-stone">
        {summary.gpa === null
          ? "Add a grade to a finished course."
          : `From ${summary.gradedUnits} graded units.`}
      </p>
    </div>
  );
}

/* --- Add forms ------------------------------------------------------------ */

function AddCourse({
  mode,
  onAdd,
}: {
  mode: TrackerMode;
  onAdd: (c: Course) => void;
}) {
  const [name, setName] = useState("");
  const [units, setUnits] = useState("3");
  const [term, setTerm] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAdd({
          id: newId(),
          name: name.trim().slice(0, 80),
          units,
          term: term.trim().slice(0, 30),
          status: "taking",
          transferable: false,
          grade: "",
        });
        setName("");
        setUnits("3");
        setTerm("");
      }}
      className="mt-4 flex flex-wrap items-center gap-2"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={
          mode === "hs"
            ? "Class name — “AP Biology”"
            : "Course name — “English 1A”"
        }
        className="min-w-0 flex-1 basis-52 rounded-lg border-2 border-ink/15 bg-cream px-3.5 py-2 text-sm text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
      />
      <input
        value={units}
        onChange={(e) => setUnits(e.target.value)}
        inputMode="decimal"
        aria-label="Units"
        className="w-16 rounded-lg border-2 border-ink/15 bg-cream px-3 py-2 text-center text-sm font-semibold text-ink focus:border-ink focus:outline-none"
      />
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Fall 2026"
        className="w-28 rounded-lg border-2 border-ink/15 bg-cream px-3 py-2 text-sm text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
      />
      <button
        type="submit"
        disabled={!name.trim()}
        className="btn-ink inline-flex items-center gap-1.5 rounded-md bg-amber px-4 py-2 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
      >
        <Plus className="h-4 w-4" />
        Add {mode === "hs" ? "class" : "course"}
      </button>
    </form>
  );
}

function AddApp({ onAdd }: { onAdd: (a: ScholarshipApp) => void }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [due, setDue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAdd({
          id: newId(),
          name: name.trim().slice(0, 80),
          amount: amount.trim().slice(0, 12),
          due: due.trim().slice(0, 30),
          status: "planning",
        });
        setName("");
        setAmount("");
        setDue("");
      }}
      className="mt-4 flex flex-wrap items-center gap-2"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Scholarship name — “Dell Scholars”"
        className="min-w-0 flex-1 basis-52 rounded-lg border-2 border-ink/15 bg-cream px-3.5 py-2 text-sm text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
      />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        inputMode="decimal"
        placeholder="$"
        aria-label="Award amount"
        className="w-24 rounded-lg border-2 border-ink/15 bg-cream px-3 py-2 text-sm font-semibold text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
      />
      <input
        value={due}
        onChange={(e) => setDue(e.target.value)}
        placeholder="Due — “March 1”"
        aria-label="Deadline"
        className="w-32 rounded-lg border-2 border-ink/15 bg-cream px-3 py-2 text-sm text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
      />
      <button
        type="submit"
        disabled={!name.trim()}
        className="btn-ink inline-flex items-center gap-1.5 rounded-md bg-amber px-4 py-2 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
      >
        <Plus className="h-4 w-4" />
        Add application
      </button>
    </form>
  );
}

function AddTodo({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text.trim().slice(0, 140));
        setText("");
      }}
      className="mt-3 flex items-center gap-2"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a to-do…"
        className="min-w-0 flex-1 rounded-lg border-2 border-ink/15 bg-cream px-3.5 py-2 text-sm text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="btn-ink inline-flex items-center gap-1.5 rounded-md bg-amber px-4 py-2 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
      >
        <Plus className="h-4 w-4" />
        Add
      </button>
    </form>
  );
}
