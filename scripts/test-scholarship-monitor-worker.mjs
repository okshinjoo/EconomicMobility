import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  buildFieldProposals,
  evaluateGenericCandidateSource,
  evaluateOfficialSource,
  evaluateSourceHealth,
  operationalStatePatch,
  parseDate,
  recurringDates,
  shouldProposeSourceFailure,
  stableStringify,
  visibleText,
} from "./scholarship-monitor-core.mjs";

const sourceConfigurations = JSON.parse(
  readFileSync(new URL("./scholarship-status-sources.json", import.meta.url), "utf8"),
);
const { scholarshipMonitorCoverage } = await import("./scholarship-monitor-config.mjs");
const configurationFor = (id) => sourceConfigurations.find((configuration) => configuration.id === id);

const source = {
  id: "example",
  sourceUrl: "https://example.org/scholarship",
  requiredPatterns: ["Example Scholarship", "Who can apply"],
  statusRules: [{ status: "open", pattern: "applications are now open" }],
  dateRules: { closesOn: ["Deadline: ([A-Z][a-z]+ \\d{1,2}, \\d{4})"] },
};
const open = evaluateOfficialSource({
  configuration: source,
  html: "<main><h1>Example Scholarship</h1><p>Who can apply</p><p>Applications are now open. Deadline: November 12, 2026</p></main>",
  finalUrl: source.sourceUrl,
  today: "2026-08-07",
});
assert.equal(open.applicationStatus, "open");
assert.equal(open.closesOn, "2026-11-12");
assert.equal(open.extractionConfidence, "high");
assert.equal(open.verificationStatus, "machine-verified");
assert.match(open.evidenceText, /Applications are now open/i);
assert.equal(parseDate("08/31/2026"), "2026-08-31");
assert.equal(parseDate("September 1st, 2026"), "2026-09-01");
assert.equal(stableStringify({ b: 2, a: { d: 4, c: 3 } }), stableStringify({ a: { c: 3, d: 4 }, b: 2 }));

const exactDateOnly = evaluateOfficialSource({
  configuration: {
    id: "exact-date-only",
    sourceUrl: "https://example.org/exact-date-only",
    requiredPatterns: ["Exact Date Scholarship", "September 18, 2026"],
    statusRules: [],
    dateRules: { closesOn: ["applications are due ([A-Z][a-z]+ \\d{1,2}, \\d{4})"] },
  },
  html: "<main><h1>Exact Date Scholarship</h1><p>Applications are due September 18, 2026.</p></main>",
  finalUrl: "https://example.org/exact-date-only",
  today: "2026-08-07",
});
assert.equal(exactDateOnly.applicationStatus, "unknown");
assert.equal(exactDateOnly.closesOn, "2026-09-18");
assert.equal(exactDateOnly.verificationStatus, "machine-verified");
assert.deepEqual(
  buildFieldProposals({
    scholarshipId: "exact-date-only",
    current: null,
    evaluation: exactDateOnly,
    sourceUrl: "https://example.org/exact-date-only",
  }).map((proposal) => [proposal.fieldName, proposal.proposedValue]),
  [["closesOn", "2026-09-18"]],
);

const genericCandidate = evaluateGenericCandidateSource({
  configuration: {
    id: "future-makers",
    name: "Future Makers Scholarship",
    sourceUrl: "https://example.org/future-makers",
  },
  html: `<main><h1>Future Makers Scholarship</h1><p>Applications are now open. The application deadline is October 14, 2026.</p></main>`,
  finalUrl: "https://example.org/future-makers",
  today: "2026-08-07",
});
assert.equal(genericCandidate.applicationStatus, "open");
assert.equal(genericCandidate.closesOn, "2026-10-14");
assert.equal(genericCandidate.candidateOnly, true);
assert.equal(genericCandidate.verificationStatus, "review-required");
assert.deepEqual(
  buildFieldProposals({
    scholarshipId: "future-makers",
    current: null,
    evaluation: genericCandidate,
    sourceUrl: "https://example.org/future-makers",
  }).map((proposal) => [proposal.fieldName, proposal.proposedValue, proposal.verificationStatus]),
  [
    ["applicationStatus", "open", "review-required"],
    ["closesOn", "2026-10-14", "review-required"],
  ],
);

