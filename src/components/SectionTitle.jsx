export default function SectionTitle({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        margin: "22px 0 12px"
      }}
    >
      <div
        style={{
          width: 4,
          height: 18,
          background: "#168A3A",
          borderRadius: 4
        }}
      />

      <span
        style={{
          fontSize: 13,
          fontWeight: 950,
          color: "#168A3A"
        }}
      >
        {children}
      </span>
    </div>
  );
}