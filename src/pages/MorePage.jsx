import { COLORS } from "../theme/colors";
import {
  badge,
  heroCard,
  mutedText,
  page,
  pageTitle
} from "../theme/components";

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
    id: "signs",
    icon: "🚦",
    title: "تابلوها",
    subtitle: "دسته‌بندی تابلوهای رانندگی"
  },
  {
  id: "wrongQuestions",
  icon: "❌",
  title: "سؤال‌های غلط",
  subtitle: "مرور اشتباهات قبلی"
},
{
  id: "searchQuestions",
  icon: "🔍",
  title: "جستجوی سؤال‌ها",
  subtitle: "پیدا کردن سؤال با کلمه کلیدی"
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
    <div style={page}>
      <div style={heroCard}>
        <div style={badge}>Mehr</div>

        <h2 style={pageTitle}>بیشتر</h2>

        <p style={mutedText}>
          ابزارهای کمکی برای تمرین، مرور و مدیریت برنامه.
        </p>
      </div>

      <div style={list}>
        {ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={menuCard}
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

const list = {
  display: "flex",
  flexDirection: "column",
  gap: 12
};

const menuCard = {
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