// Student-frame mirror (July 2026 full-containment pass): same calculator
// component as /tools/debt/auto-loan, canonical points there. The config is a copy of
// the main page's — keep in sync (same pattern as the student-loan mirror).

import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import LoanCalculator, { type LoanConfig } from "@/components/LoanCalculator";

export const metadata: Metadata = {
  title: "Auto Loan Calculator | Empower Students",
  description: "The real monthly cost of a car loan — price, down payment, trade-in, rate.",
  alternates: { canonical: "/tools/debt/auto-loan" },
};

const config: LoanConfig = {
  storageKey: "autoLoan",
  cardTitle: "The car & loan",
  amountFields: [
    { key: "price", label: "Car price", placeholder: "25,000" },
    { key: "down", label: "Down payment", placeholder: "3,000", subtract: true },
    { key: "trade", label: "Trade-in value", placeholder: "0", subtract: true },
  ],
  termPresets: [36, 48, 60, 72],
  defaultTerm: "60",
  termUnit: "months",
  defaultRate: "7",
  rateLabel: "Interest rate (APR)",
  principalLabel: "Loan amount",
};

export default function Page() {
  return (
    <StudentToolShell title="Auto Loan Calculator" dek="The real monthly cost of a car loan — price, down payment, trade-in, rate.">
      <LoanCalculator config={config} />
    </StudentToolShell>
  );
}
