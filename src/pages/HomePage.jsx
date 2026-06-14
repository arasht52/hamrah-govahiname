import SectionTitle from "../components/SectionTitle";

export default function HomePage({ onStartQuiz, onOpenAI }) {
  return (
    <div>
      <div style={hero}>
        <div style={heroBadge}>🇩🇪 TÜV / DEKRA Demo</div>

        <h1 style={title}>
          همراه گواهینامه
          <br />
          <span style={{ color: "#168A3A" }}>آزمون رانندگی آلمان</span>
        </h1>

        <p style={subtitle}>
          شبیه‌ساز فارسی‌زبان آزمون تئوری آلمان با فضای نزدیک به آزمون آلمانی،
          قوانین، آموزشگاه‌ها و دستیار هوشمند آزمایشی.
        </p>

        <div style={statsGrid}>
          {[
            ["۳۰", "سؤال آزمون"],
            ["۵", "فصل آموزشی"],
            ["AI", "دستیار آینده"]
          ].map(([val, label]) => (
            <div key={label} style={statCard}>
              <div style={statValue}>{val}</div>
              <div style={statLabel}>{label}</div>
            </div>
          ))}
        </div>

        <div style={buttonGrid}>
          <button onClick={onStartQuiz} style={primaryBtn}>
            📝 شروع آزمون
          </button>

          <button onClick={onOpenAI} style={secondaryBtn}>
            🤖 FahrKI Demo
          </button>
        </div>
      </div>

      <SectionTitle>🎯 امکانات نسخه فعلی</SectionTitle>

      <div style={card}>
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

const hero = {
  background: "#ffffff",
  border: "1px solid #BBD7C0",
  borderRadius: 22,
  padding: 22,
  marginBottom: 18,
  boxShadow: "0 8px 24px rgba(22,138,58,0.08)"
};

const heroBadge = {
  display: "inline-block",
  background: "#E8F6E8",
  border: "1px solid #BBD7C0",
  color: "#168A3A",
  borderRadius: 20,
  padding: "6px 12px",
  fontSize: 12,
  fontWeight: 900,
  marginBottom: 14
};

const title = {
  fontSize: 28,
  fontWeight: 950,
  margin: "0 0 10px",
  lineHeight: 1.35,
  color: "#111827"
};

const subtitle = {
  fontSize: 14,
  color: "#64736A",
  marginBottom: 18,
  lineHeight: 1.9
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: 8,
  marginBottom: 16
};

const statCard = {
  background: "#F4FBF4",
  border: "1px solid #D7EADB",
  borderRadius: 14,
  padding: "12px 6px",
  textAlign: "center"
};

const statValue = {
  fontSize: 22,
  fontWeight: 950,
  color: "#168A3A"
};

const statLabel = {
  fontSize: 10,
  color: "#64736A",
  marginTop: 3,
  fontWeight: 800
};

const buttonGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10
};

const primaryBtn = {
  background: "#168A3A",
  border: "none",
  borderRadius: 14,
  padding: "14px 8px",
  fontSize: 14,
  fontWeight: 900,
  color: "#ffffff",
  cursor: "pointer",
  fontFamily: "inherit"
};

const secondaryBtn = {
  background: "#ffffff",
  border: "2px solid #168A3A",
  borderRadius: 14,
  padding: "14px 8px",
  fontSize: 14,
  fontWeight: 900,
  color: "#168A3A",
  cursor: "pointer",
  fontFamily: "inherit"
};

const card = {
  background: "#ffffff",
  border: "1px solid #BBD7C0",
  borderRadius: 18,
  overflow: "hidden",
  marginBottom: 20,
  boxShadow: "0 4px 16px rgba(0,0,0,0.04)"
};

const listItem = {
  padding: "14px 16px",
  borderBottom: "1px solid #E5F2E7",
  fontSize: 13,
  color: "#374151",
  lineHeight: 1.8
};

const warningCard = {
  background: "#FFF7ED",
  border: "1px solid #FDBA74",
  borderRadius: 16,
  padding: 16,
  fontSize: 12,
  color: "#9A3412",
  lineHeight: 1.9,
  marginBottom: 20
};

const futureGrid = {
  display: "grid",
  gap: 12,
  marginBottom: 30
};

const futureCard = {
  background: "#ffffff",
  border: "1px solid #BBD7C0",
  borderRadius: 16,
  padding: 16,
  color: "#111827",
  boxShadow: "0 4px 14px rgba(0,0,0,0.035)"
};

const comingSoon = {
  color: "#168A3A",
  fontSize: 12,
  marginTop: 6,
  fontWeight: 900
};