const typicalMonthOnly = evaluateGenericCandidateSource({
  configuration: {
    id: "future-makers",
    name: "Future Makers Scholarship",
    sourceUrl: "https://example.org/future-makers",
  },
  html: `<main><h1>Future Makers Scholarship</h1><p>The deadline is typically October 14, 2026.</p></main>`,
  finalUrl: "https://example.org/future-makers",
  today: "2026-08-07",
});
assert.equal(typicalMonthOnly.hasCandidate, false);
assert.deepEqual(
  buildFieldProposals({
    scholarshipId: "future-makers",
    current: null,
    evaluation: typicalMonthOnly,
    sourceUrl: "https://example.org/future-makers",
  }),
  [],
);

const unsafeGenericOpen = evaluateGenericCandidateSource({
  configuration: {
    id: "future-makers",
    name: "Future Makers Scholarship",
    sourceUrl: "https://example.org/future-makers",
  },
  html: `<main><h1>Future Makers Scholarship</h1><p>Applications are now open. The deadline is announced later.</p></main>`,
  finalUrl: "https://example.org/future-makers",
  today: "2026-08-07",
});
assert.equal(unsafeGenericOpen.applicationStatus, "unknown");
assert.equal(unsafeGenericOpen.unsafeUndatedOpen, true);
assert.equal(unsafeGenericOpen.hasCandidate, false);

const separatedOpenAndCloseDates = evaluateGenericCandidateSource({
  configuration: {
    id: "future-makers",
    name: "Future Makers Scholarship",
    sourceUrl: "https://example.org/future-makers",
  },
  html: `<main><h1>Future Makers Scholarship</h1><p>Applications open September 15, 2025. The deadline to submit applications is January 14, 2026.</p></main>`,
  finalUrl: "https://example.org/future-makers",
  today: "2025-08-07",
});
assert.equal(separatedOpenAndCloseDates.opensOn, "2025-09-15");
assert.equal(separatedOpenAndCloseDates.closesOn, "2026-01-14");

const ambiguousProgramDeadlines = evaluateGenericCandidateSource({
  configuration: {
    id: "future-makers",
    name: "Future Makers Scholarship",
    sourceUrl: "https://example.org/future-makers",
  },
  html: `<main><h1>Future Makers Scholarship</h1><p>The 2027 deadlines are: fellowship deadline January 20, 2027 and scholarship deadline January 27, 2027.</p></main>`,
  finalUrl: "https://example.org/future-makers",
  today: "2026-08-07",
});
assert.equal(ambiguousProgramDeadlines.closesOn, null);
assert.equal(ambiguousProgramDeadlines.hasCandidate, false);

const unrelatedProgramOnSharedPage = evaluateGenericCandidateSource({
  configuration: {
    id: "kansas-guard",
    name: "Kansas Guard Educational Assistance",
    sourceUrl: "https://example.org/kansas-aid",
  },
  html: `<main><h1>Kansas financial aid</h1><nav>Guard Educational Assistance</nav><p>${"Program overview. ".repeat(30)}</p><section><h2>Distinguished Scholarship</h2><p>Applicants studying foreign affairs must apply by April 10, 2026.</p></section></main>`,
  finalUrl: "https://example.org/kansas-aid",
  today: "2026-08-07",
});
assert.equal(unrelatedProgramOnSharedPage.hasCandidate, false);

const administratorSubmissionDeadline = evaluateGenericCandidateSource({
  configuration: {
    id: "student-leaders",
    name: "Student Leaders Scholarship",
    sourceUrl: "https://example.org/student-leaders",
  },
  html: `<main><h1>Student Leaders Scholarship</h1><p>State coordinators must submit delegate selections by December 1, 2026. Student application deadlines are set locally.</p></main>`,
  finalUrl: "https://example.org/student-leaders",
  today: "2026-08-07",
});
assert.equal(administratorSubmissionDeadline.hasCandidate, false);

const winnerSubmissionDeadline = evaluateGenericCandidateSource({
  configuration: {
    id: "community-service",
    name: "Community Service Scholarship",
    sourceUrl: "https://example.org/community-service",
  },
  html: `<main><h1>Community Service Scholarship</h1><p>Clubs must submit their winner by June 15, 2026. Applicants should contact their local club for its deadline.</p></main>`,
  finalUrl: "https://example.org/community-service",
  today: "2026-08-07",
});
assert.equal(winnerSubmissionDeadline.hasCandidate, false);

