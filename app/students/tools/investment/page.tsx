// Student-frame mirror (July 2026 full-containment pass): same calculator
// component as /tools/savings/investment, canonical points there. The config
// is a copy of the main page's — keep in sync (student-loan mirror pattern).

import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import GrowthCalculator, { type GrowthConfig } from "@/components/GrowthCalculator";

export const metadata: Metadata = {
  title: "Investment Growth | Empower Students",
  description: "Put a lump sum to work and see what it could grow to, with or without monthly additions.",
  alternates: { canonical: "/tools/savings/investment" },
};

const config: GrowthConfig = {
  storageKey: "investment",
  timeMode: "years",
  initialLabel: "Amount to invest now",
  monthlyLabel: "Add monthly (optional)",
  rateLabel: "Annual return",
  defaultRate: "7",
  cardTitle: "Your investment",
  resultLabel: "What it could grow to",
};

export default function Page() {
  return (
    <StudentToolShell title="Investment Growth" dek="Put a lump sum to work and see what it could grow to, with or without monthly additions.">
      <GrowthCalculator config={config} />
    </StudentToolShell>
  );
}
