import type { Metadata } from "next";
import CalcPageShell from "@/components/CalcPageShell";
import CompareOffersCalculator from "@/components/CompareOffersCalculator";

export const metadata: Metadata = {
  title: "Compare Aid Offers | Empower — Economic Mobility Project",
  description:
    "Put two financial aid award letters side by side and see the real net price of each school, with loans counted as loans instead of aid.",
};

export default function CompareOffersPage() {
  return (
    <CalcPageShell
      base="/tools/college"
      current="compare-offers"
      categoryLabel="College"
      eyebrow="Compare Aid Offers"
      title="Which offer is actually better?"
      dek="Award letters are written to be hard to compare. Put two side by side and this shows the real net price of each, with loans counted as what they are."
    >
      <CompareOffersCalculator />
    </CalcPageShell>
  );
}
