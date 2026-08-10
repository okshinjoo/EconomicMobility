"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { MapPin, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import {
  readCareerStatePreference,
  saveCareerStatePreference,
  subscribeCareerStatePreference,
} from "@/lib/careerStatePreference";

interface WageRecord {
  annual?: number;
  hourly?: number;
}

interface StateWageData {
  vintage: string;
  sourceUrl: string;
  wages: Record<string, Record<string, WageRecord>>;
}

const STATES = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
  ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"],
  ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
  ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"],
  ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
  ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
  ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"],
  ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"],
  ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"],
  ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"],
  ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
] as const;

let wageDataPromise: Promise<StateWageData> | null = null;

export function loadCareerStateWages(): Promise<StateWageData> {
  wageDataPromise ??= fetch("/data/career-state-wages-2025.json").then((response) => {
    if (!response.ok) throw new Error("State wage data could not be loaded.");
    return response.json() as Promise<StateWageData>;
  });
  return wageDataPromise;
}

export const CAREER_STATE_OPTIONS = STATES;

function deltaLabel(local: number, national: number) {
  const difference = Math.round(((local - national) / national) * 100);
  if (difference === 0) return "about the same as the national median";
  return `${Math.abs(difference)}% ${difference > 0 ? "above" : "below"} the national median`;
}

export default function CareerLocalPay({
  careerId,
  nationalAnnual,
  nationalHourly,
}: {
  careerId: string;
  nationalAnnual: number | null;
  nationalHourly?: number;
}) {
  const state = useSyncExternalStore(
    subscribeCareerStatePreference,
    readCareerStatePreference,
    () => ""
  );
  const [result, setResult] = useState<{
    state: string;
    record: WageRecord | null;
    failed: boolean;
  } | null>(null);

  useEffect(() => {
    if (!state) {
      return;
    }
    let active = true;
    loadCareerStateWages()
      .then((data) => {
        if (active) setResult({ state, record: data.wages[state]?.[careerId] ?? null, failed: false });
      })
      .catch(() => {
        if (active) setResult({ state, record: null, failed: true });
      });
    return () => {
      active = false;
    };
  }, [careerId, state]);

  const loading = Boolean(state) && result?.state !== state;
  const failed = result?.state === state && result.failed;
  const record = result?.state === state ? result.record : undefined;

  const comparison =
    record?.annual && nationalAnnual
      ? deltaLabel(record.annual, nationalAnnual)
      : record?.hourly && nationalHourly
        ? deltaLabel(record.hourly, nationalHourly)
        : null;

  return (
    <div className="mt-6 border-t-2 border-ink/15 pt-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
            <MapPin className="h-5 w-5 text-terracotta" weight="fill" />
            What it pays in your state
          </h3>
          <p className="mt-1 max-w-xl text-sm leading-6 text-stone">
            Statewide medians are a better starting point than the national number. Your city and experience still matter.
          </p>
        </div>
        <label className="flex min-w-56 items-center gap-2 rounded-lg border-2 border-ink/20 bg-cream px-3 focus-within:border-ink">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">State</span>
          <select
            value={state}
            onChange={(event) => {
              const next = event.target.value;
              saveCareerStatePreference(next);
            }}
            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm font-semibold text-ink focus:outline-none"
          >
            <option value="">Choose a state</option>
            {STATES.map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </label>
      </div>

      {state && (
        <div className="mt-4 min-h-16" aria-live="polite">
          {loading ? (
            <p className="text-sm font-medium text-stone">Loading the official state estimate…</p>
          ) : failed ? (
            <p className="text-sm font-medium text-terracotta">The state estimate could not be loaded. Try again in a moment.</p>
          ) : record ? (
            <div className="flex flex-wrap items-baseline gap-x-7 gap-y-2">
              {record.annual && (
                <div>
                  <span className="font-display text-3xl font-bold tabular-nums text-forest">
                    ${record.annual.toLocaleString()}
                  </span>
                  <span className="ml-2 text-sm font-semibold text-stone">median / year</span>
                </div>
              )}
              {record.hourly && (
                <div>
                  <span className="font-display text-xl font-bold tabular-nums text-ink">
                    ${record.hourly.toFixed(2)}
                  </span>
                  <span className="ml-1.5 text-sm font-semibold text-stone">/ hour</span>
                </div>
              )}
              {comparison && <p className="w-full text-sm font-semibold text-ink/75">That is {comparison}.</p>}
            </div>
          ) : (
            <p className="text-sm leading-6 text-stone">
              BLS does not publish a reliable statewide estimate for this occupation in the selected state. That usually means the sample is too small—not that the job does not exist there.
            </p>
          )}
        </div>
      )}

      <a
        href="https://www.bls.gov/oes/current/oessrcma.htm"
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-flex items-center gap-1 text-[13px] font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
      >
        BLS state wage tables
        <ArrowSquareOut className="h-3.5 w-3.5" weight="bold" />
      </a>
    </div>
  );
}
