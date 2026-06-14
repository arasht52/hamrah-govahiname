import { useState } from "react";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import AIPage from "./pages/AIPage";
import LawsPage from "./pages/LawsPage";
import FahrschulenPage from "./pages/FahrschulenPage";

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
            onFinish={(result) => {
              setQuizResult(result);
              setPage("result");
            }}
            onBack={() => setPage("home")}
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
      </main>

      <BottomNav active={page} onSelect={setPage} />
    </div>
  );
}