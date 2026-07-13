import type { Metadata } from "next";
import StudentToolShell from "@/components/StudentToolShell";
import RealityCheckTool from "@/components/RealityCheckTool";

export const metadata: Metadata = {
  title: "Reality Check | Empower Students",
  description: "Pick the life you want and see the salary it takes to fund it.",
  alternates: { canonical: "/tools/budget/reality-check" },
};

export default function Page() {
  return (
    <StudentToolShell title="Reality Check" dek="Pick the life you want and see the salary it takes to fund it.">
      <RealityCheckTool />
    </StudentToolShell>
  );
}
