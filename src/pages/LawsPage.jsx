import { useState } from "react";

export default function LawsPage({ onBack }) {
  const [selectedChapter, setSelectedChapter] = useState("1");

  const chapters = [
    { id: "1", title: "فصل ۱: انسان به عنوان عامل ترافیک (الکل، داروها و تمرکز)" },
    { id: "2", title: "فصل ۲: اصول ایمنی، سرعت و مسافت ترمزگیری" },
    { id: "3", title: "فصل ۳: قوانین استفاده از راه‌ها و باندها (Straßennutzung)" },
    { id: "4", title: "فصل ۴: سبقت، حق تقدم و خطوط ویژه (Überholen & Vorfahrt)" }
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
          </div>
        )}

        {/* ==================== فصل دوم ==================== */}
        {selectedChapter === "2" && (
          <div>
            <h4 style={{ color: "#FF9500", marginTop: 0, fontSize: 15, borderBottom: "1px solid #1e3a5f", paddingBottom: 8 }}>Grundregeln, Geschwindigkeit und Bremsweg (اصول رانندگی و محاسبات ترمز)</h4>
            
            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۱. انتخاب سرعت مناسب (Geschwindigkeit)</h5>
            <p style={{ fontSize: 13, margin: "0 0 12px 0" }}>سرعت شما باید همیشه با شرایط جاده، دید، آب‌وهوا و بار ماشین هماهنگ باشد. سرعت باید طوری باشد که بتوانید در فاصله دید خود (Sichtweite) ماشین را کاملاً متوقف کنید. اگر جاده بسیار باریک است، سرعت باید طوری باشد که در **نصف فاصله دید** متوقف شوید.</p>

            <blockquote style={{ background: "#1a2f52", borderRight: "4px solid #FF9500", margin: "12px 0", padding: "10px 14px", borderRadius: 4, fontSize: 12, direction: "ltr", textAlign: "left" }}>
              <strong>💡 فرمول‌های حیاتی آزمون تئوری (مهم):</strong><br/>
              • Reaktionsweg (مسافت واکنش): (Geschwindigkeit / 10) * 3<br/>
              • Bremsweg (مسافت ترمز معمولی): (Geschwindigkeit / 10) * (Geschwindigkeit / 10)<br/>
              • Anhalteweg (مسافت کل توقف): مسافت واکنش + مسافت ترمز
            </blockquote>
          </div>
        )}

        {/* ==================== فصل سوم ==================== */}
        {selectedChapter === "3" && (
          <div>
            <h4 style={{ color: "#FF9500", marginTop: 0, fontSize: 15, borderBottom: "1px solid #1e3a5f", paddingBottom: 8 }}>Straßennutzung und Fahrbahnen (قوانین استفاده از مسیرها و باندها)</h4>
            
            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۱. اصل حرکت از سمت راست (Rechtsfahrgebot)</h5>
            <p style={{ fontSize: 13, margin: "0 0 12px 0" }}>در آلمان، در تمام جاده‌ها قانون **حرکت از منتهی‌الیه سمت راست** جاری است. شما باید تا حد امکان در باند سمت راست رانندگی کنید، نه وسط یا سمت چپ. باند سمت چپ در اتوبان‌ها و جاده‌های دوطرفه معمولاً فقط و فقط برای **سبقت گرفتن** است.</p>

            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۲. استثنای حرکت در داخل شهر</h5>
            <p style={{ fontSize: 13, margin: "0 0 12px 0" }}>در داخل شهرهای آلمان، اگر برای هر طرف حرکت چندین باند خط‌کشی‌شده وجود داشته باشد، خودروهای سواری (تا وزن $3.5$ تن) مجازند **هر باندی را که دوست دارند** انتخاب کنند. در این شرایط، سبقت گرفتن از سمت راست نیز مجاز است.</p>

            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۳. خطوط پیاده‌رو و دوچرخه (Gehwege & Radwege)</h5>
            <p style={{ fontSize: 13, margin: 0 }}>وسایل نقلیه موتوری به هیچ عنوان اجازه رانندگی، توقف یا پارک روی خطوط پیاده‌رو یا دوچرخه را ندارند، مِگر در مواردی که با تابلوهای خاص ترافیکی صراحتاً مجاز اعلام شده باشد.</p>
          </div>
        )}

        {/* ==================== فصل چهارم ==================== */}
        {selectedChapter === "4" && (
          <div>
            <h4 style={{ color: "#FF9500", marginTop: 0, fontSize: 15, borderBottom: "1px solid #1e3a5f", paddingBottom: 8 }}>Überholen und Vorfahrt (قوانین سبقت و حق تقدم)</h4>
            
            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۱. قوانین مطلق سبقت گرفتن (Überholen)</h5>
            <p style={{ fontSize: 13, margin: "0 0 12px 0" }}>سبقت همیشه باید از **سمت چپ** انجام شود. سبقت از سمت راست خارج از شهر مطلقاً ممنوع و بسیار خطرناک است. قبل از سبقت باید مطمئن شوید که دید کافی دارید، باند مقابل خالی است و سرعت شما به اندازه کافی از ماشین جلویی بیشتر است (حداقل ۲۰ کیلومتر بر ساعت تفاوت سرعت لازم است).</p>

            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۲. قانون طلایی راست به چپ (Rechts vor Links)</h5>
            <p style={{ fontSize: 13, margin: "0 0 12px 0" }}>در تقاطع‌ها و میدان‌هایی که هیچ تابلو، چراغ راهنما یا پلیسی وجود ندارد، قانون **«حق تقدم با وسیله‌ای است که از سمت راست می‌آید»** جاری است. این قانون در تمام مناطق مسکونی داخل شهر (Zone 30) به شدت اجرا می‌شود.</p>

            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۳. تشکیل باند اضطراری در ترافیک (Rettungsgasse)</h5>
            <p style={{ fontSize: 13, margin: 0 }}>به محض اینکه در اتوبان یا جاده‌های خارج از شهر ترافیک سنگین شد و ماشین‌ها به حالت توقف درآمدند، رانندگان موظفند **باند اضطراری (Rettungsgasse)** را برای خودروهای امدادی باز کنند. ماشین‌های باند سمت چپ باید به منتهی‌الیه سمت چپ و ماشین‌های باندهای دیگر به سمت راست بروند تا مسیر وسط کاملاً خالی بماند.</p>
          </div>
        )}

      </div>
    </div>
  );
}
