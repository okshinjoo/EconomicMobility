// Student-frame mirror (July 2026 full-containment pass): same calculator
// component as /tools/savings, canonical points there, StudentHeader via the
// students layout. Shared localStorage keys mean numbers follow the visitor
// between frames.

import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import SavingsCalculator from "@/components/SavingsCalculator";

export const metadata: Metadata = {
  title: "Savings Goal Calculator | Empower Students",
  description: "Set a goal and see exactly what it takes — by deadline or by monthly amount.",
  alternates: { canonical: "/tools/savings" },
};

export default function Page() {
  return (
    <StudentToolShell title="Savings Goal Calculator" dek="Set a goal and see exactly what it takes — by deadline or by monthly amount.">
      <SavingsCalculator />
    </StudentToolShell>
  );
}
