"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Plus, X, BookmarkSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import {
  careers,
  careerPayLabel,
  careerPayPeriod,
  EDUCATION_LABELS,
  growthLabel,
  type Career,
} from "@/lib/careers";
import { getCareerDetail } from "@/lib/careerDetails";
import { getCareerEnrichment, ONET_DATA_VINTAGE } from "@/lib/careerEnrichment";
import { getCareerWorkContext } from "@/lib/careerWorkContext";
import {
  CAREER_COST_SOURCE,
  biggestTradeoff,
  educationCostBaseline,
  physicalDemandLabel,
  remoteCompatibilityLabel,
  scheduleLabel,
  timeToEntry,
} from "@/lib/careerDecisionFacts";
import { readSavedCareerIds, SAVED_CAREERS_EVENT } from "@/lib/savedCareers";
import {
  CAREER_STATE_OPTIONS,
  loadCareerMetroWages,
  loadCareerStateWages,
  type MetroWageData,
  type WageRecord,
} from "@/components/CareerLocalPay";
import {
  readCareerMetroPreference,
  readCareerStatePreference,
  saveCareerMetroPreference,
  saveCareerStatePreference,
  subscribeCareerMetroPreference,
  subscribeCareerStatePreference,
} from "@/lib/careerStatePreference";
import { trackCareerEvent } from "@/lib/careerAnalytics";

const MAX_COMPARE = 4;
const JOB_ZONE: Record<number, string> = {
  1: "Little or no preparation",
  2: "Some preparation",
  3: "Medium preparation",
  4: "High preparation",
  5: "Extensive preparation",
};

