// The scholarship eligibility taxonomy (August 2026, phase 1 of
// docs/scholarship-taxonomy-spec.md). Internal structure only — users never
// see these ids. Rules that keep this honest:
//
// - A node exists only because ≥1 real scholarship needs it. Never add
//   speculative siblings "for completeness"; delete nodes that go unused.
// - Dot-path ids make hierarchy self-evident ("field.arts.music" is a child
//   of "field.arts"). Depth cap is 4. Levels 1-2 may surface in filter UI
//   (phase 4); deeper levels are search-and-picker territory only.
// - `synonyms` are search fodder (folded into the finder's fuzzy haystack in
//   phase 3), never displayed. Keep them lowercase, and don't add bare
//   generic words that would mis-match (the glossary auto-linker lesson).
// - `sensitive: true` marks tags whose Match Me questions (phase 5) must be
//   opt-in expanders, never up-front asks. Filtering by them stays open to
//   everyone — sensitivity governs what we ASK, not what we show.
//
// Strengths ("required" / "preferred" / "relevant") live on each
// scholarship's assignment, not here — the same tag can be a hard rule on
// one award and a stated preference on another.

export type CriterionStrength = "required" | "preferred" | "relevant";

export interface EligibilityTag {
  /** A taxonomy node id, e.g. "field.arts.music". */
  tag: string;
  strength: CriterionStrength;
}

export interface TaxonomyNode {
  id: string;
  /** Human label, sentence-cased, shown in filter UI and card chips. */
  label: string;
  parent?: string;
  /** Search-only aliases. Never displayed. */
  synonyms?: string[];
  /** Ask-side sensitivity (Match Me opt-in gating). */
  sensitive?: boolean;
}

