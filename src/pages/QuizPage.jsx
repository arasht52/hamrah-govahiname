import { useState, useEffect, useRef } from "react";
import { QUESTIONS } from "../data/questions";

const TOPIC_INFO = {
  Vorfahrt:        { label: "Vorfahrt",        icon: "🚦" },
  Geschwindigkeit: { label: "Geschwindigkeit",  icon: "⚡" },
  Sicherheit:      { label: "Sicherheit",       icon: "🛡️" },
  Verkehrszeichen: { label: "Verkehrszeichen",  icon: "🔵" },
  Alkohol:         { label: "Alkohol & Drogen", icon: "🍺" },
};

const MODES = [
  { id: "all",             icon: "🎯", label: "Alle Themen",     sub: "Gemischte Prüfung" },
  { id: "Vorfahrt",        icon: "🚦", label: "Vorfahrt",        sub: "Vorfahrt & Vorrang" },
  { id: "Geschwindigkeit", icon: "⚡", label: "Geschwindigkeit", sub: "Tempolimits" },
  { id: "Verkehrszeichen", icon: "🔵", label: "Verkehrszeichen", sub: "Schilder & Zeichen" },
  { id: "Sicherheit",      icon: "🛡️", label: "Sicherheit",     sub: "Erste Hilfe & Unfall" },
  { id: "Alkohol",         icon: "🍺", label: "Alkohol",         sub: "Promillegrenze" },
];

const EXAM_DURATION_MS = 45 * 60 * 1000;

function selectQuestions(pool, count) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length));
}

function isAnswerCorrect(chosen, correctAnswers) {
  if (chosen.length !== correctAnswers.length) return false;
  return correctAnswers.every(v => chosen.includes(v)) && chosen.every(v => correctAnswers.includes(v));
}

