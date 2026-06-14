import { useState } from "react";
import { COLORS } from "../theme/colors";
import {
  card,
  mutedText,
  page,
  pageTitle,
  primaryButton,
  softCard
} from "../theme/components";

const QUICK = [
  ["🪪 تبدیل گواهینامه", "برای تبدیل گواهینامه ایرانی چه مراحلی لازم است؟"],
  ["🚦 حق تقدم", "حق تقدم در تقاطع بدون تابلو چگونه است؟"],
  ["🍺 الکل", "حد مجاز الکل برای رانندگان چقدر است؟"],
  ["🚧 تابلوها", "تابلو حق تقدم بده یعنی چه؟"],
  ["📄 مدارک", "برای شروع گواهینامه چه مدارکی لازم است؟"]
];

function getDemoAnswer(text) {
  if (text.includes("الکل")) {
    return "برای رانندگان تازه‌کار و زیر ۲۱ سال، حد مجاز ۰.۰ پرومیل است.";
  }

  if (text.includes("حق تقدم")) {
    return "در تقاطع بدون تابلو، اصل Rechts vor Links اجرا می‌شود؛ یعنی وسیله‌ای که از سمت راست می‌آید حق تقدم دارد.";
  }

  if (text.includes("تبدیل")) {
    return "معمولاً به Sehtest، Erste Hilfe Kurs، ثبت‌نام در Fahrschule، آزمون تئوری و آزمون عملی نیاز داری.";
  }

  if (text.includes("تابلو")) {
    return "تابلوی Vorfahrt gewähren یعنی باید حق تقدم را به وسایل نقلیه دیگر بدهی.";
  }

  if (text.includes("مدارک")) {
    return "معمولاً پاسپورت/کارت اقامت، عکس بیومتریک، Sehtest، گواهی Erste Hilfe و ترجمه/اصل گواهینامه قبلی لازم می‌شود.";
  }

  return "این پاسخ در نسخه آزمایشی موجود نیست. در نسخه Pro، دستیار هوشمند پاسخ کامل‌تری ارائه می‌دهد.";
}

export default function AIPage() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "سلام، من FahrKI Demo هستم. فعلاً پاسخ‌ها نمونه و آموزشی هستند."
    }
  ]);

  const [input, setInput] = useState("");

  function send(text = input) {
    if (!text.trim()) return;

    const userText = text.trim();

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText },
      { sender: "ai", text: getDemoAnswer(userText) }
    ]);

    setInput("");
  }

  return (
    <div style={page}>
      <div>
        <h2 style={pageTitle}>🤖 FahrKI Demo</h2>
        <p style={mutedText}>
          دستیار آزمایشی برای توضیح قوانین، آزمون و نکات گواهینامه آلمان.
        </p>
      </div>

      <div style={betaCard}>
        🚧 نسخه آزمایشی
        <br />
        اتصال زنده به هوش مصنوعی در نسخه بعدی اضافه می‌شود.
      </div>

      <div style={quickGrid}>
        {QUICK.map(([label, text]) => (
          <button key={label} onClick={() => send(text)} style={quickBtn}>
            {label}
          </button>
        ))}
      </div>

      <div style={chatBox}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.sender === "user" ? "flex-start" : "flex-end"
            }}
          >
            <div
              style={{
                ...bubble,
                background:
                  m.sender === "user" ? COLORS.green : COLORS.cardSoft,
                color: m.sender === "user" ? COLORS.white : COLORS.text,
                border:
                  m.sender === "user"
                    ? "none"
                    : `1px solid ${COLORS.borderSoft}`
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div style={inputRow}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="سؤال خود را بنویسید..."
          style={inputStyle}
        />

        <button onClick={() => send()} style={sendBtn}>
          ارسال
        </button>
      </div>

      <div style={proCard}>
        <strong>⭐ FahrKI Pro</strong>
        <br />
        تحلیل تصاویر، ویدئوها، تقاطع‌ها، پاسخ آزاد و تحلیل نقاط ضعف.
      </div>
    </div>
  );
}

const betaCard = {
  ...softCard,
  background: COLORS.warningSoft,
  border: `1px solid ${COLORS.warningBorder}`,
  color: COLORS.warningText,
  lineHeight: 1.8,
  fontSize: 13
};

const quickGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10
};

const quickBtn = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 14,
  padding: 12,
  color: COLORS.green,
  fontWeight: 900,
  fontFamily: "inherit",
  cursor: "pointer"
};

const chatBox = {
  ...card,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  minHeight: 280
};

const bubble = {
  maxWidth: "82%",
  padding: "10px 14px",
  borderRadius: 16,
  fontSize: 13,
  lineHeight: 1.8,
  fontWeight: 700
};

const inputRow = {
  display: "flex",
  gap: 8
};

const inputStyle = {
  flex: 1,
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 14,
  padding: "13px 14px",
  fontFamily: "inherit",
  outline: "none"
};

const sendBtn = {
  ...primaryButton,
  width: "auto",
  padding: "0 18px",
  borderRadius: 14
};

const proCard = {
  ...softCard,
  color: COLORS.textSoft,
  lineHeight: 1.9,
  fontSize: 13
};