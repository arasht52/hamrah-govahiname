import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { COLORS } from "../theme/colors";

const CATEGORIES = [
  {
    id: "warning",
    icon: "⚠️",
    title: "تابلوهای هشدار",
    german: "Gefahrzeichen",
    color: "#F59E0B",
    signs: [
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Zeichen_101.svg/120px-Zeichen_101.svg.png",
        name: "خطر عمومی",
        german: "Gefahrstelle (Z-101)",
        desc: "خطر نامشخصی در پیش رو وجود دارد. سرعت را کم کن و آماده واکنش باش."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Zeichen_103-10.svg/120px-Zeichen_103-10.svg.png",
        name: "پیچ خطرناک به راست",
        german: "Kurve (Z-103)",
        desc: "قبل از پیچ سرعت را کاهش بده. سرعت بالا در پیچ خطرناک است."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Zeichen_133-10.svg/120px-Zeichen_133-10.svg.png",
        name: "عبور عابر پیاده",
        german: "Fußgänger (Z-133)",
        desc: "احتمال حضور عابر پیاده در مسیر. آماده توقف باش."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Zeichen_112.svg/120px-Zeichen_112.svg.png",
        name: "جاده ناهموار",
        german: "Unebene Fahrbahn (Z-112)",
        desc: "سطح جاده ناهموار است. سرعت را کاهش بده."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Zeichen_120.svg/120px-Zeichen_120.svg.png",
        name: "باریک شدن جاده",
        german: "Verengte Fahrbahn (Z-120)",
        desc: "جاده در پیش رو باریک میشود."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Zeichen_151.svg/120px-Zeichen_151.svg.png",
        name: "تقاطع راه‌آهن",
        german: "Bahnübergang (Z-151)",
        desc: "تقاطع با راه‌آهن. احتیاط ویژه لازم است."
      },
    ]
  },
  {
    id: "prohibition",
    icon: "⛔",
    title: "تابلوهای ممنوعیت",
    german: "Verbotszeichen",
    color: "#DC2626",
    signs: [
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Zeichen_267.svg/120px-Zeichen_267.svg.png",
        name: "ورود ممنوع",
        german: "Verbot der Einfahrt (Z-267)",
        desc: "ورود به این مسیر ممنوع است — حتی برای پیچیدن."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Zeichen_276.svg/120px-Zeichen_276.svg.png",
        name: "سبقت ممنوع",
        german: "Überholverbot (Z-276)",
        desc: "سبقت گرفتن در این محدوده ممنوع است."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/８/Zeichen_283.svg/120px-Zeichen_283.svg.png",
        name: "توقف ممنوع",
        german: "Absolutes Halteverbot (Z-283)",
        desc: "حتی توقف کوتاه هم مجاز نیست."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Zeichen_286.svg/120px-Zeichen_286.svg.png",
        name: "پارک ممنوع",
        german: "Eingeschränktes Halteverbot (Z-286)",
        desc: "توقف کوتاه مجاز است اما پارک ممنوع."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Zeichen_274-50.svg/120px-Zeichen_274-50.svg.png",
        name: "حداکثر سرعت ۵۰",
        german: "Zulässige Höchstgeschwindigkeit (Z-274)",
        desc: "حداکثر سرعت مجاز ۵۰ کیلومتر بر ساعت."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Zeichen_250.svg/120px-Zeichen_250.svg.png",
        name: "عبور ممنوع",
        german: "Verbot für Fahrzeuge (Z-250)",
        desc: "عبور تمام وسایل نقلیه ممنوع است."
      },
    ]
  },
  {
    id: "mandatory",
    icon: "🔵",
    title: "تابلوهای دستوری",
    german: "Gebotszeichen",
    color: "#2563EB",
    signs: [
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Zeichen_209-10.svg/120px-Zeichen_209-10.svg.png",
        name: "مسیر اجباری راست",
        german: "Vorgeschriebene Fahrtrichtung (Z-209)",
        desc: "فقط باید به سمت راست حرکت کنی."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Zeichen_237.svg/120px-Zeichen_237.svg.png",
        name: "مسیر دوچرخه",
        german: "Radweg (Z-237)",
        desc: "این مسیر مخصوص دوچرخه است. خودروها نباید وارد شوند."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Zeichen_275.svg/120px-Zeichen_275.svg.png",
        name: "حداقل سرعت",
        german: "Mindestgeschwindigkeit (Z-275)",
        desc: "نباید کمتر از سرعت مشخص‌شده حرکت کنی."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Zeichen_208.svg/120px-Zeichen_208.svg.png",
        name: "حق تقدم به مقابل",
        german: "Dem Gegenverkehr Vorrang (Z-208)",
        desc: "به وسایل مقابل حق تقدم بده."
      },
    ]
  },
  {
    id: "priority",
    icon: "🟡",
    title: "تابلوهای اولویت",
    german: "Vorfahrtzeichen",
    color: "#D97706",
    signs: [
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Zeichen_301.svg/120px-Zeichen_301.svg.png",
        name: "حق تقدم در تقاطع بعدی",
        german: "Vorfahrt (Z-301)",
        desc: "در تقاطع بعدی شما حق تقدم دارید."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/thirty/Zeichen_306.svg/120px-Zeichen_306.svg.png",
        name: "جاده اصلی",
        german: "Vorfahrtstraße (Z-306)",
        desc: "شما روی جاده اصلی هستید و حق تقدم دارید."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Zeichen_205.svg/120px-Zeichen_205.svg.png",
        name: "احتیاط — حق تقدم به دیگران",
        german: "Vorfahrt gewähren (Z-205)",
        desc: "باید اولویت را به جاده اصلی بدهی. توقف کامل لازم نیست."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/forty/Zeichen_206.svg/120px-Zeichen_206.svg.png",
        name: "STOP — توقف کامل",
        german: "Stoppschild (Z-206)",
        desc: "توقف کامل اجباری — حتی اگر کسی نباشد."
      },
    ]
  },
  {
    id: "guide",
    icon: "🛣️",
    title: "تابلوهای راهنما",
    german: "Richtzeichen",
    color: "#168A3A",
    signs: [
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Zeichen_314.svg/120px-Zeichen_314.svg.png",
        name: "پارکینگ",
        german: "Parkplatz (Z-314)",
        desc: "محل مجاز برای پارک خودرو."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Zeichen_330.1.svg/120px-Zeichen_330.1.svg.png",
        name: "اتوبان",
        german: "Autobahn (Z-330)",
        desc: "شروع محدوده اتوبان. قوانین خاص اتوبان اجرا می‌شود."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Zeichen_357.svg/120px-Zeichen_357.svg.png",
        name: "بن‌بست",
        german: "Sackgasse (Z-357)",
        desc: "مسیر خروجی ندارد."
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Zeichen_331.1.svg/120px-Zeichen_331.1.svg.png",
        name: "خارج اتوبان",
        german: "Ende der Autobahn (Z-331)",
        desc: "پایان محدوده اتوبان. قوانین جاده عادی اعمال می‌شود."
      },
    ]
  },
];

