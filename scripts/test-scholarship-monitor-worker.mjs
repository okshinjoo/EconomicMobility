import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  buildFieldProposals,
  buildGeographyProposal,
  canReuseObservationForConditionalFetch,
  evaluateGenericCandidateSource,
  evaluateGeography,
  evaluateOfficialSource,
  evaluateSourceHealth,
  operationalStatePatch,
  parseDate,
  recurringDates,
  renderedObservationImproved,
  shouldProposeSourceFailure,
  shouldUseBrowserFallback,
  sourceKindForMonitorMode,
  stableStringify,
  visibleText,
} from "./scholarship-monitor-core.mjs";

assert.equal(sourceKindForMonitorMode("candidate"), "official");
assert.equal(sourceKindForMonitorMode("source-health"), "official");
assert.equal(sourceKindForMonitorMode("status"), "application");

assert.equal(canReuseObservationForConditionalFetch({
  previous: {
    success: true,
    extractor_name: "official-source-health",
    extractor_version: "2",
    metadata: { monitorMode: "source-health" },
  },
  monitorMode: "candidate",
  extractorName: "generic-exact-evidence-candidate",
  extractorVersion: "2",
}), false);

const thinCandidateEvaluation = { sourceStatus: "structure-changed", missingRequired: [] };
assert.equal(shouldUseBrowserFallback({
  monitorMode: "candidate",
  evaluation: thinCandidateEvaluation,
  geographyEvaluation: { hasCandidate: false },
  publicationStatus: "withheld",
  geoVerificationStatus: "unverified",
}), true);
assert.equal(shouldUseBrowserFallback({
  monitorMode: "candidate",
  evaluation: thinCandidateEvaluation,
  geographyEvaluation: { hasCandidate: false },
  publicationStatus: "published",
  geoVerificationStatus: "human-verified",
}), false);
assert.equal(renderedObservationImproved({
  monitorMode: "candidate",
  initialEvaluation: thinCandidateEvaluation,
  renderedEvaluation: { sourceStatus: "healthy", missingRequired: [] },
  initialGeography: { hasCandidate: false },
  renderedGeography: { hasCandidate: true },
}), true);
assert.equal(canReuseObservationForConditionalFetch({
  previous: {
    success: true,
    extractor_name: "generic-exact-evidence-candidate",
    extractor_version: "2",
    metadata: { monitorMode: "candidate" },
  },
  monitorMode: "candidate",
  extractorName: "generic-exact-evidence-candidate",
  extractorVersion: "2",
}), true);
assert.equal(canReuseObservationForConditionalFetch({
  previous: {
    success: true,
    extractor_name: "generic-exact-evidence-candidate",
    extractor_version: "2",
    metadata: { monitorMode: "candidate" },
  },
  monitorMode: "candidate",
  extractorName: "generic-exact-evidence-candidate",
  extractorVersion: "2",
  publicationStatus: "withheld",
  geoVerificationStatus: "unverified",
}), false);
assert.equal(canReuseObservationForConditionalFetch({
  previous: {
    success: true,
    extractor_name: "generic-exact-evidence-candidate",
    extractor_version: "1",
    metadata: { monitorMode: "candidate" },
  },
  monitorMode: "candidate",
  extractorName: "generic-exact-evidence-candidate",
  extractorVersion: "2",
}), false);

const sourceConfigurations = JSON.parse(
  readFileSync(new URL("./scholarship-status-sources.json", import.meta.url), "utf8"),
);
const { loadScholarshipMonitorConfigurations, scholarshipMonitorCoverage } = await import("./scholarship-monitor-config.mjs");
const configurationFor = (id) => sourceConfigurations.find((configuration) => configuration.id === id);

