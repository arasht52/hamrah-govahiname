
import { useState } from "react";
import { QUESTIONS } from "../data/questions";

const LETTERS = ["الف", "ب", "پ", "ت"];

const TOPIC_INFO = {
  Vorfahrt: { label: "حق تقدم", icon: "🚦" },
  Geschwindigkeit: { label: "سرعت", icon: "⚡" },
  Sicherheit: { label: "ایمنی", icon: "🛡️" },
  Verkehrszeichen: { label: "علائم", icon: "🔵" },
  Alkohol: { label: "الکل و مواد", icon: "🍺" }
};

const MODES = [
  { id: "all", icon: "🎯", label: "همه موضوعات", sub: "آزمون ترکیبی" },
  { id: "Vorfahrt", icon: "🚦", label: "حق تقدم", sub: "Rechts vor Links" },
  { id: "Geschwindigkeit", icon: "⚡", label: "سرعت", sub: "محدودیت‌های سرعت" },
  { id: "Verkehrszeichen", icon: "🔵", label: "علائم", sub: "تابلوهای ترافیکی" },
  { id: "Sicherheit", icon: "🛡️", label: "ایمنی", sub: "کمک‌های اولیه" },
  { id: "Alkohol", icon: "🍺", label: "الکل", sub: "حدود مجاز" }
];

function selectQuestions(pool, count) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function normalizeOk(ok) {
  return Array.isArray(ok) ? ok : [ok];
}

function arraysEqualAsSet(a, b) {
  if (a.length !== b.length) return false;
  return a.every((x) => b.includes(x));
}

