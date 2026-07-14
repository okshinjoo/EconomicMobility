"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

// The project's real inbox, shown as a fallback link. Submissions send through
// Web3Forms (same moderated channel as the Ask/Community forms), so the form
// posts in-page instead of opening the visitor's email app. The access key is
// public by design (front-end submission key).
const CONTACT_EMAIL = "Help@economicmobilityproject.org";
const WEB3FORMS_ACCESS_KEY = "7fabe5df-806c-4348-b1a9-5a3bd206b692";

type Status = "idle" | "sending" | "done" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus("sending");

    // No key configured (e.g. local preview): confirm without sending.
    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("done");
      return;
    }
    try {
      // Web3Forms validates any field named `email` as a real address and
      // rejects the submission if it isn't one — so a blank email field
      // must be omitted, not sent as a placeholder string. Only include it
      // when the visitor gave a valid-looking address (for reply-to).
      const trimmedEmail = email.trim();
      const payload: Record<string, string> = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New message from ${name.trim() || "the website"}`,
        from_name: "Empower Contact Form",
        name: name.trim() || "Not given",
        message: message.trim(),
        // The `email` field must always be a VALID address or Web3Forms
        // rejects the submission — use the visitor's if given, else a
        // no-reply placeholder so no-email messages still send.
        email: trimmedEmail.includes("@")
          ? trimmedEmail
          : "noreply@economicmobilityproject.org",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({ success: res.ok }));
      setStatus(res.ok && data.success !== false ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border-2 border-forest/30 bg-forest/[0.06] p-6 text-center sm:p-8">
        <CheckCircle2 className="mx-auto h-10 w-10 text-forest" strokeWidth={1.75} />
        <p className="mt-3 font-display text-xl font-semibold text-ink">
          Thanks, we&apos;ve got it.
        </p>
        <p className="mt-1.5 text-sm leading-6 text-stone">
          Your message is on its way to us. If it needs a reply, we&apos;ll get
          back to you at the email you left.
        </p>
        <button
          type="button"
          onClick={() => {
            setName("");
            setEmail("");
            setMessage("");
            setStatus("idle");
          }}
          className="mt-5 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          Your name
        </label>
        <input
          id="contact-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jordan"
          className="w-full rounded-xl border border-sand bg-paper px-4 py-3 text-ink focus:border-amber focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          Your email{" "}
          <span className="font-normal text-stone">(so we can reply)</span>
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-sand bg-paper px-4 py-3 text-ink focus:border-amber focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="What's on your mind?"
          className="w-full resize-y rounded-xl border border-sand bg-paper px-4 py-3 text-ink focus:border-amber focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending" || !message.trim()}
        className="btn-ink inline-flex items-center gap-2 rounded-md bg-amber px-7 py-3.5 text-base font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Send message
      </button>
      <p className="text-xs leading-5 text-stone">
        Your message goes straight to our inbox and nowhere else. We never
        sell your data.{" "}
        <a
          href="/privacy"
          className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4"
        >
          privacy policy
        </a>
        .
      </p>
      {status === "error" && (
        <p className="text-sm font-medium text-terracotta">
          Something went wrong sending that. Please try again, or email us
          directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-terracotta underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}
      <p className="text-xs text-stone">
        Sends straight to us, no email app needed. You can also write directly
        to{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-semibold text-forest hover:text-amber-deep"
        >
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </form>
  );
}
