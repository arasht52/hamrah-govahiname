import { useState, useRef, useEffect } from "react";

const FAQ = [
 { keys: ["سرعت", "speed", "tempo"], answer: "حداکثر سرعت داخل شهر معمولاً ۵۰ کیلومتر بر ساعت است. خارج از شهر ۱۰۰ و در اتوبان بسیاری از بخش‌ها محدودیت ثابت ندارند." },
 { keys: ["الکل", "promil", "پرومیل"], answer: "برای رانندگان عادی حد مجاز ۰.۵ پرومیله است. برای رانندگان تازه‌کار و زیر ۲۱ سال حد مجاز ۰.۰ است." },
 { keys: ["حق تقدم", "vorfahrt", "تقاطع"], answer: "در تقاطع بدون تابلو قانون Rechts vor Links اجرا می‌شود — وسیله‌ای که از سمت راست می‌آید حق تقدم دارد." },
 { keys: ["تبدیل گواهینامه", "گواهینامه ایرانی", "umschreiben"], answer: "معمولاً نیاز به Sehtest، Erste Hilfe Kurs، آزمون تئوری و آزمون عملی خواهید داشت. شرایط دقیق به شهر و وضعیت اقامتی بستگی دارد." },
 { keys: ["تابلو", "schild", "zeichen", "علائم"], answer: "تابلوهای آلمان به سه دسته اصلی تقسیم می‌شوند: مثلث قرمز (هشدار)، دایره قرمز (ممنوعیت) و دایره آبی (الزام)." },
 { keys: ["جریمه", "bußgeld", "strafe", "مجازات"], answer: "جریمه‌ها بسته به نوع تخلف متفاوت است. مثلاً موبایل بدون هندزفری ۱۰۰ یورو و تجاوز از سرعت در شهر از ۳۰ یورو شروع می‌شود." },
 { keys: ["مدارک", "dokument", "unterlagen", "کارت"], answer: "هنگام رانندگی باید گواهینامه، کارت شناسایی، بیمه‌نامه و کارت فنی خودرو همراه داشته باشید." },
 { keys: ["کمربند", "sicherheitsgurt", "anschnall"], answer: "کمربند برای همه سرنشینان در تمام صندلی‌ها اجباری است. هم راننده هم مسافر جریمه می‌شوند." },
 { keys: ["موبایل", "handy", "telefon", "هندزفری"], answer: "استفاده از موبایل بدون هندزفری در حین رانندگی ممنوع است و می‌تواند ۱۰۰ یورو جریمه و ۱ امتیاز منفی داشته باشد." },
 { keys: ["اتوبان", "autobahn"], answer: "در اتوبان باید سمت راست رانندگی کنی. سمت چپ فقط برای سبقت است. سرعت توصیه‌ای ۱۳۰ کیلومتر است اما الزامی نیست." },
 { keys: ["میدان", "kreisverkehr", "دوار"], answer: "در میدان دوار کسی که داخل است اولویت دارد. هنگام ورود راهنما نزن، فقط موقع خروج راهنما بزن." },
 { keys: ["کودک", "kindersitz", "صندلی کودک"], answer: "کودکان زیر ۱۲ سال یا کمتر از ۱۵۰ سانتی‌متر قد باید در صندلی مخصوص بنشینند." },
];

const QUICK_BUTTONS = [
 {
   label: "🪪 تبدیل گواهینامه",
   userMsg: "برای تبدیل گواهینامه ایرانی چه مراحلی لازم است؟",
   botMsg: "معمولاً نیاز به Sehtest، Erste Hilfe Kurs، آزمون تئوری و آزمون عملی خواهید داشت. شرایط دقیق به شهر و وضعیت اقامتی بستگی دارد.",
 },
 {
   label: "🚦 حق تقدم",
   userMsg: "حق تقدم در تقاطع بدون تابلو چگونه است؟",
   botMsg: "طبق قانون Rechts vor Links، وسیله‌ای که از سمت راست می‌آید حق تقدم دارد. این قانون در ایران وجود ندارد و یکی از رایج‌ترین اشتباهات است.",
 },
 {
   label: "🍺 الکل",
   userMsg: "حد مجاز الکل چقدر است؟",
   botMsg: "برای رانندگان عادی ۰.۵ پرومیله. برای رانندگان تازه‌کار و زیر ۲۱ سال حد مجاز ۰.۰ است. اطلاعات دقیق را از منابع رسمی تأیید کنید.",
 },
 {
   label: "🚧 تابلوها",
   userMsg: "انواع تابلوهای راهنمایی در آلمان چیست؟",
   botMsg: "تابلوهای آلمان سه دسته اصلی دارند: مثلث قرمز = هشدار، دایره قرمز = ممنوعیت، دایره آبی = الزام. یادگیری این سه دسته خیلی کمک می‌کند.",
 },
 {
   label: "🚓 جریمه‌ها",
   userMsg: "جریمه‌های رانندگی در آلمان چقدر است؟",
   botMsg: "جریمه‌ها بسته به تخلف متفاوت است. موبایل بدون هندزفری: ۱۰۰ یورو. تجاوز از سرعت در شهر از ۳۰ یورو شروع می‌شود. مبالغ دقیق را از منابع رسمی بررسی کنید.",
 },
 {
   label: "📄 مدارک لازم",
   userMsg: "چه مدارکی باید هنگام رانندگی همراه داشته باشم؟",
   botMsg: "گواهینامه، کارت شناسایی، بیمه‌نامه (Versicherung) و کارت فنی خودرو (Fahrzeugschein) را همیشه همراه داشته باشید.",
 },
];

