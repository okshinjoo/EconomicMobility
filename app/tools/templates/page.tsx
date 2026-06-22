import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Download, ArrowRight, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { templates } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Free Templates | Empower — Economic Mobility Project",
  description:
    "Free downloadable spreadsheet templates — a monthly budget, a debt payoff tracker, and a savings goal worksheet. They total themselves up. No sign-up.",
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-6 pt-12">
          <nav className="flex items-center gap-1.5 text-sm font-medium text-stone">
            <Link href="/tools" className="transition-colors hover:text-ink">
              Tools
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-ink">Templates</span>
          </nav>
        </div>

        <div className="mx-auto max-w-4xl px-6 pb-6 pt-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            Free Templates
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Spreadsheets that do the math for you.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone">
            Download, open in Excel, Google Sheets, or Numbers, and start
            filling in. The totals update on their own — no formulas to set up,
            no sign-up, nothing saved to our servers.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-5xl space-y-6 px-6 pb-20">
          {templates.map((t) => (
            <div
              key={t.file}
              className="grid gap-6 rounded-3xl border border-sand bg-cream p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center"
            >
              <div className="flex items-start gap-4">
                <t.icon
                  className="mt-1 h-7 w-7 flex-shrink-0 text-forest"
                  strokeWidth={1.5}
                />
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
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors hover:text-ink"
                    >
                      {t.tool.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>

              <div className="flex lg:justify-end">
                <a
                  href={t.file}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest-700 hover:shadow-lg"
                >
                  <Download className="h-4 w-4" />
                  Download (.xlsx)
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <p className="text-sm leading-7 text-stone">
            Prefer to run the numbers without a download? Every template has a
            live calculator version under{" "}
            <Link href="/tools" className="font-semibold text-forest hover:text-ink">
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
