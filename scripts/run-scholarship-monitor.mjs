import "./register-scholarship-typescript.mjs";

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";
import {
  buildFieldProposals,
  buildGeographyProposal,
  browserDownloadIsHealthyPdf,
  canReuseObservationForConditionalFetch,
  evaluateGenericCandidateSource,
  evaluateGeography,
  evaluateOfficialSource,
  evaluateSourceHealth,
  operationalStatePatch,
  operationalModeStatePatch,
  renderedObservationImproved,
  shouldProposeSourceFailure,
  shouldUseBrowserFallback,
  sourceKindForMonitorMode,
  stableStringify,
} from "./scholarship-monitor-core.mjs";
import { loadScholarshipMonitorConfigurations } from "./scholarship-monitor-config.mjs";

const { canAutoApply } = await import("../lib/scholarshipMonitoring.ts");

const modeArgument = process.argv.find((argument) => argument.startsWith("--mode="));
const monitorMode = modeArgument?.slice(7) ?? "status";
const write = process.argv.includes("--write");
const withheldOnly = process.argv.includes("--withheld-only");
const triggerArgument = process.argv.find((argument) => argument.startsWith("--trigger="));
const triggerKind = triggerArgument?.slice(10) ?? "scheduled";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (write && (!url || !serviceKey)) {
  throw new Error("--write requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
}
const admin = write
  ? createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null;
const inventoryDocument = JSON.parse(
  await readFile(new URL("../data/scholarship-monitor-inventory.json", import.meta.url), "utf8"),
);
let additionalRecords = [];
if (admin && ["candidate", "source-health"].includes(monitorMode)) {
  const { data: withheldRows, error: withheldError } = await admin
    .from("scholarship_monitor_inventory")
    .select("scholarship_id,name,official_url,source_domain,publication_status,catalog_fingerprint,catalog_verified_label,geo_scope,geo_states,geo_verification_status,geo_evidence,geo_source_url")
    .eq("publication_status", "withheld")
    .eq("monitor_enabled", true);
  if (withheldError) throw withheldError;
  additionalRecords = (withheldRows ?? []).map((record) => ({
    scholarshipId: record.scholarship_id,
    name: record.name,
    officialUrl: record.official_url,
    sourceDomain: record.source_domain,
    publicationStatus: record.publication_status,
    catalogFingerprint: record.catalog_fingerprint,
    catalogVerifiedLabel: record.catalog_verified_label,
    geo: record.geo_scope
      ? { scope: record.geo_scope, ...(record.geo_scope === "states" ? { states: record.geo_states } : {}) }
      : null,
    geoVerificationStatus: record.geo_verification_status,
    geoEvidence: record.geo_evidence ?? "",
    geoSourceUrl: record.geo_source_url ?? record.official_url,
  }));
}
const configurations = loadScholarshipMonitorConfigurations({ mode: monitorMode, additionalRecords });
const inventoryIds = new Set([
  ...inventoryDocument.records.map((record) => record.scholarshipId),
  ...additionalRecords.map((record) => record.scholarshipId),
]);

const browserFallback = process.argv.includes("--browser-fallback");
const summaryOnly = process.argv.includes("--summary-only");
const dateArgument = process.argv.find((argument) => argument.startsWith("--date="));
const idArguments = process.argv.filter((argument) => argument.startsWith("--id=")).map((argument) => argument.slice(5));
const limitArgument = process.argv.find((argument) => argument.startsWith("--limit="));
const shardIndexArgument = process.argv.find((argument) => argument.startsWith("--shard-index="));
const shardCountArgument = process.argv.find((argument) => argument.startsWith("--shard-count="));
const proposalOutputArgument = process.argv.find((argument) => argument.startsWith("--proposal-output="));
const shardIndex = Number(shardIndexArgument?.slice(14) ?? 0);
const shardCount = Number(shardCountArgument?.slice(14) ?? 1);
const today = dateArgument?.slice(7) ?? new Date().toISOString().slice(0, 10);
const checkedAt = new Date().toISOString();
const EXTRACTOR_VERSION = "3";

function extractorNameForMode(mode) {
  if (mode === "status") return "configured-html-status";
  if (mode === "candidate") return "generic-exact-evidence-candidate";
  return "official-source-health";
}

if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) throw new Error(`Invalid --date: ${today}`);
if (!new Set(["scheduled", "manual", "retry", "inventory-sync"]).has(triggerKind)) {
  throw new Error(`Invalid --trigger: ${triggerKind}`);
}
if (!Number.isInteger(shardCount) || shardCount < 1) throw new Error(`Invalid --shard-count: ${shardCount}`);
if (!Number.isInteger(shardIndex) || shardIndex < 0 || shardIndex >= shardCount) {
  throw new Error(`Invalid --shard-index: ${shardIndex}`);
}
if (new Set(configurations.map((configuration) => configuration.id)).size !== configurations.length) {
  throw new Error("Scholarship monitor configuration contains duplicate IDs.");
}
for (const configuration of configurations) {
  if (!inventoryIds.has(configuration.id)) throw new Error(`Unknown curated scholarship ID: ${configuration.id}`);
  new URL(configuration.sourceUrl);
}