export default function QuizPage({ onFinish, onBack }) {
  const [mode, setMode] = useState("all");
  const [phase, setPhase] = useState("select");
  const [queue, setQueue] = useState([]);
  const [idx, setIdx] = useState(0);
  const [examMode, setExamMode] = useState(false);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [answersList, setAnswersList] = useState([]);
  const [marked, setMarked] = useState({});

  function start(selectedMode, isExam) {
    const pool =
      selectedMode === "all"
        ? QUESTIONS
        : QUESTIONS.filter((q) => q.topic === selectedMode);

    const count = isExam ? 30 : 10;
    const selectedQuestions = selectQuestions(pool, count);

    setQueue(selectedQuestions);
    setIdx(0);
    setExamMode(isExam);
    setChosenAnswers([]);
    setSubmitted(false);
    setAnswersList([]);
    setMarked({});
    setPhase("active");
  }

  function toggleAnswer(optionIndex) {
    if (submitted) return;

    setChosenAnswers((prev) =>
      prev.includes(optionIndex)
        ? prev.filter((x) => x !== optionIndex)
        : [...prev, optionIndex]
    );
  }

  function checkCurrentAnswer(question, chosen) {
    const correctAnswers = normalizeOk(question.ok);
    return arraysEqualAsSet(chosen, correctAnswers);
  }

  function buildAnswerRecord() {
    const currentQuestion = queue[idx];
    const isCorrect = checkCurrentAnswer(currentQuestion, chosenAnswers);

    return {
      question: currentQuestion,
      correct: isCorrect,
      chosenAnswers: [...chosenAnswers],
      fehlerpunkte: isCorrect ? 0 : currentQuestion.points || 2
    };
  }

  function submitAnswer() {
    if (chosenAnswers.length === 0) return;
    setSubmitted(true);
  }

  function nextQuestion() {
    const record = buildAnswerRecord();
    const updated = [...answersList, record];

    setAnswersList(updated);

    if (idx + 1 >= queue.length) {
      onFinish({
        answersList: updated,
        isExamMode: examMode
      });
      return;
    }

    setIdx(idx + 1);
    setChosenAnswers([]);
    setSubmitted(false);
  }

  if (phase === "select") {
    return (
      <div>
        <div style={topRow}>
          <button onClick={onBack} style={ghostBtn}>
            ← برگشت
          </button>

          <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>
            انتخاب حالت آزمون
          </h2>
        </div>

        <div style={modeGrid}>
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              style={{
                ...modeBtn,
                border:
                  mode === m.id ? "2px solid #FF9500" : "2px solid #1e3a5f",
                background:
                  mode === m.id ? "rgba(255,149,0,0.1)" : "#1a2f52"
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 5 }}>{m.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#E6EDF3" }}>
                {m.label}
              </div>
              <div style={{ fontSize: 11, color: "#8B949E" }}>{m.sub}</div>
            </button>
          ))}
        </div>

        <div style={startGrid}>
          <button onClick={() => start(mode, false)} style={primaryBtn}>
            📝 تمرین ۱۰ سوالی
          </button>

          <button onClick={() => start(mode, true)} style={examBtn}>
            🎓 شبیه‌ساز آزمون ۳۰ سوالی
          </button>
        </div>
      </div>
    );
  }

  const q = queue[idx];
  if (!q) return null;

  const topicInfo = TOPIC_INFO[q.topic] || { label: q.topic, icon: "📋" };
  const correctAnswers = normalizeOk(q.ok);
  const progress = ((idx + 1) / queue.length) * 100;

  return (
    <div>
      <div style={examHeader}>
        <div>
          <div style={{ fontSize: 12, color: "#8B949E" }}>
            {examMode ? "🎓 آزمون شبیه‌سازی‌شده" : "📝 حالت تمرین"}
          </div>

          <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4 }}>
            {idx + 1} / {queue.length}
          </div>
        </div>

        <div style={pointsBox}>
          <div style={{ fontSize: 11, color: "#8B949E" }}>Punkte</div>
          <div
            style={{
              color: q.points === 5 ? "#FCA5A5" : "#FFB340",
              fontWeight: 900,
              fontSize: 20
            }}
          >
            {q.points || 2}
          </div>
        </div>
      </div>

      <div style={progressBar}>
        <div style={{ ...progressFill, width: `${progress}%` }} />
      </div>

      <div style={questionCard}>
        <div style={questionMeta}>
          <span>
            {topicInfo.icon} {topicInfo.label}
          </span>

          <span style={miniBadge}>
            {correctAnswers.length > 1
              ? `${correctAnswers.length} پاسخ صحیح`
              : "۱ پاسخ صحیح"}
          </span>
        </div>

        {q.image_url && (
          <img
            src={q.image_url}
            alt="سوال"
            style={{
              width: "100%",
              borderRadius: 12,
              marginBottom: 14,
              border: "1px solid #ddd"
            }}
          />
        )}

        {q.video_url && (
          <video
            src={q.video_url}
            controls
            style={{
              width: "100%",
              borderRadius: 12,
              marginBottom: 14
            }}
          />
        )}

        <h3 style={questionText}>{q.q}</h3>
      </div>

      <div style={optionsBox}>
        {q.opts.map((opt, i) => {
          const selected = chosenAnswers.includes(i);
          const correct = correctAnswers.includes(i);

          let bg = "#1a2f52";
          let border = "#1e3a5f";
          let color = "#E6EDF3";

          if (!submitted && selected) {
            bg = "rgba(255,149,0,0.08)";
            border = "#FF9500";
            color = "#FFB340";
          }

          if (submitted && !examMode) {
            if (correct) {
              bg = "rgba(46,160,67,0.18)";
              border = "#2EA043";
              color = "#7EE787";
            } else if (selected && !correct) {
              bg = "rgba(239,68,68,0.14)";
              border = "#EF4444";
              color = "#FCA5A5";
            } else {
              color = "#4D6080";
            }
          }

          if (submitted && examMode && selected) {
            bg = "#112240";
            border = "#8B949E";
          }

          return (
            <button
              key={i}
              onClick={() => toggleAnswer(i)}
              disabled={submitted}
              style={{
                ...optionBtn,
                background: bg,
                border: `2px solid ${border}`,
                color
              }}
            >
              <span
                style={{
                  ...checkBox,
                  background: selected ? "#FF9500" : "#112240",
                  borderColor: selected ? "#FF9500" : "#1e3a5f",
                  color: selected ? "#0A2540" : "#8B949E"
                }}
              >
                {selected ? "✓" : ""}
              </span>

              <span style={letterBadge}>{LETTERS[i]}</span>

              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {submitted && !examMode && (
        <div style={explanationBox}>
          <div style={{ color: "#60A5FA", fontWeight: 800, marginBottom: 8 }}>
            💡 توضیح پاسخ
          </div>

          <div style={{ color: "#E6EDF3", lineHeight: 1.9, fontSize: 13 }}>
            {q.exp}
          </div>

          {q.tip && (
            <div style={tipBox}>
              📌 {q.tip}
            </div>
          )}
        </div>
      )}

      {submitted && examMode && (
        <div style={examNotice}>
          پاسخ ثبت شد. در حالت آزمون، پاسخ صحیح تا پایان آزمون نمایش داده نمی‌شود.
        </div>
      )}

      <div style={actionRow}>
        <button
          onClick={() =>
            setMarked((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
          }
          style={{
            ...secondaryAction,
            color: marked[q.id] ? "#FFB340" : "#8B949E",
            borderColor: marked[q.id] ? "#FF9500" : "#1e3a5f"
          }}
        >
          {marked[q.id] ? "⭐ علامت‌دار" : "☆ Markieren"}
        </button>

        {!submitted ? (
          <button
            onClick={submitAnswer}
            disabled={chosenAnswers.length === 0}
            style={{
              ...mainAction,
              opacity: chosenAnswers.length === 0 ? 0.45 : 1
            }}
          >
            Abgabe / ثبت پاسخ
          </button>
        ) : (
          <button onClick={nextQuestion} style={mainAction}>
            {idx + 1 < queue.length ? "Weiter / سوال بعدی" : "نتیجه آزمون"}
          </button>
        )}
      </div>
    </div>
  );
}

const topRow = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 20
};

const ghostBtn = {
  background: "transparent",
  border: "1px solid #1e3a5f",
  borderRadius: 8,
  padding: "6px 12px",
  color: "#8B949E",
  cursor: "pointer",
  fontSize: 13,
  fontFamily: "inherit"
};

const modeGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
  gap: 10,
  marginBottom: 16
};

const modeBtn = {
  textAlign: "right",
  padding: 14,
  borderRadius: 16,
  cursor: "pointer",
  fontFamily: "inherit"
};

const startGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10
};

const primaryBtn = {
  background: "#FF9500",
  border: "none",
  borderRadius: 12,
  padding: "14px 0",
  fontSize: 15,
  fontWeight: 800,
  color: "#0A2540",
  cursor: "pointer",
  fontFamily: "inherit"
};

const examBtn = {
  background: "#1a2f52",
  border: "2px solid #FF9500",
  borderRadius: 12,
  padding: "14px 0",
  fontSize: 15,
  fontWeight: 800,
  color: "#FFB340",
  cursor: "pointer",
  fontFamily: "inherit"
};

const examHeader = {
  background: "#112240",
  border: "1px solid #1e3a5f",
  borderRadius: 16,
  padding: "12px 14px",
  marginBottom: 10,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const pointsBox = {
  background: "#0A2540",
  border: "1px solid #1e3a5f",
  borderRadius: 12,
  padding: "8px 14px",
  textAlign: "center"
};

const progressBar = {
  height: 6,
  background: "#1a2f52",
  borderRadius: 6,
  overflow: "hidden",
  marginBottom: 16
};

const progressFill = {
  height: "100%",
  background: "linear-gradient(90deg,#FF9500,#FFB340)",
  transition: "width .3s"
};

const questionCard = {
  background: "#fff",
  color: "#0A2540",
  borderRadius: 18,
  padding: 18,
  marginBottom: 14,
  boxShadow: "0 8px 32px rgba(0,0,0,0.28)"
};

const questionMeta = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
  marginBottom: 12,
  fontSize: 11,
  fontWeight: 800,
  color: "#0A2540"
};

const miniBadge = {
  background: "#FEF3C7",
  color: "#92400E",
  borderRadius: 8,
  padding: "3px 8px"
};

const questionText = {
  fontSize: 16,
  lineHeight: 1.7,
  margin: 0
};

const optionsBox = {
  display: "flex",
  flexDirection: "column",
  gap: 9
};

const optionBtn = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "13px 14px",
  borderRadius: 12,
  fontFamily: "inherit",
  fontSize: 14,
  fontWeight: 700,
  textAlign: "right",
  cursor: "pointer"
};

