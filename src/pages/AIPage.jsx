import { useState, useRef, useEffect } from "react";

// دریافت کلید از متغیرهای محیطی Vite (باید در فایل .env ریشه پروژه ذخیره شود)
// نمونه داخل فایل .env: VITE_OPENAI_API_KEY=your_actual_api_key_here
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export default function AIPage({ onBack }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "سلام! من دستیار هوشمند شما برای گواهینامه آلمان هستم. چطور می‌توانم کمکتان کنم؟ مثلاً بنویسید: سرعت در اتوبان یا حق تقدم راست به چپ." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const newMessages = [...messages, { id: Date.now(), sender: "user", text: userText }];
    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      // اتصال مستقیم به API رسمی OpenAI
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // یک مدل فوق‌العاده سریع، دقیق و بسیار ارزان که ۵ یوروی شما را به این زودی‌ها تمام نمی‌کند
          messages: [
            { 
              role: "system", 
              content: "تو یک کارشناس خبره و مهربان قوانین راهنمایی و رانندگی آلمان (TÜV/DEKRA) هستی. وظیفه تو راهنمایی متقاضیان ایرانی گواهینامه در آلمان است. تمام پاسخ‌های خود را به زبان فارسی روان، دقیق، خلاصه و کاملاً منطبق بر کتابچه قوانین ترافیکی آلمان ارائه بده. در صورت نیاز از اصطلاحات آلمانی هم استفاده کن." 
            },
            ...newMessages.map(msg => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text
            }))
          ],
          temperature: 0.5
        })
      });

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: "ai", text: aiResponse }]);
    } catch (error) {
      console.error("OpenAI Error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: "ai", 
        text: "متأسفانه در اتصال به سرور هوش مصنوعی خطایی رخ داد. لطفاً وضعیت اینترنت یا اعتبار کلید API خود را بررسی کنید." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 180px)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <h3 style={{ fontSize: 16, fontWeight: 850, margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
          <span>🤖</span> دستیار هوشمند زنده (OpenAI)
        </h3>
        <button onClick={onBack}
          style={{ background: "transparent", border: "1px solid #1e3a5f", borderRadius: 8, padding: "5px 12px", color: "#8B949E", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>
          برگشت
        </button>
      </div>

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

        {isTyping && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ background: "#1a2f52", color: "#8B949E", padding: "10px 16px", borderRadius: "16px 16px 16px 0", fontSize: 12, fontWeight: 700 }}>
              دستیار در حال تحلیل...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="سوال خود را از هوش مصنوعی بپرسید..."
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
