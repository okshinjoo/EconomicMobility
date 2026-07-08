"use client";

// Scrollytelling interlude for the compound-interest article (the NYT/Pudding
// pattern): a sticky chart panel + scroll-through steps. As each step enters
// the viewport, the chart reveals more of Maya's and Leo's real curves —
// $200/month at a 7% average annual return, computed right here with monthly
// compounding, the same scenario the article describes. No invented numbers.
// Reduced motion: the global rule neutralizes the reveal transitions; steps
// still swap content instantly.

import { useEffect, useRef, useState } from "react";
import AnimatedNumber from "@/components/AnimatedNumber";

const usd0 = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// ── The real math: ages 25 → 65, monthly steps ──────────────────────────────
const R = 0.07 / 12;
const MONTHS = 40 * 12; // age 25..65

function series(startM: number, stopM: number): number[] {
  // Contributes $200/mo between startM and stopM; compounds throughout.
  const out: number[] = [];
  let bal = 0;
  for (let m = 0; m <= MONTHS; m++) {
    if (m > 0) {
      bal *= 1 + R;
      if (m > startM && m <= stopM) bal += 200;
    }
    out.push(bal);
  }
  return out;
}

const MAYA = series(0, 120); // 25–35, then coasts
const LEO = series(120, MONTHS); // 35–65
const MAYA_35 = MAYA[120];
const MAYA_65 = MAYA[MONTHS];
const LEO_65 = LEO[MONTHS];
const Y_MAX = Math.max(MAYA_65, LEO_65) * 1.08;

const AGE_X = (m: number) => (m / MONTHS) * 100;
const VAL_Y = (v: number) => 92 - (v / Y_MAX) * 84;

function pathFor(data: number[]): string {
  const pts: string[] = [];
  for (let m = 0; m <= MONTHS; m += 6) {
    pts.push(`${pts.length ? "L" : "M"}${AGE_X(m).toFixed(2)},${VAL_Y(data[m]).toFixed(2)}`);
  }
  return pts.join(" ");
}
const MAYA_PATH = pathFor(MAYA);
const LEO_PATH = pathFor(LEO);

const MAYA_COLOR = "#e7a33c";
const LEO_COLOR = "#7fb3c8";

// Per step: how far each curve is revealed (as age) + the panel's readout.
const STEPS: {
  mayaAge: number;
  leoAge: number;
  focus: "none" | "maya" | "leo" | "both";
  caption: React.ReactNode;
}[] = [
  {
    mayaAge: 25,
    leoAge: 25,
    focus: "none",
    caption: (
      <>
        <strong>Meet Maya and Leo.</strong> Both will invest the same $200 a
        month, earning the article&apos;s 7% average-return example. The only
        difference between them is <em>when</em>.
      </>
    ),
  },
  {
    mayaAge: 35,
    leoAge: 25,
    focus: "maya",
    caption: (
      <>
        <strong>Maya starts at 25.</strong> She invests $200 a month for ten
        years, then stops at 35 and never adds another dollar. Total out of
        pocket: {usd0(24000)}.
      </>
    ),
  },
  {
    mayaAge: 65,
    leoAge: 25,
    focus: "maya",
    caption: (
      <>
        <strong>Then she just… waits.</strong> No new money for thirty years.
        Watch the curve anyway: compounding keeps working on what&apos;s
        already there.
      </>
    ),
  },
  {
    mayaAge: 65,
    leoAge: 65,
    focus: "leo",
    caption: (
      <>
        <strong>Leo starts at 35</strong> and never misses a month for thirty
        straight years. He puts in {usd0(72000)} — three times what Maya did.
      </>
    ),
  },
  {
    mayaAge: 65,
    leoAge: 65,
    focus: "both",
    caption: (
      <>
        <strong>At 65, Maya has more.</strong> Ten early years beat thirty
        later ones, on a third of the money. That gap is what this whole
        article is about — and it&apos;s why the best time to start is the
        year you&apos;re in.
      </>
    ),
  },
];

