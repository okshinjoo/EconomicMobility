import "./register-scholarship-typescript.mjs";

import { readFile, writeFile } from "node:fs/promises";
import { visibleText } from "./scholarship-monitor-core.mjs";

const { scholarships } = await import("../lib/scholarships.ts");
const explicitConfigurations = JSON.parse(
  await readFile(new URL("./scholarship-status-sources.json", import.meta.url), "utf8"),
);
const configuredIds = new Set(explicitConfigurations.map((configuration) => configuration.id));

const monthsArgument = process.argv.find((argument) => argument.startsWith("--months="));
const months = new Set((monthsArgument?.slice(9) ?? "8,9,10,11").split(",").map(Number));
const idsArgument = process.argv.find((argument) => argument.startsWith("--ids="));
const requestedIds = new Set((idsArgument?.slice(6) ?? "").split(",").filter(Boolean));
const offsetArgument = process.argv.find((argument) => argument.startsWith("--offset="));
const limitArgument = process.argv.find((argument) => argument.startsWith("--limit="));
const concurrencyArgument = process.argv.find((argument) => argument.startsWith("--concurrency="));
const timeoutArgument = process.argv.find((argument) => argument.startsWith("--timeout="));
const outputArgument = process.argv.find((argument) => argument.startsWith("--output="));
const offset = Number(offsetArgument?.slice(9) ?? 0);
const limit = Number(limitArgument?.slice(8) ?? Number.POSITIVE_INFINITY);
const concurrency = Number(concurrencyArgument?.slice(14) ?? 6);
const timeout = Number(timeoutArgument?.slice(10) ?? 20000);
const includeAll = process.argv.includes("--all");
const compact = process.argv.includes("--compact");

if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 24) {
  throw new Error(`Invalid --concurrency: ${concurrency}`);
}
if (!Number.isInteger(timeout) || timeout < 1000 || timeout > 60000) {
  throw new Error(`Invalid --timeout: ${timeout}`);
}

const cohort = scholarships
  .filter((scholarship) =>
    !configuredIds.has(scholarship.id) &&
    (requestedIds.size
      ? requestedIds.has(scholarship.id)
      : includeAll || months.has(scholarship.deadlineMonth)),
  )
  .slice(offset, offset + limit);

const STATUS_PATTERNS = [
  /applications? (?:are|is) (?:now |currently )?open\b/gi,
  /applications? (?:are|is) (?:now |currently )?closed\b/gi,
  /application (?:period|window|cycle) (?:is |will be )?(?:now |currently )?open\b/gi,
  /application (?:period|window|cycle) (?:is |has )?(?:now |currently )?closed\b/gi,
  /(?:apply|application) (?:by|deadline|due)\b[^.!?]{0,120}/gi,
  /(?:deadline|due date)\s*(?:is|:)?\s*[^.!?]{0,120}/gi,
  /applications? (?:open|close|begin|end)[^.!?]{0,120}/gi,
];
const DATE_PATTERNS = [
  /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:st|nd|rd|th)?(?:,\s*|\s+)20\d{2}\b/gi,
  /\b(?:Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sept?|Oct|Nov|Dec)\.?\s+\d{1,2}(?:st|nd|rd|th)?(?:,\s*|\s+)20\d{2}\b/gi,
  /\b\d{1,2}[/-]\d{1,2}[/-]20\d{2}\b/g,
];

function context(text, index, length) {
  return text.slice(Math.max(0, index - 160), Math.min(text.length, index + length + 220)).trim();
}

function matches(text, patterns, maximum = 8) {
  const found = [];
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      found.push(context(text, match.index ?? 0, match[0].length));
      if (found.length >= maximum) return [...new Set(found)];
    }
  }
  return [...new Set(found)].slice(0, maximum);
}

async function inspect(scholarship) {
  try {
    const response = await fetch(scholarship.officialUrl, {
      redirect: "follow",
      signal: AbortSignal.timeout(timeout),
      headers: {
        "user-agent": "EmpowerScholarshipMonitor/1.0 (+https://economicmobilityproject.org/contact)",
        accept: "text/html,application/xhtml+xml,application/pdf;q=0.8",
        "accept-language": "en-US,en;q=0.9",
      },
    });
    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok) throw Object.assign(new Error(`HTTP ${response.status}`), { status: response.status });
    if (/application\/pdf/i.test(contentType) || /\.pdf(?:$|\?)/i.test(response.url)) {
      return {
        id: scholarship.id,
        name: scholarship.name,
        deadline: scholarship.deadline,
        officialUrl: scholarship.officialUrl,
        ok: true,
        kind: "pdf",
        finalUrl: response.url,
        statusEvidence: [],
        dateEvidence: [],
      };
    }
    const text = visibleText(await response.text());
    const nameTokens = scholarship.name.toLowerCase().match(/[a-z0-9]+/g)?.filter((token) => token.length >= 5) ?? [];
    const matchedTokens = nameTokens.filter((token) => text.toLowerCase().includes(token));
    return {
      id: scholarship.id,
      name: scholarship.name,
      deadline: scholarship.deadline,
      officialUrl: scholarship.officialUrl,
      ok: true,
      kind: "html",
      finalUrl: response.url,
      textLength: text.length,
      identityScore: nameTokens.length ? Number((matchedTokens.length / nameTokens.length).toFixed(2)) : 0,
      matchedTokens: matchedTokens.slice(0, 8),
      statusEvidence: matches(text, STATUS_PATTERNS),
      dateEvidence: matches(text, DATE_PATTERNS),
    };
  } catch (error) {
    return {
      id: scholarship.id,
      name: scholarship.name,
      deadline: scholarship.deadline,
      officialUrl: scholarship.officialUrl,
      ok: false,
      error: String(error.message ?? error).replace(/\u0000/g, ""),
      status: error.status ?? null,
      statusEvidence: [],
      dateEvidence: [],
    };
  }
}

const results = [];
for (let index = 0; index < cohort.length; index += concurrency) {
  results.push(...(await Promise.all(cohort.slice(index, index + concurrency).map(inspect))));
}

if (outputArgument) {
  const outputPath = outputArgument.slice(9);
  if (!outputPath) throw new Error("--output requires a file path.");
  await writeFile(outputPath, `${JSON.stringify(results, null, 2)}\n`, "utf8");
}

if (!outputArgument) {
  for (const result of results) {
    if (!compact) {
      console.log(JSON.stringify(result));
      continue;
    }
    console.log(JSON.stringify({
      id: result.id,
      name: result.name,
      deadline: result.deadline,
      officialUrl: result.officialUrl,
      ok: result.ok,
      kind: result.kind,
      error: result.error,
      status: result.status,
      finalUrl: result.finalUrl,
      identityScore: result.identityScore,
      statusEvidence: result.statusEvidence[0]?.slice(0, 500) ?? null,
      dateEvidence: result.dateEvidence[0]?.slice(0, 500) ?? null,
    }));
  }
}
console.error(
  `Discovery: ${results.length} records · ${results.filter((result) => result.ok).length} fetched · ${results.filter((result) => result.statusEvidence.length || result.dateEvidence.length).length} with candidate evidence.`,
);
