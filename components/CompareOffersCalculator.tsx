"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  num,
  usd,
  Card,
  Label,
  MoneyInput,
  PlainInput,
  ClearBar,
} from "@/components/CalcUI";
import { STORAGE_KEYS, loadJSON, saveJSON, removeStored } from "@/lib/storage";

interface Offer {
  school: string;
  coa: string; // total cost of attendance
  grants: string; // grants + scholarships (free money)
  workStudy: string;
  loans: string; // loans offered in the letter
}

const EMPTY: Offer = { school: "", coa: "", grants: "", workStudy: "", loans: "" };

interface Snapshot {
  a: Offer;
  b: Offer;
}

function results(o: Offer) {
  const coa = num(o.coa);
  const grants = num(o.grants);
  const workStudy = num(o.workStudy);
  const loans = num(o.loans);
  const netPrice = Math.max(0, coa - grants); // what the year truly costs
  const gap = Math.max(0, netPrice - workStudy - loans); // still unfunded
  return { coa, grants, workStudy, loans, netPrice, gap };
}

function OfferColumn({
  label,
  offer,
  onChange,
}: {
  label: string;
  offer: Offer;
  onChange: (o: Offer) => void;
}) {
  const set = (key: keyof Offer) => (v: string) => onChange({ ...offer, [key]: v });
  return (
    <Card>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">
        {label}
      </p>
      <div className="mt-4 space-y-4">
        <div>
          <Label>School name</Label>
          <PlainInput value={offer.school} onChange={set("school")} placeholder={label === "Offer A" ? "e.g. State U" : "e.g. Private College"} />
        </div>
        <div>
          <Label>Total cost of attendance (per year)</Label>
          <MoneyInput value={offer.coa} onChange={set("coa")} placeholder="28,000" />
          <p className="mt-1 text-xs text-stone">
            The letter&apos;s full sticker: tuition, fees, housing, food, books.
          </p>
        </div>
        <div>
          <Label>Grants + scholarships</Label>
          <MoneyInput value={offer.grants} onChange={set("grants")} placeholder="12,000" />
          <p className="mt-1 text-xs text-stone">Free money only. You never pay this back.</p>
        </div>
        <div>
          <Label>Work-study offered</Label>
          <MoneyInput value={offer.workStudy} onChange={set("workStudy")} placeholder="2,000" />
        </div>
        <div>
          <Label>Loans offered</Label>
          <MoneyInput value={offer.loans} onChange={set("loans")} placeholder="5,500" />
          <p className="mt-1 text-xs text-stone">
            Loans are not aid. They lower today&apos;s bill and become your debt.
          </p>
        </div>
      </div>
    </Card>
  );
}

export default function CompareOffersCalculator() {
  const [a, setA] = useState<Offer>(EMPTY);
  const [b, setB] = useState<Offer>(EMPTY);

  useEffect(() => {
    const saved = loadJSON<Snapshot>(STORAGE_KEYS.compareOffers);
    if (saved?.a) {
      setA({ ...EMPTY, ...saved.a });
      setB({ ...EMPTY, ...saved.b });
    }
  }, []);
  useEffect(() => {
    saveJSON(STORAGE_KEYS.compareOffers, { a, b } satisfies Snapshot);
  }, [a, b]);

  const ra = useMemo(() => results(a), [a]);
  const rb = useMemo(() => results(b), [b]);
  const ready = ra.coa > 0 && rb.coa > 0;

  const nameA = a.school.trim() || "Offer A";
  const nameB = b.school.trim() || "Offer B";
  const cheaper = ra.netPrice <= rb.netPrice ? nameA : nameB;
  const diff = Math.abs(ra.netPrice - rb.netPrice);

  const clear = () => {
    setA(EMPTY);
    setB(EMPTY);
    removeStored(STORAGE_KEYS.compareOffers);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 pb-20">
      <div className="grid gap-6 lg:grid-cols-2">
        <OfferColumn label="Offer A" offer={a} onChange={setA} />
        <OfferColumn label="Offer B" offer={b} onChange={setB} />
      </div>

      {/* Verdict */}
      <div className="rounded-2xl bg-forest p-6 text-cream sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
          The honest comparison
        </p>
        {!ready ? (
          <p className="mt-3 text-base leading-7 text-cream/75">
            Fill in both offers and the real numbers appear here. The one to
            watch is <span className="font-semibold text-cream">net price</span>:
            cost of attendance minus free money. Everything else is financing.
          </p>
        ) : (
          <>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { name: nameA, r: ra },
                { name: nameB, r: rb },
              ].map(({ name, r }) => (
                <div key={name} className="rounded-xl bg-forest-700 p-5">
                  <p className="font-display text-lg font-semibold">{name}</p>
                  <div className="mt-3 space-y-1.5 text-sm">
                    <p className="flex justify-between gap-4">
                      <span className="text-cream/70">Sticker price</span>
                      <span className="tabular-nums">{usd(r.coa)}</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span className="text-cream/70">Free money</span>
                      <span className="tabular-nums text-emerald-300">−{usd(r.grants)}</span>
                    </p>
                    <p className="flex justify-between gap-4 border-t border-white/10 pt-1.5 font-semibold">
                      <span>Net price / year</span>
                      <span className="tabular-nums text-amber">{usd(r.netPrice)}</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span className="text-cream/70">After work-study + loans</span>
                      <span className="tabular-nums">{usd(r.gap)} still unfunded</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-base leading-7 text-cream/85">
              {diff < 500 ? (
                <>
                  On net price these offers are basically tied. Compare the
                  loans instead: {nameA} asks you to borrow{" "}
                  <span className="font-semibold text-cream">{usd(ra.loans)}</span>{" "}
                  a year, {nameB}{" "}
                  <span className="font-semibold text-cream">{usd(rb.loans)}</span>.
                </>
              ) : (
                <>
                  <span className="font-semibold text-amber">{cheaper}</span>{" "}
                  really costs{" "}
                  <span className="font-semibold text-cream">{usd(diff)}</span>{" "}
                  less per year once free money is counted. Over four years
                  that&apos;s{" "}
                  <span className="font-semibold text-cream">{usd(diff * 4)}</span>,
                  before any aid changes.
                </>
              )}
            </p>
            <p className="mt-3 text-sm leading-6 text-cream/60">
              Aid letters use different labels for the same things, and grants
              can change after year one. Confirm what renews.
            </p>
          </>
        )}
      </div>

      <div className="rounded-2xl border border-sand bg-cream p-5 text-sm leading-6 text-stone">
        Reading the letters themselves:{" "}
        <Link href="/learn/college/reading-aid-award-letter" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
          Reading a Financial Aid Award Letter
        </Link>{" "}
        · If neither offer works:{" "}
        <Link href="/learn/college/appealing-financial-aid" className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink">
          How to Appeal Your Financial Aid
        </Link>
      </div>

      <ClearBar onClear={clear} />
    </div>
  );
}
