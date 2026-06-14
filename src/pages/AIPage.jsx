import { useState, useRef, useEffect } from "react";

const FAQ = [
  { keys: ["سرعت"], answer: "حداکثر سرعت داخل شهر معمولا ۵۰ کیلومتر است. خارج از شهر ۱۰۰ کیلومتر." },
  { keys: ["الکل"], answer: "برای رانندگان عادی ۰.۵ پرومیله. برای تازه‌کاران و زیر ۲۱ سال ۰.۰ است." },
  { keys: ["حق تقدم", "تقاطع"], answer: "در تقاطع بدون تابلو قانون Rechts vor Links اجرا می‌شود — وسیله راست حق تقدم دارد." },
  { keys: ["تبدیل", "گواهینامه"], answer: "نیاز به Sehtest، Erste Hilfe Kurs، آزمون تئوری و عملی دارید." },
  { keys: ["تابلو", "علائم"], answer: "مثلث قرمز = هشدار، دایره قرمز = ممنوعیت، دایره آبی = الزام." },
  { keys: ["جریمه"], answer: "موبایل بدون هندزفری: ۱۰۰ یورو. مبالغ دقیق را از منابع رسمی بررسی کنید." },
  { keys: ["مدارک"], answer: "گواهینامه، کارت شناسایی، بیمه‌نامه و کارت فنی را همراه داشته باشید." },
  { keys: ["کمربند"], answer: "کمربند برای همه سرنشینان اجباری است." },
  { keys: ["موبایل", "هندزفری"], answer: "موبایل بدون هندزفری ممنوع است و ۱۰۰ یورو جریمه دارد." },
  { keys: ["اتوبان"], answer: "سرعت توصیه‌ای ۱۳۰ کیلومتر است اما الزامی نیست." },
  { keys: ["میدان"], answer: "در میدان دوار کسی که داخل است اولویت دارد." },
];

const QUICK = [
  { label: "🪪 تبدیل گواهینامه", q: "تبدیل گواهینامه", a: "نیاز به Sehtest، Erste Hilfe Kurs، آزمون تئوری و عملی دارید." },
  { label: "🚦 حق تقدم", q: "حق تقدم", a: "طبق Rechts vor Links، وسیله راست حق تقدم دارد. این قانون در ایران وجود ندارد." },
  { label: "🍺 الکل", q: "الکل", a: "برای رانندگان عادی ۰.۵ پرومیله. برای تازه‌کاران و زیر ۲۱ سال ۰.۰ است." },
  { label: "🚧 تابلوها", q: "تابلو", a: "مثلث قرمز = هشدار، دایره قرمز = ممنوعیت، دایره آبی = الزام." },
  { label: "🚓 جریمه‌ها", q: "جریمه", a: "موبایل بدون هندزفری: ۱۰۰ یورو. مبالغ دقیق را از منابع رسمی بررسی کنید." },
  { label: "📄 مدارک", q: "مدارک", a: "گواهینامه، کارت شناسایی، Versicherung و Fahrzeugschein را همراه داشته باشید." },
];

function getAnswer(text) {
  const lower = text.toLowerCase();
  for (const item of FAQ) {
    if (item.keys.some(k => lower.includes(k))) return item.answer;
  }
  return "پاسخ این سؤال در نسخه آزمایشی موجود نیست. در نسخه Pro پاسخ کامل ارائه خواهد شد.";
}

export default function AIPage({ onBack }) {
  const [messages, setMessages] = useState([
    { role: "bot", text: "سلام! من FahrKI هستم. سوالت را بپرس یا از دکمه‌های سریع استفاده کن." }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const addExchange = (userMsg, botMsg) => {
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: "bot", text: botMsg }]);
    }, 800);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    addExchange(text, getAnswer(text));
  };

  return (
    <div style={{ fontFamily: "'Vazirmatn',sans-serif", direction: "rtl", display: "flex", flexDirection: "column", height: "calc(100vh - 140px)" }}>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <button onClick={onBack} style={{ background: "transparent", border: "1px solid #1e3a5f", borderRadius: 8, padding: "6px 12px", color: "#8B949E", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
          ← برگشت
        </button>
        <div>
          <div style={{ fontWeight: 900, fontSize: 16 }}>🤖 FahrKI Assistant</div>
          <div style={{ fontSize: 11, color: "#8B949E" }}>نسخه آزمایشی</div>
        </div>
      </div>

      <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: 12, padding: "10px 14px", marginBottom: 12, fontSize: 12, color: "#FCD34D", lineHeight: 1.7 }}>
        🚧 Beta — پاسخ‌ها از نمونه‌های داخلی است. اتصال به AI در نسخه بعدی.
      </div>

      <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 8, marginBottom: 10, flexShrink: 0 }}>
        {QUICK.map(btn => (
          <button key={btn.label} onClick={() => !typing && addExchange(btn.q, btn.a)}
            style={{ flexShrink: 0, background: "#1a2f52", border: "1px solid #1e3a5f", borderRadius: 20, padding: "7px 13px", fontSize: 12, color: "#8B949E", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>
            {btn.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 8, flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, background: m.role === "user" ? "rgba(255,149,0,0.2)" : "rgba(96,165,250,0.15)" }}>
              {m.role === "user" ? "👤" : "🤖"}
            </div>
            <div style={{ maxWidth: "82%", background: m.role === "user" ? "rgba(255,149,0,0.12)" : "#1a2f52", border: `1px solid ${m.role === "user" ? "rgba(255,149,0,0.25)" : "#1e3a5f"}`, borderRadius: 14, padding: "10px 14px", fontSize: 13, lineHeight: 1.8, color: "#E6EDF3" }}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, background: "rgba(96,165,250,0.15)" }}>🤖</div>
            <div style={{ background: "#1a2f52", border: "1px solid #1e3a5f", borderRadius: 14, padding: "12px 16px", color: "#8B949E", fontSize: 13 }}>
              FahrKI schreibt...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ flexShrink: 0, borderTop: "1px solid #1e3a5f", paddingTop: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="سوالت را بنویس..." disabled={typing}
            style={{ flex: 1, background: "#112240", border: "1px solid #1e3a5f", borderRadius: 10, padding: "11px 14px", fontSize: 14, color: "#E6EDF3", outline: "none", fontFamily: "inherit", direction: "rtl" }} />
          <button onClick={handleSend} disabled={typing || !input.trim()}
            style={{ width: 44, height: 44, background: !input.trim() ? "#1a2f52" : "#FF9500", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
