import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FollowButton from "@/components/FollowButton";
import PublicProfileCard from "@/components/PublicProfileCard";
import {
  getMember,
  getMemberIndex,
  getChannel,
  CRED_POINTS,
  credRingColor,
} from "@/lib/communityFeed";
import { flairColorByLabel } from "@/lib/profile";

export function generateStaticParams() {
  return getMemberIndex().map((m) => ({ member: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ member: string }>;
}): Promise<Metadata> {
  const { member } = await params;
  const m = getMember(member);
  return {
    title: m
      ? `${m.name} | Empower Community`
      : "Member | Empower Community",
    robots: { index: false },
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ member: string }>;
}) {
  const { member } = await params;
  const m = getMember(member);

  // A slug with no curated contributions is a LIVE member (signed up, maybe
  // commented) — render the shell and let their opt-in public profile fill
  // it client-side instead of 404ing on real people.
  if (!m) {
    const guessName = member
      .split("-")
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
      .join(" ")
      .trim();
    return (
      <div className="min-h-screen bg-paper text-ink">
        <Header />
        <section className="bg-paper-deep">
          <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
            <Link
              href="/community"
              className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              ← Back to the community
            </Link>
            <PublicProfileCard
              slug={member}
              standalone
              guessName={guessName || "Member"}
            />
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <FollowButton slug={member} name={guessName || "Member"} />
              <Link
                href="/community/post/say-hello"
                className="btn-ink inline-flex items-center rounded-md bg-amber px-5 py-2.5 text-sm font-bold text-ink"
              >
                Say hi in the community
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const posts = m.contributions.filter((c) => c.kind === "post");
  const commentsAndReplies = m.contributions.filter(
    (c) => c.kind !== "post"
  );
  // "Say hi" jumps into their most recent thread — replies stay public
  // (owner call July 2026: no private DMs on a site with minors).
  const latest = [...m.contributions].sort((a, b) =>
    b.date.localeCompare(a.date)
  )[0];
  const sayHiHref = latest
    ? `/community/post/${latest.postId}`
    : "/community/post/say-hello";

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <section className="bg-paper-deep">
        <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
          <Link
            href="/community"
            className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            ← Back to the community
          </Link>

          {/* member card */}
          <div className="card-ink mt-6 rounded-2xl bg-cream p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-full font-display text-2xl font-bold ${
                    m.team ? "bg-forest text-cream" : "bg-amber/25 text-amber-deep"
                  }`}
                  style={
                    credRingColor(m.cred)
                      ? { boxShadow: `0 0 0 3px ${credRingColor(m.cred)}` }
                      : undefined
                  }
                >
                  {m.name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <h1 className="flex flex-wrap items-center gap-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                    {m.name}
                    {m.team && (
                      <span className="-rotate-2 rounded-md border-2 border-ink bg-amber px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink shadow-[2px_2px_0_#11211c]">
                        Team
                      </span>
                    )}
                  </h1>
                  {m.earnedFlairs.length > 0 && (
                    <p
                      className="mt-1 text-sm font-semibold italic text-ink/55"
                      title="Earned automatically from published activity"
                    >
                      {m.earnedFlairs.join(" · ")}
                    </p>
                  )}
                  {m.flairs.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {m.flairs.map((f) => (
                        <span
                          key={f}
                          className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                          style={{
                            color: flairColorByLabel(f),
                            background: `${flairColorByLabel(f)}1f`,
                          }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="mt-1.5 text-sm text-stone">
                    In the community since {formatDate(m.firstDate)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-stretch gap-2">
                <FollowButton slug={m.slug} name={m.name} />
                <Link
                  href={sayHiHref}
                  className="btn-ink inline-flex items-center justify-center rounded-md bg-amber px-4 py-2 text-sm font-bold text-ink"
                >
                  Say hi in the community
                </Link>
              </div>
            </div>

            {/* cred */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-sand pt-5">
              <div>
                <p className="font-display text-3xl font-bold text-forest">
                  {m.cred}
                </p>
                <p className="text-xs font-semibold uppercase tracking-wide text-stone">
                  Community Cred
                </p>
              </div>
              <p className="max-w-sm text-xs leading-5 text-stone">
                Earned when contributions are published: {CRED_POINTS.post}{" "}
                per post, {CRED_POINTS.comment} per comment,{" "}
                {CRED_POINTS.reply} per reply. {m.counts.posts}{" "}
                {m.counts.posts === 1 ? "post" : "posts"} ·{" "}
                {m.counts.comments}{" "}
                {m.counts.comments === 1 ? "comment" : "comments"} ·{" "}
                {m.counts.replies}{" "}
                {m.counts.replies === 1 ? "reply" : "replies"}.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone">
                <span className="font-semibold uppercase tracking-wide">
                  Avatar rings
                </span>
                {(
                  [
                    ["10+", "#a05f2c"],
                    ["25+", "#98a2ad"],
                    ["50+", "#e7a33c"],
                    ["100+", "#15624b"],
                  ] as const
                ).map(([label, color]) => (
                  <span key={label} className="inline-flex items-center gap-1.5">
                    <span
                      className="h-3 w-3 rounded-full border-2 border-cream"
                      style={{ boxShadow: `0 0 0 2px ${color}` }}
                    />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Their opt-in public profile (bio, life stage) — renders only
              if this member turned it on */}
          <PublicProfileCard slug={m.slug} />

          {/* posts */}
          {posts.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-xl font-bold text-ink">
                Posts
              </h2>
              <div className="mt-3 space-y-3">
                {posts.map((c) => (
                  <Link
                    key={`${c.postId}-post`}
                    href={`/community/post/${c.postId}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-sand bg-cream p-5 transition-colors hover:border-ink/20"
                  >
                    <div className="min-w-0">
                      <span
                        className="rounded-md px-2 py-0.5 text-[11px] font-bold"
                        style={{
                          color: getChannel(c.channel).color,
                          background: `${getChannel(c.channel).color}1a`,
                        }}
                      >
                        {getChannel(c.channel).name}
                      </span>
                      <p className="mt-1.5 truncate font-display text-lg font-semibold text-ink group-hover:underline">
                        {c.postTitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* comments */}
          {commentsAndReplies.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-xl font-bold text-ink">
                Comments
              </h2>
              <div className="mt-3 space-y-3">
                {commentsAndReplies.map((c, i) => (
                  <Link
                    key={`${c.postId}-${i}`}
                    href={`/community/post/${c.postId}`}
                    className="group block rounded-2xl border border-sand bg-cream p-5 transition-colors hover:border-ink/20"
                  >
                    <p className="text-[0.95rem] leading-6 text-stone">
                      &ldquo;{c.text}&rdquo;
                    </p>
                    <p className="mt-2 text-xs font-semibold text-forest group-hover:underline">
                      on: {c.postTitle}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
