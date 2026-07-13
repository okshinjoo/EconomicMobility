// Student-frame mirror (July 2026 full-containment pass): same calculator
// component as /tools/letters, canonical points there, StudentHeader via the
// students layout. Shared localStorage keys mean numbers follow the visitor
// between frames.

import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import LetterGenerator from "@/components/LetterGenerator";

export const metadata: Metadata = {
  title: "Letter Generator | Empower Students",
  description: "Credit-dispute and debt-validation letters, built in your browser on the CFPB sample structure.",
  alternates: { canonical: "/tools/letters" },
};

export default function Page() {
  return (
    <StudentToolShell title="Letter Generator" dek="Credit-dispute and debt-validation letters, built in your browser on the CFPB sample structure.">
      <LetterGenerator />
    </StudentToolShell>
  );
}
