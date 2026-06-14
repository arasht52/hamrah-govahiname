import { useEffect, useState } from "react";
import { QUESTIONS } from "../data/questions";

const EXAM_LIMIT_MS = 45 * 60 * 1000;

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

export default function ExamQuizPage({ onFinish, onBack }) {
  const [queue] = useState(() => selectQuestions(QUESTIONS, 30));
  const [idx, setIdx] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [answersList, setAnswersList] = useState([]);
  const [marked, setMarked] = useState({});
  const [showTranslation, setShowTranslation] = useState(false);
  const [startTime] = useState(() => Date.now());
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() - startTime >= EXAM_LIMIT_MS) {
        setLocked(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const q = queue[idx];
  if (!q) return null;

  const questionText = q.q_de || q.q;
  const questionFa = q.q_fa;
  const options = q.opts_de || q.opts || [];
  const optionsFa = q.opts_fa || [];
  const hasTranslation = Boolean(questionFa || optionsFa.length);
  const progress = ((idx + 1) / queue.length) * 100;
  const currentMarked = !!marked[q.id];

  function toggleAnswer(optionIndex) {
    if (locked) return;

    setChosenAnswers((prev) =>
      prev.includes(optionIndex)
        ? prev.filter((x) => x !== optionIndex)
        : [...prev, optionIndex]
    );
  }

  function submitAnswer() {
    if (chosenAnswers.length === 0 || locked) return;

    const correctAnswers = normalizeOk(q.ok);
    const correct = isExactAnswer(chosenAnswers, correctAnswers);

    const record = {
      question: q,
      correct,
      chosenAnswers: [...chosenAnswers],
      fehlerpunkte: correct ? 0 : q.points || 2,
      marked: currentMarked
    };

    const updated = [...answersList, record];
    setAnswersList(updated);

    if (idx + 1 >= queue.length) {
      onFinish({
        answersList: updated,
        isExamMode: true
      });
      return;
    }

    setIdx((prev) => prev + 1);
    setChosenAnswers([]);
    setShowTranslation(false);
  }

  function resetExam() {
    onBack();
  }

  if (locked) {
    return (
      <div style={lockedCard}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>⏱️</div>

        <h2 style={lockedTitle}>
          Die Bearbeitungszeit ist abgelaufen.
        </h2>

        <p style={lockedText}>
          Bitte starten Sie die Prüfung erneut.
        </p>

        <button onClick={resetExam} style={primaryBtn}>
          Neue Prüfung starten
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={examHeader}>
        <button onClick={onBack} style={backBtn}>
          ← Ende
        </button>

        <div style={headerCenter}>
          <div style={modeBadge}>Prüfung</div>
          <div style={counter}>Frage {idx + 1} / {queue.length}</div>
        </div>

        <div style={pointsBadge}>{q.points || 2} Punkte</div>
      </div>

      <div style={progressBar}>
        <div style={{ ...progressFill, width: `${progress}%` }} />
      </div>

      <div style={questionCard}>
        <div style={questionTopRow}>
          <h2 style={questionTitle}>{questionText}</h2>

          {hasTranslation && (
            <button
              onClick={() => setShowTranslation((prev) => !prev)}
              style={translationBtn}
            >
              فارسی
            </button>
          )}
        </div>

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

          return (
            <button
              key={i}
              onClick={() => toggleAnswer(i)}
              style={{
                ...optionBtn,
                border: selected ? "2px solid #168A3A" : "2px solid #BBD7C0",
                background: selected ? "#E8F6E8" : "#FFFFFF"
              }}
            >
              <span
                style={{
                  ...checkbox,
                  background: selected ? "#168A3A" : "#FFFFFF",
                  borderColor: selected ? "#168A3A" : "#9CA3AF",
                  color: selected ? "#FFFFFF" : "transparent"
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

      <div style={questionGrid}>
        {queue.map((item, i) => {
          const answered = i < answersList.length;
          const isCurrent = i === idx;
          const isMarked = marked[item.id];

          return (
            <div
              key={item.id || i}
              style={{
                ...gridItem,
                background: isCurrent
                  ? "#111827"
                  : isMarked
                  ? "#FACC15"
                  : answered
                  ? "#168A3A"
                  : "#FFFFFF",
                color: isCurrent
                  ? "#FFFFFF"
                  : isMarked
                  ? "#111827"
                  : answered
                  ? "#FFFFFF"
                  : "#168A3A",
                borderColor: isCurrent ? "#111827" : "#BBD7C0"
              }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>

      <div style={actionRow}>
        <button
          onClick={() =>
            setMarked((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
          }
          style={{
            ...markBtn,
            background: currentMarked ? "#FACC15" : "#FFFFFF",
            color: currentMarked ? "#111827" : "#168A3A",
            borderColor: currentMarked ? "#FACC15" : "#BBD7C0"
          }}
        >
          {currentMarked ? "Markiert" : "Markieren"}
        </button>

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
      </div>
    </div>
  );
}

const examHeader = {
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

const headerCenter = {
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

const questionTopRow = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12
};

const questionTitle = {
  margin: 0,
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
  color: "#111827",
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

const questionGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(10, 1fr)",
  gap: 6,
  marginTop: 16,
  marginBottom: 16
};

const gridItem = {
  height: 34,
  border: "1px solid",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  fontWeight: 950
};

const actionRow = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gap: 10,
  marginBottom: 20
};

const markBtn = {
  border: "1px solid",
  borderRadius: 14,
  padding: "15px 0",
  fontWeight: 950,
  fontFamily: "inherit",
  cursor: "pointer"
};

const primaryBtn = {
  background: "#168A3A",
  border: "none",
  borderRadius: 14,
  padding: "15px 0",
  color: "#FFFFFF",
  fontWeight: 950,
  fontFamily: "inherit",
  fontSize: 15
};

const lockedCard = {
  background: "#FFFFFF",
  border: "1px solid #FCA5A5",
  borderRadius: 20,
  padding: 26,
  textAlign: "center",
  boxShadow: "0 6px 18px rgba(220,38,38,0.08)"
};

const lockedTitle = {
  color: "#DC2626",
  marginBottom: 10,
  fontSize: 20,
  fontWeight: 950
};

const lockedText = {
  color: "#64736A",
  lineHeight: 1.8,
  marginBottom: 18
};