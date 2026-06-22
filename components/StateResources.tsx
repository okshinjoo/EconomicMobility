"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  HeartHandshake,
  Briefcase,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { US_STATES } from "@/lib/taxData";
import { stateResources, type StateLink } from "@/lib/stateResources";
import { STORAGE_KEYS, loadJSON, saveJSON } from "@/lib/storage";

const ACCENT = "#0f5c46";

const CATEGORIES: {
  key: "benefits" | "unemployment" | "localHelp";
  icon: typeof HeartHandshake;
  label: string;
  blurb: string;
}[] = [
  {
    key: "benefits",
    icon: HeartHandshake,
    label: "Benefits & social services",
    blurb: "Apply for SNAP food help, Medicaid, and cash assistance.",
  },
  {
    key: "unemployment",
    icon: Briefcase,
    label: "Unemployment",
    blurb: "File a claim if you've lost work or had your hours cut.",
  },
  {
    key: "localHelp",
    icon: Phone,
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
    <div className="rounded-3xl border border-sand bg-cream p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <span
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
          style={{ background: `${ACCENT}1A`, color: ACCENT }}
        >
          <MapPin className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Find help in your state
          </h2>
          <p className="mt-1 text-sm leading-6 text-stone">
            The national programs above point you to the right doors — but you
            apply through your <span className="font-semibold">state</span>.
            Pick yours for the official links that actually take your
            application.
          </p>
        </div>
      </div>

      <div className="mt-6 max-w-sm">
        <label
          htmlFor="state-resources-select"
          className="mb-1.5 block text-sm font-semibold text-ink"
        >
          Your state
        </label>
        <select
          id="state-resources-select"
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-sand bg-paper px-4 py-3 text-ink shadow-sm transition-colors focus:border-forest"
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
          <p className="text-sm font-semibold uppercase tracking-wide text-stone">
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
                  className="group flex flex-col rounded-2xl border border-sand bg-paper p-5 transition-all duration-200 hover:-translate-y-1 hover:border-ink/20 hover:shadow-lg"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: `${ACCENT}14`, color: ACCENT }}
                  >
                    <cat.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="mt-3 text-xs font-semibold uppercase tracking-wide text-stone">
                    {cat.label}
                  </span>
                  <span className="mt-1 flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold leading-tight text-ink">
                      {link.label}
                    </h3>
                    <ArrowUpRight
                      className="h-4 w-4 flex-shrink-0 text-stone transition-colors group-hover:text-forest"
                      aria-hidden="true"
                    />
                  </span>
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
