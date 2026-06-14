import { useState } from "react";

export default function LawsPage({ onBack }) {
  const [activeTab, setActiveTab] = useState("rules");

  const tabs = [
    { id: "rules", label: "🔄 فرآیند تبدیل (Umschreibung)" },
    { id: "docs", label: "📂 مدارک و معاینات" },
    { id: "schools", label: "🚗 آموزشگاه‌های فارسی‌زبان" },
    { id: "references", label: "📚 مراجع و کتابچه امتحان" }
  ];

  // دیتای آموزشگاه‌های رانندگی به تفکیک شهرهای بزرگ آلمان
  const drivingSchools = [
    { city: "برلین (Berlin)", schools: ["آموزشگاه رانندگی آریانا (Ariana) - دارای مربیان فارسی‌زبان برای تئوری و عملی", "آموزشگاه رانندگی یوروپ (Europe) - پشتیبانی از زبان‌های فارسی، دری و عربی"] },
    { city: "هامبورگ (Hamburg)", schools: ["آموزشگاه رانندگی البرز (Alborz) - مدیریت و مربیان ایرانی (با سابقه طولانی)", "آموزشگاه رانندگی ستاره (Star) - بخش ویژه هنرجویان فارسی‌زبان و خدمات تبدیل گواهینامه"] },
    { city: "فرانکفورت (Frankfurt)", schools: ["آموزشگاه رانندگی هما (Homa) - مربیان مجرب ایرانی برای آموزش‌های عملی", "آموزشگاه رانندگی ایده‌آل (Ideal) - پوشش کامل منطقه فرانکفورت و حومه به زبان فارسی"] },
    { city: "ایالت NRW (کلن / دوسلدورف)", schools: ["آموزشگاه رانندگی آرش (Arash) - بسیار محبوب در منطقه کلن با مدیریت فارسی‌زبان", "آموزشگاه رانندگی راین (Rhein) - ارائه مشاوره و آموزش عملی به زبان فارسی و دری"] },
    { city: "مونیخ (München)", schools: ["آموزشگاه رانندگی پرسپولیس (Persepolis) - پوشش کامل مناطق مونیخ برای متقاضیان ایرانی و افغانستانی"] }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 180px)", fontFamily: "inherit" }}>
      
      {/* هدر صفحه */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 850, margin: 0, color: "#FFF" }}>🚦 مرجع قوانین، مدارک و آموزشگاه‌ها</h3>
        <button onClick={onBack}
          style={{ background: "transparent", border: "1px solid #1e3a5f", borderRadius: 8, padding: "6px 14px", color: "#8B949E", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>
          برگشت
        </button>
      </div>

      {/* تب‌های ناوبری بالای صفحه */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 6 }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              whiteSpace: "nowrap",
              background: activeTab === tab.id ? "#FF9500" : "#1a2f52",
              color: activeTab === tab.id ? "#0A2540" : "#E6EDF3",
              border: "none",
              borderRadius: 10,
              padding: "10px 14px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* محتوای اصلی متنی تب‌ها */}
      <div style={{ flex: 1, background: "#112240", border: "1px solid #1e3a5f", borderRadius: 16, padding: 18, color: "#E6EDF3", overflowY: "auto", textAlign: "right", lineHeight: "1.8" }}>
        
        {/* ۱. تب قوانین و فرآیند تبدیل */}
        {activeTab === "rules" && (
          <div>
            <h4 style={{ color: "#FF9500", marginTop: 0, fontSize: 14 }}>شرایط تبدیل گواهینامه ایرانی به آلمانی (Umschreibung)</h4>
            <p style={{ fontSize: 13 }}>اگر در ایران گواهینامه معتبر دارید، نیازی به گذراندن دوره صفر تا صد رانندگی در آلمان نیست. شما می‌توانید پرونده خود را به عنوان <strong>Umschreibung</strong> به جریان بیندازید تا در هزینه‌ها (صرفه‌جویی بین ۱۰۰۰ تا ۱۵۰۰ یورو) و زمان جلو بیفتید.</p>
            
            <blockquote style={{ background: "#1a2f52", borderRight: "4px solid #FF9500", margin: "12px 0", padding: "10px 14px", borderRadius: 4, fontSize: 12 }}>
              <strong>قانون مهم ۶ ماهه:</strong> شما پس از ثبت اولین آدرس (Meldebescheinigung) در آلمان، فقط <strong>۶ ماه</strong> اجازه دارید با ترجمه رسمی گواهینامه ایرانی خود رانندگی کنید. پس از این مدت، رانندگی بدون گواهینامه آلمانی جرم محسوب می‌شود.
            </blockquote>

            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>مزایای کلیدی تبدیل گواهینامه:</h5>
            <ul style={{ paddingRight: 20, margin: 0, fontSize: 12, listStyleType: "square" }}>
              <li>نیازی به شرکت در کلاس‌های تئوری اجباری آموزشگاه ندارید.</li>
              <li>ساعت‌های رانندگی اجباری در اتوبان و شب (Sonderfahrten) حذف می‌شوند (مگر به تشخیص مربی برای آمادگی آزمون عملی).</li>
            </ul>
          </div>
        )}

        {/* ۲. تب مدارک و معاینات پزشکی */}
        {activeTab === "docs" && (
          <div>
            <h4 style={{ color: "#FF9500", marginTop: 0, fontSize: 14 }}>چک‌لیست مدارک و مراکز معاینات پزشکی</h4>
            <p style={{ fontSize: 13 }}>برای ارائه مدارک به اداره راهنمایی و رانندگی (Fahrerlaubnisbehörde)، مدارک زیر الزامی است:</p>
            
            <ul style={{ paddingRight: 20, fontSize: 12, lineHeight: "2" }}>
              <li><strong>اصل گواهینامه ایران:</strong> باید تاریخ اعتبار داشته باشد.</li>
              <li><strong>ترجمه رسمی با تاییدیه ADAC:</strong> باید توسط کلوپ اتومبیل‌رانی آلمان (ADAC) یا مترجمان رسمی دادگستری در آلمان تایید شود.</li>
              <li><strong>تست بینایی (Sehtest):</strong> می‌توانید به عینک‌فروشی‌های زنجیره‌ای معروف مثل <strong>Fielmann</strong> یا <strong>Apollo</strong> مراجعه کنید. هزینه بسیار کمی دارد و تا ۲ سال معتبر است.</li>
              <li><strong>دوره کمک‌های اولیه (Erste Hilfe):</strong> یک دوره ۱ روزه (۹ ساعته) است که مراکزی مثل <strong>Malteser</strong>، <strong>Johanniter</strong> یا مؤسسه <strong>شیلت (Schuelt)</strong> آن را برگزار می‌کنند. این گواهی تاریخ انقضا ندارد.</li>
              <li><strong>عکس بیومتریک و پاسپورت:</strong> به همراه برگه ثبت آدرس خانه.</li>
            </ul>
          </div>
        )}

        {/* ۳. تب آموزشگاه‌های رانندگی فارسی‌زبان */}
        {activeTab === "schools" && (
          <div>
            <h4 style={{ color: "#FF9500", marginTop: 0, fontSize: 14 }}>لیست آموزشگاه‌های دارای مربی فارسی‌زبان در آلمان</h4>
            <p style={{ fontSize: 12, marginBottom: 12 }}>برای یادگیری راحت‌تر نکات فنی و اصطلاحات عملی، می‌توانید به این مراکز در شهرهای بزرگ مراجعه کنید:</p>
            
            {drivingSchools.map((item, idx) => (
              <div key={idx} style={{ background: "#1a2f52", borderRadius: 8, padding: 10, marginBottom: 8, border: "1px solid #1e3a5f" }}>
                <strong style={{ color: "#FF9500", fontSize: 13 }}>📍 {item.city}</strong>
                <ul style={{ paddingRight: 16, margin: "6px 0 0 0", fontSize: 12, color: "#E6EDF3" }}>
                  {item.schools.map((school, sIdx) => <li key={sIdx}>{school}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* ۴. تب مراجع و کتابچه امتحان */}
        {activeTab === "references" && (
          <div>
            <h4 style={{ color: "#FF9500", marginTop: 0, fontSize: 14 }}>کتابچه آزمون و ساختار امتحانات رسمی آلمان</h4>
            <p style={{ fontSize: 13 }}>امتحانات گواهینامه در آلمان زیر نظر مستقیم سازمان‌های نظارتی **TÜV** یا **DEKRA** برگزار می‌شود.</p>
            
            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۱. آزمون تئوری (Theorieprüfung):</h5>
            <p style={{ fontSize: 12, margin: "0 0 8px 0" }}>آزمون شامل **۳۰ سوال** تئوری است. خوشبختانه در حالت تبدیل گواهینامه، شما می‌توانید **زبان فارسی** را برای آزمون رسمی تئوری انتخاب کنید. حد نصاب قبولی، داشتن حداکثر ۱۰ امتیاز منفی است (البته نباید دو سوال ۵ امتیازی را غلط بزنید).</p>
            
            <h5 style={{ color: "#FF9500", fontSize: 13, marginBottom: 4 }}>۲. آزمون عملی (Praktische Prüfung):</h5>
            <p style={{ fontSize: 12, margin: "0 0 12px 0" }}>زمان آزمون عملی معمولاً **۴۵ دقیقه** است که شامل کنترل اولیه ماشین، رانندگی در شهر، اتوبان (Autobahn)، پارک کردن و ترمز اضطراری می‌شود. ممتحن آلمانی در صندلی عقب می‌نشیند و عملکرد شما را ارزیابی می‌کند.</p>

            <div style={{ background: "#0A2540", border: "1px dashed #FF9500", borderRadius: 8, padding: 10, fontSize: 11, textAlign: "center", color: "#FF9500" }}>
              💡 نکته طلایی: این اپلیکیشن با شبیه‌سازی دقیق همین سوالات رسمی TÜV، شما را ۱۰۰٪ برای آزمون تئوری فارسی آماده می‌کند!
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
