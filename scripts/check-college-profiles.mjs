import { colleges, FACTOR_IDS } from "../lib/collegeProfiles.ts";

const REQUIRED_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

function fail(message) {
  throw new Error(`College profile check failed: ${message}`);
}

if (colleges.length !== 553) fail(`expected 553 profiles, found ${colleges.length}`);

const ids = new Set();
const names = new Set();
for (const college of colleges) {
  if (ids.has(college.id)) fail(`duplicate id ${college.id}`);
  ids.add(college.id);

  const name = college.name.toLowerCase();
  if (names.has(name)) fail(`duplicate name ${college.name}`);
  names.add(name);

  if (!(college.admitRate > 0 && college.admitRate <= 100)) {
    fail(`${college.id} has an invalid admit rate`);
  }

  for (const factor of Object.keys(college.factors)) {
    if (!FACTOR_IDS.includes(factor)) fail(`${college.id} has unknown C7 factor ${factor}`);
  }
}

const states = new Set(colleges.map((college) => college.place.split(", ").at(-1)));
for (const state of REQUIRED_STATES) {
  if (!states.has(state)) fail(`no college represents ${state}`);
}
if (!states.has("DC")) fail("the existing DC coverage is missing");
if (!states.has("PR")) fail("Puerto Rico coverage is missing");
if (!states.has("VI")) fail("US Virgin Islands coverage is missing");

const sourced = colleges.filter((college) => college.cds);
if (sourced.length !== 423) {
  fail(`expected 423 CDS-linked profiles, found ${sourced.length}`);
}

const generated = colleges.filter(
  (college) => college.id.startsWith("cds-") || college.id.startsWith("catalog-")
);
if (generated.length !== 431) {
  fail(`expected 431 generated profiles, found ${generated.length}`);
}

const priorities = colleges.filter((college) => college.id.startsWith("catalog-"));
if (priorities.length !== 53) {
  fail(`expected 53 priority additions, found ${priorities.length}`);
}

const federallyLinked = colleges.filter((college) => college.federal);
if (federallyLinked.length !== 431) {
  fail(`expected 431 federally linked generated profiles, found ${federallyLinked.length}`);
}
for (const college of federallyLinked) {
  if (!college.federal.url.startsWith("https://")) {
    fail(`${college.id} federal source is not HTTPS`);
  }
  if (!/^20\d{2}$/.test(college.federal.year)) {
    fail(`${college.id} federal source year is invalid`);
  }
}

for (const college of sourced) {
  const source = college.cds;
  if (!source.url.startsWith("https://")) fail(`${college.id} source is not HTTPS`);
  if (source.archiveUrl && !source.archiveUrl.startsWith("https://")) {
    fail(`${college.id} archive record is not HTTPS`);
  }

  const reported = Object.keys(college.factors);
  if (
    source.c7Status === "not-reported" ||
    source.c7Status === "not-extracted" ||
    source.c7Status === "not-encoded"
  ) {
    if (reported.length !== 0) fail(`${college.id} should preserve its blank C7 table`);
  } else if (source.c7Status === "partial") {
    if (reported.length === 0 || reported.length >= FACTOR_IDS.length) {
      fail(`${college.id} should have a genuinely partial C7 extract`);
    }
  } else {
    for (const factor of FACTOR_IDS) {
      if (!(factor in college.factors)) fail(`${college.id} is missing C7 factor ${factor}`);
    }
  }
}

for (const college of colleges.filter((profile) => profile.cdsSearchStatus === "not-found")) {
  if (college.cds) fail(`${college.id} cannot have a CDS and a not-found status`);
  if (Object.keys(college.factors).length !== 0) {
    fail(`${college.id} has C7 factors without a located CDS`);
  }
}

console.log(
  `College profiles OK: ${colleges.length} schools, all 50 states plus DC and territories, ${FACTOR_IDS.length} current C7 factors, ${sourced.length} CDS-linked profiles.`
);
