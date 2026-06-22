import type { Metadata } from "next";
import CalcPageShell from "@/components/CalcPageShell";
import GrowthCalculator, {
  type GrowthConfig,
} from "@/components/GrowthCalculator";

export const metadata: Metadata = {
  title: "Investment Growth Calculator | Empower — Economic Mobility Project",
  description:
    "See how a one-time investment grows over time, with or without monthly contributions.",
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

export default function InvestmentPage() {
  return (
    <CalcPageShell
      base="/tools/savings"
      current="investment"
      categoryLabel="Saving & Investing"
      eyebrow="Investment Growth"
      title="Put a lump sum to work."
      dek="Got a tax refund, a gift, or some savings to invest? See what it could become over time — and how much extra adding a little each month makes."
    >
      <GrowthCalculator config={config} />
    </CalcPageShell>
  );
}
