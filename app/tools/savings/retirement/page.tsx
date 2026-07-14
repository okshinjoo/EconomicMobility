import type { Metadata } from "next";
import CalcPageShell from "@/components/CalcPageShell";
import GrowthCalculator, {
  type GrowthConfig,
} from "@/components/GrowthCalculator";

export const metadata: Metadata = {
  title: "Retirement Calculator | Empower — Economic Mobility Project",
  description:
    "Project how much you could have saved for retirement, based on your age, current savings, and what you set aside each month.",
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

export default function RetirementPage() {
  return (
    <CalcPageShell
      base="/tools/savings"
      current="retirement"
      categoryLabel="Saving & Investing"
      eyebrow="Retirement Calculator"
      title="It's never too early to start."
      dek="Retirement feels far off, but time is the biggest factor. See what steady saving could grow into by the time you retire, and how much is pure growth."
    >
      <GrowthCalculator config={config} />
    </CalcPageShell>
  );
}
