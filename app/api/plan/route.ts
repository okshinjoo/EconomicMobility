// The plan builder's engine (plan-builder-spec.md, July 2026): intake in,
// personalized plan out. Claude COMPOSES; it never invents. The prompt
// carries a keyed catalog of real site content and the model may only
// reference those keys — anything else is dropped in validation, so a
// hallucinated link is structurally impossible. Dates come only from
// lib/deadlines. With no ANTHROPIC_API_KEY (local dev) or on any AI
// failure, the route returns the deterministic journey-based plan instead
// (aiComposed: false) — the feature degrades to "journeys with a nicer
// intake," never breaks.

import type { NextRequest } from "next/server";
import { getJourney } from "@/lib/journeys";
import { getArticleBySlug, getTopicArticles } from "@/lib/articles";
import { getCourse } from "@/lib/courses";
import { challenges } from "@/lib/challenges";
import { deadlines, type Deadline } from "@/lib/deadlines";
import { getSearchItems } from "@/lib/search";
import { rankItems } from "@/lib/guide";
import type { IntakeAnswers, MyPlan, PlanItem, PlanStage } from "@/lib/plan";

export const runtime = "nodejs";

const MODEL = "claude-opus-4-8";

const STUDENT_STAGES = new Set([
  "high-school",
  "community-college",
  "four-year",
  "transferring",
]);

interface CatalogEntry {
  key: string;
  kind: PlanItem["kind"];
  title: string;
  href: string;
  doneKey?: string;
  due?: string;
  /** Context line shown to the model. */
  note: string;
}

/** Build the keyed catalog the model may compose from. */
function buildCatalog(intake: IntakeAnswers): CatalogEntry[] {
  const out: CatalogEntry[] = [];
  const seen = new Set<string>();
  const add = (e: CatalogEntry) => {
    if (!seen.has(e.key)) {
      seen.add(e.key);
      out.push(e);
    }
  };

  const journey = getJourney(intake.goal);
  if (journey) {
    for (const stage of journey.stages) {
      for (const slug of stage.articleSlugs) {
        const a = getArticleBySlug(slug);
        if (a)
          add({
            key: `g:${a.slug}`,
            kind: "guide",
            title: a.title,
            href: `/learn/${a.topicId}/${a.slug}`,
            doneKey: a.slug,
            note: `${a.dek} (${a.readMinutes} min; journey stage: ${stage.milestone})`,
          });
      }
      if (stage.tool)
        add({
          key: `t:${stage.tool.href}`,
          kind: "tool",
          title: stage.tool.label,
          href: stage.tool.href,
          doneKey: stage.tool.href,
          note: "Calculator on our site.",
        });
      if (stage.courseId) {
        const c = getCourse(stage.courseId);
        if (c)
          add({
            key: `c:${c.id}`,
            kind: "course",
            title: c.title,
            href: `/courses/${c.id}`,
            doneKey: c.id,
            note: c.goal,
          });
      }
      if (stage.challengeId) {
        const ch = challenges.find((x) => x.id === stage.challengeId);
        if (ch)
          add({
            key: `ch:${ch.id}`,
            kind: "challenge",
            title: ch.title,
            href: `/challenges/${ch.id}`,
            doneKey: ch.id,
            note: "Action checklist with a badge at the end.",
          });
      }
    }
  }

  // Free-text detail pulls in extra matching guides from anywhere.
  const query = `${intake.detail} ${intake.target}`.trim();
  if (query) {
    for (const item of rankItems(query, getSearchItems(), 6)) {
      const m = item.href.match(/^\/learn\/[a-z-]+\/([a-z0-9-]+)$/);
      if (!m) continue;
      const a = getArticleBySlug(m[1]);
      if (a)
        add({
          key: `g:${a.slug}`,
          kind: "guide",
          title: a.title,
          href: item.href,
          doneKey: a.slug,
          note: `${a.dek} (matched their own words)`,
        });
    }
  }

  // Transfer students get the transfer money guide explicitly.
  if (intake.stage === "transferring" || intake.stage === "community-college") {
    const a = getArticleBySlug("community-college-transfer-money");
    if (a)
      add({
        key: `g:${a.slug}`,
        kind: "guide",
        title: a.title,
        href: `/learn/${a.topicId}/${a.slug}`,
        doneKey: a.slug,
        note: a.dek,
      });
  }

  // Deadlines that apply to them.
  const isStudent = STUDENT_STAGES.has(intake.stage);
  for (const d of deadlines) {
    if (d.appliesTo.includes("anyone") || (isStudent && d.appliesTo.includes("student")))
      add({
        key: `d:${d.id}`,
        kind: "deadline",
        title: d.title,
        href: d.href,
        due: d.when,
        note: `${d.when} — ${d.why}`,
      });
  }

  return out;
}

