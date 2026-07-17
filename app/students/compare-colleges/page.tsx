// Compare Colleges — LIVE (July 16, 2026; the July 13 parked preview ships).
// Owner ask: "some are need blind, some aren't — some consider religious
// affiliation, some are more holistic than others" — a tool around exactly
// that. Facts only, no rankings (house rule): CDS C7 factors, admit rates,
// need policy, test policy, published GPA notes. Data in lib/collegeProfiles
// (year-tagged, null = not published, re-verify each cycle). Student-native
// page (no main twin) — the layout provides StudentHeader.

import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ScrollDrift from "@/components/ScrollDrift";
import TopicMark from "@/components/TopicMark";
import HeadlineRise from "@/components/HeadlineRise";
import CollegeCompare from "@/components/CollegeCompare";
import { colleges, COLLEGE_DATA_VINTAGE } from "@/lib/collegeProfiles";

export const metadata: Metadata = {
  title: "Compare Colleges | Empower — Economic Mobility Project",
  description:
    "Compare colleges by what they actually look for: Common Data Set factors, admit rates, need-blind and full-need aid policies, test policies, and religious affiliation — facts, not rankings.",
};

const GUIDES = [
  {
    title: "How Colleges Read Applications",
    dek: "Holistic vs. formula, the Common Data Set, and what “demonstrated interest” means.",
    href: "/students/learn/college/how-colleges-read-applications",
  },
  {
    title: "Need-Blind Colleges, Explained",
    dek: "What need-blind really promises — and the short list that extends it to international students.",
    href: "/students/learn/college/need-blind-colleges",
  },
  {
    title: "Religious Colleges & Money",
    dek: "Faith, fit, and financial aid — what changes at a religiously affiliated school.",
    href: "/students/learn/college/religious-colleges-and-money",
  },
  {
    title: "Schools With Generous Aid",
    dek: "The colleges whose aid policies beat their sticker price by a mile.",
    href: "/students/learn/college/schools-with-generous-aid",
  },
];

export default function CompareCollegesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Hero — C voice on forest, with the sitewide letter-reveal accent */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <ScrollDrift range={52} driftX={-18} rotate={3}>
          <TopicMark
            id="college"
            color="#fbf8f1"
            className="pointer-events-none absolute -right-16 -top-12 h-[24rem] w-[24rem] opacity-[0.13]"
          />
        </ScrollDrift>
        <div className="relative mx-auto max-w-6xl px-6 py-14 lg:py-20">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber">
            For Students · Tool
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.98] tracking-tight sm:text-6xl">
            Every college is looking for{" "}
            <span className="italic text-amber">
              <HeadlineRise chars>someone.</HeadlineRise>
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/75">
            Some are need-blind, some aren&apos;t. Some read every essay twice;
            some admit on a GPA formula and never see one. Some weigh faith,
            legacy, or an interview — and some tell you outright those count
            for nothing. Compare what each college actually says it looks for.
          </p>
          <p className="mt-4 text-sm font-semibold text-cream/60">
            {colleges.length} colleges · built from each school&apos;s own
            Common Data Set · no rankings, just published facts
          </p>
        </div>
      </section>

      {/* How to read this — the honesty box */}
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <p className="max-w-3xl text-sm leading-6 text-stone">
            <span className="font-bold text-ink">How to read this:</span>{" "}
            figures come from each college&apos;s Common Data Set (the form
            nearly every college files — section C7 is &ldquo;what we
            weigh&rdquo;), admissions releases, and aid pages, from the{" "}
            {COLLEGE_DATA_VINTAGE} unless noted. Admit rates drift every year;
            treat a point or two as noise. A &ldquo;—&rdquo; means the college
            doesn&apos;t publish that number, not that it doesn&apos;t matter.{" "}
            Every school's figures were re-verified against official sources
            (CDS filings, .edu pages, federal College Scorecard) in July 2026.
          </p>
        </div>
      </section>

      {/* The tool */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <CollegeCompare />
        </div>
      </section>

      {/* The guides behind the tool */}
      <section className="border-t-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Understand what you&apos;re seeing
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
            The guides behind this tool
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {GUIDES.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="card-ink group flex h-full flex-col rounded-xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
              >
                <h3 className="font-display text-base font-bold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                  {g.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-stone">{g.dek}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
