"use client";

// The scholarship finder (July 2026): filter the curated list by stage,
// citizenship-openness, and a fuzzy search box (lib/fuzzy, house rule).
//
// DEADLINE AWARENESS (July 17, owner: "include deadlines, and don't show
// any with deadlines that are already closed — show them greyed out with
// when applications open again"): month granularity is all the data has,
// so the honest model is cycles. An award is IN SEASON when its next
// deadline is within 6 months (windows open a few months ahead); 7-11
// months out means this year's cycle just closed — those grey out, sink
// below the open ones, and name the next cycle's typical deadline month
// + year. The clock arrives POST-MOUNT (nowMonth state), so the server
// render (season order, nothing greyed) and the client's first paint
// still agree — same hydration discipline as the rest of the site.
//
// ELIGIBILITY LAYER (Aug 7 2026, docs/scholarship-taxonomy-spec.md phases
// 3-5): classified tags power three additions, all riding the same
// hydration discipline —
// - SEARCH: each entry's haystack folds in its tag labels + synonyms
//   ("piano" finds Music-tagged awards), queries shed the "scholarships
//   for" boilerplate, and a detected taxonomy node offers ONE "Filter by
//   X" chip (an offer, never a takeover).
// - FILTERS: Your state (geo.states is a HARD residency bound — the one
//   place browsing excludes, because it's factual), Field of study, and a
//   More-filters panel (OR within a dimension, AND across dimensions).
//   Options render only where classified entries exist, with counts.
// - MATCH ME (optional, local-first, one-click forget): deterministic
//   verdicts from lib/scholarshipMatch — strong/likely/possibly sort up,
//   "likely not" sinks greyed WITH its reason, never hidden. Unanswered
//   questions are unknowns, never "no"s. We never ask ethnicity.

import { useEffect, useMemo, useState } from "react";
import {
  ArrowSquareOut as ExternalLink,
  BookmarkSimple,
  CaretDown,
  CheckCircle,
  X as XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useSearchParams } from "next/navigation";
import { fuzzyScore } from "@/lib/fuzzy";
import { frameHref } from "@/lib/frame";
import { useFrame } from "@/components/useFrame";
import { readContext, scholarshipDefault } from "@/lib/personalization";
import {
  readSavedScholarships,
  toggleSavedScholarship,
  setScholarshipApplied,
  summarizeSavedScholarships,
  type SavedScholarshipMap,
} from "@/lib/savedScholarships";
import {
  scholarships,
  VERIFIED_AS_OF,
  type Scholarship,
  type StudentStage,
} from "@/lib/scholarships";
import {
  SCHOLARSHIP_TAXONOMY,
  isWithin,
  taxonomyNode,
  searchExpansion,
  suggestNode,
  type TaxonomyNode,
} from "@/lib/scholarshipTaxonomy";
import {
  STATE_NAMES,
  readScholarshipProfile,
  saveScholarshipProfile,
  clearScholarshipProfile,
  verdictFor,
  matchRank,
  type ScholarshipProfile,
  type MatchVerdict,
} from "@/lib/scholarshipMatch";
import {
  isVerifiedClosed,
  verifiedStatusLabel,
  type PublicScholarshipStatus,
} from "@/lib/scholarshipStatus";

const STAGE_LABELS: Record<StudentStage, string> = {
  "high-school": "High school",
  college: "In college",
  transfer: "Transferring",
};

/** August-first ordering: month 8 sorts 0, July sorts 11, varies sinks.
 *  (Pre-mount order only — once the clock arrives, deadline proximity
 *  takes over.) */
function seasonKey(s: Scholarship): number {
  if (s.deadlineMonth === null) return 99;
  return (s.deadlineMonth - 8 + 12) % 12;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December",
];

/** Months until the next occurrence of the deadline month (0 = this
 *  month); null for rolling/varies. */
function monthsUntil(s: Scholarship, nowMonth: number): number | null {
  if (s.deadlineMonth === null) return null;
  return (s.deadlineMonth - nowMonth + 12) % 12;
}

/** Closed for this cycle: the deadline passed 1-5 months ago (next one is
 *  7-11 months out). Within 6 months counts as in season. */
function isClosedCycle(
  s: Scholarship,
  nowMonth: number | null,
  verifiedStatus?: PublicScholarshipStatus,
): boolean {
  if (verifiedStatus) return isVerifiedClosed(verifiedStatus);
  if (nowMonth === null) return false;
  const until = monthsUntil(s, nowMonth);
  return until !== null && until >= 7;
}

/** Largest dollar figure in the display amount, for amount sorting.
 *  "Full tuition/ride" outranks any number; no figure at all sinks. */
function amountValue(s: Scholarship): number {
  if (/full\s+(tuition|ride|cost)/i.test(s.amount)) return 10_000_000;
  const nums = [...s.amount.matchAll(/\$([\d,]+)/g)].map((m) =>
    parseInt(m[1].replace(/,/g, ""), 10)
  );
  return nums.length ? Math.max(...nums) : 0;
}

type SortKey = "deadline" | "amount" | "name";

/** "January 2027" for the next occurrence of the deadline month. */
function nextDeadlineLabel(s: Scholarship, nowMonth: number, nowYear: number): string {
  const until = monthsUntil(s, nowMonth);
  if (until === null || s.deadlineMonth === null) return s.deadline;
  const year = s.deadlineMonth >= nowMonth ? nowYear : nowYear + 1;
  return `${MONTH_NAMES[s.deadlineMonth - 1]} ${year}`;
}

