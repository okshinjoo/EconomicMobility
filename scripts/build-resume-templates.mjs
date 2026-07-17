// Resume + cover letter templates (July 16, 2026, owner ask: a Careers
// subtab with resume templates). Same pattern as build-templates.mjs:
// binaries are GENERATED into public/templates/ — run
// `npm run build:resumes`, never hand-edit the .docx. Guidance lives in
// [brackets] inside each document so the file teaches while it's filled
// in; the bullet formula matches the resume guide
// (/learn/college/resume-with-no-experience). US Letter, one page, one
// plain font — the format the guide preaches.

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import {
  AlignmentType,
  BorderStyle,
  Document,
  LevelFormat,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

const OUT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "templates"
);

// US Letter in DXA (1440 = 1 inch)
const PAGE = { size: { width: 12240, height: 15840 } };
const MARGIN = { top: 1080, bottom: 1080, left: 1080, right: 1080 };
const FONT = "Calibri";
const INK = "11211c";
const STONE = "5f6b64";

const numbering = {
  config: [
    {
      reference: "bullets",
      levels: [
        {
          level: 0,
          format: LevelFormat.BULLET,
          text: "•",
          style: {
            paragraph: { indent: { left: 360, hanging: 200 } },
          },
        },
      ],
    },
  ],
};

const run = (text, opts = {}) =>
  new TextRun({ text, font: FONT, size: 21, color: INK, ...opts });

const name = (text) =>
  new Paragraph({
    children: [run(text, { size: 44, bold: true })],
    spacing: { after: 40 },
  });

const contact = (text) =>
  new Paragraph({
    children: [run(text, { size: 20, color: STONE })],
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: INK, space: 6 },
    },
    spacing: { after: 200 },
  });

const section = (text) =>
  new Paragraph({
    children: [run(text.toUpperCase(), { size: 20, bold: true })],
    spacing: { before: 220, after: 80 },
  });

const entry = (left, right) =>
  new Paragraph({
    children: [
      run(left, { bold: true }),
      run(right ? `   —   ${right}` : "", { color: STONE }),
    ],
    spacing: { before: 60, after: 20 },
  });

const bullet = (text) =>
  new Paragraph({
    children: [run(text)],
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 40 },
  });

const plain = (text, opts = {}) =>
  new Paragraph({
    children: [run(text, opts)],
    spacing: { after: 120 },
  });

const footer = () =>
  new Paragraph({
    children: [
      run(
        "Free template from the Economic Mobility Project · economicmobilityproject.org/students/careers · delete this line before sending",
        { size: 16, italics: true, color: STONE }
      ),
    ],
    spacing: { before: 300 },
    alignment: AlignmentType.CENTER,
  });

function doc(children) {
  return new Document({
    numbering,
    sections: [{ properties: { page: { ...PAGE, margin: MARGIN } }, children }],
  });
}

// ---------------------------------------------------------------- resumes
const firstResume = doc([
  name("[Your Name]"),
  contact(
    "[City, State]  ·  [(555) 555-5555]  ·  [firstname.lastname@email.com]"
  ),
  section("Summary"),
  plain(
    "[One line, tailored to this job: who you are + one proof + what you're looking for. Example: “Reliable high school senior with two years of robotics-team logistics experience, seeking a part-time retail role.”]"
  ),
  section("Education"),
  entry("[School Name]", "[City, State] · Expected graduation [Month Year]"),
  bullet("[GPA — include only if it's about 3.5 or higher: “GPA: 3.7”]"),
  bullet(
    "[2–3 relevant courses or honors: “Honors Algebra II, Intro to Business, AP Spanish”]"
  ),
  section("Experience & Activities"),
  plain(
    "[No jobs yet is normal. Projects, clubs, volunteering, caregiving, and side money all belong here — newest first.]",
    { italics: true, size: 18, color: STONE }
  ),
  entry("[Role — e.g., Treasurer / Volunteer / Tutor]", "[Organization or context] · [Month Year – Month Year]"),
  bullet(
    "[Action verb + what you did + a number: “Managed ticket sales for a 300-person school event”]"
  ),
  bullet(
    "[Second bullet — the result: “Tracked $2,000 in sales with zero discrepancies”]"
  ),
  entry("[Role]", "[Organization] · [Dates]"),
  bullet("[Action verb + what you did + number or result]"),
  bullet("[Keep each bullet to one line where you can]"),
  entry("[Role]", "[Organization] · [Dates]"),
  bullet("[Three entries is plenty for a first resume]"),
  section("Skills"),
  bullet("[Languages you speak — and how well: “Spanish (fluent)”]"),
  bullet("[Software or tools you actually use: “Google Sheets, Canva”]"),
  bullet(
    "[Certifications: food handler's card, CPR, lifeguard — with the year]"
  ),
  footer(),
]);

