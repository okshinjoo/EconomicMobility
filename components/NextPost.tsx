"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "@phosphor-icons/react/dist/ssr";
import { getReadMap } from "@/lib/readTracking";

/**
 * "Next up on the blog" card at the end of a post: newest post the visitor
 * hasn't read yet (blog reads live under blog/<slug> in the read map),
 * rendered as the elongated library-row visual (photo thumb, terracotta
 * tint — owner call July 2026). Server renders the newest non-current post;
 * after mount, read ones are skipped. All read -> renders nothing (the
 * surrounding box already links the library and the ask form).
 */
export interface NextPostItem {
  slug: string;
  title: string;
  dek: string;
  readMinutes: number;
  image: { src: string; alt: string };
}

export default function NextPost({
  current,
  posts,
}: {
  current: string;
  /** Newest first. */
  posts: NextPostItem[];
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
    <Link
      href={`/blog/${next.slug}`}
      className="card-ink group relative mt-5 flex items-stretch gap-4 overflow-hidden rounded-xl p-4 transition-transform duration-200 hover:-translate-y-0.5"
      style={{ background: "color-mix(in srgb, #c4573b 10%, #fbf8f1)" }}
    >
      <div className="relative hidden w-28 shrink-0 overflow-hidden rounded-lg bg-sand sm:block">
        <Image
          src={next.image.src}
          alt={next.image.alt}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-wide text-terracotta">
          Next up on the blog
        </p>
        <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-ink group-hover:underline group-hover:decoration-terracotta group-hover:decoration-2 group-hover:underline-offset-4">
          {next.title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-stone">{next.dek}</p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-stone">
          <Clock className="h-3.5 w-3.5" />
          {next.readMinutes} min read
        </p>
      </div>
    </Link>
  );
}
