import { useState, useRef, useEffect } from "react";

const FAQ = [
  { keys: ["سرعت", "tempo"], answer: "حداکثر سرعت داخل شهر معمولاً ۵۰ کیلومتر است. خارج از شهر ۱۰۰ و در اتوبان بسیاری از بخش‌ها محدودیت ثابت ندارند." },
  { keys: ["الکل", "promil"], answer: "برای رانندگان عادی حد مجاز ۰.۵ پرومیله است. برای تازه‌کاران و زیر ۲۱ سال حد مجاز ۰.۰ است." },
  { keys: ["حق تقدم", "vorfahrt", "تقاطع"], answer: "در تقاطع بدون تابلو قانون Rechts vor Links اجرا می‌شود — وسیله‌ای که از سمت راست می‌آید حق تقدم دارد." },
  { keys: ["تبدیل", "گواهینامه ایرانی"], answer: "معمولاً نیاز به Sehtest، Erste Hilfe Kurs، آزمون تئوری و آزمون عملی دارید. شرایط دقیق به شهر بستگی دارد." },
  { keys: ["تابلو", "zeichen", "علائم"], answer: "تابلوهای آلمان سه دسته دارند: مثلث قرمز = هشدار، دایره قرمز = ممنوعیت، دایره آبی = الزام." },
  { keys: ["جریمه", "bußgeld"], answer: "جریمه‌ها بسته به تخلف متفاوت است. موبایل بدون هندزفری: ۱۰۰ یورو. مبالغ دقیق را از منابع رسمی بررسی کنید." },
  { keys: ["مدارک", "dokument"], answer: "گواهینامه، کارت شناسایی، بیمه‌نامه و کارت فنی خودرو را همیشه همراه داشته باشید." },
  { keys: ["کمربند", "sicherheitsgurt"], answer: "کمربند برای همه سرنشینان در تمام صندلی‌ها اجباری است." },
  { keys: ["موبایل", "handy", "هندزفری"], answer: "استفاده از موبایل بدون هندزفری ممنوع است و می‌تواند ۱۰۰ یورو جریمه داشته باشد." },
  { keys: ["اتوبان", "autobahn"], answer: "در اتوبان باید سمت راست رانندگی کنی. سرعت توصیه‌ای ۱۳۰ کیلومتر است اما الزامی نیست." },
  { keys: ["میدان", "kreisverkehr"], answer: "در میدان دوار کسی که داخل است اولویت دارد. هنگام ورود راهنما نزن، فقط موقع خروج." },
];

const QUICK = [
  { label: "🪪 تبدیل گواهینامه", q: "تبدیل گواهینامه ایرانی", a: "معمولاً نیاز به Sehtest، Erste Hilfe Kurs، آزمون تئوری و آزمون عملی دارید. شرایط دقیق به شهر و وضعیت اقامتی بستگی دارد." },
  { label: "🚦 حق تقدم", q: "حق تقدم در تقاطع بدون تابلو", a: "طبق قانون Rechts vor Links، وسیله‌ای که از سمت راست می‌آید حق تقدم دارد. این قانون در ایران وجود ندارد." },
  { label: "🍺 الکل", q: "حد مجاز الکل چقدر است؟", a: "برای رانندگان عادی ۰.۵ پرومیله. برای تازه‌کاران و زیر ۲۱ سال ۰.۰ است." },
  { label: "🚧 تابلوها", q: "انواع تابلوهای آلمان", a: "مثلث قرمز = هشدار، دایره قرمز = ممنوعیت، دایره آبی = الزام. یادگیری این سه دسته خیلی کمک می‌کند." },
  { label: "🚓 جریمه‌ها", q: "جریمه‌های رانندگی", a: "موبایل بدون هندزفری: ۱۰۰ یورو. تجاوز از سرعت در شهر از ۳۰ یورو. مبالغ دقیق را از منابع رسمی بررسی کنید." },
  { label: "📄 مدارک", q: "مدارک لازم هنگام رانندگی", a: "گواهینامه، کارت شناسایی، بیمه‌نامه (Versicherung) و کارت فنی (Fahrzeugschein) را همراه داشته باشید." },
];

function getAnswer(text) {
  const lower = text.toLowerCase();
  for (const item of FAQ) {
    if (item.keys.some(k => lower.includes(k))) return item.answer;
  }
  return "فعلاً پاسخ این سؤال در نسخه آزمایشی موجود نیست. در نسخه Pro دستیار هوشمند پاسخ کامل ارائه خواهد داد.";
}

