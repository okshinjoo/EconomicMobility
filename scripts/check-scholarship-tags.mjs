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