const STAGE_VALUES: (StudentStage | "all")[] = [
  "all",
  "high-school",
  "college",
  "transfer",
];

// ── Eligibility-layer statics (computed once per load, off the classified
//    data — no Date, no randomness, safe in the server render) ────────────

/** Entries carrying a tag at or under the node, any strength. */
const TAG_COUNTS: Map<string, number> = (() => {
  const m = new Map<string, number>();
  for (const n of SCHOLARSHIP_TAXONOMY) {
    if (!n.id.includes(".")) continue;
    let c = 0;
    for (const s of scholarships) {
      if (s.eligibility?.some((t) => isWithin(t.tag, n.id))) c++;
    }
    if (c > 0) m.set(n.id, c);
  }
  return m;
})();

/** States that actually gate at least one award, for the state select. */
const ACTIVE_STATES: string[] = (() => {
  const seen = new Set<string>();
  for (const s of scholarships) for (const c of s.geo?.states ?? []) seen.add(c);
  return [...seen].sort((a, b) =>
    (STATE_NAMES[a] ?? a).localeCompare(STATE_NAMES[b] ?? b)
  );
})();

/** Field-of-study select: optgroup per branch, "All X" first, leaves
 *  indented. Only options with classified entries render. */
const FIELD_GROUPS: { label: string; options: { id: string; label: string }[] }[] = (() => {
  const groups: { label: string; options: { id: string; label: string }[] }[] = [];
  const loose: { id: string; label: string }[] = [];
  for (const n of SCHOLARSHIP_TAXONOMY) {
    if (n.parent !== "field") continue;
    const kids = SCHOLARSHIP_TAXONOMY.filter((k) => k.parent === n.id);
    if (kids.length === 0) {
      if (TAG_COUNTS.has(n.id)) loose.push({ id: n.id, label: n.label });
      continue;
    }
    const options: { id: string; label: string }[] = [];
    if (TAG_COUNTS.has(n.id)) options.push({ id: n.id, label: `All ${n.label.toLowerCase()}` });
    for (const k of kids) {
      if (TAG_COUNTS.has(k.id)) options.push({ id: k.id, label: k.label });
      for (const g of SCHOLARSHIP_TAXONOMY.filter((x) => x.parent === k.id)) {
        if (TAG_COUNTS.has(g.id)) options.push({ id: g.id, label: `· ${g.label}` });
      }
    }
    if (options.length) groups.push({ label: n.label, options });
  }
  if (loose.length) groups.unshift({ label: "Fields", options: loose });
  return groups;
})();

/** More-filters panel groups. Only nodes with classified entries render. */
const FILTER_GROUPS: { label: string; ids: string[] }[] = [
  {
    label: "Military & service",
    ids: [
      "affiliation.military.family",
      "affiliation.military.gold-star",
      "affiliation.military.veteran-self",
      "affiliation.military.guard-reserve",
      "affiliation.first-responder-family",
    ],
  },
  {
    label: "Life circumstances",
    ids: [
      "circumstance.foster-care",
      "circumstance.disability",
      "circumstance.health",
      "circumstance.loss-of-parent",
      "circumstance.caregiver",
      "circumstance.homeless",
      "circumstance.justice-impacted",
      "circumstance.migrant-farmworker",
      "circumstance.recovery",
      "circumstance.adult-learner",
    ],
  },
  {
    label: "Identity & background",
    ids: [
      "identity.first-gen",
      "identity.women",
      "identity.black",
      "identity.latino",
      "identity.native",
      "identity.aapi",
      "identity.lgbtq",
      "identity.immigrant-refugee",
    ],
  },
  {
    label: "Connections",
    ids: [
      "affiliation.employer",
      "affiliation.union-family",
      "affiliation.religious",
      "affiliation.membership.honor-society",
      "affiliation.membership.youth-orgs",
      "affiliation.membership.greek",
    ],
  },
  {
    label: "How it's awarded",
    ids: [
      "basis.need",
      "basis.merit-academic",
      "basis.talent-competition",
      "basis.essay-contest",
      "basis.service-commitment",
      "basis.athletics",
      "basis.community-service",
    ],
  },
];

/** Match Me opt-in groups — phrased as offers; ethnicity is never asked. */
const MATCH_GROUPS: { id: string; label: string }[] = [
  { id: "affiliation.military.family", label: "Military or veteran family" },
  { id: "affiliation.military.gold-star", label: "Lost a parent who served" },
  { id: "affiliation.military.veteran-self", label: "I served / I'm serving" },
  { id: "affiliation.first-responder-family", label: "First responder family" },
  { id: "affiliation.union-family", label: "Union member or union family" },
  { id: "circumstance.foster-care", label: "Foster care experience" },
  { id: "circumstance.disability", label: "I have a disability" },
  { id: "circumstance.health", label: "A serious health condition" },
  { id: "circumstance.loss-of-parent", label: "Lost a parent or guardian" },
  { id: "circumstance.caregiver", label: "I'm a caregiver" },
  { id: "circumstance.homeless", label: "Housing has been unstable" },
  { id: "circumstance.justice-impacted", label: "Justice-impacted" },
  { id: "circumstance.migrant-farmworker", label: "Migrant or farmworker family" },
  { id: "circumstance.adult-learner", label: "Adult / returning student" },
];

