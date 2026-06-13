export default function WeaknessBars({ analysis = [] }) {
  return (
    <div
      style={{
        background: "#1a2f52",
        border: "1px solid #1e3a5f",
        borderRadius: 16,
        padding: 16
      }}
    >
      {analysis.map((item) => (
        <div key={item.topic} style={{ marginBottom: 14 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700
              }}
            >
              {item.topic}
            </span>

            <span
              style={{
                fontSize: 13,
                color: "#FFB340",
                fontWeight: 700
              }}
            >
              {item.pct}%
            </span>
          </div>

          <div
            style={{
              height: 8,
              background: "#0A2540",
              borderRadius: 4,
              overflow: "hidden"
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${item.pct}%`,
                background: "#FF9500"
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}