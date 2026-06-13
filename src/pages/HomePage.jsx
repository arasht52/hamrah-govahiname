import SectionTitle from "../components/SectionTitle";

export default function HomePage({ onStartQuiz, onOpenAI }) {
  return (
    <div className="fadeUp">
      <div
        style={{
          background: "linear-gradient(135deg,#1a2f52,#0A2540)",
          border: "1px solid #1e3a5f",
          borderRadius: 20,
          padding: 20,
          marginBottom: 16,
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ position: "absolute", left: 10, top: 5, fontSize: 90, opacity: 0.05 }}>
          🇩🇪
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8, lineHeight: 1.4 }}>
          همراه گواهینامه
          <br />
          <span style={{ color: "#FFB340" }}>آمادگی آزمون آلمان</span>
        </h2>

        <p style={{ fontSize: 13, color: "#8B949E", marginBottom: 18, lineHeight: 1.9 }}>
          تمرین سوالات گواهینامه آلمان با توضیح فارسی، نکات مخصوص فارسی‌زبانان،
          تحلیل نتیجه و دستیار آموزشی آزمایشی.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
          {[
            ["۳۰", "سوال نمونه"],
            ["۵", "فصل آموزشی"],
            ["MVP", "نسخه آزمایشی"]
          ].map(([val, label]) => (
            <div key={label} style={{ background: "rgba(0,0,0,0.3)", borderRadius: 12, padding: "10px 6px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#FFB340" }}>{val}</div>
              <div style={{ fontSize: 10, color: "#8B949E", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <button onClick={onStartQuiz} style={primaryBtn}>
            📝 شروع تمرین
          </button>

          <button onClick={onOpenAI} style={secondaryBtn}>
            🤖 دستیار آموزشی
          </button>
        </div>
      </div>

      <SectionTitle>🎯 امکانات نسخه فعلی</SectionTitle>

      <div style={card}>
        {[
          "تمرین سوالات نمونه آزمون گواهینامه آلمان",
          "نمایش پاسخ درست و توضیح فارسی بعد از هر سوال",
          "تحلیل نتیجه آزمون و مرور سوالات غلط",
          "دستیار آموزشی Demo Mode برای سوالات رایج",
          "ساختار آماده برای اضافه کردن سوالات تصویری، ویدئویی و بانک سوالات کامل"
        ].map((text, index) => (
          <div key={index} style={{ padding: "14px 16px", borderBottom: index < 4 ? "1px solid #1e3a5f" : "none", fontSize: 13, color: "#8B949E", lineHeight: 1.8 }}>
            ✅ {text}
          </div>
        ))}
      </div>

      <SectionTitle>⚠️ هشدار مهم</SectionTitle>

      <div style={{ ...card, padding: 16, fontSize: 12, color: "#FCA5A5", lineHeight: 1.8 }}>
        این نسخه هنوز محصول نهایی نیست. اطلاعات قانونی، جریمه‌ها و جزئیات آزمون باید قبل از انتشار عمومی با منابع رسمی TÜV، DEKRA، StVO یا Fahrschule بررسی شوند.
      </div>
    </div>
  );
}

const primaryBtn = {
  background: "#FF9500",
  border: "none",
  borderRadius: 12,
  padding: "14px 8px",
  fontSize: 14,
  fontWeight: 800,
  color: "#0A2540",
  cursor: "pointer",
  fontFamily: "inherit"
};

const secondaryBtn = {
  background: "#112240",
  border: "1px solid #1e3a5f",
  borderRadius: 12,
  padding: "14px 8px",
  fontSize: 14,
  fontWeight: 800,
  color: "#E6EDF3",
  cursor: "pointer",
  fontFamily: "inherit"
};

const card = {
  background: "#1a2f52",
  border: "1px solid #1e3a5f",
  borderRadius: 16,
  overflow: "hidden",
  marginBottom: 20
};