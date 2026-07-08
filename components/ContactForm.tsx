"use client";

import { useState } from "react";
import { Send } from "lucide-react";

// The project's real inbox. With no backend, the form opens the visitor's email
// app pre-filled (mailto) — simple and reliable.
const CONTACT_EMAIL = "Help@economicmobilityproject.org";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${name || "the website"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ""}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
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
          Your email
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
        className="btn-ink inline-flex items-center gap-2 rounded-md bg-amber px-7 py-3.5 text-base font-bold text-ink"
      >
        Send message
        <Send className="h-4 w-4" />
      </button>
      <p className="text-xs text-stone">
        This opens your email app with the message ready to send. You can also
        write us directly at{" "}
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