/** Deterministic fallback: the journey, flattened, plus deadlines. Since
 *  session 6 it also carries the journey's stage titles/whys into
 *  plan.stages so the roadmap-trail view works with no AI at all. */
function fallbackPlan(intake: IntakeAnswers, catalog: CatalogEntry[]): MyPlan {
  const journey = getJourney(intake.goal);
  const items: PlanItem[] = [];
  const stages: PlanStage[] = [];
  let n = 0;
  const push = (e: CatalogEntry, why: string): string => {
    const id = `p${++n}`;
    items.push({
      id,
      kind: e.kind,
      title: e.kind === "guide" ? `Read: ${e.title}` : e.title,
      why,
      href: e.href,
      due: e.due,
      doneKey: e.doneKey,
    });
    return id;
  };

  const byKey = new Map(catalog.map((e) => [e.key, e]));
  if (journey) {
    for (const stage of journey.stages) {
      const itemIds: string[] = [];
      // Doing step first (owner rule): the stage's tool leads, reading follows.
      if (stage.tool) {
        const e = byKey.get(`t:${stage.tool.href}`);
        if (e) itemIds.push(push(e, "Run your own numbers first — the rest of this stage builds on them."));
      }
      for (const slug of stage.articleSlugs.slice(0, 2)) {
        const e = byKey.get(`g:${slug}`);
        if (e) itemIds.push(push(e, stage.why));
      }
      if (stage.courseId) {
        const e = byKey.get(`c:${stage.courseId}`);
        if (e)
          itemIds.push(
            push(e, "The focused version of this whole stage, with a badge at the end.")
          );
      }
      if (itemIds.length > 0)
        stages.push({ title: stage.milestone, why: stage.why, itemIds });
    }
  }
  const deadlineIds: string[] = [];
  for (const e of catalog.filter((c) => c.kind === "deadline").slice(0, 3)) {
    deadlineIds.push(
      push(e, e.note.split("—")[1]?.trim() ?? "A date that moves real money.")
    );
  }
  if (deadlineIds.length > 0)
    stages.push({
      title: "Mark the dates",
      why: "Real dates that move real money — get them on your calendar early.",
      itemIds: deadlineIds,
    });

  return {
    createdAt: new Date().toISOString(),
    intake,
    headline: journey ? `Your "${journey.title.toLowerCase()}" plan` : "Your money plan",
    items,
    ...(stages.length > 0 ? { stages } : {}),
    aiComposed: false,
  };
}

