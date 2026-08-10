#!/usr/bin/env node

/**
 * Refresh Career Explorer numbers from the two public BLS datasets used by
 * the site. The source files are intentionally passed in rather than checked
 * in; the May 2025 OEWS response alone is several megabytes.
 *
 * Usage:
 *   node --experimental-strip-types scripts/sync-career-data.mjs \
 *     /tmp/bls-oews-national-2025.json \
 *     /tmp/bls-occupation-projections-all.json
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const wagePath = process.argv[2];
const projectionsPath = process.argv[3];

if (!wagePath || !projectionsPath) {
  console.error(
    "Pass the May 2025 OEWS national JSON and the BLS occupational-projections JSON."
  );
  process.exit(1);
}

const wagesRaw = JSON.parse(fs.readFileSync(wagePath, "utf8"));
const projectionsRaw = JSON.parse(fs.readFileSync(projectionsPath, "utf8"));

const careersModule = await import(
  `${pathToFileURL(path.join(root, "lib/careers.ts")).href}?sync=${Date.now()}`
);
const detailsModule = await import(
  `${pathToFileURL(path.join(root, "lib/careerDetails.ts")).href}?sync=${Date.now()}`
);

const { careers } = careersModule;
const { CAREER_DETAILS } = detailsModule;

const SOC_CORRECTIONS = {
  "home-health-aide": "31-1120",
  "clinical-lab-tech": "29-2010",
};

const OOH_OVERRIDES = {
  "college-professor":
    "https://www.bls.gov/ooh/education-training-and-library/postsecondary-teachers.htm",
};

// OEWS excludes many self-employed workers. BLS therefore publishes no wage
// estimate for this occupation; preserve the catalog entry without inventing
// one and use Employment Projections for the workforce count.
const ALLOW_NO_OEWS_WAGE = new Set(["commercial-fisher"]);

const wageRows = new Map();
for (const row of wagesRaw) {
  const soc = row.formattedOccupationCode;
  const entry = wageRows.get(soc) ?? { title: row.occupationName, values: {} };
  entry.values[row.datatypeCode] = String(row.value ?? "").trim();
  wageRows.set(soc, entry);
}

const projectionRows = new Map(projectionsRaw.map((row) => [row.soc, row]));

const numeric = (value) => {
  if (value == null) return undefined;
  const clean = String(value).trim().replaceAll(",", "");
  if (!clean || ["—", "-", "*", "#", "~", "**"].includes(clean)) {
    return undefined;
  }
  const number = Number(clean);
  return Number.isFinite(number) ? number : undefined;
};

const integer = (value) => {
  const number = numeric(value);
  return number == null ? undefined : Math.round(number);
};

const educationMap = {
  "No formal educational credential": "none",
  "High school diploma or equivalent": "hs",
  "Some college, no degree": "some-college",
  "Postsecondary nondegree award": "certificate",
  "Associate's degree": "associate",
  "Bachelor's degree": "bachelor",
  "Master's degree": "master",
  "Doctoral or professional degree": "doctoral",
};

const files = ["lib/careers.ts", "lib/careerAdditions.ts", "lib/careerDetails.ts"]
  .map((relative) => path.join(root, relative))
  .filter((file) => fs.existsSync(file));
const contents = new Map(files.map((file) => [file, fs.readFileSync(file, "utf8")]));

function findObject(fileText, marker) {
  const markerIndex = fileText.indexOf(marker);
  if (markerIndex < 0) return undefined;
  const lineStart = fileText.lastIndexOf("\n  ", markerIndex);
  const start = lineStart < 0 ? -1 : lineStart + 1;
  const endMarker = "\n  },";
  const end = fileText.indexOf(endMarker, markerIndex);
  if (start < 0 || end < 0) return undefined;
  return { start, end: end + endMarker.length, block: fileText.slice(start, end + endMarker.length) };
}

function replaceObject(file, located, nextBlock) {
  const text = contents.get(file);
  contents.set(file, text.slice(0, located.start) + nextBlock + text.slice(located.end));
}

function updateCareerBlock(id, wage, projection) {
  for (const file of files.filter((name) => !name.endsWith("careerDetails.ts"))) {
    const text = contents.get(file);
    const located = findObject(text, `id: "${id}"`);
    if (!located) continue;

    let block = located.block;
    const annualMedian = integer(wage.values["13"]);
    const hourlyMedian = numeric(wage.values["08"]);
    const growth = numeric(projection.growthPercent);
    const education = educationMap[projection.education];

    if (annualMedian != null) {
      block = block.replace(/(\n\s*medianPay:\s*)[^,]+,/, `$1${annualMedian},`);
    } else {
      block = block.replace(/(\n\s*medianPay:\s*)[^,]+,/, "$1null,");
    }

    block = block.replace(/^\s*medianHourlyPay:.*\n/m, "");
    if (hourlyMedian != null) {
      block = block.replace(
        /(\n\s*medianPay:\s*[^,]+,)/,
        `$1\n    medianHourlyPay: ${hourlyMedian},`
      );
    }

    if (growth != null) {
      block = block.replace(/(\n\s*growth:\s*)[^,]+,/, `$1${growth},`);
    }
    if (education) {
      block = block.replace(
        /(\n\s*education:\s*)"[^"]+",/,
        `$1"${education}",`
      );
    }

    replaceObject(file, located, block);
    return;
  }
  throw new Error(`Could not locate career object for ${id}`);
}

function updateDetailBlock(id, soc, wage, projection) {
  for (const file of files.filter((name) => !name.endsWith("careers.ts"))) {
    const text = contents.get(file);
    const located =
      findObject(text, `"${id}": {`) ?? findObject(text, `${id}: {`);
    if (!located) continue;

    let block = located.block.replace(/(\n\s*soc:\s*)"[^"]+",/, `$1"${soc}",`);
    const fields = [
      "payLow",
      "payHigh",
      "hourlyPayLow",
      "hourlyMedian",
      "hourlyPayHigh",
      "numJobs",
      "annualOpenings",
      "selfEmployedPercent",
      "workExperience",
      "onJobTraining",
      "oohUrl",
    ];
    for (const field of fields) {
      block = block.replace(new RegExp(`^\\s*${field}:.*\\n`, "m"), "");
    }

    const annualOpeningsThousands = numeric(projection.annualOpeningsThousands);
    const detailValues = [
      ["payLow", integer(wage.values["11"])],
      ["payHigh", integer(wage.values["15"])],
      ["hourlyPayLow", numeric(wage.values["06"])],
      ["hourlyMedian", numeric(wage.values["08"])],
      ["hourlyPayHigh", numeric(wage.values["10"])],
      [
        "numJobs",
        integer(wage.values["01"]) ??
          (numeric(projection.employment2024Thousands) == null
            ? undefined
            : Math.round(numeric(projection.employment2024Thousands) * 1000)),
      ],
      [
        "annualOpenings",
        annualOpeningsThousands == null
          ? undefined
          : Math.round(annualOpeningsThousands * 1000),
      ],
      ["selfEmployedPercent", numeric(projection.selfEmployedPercent)],
      [
        "workExperience",
        projection.experience && projection.experience !== "—"
          ? projection.experience
          : undefined,
      ],
      [
        "onJobTraining",
        projection.onJobTraining && projection.onJobTraining !== "—"
          ? projection.onJobTraining
          : undefined,
      ],
      ["oohUrl", OOH_OVERRIDES[id] ?? projection.oohUrl ?? undefined],
    ];

    const serialized = detailValues
      .filter(([, value]) => value != null)
      .map(([field, value]) =>
        typeof value === "string"
          ? `    ${field}: ${JSON.stringify(value)},`
          : `    ${field}: ${value},`
      )
      .join("\n");

    block = block.replace(
      /(\n\s*soc:\s*"[^"]+",)/,
      serialized ? `$1\n${serialized}` : "$1"
    );

    replaceObject(file, located, block);
    return;
  }
  throw new Error(`Could not locate detail object for ${id}`);
}

const missing = [];
for (const career of careers) {
  const detail = CAREER_DETAILS[career.id];
  if (!detail) throw new Error(`Missing details for ${career.id}`);

  const soc = SOC_CORRECTIONS[career.id] ?? detail.soc;
  const wage = wageRows.get(soc);
  const projection = projectionRows.get(soc);
  if ((!wage && !ALLOW_NO_OEWS_WAGE.has(career.id)) || !projection) {
    missing.push({ id: career.id, soc, wage: Boolean(wage), projection: Boolean(projection) });
    continue;
  }

  const wageOrEmpty = wage ?? { title: career.title, values: {} };
  updateCareerBlock(career.id, wageOrEmpty, projection);
  updateDetailBlock(career.id, soc, wageOrEmpty, projection);
}

if (missing.length) {
  console.error("Missing official rows:", missing);
  process.exit(1);
}

for (const [file, text] of contents) fs.writeFileSync(file, text);

console.log(
  `Updated ${careers.length} careers from May 2025 OEWS and 2024–34 BLS projections.`
);
