"use client";

// Member-data pieces for the signed-in /account page. The owner picked the
// "full clone" of their Kinetik reference (July 2026): flat white cards on
// a framed app surface, sans-serif dashboard type, tabs inside the panel,
// and a recent-reading table with status chips. This file provides the data
// hook + the flat stat cards + the Overview tab content; AccountPanel
// composes the frame. All numbers come from the same localStorage the whole
// site writes (and the account syncs) — no extra network calls.

import { useEffect, useState } from "react";
import Link from "next/link";
import { getReadMap, lastReadSlug } from "@/lib/readTracking";
import { STORAGE_KEYS, loadJSON } from "@/lib/storage";
import { stageLabel, readLocalProfile, GOAL_OPTIONS } from "@/lib/profile";
import { readStudentStage } from "@/lib/studentStage";
import { STAGE_PLANS, rotatedRecs, doneRecHrefs } from "@/lib/studentRecs";
import { pickNextUnread } from "@/lib/readingLevel";
import {
  ACCENT_OPTIONS,
  DASHBOARD_CARDS,
  MAX_PINNED_TOOLS,
  type DashboardPrefs,
} from "@/lib/dashboardPrefs";
import { loadTracker, summarize, summarizeApps } from "@/lib/studentTracker";
import { readAboutYou } from "@/lib/aboutYou";
import { readBudgetSummary, readDebtSummary } from "@/lib/calcImports";
import {
  readGoalCheckins,
  setGoalCheckin,
  CHECKIN_OPTIONS,
  type GoalCheckinMap,
} from "@/lib/goalCheckins";
import { loadPlan, type MyPlan } from "@/lib/plan";
import { moments } from "@/lib/moments";
import { toolCategories } from "@/lib/toolsRegistry";
import ToolMark from "@/components/ToolMark";
import { getBadges, BadgeMedal } from "@/components/CourseQuiz";
import { getChallengeBadges } from "@/components/ChallengeChecklist";
import { Donut } from "@/components/Charts";
import type { TopicPath, BadgeSource } from "@/components/WelcomeBack";

// The dashboard zone's flat palette (deliberately calmer than bold-mix).
export const DASH = {
  divider: "#e4d8c1",
  muted: "#5f6f66",
  surface: "#efe6d4",
  sand: "#e8dfcf",
};

interface EarnedBadge extends BadgeSource {
  earnedAt: number;
}

interface NextStep {
  title: string;
  href: string;
  topicShort: string;
  color: string;
}

interface TopicProgressRow {
  id: string;
  short: string;
  href: string;
  color: string;
  read: number;
  total: number;
}

interface RecentRead {
  title: string;
  href: string;
  dateLabel: string;
  topicShort: string;
}

export interface MemberData {
  mounted: boolean;
  stats: { guides: number; quizzes: number; tools: number };
  earned: EarnedBadge[];
  progress: TopicProgressRow[];
  next: NextStep | null;
  quizTopics: string[];
  hasHistory: boolean;
  recent: RecentRead[];
  /** Distinct days with at least one read in the last 7. */
  streakDays: number;
}

/** Reads all member progress out of localStorage after mount; re-reads
 *  whenever `refresh` changes (used to re-run after the login sync merge). */