let selected = idArguments.length
  ? configurations.filter((configuration) => idArguments.includes(configuration.id))
  : configurations;
if (withheldOnly) selected = selected.filter((configuration) => configuration.publicationStatus === "withheld");
selected = selected.filter((configuration) => {
  const shardKey = configuration.monitorMode === "source-health"
    ? new URL(configuration.sourceUrl).hostname.toLowerCase().replace(/^www\./, "")
    : configuration.id;
  const bucket = Number.parseInt(createHash("sha256").update(shardKey).digest("hex").slice(0, 8), 16) % shardCount;
  return bucket === shardIndex;
});
if (limitArgument) selected = selected.slice(0, Number(limitArgument.slice(8)));
if (selected.length === 0) throw new Error("No scholarship monitor sources selected.");

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const lastDomainFetch = new Map();
const domainPolicies = new Map();
const domainQueues = new Map();
const sharedSourceHealthFetches = new Map();
let browserPromise = null;

function failureStatus(status) {
  if ([401, 403, 405, 406].includes(status)) return "blocked";
  if (status === 404 || status === 410) return "not-found";
  if (status === 429) return "rate-limited";
  if (status >= 500) return "server-error";
  return "unknown";
}

function sourceFetchError(message, { httpStatus = null, sourceStatus = "unknown", fetchMethod = "http" } = {}) {
  const error = new Error(message);
  error.httpStatus = httpStatus;
  error.sourceStatus = sourceStatus;
  error.fetchMethod = fetchMethod;
  return error;
}

async function throttle(urlValue) {
  const domain = new URL(urlValue).hostname.toLowerCase().replace(/^www\./, "");
  const last = lastDomainFetch.get(domain) ?? 0;
  const interval = (domainPolicies.get(domain)?.minimum_interval_seconds ?? 2) * 1000;
  const remaining = interval - (Date.now() - last);
  if (remaining > 0) await sleep(remaining);
  lastDomainFetch.set(domain, Date.now());
}

