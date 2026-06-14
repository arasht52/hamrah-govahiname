import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { ALL_QUESTIONS } from "../data/allQuestions";
import { COLORS } from "../theme/colors";

export default function SearchQuestionsPage({ onBack }) {
  const [query, setQuery] = useState("");

  const results = ALL_QUESTIONS.filter((q) => {
    const text =
      `${q.q_de || q.q} ${q.q_fa || ""}`.toLowerCase();

    return text.includes(query.toLowerCase());
  });

  return (
    <div>
      <PageHeader title="جستجوی سؤال‌ها" onBack={onBack} />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="مثلاً Vorfahrt ،Parken ،Autobahn ..."
        style={inputStyle}
      />

      <div style={{ marginTop: 16 }}>
        {results.map((q, i) => (
          <div key={i} style={card}>
            <div style={deStyle}>
              {q.q_de || q.q}
            </div>

            {q.q_fa && (
              <div style={faStyle}>
                {q.q_fa}
              </div>
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