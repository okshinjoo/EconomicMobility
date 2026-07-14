import { ExternalLink } from "lucide-react";
import CheckBroker from "@/components/CheckBroker";
import TopicMark from "@/components/TopicMark";
import StateResources from "@/components/StateResources";
import ScrollDrift from "@/components/ScrollDrift";


const groups = [
  {
    id: "college-scholarships",
    title: "College & scholarships",
    bg: "#f3dfba",
    accent: "#c9842a",
    links: [
      {
        name: "Federal Student Aid (FAFSA)",
        url: "https://studentaid.gov",
        desc: "Apply for federal grants, loans, and work-study. Always free to file.",
      },
      {
        name: "CareerOneStop Scholarship Finder",
        url: "https://www.careeronestop.org/toolkit/training/find-scholarships.aspx",
        desc: "A free U.S. Department of Labor database of thousands of scholarships.",
      },
      {
        name: "BigFuture Scholarships",
        url: "https://bigfuture.collegeboard.org/scholarship-search",
        desc: "Scholarship search and step-by-step actions you can get rewarded for.",
      },
    ],
  },
  {
    id: "government-benefits",
    title: "Government benefits & programs",
    bg: "#d9e5d6",
    accent: "#157a5a",
    links: [
      {
        name: "USA.gov benefit finder",
        url: "https://www.usa.gov/benefit-finder",
        desc: "Answer a few questions to find federal benefits you may qualify for.",
      },
      {
        name: "211 (United Way)",
        url: "https://www.211.org",
        desc: "Call or search for local help with food, housing, utilities, and more.",
      },
      {
        name: "SNAP food assistance",
        url: "https://www.fns.usda.gov/snap/recipient/eligibility",
        desc: "Check eligibility and apply for help paying for groceries.",
      },
      {
        name: "HealthCare.gov",
        url: "https://www.healthcare.gov",
        desc: "Find health coverage, including free or low-cost Medicaid.",
      },
    ],
  },
  {
    id: "money-help",
    title: "Money help & credit",
    bg: "#d8e2e9",
    accent: "#3f6478",
    links: [
      {
        name: "Consumer Financial Protection Bureau",
        url: "https://www.consumerfinance.gov",
        desc: "Plain-English guides on credit, loans, and your rights, plus a place to file complaints.",
      },
      {
        name: "AnnualCreditReport.com",
        url: "https://www.annualcreditreport.com",
        desc: "The official site for your free credit reports. Don't pay anyone else for these.",
      },
      {
        name: "NFCC credit counseling",
        url: "https://www.nfcc.org",
        desc: "Connect with nonprofit, free or low-cost help for managing debt.",
      },
      {
        name: "FINRA BrokerCheck",
        url: "https://brokercheck.finra.org",
        desc: "Look up any broker or investment adviser free before you hand over money.",
      },
    ],
  },
  {
    id: "free-tax-filing",
    title: "Free tax filing",
    bg: "#f0d0c0",
    accent: "#b7593f",
    links: [
      {
        name: "IRS Free File",
        url: "https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free",
        desc: "File your federal taxes online for free if you qualify.",
      },
      {
        name: "Free tax prep (VITA)",
        url: "https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers",
        desc: "Free, in-person help preparing your return from IRS-certified volunteers.",
      },
    ],
  },
];

/**
 * The Resources page below the header, shared by /resources and its
 * /students mirror (July 2026 comprehensiveness pass) — the links here
 * are trusted EXTERNAL sites, so both frames render identically.
 */
export default function ResourcesPageView() {
  return (
    <>

      <main>
        {/* Hero — C: editorial maximal on a forest field */}
        <section className="relative overflow-hidden bg-forest text-cream">
          <ScrollDrift>
            <TopicMark
              id="government-aid"
              color="#fbf8f1"
              className="pointer-events-none absolute -right-20 -top-16 h-[24rem] w-[24rem] opacity-[0.07]"
            />
          </ScrollDrift>
          <div className="relative mx-auto max-w-5xl px-6 pb-28 pt-14 lg:pt-20">
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
              Resources
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.95] tracking-tight sm:text-7xl">
              Help that&apos;s{" "}
              <span className="italic text-amber">already out there.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/75">
              A hand-picked list of trusted, free programs and tools for
              college aid, government benefits, money help, and taxes. Usually
              the hard part is knowing they exist.
            </p>
          </div>
        </section>

        {/* State finder — the hero object, pulled up over the field */}
        <section className="bg-paper">
          <div className="relative mx-auto -mt-14 max-w-5xl px-6">
            <StateResources />
          </div>
        </section>

        {/* National resources — pastel panels, ink-&-shadow link cards */}
        <section className="bg-paper">
          <div className="mx-auto max-w-5xl px-6 pb-20 pt-16">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Trusted national resources
            </h2>
            <p className="mt-2 text-base leading-7 text-stone">
              Free, reputable programs and tools that work anywhere in the U.S.
            </p>

            <div className="mt-10 space-y-10">
              {groups.map((group, gi) => (
                <div
                  key={group.title}
                  id={group.id}
                  className={`card-ink-lg scroll-mt-24 rounded-2xl p-6 sm:p-8 ${
                    gi % 2 === 1 ? "lg:rotate-[0.35deg]" : "lg:-rotate-[0.35deg]"
                  }`}
                  style={{ background: group.bg }}
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="inline-flex -rotate-2 select-none items-center rounded-lg border-2 border-ink bg-cream px-3 py-1 font-display text-xl font-bold text-ink shadow-[3px_3px_0_#11211c]"
                    >
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                      {group.title}
                    </h3>
                  </div>

                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {group.links.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex h-full flex-col rounded-xl border-2 border-ink bg-cream p-5 shadow-[3px_3px_0_#11211c] transition-transform duration-150 hover:-translate-y-0.5 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                        >
                          <span className="flex items-start justify-between gap-3">
                            <span className="font-display text-lg font-semibold leading-snug text-ink underline decoration-2 underline-offset-4 transition-colors group-hover:text-forest" style={{ textDecorationColor: group.accent }}>
                              {link.name}
                            </span>
                            <ExternalLink
                              className="mt-1 h-4 w-4 shrink-0"
                              style={{ color: group.accent }}
                              aria-hidden
                            />
                          </span>
                          <p className="mt-2 text-sm leading-6 text-stone">
                            {link.desc}
                          </p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closer — A: amber field */}
        <section className="bg-amber text-ink">
          <div className="mx-auto max-w-5xl px-6 py-12">
            <p className="max-w-3xl text-base leading-7 text-ink/80">
              We don&apos;t run or control these organizations. They&apos;re
              listed here because they&apos;re free, reputable, and useful.
              Double-check eligibility on the official site, and be wary of
              anyone charging you for help that&apos;s free.
            </p>
          </div>
        </section>
      </main>

      {/* Check-a-broker: the investor.gov habit, one click */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <CheckBroker />
        </div>
      </section>

    </>
  );
}
