import StudentHeader from "@/components/StudentHeader";
import { getSearchItems } from "@/lib/search";
import { frameHref } from "@/lib/frame";

// Every /students/* route runs on the student microsite header (its own
// subnav + a door back to the main site). Pages under here must NOT render
// the main <Header /> — this layout owns the top of the page. Search items
// are the main site's index with every href pre-mapped into the student
// frame, so ⌘K results open the mirrors.
export default function StudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchItems = getSearchItems().map((item) => ({
    ...item,
    href: frameHref(item.href, "student"),
  }));

  return (
    <>
      <StudentHeader searchItems={searchItems} />
      {children}
    </>
  );
}
