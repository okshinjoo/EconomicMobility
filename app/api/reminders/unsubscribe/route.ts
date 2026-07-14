// One-click unsubscribe (July 2026): every reminder email links here with
// the subscriber's token. Always answers with the same friendly page
// whether or not the token matched, so the URL can't be used to probe who
// is subscribed.

import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const PAGE = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Unsubscribed | Empower</title>
<style>
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    background:#f7f2e8;color:#11211c;display:grid;place-items:center;min-height:100vh}
  .card{max-width:26rem;margin:1.5rem;padding:2rem;background:#fbf8f1;
    border:2px solid #11211c;border-radius:1rem;box-shadow:5px 5px 0 #11211c}
  h1{font-size:1.3rem;margin:0 0 .5rem}
  p{line-height:1.6;margin:.5rem 0;color:#44514a}
  a{color:#0c4a39;font-weight:600}
</style></head>
<body><div class="card">
<h1>You're unsubscribed.</h1>
<p>No more reminder emails from Empower. If it was something we said, we'd genuinely like to know: Help@economicmobilityproject.org.</p>
<p><a href="https://economicmobilityproject.org">Back to the site</a>. Everything there stays free, no email required.</p>
</div></body></html>`;

export async function GET(req: NextRequest) {
  const token = (req.nextUrl.searchParams.get("t") ?? "").slice(0, 60);

  if (SUPABASE_URL && SERVICE_KEY && token) {
    const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { persistSession: false },
    });
    await admin.from("reminder_subscribers").delete().eq("token", token);
  }

  return new Response(PAGE, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
