import { useState } from "react";

const MODES = [
  {
    id: "practice",
    icon: "📚",
    title: "Lernmodus",
    sub: "۱۰ سؤال آموزشی",
    desc: "نمایش جواب صحیح، توضیح فارسی و دکمه Weiter"
  },
  {
    id: "exam",
    icon: "📝",
    title: "Prüfungssimulation",
    sub: "۳۰ سؤال آزمون",
    desc: "شبیه‌سازی آزمون واقعی TÜV / DEKRA"
  }
];

export default function QuizPage({
  onStartPractice,
  onStartExam,
  onBack
}) {
  const [selected, setSelected] = useState("practice");

  return (
    <div>
      <div style={topRow}>
        <button onClick={onBack} style={backBtn}>
          ← خانه
        </button>

        <h2 style={title}>
          Modus auswählen
        </h2>
      </div>

      <div style={cards}>
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            style={{
              ...card,
              border:
                selected === m.id
                  ? "2px solid #168A3A"
                  : "1px solid #D7EADB",
              background:
                selected === m.id
                  ? "#F4FBF4"
                  : "#FFFFFF"
            }}
          >
            <div style={icon}>{m.icon}</div>

            <div style={cardTitle}>
              {m.title}
            </div>

            <div style={cardSub}>
              {m.sub}
            </div>

            <div style={cardDesc}>
              {m.desc}
            </div>
          </button>
        ))}
      </div>

      {selected === "practice" ? (
        <button
          onClick={onStartPractice}
          style={primaryBtn}
        >
          Lernmodus starten
        </button>
      ) : (
        <button
          onClick={onStartExam}
          style={examBtn}
        >
          Prüfung starten
        </button>
      )}
    </div>
  );
}

const topRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 20
};

const backBtn = {
  background: "#FFFFFF",
  border: "1px solid #BBD7C0",
  borderRadius: 12,
  padding: "10px 14px",
  color: "#168A3A",
  fontWeight: 900,
  cursor: "pointer",
  fontFamily: "inherit"
};

const title = {
  margin: 0,
  color: "#111827",
  fontWeight: 950,
  fontSize: 20
};

const cards = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
  marginBottom: 20
};

const card = {
  textAlign: "right",
  borderRadius: 20,
  padding: 20,
  cursor: "pointer",
  fontFamily: "inherit"
};

const icon = {
  fontSize: 34,
  marginBottom: 10
};

const cardTitle = {
  color: "#111827",
  fontSize: 18,
  fontWeight: 950,
  marginBottom: 4
};

const cardSub = {
  color: "#168A3A",
  fontWeight: 900,
  fontSize: 13,
  marginBottom: 10
};

const cardDesc = {
  color: "#64736A",
  lineHeight: 1.8,
  fontSize: 13
};

const primaryBtn = {
  width: "100%",
  background: "#168A3A",
  border: "none",
  borderRadius: 16,
  padding: "16px 0",
  color: "#FFFFFF",
  fontWeight: 950,
  fontSize: 15,
  fontFamily: "inherit",
  cursor: "pointer"
};

const examBtn = {
  width: "100%",
  background: "#111827",
  border: "none",
  borderRadius: 16,
  padding: "16px 0",
  color: "#FFFFFF",
  fontWeight: 950,
  fontSize: 15,
  fontFamily: "inherit",
  cursor: "pointer"
};