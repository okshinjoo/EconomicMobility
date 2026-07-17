// The freshness dashboard (July 17, 2026). Every dated dataset, its last
// verification, next due date, and the exact re-verify recipe — the yearly
// upkeep, systematized. Not linked from any nav — bookmark it, like
// /admin/comments. Nothing here is sensitive (it's all repo facts), so no
// access control needed; noindex keeps it out of search engines.
// force-dynamic so the overdue/due-soon chips compare against today.

import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { freshness, freshnessStatus } from "@/lib/freshness";

export const metadata: Metadata = {
  title: "Data Freshness | Empower",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STATUS_STYLE = {
  overdue: { label: "Overdue", bg: "#c4573b", fg: "#fbf8f1" },
  "due-soon": { label: "Due soon", bg: "#e7a33c", fg: "#11211c" },
  fresh: { label: "Fresh", bg: "#15624b", fg: "#fbf8f1" },
} as const;

function dueLabel(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function FreshnessPage() {
  const now = new Date();
  const rows = [...freshness].sort((a, b) =>
    a.nextDueISO.localeCompare(b.nextDueISO)
  );
  const counts = { overdue: 0, "due-soon": 0, fresh: 0 };
  for (const e of rows) counts[freshnessStatus(e, now)]++;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Upkeep
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink">
            Data freshness
          </h1>
          <p className="mt-3 text-base leading-7 text-stone">
            Every dated dataset on the site, sorted by when it&apos;s next
            due. When you re-verify one, update its entry in{" "}
            <code className="rounded bg-cream px-1.5 py-0.5 text-sm">
              lib/freshness.ts
            </code>{" "}
            in the same commit — and the public vintage constant where one
            exists. <code className="rounded bg-cream px-1.5 py-0.5 text-sm">
              npm run check:freshness
            </code>{" "}
            fails loudly on anything overdue.
          </p>
          <p className="mt-4 text-sm font-semibold text-stone">
            {counts.overdue} overdue · {counts["due-soon"]} due soon ·{" "}
            {counts.fresh} fresh
          </p>

          <ol className="mt-8 space-y-6">
            {rows.map((e) => {
              const st = STATUS_STYLE[freshnessStatus(e, now)];
              return (
                <li
                  key={e.id}
                  className="rounded-2xl border border-sand bg-cream p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <h2 className="font-display text-lg font-bold text-ink">
                      {e.name}
                    </h2>
                    <span
                      className="rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide"
                      style={{ background: st.bg, color: st.fg }}
                    >
                      {st.label}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-stone">
                    {e.what}
                  </p>
                  <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
                    <div className="flex gap-2">
                      <dt className="font-semibold text-ink">Last verified:</dt>
                      <dd className="text-stone">{e.lastVerified}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-semibold text-ink">Next due:</dt>
                      <dd className="text-stone">{dueLabel(e.nextDueISO)}</dd>
                    </div>
                    {e.publicVintage ? (
                      <div className="flex gap-2 sm:col-span-2">
                        <dt className="font-semibold text-ink">
                          Readers see:
                        </dt>
                        <dd className="text-stone">
                          &ldquo;{e.publicVintage}&rdquo;
                        </dd>
                      </div>
                    ) : null}
                    <div className="flex gap-2 sm:col-span-2">
                      <dt className="shrink-0 font-semibold text-ink">
                        Cadence:
                      </dt>
                      <dd className="text-stone">{e.cadence}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 border-t border-sand pt-3 text-sm leading-6 text-stone">
                    <span className="font-semibold text-ink">
                      How to re-verify:
                    </span>{" "}
                    {e.recipe}
                  </p>
                  <p className="mt-2 text-xs font-medium text-stone/80">
                    {e.files.join(" · ")}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
      <Footer />
    </div>
  );
}
