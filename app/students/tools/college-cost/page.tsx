import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import CollegeCalculator from "@/components/CollegeCalculator";

export const metadata: Metadata = {
  title: "College Cost | Empower Students",
  description: "The gap left after aid, and what the loans to fill it really cost.",
  alternates: { canonical: "/tools/college" },
};

export default function Page() {
  return (
    <StudentToolShell title="College Cost" dek="The gap left after aid, and what the loans to fill it really cost.">
      <CollegeCalculator />
    </StudentToolShell>
  );
}