function Value({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-medium leading-6 text-ink/85">{children}</span>;
}

export default function CareerCompare() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pendingId, setPendingId] = useState("");
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
  const [wageResult, setWageResult] = useState<{
    state: string;
    wages: Record<string, WageRecord>;
  } | null>(null);
  const [metroResult, setMetroResult] = useState<{
    state: string;
    data: MetroWageData;
  } | null>(null);

  useEffect(() => {
    const refresh = () => {
      const ids = readSavedCareerIds().filter((id) => careers.some((career) => career.id === id));
      setSavedIds(ids);
      setSelectedIds((current) => current.length ? current : ids.slice(0, 3));
    };
    refresh();
    window.addEventListener(SAVED_CAREERS_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(SAVED_CAREERS_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    if (!state) {
      return;
    }
    let active = true;
    Promise.all([loadCareerStateWages(), loadCareerMetroWages(state)])
      .then(([stateData, metroData]) => {
        if (active) {
          setWageResult({ state, wages: stateData.wages[state] ?? {} });
          setMetroResult({ state, data: metroData });
        }
      })
      .catch(() => {
        if (active) {
          setWageResult({ state, wages: {} });
          setMetroResult(null);
        }
      });
    return () => {
      active = false;
    };
  }, [state]);

  const localWages = wageResult?.state === state ? wageResult.wages : null;
  const metroData = metroResult?.state === state ? metroResult.data : null;
  const selectedMetro = metroData?.areas.some((area) => area.code === metro) ? metro : "";
  const metroWages = selectedMetro ? metroData?.wages[selectedMetro] ?? null : null;

  const compared = useMemo(
    () => selectedIds.map((id) => careers.find((career) => career.id === id)).filter((career): career is Career => Boolean(career)),
    [selectedIds]
  );
  const options = useMemo(
    () => careers.filter((career) => !selectedIds.includes(career.id)).sort((a, b) => a.title.localeCompare(b.title)),
    [selectedIds]
  );

  function addCareer(id: string) {
    if (!id || selectedIds.includes(id) || selectedIds.length >= MAX_COMPARE) return;
    setSelectedIds((current) => [...current, id]);
    setPendingId("");
    trackCareerEvent("Career comparison changed", {
      action: "add",
      career_count: selectedIds.length + 1,
    });
  }

  function removeCareer(id: string) {
    setSelectedIds((current) => current.filter((item) => item !== id));
    trackCareerEvent("Career comparison changed", {
      action: "remove",
      career_count: Math.max(0, selectedIds.length - 1),
    });
  }

  return (
    <div>
      <div className="grid gap-5 border-b-2 border-ink pb-7 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <p className="text-sm font-bold text-ink">Your saved careers</p>
          {savedIds.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {savedIds.map((id) => {
                const career = careers.find((item) => item.id === id);
                if (!career) return null;
                const active = selectedIds.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={active}
                    disabled={!active && selectedIds.length >= MAX_COMPARE}
                    onClick={() => active ? removeCareer(id) : addCareer(id)}
                    className={`inline-flex items-center gap-1.5 rounded-md border-2 px-3 py-1.5 text-[13px] font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${
                      active ? "border-ink bg-amber text-ink" : "border-ink/20 bg-cream text-stone hover:border-ink/50"
                    }`}
                  >
                    <BookmarkSimple className="h-3.5 w-3.5" weight={active ? "fill" : "bold"} />
                    {career.title}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="mt-1 text-sm leading-6 text-stone">
              Nothing saved yet. You can still add careers below, or save them from any profile.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="career-compare-add" className="text-sm font-bold text-ink">
            Add any career
          </label>
          <div className="mt-2 flex gap-2">
            <select
              id="career-compare-add"
              value={pendingId}
              disabled={selectedIds.length >= MAX_COMPARE}
              onChange={(event) => setPendingId(event.target.value)}
              className="min-w-0 flex-1 rounded-lg border-2 border-ink/20 bg-cream px-3 py-2 text-sm font-semibold text-ink focus:border-ink focus:outline-none disabled:opacity-50"
            >
              <option value="">Choose one</option>
              {options.map((career) => <option key={career.id} value={career.id}>{career.title}</option>)}
            </select>
            <button
              type="button"
              aria-label="Add career to comparison"
              disabled={!pendingId || selectedIds.length >= MAX_COMPARE}
              onClick={() => addCareer(pendingId)}
              className="rounded-md border-2 border-ink bg-amber p-2 text-ink shadow-[2px_2px_0_#11211c] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-5 w-5" weight="bold" />
            </button>
          </div>
          <p className="mt-1 text-[11px] font-medium text-stone">Up to {MAX_COMPARE} at a time.</p>
        </div>
      </div>

      {compared.length > 0 ? (
        <>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-6 text-stone">
              Compare published facts—not a score. A better choice depends on the work you want, the training you can access, and what pay looks like where you live.
            </p>
            <div className="grid min-w-72 gap-2">
              <label className="flex items-center gap-2 rounded-lg border-2 border-ink/20 bg-cream px-3 focus-within:border-ink">
                <MapPin className="h-4 w-4 text-terracotta" weight="fill" />
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
                  <option value="">National only</option>
                  {CAREER_STATE_OPTIONS.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                </select>
              </label>
              {state && (
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
                    <option value="">Statewide only</option>
                    {metroData?.areas.map((area) => <option key={area.code} value={area.code}>{area.name}</option>)}
                  </select>
                </label>
              )}
            </div>
          </div>

          <div className="mt-5 overflow-x-auto border-y-2 border-ink">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="bg-forest text-cream">
                  <th className="sticky left-0 z-10 w-40 bg-forest px-4 py-4 text-xs font-bold uppercase tracking-[0.14em]">Fact</th>
                  {compared.map((career) => (
                    <th key={career.id} className="min-w-52 px-4 py-4 align-top">
                      <div className="flex items-start justify-between gap-3">
                        <Link href={`/students/career-explorer/${career.id}`} className="font-display text-lg font-bold leading-snug hover:text-amber">
                          {career.title}
                        </Link>
                        <button
                          type="button"
                          aria-label={`Remove ${career.title} from comparison`}
                          onClick={() => removeCareer(career.id)}
                          className="shrink-0 text-cream/65 hover:text-amber"
                        >
                          <X className="h-4 w-4" weight="bold" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-ink/10 bg-cream">
                <CompareRow label="National median">
                  {compared.map((career) => (
                    <td key={career.id} className="px-4 py-3 align-top">
                      <strong className="font-display text-xl tabular-nums text-forest">{careerPayLabel(career)}</strong>
                      <span className="block text-[11px] font-semibold text-stone">{careerPayPeriod(career)}</span>
                    </td>
                  ))}
                </CompareRow>
                {state && (
                  <CompareRow label="State median">
                    {compared.map((career) => {
                      const local = localWages?.[career.id];
                      return (
                        <td key={career.id} className="px-4 py-3 align-top">
                          {local ? (
                            <>
                              <strong className="font-display text-xl tabular-nums text-ink">
                                {local.annual ? `$${local.annual.toLocaleString()}` : local.hourly ? `$${local.hourly.toFixed(2)}` : "—"}
                              </strong>
                              <span className="block text-[11px] font-semibold text-stone">{local.annual ? "median / year" : "median / hour"}</span>
                            </>
                          ) : <Value>Not published</Value>}
                        </td>
                      );
                    })}
                  </CompareRow>
                )}
                {selectedMetro && (
                  <CompareRow label="Metro median">
                    {compared.map((career) => {
                      const local = metroWages?.[career.id];
                      return (
                        <td key={career.id} className="px-4 py-3 align-top">
                          {local ? (
                            <>
                              <strong className="font-display text-xl tabular-nums text-ink">
                                {local.annual ? `$${local.annual.toLocaleString()}` : local.hourly ? `$${local.hourly.toFixed(2)}` : "—"}
                              </strong>
                              <span className="block text-[11px] font-semibold text-stone">{local.annual ? "median / year" : "median / hour"}</span>
                            </>
                          ) : <Value>Not published</Value>}
                        </td>
                      );
                    })}
                  </CompareRow>
                )}
                <CompareRow label="Openings / year">
                  {compared.map((career) => <td key={career.id} className="px-4 py-3 align-top"><Value>{getCareerDetail(career.id)?.annualOpenings?.toLocaleString() ?? "—"}</Value></td>)}
                </CompareRow>
                <CompareRow label="Outlook to 2034">
                  {compared.map((career) => <td key={career.id} className="px-4 py-3 align-top"><Value>{career.growth > 0 ? "+" : ""}{career.growth}% · {growthLabel(career.growth)}</Value></td>)}
                </CompareRow>
                <CompareRow label="Starting education">
                  {compared.map((career) => <td key={career.id} className="px-4 py-3 align-top"><Value>{EDUCATION_LABELS[career.education]}</Value></td>)}
                </CompareRow>
                <CompareRow label="Time to entry">
                  {compared.map((career) => <td key={career.id} className="px-4 py-3 align-top"><Value>{timeToEntry(career, getCareerDetail(career.id))}</Value></td>)}
                </CompareRow>
                <CompareRow label="Public tuition baseline">
                  {compared.map((career) => <td key={career.id} className="px-4 py-3 align-top"><Value>{educationCostBaseline(career)}</Value></td>)}
                </CompareRow>
                <CompareRow label="Training path">
                  {compared.map((career) => <td key={career.id} className="px-4 py-3 align-top"><Value>{career.trainingNote}</Value></td>)}
                </CompareRow>
                <CompareRow label="Training pay">
                  {compared.map((career) => <td key={career.id} className="px-4 py-3 align-top"><Value>{career.earnWhileTraining ? "Paid route available" : "Usually unpaid or self-funded"}</Value></td>)}
                </CompareRow>
                <CompareRow label="Physical demands">
                  {compared.map((career) => <td key={career.id} className="px-4 py-3 align-top"><Value>{physicalDemandLabel(getCareerWorkContext(career.id))}</Value></td>)}
                </CompareRow>
                <CompareRow label="Typical schedule">
                  {compared.map((career) => <td key={career.id} className="px-4 py-3 align-top"><Value>{scheduleLabel(getCareerDetail(career.id), getCareerWorkContext(career.id))}</Value></td>)}
                </CompareRow>
                <CompareRow label="Remote compatibility">
                  {compared.map((career) => <td key={career.id} className="px-4 py-3 align-top"><Value>{remoteCompatibilityLabel(getCareerWorkContext(career.id))}</Value></td>)}
                </CompareRow>
                <CompareRow label="Biggest trade-off">
                  {compared.map((career) => <td key={career.id} className="px-4 py-3 align-top"><Value>{biggestTradeoff(career, getCareerDetail(career.id), getCareerWorkContext(career.id))}</Value></td>)}
                </CompareRow>
                <CompareRow label="O*NET preparation">
                  {compared.map((career) => {
                    const zone = getCareerEnrichment(career.id)?.jobZone;
                    return <td key={career.id} className="px-4 py-3 align-top"><Value>{zone ? `Zone ${zone} · ${JOB_ZONE[zone]}` : "No specific profile"}</Value></td>;
                  })}
                </CompareRow>
                <CompareRow label="Strongest interests">
                  {compared.map((career) => <td key={career.id} className="px-4 py-3 align-top"><Value>{getCareerEnrichment(career.id)?.interests.join(" · ") || "Not published"}</Value></td>)}
                </CompareRow>
                <CompareRow label="Work styles">
                  {compared.map((career) => <td key={career.id} className="px-4 py-3 align-top"><Value>{getCareerEnrichment(career.id)?.workStyles.join(" · ") || "Not published"}</Value></td>)}
                </CompareRow>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13px] leading-6 text-stone">
            National, state, and metro pay: May 2025 BLS OEWS. Outlook and openings: BLS 2024–34 projections. Interests, work styles, preparation, physical demands, and schedule patterns: {ONET_DATA_VINTAGE}. Tuition baselines use {CAREER_COST_SOURCE.vintage} public averages, before aid, living costs, books, or tools. Remote compatibility is an Empower estimate from O*NET work-context signals, not an employer promise or observed telework rate.
          </p>
        </>
      ) : (
        <div className="py-14 text-center">
          <p className="font-display text-xl font-bold text-ink">Choose at least one career to begin.</p>
          <p className="mt-2 text-sm text-stone">The comparison becomes most useful with two to four.</p>
        </div>
      )}
    </div>
  );
}

function CompareRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr>
      <th className="sticky left-0 z-10 bg-paper-deep px-4 py-3 align-top text-xs font-bold uppercase tracking-[0.1em] text-stone">{label}</th>
      {children}
    </tr>
  );
}