const checkBox = {
  width: 24,
  height: 24,
  borderRadius: 6,
  border: "2px solid",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  fontWeight: 900
};

const letterBadge = {
  width: 24,
  height: 24,
  borderRadius: 6,
  background: "#0A2540",
  color: "#8B949E",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  fontSize: 11,
  fontWeight: 800
};

const explanationBox = {
  marginTop: 16,
  background: "#112240",
  border: "1px solid #1e3a5f",
  borderRadius: 14,
  padding: 16
};

const tipBox = {
  marginTop: 12,
  background: "rgba(96,165,250,0.08)",
  border: "1px solid rgba(96,165,250,0.2)",
  borderRadius: 10,
  padding: 10,
  color: "#93C5FD",
  fontSize: 12,
  lineHeight: 1.8
};

const examNotice = {
  marginTop: 16,
  background: "#112240",
  border: "1px solid #1e3a5f",
  borderRadius: 12,
  padding: 12,
  color: "#8B949E",
  fontSize: 12,
  lineHeight: 1.8,
  textAlign: "center"
};

const actionRow = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gap: 10,
  marginTop: 18
};

const secondaryAction = {
  background: "#112240",
  border: "1px solid #1e3a5f",
  borderRadius: 12,
  padding: "12px 0",
  fontFamily: "inherit",
  fontWeight: 800,
  cursor: "pointer"
};

const mainAction = {
  background: "#FF9500",
  border: "none",
  borderRadius: 12,
  padding: "12px 0",
  color: "#0A2540",
  fontFamily: "inherit",
  fontWeight: 900,
  cursor: "pointer"
};