async function fetchWithBrowser(urlValue) {
  if (!browserPromise) {
    browserPromise = import("@playwright/test").then(({ chromium }) => chromium.launch({ headless: true }));
  }
  const browser = await browserPromise;
  const page = await browser.newPage({
    userAgent: "EmpowerScholarshipMonitor/1.0 (+https://economicmobilityproject.org/contact)",
    locale: "en-US",
  });
  try {
    let response;
    try {
      response = await page.goto(urlValue, { waitUntil: "domcontentloaded", timeout: 30000 });
    } catch (error) {
      const errorMessage = String(error.message ?? error);
      if (browserDownloadIsHealthyPdf({ url: urlValue, errorMessage })) {
        return {
          kind: "content",
          html: "%PDF browser download started",
          finalUrl: urlValue,
          httpStatus: 200,
          fetchMethod: "browser",
          contentType: "application/pdf",
          etag: null,
          lastModified: null,
        };
      }
      throw sourceFetchError(errorMessage, { fetchMethod: "browser" });
    }
    if (!response) throw sourceFetchError("Browser navigation returned no response.", { fetchMethod: "browser" });
    if (!response.ok()) {
      throw sourceFetchError(`Browser HTTP ${response.status()}`, {
        httpStatus: response.status(),
        sourceStatus: failureStatus(response.status()),
        fetchMethod: "browser",
      });
    }
    await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => undefined);
    await page.waitForTimeout(1000);
    return {
      kind: "content",
      html: await page.content(),
      finalUrl: page.url(),
      httpStatus: response.status(),
      fetchMethod: "browser",
      contentType: response.headers()["content-type"] ?? "text/html",
      etag: null,
      lastModified: null,
    };
  } finally {
    await page.close();
  }
}

async function fetchOfficialPage(configuration, previous) {
  const headers = {
    "user-agent": "EmpowerScholarshipMonitor/1.0 (+https://economicmobilityproject.org/contact)",
    accept: "text/html,application/xhtml+xml,application/pdf,application/json;q=0.8",
    "accept-language": "en-US,en;q=0.9",
  };
  const mayReusePrevious = canReuseObservationForConditionalFetch({
    previous,
    monitorMode: configuration.monitorMode,
    extractorName: extractorNameForMode(configuration.monitorMode),
    extractorVersion: EXTRACTOR_VERSION,
    publicationStatus: configuration.publicationStatus,
    geoVerificationStatus: configuration.geoVerificationStatus,
  });
  if (mayReusePrevious && previous?.etag) headers["if-none-match"] = previous.etag;
  if (mayReusePrevious && previous?.last_modified) headers["if-modified-since"] = previous.last_modified;

  let lastError = null;
  const lightweightObservation = configuration.monitorMode !== "status";
  const maximumAttempts = lightweightObservation ? 2 : 3;
  const timeout = lightweightObservation ? 12000 : 20000;
  for (let attempt = 0; attempt < maximumAttempts; attempt++) {
    await throttle(configuration.sourceUrl);
    try {
      const response = await fetch(configuration.sourceUrl, {
        redirect: "follow",
        signal: AbortSignal.timeout(timeout),
        headers,
      });
      if (response.status === 304) {
        return {
          kind: "not-modified",
          finalUrl: previous?.final_url ?? configuration.sourceUrl,
          httpStatus: 304,
          fetchMethod: "http",
          contentType: previous?.content_type ?? "",
          etag: response.headers.get("etag") ?? previous?.etag ?? null,
          lastModified: response.headers.get("last-modified") ?? previous?.last_modified ?? null,
        };
      }
      if (response.ok) {
        return {
          kind: "content",
          html: await response.text(),
          finalUrl: response.url,
          httpStatus: response.status,
          fetchMethod: "http",
          contentType: response.headers.get("content-type") ?? "",
          etag: response.headers.get("etag"),
          lastModified: response.headers.get("last-modified"),
        };
      }
      const error = sourceFetchError(`HTTP ${response.status}`, {
        httpStatus: response.status,
        sourceStatus: failureStatus(response.status),
      });
      lastError = error;
      if ([401, 403, 404, 405, 406, 410].includes(response.status) && browserFallback) {
        try {
          return await fetchWithBrowser(configuration.sourceUrl);
        } catch (browserError) {
          if (error.sourceStatus === "blocked") {
            error.message = `${error.message}; browser fallback: ${String(browserError.message ?? browserError)}`;
            error.fetchMethod = "browser";
            error.terminal = true;
            throw error;
          }
          browserError.terminal = true;
          throw browserError;
        }
      }
      if (![429, 500, 502, 503, 504].includes(response.status)) break;
    } catch (error) {
      lastError = error;
      if (error.terminal) break;
      if (browserFallback && attempt === maximumAttempts - 1 && error.fetchMethod !== "browser") {
        try {
          return await fetchWithBrowser(configuration.sourceUrl);
        } catch (browserError) {
          lastError = browserError;
        }
      }
    }
    if (attempt < maximumAttempts - 1) await sleep(attempt === 0 ? 750 : 2000);
  }
  throw lastError ?? new Error("Official source fetch failed.");
}

