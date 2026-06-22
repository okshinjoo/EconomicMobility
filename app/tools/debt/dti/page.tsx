import type { Metadata } from "next";
import CalcPageShell from "@/components/CalcPageShell";
import DtiCalculator from "@/components/DtiCalculator";

export const metadata: Metadata = {
  title: "Debt-to-Income Calculator | Empower — Economic Mobility Project",
  description:
    "Calculate your debt-to-income ratio — the number lenders use — and see where you land.",
};

export default function DtiPage() {
  return (
    <CalcPageShell
      base="/tools/debt"
      current="dti"
      categoryLabel="Debt & Loans"
      eyebrow="Debt-to-Income"
      title="The number lenders look at."
      dek="Your debt-to-income ratio compares what you owe each month to what you earn. It shapes whether you'll qualify for an apartment, a car, or a loan."
    >
      <DtiCalculator />
    </CalcPageShell>
  );
}
