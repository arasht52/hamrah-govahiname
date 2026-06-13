import { useState } from "react";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import AIPage from "./pages/AIPage";
import LawsPage from "./pages/LawsPage";
import FahrschulenPage from "./pages/FahrschulenPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [quizResult, setQuizResult] = useState(null);

  return (
    <div
      style={{
        fontFamily: "'Vazirmatn', sans-serif",
        direction: "rtl",
        background: "#0A2540",
        minHeight: "100vh",
        color: "#E6EDF3"
      }}
    >
      <Header />

      <main
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "70px 16px 90px"
        }}
      >
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
          />
        )}

        {page === "result" && (
          <ResultPage
            result={quizResult}
            onRetry={() => setPage("quiz")}
            onHome={() => setPage("home")}
          />
        )}

       {page === "ai" && (
  <AIPage
    onBack={() => setPage("home")}
  />
 )}

     {page === "laws" && (
  <LawsPage />
 )}
{page === "fahrschulen" && (
  <FahrschulenPage />
)}
      </main>

      <BottomNav
        active={page}
        onSelect={setPage}
      />
    </div>
  );
}