/** Fuzzy haystack per entry, tag labels + synonyms folded in. */
const HAYSTACKS: Map<string, string> = (() => {
  const m = new Map<string, string>();
  for (const s of scholarships) {
    m.set(
      s.id,
      `${s.name} ${s.who} ${s.amount} ${(s.tags ?? []).join(" ")} ${
        s.eligibility ? searchExpansion(s.eligibility) : ""
      }`
    );
  }
  return m;
})();

/** "scholarships for piano players" → "piano players". */
function stripQueryBoilerplate(q: string): string {
  return q
    .replace(/^\s*(scholarships?|awards?|grants?|money|aid)\s+(for|about|to)\s+/i, "")
    .replace(/^\s*(scholarships?|awards?|grants?)\s+/i, "");
}

/** Card chips: the most specific required niche + one stated preference.
 *  basis.* stays off the cards (award mechanics, not "who it's for"). */
function cardChips(s: Scholarship): { forChip?: string; prefChip?: string } {
  if (!s.eligibility?.length) return {};
  const req = s.eligibility
    .filter((t) => t.strength === "required" && !t.tag.startsWith("basis."))
    .sort((a, b) => b.tag.length - a.tag.length)[0];
  const pref = s.eligibility.find(
    (t) => t.strength === "preferred" && !t.tag.startsWith("basis.")
  );
  return {
    forChip: req ? taxonomyNode(req.tag)?.label : undefined,
    prefChip: pref ? taxonomyNode(pref.tag)?.label : undefined,
  };
}

const VERDICT_STYLE: Record<MatchVerdict["level"], { dot: string; text: string; label: string }> = {
  strong: { dot: "bg-forest", text: "text-forest", label: "Strong match" },
  likely: { dot: "bg-forest/60", text: "text-forest/90", label: "Likely eligible" },
  possibly: { dot: "bg-amber-deep", text: "text-amber-deep", label: "Worth checking" },
  not: { dot: "bg-stone/60", text: "text-stone", label: "Likely not for you" },
};

