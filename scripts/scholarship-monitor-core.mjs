import { createHash } from "node:crypto";

export function decodeHtml(value) {
  return value
    .replace(/\u0000/g, "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&ndash;|&#8211;/gi, "–")
    .replace(/&mdash;|&#8212;/gi, "—")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

export function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export function visibleText(html) {
  return decodeHtml(
    html
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<img\b[^>]*\balt=(["'])(.*?)\1[^>]*>/gi, " $2 ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function dateKey(year, month, day) {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parseDate(value) {
  const cleaned = value
    .replace(/(\d+)(st|nd|rd|th)\b/gi, "$1")
    .replace(/,/g, "")
    .replace(/\s+/g, " ")
    .trim();

  let match = cleaned.match(/^(\d{1,2}) (\d{1,2}) (\d{4})$/);
  if (match) return dateKey(Number(match[3]), Number(match[1]), Number(match[2]));

  match = cleaned.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) return dateKey(Number(match[3]), Number(match[1]), Number(match[2]));

  match = cleaned.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (match) return dateKey(Number(match[3]), Number(match[1]), Number(match[2]));

  match = cleaned.match(/^(\d{4}) ([A-Za-z]{3,9}) (\d{1,2})$/);
  const normalized = match ? `${match[2]} ${match[3]} ${match[1]}` : cleaned;
  const parsed = new Date(`${normalized} 12:00:00 UTC`);
  if (Number.isNaN(parsed.getTime())) return null;
  return dateKey(parsed.getUTCFullYear(), parsed.getUTCMonth() + 1, parsed.getUTCDate());
}

function extractDate(text, patterns = []) {
  for (const pattern of patterns) {
    const match = text.match(new RegExp(pattern, "i"));
    if (!match?.[1]) continue;
    const parsed = parseDate(match[1]);
    if (parsed) return { value: parsed, pattern, index: match.index ?? 0 };
  }
  return null;
}

export function recurringDates(recurringWindow, today) {
  if (!recurringWindow) return null;
  const [year, month] = today.split("-").map(Number);
  const [openMonth, openDay] = recurringWindow.opensMonthDay.split("-").map(Number);
  const [closeMonth, closeDay] = recurringWindow.closesMonthDay.split("-").map(Number);
  const crossesYear = closeMonth < openMonth || (closeMonth === openMonth && closeDay < openDay);

  let openYear = year;
  if (crossesYear && month <= closeMonth) openYear = year - 1;
  let opensOn = dateKey(openYear, openMonth, openDay);
  let closesOn = dateKey(openYear + (crossesYear ? 1 : 0), closeMonth, closeDay);

  if (today > closesOn) {
    opensOn = dateKey(openYear + 1, openMonth, openDay);
    closesOn = dateKey(openYear + 1 + (crossesYear ? 1 : 0), closeMonth, closeDay);
  }
  return { opensOn, closesOn };
}

export function statusFromDatesAndSignal({ today, opensOn, closesOn, nextOpensOn, signalStatus }) {
  if (nextOpensOn && today < nextOpensOn) return "upcoming";
  if (opensOn && closesOn) {
    if (today < opensOn) return "upcoming";
    if (today <= closesOn) return "open";
    return "closed";
  }
  if (closesOn && today > closesOn) return "closed";
  if (opensOn && today < opensOn) return "upcoming";
  return signalStatus ?? "unknown";
}

function evidenceAround(text, index, length = 0) {
  const start = Math.max(0, index - 120);
  const end = Math.min(text.length, index + Math.max(length, 1) + 180);
  return text.slice(start, end).trim();
}

function applyWindowDates({ window, candidates, text, dates, evidence }) {
  let matched = false;
  for (const fieldName of ["opensOn", "closesOn", "nextOpensOn"]) {
    const candidate = candidates?.[fieldName];
    const pattern = window?.evidencePatterns?.[fieldName];
    if (!candidate || !pattern) continue;
    const match = text.match(new RegExp(pattern, "i"));
    if (!match) continue;
    dates[fieldName] = candidate;
    evidence.push(evidenceAround(text, match.index ?? 0, match[0].length));
    matched = true;
  }
  return matched;
}

function normalizedHost(url) {
  return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
}

export function evaluateSourceHealth({ html, sourceUrl, finalUrl }) {
  const text = visibleText(html);
  const crossDomainRedirect = normalizedHost(sourceUrl) !== normalizedHost(finalUrl);
  const loginWall = /asicommon|login\.aspx|\/(?:log|sign)-?in\b/i.test(finalUrl) &&
    !/\/(?:log|sign)-?in\b/i.test(sourceUrl);
  const thinDocument = text.length < 80;
  const sourceStatus = loginWall || thinDocument ? "structure-changed" : crossDomainRedirect ? "redirected" : "healthy";
  return {
    text,
    contentHash: createHash("sha256").update(html).digest("hex"),
    normalizedContentHash: createHash("sha256").update(text).digest("hex"),
    sourceStatus,
    extractionConfidence: "unknown",
    verificationStatus: "unverified",
    applicationStatus: "unknown",
    opensOn: null,
    closesOn: null,
    nextOpensOn: null,
    matchedSignal: null,
    missingRequired: [],
    unsafeUndatedOpen: false,
    crossDomainRedirect,
    loginWall,
    thinDocument,
    evidenceText: text.slice(0, 800),
  };
}

export function shouldProposeSourceFailure({ monitorMode, previousFailures = 0, sourceStatus = "unknown" }) {
  if (monitorMode === "status") return true;
  if (monitorMode === "candidate") return false;
  return previousFailures >= 2 && ["not-found", "server-error", "redirected", "structure-changed"].includes(sourceStatus);
}

export function evaluateOfficialSource({ configuration, html, finalUrl, today }) {
  const text = visibleText(html);
  const evidence = [];
  const missingRequired = [];

  for (const pattern of configuration.requiredPatterns ?? []) {
    const match = text.match(new RegExp(pattern, "i"));
    if (!match) missingRequired.push(pattern);
  }

  let signalStatus = null;
  let matchedSignal = null;
  for (const rule of configuration.statusRules ?? []) {
    const match = text.match(new RegExp(rule.pattern, "i"));
    if (!match) continue;
    signalStatus = rule.status;
    matchedSignal = rule.pattern;
    evidence.push(evidenceAround(text, match.index ?? 0, match[0].length));
    break;
  }

  const extracted = {
    opensOn: extractDate(text, configuration.dateRules?.opensOn),
    closesOn: extractDate(text, configuration.dateRules?.closesOn),
    nextOpensOn: extractDate(text, configuration.dateRules?.nextOpensOn),
  };
  const dates = {
    opensOn: extracted.opensOn?.value ?? null,
    closesOn: extracted.closesOn?.value ?? null,
    nextOpensOn: extracted.nextOpensOn?.value ?? null,
  };
  for (const item of Object.values(extracted)) {
    if (item) evidence.push(evidenceAround(text, item.index));
  }

  let windowValidated = false;
  if (configuration.recurringWindow) {
    windowValidated = applyWindowDates({
      window: configuration.recurringWindow,
      candidates: recurringDates(configuration.recurringWindow, today),
      text,
      dates,
      evidence,
    });
  }
  if (configuration.fixedWindow) {
    windowValidated =
      applyWindowDates({
        window: configuration.fixedWindow,
        candidates: configuration.fixedWindow,
        text,
        dates,
        evidence,
      }) || windowValidated;
  }

  let applicationStatus = statusFromDatesAndSignal({ today, ...dates, signalStatus });
  const unsafeUndatedOpen = applicationStatus === "open" && !dates.closesOn;
  const crossDomainRedirect = normalizedHost(configuration.sourceUrl) !== normalizedHost(finalUrl);
  if (missingRequired.length || unsafeUndatedOpen) applicationStatus = "unknown";

  const hasExactDateEvidence = Boolean(dates.opensOn || dates.closesOn || dates.nextOpensOn);
  const extractionConfidence = missingRequired.length || unsafeUndatedOpen
    ? "low"
    : crossDomainRedirect
      ? "medium"
      : matchedSignal || windowValidated || hasExactDateEvidence
        ? "high"
        : "medium";
  const verificationStatus = extractionConfidence === "high" ? "machine-verified" : "review-required";
  const sourceStatus = missingRequired.length ? "structure-changed" : crossDomainRedirect ? "redirected" : "healthy";

  const uniqueEvidence = [...new Set(evidence.filter(Boolean))];
  return {
    text,
    contentHash: createHash("sha256").update(html).digest("hex"),
    normalizedContentHash: createHash("sha256").update(text).digest("hex"),
    sourceStatus,
    extractionConfidence,
    verificationStatus,
    applicationStatus,
    ...dates,
    matchedSignal,
    missingRequired,
    unsafeUndatedOpen,
    crossDomainRedirect,
    evidenceText: uniqueEvidence.join("\n\n").slice(0, 4000) || text.slice(0, 800),
  };
}

const GENERIC_DATE_PATTERNS = [
  /\b((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:st|nd|rd|th)?(?:,\s*|\s+)20\d{2})\b/gi,
  /\b((?:Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sept?|Oct|Nov|Dec)\.?\s+\d{1,2}(?:st|nd|rd|th)?(?:,\s*|\s+)20\d{2})\b/gi,
  /\b(\d{1,2}[/-]\d{1,2}[/-]20\d{2})\b/g,
];
const IDENTITY_STOP_WORDS = new Set([
  "award",
  "awards",
  "college",
  "foundation",
  "fund",
  "grant",
  "national",
  "program",
  "scholarship",
  "scholarships",
  "student",
  "students",
  "the",
]);
const UNCERTAIN_DATE_LANGUAGE = /\b(?:approximately|anticipated|around|expected|generally|often|typically|usually|tentative|to be announced|tbd)\b/i;
const NON_APPLICANT_DATE_LANGUAGE = /\b(?:clubs? to submit (?:a |their )?winner|delegate selections|district deadline|national deadline for all states|public voting|voting (?:period|window)|winners? will be notified|nominate your favorite (?:media )?teacher|teacher[^.]{0,80}(?:honor|honoree))\b/i;
const CLOSE_LANGUAGE = /\b(?:application deadline|applications? (?:are )?due|applications? close|closing date|deadline|due date|apply by|submit(?:ted)? by|must be (?:received|submitted) by|ends? on|closes? on)\b/i;
const OPEN_LANGUAGE = /\b(?:applications? open|application (?:period|window|cycle) (?:opens?|begins?|starts?)|opens? on|opening date|available (?:on|from)|begins? on|starts? on)\b/i;
const EXPLICIT_OPEN_LANGUAGE = /\b(?:applications? (?:are|is) (?:now |currently )?open|application (?:period|window|cycle) (?:is )?(?:now |currently )?open)\b/i;
const EXPLICIT_CLOSED_LANGUAGE = /\b(?:applications? (?:are|is) (?:now |currently )?closed|application (?:period|window|cycle) (?:is |has )?(?:now |currently )?closed|not (?:currently )?accepting applications)\b/i;

function identityEvidence(name, text) {
  const words = name.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  const primaryTokens = words.filter((token) => token.length >= 4 && !IDENTITY_STOP_WORDS.has(token));
  // Some legitimate awards are identified only by a three-letter sponsor
  // acronym once generic words such as "foundation" and "scholarship" are
  // removed (for example, DRI). Use that acronym only as a last resort.
  const tokens = [...new Set(primaryTokens.length
    ? primaryTokens
    : words.filter((token) => token.length >= 3 && !IDENTITY_STOP_WORDS.has(token)))];
  const matched = tokens.filter((token) => text.toLowerCase().includes(token));
  return {
    score: tokens.length ? matched.length / tokens.length : 0,
    tokens,
    matched,
  };
}

const GEOGRAPHY_CODES = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA",
  Colorado: "CO", Connecticut: "CT", Delaware: "DE", Florida: "FL", Georgia: "GA",
  Hawaii: "HI", "Hawaiʻi": "HI", Idaho: "ID", Illinois: "IL", Indiana: "IN",
  Iowa: "IA", Kansas: "KS", Kentucky: "KY", Louisiana: "LA", Maine: "ME",
  Maryland: "MD", Massachusetts: "MA", Michigan: "MI", Minnesota: "MN",
  Mississippi: "MS", Missouri: "MO", Montana: "MT", Nebraska: "NE", Nevada: "NV",
  "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
  "North Carolina": "NC", "North Dakota": "ND", Ohio: "OH", Oklahoma: "OK",
  Oregon: "OR", Pennsylvania: "PA", "Rhode Island": "RI", "South Carolina": "SC",
  "South Dakota": "SD", Tennessee: "TN", Texas: "TX", Utah: "UT", Vermont: "VT",
  Virginia: "VA", Washington: "WA", "West Virginia": "WV", Wisconsin: "WI",
  Wyoming: "WY", "District of Columbia": "DC", "Washington, D.C.": "DC",
  "Puerto Rico": "PR", Guam: "GU", "American Samoa": "AS",
  "U.S. Virgin Islands": "VI", "Virgin Islands": "VI",
  "Northern Mariana Islands": "MP", "Commonwealth of the Northern Mariana Islands": "MP",
};
const GEOGRAPHY_CODE_SET = new Set(Object.values(GEOGRAPHY_CODES));
const GEOGRAPHY_NAME_PATTERN = Object.keys(GEOGRAPHY_CODES)
  .sort((a, b) => b.length - a.length)
  .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  .join("|");
const NATIONAL_GEOGRAPHY_PATTERNS = [
  /\b(?:(?:all|any) (?:of the )?|one of the )?(?:50|fifty) (?:U\.S\. )?states(?:\s*(?:,|and|or)\s*(?:the )?(?:District of Columbia|U\.S\. territories|Puerto Rico))?\b/i,
  /\b(?:nationwide|across the nation|throughout the United States)\b/i,
  /\b(?:open|available|eligible) to (?:students|applicants|residents)[^.]{0,80}\b(?:across|throughout|anywhere in) the (?:United States|U\.S\.)\b/i,
  /\b(?:students|applicants|residents)\b[^.]{0,60}\b(?:across|throughout|anywhere in) the (?:United States|U\.S\.)\b/i,
  /\b(?:legal )?residents? of (?:the )?(?:United States|U\.S\.)\b/i,
  /\b(?:must|required to|shall|need to)\b[^.!?]{0,90}\b(?:reside|live)\b[^.!?]{0,80}\b(?:United States|U\.S\.)\b/i,
  /\b(?:students|applicants) from (?:all|any) U\.S\. states?\b/i,
];
const HARD_GEOGRAPHY_PATTERNS = [
  /\b(?:must|required to|shall|need to)\b[^.!?]{0,90}\b(?:reside|live)\b[^.!?]{0,220}/gi,
  /\b(?:must|required to|shall|need to)\b[^.!?]{0,260}\b(?:resident|residency)\b[^.!?]{0,100}/gi,
  /\b(?:eligible|open only to|limited to|restricted to)\b[^.!?]{0,90}\b(?:residents?|students? (?:who )?(?:reside|live))\b[^.!?]{0,220}/gi,
  /\b(?:residents?|residency)\b[^.!?]{0,160}\b(?:eligible|required|only|must|qualif(?:y|ied))\b[^.!?]{0,100}/gi,
];

function headingSections(html) {
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    index: match.index ?? 0,
    label: visibleText(match[2]),
  }));
  return headings.map((heading, index) => {
    const next = headings.slice(index + 1).find((candidate) => candidate.level <= heading.level);
    return {
      ...heading,
      html: html.slice(heading.index, next?.index ?? html.length),
    };
  });
}

function geographyTextScope(html, name) {
  const sections = headingSections(html);
  const ranked = sections
    .map((section) => ({ ...section, identity: identityEvidence(name, section.label) }))
    .filter((section) => section.identity.matched.length > 0 && section.identity.score >= 0.5)
    .sort((a, b) => b.identity.score - a.identity.score || b.label.length - a.label.length);
  if (ranked[0]) return visibleText(ranked[0].html);

  const namedProgramHeadings = sections.filter((section) =>
    /\b(?:scholarship|grant|award|benefit|fellowship|program)\b/i.test(section.label),
  );
  // On a shared directory page, a missing matching heading means that evidence
  // cannot be safely assigned to this particular scholarship.
  return namedProgramHeadings.length >= 2 ? "" : visibleText(html);
}

function hasMultipleNamedAwards(text) {
  const mentions = text.match(/\b(?:(?:[A-Z][A-Za-z0-9’'&.-]*|&)\s+){1,9}(?:Scholarship|Award|Grant|Benefit|Fellowship)\b/g) ?? [];
  return new Set(mentions.map((mention) => mention.toLowerCase())).size >= 3;
}

function contextMatchesPrimaryIdentity(context, tokens) {
  if (!tokens.length) return false;
  const normalized = context.toLowerCase();
  return tokens.slice(0, Math.min(2, tokens.length)).every((token) => normalized.includes(token));
}

function isRejectedNationalContext(context, matchIndex) {
  const before = context.slice(Math.max(0, matchIndex - 28), matchIndex);
  return /\b(?:not|isn't|is not|never)\s*$/i.test(before) ||
    /\bnationwide gravesite locator\b/i.test(context);
}

function nationalEvidence(text) {
  for (const pattern of NATIONAL_GEOGRAPHY_PATTERNS) {
    for (const match of text.matchAll(new RegExp(pattern.source, "gi"))) {
      const index = match.index ?? 0;
      const context = evidenceAround(text, index, match[0].length);
      const contextIndex = Math.max(0, Math.min(context.length, index - Math.max(0, index - 120)));
      if (isRejectedNationalContext(context, contextIndex)) continue;
      return { match, context };
    }
  }
  return null;
}

function stateCodesInEvidence(value) {
  const found = new Set();
  for (const match of value.matchAll(new RegExp(`\\b(${GEOGRAPHY_NAME_PATTERN})\\b`, "gi"))) {
    const canonical = Object.keys(GEOGRAPHY_CODES).find((name) => name.toLowerCase() === match[1].toLowerCase());
    if (!canonical) continue;
    const suffix = value.slice((match.index ?? 0) + match[0].length, (match.index ?? 0) + match[0].length + 24);
    // Proper names and county names are not state eligibility evidence.
    if (/^\s+(?:County|Parish|Borough|Life|Foundation)\b/i.test(suffix)) continue;
    found.add(GEOGRAPHY_CODES[canonical]);
  }
  const singleCode = value.match(/\b(?:state of|resident(?:s)? of|reside in|live in)\s+([A-Z]{2})\b/);
  if (singleCode && GEOGRAPHY_CODE_SET.has(singleCode[1])) found.add(singleCode[1]);
  return [...found].sort();
}

/**
 * Extract only explicit nationwide or hard state residency rules.
 * Country-level citizenship alone is never treated as national geography,
 * attendance and event locations are not residency, preferences and service
 * commitments are not hard geography, and conflicts are withheld for a human.
 */
export function evaluateGeography({ configuration, html, finalUrl }) {
  const pageText = visibleText(html);
  const identity = identityEvidence(configuration.name ?? "", pageText);
  const identityMatched = identity.matched.length > 0 && identity.score >= 0.5;
  const crossDomainRedirect = normalizedHost(configuration.sourceUrl) !== normalizedHost(finalUrl);
  if (!identityMatched || crossDomainRedirect) {
    return {
      hasCandidate: false,
      geo: null,
      evidenceText: "",
      extractionConfidence: "unknown",
      verificationStatus: "unverified",
      conflictingSignals: false,
    };
  }

  const text = geographyTextScope(html, configuration.name ?? "");
  if (!text) {
    return {
      hasCandidate: false,
      geo: null,
      evidenceText: "",
      extractionConfidence: "unknown",
      verificationStatus: "unverified",
      conflictingSignals: false,
    };
  }

  const sharedAwardPage = hasMultipleNamedAwards(text);

  const national = nationalEvidence(text);
  const acceptedNational = national && (!sharedAwardPage || contextMatchesPrimaryIdentity(national.context, identity.tokens))
    ? national
    : null;
  const nationalMatch = acceptedNational?.match ?? null;
  const stateEvidence = [];
  const states = new Set();
  for (const pattern of HARD_GEOGRAPHY_PATTERNS) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      const matchStart = match.index ?? 0;
      const matchEnd = matchStart + match[0].length;
      const nationalStart = nationalMatch?.index ?? -1;
      const nationalEnd = nationalStart + (nationalMatch?.[0]?.length ?? 0);
      if (nationalMatch && matchStart <= nationalEnd && matchEnd >= nationalStart) continue;
      const context = evidenceAround(text, match.index ?? 0, match[0].length);
      // Work-location promises and geographic preferences do not make a
      // student ineligible based on where they live or study.
      if (/\b(?:preference|preferred|priority|commit(?:ment)? to work|agree to work|plan to work|intend to work)\b/i.test(context)) continue;
      if (sharedAwardPage && !contextMatchesPrimaryIdentity(context, identity.tokens)) continue;
      const codes = stateCodesInEvidence(match[0]);
      if (!codes.length) continue;
      codes.forEach((code) => states.add(code));
      stateEvidence.push(context);
    }
  }

  const conflictingSignals = Boolean(nationalMatch && states.size);
  if (conflictingSignals || (!nationalMatch && states.size === 0)) {
    return {
      hasCandidate: false,
      geo: null,
      evidenceText: [...new Set([
        acceptedNational?.context ?? null,
        ...stateEvidence,
      ].filter(Boolean))].join("\n\n").slice(0, 4000),
      extractionConfidence: conflictingSignals ? "low" : "unknown",
      verificationStatus: conflictingSignals ? "review-required" : "unverified",
      conflictingSignals,
    };
  }

  const geo = states.size
    ? { scope: "states", states: [...states].sort() }
    : { scope: "national" };
  const evidenceText = states.size
    ? [...new Set(stateEvidence)].join("\n\n")
    : acceptedNational?.context ?? "";
  return {
    hasCandidate: true,
    geo,
    evidenceText: evidenceText.slice(0, 4000),
    extractionConfidence: "high",
    verificationStatus: "review-required",
    conflictingSignals: false,
  };
}

function normalizedGeo(value) {
  if (!value || typeof value !== "object") return null;
  if (value.scope === "national") return { scope: "national" };
  if (value.scope === "states" && Array.isArray(value.states) && value.states.length) {
    return { scope: "states", states: [...new Set(value.states)].sort() };
  }
  return null;
}

export function buildGeographyProposal({ scholarshipId, currentGeo, evaluation, sourceUrl, fieldLocked = false }) {
  if (!evaluation?.hasCandidate || fieldLocked) return null;
  const proposedValue = normalizedGeo(evaluation.geo);
  if (!proposedValue) return null;
  const currentValue = normalizedGeo(currentGeo);
  if (stableStringify(currentValue) === stableStringify(proposedValue)) return null;
  return {
    scholarshipId,
    fieldName: "geo",
    currentValue,
    proposedValue,
    sourceUrl,
    evidenceText: evaluation.evidenceText,
    extractionConfidence: evaluation.extractionConfidence,
    risk: "high",
    verificationStatus: "review-required",
    fieldLocked,
  };
}

function contextMatchesIdentity(context, tokens) {
  const normalized = context.toLowerCase();
  const requiredMatches = Math.min(2, tokens.length);
  return tokens.filter((token) => normalized.includes(token)).length >= requiredMatches;
}

function genericDateMentions(text, identityTokens) {
  const mentions = [];
  for (const pattern of GENERIC_DATE_PATTERNS) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      const value = parseDate(match[1]);
      if (!value) continue;
      const index = match.index ?? 0;
      const before = text.slice(Math.max(0, index - 240), index);
      const after = text.slice(index + match[0].length, Math.min(text.length, index + match[0].length + 120));
      const context = `${before}${match[0]}${after}`.trim();
      if (UNCERTAIN_DATE_LANGUAGE.test(context)) continue;
      if (NON_APPLICANT_DATE_LANGUAGE.test(context)) continue;
      if (!contextMatchesIdentity(context, identityTokens)) continue;
      const lastBoundary = Math.max(before.lastIndexOf("."), before.lastIndexOf("?"), before.lastIndexOf("!"));
      const nextBoundaryCandidates = [after.indexOf("."), after.indexOf("?"), after.indexOf("!")].filter((position) => position >= 0);
      const nextBoundary = nextBoundaryCandidates.length ? Math.min(...nextBoundaryCandidates) : after.length;
      const beforeClause = before.slice(lastBoundary + 1).slice(-180);
      const afterClause = after.slice(0, nextBoundary).slice(0, 80);
      const distanceTo = (segment, pattern, beforeDate) => {
        let distance = Number.POSITIVE_INFINITY;
        for (const candidate of segment.matchAll(new RegExp(pattern.source, "gi"))) {
          distance = Math.min(
            distance,
            beforeDate
              ? segment.length - ((candidate.index ?? 0) + candidate[0].length)
              : candidate.index ?? 0,
          );
        }
        return distance;
      };
      const closeBefore = distanceTo(beforeClause, CLOSE_LANGUAGE, true);
      const openBefore = distanceTo(beforeClause, OPEN_LANGUAGE, true);
      const closeAfter = distanceTo(afterClause, CLOSE_LANGUAGE, false);
      const openAfter = distanceTo(afterClause, OPEN_LANGUAGE, false);
      let close = false;
      let open = false;
      const rangeEnd =
        /\b(?:through|to|until)\s*$/i.test(beforeClause.slice(-24)) &&
        /\b(?:application|apply|competition|entry|submission|window)\b/i.test(beforeClause);
      if (rangeEnd) close = true;
      else if (Math.min(closeBefore, openBefore) <= 30) {
        close = closeBefore <= openBefore;
        open = openBefore < closeBefore;
      } else if (Math.min(closeAfter, openAfter) <= 30) {
        close = closeAfter <= openAfter;
        open = openAfter < closeAfter;
      } else {
        const closeDistance = Math.min(closeBefore, closeAfter);
        const openDistance = Math.min(openBefore, openAfter);
        close = Number.isFinite(closeDistance) && closeDistance <= openDistance;
        open = Number.isFinite(openDistance) && openDistance < closeDistance;
      }
      mentions.push({
        value,
        index,
        context,
        close,
        open,
      });
    }
  }
  return mentions.filter(
    (mention, index, all) => all.findIndex((candidate) => candidate.value === mention.value && candidate.index === mention.index) === index,
  );
}

function identityBoundSignal(text, pattern, identityTokens) {
  for (const match of text.matchAll(new RegExp(pattern.source, "gi"))) {
    const context = evidenceAround(text, match.index ?? 0, match[0].length);
    if (contextMatchesIdentity(context, identityTokens)) return match;
  }
  return null;
}

function uniqueCandidate(mentions, role) {
  const matches = mentions.filter((mention) => mention[role]);
  const values = [...new Set(matches.map((mention) => mention.value))];
  return values.length === 1
    ? { value: values[0], evidence: matches.find((mention) => mention.value === values[0])?.context ?? "" }
    : null;
}

export function evaluateGenericCandidateSource({ configuration, html, finalUrl, today }) {
  const text = visibleText(html);
  const identity = identityEvidence(configuration.name ?? "", text);
  const crossDomainRedirect = normalizedHost(configuration.sourceUrl) !== normalizedHost(finalUrl);
  const identityMatched = identity.matched.length > 0 && identity.score >= 0.5;
  const mentions = identityMatched && !crossDomainRedirect ? genericDateMentions(text, identity.tokens) : [];
  const currentYear = Number(today.slice(0, 4));
  const currentMentions = mentions.filter((mention) => {
    const year = Number(mention.value.slice(0, 4));
    return year >= currentYear && year <= currentYear + 1;
  });
  const opening = uniqueCandidate(currentMentions, "open");
  const closing = uniqueCandidate(currentMentions, "close");
  const openSignal = identityMatched
    ? identityBoundSignal(text, EXPLICIT_OPEN_LANGUAGE, identity.tokens)
    : null;
  const closedSignal = identityMatched
    ? identityBoundSignal(text, EXPLICIT_CLOSED_LANGUAGE, identity.tokens)
    : null;
  const conflictingSignals = Boolean(openSignal && closedSignal);

  let applicationStatus = "unknown";
  if (!conflictingSignals) {
    if (opening?.value && today < opening.value) applicationStatus = "upcoming";
    else if (opening?.value && closing?.value) {
      applicationStatus = statusFromDatesAndSignal({
        today,
        opensOn: opening.value,
        closesOn: closing.value,
        nextOpensOn: null,
        signalStatus: openSignal ? "open" : null,
      });
    } else if (openSignal && closing?.value && today <= closing.value) applicationStatus = "open";
    // A page can describe the previous cycle as closed while also publishing
    // a later cycle's opening date. Once that later opening date has passed,
    // the old closed language is no longer reliable evidence of the current
    // cycle's status. Keep the status unknown unless the page also supplies
    // an exact closing date for the newer window.
    else if (closedSignal && !(opening?.value && opening.value <= today)) applicationStatus = "closed";
  }

  const evidence = [
    opening?.evidence,
    closing?.evidence,
    openSignal ? evidenceAround(text, openSignal.index ?? 0, openSignal[0].length) : null,
    closedSignal ? evidenceAround(text, closedSignal.index ?? 0, closedSignal[0].length) : null,
  ].filter(Boolean);
  const hasCandidate = Boolean(
    applicationStatus !== "unknown" || opening?.value || closing?.value,
  );

  return {
    text,
    contentHash: createHash("sha256").update(html).digest("hex"),
    normalizedContentHash: createHash("sha256").update(text).digest("hex"),
    sourceStatus: crossDomainRedirect ? "redirected" : identityMatched ? "healthy" : "structure-changed",
    extractionConfidence: hasCandidate ? "medium" : "unknown",
    verificationStatus: hasCandidate ? "review-required" : "unverified",
    applicationStatus,
    opensOn: opening?.value ?? null,
    closesOn: closing?.value ?? null,
    nextOpensOn: null,
    matchedSignal: openSignal?.[0] ?? closedSignal?.[0] ?? null,
    missingRequired: identityMatched ? [] : ["scholarship identity"],
    unsafeUndatedOpen: Boolean(openSignal && !closing?.value),
    crossDomainRedirect,
    evidenceText: [...new Set(evidence)].join("\n\n").slice(0, 4000),
    candidateOnly: true,
    hasCandidate,
    identityScore: identity.score,
  };
}

const CANDIDATE_FIELDS = ["applicationStatus", "opensOn", "closesOn", "nextOpensOn"];

export function buildFieldProposals({ scholarshipId, current, evaluation, sourceUrl, lockedFields = new Set() }) {
  const proposals = [];
  if (evaluation.candidateOnly) {
    if (!evaluation.hasCandidate) return proposals;
    for (const fieldName of CANDIDATE_FIELDS) {
      const proposedValue = evaluation[fieldName];
      if (proposedValue == null || proposedValue === "unknown") continue;
      const currentValue = current?.[fieldName] ?? null;
      if (JSON.stringify(currentValue) === JSON.stringify(proposedValue)) continue;
      proposals.push({
        scholarshipId,
        fieldName,
        currentValue,
        proposedValue,
        sourceUrl,
        evidenceText: evaluation.evidenceText || "Official source contains a candidate exact-date statement.",
        extractionConfidence: evaluation.extractionConfidence,
        risk: "medium",
        verificationStatus: "review-required",
        fieldLocked: lockedFields.has(fieldName),
      });
    }
    return proposals;
  }
  if (evaluation.verificationStatus !== "machine-verified") {
    proposals.push({
      scholarshipId,
      fieldName: "sourceReview",
      currentValue: null,
      proposedValue: {
        sourceStatus: evaluation.sourceStatus,
        missingRequired: evaluation.missingRequired,
        crossDomainRedirect: evaluation.crossDomainRedirect,
        unsafeUndatedOpen: evaluation.unsafeUndatedOpen,
      },
      sourceUrl,
      evidenceText: evaluation.evidenceText || "Official source requires manual review.",
      extractionConfidence: evaluation.extractionConfidence,
      risk: "medium",
      verificationStatus: "review-required",
      fieldLocked: lockedFields.has("sourceReview"),
    });
    return proposals;
  }

  for (const fieldName of CANDIDATE_FIELDS) {
    const proposedValue = evaluation[fieldName];
    if (proposedValue == null || proposedValue === "unknown") continue;
    const currentValue = current?.[fieldName] ?? null;
    if (JSON.stringify(currentValue) === JSON.stringify(proposedValue)) continue;
    proposals.push({
      scholarshipId,
      fieldName,
      currentValue,
      proposedValue,
      sourceUrl,
      evidenceText: evaluation.evidenceText || "Official source matched the configured rule.",
      extractionConfidence: evaluation.extractionConfidence,
      risk: "low",
      verificationStatus: evaluation.verificationStatus,
      fieldLocked: lockedFields.has(fieldName),
    });
  }
  return proposals;
}

/** Never includes application status or dates: Phase 2 cannot publish claims. */
export function operationalStatePatch({ result, previousFailures = 0, checkedAt }) {
  if (!result.success) {
    return {
      last_checked_at: checkedAt,
      source_status: result.sourceStatus,
      consecutive_failures: previousFailures + 1,
    };
  }
  return {
    last_checked_at: checkedAt,
    source_status: result.sourceStatus,
    extraction_confidence: result.extractionConfidence,
    consecutive_failures: 0,
    ...(result.verificationStatus === "machine-verified" ? { last_verified_at: checkedAt } : {}),
  };
}
