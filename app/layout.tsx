import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ChatLauncher from "@/components/ChatLauncher";
import { getSearchItems } from "@/lib/search";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

// Reading serif for long-form article body — editorial, calmer than Fraunces.
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${newsreader.variable} antialiased`}
      >
        {children}
        <ChatLauncher items={getSearchItems()} />
        <Analytics />
      </body>
    </html>
  );
}