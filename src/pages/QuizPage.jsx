import { useState } from "react";
import { COLORS } from "../theme/colors";
import {
  page,
  pageTitle,
  primaryButton
} from "../theme/components";

const MODES = [
  {
    id: "practice",
    icon: "📚",
    title: "تمرین آموزشی",
    german: "Lernmodus",
    sub: "۱۰ سؤال آموزشی",
    desc: "بعد از ثبت پاسخ، جواب درست و غلط با رنگ مشخص می‌شود و توضیح فارسی نمایش داده می‌شود."
  },
  {
    id: "exam",
    icon: "📝",
    title: "شبیه‌ساز آزمون رسمی",
    german: "Prüfungssimulation",
    sub: "۳۰ سؤال آزمون",
    desc: "فضای آزمون واقعی TÜV / DEKRA؛ بدون نمایش جواب تا پایان آزمون."
  }
];

export default function QuizPage({ onStartPractice, onStartExam }) {
  const [selected, setSelected] = useState("practice");

  return (
    <div style={page}>
      <h2 style={pageTitle}>انتخاب نوع آزمون</h2>

      <div style={cards}>
        {MODES.map((m) => {
          const active = selected === m.id;

          return (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              style={{
                ...modeCard,
                border: active
                  ? `2px solid ${COLORS.green}`
                  : `1px solid ${COLORS.borderSoft}`,
                background: active ? COLORS.cardSoft : COLORS.white
              }}
            >
              <div style={icon}>{m.icon}</div>

              <div style={cardTitle}>{m.title}</div>

              <div style={germanLabel}>{m.german}</div>

              <div style={cardSub}>{m.sub}</div>

              <div style={cardDesc}>{m.desc}</div>
            </button>
          );
        })}
      </div>

      {selected === "practice" ? (
        <button onClick={onStartPractice} style={primaryButton}>
          شروع تمرین آموزشی
        </button>
      ) : (
        <button onClick={onStartExam} style={examButton}>
          شروع آزمون رسمی
        </button>
      )}
    </div>
  );
}

const cards = {
  display: "flex",
  flexDirection: "column",
  gap: 14
};

const modeCard = {
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
  color: COLORS.text,
  fontSize: 18,
  fontWeight: 950,
  marginBottom: 4
};

const germanLabel = {
  color: COLORS.green,
  fontWeight: 950,
  fontSize: 13,
  marginBottom: 8,
  direction: "ltr",
  textAlign: "right"
};

const cardSub = {
  color: COLORS.textSoft,
  fontWeight: 900,
  fontSize: 13,
  marginBottom: 10
};

const cardDesc = {
  color: COLORS.muted,
  lineHeight: 1.8,
  fontSize: 13
};

const examButton = {
  ...primaryButton,
  background: COLORS.text
};