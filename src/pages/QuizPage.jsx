import { useState } from "react";
import { QUESTIONS } from "../data/questions";

const LETTERS = ["الف", "ب", "پ", "ت"];

const TOPIC_INFO = {
  Vorfahrt:        { label: "حق تقدم",     icon: "🚦" },
  Geschwindigkeit: { label: "سرعت",         icon: "⚡" },
  Sicherheit:      { label: "ایمنی",        icon: "🛡️" },
  Verkehrszeichen: { label: "علائم",        icon: "🔵" },
  Alkohol:         { label: "الکل و مواد", icon: "🍺" },
};

const MODES = [
  { id: "all",             icon: "🎯", label: "همه موضوعات",   sub: "آزمون ترکیبی" },
  { id: "Vorfahrt",        icon: "🚦", label: "حق تقدم",       sub: "Rechts vor Links" },
  { id: "Geschwindigkeit", icon: "⚡", label: "سرعت",          sub: "محدودیت‌های سرعت" },
  { id: "Verkehrszeichen", icon: "🔵", label: "علائم",         sub: "تابلوهای ترافیکی" },
  { id: "Sicherheit",      icon: "🛡️", label: "ایمنی",        sub: "کمک‌های اولیه" },
  { id: "Alkohol",         icon: "🍺", label: "الکل",          sub: "حدود مجاز" },
];