let runId = null;
let sourceIdByScholarship = new Map();
let previousByScholarship = new Map();
let stateByScholarship = new Map();
let modeStateByScholarship = new Map();
let locksByScholarship = new Map();
let pendingProposalKeys = new Set();

if (admin) {
  const configuredDomains = [...new Set(selected.map((configuration) =>
    new URL(configuration.sourceUrl).hostname.toLowerCase().replace(/^www\./, ""),
  ))];
  const { error: domainUpsertError } = await admin
    .from("scholarship_monitor_domains")
    .upsert(configuredDomains.map((domain) => ({ domain })), { onConflict: "domain", ignoreDuplicates: true });
  if (domainUpsertError) throw domainUpsertError;
  const { data: storedDomains, error: domainPolicyError } = await admin
    .from("scholarship_monitor_domains")
    .select("domain,minimum_interval_seconds,maximum_concurrency,cooldown_until")
    .in("domain", configuredDomains);
  if (domainPolicyError) throw domainPolicyError;
  for (const policy of storedDomains ?? []) domainPolicies.set(policy.domain, policy);

  const { data: run, error: runError } = await admin
    .from("scholarship_monitor_runs")
    .insert({ trigger_kind: triggerKind, worker_version: "observation-pilot-v1", due_count: selected.length })
    .select("id")
    .single();
  if (runError) throw runError;
  runId = run.id;

  const sourceRows = selected.map((configuration) => ({
    scholarship_id: configuration.id,
    source_kind: sourceKindForMonitorMode(configuration.monitorMode),
    url: configuration.sourceUrl,
    source_domain: new URL(configuration.sourceUrl).hostname.toLowerCase().replace(/^www\./, ""),
    extraction_strategy: "html",
    extractor_config: configuration,
    expected_signatures: configuration.requiredPatterns ?? [],
  }));
  const { data: sources, error: sourceError } = await admin
    .from("scholarship_monitor_sources")
    .upsert(sourceRows, { onConflict: "scholarship_id,source_kind,url" })
    .select("id,scholarship_id,url");
  if (sourceError) throw sourceError;
  sourceIdByScholarship = new Map(sources.map((source) => [source.scholarship_id, source.id]));

  const ids = selected.map((configuration) => configuration.id);
  const [observationQuery, stateQuery, modeStateQuery, lockQuery, proposalQuery] = await Promise.all([
    admin.from("scholarship_monitor_observations").select("*").in("scholarship_id", ids).order("fetched_at", { ascending: false }).limit(5000),
    admin.from("scholarship_monitor_state").select("*").in("scholarship_id", ids),
    admin.from("scholarship_monitor_mode_state").select("*").in("scholarship_id", ids),
    admin.from("scholarship_monitor_field_locks").select("scholarship_id,field_name").in("scholarship_id", ids),
    admin.from("scholarship_monitor_proposals").select("scholarship_id,field_name,proposed_value").in("scholarship_id", ids).eq("status", "pending"),
  ]);
  for (const query of [observationQuery, stateQuery, modeStateQuery, lockQuery, proposalQuery]) if (query.error) throw query.error;
  for (const observation of observationQuery.data ?? []) {
    if (!previousByScholarship.has(observation.scholarship_id)) previousByScholarship.set(observation.scholarship_id, observation);
  }
  stateByScholarship = new Map((stateQuery.data ?? []).map((state) => [state.scholarship_id, state]));
  modeStateByScholarship = new Map(
    (modeStateQuery.data ?? []).map((state) => [`${state.scholarship_id}|${state.monitor_mode}`, state]),
  );
  for (const lock of lockQuery.data ?? []) {
    if (!locksByScholarship.has(lock.scholarship_id)) locksByScholarship.set(lock.scholarship_id, new Set());
    locksByScholarship.get(lock.scholarship_id).add(lock.field_name);
  }
  pendingProposalKeys = new Set(
    (proposalQuery.data ?? []).map(
      (proposal) => `${proposal.scholarship_id}|${proposal.field_name}|${stableStringify(proposal.proposed_value)}`,
    ),
  );
}

