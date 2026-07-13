"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { num, usd, Label, MoneyInput, PlainInput } from "@/components/CalcUI";
import { STORAGE_KEYS, loadJSON, saveJSON } from "@/lib/storage";
import { frameHref } from "@/lib/frame";
import { useFrame } from "@/components/useFrame";

interface Jar {
  id: number;
  name: string;
  goal: string;
  saved: string;
}

const JAR_COLORS = ["#c9842a", "#157a5a", "#b7593f", "#3f6478", "#0f7d74", "#d26a4c"];

const STARTER: Jar[] = [
  { id: 1, name: "Emergency fund", goal: "500", saved: "" },
];

export default function JarsCalculator() {
  const frame = useFrame();
  const [jars, setJars] = useState<Jar[]>(STARTER);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadJSON<Jar[]>(STORAGE_KEYS.jars);
    if (saved?.length) setJars(saved);
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) saveJSON(STORAGE_KEYS.jars, jars);
  }, [jars, loaded]);

  const update = (id: number, patch: Partial<Jar>) =>
    setJars((prev) => prev.map((j) => (j.id === id ? { ...j, ...patch } : j)));
  const remove = (id: number) => setJars((prev) => prev.filter((j) => j.id !== id));
  const add = () =>
    setJars((prev) => [
      ...prev,
      { id: Math.max(0, ...prev.map((j) => j.id)) + 1, name: "", goal: "", saved: "" },
    ]);

  const totals = jars.reduce(
    (acc, j) => ({ saved: acc.saved + num(j.saved), goal: acc.goal + num(j.goal) }),
    { saved: 0, goal: 0 }
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-6 pb-20">
      {/* Totals strip */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 rounded-2xl bg-forest px-6 py-5 text-cream">
        <p className="text-sm font-semibold uppercase tracking-wide text-cream/70">
          All jars together
        </p>
        <p className="font-display text-2xl font-bold tabular-nums">
          <span className="text-amber">{usd(totals.saved)}</span>
          <span className="text-cream/50"> of {usd(totals.goal)}</span>
        </p>
      </div>

      {/* Jars */}
      <div className="space-y-4">
        {jars.map((jar, i) => {
          const color = JAR_COLORS[i % JAR_COLORS.length];
          const goal = num(jar.goal);
          const saved = num(jar.saved);
          const pct = goal > 0 ? Math.min(1, saved / goal) : 0;
          const done = goal > 0 && saved >= goal;
          return (
            <div
              key={jar.id}
              className={`rounded-2xl bg-cream p-5 sm:p-6 ${done ? "card-ink" : "border-2 border-ink shadow-[3px_3px_0_#11211c]"}`}
              style={done ? { background: `${color}0d` } : undefined}
            >
              <div className="grid gap-4 sm:grid-cols-[1.2fr_0.9fr_0.9fr_auto] sm:items-end">
                <div>
                  <Label>What&apos;s it for?</Label>
                  <PlainInput
                    value={jar.name}
                    onChange={(v) => update(jar.id, { name: v })}
                    placeholder="e.g. Car repairs, holiday gifts, moving out"
                  />
                </div>
                <div>
                  <Label>Goal</Label>
                  <MoneyInput
                    value={jar.goal}
                    onChange={(v) => update(jar.id, { goal: v })}
                    placeholder="500"
                  />
                </div>
                <div>
                  <Label>Saved so far</Label>
                  <MoneyInput
                    value={jar.saved}
                    onChange={(v) => update(jar.id, { saved: v })}
                    placeholder="0"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => remove(jar.id)}
                  aria-label={`Remove ${jar.name || "jar"}`}
                  className="mb-1 inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-sand text-stone transition-colors hover:border-terracotta hover:text-terracotta"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Fill line */}
              <div className="mt-4">
                <div className="h-3 w-full overflow-hidden rounded-full bg-sand">
                  <div
                    className="h-full rounded-full transition-[width] duration-500"
                    style={{ width: `${pct * 100}%`, background: color }}
                  />
                </div>
                <p className="mt-1.5 text-xs font-semibold" style={{ color }}>
                  {done
                    ? `Full. ${jar.name ? `${jar.name} is` : "This one's"} funded.`
                    : goal > 0
                      ? `${Math.round(pct * 100)}% there${saved > 0 ? ` (${usd(goal - saved)} to go)` : ""}`
                      : "Set a goal to see the fill line"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={add}
        className="btn-ink inline-flex items-center gap-2 rounded-md bg-amber px-6 py-3 text-sm font-bold text-ink"
      >
        <Plus className="h-4 w-4" />
        Add a jar
      </button>

      <p className="rounded-2xl border border-sand bg-cream p-5 text-sm leading-6 text-stone">
        Jars are the {""}
        <Link href={frameHref("/learn/budgeting/sinking-funds", frame)} className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
          sinking funds
        </Link>{" "}
        idea made visible: every predictable &ldquo;surprise&rdquo; gets its own
        goal, so one bill never wrecks a month. Update the saved amounts
        whenever you move money; this page remembers them on this device.
      </p>
    </div>
  );
}
