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
  const tokens = [...new Set(
    (name.toLowerCase().match(/[a-z0-9]+/g) ?? [])
      .filter((token) => token.length >= 4 && !IDENTITY_STOP_WORDS.has(token)),
  )];
  const matched = tokens.filter((token) => text.toLowerCase().includes(token));
  return {
    score: tokens.length ? matched.length / tokens.length : 0,
    tokens,
    matched,
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
    else if (closedSignal) applicationStatus = "closed";
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