const stagedCandidate = {
  scholarshipId: "candidate-future-makers-12345678",
  name: "Future Makers Scholarship",
  officialUrl: "https://example.org/future-makers",
  publicationStatus: "withheld",
  geo: null,
  geoVerificationStatus: "unverified",
};
const candidateConfigurations = loadScholarshipMonitorConfigurations({ mode: "candidate", additionalRecords: [stagedCandidate] });
assert.deepEqual(
  candidateConfigurations.find((configuration) => configuration.id === stagedCandidate.scholarshipId),
  {
    id: stagedCandidate.scholarshipId,
    name: stagedCandidate.name,
    sourceUrl: stagedCandidate.officialUrl,
    monitorMode: "candidate",
    currentGeo: null,
    geoVerificationStatus: "unverified",
    publicationStatus: "withheld",
  },
);

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

const priorityDeadlineOnly = evaluateGenericCandidateSource({
  configuration: {
    id: "mn-public-safety-survivor",
    name: "Minnesota Public Safety Officer's Survivor Grant",
    sourceUrl: "https://example.org/mn-public-safety-survivor",
  },
  html: `<main><h1>Minnesota Public Safety Officer's Survivor Grant</h1><p>Applications will still be accepted after the priority deadline, but students may be placed on a waitlist depending on available funds.</p><p>2026-2027 Public Safety Officer's Survivor Grant Application Priority Deadline: August 31, 2026.</p></main>`,
  finalUrl: "https://example.org/mn-public-safety-survivor",
  today: "2026-08-07",
});
assert.equal(priorityDeadlineOnly.closesOn, null);
assert.equal(priorityDeadlineOnly.applicationStatus, "unknown");
assert.equal(priorityDeadlineOnly.hasCandidate, false);

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

const exactApplicationRange = evaluateGenericCandidateSource({
  configuration: {
    id: "hadden-scholarship",
    name: "Maude and Alexander Hadden Scholarship",
    sourceUrl: "https://example.org/hadden",
  },
  html: `<main><h1>Maude and Alexander Hadden Scholarship</h1><p>The Hadden Scholarship application is open from February 1, 2026 — May 15, 2026.</p></main>`,
  finalUrl: "https://example.org/hadden",
  today: "2026-08-07",
});
assert.equal(exactApplicationRange.applicationStatus, "closed");
assert.equal(exactApplicationRange.opensOn, "2026-02-01");
assert.equal(exactApplicationRange.closesOn, "2026-05-15");
assert.equal(exactApplicationRange.unsafeUndatedOpen, false);
assert.deepEqual(
  buildFieldProposals({
    scholarshipId: "hadden-scholarship",
    current: null,
    evaluation: exactApplicationRange,
    sourceUrl: "https://example.org/hadden",
  }).map((proposal) => [proposal.fieldName, proposal.proposedValue]),
  [
    ["applicationStatus", "closed"],
    ["opensOn", "2026-02-01"],
    ["closesOn", "2026-05-15"],
  ],
);

const uncertainApplicationRange = evaluateGenericCandidateSource({
  configuration: {
    id: "hadden-scholarship",
    name: "Maude and Alexander Hadden Scholarship",
    sourceUrl: "https://example.org/hadden",
  },
  html: `<main><h1>Maude and Alexander Hadden Scholarship</h1><p>The application is typically open from February 1, 2026 — May 15, 2026.</p></main>`,
  finalUrl: "https://example.org/hadden",
  today: "2026-08-07",
});
assert.equal(uncertainApplicationRange.opensOn, null);
assert.equal(uncertainApplicationRange.closesOn, null);
assert.equal(uncertainApplicationRange.hasCandidate, false);

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

