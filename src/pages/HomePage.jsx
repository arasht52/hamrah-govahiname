import SectionTitle from "../components/SectionTitle";
import { COLORS } from "../theme/colors";
import {
  badge,
  card,
  heroCard,
  mutedText,
  page,
  pageTitle,
  primaryButton,
  secondaryButton,
  softCard
} from "../theme/components";

export default function HomePage({ onStartQuiz, onOpenAI }) {
  return (
    <div style={page}>
      <div style={heroCard}>
        <div style={badge}>🇩🇪 TÜV / DEKRA Demo</div>

        <h1 style={mainTitle}>
          همراه گواهینامه
          <br />
          <span style={{ color: COLORS.green }}>آزمون رانندگی آلمان</span>
        </h1>

        <p style={{ ...mutedText, marginBottom: 18 }}>
          شبیه‌ساز فارسی‌زبان آزمون تئوری آلمان با فضای نزدیک به آزمون آلمانی،
          قوانین، آموزشگاه‌ها و دستیار هوشمند آزمایشی.
        </p>

        <div style={statsGrid}>
          {[
            ["۳۰", "سؤال آزمون"],
            ["۵", "فصل آموزشی"],
            ["AI", "دستیار آینده"]
          ].map(([val, label]) => (
            <div key={label} style={miniStatCard}>
              <div style={statValue}>{val}</div>
              <div style={statLabel}>{label}</div>
            </div>
          ))}
        </div>

        <div style={buttonGrid}>
          <button onClick={onStartQuiz} style={primaryButton}>
            📝 شروع آزمون
          </button>

          <button onClick={onOpenAI} style={secondaryButton}>
            🤖 FahrKI Demo
          </button>
        </div>
      </div>

      <SectionTitle>🎯 امکانات نسخه فعلی</SectionTitle>

      <div style={featureCard}>
        {[
          "شبیه‌ساز آزمون تئوری آلمان با ظاهر روشن و نزدیک به اپ‌های آلمانی",
          "پشتیبانی از سوالات چندگزینه‌ای با Fehlerpunkte",
          "نمایش قوانین رانندگی آلمان به زبان فارسی",
          "لیست نمایشی آموزشگاه‌های رانندگی",
          "دستیار آموزشی Demo Mode برای سوالات رایج"
        ].map((text, index) => (
          <div key={index} style={listItem}>
            ✅ {text}
          </div>
        ))}
      </div>

      <SectionTitle>⚠️ هشدار مهم</SectionTitle>

      <div style={warningCard}>
        این نسخه هنوز محصول نهایی نیست. اطلاعات قانونی، جریمه‌ها، آموزشگاه‌ها و
        جزئیات آزمون باید قبل از انتشار عمومی با منابع رسمی TÜV، DEKRA، StVO یا
        Fahrschule راستی‌آزمایی شوند.
      </div>

      <SectionTitle>🚀 امکانات آینده</SectionTitle>

      <div style={futureGrid}>
        {[
          "🏫 آموزشگاه‌های رانندگی",
          "👁 مراکز معاینه چشم",
          "⛑ دوره کمک‌های اولیه",
          "🚦 تابلوهای رانندگی",
          "🗺 مراکز TÜV و DEKRA",
          "📷 تحلیل تصاویر سوالات",
          "🎥 تحلیل ویدئوها",
          "💬 انجمن فارسی‌زبانان",
          "📊 پروفایل و پیشرفت",
          "⭐ نسخه Pro هوش مصنوعی"
        ].map((item) => (
          <div key={item} style={futureCard}>
            <div style={{ fontWeight: 900 }}>{item}</div>
            <div style={comingSoon}>در حال توسعه</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mainTitle = {
  ...pageTitle,
  fontSize: 28,
  lineHeight: 1.35
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: 8,
  marginBottom: 16
};

const miniStatCard = {
  ...softCard,
  padding: "12px 6px",
  textAlign: "center",
  borderRadius: 14
};

const statValue = {
  fontSize: 22,
  fontWeight: 950,
  color: COLORS.green
};

const statLabel = {
  fontSize: 10,
  color: COLORS.muted,
  marginTop: 3,
  fontWeight: 800
};

const buttonGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10
};

const featureCard = {
  ...card,
  overflow: "hidden"
};

const listItem = {
  padding: "14px 16px",
  borderBottom: `1px solid ${COLORS.borderSoft}`,
  fontSize: 13,
  color: COLORS.textSoft,
  lineHeight: 1.8
};

const warningCard = {
  background: COLORS.warningSoft,
  border: `1px solid ${COLORS.warningBorder}`,
  borderRadius: 16,
  padding: 16,
  fontSize: 12,
  color: COLORS.warningText,
  lineHeight: 1.9
};

const futureGrid = {
  display: "grid",
  gap: 12,
  marginBottom: 30
};

const futureCard = {
  ...card,
  color: COLORS.text,
  boxShadow: "0 4px 14px rgba(0,0,0,0.035)"
};

const comingSoon = {
  color: COLORS.green,
  fontSize: 12,
  marginTop: 6,
  fontWeight: 900
};