import type { Metadata } from "next";
import CalcPageShell from "@/components/CalcPageShell";
import RentCalculator from "@/components/RentCalculator";

export const metadata: Metadata = {
  title: "Rent Affordability Calculator | Empower — Economic Mobility Project",
  description:
    "See how much rent you can comfortably afford on your income, using the 30% guideline and your other debts.",
};

export default function RentPage() {
  return (
    <CalcPageShell
      base="/tools/budget"
      current="rent"
      categoryLabel="Budgeting & Income"
      eyebrow="Rent Affordability"
      title="How much rent can you afford?"
      dek="A simple, honest read on what fits your income, so rent leaves room for everything else."
    >
      <RentCalculator />
    </CalcPageShell>
  );
}
