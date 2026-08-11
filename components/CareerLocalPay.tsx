"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { MapPin, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import {
  readCareerMetroPreference,
  readCareerStatePreference,
  saveCareerMetroPreference,
  saveCareerStatePreference,
  subscribeCareerMetroPreference,
  subscribeCareerStatePreference,
} from "@/lib/careerStatePreference";
import {
  realityResultFromSnapshot,
  type RealityCheckSnapshot,
} from "@/lib/realityCheck";
import { loadJSON, STORAGE_KEYS } from "@/lib/storage";
import { trackCareerEvent } from "@/lib/careerAnalytics";

export interface WageRecord {
  annual?: number;
  hourly?: number;
}

export interface StateWageData {
  vintage: string;
  sourceUrl: string;
  wages: Record<string, Record<string, WageRecord>>;
}

export interface MetroArea {
  code: string;
  name: string;
  sourceUrl: string;
}

export interface MetroWageData {
  vintage: string;
  sourceUrl: string;
  state: string;
  areas: MetroArea[];
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
const metroDataPromises = new Map<string, Promise<MetroWageData>>();

export function loadCareerStateWages(): Promise<StateWageData> {
  wageDataPromise ??= fetch("/data/career-state-wages-2025.json").then((response) => {
    if (!response.ok) throw new Error("State wage data could not be loaded.");
    return response.json() as Promise<StateWageData>;
  });
  return wageDataPromise;
}

export function loadCareerMetroWages(state: string): Promise<MetroWageData> {
  let request = metroDataPromises.get(state);
  if (!request) {
    request = fetch(`/data/career-metro-wages/${state}.json`).then((response) => {
      if (!response.ok) throw new Error("Metro wage data could not be loaded.");
      return response.json() as Promise<MetroWageData>;
    });
    metroDataPromises.set(state, request);
  }
  return request;
}

export const CAREER_STATE_OPTIONS = STATES;

function deltaLabel(local: number, national: number) {
  const difference = Math.round(((local - national) / national) * 100);
  if (difference === 0) return "about the same as the national median";
  return `${Math.abs(difference)}% ${difference > 0 ? "above" : "below"} the national median`;
}

function targetDeltaLabel(pay: number, target: number) {
  const difference = Math.round((pay - target) / 1000) * 1000;
  if (Math.abs(difference) < 1000) return "roughly matches your saved lifestyle target";
  return `${difference > 0 ? "about" : "roughly"} $${Math.abs(difference).toLocaleString()} ${difference > 0 ? "above" : "short of"} your saved lifestyle target`;
}

function readRealityTarget(): number | null {
  const snapshot = loadJSON<RealityCheckSnapshot>(STORAGE_KEYS.realityCheck);
  return realityResultFromSnapshot(snapshot)?.grossSalary ?? null;
}

function subscribeRealityTarget(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
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
  const metro = useSyncExternalStore(
    subscribeCareerMetroPreference,
    readCareerMetroPreference,
    () => ""
  );
  const [stateResult, setStateResult] = useState<{
    state: string;
    record: WageRecord | null;
    failed: boolean;
  } | null>(null);
  const [metroResult, setMetroResult] = useState<{
    state: string;
    data: MetroWageData | null;
    failed: boolean;
  } | null>(null);
  const lifestyleTarget = useSyncExternalStore(
    subscribeRealityTarget,
    readRealityTarget,
    () => null
  );

  useEffect(() => {
    if (!state) return;
    let active = true;
    Promise.all([loadCareerStateWages(), loadCareerMetroWages(state)])
      .then(([stateData, metroData]) => {
        if (!active) return;
        setStateResult({ state, record: stateData.wages[state]?.[careerId] ?? null, failed: false });
        setMetroResult({ state, data: metroData, failed: false });
      })
      .catch(() => {
        if (!active) return;
        setStateResult({ state, record: null, failed: true });
        setMetroResult({ state, data: null, failed: true });
      });
    return () => {
      active = false;
    };
  }, [careerId, state]);

  const loading = Boolean(state) && (stateResult?.state !== state || metroResult?.state !== state);
  const failed = stateResult?.state === state && stateResult.failed;
  const stateRecord = stateResult?.state === state ? stateResult.record : undefined;
  const metroData = metroResult?.state === state ? metroResult.data : null;
  const selectedMetro = metroData?.areas.some((area) => area.code === metro) ? metro : "";
  const metroArea = metroData?.areas.find((area) => area.code === selectedMetro);
  const metroRecord = selectedMetro ? metroData?.wages[selectedMetro]?.[careerId] ?? null : undefined;
  const localRecord = metroRecord ?? stateRecord;

  const comparison =
    metroRecord?.annual && nationalAnnual
      ? deltaLabel(metroRecord.annual, nationalAnnual)
      : metroRecord?.hourly && nationalHourly
        ? deltaLabel(metroRecord.hourly, nationalHourly)
        : stateRecord?.annual && nationalAnnual
          ? deltaLabel(stateRecord.annual, nationalAnnual)
          : stateRecord?.hourly && nationalHourly
            ? deltaLabel(stateRecord.hourly, nationalHourly)
            : null;
  const targetComparison =
    lifestyleTarget && localRecord?.annual
      ? targetDeltaLabel(localRecord.annual, lifestyleTarget)
      : null;

  return (
    <div className="mt-6 border-t-2 border-ink/15 pt-5">
      <div>
        <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
          <MapPin className="h-5 w-5 text-terracotta" weight="fill" />
          What it pays near you
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-stone">
          Compare the national number with a statewide estimate and, where BLS publishes one, the metro where you may work.
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2 rounded-lg border-2 border-ink/20 bg-cream px-3 focus-within:border-ink">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">State</span>
          <select
            value={state}
            onChange={(event) => {
              saveCareerStatePreference(event.target.value);
              saveCareerMetroPreference("");
              trackCareerEvent("Career local pay selected", {
                level: "state",
                has_selection: Boolean(event.target.value),
              });
            }}
            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm font-semibold text-ink focus:outline-none"
          >
            <option value="">Choose a state</option>
            {STATES.map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-lg border-2 border-ink/20 bg-cream px-3 focus-within:border-ink">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">Metro</span>
          <select
            value={selectedMetro}
            disabled={!metroData?.areas.length}
            onChange={(event) => {
              saveCareerMetroPreference(event.target.value);
              trackCareerEvent("Career local pay selected", {
                level: "metro",
                has_selection: Boolean(event.target.value),
              });
            }}
            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm font-semibold text-ink focus:outline-none disabled:text-stone/60"
          >
            <option value="">{state ? "Statewide only" : "Choose a state first"}</option>
            {metroData?.areas.map((area) => (
              <option key={area.code} value={area.code}>{area.name}</option>
            ))}
          </select>
        </label>
      </div>

      {state && (
        <div className="mt-4 min-h-16" aria-live="polite">
          {loading ? (
            <p className="text-sm font-medium text-stone">Loading the official local estimates…</p>
          ) : failed ? (
            <p className="text-sm font-medium text-terracotta">The local estimates could not be loaded. Try again in a moment.</p>
          ) : localRecord ? (
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone">
                {metroArea?.name ?? `${STATES.find(([code]) => code === state)?.[1]} statewide`}
              </p>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-7 gap-y-2">
                {localRecord.annual && (
                  <div>
                    <span className="font-display text-3xl font-bold tabular-nums text-forest">
                      ${localRecord.annual.toLocaleString()}
                    </span>
                    <span className="ml-2 text-sm font-semibold text-stone">median / year</span>
                  </div>
                )}
                {localRecord.hourly && (
                  <div>
                    <span className="font-display text-xl font-bold tabular-nums text-ink">
                      ${localRecord.hourly.toFixed(2)}
                    </span>
                    <span className="ml-1.5 text-sm font-semibold text-stone">/ hour</span>
                  </div>
                )}
                {comparison && <p className="w-full text-sm font-semibold text-ink/75">That is {comparison}.</p>}
              </div>
            </div>
          ) : (
            <p className="text-sm leading-6 text-stone">
              BLS does not publish a reliable estimate for this occupation in the selected area. That usually means the sample is too small—not that the job does not exist there.
            </p>
          )}
        </div>
      )}

      <div className="mt-4 border-l-4 border-amber pl-4">
        {lifestyleTarget ? (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone">Your saved Reality Check</p>
            <p className="mt-1 text-sm font-semibold text-ink">
              Your lifestyle needs about ${lifestyleTarget.toLocaleString()} in gross annual pay.
              {targetComparison ? ` This local median ${targetComparison}.` : " Choose a published annual estimate above to compare it."}
            </p>
          </>
        ) : (
          <p className="text-sm leading-6 text-stone">
            Want a number that means something to you? <Link href="/students/tools/reality-check" className="font-bold text-forest underline decoration-amber decoration-2 underline-offset-4">Build your lifestyle target</Link>, then return here to compare it with local pay.
          </p>
        )}
      </div>

      <a
        href="https://www.bls.gov/oes/2025/may/oessrcma.htm"
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-1 text-[13px] font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
      >
        BLS metro and state wage tables
        <ArrowSquareOut className="h-3.5 w-3.5" weight="bold" />
      </a>
    </div>
  );
}
