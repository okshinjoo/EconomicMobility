import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileSpreadsheet, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toolCategories, hrefFor } from "@/lib/toolsRegistry";
import { templates } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Calculators | Empower — Economic Mobility Project",
  description:
    "Free, no-sign-up calculators for budgeting, debt and loans, saving and investing, and college — each a focused tool that updates as you type.",
};

// Per-category accent (raw hex — only place raw hex is allowed). On-brand:
// budgeting forest green, debt warm terracotta, saving brighter emerald,
// college gold.
const CATEGORY_ACCENTS: Record<string, string> = {
  budgeting: "#0f5c46",
  debt: "#c2613e",
  saving: "#1f9d6b",
  college: "#c9842a",
};

export default function ToolsHub() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero band */}
      <section className="border-b border-sand/70 bg-paper">
        <div className="mx-auto max-w-4xl px-6 pb-14 pt-12 text-center lg:pt-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">Free Tools</span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Run your real numbers.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-stone">
            Each calculator answers one question and updates as you type. No
            sign-up, nothing saved to our servers, no catch.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {toolCategories.map((cat) => (
              <span
                key={cat.id}
                className="inline-flex items-center rounded-full border border-sand bg-cream px-3.5 py-1.5 text-sm font-medium text-ink"
              >
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl space-y-16 px-6 py-20">
          {toolCategories.map((cat) => {
            const accent = CATEGORY_ACCENTS[cat.id];
            const liveCount = cat.items.filter(
              (i) => i.status === "live"
            ).length;
            return (
              <div key={cat.id} className="scroll-mt-24" id={cat.id}>
                {/* Category header */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                    {cat.label}
                  </h2>
                  <p className="mt-0.5 text-sm leading-6 text-stone">
                    {cat.blurb}
                  </p>
                </div>

                {/* Accent rule under the header */}
                <div className="mt-5 flex items-center gap-3">
                  <span
                    className="h-1 w-12 rounded-full"
                    style={{ background: accent }}
                  />
                  <span className="h-px flex-1 bg-sand" />
                  <span className="text-xs font-medium text-stone">
                    {liveCount} calculator{liveCount > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((item) => {
                    const live = item.status === "live";
                    const inner = (
                      <>
                        <div className="flex items-center justify-end gap-2">
                          {item.main ? (
                            <span
                              className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                              style={{ background: accent, color: "#fbf8f1" }}
                            >
                              Main
                            </span>
                          ) : !live ? (
                            <span className="rounded-full bg-amber/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-deep">
                              Soon
                            </span>
                          ) : null}
                        </div>
                        <h3
                          className={`mt-2 font-display text-lg font-semibold ${
                            live ? "text-ink" : "text-stone"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`mt-2 flex-1 text-sm leading-6 ${
                            live ? "text-stone" : "text-stone/70"
                          }`}
                        >
                          {item.short}
                        </p>
                        {live ? (
                          <span
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                            style={{ color: accent }}
                          >
                            Open
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        ) : (
                          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-stone/60">
                            Coming soon
                          </span>
                        )}
                      </>
                    );
                    return live ? (
                      <Link
                        key={item.slug}
                        href={hrefFor(cat, item)}
                        className="group flex flex-col rounded-2xl border border-sand bg-cream p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ink/15 hover:shadow-lg"
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div
                        key={item.slug}
                        className="flex flex-col rounded-2xl border border-sand bg-cream/50 p-6"
                      >
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Downloadable templates */}
      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber">
                <FileSpreadsheet className="h-4 w-4" />
                Take it with you
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Free downloadable templates
              </h2>
              <p className="mt-4 max-w-md text-lg leading-8 text-cream/75">
                Rather work in your own spreadsheet? Download a budget, debt
                tracker, or savings worksheet — they total themselves up. Open in
                Excel, Google Sheets, or Numbers.
              </p>
              <Link
                href="/tools/templates"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-cream"
              >
                Browse all templates
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {templates.map((t) => (
                <a
                  key={t.file}
                  href={t.file}
                  download
                  className="group flex flex-col rounded-2xl border border-white/10 bg-forest-700 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-amber/40"
                >
                  <t.icon className="h-6 w-6 text-amber" strokeWidth={1.5} />
                  <h3 className="mt-3 text-base font-semibold leading-tight">
                    {t.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber">
                    <Download className="h-4 w-4" />
                    .xlsx
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
