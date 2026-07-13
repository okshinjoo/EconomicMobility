// Student-frame mirror (July 2026 full-containment pass): same calculator
// component as /tools/savings/compound, canonical points there. The config is a copy of
// the main page's — keep in sync (same pattern as the student-loan mirror).

import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import GrowthCalculator, { type GrowthConfig } from "@/components/GrowthCalculator";

export const metadata: Metadata = {
  title: "Compound Interest | Empower Students",
  description: "See money grow: what steady contributions become over the years.",
  alternates: { canonical: "/tools/savings/compound" },
};

const config: GrowthConfig = {
  storageKey: "compound",
  timeMode: "years",
  initialLabel: "Starting amount",
  monthlyLabel: "Monthly contribution",
  rateLabel: "Annual return",
  defaultRate: "7",
  cardTitle: "What you'll invest",
  resultLabel: "What you'd have",
};

export default function Page() {
  return (
    <StudentToolShell title="Compound Interest" dek="See money grow: what steady contributions become over the years.">
      <GrowthCalculator config={config} />
    </StudentToolShell>
  );
}
