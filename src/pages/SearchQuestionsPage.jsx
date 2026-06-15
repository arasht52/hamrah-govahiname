import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { ALL_QUESTIONS } from "../data/allQuestions";
import { COLORS } from "../theme/colors";

export default function SearchQuestionsPage({ onBack }) {
  const [query, setQuery] = useState("");

  const results = ALL_QUESTIONS.filter((q) => {
    const text = `
      ${q.id || ""}
      ${q.q_de || ""}
      ${q.q || ""}
      ${q.q_fa || ""}
      ${(q.opts_de || []).join(" ")}
      ${(q.opts || []).join(" ")}
      ${(q.opts_fa || []).join(" ")}
      ${q.exp_fa || ""}
      ${q.tip_fa || ""}
    `.toLowerCase();

    return text.includes(query.toLowerCase());
  });

  const hasCustom401 = ALL_QUESTIONS.some((q) => Number(q.id) === 401);

  return (
    <div>
      <PageHeader title="جستجوی سؤال‌ها" onBack={onBack} />

      <div style={debugBox}>
        تعداد کل سؤال‌ها: {ALL_QUESTIONS.length}
        <br />
        سؤال ۴۰۱ داخل بانک هست؟ {hasCustom401 ? "بله" : "نه"}
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="مثلاً 401 یا چپ یا Vorfahrt ..."
        style={inputStyle}
      />

      <div style={{ marginTop: 16 }}>
        {results.map((q, i) => (
          <div key={q.id || i} style={card}>
            <div style={deStyle}>
              {q.id && <span>#{q.id} — </span>}
              {q.q_de || q.q || q.q_fa}
            </div>

            {q.q_fa && q.q_de && (
              <div style={faStyle}>{q.q_fa}</div>
            )}

            <div style={pointStyle}>
              {q.points || 2} Punkte
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const debugBox = {
  background: COLORS.warningSoft,
  border: `1px solid ${COLORS.warningBorder}`,
  color: COLORS.warningText,
  borderRadius: 14,
  padding: 12,
  fontSize: 12,
  lineHeight: 1.8,
  marginBottom: 12
};

const inputStyle = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  border: `1px solid ${COLORS.border}`,
  fontFamily: "inherit",
  fontSize: 14,
  outline: "none"
};

const card = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 16,
  padding: 16,
  marginBottom: 12
};

const deStyle = {
  fontWeight: 900,
  lineHeight: 1.8,
  direction: "ltr",
  textAlign: "left"
};

const faStyle = {
  marginTop: 10,
  color: COLORS.muted,
  lineHeight: 1.9
};

const pointStyle = {
  marginTop: 12,
  color: COLORS.green,
  fontWeight: 900
};