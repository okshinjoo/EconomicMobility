// Student-frame mirror (July 2026 full-containment pass): same calculator
// component as /tools/budget/jars, canonical points there, StudentHeader via the
// students layout. Shared localStorage keys mean numbers follow the visitor
// between frames.

import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import JarsCalculator from "@/components/JarsCalculator";

export const metadata: Metadata = {
  title: "Savings Jars | Empower Students",
  description: "Name your goals, give each one a jar, and watch them fill. Saved on your device, no account.",
  alternates: { canonical: "/tools/budget/jars" },
};

export default function Page() {
  return (
    <StudentToolShell title="Savings Jars" dek="Name your goals, give each one a jar, and watch them fill. Saved on your device, no account.">
      <JarsCalculator />
    </StudentToolShell>
  );
}
