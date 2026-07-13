import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import LoanCalculator, { type LoanConfig } from "@/components/LoanCalculator";

export const metadata: Metadata = {
  title: "Student Loan Calculator | Empower Students",
  description:
    "Your monthly student-loan payment and the total interest, over a 10-, 15-, or 20-year repayment.",
  alternates: { canonical: "/tools/college/student-loan" },
};

const config: LoanConfig = {
  storageKey: "studentLoan",
  cardTitle: "Your student loan",
  amountFields: [
    { key: "balance", label: "Total loan balance", placeholder: "20,000" },
  ],
  termPresets: [10, 15, 20],
  defaultTerm: "10",
  termUnit: "years",
  defaultRate: "6",
  rateLabel: "Interest rate (APR)",
  principalLabel: "Loan amount",
};

export default function Page() {
  return (
    <StudentToolShell
      title="Student Loan"
      dek="See your monthly payment and the total interest on your student loans. A longer term lowers the monthly payment but costs more overall."
    >
      <LoanCalculator config={config} />
    </StudentToolShell>
  );
}
