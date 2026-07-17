// Freshness check (July 17, 2026): reads the registry's literal nextDueISO
// dates (regex — no TS imports needed) and exits 1 if any dataset is
// overdue, warns within 60 days. Run at the start of a work session or via
// npm run check:freshness. The human-readable version is /admin/freshness.

import { readFileSync } from "fs";
import { join } from "path";

const src = readFileSync(
  join(process.cwd(), "lib/freshness.ts"),
  "utf8"
);

const entries = [];
for (const block of src.split(/\n  \{\n/).slice(1)) {
  const name = /name:\s*"([^"]+)"/.exec(block)?.[1];
  const due = /nextDueISO:\s*"(\d{4}-\d{2}-\d{2})"/.exec(block)?.[1];
  if (name && due) entries.push({ name, due });
}

if (!entries.length) {
  console.error("could not parse lib/freshness.ts — check the format");
  process.exit(1);
}

const now = new Date();
const soonMs = 60 * 24 * 60 * 60 * 1000;
let overdue = 0;

for (const e of entries.sort((a, b) => a.due.localeCompare(b.due))) {
  const dueDate = new Date(e.due + "T00:00:00");
  const days = Math.round((dueDate - now) / (24 * 60 * 60 * 1000));
  if (dueDate <= now) {
    overdue++;
    console.log(`  ✗ OVERDUE  ${e.due}  ${e.name}  (${-days} days late)`);
  } else if (dueDate - now < soonMs) {
    console.log(`  ! due soon ${e.due}  ${e.name}  (in ${days} days)`);
  } else {
    console.log(`  ✓ fresh    ${e.due}  ${e.name}`);
  }
}

console.log(
  `\n${entries.length} datasets · ${overdue} overdue — details + recipes at /admin/freshness`
);
process.exit(overdue ? 1 : 0);
