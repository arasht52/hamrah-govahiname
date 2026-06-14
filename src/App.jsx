import { useState } from "react";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

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
import SettingsPage from "./pages/SettingsPage";
import SignsPage from "./pages/SignsPage";
import WrongQuestionsPage from "./pages/WrongQuestionsPage";
import SearchQuestionsPage from "./pages/SearchQuestionsPage";

import { getStats } from "./utils/storage";

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
  const [wrongPracticeQuestions, setWrongPracticeQuestions] = useState([]);

  const finishQuiz = (result) => {
    setQuizResult(result);
    setPage("result");
  };

  const startWrongQuestionsPractice = () => {
    const stats = getStats();
    const attempts = stats.attempts || [];

    const wrongItems = attempts
      .flatMap((attempt) => attempt.answersList || [])
      .filter((item) => !item.correct);

    const questions = [];
    const seen = new Set();

    wrongItems.forEach((item) => {
      const q = item.question;
      if (!q) return;

      const key = q.id || q.q_de || q.q;

      if (!seen.has(key)) {
        seen.add(key);
        questions.push(q);
      }
    });

    setWrongPracticeQuestions(questions);
    setPage("wrongPractice");
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
          />
        )}

        {page === "practice" && (
          <PracticeQuizPage
            onFinish={finishQuiz}
            onBack={() => setPage("quiz")}
          />
        )}
{page === "searchQuestions" && (
  <SearchQuestionsPage onBack={() => setPage("more")} />
)}
        {page === "wrongPractice" && (
          <PracticeQuizPage
            customQuestions={wrongPracticeQuestions}
            onFinish={finishQuiz}
            onBack={() => setPage("wrongQuestions")}
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

        {page === "ai" && <AIPage />}

        {page === "laws" && (
          <LawsPage onBack={() => setPage("more")} />
        )}

        {page === "fahrschulen" && (
          <FahrschulenPage onBack={() => setPage("more")} />
        )}

        {page === "stats" && (
          <StatsPage onBack={() => setPage("more")} />
        )}

        {page === "wrongQuestions" && (
          <WrongQuestionsPage
            onBack={() => setPage("more")}
            onStartPractice={startWrongQuestionsPractice}
          />
        )}

        {page === "settings" && (
          <SettingsPage onBack={() => setPage("more")} />
        )}

        {page === "signs" && (
          <SignsPage onBack={() => setPage("more")} />
        )}

        {page === "more" && (
          <MorePage onSelect={(id) => setPage(id)} />
        )}
      </main>

      <BottomNav
        active={
          page === "practice" ||
          page === "wrongPractice" ||
          page === "exam" ||
          page === "result"
            ? "quiz"
            : page
        }
        onSelect={setPage}
      />
    </div>
  );
}