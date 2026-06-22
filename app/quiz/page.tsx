import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuizFlow from "@/components/QuizFlow";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <QuizFlow />
      <Footer />
    </div>
  );
}
