// Daily ping (vercel.json cron) that touches the Supabase database so the
// free-tier project never pauses from inactivity. The query returns no rows
// to the anon key (RLS), but executing it counts as activity. Harmless and
// a 200 either way when accounts aren't configured yet.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return NextResponse.json({ ok: true, note: "accounts not configured" });
  }
  try {
    const supabase = createClient(url, anonKey);
    const { error } = await supabase
      .from("profiles")
      .select("id", { count: "exact", head: true });
    return NextResponse.json({ ok: !error });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