async function inspectUnlocked(configuration) {
  const previous = previousByScholarship.get(configuration.id) ?? null;
  try {
    let fetched;
    if (configuration.monitorMode === "source-health") {
      if (!sharedSourceHealthFetches.has(configuration.sourceUrl)) {
        sharedSourceHealthFetches.set(configuration.sourceUrl, fetchOfficialPage(configuration, previous));
      }
      fetched = await sharedSourceHealthFetches.get(configuration.sourceUrl);
    } else {
      fetched = await fetchOfficialPage(configuration, previous);
    }
    if (fetched.kind === "not-modified") {
      return {
        configuration,
        success: true,
        unchanged: true,
        sourceStatus: "healthy",
        extractionConfidence: previous?.metadata?.extractionConfidence ?? "unknown",
        verificationStatus: previous?.metadata?.verificationStatus ?? "unverified",
        fetched,
        previous,
        evaluation: null,
        geographyEvaluation: null,
      };
    }
    let evaluation = configuration.monitorMode === "source-health"
      ? evaluateSourceHealth({ html: fetched.html, sourceUrl: configuration.sourceUrl, finalUrl: fetched.finalUrl, contentType: fetched.contentType })
      : configuration.monitorMode === "candidate"
        ? evaluateGenericCandidateSource({ configuration, html: fetched.html, finalUrl: fetched.finalUrl, today })
        : evaluateOfficialSource({ configuration, html: fetched.html, finalUrl: fetched.finalUrl, today });
    let geographyEvaluation = evaluateGeography({
      configuration,
      html: fetched.html,
      finalUrl: fetched.finalUrl,
    });
    let resolvedFetch = fetched;
    const needsBrowserFallback = shouldUseBrowserFallback({
      monitorMode: configuration.monitorMode,
      evaluation,
      geographyEvaluation,
      publicationStatus: configuration.publicationStatus,
      geoVerificationStatus: configuration.geoVerificationStatus,
    });
    if (browserFallback && fetched.fetchMethod === "http" && needsBrowserFallback) {
      try {
        const rendered = await fetchWithBrowser(configuration.sourceUrl);
        const renderedEvaluation = configuration.monitorMode === "source-health"
          ? evaluateSourceHealth({ html: rendered.html, sourceUrl: configuration.sourceUrl, finalUrl: rendered.finalUrl, contentType: rendered.contentType })
          : configuration.monitorMode === "candidate"
            ? evaluateGenericCandidateSource({
              configuration,
              html: rendered.html,
              finalUrl: rendered.finalUrl,
              today,
            })
            : evaluateOfficialSource({
              configuration,
              html: rendered.html,
              finalUrl: rendered.finalUrl,
              today,
            });
        const renderedGeography = evaluateGeography({
          configuration,
          html: rendered.html,
          finalUrl: rendered.finalUrl,
        });
        const renderedImproved = renderedObservationImproved({
          monitorMode: configuration.monitorMode,
          initialEvaluation: evaluation,
          renderedEvaluation,
          initialGeography: geographyEvaluation,
          renderedGeography,
        });
        if (renderedImproved) {
          resolvedFetch = rendered;
          evaluation = renderedEvaluation;
          geographyEvaluation = renderedGeography;
        }
      } catch {
        // Keep the original fail-closed evaluation when rendering is unavailable.
      }
    }
    const sourceHealthIssue = configuration.monitorMode === "source-health" &&
      !["healthy", "redirected"].includes(evaluation.sourceStatus);
    return {
      configuration,
      success: !sourceHealthIssue,
      unchanged: evaluation.normalizedContentHash === previous?.normalized_content_hash,
      sourceStatus: evaluation.sourceStatus,
      extractionConfidence: evaluation.extractionConfidence,
      verificationStatus: evaluation.verificationStatus,
      fetched: resolvedFetch,
      previous,
      evaluation,
      geographyEvaluation,
      error: sourceHealthIssue
        ? `Official source health check returned ${evaluation.sourceStatus} at ${resolvedFetch.finalUrl}.`
        : undefined,
    };
  } catch (error) {
    const errorMessage = String(error.message ?? error).replace(/\u0000/g, "");
    return {
      configuration,
      success: false,
      unchanged: false,
      sourceStatus: error.sourceStatus ?? "unknown",
      extractionConfidence: "low",
      verificationStatus: "review-required",
      fetched: { finalUrl: configuration.sourceUrl, httpStatus: error.httpStatus ?? null, fetchMethod: error.fetchMethod ?? "http", contentType: null, etag: null, lastModified: null },
      previous,
      evaluation: null,
      geographyEvaluation: null,
      error: errorMessage,
    };
  }
}