export default function CompoundStory() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = stepRefs.current.indexOf(e.target as HTMLDivElement);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const step = STEPS[active];
  const mayaNow = step.mayaAge === 25 ? 0 : step.mayaAge === 35 ? MAYA_35 : MAYA_65;
  const leoNow = step.leoAge === 25 ? 0 : LEO_65;
  const reveal = (age: number) => `${((age - 25) / 40) * 100}%`;

  return (
    <section
      aria-label="Maya and Leo, illustrated"
      className="my-12 rounded-2xl border-2 border-ink bg-forest text-cream shadow-[6px_6px_0_#11211c]"
    >
      <div className="grid gap-0 lg:grid-cols-[1fr_0.9fr]">
        {/* Sticky chart panel */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber">
              Scroll the story
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <div>
                <p className="flex items-center gap-1.5 text-xs font-semibold text-cream/70">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: MAYA_COLOR }} />
                  Maya · started at 25
                </p>
                <p
                  className="font-display text-2xl font-bold transition-opacity"
                  style={{ color: MAYA_COLOR, opacity: step.focus === "leo" ? 0.45 : 1 }}
                >
                  <AnimatedNumber value={mayaNow} format={usd0} />
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-xs font-semibold text-cream/70">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: LEO_COLOR }} />
                  Leo · started at 35
                </p>
                <p
                  className="font-display text-2xl font-bold transition-opacity"
                  style={{ color: LEO_COLOR, opacity: step.focus === "maya" ? 0.45 : 1 }}
                >
                  <AnimatedNumber value={leoNow} format={usd0} />
                </p>
              </div>
            </div>

            <svg viewBox="0 0 100 100" className="mt-4 w-full" style={{ height: 220 }} preserveAspectRatio="none" aria-hidden>
              {[VAL_Y(100000), VAL_Y(200000)].map((y, i) => (
                <line key={i} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              ))}
              <clipPath id="maya-clip">
                <rect x="0" y="0" height="100" width={reveal(step.mayaAge)} style={{ transition: "width 900ms cubic-bezier(0.3, 0.6, 0.3, 1)" }} />
              </clipPath>
              <clipPath id="leo-clip">
                <rect x="0" y="0" height="100" width={reveal(step.leoAge)} style={{ transition: "width 900ms cubic-bezier(0.3, 0.6, 0.3, 1)" }} />
              </clipPath>
              <path d={LEO_PATH} fill="none" stroke={LEO_COLOR} strokeWidth="2.5" vectorEffect="non-scaling-stroke" clipPath="url(#leo-clip)" />
              <path d={MAYA_PATH} fill="none" stroke={MAYA_COLOR} strokeWidth="2.5" vectorEffect="non-scaling-stroke" clipPath="url(#maya-clip)" />
              {/* Maya's stop marker */}
              <circle
                cx={AGE_X(120)}
                cy={VAL_Y(MAYA_35)}
                r="1.6"
                fill="#fbf8f1"
                opacity={step.mayaAge >= 35 ? 1 : 0}
                style={{ transition: "opacity 400ms ease 700ms" }}
              />
            </svg>
            <div className="mt-1.5 flex justify-between text-[11px] text-cream/50">
              {[25, 35, 45, 55, 65].map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
            <p className="mt-3 text-xs leading-5 text-cream/55">
              $200/month at a 7% average annual return, compounded monthly. A
              historical-average example, not a promise.
            </p>
          </div>
        </div>

        {/* Scroll steps */}
        <div className="border-t-2 border-ink/40 px-6 py-4 sm:px-8 lg:border-l-2 lg:border-t-0">
          {STEPS.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="flex min-h-[16rem] items-center py-6 lg:min-h-[19rem]"
            >
              <p
                className="text-base leading-7 transition-opacity duration-300 sm:text-lg sm:leading-8"
                style={{ opacity: active === i ? 1 : 0.35 }}
              >
                {s.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
