import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Empower — Economic Mobility Project",
  description:
    "What Empower stores, what it never does with your data, and how to delete everything. Plain English, like the rest of the site.",
};

const LAST_UPDATED = "July 2026";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 font-display text-2xl font-bold text-ink">
      {children}
    </h2>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
            The fine print, unfine-printed
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-[2.6rem] font-medium leading-[1.07] tracking-tight sm:text-6xl sm:leading-[0.98]">
            Privacy <span className="italic text-amber">policy.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/75">
            The short version: we store as little as possible, we never sell
            it, and you can delete all of it with one email. Last updated{" "}
            {LAST_UPDATED}.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-2xl px-6 py-12 text-lg leading-8 text-stone lg:py-16">
          <H2>If you don&apos;t create an account</H2>
          <p className="mt-3">
            Everything the site remembers about you (articles you&apos;ve
            read, quiz results, calculator inputs, badges) lives in your own
            browser&apos;s storage, on your device. It never reaches our
            servers. Clear your browser data and it&apos;s gone. We also use
            privacy-respecting page analytics (Vercel Analytics) to see which
            pages get visited; it doesn&apos;t use cookies or track you as an
            individual across sites.
          </p>

          <H2>If you create an account</H2>
          <p className="mt-3">
            Accounts exist to sync that same progress across your devices.
            When you sign up we store, on our database provider (Supabase):
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Your email address and a securely hashed password.</li>
            <li>
              Your profile, if you fill it in: a display name, an optional
              &ldquo;where you are in life&rdquo; tag (student, working
              professional, or retired), and whether you want that tag shown
              when you post.
            </li>
            <li>
              Your synced progress: the same reading history, quiz results,
              calculator snapshots, and badges described above.
            </li>
          </ul>
          <p className="mt-3">
            That&apos;s the whole list. No real names required, no phone
            numbers, no location, no browsing history beyond this site&apos;s
            own pages.
          </p>

          <H2>What we never do</H2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Sell or share your data with advertisers or brokers. Ever.</li>
            <li>Send you marketing email you didn&apos;t ask for.</li>
            <li>
              Require an account for anything. Every guide, tool, and quiz
              works logged out, forever.
            </li>
          </ul>

          <H2>Community posts</H2>
          <p className="mt-3">
            Posting is anonymous by default. If you turn on &ldquo;show my
            tag,&rdquo; the name and tag from your profile appear next to
            posts you submit. Submissions are reviewed by a human before they
            appear publicly, and you can ask us to take a published post down
            at any time.
          </p>

          <H2>Age</H2>
          <p className="mt-3">
            The guides and tools are for everyone. Creating an account
            requires being <strong className="text-ink">13 or older</strong>.
            If you&apos;re under 13, keep using the site logged out — you
            lose nothing except cross-device sync. If we learn an account
            belongs to someone under 13, we&apos;ll delete it.
          </p>

          <H2>Deleting everything</H2>
          <p className="mt-3">
            Email{" "}
            <a
              href="mailto:Help@economicmobilityproject.org"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4"
            >
              Help@economicmobilityproject.org
            </a>{" "}
            from your account&apos;s email address and we&apos;ll permanently
            delete your account and every piece of data attached to it,
            normally within a few days. Logged-out data is yours to clear
            anytime from your own browser (or from the{" "}
            <Link
              href="/start-here"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4"
            >
              Start Here
            </Link>{" "}
            page&apos;s backup tools).
          </p>

          <H2>Who holds the data</H2>
          <p className="mt-3">
            The site runs on Vercel; accounts and synced data live with
            Supabase (Postgres, hosted in the United States), protected so
            that each account can only ever read its own rows. Form
            submissions (contact, questions, community posts) are delivered
            to our inbox by Web3Forms.
          </p>

          <H2>Changes</H2>
          <p className="mt-3">
            If this policy changes in a way that matters, we&apos;ll say so
            plainly on this page and update the date at the top. No silent
            edits.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
