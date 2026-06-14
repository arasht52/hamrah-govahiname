import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { COLORS } from "../theme/colors";

const BASE = "https://raw.githubusercontent.com/arasht52/hamrah-govahiname/main/public/signs/";

const CATEGORIES = [
  {
    id: "warning",
    icon: "⚠️",
    title: "تابلوهای هشدار",
    german: "Gefahrzeichen",
    color: "#F59E0B",
    signs: [
      { img: BASE + "warning_101.svg", name: "خطر عمومی", german: "Gefahrstelle (Z-101)", desc: "خطر نامشخصی در پیش رو. سرعت را کم کن و آماده واکنش باش." },
      { img: null, name: "پیچ خطرناک به راست", german: "Kurve (Z-103)", desc: "قبل از پیچ سرعت را کاهش بده." },
      { img: null, name: "عبور عابر پیاده", german: "Fußgänger (Z-133)", desc: "احتمال حضور عابر پیاده در مسیر. آماده توقف باش." },
      { img: null, name: "جاده ناهموار", german: "Unebene Fahrbahn (Z-112)", desc: "سطح جاده ناهموار است. سرعت را کاهش بده." },
      { img: null, name: "باریک شدن جاده", german: "Verengte Fahrbahn (Z-120)", desc: "جاده در پیش رو باریک می‌شود." },
      { img: null, name: "تقاطع راه‌آهن", german: "Bahnübergang (Z-151)", desc: "تقاطع با راه‌آهن. احتیاط ویژه لازم است." },
    ]
  },
  {
    id: "priority",
    icon: "🟡",
    title: "تابلوهای اولویت",
    german: "Vorfahrtzeichen",
    color: "#D97706",
    signs: [
      { img: BASE + "vorfahrt_306.svg", name: "جاده اصلی", german: "Vorfahrtstraße (Z-306)", desc: "شما روی جاده اصلی هستید و در تمام تقاطع‌ها حق تقدم دارید." },
      { img: BASE + "vorfahrt_gewahren_205.svg", name: "احتیاط — حق تقدم به دیگران", german: "Vorfahrt gewähren (Z-205)", desc: "باید اولویت را به جاده اصلی بدهی. توقف کامل لازم نیست مگر ترافیک باشد." },
      { img: BASE + "stop_206.svg", name: "STOP — توقف کامل", german: "Stoppschild (Z-206)", desc: "توقف کامل اجباری — حتی اگر کسی نباشد. صفر کیلومتر." },
      { img: null, name: "حق تقدم در تقاطع بعدی", german: "Vorfahrt (Z-301)", desc: "در تقاطع بعدی شما حق تقدم دارید." },
    ]
  },
  {
    id: "prohibition",
    icon: "⛔",
    title: "تابلوهای ممنوعیت",
    german: "Verbotszeichen",
    color: "#DC2626",
    signs: [
      { img: BASE + "no_entry_267.svg", name: "ورود ممنوع", german: "Verbot der Einfahrt (Z-267)", desc: "ورود به این مسیر ممنوع است." },
      { img: BASE + "no_overtake_276.svg", name: "سبقت ممنوع", german: "Überholverbot (Z-276)", desc: "سبقت گرفتن در این محدوده ممنوع است." },
      { img: BASE + "no_parking_286.svg", name: "پارک ممنوع", german: "Eingeschränktes Halteverbot (Z-286)", desc: "توقف کوتاه مجاز است اما پارک ممنوع." },
      { img: BASE + "speed_50_274.svg", name: "حداکثر سرعت ۵۰", german: "Zulässige Höchstgeschwindigkeit (Z-274)", desc: "حداکثر سرعت مجاز ۵۰ کیلومتر بر ساعت." },
      { img: null, name: "توقف ممنوع", german: "Absolutes Halteverbot (Z-283)", desc: "حتی توقف کوتاه هم مجاز نیست." },
      { img: null, name: "عبور ممنوع", german: "Verbot für Fahrzeuge (Z-250)", desc: "عبور تمام وسایل نقلیه ممنوع است." },
    ]
  },
  {
    id: "mandatory",
    icon: "🔵",
    title: "تابلوهای دستوری",
    german: "Gebotszeichen",
    color: "#2563EB",
    signs: [
      { img: BASE + "mandatory_up_209.svg", name: "مسیر اجباری مستقیم", german: "Vorgeschriebene Fahrtrichtung (Z-209)", desc: "فقط باید مستقیم حرکت کنی." },
      { img: BASE + "parking_314.svg", name: "پارکینگ", german: "Parkplatz (Z-314)", desc: "محل مجاز برای پارک خودرو." },
      { img: null, name: "مسیر دوچرخه", german: "Radweg (Z-237)", desc: "این مسیر مخصوص دوچرخه است." },
      { img: null, name: "حداقل سرعت", german: "Mindestgeschwindigkeit (Z-275)", desc: "نباید کمتر از سرعت مشخص‌شده حرکت کنی." },
      { img: null, name: "حق تقدم به مقابل", german: "Dem Gegenverkehr Vorrang (Z-208)", desc: "به وسایل مقابل حق تقدم بده." },
    ]
  },
  {
    id: "guide",
    icon: "🛣️",
    title: "تابلوهای راهنما",
    german: "Richtzeichen",
    color: "#168A3A",
    signs: [
      { img: null, name: "اتوبان", german: "Autobahn (Z-330)", desc: "شروع محدوده اتوبان. قوانین خاص اجرا می‌شود." },
      { img: null, name: "بن‌بست", german: "Sackgasse (Z-357)", desc: "مسیر خروجی ندارد." },
      { img: null, name: "پایان اتوبان", german: "Ende der Autobahn (Z-331)", desc: "پایان محدوده اتوبان." },
    ]
  },
];