const staleClosedCycleWithLaterOpening = evaluateGenericCandidateSource({
  configuration: {
    id: "paraprofessional-teacher-preparation-grant",
    name: "Paraprofessional Teacher Preparation Grant (Massachusetts)",
    sourceUrl: "https://example.org/paraprofessional-teacher-preparation-grant",
  },
  html: `<main><h1>Paraprofessional Teacher Preparation Grant</h1><p>The 2025-2026 Paraprofessional Grant application is now closed. The 2026-2027 Paraprofessional Grant application will become available on April 1, 2026.</p><p>PDF Paraprofessional Teacher Preparation Grant Program Guidelines</p></main>`,
  finalUrl: "https://example.org/paraprofessional-teacher-preparation-grant",
  today: "2026-08-07",
});
assert.equal(staleClosedCycleWithLaterOpening.opensOn, "2026-04-01");
assert.equal(staleClosedCycleWithLaterOpening.applicationStatus, "unknown");
assert.deepEqual(
  buildFieldProposals({
    scholarshipId: "paraprofessional-teacher-preparation-grant",
    current: { opensOn: "2026-04-01" },
    evaluation: staleClosedCycleWithLaterOpening,
    sourceUrl: "https://example.org/paraprofessional-teacher-preparation-grant",
  }),
  [],
);

const nationalGeography = evaluateGeography({
  configuration: {
    id: "future-makers",
    name: "Future Makers Scholarship",
    sourceUrl: "https://example.org/future-makers",
  },
  html: `<main><h1>Future Makers Scholarship</h1><p>Open to legal residents of the United States.</p></main>`,
  finalUrl: "https://example.org/future-makers",
});
assert.equal(nationalGeography.hasCandidate, true);
assert.deepEqual(nationalGeography.geo, { scope: "national" });
assert.equal(nationalGeography.verificationStatus, "review-required");

const nationalScholarReach = evaluateGeography({
  configuration: {
    id: "hadden-scholarship",
    name: "Maude and Alexander Hadden Scholarship",
    sourceUrl: "https://example.org/hadden",
  },
  html: `<main><h1>Maude and Alexander Hadden Scholarship</h1><p>Hadden scholars come from all over the United States.</p></main>`,
  finalUrl: "https://example.org/hadden",
});
assert.deepEqual(nationalScholarReach.geo, { scope: "national" });
assert.equal(nationalScholarReach.hasCandidate, true);
assert.deepEqual(
  buildGeographyProposal({
    scholarshipId: "future-makers",
    currentGeo: null,
    evaluation: nationalGeography,
    sourceUrl: "https://example.org/future-makers",
  })?.proposedValue,
  { scope: "national" },
);
assert.equal(
  buildGeographyProposal({
    scholarshipId: "future-makers",
    currentGeo: { scope: "national" },
    evaluation: nationalGeography,
    sourceUrl: "https://example.org/future-makers",
  }),
  null,
);

const stateGeography = evaluateGeography({
  configuration: {
    id: "community-builders",
    name: "Community Builders Scholarship",
    sourceUrl: "https://example.org/community-builders",
  },
  html: `<main><h1>Community Builders Scholarship</h1><p>Applicants must reside in California, Oregon, or Washington.</p></main>`,
  finalUrl: "https://example.org/community-builders",
});
assert.equal(stateGeography.hasCandidate, true);
assert.deepEqual(stateGeography.geo, { scope: "states", states: ["CA", "OR", "WA"] });
assert.equal(
  buildGeographyProposal({
    scholarshipId: "community-builders",
    currentGeo: null,
    evaluation: stateGeography,
    sourceUrl: "https://example.org/community-builders",
  })?.risk,
  "high",
);

const fiftyStateGeography = evaluateGeography({
  configuration: {
    id: "equitable-excellence",
    name: "Equitable Excellence Scholarship",
    sourceUrl: "https://example.org/equitable-excellence",
  },
  html: `<main><h1>Equitable Excellence Scholarship</h1><p>Applicants must reside in one of the 50 U.S. states, District of Columbia or Puerto Rico.</p></main>`,
  finalUrl: "https://example.org/equitable-excellence",
});
assert.equal(fiftyStateGeography.hasCandidate, true);
assert.deepEqual(fiftyStateGeography.geo, { scope: "national" });

