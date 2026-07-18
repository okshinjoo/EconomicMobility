"use client";

// The AI mock interviewer's client side (July 17, 2026 — owner: "practice
// interviews, easy medium hard, different job positions, and an AI chatbot
// would talk to you"). Setup (position + difficulty) -> live interview ->
// end-and-debrief. Transcript lives in component state only: refresh
// forgets it, nothing is stored anywhere. 503 from the route (no API key)
// degrades to a pointer at the flip deck.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PaperPlaneTilt as Send, ArrowCounterClockwise as RotateCcw } from "@phosphor-icons/react/dist/ssr";

const POSITIONS = [
  "Retail & grocery",
  "Food service & cafés",
  "Camp counselor & childcare",
  "Office & internship",
  "Tutoring & after-school",
];

const DIFFICULTIES = [
  { id: "easy", label: "Easy", note: "A kind interviewer, no curveballs" },
  { id: "medium", label: "Medium", note: "Professional, with follow-ups" },
  { id: "hard", label: "Hard", note: "Brisk and probing — the full workout" },
] as const;

type Difficulty = (typeof DIFFICULTIES)[number]["id"];

interface Msg {
  role: "user" | "coach";
  text: string;
}

export default function MockInterview() {
  const [position, setPosition] = useState<string | null>(null);
  const [customPosition, setCustomPosition] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const effectivePosition = (position === "custom"
    ? customPosition.trim()
    : position
  )?.slice(0, 60);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, busy]);

  async function callApi(history: Msg[], finish = false): Promise<void> {
    setBusy(true);
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          position: effectivePosition,
          difficulty,
          history,
          finish,
        }),
      });
      if (res.status === 503) {
        setUnavailable(true);
        return;
      }
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { reply: string; done: boolean };
      setMessages([...history, { role: "coach", text: data.reply }]);
      if (data.done) setDone(true);
    } catch {
      setMessages([
        ...history,
        {
          role: "coach",
          text: "Sorry — I lost the thread for a second. Say that once more?",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function start() {
    if (!effectivePosition) return;
    setStarted(true);
    setMessages([]);
    setDone(false);
    void callApi([]);
  }

  function send() {
    const text = draft.trim();
    if (!text || busy || done) return;
    setDraft("");
    const history = [...messages, { role: "user" as const, text }];
    setMessages(history);
    void callApi(history);
  }

  function finishEarly() {
    if (busy || done) return;
    void callApi(messages, true);
    setDone(true);
  }

  function reset() {
    setStarted(false);
    setMessages([]);
    setDraft("");
    setDone(false);
    setPosition(null);
    setCustomPosition("");
  }

  if (unavailable) {
    return (
      <div className="card-ink rounded-2xl bg-cream p-6 text-center">
        <p className="font-display text-xl font-bold text-ink">
          The interviewer is off duty right now.
        </p>
        <p className="mt-2 text-sm leading-6 text-stone">
          The AI side of this tool isn&apos;t available at the moment. The{" "}
          <Link
            href="/students/careers/interview-practice"
            className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4"
          >
            Interview Practice deck
          </Link>{" "}
          works without it — same questions, flip cards, no waiting.
        </p>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="card-ink rounded-2xl bg-cream p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">
          Set up your interview
        </p>
        <p className="mt-3 text-sm font-semibold text-ink">
          What kind of job?
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {POSITIONS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPosition(p)}
              aria-pressed={position === p}
              className={`rounded-md border-2 px-3 py-1.5 text-sm font-semibold transition-colors ${
                position === p
                  ? "border-ink bg-forest text-cream"
                  : "border-ink/20 bg-paper text-ink hover:border-ink/50"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPosition("custom")}
            aria-pressed={position === "custom"}
            className={`rounded-md border-2 px-3 py-1.5 text-sm font-semibold transition-colors ${
              position === "custom"
                ? "border-ink bg-forest text-cream"
                : "border-ink/20 bg-paper text-ink hover:border-ink/50"
            }`}
          >
            Something else…
          </button>
        </div>
        {position === "custom" && (
          <input
            type="text"
            value={customPosition}
            onChange={(e) => setCustomPosition(e.target.value)}
            maxLength={60}
            placeholder="Type the job — “movie theater usher”, “vet clinic assistant”…"
            className="mt-3 w-full rounded-md border-2 border-ink/20 bg-paper px-3 py-2 text-sm text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
          />
        )}

        <p className="mt-5 text-sm font-semibold text-ink">How tough?</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDifficulty(d.id)}
              aria-pressed={difficulty === d.id}
              className={`rounded-md border-2 p-3 text-left transition-colors ${
                difficulty === d.id
                  ? "border-ink bg-forest text-cream"
                  : "border-ink/20 bg-paper text-ink hover:border-ink/50"
              }`}
            >
              <span className="block text-sm font-bold">{d.label}</span>
              <span
                className={`mt-0.5 block text-xs leading-5 ${
                  difficulty === d.id ? "text-cream/75" : "text-stone"
                }`}
              >
                {d.note}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={start}
          disabled={!effectivePosition}
          className="btn-ink mt-6 rounded-md bg-amber px-6 py-3 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          Start the interview
        </button>
        <p className="mt-4 text-xs leading-5 text-stone">
          Your answers go to an AI model (Claude, by Anthropic) to run the
          interview — details in the{" "}
          <Link
            href="/privacy"
            className="underline decoration-amber decoration-2 underline-offset-2"
          >
            privacy policy
          </Link>
          . The practice lives in this tab only; nothing is saved. Use a
          made-up name if one comes up.
        </p>
      </div>
    );
  }

  return (
    <div className="card-ink flex flex-col rounded-2xl bg-cream">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink/10 px-5 py-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone">
          {effectivePosition} ·{" "}
          <span className="text-terracotta">{difficulty}</span>
        </p>
        {!done ? (
          <button
            type="button"
            onClick={finishEarly}
            disabled={busy || messages.filter((m) => m.role === "user").length === 0}
            className="text-xs font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink disabled:opacity-40"
          >
            End &amp; get feedback
          </button>
        ) : (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            New interview
          </button>
        )}
      </div>

      <div className="flex max-h-[28rem] min-h-[16rem] flex-col gap-3 overflow-y-auto p-5">
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "coach"
                ? "max-w-[85%] self-start rounded-xl rounded-tl-sm border-2 border-ink/10 bg-paper px-4 py-2.5 text-sm leading-6 text-ink"
                : "max-w-[85%] self-end rounded-xl rounded-tr-sm bg-forest px-4 py-2.5 text-sm leading-6 text-cream"
            }
          >
            {m.text}
          </div>
        ))}
        {busy && (
          <div className="max-w-[85%] self-start rounded-xl rounded-tl-sm border-2 border-ink/10 bg-paper px-4 py-2.5 text-sm text-stone">
            …
          </div>
        )}
        <div ref={endRef} />
      </div>

      {!done && (
        <div className="flex items-end gap-2 border-t-2 border-ink/10 p-4">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={2}
            placeholder="Answer like you're in the room — out loud first, then type it."
            className="min-h-[3rem] flex-1 resize-y rounded-md border-2 border-ink/20 bg-paper px-3 py-2 text-sm leading-6 text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
          />
          <button
            type="button"
            onClick={send}
            disabled={busy || !draft.trim()}
            aria-label="Send answer"
            className="btn-ink inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-amber text-ink disabled:opacity-40"
          >
            <Send className="h-5 w-5" weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
}