export const SCHOLARSHIP_TAXONOMY: TaxonomyNode[] = [
  // ── Field of study / career ────────────────────────────────────────────
  { id: "field", label: "Field of study" },
  { id: "field.stem", label: "STEM", parent: "field", synonyms: ["science", "technology"] },
  { id: "field.stem.engineering", label: "Engineering", parent: "field.stem", synonyms: ["engineer"] },
  { id: "field.stem.computer-science", label: "Computer science & IT", parent: "field.stem", synonyms: ["software", "cybersecurity", "coding", "information technology"] },
  { id: "field.stem.geoscience", label: "Earth & geosciences", parent: "field.stem", synonyms: ["geology", "meteorology", "oceanography"] },
  { id: "field.stem.math-actuarial", label: "Math & actuarial science", parent: "field.stem", synonyms: ["mathematics", "actuary", "statistics"] },
  { id: "field.health", label: "Health care", parent: "field", synonyms: ["medical", "healthcare"] },
  { id: "field.health.nursing", label: "Nursing", parent: "field.health", synonyms: ["nurse", "rn", "lpn"] },
  { id: "field.health.medicine-prehealth", label: "Medicine & pre-health", parent: "field.health", synonyms: ["pre-med", "premed", "physician"] },
  { id: "field.health.allied-health", label: "Allied health & therapy", parent: "field.health", synonyms: ["occupational therapy", "physical therapy", "respiratory", "radiology", "lab sciences"] },
  { id: "field.health.dental", label: "Dental", parent: "field.health", synonyms: ["dentistry", "hygienist"] },
  { id: "field.business", label: "Business", parent: "field", synonyms: ["management", "entrepreneurship"] },
  { id: "field.business.accounting", label: "Accounting", parent: "field.business", synonyms: ["cpa", "auditing"] },
  { id: "field.business.finance", label: "Finance & economics", parent: "field.business", synonyms: ["economics", "econ", "banking"] },
  { id: "field.business.insurance-risk", label: "Insurance & risk management", parent: "field.business", synonyms: ["actuarial", "rmi"] },
  { id: "field.business.marketing", label: "Marketing & advertising", parent: "field.business", synonyms: ["advertising", "public relations"] },
  { id: "field.business.hospitality", label: "Hospitality & culinary", parent: "field.business", synonyms: ["culinary", "restaurant", "hotel", "tourism"] },
  { id: "field.trades", label: "Skilled trades", parent: "field", synonyms: ["vocational", "cte", "trade school", "technical"] },
  { id: "field.trades.welding", label: "Welding", parent: "field.trades", synonyms: ["welder"] },
  { id: "field.trades.electrical", label: "Electrical", parent: "field.trades", synonyms: ["electrician", "lineworker"] },
  { id: "field.trades.hvac", label: "HVAC & plumbing", parent: "field.trades", synonyms: ["plumbing", "plumber", "pipefitting"] },
  { id: "field.trades.automotive", label: "Automotive & diesel", parent: "field.trades", synonyms: ["mechanic", "diesel", "collision"] },
  { id: "field.trades.construction", label: "Construction", parent: "field.trades", synonyms: ["carpentry", "masonry", "concrete"] },
  { id: "field.trades.aviation-maintenance", label: "Aviation maintenance", parent: "field.trades", synonyms: ["avionics", "aircraft mechanic"] },
  { id: "field.arts", label: "Arts & creative", parent: "field", synonyms: ["creative"] },
  { id: "field.arts.music", label: "Music", parent: "field.arts", synonyms: ["musician"] },
  { id: "field.arts.music.instrumental", label: "Instrumental music", parent: "field.arts.music", synonyms: ["piano", "pianist", "violin", "violinist", "cello", "guitar", "flute", "trumpet", "band", "orchestra", "instrument"] },
  { id: "field.arts.music.vocal", label: "Vocal music", parent: "field.arts.music", synonyms: ["singer", "singing", "voice", "choir"] },
  { id: "field.arts.music.composition", label: "Music composition", parent: "field.arts.music", synonyms: ["composer", "songwriting"] },
  { id: "field.arts.visual-design", label: "Visual arts & design", parent: "field.arts", synonyms: ["graphic design", "illustration", "painting", "interior design", "fashion"] },
  { id: "field.arts.writing", label: "Writing & poetry", parent: "field.arts", synonyms: ["poetry", "poet", "creative writing", "essayist"] },
  { id: "field.arts.film-media", label: "Film & media arts", parent: "field.arts", synonyms: ["filmmaking", "photography", "broadcast", "animation"] },
  { id: "field.arts.performing", label: "Theater & dance", parent: "field.arts", synonyms: ["drama", "dance", "acting"] },
  { id: "field.education-teaching", label: "Education & teaching", parent: "field", synonyms: ["teacher", "teaching", "early childhood"] },
  { id: "field.journalism-media", label: "Journalism & communications", parent: "field", synonyms: ["journalist", "news", "communications"] },
  { id: "field.agriculture", label: "Agriculture & food", parent: "field", synonyms: ["farming", "horticulture", "animal science", "veterinary"] },
  { id: "field.aviation-flight", label: "Aviation & flight", parent: "field", synonyms: ["pilot", "aerospace", "aeronautics"] },
  { id: "field.public-service", label: "Public service & law", parent: "field", synonyms: ["criminal justice", "law enforcement", "government", "policy", "pre-law"] },
  { id: "field.psychology-social-work", label: "Psychology & social work", parent: "field", synonyms: ["counseling", "mental health careers"] },
  { id: "field.architecture-planning", label: "Architecture & planning", parent: "field", synonyms: ["urban planning", "landscape architecture"] },
  { id: "field.environment-conservation", label: "Environment & conservation", parent: "field", synonyms: ["wildlife", "forestry", "ecology", "sustainability"] },
  { id: "field.transportation-logistics", label: "Transportation & logistics", parent: "field", synonyms: ["maritime", "rail", "trucking", "supply chain"] },

  // ── Identity & heritage ────────────────────────────────────────────────
  { id: "identity", label: "Identity & background" },
  { id: "identity.black", label: "Black students", parent: "identity", synonyms: ["african american"] },
  { id: "identity.latino", label: "Latino & Hispanic students", parent: "identity", synonyms: ["hispanic", "latina", "latinx"] },
  { id: "identity.native", label: "Native & Indigenous students", parent: "identity", synonyms: ["american indian", "indigenous", "tribal", "alaska native", "native hawaiian"] },
  { id: "identity.aapi", label: "Asian & Pacific Islander students", parent: "identity", synonyms: ["asian american", "pacific islander"] },
  { id: "identity.women", label: "Women", parent: "identity", synonyms: ["female"] },
  { id: "identity.lgbtq", label: "LGBTQ+ students", parent: "identity", synonyms: ["gay", "lesbian", "transgender", "queer"], sensitive: true },
  { id: "identity.first-gen", label: "First-generation students", parent: "identity", synonyms: ["first generation", "first in family"] },
  { id: "identity.immigrant-refugee", label: "Immigrant & refugee students", parent: "identity", synonyms: ["immigrants", "refugee", "new american", "daca"], sensitive: true },

  // ── Life circumstances ─────────────────────────────────────────────────
  { id: "circumstance", label: "Life circumstances" },
  { id: "circumstance.foster-care", label: "Foster care experience", parent: "circumstance", synonyms: ["foster youth", "kinship care", "aged out"], sensitive: true },
  { id: "circumstance.disability", label: "Students with disabilities", parent: "circumstance", synonyms: ["disabled"], sensitive: true },
  { id: "circumstance.disability.blind-low-vision", label: "Blind & low vision", parent: "circumstance.disability", synonyms: ["visually impaired"], sensitive: true },
  { id: "circumstance.disability.deaf-hoh", label: "Deaf & hard of hearing", parent: "circumstance.disability", synonyms: ["hearing loss", "cochlear"], sensitive: true },
  { id: "circumstance.disability.learning-adhd", label: "Learning differences & ADHD", parent: "circumstance.disability", synonyms: ["dyslexia", "learning disability"], sensitive: true },
  { id: "circumstance.disability.autism", label: "Autistic students", parent: "circumstance.disability", synonyms: ["autism", "neurodivergent"], sensitive: true },
  { id: "circumstance.disability.physical", label: "Physical disabilities", parent: "circumstance.disability", synonyms: ["mobility", "amputee", "paralysis"], sensitive: true },
  { id: "circumstance.health", label: "Health conditions", parent: "circumstance", synonyms: ["illness", "medical condition"], sensitive: true },
  { id: "circumstance.health.cancer-survivor", label: "Cancer survivors & patients", parent: "circumstance.health", synonyms: ["cancer"], sensitive: true },
  { id: "circumstance.health.cancer-family", label: "Family affected by cancer", parent: "circumstance.health", synonyms: ["parent with cancer"], sensitive: true },
  { id: "circumstance.health.specific-condition", label: "Specific health conditions", parent: "circumstance.health", synonyms: ["hemophilia", "cystic fibrosis", "diabetes", "epilepsy", "sickle cell", "tourette", "arthritis", "narcolepsy", "hydrocephalus"], sensitive: true },
  { id: "circumstance.loss-of-parent", label: "Lost a parent or guardian", parent: "circumstance", synonyms: ["deceased parent", "orphan", "surviving child"], sensitive: true },
  { id: "circumstance.caregiver", label: "Student caregivers", parent: "circumstance", synonyms: ["caregiving", "caring for family"], sensitive: true },
  { id: "circumstance.homeless", label: "Housing insecurity", parent: "circumstance", synonyms: ["homeless", "unaccompanied youth"], sensitive: true },
  { id: "circumstance.justice-impacted", label: "Justice-impacted students", parent: "circumstance", synonyms: ["incarcerated parent", "reentry", "second chance"], sensitive: true },
  { id: "circumstance.migrant-farmworker", label: "Migrant & farmworker families", parent: "circumstance", synonyms: ["migrant", "farmworker"], sensitive: true },
  { id: "circumstance.recovery", label: "Recovery & mental health", parent: "circumstance", synonyms: ["addiction", "sobriety", "mental health"], sensitive: true },
  { id: "circumstance.adult-learner", label: "Adult & returning students", parent: "circumstance", synonyms: ["nontraditional", "returning to school", "adult student"] },

  // ── Service & affiliation ──────────────────────────────────────────────
  { id: "affiliation", label: "Family & affiliations" },
  { id: "affiliation.military", label: "Military families & veterans", parent: "affiliation", synonyms: ["armed forces", "service member"] },
  { id: "affiliation.military.gold-star", label: "Children of fallen service members", parent: "affiliation.military", synonyms: ["gold star", "fallen", "killed in action"], sensitive: true },
  { id: "affiliation.military.veteran-self", label: "Student veterans", parent: "affiliation.military", synonyms: ["veteran students"] },
  { id: "affiliation.military.family", label: "Military & veteran dependents", parent: "affiliation.military", synonyms: ["military child", "military spouse", "dependents of veterans"] },
  { id: "affiliation.military.guard-reserve", label: "National Guard & Reserve", parent: "affiliation.military", synonyms: ["national guard", "reservist", "rotc"] },
  { id: "affiliation.first-responder-family", label: "First responder families", parent: "affiliation", synonyms: ["firefighter", "police family", "emt", "line of duty"] },
  { id: "affiliation.employer", label: "Employer programs", parent: "affiliation", synonyms: ["employee", "team member"] },
  { id: "affiliation.union-family", label: "Union members & families", parent: "affiliation", synonyms: ["labor union", "teamsters"] },
  { id: "affiliation.religious", label: "Faith communities", parent: "affiliation", synonyms: ["church", "christian", "catholic", "jewish", "muslim", "islamic", "hindu", "denominational"] },
  { id: "affiliation.membership", label: "Member organizations", parent: "affiliation" },
  { id: "affiliation.membership.honor-society", label: "Honor societies", parent: "affiliation.membership", synonyms: ["phi theta kappa", "national honor society"] },
  { id: "affiliation.membership.youth-orgs", label: "Youth organizations", parent: "affiliation.membership", synonyms: ["4-h", "scouts", "girl scouts", "boys and girls club", "junior achievement"] },
  { id: "affiliation.membership.greek", label: "Fraternities & sororities", parent: "affiliation.membership", synonyms: ["sorority", "fraternity", "divine nine"] },

  // ── Basis of award ─────────────────────────────────────────────────────
  { id: "basis", label: "Award basis" },
  { id: "basis.need", label: "Financial need", parent: "basis", synonyms: ["need-based", "low income", "pell"] },
  { id: "basis.merit-academic", label: "Academic merit", parent: "basis", synonyms: ["gpa", "honors", "valedictorian"] },
  { id: "basis.talent-competition", label: "Talent & competitions", parent: "basis", synonyms: ["audition", "portfolio", "contest"] },
  { id: "basis.essay-contest", label: "Essay contests", parent: "basis", synonyms: ["essay competition", "oratorical", "speech contest"] },
  { id: "basis.service-commitment", label: "Service commitments", parent: "basis", synonyms: ["work obligation", "payback"] },
  { id: "basis.service-commitment.teacher-pipeline", label: "Teaching commitments", parent: "basis.service-commitment", synonyms: ["teach grant", "teaching service"] },
  { id: "basis.service-commitment.health-shortage", label: "Health shortage-area commitments", parent: "basis.service-commitment", synonyms: ["shortage facility", "underserved area service"] },
  { id: "basis.athletics", label: "Athletics", parent: "basis", synonyms: ["athlete", "sports"] },
  { id: "basis.community-service", label: "Community service & leadership", parent: "basis", synonyms: ["volunteering", "leadership award", "civic"] },
];

