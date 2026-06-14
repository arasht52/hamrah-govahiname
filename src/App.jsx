import { useState } from "react";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

import SignsPage from "./pages/SignsPage";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import PracticeQuizPage from "./pages/PracticeQuizPage";
import ExamQuizPage from "./pages/ExamQuizPage";
import ResultPage from "./pages/ResultPage";
import AIPage from "./pages/AIPage";
import LawsPage from "./pages/LawsPage";
import FahrschulenPage from "./pages/FahrschulenPage";
import StatsPage from "./pages/StatsPage";
import MorePage from "./pages/MorePage";

const APP_CONTAINER_STYLE = {
  fontFamily: "'Vazirmatn', sans-serif",
  direction: "rtl",
  background: "#E8F6E8",
  minHeight: "100vh",
  color: "#111827"
};

const MAIN_CONTENT_STYLE = {
  maxWidth: 640,
  margin: "0 auto",
  padding: "74px 16px 92px"
};

export default function App() {
  const [page, setPage] = useState("home");
  const [quizResult, setQuizResult] = useState(null);

  const finishQuiz = (result) => {
    setQuizResult(result);
    setPage("result");
  };

  return (
    <div style={APP_CONTAINER_STYLE}>
      <Header />

      <main style={MAIN_CONTENT_STYLE}>
        {page === "home" && (
          <HomePage
            onStartQuiz={() => setPage("quiz")}
            onOpenAI={() => setPage("ai")}
          />
        )}

        {page === "quiz" && (
          <QuizPage
            onStartPractice={() => setPage("practice")}
            onStartExam={() => setPage("exam")}
            onBack={() => setPage("home")}
          />
        )}

        {page === "practice" && (
          <PracticeQuizPage
            onFinish={finishQuiz}
            onBack={() => setPage("quiz")}
          />
        )}

        {page === "exam" && (
          <ExamQuizPage
            onFinish={finishQuiz}
            onBack={() => setPage("quiz")}
          />
        )}

        {page === "result" && (
          <ResultPage
            result={quizResult}
            onRetry={() => setPage("quiz")}
            onHome={() => setPage("home")}
          />
        )}

        {page === "ai" && <AIPage onBack={() => setPage("home")} />}

        {page === "laws" && <LawsPage />}

        {page === "fahrschulen" && <FahrschulenPage />}

        {page === "stats" && <StatsPage />}
        
        {page === "signs" && <SignsPage onBack={() => setPage("more")} />}

        {page === "more" && <MorePage onSelect={(id) => setPage(id)} />}
      </main>

      <BottomNav
        active={
          page === "practice" || page === "exam" || page === "result"
            ? "quiz"
            : page
        }
        onSelect={setPage}
      />
    </div>
  );
}