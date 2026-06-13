import { useState } from "react";

export default function QuizPage({ onFinish }) {
  const [selected, setSelected] = useState(null);

  const question = {
    text: "در تقاطع بدون تابلو، حق تقدم با کدام سمت است؟",
    options: [
      "چپ",
      "راست",
      "اول‌رسیده",
      "وسیله بزرگ‌تر"
    ],
    answer: 1
  };

  return (
    <div>
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          padding: 20,
          marginBottom: 16,
          color: "#0A2540"
        }}
      >
        <h3>{question.text}</h3>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}
      >
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            style={{
              padding: 14,
              borderRadius: 12,
              border: "1px solid #1e3a5f",
              background: "#1a2f52",
              color: "#E6EDF3",
              fontFamily: "inherit",
              cursor: "pointer"
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {selected !== null && (
        <button
          onClick={() =>
            onFinish({
              score: selected === question.answer ? 1 : 0
            })
          }
          style={{
            marginTop: 20,
            width: "100%",
            padding: 14,
            border: "none",
            borderRadius: 12,
            background: "#FF9500",
            color: "#0A2540",
            fontWeight: 800,
            fontFamily: "inherit"
          }}
        >
          مشاهده نتیجه
        </button>
      )}
    </div>
  );
}