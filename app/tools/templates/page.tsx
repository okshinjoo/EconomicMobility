import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Download, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopicMark from "@/components/TopicMark";
import { templates } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Free Templates | Empower — Economic Mobility Project",
  description:
    "Free downloadable spreadsheet templates: a monthly budget, a debt payoff tracker, and a savings goal worksheet. They total themselves up. No sign-up.",
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero — C: editorial maximal on a forest field */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <TopicMark
          id="budgeting"
          color="#fbf8f1"
          className="pointer-events-none absolute -bottom-24 -right-16 h-[24rem] w-[24rem] opacity-[0.07]"
        />
        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-10 lg:pb-20">
          <nav className="flex items-center gap-1.5 text-sm font-medium text-cream/60">
            <Link href="/tools" className="transition-colors hover:text-cream">
              Tools
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-cream">Templates</span>
          </nav>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
              Free Templates
            </span>
            <span className="inline-block -rotate-2 rounded-lg border-2 border-ink bg-amber px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
              Free forever
            </span>
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.95] tracking-tight sm:text-7xl">
            Spreadsheets that{" "}
            <span className="italic text-amber">do the math</span> for you.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/75">
            Download, open in Excel, Google Sheets, or Numbers, and start
            filling in. The totals update on their own: no formulas to set up,
            no sign-up, nothing saved to our servers.
          </p>
        </div>
      </section>

      {/* The downloads — B: numbered ink-and-shadow objects */}
      <section className="bg-paper">
        <div className="mx-auto max-w-5xl space-y-8 px-6 py-14">
          {templates.map((t, i) => (
            <div
              key={t.file}
              className={`card-ink-lg grid gap-6 rounded-2xl bg-cream p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center ${
                i === 1 ? "lg:-rotate-[0.5deg]" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="select-none font-display text-6xl font-bold leading-none text-sand sm:text-7xl"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <h2 className="font-display text-2xl font-bold text-ink">
                  {t.title}
                </h2>
                <p className="mt-1.5 max-w-xl text-sm leading-6 text-stone">
                  {t.blurb}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {t.includes.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 text-sm leading-6 text-ink"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest"
                        strokeWidth={2.5}
                      />
                      {line}
                    </li>
                  ))}
                </ul>
                {t.tool && (
                  <Link
                    href={t.tool.href}
                    className="mt-4 inline-block text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
                  >
                    {t.tool.label}
                  </Link>
                )}
              </div>

              <div className="flex lg:justify-end">
                <a
                  href={t.file}
                  download
                  className="btn-ink inline-flex items-center gap-2 rounded-md bg-amber px-6 py-3.5 text-sm font-bold text-ink"
                >
                  <Download className="h-4 w-4" />
                  Download (.xlsx)
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closer — A: amber field */}
      <section className="bg-amber text-ink">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <p className="max-w-3xl text-base leading-7 text-ink/80">
            Prefer to run the numbers without a download? Every template has a
            live calculator version under{" "}
            <Link
              href="/tools"
              className="font-semibold text-ink underline decoration-ink/40 decoration-2 underline-offset-4 transition-colors hover:decoration-ink"
            >
              Tools
            </Link>
            . Want a printable paper version? Let us know.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
