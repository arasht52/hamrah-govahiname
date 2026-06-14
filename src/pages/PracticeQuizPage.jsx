import { useState } from "react";
import { QUESTIONS } from "../data/questions";

function selectQuestions(pool, count) {
  return [...pool]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, pool.length));
}

function normalizeOk(ok) {
  return Array.isArray(ok) ? ok : [ok];
}

function isExactAnswer(chosen, correct) {
  return (
    chosen.length === correct.length &&
    chosen.every((x) => correct.includes(x))
  );
}

export default function PracticeQuizPage({ onFinish, onBack }) {
  const [queue] = useState(() => selectQuestions(QUESTIONS, 10));
  const [idx, setIdx] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [answersList, setAnswersList] = useState([]);
  const [showTranslation, setShowTranslation] = useState(false);

  const q = queue[idx];
  if (!q) return null;

  const questionText = q.q_de || q.q;
  const questionFa = q.q_fa;
  const options = q.opts_de || q.opts || [];
  const optionsFa = q.opts_fa || [];
  const correctAnswers = normalizeOk(q.ok);
  const progress = ((idx + 1) / queue.length) * 100;
  const hasTranslation = Boolean(questionFa || optionsFa.length);

  function toggleAnswer(optionIndex) {
    if (submitted) return;

    setChosenAnswers((prev) =>
      prev.includes(optionIndex)
        ? prev.filter((x) => x !== optionIndex)
        : [...prev, optionIndex]
    );
  }

  function submitAnswer() {
    if (chosenAnswers.length === 0) return;
    setSubmitted(true);
  }

  function nextQuestion() {
    const correct = isExactAnswer(chosenAnswers, correctAnswers);

    const record = {
      question: q,
      correct,
      chosenAnswers: [...chosenAnswers],
      fehlerpunkte: correct ? 0 : q.points || 2,
      marked: false
    };

    const updated = [...answersList, record];
    setAnswersList(updated);

    if (idx + 1 >= queue.length) {
      onFinish({
        answersList: updated,
        isExamMode: false
      });
      return;
    }

    setIdx((prev) => prev + 1);
    setChosenAnswers([]);
    setSubmitted(false);
    setShowTranslation(false);
  }

  return (
    <div>
      <div style={topBar}>
        <button onClick={onBack} style={backBtn}>
          ← Zurück
        </button>

        <div style={topInfo}>
          <div style={modeBadge}>Lernmodus</div>
          <div style={counter}>Frage {idx + 1} / {queue.length}</div>
        </div>

        <div style={pointsBadge}>{q.points || 2} Punkte</div>
      </div>

      <div style={progressBar}>
        <div style={{ ...progressFill, width: `${progress}%` }} />
      </div>

      <div style={questionCard}>
        <h2 style={questionTitle}>{questionText}</h2>

        {hasTranslation && (
          <button
            onClick={() => setShowTranslation((prev) => !prev)}
            style={translationBtn}
          >
            فارسی
          </button>
        )}

        {showTranslation && questionFa && (
          <div style={translationBox}>{questionFa}</div>
        )}

        {q.image_url && (
          <img src={q.image_url} alt="Frage" style={mediaStyle} />
        )}

        {q.video_url && (
          <video src={q.video_url} controls style={mediaStyle} />
        )}
      </div>

      <div style={optionsBox}>
        {options.map((option, i) => {
          const selected = chosenAnswers.includes(i);
          const isCorrect = correctAnswers.includes(i);

          let border = "#BBD7C0";
          let background = "#FFFFFF";
          let textColor = "#111827";

          if (!submitted && selected) {
            border = "#168A3A";
            background = "#E8F6E8";
          }

          if (submitted) {
            if (isCorrect) {
              border = "#168A3A";
              background = "#E8F6E8";
              textColor = "#14532D";
            } else if (selected && !isCorrect) {
              border = "#DC2626";
              background = "#FEF2F2";
              textColor = "#991B1B";
            }
          }

          return (
            <button
              key={i}
              onClick={() => toggleAnswer(i)}
              style={{
                ...optionBtn,
                border: `2px solid ${border}`,
                background,
                color: textColor
              }}
            >
              <span
                style={{
                  ...checkbox,
                  borderColor: selected || (submitted && isCorrect)
                    ? border
                    : "#9CA3AF",
                  background: selected || (submitted && isCorrect)
                    ? border
                    : "#FFFFFF",
                  color: selected || (submitted && isCorrect)
                    ? "#FFFFFF"
                    : "transparent"
                }}
              >
                ✓
              </span>

              <span style={{ flex: 1 }}>
                <span>{option}</span>

                {showTranslation && optionsFa[i] && (
                  <span style={optionTranslation}>{optionsFa[i]}</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {submitted && (
        <div style={explanationCard}>
          <div style={explanationTitle}>
            {isExactAnswer(chosenAnswers, correctAnswers)
              ? "✅ Richtig"
              : "❌ Falsch"}
          </div>

          <div style={explanationText}>
            {q.exp_fa || q.exp || "برای این سؤال هنوز توضیح فارسی ثبت نشده است."}
          </div>

          {(q.tip_fa || q.tip) && (
            <div style={tipBox}>💡 {q.tip_fa || q.tip}</div>
          )}
        </div>
      )}

      <div style={actionRow}>
        {!submitted ? (
          <button
            onClick={submitAnswer}
            disabled={chosenAnswers.length === 0}
            style={{
              ...primaryBtn,
              opacity: chosenAnswers.length === 0 ? 0.45 : 1,
              cursor: chosenAnswers.length === 0 ? "default" : "pointer"
            }}
          >
            Abgabe
          </button>
        ) : (
          <button onClick={nextQuestion} style={primaryBtn}>
            {idx + 1 < queue.length ? "Weiter" : "Ergebnis anzeigen"}
          </button>
        )}
      </div>
    </div>
  );
}

const topBar = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  marginBottom: 12
};

const backBtn = {
  background: "#FFFFFF",
  border: "1px solid #BBD7C0",
  borderRadius: 10,
  padding: "8px 12px",
  color: "#168A3A",
  fontWeight: 900,
  cursor: "pointer",
  fontFamily: "inherit"
};

const topInfo = {
  textAlign: "center"
};

const modeBadge = {
  display: "inline-block",
  background: "#E8F6E8",
  border: "1px solid #BBD7C0",
  color: "#168A3A",
  borderRadius: 18,
  padding: "4px 10px",
  fontSize: 11,
  fontWeight: 950,
  marginBottom: 4
};

const counter = {
  color: "#111827",
  fontSize: 13,
  fontWeight: 900
};

const pointsBadge = {
  background: "#FFFFFF",
  border: "1px solid #BBD7C0",
  color: "#111827",
  borderRadius: 10,
  padding: "8px 10px",
  fontSize: 12,
  fontWeight: 950
};

const progressBar = {
  height: 6,
  background: "#D7EADB",
  borderRadius: 6,
  overflow: "hidden",
  marginBottom: 16
};

const progressFill = {
  height: "100%",
  background: "#168A3A",
  transition: "width .25s"
};

const questionCard = {
  background: "#FFFFFF",
  border: "1px solid #BBD7C0",
  borderRadius: 20,
  padding: 20,
  marginBottom: 14,
  boxShadow: "0 6px 18px rgba(22,138,58,0.08)"
};

const questionTitle = {
  margin: "0 0 14px",
  color: "#111827",
  fontSize: 18,
  lineHeight: 1.6,
  fontWeight: 950,
  direction: "ltr",
  textAlign: "left"
};

const translationBtn = {
  background: "#F4FBF4",
  border: "1px solid #BBD7C0",
  borderRadius: 10,
  padding: "7px 14px",
  color: "#168A3A",
  fontWeight: 900,
  fontFamily: "inherit",
  cursor: "pointer"
};

const translationBox = {
  marginTop: 12,
  background: "#F4FBF4",
  border: "1px solid #D7EADB",
  borderRadius: 12,
  padding: 12,
  color: "#374151",
  fontSize: 13,
  lineHeight: 1.9
};

const mediaStyle = {
  width: "100%",
  borderRadius: 14,
  marginTop: 14,
  border: "1px solid #D7EADB"
};

const optionsBox = {
  display: "flex",
  flexDirection: "column",
  gap: 10
};

const optionBtn = {
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  padding: "15px 16px",
  borderRadius: 14,
  fontFamily: "inherit",
  fontSize: 15,
  fontWeight: 800,
  textAlign: "left",
  cursor: "pointer",
  direction: "ltr"
};

const checkbox = {
  width: 28,
  height: 28,
  borderRadius: 7,
  border: "2px solid",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 950,
  flexShrink: 0
};

const optionTranslation = {
  display: "block",
  marginTop: 6,
  direction: "rtl",
  textAlign: "right",
  color: "#64736A",
  fontSize: 12,
  lineHeight: 1.7
};

const explanationCard = {
  marginTop: 16,
  background: "#FFFFFF",
  border: "1px solid #BBD7C0",
  borderRadius: 16,
  padding: 16
};

const explanationTitle = {
  color: "#168A3A",
  fontSize: 14,
  fontWeight: 950,
  marginBottom: 8
};

const explanationText = {
  color: "#374151",
  fontSize: 13,
  lineHeight: 1.9
};

const tipBox = {
  marginTop: 10,
  background: "#FFF7ED",
  border: "1px solid #FDBA74",
  color: "#9A3412",
  borderRadius: 12,
  padding: 10,
  fontSize: 12,
  lineHeight: 1.8
};

const actionRow = {
  marginTop: 18
};

const primaryBtn = {
  width: "100%",
  background: "#168A3A",
  border: "none",
  borderRadius: 14,
  padding: "15px 0",
  color: "#FFFFFF",
  fontWeight: 950,
  fontFamily: "inherit",
  fontSize: 15
};