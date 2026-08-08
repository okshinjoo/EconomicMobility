"use client";

import { useState } from "react";
import { ArrowClockwise, ArrowSquareOut, Check, CircleNotch as Loader2, Warning } from "@phosphor-icons/react/dist/ssr";

interface RunScholarshipVerificationButtonProps {
  accessToken: string;
  scholarshipId: string;
}

export default function RunScholarshipVerificationButton({
  accessToken,
  scholarshipId,
}: RunScholarshipVerificationButtonProps) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ kind: "success" | "error"; text: string; workflowUrl?: string } | null>(null);

  async function runVerification() {
    setBusy(true);
    setResult(null);
    try {
      const response = await fetch("/api/admin/scholarship-verification", {
        method: "POST",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ scholarshipId }),
      });
      const body = (await response.json()) as { error?: string; workflowUrl?: string };
      if (!response.ok) throw new Error(body.error || "Verification could not be started.");
      setResult({
        kind: "success",
        text: "Verification started. Review new evidence here after the workflow finishes.",
        workflowUrl: body.workflowUrl,
      });
    } catch (error) {
      setResult({
        kind: "error",
        text: error instanceof Error ? error.message : "Verification could not be started.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => void runVerification()}
        disabled={busy || result?.kind === "success"}
        className="inline-flex items-center gap-1.5 rounded-md border border-forest bg-paper px-4 py-2.5 text-sm font-bold text-forest hover:bg-paper-deep disabled:opacity-50"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowClockwise className="h-4 w-4" />}
        {busy ? "Starting verification…" : result?.kind === "success" ? "Verification started" : "Run verification now"}
      </button>
      <p className="mt-2 text-sm leading-6 text-stone">Checks this scholarship only: official-source health, exact dates and status, and geography.</p>
      {result ? (
        <p className={`mt-2 flex items-start gap-2 text-sm font-semibold ${result.kind === "error" ? "text-terracotta" : "text-forest"}`} role={result.kind === "error" ? "alert" : "status"}>
          {result.kind === "error" ? <Warning className="mt-0.5 h-4 w-4 shrink-0" /> : <Check className="mt-0.5 h-4 w-4 shrink-0" />}
          <span>
            {result.text}{" "}
            {result.workflowUrl ? <a href={result.workflowUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline decoration-amber decoration-2 underline-offset-4">View workflow <ArrowSquareOut className="h-3.5 w-3.5" /></a> : null}
          </span>
        </p>
      ) : null}
    </div>
  );
}
