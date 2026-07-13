import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import BudgetCalculator from "@/components/BudgetCalculator";

export const metadata: Metadata = {
  title: "Budget Planner | Empower Students",
  description: "Take-home pay against real expenses, with a plain-language read on where you stand.",
  alternates: { canonical: "/tools/budget" },
};

export default function Page() {
  return (
    <StudentToolShell title="Budget Planner" dek="Take-home pay against real expenses, with a plain-language read on where you stand.">
      <BudgetCalculator />
    </StudentToolShell>
  );
}
