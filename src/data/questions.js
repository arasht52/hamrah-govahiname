export const QUESTIONS = [
  {
    id: 1,
    type: "text",
    topic: "Vorfahrt",
    difficulty: "hard",
    points: 5,
    needsVerification: true,
    image_url: null,
    video_url: null,
    q: "در تقاطع بدون تابلو، کدام اصل برقرار است؟",
    opts: [
      "چپ اولویت دارد",
      "راست اولویت دارد",
      "بزرگتر اولویت دارد",
      "اول‌رسیده اولویت دارد"
    ],
    ok: 1,
    exp: "قانون Rechts vor Links: در تقاطع بدون تابلو خودرویی که از سمت راست می‌آید حق عبور دارد.",
    culture: "این قانون برای بسیاری از فارسی‌زبانان تازه‌وارد ناآشناست.",
    tip: "Rechts یعنی راست. در تقاطع بدون تابلو، اول سمت راست را بررسی کن."
  },
  {
    id: 2,
    type: "text",
    topic: "Geschwindigkeit",
    difficulty: "easy",
    points: 3,
    needsVerification: true,
    image_url: null,
    video_url: null,
    q: "حداکثر سرعت مجاز در داخل شهر معمولاً چقدر است؟",
    opts: ["۳۰ کیلومتر", "۵۰ کیلومتر", "۶۰ کیلومتر", "۸۰ کیلومتر"],
    ok: 1,
    exp: "در مناطق شهری آلمان معمولاً سرعت مجاز ۵۰ کیلومتر بر ساعت است، مگر تابلو چیز دیگری نشان دهد.",
    culture: "کنترل سرعت در آلمان جدی است و تخلف می‌تواند جریمه داشته باشد.",
    tip: "Innerorts یعنی داخل شهر."
  }
];