// ── Lookup helpers ────────────────────────────────────────────────────────

const byId = new Map(SCHOLARSHIP_TAXONOMY.map((n) => [n.id, n]));

export function taxonomyNode(id: string): TaxonomyNode | undefined {
  return byId.get(id);
}

/** True when `id` equals `ancestor` or sits anywhere under it — the
 *  hierarchical-matching rule: filtering on "field.arts.music" matches
 *  "field.arts.music.instrumental". Dot-path prefix IS the ancestry test,
 *  and the check script guarantees ids and parents agree with their paths. */
export function isWithin(id: string, ancestor: string): boolean {
  return id === ancestor || id.startsWith(ancestor + ".");
}

/** Every node under (and including) the given id. */
export function descendantsOf(id: string): TaxonomyNode[] {
  return SCHOLARSHIP_TAXONOMY.filter((n) => isWithin(n.id, id));
}

/** Top-level dimension of a tag id ("field.arts.music" → "field"). */
export function dimensionOf(id: string): string {
  return id.split(".")[0];
}

/** Ancestor chain from the top down, excluding the bare dimension root
 *  ("field.arts.music" → ["field.arts", "field.arts.music"]). */
export function ancestryOf(id: string): string[] {
  const parts = id.split(".");
  const out: string[] = [];
  for (let i = 2; i <= parts.length; i++) out.push(parts.slice(0, i).join("."));
  return out;
}