async function inspect(configuration) {
  const domain = new URL(configuration.sourceUrl).hostname.toLowerCase().replace(/^www\./, "");
  const previous = domainQueues.get(domain) ?? Promise.resolve();
  const queued = previous.then(() => inspectUnlocked(configuration));
  domainQueues.set(domain, queued.catch(() => undefined));
  return queued;
}

const results = [];
for (let index = 0; index < selected.length; index += 4) {
  results.push(...(await Promise.all(selected.slice(index, index + 4).map(inspect))));
}

let proposals = [];
for (const result of results) {
  if (result.evaluation && ["status", "candidate"].includes(result.configuration.monitorMode)) {
    proposals.push(
      ...buildFieldProposals({
        scholarshipId: result.configuration.id,
        current: (() => {
          const state = stateByScholarship.get(result.configuration.id);
          return state
            ? { applicationStatus: state.application_status, opensOn: state.opens_on, closesOn: state.closes_on, nextOpensOn: state.next_opens_on }
            : null;
        })(),
        evaluation: result.evaluation,
        sourceUrl: result.configuration.sourceUrl,
        lockedFields: locksByScholarship.get(result.configuration.id) ?? new Set(),
      }),
    );
  } else if (
    !result.success &&
    shouldProposeSourceFailure({
      monitorMode: result.configuration.monitorMode,
      previousFailures: modeStateByScholarship.get(
        `${result.configuration.id}|${result.configuration.monitorMode}`,
      )?.consecutive_failures ?? 0,
      sourceStatus: result.sourceStatus,
    })
  ) {
    proposals.push({
      scholarshipId: result.configuration.id,
      fieldName: "sourceReview",
      currentValue: null,
      proposedValue: { sourceStatus: result.sourceStatus, error: result.error },
      sourceUrl: result.configuration.sourceUrl,
      evidenceText: result.error ?? "Official source fetch failed.",
      extractionConfidence: "low",
      risk: "medium",
      verificationStatus: "review-required",
      fieldLocked: (locksByScholarship.get(result.configuration.id) ?? new Set()).has("sourceReview"),
    });
  }

  const geographyProposal = buildGeographyProposal({
    scholarshipId: result.configuration.id,
    currentGeo: result.configuration.currentGeo ?? null,
    evaluation: result.geographyEvaluation,
    sourceUrl: result.configuration.sourceUrl,
    fieldLocked: (locksByScholarship.get(result.configuration.id) ?? new Set()).has("geo"),
  });
  if (geographyProposal) proposals.push(geographyProposal);
}

