// Schema.org / JSON-LD builders (July 2026 SEO pass). Pure functions that
// return plain objects; render them through components/JsonLd. Every URL is
// the CANONICAL main-site URL (never a /students mirror), because the
// mirrors' canonical tags already point here — so schema stays consistent
// with what Google indexes. Keep every field TRUE to the page: we omit
// datePublished on evergreen guides rather than invent one.

const BASE = "https://economicmobilityproject.org";

const ORG_ID = `${BASE}/#org`;
const FOUNDER_ID = `${BASE}/#founder`;

/** The founder node (July 17, 2026, owner: "credit everything to me").
 *  First name only — the site has never published a surname; keep it so. */
function founderPerson() {
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: "Shinjoo",
    jobTitle: "Founder",
    worksFor: { "@id": ORG_ID },
  };
}

/** The publisher node, referenced by @id from articles/courses/posts. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Empower — Economic Mobility Project",
    url: BASE,
    description:
      "Free, plain-English financial education for first-generation, low-income, and immigrant students.",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: "Empower",
    publisher: { "@id": ORG_ID },
  };
}

export function articleSchema(a: {
  title: string;
  dek: string;
  topicId: string;
  slug: string;
  sectionTitle: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.dek,
    url: `${BASE}/learn/${a.topicId}/${a.slug}`,
    articleSection: a.sectionTitle,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    author: founderPerson(),
    publisher: { "@id": ORG_ID },
  };
}

export function courseSchema(c: {
  id: string;
  title: string;
  goal: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.title,
    description: c.goal,
    url: `${BASE}/courses/${c.id}`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    provider: { "@id": ORG_ID },
  };
}

export function blogPostingSchema(p: {
  slug: string;
  title: string;
  dek: string;
  date: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.dek,
    url: `${BASE}/blog/${p.slug}`,
    datePublished: p.date,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    ...(p.image ? { image: `${BASE}${p.image}` } : {}),
    author: founderPerson(),
    publisher: { "@id": ORG_ID },
  };
}

/** FAQPage for the /ask answer column — the answered Q&As ARE FAQs, so this
 *  is an honest fit and can earn the FAQ accordion in results. */
export function faqSchema(qas: { question: string; answer: string[] }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qas.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer.join(" "),
      },
    })),
  };
}

/** BreadcrumbList — items are {name, path} where path is a main-site path
 *  ("/learn", "/learn/credit", …). The last item is the current page. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${BASE}${it.path}`,
    })),
  };
}
