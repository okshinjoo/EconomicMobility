// The student tools hub (July 2026 full-containment pass): every
// calculator's in-frame mirror in one place, so article "/tools" links and
// the subnav have a student-side home. Grouped by the same categories as
// the main hub; canonical points at /tools.

import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ToolMark from "@/components/ToolMark";
import { toolStyles } from "@/components/ToolDoodle";
import { TOOL_FRAME_MAP } from "@/lib/frame";
import { toolCategories } from "@/lib/toolsRegistry";

export const metadata: Metadata = {
  title: "Tools | Empower Students",
  description:
    "Every free Empower calculator, inside the student hub: college costs, aid offers, loans, budgets, savings, and more.",
  alternates: { canonical: "/tools" },
};

const EXTRAS = [
  { title: "Career Explorer", href: "/students/career-explorer", note: "100 careers: real pay, growth, and training paths." },
  { title: "Compare Colleges", href: "/students/compare-colleges", note: "100 colleges: admissions and aid policies, hand-checked." },
  { title: "Student Tracker", href: "/students/tracker", note: "Units, grades, GPA, and to-dos in one place." },
  { title: "Letter Generator", href: "/students/tools/letters", note: "Credit-dispute and debt-validation letters, built in-browser." },
  { title: "Free Templates", href: "/students/tools/templates", note: "Budget, debt, and savings spreadsheets that total themselves." },
];

export default function StudentToolsHub() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Hero — B-voice: light field, sticker, and a tilted pastel cluster */}
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 pb-10 pt-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <nav className="text-sm font-medium text-stone">
              <Link
                href="/students"
                className="underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
              >
                For Students
              </Link>{" "}
              / Tools
            </nav>
            <span className="mt-5 inline-block -rotate-1 rounded-md border-2 border-ink bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
              Free · no sign-up · numbers follow you
            </span>
            <h1 className="mt-4 font-display text-[2.4rem] font-bold leading-[1.07] tracking-tight text-ink sm:text-5xl">
              Every calculator,{" "}
              <span className="italic text-forest">in-house.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-stone">
              The same free tools as the main site, right here in the student
              hub, and your numbers follow you between the two.
            </p>
          </div>
          <div className="hidden grid-cols-2 gap-3 lg:grid" aria-hidden>
            {(
              [
                ["College Cost", "#c9842a", "rotate-[1deg]"],
                ["Budget Planner", "#15624b", "-rotate-[1deg]"],
                ["Paycheck", "#2f6d80", "-rotate-[0.6deg]"],
                ["Reality Check", "#d26a4c", "rotate-[0.8deg]"],
              ] as const
            ).map(([label, tint, tilt]) => (
              <div
                key={label}
                className={`card-ink rounded-xl px-4 py-6 text-center font-display text-base font-bold text-ink ${tilt}`}
                style={{ background: `color-mix(in srgb, ${tint} 16%, #fbf8f1)` }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="space-y-10">
            {toolCategories.map((cat) => {
              const style = toolStyles[cat.id] ?? toolStyles.budgeting;
              const live = cat.items
                .filter((item) => item.status === "live")
                .map((item) => ({
                  ...item,
                  mainHref: item.main ? cat.base : `${cat.base}/${item.slug}`,
                }))
                .filter((item) => TOOL_FRAME_MAP[item.mainHref]);
              if (live.length === 0) return null;
              return (
                <div key={cat.label}>
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-xl font-bold text-ink">
                      {cat.label}
                    </h2>
                    <span
                      className="text-sm font-bold tabular-nums"
                      style={{ color: style.accent }}
                    >
                      {live.length}
                    </span>
                    <span
                      className="h-0.5 flex-1 rounded-full"
                      style={{ background: `${style.accent}55` }}
                    />
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {live.map((item) => (
                      <Link
                        key={item.mainHref}
                        href={TOOL_FRAME_MAP[item.mainHref]}
                        className="group flex h-full flex-col rounded-xl border-2 border-ink p-5 shadow-[3px_3px_0_#11211c] transition-transform duration-200 hover:-translate-y-1"
                        style={{ backgroundColor: style.bg }}
                      >
                        <ToolMark
                          slug={item.slug}
                          color={style.accent}
                          className="h-8 w-8 shrink-0"
                        />
                        <h3 className="mt-2.5 font-display text-base font-bold leading-snug text-ink group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4"
                          style={{ textDecorationColor: style.accent }}
                        >
                          {item.title}
                        </h3>
                        <p className="mt-1.5 flex-1 text-sm leading-6 text-ink/70">
                          {item.short}
                        </p>
                        <span
                          className="mt-4 text-sm font-bold underline decoration-2 underline-offset-4"
                          style={{ color: style.accent, textDecorationColor: `${style.accent}88` }}
                        >
                          Open
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-display text-xl font-bold text-ink">
                  More for students
                </h2>
                <span className="h-px flex-1 bg-sand" />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {EXTRAS.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex h-full flex-col rounded-xl border-2 border-ink p-5 shadow-[3px_3px_0_#11211c] transition-transform duration-200 hover:-translate-y-1"
                    style={{
                      background: `color-mix(in srgb, ${["#c9842a", "#2f6d80", "#15624b", "#d26a4c", "#c9842a"][i % 5]} 13%, #fbf8f1)`,
                    }}
                  >
                    <h3 className="font-display text-base font-bold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                      {item.note}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4">
                      Open
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