export function useMemberData(
  paths: TopicPath[],
  badgeSources: BadgeSource[],
  refresh?: unknown
): MemberData {
  const [data, setData] = useState<MemberData>({
    mounted: false,
    stats: { guides: 0, quizzes: 0, tools: 0 },
    earned: [],
    progress: [],
    next: null,
    quizTopics: [],
    hasHistory: false,
    recent: [],
    streakDays: 0,
  });

  useEffect(() => {
    const read = getReadMap();
    const readSlugs = Object.keys(read);

    const quizzes = Object.keys(
      loadJSON<Record<string, unknown>>("empower:article-quizzes:v1") ?? {}
    ).length;
    const tools = Object.keys(
      loadJSON<Record<string, number>>(STORAGE_KEYS.visitedTools) ?? {}
    ).length;
    const stats = {
      guides: readSlugs.filter((s) => !s.startsWith("blog/")).length,
      quizzes,
      tools,
    };

    const courseBadges = getBadges();
    const challengeBadges = getChallengeBadges();
    const earned = badgeSources
      .map((src) => {
        const b =
          src.kind === "course"
            ? courseBadges[src.id]
            : challengeBadges[src.id];
        return b ? { ...src, earnedAt: b.earnedAt } : null;
      })
      .filter((b): b is EarnedBadge => Boolean(b))
      .sort((a, b) => b.earnedAt - a.earnedAt);

    const progress = paths
      .map((t) => ({
        id: t.id,
        short: t.short,
        href: t.href,
        color: t.color,
        read: t.articles.filter((a) => read[a.slug]).length,
        total: t.articles.length,
      }))
      .filter((r) => r.read > 0)
      .sort((a, b) => b.read / b.total - a.read / a.total);

    const quiz = loadJSON<{ answers?: { q3?: string[] } }>(
      STORAGE_KEYS.quizResult
    );
    const quizTopics = (quiz?.answers?.q3 ?? []).filter(
      (id) => id !== "not-sure"
    );

    const nextIn = (topic: TopicPath): NextStep | null => {
      // Level-aware soft re-sort (lib/readingLevel): someone reading
      // Intermediate/Advanced in this topic isn't pointed at a primer
      // while deeper unread guides exist. Beginner-first otherwise.
      const unread = pickNextUnread(topic.id, topic.articles, read);
      return unread
        ? {
            title: unread.title,
            href: `${topic.href}/${unread.slug}`,
            topicShort: topic.short,
            color: topic.color,
          }
        : null;
    };
    let next: NextStep | null = null;
    const last = lastReadSlug(read);
    if (last) {
      const t = paths.find((p) => p.articles.some((a) => a.slug === last));
      if (t) next = nextIn(t);
    }
    if (!next) {
      for (const id of quizTopics) {
        const t = paths.find((p) => p.id === id);
        if (t) {
          next = nextIn(t);
          if (next) break;
        }
      }
    }
    if (!next) {
      for (const r of progress) {
        const t = paths.find((p) => p.id === r.id);
        if (t) {
          next = nextIn(t);
          if (next) break;
        }
      }
    }

    // Recent reading, newest first, resolved against the topic paths.
    const bySlug = new Map<
      string,
      { title: string; href: string; short: string }
    >();
    for (const t of paths) {
      for (const a of t.articles) {
        bySlug.set(a.slug, {
          title: a.title,
          href: `${t.href}/${a.slug}`,
          short: t.short,
        });
      }
    }
    const recent: RecentRead[] = Object.entries(read)
      .filter(([slug, ts]) => bySlug.has(slug) && typeof ts === "number")
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 5)
      .map(([slug, ts]) => {
        const info = bySlug.get(slug)!;
        return {
          title: info.title,
          href: info.href,
          topicShort: info.short,
          dateLabel: new Date(ts as number).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          }),
        };
      });

    // Streak: distinct calendar days with a read in the last 7 days.
    const dayKeys = new Set<string>();
    const weekAgo = Date.now() - 7 * 86_400_000;
    for (const ts of Object.values(read)) {
      if (typeof ts === "number" && ts >= weekAgo) {
        dayKeys.add(new Date(ts).toDateString());
      }
    }

    setData({
      mounted: true,
      stats,
      earned,
      progress,
      next,
      quizTopics,
      hasHistory: stats.guides > 0 || earned.length > 0 || stats.tools > 0,
      recent,
      streakDays: dayKeys.size,
    });
  }, [paths, badgeSources, refresh]);

  return data;
}

/* --------------------- personalization + insight cards ------------------ */

// Every live calculator, flattened for the pin picker.
const TOOL_INDEX = toolCategories.flatMap((cat) =>
  cat.items
    .filter((t) => t.status === "live")
    .map((t) => ({
      slug: t.slug,
      title: t.title,
      href: t.main ? cat.base : `${cat.base}/${t.slug}`,
    }))
);

const HEAT_DAYS = 84; // 12 weeks
const HEAT_COLORS = ["#f2ecdf", "#d8e4dc", "#8fb4a3", "#33705c", "#0c4a39"];

/** GitHub-style reading heatmap: one cell per day, last 12 weeks, counted
 *  from the read map's timestamps. Derived only — nothing new is stored. */
