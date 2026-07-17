"use client";

import { useRef, useState } from "react";
import { DownloadSimple as Download, UploadSimple as Upload, Check } from "@phosphor-icons/react/dist/ssr";

// Everything on this site saves to the browser (no accounts). This lets a
// reader carry that with them: export every empower:* key to a JSON file,
// or restore one on a new device/browser.

export default function DataBackup() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "restored" | "error">("idle");

  const exportData = () => {
    const data: Record<string, unknown> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("empower:")) {
        try {
          data[key] = JSON.parse(localStorage.getItem(key) ?? "null");
        } catch {
          data[key] = localStorage.getItem(key);
        }
      }
    }
    const blob = new Blob(
      [JSON.stringify({ exportedAt: new Date().toISOString(), data }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "empower-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text());
      const entries = Object.entries(parsed.data ?? {});
      const valid = entries.filter(([k]) => k.startsWith("empower:"));
      if (valid.length === 0) throw new Error("no data");
      for (const [k, v] of valid) {
        localStorage.setItem(k, JSON.stringify(v));
      }
      setStatus("restored");
      setTimeout(() => window.location.reload(), 900);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="card-ink rounded-2xl bg-cream p-6">
      <h2 className="font-display text-lg font-semibold text-ink">
        Your progress, portable
      </h2>
      <p className="mt-2 text-sm leading-6 text-stone">
        Everything here saves to this browser only: read history, badges,
        quiz results, calculator inputs. Download a backup to keep it, or
        restore one on a new device.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={exportData}
          className="btn-ink inline-flex items-center gap-2 rounded-md bg-amber px-5 py-2.5 text-sm font-bold text-ink"
        >
          <Download className="h-4 w-4" />
          Download my data
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-md border-2 border-ink bg-cream px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-paper-deep"
        >
          {status === "restored" ? <Check className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
          {status === "restored" ? "Restored" : "Restore a backup"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) importData(f);
            e.target.value = "";
          }}
        />
      </div>
      {status === "error" && (
        <p className="mt-3 text-sm font-medium text-terracotta">
          That file didn&apos;t look like an Empower backup. Nothing was changed.
        </p>
      )}
    </div>
  );
}
