import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import CompareOffersCalculator from "@/components/CompareOffersCalculator";

export const metadata: Metadata = {
  title: "Compare Aid Offers | Empower Students",
  description: "Two award letters, side by side, on net price instead of sticker price.",
  alternates: { canonical: "/tools/college/compare-offers" },
};

export default function Page() {
  return (
    <StudentToolShell title="Compare Aid Offers" dek="Two award letters, side by side, on net price instead of sticker price.">
      <CompareOffersCalculator />
    </StudentToolShell>
  );
}
