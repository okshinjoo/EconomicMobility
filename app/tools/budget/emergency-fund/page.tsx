import type { Metadata } from "next";
import CalcPageShell from "@/components/CalcPageShell";
import EmergencyFundCalculator from "@/components/EmergencyFundCalculator";

export const metadata: Metadata = {
  title: "Emergency Fund Calculator | Empower — Economic Mobility Project",
  description:
    "Figure out how big your emergency fund should be and how long it'll take to build it.",
};

export default function EmergencyFundPage() {
  return (
    <CalcPageShell
      base="/tools/budget"
      current="emergency-fund"
      categoryLabel="Budgeting & Income"
      eyebrow="Emergency Fund"
      title="Build your safety net."
      dek="An emergency fund turns a crisis into an inconvenience. See your target and a realistic timeline to get there."
    >
      <EmergencyFundCalculator />
    </CalcPageShell>
  );
}
