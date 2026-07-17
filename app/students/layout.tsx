import StudentHeader from "@/components/StudentHeader";

// Every /students/* route runs on the student microsite header (its own
// subnav + a door back to the main site). Pages under here must NOT render
// the main <Header /> — this layout owns the top of the page. The ⌘K
// dialog fetches the shared index itself and maps hrefs into the student
// frame (perf round 2, July 17 2026), so results still open the mirrors.
export default function StudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StudentHeader />
      {children}
    </>
  );
}
