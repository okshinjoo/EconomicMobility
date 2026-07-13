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
import type { IntakeAnswers, MyPlan, PlanItem } from "@/lib/plan";

export const runtime = "nodejs";

const MODEL = "claude-haiku-4-5";

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

/** Deterministic fallback: the journey, flattened, plus deadlines. */
function fallbackPlan(intake: IntakeAnswers, catalog: CatalogEntry[]): MyPlan {
  const journey = getJourney(intake.goal);
  const items: PlanItem[] = [];
  let n = 0;
  const push = (e: CatalogEntry, why: string) => {
    items.push({
      id: `p${++n}`,
      kind: e.kind,
      title: e.kind === "guide" ? `Read: ${e.title}` : e.title,
      why,
      href: e.href,
      due: e.due,
      doneKey: e.doneKey,
    });
  };

  const byKey = new Map(catalog.map((e) => [e.key, e]));
  if (journey) {
    for (const stage of journey.stages) {
      for (const slug of stage.articleSlugs.slice(0, 2)) {
        const e = byKey.get(`g:${slug}`);
        if (e) push(e, stage.why);
      }
      if (stage.tool) {
        const e = byKey.get(`t:${stage.tool.href}`);
        if (e) push(e, "Run your own numbers for this step.");
      }
      if (stage.courseId) {
        const e = byKey.get(`c:${stage.courseId}`);
        if (e) push(e, "The focused version of this whole stage, with a badge at the end.");
      }
    }
  }
  for (const e of catalog.filter((c) => c.kind === "deadline").slice(0, 3)) {
    push(e, e.note.split("—")[1]?.trim() ?? "A date that moves real money.");
  }

  return {
    createdAt: new Date().toISOString(),
    intake,
    headline: journey ? `Your "${journey.title.toLowerCase()}" plan` : "Your money plan",
    items,
    aiComposed: false,
  };
}

function clip(s: unknown, max: number): string {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  let intake: IntakeAnswers;
  try {
    const body = await req.json();
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
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return Response.json({ plan: fallbackPlan(intake, catalog) });
  }

  const catalogText = catalog
    .map((e) => `${e.key} [${e.kind}] "${e.title}" — ${e.note}`)
    .join("\n");

  const system = `You compose personalized money plans for Empower, a free financial-education site for first-generation, low-income, and immigrant students. Some readers are teenagers.

You will receive a person's intake answers and a CATALOG of real site content. Build their plan as JSON only — no prose before or after.

HARD RULES:
- Output ONLY a JSON object: {"headline": string, "items": [{"ref": string, "title": string, "why": string}]}
- Every item's "ref" MUST be a key copied exactly from the catalog. Never invent refs.
- 8 to 12 items, ordered as the person should do them. Deadlines (d: refs) go where they fall in the person's next few months.
- "title": short and imperative ("File the FAFSA", "Read: What Is a Credit Score?"). "why": ONE sentence tied to THEIR intake answers, plain words.
- "headline": short and personal, e.g. "Your transfer-semester money plan".
- NEVER individualized financial advice (no "borrow at most $X", no "you should invest in Y"). Teach-the-rule phrasing only; the calculators show them their own numbers.
- No dollar figures or dates that aren't in the catalog notes.`;

  const userMsg = `INTAKE:
- Goal: ${intake.goal}${intake.detail ? ` — in their words: "${intake.detail}"` : ""}
- Where they are: ${intake.stage}
- Money month to month: ${intake.income}
- Family: ${intake.family}
${intake.target ? `- Their target: "${intake.target}"` : ""}

CATALOG (compose only from these):
${catalogText}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1500,
        system,
        messages: [{ role: "user", content: userMsg }],
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as {
      content?: Array<{ type?: string; text?: string }>;
      stop_reason?: string;
    };
    if (data.stop_reason === "refusal") throw new Error("refusal");
    const text = (data.content ?? [])
      .filter((b) => b.type === "text")
      .map((b) => b.text ?? "")
      .join("");
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as {
      headline?: unknown;
      items?: Array<{ ref?: unknown; title?: unknown; why?: unknown }>;
    };

    // Validate: refs must resolve to catalog entries; drop everything else.
    const byKey = new Map(catalog.map((e) => [e.key, e]));
    const items: PlanItem[] = [];
    let n = 0;
    for (const raw of parsed.items ?? []) {
      const e = typeof raw.ref === "string" ? byKey.get(raw.ref) : undefined;
      if (!e) continue;
      if (items.some((i) => i.href === e.href)) continue;
      items.push({
        id: `p${++n}`,
        kind: e.kind,
        title: clip(raw.title, 90) || e.title,
        why: clip(raw.why, 200) || e.note.slice(0, 200),
        href: e.href,
        due: e.due,
        doneKey: e.doneKey,
      });
    }
    if (items.length < 4) throw new Error("too few validated items");

    const plan: MyPlan = {
      createdAt: new Date().toISOString(),
      intake,
      headline: clip(parsed.headline, 70) || "Your money plan",
      items: items.slice(0, 12),
      aiComposed: true,
    };
    return Response.json({ plan });
  } catch {
    // Any AI trouble at all -> the deterministic plan. Never an error page.
    return Response.json({ plan: fallbackPlan(intake, catalog) });
  }
}
