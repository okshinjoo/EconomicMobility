// Optional scholarship matching (phase 5 of docs/scholarship-taxonomy-spec.md).
// Deterministic, no AI: verdicts come from the classified eligibility tags
// (lib/scholarshipEligibility.generated) plus whatever the person chose to
// share. HONESTY RULES baked in:
// - Browsing never requires this. The profile is local-first (synced to the
//   account only through the ordinary storage mirror) and one click clears it.
// - An unanswered question is UNKNOWN, never a "no" — the only hard
//   ineligibility signals are an explicit state mismatch and an explicit
//   field mismatch, both from answers the person actually gave.
// - Preferences never gate: an unmet `preferred` tag costs nothing.
// - `basis.*` tags (need, merit, contests) are excluded from verdicts —
//   we can't verify them, so they never sink anything.
// - Wording stays "appears / likely"; the official page is the final word.
// - We never ask ethnicity or heritage ("no forms about you" is the page's
//   promise) — identity-required awards surface as "worth checking" notes
//   instead of questions.

import { loadJSON, saveJSON, removeStored, STORAGE_KEYS } from "./storage";
import {
  isWithin,
  dimensionOf,
  taxonomyNode,
  type EligibilityTag,
} from "./scholarshipTaxonomy";
import type { Scholarship } from "./scholarships";

export const STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaiʻi", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
  NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
  NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma",
  OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin",
  WY: "Wyoming", DC: "Washington, D.C.", PR: "Puerto Rico", GU: "Guam",
  AS: "American Samoa", VI: "U.S. Virgin Islands", MP: "Northern Mariana Islands",
};

/** What the person chose to tell us. Everything optional. */
export interface ScholarshipProfile {
  /** Matching on/off — the browse experience is identical when off. */
  on: boolean;
  /** USPS code; doubles as the state filter selection. */
  state?: string;
  /** A field-of-study taxonomy id; doubles as the field filter selection. */
  field?: string;
  /** First-generation college student (checked = yes; unchecked = unknown). */
  firstGen?: boolean;
  /** Opt-in group taxonomy ids (military family, foster care, …). */
  groups?: string[];
}

export function readScholarshipProfile(): ScholarshipProfile | null {
  return loadJSON<ScholarshipProfile>(STORAGE_KEYS.scholarshipProfile);
}
export function saveScholarshipProfile(p: ScholarshipProfile) {
  saveJSON(STORAGE_KEYS.scholarshipProfile, p);
}
export function clearScholarshipProfile() {
  removeStored(STORAGE_KEYS.scholarshipProfile);
}

export type MatchLevel = "strong" | "likely" | "possibly" | "not";

export interface MatchVerdict {
  level: MatchLevel;
  reason: string;
}

const LEVEL_RANK: Record<MatchLevel, number> = { strong: 0, likely: 1, possibly: 2, not: 3 };
export function matchRank(v: MatchVerdict | null): number {
  return v ? LEVEL_RANK[v.level] : 1.5; // unclassified floats between likely and possibly
}

function label(id: string): string {
  return taxonomyNode(id)?.label ?? id.split(".").pop() ?? id;
}

/** Does the person's answer satisfy a required tag?
 *  "yes" — an answer sits at or below the tag; "unknown" — no answer, or the
 *  tag is more specific than the answer; "no" only for explicit mismatches
 *  (handled per-dimension by the caller). */
function satisfies(answerIds: string[], tag: string): "yes" | "unknown" {
  for (const a of answerIds) {
    if (isWithin(a, tag)) return "yes";
  }
  return "unknown";
}

/** Deterministic verdict for one scholarship against one profile.
 *  Returns null when there's nothing to say (no classification data at all
 *  and no geo) — the card then stays exactly as it is while browsing. */
export function verdictFor(s: Scholarship, p: ScholarshipProfile): MatchVerdict | null {
  if (s.eligibility === undefined && !s.geo) return null;

  const answers: string[] = [
    ...(p.field ? [p.field] : []),
    ...(p.firstGen ? ["identity.first-gen"] : []),
    ...(p.groups ?? []),
  ];

  // Geography — the one place a hard "no" is possible from a real answer.
  let geoUnknown = false;
  if (s.geo?.scope === "states" && s.geo.states?.length) {
    if (!p.state) geoUnknown = true;
    else if (!s.geo.states.includes(p.state)) {
      const names = s.geo.states.map((c) => STATE_NAMES[c] ?? c);
      const shown = names.length > 2 ? `${names[0]} + ${names.length - 1} more` : names.join(" or ");
      return { level: "not", reason: `Appears to require ${shown} residency` };
    }
  }

  // Required tags, grouped by dimension. Within a dimension multiple
  // requireds read as alternatives ("veterans OR military spouses"); across
  // dimensions they stack ("women AND in STEM"). basis.* never judges.
  const required = (s.eligibility ?? []).filter(
    (t) => t.strength === "required" && dimensionOf(t.tag) !== "basis",
  );
  const dims = new Map<string, EligibilityTag[]>();
  for (const t of required) {
    const d = dimensionOf(t.tag);
    dims.set(d, [...(dims.get(d) ?? []), t]);
  }

  const unknownDims: string[] = [];
  for (const [d, tags] of dims) {
    const results = tags.map((t) => satisfies(answers, t.tag));
    if (results.includes("yes")) continue; // one alternative met
    // Field is answered explicitly — an answered field that satisfies no
    // alternative in the field dimension is a real mismatch.
    if (d === "field" && p.field) {
      const names = tags.map((t) => label(t.tag));
      return {
        level: "not",
        reason: `Appears to require studying ${names.slice(0, 2).join(" or ")}`,
      };
    }
    unknownDims.push(tags.map((t) => label(t.tag)).join(" / "));
  }

  if (geoUnknown) unknownDims.unshift("a state-residency rule");
  if (unknownDims.length > 0) {
    return {
      level: "possibly",
      reason: `this one is for ${unknownDims.slice(0, 2).join(", and ")}`,
    };
  }

  // All known requirements appear satisfied. Preferred/relevant matches
  // upgrade to a strong match; a stated-but-unmet preference is still worth
  // naming (it never gates).
  const soft = (s.eligibility ?? []).filter(
    (t) => t.strength !== "required" && dimensionOf(t.tag) !== "basis",
  );
  const softMet = soft.filter((t) => satisfies(answers, t.tag) === "yes");
  const requiredMet = required.length > 0 || (s.geo?.scope === "states" && !!p.state);
  if (softMet.length > 0) {
    const why = softMet.find((t) => t.strength === "preferred");
    return {
      level: "strong",
      reason: why
        ? `You appear eligible, and preference goes to ${label(why.tag)}`
        : `Appears open to you — and it's aimed at ${label(softMet[0].tag)}`,
    };
  }
  if (requiredMet) {
    const pref = (s.eligibility ?? []).find((t) => t.strength === "preferred");
    return {
      level: "strong",
      reason: pref
        ? `Matches what you shared; preference goes to ${label(pref.tag)}`
        : "Matches what you shared",
    };
  }
  const pref = (s.eligibility ?? []).find((t) => t.strength === "preferred");
  return {
    level: "likely",
    reason: pref
      ? `No blockers in the stated rules; preference goes to ${label(pref.tag)}`
      : "No blockers in the stated rules",
  };
}
