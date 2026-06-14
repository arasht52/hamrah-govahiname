import { useState, useRef, useEffect } from "react";

// یک دیتابیس کوچک از پاسخ‌های هوشمند و قانونی آلمان برای حالت آفلاین/پایه
const AI_KNOWLEDGE_BASE = [
  { keywords: ["right", "links", "راست", "تقدم", "تقاطع"], response: "قانون Rechts vor Links (راست بر چپ) می‌گوید در تقاطع‌هایی که هیچ تابلو یا چراغ راهنمایی ندارند، حق تقدم همیشه با خودرویی است که از سمت راست شما می‌آید. این قانون در مناطق مسکونی (30er Zone) آلمان بسیار رایج و حیاتی است." },
  { keywords: ["autobahn", "اتوبان", "سرعت", "بزرگراه"], response: "در اتوبان‌های آلمان، سرعت توصیه شده (Richtgeschwindigkeit) ۱۳۰ کیلومتر بر ساعت است. در بخش‌هایی که تابلوی محدودیت سرعت وجود ندارد، حداکثر سرعت قانونی تعیین نشده، اما در صورت بروز تصادف در سرعت‌های بالای ۱۳۰، مسئولیت سنگینی بر عهده راننده خواهد بود." },
  { keywords: ["alkohol", "الکل", "مواد", "آبجو"], response: "حد مجاز الکل در خون برای رانندگان عادی در آلمان 0.5 پرومیل است. اما توجه داشته باشید: برای رانندگان زیر ۲۱ سال و کسانی که کمتر از ۲ سال از گرفتن گواهینامه‌شان می‌گذرد (Probezeit)، حد مجاز دقیقاً 0.0 (صفر مطلق) است و جریمه‌های بسیار سنگینی دارد." },
  { keywords: ["سلام", "درود", "کمک"], response: "سلام! من دستیار هوشمند همراه گواهینامه هستم. می‌توانید درباره قوانین رانندگی در آلمان، تابلوها، سرعت مجاز یا اصطلاحات ترافیکی از من بپرسید تا راهنمایی‌تان کنم." }
];

export default function AIPage({ onBack }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "سلام! من دستیار هوشمند شما برای گواهینامه آلمان هستم. چطور می‌توانم کمکتان کنم؟ مثلاً بنویسید: سرعت در اتوبان یا حق تقدم راست به چپ." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);

  // اسکرول خودکار به انتهای چت هنگام آمدن پیام جدید
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const newMessages = [...messages, { id: Date.now(), sender: "user", text: userText }];
    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    // شبیه‌سازی پاسخ هوش مصنوعی بعد از ۱.۵ ثانیه
    setTimeout(() => {
      let aiResponse = "متوجه سوال شما نشدم. در نسخه کامل می‌توانید هر سوالی را بپرسید تا مستقیماً توسط مدل‌های پیشرفته تحلیل شود. در حال حاضر می‌توانید درباره 'سرعت در اتوبان'، 'الکل' یا 'حق تقدم' بپرسید.";
      
      // جستجو در پایگاه دانش بر اساس کلمات کلیدی کاربر
      const lowerText = userText.toLowerCase();
      for (const item of AI_KNOWLEDGE_BASE) {
        if (item.keywords.some(keyword => lowerText.includes(keyword))) {
          aiResponse = item.response;
          break;
        }
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: "ai", text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 180px)" }}>
      {/* هدر بخش هوش مصنوعی */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <h3 style={{ fontSize: 16, fontWeight: 850, margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
          <span>🤖</span> دستیار هوشمند ترافیکی
        </h3>
        <button onClick={onBack}
          style={{ background: "transparent", border: "1px solid #1e3a5f", borderRadius: 8, padding: "5px 12px", color: "#8B949E", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>
          برگشت
        </button>
      </div>

      {/* محفظه پیام‌های چت */}
      <div style={{ flex: 1, background: "#112240", border: "1px solid #1e3a5f", borderRadius: 16, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, marginBottom: 12 }}>
        {messages.map(msg => {
          const isUser = msg.sender === "user";
          return (
            <div key={msg.id} style={{ display: "flex", justifyContent: isUser ? "flex-start" : "flex-end", direction: "rtl" }}>
              <div style={{
                maxWidth: "85%",
                background: isUser ? "#FF9500" : "#1a2f52",
                color: isUser ? "#0A2540" : "#E6EDF3",
                padding: "10px 14px",
                borderRadius: isUser ? "16px 16px 0 16px" : "16px 16px 16px 0",
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.7,
                textAlign: "right"
              }}>
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* انیمیشن وضعیت در حال تایپ هوش مصنوعی */}
        {isTyping && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ background: "#1a2f52", color: "#8B949E", padding: "10px 16px", borderRadius: "16px 16px 16px 0", fontSize: 12, fontWeight: 700 }}>
              دستیار در حال تحلیل...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* باکس ورودی متن پیام */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="سوال خود را درباره قوانین آلمان بپرسید..."
          style={{
            flex: 1,
            background: "#112240",
            border: "1px solid #1e3a5f",
            borderRadius: 12,
            padding: "14px 16px",
            color: "#E6EDF3",
            fontFamily: "inherit",
            fontSize: 13,
            outline: "none"
          }}
        />
        <button onClick={handleSend}
          style={{
            background: "#FF9500",
            border: "none",
            borderRadius: 12,
            padding: "14px 20px",
            color: "#0A2540",
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 14
          }}
        >
          ارسال
        </button>
      </div>
    </div>
  );
}
