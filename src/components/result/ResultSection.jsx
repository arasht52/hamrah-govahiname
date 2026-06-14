import { card, sectionTitle } from "../../theme/components";

export default function ResultSection({ title, children, danger = false }) {
  return (
    <div style={card}>
      <h3
        style={{
          ...sectionTitle,
          color: danger ? "#DC2626" : sectionTitle.color
        }}
      >
        {title}
      </h3>

      {children}
    </div>
  );
}