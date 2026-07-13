import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import PaycheckCalculator from "@/components/PaycheckCalculator";

export const metadata: Metadata = {
  title: "Paycheck Calculator | Empower Students",
  description: "What a campus job actually pays after taxes, from salary or hourly.",
  alternates: { canonical: "/tools/budget/paycheck" },
};

export default function Page() {
  return (
    <StudentToolShell title="Paycheck Calculator" dek="What a campus job actually pays after taxes, from salary or hourly.">
      <PaycheckCalculator />
    </StudentToolShell>
  );
}