function clip(s: unknown, max: number): string {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

/* ------------------------- conversational intake ------------------------ */

const GOAL_IDS = ["credit", "debt", "budget", "emergency", "invest", "college", "transfer", "home", "retirement", "safety"];
const STAGE_IDS = ["high-school", "community-college", "four-year", "transferring", "working", "between"];
const INCOME_IDS = ["steady", "irregular", "none", "supported"];
const FAMILY_IDS = ["on-my-own", "family-helps", "i-help-family"];

const INTERVIEW_SYSTEM = `You are the plan-builder guide on Empower, a free financial-education site for first-generation, low-income, and immigrant students. Some readers are teenagers. Warm older-sibling voice, plain words, never salesy.

You are interviewing ONE person to build their money plan. You need to learn, in this order, only what you don't know yet:
1. Their one money goal (must map to one of: credit=build credit, debt=pay off debt, budget=get better at budgeting, emergency=build an emergency fund, invest=start investing, college=pay for college, transfer=transfer from community college without losing money, home=buy a home someday, retirement=plan for retirement, safety=protect money from scams) — plus their specific version of it, in their words.
2. Where they are in life: high school / community college / four-year college / transferring / working / between things.
3. What money looks like month to month (steady paycheck / irregular / none yet / supported by family) and whether anyone depends on them or helps them.
4. Any date or dollar target attached (optional — don't push).

RULES:
- BUILD FIRST, ASK LITTLE (owner rule, tuned after live testing): the interview must never feel like a form — but never build without one check-in either. When their first message names a clear goal ("I want to build a budget"), acknowledge it warmly in a clause, then ask exactly ONE catch-all question before summarizing: whether there's anything else they want the plan to cover — another goal, a date, a dollar amount, a situation worth knowing. Whatever they answer (including "no"), the NEXT turn is the summary JSON. Fill anything still unknown with safe defaults (stage "between", income "irregular", family "on-my-own", empty target) and let the summary state each assumption plainly ("I'll assume money comes in unevenly — correct me if not") so the confirm step catches it. Background detail belongs in the plan and its revision loop, not in questioning.
- HARD CAP: at most TWO questions in an entire interview — the catch-all plus at most one more, only if the goal itself is genuinely unclear. Never more.
- Ask exactly ONE short question per turn when you do ask. React briefly (one clause) to what they said, then ask. Never a list of questions.
- NEVER give financial advice, numbers, or recommendations during the interview. You are only listening.
- If they mention scams-in-progress or crisis, gently point to /resources and keep going.
- After you know 1-3 (and have asked about 4), STOP asking and output ONLY this JSON (no other text):
{"done": true, "summary": "<2-4 sentences in second person replaying what you heard, e.g. 'You're a community college student aiming to transfer...'>", "intake": {"goal": "<id>", "detail": "<their specifics, their words>", "stage": "<id>", "income": "<id>", "family": "<id>", "target": "<their target or empty string>"}}
- If the person corrects your summary, fix it and output the JSON again with the corrections.
- Keep every reply under 60 words unless it's the JSON.`;

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

function sanitizeMessages(raw: unknown): ChatMsg[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(-24)
    .map((m) => ({
      role: m?.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: clip(m?.content, 600),
    }))
    .filter((m) => m.content.length > 0);
}

async function callClaude(
  key: string,
  system: string,
  messages: ChatMsg[],
  maxTokens: number
): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      thinking: { type: "adaptive" },
      system,
      messages,
    }),
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(String(res.status));
  const data = (await res.json()) as {
    content?: Array<{ type?: string; text?: string }>;
    stop_reason?: string;
  };
  if (data.stop_reason === "refusal") throw new Error("refusal");
  return (data.content ?? [])
    .filter((b) => b.type === "text")
    .map((b) => b.text ?? "")
    .join("");
}

interface Knowns {
  stage?: string;
  income?: string;
  family?: string;
  goals?: string[];
}

/* ------------------------------ done-awareness --------------------------- */

/** What this person has already done on the site (client-derived: read map
 *  slugs, visited tool hrefs, course badge ids). Used to keep the plan from
 *  assigning steps they've already finished. */
interface DoneSignals {
  reads: string[];
  tools: string[];
  courses: string[];
}

function sanitizeDone(raw: unknown): DoneSignals {
  const r = (raw ?? {}) as Record<string, unknown>;
  const list = (v: unknown) =>
    Array.isArray(v)
      ? v
          .filter((x): x is string => typeof x === "string" && x.length > 0)
          .map((s) => s.slice(0, 120))
          .slice(0, 100)
      : [];
  return { reads: list(r.reads), tools: list(r.tools), courses: list(r.courses) };
}

/** Mark catalog entries the person has already completed so the model can
 *  skip them as steps (it may still cite them in a "why"). */
function markAlreadyDone(catalog: CatalogEntry[], done: DoneSignals) {
  const reads = new Set(done.reads);
  const tools = new Set(done.tools);
  const courses = new Set(done.courses);
  for (const e of catalog) {
    if (!e.doneKey) continue;
    const hit =
      (e.kind === "guide" && reads.has(e.doneKey)) ||
      (e.kind === "tool" && tools.has(e.doneKey)) ||
      (e.kind === "course" && courses.has(e.doneKey));
    if (hit) e.note = `ALREADY DONE by this person — ${e.note}`;
  }
}

