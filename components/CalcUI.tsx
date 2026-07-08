// Shared building blocks for the calculator tools so they stay visually
// consistent (the Budget Planner predates this and keeps its own copies).

import { Plus, X, RotateCcw } from "lucide-react";

export const num = (v: string): number => {
  const n = parseFloat(v);
  return isNaN(n) || n < 0 ? 0 : n;
};

export const usd = (n: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

/** "3 yrs 2 mos", "8 months", etc. */
export function formatDuration(months: number): string {
  if (!isFinite(months)) return "—";
  const m = Math.max(0, Math.round(months));
  if (m === 0) return "now";
  const years = Math.floor(m / 12);
  const rem = m % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rem) parts.push(`${rem} mo${rem > 1 ? "s" : ""}`);
  return parts.join(" ");
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-ink bg-cream p-6 shadow-[5px_5px_0_#11211c] sm:p-7">
      {children}
    </div>
  );
}

export function SectionHeading({
  step,
  title,
  hint,
}: {
  step: number;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 flex-shrink-0 -rotate-2 items-center justify-center rounded-md border-2 border-ink bg-amber text-sm font-bold text-ink shadow-[2px_2px_0_#11211c]">
        {step}
      </span>
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      {hint && (
        <span className="ml-auto text-xs font-medium text-stone">{hint}</span>
      )}
    </div>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-ink">
      {children}
    </label>
  );
}

export function MoneyInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone">
        $
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode="decimal"
        placeholder={placeholder}
        className="w-full rounded-xl border border-sand bg-paper py-3 pl-8 pr-4 text-ink focus:border-amber focus:outline-none"
      />
    </div>
  );
}

export function PlainInput({
  value,
  onChange,
  placeholder,
  suffix,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  suffix?: string;
}) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode="decimal"
        placeholder={placeholder}
        className="w-full rounded-xl border border-sand bg-paper px-4 py-3 text-ink focus:border-amber focus:outline-none"
      />
      {suffix && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone">
          {suffix}
        </span>
      )}
    </div>
  );
}

export function AddButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors hover:text-ink"
    >
      <Plus className="h-4 w-4" />
      {label}
    </button>
  );
}

export function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Remove"
      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-stone transition-colors hover:bg-terracotta/10 hover:text-terracotta"
    >
      <X className="h-4 w-4" />
    </button>
  );
}

export function ResultRow({
  label,
  value,
  strong,
  muted,
  accent,
  tone,
}: {
  label: string;
  value: string;
  strong?: boolean;
  muted?: boolean;
  accent?: boolean;
  tone?: "good" | "bad";
}) {
  const valueColor = accent
    ? "text-amber"
    : tone === "good"
      ? "text-forest"
      : tone === "bad"
        ? "text-terracotta"
        : "text-cream";
  return (
    <div className="flex items-center justify-between">
      <dt className={muted ? "text-cream/55" : "text-cream/80"}>{label}</dt>
      <dd
        className={`${strong ? "font-display text-base font-bold" : "font-medium"} ${valueColor}`}
      >
        {value}
      </dd>
    </div>
  );
}

export function ClearBar({ onClear }: { onClear: () => void }) {
  return (
    <div className="mt-4 flex flex-col gap-3 px-1">
      <p className="text-xs leading-5 text-stone">
        Estimates only, for planning. Not financial advice.
      </p>
      <div className="flex items-center justify-between gap-3 border-t border-sand pt-3">
        <span className="text-xs text-stone">
          Saved on this device only; no account needed.
        </span>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex flex-shrink-0 items-center gap-1.5 text-xs font-semibold text-stone transition-colors hover:text-terracotta"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear
        </button>
      </div>
    </div>
  );
}
