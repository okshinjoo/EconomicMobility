"use client";

import { useState } from "react";
import { Send, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { topics } from "@/lib/topics";

// ─────────────────────────────────────────────────────────────────────────────
// SET UP SUBMISSIONS (≈2 minutes, free, no account):
//   1. Go to https://web3forms.com and enter help@economicmobilityproject.org
//   2. Web3Forms emails you an "access key" (a long code).
//   3. Paste it between the quotes below and redeploy.
// Submitted questions then arrive in that inbox. Prefer Formspree/Tally instead?
// Any service that takes a JSON POST works — swap the fetch in handleSubmit.
//
// Until this is set, the form runs in PREVIEW MODE: it thanks the visitor but
// does NOT send anywhere.
const WEB3FORMS_ACCESS_KEY = "";
// ─────────────────────────────────────────────────────────────────────────────

type Status = "idle" | "sending" | "done" | "error";

export default function AskQuestion() {
  const [question, setQuestion] = useState("");
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setStatus("sending");

    if (!WEB3FORMS_ACCESS_KEY) {
      // Not connected yet — confirm to the visitor without sending anywhere.
      setStatus("done");
      return;
    }
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New question from Empower",
          from_name: "Empower — Ask a Question",
          topic: topic || "Not specified",
          email: email.trim() || "Anonymous",
          question: question.trim(),
        }),
      });
      const data = await res.json().catch(() => ({ success: res.ok }));
      setStatus(res.ok && data.success !== false ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setQuestion("");
    setTopic("");
    setEmail("");
    setStatus("idle");
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl border border-forest/30 bg-forest/5 p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest/15 text-forest">
          <CheckCircle2 className="h-7 w-7" strokeWidth={1.75} />
        </span>
        <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
          Thanks for asking.
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone">
          We read every question. The most common and most useful ones get
          answered right here — keep an eye on this page.
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-sand bg-cream px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
        >
          Ask another question
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-sand bg-cream p-6 sm:p-8"
    >
      <div>
        <label
          htmlFor="ask-question"
          className="mb-1.5 block text-sm font-semibold text-ink"
        >
          Your question
        </label>
        <textarea
          id="ask-question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          rows={4}
          placeholder="No question is too basic. Ask anything about money — budgeting, credit, taxes, school, scams, benefits…"
          className="w-full resize-y rounded-xl border border-sand bg-paper px-4 py-3 text-ink placeholder:text-stone/60 focus:border-forest focus:outline-none"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="ask-topic"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            Topic <span className="font-normal text-stone">(optional)</span>
          </label>
          <select
            id="ask-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-xl border border-sand bg-paper px-4 py-3 text-ink focus:border-forest focus:outline-none"
          >
            <option value="">I'm not sure / other</option>
            {topics.map((t) => (
              <option key={t.id} value={t.title}>
                {t.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="ask-email"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            Email <span className="font-normal text-stone">(optional)</span>
          </label>
          <input
            id="ask-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Only if you'd like a reply"
            className="w-full rounded-xl border border-sand bg-paper px-4 py-3 text-ink placeholder:text-stone/60 focus:border-forest focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-xs leading-5 text-stone">
          <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest" />
          Anonymous by default — no name or account needed. Leave email blank to
          stay fully anonymous.
        </p>
        <button
          type="submit"
          disabled={sending || !question.trim()}
          className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-cream transition-all duration-200 hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {sending ? "Sending…" : "Submit anonymously"}
        </button>
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm text-ink">
          Something went wrong sending that. Please try again in a moment.
        </p>
      )}
    </form>
  );
}