function ActivityHeatmap() {
  const [days, setDays] = useState<{ key: string; count: number }[]>([]);
  useEffect(() => {
    const counts = new Map<string, number>();
    for (const ts of Object.values(getReadMap())) {
      if (typeof ts !== "number") continue;
      const key = new Date(ts).toDateString();
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    const out: { key: string; count: number }[] = [];
    const today = new Date();
    for (let i = HEAT_DAYS - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toDateString();
      out.push({ key, count: counts.get(key) ?? 0 });
    }
    setDays(out);
  }, []);
  if (days.length === 0) return null;
  const total = days.reduce((s, d) => s + d.count, 0);
  const level = (n: number) => (n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n <= 4 ? 3 : 4);
  // Columns of 7 (weeks), oldest left.
  const weeks: { key: string; count: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-base font-bold text-ink">
          Your reading, day by day
        </h3>
        <span className="whitespace-nowrap text-xs font-medium" style={{ color: DASH.muted }}>
          {total} {total === 1 ? "guide" : "guides"} in 12 weeks
        </span>
      </div>
      <div className="mt-4 flex gap-[3px] overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((d) => (
              <span
                key={d.key}
                title={`${d.key}: ${d.count} read`}
                className="cell-in h-3 w-3 rounded-[3px]"
                style={{
                  background: HEAT_COLORS[level(d.count)],
                  animationDelay: `${wi * 40}ms`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs" style={{ color: DASH.muted }}>
        Less
        {HEAT_COLORS.map((c) => (
          <span key={c} className="h-2.5 w-2.5 rounded-[3px]" style={{ background: c }} />
        ))}
        more; every cell is a real day.
      </p>
    </div>
  );
}

/** The tracker + scholarship pipeline, surfaced on the dashboard. Renders
 *  a start nudge when the tracker is empty rather than hiding. */
function PipelineCard() {
  const [snapshot, setSnapshot] = useState<ReturnType<typeof loadTracker> | null>(null);
  useEffect(() => setSnapshot(loadTracker()), []);
  if (!snapshot) return null;
  const hasAnything =
    snapshot.courses.length > 0 || snapshot.apps.length > 0 || snapshot.todos.length > 0;
  const apps = summarizeApps(snapshot.apps);
  const s = summarize(snapshot);
  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-base font-bold text-ink">
          Tracker &amp; scholarship pipeline
        </h3>
        <Link href="/students/tracker" className="text-xs font-semibold text-forest hover:underline">
          Open the tracker →
        </Link>
      </div>
      {hasAnything ? (
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-4">
          {(
            [
              [`${s.unitsDone}`, "units done"],
              [`${snapshot.apps.filter((a) => a.status !== "planning").length}`, "applications sent"],
              [apps.dollarsInPlay > 0 ? `$${apps.dollarsInPlay.toLocaleString()}` : "$0", "in play"],
              [apps.dollarsWon > 0 ? `$${apps.dollarsWon.toLocaleString()}` : "$0", "won"],
            ] as const
          ).map(([n, label]) => (
            <div key={label}>
              <p className="font-display text-2xl font-bold text-forest">{n}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: DASH.muted }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-sm leading-6 text-stone">
          Nothing tracked yet. Log your classes and scholarship applications
          once, and this card keeps the running score: units, GPA, dollars
          in play, dollars won.
        </p>
      )}
    </div>
  );
}

/** Quick-launch tools the member picked. Edit mode lists every live
 *  calculator as a toggle chip, capped at MAX_PINNED_TOOLS. */
function PinnedToolsCard({
  prefs,
  onChange,
}: {
  prefs: DashboardPrefs;
  onChange: (next: DashboardPrefs) => void;
}) {
  const [editing, setEditing] = useState(false);
  const pinned = TOOL_INDEX.filter((t) => prefs.pinnedTools.includes(t.slug));
  const toggle = (slug: string) => {
    const has = prefs.pinnedTools.includes(slug);
    if (!has && prefs.pinnedTools.length >= MAX_PINNED_TOOLS) return;
    onChange({
      ...prefs,
      pinnedTools: has
        ? prefs.pinnedTools.filter((s) => s !== slug)
        : [...prefs.pinnedTools, slug],
    });
  };
  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-base font-bold text-ink">Your tools</h3>
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className="text-xs font-semibold text-forest hover:underline"
        >
          {editing ? "Done" : "Choose tools"}
        </button>
      </div>
      {editing ? (
        <>
          <p className="mt-2 text-xs" style={{ color: DASH.muted }}>
            Save up to {MAX_PINNED_TOOLS}. They open with your saved numbers.
            You can also save any calculator from its own page.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {TOOL_INDEX.map((t) => {
              const on = prefs.pinnedTools.includes(t.slug);
              return (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => toggle(t.slug)}
                  aria-pressed={on}
                  className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors ${
                    on
                      ? "border-forest bg-forest text-cream"
                      : "border-sand bg-paper text-stone hover:text-ink"
                  }`}
                >
                  {t.title}
                </button>
              );
            })}
          </div>
        </>
      ) : pinned.length > 0 ? (
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {pinned.map((t) => (
            <Link
              key={t.slug}
              href={t.href}
              className="flex items-center gap-2.5 rounded-lg border border-sand bg-paper px-3 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-forest/40 hover:text-forest"
            >
              <ToolMark slug={t.slug} color="#0c4a39" className="h-6 w-6 shrink-0" />
              <span className="min-w-0 truncate">{t.title}</span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-sm text-stone">
          No tools saved yet. Hit the &ldquo;Save to profile&rdquo; button on
          any calculator, or &ldquo;Choose tools&rdquo; here — they show up as
          a quick-launch grid with your saved numbers.
        </p>
      )}
    </div>
  );
}

/** The member's plan, surfaced on the profile (owner ask July 14:
 *  "so now you can see it on your profile?"). Progress derived with the
 *  same done signals the plan page uses; no plan -> a build-one nudge. */
function PlanCard() {
  const [plan, setPlan] = useState<MyPlan | null>(null);
  const [done, setDone] = useState(0);
  useEffect(() => {
    const pl = loadPlan();
    setPlan(pl);
    if (!pl) return;
    const read = getReadMap();
    const tools = loadJSON<Record<string, number>>(STORAGE_KEYS.visitedTools) ?? {};
    const courses = getBadges();
    const chall = getChallengeBadges();
    setDone(
      pl.items.filter((it) => {
        if (it.checked) return true;
        if (!it.doneKey) return false;
        if (it.kind === "guide") return Boolean(read[it.doneKey]);
        if (it.kind === "tool") return Boolean(tools[it.doneKey]);
        if (it.kind === "course") return Boolean(courses[it.doneKey]);
        if (it.kind === "challenge") return Boolean(chall[it.doneKey]);
        return false;
      }).length
    );
  }, []);
  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-base font-bold text-ink">Your plan</h3>
        <Link href="/plan" className="text-xs font-semibold text-forest hover:underline">
          {plan ? "Open your plan →" : "Build one →"}
        </Link>
      </div>
      {plan ? (
        <>
          <p className="mt-2 text-sm font-semibold text-ink">{plan.headline}</p>
          <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full" style={{ background: "#f2ecdf" }}>
            <div
              className="bar-grow h-full rounded-full bg-forest"
              style={{ width: `${plan.items.length ? Math.max(4, Math.round((done / plan.items.length) * 100)) : 0}%` }}
            />
          </div>
          <p className="mt-2 text-xs font-semibold" style={{ color: DASH.muted }}>
            {done} of {plan.items.length} steps done. It checks itself off as
            you read and use the site.
          </p>
        </>
      ) : (
        <p className="mt-2 text-sm leading-6 text-stone">
          No plan yet. A short conversation with the guide builds one from
          real guides, tools, and deadlines, and it lives here once it
          exists.
        </p>
      )}
    </div>
  );
}

/** The picked life moments' bundles, straight from lib/moments — the
 *  About-you tab's "anything happening soon?" answers paying off.
 *  Done-aware (July 2026): reads already finished on this device drop out;
 *  when all of a moment's reads are done, its tool takes the slot instead —
 *  a picked moment never renders blank. */
function MomentsCard() {
  const [picked, setPicked] = useState<string[]>([]);
  const [read, setRead] = useState<Record<string, number>>({});
  useEffect(() => {
    setPicked(readAboutYou().moments);
    setRead(getReadMap());
  }, []);
  const mine = moments.filter((m) => picked.includes(m.id));
  if (mine.length === 0) return null;
  // Read-map keys are article slugs — the last path segment of a read href.
  const slugOf = (href: string) =>
    href.split(/[?#]/)[0].split("/").filter(Boolean).pop() ?? "";
  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-base font-bold text-ink">
          For what&apos;s coming up
        </h3>
        <Link href="/life" className="text-xs font-semibold text-forest hover:underline">
          All life moments →
        </Link>
      </div>
      <div className="mt-3 space-y-4">
        {mine.map((m) => {
          const unread = m.reads.filter((r) => !read[slugOf(r.href)]);
          const doing = m.tool ?? m.course ?? m.challenge;
          return (
            <div key={m.id}>
              <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: m.color }}>
                {m.title}
              </p>
              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                {unread.length > 0 ? (
                  unread.slice(0, 3).map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="text-sm font-semibold text-ink underline decoration-2 underline-offset-4 hover:text-forest"
                      style={{ textDecorationColor: `${m.color}55` }}
                    >
                      {r.label}
                    </Link>
                  ))
                ) : doing ? (
                  <>
                    <span className="text-xs font-medium" style={{ color: DASH.muted }}>
                      Reads done — next:
                    </span>
                    <Link
                      href={doing.href}
                      className="text-sm font-semibold text-ink underline decoration-2 underline-offset-4 hover:text-forest"
                      style={{ textDecorationColor: `${m.color}55` }}
                    >
                      {doing.label}
                    </Link>
                  </>
                ) : (
                  <span className="text-sm font-medium" style={{ color: DASH.muted }}>
                    All three reads done.
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** The personalization panel: avatar accent + which cards show. */
export function CustomizeCard({
  prefs,
  onChange,
}: {
  prefs: DashboardPrefs;
  onChange: (next: DashboardPrefs) => void;
}) {
  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-sm">
      <h3 className="font-display text-base font-bold text-ink">Make it yours</h3>
      <p className="mt-1 text-xs" style={{ color: DASH.muted }}>
        Your color, your cards. Saved to your account; hiding a card never
        deletes anything.
      </p>
      <p className="mt-3 text-[11px] font-bold uppercase tracking-wide" style={{ color: DASH.muted }}>
        Avatar color
      </p>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {ACCENT_OPTIONS.map((a) => {
          const active = (prefs.accent ?? "#e7a33c") === a.color;
          return (
            <button
              key={a.id}
              type="button"
              title={a.label}
              aria-label={a.label}
              aria-pressed={active}
              onClick={() =>
                onChange({ ...prefs, accent: a.id === "amber" ? null : a.color })
              }
              className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                active ? "border-ink" : "border-ink/15"
              }`}
              style={{ background: a.color }}
            />
          );
        })}
      </div>
      <p className="mt-4 text-[11px] font-bold uppercase tracking-wide" style={{ color: DASH.muted }}>
        Cards on your overview
      </p>
      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1.5">
        {DASHBOARD_CARDS.map((c) => {
          const shown = !prefs.hiddenCards.includes(c.id);
          return (
            <label
              key={c.id}
              className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-ink"
            >
              <input
                type="checkbox"
                checked={shown}
                onChange={() =>
                  onChange({
                    ...prefs,
                    hiddenCards: shown
                      ? [...prefs.hiddenCards, c.id]
                      : prefs.hiddenCards.filter((id) => id !== c.id),
                  })
                }
                className="h-3.5 w-3.5 accent-forest"
              />
              {c.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

/** The numbers your calculators saved, on your profile (July 14 owner ask:
 *  "save the budget calculator onto your profile... an import tools
 *  section"). Nothing new is stored — the calculators have always kept
 *  their snapshots in synced empower:* keys; this card surfaces them. */
function CalcNumbersCard() {
  const [budget, setBudget] = useState<ReturnType<typeof readBudgetSummary>>(null);
  const [debt, setDebt] = useState<ReturnType<typeof readDebtSummary>>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setBudget(readBudgetSummary());
    setDebt(readDebtSummary());
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const usd = (n: number) => `$${Math.round(n).toLocaleString()}`;
  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-base font-bold text-ink">
          Your numbers, from your tools
        </h3>
        <Link href="/tools" className="text-xs font-semibold text-forest hover:underline">
          All tools →
        </Link>
      </div>
      {budget || debt ? (
        <>
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-4">
            {budget && (
              <>
                <div>
                  <p className="font-display text-2xl font-bold text-forest">{usd(budget.netMonthly)}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: DASH.muted }}>
                    take-home / month
                  </p>
                </div>
                <div>
                  <p className={`font-display text-2xl font-bold ${budget.leftover >= 0 ? "text-forest" : "text-terracotta"}`}>
                    {usd(budget.leftover)}
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: DASH.muted }}>
                    left over / month
                  </p>
                </div>
              </>
            )}
            {debt && (
              <div>
                <p className="font-display text-2xl font-bold text-forest">{usd(debt.monthlyPayment)}</p>
                <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: DASH.muted }}>
                  to debts / month ({debt.count} {debt.count === 1 ? "debt" : "debts"})
                </p>
              </div>
            )}
          </div>
          <p className="mt-3 text-xs leading-5" style={{ color: DASH.muted }}>
            Straight from the{" "}
            <Link href="/tools/budget" className="font-semibold text-forest hover:underline">
              Budget Planner
            </Link>
            {debt && (
              <>
                {" "}and{" "}
                <Link href="/tools/debt" className="font-semibold text-forest hover:underline">
                  Debt Payoff
                </Link>
              </>
            )}
            . Update the numbers there and this card follows.
          </p>
        </>
      ) : (
        <p className="mt-2 text-sm leading-6 text-stone">
          Run the{" "}
          <Link href="/tools/budget" className="font-semibold text-forest hover:underline">
            Budget Planner
          </Link>{" "}
          once and your take-home and monthly leftover land here — filling
          out a tool with your real numbers is the fastest way to understand
          them.
        </p>
      )}
    </div>
  );
}

/** Self-reported progress on the goals picked in About you (July 14 owner
 *  ask: "a way to report how well you're doing on your goals"). */
function GoalCheckinsCard() {
  const [checkins, setCheckins] = useState<GoalCheckinMap>({});
  const [goals, setGoals] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setCheckins(readGoalCheckins());
    setGoals(readLocalProfile()?.goals ?? []);
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-sm">
      <h3 className="font-display text-base font-bold text-ink">
        How are your goals going?
      </h3>
      {goals.length === 0 ? (
        <p className="mt-2 text-sm leading-6 text-stone">
          Pick a goal or two on the About-you tab and check in on them here —
          an honest &ldquo;not started&rdquo; counts too.
        </p>
      ) : (
        <ul className="mt-3 space-y-3">
          {goals.map((g) => {
            const label = GOAL_OPTIONS.find((o) => o.id === g)?.label ?? g;
            const current = checkins[g]?.status;
            return (
              <li key={g}>
                <p className="text-sm font-semibold text-ink">{label}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {CHECKIN_OPTIONS.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      aria-pressed={current === o.id}
                      onClick={() => setCheckins(setGoalCheckin(g, o.id))}
                      className={`rounded-md px-2.5 py-1 text-xs font-bold transition-colors ${
                        current === o.id
                          ? o.id === "done"
                            ? "bg-forest text-cream"
                            : "bg-amber text-ink"
                          : "border border-sand bg-paper text-stone hover:text-ink"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/** The new insight/personalization row rendered between the stat cards and
 *  the tabbed panel. Card visibility follows prefs.hiddenCards. */
export function DashboardExtras({
  prefs,
  onChange,
  group,
}: {
  prefs: DashboardPrefs;
  onChange: (next: DashboardPrefs) => void;
  /** Tab split (owner call, July 14: "overview has too much"): overview =
   *  do-now cards; progress = how-far-I've-come cards. CustomizeCard
   *  lives on the About-you tab now. */
  group: "overview" | "progress";
}) {
  const hidden = new Set(prefs.hiddenCards);
  return (
    <div className="dash-stagger grid items-start gap-4 xl:grid-cols-2">
      {group === "overview" ? (
        <>
          {!hidden.has("plan") && <PlanCard />}
          {!hidden.has("tools") && (
            <PinnedToolsCard prefs={prefs} onChange={onChange} />
          )}
          {!hidden.has("moments") && <MomentsCard />}
        </>
      ) : (
        <>
          {!hidden.has("heatmap") && <ActivityHeatmap />}
          {!hidden.has("pipeline") && <PipelineCard />}
          {!hidden.has("calc-numbers") && <CalcNumbersCard />}
          {!hidden.has("goal-checkins") && <GoalCheckinsCard />}
        </>
      )}
    </div>
  );
}

/* ------------------------------ flat pieces ----------------------------- */

function FlatLegend({
  items,
}: {
  items: { color: string; label: string; value: string }[];
}) {
  return (
    <ul className="min-w-0 flex-1 space-y-1.5">
      {items.map((it) => (
        <li
          key={it.label}
          className="flex items-center justify-between gap-3 text-sm"
        >
          <span className="inline-flex min-w-0 items-center gap-2 text-stone">
            <span
              className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
              style={{ background: it.color }}
            />
            <span className="truncate">{it.label}</span>
          </span>
          <span className="whitespace-nowrap font-semibold text-ink">{it.value}</span>
        </li>
      ))}
    </ul>
  );
}

/** The two white stat cards (the reference's Car Rides Stats / Total Trip
 *  Spend positions): reading donut + activity bubbles. */
export function FlatStatCards({
  data,
  paths,
  badgeTotal,
}: {
  data: MemberData;
  paths: TopicPath[];
  badgeTotal: number;
}) {
  if (!data.mounted) return null;
  const { stats, earned, progress } = data;
  const libraryTotal = paths.reduce((s, t) => s + t.articles.length, 0);
  const unread = Math.max(0, libraryTotal - stats.guides);

  const readingSegments =
    stats.guides > 0
      ? [
          ...progress.map((t) => ({
            value: t.read,
            color: t.color,
            label: t.short,
          })),
          { value: unread, color: DASH.sand, label: "Unread" },
        ]
      : [{ value: 1, color: DASH.sand, label: "Nothing read yet" }];
  const readingLegend = [
    ...progress
      .slice(0, 3)
      .map((t) => ({ color: t.color, label: t.short, value: String(t.read) })),
    { color: DASH.sand, label: "Unread", value: String(unread) },
  ];

  return (
    <div className="dash-stagger grid gap-4 xl:grid-cols-2">
      <div className="rounded-2xl border-2 border-ink/10 bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-sm">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-base font-bold text-ink">Reading Stats</h3>
          <span
            className="whitespace-nowrap text-xs font-medium"
            style={{ color: DASH.muted }}
          >
            All time
          </span>
        </div>
        <div className="mt-3 flex items-center gap-5">
          <Donut
            segments={readingSegments}
            size={108}
            thickness={15}
            centerTop={String(stats.guides)}
            centerSub={stats.guides === 1 ? "guide read" : "guides read"}
            className="h-[108px] w-[108px] flex-shrink-0"
            light
          />
          <FlatLegend items={readingLegend} />
        </div>
      </div>

      <div className="rounded-2xl border-2 border-ink/10 bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-sm">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-base font-bold text-ink">Total Progress</h3>
          <span
            className="whitespace-nowrap text-xs font-medium"
            style={{ color: DASH.muted }}
          >
            All time
          </span>
        </div>
        <div className="mt-3 flex items-center gap-5">
          <div className="relative h-[108px] w-[108px] flex-shrink-0">
            <span className="absolute left-0 top-0 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-amber text-2xl font-bold text-ink">
              {earned.length}
            </span>
            <span className="absolute bottom-0 right-0 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-forest text-base font-bold text-cream">
              {stats.tools}
            </span>
          </div>
          <FlatLegend
            items={[
              {
                color: "#e7a33c",
                label: "Badges earned",
                value: `${earned.length} of ${badgeTotal}`,
              },
              {
                color: "#0c4a39",
                label: "Tools tried",
                value: String(stats.tools),
              },
              {
                color: "#d26a4c",
                label: "Mini-quizzes",
                value: String(stats.quizzes),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function StatusChip({
  label,
  tone,
  bg,
}: {
  label: string;
  tone: string;
  bg: string;
}) {
  return (
    <span
      className="whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-bold"
      style={{ color: tone, background: bg }}
    >
      {label}
    </span>
  );
}

/** The Overview tab: recent-reading table (with an Up-next row), then badge
 *  case and per-topic progress as hairline-divided sections. */
export function FlatOverview({
  data,
  paths,
  badgeTotal,
  hidden = [],
  include,
}: {
  data: MemberData;
  paths: TopicPath[];
  badgeTotal: number;
  /** DASHBOARD_CARDS ids switched off in the member's prefs. */
  hidden?: string[];
  /** Which sections this tab shows (owner tab split, July 14). Omit =
   *  all sections (legacy behavior). */
  include?: ("student" | "recent" | "badges" | "topics")[];
}) {
  // Done doors drop out of the stage shortcuts while undone ones remain
  // (computed post-mount, same as everything else here).
  const [doneRecs, setDoneRecs] = useState<Set<string>>(() => new Set());
  useEffect(() => setDoneRecs(doneRecHrefs()), []);

  if (!data.mounted) return null;
  const { next, recent, earned, progress } = data;
  const inc = include ? new Set(include) : null;
  const off = new Set([
    ...hidden,
    ...(inc
      ? (["student", "recent", "badges", "topics"] as const).filter(
          (id) => !inc.has(id)
        )
      : []),
  ]);

  // Student-stage shortcuts (July 2026): when this member said which
  // student they are — on the profile or the /students picker — lead the
  // overview with the four doors that matter most at that stage. Only
  // renders post-mount (data.mounted), so localStorage reads are safe.
  const stage = readStudentStage();
  const stagePlan = stage ? STAGE_PLANS[stage] : null;

  return (
    <div>
      {stagePlan && stage && !off.has("student") && (
        <div className="mb-5 border-b pb-5" style={{ borderColor: DASH.divider }}>
          <div className="flex items-center justify-between gap-3">
            <p
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: DASH.muted }}
            >
              For {stageLabel(stage).toLowerCase()} students
            </p>
            <Link
              href="/students"
              className="text-xs font-semibold text-forest hover:underline"
            >
              Everything for students →
            </Link>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {/* Same daily rotation as the /students band (mounted-only). */}
            {rotatedRecs(stage, 4, doneRecs).map((r) => (
              <Link
                key={r.href}
                href={r.href}
                title={r.desc}
                className="rounded-lg border border-sand bg-cream px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:border-forest/40 hover:text-forest"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* recent reading */}
      {!off.has("recent") && (
      <>
      <div className="flex items-center justify-between gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: DASH.muted }}
        >
          Recent reading
        </p>
        <Link
          href="/learn"
          className="text-xs font-semibold text-forest hover:underline"
        >
          View the library →
        </Link>
      </div>
      <div className="mt-1">
        {next && (
          <Link
            href={next.href}
            className="group flex items-center gap-4 border-b py-3"
            style={{ borderColor: DASH.divider }}
          >
            <span className="w-12 flex-shrink-0 text-sm font-bold text-ink">
              Next
            </span>
            <StatusChip label="Up next" tone="#c9842a" bg="#e7a33c2a" />
            <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-ink group-hover:underline">
              {next.title}
            </span>
            <span
              className="hidden text-xs font-medium sm:block"
              style={{ color: DASH.muted }}
            >
              {next.topicShort}
            </span>
          </Link>
        )}
        {recent.map((r, i) => (
          <Link
            key={r.href}
            href={r.href}
            className={`group flex items-center gap-4 py-3 ${
              i < recent.length - 1 ? "border-b" : ""
            }`}
            style={{ borderColor: DASH.divider }}
          >
            <span className="w-12 flex-shrink-0 text-sm font-bold text-ink">
              {r.dateLabel}
            </span>
            <StatusChip label="Read" tone="#0c4a39" bg="#0c4a3914" />
            <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-ink group-hover:underline">
              {r.title}
            </span>
            <span
              className="hidden text-xs font-medium sm:block"
              style={{ color: DASH.muted }}
            >
              {r.topicShort}
            </span>
          </Link>
        ))}
        {!next && recent.length === 0 && (
          <p className="py-4 text-sm text-stone">
            Nothing read yet. The{" "}
            <Link href="/quiz" className="font-semibold text-forest">
              2-minute quiz
            </Link>{" "}
            builds a path around you, or browse the{" "}
            <Link href="/learn" className="font-semibold text-forest">
              library
            </Link>
            .
          </p>
        )}
      </div>
      </>
      )}

      {/* badge case */}
      {!off.has("badges") && (
      <div
        className="mt-5 border-t pt-5"
        style={{ borderColor: DASH.divider }}
      >
        <div className="flex items-center justify-between gap-3">
          <p
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: DASH.muted }}
          >
            Badge case
          </p>
          <span
            className="text-xs font-semibold"
            style={{ color: DASH.muted }}
          >
            {earned.length} of {badgeTotal}
          </span>
        </div>
        {earned.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-4">
            {earned.map((b) => (
              <div key={`${b.kind}-${b.id}`} className="w-24 text-center">
                <BadgeMedal color={b.color} variant={b.kind === "course" ? "course" : "challenge"} className="mx-auto h-12 w-12" />
                <p className="mt-1 text-xs font-semibold leading-tight text-ink">
                  {b.title}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-stone">
            Empty so far. Finish a{" "}
            <Link href="/courses" className="font-semibold text-forest">
              course
            </Link>{" "}
            or a{" "}
            <Link href="/challenges" className="font-semibold text-forest">
              challenge
            </Link>{" "}
            and the first rosette lands here.
          </p>
        )}
      </div>
      )}

      {/* reading by topic */}
      {progress.length > 0 && !off.has("topics") && (
        <div
          className="mt-5 border-t pt-5"
          style={{ borderColor: DASH.divider }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: DASH.muted }}
          >
            Reading by topic
          </p>
          <div className="mt-3 space-y-3.5">
            {progress.map((t) => (
              <Link key={t.id} href={t.href} className="group block">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-semibold text-ink group-hover:underline">
                    {t.short}
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: DASH.muted }}
                  >
                    {t.read} of {t.total}
                  </span>
                </div>
                <div
                  className="mt-1.5 h-2 overflow-hidden rounded-full"
                  style={{ background: "#f2ecdf" }}
                >
                  <div
                    className="bar-grow h-full rounded-full"
                    style={{
                      width: `${Math.max(4, Math.round((t.read / t.total) * 100))}%`,
                      background: t.color,
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
          {progress.length < paths.length && (
            <p className="mt-3 text-xs" style={{ color: DASH.muted }}>
              {paths.length - progress.length} topics untouched.{" "}
              <Link href="/learn" className="font-semibold text-forest">
                Explore the library
              </Link>
              .
            </p>
          )}
        </div>
      )}
    </div>
  );
}
