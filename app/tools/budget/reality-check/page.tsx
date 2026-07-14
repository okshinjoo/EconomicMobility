import type { Metadata } from "next";
import CalcPageShell from "@/components/CalcPageShell";
import RealityCheckTool from "@/components/RealityCheckTool";

export const metadata: Metadata = {
  title: "Reality Check | Empower — Economic Mobility Project",
  description:
    "Pick the lifestyle you want (housing, food, car, trips) and see the honest salary it takes, taxes included.",
};

export default function RealityCheckPage() {
  return (
    <CalcPageShell
      base="/tools/budget"
      current="reality-check"
      categoryLabel="Budgeting & Income"
      eyebrow="Reality Check"
      title="What does your dream life actually cost?"
      dek="Pick how you'd live (the place, the car, the trips) and we'll show you the salary it takes, with real 2026 taxes counted. National ballpark numbers; your city may differ."
    >
      <RealityCheckTool />
    </CalcPageShell>
  );
}