// ── Search integration (phase 3) ──────────────────────────────────────────
// The finder folds each classified entry's tag labels + synonyms + ancestor
// labels into its fuzzy haystack, so "piano" finds every award tagged
// anywhere under Music even when the word never appears in its prose.

import { queryTokensOf, tokenMatch, tokensOf } from "./fuzzy";

/** Search-only text for a set of assigned tags: labels, synonyms, and
 *  ancestor labels/synonyms. Never displayed. */
export function searchExpansion(tags: EligibilityTag[]): string {
  const words = new Set<string>();
  for (const t of tags) {
    for (const id of ancestryOf(t.tag)) {
      const n = byId.get(id);
      if (!n) continue;
      words.add(n.label);
      for (const syn of n.synonyms ?? []) words.add(syn);
    }
    // Natural-phrasing filler so "Economics majors" / "piano players" land
    // both tokens (short fuzzy queries must fully land, house contract).
    if (t.tag.startsWith("field.")) words.add("major majors students studying");
    if (isWithin(t.tag, "field.arts.music") || isWithin(t.tag, "basis.athletics"))
      words.add("player players");
  }
  return [...words].join(" ");
}

// Pre-tokenized node index for query→filter suggestions.
const NODE_TOKENS: { node: TaxonomyNode; tokens: string[] }[] =
  SCHOLARSHIP_TAXONOMY.filter((n) => n.id.includes(".")).map((n) => ({
    node: n,
    tokens: tokensOf([n.label, ...(n.synonyms ?? [])].join(" ")),
  }));

/** The single best taxonomy node a query is talking about, if any — used to
 *  offer a "Filter by X" chip. A node wins when a query token lands hard
 *  (≥0.8) on one of its label/synonym tokens; among winners, prefer the
 *  shallowest (an ancestor beats its descendants, so "music" suggests Music,
 *  not Instrumental music), then the strongest score. */
export function suggestNode(query: string): TaxonomyNode | null {
  const qs = queryTokensOf(query);
  if (qs.length === 0) return null;
  let best: { node: TaxonomyNode; score: number } | null = null;
  const strongQs = qs.filter((q) => q.length >= 3); // "of"/"in" carry no intent
  for (const { node, tokens } of NODE_TOKENS) {
    let score = 0;
    for (const q of strongQs) for (const t of tokens) {
      if (t.length < 3) continue;
      const m = tokenMatch(q, t);
      if (m >= 0.8 && m > score) score = m;
    }
    if (score === 0) continue;
    if (
      !best ||
      isWithin(best.node.id, node.id) || // ancestor of current best wins
      (!isWithin(node.id, best.node.id) && score > best.score)
    ) {
      if (best && isWithin(node.id, best.node.id) && score <= best.score) continue;
      best = { node, score };
    }
  }
  return best?.node ?? null;
}
