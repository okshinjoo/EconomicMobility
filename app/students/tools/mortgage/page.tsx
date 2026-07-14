// Student-frame mirror (July 2026 full-containment pass): same calculator
// component as /tools/debt/mortgage, canonical points there. The config is a copy of
// the main page's — keep in sync (same pattern as the student-loan mirror).

import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import LoanCalculator, { type LoanConfig } from "@/components/LoanCalculator";

export const metadata: Metadata = {
  title: "Mortgage Calculator | Empower Students",
  description: "What a home really costs each month: loan, taxes, and insurance together.",
  alternates: { canonical: "/tools/debt/mortgage" },
};

const config: LoanConfig = {
  storageKey: "mortgage",
  cardTitle: "The home & loan",
  amountFields: [
    { key: "price", label: "Home price", placeholder: "300,000" },
    { key: "down", label: "Down payment", placeholder: "60,000", subtract: true },
  ],
  termPresets: [15, 30],
  defaultTerm: "30",
  termUnit: "years",
  defaultRate: "6.5",
  rateLabel: "Interest rate (APR)",
  addOns: [
    { key: "tax", label: "Property tax (monthly)", placeholder: "300" },
    { key: "ins", label: "Home insurance (monthly)", placeholder: "120" },
  ],
  principalLabel: "Loan amount",
};

export default function Page() {
  return (
    <StudentToolShell title="Mortgage Calculator" dek="What a home really costs each month: loan, taxes, and insurance together.">
      <LoanCalculator config={config} />
    </StudentToolShell>
  );
}