export default function SignsPage({ onBack }) {
  const [active, setActive] = useState("warning");
  const category = CATEGORIES.find((c) => c.id === active);

  return (
    <div>
      <PageHeader title="تابلوهای رانندگی آلمان" onBack={onBack} />

      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 16 }}>
        {CATEGORIES.map((cat) => (
          <button key={cat.id} onClick={() => setActive(cat.id)}
            style={{ flexShrink: 0, background: active === cat.id ? COLORS.green : COLORS.white, color: active === cat.id ? COLORS.white : COLORS.green, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "7px 14px", fontFamily: "inherit", fontSize: 12, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>
            {cat.icon} {cat.title}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: 18, marginBottom: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: 18, border: `2px solid ${category.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, background: COLORS.cardSoft, flexShrink: 0 }}>
          {category.icon}
        </div>
        <div>
          <h2 style={{ margin: "0 0 4px", color: COLORS.text, fontSize: 20, fontWeight: 950 }}>{category.title}</h2>
          <div style={{ color: COLORS.green, fontSize: 13, fontWeight: 900 }}>{category.german}</div>
        </div>
      </div>

      {category.signs.map((sign) => (
        <div key={sign.german} style={{ display: "flex", gap: 14, alignItems: "center", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 18, padding: 16, marginBottom: 12 }}>
          {sign.img ? (
            <img src={sign.img} alt={sign.name}
              style={{ width: 68, height: 68, objectFit: "contain", flexShrink: 0 }}
              onError={(e) => { e.target.outerHTML = `<div style="width:68px;height:68px;border-radius:14px;background:#f0f4f0;display:flex;align-items:center;justify-content:center;font-size:30px;flex-shrink:0">${category.icon}</div>`; }}
            />
          ) : (
            <div style={{ width: 68, height: 68, borderRadius: 14, background: COLORS.cardSoft, border: `1px solid ${COLORS.borderSoft}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0 }}>
              {category.icon}
            </div>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ color: COLORS.text, fontSize: 15, fontWeight: 950, marginBottom: 4 }}>{sign.name}</div>
            <div style={{ color: COLORS.green, fontSize: 12, fontWeight: 900, marginBottom: 6 }}>{sign.german}</div>
            <p style={{ margin: 0, color: COLORS.muted, fontSize: 13, lineHeight: 1.8 }}>{sign.desc}</p>
          </div>
        </div>
      ))}

      <div style={{ background: COLORS.warningSoft, border: `1px solid ${COLORS.warningBorder}`, color: COLORS.warningText, borderRadius: 16, padding: 14, fontSize: 12, lineHeight: 1.8, marginTop: 8 }}>
  ⚠️ این بخش آموزشی است. بعضی تصاویر به‌صورت نمونه نمایش داده می‌شوند و قبل از انتشار عمومی باید با منابع رسمی StVO / TÜV / DEKRA راستی‌آزمایی شوند.
</div>
  );
}
