"use client";

import { useEffect, useMemo, useState } from "react";
import { GraduationCap } from "lucide-react";
import {
  estimateCollege,
  COLLEGE_REPAY_YEARS,
} from "@/lib/collegeCost";
import { STORAGE_KEYS, loadJSON, saveJSON, removeStored } from "@/lib/storage";
import { Donut, Legend } from "@/components/Charts";
import {
  Card,
  SectionHeading,
  Label,
  MoneyInput,
  PlainInput,
  ResultRow,
  ClearBar,
  num,
  usd,
} from "@/components/CalcUI";

interface Snapshot {
  costPerYear: string;
  years: string;
  grants: string;
  family: string;
  work: string;
}

export default function CollegeCalculator() {
  const [costPerYear, setCostPerYear] = useState("");
  const [years, setYears] = useState("4");
  const [grants, setGrants] = useState("");
  const [family, setFamily] = useState("");
  const [work, setWork] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const s = loadJSON<Snapshot>(STORAGE_KEYS.college);
    if (s) {
      setCostPerYear(s.costPerYear ?? "");
      setYears(s.years ?? "4");
      setGrants(s.grants ?? "");
      setFamily(s.family ?? "");
      setWork(s.work ?? "");
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveJSON(STORAGE_KEYS.college, {
      costPerYear,
      years,
      grants,
      family,
      work,
    });
  }, [loaded, costPerYear, years, grants, family, work]);

  function handleClear() {
    removeStored(STORAGE_KEYS.college);
    setCostPerYear("");
    setYears("4");
    setGrants("");
    setFamily("");
    setWork("");
  }

  const result = useMemo(
    () =>
      estimateCollege({
        costPerYear: num(costPerYear),
        years: num(years),
        grantsPerYear: num(grants),
        familyPerYear: num(family),
        workPerYear: num(work),
      }),
    [costPerYear, years, grants, family, work]
  );

  const hasCost = num(costPerYear) > 0 && num(years) > 0;
  const fullyCovered = hasCost && result.totalLoans <= 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <Card>
          <SectionHeading step={1} title="The cost" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Cost of attendance, per year</Label>
              <MoneyInput
                value={costPerYear}
                onChange={setCostPerYear}
                placeholder="25,000"
              />
            </div>
            <div>
              <Label>How many years?</Label>
              <PlainInput value={years} onChange={setYears} placeholder="4" suffix="yrs" />
            </div>
          </div>
          <p className="mt-3 text-xs text-stone">
            Cost of attendance is the full yearly price before any aid: tuition,
            fees, housing, food, and books.
          </p>
        </Card>

        <Card>
          <SectionHeading
            step={2}
            title="What covers it"
            hint="Per year"
          />
          <div className="mt-5 space-y-4">
            <div>
              <Label>Grants &amp; scholarships</Label>
              <MoneyInput
                value={grants}
                onChange={setGrants}
                placeholder="10,000"
              />
              <p className="mt-1.5 text-xs text-stone">
                Free money you don&apos;t pay back.
              </p>
            </div>
            <div>
              <Label>Family &amp; savings</Label>
              <MoneyInput
                value={family}
                onChange={setFamily}
                placeholder="5,000"
              />
            </div>
            <div>
              <Label>Money from working</Label>
              <MoneyInput value={work} onChange={setWork} placeholder="3,000" />
            </div>
          </div>
        </Card>
      </div>

      {/* Result */}
      <div className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-3xl border border-ink-600 bg-ink text-cream shadow-xl">
          <div className="border-b border-ink-600 bg-gradient-to-br from-ink-700 to-ink p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
              {fullyCovered ? "You're covered" : "Likely loans needed"}
            </p>
            <p className="mt-2 font-display text-5xl font-bold">
              {hasCost ? usd(result.totalLoans) : "$0"}
            </p>
            <p className="mt-1 text-sm text-cream/70">
              {!hasCost
                ? "Enter a cost to start"
                : fullyCovered
                  ? "No loans needed. Nicely done."
                  : `to fill a ${usd(result.gapPerYear)}/yr gap over ${num(
                      years
                    )} years`}
            </p>
          </div>

          {hasCost && (
            <div className="p-7">
              <dl className="space-y-2.5 text-sm">
                <ResultRow
                  label={`Total cost (${num(years)} yrs)`}
                  value={usd(result.totalCost)}
                  strong
                />
                <ResultRow
                  label="Covered by aid & savings"
                  value={`– ${usd(result.totalAid)}`}
                  tone="good"
                />
                <div className="border-t border-ink-600 pt-2.5">
                  <ResultRow
                    label="Gap to cover"
                    value={usd(result.totalLoans)}
                    strong
                    accent
                  />
                </div>
              </dl>

              <div className="mt-7 flex items-center gap-5">
                <Donut
                  segments={[
                    {
                      value: result.totalAid,
                      color: "var(--color-forest)",
                      label: "Aid & savings",
                    },
                    {
                      value: result.totalLoans,
                      color: "var(--color-terracotta)",
                      label: "Loans",
                    },
                  ]}
                  centerTop={`${Math.round(result.coveredShare * 100)}%`}
                  centerSub="covered"
                />
                <div className="min-w-0 flex-1">
                  <p className="mb-3 text-xs font-medium text-cream/55">
                    How the cost is covered
                  </p>
                  <Legend
                    items={[
                      {
                        color: "var(--color-forest)",
                        label: "Aid & savings",
                        value: usd(result.totalAid),
                      },
                      {
                        color: "var(--color-terracotta)",
                        label: "Loans (gap)",
                        value: usd(result.totalLoans),
                      },
                    ]}
                  />
                </div>
              </div>

              {!fullyCovered && (
                <>
                  <div className="mt-5 rounded-xl border border-amber/40 bg-amber/10 p-3.5">
                    <p className="text-sm font-bold text-amber">
                      About {usd(result.monthlyRepayment)}/mo after graduation
                    </p>
                    <p className="mt-1 text-xs leading-5 text-cream/75">
                      That&apos;s a rough monthly payment to repay{" "}
                      {usd(result.totalLoans)} in loans over{" "}
                      {COLLEGE_REPAY_YEARS} years, about{" "}
                      {usd(result.totalRepaid)} in total.
                    </p>
                  </div>
                  <div className="mt-3 flex items-start gap-3 rounded-xl border border-forest/40 bg-forest/10 p-3.5">
                    <GraduationCap className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest" />
                    <p className="text-xs leading-5 text-cream/80">
                      Every extra scholarship dollar shrinks this gap
                      one-for-one, and unlike loans, you never pay it back.
                      It&apos;s worth the applications.
                    </p>
                  </div>
                </>
              )}

              {fullyCovered && (
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-forest/40 bg-forest/10 p-3.5">
                  <GraduationCap className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest" />
                  <p className="text-xs leading-5 text-cream/80">
                    Your aid, savings, and work cover the full cost, so you may
                    not need loans at all.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <ClearBar onClear={handleClear} />
      </div>
    </div>
  );
}
