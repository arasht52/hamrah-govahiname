export default function LawCard({ law }) {
  return (
    <div
      style={{
        background: "#1a2f52",
        border: "1px solid #1e3a5f",
        borderRadius: 18,
        padding: 18,
        marginBottom: 16
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14
        }}
      >
        <span style={{ fontSize: 28 }}>{law.icon}</span>

        <div>
          <div
            style={{
              fontSize: 17,
              fontWeight: 800
            }}
          >
            {law.title}
          </div>

          <div
            style={{
              color: "#FFB340",
              fontSize: 12,
              marginTop: 3
            }}
          >
            {law.law}
          </div>
        </div>
      </div>

      <div
        style={{
          color: "#E6EDF3",
          lineHeight: 1.9,
          marginBottom: 14
        }}
      >
        {law.paragraph}
      </div>

      <div
        style={{
          background: "#112240",
          borderRadius: 12,
          padding: 12,
          marginBottom: 12
        }}
      >
        <div
          style={{
            color: "#FFB340",
            fontWeight: 700,
            marginBottom: 8
          }}
        >
          🇮🇷 تفاوت با ایران
        </div>

        <div
          style={{
            color: "#8B949E",
            lineHeight: 1.8,
            fontSize: 13
          }}
        >
          {law.difference}
        </div>
      </div>

      <div
        style={{
          color: "#8B949E",
          marginBottom: 10,
          lineHeight: 1.8
        }}
      >
        <strong style={{ color: "#7EE787" }}>
          اصطلاحات آلمانی:
        </strong>
        <br />
        {law.terms.join(" • ")}
      </div>

      <div
        style={{
          background: "#14532d",
          borderRadius: 10,
          padding: 12,
          color: "#D1FAE5",
          lineHeight: 1.8
        }}
      >
        💡 {law.tip}
      </div>
    </div>
  );
}