/** One interview-prompt line about reading momentum (topic names only). */
function doneBlock(done: DoneSignals): string {
  const topics = new Set<string>();
  let count = 0;
  for (const slug of done.reads) {
    const a = getArticleBySlug(slug);
    if (a) {
      count++;
      topics.add(a.topicId);
    }
  }
  if (count === 0) return "";
  const topicList = [...topics].slice(0, 6).join(", ");
  return `

They've already read ${count} guide${count === 1 ? "" : "s"} on this site${topicList ? ` (topics: ${topicList})` : ""}. Keep the no-recommending-reading rule during the interview, but your played-back summary may briefly acknowledge that momentum if it fits naturally.`;
}

/** Standing answers from the profile/About-you tab: the interview skips
 *  what these already cover and folds them into the confirm-back summary
 *  (the person still gets to say "not quite"). */
function sanitizeKnowns(raw: unknown): Knowns {
  const r = (raw ?? {}) as Record<string, unknown>;
  const out: Knowns = {};
  if (STAGE_IDS.includes(String(r.stage))) out.stage = String(r.stage);
  if (INCOME_IDS.includes(String(r.income))) out.income = String(r.income);
  if (FAMILY_IDS.includes(String(r.family))) out.family = String(r.family);
  if (Array.isArray(r.goals)) {
    const g = r.goals.map(String).filter((id) => GOAL_IDS.includes(id));
    if (g.length > 0) out.goals = g.slice(0, 3);
  }
  return out;
}

function knownsBlock(k: Knowns): string {
  const lines: string[] = [];
  if (k.stage) lines.push(`- Where they are: ${k.stage}`);
  if (k.income) lines.push(`- Money month to month: ${k.income}`);
  if (k.family) lines.push(`- Family situation: ${k.family}`);
  if (k.goals) lines.push(`- Goals already on their profile: ${k.goals.join(", ")} (confirm which one is TODAY'S focus rather than asking from scratch)`);
  if (lines.length === 0) return "";
  return `

ALREADY KNOWN from their profile (do NOT ask about these again — fold them into your played-back summary so they can correct them; if the conversation contradicts one, trust the conversation):
${lines.join("\n")}`;
}

/** Interview turn: next guided question, or the confirm-back summary. */
async function handleInterview(
  key: string,
  messages: ChatMsg[],
  knowns: Knowns,
  done: DoneSignals
) {
  const text = await callClaude(
    key,
    INTERVIEW_SYSTEM + knownsBlock(knowns) + doneBlock(done),
    messages,
    1000
  );
  const jsonStart = text.indexOf("{");
  if (jsonStart !== -1) {
    try {
      const parsed = JSON.parse(text.slice(jsonStart, text.lastIndexOf("}") + 1)) as {
        done?: boolean;
        summary?: unknown;
        intake?: Record<string, unknown>;
      };
      if (parsed.done && parsed.intake && typeof parsed.summary === "string") {
        const i = parsed.intake;
        const goal = GOAL_IDS.includes(String(i.goal)) ? String(i.goal) : "";
        if (goal) {
          const intake: IntakeAnswers = {
            goal,
            detail: clip(i.detail, 200),
            stage: (STAGE_IDS.includes(String(i.stage))
              ? String(i.stage)
              : "between") as IntakeAnswers["stage"],
            income: (INCOME_IDS.includes(String(i.income))
              ? String(i.income)
              : "irregular") as IntakeAnswers["income"],
            family: (FAMILY_IDS.includes(String(i.family))
              ? String(i.family)
              : "on-my-own") as IntakeAnswers["family"],
            target: clip(i.target, 100),
          };
          return Response.json({
            done: true,
            summary: clip(parsed.summary, 600),
            intake,
          });
        }
      }
    } catch {
      // fall through to plain reply
    }
  }
  return Response.json({ reply: clip(text, 800) || "Tell me a little more?" });
}

