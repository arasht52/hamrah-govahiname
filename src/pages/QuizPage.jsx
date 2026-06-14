import { useEffect, useState } from "react";
import { QUESTIONS } from "../data/questions";

const EXAM_LIMIT_MS = 45 * 60 * 1000;

const TOPIC_INFO = {
  Vorfahrt: { label: "Vorfahrt", icon: "🚦" },
  Geschwindigkeit: { label: "Geschwindigkeit", icon: "⚡" },
  Sicherheit: { label: "Sicherheit", icon: "🛡️" },
  Verkehrszeichen: { label: "Verkehrszeichen", icon: "🔵" },
  Alkohol: { label: "Alkohol", icon: "🍺" }
};

const MODES = [
  { id: "all", icon: "🎯", label: "Alle Themen", sub: "Gemischte Fragen" },
  { id: "Vorfahrt", icon: "🚦", label: "Vorfahrt", sub: "Rechts vor links" },
  { id: "Geschwindigkeit", icon: "⚡", label: "Geschwindigkeit", sub: "Tempolimits" },
  { id: "Verkehrszeichen", icon: "🔵", label: "Verkehrszeichen", sub: "Schilder" },
  { id: "Sicherheit", icon: "🛡️", label: "Sicherheit", sub: "Verhalten & Hilfe" },
  { id: "Alkohol", icon: "🍺", label: "Alkohol", sub: "Promillegrenzen" }
];

function selectQuestions(pool, count) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length));
}

function normalizeOk(ok) {
  return Array.isArray(ok) ? ok : [ok];
}

function isExactAnswer(chosen, correct) {
  return chosen.length === correct.length && chosen.every((x) => correct.includes(x));
}