function getBotAnswer(text) {
 const lower = text.toLowerCase();
 for (const item of FAQ) {
   if (item.keys.some(k => lower.includes(k))) return item.answer;
 }
 return "فعلاً پاسخ این سؤال در نسخه آزمایشی موجود نیست. در نسخه Pro دستیار هوشمند پاسخ کامل ارائه خواهد کرد.";
}

export default function AIPage({ onBack }) {
 const [messages, setMessages] = useState([
   {
     role: "bot",
     text: "سلام! من FahrKI هستم 🤖\n\nدستیار آزمایشی همراه گواهینامه آلمان.\n\nیه سوال بپرس یا از دکمه‌های سریع استفاده کن.",
   },
 ]);
 const [input, setInput]     = useState("");
 const [typing, setTyping]   = useState(false);
 const bottomRef             = useRef(null);

 useEffect(() => {
   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
 }, [messages, typing]);

 const addExchange = (userMsg, botMsg) => {
   setMessages(prev => [...prev, { role: "user", text: userMsg }]);
   setTyping(true);
   setTimeout(() => {
     setTyping(false);
     setMessages(prev => [...prev, { role: "bot", text: botMsg }]);
   }, 900 + Math.random() * 500);
 };

 const handleQuick = (btn) => {
   if (typing) return;
   addExchange(btn.userMsg, btn.botMsg);
 };

 const handleSend = () => {
   const text = input.trim();
   if (!text || typing) return;
   setInput("");
   addExchange(text, getBotAnswer(text));
 };

 return (
   <div style={{ fontFamily: "'Vazirmatn',sans-serif", direction: "rtl", display: "flex", flexDirection: "column", height: "calc(100vh - 140px)" }}>

     {/* هدر */}
     <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
       <button onClick={onBack}
         style={{ background: "transparent", border: "1px solid #1e3a5f", borderRadius: 8, padding: "6px 12px", color: "#8B949E", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
         ← برگشت
       </button>
       <div style={{ flex: 1 }}>
         <div style={{ fontWeight: 900, fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
           🤖 FahrKI Assistant
         </div>
         <div style={{ fontSize: 11, color: "#8B949E", marginTop: 2 }}>نسخه آزمایشی دستیار هوشمند همراه گواهینامه</div>
       </div>
     </div>

     {/* کارت Beta */}
     <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: 12, padding: "10px 14px", marginBottom: 12, fontSize: 12, color: "#FCD34D", lineHeight: 1.7 }}>
       🚧 <strong>Beta</strong> — اتصال زنده به هوش مصنوعی در نسخه بعدی فعال خواهد شد.<br />
       <span style={{ color: "#8B949E" }}>در حال حاضر پاسخ‌ها بر اساس نمونه‌های داخلی نمایش داده می‌شوند.</span>
     </div>

     {/* دکمه‌های سریع */}
     <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 8, marginBottom: 10, flexShrink: 0 }}>
       {QUICK_BUTTONS.map(btn => (
         <button key={btn.label} onClick={() => handleQuick(btn)} disabled={typing}
           style={{ flexShrink: 0, background: "#1a2f52", border: "1px solid #1e3a5f", borderRadius: 20, padding: "7px 13px", fontSize: 12, fontWeight: 600, color: "#8B949E", cursor: typing ? "default" : "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>
           {btn.label}
         </button>
       ))}
     </div>

     {/* پیام‌ها */}
     <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 8 }}>
       {messages.map((m, i) => (
         <div key={i} style={{ display: "flex", gap: 8, flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-end" }}>
           {/* آواتار */}
           <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, background: m.role === "user" ? "rgba(255,149,0,0.2)" : "rgba(96,165,250,0.15)", border: `1px solid ${m.role === "user" ? "rgba(255,149,0,0.3)" : "rgba(96,165,250,0.25)"}` }}>
             {m.role === "user" ? "👤" : "🤖"}
           </div>
           {/* حباب */}
           <div style={{ maxWidth: "82%", background: m.role === "user" ? "rgba(255,149,0,0.12)" : "#1a2f52", border: `1px solid ${m.role === "user" ? "rgba(255,149,0,0.25)" : "#1e3a5f"}`, borderRadius: m.role === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px", padding: "10px 14px", fontSize: 13, lineHeight: 1.85, color: "#E6EDF3" }}>
             {m.text.split("\n").map((l, j) => (
               <p key={j} style={{ margin: 0, marginBottom: j < m.text.split("\n").length - 1 ? 4 : 0 }}>{l}</p>
             ))}
           </div>
         </div>
       ))}

       {/* تایپینگ */}
       {typing && (
         <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
           <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, background: "rgba(96,165,250,0.15)", border: "1px solid rgba(96,165,250,0.25)" }}>🤖</div>
           <div style={{ background: "#1a2f52", border: "1px solid #1e3a5f", borderRadius: "4px 18px 18px 18px", padding: "12px 16px" }}>
             <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
               <span style={{ fontSize: 11, color: "#8B949E", marginLeft: 6 }}>FahrKI schreibt</span>
               {[0, 1, 2].map(j => (
                 <div key={j} style={{ width: 7, height: 7, borderRadius: "50%", background: "#8B949E", animation: `bounce 1.2s ${j * 0.2}s infinite` }} />
               ))}
             </div>
           </div>
         </div>
       )}
       <div ref={bottomRef} />
     </div>

     {/* ورودی */}
     <div style={{ flexShrink: 0, borderTop: "1px solid #1e3a5f", paddingTop: 12, marginBottom: 8 }}>
       <div style={{ display: "flex", gap: 8 }}>
         <input value={input} onChange={e => setInput(e.target.value)}
           onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
           placeholder="سوالت را بنویس..."
           disabled={typing}
           style={{ flex: 1, background: "#112240", border: "1px solid #1e3a5f", borderRadius: 10, padding: "11px 14px", fontSize: 14, color: "#E6EDF3", outline: "none", fontFamily: "inherit", direction: "rtl" }}
         />
         <button onClick={handleSend} disabled={typing || !input.trim()}
           style={{ width: 44, height: 44, background: typing || !input.trim() ? "#1a2f52" : "#FF9500", border: "none", borderRadius: 10, cursor: typing || !input.trim() ? "default" : "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
           {typing ? "⏳" : "↑"}
         </button>
       </div>
     </div>

     {/* کارت Pro */}
     <div style={{ background: "linear-gradient(135deg, #1a2f52, #112240)", border: "1px solid #1e3a5f", borderRadius: 16, padding: 16, marginTop: 4, flexShrink: 0 }}>
       <div style={{ fontWeight: 900, fontSize: 15, color: "#FFB340", marginBottom: 10 }}>⭐ FahrKI Pro <span style={{ fontSize: 11, background: "rgba(255,179,64,0.15)", border: "1px solid rgba(255,179,64,0.3)", borderRadius: 6, padding: "2px 8px", fontWeight: 700 }}>Coming Soon</span></div>
       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
         {[
           "تحلیل تصاویر سوالات",
           "تحلیل ویدئوها",
           "توضیح قوانین",
           "مربی شخصی آزمون",
           "تحلیل نقاط ضعف",
           "پاسخ به سوالات آزاد",
           "تحلیل نقشه‌های تقاطع",
           "شبیه‌ساز آزمون واقعی",
         ].map(f => (
           <div key={f} style={{ fontSize: 12, color: "#8B949E", display: "flex", alignItems: "center", gap: 6 }}>
             <span style={{ color: "#2EA043", fontSize: 13 }}>✓</span> {f}
           </div>
         ))}
       </div>
     </div>

     <style>{`
       @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
     `}</style>
   </div>
 );
}
