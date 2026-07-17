"use client";

// Compare Colleges (July 2026 — the parked preview goes live). The owner's
// framing: "some are need blind, some aren't — some consider religious
// affiliation, some are more holistic than others." So the tool sorts by
// published FACTS (CDS C7 factors, admit rate, need policy, test policy) —
// never by rankings (house rule). Filter chips + fuzzy search + a pick-up-to-
// three side-by-side comparison table. All client-side; no Date() anywhere,
// so server and client render identically.

import { useMemo, useState } from "react";
import Link from "next/link";
import { Scale, X } from "lucide-react";
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
          <Scale className="h-4 w-4 text-forest" strokeWidth={2.25} />
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
              <X className="h-3 w-3" strokeWidth={3} />
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

      {/* ---- cards ---- */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {results.map((c) => {
          const b = band(c.admitRate);
          const very = TABLE_FACTORS.filter((f) => c.factors[f] === "very");
          const important = TABLE_FACTORS.filter((f) => c.factors[f] === "important");
          const nos = TABLE_FACTORS.filter((f) => c.factors[f] === "no");
          const inCompare = compare.includes(c.id);
          return (
            <div key={c.id} className="card-ink flex flex-col rounded-2xl bg-cream p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-bold leading-snug text-ink">
                    {c.name}
                  </h3>
                  <p className="mt-0.5 text-[13px] font-medium text-stone">
                    {c.place} · {c.control === "public" ? "Public" : "Private"}
                    {c.religious ? ` · ${c.religious}` : ""}
                    {c.undergrads != null
                      ? ` · ≈${c.undergrads.toLocaleString()} undergrads`
                      : ""}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl font-bold tabular-nums text-forest">
                    {c.admitRate}%
                  </div>
                  <div className="text-[11px] font-semibold text-stone">
                    admitted ({c.admitYear})
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.needBlind && (
                  <span className="rounded-full bg-forest/10 px-2.5 py-1 text-[11px] font-bold text-forest">
                    {NEED_LABEL[c.needBlind]}
                  </span>
                )}
                {c.meetsFullNeed && (
                  <span className="rounded-full bg-forest/10 px-2.5 py-1 text-[11px] font-bold text-forest">
                    Meets full need
                  </span>
                )}
                {c.testPolicy && (
                  <span className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-[11px] font-bold text-ink/70">
                    {TEST_LABEL[c.testPolicy]}
                  </span>
                )}
                <span className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-[11px] font-bold text-ink/70">
                  {b.label}
                </span>
              </div>

              {(c.satRange || c.actRange || c.gradRate != null) && (
                <p className="mt-2 text-[13px] font-medium text-stone">
                  {[
                    c.satRange ? `SAT ${c.satRange}` : null,
                    c.actRange ? `ACT ${c.actRange}` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                  {(c.satRange || c.actRange) && " (middle 50%)"}
                  {c.gradRate != null &&
                    `${c.satRange || c.actRange ? " · " : ""}${c.gradRate}% graduate in 6 years`}
                </p>
              )}

              {(very.length > 0 || important.length > 0 || nos.length > 0) && (
                <div className="mt-3 space-y-1.5 text-[13px] leading-5">
                  {very.length > 0 && (
                    <p>
                      <span className="font-bold text-forest">They weigh most:</span>{" "}
                      <span className="text-ink">{very.map((f) => FACTOR_LABELS[f]).join(", ")}</span>
                    </p>
                  )}
                  {important.length > 0 && (
                    <p>
                      <span className="font-bold text-ink/70">Also important:</span>{" "}
                      <span className="text-ink">{important.map((f) => FACTOR_LABELS[f]).join(", ")}</span>
                    </p>
                  )}
                  {nos.length > 0 && (
                    <p>
                      <span className="font-bold text-terracotta">Doesn&apos;t count here:</span>{" "}
                      <span className="text-ink">{nos.map((f) => FACTOR_LABELS[f]).join(", ")}</span>
                    </p>
                  )}
                </div>
              )}

              {c.gpaNote && (
                <p className="mt-2 text-[13px] font-medium text-stone">
                  GPA of admits: {c.gpaNote}
                </p>
              )}
              {c.testNote && (
                <p className="mt-1 text-[13px] text-stone">{c.testNote}.</p>
              )}
              {c.aidNote && (
                <p className="mt-1 text-[13px] font-medium text-forest">{c.aidNote}.</p>
              )}

              {c.transfer && (
                <div className="mt-2 rounded-lg bg-forest/[0.06] px-3 py-2 text-[13px] leading-5">
                  <p>
                    <span className="font-bold text-forest">Transfers:</span>{" "}
                    <span className="text-ink">
                      {c.transfer.admitRate != null
                        ? `${c.transfer.admitRate}% admitted${c.transfer.admitYear ? ` (${c.transfer.admitYear})` : ""}`
                        : "rate not published"}
                      {c.transfer.gpaNote ? ` · GPA: ${c.transfer.gpaNote}` : ""}
                    </span>
                  </p>
                  {c.transfer.note && (
                    <p className="mt-0.5 text-stone">{c.transfer.note}</p>
                  )}
                </div>
              )}

              <p className="mt-3 flex-1 text-sm italic leading-6 text-stone">
                {c.note}
              </p>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => toggleCompare(c.id)}
                  aria-pressed={inCompare}
                  disabled={!inCompare && compare.length >= MAX_COMPARE}
                  className={`inline-flex items-center gap-1.5 rounded-md border-2 px-3.5 py-1.5 text-[13px] font-bold transition-colors ${
                    inCompare
                      ? "border-ink bg-amber text-ink shadow-[2px_2px_0_#11211c]"
                      : "border-ink bg-cream text-ink hover:bg-paper-deep disabled:cursor-not-allowed disabled:opacity-40"
                  }`}
                >
                  <Scale className="h-3.5 w-3.5" strokeWidth={2.25} />
                  {inCompare ? "In your comparison" : "Compare"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

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
