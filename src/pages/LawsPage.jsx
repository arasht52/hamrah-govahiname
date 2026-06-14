import { useState } from "react";
import { bookData } from "./bookData"; // وارد کردن متن‌های تفصیلی کتاب

export default function LawsPage({ onBack }) {
  const [selectedChapter, setSelectedChapter] = useState("1");

  const chapters = [
    { id: "1", title: "فصل ۱: انسان به عنوان راننده (تمرکز، الکل و داروها)" },
    { id: "2", title: "فصل ۲: اصول ایمنی، سرعت و محاسبات ترمز (به زودی...)" },
    { id: "3", title: "فصل ۳: قوانین استفاده از مسیرها و باندها (به زودی...)" },
    { id: "4", title: "فصل ۴: حق تقدم، سبقت و خطوط حرکت (تفصیلی و کامل)" },
    { id: "5", title: "فصل ۵: گردش، تغییر باند و دور زدن (به زودی...)" },
    { id: "6", title: "فصل ۶: رفتارهای ترافیکی خاص و تقاطع‌ها (به زودی...)" },
    { id: "7", title: "فصل ۷: توقف، پارک کردن و چراغ‌ها (به زودی...)" },
    { id: "8", title: "فصل ۸: اتوبان‌ها و جاده‌های سرعت (به زودی...)" },
    { id: "9", title: "فصل ۹: رانندگی در شرایط خاص و تونل‌ها (به زودی...)" },
    { id: "10", title: "فصل ۱۰: بار زدن و جابه‌جایی مسافر (به زودی...)" },
    { id: "11", title: "فصل ۱۱: فنی خودرو و نگهداری (به زودی...)" },
    { id: "12", title: "فصل ۱۲: رانندگی اقتصادی و محیط زیست (به زودی...)" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 180px)", fontFamily: "inherit" }}>
      
      {/* هدر صفحه */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 850, margin: 0, color: "#FFF" }}>📖 کتابچه کامل آیین‌نامه رانندگی آلمان</h3>
        <button onClick={onBack}
          style={{ background: "transparent", border: "1px solid #1e3a5f", borderRadius: 8, padding: "6px 14px", color: "#8B949E", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>
          برگشت
        </button>
      </div>

      {/* منوی کشویی انتخاب فصل‌ها */}
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <label style={{ fontSize: 12, color: "#8B949E", display: "block", marginBottom: 6, fontWeight: 700 }}>انتخاب فصل کتاب:</label>
        <select 
          value={selectedChapter} 
          onChange={(e) => setSelectedChapter(e.target.value)}
          style={{ width: "100%", background: "#1a2f52", color: "#E6EDF3", border: "1px solid #1e3a5f", borderRadius: 10, padding: "12px", fontSize: 13, fontFamily: "inherit", cursor: "pointer", outline: "none", direction: "rtl" }}
        >
          {chapters.map((ch) => (
            <option key={ch.id} value={ch.id}>{ch.title}</option>
          ))}
        </select>
      </div>

      {/* باکس هوشمند نمایش متن کتاب از فایل خارجی */}
      <div style={{ flex: 1, background: "#112240", border: "1px solid #1e3a5f", borderRadius: 16, padding: 18, color: "#E6EDF3", overflowY: "auto", textAlign: "right", lineHeight: "1.9" }}>
        {bookData[selectedChapter] ? (
          bookData[selectedChapter].content
        ) : (
          <div style={{ textAlign: "center", color: "#8B949E", padding: 20 }}>
            <p style={{ fontSize: 13 }}>مطالب تخصصی و ترجمه روان این فصل در حال بارگذاری و به‌روزرسانی نهایی است...</p>
          </div>
        )}
      </div>
    </div>
  );
}