const unrelatedTeacherHonorDeadline = evaluateGenericCandidateSource({
  configuration: {
    id: "natas-national-scholarships",
    name: "NATAS National Scholarships",
    sourceUrl: "https://example.org/natas-scholarships",
  },
  html: `<main><h1>NATAS National Scholarships</h1><section><h2>Teacher Honor</h2><p>Nominate your favorite media teacher. The deadline for entry is March 2, 2026 and the honoree will be announced this spring.</p></section></main>`,
  finalUrl: "https://example.org/natas-scholarships",
  today: "2026-08-07",
});
assert.equal(unrelatedTeacherHonorDeadline.hasCandidate, false);

const drifted = evaluateOfficialSource({
  configuration: source,
  html: "<main><h1>Different Program</h1><p>Applications are now open.</p></main>",
  finalUrl: source.sourceUrl,
  today: "2026-08-07",
});
assert.equal(drifted.applicationStatus, "unknown");
assert.equal(drifted.sourceStatus, "structure-changed");
assert.equal(drifted.verificationStatus, "review-required");

assert.deepEqual(
  recurringDates({ opensMonthDay: "12-01", closesMonthDay: "03-01" }, "2027-01-15"),
  { opensOn: "2026-12-01", closesOn: "2027-03-01" },
);
assert.deepEqual(
  recurringDates({ opensMonthDay: "12-01", closesMonthDay: "03-01" }, "2027-03-02"),
  { opensOn: "2027-12-01", closesOn: "2028-03-01" },
);

for (const configuration of sourceConfigurations) {
  for (const windowName of ["fixedWindow", "recurringWindow"]) {
    const window = configuration[windowName];
    if (!window) continue;
    for (const fieldName of ["opensOn", "closesOn", "nextOpensOn"]) {
      const configured =
        windowName === "recurringWindow"
          ? fieldName === "opensOn"
            ? window.opensMonthDay
            : fieldName === "closesOn"
              ? window.closesMonthDay
              : null
          : window[fieldName];
      if (configured) {
        assert.ok(
          window.evidencePatterns?.[fieldName],
          `${configuration.id} ${fieldName} must have field-specific official-page evidence`,
        );
      }
    }
  }
}

const ronBrown = evaluateOfficialSource({
  configuration: configurationFor("ron-brown"),
  html: `<main><h1>Ron Brown Signature Scholarship</h1><h2>APPLICATION FOR THE 2026 SCHOLARSHIP COMPETITION IS NOW CLOSED</h2><p>The Ron Brown Scholar Program has a final deadline of December 1st.</p><p>We begin accepting applications after September 3rd of your senior year.</p></main>`,
  finalUrl: configurationFor("ron-brown").sourceUrl,
  today: "2026-08-07",
});
assert.equal(ronBrown.applicationStatus, "between-cycles");
assert.equal(ronBrown.opensOn, null);
assert.equal(ronBrown.closesOn, null);

const elks = evaluateOfficialSource({
  configuration: configurationFor("elks-mvs"),
  html: `<main><h1>Most Valuable Student</h1><p>ElksMVS</p><p>Click here to Apply to the 2027 MVS Contest</p><p>The 2027 application deadline is November 12, 2026.</p><p>The Elks National Foundation will award 500 four-year scholarships.</p></main>`,
  finalUrl: configurationFor("elks-mvs").sourceUrl,
  today: "2026-08-07",
});
assert.equal(elks.applicationStatus, "open");
assert.equal(elks.opensOn, null);
assert.equal(elks.closesOn, "2026-11-12");

const vfw = evaluateOfficialSource({
  configuration: configurationFor("vfw-voice"),
  html: `<main><h1>Voice of Democracy</h1><p>Download the 2026-2027 entry form, then submit it to a Post; essays must be turned in by midnight, Oct. 31.</p><p>The 2026-27 theme is current.</p></main>`,
  finalUrl: configurationFor("vfw-voice").sourceUrl,
  today: "2026-08-07",
});
assert.equal(vfw.applicationStatus, "open");
assert.equal(vfw.opensOn, null);
assert.equal(vfw.closesOn, "2026-10-31");

const aws = evaluateOfficialSource({
  configuration: configurationFor("aws-welding"),
  html: `<main><h1>American Welding Society</h1><p>2026-2027 Scholarship Programs currently open: Welder Training Scholarship - deadline is November 30th.</p></main>`,
  finalUrl: configurationFor("aws-welding").sourceUrl,
  today: "2026-08-07",
});
assert.equal(aws.applicationStatus, "open");
assert.equal(aws.opensOn, null);
assert.equal(aws.closesOn, "2026-11-30");

