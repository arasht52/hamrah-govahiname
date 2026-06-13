import { useState } from "react";
import { QUESTIONS } from "../data/questions";

export default function QuizPage({ onFinish }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const q = QUESTIONS[current];

  function chooseAnswer(i) {
    if (showAnswer) return;

    setSelected(i);
    setShowAnswer(true);

    if (i === q.ok) {
      setScore(score + 1);
    }
  }

  function nextQuestion() {
    if (current === QUESTIONS.length - 1) {
      onFinish({
        score: selected === q.ok ? score + 1 : score,
        total: QUESTIONS.length
      });
      return;
    }

    setCurrent(current + 1);
    setSelected(null);
    setShowAnswer(false);
  }

  return (
    <div>
      {/* Progress */}
      <div
        style={{
          height: 8,
          background: "#1a2f52",
          borderRadius: 5,
          overflow: "hidden",
          marginBottom: 20
        }}
      >
        <div
          style={{
            width: `${((current + 1) / QUESTIONS.length) * 100}%`,
            height: "100%",
            background: "#FF9500"
          }}
        />
      </div>

      <div style={{ color: "#8B949E", marginBottom: 12 }}>
        سوال {current + 1} از {QUESTIONS.length}
      </div>

      {/* Question */}
      <div
        style={{
          background: "#fff",
          color: "#0A2540",
          borderRadius: 18,
          padding: 20,
          marginBottom: 16
        }}
      >
        <h3>{q.q}</h3>
      </div>

      {/* Options */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}
      >
        {q.opts.map((option, i) => {
          let bg = "#1a2f52";
          let border = "#1e3a5f";

          if (showAnswer) {
            if (i === q.ok) {
              bg = "#14532d";
              border = "#22c55e";
            } else if (i === selected) {
              bg = "#7f1d1d";
              border = "#ef4444";
            }
          }

          return (
            <button
              key={i}
              onClick={() => chooseAnswer(i)}
              style={{
                padding: 14,
                borderRadius: 12,
                border: `2px solid ${border}`,
                background: bg,
                color: "#E6EDF3",
                fontFamily: "inherit",
                cursor: "pointer"
              }}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showAnswer && (
        <>
          <div
            style={{
              background: "#112240",
              border: "1px solid #1e3a5f",
              borderRadius: 16,
              padding: 16,
              marginTop: 20,
              lineHeight: 1.9
            }}
          >
            <div
              style={{
                color: "#7EE787",
                fontWeight: 800,
                marginBottom: 10
              }}
            >
              توضیح
            </div>

            <div>{q.exp}</div>

            <div
              style={{
                marginTop: 12,
                color: "#FFB340"
              }}
            >
              💡 {q.tip}
            </div>
          </div>

          <button
            onClick={nextQuestion}
            style={{
              width: "100%",
              marginTop: 18,
              padding: 14,
              border: "none",
              borderRadius: 12,
              background: "#FF9500",
              color: "#0A2540",
              fontWeight: 800,
              fontFamily: "inherit"
            }}
          >
            {current === QUESTIONS.length - 1
              ? "مشاهده نتیجه"
              : "سوال بعدی ←"}
          </button>
        </>
      )}
    </div>
  );
}