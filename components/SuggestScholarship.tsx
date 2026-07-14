"use client";

// Suggest-a-scholarship (July 2026, owner call: grow the in-house database
// with community submissions, approve-first like everything else). POSTs to
// the shared Web3Forms inbox tagged for scholarships@; nothing appears on
// the site until the owner verifies it against the official page and adds
// it to lib/scholarships.ts. Same key + preview-mode pattern as AskQuestion.

import { useState } from "react";

const WEB3FORMS_ACCESS_KEY = "7fabe5df-806c-4348-b1a9-5a3bd206b692";

type Status = "idle" | "sending" | "done" | "error";

export default function SuggestScholarship() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("done"); // preview mode: confirm without sending
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Scholarship suggestion (for scholarships@)",
          from_name: "Empower Scholarship Suggestions",
          scholarship_name: name.trim().slice(0, 120),
          official_url: url.trim().slice(0, 300),
          note: note.trim().slice(0, 500),
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="rounded-xl border border-sand bg-cream p-4 text-sm leading-6 text-stone">
        Thank you! We&apos;ll check it against the official page, and if it
        clears the bar (free, real, no data harvesting) it joins the list.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-sand bg-cream p-4">
      <p className="text-sm font-bold text-ink">
        Know a real scholarship we&apos;re missing?
      </p>
      <p className="mt-1 text-xs leading-5 text-stone">
        Every suggestion gets checked by hand before it appears: free to
        apply, official page live, no strings.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Scholarship name"
          className="min-w-0 flex-1 basis-48 rounded-lg border-2 border-ink/15 bg-paper px-3 py-2 text-sm text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          type="url"
          placeholder="Official page, https://…"
          className="min-w-0 flex-1 basis-56 rounded-lg border-2 border-ink/15 bg-paper px-3 py-2 text-sm text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
        />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Anything we should know? (optional)"
          className="min-w-0 flex-1 basis-64 rounded-lg border-2 border-ink/15 bg-paper px-3 py-2 text-sm text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending" || !name.trim() || !url.trim()}
          className="btn-ink inline-flex items-center rounded-md bg-amber px-5 py-2 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          {status === "sending" ? "Sending…" : "Suggest it"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs font-semibold text-terracotta">
          Couldn&apos;t send just now. You can also email{" "}
          <a href="mailto:scholarships@economicmobilityproject.org" className="underline">
            scholarships@economicmobilityproject.org
          </a>
          .
        </p>
      )}
    </form>
  );
}
