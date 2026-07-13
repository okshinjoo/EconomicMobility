// Student-frame mirror (July 2026 full-containment pass): same calculator
// component as /tools/debt/credit-card, canonical points there. Shared localStorage keys
// mean numbers follow the visitor between frames.

import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import CreditCardCalculator from "@/components/CreditCardCalculator";

export const metadata: Metadata = {
  title: "Credit Card Payoff | Empower Students",
  description: "Get that card to zero: what your payment really covers, and how much faster extra gets you there.",
  alternates: { canonical: "/tools/debt/credit-card" },
};

export default function Page() {
  return (
    <StudentToolShell title="Credit Card Payoff" dek="Get that card to zero: what your payment really covers, and how much faster extra gets you there.">
      <CreditCardCalculator />
    </StudentToolShell>
  );
}
