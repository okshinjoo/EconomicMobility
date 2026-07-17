import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | Empower — Economic Mobility Project",
  description:
    "What Empower stores, what it never does with your data, and how to delete everything. Plain English, like the rest of the site.",
};

// Thoroughness pass July 17, 2026 (owner: "goes over everything") — audited
// against every real data flow: local storage, account sync, live likes
// (fixed a stale "personal-only" claim), AI features (chat/plan/comment
// screening -> Anthropic), avatars + post pictures, member pages, reminder
// emails, processors, external links. Keep this file in sync when a data
// flow changes — the no-silent-edits promise at the bottom is binding.
const LAST_UPDATED = "July 17, 2026";

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

      {/* content column stacks above the fixed footer (curtain reveal) */}
      <div className="relative z-10 bg-paper">

      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
            The fine print, unfine-printed
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-[2.6rem] font-medium leading-[1.07] tracking-tight sm:text-6xl sm:leading-[0.98]">
            Privacy <span className="italic text-amber">policy.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/75">
            The short version:{" "}
            <strong className="text-cream">
              we never sell your data. Ever.
            </strong>{" "}
            We store as little as possible, and you can delete all of it
            yourself, anytime, with one button. Last updated {LAST_UPDATED}.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-2xl px-6 py-12 text-lg leading-8 text-stone lg:py-16">
          <H2>If you don&apos;t create an account</H2>
          <p className="mt-3">
            Everything the site remembers about you (articles you&apos;ve
            read, quiz results, calculator inputs, your plan, badges, skill
            progress) lives in your own browser&apos;s storage, on your
            device. It never reaches our servers. Clear your browser data and
            it&apos;s gone.
          </p>
          <p className="mt-3">
            We use privacy-respecting page analytics (Vercel Web Analytics)
            to see which pages get visited. It counts visits in aggregate: no
            cookies, no advertising identifiers, no profile of you, and no
            tracking across other sites. We can see that a thousand people
            read the FAFSA guide; we cannot see that <em>you</em> did.
          </p>
          <p className="mt-3">
            We set no tracking cookies at all. Fonts and images are served
            from our own site, so reading a page here doesn&apos;t announce
            itself to Google Fonts or any other third party. Our host
            (Vercel) keeps standard, short-lived server logs to run and
            protect the service, as every website&apos;s host does.
          </p>

          <H2>If you create an account</H2>
          <p className="mt-3">
            Accounts exist to sync that same progress across your devices.
            When you sign up we store, on our database provider (Supabase):
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              Your email address and a securely hashed password. If you sign
              in with Google instead, Google shares your name and email with
              us and nothing else; we never see your Google password. Signing
              in keeps a session token in your browser&apos;s storage — not a
              tracking cookie.
            </li>
            <li>
              Your profile, if you fill it in: a display name, an optional
              &ldquo;where you are in life&rdquo; tag (student — with an
              optional high&nbsp;school / community college / university
              detail — working, or retired), the goals you pick, your flairs,
              an optional short bio, an optional profile photo, and whether
              you want any of it shown publicly.
            </li>
            <li>
              Your synced progress — the same data that otherwise stays on
              your device, mirrored so your devices agree. Concretely:
              reading history on this site, quiz and knowledge-check results,
              calculator inputs (including budget numbers you type), your
              plan, the student tracker (courses, GPA, scholarship
              applications), goal check-ins, the optional about-you answers
              (like how your income arrives or who you support financially),
              and skill-tree mastery. This can include real financial
              numbers, which is exactly why it&apos;s protected so each
              account can only ever read its own rows.
            </li>
          </ul>
          <p className="mt-3">
            That&apos;s the whole list. No real names required, no phone
            numbers, no location, no browsing history beyond this site&apos;s
            own pages.
          </p>
          <p className="mt-3">
            Your saved posts, follows, and pinned channels are personal-only:
            they sync so your devices agree, but no one else can see them.
            Likes work two ways, and we want to be precise:{" "}
            <strong className="text-ink">signed out</strong>, a like is a
            private bookmark on your device that nobody counts.{" "}
            <strong className="text-ink">Signed in</strong>, your like is
            stored with your account so it can be counted once in the public
            tally on that post. The tally shows a number, never a list of who
            liked what.
          </p>

          <H2>Your public presence (all of it optional)</H2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-ink">Member pages</strong> are opt-in
              and OFF by default. Until you flip &ldquo;public profile&rdquo;
              on, your page shows nothing personal.
            </li>
            <li>
              <strong className="text-ink">Profile photos</strong> you upload
              are stored publicly (that&apos;s what makes them displayable)
              but only appear to others if your public profile is on. Remove
              or replace yours anytime from the account page.
            </li>
            <li>
              <strong className="text-ink">Pictures attached to posts</strong>{" "}
              are public once the post is published, like the post itself.
            </li>
          </ul>

          <H2>Community posts and comments</H2>
          <p className="mt-3">
            Reading the community requires nothing. Posting and commenting
            require an account, and your display name appears with what you
            write (your tag and flairs appear only if you&apos;ve turned
            &ldquo;show my tag&rdquo; on). Nothing you submit is public
            immediately: comments are screened — first by an automated check
            (see the AI section below), with anything uncertain held for a
            human — and posts are reviewed by a human before publishing. You
            can ask us to take any published post, comment, or picture down
            at any time.
          </p>

          <H2>The AI features, honestly</H2>
          <p className="mt-3">
            Three features use an AI model (Claude, made by Anthropic). Using
            them sends some of your text to Anthropic for processing; not
            using them sends nothing. Per Anthropic&apos;s API terms, that
            data is not used to train their models.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-ink">The Money Guide chat:</strong>{" "}
              your question, the last few turns of that chat, and — if
              you&apos;ve saved profile details — a one-sentence summary of
              them (so answers fit your situation) are processed to write the
              reply. Chats aren&apos;t stored on our servers.
            </li>
            <li>
              <strong className="text-ink">My Plan:</strong> your intake
              answers (goal, timeline, how your income arrives, who you
              support) and a list of what you&apos;ve already read or used
              here are processed to assemble your plan from our own guides.
            </li>
            <li>
              <strong className="text-ink">Comment screening:</strong> the
              text of a comment you submit is checked for scams, personal
              contact information, and similar problems before it publishes.
              Anything the check isn&apos;t sure about waits for a human.
            </li>
          </ul>

          <H2>Email we send and receive</H2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              Account emails (verification, password reset) are sent through
              Resend, only when you trigger them.
            </li>
            <li>
              If you sign up for deadline reminder emails, we store your
              email address and exactly which kinds of email you agreed to;
              every reminder carries a one-click unsubscribe that works
              without signing in.
            </li>
            <li>
              The contact form, the anonymous question form, and community
              submissions are delivered to our inbox by Web3Forms. Adding
              your email to the question form is optional and only used to
              reply to you.
            </li>
            <li>
              If you email us, we keep the thread like any inbox does. We
              never add you to a list you didn&apos;t ask for.
            </li>
          </ul>

          <H2>What we never do</H2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Sell or share your data with advertisers or brokers. Ever.</li>
            <li>
              Run ads, ad pixels, or social-media trackers. There is no
              Facebook pixel, no Google advertising tag, nothing of that
              species here.
            </li>
            <li>Send you marketing email you didn&apos;t ask for.</li>
            <li>Use your data to train AI models, ours or anyone&apos;s.</li>
            <li>
              Require an account for anything. Every guide, tool, and quiz
              works logged out, forever.
            </li>
          </ul>

          <H2>Where links lead</H2>
          <p className="mt-3">
            The scholarship finder, opportunity finder, and resources pages
            link out to official sites we&apos;ve verified — but once you
            leave, their privacy practices apply, not ours. We link
            directly, with no tracking parameters added.
          </p>

          <H2>Age</H2>
          <p className="mt-3">
            The guides and tools are for everyone. Creating an account
            requires being <strong className="text-ink">13 or older</strong>.
            If you&apos;re under 13, keep using the site logged out; you
            lose nothing except cross-device sync. If we learn an account
            belongs to someone under 13, we&apos;ll delete it.
          </p>

          <H2>Deleting everything</H2>
          <p className="mt-3">
            You can delete your account yourself, right now, no email
            required: the{" "}
            <Link
              href="/account"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4"
            >
              account page&apos;s
            </Link>{" "}
            Security tab has a delete button. It immediately and permanently
            removes everything on our servers — your sign-in, synced
            progress, profile, photo, likes, comments, and any reminder
            signup. If you&apos;d rather a human handle it (or something
            goes wrong), email{" "}
            <a
              href="mailto:privacy@economicmobilityproject.org"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4"
            >
              privacy@economicmobilityproject.org
            </a>{" "}
            from your account&apos;s email and we&apos;ll do it by hand,
            normally within a few days. Community posts we curated onto the
            site come down on request too. Logged-out data is yours to
            clear anytime from your own browser (or from the{" "}
            <Link
              href="/start-here"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4"
            >
              Start Here
            </Link>{" "}
            page&apos;s backup tools, which also let you export everything
            first).
          </p>

          <H2>Who holds the data</H2>
          <p className="mt-3">
            The site runs on Vercel (hosting, page analytics); accounts and
            synced data live with Supabase (Postgres, hosted in the United
            States), protected so that each account can only ever read its
            own rows. Anthropic processes the AI features&apos; text as
            described above. Form submissions are delivered by Web3Forms,
            and account and reminder email is sent through Resend. Each of
            these providers processes data only to do that one job for us;
            none of them may use it for anything else.
          </p>

          <H2>Changes</H2>
          <p className="mt-3">
            If this policy changes in a way that matters, we&apos;ll say so
            plainly on this page and update the date at the top. No silent
            edits. (July 17, 2026: rewrote this page to cover the AI
            features, public like tallies, profile photos, and reminder
            emails in detail — practices didn&apos;t change, the writing
            caught up. Later the same day: account deletion became
            self-serve, and deleting your account now also removes your
            comments automatically.)
          </p>
        </div>
      </section>

      </div>

      <CurtainFooter>
        <Footer />
      </CurtainFooter>
    </div>
  );
}