export default function SignsPage({ onBack }) {
  const [active, setActive] = useState("warning");
  const category = CATEGORIES.find((c) => c.id === active);

  return (
    <div>
      <PageHeader title="تابلوهای رانندگی آلمان" onBack={onBack} />

      {/* تب‌ها */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 16 }}>
        {CATEGORIES.map((cat) => (
          <button key={cat.id} onClick={() => setActive(cat.id)}
            style={{ flexShrink: 0, background: active === cat.id ? COLORS.green : COLORS.white, color: active === cat.id ? COLORS.white : COLORS.green, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "7px 14px", fontFamily: "inherit", fontSize: 12, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>
            {cat.icon} {cat.title}
          </button>
        ))}
      </div>

      {/* هدر دسته */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: 18, marginBottom: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: 18, border: `2px solid ${category.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, background: COLORS.cardSoft, flexShrink: 0 }}>
          {category.icon}
        </div>
        <div>
          <h2 style={{ margin: "0 0 4px", color: COLORS.text, fontSize: 20, fontWeight: 950 }}>{category.title}</h2>
          <div style={{ color: COLORS.green, fontSize: 13, fontWeight: 900 }}>{category.german}</div>
        </div>
      </div>

      {/* کارت‌های تابلو */}
      {category.signs.map((sign) => (
        <div key={sign.german} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 18, padding: 16, marginBottom: 12 }}>
          <img src={sign.img} alt={sign.name}
            style={{ width: 64, height: 64, objectFit: "contain", flexShrink: 0, borderRadius: 10, background: "#f8f9fa", padding: 4 }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ color: COLORS.text, fontSize: 16, fontWeight: 950, marginBottom: 4 }}>{sign.name}</div>
            <div style={{ color: COLORS.green, fontSize: 12, fontWeight: 900, marginBottom: 8 }}>{sign.german}</div>
            <p style={{ margin: 0, color: COLORS.muted, fontSize: 13, lineHeight: 1.8 }}>{sign.desc}</p>
          </div>
        </div>
      ))}

      <div style={{ background: COLORS.warningSoft, border: `1px solid ${COLORS.warningBorder}`, color: COLORS.warningText, borderRadius: 16, padding: 14, fontSize: 12, lineHeight: 1.8, marginTop: 8 }}>
        ⚠️ تصاویر از Wikimedia Commons — منبع رسمی و قانونی تابلوهای استاندارد آلمان (StVO).
      </div>
    </div>
  );
}