export async function POST(req: NextRequest) {
  let body: {
    phase?: unknown;
    messages?: unknown;
    intake?: Record<string, unknown>;
    feedback?: unknown;
    confirmedSummary?: unknown;
    currentPlan?: { headline?: unknown; items?: Array<{ href?: unknown; title?: unknown; flagged?: unknown }> };
  };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Conversational intake (owner ask, July 2026): guided questions, then a
  // played-back summary the person confirms before anything is built.
  if (body.phase === "interview") {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) return Response.json({ unavailable: true });
    try {
      return await handleInterview(
        key,
        sanitizeMessages(body.messages),
        sanitizeKnowns((body as { knowns?: unknown }).knowns),
        sanitizeDone((body as { done?: unknown }).done)
      );
    } catch {
      return Response.json({ unavailable: true });
    }
  }

  let intake: IntakeAnswers;
  try {
    const i = body?.intake ?? {};
    intake = {
      goal: clip(i.goal, 20),
      detail: clip(i.detail, 200),
      stage: clip(i.stage, 20) as IntakeAnswers["stage"],
      income: clip(i.income, 20) as IntakeAnswers["income"],
      family: clip(i.family, 20) as IntakeAnswers["family"],
      target: clip(i.target, 100),
    };
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!getJourney(intake.goal)) {
    return Response.json({ error: "Unknown goal" }, { status: 400 });
  }

  const catalog = buildCatalog(intake);
  markAlreadyDone(catalog, sanitizeDone((body as { done?: unknown }).done));
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    // Revising without AI would clobber their plan with a generic fallback —
    // refuse instead; the client keeps the plan and says try again later.
    if (body.phase === "revise") return Response.json({ unavailable: true });
    return Response.json({ plan: fallbackPlan(intake, catalog) });
  }

  const catalogText = catalog
    .map((e) => `${e.key} [${e.kind}] "${e.title}" — ${e.note}`)
    .join("\n");

  const system = `You compose personalized money plans for Empower, a free financial-education site for first-generation, low-income, and immigrant students. Some readers are teenagers.

You will receive a person's intake answers and a CATALOG of real site content. Build their plan as JSON only — no prose before or after.

HARD RULES:
- START WITH A DOING STEP, not homework (owner rule): whenever the catalog has a tool matching the goal, step 1 is that tool with an imperative, concrete title — for budgeting goals, open with the Budget Planner as "Track what's coming in and what's going out" (it saves their numbers automatically and the rest of the plan can reference them). Reading steps come after the first win.
- Output ONLY a JSON object: {"headline": string, "stages": [{"title": string, "why": string, "items": [{"ref": string, "title": string, "why": string}]}]}
- 3-4 stages, ordered as the person should walk them. A stage is a small milestone phrased as an outcome ("Know what the score measures", "File the forms"), finishable in one sitting or one errand. Its "why" is ONE plain sentence on why this stage comes now for THIS person.
- Every item's "ref" MUST be a key copied exactly from the catalog. Never invent refs.
- Up to 12 items total across all stages, ordered as the person should do them. 8-12 ONLY if each is genuinely distinct and worth their time — a shorter plan of strong steps beats padding. Never include an item just to hit a count.
- Catalog entries marked "ALREADY DONE by this person": NEVER assign them as steps. You MAY reference one inside another item's "why" ("since you've already read X, ...") to build on their momentum.
- Deadlines (d: refs): their notes carry the actual dates — place each one by real calendar proximity from today's date given in the intake, not by theme. A deadline months away doesn't belong before this week's moves.
- "title": short and imperative ("File the FAFSA", "Read: What Is a Credit Score?"). "why": ONE sentence in plain words that quotes or closely paraphrases the person's OWN words wherever they gave any (their goal detail, their target, their confirmed story) — "you said you want to transfer with under $20k of debt" beats generic reasons.
- "headline": short and personal, e.g. "Your transfer-semester money plan".
- NEVER individualized financial advice (no "borrow at most $X", no "you should invest in Y"). Teach-the-rule phrasing only; the calculators show them their own numbers.
- No dollar figures or dates that aren't in the catalog notes or the person's own words.`;

  const isRevise = body.phase === "revise";
  const confirmedSummary = clip(body.confirmedSummary, 600);

  // Revise (owner ask, July 2026): the person flagged parts of the plan
  // that don't fit and said why — rework it, same catalog-only rules.
  const byHref = new Map(catalog.map((e) => [e.href, e]));
  const currentPlanText = isRevise
    ? (body.currentPlan?.items ?? [])
        .map((it) => {
          const e = typeof it.href === "string" ? byHref.get(it.href) : undefined;
          if (!e) return null;
          return `${e.key} "${clip(it.title, 90)}"${it.flagged ? "  <-- FLAGGED: doesn't fit" : ""}`;
        })
        .filter(Boolean)
        .join("\n")
    : "";
  const feedback = clip(body.feedback, 400);
  if (isRevise && !feedback && !currentPlanText.includes("FLAGGED")) {
    return Response.json({ unavailable: true });
  }

  const userMsg = `INTAKE:
- Today's date: ${new Date().toISOString().slice(0, 10)} (for ordering deadlines only — never put it in the plan)
- Goal: ${intake.goal}${intake.detail ? ` — in their words: "${intake.detail}"` : ""}
- Where they are: ${intake.stage}
- Money month to month: ${intake.income}
- Family: ${intake.family}
${intake.target ? `- Their target: "${intake.target}"` : ""}
${confirmedSummary ? `- Their confirmed story, in the guide's words they agreed to: "${confirmedSummary}"` : ""}
${
  isRevise
    ? `
THEIR CURRENT PLAN (refs, flagged lines are the ones they said don't fit):
${currentPlanText}

THEIR FEEDBACK: "${feedback || "the flagged items don't fit me"}"

Rework the plan: keep what worked, replace or reorder what they flagged, and honor the feedback. Same output format, same catalog-only rule.`
    : ""
}
CATALOG (compose only from these):
${catalogText}`;

  try {
    const text = await callClaude(
      key,
      system,
      [{ role: "user", content: userMsg }],
      3000
    );
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    type RawItem = { ref?: unknown; title?: unknown; why?: unknown };
    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as {
      headline?: unknown;
      items?: RawItem[];
      stages?: Array<{ title?: unknown; why?: unknown; items?: RawItem[] }>;
    };

    // Validate: refs must resolve to catalog entries; drop everything else.
    // Stages that end up with zero surviving items are dropped; if the model
    // skipped stages entirely (or they're malformed), the plan flattens to
    // the pre-session-6 single-list shape.
    const byKey = new Map(catalog.map((e) => [e.key, e]));
    const items: PlanItem[] = [];
    let n = 0;
    const validateItem = (raw: RawItem): PlanItem | null => {
      const e = typeof raw?.ref === "string" ? byKey.get(raw.ref) : undefined;
      if (!e) return null;
      if (items.some((i) => i.href === e.href)) return null;
      const item: PlanItem = {
        id: `p${++n}`,
        kind: e.kind,
        title: clip(raw.title, 90) || e.title,
        why: clip(raw.why, 200) || e.note.slice(0, 200),
        href: e.href,
        due: e.due,
        doneKey: e.doneKey,
      };
      items.push(item);
      return item;
    };

    const stages: PlanStage[] = [];
    if (Array.isArray(parsed.stages)) {
      for (const rawStage of parsed.stages.slice(0, 6)) {
        if (items.length >= 12) break;
        const itemIds: string[] = [];
        for (const raw of Array.isArray(rawStage?.items) ? rawStage.items : []) {
          if (items.length >= 12) break;
          const item = validateItem(raw);
          if (item) itemIds.push(item.id);
        }
        if (itemIds.length > 0)
          stages.push({
            title: clip(rawStage.title, 80) || `Stage ${stages.length + 1}`,
            why: clip(rawStage.why, 200),
            itemIds,
          });
      }
    }
    if (items.length === 0) {
      // Old-shape (or malformed-stage) output: flat item list, no stages.
      for (const raw of parsed.items ?? []) {
        if (items.length >= 12) break;
        validateItem(raw);
      }
    }
    if (items.length < 3) throw new Error("too few validated items");

    const plan: MyPlan = {
      createdAt: new Date().toISOString(),
      intake,
      headline: clip(parsed.headline, 70) || "Your money plan",
      items,
      ...(stages.length > 0 ? { stages } : {}),
      aiComposed: true,
    };
    return Response.json({ plan });
  } catch {
    // Any AI trouble at all -> the deterministic plan. Never an error page.
    // EXCEPT on revise: never clobber their existing plan with a fresh
    // fallback — tell the client revision isn't available right now.
    if (isRevise) return Response.json({ unavailable: true });
    return Response.json({ plan: fallbackPlan(intake, catalog) });
  }
}
