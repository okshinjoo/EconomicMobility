// Internal link-integrity sweep (July 17, 2026). External URLs have
// check-scholarships/check-opportunities; this is the INTERNAL twin:
// every hand-typed path and slug in the data layer must resolve to a
// real route, or a reader hits a dead end mid-lesson.
//
//   node scripts/check-internal-links.mjs        (npm run check:links)
//
// Sources checked (all of lib/, by regex — no imports, so no alias pain):
//   - markdown links  [label](/path)  in article/blog/post bodies
//   - href/file/tool path string literals in the registries
//   - slug references: related, articleSlugs, sourceSlug, topicSections,
//     roadmaps, articleTools keys, journeys article lists
// Valid-route sets are DERIVED from the same registries (articles incl.
// topic match, topic quizzes, tools incl. main-vs-sub, courses, journeys,
// challenges, blog, community posts, glossary anchors, student mirrors,
// static pages, public files). Exit 1 on any failure — run before shipping
// content changes. Member pages are excluded (dynamicParams: never 404).

import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const read = (p) => readFileSync(join(ROOT, p), "utf8");

// ---------- build the valid-route sets from the registries ----------

const articleFiles = readdirSync(join(ROOT, "lib/articles"))
  .filter((f) => f.endsWith(".ts") && !["types.ts", "headings.ts", "index.ts"].includes(f))
  .map((f) => `lib/articles/${f}`);

/** slug -> topicId (window scan: topicId within 250 chars of its slug) */
const articleTopic = new Map();
for (const f of articleFiles) {
  const s = read(f);
  for (const m of s.matchAll(/slug:\s*"([a-z0-9-]+)"/g)) {
    const t = /topicId:\s*"([a-z-]+)"/.exec(s.slice(m.index, m.index + 250));
    if (t) articleTopic.set(m[1], t[1]);
  }
}

const topicIds = new Set([...read("lib/topics.ts").matchAll(/id:\s*"([a-z-]+)"/g)].map((m) => m[1]));
const quizTopics = new Set(
  [...(read("lib/topicQuizzes.ts").match(/TOPIC_QUIZ_IDS[^;]*/s)?.[0] ?? "").matchAll(/"([a-z-]+)"/g)].map((m) => m[1])
);
const idsIn = (file) => new Set([...read(file).matchAll(/^\s{4}id:\s*"([a-z0-9-]+)"/gm)].map((m) => m[1]));
const courseIds = idsIn("lib/courses.ts");
const journeyIds = idsIn("lib/journeys.ts");
const challengeIds = idsIn("lib/challenges.ts");
const blogSlugs = new Set([...read("lib/blog.ts").matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]));
const postIds = new Set([...read("lib/communityFeed.ts").matchAll(/id:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]));
const glossarySlugs = new Set([...read("lib/glossary.ts").matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]));

