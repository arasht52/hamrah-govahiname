export default function SectionTitle({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12
      }}
    >
      <div
        style={{
          width: 3,
          height: 16,
          background: "#FF9500",
          borderRadius: 2
        }}
      />

      <span
        style={{
          fontSize: 13,
          fontWeight: 800,
          color: "#8B949E",
          letterSpacing: 1
        }}
      >
        {children}
      </span>
    </div>
  );
}