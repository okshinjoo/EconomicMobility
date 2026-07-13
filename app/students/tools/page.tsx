// The student tools hub (July 2026 full-containment pass): every
// calculator's in-frame mirror in one place, so article "/tools" links and
// the subnav have a student-side home. Grouped by the same categories as
// the main hub; canonical points at /tools.

import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { TOOL_FRAME_MAP } from "@/lib/frame";
import { toolCategories } from "@/lib/toolsRegistry";

export const metadata: Metadata = {
  title: "Tools | Empower Students",
  description:
    "Every free Empower calculator, inside the student hub — college costs, aid offers, loans, budgets, savings, and more.",
  alternates: { canonical: "/tools" },
};

const EXTRAS = [
  { title: "Student Tracker", href: "/students/tracker", note: "Units, grades, GPA, and to-dos in one place." },
  { title: "Letter Generator", href: "/students/tools/letters", note: "Credit-dispute and debt-validation letters, built in-browser." },
  { title: "Free Templates", href: "/students/tools/templates", note: "Budget, debt, and savings spreadsheets that total themselves." },
];

export default function StudentToolsHub() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 pb-8 pt-10">
          <nav className="text-sm font-medium text-stone">
            <Link
              href="/students"
              className="underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              For Students
            </Link>{" "}
            / Tools
          </nav>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Every calculator, in-house.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-stone">
            The same free tools as the main site, right here in the student
            hub — and your numbers follow you between the two.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="space-y-10">
            {toolCategories.map((cat) => {
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
                    <span className="h-px flex-1 bg-sand" />
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {live.map((item) => (
                      <Link
                        key={item.mainHref}
                        href={TOOL_FRAME_MAP[item.mainHref]}
                        className="group flex h-full flex-col rounded-2xl border border-sand bg-cream p-5 transition-all duration-200 hover:-translate-y-1 hover:border-ink/15 hover:shadow-md"
                      >
                        <h3 className="font-semibold leading-snug text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                          {item.short}
                        </p>
                        <span className="mt-4 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4">
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
                {EXTRAS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex h-full flex-col rounded-2xl border border-sand bg-cream p-5 transition-all duration-200 hover:-translate-y-1 hover:border-ink/15 hover:shadow-md"
                  >
                    <h3 className="font-semibold leading-snug text-ink">
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
