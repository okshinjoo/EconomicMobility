"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

/**
 * The "ask and check" habit from investor.gov, made one-click: type any
 * broker/adviser/firm name and jump straight to the two free official
 * lookups. No data leaves this page except the search you choose to open.
 */
export default function CheckBroker() {
  const [name, setName] = useState("");
  const q = encodeURIComponent(name.trim());

  return (
    <div className="card-ink rounded-2xl bg-cream p-6 lg:-rotate-[0.3deg]">
      <h3 className="font-display text-lg font-semibold text-ink">
        Check anyone selling investments
      </h3>
      <p className="mt-2 text-sm leading-6 text-stone">
        Every legitimate broker and investment adviser is in a public
        registry, with their license status and any complaints. Ten seconds
        here beats months of regret.
      </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name or firm, e.g. Jane Doe Advisors"
        className="mt-4 w-full rounded-lg border-2 border-sand bg-paper px-4 py-2.5 text-[0.95rem] text-ink placeholder:text-stone/50 focus:border-amber focus:outline-none"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={q ? `https://brokercheck.finra.org/search?searchTerm=${q}` : "https://brokercheck.finra.org"}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ink inline-flex items-center gap-1.5 rounded-md bg-amber px-4 py-2 text-sm font-bold text-ink"
        >
          FINRA BrokerCheck
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <a
          href="https://adviserinfo.sec.gov"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border-2 border-ink bg-cream px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-paper-deep"
        >
          SEC adviser lookup
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
      <p className="mt-3 text-xs leading-5 text-stone">
        Not listed, or pushing you to hurry? That answers the question.
      </p>
    </div>
  );
}
