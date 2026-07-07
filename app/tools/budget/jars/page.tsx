import type { Metadata } from "next";
import CalcPageShell from "@/components/CalcPageShell";
import JarsCalculator from "@/components/JarsCalculator";

export const metadata: Metadata = {
  title: "Savings Jars | Empower — Economic Mobility Project",
  description:
    "Name your savings goals, track each jar's progress, and watch them fill. Saved on your device, no account.",
};

export default function JarsPage() {
  return (
    <CalcPageShell
      base="/tools/budget"
      current="jars"
      categoryLabel="Budgeting & Income"
      eyebrow="Savings Jars"
      title="Every goal gets a jar."
      dek="Car repairs, gifts, the move-out fund: give each one a jar and a goal, and update it when money moves. Watching a jar fill is the cheapest motivation there is."
    >
      <JarsCalculator />
    </CalcPageShell>
  );
}
