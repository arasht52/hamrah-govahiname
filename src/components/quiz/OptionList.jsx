import { COLORS } from "../../theme/colors";

export default function OptionList({
  options,
  optionsFa = [],
  chosenAnswers,
  correctAnswers = [],
  submitted = false,
  showTranslation = false,
  onToggle
}) {
  return (
    <div style={optionsBox}>
      {options.map((option, i) => {
        const selected = chosenAnswers.includes(i);
        const isCorrect = correctAnswers.includes(i);

        const visual = getOptionVisual({
          submitted,
          selected,
          isCorrect
        });

        return (
          <button
            key={i}
            onClick={() => onToggle(i)}
            style={{
              ...optionBtn,
              border: `2px solid ${visual.border}`,
              background: visual.background,
              color: visual.color
            }}
          >
            <span
              style={{
                ...checkbox,
                borderColor:
                  selected || (submitted && isCorrect)
                    ? visual.border
                    : "#9CA3AF",
                background:
                  selected || (submitted && isCorrect)
                    ? visual.border
                    : COLORS.white,
                color:
                  selected || (submitted && isCorrect)
                    ? COLORS.white
                    : "transparent"
              }}
            >
              ✓
            </span>

            <span style={{ flex: 1 }}>
              <span>{option}</span>

              {showTranslation && optionsFa[i] && (
                <span style={optionTranslation}>{optionsFa[i]}</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function getOptionVisual({ submitted, selected, isCorrect }) {
  if (!submitted && selected) {
    return {
      border: COLORS.green,
      background: COLORS.bgSoft,
      color: COLORS.text
    };
  }

  if (submitted && isCorrect) {
    return {
      border: COLORS.green,
      background: COLORS.bgSoft,
      color: "#14532D"
    };
  }

  if (submitted && selected && !isCorrect) {
    return {
      border: COLORS.danger,
      background: COLORS.dangerSoft,
      color: COLORS.danger
    };
  }

  return {
    border: COLORS.border,
    background: COLORS.white,
    color: COLORS.text
  };
}

const optionsBox = {
  display: "flex",
  flexDirection: "column",
  gap: 10
};

const optionBtn = {
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  padding: "15px 16px",
  borderRadius: 14,
  fontFamily: "inherit",
  fontSize: 15,
  fontWeight: 800,
  textAlign: "left",
  cursor: "pointer",
  direction: "ltr"
};

const checkbox = {
  width: 28,
  height: 28,
  borderRadius: 7,
  border: "2px solid",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 950,
  flexShrink: 0
};

const optionTranslation = {
  display: "block",
  marginTop: 6,
  direction: "rtl",
  textAlign: "right",
  color: COLORS.muted,
  fontSize: 12,
  lineHeight: 1.7
};