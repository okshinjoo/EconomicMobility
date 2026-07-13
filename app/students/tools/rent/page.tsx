import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import RentCalculator from "@/components/RentCalculator";

export const metadata: Metadata = {
  title: "Rent Affordability | Empower Students",
  description: "What rent comfortably fits your income, before you sign anything.",
  alternates: { canonical: "/tools/budget/rent" },
};

export default function Page() {
  return (
    <StudentToolShell title="Rent Affordability" dek="What rent comfortably fits your income, before you sign anything.">
      <RentCalculator />
    </StudentToolShell>
  );
}