for (const proposal of proposals) {
  proposal.autoApplyEligible = canAutoApply({
    fieldName: proposal.fieldName,
    proposedValue: proposal.proposedValue,
    extractionConfidence: proposal.extractionConfidence,
    verificationStatus: proposal.verificationStatus,
    risk: proposal.risk,
    sourceStatus: results.find((result) => result.configuration.id === proposal.scholarshipId)?.sourceStatus ?? "unknown",
    fieldLocked: proposal.fieldLocked,
  });
}
proposals = proposals.filter((proposal) => {
  const key = `${proposal.scholarshipId}|${proposal.fieldName}|${stableStringify(proposal.proposedValue)}`;
  if (proposal.fieldLocked || pendingProposalKeys.has(key)) return false;
  pendingProposalKeys.add(key);
  return true;
});

if (proposalOutputArgument) {
  const outputPath = proposalOutputArgument.slice(18);
  if (!outputPath) throw new Error("--proposal-output requires a file path.");
  await writeFile(outputPath, `${JSON.stringify(proposals, null, 2)}\n`, "utf8");
}

if (admin) {
  const observationRows = results.map((result) => ({
    run_id: runId,
    scholarship_id: result.configuration.id,
    source_id: sourceIdByScholarship.get(result.configuration.id) ?? null,
    requested_url: result.configuration.sourceUrl,
    final_url: result.fetched.finalUrl,
    fetched_at: checkedAt,
    fetch_method: result.fetched.fetchMethod,
    http_status: result.fetched.httpStatus,
    source_status: result.sourceStatus,
    success: result.success,
    etag: result.fetched.etag,
    last_modified: result.fetched.lastModified,
    content_hash: result.evaluation?.contentHash ?? result.previous?.content_hash ?? null,
    normalized_content_hash: result.evaluation?.normalizedContentHash ?? result.previous?.normalized_content_hash ?? null,
    extractor_name: extractorNameForMode(result.configuration.monitorMode),
    extractor_version: EXTRACTOR_VERSION,
    evidence_snippet: [result.evaluation?.evidenceText, result.geographyEvaluation?.evidenceText]
      .filter(Boolean)
      .join("\n\n")
      .slice(0, 4000) || null,
    error_kind: result.success ? null : result.sourceStatus,
    error_message: result.error ?? null,
    metadata: {
      observationOnly: true,
      monitorMode: result.configuration.monitorMode,
      unchanged: result.unchanged,
      extractionConfidence: result.extractionConfidence,
      verificationStatus: result.verificationStatus,
      candidate: result.evaluation
        ? {
            applicationStatus: result.evaluation.applicationStatus,
            opensOn: result.evaluation.opensOn,
            closesOn: result.evaluation.closesOn,
            nextOpensOn: result.evaluation.nextOpensOn,
          }
        : null,
      missingRequired: result.evaluation?.missingRequired ?? [],
      healthIssue: result.evaluation
        ? {
            crossDomainRedirect: result.evaluation.crossDomainRedirect,
            loginWall: result.evaluation.loginWall ?? false,
            thinDocument: result.evaluation.thinDocument ?? false,
          }
        : null,
      geography: result.geographyEvaluation
        ? {
            candidate: result.geographyEvaluation.geo,
            hasCandidate: result.geographyEvaluation.hasCandidate,
            conflictingSignals: result.geographyEvaluation.conflictingSignals,
            verificationStatus: result.geographyEvaluation.verificationStatus,
          }
        : null,
    },
  }));
  const observationIdByScholarship = new Map();
  for (let index = 0; index < observationRows.length; index += 200) {
    const { data: observations, error: observationError } = await admin
      .from("scholarship_monitor_observations")
      .insert(observationRows.slice(index, index + 200))
      .select("id,scholarship_id");
    if (observationError) throw observationError;
    for (const observation of observations) observationIdByScholarship.set(observation.scholarship_id, observation.id);
  }

  const stateRows = results.map((result) => ({
    scholarship_id: result.configuration.id,
    ...operationalStatePatch({
      result,
      previousFailures: modeStateByScholarship.get(
        `${result.configuration.id}|${result.configuration.monitorMode}`,
      )?.consecutive_failures ?? 0,
      checkedAt,
    }),
  }));
  const stateRowsByShape = new Map();
  for (const row of stateRows) {
    const shape = Object.keys(row).sort().join(",");
    if (!stateRowsByShape.has(shape)) stateRowsByShape.set(shape, []);
    stateRowsByShape.get(shape).push(row);
  }
  for (const rows of stateRowsByShape.values()) {
    for (let index = 0; index < rows.length; index += 200) {
      const { error } = await admin
        .from("scholarship_monitor_state")
        .upsert(rows.slice(index, index + 200), { onConflict: "scholarship_id" });
      if (error) throw error;
    }
  }

  const modeStateRows = results.map((result) => operationalModeStatePatch({
    result,
    previousFailures: modeStateByScholarship.get(
      `${result.configuration.id}|${result.configuration.monitorMode}`,
    )?.consecutive_failures ?? 0,
    checkedAt,
    observationId: observationIdByScholarship.get(result.configuration.id) ?? null,
  }));
  for (let index = 0; index < modeStateRows.length; index += 200) {
    const { error } = await admin
      .from("scholarship_monitor_mode_state")
      .upsert(modeStateRows.slice(index, index + 200), { onConflict: "scholarship_id,monitor_mode" });
    if (error) throw error;
  }

  if (proposals.length) {
    const proposalRows = proposals.map((proposal) => ({
      scholarship_id: proposal.scholarshipId,
      observation_id: observationIdByScholarship.get(proposal.scholarshipId) ?? null,
      field_name: proposal.fieldName,
      current_value: proposal.currentValue,
      proposed_value: proposal.proposedValue,
      source_url: proposal.sourceUrl,
      evidence_text: proposal.evidenceText,
      extraction_confidence: proposal.extractionConfidence,
      risk: proposal.risk,
      verification_status: proposal.verificationStatus,
      auto_apply_eligible: proposal.autoApplyEligible,
      status: "pending",
    }));
    for (let index = 0; index < proposalRows.length; index += 100) {
      const { error: proposalError } = await admin.from("scholarship_monitor_proposals").insert(proposalRows.slice(index, index + 100));
      if (proposalError) throw proposalError;
    }
  }

  const failures = results.filter((result) => !result.success).length;
  const reviews = results.filter((result) => result.verificationStatus === "review-required").length;
  const { error: finishError } = await admin
    .from("scholarship_monitor_runs")
    .update({
      status: failures ? "completed-with-errors" : "completed",
      checked_count: results.length,
      success_count: results.length - failures,
      failure_count: failures,
      proposal_count: proposals.length,
      finished_at: new Date().toISOString(),
      summary: {
        observationOnly: true,
        monitorMode,
        shardIndex,
        shardCount,
        reviews,
        unchanged: results.filter((result) => result.unchanged).length,
      },
    })
    .eq("id", runId);
  if (finishError) throw finishError;
}

for (const result of results) {
  if (!summaryOnly || !result.success) {
    const candidate = result.evaluation
      ? [
          `status=${result.evaluation.applicationStatus ?? "unknown"}`,
          `opens=${result.evaluation.opensOn ?? "unknown"}`,
          `closes=${result.evaluation.closesOn ?? "unknown"}`,
          `next=${result.evaluation.nextOpensOn ?? "unknown"}`,
        ].join(" · ")
      : "no candidate";
    const geography = result.geographyEvaluation?.hasCandidate
      ? `geo=${stableStringify(result.geographyEvaluation.geo)}`
      : "geo=unverified";
    console.log(`${result.success ? "OK" : "FAIL"} ${result.configuration.id} · ${result.sourceStatus} · ${candidate} · ${geography}`);
  }
}
console.log(
  `${write ? "Recorded" : "Dry run"}: ${results.length} ${monitorMode} sources · shard ${shardIndex + 1}/${shardCount} · ${results.filter((result) => result.success).length} fetched · ${proposals.length} new review proposal(s) · no public updates.`,
);

if (browserPromise) await (await browserPromise).close();
