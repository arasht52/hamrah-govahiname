import { COLORS } from "../../theme/colors";
import { card, softCard } from "../../theme/components";

export default function ResultSummary({
  passed,
  isExamMode,
  fehlerpunkte,
  percent,
  failedByFivePointRule,
  total,
  correct,
  wrong,
  fiveWrong
}) {
  return (
    <div style={summaryCard}>
      <div style={statusIcon}>{passed ? "✅" : "❌"}</div>

      <h2
        style={{
          ...statusTitle,
          color: passed ? COLORS.green : COLORS.danger
        }}
      >
        {passed ? "قبول شدی" : "مردود شدی"}
      </h2>

      <div style={subTitle}>{passed ? "Bestanden" : "Nicht bestanden"}</div>

      {isExamMode ? (
        <div style={scoreBox}>
          <div style={scoreNumber}>{fehlerpunkte}</div>
          <div style={scoreLabel}>Fehlerpunkte</div>
          <div style={limitText}>حد مجاز: حداکثر ۱۰ امتیاز منفی</div>
        </div>
      ) : (
        <div style={scoreBox}>
          <div style={scoreNumber}>{percent}%</div>
          <div style={scoreLabel}>نتیجه تمرین آموزشی</div>
          <div style={limitText}>حد پیشنهادی تمرین: حداقل ۷۰٪</div>
        </div>
      )}

      {failedByFivePointRule && (
        <div style={dangerBox}>
          به دلیل دو یا چند سؤال ۵ امتیازی اشتباه، مردود محسوب می‌شوی.
          <br />
          Nicht bestanden wegen mehrerer 5-Punkte-Fehler.
        </div>
      )}

      <div style={miniStats}>
        <MiniStat value={total} label="سؤال" />
        <MiniStat value={correct} label="درست" />
        <MiniStat value={wrong} label="غلط" />
        <MiniStat value={fiveWrong} label="۵ امتیازی غلط" />
      </div>
    </div>
  );
}

function MiniStat({ value, label }) {
  return (
    <div style={miniStat}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

const summaryCard = {
  ...card,
  padding: 26,
  textAlign: "center",
  boxShadow: "0 8px 24px rgba(22,138,58,0.08)"
};

const statusIcon = {
  fontSize: 56,
  marginBottom: 8
};

const statusTitle = {
  fontSize: 28,
  fontWeight: 950,
  margin: 0
};

const subTitle = {
  color: COLORS.muted,
  marginTop: 6,
  fontSize: 13,
  fontWeight: 800
};

const scoreBox = {
  ...softCard,
  marginTop: 20,
  padding: 18
};

const scoreNumber = {
  fontSize: 52,
  fontWeight: 950,
  color: COLORS.green,
  lineHeight: 1
};

const scoreLabel = {
  marginTop: 6,
  color: COLORS.text,
  fontWeight: 900
};

const limitText = {
  marginTop: 4,
  color: COLORS.muted,
  fontSize: 12
};

const dangerBox = {
  marginTop: 14,
  background: COLORS.dangerSoft,
  border: `1px solid ${COLORS.dangerBorder}`,
  color: COLORS.danger,
  borderRadius: 12,
  padding: 12,
  fontSize: 12,
  lineHeight: 1.8
};

const miniStats = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: 8,
  marginTop: 16
};

const miniStat = {
  background: COLORS.white,
  border: `1px solid ${COLORS.borderSoft}`,
  borderRadius: 12,
  padding: "10px 4px",
  display: "flex",
  flexDirection: "column",
  gap: 3,
  color: COLORS.muted,
  fontSize: 10
};