const conjunctionIsNotOregon = evaluateGeography({
  configuration: {
    id: "kansas-promise",
    name: "Kansas Promise Scholarship",
    sourceUrl: "https://example.org/kansas-promise",
  },
  html: `<main><h1>Kansas Promise Scholarship</h1><p>Applicants must have graduated from a Kansas high school within 12 months, OR have attended a Kansas high school and received a GED, OR have been a Kansas resident for three years.</p></main>`,
  finalUrl: "https://example.org/kansas-promise",
});
assert.equal(conjunctionIsNotOregon.hasCandidate, true);
assert.deepEqual(conjunctionIsNotOregon.geo, { scope: "states", states: ["KS"] });

const conflictingGeography = evaluateGeography({
  configuration: {
    id: "community-builders",
    name: "Community Builders Scholarship",
    sourceUrl: "https://example.org/community-builders",
  },
  html: `<main><h1>Community Builders Scholarship</h1><p>Students apply nationwide.</p><p>Applicants must reside in California.</p></main>`,
  finalUrl: "https://example.org/community-builders",
});
assert.equal(conflictingGeography.hasCandidate, false);
assert.equal(conflictingGeography.conflictingSignals, true);

const preferenceIsNotGeography = evaluateGeography({
  configuration: {
    id: "community-builders",
    name: "Community Builders Scholarship",
    sourceUrl: "https://example.org/community-builders",
  },
  html: `<main><h1>Community Builders Scholarship</h1><p>Preference is given to students who plan to work in Minnesota.</p></main>`,
  finalUrl: "https://example.org/community-builders",
});
assert.equal(preferenceIsNotGeography.hasCandidate, false);

const citizenshipIsNotGeography = evaluateGeography({
  configuration: {
    id: "community-builders",
    name: "Community Builders Scholarship",
    sourceUrl: "https://example.org/community-builders",
  },
  html: `<main><h1>Community Builders Scholarship</h1><p>Applicants must be U.S. citizens.</p></main>`,
  finalUrl: "https://example.org/community-builders",
});
assert.equal(citizenshipIsNotGeography.hasCandidate, false);

const sharedAwardPageIsScoped = evaluateGeography({
  configuration: {
    id: "general-horticulture-award",
    name: "General Horticulture Scholarship",
    sourceUrl: "https://example.org/awards",
  },
  html: `<main><h1>Scholarships</h1><h2>General Horticulture Scholarship</h2><p>Students across the United States may apply.</p><h2>Florida Growers Award</h2><p>Applicants must reside in Florida.</p></main>`,
  finalUrl: "https://example.org/awards",
});
assert.equal(sharedAwardPageIsScoped.hasCandidate, true);
assert.deepEqual(sharedAwardPageIsScoped.geo, { scope: "national" });

const unrelatedSharedAwardIsIgnored = evaluateGeography({
  configuration: {
    id: "learning-with-love",
    name: "Learning with Love Scholarship",
    sourceUrl: "https://example.org/awards",
  },
  html: `<main><h1>Scholarships</h1><p>Learning with Love is accepting applications.</p><h2>OG&E Scholarship</h2><p>Applicants must reside in Oklahoma or Arkansas.</p><h2>Community Award</h2><p>Applicants must reside in Texas.</p></main>`,
  finalUrl: "https://example.org/awards",
});
assert.equal(unrelatedSharedAwardIsIgnored.hasCandidate, false);

const attendanceLocationIsNotResidency = evaluateGeography({
  configuration: {
    id: "voya-scholars",
    name: "Voya Scholars",
    sourceUrl: "https://example.org/voya",
  },
  html: `<main><h1>Voya Scholars</h1><p>Eligible students must enroll at a State University of New York campus.</p></main>`,
  finalUrl: "https://example.org/voya",
});
assert.equal(attendanceLocationIsNotResidency.hasCandidate, false);

