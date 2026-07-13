// Student-frame mirror (July 2026 full-containment pass): same calculator
// component as /tools/debt, canonical points there, StudentHeader via the
// students layout. Shared localStorage keys mean numbers follow the visitor
// between frames.

import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import DebtCalculator from "@/components/DebtCalculator";

export const metadata: Metadata = {
  title: "Debt Payoff Calculator | Empower Students",
  description: "List what you owe, add whatever extra you can spare, and see your debt-free date.",
  alternates: { canonical: "/tools/debt" },
};

export default function Page() {
  return (
    <StudentToolShell title="Debt Payoff Calculator" dek="List what you owe, add whatever extra you can spare, and see your debt-free date.">
      <DebtCalculator />
    </StudentToolShell>
  );
}
