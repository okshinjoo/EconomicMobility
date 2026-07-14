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
import { articleTools } from "@/lib/articleTools";
import { learnContent } from "@/lib/learnContent";
import { rankItems } from "@/lib/guide";
import { ADVANCED_SIGNAL_MIN } from "@/lib/readingLevel";
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

  // Every catalog guide's own "try it" calculator joins the catalog too
  // (July 14 owner rule: "don't be afraid to recommend more tools — filling
  // out tools is one of the best ways to gain understanding"). Guides are
  // already goal-relevant, so their paired tools are by construction; the
  // journeys' one-tool-per-stage cap no longer limits the model's options.
  for (const e of [...out]) {
    if (e.kind !== "guide") continue;
    const m = e.href.match(/^\/learn\/([a-z-]+)\/([a-z0-9-]+)$/);
    if (!m) continue;
    const tool =
      articleTools[m[2]] ??
      learnContent[m[1] as keyof typeof learnContent]?.tool;
    if (tool)
      add({
        key: `t:${tool.href}`,
        kind: "tool",
        title: tool.label,
        href: tool.href,
        doneKey: tool.href,
        note: `Calculator on our site; pairs with "${e.title}".`,
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
        if (e) itemIds.push(push(e, "Run your own numbers first; the rest of this stage builds on them."));
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
      why: "Real dates that move real money. Get them on your calendar early.",
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
// lib/aboutYou confidence enum -> the human phrasing the prompt uses.
const CONFIDENCE_LABELS: Record<string, string> = {
  new: "new to all of this",
  some: "knows some things",
  confident: "pretty confident",
};
// lib/goalCheckins status enum -> phrasing + how the plan should react. A
// person's self-reported progress on the goal shifts where the plan starts.
const CHECKIN_LABELS: Record<string, string> = {
  "not-started": "hasn't started yet",
  started: "has started",
  halfway: "is partway there",
  done: "considers it basically done",
};

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
  /** About-you self-described comfort level (collected on the account tab). */
  confidence?: string;
  /** Self-reported progress per goal (lib/goalCheckins): goal id -> status. */
  checkins?: Record<string, string>;
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

/** One SOFT build-prompt line when their reads show an intermediate/advanced
 *  lean in a topic (>= ADVANCED_SIGNAL_MIN non-Beginner reads — same signal
 *  as lib/readingLevel client-side). A lean, never a filter: the model may
 *  still assign a primer when a foundational gap genuinely matters. */
function readingLevelLine(done: DoneSignals): string {
  const deepReads = new Map<string, number>();
  for (const slug of done.reads) {
    const a = getArticleBySlug(slug);
    if (a && a.level !== "Beginner")
      deepReads.set(a.topicId, (deepReads.get(a.topicId) ?? 0) + 1);
  }
  const advancedTopics = [...deepReads.entries()]
    .filter(([, n]) => n >= ADVANCED_SIGNAL_MIN)
    .map(([t]) => t);
  if (advancedTopics.length === 0) return "";
  return `\n- Reading level: they already read at an intermediate/advanced level in ${advancedTopics.join(
    ", "
  )} — lean away from basic primers in ${
    advancedTopics.length === 1 ? "that topic" : "those topics"
  } unless a foundational gap genuinely matters.`;
}

/** One SOFT build-prompt line reflecting how far the person says they've
 *  gotten on TODAY'S goal (their goal check-ins). "Getting there" or
 *  "started" shifts the plan toward the next moves instead of square one;
 *  a lean, never a filter — the model still covers a real gap. */
function checkinLine(goal: string, checkins?: Record<string, string>): string {
  const status = checkins?.[goal];
  if (!status || status === "not-started") return "";
  if (status === "done") {
    return `\n- Their own progress: they marked this goal basically DONE — treat the plan as a keep-it-going / next-level pass (verify, maintain, or advance), not a from-scratch walkthrough; open past the basics.`;
  }
  const where = status === "halfway" ? "partway through this goal" : "already started on this goal";
  return `\n- Their own progress: they say they're ${where} — lead with the next moves rather than square-one basics, unless a foundational gap genuinely matters. A brief "since you've already made a start" framing fits.`;
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
  if (CONFIDENCE_LABELS[String(r.confidence)]) out.confidence = String(r.confidence);
  if (r.checkins && typeof r.checkins === "object") {
    const raw = r.checkins as Record<string, unknown>;
    const clean: Record<string, string> = {};
    for (const [goal, status] of Object.entries(raw)) {
      if (GOAL_IDS.includes(goal) && CHECKIN_LABELS[String(status)])
        clean[goal] = String(status);
    }
    if (Object.keys(clean).length > 0) out.checkins = clean;
  }
  return out;
}

function knownsBlock(k: Knowns): string {
  const lines: string[] = [];
  if (k.stage) lines.push(`- Where they are: ${k.stage}`);
  if (k.income) lines.push(`- Money month to month: ${k.income}`);
  if (k.family) lines.push(`- Family situation: ${k.family}`);
  if (k.goals) lines.push(`- Goals already on their profile: ${k.goals.join(", ")} (confirm which one is TODAY'S focus rather than asking from scratch)`);
  if (k.confidence)
    lines.push(
      `- Comfort with money, self-described: ${CONFIDENCE_LABELS[k.confidence]} (a tone signal — don't over-explain basics to someone confident, don't assume knowledge from someone new)`
    );
  if (k.checkins) {
    const progress = Object.entries(k.checkins)
      .map(([goal, status]) => `${goal} — ${CHECKIN_LABELS[status]}`)
      .join("; ");
    lines.push(
      `- Self-reported progress on their goals: ${progress} (if today's goal is one they say they've started or are partway through, your summary can acknowledge it — "sounds like you've already made a start on this")`
    );
  }
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
  const done = sanitizeDone((body as { done?: unknown }).done);
  const knowns = sanitizeKnowns((body as { knowns?: unknown }).knowns);
  markAlreadyDone(catalog, done);
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
- TOOLS ARE FIRST-CLASS, not garnish (owner rule): filling out a calculator with your own numbers teaches faster than reading about the concept. When the catalog offers relevant tools, weave 2-4 of them through the plan — each placed where its numbers unblock the next step (payoff calculator right after the what-is-interest read, not bunched at the start). A stage with a read and its paired tool beats two reads.
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
- Family: ${intake.family}${readingLevelLine(done)}${checkinLine(intake.goal, knowns.checkins)}
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
