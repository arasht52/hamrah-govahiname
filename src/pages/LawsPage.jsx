import { useState } from "react";

export default function LawsPage({ onBack }) {
  const [selectedChapter, setSelectedChapter] = useState("1");

  const chapters = [
    { id: "1", title: "فصل ۱: انسان به عنوان عامل ترافیک (الکل، داروها و تمرکز)" },
    { id: "2", title: "فصل ۲: اصول ایمنی، سرعت و مسافت ترمزگیری" },
    { id: "3", title: "فصل ۳: قوانین استفاده از راه‌ها (به زودی...)" },
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

      {/* باکس نمایش متن کتاب */}
      <div style={{ flex: 1, background: "#112240", border: "1px solid #1e3a5f", borderRadius: 16, padding: 18, color: "#E6EDF3", overflowY: "auto", textAlign: "right", lineHeight: "1.9" }}>
        
        {/* ==================== فصل اول ==================== */}
        {selectedChapter === "1" && (
          <div>
            <h4 style={{ color: "#FF9500", marginTop: 0, fontSize: 15, borderBottom: "1px solid #1e3a5f", paddingBottom: 8 }}>Der Mensch als Verkehrsteilnehmer (انسان در ترافیک)</h4>
            
            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۱. اصل اساسی ترافیک (StVO §1)</h5>
            <p style={{ fontSize: 12, color: "#8B949E", margin: "0 0 4px 0", fontStyle: "italic" }}>Die Teilnahme am Straßenverkehr erfordert ständige Vorsicht und gegenseitige Rücksicht.</p>
            <p style={{ fontSize: 13, margin: "0 0 12px 0" }}>شرکت در ترافیک نیازمند <strong>احتیاط مداوم</strong> و <strong>رعایت متقابل حقوق دیگران</strong> است. شما باید طوری رانندگی کنید که هیچ‌کس آسیب نبیند، به خطر نیفتد و مانعی برای بقیه ایجاد نشود.</p>

            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۲. خستگی مفرط و حواس‌پرتی (Übermüdung)</h5>
            <p style={{ fontSize: 13, margin: "0 0 12px 0" }}>خستگی شدید منجر به پدیده مرگبار <strong>خواب ثانیه‌ای (Sekundenschlaf)</strong> می‌شود. علائمی مثل سنگینی پلک و خمیازه زدن یعنی هشدار قرمز! باز کردن پنجره یا بلند کردن صدای رادیو تأثیری ندارد؛ تنها راه حل واقعی، توقف در پارکینگ و کمی خوابیدن یا پیاده‌روی است.</p>
            
            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۳. قوانین الکل و حد مجاز (Alkohol)</h5>
            <ul style={{ paddingRight: 20, fontSize: 12, margin: 0 }}>
              <li><strong>حد مجاز عمومی (0.5 Promille):</strong> برای رانندگان باسابقه حداکثر میزان مجاز است، به شرطی که رانندگی خطرناک یا تصادف نکنند.</li>
              <li><strong>قانون صفر مطلق (0.0 Promille):</strong> برای رانندگان زیر ۲۱ سال و کسانی که در دوره آزمایشی ۲ ساله گواهینامه (Probezeit) هستند، الکل باید دقیقاً صفر باشد.</li>
            </ul>

            <h5 style={{ color: "#FF9500", fontSize: 13, marginTop: 12, marginBottom: 4 }}>۴. داروها و مواد مخدر (Drogen & Medikamente)</h5>
            <p style={{ fontSize: 13, margin: 0 }}>مصرف مواد مخدر (حشیش، کوکائین و...) باعث ابطال فوری گواهینامه و ارجاع به تست روان‌شناختی سخت‌گیرانه <strong>MPU</strong> می‌شود. همچنین داروهای ضد حساسیت یا مسکن‌های قوی سرعت واکنش شما را کاهش می‌دهند و مسئولیت مصرف آن‌ها کاملاً با راننده است.</p>
          </div>
        )}

        {/* ==================== فصل دوم ==================== */}
        {selectedChapter === "2" && (
          <div>
            <h4 style={{ color: "#FF9500", marginTop: 0, fontSize: 15, borderBottom: "1px solid #1e3a5f", paddingBottom: 8 }}>Grundregeln, Geschwindigkeit und Bremsweg (اصول رانندگی و محاسبات ترمز)</h4>
            
            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۱. انتخاب سرعت مناسب (Geschwindigkeit)</h5>
            <p style={{ fontSize: 13, margin: "0 0 12px 0" }}>سرعت شما باید همیشه با شرایط جاده، دید، آب‌وهوا و بار ماشین هماهنگ باشد. سرعت باید طوری باشد که بتوانید در فاصه دید خود (Sichtweite) ماشین را کاملاً متوقف کنید. اگر جاده بسیار باریک است، سرعت باید طوری باشد که در **نصف فاصله دید** متوقف شوید.</p>

            <blockquote style={{ background: "#1a2f52", borderRight: "4px solid #FF9500", margin: "12px 0", padding: "10px 14px", borderRadius: 4, fontSize: 12, direction: "ltr", textAlign: "left" }}>
              <strong>💡 فرمول‌های حیاتی آزمون تئوری (مهم):</strong><br/>
              • Reaktionsweg (مسافت واکنش): (Geschwindigkeit / 10) * 3<br/>
              • Bremsweg (مسافت ترمز معمولی): (Geschwindigkeit / 10) * (Geschwindigkeit / 10)<br/>
              • Anhalteweg (مسافت کل توقف): مسافت واکنش + مسافت ترمز
            </blockquote>

            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۲. ترمز اضطراری (Gefahrenbremsung)</h5>
            <p style={{ fontSize: 13, margin: "0 0 12px 0" }}>اگر خطر ناگهانی رخ دهد و نیاز به ترمز مایکروویوی یا اضطراری باشد، مسافت ترمز به خاطر فشار شدید روی پدال **نصف** می‌شود. فرمول آن: <br/><code style={{color: "#FF9500"}}>[(Geschwindigkeit / 10) * (Geschwindigkeit / 10)] / 2</code></p>
            
            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۳. فاصله ایمنی با ماشین جلویی (Sicherheitsabstand)</h5>
            <p style={{ fontSize: 13, margin: 0 }}>در خارج از شهر و اتوبان‌ها، فاصله ایمن با ماشین جلویی طبق قانون **فاصله ۲ ثانیه‌ای** یا فرمول **نصف سرعت روی کیلومترشمار** (Abstand gleich halber Tacho) محاسبه می‌شود. مثلاً اگر با سرعت ۱۰۰ کیلومتر بر ساعت حرکت می‌کنید، فاصله شما با ماشین جلویی باید حداقل ۵۰ متر باشد (معادل فاصله بین دو پست شبرنگ در اتوبان‌ها).</p>
          </div>
        )}

      </div>
    </div>
  );
}
