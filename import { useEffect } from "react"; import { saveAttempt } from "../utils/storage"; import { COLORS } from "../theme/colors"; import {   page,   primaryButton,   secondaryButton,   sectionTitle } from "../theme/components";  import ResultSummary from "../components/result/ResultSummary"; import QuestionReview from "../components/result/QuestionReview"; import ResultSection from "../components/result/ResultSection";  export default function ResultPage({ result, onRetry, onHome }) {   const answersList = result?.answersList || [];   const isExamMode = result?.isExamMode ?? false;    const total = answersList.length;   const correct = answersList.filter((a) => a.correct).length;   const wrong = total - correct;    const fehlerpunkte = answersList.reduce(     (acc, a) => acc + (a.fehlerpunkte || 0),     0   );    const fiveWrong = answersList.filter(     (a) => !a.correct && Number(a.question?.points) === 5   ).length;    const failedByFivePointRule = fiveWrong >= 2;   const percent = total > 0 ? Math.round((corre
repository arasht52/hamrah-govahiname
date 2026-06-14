import { COLORS } from "../../theme/colors";
import { card, softCard } from "../../theme/components";

export default function QuestionCard({
  question,
  showTranslation,
  setShowTranslation
}) {
  const questionText = question.q_de || question.q;
  const questionFa = question.q_fa;

  const optionsFa = question.opts_fa || [];
  const hasTranslation = Boolean(questionFa || optionsFa.length);

  return (
    <div style={questionCard}>
      <div style={topRow}>
        <h2 style={questionTitle}>{questionText}</h2>

        {hasTranslation && (
          <button
            onClick={() => setShowTranslation((prev) => !prev)}
            style={translationBtn}
          >
            فارسی
          </button>
        )}
      </div>

      {showTranslation && questionFa && (
        <div style={translationBox}>{questionFa}</div>
      )}

      {question.image_url && (
        <img
          src={question.image_url}
          alt="Frage"
          style={mediaStyle}
        />
      )}

      {question.video_url && (
        <video
          src={question.video_url}
          controls
          style={mediaStyle}
        />
      )}
    </div>
  );
}

const questionCard = {
  ...card,
  boxShadow: "0 6px 18px rgba(22,138,58,0.08)"
};

const topRow = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12
};

const questionTitle = {
  margin: 0,
  color: COLORS.text,
  fontSize: 18,
  lineHeight: 1.6,
  fontWeight: 950,
  direction: "ltr",
  textAlign: "left"
};

const translationBtn = {
  background: COLORS.cardSoft,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 10,
  padding: "7px 14px",
  color: COLORS.green,
  fontWeight: 900,
  fontFamily: "inherit",
  cursor: "pointer"
};

const translationBox = {
  ...softCard,
  marginTop: 12,
  color: COLORS.textSoft,
  fontSize: 13,
  lineHeight: 1.9
};

const mediaStyle = {
  width: "100%",
  borderRadius: 14,
  marginTop: 14,
  border: `1px solid ${COLORS.borderSoft}`
};