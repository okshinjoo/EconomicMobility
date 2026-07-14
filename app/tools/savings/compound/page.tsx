import type { Metadata } from "next";
import CalcPageShell from "@/components/CalcPageShell";
import GrowthCalculator, {
  type GrowthConfig,
} from "@/components/GrowthCalculator";

export const metadata: Metadata = {
  title: "Compound Interest Calculator | Empower — Economic Mobility Project",
  description:
    "See how small, steady investing grows over decades, and how much of your future balance comes from compound growth.",
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

export default function CompoundPage() {
  return (
    <CalcPageShell
      base="/tools/savings"
      current="compound"
      categoryLabel="Saving & Investing"
      eyebrow="Compound Interest Calculator"
      title="Watch your money grow."
      dek="Compound growth is money earning money on itself. See what a small amount, invested steadily, can become over time, and why starting early matters most."
    >
      <GrowthCalculator config={config} />
    </CalcPageShell>
  );
}
