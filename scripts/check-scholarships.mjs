// Yearly scholarship re-verification helper (July 2026): requests every
// officialUrl in lib/scholarships.ts and reports anything that died,
// redirected off-domain, or errored — the shortlist for hand re-checking.
// Run: node scripts/check-scholarships.mjs
// This checks LINKS, not truth: a 200 does not confirm the program still
// runs or the amount is current. It only tells you where to look first.
// The VERIFIED_AS_OF stamp in lib/scholarships.ts still means a human
// read each page.

import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../lib/scholarships.ts", import.meta.url), "utf8");
const entries = [...src.matchAll(/name: "([^"]+)"[\s\S]*?officialUrl: "([^"]+)"/g)]
  .map((m) => ({ name: m[1], url: m[2] }));

console.log(`Checking ${entries.length} scholarship links…\n`);
const problems = [];
const CONCURRENCY = 8;

async function check({ name, url }) {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
      headers: { "user-agent": "Mozilla/5.0 (EmpowerLinkCheck; +https://economicmobilityproject.org)" },
    });
    const finalHost = new URL(res.url).hostname.replace(/^www\./, "");
    const origHost = new URL(url).hostname.replace(/^www\./, "");
    if (!res.ok) {
      problems.push(`✗ ${res.status} — ${name}\n    ${url}`);
    } else if (finalHost !== origHost) {
      problems.push(`↪ moved to ${finalHost} — ${name}\n    ${url}`);
    }
  } catch (e) {
    problems.push(`✗ ${e.name === "TimeoutError" ? "timeout" : "error"} — ${name}\n    ${url}`);
  }
}

for (let i = 0; i < entries.length; i += CONCURRENCY) {
  await Promise.all(entries.slice(i, i + CONCURRENCY).map(check));
  process.stdout.write(`  …${Math.min(i + CONCURRENCY, entries.length)}/${entries.length}\r`);
}

console.log("\n");
if (problems.length === 0) {
  console.log("All links healthy. (Still spot-check amounts and cycles by hand each July.)");
} else {
  console.log(`${problems.length} need a human look:\n`);
  for (const p of problems) console.log(p + "\n");
  process.exitCode = 1;
}
