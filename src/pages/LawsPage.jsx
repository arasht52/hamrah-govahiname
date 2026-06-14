export default function LawsPage({ onBack }) {
import { useState } from "react";
import { COLORS } from "../theme/colors";
import { bookData } from "./bookData";

export default function LawsPage() {
  const [selectedChapter, setSelectedChapter] = useState("1");

  const chapters = [
    { id: "1", title: "فصل ۱: انسان به عنوان راننده" },
    { id: "2", title: "فصل ۲: ایمنی، سرعت و ترمز" },
    { id: "3", title: "فصل ۳: مسیرها و باندها" },
    { id: "4", title: "فصل ۴: حق تقدم، سبقت و خطوط حرکت" },
    { id: "5", title: "فصل ۵: گردش و تغییر باند" },
    { id: "6", title: "فصل ۶: رفتارهای خاص و تقاطع‌ها" },
    { id: "7", title: "فصل ۷: توقف، پارک و چراغ‌ها" },
    { id: "8", title: "فصل ۸: اتوبان و جاده‌های سرعت" },
    { id: "9", title: "فصل ۹: شرایط خاص و تونل‌ها" },
    { id: "10", title: "فصل ۱۰: بار و مسافر" },
    { id: "11", title: "فصل ۱۱: فنی خودرو" },
    { id: "12", title: "فصل ۱۲: رانندگی اقتصادی و محیط زیست" }
  ];

  const currentChapter = chapters.find((c) => c.id === selectedChapter);
  const content = bookData[selectedChapter]?.content;

  return (
    <div>
      <div style={hero}>
        <div style={badge}>📖 قوانین رانندگی آلمان</div>

        <h2 style={title}>کتابچه آیین‌نامه</h2>

        <p style={subtitle}>
          خلاصه آموزشی و فارسی‌سازی‌شده از مباحث اصلی آیین‌نامه رانندگی آلمان
          برای آمادگی بهتر در آزمون تئوری.
        </p>
      </div>

      <div style={selectCard}>
        <label style={label}>انتخاب فصل</label>

        <select
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
          style={selectStyle}
        >
          {chapters.map((ch) => (
            <option key={ch.id} value={ch.id}>
              {ch.title}
            </option>
          ))}
        </select>
      </div>

      <div style={contentCard}>
        <div style={chapterHeader}>
          <h3 style={chapterTitle}>{currentChapter?.title}</h3>
          <span style={chapterBadge}>Kapitel {selectedChapter}</span>
        </div>

        {content ? (
          <div style={contentBody}>{content}</div>
        ) : (
          <div style={emptyBox}>
            <div style={{ fontSize: 38, marginBottom: 10 }}>🚧</div>
            <div style={{ fontWeight: 950, marginBottom: 6 }}>
              این فصل در حال تکمیل است
            </div>
            <p style={{ margin: 0, color: COLORS.muted, lineHeight: 1.8 }}>
              متن تخصصی و ترجمه روان این بخش به‌زودی اضافه می‌شود.
            </p>
          </div>
        )}
      </div>

      <div style={warningCard}>
        ⚠️ این بخش آموزشی است و جایگزین منابع رسمی TÜV، DEKRA، StVO یا آموزشگاه
        رانندگی نیست.
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

const selectCard = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 18,
  padding: 16,
  marginBottom: 16
};

const label = {
  display: "block",
  color: COLORS.green,
  fontSize: 12,
  fontWeight: 950,
  marginBottom: 8
};

const selectStyle = {
  width: "100%",
  background: COLORS.cardSoft,
  color: COLORS.text,
  border: `1px solid ${COLORS.borderSoft}`,
  borderRadius: 12,
  padding: "12px",
  fontSize: 13,
  fontFamily: "inherit",
  cursor: "pointer",
  outline: "none",
  direction: "rtl"
};

const contentCard = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 18,
  padding: 18,
  color: COLORS.text,
  marginBottom: 16
};

const chapterHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  borderBottom: `1px solid ${COLORS.borderSoft}`,
  paddingBottom: 12,
  marginBottom: 14
};

const chapterTitle = {
  margin: 0,
  color: COLORS.text,
  fontSize: 16,
  fontWeight: 950,
  lineHeight: 1.6
};

const chapterBadge = {
  background: COLORS.bgSoft,
  color: COLORS.green,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 10,
  padding: "5px 8px",
  fontSize: 11,
  fontWeight: 950,
  flexShrink: 0
};

const contentBody = {
  color: COLORS.textSoft,
  lineHeight: 2,
  fontSize: 13,
  textAlign: "right"
};

const emptyBox = {
  textAlign: "center",
  padding: 24,
  color: COLORS.textSoft
};

const warningCard = {
  background: COLORS.warningSoft,
  border: `1px solid ${COLORS.warningBorder}`,
  color: COLORS.warningText,
  borderRadius: 16,
  padding: 14,
  fontSize: 12,
  lineHeight: 1.8,
  marginBottom: 20
};