assert.match(
  visibleText('<img alt="January 1: applications open, April 1: applications closed">'),
  /January 1: applications open, April 1: applications closed/,
);
assert.equal(visibleText("<main>Official\u0000 scholarship page</main>"), "Official scholarship page");
assert.equal(visibleText("<main>Current text<!-- stale applications are closed --></main>"), "Current text");

const davisPutter = evaluateOfficialSource({
  configuration: configurationFor("davis-putter"),
  html: `<main><h1>Davis-Putter Scholarship Fund</h1><p>The maximum grant available is $15,000.</p><img alt="Davis-Putter Scholarship Application Timeline: January 1: applications open, April 1: applications closed"></main>`,
  finalUrl: configurationFor("davis-putter").sourceUrl,
  today: "2026-08-07",
});
assert.equal(davisPutter.applicationStatus, "upcoming");
assert.equal(davisPutter.opensOn, "2027-01-01");
assert.equal(davisPutter.closesOn, "2027-04-01");

const burgerKing = evaluateOfficialSource({
  configuration: configurationFor("burger-king-scholars"),
  html: `<main><h1>BK Scholars Program</h1><p>Scholarships to deserving high school seniors and Burger King employees.</p><p>The application period for the 2027-2028 cycle opens on October 15th, 2026 and will be open until we receive 30,000 applications or until December 15th, 2026.</p></main>`,
  finalUrl: configurationFor("burger-king-scholars").sourceUrl,
  today: "2026-08-07",
});
assert.equal(burgerKing.applicationStatus, "upcoming");
assert.equal(burgerKing.opensOn, "2026-10-15");
assert.equal(burgerKing.closesOn, "2026-12-15");

const davidsonFellows = evaluateOfficialSource({
  configuration: configurationFor("davidson-fellows"),
  html: `<main><h1>How to Apply for the Fellows Scholarship</h1><h2>Application Submission &amp; Deadline</h2><p>The 2026 application is now closed. The 2027 application will open in Fall of 2026.</p></main>`,
  finalUrl: configurationFor("davidson-fellows").sourceUrl,
  today: "2026-08-07",
});
assert.equal(davidsonFellows.applicationStatus, "upcoming");
assert.equal(davidsonFellows.opensOn, null);
assert.equal(davidsonFellows.closesOn, null);

const coolidge = evaluateOfficialSource({
  configuration: configurationFor("coolidge-scholarship"),
  html: `<main><h1>2026-27 SELECTION TIMELINE</h1><p>The Coolidge Scholarship will begin accepting applications for the 2026-27 scholarship cycle in the late summer or early fall of 2026. Once the application is live, the submission deadline will be posted.</p><p>Summer 2027: Newly selected scholars attend orientation.</p></main>`,
  finalUrl: configurationFor("coolidge-scholarship").sourceUrl,
  today: "2026-08-07",
});
assert.equal(coolidge.applicationStatus, "upcoming");
assert.equal(coolidge.opensOn, null);

const hagan = evaluateOfficialSource({
  configuration: configurationFor("hagan-scholarship"),
  html: `<main><h1>Scholarship Application Timeline</h1><p>For the 2027-2028 Academic Year</p><h2>Fall 2026 Applications</h2><p>1. Application available September 1, 2026.</p><p>2. Application Submittal Deadline December 1, 2026.</p></main>`,
  finalUrl: configurationFor("hagan-scholarship").sourceUrl,
  today: "2026-08-07",
});
assert.equal(hagan.applicationStatus, "upcoming");
assert.equal(hagan.opensOn, "2026-09-01");
assert.equal(hagan.closesOn, "2026-12-01");

const swe = evaluateOfficialSource({
  configuration: configurationFor("swe-scholarships"),
  html: `<main><h1>One Application, Endless Opportunities</h1><h2>Collegiate/Graduate Scholars</h2><p>Now CLOSED for the 26-27 Academic Year</p><h2>Emerging First Year Scholars</h2></main>`,
  finalUrl: configurationFor("swe-scholarships").sourceUrl,
  today: "2026-08-07",
});
assert.equal(swe.applicationStatus, "closed");