const eventLocationIsNotResidency = evaluateGeography({
  configuration: {
    id: "aifd-scholarship",
    name: "AIFD Scholarship",
    sourceUrl: "https://example.org/aifd",
  },
  html: `<main><h1>AIFD Scholarship</h1><p>Recipients must attend the symposium in St. Louis, Missouri.</p></main>`,
  finalUrl: "https://example.org/aifd",
});
assert.equal(eventLocationIsNotResidency.hasCandidate, false);

const countyNameIsNotAState = evaluateGeography({
  configuration: {
    id: "farm-credit-scholarship",
    name: "Farm Credit Scholarship",
    sourceUrl: "https://example.org/farm-credit",
  },
  html: `<main><h1>Farm Credit Scholarship</h1><p>Applicants must reside in Washington County, Maryland.</p></main>`,
  finalUrl: "https://example.org/farm-credit",
});
assert.equal(countyNameIsNotAState.hasCandidate, true);
assert.deepEqual(countyNameIsNotAState.geo, { scope: "states", states: ["MD"] });

const sponsorNameIsNotAState = evaluateGeography({
  configuration: {
    id: "community-achievement",
    name: "Community Achievement Scholarship",
    sourceUrl: "https://example.org/community-achievement",
  },
  html: `<main><h1>Community Achievement Scholarship</h1><p>New York Life Foundation sponsors this award. Applicants must reside in Nevada.</p></main>`,
  finalUrl: "https://example.org/community-achievement",
});
assert.equal(sponsorNameIsNotAState.hasCandidate, true);
assert.deepEqual(sponsorNameIsNotAState.geo, { scope: "states", states: ["NV"] });

const navigationNationwideIsIgnored = evaluateGeography({
  configuration: {
    id: "minnesota-benefit",
    name: "Minnesota Education Benefit",
    sourceUrl: "https://example.org/minnesota-benefit",
  },
  html: `<nav>Nationwide Gravesite Locator</nav><main><h1>Minnesota Education Benefit</h1><p>Applicants must reside in Minnesota.</p></main>`,
  finalUrl: "https://example.org/minnesota-benefit",
});
assert.equal(navigationNationwideIsIgnored.hasCandidate, true);
assert.deepEqual(navigationNationwideIsIgnored.geo, { scope: "states", states: ["MN"] });

const negatedNationwideIsIgnored = evaluateGeography({
  configuration: {
    id: "incight-scholarship",
    name: "Incight Scholarship",
    sourceUrl: "https://example.org/incight",
  },
  html: `<main><h1>Incight Scholarship</h1><p>This scholarship is not nationwide. Eligible applicants are residents of Oregon, Washington, or California.</p></main>`,
  finalUrl: "https://example.org/incight",
});
assert.equal(negatedNationwideIsIgnored.hasCandidate, true);
assert.deepEqual(negatedNationwideIsIgnored.geo, { scope: "states", states: ["CA", "OR", "WA"] });

const stateResidencyBeatsInstitutionLocations = evaluateGeography({
  configuration: {
    id: "west-virginia-grant",
    name: "West Virginia Higher Education Grant",
    sourceUrl: "https://example.org/wv-grant",
  },
  html: `<main><h1>West Virginia Higher Education Grant</h1><p>Applicants must reside in West Virginia. Students may attend approved institutions in Pennsylvania.</p></main>`,
  finalUrl: "https://example.org/wv-grant",
});
assert.equal(stateResidencyBeatsInstitutionLocations.hasCandidate, true);
assert.deepEqual(stateResidencyBeatsInstitutionLocations.geo, { scope: "states", states: ["WV"] });

