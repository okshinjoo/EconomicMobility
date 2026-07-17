"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendUp as TrendingUp,
  CreditCard,
  PiggyBank,
  GraduationCap,
  Percent,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import TiltCard from "@/components/TiltCard";
import CompoundChart, { type MathVariant } from "@/components/CompoundChart";

/** The math-band chart card + "More calculators" rail (owner ask July 17:
 *  hovering a rail calculator "should show a different visual"). One
 *  client component so the rail's hover state can drive the chart's
 *  variant; leaving the rail settles back on compound. Mouse-only —
 *  on touch the rail rows are plain links, and the chart stays compound.
 *  Renders as two grid children (fragment) inside the page's 12-col grid. */

const CALCS: Array<{
  name: string;
  hint: string;
  href: string;
  icon: Icon;
  variant: MathVariant;
}> = [
  { name: "Compound Interest", hint: "See money grow", href: "/tools/savings/compound", icon: TrendingUp, variant: "compound" },
  { name: "Debt Payoff", hint: "Snowball or avalanche", href: "/tools/debt", icon: CreditCard, variant: "debt" },
  { name: "Savings Goal", hint: "How long to get there", href: "/tools/savings", icon: PiggyBank, variant: "savings" },
  { name: "Student Loan", hint: "Real cost of borrowing", href: "/tools/college/student-loan", icon: GraduationCap, variant: "loan" },
  { name: "Tax Estimator", hint: "What you actually keep", href: "/tools/budget/paycheck", icon: Percent, variant: "tax" },
];

export default function MathShowcase({
  calculatorTotal,
}: {
  calculatorTotal: number;
}) {
  const [variant, setVariant] = useState<MathVariant>("compound");

  return (
    <>
      {/* The ONE 3D-tilt card sitewide (Base44-audit #9) — restraint
          is the point; don't add a second. */}
      <TiltCard className="rounded-lg border border-cream/10 bg-cream/5 p-6 md:col-span-5">
        <CompoundChart className="h-64" variant={variant} />
      </TiltCard>
      <div
        className="flex flex-col gap-2 md:col-span-3"
        onMouseLeave={() => setVariant("compound")}
      >
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-amber">
          More calculators
        </p>
        {CALCS.map((calc) => (
          <Link
            key={calc.name}
            href={calc.href}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setVariant(calc.variant);
            }}
            onFocus={() => setVariant(calc.variant)}
            className="group flex items-center gap-3 rounded-lg border border-cream/10 bg-cream/5 p-3 transition-colors hover:border-amber hover:bg-cream/10"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber/15 text-amber transition-colors group-hover:bg-amber group-hover:text-ink">
              <calc.icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium leading-tight text-cream">
                {calc.name}
              </span>
              <span className="block text-xs leading-tight text-cream/50">
                {calc.hint}
              </span>
            </span>
          </Link>
        ))}
        <Link
          href="/tools"
          className="mt-2 text-sm font-semibold text-cream underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
        >
          See all {calculatorTotal} calculators
        </Link>
      </div>
    </>
  );
}