export default function QuizPage({ onFinish, onBack }) {
  const [mode, setMode] = useState("all");
  const [phase, setPhase] = useState("select");
  const [queue, setQueue] = useState([]);
  const [idx, setIdx] = useState(0);
  const [examMode, setExamMode] = useState(false);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [answersList, setAnswersList] = useState([]);
  const [marked, setMarked] = useState({});
  const [showTranslation, setShowTranslation] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (phase !== "active" || !startTime) return;

    const timer = setInterval(() => {
      if (Date.now() - startTime >= EXAM_LIMIT_MS) {
        setLocked(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, startTime]);

  function resetExam() {
    setPhase("select");
    setQueue([]);
    setIdx(0);
    setExamMode(false);
    setChosenAnswers([]);
    setAnswersList([]);
    setMarked({});
    setShowTranslation(false);
    setStartTime(null);
    setLocked(false);
  }

  function start(selectedMode, isExam) {
    const pool =
      selectedMode === "all"
        ? QUESTIONS
        : QUESTIONS.filter((q) => q.topic === selectedMode);

    setQueue(selectQuestions(pool, isExam ? 30 : 10));
    setIdx(0);
    setExamMode(isExam);
    setChosenAnswers([]);
    setAnswersList([]);
    setMarked({});
    setShowTranslation(false);
    setStartTime(Date.now());
    setLocked(false);
    setPhase("active");
  }

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

    const currentQuestion = queue[idx];
    const correctAnswers = normalizeOk(currentQuestion.ok);
    const correct = isExactAnswer(chosenAnswers, correctAnswers);

    const record = {
      question: currentQuestion,
      correct,
      chosenAnswers: [...chosenAnswers],
      fehlerpunkte: correct ? 0 : currentQuestion.points || 2,
      marked: !!marked[currentQuestion.id]
    };

    const updatedAnswers = [...answersList, record];
    setAnswersList(updatedAnswers);

    if (idx + 1 >= queue.length) {
      onFinish({
        answersList: updatedAnswers,
        isExamMode: examMode
      });
      return;
    }

    setIdx((prev) => prev + 1);
    setChosenAnswers([]);
    setShowTranslation(false);
  }

  if (phase === "select") {
    return (
      <div>
        <div style={topRow}>
          <button onClick={onBack} style={ghostBtn}>← Zurück</button>
          <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>
            Prüfung auswählen
          </h2>
        </div>

        <div style={modeGrid}>
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              style={{
                ...modeBtn,
                border: mode === m.id ? "2px solid #FF9500" : "2px solid #1e3a5f",
                background: mode === m.id ? "rgba(255,149,0,0.1)" : "#1a2f52"
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 5 }}>{m.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 13, color: "#E6EDF3" }}>{m.label}</div>
              <div style={{ fontSize: 11, color: "#8B949E" }}>{m.sub}</div>
            </button>
          ))}
        </div>

        <div style={startGrid}>
          <button onClick={() => start(mode, false)} style={primaryBtn}>
            Lernmodus · 10 Fragen
          </button>

          <button onClick={() => start(mode, true)} style={examBtn}>
            Prüfung · 30 Fragen
          </button>
        </div>
      </div>
    );
  }

  const q = queue[idx];
  if (!q) return null;

  const topicInfo = TOPIC_INFO[q.topic] || { label: q.topic || "Thema", icon: "📋" };
  const questionText = q.q_de || q.q;
  const questionFa = q.q_fa;
  const options = q.opts_de || q.opts || [];
  const optionsFa = q.opts_fa || [];
  const hasTranslation = Boolean(questionFa || optionsFa.length);
  const progress = ((idx + 1) / queue.length) * 100;
  const currentMarked = !!marked[q.id];

  if (locked) {
    return (
      <div style={lockedBox}>
        <div style={{ fontSize: 46, marginBottom: 14 }}>⏱️</div>
        <h2 style={{ color: "#FCA5A5", marginBottom: 12 }}>
          Die Bearbeitungszeit ist abgelaufen.
        </h2>
        <p style={{ color: "#8B949E", lineHeight: 1.8 }}>
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
      <div style={examTop}>
        <div style={modeBadge}>{examMode ? "Prüfung" : "Lernmodus"}</div>
        <div style={pointsText}>{q.points || 2} Punkte</div>
        <div style={questionCounter}>Frage {idx + 1} / {queue.length}</div>
      </div>

      <div style={progressBar}>
        <div style={{ ...progressFill, width: `${progress}%` }} />
      </div>

      <div style={questionCard}>
        <div style={topicBadge}>
          {topicInfo.label} {topicInfo.icon}
        </div>

        <h3 style={questionTextStyle}>{questionText}</h3>

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

          return (
            <button
              key={i}
              onClick={() => toggleAnswer(i)}
              style={{
                ...optionBtn,
                border: selected ? "2px solid #FF9500" : "2px solid #1e3a5f",
                background: selected ? "rgba(255,149,0,0.08)" : "#1a2f52"
              }}
            >
              <span style={{ flex: 1 }}>
                <span>{option}</span>

                {showTranslation && optionsFa[i] && (
                  <span style={optionTranslation}>
                    {optionsFa[i]}
                  </span>
                )}
              </span>

              <span
                style={{
                  ...checkbox,
                  background: selected ? "#FF9500" : "transparent",
                  borderColor: selected ? "#FF9500" : "#4D6080",
                  color: selected ? "#0A2540" : "transparent"
                }}
              >
                ✓
              </span>
            </button>
          );
        })}
      </div>

      <div style={actionRow}>
        <button
          onClick={() =>
            setMarked((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
          }
          style={{
            ...secondaryAction,
            color: currentMarked ? "#FFB340" : "#8B949E",
            borderColor: currentMarked ? "#FF9500" : "#1e3a5f"
          }}
        >
          {currentMarked ? "Markiert 🚩" : "Markieren 🚩"}
        </button>

        <button
          onClick={submitAnswer}
          disabled={chosenAnswers.length === 0}
          style={{
            ...mainAction,
            background: chosenAnswers.length === 0 ? "#1e3a5f" : "#FF9500",
            color: chosenAnswers.length === 0 ? "#4D6080" : "#0A2540",
            cursor: chosenAnswers.length === 0 ? "default" : "pointer"
          }}
        >
          ✓ Abgabe
        </button>
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
  padding: "14px 18px",
  fontSize: 15,
  fontWeight: 900,
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
  fontWeight: 900,
  color: "#FFB340",
  cursor: "pointer",
  fontFamily: "inherit"
};

const examTop = {
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  gap: 10,
  marginBottom: 10
};

const modeBadge = {
  justifySelf: "start",
  border: "1px solid rgba(252,165,165,0.35)",
  background: "rgba(252,165,165,0.08)",
  color: "#FCA5A5",
  borderRadius: 8,
  padding: "4px 10px",
  fontSize: 12,
  fontWeight: 800
};

const pointsText = {
  color: "#8B949E",
  fontSize: 13,
  fontWeight: 800
};

const questionCounter = {
  justifySelf: "end",
  color: "#8B949E",
  fontSize: 14,
  fontWeight: 900
};

const progressBar = {
  height: 4,
  background: "#1a2f52",
  borderRadius: 4,
  overflow: "hidden",
  marginBottom: 18
};

const progressFill = {
  height: "100%",
  background: "#FF9500",
  transition: "width .25s"
};

const questionCard = {
  position: "relative",
  background: "#fff",
  color: "#0A2540",
  borderRadius: 20,
  padding: 24,
  marginBottom: 14,
  minHeight: 150
};

const topicBadge = {
  position: "absolute",
  top: 22,
  left: 22,
  background: "#F3F4F6",
  borderRadius: 8,
  padding: "6px 10px",
  fontSize: 12,
  fontWeight: 900
};

const questionTextStyle = {
  fontSize: 17,
  lineHeight: 1.7,
  marginTop: 42,
  marginBottom: 16
};

const translationBtn = {
  background: "#fff",
  border: "1px solid #CBD5E1",
  borderRadius: 10,
  padding: "7px 14px",
  color: "#334155",
  fontFamily: "inherit",
  fontWeight: 800,
  cursor: "pointer"
};

const translationBox = {
  marginTop: 12,
  background: "#F8FAFC",
  border: "1px solid #E2E8F0",
  borderRadius: 10,
  padding: 12,
  color: "#475569",
  fontSize: 13,
  lineHeight: 1.8
};

const mediaStyle = {
  width: "100%",
  borderRadius: 14,
  marginTop: 14
};

const optionsBox = {
  display: "flex",
  flexDirection: "column",
  gap: 10
};

const optionBtn = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "15px 16px",
  borderRadius: 12,
  color: "#E6EDF3",
  fontFamily: "inherit",
  fontSize: 15,
  fontWeight: 600,
  textAlign: "right",
  cursor: "pointer"
};

const checkbox = {
  width: 26,
  height: 26,
  borderRadius: 6,
  border: "2px solid",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
  flexShrink: 0
};

const optionTranslation = {
  display: "block",
  marginTop: 6,
  color: "#8B949E",
  fontSize: 12,
  lineHeight: 1.7
};

const actionRow = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gap: 10,
  marginTop: 18
};

const secondaryAction = {
  background: "#1a2f52",
  border: "1px solid #1e3a5f",
  borderRadius: 12,
  padding: "14px 0",
  fontFamily: "inherit",
  fontWeight: 900,
  cursor: "pointer"
};

const mainAction = {
  border: "none",
  borderRadius: 12,
  padding: "14px 0",
  fontFamily: "inherit",
  fontWeight: 900
};

const lockedBox = {
  background: "#1a2f52",
  border: "1px solid #1e3a5f",
  borderRadius: 18,
  padding: 26,
  textAlign: "center"
};