import { COLORS } from "../theme/colors";

const ITEMS = [
  {
    id: "stats",
    icon: "📊",
    title: "آمار و پیشرفت",
    desc: "نتایج آزمون‌ها، قبولی‌ها و Fehlerpunkte"
  },
  {
    id: "laws",
    icon: "📖",
    title: "قوانین رانندگی",
    desc: "کتابچه فارسی آیین‌نامه آلمان"
  },
  {
    id: "fahrschulen",
    icon: "🏫",
    title: "آموزشگاه‌ها",
    desc: "لیست آموزشگاه‌های رانندگی"
  },
  {
    id: "sehtest",
    icon: "👁",
    title: "معاینه چشم",
    desc: "مراکز Sehtest — در حال توسعه"
  },
  {
    id: "firstaid",
    icon: "⛑",
    title: "کمک‌های اولیه",
    desc: "Erste Hilfe Kurs — در حال توسعه"
  },
  {
    id: "signs",
    icon: "🚦",
    title: "تابلوهای رانندگی",
    desc: "آموزش تابلوها — در حال توسعه"
  }
];

export default function MorePage({ onSelect }) {
  return (
    <div>
      <div style={hero}>
        <div style={badge}>☰ منوی بیشتر</div>

        <h2 style={title}>امکانات برنامه</h2>

        <p style={subtitle}>
          دسترسی سریع به بخش‌های جانبی همراه گواهینامه.
        </p>
      </div>

      <div style={list}>
        {ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={card}
          >
            <div style={icon}>{item.icon}</div>

            <div style={{ flex: 1 }}>
              <div style={itemTitle}>{item.title}</div>
              <div style={itemDesc}>{item.desc}</div>
            </div>

            <div style={arrow}>‹</div>
          </button>
        ))}
      </div>
    </div>
  );
}

const hero = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 22,
  padding: 20,
  marginBottom: 16,
  boxShadow: "0 8px 24px rgba(22,138,58,0.08)"
};

const badge = {
  display: "inline-block",
  background: COLORS.cardSoft,
  border: `1px solid ${COLORS.borderSoft}`,
  color: COLORS.green,
  borderRadius: 18,
  padding: "5px 12px",
  fontSize: 12,
  fontWeight: 950,
  marginBottom: 12
};

const title = {
  margin: "0 0 8px",
  color: COLORS.text,
  fontSize: 24,
  fontWeight: 950
};

const subtitle = {
  color: COLORS.muted,
  lineHeight: 1.9,
  fontSize: 13,
  margin: 0
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: 10
};

const card = {
  width: "100%",
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 18,
  padding: 16,
  display: "flex",
  alignItems: "center",
  gap: 12,
  textAlign: "right",
  fontFamily: "inherit",
  cursor: "pointer"
};

const icon = {
  width: 42,
  height: 42,
  borderRadius: 14,
  background: COLORS.cardSoft,
  border: `1px solid ${COLORS.borderSoft}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 22,
  flexShrink: 0
};

const itemTitle = {
  color: COLORS.text,
  fontSize: 15,
  fontWeight: 950,
  marginBottom: 4
};

const itemDesc = {
  color: COLORS.muted,
  fontSize: 12,
  lineHeight: 1.7
};

const arrow = {
  color: COLORS.green,
  fontSize: 28,
  fontWeight: 950,
  transform: "rotate(180deg)"
};