import type { Metadata } from "next";
import CalcPageShell from "@/components/CalcPageShell";
import RothIraCalculator from "@/components/RothIraCalculator";

export const metadata: Metadata = {
  title: "Roth IRA Calculator | Empower — Economic Mobility Project",
  description:
    "See how much your Roth IRA could grow by retirement, completely tax-free, and how much more you'd keep than in a regular taxable account.",
};

export default function RothIraPage() {
  return (
    <CalcPageShell
      base="/tools/savings"
      current="roth-ira"
      categoryLabel="Saving & Investing"
      eyebrow="Roth IRA Calculator"
      title="Grow your retirement, tax-free."
      dek="A Roth IRA is funded with money you've already paid tax on, so every dollar it grows is yours to keep, tax-free, in retirement. See what steady contributions could become, and how much a Roth beats an ordinary taxable account."
    >
      <RothIraCalculator />
    </CalcPageShell>
  );
}