const unsupportedFixedOpening = evaluateOfficialSource({
  configuration: {
    id: "unsupported-opening",
    sourceUrl: "https://example.org/unsupported-opening",
    requiredPatterns: ["Example Award"],
    statusRules: [{ status: "open", pattern: "applications are open" }],
    fixedWindow: {
      opensOn: "2026-08-01",
      closesOn: "2026-11-12",
      evidencePatterns: {
        opensOn: "applications opened August 1, 2026",
        closesOn: "deadline is November 12, 2026",
      },
    },
  },
  html: `<main><h1>Example Award</h1><p>Applications are open; the deadline is November 12, 2026.</p></main>`,
  finalUrl: "https://example.org/unsupported-opening",
  today: "2026-08-07",
});
assert.equal(unsupportedFixedOpening.opensOn, null);
assert.equal(unsupportedFixedOpening.closesOn, "2026-11-12");

const proposals = buildFieldProposals({
  scholarshipId: "example",
  current: { applicationStatus: "unknown", closesOn: null },
  evaluation: open,
  sourceUrl: source.sourceUrl,
});
assert.deepEqual(proposals.map((proposal) => proposal.fieldName), ["applicationStatus", "closesOn"]);

const locked = buildFieldProposals({
  scholarshipId: "example",
  current: { applicationStatus: "unknown" },
  evaluation: open,
  sourceUrl: source.sourceUrl,
  lockedFields: new Set(["applicationStatus"]),
});
assert.equal(locked.find((proposal) => proposal.fieldName === "applicationStatus")?.fieldLocked, true);

const failurePatch = operationalStatePatch({
  result: { success: false, sourceStatus: "server-error" },
  previousFailures: 2,
  checkedAt: "2026-08-07T12:00:00.000Z",
});
assert.deepEqual(failurePatch, {
  last_checked_at: "2026-08-07T12:00:00.000Z",
  source_status: "server-error",
  consecutive_failures: 3,
});
assert.equal("application_status" in failurePatch, false);
assert.equal("closes_on" in failurePatch, false);

const successPatch = operationalStatePatch({
  result: {
    success: true,
    sourceStatus: "healthy",
    extractionConfidence: "unknown",
    verificationStatus: "unverified",
  },
  previousFailures: 2,
  checkedAt: "2026-08-07T12:00:00.000Z",
});
assert.deepEqual(Object.keys(failurePatch).sort(), ["consecutive_failures", "last_checked_at", "source_status"]);
assert.deepEqual(Object.keys(successPatch).sort(), ["consecutive_failures", "extraction_confidence", "last_checked_at", "source_status"]);

const health = evaluateSourceHealth({
  html: "<main><h1>Example Scholarship</h1><p>This is the official scholarship program page with application details, eligibility requirements, and contact information.</p></main>",
  sourceUrl: "https://example.org/scholarship",
  finalUrl: "https://example.org/scholarship",
});
assert.equal(health.sourceStatus, "healthy");
assert.equal(health.applicationStatus, "unknown");
assert.equal(health.verificationStatus, "unverified");
const redirectedHealth = evaluateSourceHealth({
  html: "<main><h1>Example Scholarship</h1><p>This official program page contains enough information to be a real document.</p></main>",
  sourceUrl: "https://example.org/scholarship",
  finalUrl: "https://awards.example.edu/scholarship",
});
assert.equal(redirectedHealth.sourceStatus, "redirected");
assert.equal(redirectedHealth.crossDomainRedirect, true);
assert.equal(shouldProposeSourceFailure({ monitorMode: "source-health", previousFailures: 0, sourceStatus: "not-found" }), false);
assert.equal(shouldProposeSourceFailure({ monitorMode: "source-health", previousFailures: 1, sourceStatus: "not-found" }), false);
assert.equal(shouldProposeSourceFailure({ monitorMode: "source-health", previousFailures: 2, sourceStatus: "not-found" }), true);
assert.equal(shouldProposeSourceFailure({ monitorMode: "source-health", previousFailures: 4, sourceStatus: "blocked" }), false);
assert.equal(shouldProposeSourceFailure({ monitorMode: "status", previousFailures: 0 }), true);

const coverage = scholarshipMonitorCoverage();
assert.equal(coverage.status.length, sourceConfigurations.length);
assert.equal(coverage.sourceHealth.length, coverage.published - sourceConfigurations.length);
assert.equal(coverage.candidate.length, coverage.sourceHealth.length);
assert.deepEqual(
  coverage.candidate.map((configuration) => configuration.id).sort(),
  coverage.sourceHealth.map((configuration) => configuration.id).sort(),
);
assert.equal(coverage.all.length, coverage.published);
assert.equal(new Set(coverage.all.map((configuration) => configuration.id)).size, coverage.published);

console.log("Scholarship observation worker: all assertions passed.");
