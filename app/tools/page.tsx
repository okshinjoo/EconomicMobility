import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileSpreadsheet, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ToolDoodle, { toolStyles } from "@/components/ToolDoodle";
import { toolCategories, hrefFor } from "@/lib/toolsRegistry";
import { templates } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Calculators | Empower — Economic Mobility Project",
  description:
    "Free, no-sign-up calculators for budgeting, debt and loans, saving and investing, and college — each a focused tool that updates as you type.",
};

export default function ToolsHub() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            Free Tools
          </span>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Run your real numbers.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone">
            Each calculator answers one question and updates as you type. No
            sign-up, nothing saved to our servers, no catch.
          </p>

          {/* Category jump tiles — each in its own pastel with a live doodle */}
          <div className="mt-9 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {toolCategories.map((cat, i) => {
              const style = toolStyles[cat.id] ?? toolStyles.budgeting;
              const liveCount = cat.items.filter((x) => x.status === "live").length;
              return (
                <Reveal key={cat.id} delay={i * 70}>
                  <a
                    href={`#${cat.id}`}
                    className="group block rounded-xl p-4 text-ink shadow-sm transition-shadow hover:shadow-md"
                    style={{ backgroundColor: style.bg }}
                  >
                    <ToolDoodle id={cat.id} color={style.accent} />
                    <span className="mt-3 block text-sm font-bold leading-tight">
                      {cat.label}
                    </span>
                    <span className="mt-0.5 block text-xs font-medium text-ink/60">
                      {liveCount} calculators
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-14">
          {toolCategories.map((cat) => {
            const style = toolStyles[cat.id] ?? toolStyles.budgeting;
            const accent = style.accent;
            return (
              <div key={cat.id} className="scroll-mt-24" id={cat.id}>
                {/* Pastel category banner */}
                <Reveal>
                  <div
                    className="flex flex-wrap items-end justify-between gap-4 rounded-2xl px-6 py-5 text-ink sm:px-8"
                    style={{ backgroundColor: style.bg }}
                  >
                    <div>
                      <h2 className="font-display text-2xl font-bold sm:text-3xl">
                        {cat.label}
                      </h2>
                      <p className="mt-0.5 text-sm leading-6 text-ink/70">
                        {cat.blurb}
                      </p>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-cream"
                      style={{ background: accent }}
                    >
                      {cat.items.filter((x) => x.status === "live").length}{" "}
                      calculators
                    </span>
                  </div>
                </Reveal>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((item, i) => {
                    const live = item.status === "live";
                    const inner = (
                      <>
                        <div
                          className="h-1.5 w-10 rounded-full"
                          style={{ background: live ? accent : "var(--color-sand)" }}
                        />
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <h3
                            className={`font-display text-lg font-semibold ${
                              live ? "text-ink" : "text-stone"
                            }`}
                          >
                            {item.title}
                          </h3>
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
                    return (
                      <Reveal key={item.slug} delay={i * 60}>
                        {live ? (
                          <Link
                            href={hrefFor(cat, item)}
                            className="group flex h-full flex-col rounded-2xl border border-sand bg-cream p-6 transition-all duration-200 hover:border-ink/15 hover:shadow-lg"
                          >
                            {inner}
                          </Link>
                        ) : (
                          <div className="flex h-full flex-col rounded-2xl border border-sand bg-cream/50 p-6">
                            {inner}
                          </div>
                        )}
                      </Reveal>
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
                className="mt-7 inline-flex items-center gap-2 rounded-md bg-amber px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-cream"
              >
                Browse all templates
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {templates.map((t, i) => (
                <Reveal key={t.file} delay={i * 80}>
                  <a
                    href={t.file}
                    download
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-forest-700 p-5 transition-all duration-200 hover:border-amber/40"
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
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
