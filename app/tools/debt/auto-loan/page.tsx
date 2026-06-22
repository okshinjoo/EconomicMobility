import type { Metadata } from "next";
import CalcPageShell from "@/components/CalcPageShell";
import LoanCalculator, { type LoanConfig } from "@/components/LoanCalculator";

export const metadata: Metadata = {
  title: "Auto Loan Calculator | Empower — Economic Mobility Project",
  description:
    "Estimate your monthly car payment and the total interest you'll pay, after down payment and trade-in.",
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

export default function AutoLoanPage() {
  return (
    <CalcPageShell
      base="/tools/debt"
      current="auto-loan"
      categoryLabel="Debt & Loans"
      eyebrow="Auto Loan Calculator"
      title="What that car really costs."
      dek="Enter the price, your down payment, and the loan terms to see your monthly payment and the total interest over the life of the loan."
    >
      <LoanCalculator config={config} />
    </CalcPageShell>
  );
}
