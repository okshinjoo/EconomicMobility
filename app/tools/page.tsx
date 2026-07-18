import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Binoculars, FileXls as FileSpreadsheet, DownloadSimple as Download, GraduationCap, PencilSimpleLine as PenLine } from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import Reveal from "@/components/Reveal";
import { toolStyles } from "@/components/ToolDoodle";
import ToolMark from "@/components/ToolMark";
import CategoryFlipCard from "@/components/CategoryFlipCard";
import { toolCategories, hrefFor } from "@/lib/toolsRegistry";
import { templates } from "@/lib/templates";
import HeadlineRise from "@/components/HeadlineRise";
import HeroRecede from "@/components/HeroRecede";

export const metadata: Metadata = {
  title: "Calculators | Empower — Economic Mobility Project",
  description:
    "Free, no-sign-up calculators for budgeting, debt and loans, saving and investing, and college. Each is a focused tool that updates as you type.",
};

export default function ToolsHub() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />


      {/* content column stacks above the fixed footer (curtain reveal) */}

      <div className="relative z-10 bg-paper">

      {/* Hero — A: solid amber field */}
      <section className="border-b-2 border-ink bg-paper-deep">
        <HeroRecede className="mx-auto max-w-6xl px-6 pb-14 pt-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Free Tools
          </span>
          <h1 className="mt-4 font-display text-[2.6rem] font-bold leading-[1.07] sm:leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Run your{" "}
            <span className="relative whitespace-nowrap text-forest">
              {/* Letter-by-letter blur-lift (owner call, July 16). */}
              <HeadlineRise chars>real numbers.</HeadlineRise>
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
            Not sure which tool? The Budget Planner does the most.{" "}
            <Link
              href="/tools/budget"
              className="underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              start there
            </Link>
            .
          </p>
        </HeroRecede>
      </section>

      {/* Featured tool spotlight (owner ask July 14: "promote the reality
          checker more — it's a neat tool"). The one calculator that isn't
          answering a form's question but a life one, so it earns a band of
          its own between the hero and the category grid. */}
      <section className="border-b-2 border-ink bg-forest text-cream">
        <div className="mx-auto max-w-6xl px-6 py-7">
          <Reveal>
            <div className="flex items-center gap-5">
              <span className="card-ink hidden h-20 w-20 shrink-0 rotate-2 items-center justify-center rounded-2xl bg-cream sm:flex">
                <ToolMark
                  slug="reality-check"
                  color="#c9842a"
                  className="h-11 w-11"
                />
              </span>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber">
                  Start with the fun one
                </span>
                <h2 className="mt-1 font-display text-xl font-semibold leading-tight sm:text-2xl">
                  Pick the life you want.{" "}
                  <span className="italic text-amber">
                    See the salary it takes.
                  </span>
                </h2>
                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-cream/80">
                  Choose your apartment, car, groceries, and a little fun; the
                  Reality Check works backward to the real paycheck that covers
                  it, taxed for your state.
                </p>
              </div>
              <Link
                href="/tools/budget/reality-check"
                className="btn-ink hidden shrink-0 items-center gap-2 rounded-md bg-amber px-5 py-2.5 text-sm font-bold text-ink sm:inline-flex"
              >
                Try it
                <ArrowRight className="h-3.5 w-3.5" weight="bold" />
              </Link>
            </div>
            {/* button drops below the row on the narrowest screens */}
            <Link
              href="/tools/budget/reality-check"
              className="btn-ink mt-4 inline-flex items-center gap-2 rounded-md bg-amber px-5 py-2.5 text-sm font-bold text-ink sm:hidden"
            >
              Try the Reality Check
              <ArrowRight className="h-3.5 w-3.5" weight="bold" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* By category — flip tiles (owner ask July 17: "lets make these
          flip too"). Front is the category face; hover/tap turns it over
          to the calculators themselves, so the flip is navigation. */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            By category
          </span>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {toolCategories.map((cat, i) => {
              const style = toolStyles[cat.id] ?? toolStyles.budgeting;
              const live = cat.items.filter((x) => x.status === "live");
              return (
                <Reveal key={cat.id} delay={i * 70} className="h-full">
                  <CategoryFlipCard
                    catId={cat.id}
                    label={cat.label}
                    blurb={cat.blurb}
                    count={live.length}
                    bg={style.bg}
                    accent={style.accent}
                    items={live.map((item) => ({
                      title: item.title,
                      href: hrefFor(cat, item),
                      slug: item.slug,
                      main: item.main,
                    }))}
                  />
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

      {/* Explorers — the two big-dataset tools (owner ask July 17: "career
          explorer and compare colleges should be in the tools section").
          Not calculators, so they stay OUT of toolsRegistry (which drives
          every "N calculators" count) and get their own band. Canonical
          homes are in the student frame; these links cross into it. */}
      <section className="border-t-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 pt-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Not calculators — explorers
          </span>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Career Explorer",
                icon: Binoculars,
                href: "/students/career-explorer",
                desc: "One hundred careers on real federal data: what each one pays, how fast it's growing, and the training it takes — with “earn while you train” as a first-class filter.",
                stat: "100 careers · BLS pay + growth data",
              },
              {
                title: "Compare Colleges",
                icon: GraduationCap,
                href: "/students/compare-colleges",
                desc: "One hundred colleges with hand-checked admissions and aid policies: need-blind or not, meets full need or not, and what they actually weigh when they read your application.",
                stat: "100 colleges · admissions + aid, hand-encoded",
              },
            ].map((ex) => (
              <Reveal key={ex.href}>
                <Link
                  href={ex.href}
                  className="group flex h-full flex-col rounded-2xl border-2 border-ink bg-forest p-6 text-cream shadow-[4px_4px_0_#e7a33c] transition-transform duration-200 hover:-translate-y-1 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <ex.icon className="h-8 w-8 text-amber" weight="regular" />
                    <span className="rounded-full bg-cream/10 px-2.5 py-1 text-[11px] font-bold text-cream/80">
                      {ex.stat}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold leading-snug">
                    {ex.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-cream/75">
                    {ex.desc}
                  </p>
                  <span className="mt-4 text-sm font-bold text-amber underline decoration-amber/50 decoration-2 underline-offset-4 group-hover:text-cream">
                    Open
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Letter Generator — a centered feature card (owner ask July: the flat
          registry row read too plain). Still the page's secondary cross-sell;
          the templates band below stays the primary one. */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 pt-12 pb-14 sm:pt-16">
          <Link
            href="/tools/letters"
            className="group mx-auto flex max-w-xl flex-col items-center rounded-2xl border-2 border-ink bg-cream p-8 text-center shadow-[0_12px_30px_-16px_rgba(17,33,28,0.35)] transition-transform duration-200 hover:-translate-y-1 sm:p-10"
          >
            <PenLine className="h-8 w-8 text-terracotta" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-terracotta">
              Not a calculator, still a tool
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
              Letter Generator
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-stone">
              Credit-report disputes and debt-validation requests, built right
              in your browser. Nothing you type leaves your device.
            </p>
            <span className="btn-ink mt-6 inline-flex items-center gap-2 rounded-md bg-amber px-6 py-3 text-sm font-bold text-ink">
              Write a letter
              <ArrowRight className="h-4 w-4" weight="bold" />
            </span>
          </Link>
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
                tracker, or savings worksheet; they total themselves up. Open in
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
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-forest-700 p-5 transition-colors duration-200 hover:border-amber/40"
                  >
                    <t.icon className="h-6 w-6 text-amber" weight="light" />
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

      </div>


      <CurtainFooter>

        <Footer />

      </CurtainFooter>
    </div>
  );
}
