import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ChatLauncher from "@/components/ChatLauncher";
import StudentReturnChip from "@/components/StudentReturnChip";
import { getStudentPagePaths } from "@/lib/studentShelf";
import VisitTracker from "@/components/VisitTracker";
import ScrollProgress from "@/components/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display serif for headlines + the wordmark (via --font-logo / font-display).
// Lora: warm and editorial but calmer/more even than the Fraunces it replaced.
const lora = Lora({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Reading serif for long-form article body.
const newsreader = Newsreader({
  variable: "--font-reading",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const SITE_DESCRIPTION =
  "Free, jargon-free financial education built to break the cycle of economic disadvantage for first-generation, low-income, and immigrant youth, and anyone ready to take control of their financial future.";

// Search-engine ownership verification (July 2026 SEO pass). Tokens come
// from env vars so the owner can paste them into Vercel and redeploy with
// no code change: Search Console "HTML tag" method -> google meta tag; Bing
// Webmaster "meta tag" method -> msvalidate.01. Each tag renders only when
// its token is set, so nothing junk appears before setup.
const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const BING_VERIFICATION = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  // Resolves relative OG/Twitter URLs to absolute and sets the canonical
  // origin for shared links. (Inner pages already self-brand their titles,
  // so no title template here — it would double the brand.)
  metadataBase: new URL("https://economicmobilityproject.org"),
  title: "Empower | Economic Mobility Project",
  description: SITE_DESCRIPTION,
  applicationName: "Empower",
  verification: {
    ...(GOOGLE_VERIFICATION ? { google: GOOGLE_VERIFICATION } : {}),
    ...(BING_VERIFICATION
      ? { other: { "msvalidate.01": BING_VERIFICATION } }
      : {}),
  },
  openGraph: {
    type: "website",
    siteName: "Empower — Economic Mobility Project",
    title: "Empower | Economic Mobility Project",
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Empower | Economic Mobility Project",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  /** Parallel slot for intercepted overlays (the /account modal). */
  modal?: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} ${newsreader.variable}`}
    >
      {/* Font variables live on <html>: the @theme block in globals.css
          references them at :root, where body-level variables can't be seen. */}
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        {modal ?? null}
        <ChatLauncher />
        <StudentReturnChip studentPaths={getStudentPagePaths()} />
        <VisitTracker />
        <ScrollProgress />
        <Analytics />
      </body>
    </html>
  );
}