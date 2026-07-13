"use client";

// The student tracker UI: courses with units/status/grade/transferability,
// the derived money-and-progress stats, and a freeform to-do list. All
// state lives in one synced snapshot (lib/studentTracker). Renders nothing
// until mounted (client data, no hydration mismatch).

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Plus, Trash2 } from "lucide-react";
import {
  loadTracker,
  saveTracker,
  summarize,
  unitsOf,
  GRADES,
  TRANSFER_UNITS,
  type Course,
  type CourseStatus,
  type Grade,
  type TrackerData,
} from "@/lib/studentTracker";

const STATUS_LABELS: Record<CourseStatus, string> = {
  planned: "Planned",
  taking: "Taking now",
  done: "Done",
};

function newId(): string {
  return `c${Math.random().toString(36).slice(2, 9)}`;
}

const selectCls =
  "rounded-md border-2 border-ink/15 bg-cream px-2 py-1.5 text-sm font-semibold text-ink focus:border-ink focus:outline-none";

export default function StudentTracker() {
  const [data, setData] = useState<TrackerData | null>(null);

  useEffect(() => {
    setData(loadTracker());
  }, []);

  const update = (next: TrackerData) => {
    setData(next);
    saveTracker(next);
  };

  const summary = useMemo(() => (data ? summarize(data) : null), [data]);

  if (!data || !summary) return null;

  const unitsBanked = summary.unitsDone;
  const pct = Math.min(100, (unitsBanked / TRANSFER_UNITS) * 100);

  return (
    <div>
      {/* The numbers */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="card-ink rounded-xl bg-cream p-5">
          <p className="font-display text-3xl font-bold text-forest">
            {unitsBanked}
            <span className="text-lg text-stone">/{TRANSFER_UNITS}</span>
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-stone">
            Units banked toward transfer
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sand">
            <div
              className="h-full rounded-full bg-forest transition-[width] duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          {summary.unitsTaking > 0 && (
            <p className="mt-1.5 text-xs text-stone">
              +{summary.unitsTaking} in progress
            </p>
          )}
        </div>

        <div className="card-ink rounded-xl bg-cream p-5">
          <p className="font-display text-3xl font-bold text-forest">
            {summary.gpa === null ? "—" : summary.gpa.toFixed(2)}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-stone">
            GPA (unofficial)
          </p>
          <p className="mt-1.5 text-xs leading-4 text-stone">
            {summary.gpa === null
              ? "Add a grade to a finished course."
              : `From ${summary.gradedUnits} graded units.`}
          </p>
        </div>

        <div className="card-ink rounded-xl bg-cream p-5">
          <p className="font-display text-3xl font-bold text-forest">
            {summary.unitsTransferable}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-stone">
            Transferable units
          </p>
          {summary.unitsAtRisk > 0 && (
            <p className="mt-1.5 text-xs font-semibold text-terracotta">
              {summary.unitsAtRisk} units not confirmed — check ASSIST
            </p>
          )}
        </div>

        <div className="card-ink rounded-xl bg-cream p-5">
          <p className="font-display text-3xl font-bold text-forest">
            ${Math.round(summary.dollarsProtected).toLocaleString("en-US")}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-stone">
            Not paid twice
          </p>
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
        </div>
      </div>

      {/* Courses */}
      <div className="mt-10">
        <h2 className="font-display text-2xl font-bold text-ink">
          Your courses
        </h2>
        <p className="mt-1.5 text-sm leading-6 text-stone">
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
                Transfers
              </label>
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
          onAdd={(course) =>
            update({ ...data, courses: [...data.courses, course] })
          }
        />
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
        scale — your transcript is the real record. And transferability
        always belongs to the agreement, not this page:{" "}
        <Link
          href="/learn/college/community-college-transfer-money"
          className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
        >
          the transfer money guide
        </Link>{" "}
        shows how to check it.
      </p>
    </div>
  );
}

/* --- Add forms ------------------------------------------------------------ */

function AddCourse({ onAdd }: { onAdd: (c: Course) => void }) {
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
        placeholder="Course name — “English 1A”"
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
        Add course
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
