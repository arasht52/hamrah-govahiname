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
        icon: "⚠️",
        name: "خطر عمومی",
        german: "Gefahrstelle",
        desc: "باید سرعت را کم کنی و آماده واکنش باشی."
      },
      {
        icon: "↩️",
        name: "پیچ خطرناک",
        german: "Kurve",
        desc: "قبل از پیچ سرعت را کاهش بده."
      },
      {
        icon: "🚶",
        name: "عبور عابر پیاده",
        german: "Fußgänger",
        desc: "احتمال حضور عابر در مسیر وجود دارد."
      }
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
        icon: "⛔",
        name: "ورود ممنوع",
        german: "Verbot der Einfahrt",
        desc: "نباید وارد این مسیر شوی."
      },
      {
        icon: "🚫",
        name: "سبقت ممنوع",
        german: "Überholverbot",
        desc: "سبقت گرفتن در این محدوده ممنوع است."
      },
      {
        icon: "🅿️",
        name: "توقف ممنوع",
        german: "Halteverbot",
        desc: "حتی توقف کوتاه هم مجاز نیست."
      }
    ]
  },
  {
    id: "mandatory",
    icon: "🔵",
    title: "تابلوهای دستوری",
    german: "Vorschriftzeichen",
    color: "#2563EB",
    signs: [
      {
        icon: "⬆️",
        name: "مسیر اجباری مستقیم",
        german: "Vorgeschriebene Fahrtrichtung",
        desc: "فقط باید در جهت مشخص‌شده حرکت کنی."
      },
      {
        icon: "🚲",
        name: "مسیر دوچرخه",
        german: "Radweg",
        desc: "این مسیر مخصوص دوچرخه است."
      },
      {
        icon: "🔢",
        name: "حداقل سرعت",
        german: "Mindestgeschwindigkeit",
        desc: "نباید کمتر از سرعت مشخص‌شده حرکت کنی."
      }
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
        icon: "🅿️",
        name: "پارکینگ",
        german: "Parkplatz",
        desc: "محل مجاز برای پارک خودرو."
      },
      {
        icon: "🛣️",
        name: "بزرگراه",
        german: "Autobahn",
        desc: "شروع محدوده بزرگراه."
      },
      {
        icon: "🚧",
        name: "بن‌بست",
        german: "Sackgasse",
        desc: "مسیر خروجی ندارد."
      }
    ]
  }
];

export default function SignsPage({ onBack }) {
  const [active, setActive] = useState("warning");
  const category = CATEGORIES.find((c) => c.id === active);

  return (
    <div>
      <PageHeader title="تابلوهای رانندگی" onBack={onBack} />

      <div style={tabs}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            style={{
              ...tab,
              background: active === cat.id ? COLORS.green : COLORS.white,
              color: active === cat.id ? COLORS.white : COLORS.green
            }}
          >
            {cat.icon} {cat.title}
          </button>
        ))}
      </div>

      <div style={hero}>
        <div style={{ ...bigIcon, borderColor: category.color }}>
          {category.icon}
        </div>

        <div>
          <h2 style={title}>{category.title}</h2>
          <div style={german}>{category.german}</div>
        </div>
      </div>

      {category.signs.map((sign) => (
        <div key={sign.german} style={card}>
          <div style={smallIcon}>{sign.icon}</div>

          <div>
            <div style={signName}>{sign.name}</div>
            <div style={signGerman}>{sign.german}</div>
            <p style={desc}>{sign.desc}</p>
          </div>
        </div>
      ))}

      <div style={note}>
        فعلاً این بخش آموزشی و نمونه‌ای است. تصاویر واقعی و استاندارد تابلوها در
        مرحله بعد اضافه می‌شود.
      </div>
    </div>
  );
}

const tabs = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 8,
  marginBottom: 16
};

const tab = {
  border: `1px solid ${COLORS.border}`,
  borderRadius: 14,
  padding: "11px 8px",
  fontFamily: "inherit",
  fontSize: 12,
  fontWeight: 900,
  cursor: "pointer"
};

const hero = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 20,
  padding: 18,
  marginBottom: 14
};

const bigIcon = {
  width: 56,
  height: 56,
  borderRadius: 18,
  border: "2px solid",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 30,
  background: COLORS.cardSoft
};

const title = {
  margin: "0 0 4px",
  color: COLORS.text,
  fontSize: 20,
  fontWeight: 950
};

const german = {
  color: COLORS.green,
  fontSize: 13,
  fontWeight: 900
};

const card = {
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 18,
  padding: 16,
  marginBottom: 12
};

const smallIcon = {
  width: 44,
  height: 44,
  borderRadius: 14,
  background: COLORS.cardSoft,
  border: `1px solid ${COLORS.borderSoft}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24,
  flexShrink: 0
};

const signName = {
  color: COLORS.text,
  fontSize: 16,
  fontWeight: 950,
  marginBottom: 4
};

const signGerman = {
  color: COLORS.green,
  fontSize: 12,
  fontWeight: 900,
  marginBottom: 8
};

const desc = {
  margin: 0,
  color: COLORS.muted,
  fontSize: 13,
  lineHeight: 1.8
};

const note = {
  background: COLORS.warningSoft,
  border: `1px solid ${COLORS.warningBorder}`,
  color: COLORS.warningText,
  borderRadius: 16,
  padding: 14,
  fontSize: 12,
  lineHeight: 1.8,
  marginTop: 16
};