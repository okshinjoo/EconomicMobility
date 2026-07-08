"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getReadMap } from "@/lib/readTracking";

/**
 * "Next up on the blog" line at the end of a post: newest post the visitor
 * hasn't read yet (blog reads live under blog/<slug> in the read map).
 * Server renders the newest non-current post; after mount, read ones are
 * skipped. All read -> renders nothing (the surrounding box already links
 * the library and the ask form).
 */
export default function NextPost({
  current,
  posts,
}: {
  current: string;
  /** Newest first, light fields only. */
  posts: { slug: string; title: string }[];
}) {
  const candidates = posts.filter((p) => p.slug !== current);
  const [next, setNext] = useState(candidates[0] ?? null);
  const [allRead, setAllRead] = useState(false);

  useEffect(() => {
    const read = getReadMap();
    const unread = candidates.find((p) => !read[`blog/${p.slug}`]);
    if (unread) setNext(unread);
    else setAllRead(true);
    // candidates derives from props; posts/current are stable per page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  if (allRead || !next) return null;

  return (
    <p className="mt-3 text-sm leading-6 text-stone">
      Next up on the blog:{" "}
      <Link
        href={`/blog/${next.slug}`}
        className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
      >
        {next.title}
      </Link>
    </p>
  );
}
