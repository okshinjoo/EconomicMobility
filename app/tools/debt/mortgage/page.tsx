import type { Metadata } from "next";
import CalcPageShell from "@/components/CalcPageShell";
import LoanCalculator, { type LoanConfig } from "@/components/LoanCalculator";

export const metadata: Metadata = {
  title: "Mortgage Calculator | Empower — Economic Mobility Project",
  description:
    "Estimate a monthly mortgage payment (principal, interest, and optional taxes and insurance) plus the total interest over the loan.",
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

export default function MortgagePage() {
  return (
    <CalcPageShell
      base="/tools/debt"
      current="mortgage"
      categoryLabel="Debt & Loans"
      eyebrow="Mortgage Calculator"
      title="What a home would cost each month."
      dek="Even if buying is years away, see how price, down payment, rate, and term shape a monthly mortgage payment, and the interest over 15 or 30 years."
    >
      <LoanCalculator config={config} />
    </CalcPageShell>
  );
}
