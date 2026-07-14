// Student-frame mirror (July 2026 full-containment pass): same calculator
// component as /tools/budget/net-worth, canonical points there, StudentHeader via the
// students layout. Shared localStorage keys mean numbers follow the visitor
// between frames.

import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import NetWorthCalculator from "@/components/NetWorthCalculator";

export const metadata: Metadata = {
  title: "Net Worth | Empower Students",
  description: "What you own minus what you owe: one honest number to retake every month.",
  alternates: { canonical: "/tools/budget/net-worth" },
};

export default function Page() {
  return (
    <StudentToolShell title="Net Worth" dek="What you own minus what you owe: one honest number to retake every month.">
      <NetWorthCalculator />
    </StudentToolShell>
  );
}