function selectQuestions(pool, count) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export default function QuizPage({ onDone, onBack }) {
  const [mode, setMode]         = useState("all");
  const [phase, setPhase]       = useState("select");
  const [queue, setQueue]       = useState([]);
  const [idx, setIdx]           = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen]     = useState(null);
  const [answers, setAnswers]   = useState([]);
  const [examMode, setExamMode] = useState(false);

  const start = (selectedMode, isExam) => {
    const pool = selectedMode === "all"
      ? QUESTIONS
      : QUESTIONS.filter(q => q.topic === selectedMode);
    const count = isExam ? 30 : 10;
    const q = selectQuestions(pool, count);
    setQueue(q);
    setIdx(0);
    setAnswers([]);
    setAnswered(false);
    setChosen(null);
    setExamMode(isExam);
    setPhase("active");
  };

  const answer = (i) => {
    if (answered) return;
    setAnswered(true);
    setChosen(i);
  };

  const next = () => {
    const cur = { question: queue[idx], correct: chosen === queue[idx].ok, chosen };
    const updated = [...answers, cur];
    setAnswers(updated);
    if (idx + 1 >= queue.length) {
      onDone(updated, examMode);
      return;
    }
    setIdx(i => i + 1);
    setAnswered(false);
    setChosen(null);
  };

  if (phase === "select") {
    return (
      <div style={{ fontFamily: "inherit" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <button onClick={onBack}
            style={{ background: "transparent", border: "1px solid #1e3a5f", borderRadius: 8, padding: "6px 12px", color: "#8B949E", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
            ← برگشت
          </button>
          <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>انتخاب موضوع</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 16 }}>
          {MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{ textAlign: "right", padding: 14, borderRadius: 16, border: `2px solid ${mode === m.id ? "#FF9500" : "#1e3a5f"}`, background: mode === m.id ? "rgba(255,149,0,0.1)" : "#1a2f52", cursor: "pointer", fontFamily: "inherit" }}>
              <div style={{ fontSize: 24, marginBottom: 5 }}>{m.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#E6EDF3", marginBottom: 2 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: "#8B949E" }}>{m.sub}</div>
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <button onClick={() => start(mode, false)}
            style={{ background: "#FF9500", border: "none", borderRadius: 12, padding: "14px 0", fontSize: 15, fontWeight: 800, color: "#0A2540", cursor: "pointer", fontFamily: "inherit" }}>
            📝 تمرین (۱۰ سوال)
          </button>
          <button onClick={() => start(mode, true)}
            style={{ background: "#1a2f52", border: "2px solid #FF9500", borderRadius: 12, padding: "14px 0", fontSize: 15, fontWeight: 800, color: "#FFB340", cursor: "pointer", fontFamily: "inherit" }}>
            🎓 نمونه آزمون (۳۰)
          </button>
        </div>
      </div>
    );
  }

  const q = queue[idx];
  if (!q) return null;
  const topicInfo = TOPIC_INFO[q.topic] || { label: q.topic, icon: "📋" };

  return (
    <div>
      {/* هدر */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: "#8B949E" }}>
          سوال <strong style={{ color: "#E6EDF3" }}>{idx + 1}</strong>/{queue.length}
        </span>
        <button onClick={onBack}
          style={{ background: "transparent", border: "1px solid #1e3a5f", borderRadius: 8, padding: "5px 12px", color: "#8B949E", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>
          پایان
        </button>
      </div>

      {/* نوار پیشرفت */}
      <div style={{ height: 4, background: "#1a2f52", borderRadius: 2, marginBottom: 18, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${((idx + 1) / queue.length) * 100}%`, background: "linear-gradient(90deg,#FF9500,#FFB340)", borderRadius: 2, transition: "width .4s" }} />
      </div>

      {/* کارت سوال */}
      <div style={{ background: "#fff", borderRadius: 18, padding: 20, marginBottom: 14, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#0A254015", borderRadius: 7, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: "#0A2540", marginBottom: 12 }}>
          {topicInfo.icon} {topicInfo.label}
          {q.points === 5 && (
            <span style={{ background: "#FEF2F2", color: "#DC2626", borderRadius: 5, padding: "1px 7px", fontSize: 10, fontWeight: 700 }}>⚠️ ۵ امتیاز</span>
          )}
          {q.needsVerification && (
            <span style={{ background: "#FFF7ED", color: "#C2410C", borderRadius: 5, padding: "1px 7px", fontSize: 10, fontWeight: 700 }}>🔍 راستی‌آزمایی</span>
          )}
        </div>
        <p style={{ color: "#0A2540", fontSize: 16, fontWeight: 700, lineHeight: 1.7, margin: 0 }}>{q.q}</p>
      </div>

      {/* گزینه‌ها */}
      <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 14 }}>
        {q.opts.map((opt, i) => {
          let bg = "#1a2f52", border = "#1e3a5f", color = "#E6EDF3";
          let ltrBg = "#1e3a5f", ltrColor = "#8B949E";
          if (answered && !examMode) {
            if (i === q.ok)        { bg = "rgba(46,160,67,0.15)";  border = "#2EA043"; color = "#7EE787"; ltrBg = "#2EA043"; ltrColor = "#fff"; }
            else if (i === chosen) { bg = "rgba(239,68,68,0.12)"; border = "#EF4444"; color = "#FCA5A5"; ltrBg = "#EF4444"; ltrColor = "#fff"; }
            else                   { color = "#4D6080"; }
          } else if (answered && examMode && i === chosen) {
            bg = "#112240"; border = "#8B949E";
          }
          return (
            <button key={`opt-${q.id}-${i}`} onClick={() => answer(i)} disabled={answered}
              style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "right", padding: "14px 16px", borderRadius: 12, border: `2px solid ${border}`, background: bg, color, cursor: answered ? "default" : "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: ltrBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0, color: ltrColor }}>
                {LETTERS[i]}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* توضیح — فقط در حالت تمرین */}
      {answered && !examMode && (
        <div style={{ background: "#112240", border: "1px solid #1e3a5f", borderRadius: 14, padding: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#60A5FA", marginBottom: 8 }}>💡 توضیح</div>
          <p style={{ fontSize: 13, lineHeight: 1.85, color: "#E6EDF3", margin: 0, marginBottom: q.culture || q.tip ? 10 : 0 }}>{q.exp}</p>
          {q.culture && (
            <div style={{ borderRight: "3px solid #FF9500", paddingRight: 12, marginBottom: q.tip ? 8 : 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#FF9500", marginBottom: 3 }}>🇩🇪 تفاوت فرهنگی</div>
              <p style={{ fontSize: 12, color: "#8B949E", lineHeight: 1.7, margin: 0 }}>{q.culture}</p>
            </div>
          )}
          {q.tip && (
            <div style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 9, padding: "8px 12px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#60A5FA", marginBottom: 3 }}>📌 نکته کلیدی</div>
              <p style={{ fontSize: 12, color: "#8B949E", lineHeight: 1.7, margin: 0 }}>{q.tip}</p>
            </div>
          )}
          {q.needsVerification && (
            <div style={{ marginTop: 10, background: "rgba(194,65,12,0.08)", border: "1px solid rgba(194,65,12,0.25)", borderRadius: 9, padding: "8px 12px", fontSize: 11, color: "#FB923C" }}>
              ⚠️ اطلاعات قانونی ممکن است تغییر کنند. قبل از اقدام، منابع رسمی را بررسی کنید.
            </div>
          )}
        </div>
      )}

      {answered && examMode && (
        <div style={{ background: "#112240", border: "1px solid #1e3a5f", borderRadius: 12, padding: "12px 16px", marginBottom: 14, fontSize: 13, color: "#8B949E", textAlign: "center" }}>
          پاسخ ثبت شد — توضیحات بعد از پایان نمایش داده می‌شود
        </div>
      )}

      {answered && (
        <button onClick={next}
          style={{ width: "100%", background: "#FF9500", border: "none", borderRadius: 12, padding: "14px 0", fontSize: 15, fontWeight: 800, color: "#0A2540", cursor: "pointer", fontFamily: "inherit" }}>
          {idx + 1 < queue.length ? "سوال بعدی ←" : "مشاهده نتیجه"}
        </button>
      )}
    </div>
  );
}
