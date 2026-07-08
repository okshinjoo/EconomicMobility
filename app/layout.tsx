import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ChatLauncher from "@/components/ChatLauncher";
import VisitTracker from "@/components/VisitTracker";
import { getSearchItems } from "@/lib/search";

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

export const metadata: Metadata = {
  title: "Empower | Economic Mobility Project",
  description:
    "Free, jargon-free financial education built to break the cycle of economic disadvantage for first-generation, low-income, and immigrant youth — and anyone ready to take control of their financial future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} ${newsreader.variable}`}
    >
      {/* Font variables live on <html>: the @theme block in globals.css
          references them at :root, where body-level variables can't be seen. */}
      <body className="antialiased">
        {children}
        <ChatLauncher items={getSearchItems()} />
        <VisitTracker />
        <Analytics />
      </body>
    </html>
  );
}