export default function ScholarshipFinder() {
  const frame = useFrame();
  const searchParams = useSearchParams();
  const [stage, setStage] = useState<StudentStage | "all">("all");
  const [undocOnly, setUndocOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(30);
  // The clock, post-mount (see the header comment).
  const [now, setNow] = useState<{ m: number; y: number } | null>(null);
  const [verifiedStatuses, setVerifiedStatuses] = useState<Map<string, PublicScholarshipStatus>>(new Map());
  useEffect(() => {
    const d = new Date();
    setNow({ m: d.getMonth() + 1, y: d.getFullYear() });
  }, []);
  useEffect(() => {
    let active = true;
    fetch("/api/scholarship-status")
      .then((response) => (response.ok ? response.json() : { statuses: [] }))
      .then((payload: { statuses?: PublicScholarshipStatus[] }) => {
        if (!active) return;
        setVerifiedStatuses(new Map((payload.statuses ?? []).map((status) => [status.id, status])));
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);
  // When the opening stage came from the person's profile, we say so (subtle,
  // editable) — never a claim of confirmed eligibility, just where we started.
  const [autoNote, setAutoNote] = useState("");
  const [sort, setSort] = useState<SortKey>("deadline");

  // Eligibility-layer filters (all default-empty, so the server render and
  // the first client paint agree).
  const [stateSel, setStateSel] = useState("");
  const [fieldSel, setFieldSel] = useState("");
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [moreOpen, setMoreOpen] = useState(false);

  // Match Me profile — read post-mount; null means "not on this device".
  const [profile, setProfile] = useState<ScholarshipProfile | null>(null);
  const [matchOpen, setMatchOpen] = useState(false);
  useEffect(() => {
    const p = readScholarshipProfile();
    if (p) {
      setProfile(p);
      if (p.state) setStateSel((cur) => cur || p.state!);
      if (p.field) setFieldSel((cur) => cur || p.field!);
    }
  }, []);

  function updateProfile(patch: Partial<ScholarshipProfile>) {
    setProfile((cur) => {
      const next: ScholarshipProfile = { on: false, ...cur, ...patch };
      saveScholarshipProfile(next);
      return next;
    });
  }
  function forgetProfile() {
    clearScholarshipProfile();
    setProfile(null);
    setMatchOpen(false);
  }
  // The state/field selects do double duty: they filter the list AND stand
  // as Match Me answers once a profile exists (one control, one truth).
  function pickState(code: string) {
    setStateSel(code);
    if (profile) updateProfile({ state: code || undefined });
  }
  function pickField(id: string) {
    setFieldSel(id);
    if (profile) updateProfile({ field: id || undefined });
  }

  // Saved / applied marks — personal, local-first, account-synced. Read
  // post-mount so the server render (no marks) and first client paint agree,
  // same hydration discipline as the clock above.
  const [marks, setMarks] = useState<SavedScholarshipMap>({});
  const [view, setView] = useState<"all" | "saved" | "applied">("all");
  useEffect(() => {
    setMarks(readSavedScholarships());
  }, []);
  const summary = useMemo(() => summarizeSavedScholarships(marks), [marks]);

  function onToggleSave(id: string) {
    setMarks(toggleSavedScholarship(id));
  }
  function onToggleApplied(id: string, applied: boolean) {
    setMarks(setScholarshipApplied(id, applied));
  }

  // Audience doors (hero links + subnav) deep-link with ?stage / ?undoc / ?q
  // / ?state / ?field / ?tag — applied on mount and on every client-side
  // param change.
  useEffect(() => {
    const s = searchParams.get("stage");
    if (s && STAGE_VALUES.includes(s as StudentStage | "all")) {
      setStage(s as StudentStage | "all");
      setAutoNote(""); // an explicit deep-link is a manual choice, not a guess
    }
    if (searchParams.get("undoc") === "1") setUndocOnly(true);
    const q = searchParams.get("q");
    if (q) setQuery(q);
    const st = searchParams.get("state");
    if (st && STATE_NAMES[st.toUpperCase()]) setStateSel(st.toUpperCase());
    const f = searchParams.get("field");
    if (f && taxonomyNode(f)) setFieldSel(f);
    const tg = searchParams.get("tag");
    if (tg && taxonomyNode(tg)) setTagFilters((cur) => (cur.includes(tg) ? cur : [...cur, tg]));
  }, [searchParams]);

  // Profile-based default (mount-once). Skipped when the URL already names a
  // stage (that intent wins) — otherwise start where the person's normalized
  // profile points, with an editable "Started with X" note.
  useEffect(() => {
    if (searchParams.get("stage")) return;
    const { stage: guess, reason } = scholarshipDefault(readContext());
    if (guess) {
      setStage(guess);
      setAutoNote(`Started with ${STAGE_LABELS[guess]} because ${reason}.`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Any manual stage pick clears the profile note.
  function pickStage(next: StudentStage | "all") {
    setStage(next);
    setAutoNote("");
  }

  useEffect(() => {
    setVisible(30);
  }, [stage, undocOnly, query, sort, view, stateSel, fieldSel, tagFilters]);

  // One taxonomy suggestion for the current query — an offer, not a takeover.
  const cleanQuery = stripQueryBoilerplate(query.trim());
  const suggestion: TaxonomyNode | null = useMemo(() => {
    if (!cleanQuery) return null;
    const n = suggestNode(cleanQuery);
    if (!n || !TAG_COUNTS.has(n.id)) return null;
    if (fieldSel && isWithin(n.id, fieldSel)) return null;
    if (tagFilters.some((t) => isWithin(n.id, t))) return null;
    return n;
  }, [cleanQuery, fieldSel, tagFilters]);

  function applySuggestion(n: TaxonomyNode) {
    if (n.id.startsWith("field.")) setFieldSel(n.id);
    else setTagFilters((cur) => [...cur, n.id]);
    setQuery("");
  }

  // While BROWSING, state/field are hard filters (factual narrowing the
  // person asked for). With MATCHING ON they become profile answers instead:
  // nothing is excluded — mismatches sink greyed with their reason, per the
  // never-hide contract.
  const matchingOn = !!profile?.on;

  const { open, closed } = useMemo(() => {
    let list = [...scholarships].sort((a, b) => seasonKey(a) - seasonKey(b));
    if (stage !== "all") list = list.filter((s) => s.stages.includes(stage));
    if (undocOnly) list = list.filter((s) => s.openToUndocumented);
    // Your state: national + your state stay; other states' residency-
    // required awards drop (factual, not personal). Unclassified geo stays.
    if (stateSel && !matchingOn) {
      list = list.filter(
        (s) =>
          !s.geo ||
          s.geo.scope === "national" ||
          (s.geo.states ?? []).includes(stateSel)
      );
    }
    // Tag filters: OR within a dimension, AND across dimensions; any
    // strength counts (a music-relevant award belongs under Music).
    const activeTags = fieldSel && !matchingOn ? [fieldSel, ...tagFilters] : tagFilters;
    if (activeTags.length) {
      const byDim = new Map<string, string[]>();
      for (const t of activeTags) {
        const d = t.split(".")[0];
        byDim.set(d, [...(byDim.get(d) ?? []), t]);
      }
      list = list.filter((s) => {
        if (!s.eligibility?.length) return false;
        for (const ids of byDim.values()) {
          if (!ids.some((id) => s.eligibility!.some((t) => isWithin(t.tag, id))))
            return false;
        }
        return true;
      });
    }
    const q = cleanQuery;
    if (q) {
      list = list
        .map((s) => {
          let score = fuzzyScore(q, HAYSTACKS.get(s.id) ?? "");
          // Strength-aware boost when the query names a taxonomy node.
          if (score > 0 && suggestion && s.eligibility) {
            const hit = s.eligibility.find((t) => isWithin(t.tag, suggestion.id));
            if (hit)
              score +=
                hit.strength === "required" ? 0.6 : hit.strength === "preferred" ? 0.4 : 0.2;
          }
          return { s, score };
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((r) => r.s);
    }
    if (now === null) return { open: list, closed: [] as Scholarship[] };
    // The open/closed partition ALWAYS holds; the chosen sort applies
    // within each side. Deadline sort: soonest first (rolling floats
    // mid-list at 6.5), search keeping relevance order. An explicit
    // amount/name sort overrides relevance — the person asked for it.
    const bySort = (a: Scholarship, b: Scholarship): number => {
      if (sort === "amount") return amountValue(b) - amountValue(a);
      if (sort === "name") return a.name.localeCompare(b.name);
      const ua = monthsUntil(a, now.m) ?? 6.5;
      const ub = monthsUntil(b, now.m) ?? 6.5;
      return ua - ub;
    };
    const openList = list.filter((s) => !isClosedCycle(s, now.m, verifiedStatuses.get(s.id)));
    if (sort !== "deadline" || !q) openList.sort(bySort);
    const closedList = list
      .filter((s) => isClosedCycle(s, now.m, verifiedStatuses.get(s.id)))
      .sort(
        sort === "deadline"
          ? (a, b) => (monthsUntil(a, now.m) ?? 99) - (monthsUntil(b, now.m) ?? 99)
          : bySort
      );
    return { open: openList, closed: closedList };
  }, [stage, undocOnly, query, now, sort, stateSel, fieldSel, tagFilters, cleanQuery, suggestion, matchingOn, verifiedStatuses]);

  // Verdicts, when matching is on — computed post-mount only (profile is
  // storage-read), so the server render never shows them.
  const matching = !!profile?.on && now !== null;
  const verdicts = useMemo(() => {
    if (!matching || !profile) return null;
    const m = new Map<string, MatchVerdict | null>();
    for (const s of open) m.set(s.id, verdictFor(s, profile));
    for (const s of closed) m.set(s.id, verdictFor(s, profile));
    return m;
  }, [matching, profile, open, closed]);

  // Matching re-orders the OPEN side only (verdict rank, then the chosen
  // sort); the closed-cycle section keeps its own honest order at the end.
  const openShown = useMemo(() => {
    if (!verdicts) return open;
    return [...open].sort((a, b) => {
      const r = matchRank(verdicts.get(a.id) ?? null) - matchRank(verdicts.get(b.id) ?? null);
      return r !== 0 ? r : 0;
    });
  }, [open, verdicts]);

  const results = useMemo(() => [...openShown, ...closed], [openShown, closed]);
  // The saved/applied "view" is a light overlay on top of the filtered
  // results — kept out of the heavy sort memo so a checkbox click doesn't
  // re-sort the whole list.
  const shown = useMemo(() => {
    if (view === "all") return results;
    return results.filter((s) => {
      const m = marks[s.id];
      if (!m) return false;
      return view === "saved" ? !!m.saved && !m.applied : !!m.applied;
    });
  }, [results, view, marks]);

  const matchCounts = useMemo(() => {
    if (!verdicts) return null;
    const c = { strong: 0, likely: 0, possibly: 0, not: 0 };
    for (const s of openShown) {
      const v = verdicts.get(s.id);
      if (v) c[v.level]++;
    }
    return c;
  }, [verdicts, openShown]);

  const activePills: { key: string; label: string; clear: () => void }[] = [
    ...(stateSel
      ? [{ key: "state", label: STATE_NAMES[stateSel] ?? stateSel, clear: () => pickState("") }]
      : []),
    ...(fieldSel
      ? [{
          key: "field",
          label: taxonomyNode(fieldSel)?.label ?? fieldSel,
          clear: () => pickField(""),
        }]
      : []),
    ...tagFilters.map((t) => ({
      key: t,
      label: taxonomyNode(t)?.label ?? t,
      clear: () => setTagFilters((cur) => cur.filter((x) => x !== t)),
    })),
  ];

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            ["all", "All"],
            ["high-school", STAGE_LABELS["high-school"]],
            ["college", STAGE_LABELS.college],
            ["transfer", STAGE_LABELS.transfer],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => pickStage(value)}
            aria-pressed={stage === value}
            className={`rounded-md border-2 px-3.5 py-1.5 text-sm font-bold transition-colors ${
              stage === value
                ? "border-ink bg-amber text-ink shadow-[2px_2px_0_#11211c]"
                : "border-ink/15 bg-cream text-stone hover:border-ink/40 hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
        <label className="ml-1 flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
          <input
            type="checkbox"
            checked={undocOnly}
            onChange={(e) => setUndocOnly(e.target.checked)}
            className="h-4 w-4 accent-forest"
          />
          No citizenship requirement
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search: piano, nursing, children of veterans, transfer…"
          className="w-full flex-1 rounded-lg border-2 border-ink/15 bg-cream px-4 py-2.5 text-base text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
        />
        <label className="flex shrink-0 items-center gap-2 text-sm font-semibold text-ink">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border-2 border-ink/15 bg-cream px-3 py-2.5 text-base font-semibold text-ink focus:border-ink focus:outline-none"
          >
            <option value="deadline">Next deadline</option>
            <option value="amount">Biggest amount</option>
            <option value="name">Name A–Z</option>
          </select>
        </label>
      </div>

      {/* Narrowing row — state, field, deeper filters. Every option shown
          exists in the classified data, with its live count. */}
      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <label className="flex items-center gap-2 text-sm font-semibold text-ink">
          Your state
          <select
            value={stateSel}
            onChange={(e) => pickState(e.target.value)}
            className="max-w-[11rem] rounded-lg border-2 border-ink/15 bg-cream px-2.5 py-2 text-sm font-semibold text-ink focus:border-ink focus:outline-none"
          >
            <option value="">Anywhere</option>
            {ACTIVE_STATES.map((c) => (
              <option key={c} value={c}>
                {STATE_NAMES[c] ?? c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-ink">
          Field of study
          <select
            value={fieldSel}
            onChange={(e) => pickField(e.target.value)}
            className="max-w-[13rem] rounded-lg border-2 border-ink/15 bg-cream px-2.5 py-2 text-sm font-semibold text-ink focus:border-ink focus:outline-none"
          >
            <option value="">Any field</option>
            {FIELD_GROUPS.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.options.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label} ({TAG_COUNTS.get(o.id)})
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => setMoreOpen((v) => !v)}
          aria-expanded={moreOpen}
          className={`inline-flex items-center gap-1.5 rounded-md border-2 px-3 py-1.5 text-sm font-bold transition-colors ${
            moreOpen || tagFilters.length
              ? "border-ink bg-cream text-ink"
              : "border-ink/15 bg-cream text-stone hover:border-ink/40 hover:text-ink"
          }`}
        >
          More filters
          {tagFilters.length > 0 && (
            <span className="rounded-full bg-forest px-1.5 text-[11px] font-bold text-cream">
              {tagFilters.length}
            </span>
          )}
          <CaretDown className={`h-3.5 w-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* More filters — expands in place, desktop and mobile alike. */}
      {moreOpen && (
        <div className="mt-3 rounded-xl border-2 border-ink/15 bg-cream p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FILTER_GROUPS.map((g) => {
              const opts = g.ids.filter((id) => TAG_COUNTS.has(id));
              if (!opts.length) return null;
              return (
                <div key={g.label}>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone">
                    {g.label}
                  </p>
                  <div className="mt-2 space-y-1.5">
                    {opts.map((id) => (
                      <label
                        key={id}
                        className="flex cursor-pointer items-center gap-2 text-sm text-ink"
                      >
                        <input
                          type="checkbox"
                          checked={tagFilters.includes(id)}
                          onChange={(e) =>
                            setTagFilters((cur) =>
                              e.target.checked ? [...cur, id] : cur.filter((x) => x !== id)
                            )
                          }
                          className="h-4 w-4 accent-forest"
                        />
                        {taxonomyNode(id)?.label}
                        <span className="text-stone/70">({TAG_COUNTS.get(id)})</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 border-t border-sand pt-2.5 text-xs leading-5 text-stone">
            Filters only narrow this list on this device — nothing is asked,
            nothing is sent anywhere. Awards where one of these is a stated
            preference (not a requirement) stay included.
          </p>
        </div>
      )}

      {/* Search → filter offer */}
      {suggestion && (
        <p className="mt-2.5 text-sm font-medium text-stone">
          Looking for {taxonomyNode(suggestion.id)?.label.toLowerCase()}?{" "}
          <button
            type="button"
            onClick={() => applySuggestion(suggestion)}
            className="font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Filter by {suggestion.label} ({TAG_COUNTS.get(suggestion.id)})
          </button>
        </p>
      )}

      {/* Active filter pills */}
      {activePills.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {activePills.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={p.clear}
              className="inline-flex items-center gap-1.5 rounded-md border-2 border-ink bg-amber px-2.5 py-1 text-xs font-bold text-ink shadow-[2px_2px_0_#11211c] transition-transform hover:-translate-y-0.5"
            >
              {p.label}
              <XIcon className="h-3 w-3" />
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              pickState("");
              pickField("");
              setTagFilters([]);
              setQuery("");
            }}
            className="text-xs font-semibold text-stone underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Match me — optional, local-first, never required to browse. */}
      <div className="mt-4 rounded-xl border-2 border-ink/15 bg-cream">
        <button
          type="button"
          onClick={() => setMatchOpen((v) => !v)}
          aria-expanded={matchOpen}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        >
          <span className="text-sm font-bold text-ink">
            Match me with scholarships
            <span className="ml-2 text-xs font-semibold text-stone">
              optional · stays on this device
            </span>
          </span>
          <span className="flex items-center gap-2.5">
            {profile?.on && (
              <span className="rounded-full bg-forest px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream">
                On
              </span>
            )}
            <CaretDown className={`h-4 w-4 text-stone transition-transform ${matchOpen ? "rotate-180" : ""}`} />
          </span>
        </button>
        {matchOpen && (
          <div className="border-t border-sand px-4 py-4">
            <p className="text-sm leading-6 text-stone">
              Tell us as much or as little as you like and we&apos;ll sort this
              list for you — what fits rises, what appears out of reach sinks
              (greyed, with the reason, never hidden). Your stage, state, and
              field picks above already count. Answers stay on this device
              (and your account if you sign in), and only sort this list.
            </p>
            <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={!!profile?.firstGen}
                  onChange={(e) => updateProfile({ firstGen: e.target.checked || undefined })}
                  className="h-4 w-4 accent-forest"
                />
                First-generation college student
              </label>
              {MATCH_GROUPS.filter((g) => TAG_COUNTS.has(g.id)).map((g) => (
                <label key={g.id} className="flex cursor-pointer items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={!!profile?.groups?.includes(g.id)}
                    onChange={(e) =>
                      updateProfile({
                        groups: e.target.checked
                          ? [...(profile?.groups ?? []), g.id]
                          : (profile?.groups ?? []).filter((x) => x !== g.id),
                      })
                    }
                    className="h-4 w-4 accent-forest"
                  />
                  {g.label}
                </label>
              ))}
            </div>
            <p className="mt-2.5 text-xs leading-5 text-stone">
              All of these are optional offers, not questions you owe anyone.
              Skipping one never marks you ineligible — it just means we
              can&apos;t vouch either way. We never ask about race or
              ethnicity; awards with those criteria show a &ldquo;worth
              checking&rdquo; note instead.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  updateProfile({ on: !profile?.on, state: stateSel || undefined, field: fieldSel || undefined })
                }
                className={`rounded-md border-2 px-4 py-1.5 text-sm font-bold transition-colors ${
                  profile?.on
                    ? "border-ink bg-forest text-cream"
                    : "border-ink bg-amber text-ink shadow-[2px_2px_0_#11211c]"
                }`}
              >
                {profile?.on ? "Matching is on — turn it off" : "Turn on matching"}
              </button>
              {profile && (
                <button
                  type="button"
                  onClick={forgetProfile}
                  className="text-xs font-semibold text-stone underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  Forget everything I entered
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="mt-3 text-sm font-medium text-stone">
        {view === "saved" ? (
          <>
            {shown.length} on your list to apply for
          </>
        ) : view === "applied" ? (
          <>
            {shown.length} you&apos;ve marked applied
          </>
        ) : now === null ? (
          <>
            {results.length} of {scholarships.length} scholarships
            {stage !== "all" && ` · ${STAGE_LABELS[stage as StudentStage]}`}
            {undocOnly && " · no citizenship requirement"}
          </>
        ) : (
          <>
            {openShown.length} open, opening soon, or in season
            {closed.length > 0 &&
              ` · ${closed.length} between cycles (greyed, at the end)`}
            {stage !== "all" && ` · ${STAGE_LABELS[stage as StudentStage]}`}
            {undocOnly && " · no citizenship requirement"}
            {stateSel && !matchCounts && ` · national + ${STATE_NAMES[stateSel]}`}
          </>
        )}
        {matchCounts
          ? `, sorted by fit: ${matchCounts.strong} strong · ${matchCounts.likely} likely · ${matchCounts.possibly} worth checking · ${matchCounts.not} likely not.`
          : sort === "deadline"
            ? ", ordered by next deadline."
            : sort === "amount"
              ? ", biggest amounts first (full rides on top, unlisted amounts last)."
              : ", alphabetical."}
      </p>

      {autoNote && (
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-sm text-forest">
          <span className="font-semibold">{autoNote}</span>
          <button
            type="button"
            onClick={() => pickStage("all")}
            className="font-semibold underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Show all
          </button>
        </p>
      )}

      {/* Your list — appears once you've saved or applied to anything */}
      {now !== null && (summary.toApply + summary.applied > 0 || view !== "all") && (
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-sand bg-cream p-2.5">
          <span className="pl-1 text-sm font-bold text-ink">Your list:</span>
          {(
            [
              ["all", "All scholarships"],
              ["saved", `To apply · ${summary.toApply}`],
              ["applied", `Applied · ${summary.applied}`],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={`rounded-md border-2 px-3 py-1 text-sm font-bold transition-colors ${
                view === v
                  ? "border-ink bg-forest text-cream"
                  : "border-ink/15 bg-cream text-stone hover:border-ink/40 hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Cards — open cycles first, closed cycles greyed at the end */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {shown.slice(0, visible).map((s) => {
          const verifiedStatus = verifiedStatuses.get(s.id);
          const closedCycle = now !== null && isClosedCycle(s, now.m, verifiedStatus);
          const until = now === null ? null : monthsUntil(s, now.m);
          const thisMonth = until === 0;
          const mark = marks[s.id];
          const verdict = verdicts?.get(s.id) ?? null;
          const dimmed = closedCycle || verdict?.level === "not";
          const chips = cardChips(s);
          return (
            <a
              key={s.id}
              href={s.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                dimmed
                  ? "group flex h-full flex-col rounded-xl border-2 border-sand bg-cream/50 p-5 opacity-75 transition-opacity hover:opacity-100"
                  : "card-ink group flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
              }${mark?.applied ? " ring-2 ring-amber" : ""}`}
            >
              <div className="flex items-start justify-between gap-3">
                {verifiedStatus ? (
                  <p className={`text-sm font-bold ${closedCycle ? "text-stone" : "text-forest"}`}>
                    {verifiedStatusLabel(verifiedStatus)}
                    <span className="ml-1 font-medium">· human-verified</span>
                  </p>
                ) : closedCycle && now !== null ? (
                  <p className="text-sm font-bold text-stone">
                    Closed for this cycle · reopens ahead of{" "}
                    {nextDeadlineLabel(s, now.m, now.y)}
                  </p>
                ) : (
                  <p className="font-display text-sm font-bold text-terracotta">
                    {now !== null && s.deadlineMonth !== null
                      ? `Deadline: typically ${nextDeadlineLabel(s, now.m, now.y)}`
                      : s.deadline}
                    {thisMonth && (
                      <span className="ml-2 rounded-full bg-terracotta px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream">
                        This month
                      </span>
                    )}
                  </p>
                )}
                {s.openToUndocumented && (
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      dimmed ? "bg-stone/30 text-ink/60" : "bg-forest text-cream"
                    }`}
                  >
                    No citizenship req.
                  </span>
                )}
              </div>
              <h3
                className={`mt-1.5 font-display text-lg font-bold leading-snug ${
                  dimmed
                    ? "text-ink/60"
                    : "text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4"
                }`}
              >
                {s.name}
              </h3>
              <p
                className={`mt-1 font-display text-base font-bold ${
                  dimmed ? "text-stone" : "text-forest"
                }`}
              >
                {s.amount}
              </p>
              <p className={`mt-1.5 flex-1 text-sm leading-6 ${dimmed ? "text-stone/80" : "text-stone"}`}>
                {s.who}
              </p>
              {/* Fit line (matching on) or eligibility chips (browsing) */}
              {verdict ? (
                <p className={`mt-2 flex items-start gap-1.5 text-xs font-semibold leading-5 ${VERDICT_STYLE[verdict.level].text}`}>
                  <span
                    aria-hidden
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${VERDICT_STYLE[verdict.level].dot}`}
                  />
                  {VERDICT_STYLE[verdict.level].label} — {verdict.reason}. Confirm on the official site.
                </p>
              ) : (
                (chips.forChip || chips.prefChip) && (
                  <p className="mt-2 flex flex-wrap gap-1.5">
                    {chips.forChip && (
                      <span className="rounded-full border border-forest/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-forest">
                        For: {chips.forChip}
                      </span>
                    )}
                    {chips.prefChip && (
                      <span className="rounded-full border border-amber-deep/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink/70">
                        Preference: {chips.prefChip}
                      </span>
                    )}
                  </p>
                )
              )}
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                {s.stages.map((st) => (
                  <span
                    key={st}
                    className="text-[11px] font-bold uppercase tracking-wide text-ink/50"
                  >
                    {STAGE_LABELS[st]}
                  </span>
                ))}
                <span
                  className={`ml-auto inline-flex items-center gap-1 text-sm font-semibold ${
                    dimmed ? "text-stone" : "text-forest"
                  }`}
                >
                  Official site
                  <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </p>
              {/* Save / applied — personal, saved to this device (and your
                  account if you sign in). Buttons live inside the card link,
                  so they stop the click from opening the official site. */}
              <div className="mt-3 flex items-center gap-2 border-t border-sand pt-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleSave(s.id);
                  }}
                  aria-pressed={!!mark?.saved}
                  aria-label={mark?.saved ? "Remove from your list" : "Save to your list"}
                  className={`inline-flex items-center gap-1.5 rounded-md border-2 px-2.5 py-1 text-xs font-bold transition-colors ${
                    mark?.saved
                      ? "border-forest bg-forest text-cream"
                      : "border-ink/15 bg-cream text-stone hover:border-forest hover:text-forest"
                  }`}
                >
                  <BookmarkSimple
                    weight={mark?.saved ? "fill" : "regular"}
                    className="h-3.5 w-3.5"
                  />
                  {mark?.saved ? "Saved" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleApplied(s.id, !mark?.applied);
                  }}
                  aria-pressed={!!mark?.applied}
                  aria-label={mark?.applied ? "Unmark as applied" : "Mark as applied"}
                  className={`inline-flex items-center gap-1.5 rounded-md border-2 px-2.5 py-1 text-xs font-bold transition-colors ${
                    mark?.applied
                      ? "border-amber bg-amber text-ink"
                      : "border-ink/15 bg-cream text-stone hover:border-amber hover:text-ink"
                  }`}
                >
                  <CheckCircle
                    weight={mark?.applied ? "fill" : "regular"}
                    className="h-3.5 w-3.5"
                  />
                  {mark?.applied ? "Applied" : "Mark applied"}
                </button>
              </div>
            </a>
          );
        })}
      </div>

      {shown.length > visible && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + 30)}
            className="btn-ink inline-flex items-center rounded-md bg-cream px-6 py-2.5 text-sm font-bold text-ink"
          >
            Show {Math.min(30, shown.length - visible)} more
          </button>
        </div>
      )}

      {shown.length === 0 &&
        (view === "saved" ? (
          <p className="mt-6 text-base leading-7 text-stone">
            No scholarships on your list yet. Tap{" "}
            <span className="font-semibold text-forest">Save</span> on any card to
            build a shortlist you want to apply for — it stays on this device, and
            follows you if you sign in.
          </p>
        ) : view === "applied" ? (
          <p className="mt-6 text-base leading-7 text-stone">
            Nothing marked applied yet. When you send an application, tap{" "}
            <span className="font-semibold text-ink">Mark applied</span> on its card
            to check it off here.
          </p>
        ) : (
          <p className="mt-6 text-base leading-7 text-stone">
            Nothing matches those filters
            {activePills.length > 0 && (
              <>
                {" "}
                — try removing{" "}
                <span className="font-semibold text-ink">
                  {activePills[activePills.length - 1].label}
                </span>
              </>
            )}
            . Widen the search, and remember this
            list is a curated starting lineup, not the whole universe:{" "}
            <a
              href={frameHref("/learn/college/finding-scholarships", frame)}
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              Finding Scholarships You&apos;ll Actually Win
            </a>{" "}
            covers how to dig further.
          </p>
        ))}

      <p className="mt-8 rounded-xl border border-sand bg-cream p-4 text-sm leading-6 text-stone">
        Every entry checked by hand against the program&apos;s official
        site by Shinjoo, Empower&apos;s founder, and verified {VERIFIED_AS_OF}. Exact dates and amounts shift a little each year, so
        always confirm on the official page before you plan around one;
        that&apos;s where the link on each card goes. We never list
        scholarships that charge fees or exist to harvest your data. Run a
        real scholarship we should include? Email{" "}
        <a
          href="mailto:scholarships@economicmobilityproject.org"
          className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
        >
          scholarships@economicmobilityproject.org
        </a>
        .
      </p>
    </div>
  );
}