export default function AIPage({ onBack }) {
  const [messages, setMessages] = useState([
    { role: "bot", text: "سلام! من FahrKI هستم 🤖\n\nدستیار آزمایشی همراه گواهینامه آلمان.\n\nیه سوال بپرس یا از دکمه‌های سریع استفاده کن." }
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
    }, 800 + Math.random() * 400);
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
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>🤖 FahrKI Assistant</div>
          <div style={{ fontSize: 11, color: "#8B949E", marginTop: 2 }}>نسخه آزمایشی دستیار هوشمند</div>
        </div>
      </div>

      <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: 12, padding: "10px 14px", marginBottom: 12, fontSize: 12, color: "#FCD34D", lineHeight: 1.7 }}>
        🚧 <strong>Beta</strong> — اتصال به AI در نسخه بعدی. الان پاسخ‌ها از نمونه‌های داخلی است.
      </div>

      <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 8, marginBottom: 10, flexShrink: 0 }}>
        {QUICK.map(btn => (
          <button key={btn.label} onClick={() => !typing && addExchange(btn.q, btn.a)} disabled={typing}
            style={{ flexShrink: 0, background: "#1a2f52", border: "1px solid #1e3a5f", borderRadius: 20, padding: "7px 13px", fontSize: 12, fontWeight: 600, color: "#8B949E", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>
            {btn.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 8, flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-end" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, background: m.role === "user" ? "rgba(255,149,0,0.2)" : "rgba(96,165,250,0.15)", border: `1px solid ${m.role === "user" ? "rgba(255,149,0,0.3)" : "rgba(96,165,250,0.25)"}` }}>
              {m.role === "user" ? "👤" : "🤖"}
            </div>
            <div style={{ maxWidth: "82%", background: m.role === "user" ? "rgba(255,149,0,0.12)" : "#1a2f52", border: `1px solid ${m.role === "user" ? "rgba(255,149,0,0.25)" : "#1e3a5f"}`, borderRadius: m.role === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px", padding: "10px 14px", fontSize: 13, lineHeight: 1.85, color: "#E6EDF3" }}>
              {m.text.split("\n").map((l, j) => <p key={j} style={{ margin: 0, marginBottom: 4 }}>{l}</p>)}
            </div>
          </div>
        ))}

        {typing && (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, background: "rgba(96,165,250,0.15)", border: "1px solid rgba(96,165,250,0.25)" }}>🤖</div>
            <div style={{ background: "#1a2f52", border: "1px solid #1e3a5f", borderRadius: "4px 18px 18px 18px", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, color: "#8B949E" }}>FahrKI schreibt</span>
              <div style={{ display: "flex", gap: 4 }}>
                {[0,1,2].map(j => <div key={j} style={{ width: 6, height: 6, borderRadius: "50%", background: "#8B949E", animation: `bounce 1.2s ${j*0.2}s infinite` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ flexShrink: 0, borderTop: "1px solid #1e3a5f", paddingTop: 12, marginBottom: 8 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="سوالت را بنویس..." disabled={typing}
            style={{ flex: 1, background: "#112240", border: "1px solid #1e3a5f", borderRadius: 10, padding: "11px 14px", fontSize: 14, color: "#E6EDF3", outline: "none", fontFamily: "inherit", direction: "rtl" }} />
          <button onClick={handleSend} disabled={typing || !input.trim()}
            style={{ width: 44, height: 44, background: typing || !input.trim() ? "#1a2f52" : "#FF9500", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {typing ? "⏳" : "↑"}
          </button>
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg,#1a2f52,#112240)", border: "1px solid #1e3a5f", borderRadius: 16, padding: 16, flexShrink: 0 }}>
        <div style={{ fontWeight: 900, fontSize: 14, color: "#FFB340", marginBottom: 10 }}>
          ⭐ FahrKI Pro <span style={{ fontSize: 10, background: "rgba(255,179,64,0.15)", border: "1px solid rgba(255,179,64,0.3)", borderRadius: 6, padding: "2px 8px", fontWeight: 700 }}>Coming Soon</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px 10px" }}>
          {["تحلیل تصاویر سوالات","تحلیل ویدئوها","توضیح قوانین","مربی شخصی آزمون","تحلیل نقاط ضعف","پاسخ به سوالات آزاد","تحلیل نقشه‌های تقاطع","شبیه‌ساز آزمون واقعی"].map(f => (
            <div key={f} style={{ fontSize: 11, color: "#8B949E", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ color: "#2EA043" }}>✓</span>{f}
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}`}</style>
    </div>
  );
}
