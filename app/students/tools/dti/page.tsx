// Student-frame mirror (July 2026 full-containment pass): same calculator
// component as /tools/debt/dti, canonical points there. Shared localStorage keys
// mean numbers follow the visitor between frames.

import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import DtiCalculator from "@/components/DtiCalculator";

export const metadata: Metadata = {
  title: "Debt-to-Income | Empower Students",
  description: "The number lenders look at: your monthly debt against your monthly income.",
  alternates: { canonical: "/tools/debt/dti" },
};

export default function Page() {
  return (
    <StudentToolShell title="Debt-to-Income" dek="The number lenders look at: your monthly debt against your monthly income.">
      <DtiCalculator />
    </StudentToolShell>
  );
}
