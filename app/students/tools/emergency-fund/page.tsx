import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import EmergencyFundCalculator from "@/components/EmergencyFundCalculator";

export const metadata: Metadata = {
  title: "Emergency Fund | Empower Students",
  description: "How big yours should be, and how long it will take to build.",
  alternates: { canonical: "/tools/budget/emergency-fund" },
};

export default function Page() {
  return (
    <StudentToolShell title="Emergency Fund" dek="How big yours should be, and how long it will take to build.">
      <EmergencyFundCalculator />
    </StudentToolShell>
  );
}
