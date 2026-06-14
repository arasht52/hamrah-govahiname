import { COLORS } from "../theme/colors";

const ITEMS = [
  {
    id: "stats",
    icon: "📊",
    title: "آمار",
    subtitle: "نتایج و پیشرفت شما"
  },
  {
    id: "laws",
    icon: "📖",
    title: "قوانین",
    subtitle: "کتابچه آیین‌نامه"
  },
  {
    id: "fahrschulen",
    icon: "🏫",
    title: "آموزشگاه‌ها",
    subtitle: "لیست آموزشگاه‌های رانندگی"
  },
  
  {
    id: "settings",
    icon: "⚙️",
    title: "تنظیمات",
    subtitle: "نسخه برنامه و پاک کردن آمار"
  }
];

export default function MorePage({ onSelect }) {
  return (
    <div>
      <div style={hero}>
        <div style={badge}>Mehr</div>

        <h2 style={title}>بیشتر</h2>

        <p style={subtitle}>
          ابزارهای کمکی برای تمرین، مرور و مدیریت برنامه.
        </p>
      </div>

      <div style={list}>
        {ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={card}
          >
            <div style={iconBox}>{item.icon}</div>

            <div style={textBox}>
              <div style={itemTitle}>{item.title}</div>
              <div style={itemSubtitle}>{item.subtitle}</div>
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
  gap: 12
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
  cursor: "pointer",
  fontFamily: "inherit",
  textAlign: "right"
};

const iconBox = {
  width: 46,
  height: 46,
  borderRadius: 16,
  background: COLORS.cardSoft,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24,
  flexShrink: 0
};

const textBox = {
  flex: 1
};

const itemTitle = {
  color: COLORS.text,
  fontSize: 15,
  fontWeight: 950,
  marginBottom: 4
};

const itemSubtitle = {
  color: COLORS.muted,
  fontSize: 12,
  lineHeight: 1.7
};

const arrow = {
  color: COLORS.green,
  fontSize: 28,
  fontWeight: 900
};