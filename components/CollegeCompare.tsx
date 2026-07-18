"use client";

// Compare Colleges (July 2026 — the parked preview goes live). The owner's
// framing: "some are need blind, some aren't — some consider religious
// affiliation, some are more holistic than others." So the tool sorts by
// published FACTS (CDS C7 factors, admit rate, need policy, test policy) —
// never by rankings (house rule). Filter chips + fuzzy search + a pick-up-to-
// three side-by-side comparison table. All client-side; no Date() anywhere,
// so server and client render identically.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Scales as Scale, X } from "@phosphor-icons/react/dist/ssr";
import { fuzzyScore } from "@/lib/fuzzy";
import {
  colleges,
  COLLEGE_DATA_VINTAGE,
  FACTOR_LABELS,
  RATING_LABELS,
  type CollegeProfile,
  type FactorId,
} from "@/lib/collegeProfiles";

type NeedFilter = "all" | "blind" | "blind-intl";
type ReligionFilter = "all" | "secular" | "religious";
type TestFilter = "all" | "required" | "optional" | "blind";
type BandFilter = "all" | "reach" | "very" | "selective" | "accessible";
type Sort = "az" | "selective" | "accessible";

const MAX_COMPARE = 3;

/** Selectivity band from the admit rate — plain words, not a ranking. */
function band(rate: number): { id: BandFilter; label: string } {
  if (rate < 10) return { id: "reach", label: "A reach for everyone" };
  if (rate < 25) return { id: "very", label: "Very selective" };
  if (rate < 50) return { id: "selective", label: "Selective" };
  return { id: "accessible", label: "Accessible" };
}

/** Selectivity speaks in color: clay reach -> forest accessible. */
const BAND_COLORS: Record<BandFilter, string> = {
  all: "#11211c",
  reach: "#b7593f",
  very: "#c9842a",
  selective: "#2f6d80",
  accessible: "#15624b",
};

const NEED_LABEL: Record<NonNullable<CollegeProfile["needBlind"]>, string> = {
  all: "Need-blind (incl. international)",
  domestic: "Need-blind (US applicants)",
  aware: "Need-aware",
};

const TEST_LABEL: Record<NonNullable<CollegeProfile["testPolicy"]>, string> = {
  required: "Tests required",
  optional: "Test-optional",
  blind: "Test-blind",
};

