// Post-picture uploads (July 2026 owner ask: members can attach a photo to
// a community post). Members-only by construction: uploads go to the
// public-read `community-images` Supabase Storage bucket under the
// uploader's user id (storage policy block at the end of
// docs/supabase-schema.sql — the owner must run it once). Images are
// downscaled client-side before upload so phone photos don't eat the
// storage tier. Returns the public URL, or null on any failure — callers
// degrade gracefully (post without the picture, tell the author).

import type { Session } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";

const BUCKET = "community-images";
const MAX_DIM = 1600;
const JPEG_QUALITY = 0.85;

/** Downscale to a web-sized JPEG blob. Falls back to the original file if
 *  decoding fails (e.g. an exotic format the canvas can't read). */
async function downscale(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIM / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY)
    );
    return blob ?? file;
  } catch {
    return file;
  }
}

export async function uploadCommunityImage(
  session: Session,
  file: File
): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const blob = await downscale(file);
  const path = `${session.user.id}/${Date.now()}.jpg`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, { contentType: "image/jpeg", upsert: false });
  if (error) return null;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl ?? null;
}