const usAndCanadaResidencyIsNationalForFinder = evaluateGeography({
  configuration: {
    id: "dri-foundation-scholarship",
    name: "DRI Foundation Scholarship Award",
    sourceUrl: "https://example.org/dri-foundation",
  },
  html: `<aside><h2>DRI International Accessibility Statement</h2><p>Accessibility information.</p></aside><main><h1>The DRI Foundation Scholarship Award</h1><p>Made possible through donations from DRI and DRI Canada, the scholarship supports resilience education. ${"Application information. ".repeat(8)} The applicant must reside within the United States or Canada.</p><h2>Past Winners</h2><p>Community Leadership Award</p><p>Student Resilience Scholarship</p><p>Continuity Education Fellowship</p></main>`,
  finalUrl: "https://example.org/dri-foundation",
});
assert.equal(usAndCanadaResidencyIsNationalForFinder.hasCandidate, true);
assert.deepEqual(usAndCanadaResidencyIsNationalForFinder.geo, { scope: "national" });

const umbrellaAwardDoesNotInheritSubawardResidency = evaluateGeography({
  configuration: {
    id: "horatio-alger-cte",
    name: "Horatio Alger Career & Technical Scholarship",
    sourceUrl: "https://example.org/cte-scholarships",
  },
  html: `<main><h1>Career & Technical Education Scholarships</h1><p>National Career & Technical Scholarship</p><p>Be a United States citizen.</p><p>John Hardin Hudiburg Career & Technical Scholarship</p><p>John Rollins Career & Technical Scholarship</p><p>Applicants must be a Delaware resident.</p><p>Valencia College Career & Technical Scholarship</p></main>`,
  finalUrl: "https://example.org/cte-scholarships",
});
assert.equal(umbrellaAwardDoesNotInheritSubawardResidency.hasCandidate, false);

const namedNationalExceptionOverridesSharedPageStates = evaluateGeography({
  configuration: {
    id: "unico-alessio-southern-italy",
    name: "UNICO Alessio Southern Italy Scholarship",
    sourceUrl: "https://example.org/unico-scholarships",
  },
  html: `<main><h1>UNICO Scholarships</h1><p>Applicants must reside in California, Connecticut, Delaware, Florida, or Illinois. Exception: The Maria and Paolo Alessio Southern Italy Scholarship is open to applicants from all 50 states. The DiMattio Scholarship is limited to New Jersey residents.</p></main>`,
  finalUrl: "https://example.org/unico-scholarships",
});
assert.equal(namedNationalExceptionOverridesSharedPageStates.hasCandidate, false);
assert.equal(namedNationalExceptionOverridesSharedPageStates.conflictingSignals, true);

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

const adjacentScholarshipDeadlineDoesNotCloseTarget = evaluateGenericCandidateSource({
  configuration: {
    id: "hfa-scholarship",
    name: "HFA Scholarship",
    sourceUrl: "https://example.org/hfa-scholarships",
  },
  html: `<main><h1>HFA Scholarships</h1><p>The HFA Scholarship application will open on April 10, 2026. Please check back for complete program details.</p><section><h2>Medexus B More Scholarship</h2><p>Deadline: April 30, 2026</p></section><section><h2>Optum Infusion Pharmacy & Bleeding Disorders Foundation of North Carolina Scholarships</h2><p>Deadline: May 1, 2026</p></section></main>`,
  finalUrl: "https://example.org/hfa-scholarships",
  today: "2026-08-07",
});
assert.equal(adjacentScholarshipDeadlineDoesNotCloseTarget.opensOn, "2026-04-10");
assert.equal(adjacentScholarshipDeadlineDoesNotCloseTarget.closesOn, null);
assert.equal(adjacentScholarshipDeadlineDoesNotCloseTarget.applicationStatus, "unknown");

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
const botBlockedHealth = evaluateSourceHealth({
  html: "<main><h1>JavaScript is disabled</h1><p>In order to continue, we need to verify that you're not a robot. Enable JavaScript and then reload the page.</p></main>",
  sourceUrl: "https://example.gov/scholarship",
  finalUrl: "https://example.gov/scholarship",
});
assert.equal(botBlockedHealth.sourceStatus, "blocked");
assert.equal(botBlockedHealth.botWall, true);
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
