import type { Metadata } from "next";
import CalcPageShell from "@/components/CalcPageShell";
import CreditCardCalculator from "@/components/CreditCardCalculator";

export const metadata: Metadata = {
  title: "Credit Card Payoff Calculator | Empower — Economic Mobility Project",
  description:
    "See how long it'll take to pay off a credit card (or what to pay each month to be done by a date) and the interest it costs.",
};

export default function CreditCardPage() {
  return (
    <CalcPageShell
      base="/tools/debt"
      current="credit-card"
      categoryLabel="Debt & Loans"
      eyebrow="Credit Card Payoff"
      title="Get that card to zero."
      dek="Pick a monthly payment and see when you'll be done, or set a deadline and see what it takes. Either way, see the interest you'll pay."
    >
      <CreditCardCalculator />
    </CalcPageShell>
  );
}
