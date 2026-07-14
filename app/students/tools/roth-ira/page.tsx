// Student-frame mirror (July 2026 full-containment pass): same calculator
// component as /tools/savings/roth-ira, canonical points there, StudentHeader via the
// students layout. Shared localStorage keys mean numbers follow the visitor
// between frames.

import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import RothIraCalculator from "@/components/RothIraCalculator";

export const metadata: Metadata = {
  title: "Roth IRA Calculator | Empower Students",
  description: "See what steady contributions could become, all tax-free, and how much a Roth beats a taxable account.",
  alternates: { canonical: "/tools/savings/roth-ira" },
};

export default function Page() {
  return (
    <StudentToolShell title="Roth IRA Calculator" dek="See what steady contributions could become, all tax-free, and how much a Roth beats a taxable account.">
      <RothIraCalculator />
    </StudentToolShell>
  );
}
