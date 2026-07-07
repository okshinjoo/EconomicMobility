"use client";

import { useEffect, useState } from "react";
import { US_STATES } from "@/lib/taxData";
import { stateResources, type StateLink } from "@/lib/stateResources";
import { STORAGE_KEYS, loadJSON, saveJSON } from "@/lib/storage";

const CATEGORIES: {
  key: "benefits" | "unemployment" | "localHelp";
  label: string;
  blurb: string;
}[] = [
  {
    key: "benefits",
    label: "Benefits & social services",
    blurb: "Apply for SNAP food help, Medicaid, and cash assistance.",
  },
  {
    key: "unemployment",
    label: "Unemployment",
    blurb: "File a claim if you've lost work or had your hours cut.",
  },
  {
    key: "localHelp",
    label: "Local help (211)",
    blurb: "Free, confidential help with food, rent, and utilities near you.",
  },
];

export default function StateResources() {
  const [code, setCode] = useState("");

  // Hydrate from a prior pick, falling back to the state saved in the budget
  // calculator so the picker feels like it already knows where you are.
  useEffect(() => {
    const saved = loadJSON<string>(STORAGE_KEYS.resourcesState);
    if (saved && stateResources[saved]) {
      setCode(saved);
      return;
    }
    const budget = loadJSON<{ stateCode?: string }>(STORAGE_KEYS.budget);
    if (budget?.stateCode && stateResources[budget.stateCode]) {
      setCode(budget.stateCode);
    }
  }, []);

  function onChange(next: string) {
    setCode(next);
    if (next) saveJSON(STORAGE_KEYS.resourcesState, next);
  }

  const data = code ? stateResources[code] : undefined;
  const stateName = US_STATES.find((s) => s.code === code)?.name;

  return (
    <div className="rounded-2xl border-2 border-ink bg-cream p-6 shadow-[7px_7px_0_#e7a33c] sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Find help in your state
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone">
            The national programs below point you to the right doors — but you
            apply through your <span className="font-semibold">state</span>.
            Pick yours for the official links that actually take your
            application.
          </p>
        </div>
        <span className="inline-block -rotate-2 rounded-lg border-2 border-ink bg-amber px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
          Start here
        </span>
      </div>

      <div className="mt-6 max-w-sm">
        <label
          htmlFor="state-resources-select"
          className="mb-1.5 block text-sm font-bold text-ink"
        >
          Your state
        </label>
        <select
          id="state-resources-select"
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border-2 border-ink bg-paper px-4 py-3 font-semibold text-ink transition-colors focus:border-forest"
        >
          <option value="">Choose your state…</option>
          {US_STATES.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {data && (
        <div className="mt-7">
          <p className="text-sm font-bold uppercase tracking-wide text-forest">
            Official links for {stateName}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const link: StateLink = data[cat.key];
              return (
                <a
                  key={cat.key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-ink group flex flex-col rounded-xl bg-paper p-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  <span className="text-xs font-bold uppercase tracking-wide text-forest">
                    {cat.label}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-tight text-ink underline decoration-amber decoration-2 underline-offset-4">
                    {link.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone">
                    {cat.blurb}
                  </p>
                </a>
              );
            })}
          </div>
          <p className="mt-4 text-xs leading-6 text-stone">
            These are official {stateName} government sites. If a link has moved,
            search the program name plus &quot;{stateName}&quot; — and never pay
            anyone to file an application that&apos;s free.
          </p>
        </div>
      )}
    </div>
  );
}
