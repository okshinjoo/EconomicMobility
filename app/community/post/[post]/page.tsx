import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import { SinglePost } from "@/components/CommunityFeed";
import {
  communityPosts,
  getChannel,
  getMemberIndex,
  channelMatches,
} from "@/lib/communityFeed";

export function generateStaticParams() {
  return communityPosts.map((p) => ({ post: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ post: string }>;
}): Promise<Metadata> {
  const { post } = await params;
  const p = communityPosts.find((x) => x.id === post);
  return {
    title: p
      ? `${p.title} | Empower Community`
      : "Post | Empower Community",
    robots: { index: false },
  };
}

export default async function CommunityPostPage({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const { post } = await params;
  const found = communityPosts.find((x) => x.id === post);
  if (!found) notFound();

  const own = getChannel(found.channel);
  const hub = own.parent ? getChannel(own.parent) : own;
  const hubPostCount = communityPosts.filter((p) =>
    channelMatches(p.channel, hub.id)
  ).length;

  const authorMeta: Record<string, { cred: number; earned: string[] }> = {};
  for (const m of getMemberIndex())
    authorMeta[m.name] = { cred: m.cred, earned: m.earnedFlairs };

  // More from the same hub (Reddit's "more posts" rail), newest first.
  const more = communityPosts
    .filter((p) => p.id !== found.id && channelMatches(p.channel, hub.id))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />


      {/* content column stacks above the fixed footer (curtain reveal) */}

      <div className="relative z-10 bg-paper">

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:py-14">
          <div className="min-w-0">
            <Link
              href="/community"
              className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              ← Back to the community
            </Link>
            <div className="mt-4">
              <SinglePost post={found} authorMeta={authorMeta} />
            </div>
          </div>

          {/* Reddit-style right rail: about the community + more posts */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-sand bg-cream p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
                About this channel
              </p>
              <p className="mt-2 flex items-center gap-2 font-display text-lg font-bold text-ink">
                <hub.icon
                  className="h-5 w-5"
                  strokeWidth={1.75}
                  style={{ color: hub.color }}
                />
                {hub.name}
              </p>
              <p className="mt-1.5 text-sm leading-6 text-stone">
                {hub.tagline}
              </p>
              <p className="mt-3 text-xs font-semibold text-stone">
                {hubPostCount} {hubPostCount === 1 ? "post" : "posts"}
              </p>
              {own.parent && (
                <p className="mt-2 text-xs text-stone">
                  Tagged{" "}
                  <span
                    className="rounded-md border px-1.5 py-0.5 text-[11px] font-bold"
                    style={{ borderColor: own.color, color: own.color }}
                  >
                    {own.name}
                  </span>
                </p>
              )}
            </div>

            {more.length > 0 && (
              <div className="rounded-2xl border border-sand bg-cream p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
                  More in {hub.name}
                </p>
                <div className="mt-2 space-y-2.5">
                  {more.map((p) => (
                    <Link
                      key={p.id}
                      href={`/community/post/${p.id}`}
                      className="block text-sm font-semibold leading-snug text-ink hover:underline"
                    >
                      {p.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-sand bg-paper p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
                House rules
              </p>
              <ul className="mt-2 space-y-1.5 text-xs leading-5 text-stone">
                <li>Be kind. No shaming anyone&apos;s situation.</li>
                <li>No selling or &ldquo;DM me&rdquo; offers.</li>
                <li>No personal details, yours or anyone&apos;s.</li>
                <li>Experiences welcome; individualized advice isn&apos;t.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      </div>


      <CurtainFooter>

        <Footer />

      </CurtainFooter>
    </div>
  );
}
