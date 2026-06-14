import { useState } from "react";

// دیتای پرجزئیات و تفصیلی کتاب (ادغام شده در یک فایل برای جلوگیری از خطای بیلد ویت)
const bookData = {
  1: {
    title: "فصل ۱: انسان به عنوان راننده (تمرکز، الکل و داروها)",
    content: (
      <div>
        <h4 style={{ color: "#FF9500", marginTop: 0, fontSize: 15, borderBottom: "1px solid #1e3a5f", paddingBottom: 8 }}>Der Mensch als Verkehrsteilnehmer (عامل انسانی در رانندگی)</h4>
        
        <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۱. اصل اساسی و قانون طلایی راهنمایی و رانندگی (StVO §1)</h5>
        <p style={{ fontSize: 12, color: "#8B949E", margin: "0 0 4px 0", fontStyle: "italic" }}>Die Teilnahme am Straßenverkehr erfordert ständige Vorsicht und gegenseitige Rücksicht.</p>
        <p style={{ fontSize: 13, margin: "0 0 12px 0" }}>
          <strong>ترجمه روان:</strong> تردد و رانندگی در معابر عمومی، مستلزم احتیاط مداوم و رعایت متقابل حقوق دیگران است. هر راننده باید به گونه‌ای رفتار کند که هیچ‌یک از کاربران راه (عابران و خودروهای دیگر) آسیب نبینند، به خطر نیفتند، و بیشتر از آنچه در شرایط موجود ناگزیر است، مسیرشان مسدود یا دچار زحمت نشود.
        </p>

        <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۲. خستگی مفرط و حواس‌پرتی (Übermüdung)</h5>
        <p style={{ fontSize: 13, margin: "0 0 12px 0" }}>
          رانندگی طولانی‌مدت یا بیخوابی منجر به پدیده مرگبار <strong>«خواب چند ثانیه‌ای» (Sekundenschlaf)</strong> می‌شود. علائمی مانند سنگینی پلک‌ها، سوزش چشم و خمیازه‌های پی‌درپی هشدارهای جدی هستند. ترفندهایی مثل بالا بردن صدای رادیو یا باز کردن پنجره هیچ تأثیری در رفع خستگی واقعی ندارند؛ تنها راهکار قانونی و ایمن، توقف در اولین پارکینگ، کمی استراحت یا پیاده‌روی در هوای آزاد است.
        </p>
        
        <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۳. قوانین الکل و حد مجاز خون (Alkohol)</h5>
        <ul style={{ paddingRight: 20, fontSize: 12, margin: 0, lineHeight: "1.8" }}>
          <li><strong>حد مجاز رانندگان باسابقه (0.5 Promille):</strong> برای رانندگان عادی، حداکثر میزان مجاز الکل خون ۵ دهم فی‌هزار است؛ به شرطی که رانندگی مخاطره‌آمیز نداشته باشند یا تصادف نکنند.</li>
          <li><strong>قانون صفر مطلق (0.0 Promille):</strong> برای رانندگان زیر ۲۱ سال و تمامی کسانی که در دوره آزمایشی ۲ ساله گواهینامه (Probezeit) هستند، مصرف هرگونه الکل مطلقاً ممنوع است.</li>
        </ul>
      </div>
    )
  },
  4: {
    title: "فصل ۴: حق تقدم، سبقت و خطوط حرکت (Überholen & Vorfahrt)",
    content: (
      <div>
        <h4 style={{ color: "#FF9500", marginTop: 0, fontSize: 15, borderBottom: "1px solid #1e3a5f", paddingBottom: 8 }}>Überholen und Vorfahrt (مقررات سبقت و حق تقدم)</h4>
        
        <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۱. قوانین جامع سبقت گرفتن (Überholen)</h5>
        <p style={{ fontSize: 13, margin: "0 0 12px 0" }}>
          طبق قاعده کلی، سبقت در جاده‌های آلمان همیشه باید از <strong>سمت چپ</strong> انجام شود. سبقت گرفتن از سمت راست در خارج از شهر و اتوبان‌ها ممنوع و دارای جریمه سنگین است. برای یک سبقت ایمن، سرعت شما باید حداقل ۲۰ کیلومتر بر ساعت از خودروی جلویی بیشتر باشد تا زمان سبقت طولانی نشود.
        </p>
        
        <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>استثناهای مجاز سبقت از سمت راست:</h5>
        <ul style={{ paddingRight: 20, fontSize: 12, margin: "0 0 12px 0", lineHeight: "1.8" }}>
          <li>اگر راننده جلویی راهنمای سمت چپ را روشن کرده و کاملاً به سمت چپ متمایل شده تا تغییر مسیر دهد، شما باید از سمت راست او عبور کنید.</li>
          <li>ترامواها (قطارهای شهری) همیشه باید از سمت راست سبقت گرفته شوند، مگر در خیابان‌های یک‌طرفه.</li>
          <li>در ترافیک‌های سنگین و زنجیره‌ای (Stau)، اگر سرعت باندِ سمت چپ زیر ۶۰ کیلومتر بر ساعت باشد، خودروهای باند سمت راست مجازند با سرعت حداکثر ۲۰ کیلومتر بر ساعت بیشتر، از آن‌ها جلو بزنند.</li>
        </ul>

        <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۲. قانون طلایی حق تقدم تقاطع‌ها (Rechts vor Links)</h5>
        <p style={{ fontSize: 13, margin: "0 0 12px 0" }}>
          در تقاطع‌ها، سه راهی‌ها و میدان‌هایی که هیچ‌گونه تابلوی حق تقدم، چراغ راهنمایی یا مأمور پلیس وجود ندارد، قانون <strong>«حق تقدم با وسیله‌ای است که از سمت راست می‌آید»</strong> حاکم است. این قانون پایه، در اکثر مناطق مسکونی درون‌شهری (Zone 30) به شدت اجرا می‌شود.
        </p>

        <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۳. قانون ادغام یک‌درمیان یا زیپ‌باکس (Reißverschlussverfahren)</h5>
        <p style={{ fontSize: 13, margin: 0 }}>
          هنگامی که یکی از باندهای حرکت به دلیل عملیات عمرانی یا تصادف بسته می‌شود، رانندگان موظفند تا انتهای باندِ در حال بسته شدن پیش بروند و دقیقاً در نقطه ادغام، به صورت یک‌درمیان (مانند دنده‌های زیپ) وارد باند باز شوند. تغییر باندِ زودهنگام قبل از نقطه نهایی ترافیک را سنگین‌تر می‌کند و تخلف است.
        </p>
      </div>
    )
  }
};

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
          onChange={(e) => setSelectedChapter(e.select? e.target.value : e.target.value)}
          style={{ width: "100%", background: "#1a2f52", color: "#E6EDF3", border: "1px solid #1e3a5f", borderRadius: 10, padding: "12px", fontSize: 13, fontFamily: "inherit", cursor: "pointer", outline: "none", direction: "rtl" }}
        >
          {chapters.map((ch) => (
            <option key={ch.id} value={ch.id}>{ch.title}</option>
          ))}
        </select>
      </div>

      {/* باکس نمایش متن کتاب */}
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