/** The factor rows the compare table shows, in reading order. */
const TABLE_FACTORS: FactorId[] = [
  "rigor",
  "gpa",
  "rank",
  "essay",
  "recs",
  "interview",
  "ecs",
  "talent",
  "character",
  "firstGen",
  "legacy",
  "interest",
  "religion",
  "work",
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-md border-2 px-3 py-1.5 text-[13px] font-bold transition-colors ${
        active
          ? "border-ink bg-amber text-ink shadow-[2px_2px_0_#11211c]"
          : "border-ink/15 bg-cream text-stone hover:border-ink/40 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export default function CollegeCompare() {
  const [query, setQuery] = useState("");
  const [need, setNeed] = useState<NeedFilter>("all");
  const [fullNeed, setFullNeed] = useState(false);
  const [religion, setReligion] = useState<ReligionFilter>("all");
  const [test, setTest] = useState<TestFilter>("all");
  const [bandF, setBandF] = useState<BandFilter>("all");
  const [transferDoor, setTransferDoor] = useState(false);
  const [sort, setSort] = useState<Sort>("az");
  const [compare, setCompare] = useState<string[]>([]);
  // The open full-profile panel (owner, July 17: "you should be able to
  // click into the college's tab and see more details").
  const [detail, setDetail] = useState<string | null>(null);

  const results = useMemo(() => {
    let list = [...colleges];
    if (need === "blind")
      list = list.filter((c) => c.needBlind === "all" || c.needBlind === "domestic");
    if (need === "blind-intl") list = list.filter((c) => c.needBlind === "all");
    if (fullNeed) list = list.filter((c) => c.meetsFullNeed);
    if (religion === "secular") list = list.filter((c) => !c.religious);
    if (religion === "religious") list = list.filter((c) => c.religious);
    if (test !== "all") list = list.filter((c) => c.testPolicy === test);
    if (bandF !== "all") list = list.filter((c) => band(c.admitRate).id === bandF);
    // Wider door for transfers: a published transfer admit rate ABOVE the
    // freshman rate (the fact community-college students rarely get shown).
    if (transferDoor)
      list = list.filter(
        (c) => c.transfer?.admitRate != null && c.transfer.admitRate > c.admitRate
      );

    const q = query.trim();
    if (q) {
      list = list
        .map((c) => ({
          c,
          score: fuzzyScore(
            q,
            `${c.name} ${c.place} ${c.religious ?? ""} ${c.note}`
          ),
        }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((r) => r.c);
      return list;
    }

    if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "selective") list.sort((a, b) => a.admitRate - b.admitRate);
    if (sort === "accessible") list.sort((a, b) => b.admitRate - a.admitRate);
    return list;
  }, [query, need, fullNeed, religion, test, bandF, transferDoor, sort]);

  const compared = colleges.filter((c) => compare.includes(c.id));

  function toggleCompare(id: string) {
    setCompare((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length >= MAX_COMPARE
          ? prev
          : [...prev, id]
    );
  }

  return (
    <div>
      {/* ---- controls ---- */}
      <div className="space-y-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search: a college, a state, “Jesuit”, “HBCU”…"
          className="w-full rounded-lg border-2 border-ink/15 bg-cream px-4 py-2.5 text-base text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
        />
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
            Aid
          </span>
          <Chip active={need === "all" && !fullNeed} onClick={() => { setNeed("all"); setFullNeed(false); }}>All</Chip>
          <Chip active={need === "blind"} onClick={() => setNeed(need === "blind" ? "all" : "blind")}>Need-blind</Chip>
          <Chip active={need === "blind-intl"} onClick={() => setNeed(need === "blind-intl" ? "all" : "blind-intl")}>Need-blind incl. international</Chip>
          <Chip active={fullNeed} onClick={() => setFullNeed(!fullNeed)}>Meets full need</Chip>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
            Fit
          </span>
          <Chip active={religion === "secular"} onClick={() => setReligion(religion === "secular" ? "all" : "secular")}>No religious affiliation</Chip>
          <Chip active={religion === "religious"} onClick={() => setReligion(religion === "religious" ? "all" : "religious")}>Religiously affiliated</Chip>
          <Chip active={test === "required"} onClick={() => setTest(test === "required" ? "all" : "required")}>Tests required</Chip>
          <Chip active={test === "optional"} onClick={() => setTest(test === "optional" ? "all" : "optional")}>Test-optional</Chip>
          <Chip active={test === "blind"} onClick={() => setTest(test === "blind" ? "all" : "blind")}>Test-blind</Chip>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
            Odds
          </span>
          <Chip active={bandF === "reach"} onClick={() => setBandF(bandF === "reach" ? "all" : "reach")}>Under 10% admitted</Chip>
          <Chip active={bandF === "very"} onClick={() => setBandF(bandF === "very" ? "all" : "very")}>10–25%</Chip>
          <Chip active={bandF === "selective"} onClick={() => setBandF(bandF === "selective" ? "all" : "selective")}>25–50%</Chip>
          <Chip active={bandF === "accessible"} onClick={() => setBandF(bandF === "accessible" ? "all" : "accessible")}>Over 50%</Chip>
          <Chip active={transferDoor} onClick={() => setTransferDoor(!transferDoor)}>Wider door for transfers</Chip>
          <span className="ml-2 text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
            Sort
          </span>
          <Chip active={sort === "az"} onClick={() => setSort("az")}>A–Z</Chip>
          <Chip active={sort === "selective"} onClick={() => setSort("selective")}>Most selective first</Chip>
          <Chip active={sort === "accessible"} onClick={() => setSort("accessible")}>Most accessible first</Chip>
        </div>
      </div>

      <p className="mt-4 text-sm font-medium text-stone">
        {results.length} of {colleges.length}{" "}colleges · figures from each
        college&apos;s Common Data Set and admissions pages, {COLLEGE_DATA_VINTAGE}.
        A missing value means the college doesn&apos;t publish it.
      </p>

      {/* ---- compare tray ---- */}
      {compare.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border-2 border-forest/25 bg-forest/[0.06] px-4 py-3">
          <Scale className="h-4 w-4 text-forest" weight="bold" />
          <span className="text-sm font-bold text-forest">
            Comparing {compare.length} of {MAX_COMPARE}:
          </span>
          {compared.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => toggleCompare(c.id)}
              className="inline-flex items-center gap-1 rounded-md border-2 border-ink bg-cream px-2.5 py-1 text-[13px] font-bold text-ink hover:border-terracotta hover:text-terracotta"
            >
              {c.name}
              <X className="h-3 w-3" weight="bold" />
            </button>
          ))}
          {compare.length < 2 && (
            <span className="text-sm text-stone">
              pick {2 - compare.length} more to see them side by side
            </span>
          )}
        </div>
      )}

      {/* ---- side-by-side table ---- */}
      {compared.length >= 2 && (
        <div className="mt-5 overflow-x-auto rounded-2xl border-2 border-ink bg-cream">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-ink bg-paper-deep">
                <th className="px-4 py-3 text-left font-display text-base text-ink">
                  Side by side
                </th>
                {compared.map((c) => (
                  <th key={c.id} className="px-4 py-3 text-left font-display text-base text-ink">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="align-top">
              {(
                [
                  ["Admitted", (c: CollegeProfile) => `${c.admitRate}% (${c.admitYear})`],
                  ["Need policy", (c: CollegeProfile) => (c.needBlind ? NEED_LABEL[c.needBlind] : "—")],
                  ["Meets full need", (c: CollegeProfile) => (c.meetsFullNeed == null ? "—" : c.meetsFullNeed ? "Yes" : "No")],
                  ["Tests", (c: CollegeProfile) => (c.testPolicy ? TEST_LABEL[c.testPolicy] : "—")],
                  ["GPA (published)", (c: CollegeProfile) => c.gpaNote ?? "—"],
                  [
                    "Undergrads",
                    (c: CollegeProfile) =>
                      c.undergrads != null ? `≈${c.undergrads.toLocaleString()}` : "—",
                  ],
                  ["SAT (middle 50%)", (c: CollegeProfile) => c.satRange ?? "—"],
                  ["ACT (middle 50%)", (c: CollegeProfile) => c.actRange ?? "—"],
                  [
                    "6-year grad rate",
                    (c: CollegeProfile) =>
                      c.gradRate != null ? `${c.gradRate}%` : "—",
                  ],
                  ["Religious affiliation", (c: CollegeProfile) => c.religious ?? "None"],
                  ["Aid note", (c: CollegeProfile) => c.aidNote ?? "—"],
                  [
                    "Transfer admit rate",
                    (c: CollegeProfile) =>
                      c.transfer?.admitRate != null
                        ? `${c.transfer.admitRate}%${c.transfer.admitYear ? ` (${c.transfer.admitYear})` : ""}`
                        : "—",
                  ],
                  ["Transfer GPA", (c: CollegeProfile) => c.transfer?.gpaNote ?? "—"],
                  ["Transfer path", (c: CollegeProfile) => c.transfer?.note ?? "—"],
                ] as const
              ).map(([label, get]) => (
                <tr key={label} className="border-b border-sand">
                  <td className="px-4 py-2.5 font-semibold text-stone">{label}</td>
                  {compared.map((c) => (
                    <td key={c.id} className="px-4 py-2.5 text-ink">{get(c)}</td>
                  ))}
                </tr>
              ))}
              {TABLE_FACTORS.map((f) => (
                <tr key={f} className="border-b border-sand last:border-b-0">
                  <td className="px-4 py-2.5 font-semibold text-stone">
                    {FACTOR_LABELS[f]}
                  </td>
                  {compared.map((c) => {
                    const r = c.factors[f];
                    return (
                      <td
                        key={c.id}
                        className={`px-4 py-2.5 ${
                          r === "very"
                            ? "font-bold text-forest"
                            : r === "no"
                              ? "text-terracotta"
                              : "text-ink"
                        }`}
                      >
                        {r ? RATING_LABELS[r] : "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ---- compact cards: scan here, click for the full profile ---- */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((c) => {
          const b = band(c.admitRate);
          const inCompare = compare.includes(c.id);
          return (
            <div
              key={c.id}
              onClick={() => setDetail(c.id)}
              className="card-ink group flex cursor-pointer flex-col rounded-2xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3
                    className="font-display text-lg font-bold leading-snug text-ink group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4"
                    style={{ textDecorationColor: BAND_COLORS[b.id] }}
                  >
                    {c.name}
                  </h3>
                  <p className="mt-0.5 text-[13px] font-medium text-stone">
                    {c.place} · {c.control === "public" ? "Public" : "Private"}
                    {c.religious ? ` · ${c.religious}` : ""}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <div
                    className="font-display text-2xl font-bold tabular-nums"
                    style={{ color: BAND_COLORS[b.id] }}
                  >
                    {c.admitRate}%
                  </div>
                  <div className="text-[11px] font-semibold text-stone">
                    admitted
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                  style={{
                    color: BAND_COLORS[b.id],
                    background: `color-mix(in srgb, ${BAND_COLORS[b.id]} 12%, #fbf8f1)`,
                  }}
                >
                  {b.label}
                </span>
                {c.needBlind && c.needBlind !== "aware" && (
                  <span className="rounded-full bg-forest/10 px-2.5 py-1 text-[11px] font-bold text-forest">
                    Need-blind
                  </span>
                )}
                {c.meetsFullNeed && (
                  <span className="rounded-full bg-forest/10 px-2.5 py-1 text-[11px] font-bold text-forest">
                    Meets full need
                  </span>
                )}
                {c.testPolicy && c.testPolicy !== "optional" && (
                  <span className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-[11px] font-bold text-ink/70">
                    {TEST_LABEL[c.testPolicy]}
                  </span>
                )}
                {c.transfer?.admitRate != null && c.transfer.admitRate > c.admitRate && (
                  <span className="rounded-full bg-amber/20 px-2.5 py-1 text-[11px] font-bold text-amber-deep" style={{ color: "#c9842a" }}>
                    Wider transfer door
                  </span>
                )}
              </div>

              <p className="mt-3 flex-1 text-[13px] italic leading-5 text-stone [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                {c.note}
              </p>

              <div className="mt-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDetail(c.id);
                  }}
                  className="text-[13px] font-bold text-ink underline decoration-2 underline-offset-4 hover:text-forest"
                  style={{ textDecorationColor: BAND_COLORS[b.id] }}
                >
                  Full profile
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCompare(c.id);
                  }}
                  aria-pressed={inCompare}
                  disabled={!inCompare && compare.length >= MAX_COMPARE}
                  className={`inline-flex items-center gap-1.5 rounded-md border-2 px-3 py-1.5 text-[12px] font-bold transition-colors ${
                    inCompare
                      ? "border-ink bg-amber text-ink shadow-[2px_2px_0_#11211c]"
                      : "border-ink/25 bg-cream text-ink hover:border-ink disabled:cursor-not-allowed disabled:opacity-40"
                  }`}
                >
                  <Scale className="h-3.5 w-3.5" weight="bold" />
                  {inCompare ? "Comparing" : "Compare"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- full profile panel ---- */}
      {detail && (
        <ProfilePanel
          c={colleges.find((x) => x.id === detail)!}
          inCompare={compare.includes(detail)}
          compareFull={!compare.includes(detail) && compare.length >= MAX_COMPARE}
          onCompare={() => toggleCompare(detail)}
          onClose={() => setDetail(null)}
        />
      )}

      {results.length === 0 && (
        <div className="mt-6 rounded-2xl border-2 border-ink/15 bg-cream p-8 text-center">
          <p className="font-display text-lg font-bold text-ink">
            No college matches those filters.
          </p>
          <p className="mt-1 text-sm text-stone">
            Loosen one — need-blind AND over-50%-admitted, for example, is a
            rare combination.
          </p>
        </div>
      )}

      <p className="mt-8 text-sm leading-6 text-stone">
        Want a college added?{" "}
        <Link
          href="/contact"
          className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
        >
          Tell us which one
        </Link>{" "}
        and we&apos;ll pull its Common Data Set.
      </p>
    </div>
  );
}

/* --- Full profile panel ---------------------------------------------------
   The click-into view (owner, July 17). Same modal grammar as the skill
   tree's panels: scrim click or Escape closes, the card stops propagation. */

function DefRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-sand py-1.5 last:border-b-0">
      <span className="shrink-0 text-[13px] font-semibold text-stone">{label}</span>
      <span className="text-right text-[13px] font-medium text-ink">{value}</span>
    </div>
  );
}

function ProfilePanel({
  c,
  inCompare,
  compareFull,
  onCompare,
  onClose,
}: {
  c: CollegeProfile;
  inCompare: boolean;
  compareFull: boolean;
  onCompare: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const b = band(c.admitRate);
  const groups: Array<[string, string, FactorId[]]> = [
    ["They weigh most", "#15624b", TABLE_FACTORS.filter((f) => c.factors[f] === "very")],
    ["Important", "#c9842a", TABLE_FACTORS.filter((f) => c.factors[f] === "important")],
    ["Considered", "#5f6f66", TABLE_FACTORS.filter((f) => c.factors[f] === "considered")],
    ["Doesn't count here", "#b7593f", TABLE_FACTORS.filter((f) => c.factors[f] === "no")],
  ];

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${c.name}: full profile`}
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border-2 border-ink bg-cream p-6 shadow-[6px_6px_0_#11211c] sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-bold leading-snug text-ink">
              {c.name}
            </h2>
            <p className="mt-1 text-sm font-medium text-stone">
              {c.place} · {c.control === "public" ? "Public" : "Private"}
              {c.religious ? ` · ${c.religious}` : ""}
              {c.undergrads != null ? ` · ≈${c.undergrads.toLocaleString()} undergrads` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-stone hover:bg-ink/5 hover:text-ink"
          >
            <X className="h-5 w-5" weight="bold" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className="font-display text-3xl font-bold tabular-nums"
            style={{ color: BAND_COLORS[b.id] }}
          >
            {c.admitRate}%
          </span>
          <span className="text-sm font-semibold text-stone">
            admitted ({c.admitYear}) ·{" "}
            <span style={{ color: BAND_COLORS[b.id] }} className="font-bold">
              {b.label.toLowerCase()}
            </span>
          </span>
        </div>

        <p className="mt-3 text-sm italic leading-6 text-stone">{c.note}</p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">
              The numbers
            </p>
            <div className="mt-2">
              <DefRow label="Tests" value={c.testPolicy ? TEST_LABEL[c.testPolicy] : "—"} />
              <DefRow label="SAT (middle 50%)" value={c.satRange ?? "—"} />
              <DefRow label="ACT (middle 50%)" value={c.actRange ?? "—"} />
              <DefRow label="GPA (published)" value={c.gpaNote ?? "—"} />
              <DefRow
                label="6-year grad rate"
                value={c.gradRate != null ? `${c.gradRate}%` : "—"}
              />
            </div>
            {c.testNote && (
              <p className="mt-2 text-[13px] leading-5 text-stone">{c.testNote}.</p>
            )}
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">
              The money
            </p>
            <div className="mt-2">
              <DefRow
                label="Need policy"
                value={c.needBlind ? NEED_LABEL[c.needBlind] : "Not clearly published"}
              />
              <DefRow
                label="Meets full need"
                value={c.meetsFullNeed == null ? "—" : c.meetsFullNeed ? "Yes" : "No"}
              />
            </div>
            {c.aidNote && (
              <p className="mt-2 text-[13px] font-semibold leading-5 text-forest">
                {c.aidNote}.
              </p>
            )}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">
            How they read your application
          </p>
          <div className="mt-2 space-y-1.5">
            {groups.map(
              ([label, color, fs]) =>
                fs.length > 0 && (
                  <p key={label} className="text-[13px] leading-5">
                    <span className="font-bold" style={{ color }}>
                      {label}:
                    </span>{" "}
                    <span className="text-ink">
                      {fs.map((f) => FACTOR_LABELS[f]).join(", ")}
                    </span>
                  </p>
                )
            )}
            {groups.every(([, , fs]) => fs.length === 0) && (
              <p className="text-[13px] text-stone">
                This college&apos;s factor table isn&apos;t encoded yet.
              </p>
            )}
          </div>
        </div>

        {c.transfer && (
          <div className="mt-5 rounded-xl bg-forest/[0.06] px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-forest">
              Transferring in
            </p>
            <div className="mt-1.5">
              <DefRow
                label="Transfer admit rate"
                value={
                  c.transfer.admitRate != null
                    ? `${c.transfer.admitRate}%${c.transfer.admitYear ? ` (${c.transfer.admitYear})` : ""}`
                    : "Not published"
                }
              />
              <DefRow label="Transfer GPA" value={c.transfer.gpaNote ?? "Not published"} />
            </div>
            {c.transfer.note && (
              <p className="mt-1.5 text-[13px] leading-5 text-stone">{c.transfer.note}</p>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onCompare}
            aria-pressed={inCompare}
            disabled={compareFull}
            className={`btn-ink inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-bold ${
              inCompare ? "bg-amber text-ink" : "bg-cream text-ink"
            } disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none`}
          >
            <Scale className="h-4 w-4" weight="bold" />
            {inCompare ? "In your comparison" : "Add to comparison"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-stone underline decoration-sand decoration-2 underline-offset-4 hover:text-ink"
          >
            Back to the list
          </button>
        </div>
      </div>
    </div>
  );
}
