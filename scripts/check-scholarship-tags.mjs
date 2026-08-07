// Classification integrity gate (August 2026, phase 1 of
// docs/scholarship-taxonomy-spec.md). Validates the eligibility taxonomy,
// the generated geo/eligibility overlays, and the provenance sidecar —
// exit 1 on any break (the check:links pattern). Run before shipping any
// classification change: npm run check:scholarship-tags
//
// Like the other checkers this parses the source files directly (no TS
// import), so keep the generated files in their emitted shapes.

import { readFileSync, existsSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const problems = [];
const warn = [];

// ── 1 · Taxonomy registry ─────────────────────────────────────────────────
const taxSrc = read("lib/scholarshipTaxonomy.ts");
const nodes = [...taxSrc.matchAll(/\{ id: "([^"]+)", label: "([^"]+)"(?:, parent: "([^"]+)")?/g)]
  .map((m) => ({ id: m[1], label: m[2], parent: m[3] }));
if (nodes.length < 40) problems.push(`taxonomy: only ${nodes.length} nodes parsed — parser or registry broken?`);

const ids = new Set();
for (const n of nodes) {
  if (ids.has(n.id)) problems.push(`taxonomy: duplicate id "${n.id}"`);
  ids.add(n.id);
  const depth = n.id.split(".").length;
  if (depth > 4) problems.push(`taxonomy: "${n.id}" exceeds the depth cap (4)`);
  if (n.parent) {
    if (!n.id.startsWith(n.parent + "."))
      problems.push(`taxonomy: "${n.id}" does not sit under its parent "${n.parent}" — dot-path ancestry (isWithin) would lie`);
    if (n.id.slice(n.parent.length + 1).includes("."))
      problems.push(`taxonomy: "${n.id}" skips a level under "${n.parent}"`);
  } else if (depth > 1) {
    problems.push(`taxonomy: "${n.id}" is nested but has no parent field`);
  }
}
for (const n of nodes) {
  if (n.parent && !ids.has(n.parent)) problems.push(`taxonomy: "${n.id}" names missing parent "${n.parent}"`);
}

// ── 2 · Scholarship catalog ids ───────────────────────────────────────────
const scholSrc = read("lib/scholarships.ts");
const catalogIds = new Set([...scholSrc.matchAll(/^    id: "([^"]+)",$/gm)].map((m) => m[1]));
if (catalogIds.size < 1000) problems.push(`scholarships: only ${catalogIds.size} ids parsed — parser drift?`);

// ── 3 · Geo overlay ───────────────────────────────────────────────────────
const VALID_CODES = new Set("AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY DC PR GU AS VI MP".split(" "));
const geoSrc = read("lib/scholarshipGeo.generated.ts");
const geoEntries = [...geoSrc.matchAll(/"([^"]+)": \{ scope: "(states|national)"(?:, states: \[([^\]]*)\])? \},/g)]
  .map((m) => ({ id: m[1], scope: m[2], states: m[3] ? m[3].split(",").map((s) => s.trim().replace(/"/g, "")) : undefined }));
const geoIds = new Set();
for (const g of geoEntries) {
  if (geoIds.has(g.id)) problems.push(`geo: duplicate entry "${g.id}"`);
  geoIds.add(g.id);
  if (!catalogIds.has(g.id)) problems.push(`geo: "${g.id}" is not in lib/scholarships.ts`);
  if (g.scope === "states" && (!g.states || g.states.length === 0)) problems.push(`geo: "${g.id}" scope states with no states`);
  if (g.scope === "national" && g.states) problems.push(`geo: "${g.id}" scope national but lists states`);
  for (const c of g.states ?? []) if (!VALID_CODES.has(c)) problems.push(`geo: "${g.id}" invalid state code "${c}"`);
}

// ── 4 · Eligibility overlay (lands with phase-2 waves; optional today) ────
const eligPath = new URL("../lib/scholarshipEligibility.generated.ts", import.meta.url);
const eligIds = new Set();
if (existsSync(eligPath)) {
  const eligSrc = readFileSync(eligPath, "utf8");
  const blocks = [...eligSrc.matchAll(/"([^"]+)": \[([^\]]*)\],/g)];
  for (const [, id, body] of blocks) {
    if (eligIds.has(id)) problems.push(`eligibility: duplicate entry "${id}"`);
    eligIds.add(id);
    if (!catalogIds.has(id)) problems.push(`eligibility: "${id}" is not in lib/scholarships.ts`);
    for (const t of body.matchAll(/\{ tag: "([^"]+)", strength: "([^"]+)" \}/g)) {
      if (!ids.has(t[1])) problems.push(`eligibility: "${id}" uses unknown tag "${t[1]}"`);
      if (!["required", "preferred", "relevant"].includes(t[2])) problems.push(`eligibility: "${id}" invalid strength "${t[2]}"`);
    }
  }
}

// ── 5 · Provenance sidecar coverage, both directions ──────────────────────
const sidecar = JSON.parse(read("data/scholarship-classifications.json"));
const records = sidecar.records ?? [];
const verifiedGeo = new Set();
for (const r of records) {
  if (!r.id || !r.kind || !r.classifiedAt || !r.method || !r.confidence)
    problems.push(`provenance: incomplete record ${JSON.stringify(r).slice(0, 80)}`);
  if (!catalogIds.has(r.id)) problems.push(`provenance: "${r.id}" is not in lib/scholarships.ts`);
  if (!["verified", "needs-review"].includes(r.confidence)) problems.push(`provenance: "${r.id}" invalid confidence "${r.confidence}"`);
  if (!["who-derived", "agent", "manual"].includes(r.method)) problems.push(`provenance: "${r.id}" invalid method "${r.method}"`);
  if (r.kind === "geo") {
    if (r.confidence === "verified") verifiedGeo.add(r.id);
    if (r.confidence === "needs-review" && geoIds.has(r.id))
      problems.push(`provenance: "${r.id}" is needs-review but SHIPS geo — withheld records must not publish`);
  }
}
for (const id of geoIds) {
  if (!verifiedGeo.has(id)) problems.push(`geo: "${id}" ships with no verified provenance record`);
}
for (const id of verifiedGeo) {
  if (!geoIds.has(id)) problems.push(`provenance: "${id}" geo verified but nothing shipped in the overlay`);
}
for (const id of eligIds) {
  if (!records.some((r) => r.id === id && r.kind === "eligibility" && r.confidence === "verified"))
    problems.push(`eligibility: "${id}" ships with no verified provenance record`);
}

// ── 6 · Semantic regression checks ───────────────────────────────────────
// Structural validity is not enough: the original who-derived pass exposed
// several ways a keyword can say the opposite of the real rule ("employees
// are ineligible", "membership is not required", or vocational school as
// an allowed institution rather than a field requirement). Validate the
// published merge so those contradictions cannot silently return.
await import("./register-scholarship-typescript.mjs");
const { scholarships } = await import("../lib/scholarships.ts");

const missingEligibility = scholarships.filter((s) => s.eligibility === undefined);
for (const s of missingEligibility)
  problems.push(`eligibility: published "${s.id}" is unclassified (undefined, not confirmed GENERAL [])`);

for (const s of scholarships) {
  const who = s.who;
  const tags = s.eligibility ?? [];
  const has = (id) => tags.some((tag) => tag.tag === id);
  const required = (id) => tags.some((tag) => tag.tag === id && tag.strength === "required");

  const employerExcluded = /(?:employee|associate|team member|staff|famil)[^.;]{0,100}(?:not eligible|ineligible|excluded)|(?:not eligible|ineligible|excluded)[^.;]{0,100}(?:employee|associate|team member|staff|famil)/i.test(who);
  const employerRequired = /(?:eligible|qualifying|current|former)[^.;]{0,45}(?:employee|associate|team member)|(?:child|dependent|parent|spouse)[^.;]{0,70}(?:employee|associate|employed|works?)/i.test(who);
  if (has("affiliation.employer") && employerExcluded && !employerRequired)
    problems.push(`semantic: "${s.id}" tags employer affiliation even though its verified rule only excludes employees/families`);

  if (
    tags.some((tag) => tag.tag.startsWith("affiliation.membership") && tag.strength === "required") &&
    /membership (?:is )?not required|need not (?:already )?be (?:a )?(?:society )?member|individual membership is not required|open regardless of .*membership/i.test(who)
  ) problems.push(`semantic: "${s.id}" requires membership while its verified rule says membership is not required`);

  if (
    has("field.trades") &&
    /(?:vocational|trade|technical)[^.;]{0,45}(?:excluded|not eligible)|(?:excluded|not eligible)[^.;]{0,45}(?:vocational|trade|technical)/i.test(who)
  ) problems.push(`semantic: "${s.id}" tags skilled trades even though vocational/technical study is excluded`);

  if (
    has("field.health.medicine-prehealth") &&
    /medical (?:school|programs?)[^.;]{0,25}(?:excluded|not eligible)|(?:excluded|not eligible)[^.;]{0,25}medical (?:school|programs?)/i.test(who)
  ) problems.push(`semantic: "${s.id}" tags medicine/pre-health even though medical study is excluded`);

  if (
    required("field.education-teaching") &&
    /education majors? (?:are )?encouraged[^.;]{0,60}all majors may apply/i.test(who)
  ) problems.push(`semantic: "${s.id}" requires education study while its verified rule says all majors may apply`);

  if (has("basis.merit-academic") && /GPA[^.;]{0,50}not (?:a )?(?:universal )?(?:entry )?rule/i.test(who))
    problems.push(`semantic: "${s.id}" tags academic merit despite an explicit no-universal-GPA rule`);

  if (
    has("identity.immigrant-refugee") &&
    /U\.S\. citizenship (?:is )?not required/i.test(who) &&
    !/(?:immigrant|refugee|DACA|undocumented|foreign-born|international student|visa|asylum|TPS)/i.test(who.replace(/U\.S\. citizenship (?:is )?not required/ig, ""))
  ) problems.push(`semantic: "${s.id}" mistakes citizenship openness for immigrant/refugee targeting`);

  if (
    !s.geo &&
    /one of \w+ eligible states|New England residents?|service footprint|service states|CNMI residency/i.test(who)
  ) problems.push(`geo: published "${s.id}" states an explicit regional bound but has no geo overlay`);

  if (
    /(?:high school|secondary school) seniors?|graduating (?:high school|secondary)/i.test(who) &&
    !s.stages.includes("high-school")
  ) problems.push(`stage: published "${s.id}" explicitly accepts high-school seniors but omits the high-school stage`);

  if (
    /community.?college transfer students?|two.?year students? transferring|students? transferring from (?:a )?community college/i.test(who) &&
    !s.stages.includes("transfer")
  ) problems.push(`stage: published "${s.id}" explicitly accepts transfer applicants but omits the transfer stage`);

  const citizenshipRuleText = who.replace(
    /(?:U\.S\. )?citizenship (?:is )?not required|no citizenship requirement/gi,
    "citizenship-open",
  );
  const citizenshipRestricted =
    /(?:must be|only)[^.;]{0,80}(?:U\.S\. (?:citizen|national)|citizenship|permanent resident|legal resident|lawful permanent)|(?:U\.S\. citizens?|citizenship|permanent residents?|legal residents?|lawful permanent residents?)[^.;]{0,70}(?:only|required|must)/i.test(citizenshipRuleText);
  if (s.openToUndocumented && citizenshipRestricted)
    problems.push(`citizenship: published "${s.id}" is marked undocumented/DACA eligible but its verified rule requires citizenship or qualifying legal residence`);

  if (
    !s.openToUndocumented &&
    (s.tags ?? []).some((tag) => /^(?:undocumented(?:-eligible)?|daca|no.?citizenship.?required|dreamers?)$/i.test(tag))
  ) problems.push(`citizenship: published "${s.id}" has an explicit undocumented/DACA eligibility tag but the canonical flag is off`);
}

// ── Report ────────────────────────────────────────────────────────────────
const nr = records.filter((r) => r.confidence === "needs-review").length;
console.log(`taxonomy: ${nodes.length} nodes · catalog: ${catalogIds.size} ids · geo overlay: ${geoIds.size} (${geoEntries.filter((g) => g.scope === "states").length} state-bound, ${geoEntries.filter((g) => g.scope === "national").length} national) · eligibility overlay: ${eligIds.size} · provenance: ${records.length} records (${nr} needs-review)`);
for (const w of warn) console.log("WARN:", w);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(" -", p);
  process.exit(1);
}
console.log("check-scholarship-tags: OK");
