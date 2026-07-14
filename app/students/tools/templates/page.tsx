// Student-frame mirror of the templates page (July 2026 full-containment
// pass): same lib/templates data in a compact list; downloads are static
// files, related-tool links stay in-frame. Canonical points at
// /tools/templates.

import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import StudentToolShell from "@/components/StudentToolShell";
import { templates } from "@/lib/templates";
import { frameHref } from "@/lib/frame";

export const metadata: Metadata = {
  title: "Free Templates | Empower Students",
  description:
    "Free downloadable spreadsheet templates: a monthly budget, a debt payoff tracker, and a savings goal worksheet. They total themselves up.",
  alternates: { canonical: "/tools/templates" },
};

export default function Page() {
  return (
    <StudentToolShell
      title="Free Templates"
      dek="Downloadable spreadsheets that total themselves up: a monthly budget, a debt payoff tracker, and a savings goal worksheet. No sign-up."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {templates.map((t) => (
          <div
            key={t.file}
            className="card-ink flex h-full flex-col rounded-2xl bg-cream p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-ink bg-paper text-forest">
              <t.icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <h2 className="mt-4 font-display text-xl font-bold text-ink">
              {t.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-stone">
              {t.blurb}
            </p>
            <a
              href={t.file}
              download
              className="btn-ink mt-5 inline-flex w-fit items-center gap-2 rounded-md bg-amber px-5 py-2.5 text-sm font-bold text-ink"
            >
              <Download className="h-4 w-4" />
              Download .xlsx
            </a>
            {t.tool && (
              <Link
                href={frameHref(t.tool.href, "student")}
                className="mt-3 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
              >
                {t.tool.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </StudentToolShell>
  );
}
