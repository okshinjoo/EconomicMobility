// Student-frame mirror (July 2026 full-containment pass): same calculator
// component as /tools/savings/retirement, canonical points there. The config is a copy of
// the main page's — keep in sync (same pattern as the student-loan mirror).

import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import GrowthCalculator, { type GrowthConfig } from "@/components/GrowthCalculator";

export const metadata: Metadata = {
  title: "Retirement Calculator | Empower Students",
  description: "From your age now to retirement age: what your savings could become.",
  alternates: { canonical: "/tools/savings/retirement" },
};

const config: GrowthConfig = {
  storageKey: "retirement",
  timeMode: "ages",
  initialLabel: "Current savings",
  monthlyLabel: "Monthly contribution",
  rateLabel: "Annual return",
  defaultRate: "7",
  cardTitle: "Your retirement savings",
  resultLabel: "At retirement you'd have",
};

export default function Page() {
  return (
    <StudentToolShell title="Retirement Calculator" dek="From your age now to retirement age: what your savings could become.">
      <GrowthCalculator config={config} />
    </StudentToolShell>
  );
}
