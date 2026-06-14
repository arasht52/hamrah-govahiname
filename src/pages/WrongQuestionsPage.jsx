import PageHeader from "../components/PageHeader";
import { getStats } from "../utils/storage";
import { COLORS } from "../theme/colors";
import {
  card,
  page,
  primaryButton,
  sectionTitle
} from "../theme/components";
import QuestionReview from "../components/result/QuestionReview";

export default function WrongQuestionsPage({ onBack, onStartPractice }) {
  const stats = getStats();
  const attempts = stats.attempts || [];

  const wrongItems = attempts
    .flatMap((attempt) => attempt.answersList || [])
    .filter((item) => !item.correct);

  const uniqueWrongItems = [];
  const seen = new Set();

  wrongItems.forEach((item) => {
    const q = item.question || {};
    const key = q.id || q.q_de || q.q;

    if (!seen.has(key)) {
      seen.add(key);
      uniqueWrongItems.push(item);
    }
  });

  return (
    <div style={page}>
      <PageHeader title="سؤال‌های غلط" onBack={onBack} />

      <div style={card}>
        <h3 style={sectionTitle}>مرور اشتباهات</h3>

        <p style={text}>
          این بخش سؤال‌هایی را نشان می‌دهد که در تمرین‌ها یا آزمون‌های قبلی غلط
          جواب داده‌ای.
        </p>

        <div style={summaryBox}>
          <div style={summaryNumber}>{uniqueWrongItems.length}</div>
          <div style={summaryLabel}>سؤال غلط منحصربه‌فرد</div>
        </div>

        {uniqueWrongItems.length > 0 && (
          <button onClick={onStartPractice} style={practiceBtn}>
            تمرین با سؤال‌های غلط
          </button>
        )}
      </div>

      {uniqueWrongItems.length === 0 ? (
        <div style={emptyBox}>هنوز سؤال غلطی ذخیره نشده است.</div>
      ) : (
        <div style={card}>
          {uniqueWrongItems.map((item, index) => (
            <QuestionReview
              key={item.question?.id || index}
              item={item}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const text = {
  color: COLORS.muted,
  lineHeight: 1.9,
  fontSize: 13,
  margin: "0 0 14px"
};

const summaryBox = {
  background: COLORS.cardSoft,
  border: `1px solid ${COLORS.borderSoft}`,
  borderRadius: 16,
  padding: 16,
  textAlign: "center",
  marginBottom: 14
};

const summaryNumber = {
  color: COLORS.green,
  fontSize: 34,
  fontWeight: 950
};

const summaryLabel = {
  color: COLORS.muted,
  fontSize: 12,
  fontWeight: 900
};

const practiceBtn = {
  ...primaryButton,
  borderRadius: 14,
  padding: "14px 0"
};

const emptyBox = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 18,
  padding: 18,
  textAlign: "center",
  color: COLORS.muted
};