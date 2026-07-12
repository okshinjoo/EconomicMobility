import type { LucideIcon } from "lucide-react";
import { topics } from "./topics";
import { toolCategories } from "./toolsRegistry";

// Shared primary navigation, used by both the desktop header dropdowns
// (components/Header.tsx) and the mobile drawer (components/MobileNav.tsx).

export interface NavDropItem {
  label: string;
  href: string;
  desc?: string;
  icon?: LucideIcon;
  color?: string;
}

export interface NavEntry {
  label: string;
  href: string;
  items?: NavDropItem[];
  columns?: 1 | 2;
  footer?: { label: string; href: string }[];
}

export const nav: NavEntry[] = [
  {
    label: "Learn",
    href: "/learn",
    columns: 2,
    items: topics.map((t) => ({
      label: t.title,
      href: t.href,
      icon: t.icon,
      color: t.color,
    })),
    footer: [
      { label: "Browse all topics", href: "/learn" },
      { label: "Life moments", href: "/life" },
      { label: "Glossary", href: "/glossary" },
    ],
  },
  { label: "Your Path", href: "/journey" },
  { label: "Courses", href: "/courses" },
  {
    label: "Tools",
    href: "/tools",
    columns: 1,
    items: toolCategories.map((c) => ({
      label: c.label,
      href: c.base,
      desc: c.blurb,
    })),
    footer: [
      { label: "See all calculators", href: "/tools" },
      { label: "Free templates", href: "/tools/templates" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    columns: 1,
    items: [
      { label: "College & scholarships", href: "/resources#college-scholarships" },
      { label: "Government benefits", href: "/resources#government-benefits" },
      { label: "Money help & credit", href: "/resources#money-help" },
      { label: "Free tax filing", href: "/resources#free-tax-filing" },
    ],
  },
  {
    label: "Community",
    href: "/community",
    columns: 1,
    items: [
      { label: "The Feed", href: "/community", desc: "Wins, questions, and honest conversations." },
      { label: "Challenges", href: "/challenges", desc: "Join a group challenge, earn the badge." },
      { label: "Blog", href: "/blog", desc: "Fun, honest reads on day-to-day money." },
      { label: "Ask & Answers", href: "/ask", desc: "Anonymous questions, answered in plain English." },
    ],
  },
  {
    label: "About",
    href: "/about",
    columns: 1,
    items: [
      { label: "Our Mission", href: "/about", desc: "Why this project exists." },
      { label: "Start Here", href: "/start-here", desc: "A quick tour for newcomers." },
      { label: "Life Moments", href: "/life", desc: "Start from what's happening in your life." },
      { label: "Glossary", href: "/glossary", desc: "Every money word, in plain English." },
      { label: "Contact Us", href: "/contact", desc: "Questions, ideas, or get involved." },
      { label: "Privacy", href: "/privacy", desc: "We never sell your data. Ever." },
    ],
  },
];
