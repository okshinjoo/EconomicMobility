import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileSpreadsheet, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ToolDoodle, { toolStyles } from "@/components/ToolDoodle";
import ToolMark from "@/components/ToolMark";
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

      {/* Hero — A: solid amber field */}
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Free Tools
          </span>
          <h1 className="mt-4 font-display text-[2.6rem] font-bold leading-[1.07] sm:leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Run your{" "}
            <span className="relative whitespace-nowrap text-forest">
              real numbers.
              <svg
                aria-hidden="true"
                viewBox="0 0 300 18"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-amber"
                preserveAspectRatio="none"
              >
                <path
                  d="M3,13 C60,4 120,4 160,9 C210,15 260,8 297,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone">
            Each calculator answers one question and updates as you type. No
            sign-up, nothing saved to our servers, no catch.
          </p>
          <p className="mt-4 text-sm font-semibold text-forest">
            Not sure which tool? The Budget Planner does the most —{" "}
            <Link
              href="/tools/budget"
              className="underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              start there
            </Link>
            .
          </p>
        </div>
      </section>

      {/* By category — jump tiles as their own section (Base44 structure,
          our tiles) */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            By category
          </span>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {toolCategories.map((cat, i) => {
              const style = toolStyles[cat.id] ?? toolStyles.budgeting;
              const liveCount = cat.items.filter((x) => x.status === "live").length;
              return (
                <Reveal key={cat.id} delay={i * 70}>
                  <a
                    href={`#${cat.id}`}
                    className="card-ink group flex h-full flex-col rounded-xl p-6 text-ink transition-transform duration-200 hover:-translate-y-1"
                    style={{ backgroundColor: style.bg }}
                  >
                    <ToolDoodle id={cat.id} color={style.accent} />
                    <span className="mt-4 block font-display text-lg font-bold leading-tight">
                      {cat.label}
                    </span>
                    <span className="mt-1 flex-1 text-xs leading-5 text-ink/65">
                      {cat.blurb}
                    </span>
                    <span
                      className="mt-4 border-t-2 pt-3 text-xs font-bold text-ink/60"
                      style={{ borderColor: `${style.accent}55` }}
                    >
                      {liveCount} calculators
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl space-y-16 px-6 py-14">
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            All calculators
          </span>
          {toolCategories.map((cat) => {
            const style = toolStyles[cat.id] ?? toolStyles.budgeting;
            const accent = style.accent;
            const mainItem =
              cat.items.find((x) => x.main && x.status === "live") ?? null;
            const rest = cat.items.filter((x) => x !== mainItem);
            return (
              <div key={cat.id} className="scroll-mt-24" id={cat.id}>
                {/* Category heading: title + count on the same baseline,
                    blurb underneath (Base44 rhythm, our type) */}
                <Reveal>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                        {cat.label}
                      </h2>
                      <span
                        className="text-sm font-bold"
                        style={{ color: accent }}
                      >
                        {cat.items.filter((x) => x.status === "live").length}{" "}
                        calculators
                      </span>
                    </div>
                    <p className="mt-1.5 max-w-2xl text-sm leading-6 text-stone">
                      {cat.blurb}
                    </p>
                  </div>
                </Reveal>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* The main calculator gets the hero spot */}
                  {mainItem && (
                    <Reveal className="md:col-span-1">
                      <Link
                        href={hrefFor(cat, mainItem)}
                        className="group flex h-full flex-col rounded-xl border-2 border-ink bg-forest p-6 text-cream shadow-[4px_4px_0_#e7a33c] transition-transform duration-200 hover:-translate-y-1"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <ToolMark
                            slug={mainItem.slug}
                            color="#fbf8f1"
                            className="h-10 w-10 shrink-0"
                          />
                          <span className="rounded-full bg-amber px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
                            Main
                          </span>
                        </div>
                        <h3 className="mt-4 font-display text-xl font-bold leading-snug">
                          {mainItem.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-6 text-cream/75">
                          {mainItem.short}
                        </p>
                        <span className="mt-4 text-sm font-bold text-amber underline decoration-amber/50 decoration-2 underline-offset-4 group-hover:text-cream">
                          Open
                        </span>
                      </Link>
                    </Reveal>
                  )}

                  <div
                    className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${
                      mainItem ? "md:col-span-2" : "md:col-span-3 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
                  {rest.map((item, i) => {
                    const live = item.status === "live";
                    const inner = (
                      <>
                        <div className="flex items-start justify-between gap-2">
                          <ToolMark
                            slug={item.slug}
                            color={accent}
                            className="h-8 w-8 shrink-0"
                          />
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
                        <div className="mt-2.5 flex items-center justify-between gap-2">
                          <h3
                            className={`font-display text-base font-bold leading-snug ${
                              live ? "text-ink" : "text-stone"
                            }`}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <p
                          className={`mt-1.5 flex-1 text-xs leading-5 ${
                            live ? "text-ink/65" : "text-stone/70"
                          }`}
                        >
                          {item.short}
                        </p>
                        {live ? (
                          <span
                            className="mt-3 text-xs font-bold underline decoration-2 underline-offset-4"
                            style={{ color: accent, textDecorationColor: `${accent}66` }}
                          >
                            Open
                          </span>
                        ) : (
                          <span className="mt-3 text-xs font-medium text-stone/60">
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
                            className="group flex h-full flex-col rounded-xl border-2 border-ink p-4 shadow-[3px_3px_0_#11211c] transition-transform duration-200 hover:-translate-y-0.5"
                            style={{ backgroundColor: style.bg }}
                          >
                            {inner}
                          </Link>
                        ) : (
                          <div className="flex h-full flex-col rounded-xl border-2 border-sand bg-cream/50 p-4">
                            {inner}
                          </div>
                        )}
                      </Reveal>
                    );
                  })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Letter generator promo */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 pb-14">
          <div className="card-ink-lg flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-cream p-7 sm:p-9 lg:-rotate-[0.3deg]">
            <div className="max-w-xl">
              <span className="inline-block -rotate-1 rounded-lg border-2 border-ink bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
                New
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
                The letters that fix things
              </h2>
              <p className="mt-2 text-base leading-7 text-stone">
                Generate a credit-report dispute or a debt-validation request
                in your browser. Fill in the blanks, send by certified mail.
                Nothing you type leaves your device.
              </p>
            </div>
            <Link
              href="/tools/letters"
              className="btn-ink inline-flex items-center rounded-md bg-forest px-7 py-3.5 text-base font-bold text-cream"
            >
              Write a letter
            </Link>
          </div>
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