// Tools: category base + main item at base, subs at base/slug.
const toolPaths = new Set(["/tools", "/tools/letters", "/tools/templates"]);
{
  const s = read("lib/toolsRegistry.ts");
  const cats = s.split(/base:\s*"/).slice(1);
  for (const chunk of cats) {
    const base = chunk.slice(0, chunk.indexOf('"'));
    toolPaths.add(base);
    for (const m of chunk.matchAll(/slug:\s*"([a-z0-9-]+)"/g)) toolPaths.add(`${base}/${m[1]}`);
  }
}
// Student tool mirrors from the frame map.
const studentToolPaths = new Set(
  [...read("lib/frame.ts").matchAll(/"(\/students\/tools\/[a-z0-9-]+)"/g)].map((m) => m[1])
);
studentToolPaths.add("/students/tools");

const staticPages = new Set([
  "/", "/learn", "/tools", "/courses", "/challenges", "/community", "/blog",
  "/journey", "/ask", "/quiz", "/glossary", "/resources", "/start-here",
  "/about", "/who-we-are", "/contact", "/life", "/updates", "/plan",
  "/privacy", "/account", "/account/reset", "/skills", "/admin/comments",
  "/students", "/students/scholarships", "/students/opportunities",
  "/students/deadlines", "/students/tracker", "/students/careers",
  "/students/career-explorer", "/students/compare-colleges",
  "/students/community", "/students/skills", "/students/quiz",
  "/students/plan", "/students/life", "/students/resources",
  "/students/glossary", "/students/learn", "/students/courses",
  "/students/tools",
  "/students/journey",
]);

function checkPath(raw) {
  if (/^(https?:|mailto:|tel:|#)/.test(raw)) return null;
  const [beforeHash, anchor] = raw.split("#");
  const path = beforeHash.split("?")[0].replace(/\/$/, "") || "/";

  // public files (templates, images, fonts, ics)
  if (/^\/(templates|images|fonts)\//.test(path)) {
    return existsSync(join(ROOT, "public", path)) ? null : `missing public file: ${path}`;
  }

  // glossary anchors must be real terms
  if ((path === "/glossary" || path === "/students/glossary") && anchor) {
    return glossarySlugs.has(anchor) ? null : `unknown glossary term #${anchor}`;
  }

  if (staticPages.has(path)) return null;

  const learn = /^(\/students)?\/learn\/([a-z-]+)(?:\/([a-z0-9-]+))?$/.exec(path);
  if (learn) {
    const [, , topic, third] = learn;
    if (!topicIds.has(topic)) return `unknown topic "${topic}"`;
    if (!third) return null;
    if (third === "quiz") return quizTopics.has(topic) ? null : `no topic quiz for "${topic}"`;
    if (!articleTopic.has(third)) return `unknown article "${third}"`;
    if (articleTopic.get(third) !== topic)
      return `article "${third}" lives under /${articleTopic.get(third)}, not /${topic}`;
    return null;
  }

  let m;
  if ((m = /^(\/students)?\/courses\/([a-z0-9-]+)$/.exec(path)))
    return courseIds.has(m[2]) ? null : `unknown course "${m[2]}"`;
  if ((m = /^(\/students)?\/journey\/([a-z0-9-]+)$/.exec(path)))
    return journeyIds.has(m[2]) ? null : `unknown journey "${m[2]}"`;
  if ((m = /^\/challenges\/([a-z0-9-]+)$/.exec(path)))
    return challengeIds.has(m[1]) ? null : `unknown challenge "${m[1]}"`;
  if ((m = /^\/blog\/([a-z0-9-]+)$/.exec(path)))
    return blogSlugs.has(m[1]) ? null : `unknown blog post "${m[1]}"`;
  if ((m = /^(\/students)?\/community\/post\/([a-z0-9-]+)$/.exec(path)))
    return postIds.has(m[2]) ? null : `unknown community post "${m[2]}"`;
  if (/^\/community\/member\//.test(path)) return null; // dynamicParams: never 404
  if (path.startsWith("/students/tools/"))
    return studentToolPaths.has(path) ? null : `unknown student tool mirror "${path}"`;
  if (path.startsWith("/tools/"))
    return toolPaths.has(path) ? null : `unknown tool "${path}"`;

  return `unroutable path "${path}"`;
}

// ---------- gather every reference from the data layer ----------

const dataFiles = [
  ...articleFiles,
  ...readdirSync(join(ROOT, "lib"))
    .filter((f) => f.endsWith(".ts"))
    .map((f) => `lib/${f}`),
];

const errors = [];
const lineOf = (s, idx) => s.slice(0, idx).split("\n").length;

for (const f of dataFiles) {
  const s = read(f);
  const isInfra = f === "lib/frame.ts" || f === "lib/skillPoints.ts";

  // 1. markdown links in body text
  for (const m of s.matchAll(/\]\((\/[^)\s"']+)\)/g)) {
    const lineStart = s.lastIndexOf("\n", m.index) + 1;
    if (/^\s*(\/\*|\*|\/\/)/.test(s.slice(lineStart, m.index))) continue; // comment, not content
    const err = checkPath(m[1]);
    if (err) errors.push(`${f}:${lineOf(s, m.index)}  [md] ${m[1]} — ${err}`);
  }

  // 2. path string literals (href/file/tool fields and friends).
  // frame.ts/skillPoints hold prefix strings, not links — skip them there.
  for (const m of isInfra ? [] : s.matchAll(/"(\/(?:learn|tools|courses|journey|challenges|blog|community|students|glossary|life|quiz|plan|resources|start-here|ask|about|who-we-are|contact|updates|account|skills|templates|images|fonts|privacy|admin)(?:[/#?][^"\n]*)?)"/g)) {
    const err = checkPath(m[1]);
    if (err) errors.push(`${f}:${lineOf(s, m.index)}  [path] ${m[1]} — ${err}`);
  }

  // 3. bare slug references that must be real articles
  const relatedIsTopics = f === "lib/learnContent.ts";
  for (const m of s.matchAll(/(related|articleSlugs|STARTER_SLUGS|STUDENT_LIFE_SLUGS|ROADMAP_SLUGS):?\s*(?:=\s*)?\[([^\]]*)\]/gs)) {
    if (relatedIsTopics && m[1] === "related") continue;
    for (const sm of m[2].matchAll(/"([a-z0-9-]+)"/g)) {
      if (!articleTopic.has(sm[1]))
        errors.push(`${f}:${lineOf(s, m.index)}  [slug] "${sm[1]}" in ${m[1]} — unknown article`);
    }
  }
  for (const m of s.matchAll(/sourceSlug:\s*"([a-z0-9-]+)"/g)) {
    if (!articleTopic.has(m[1]))
      errors.push(`${f}:${lineOf(s, m.index)}  [slug] sourceSlug "${m[1]}" — unknown article`);
  }
}

// topicSections + articleTools key their entries by article slug
for (const f of ["lib/topicSections.ts", "lib/articleTools.ts", "lib/roadmaps.ts"]) {
  const s = read(f);
  for (const m of s.matchAll(/(?<!id: )"([a-z0-9][a-z0-9-]{5,})"(?=\s*[:,\]])/g)) {
    const v = m[1];
    if (v.includes("/") || articleTopic.has(v)) continue;
    if (topicIds.has(v) || courseIds.has(v) || journeyIds.has(v) || challengeIds.has(v)) continue;
    if (/^(beginner|intermediate|advanced|budget|saving|debt|college)$/.test(v)) continue;
    // long kebab strings in these files are article slugs by construction
    if (v.includes("-")) errors.push(`${f}:${lineOf(s, m.index)}  [slug] "${v}" — unknown article`);
  }
}

console.log(
  `checked ${dataFiles.length} data files against ${articleTopic.size} articles, ` +
  `${toolPaths.size} tool routes, ${courseIds.size} courses, ${journeyIds.size} journeys, ` +
  `${challengeIds.size} challenges, ${blogSlugs.size} posts, ${glossarySlugs.size} glossary terms`
);
if (errors.length) {
  console.log(`\n${errors.length} BROKEN internal reference(s):\n`);
  for (const e of errors) console.log("  ✗ " + e);
  process.exit(1);
}
console.log("all internal links resolve ✓");
