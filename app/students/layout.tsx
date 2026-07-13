import StudentHeader from "@/components/StudentHeader";

// Every /students/* route runs on the student microsite header (its own
// subnav + a door back to the main site). Pages under here must NOT render
// the main <Header /> — this layout owns the top of the page.
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
