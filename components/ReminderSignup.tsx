"use client";

// The reminder signup form (July 2026): email + two separate opt-ins
// (deadline reminders / occasional tips — consent stays granular). Only
// mounted when the server saw the sending env, so there's never a dead
// form on an unconfigured site.

import { useState } from "react";
import Link from "next/link";
import { deadlines as allDeadlines } from "@/lib/deadlines";

type Status = "idle" | "sending" | "done" | "error";

export default function ReminderSignup() {
  const [email, setEmail] = useState("");
  const [picked, setPicked] = useState<Set<string>>(
    () => new Set(allDeadlines.map((d) => d.id))
  );
  const [tips, setTips] = useState(false);
  const [collegeAdvice, setCollegeAdvice] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, deadlineIds: [...picked], tips, collegeAdvice }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something hiccuped — try again in a minute.");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server — check your connection.");
    }
  }

  if (status === "done") {
    return (
      <div className="card-ink rounded-2xl bg-cream p-6 sm:p-7">
        <p className="font-display text-xl font-bold text-ink">
          You&apos;re on the list.
        </p>
        <p className="mt-2 text-sm leading-6 text-stone">
          We&apos;ll nudge you a few weeks before each deadline that moves
          real money — FAFSA opening, tax day, scholarship season. Every
          email has a one-click unsubscribe, and your address is never
          shared or sold.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-ink rounded-2xl bg-cream p-6 sm:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1 basis-60 rounded-lg border-2 border-ink/15 bg-paper px-4 py-2.5 text-base text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending" || !email.trim()}
          className="btn-ink inline-flex items-center rounded-md bg-amber px-6 py-2.5 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          {status === "sending" ? "Signing you up…" : "Remind me"}
        </button>
      </div>
      <fieldset className="mt-4">
        <legend className="text-xs font-bold uppercase tracking-[0.16em] text-stone">
          Nudge me about
        </legend>
        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          {allDeadlines.map((d) => (
            <label
              key={d.id}
              className="flex cursor-pointer items-start gap-2 text-sm font-semibold text-ink"
            >
              <input
                type="checkbox"
                checked={picked.has(d.id)}
                onChange={(e) =>
                  setPicked((prev) => {
                    const next = new Set(prev);
                    if (e.target.checked) next.add(d.id);
                    else next.delete(d.id);
                    return next;
                  })
                }
                className="mt-0.5 h-4 w-4 accent-forest"
              />
              <span>
                {d.title}{" "}
                <span className="font-normal text-stone">({d.when})</span>
              </span>
            </label>
          ))}
          <label className="flex cursor-pointer items-start gap-2 text-sm font-semibold text-ink">
            <input
              type="checkbox"
              checked={collegeAdvice}
              onChange={(e) => setCollegeAdvice(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-forest"
            />
            <span>
              College advice{" "}
              <span className="font-normal text-stone">
                (aid-season heads-ups and what-to-do-now notes, written by a human)
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-2 text-sm font-semibold text-ink">
            <input
              type="checkbox"
              checked={tips}
              onChange={(e) => setTips(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-forest"
            />
            <span>
              Occasional money tips{" "}
              <span className="font-normal text-stone">
                (rare, and written by a human)
              </span>
            </span>
          </label>
        </div>
      </fieldset>
      {status === "error" && (
        <p className="mt-2 text-sm font-semibold text-terracotta">{message}</p>
      )}
      <p className="mt-3 text-xs leading-5 text-stone">
        A handful of emails a year, each one about a date that moves real
        money. One-click unsubscribe on every email, and we never sell your
        data —{" "}
        <Link
          href="/privacy"
          className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4"
        >
          privacy
        </Link>
        .
      </p>
    </form>
  );
}