export default function QuizPage({ onFinish, onBack }) {
  const [mode, setMode]            = useState("all");
  const [phase, setPhase]          = useState("select");
  const [queue, setQueue]          = useState([]);
  const [idx, setIdx]              = useState(0);
  const [answered, setAnswered]    = useState(false);
  const [chosenAnswers, setChosen] = useState([]);
  const [answers, setAnswers]      = useState([]);
  const [examMode, setExamMode]    = useState(false);
  const [marked, setMarked]        = useState({});
  const [showFa, setShowFa]        = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const start = (selectedMode, isExam) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const pool = selectedMode === "all" ? QUESTIONS : QUESTIONS.filter(q => q.topic === selectedMode);
    setQueue(selectQuestions(pool, isExam ? 30 : 10));
    setIdx(0); setAnswers([]); setAnswered(false); setChosen([]);
    setMarked({}); setShowFa(false); setTimeExpired(false);
    setExamMode(isExam); setPhase("active");
    if (isExam) {
      timerRef.current = setTimeout(() => setTimeExpired(true), EXAM_DURATION_MS);
    }
  };

  const resetToSelect = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("select"); setQueue([]); setIdx(0); setAnswers([]);
    setAnswered(false); setChosen([]); setMarked({});
    setShowFa(false); setTimeExpired(false); setExamMode(false);
  };

  const toggleOption = (i) => {
    if (answered || timeExpired) return;
    setChosen(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  const submitAnswer = () => {
    if (chosenAnswers.length === 0 || timeExpired) return;
    setAnswered(true);
  };

  const next = () => {
    const q = queue[idx];
    const correctAnswers = Array.isArray(q.ok) ? q.ok : [q.ok];
    const correct = isAnswerCorrect(chosenAnswers, correctAnswers);
    const updated = [...answers, {
      question: q, correct, chosenAnswers,
      fehlerpunkte: correct ? 0 : (q.points || 2),
    }];
    setAnswers(updated);
    if (idx + 1 >= queue.length) {
      if (timerRef.current) clearTimeout(timerRef.current);
      onFinish({ answersList: updated, isExamMode: examMode });
      return;
    }
    setIdx(i => i + 1);
    setAnswered(false);
    setChosen([]);
    setShowFa(false);
  };

  // ── انتخاب موضوع ──
  if (phase === "select") {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <button onClick={onBack}
            style={{ background: "transparent", border: "1px solid #1e3a5f", borderRadius: 8, padding: "6px 12px", color: "#8B949E", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
            ← zurück
          </button>
          <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>Thema auswählen</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 16 }}>
          {MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{ textAlign: "right", padding: 14, borderRadius: 16, border: `2px solid ${mode === m.id ? "#FF9500" : "#1e3a5f"}`, background: mode === m.id ? "rgba(255,149,0,0.1)" : "#1a2f52", cursor: "pointer", fontFamily: "inherit" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{m.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#E6EDF3", marginBottom: 2 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: "#8B949E" }}>{m.sub}</div>
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <button onClick={() => start(mode, false)}
            style={{ background: "#FF9500", border: "none", borderRadius: 12, padding: "14px 8px", fontSize: 13, fontWeight: 800, color: "#0A2540", cursor: "pointer", fontFamily: "inherit", lineHeight: 1.6 }}>
            📝 Lernmodus<br /><span style={{ fontSize: 11, fontWeight: 600 }}>10 Fragen</span>
          </button>
          <button onClick={() => start(mode, true)}
            style={{ background: "#1a2f52", border: "2px solid #FF9500", borderRadius: 12, padding: "14px 8px", fontSize: 13, fontWeight: 800, color: "#FFB340", cursor: "pointer", fontFamily: "inherit", lineHeight: 1.6 }}>
            🎓 Prüfungsmodus<br /><span style={{ fontSize: 11, fontWeight: 600 }}>30 Fragen · 45 Min</span>
          </button>
        </div>
      </div>
    );
  }

  // ── تایمر منقضی ──
  if (timeExpired) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 50, marginBottom: 16 }}>⏱️</div>
        <div style={{ fontWeight: 800, fontSize: 17, color: "#FCA5A5", marginBottom: 12, lineHeight: 1.6 }}>
          Die Bearbeitungszeit ist abgelaufen.
        </div>
        <div style={{ fontSize: 13, color: "#8B949E", marginBottom: 28 }}>
          Bitte starten Sie die Prüfung erneut.
        </div>
        <button onClick={resetToSelect}
          style={{ background: "#FF9500", border: "none", borderRadius: 12, padding: "14px 28px", fontSize: 15, fontWeight: 800, color: "#0A2540", cursor: "pointer", fontFamily: "inherit" }}>
          Neue Prüfung starten
        </button>
      </div>
    );
  }

  // ── سوال ──
  const q = queue[idx];
  if (!q) return null;

  const questionText   = q.q_de || q.q;
  const questionFa     = q.q_fa || null;
  const options        = q.opts_de || q.opts;
  const optionsFa      = q.opts_fa || [];
  const correctAnswers = Array.isArray(q.ok) ? q.ok : [q.ok];
  const topicInfo      = TOPIC_INFO[q.topic] || { label: q.topic, icon: "📋" };
  const isMarked       = !!marked[idx];

  return (
    <div>
      {/* هدر */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 13, color: "#8B949E", fontWeight: 600 }}>
          Frage <strong style={{ color: "#E6EDF3" }}>{idx + 1}</strong> / {queue.length}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#8B949E" }}>
            Punkte: <strong style={{ color: q.points === 5 ? "#FCA5A5" : "#93C5FD" }}>{q.points || 2}</strong>
          </span>
          {examMode && (
            <span style={{ fontSize: 11, background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#FCA5A5", borderRadius: 6, padding: "2px 8px", fontWeight: 700 }}>
              Prüfung
            </span>
          )}
        </div>
      </div>

      {/* نوار پیشرفت */}
      <div style={{ height: 3, background: "#1a2f52", borderRadius: 2, marginBottom: 16, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${((idx + 1) / queue.length) * 100}%`, background: "linear-gradient(90deg,#FF9500,#FFB340)", borderRadius: 2, transition: "width .4s" }} />
      </div>

      {/* کارت سوال */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 18, marginBottom: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#0A254012", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: "#0A2540", marginBottom: 12 }}>
          {topicInfo.icon} {topicInfo.label}
        </div>

        {q.image_url && <img src={q.image_url} alt="Frage" style={{ width: "100%", borderRadius: 10, marginBottom: 12 }} />}
        {q.video_url && <video src={q.video_url} controls style={{ width: "100%", borderRadius: 10, marginBottom: 12 }} />}

        {/* متن آلمانی */}
        <p style={{ color: "#0A2540", fontSize: 15, fontWeight: 700, lineHeight: 1.7, margin: 0, direction: "ltr", textAlign: "left" }}>
          {questionText}
        </p>

        {/* ترجمه فارسی */}
        {showFa && questionFa && (
          <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.7, margin: "8px 0 0", borderTop: "1px solid #E2E8F0", paddingTop: 8, direction: "rtl", textAlign: "right" }}>
            {questionFa}
          </p>
        )}

        {/* دکمه زبان */}
        <button onClick={() => setShowFa(p => !p)}
          style={{ marginTop: 10, background: showFa ? "#E2E8F0" : "transparent", border: "1px solid #CBD5E1", borderRadius: 7, padding: "4px 12px", fontSize: 12, fontWeight: 700, color: "#475569", cursor: "pointer", fontFamily: "inherit" }}>
          {showFa ? "Deutsch" : "فارسی"}
        </button>
      </div>

      {/* گزینه‌ها */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {options.map((opt, i) => {
          const isSelected = chosenAnswers.includes(i);
          let border = "#1e3a5f", bg = "#1a2f52", color = "#E6EDF3";
          if (!answered && isSelected) { border = "#FF9500"; bg = "rgba(255,149,0,0.08)"; }
          if (answered && isSelected)  { border = "#4D6080"; bg = "#112240"; }

          return (
            <button key={`opt-${q.id}-${i}`} onClick={() => toggleOption(i)} disabled={answered}
              style={{ display: "flex", alignItems: "flex-start", gap: 12, width: "100%", padding: "12px 14px", borderRadius: 10, border: `2px solid ${border}`, background: bg, color, cursor: answered ? "default" : "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 500, transition: "all .15s", textAlign: "left" }}>
              {/* چک‌باکس */}
              <div style={{ width: 22, height: 22, borderRadius: 5, border: `2px solid ${isSelected ? "#FF9500" : "#4D6080"}`, background: isSelected ? "#FF9500" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all .15s" }}>
                {isSelected && <span style={{ color: "#0A2540", fontSize: 13, fontWeight: 900 }}>✓</span>}
              </div>
              <div style={{ flex: 1 }}>
                {/* متن آلمانی */}
                <div style={{ direction: "ltr", textAlign: "left" }}>{opt}</div>
                {/* ترجمه فارسی زیر */}
                {showFa && optionsFa[i] && (
                  <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 3, direction: "rtl", textAlign: "right" }}>
                    {optionsFa[i]}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* پیام بعد از ثبت */}
      {/* دکمه‌ها */}
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setMarked(p => ({ ...p, [idx]: !p[idx] }))}
          style={{ flex: 1, background: isMarked ? "rgba(251,191,36,0.15)" : "#1a2f52", border: `1px solid ${isMarked ? "#FBB824" : "#1e3a5f"}`, borderRadius: 10, padding: "12px 0", fontSize: 12, fontWeight: 700, color: isMarked ? "#FBB824" : "#8B949E", cursor: "pointer", fontFamily: "inherit" }}>
          🚩 Markieren
        </button>
        {!answered ? (
          <button onClick={submitAnswer} disabled={chosenAnswers.length === 0}
            style={{ flex: 2, background: chosenAnswers.length === 0 ? "#1e3a5f" : "#EF4444", border: "none", borderRadius: 10, padding: "12px 0", fontSize: 14, fontWeight: 800, color: chosenAnswers.length === 0 ? "#4D6080" : "#fff", cursor: chosenAnswers.length === 0 ? "default" : "pointer", fontFamily: "inherit" }}>
            Abgabe ✔
          </button>
        ) : (
          <button onClick={next}
            style={{ flex: 2, background: "#FF9500", border: "none", borderRadius: 10, padding: "12px 0", fontSize: 14, fontWeight: 800, color: "#0A2540", cursor: "pointer", fontFamily: "inherit" }}>
            {idx + 1 < queue.length ? "Weiter →" : "Ergebnis anzeigen"}
          </button>
        )}
      </div>
    </div>
  );
}