const studentResume = doc([
  name("[Your Name]"),
  contact(
    "[City, State]  ·  [(555) 555-5555]  ·  [firstname.lastname@email.com]"
  ),
  section("Summary"),
  plain(
    "[One line: who you are + your strongest proof + what you're after. “Community college student with 18 months of customer-service experience and a 3.6 GPA, seeking a campus IT support role.”]"
  ),
  section("Experience"),
  entry("[Job Title]", "[Employer] · [City] · [Month Year – Present]"),
  bullet(
    "[Action verb + what you did + a number: “Handled 60+ customer transactions per shift with a balanced drawer”]"
  ),
  bullet("[What you improved or were trusted with: “Trained two new hires”]"),
  entry("[Job Title]", "[Employer] · [City] · [Dates]"),
  bullet("[Action verb + what + result]"),
  bullet("[One more — cut anything that repeats the line above]"),
  section("Education"),
  entry("[School Name]", "[Expected graduation Month Year]"),
  bullet("[Program or major; GPA if about 3.5+; honors or dean's list]"),
  section("Activities & Volunteering"),
  entry("[Club, team, or volunteer role]", "[Organization] · [Dates]"),
  bullet("[The responsibility that best matches this job posting]"),
  section("Skills"),
  bullet("[Languages · software · certifications, comma-separated is fine]"),
  footer(),
]);

const coverLetter = doc([
  name("[Your Name]"),
  contact(
    "[City, State]  ·  [(555) 555-5555]  ·  [firstname.lastname@email.com]"
  ),
  plain("[Month Day, Year]"),
  plain(
    "[Hiring Manager's name if you can find it — “Hiring Manager” is fine if not]"
  ),
  plain("[Company Name]"),
  plain(""),
  plain("Dear [Name or “Hiring Manager”],"),
  plain(
    "[Paragraph 1 — two sentences. Name the exact role and where you saw it, then one line on why this company: “I'm applying for the weekend team member role posted on your site. I shop at this store with my family, and it's the first place I thought of when I started looking for work.”]"
  ),
  plain(
    "[Paragraph 2 — your proof. Pick the one or two strongest things from your resume and connect them to the job's own words: “The posting asks for reliability under pressure. I've kept a 3.6 GPA while covering three tutoring sessions a week, and I ran ticket sales for a 300-person event without losing a dollar.”]"
  ),
  plain(
    "[Paragraph 3 — two sentences to close. Your availability, and a plain ask: “I'm available weekday evenings and all weekend, and I can start immediately. I'd welcome the chance to interview.”]"
  ),
  plain("Sincerely,"),
  plain("[Your Name]"),
  footer(),
]);

// ------------------------------------------------------------------ write
const files = [
  ["empower-first-resume-template.docx", firstResume],
  ["empower-student-resume-template.docx", studentResume],
  ["empower-cover-letter-template.docx", coverLetter],
];

for (const [filename, document] of files) {
  const buffer = await Packer.toBuffer(document);
  fs.writeFileSync(path.join(OUT_DIR, filename), buffer);
  console.log("wrote", filename, `${Math.round(buffer.length / 1024)}kb`);
}
