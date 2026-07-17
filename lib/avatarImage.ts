// Profile pictures (July 16, 2026, owner ask: "make it so people can add
// profile pictures"). Members-only by construction: uploads land in the
// public-read `avatars` Supabase Storage bucket under the uploader's user
// id (policy block at the end of docs/supabase-schema.sql — the owner must
// run it once). Photos are square-cropped and downscaled client-side to
// 256px so they stay tiny, and the path is stable (one object per member,
// replaced in place) so removal is one delete. Returns the public URL
// cache-busted, or null on any failure — callers degrade gracefully to the
// initial-letter avatar.

import { getSupabase } from "@/lib/supabase";

const BUCKET = "avatars";
const SIZE = 256;
const JPEG_QUALITY = 0.85;

/** Center-crop to a square and downscale to SIZE px. */
async function squareCrop(file: File): Promise<Blob | null> {
  try {
    const bitmap = await createImageBitmap(file);
    const side = Math.min(bitmap.width, bitmap.height);
    const sx = (bitmap.width - side) / 2;
    const sy = (bitmap.height - side) / 2;
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, SIZE, SIZE);
    bitmap.close();
    return await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY)
    );
  } catch {
    return null;
  }
}

export async function uploadAvatar(
  userId: string,
  file: File
): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const blob = await squareCrop(file);
  if (!blob) return null;
  const path = `${userId}/avatar.jpg`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: "image/jpeg",
    upsert: true,
  });
  if (error) return null;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  // The path is stable, so replacements need a fresh query string or the
  // browser keeps showing the cached old photo. Event-time Date is fine.
  return data.publicUrl ? `${data.publicUrl}?v=${Date.now()}` : null;
}

export async function removeAvatar(userId: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase.storage.from(BUCKET).remove([`${userId}/avatar.jpg`]);
}
