import SectionTitle from "../components/SectionTitle";

export default function HomePage({ onStartQuiz, onOpenAI }) {
  return (
    <div>
      <div
        style={{
          background: "linear-gradient(135deg,#1a2f52,#0A2540)",
          border: "1px solid #1e3a5f",
          borderRadius: 20,
          padding: 20,
          marginBottom: 20,
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 5,
            fontSize: 90,
            opacity: 0.05
          }}
        >
          🇩🇪
        </div>

        <h2
          style={{
            fontSize: 22,
            fontWeight: 900,
            marginBottom: 6,
            lineHeight: 1.4
          }}
        >
          گواهینامه آلمان
          <br />
          <span style={{ color: "#FFB340" }}>بدون سردرگمی</span>
        </h2>

        <p
          style={{
            fontSize: 13,
            color: "#8B949E",
            marginBottom: 18,
            lineHeight: 1.8
          }}
        >
          نمونه آموزشی برای فارسی‌زبانان آلمان با سوالات تمرینی، توضیح فارسی و
          تحلیل نتیجه.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 12
          }}
        >
          <button
            onClick={onStartQuiz}
            style={{
              background: "#FF9500",
              border: "none",
              borderRadius: 12,
              padding: "14px 8px",
              fontSize: 14,
              fontWeight: 800,
              color: "#0A2540",
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            📝 شروع تمرین
          </button>

          <button
            onClick={onOpenAI}
            style={{
              background: "#112240",
              border: "1px solid #1e3a5f",
              borderRadius: 12,
              padding: "14px 8px",
              fontSize: 14,
              fontWeight: 800,
              color: "#E6EDF3",
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            🤖 دستیار آموزشی
          </button>
        </div>
      </div>

      <SectionTitle>💡 نکات مهم</SectionTitle>

      <div
        style={{
          background: "#1a2f52",
          border: "1px solid #1e3a5f",
          borderRadius: 16,
          overflow: "hidden"
        }}
      >
        {[
          "این نسخه فعلاً MVP نمایشی است.",
          "اطلاعات قانونی باید قبل از استفاده واقعی راستی‌آزمایی شوند.",
          "هدف اصلی، تست تجربه کاربر و ساختار محصول است.",
          "بانک سوالات در مراحل بعدی کامل‌تر می‌شود."
        ].map((text, index) => (
          <div
            key={index}
            style={{
              padding: "14px 16px",
              borderBottom: index < 3 ? "1px solid #1e3a5f" : "none",
              fontSize: 13,
              color: "#8B949E",
              lineHeight: 1.8
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}