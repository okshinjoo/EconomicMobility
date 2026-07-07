import type { Metadata } from "next";
import CalcPageShell from "@/components/CalcPageShell";
import NetWorthCalculator from "@/components/NetWorthCalculator";

export const metadata: Metadata = {
  title: "Net Worth Calculator | Empower — Economic Mobility Project",
  description:
    "Add up what you own, subtract what you owe, and get one honest number you can track month to month. Saved on your device only.",
};

export default function NetWorthPage() {
  return (
    <CalcPageShell
      base="/tools/budget"
      current="net-worth"
      categoryLabel="Budgeting & Income"
      eyebrow="Net Worth"
      title="One honest number."
      dek="What you own minus what you owe. It's a snapshot you can retake every month, and watching it move is the whole game."
    >
      <NetWorthCalculator />
    </CalcPageShell>
  );
}
