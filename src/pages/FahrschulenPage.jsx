const SCHOOLS = [
  {
    id: 1,
    city: "Hamburg",
    name: "Demo Fahrschule Hamburg",
    address: "Hamburg, Bergedorf",
    rating: "4.8",
    reviews: "124",
    languages: "Deutsch / Englisch / Persisch",
    tags: ["Demo", "Umschreibung", "Theorie"],
    website: "https://www.google.com/search?q=Fahrschule+Hamburg+Bergedorf",
    maps: "https://www.google.com/maps/search/Fahrschule+Hamburg+Bergedorf"
  },
  {
    id: 2,
    city: "Berlin",
    name: "Demo Fahrschule Berlin",
    address: "Berlin, Mitte",
    rating: "4.7",
    reviews: "156",
    languages: "Deutsch / Englisch / Persisch",
    tags: ["Demo", "Mehrsprachig", "Online"],
    website: "https://www.google.com/search?q=Fahrschule+Berlin+Mitte",
    maps: "https://www.google.com/maps/search/Fahrschule+Berlin+Mitte"
  },
  {
    id: 3,
    city: "Köln",
    name: "Demo Fahrschule Köln",
    address: "Köln, Ehrenfeld",
    rating: "4.5",
    reviews: "71",
    languages: "Deutsch / Englisch",
    tags: ["Demo", "Auto", "Motorrad"],
    website: "https://www.google.com/search?q=Fahrschule+Köln+Ehrenfeld",
    maps: "https://www.google.com/maps/search/Fahrschule+Köln+Ehrenfeld"
  }
];

export default function FahrschulenPage() {
  return (
    <div>
      <div style={hero}>
        <h2 style={title}>🏫 Fahrschulen</h2>

        <p style={subtitle}>
          آموزشگاه‌های رانندگی برای فارسی‌زبانان آلمان؛ همراه با شهر، امتیاز،
          زبان‌ها، مسیر و لینک ثبت‌نام.
        </p>

        <div style={warning}>
          ⚠️ این لیست فعلاً نمونه نمایشی است. اطلاعات واقعی آموزشگاه‌ها باید قبل
          از انتشار عمومی راستی‌آزمایی شود.
        </div>
      </div>

      {SCHOOLS.map((school) => (
        <div key={school.id} style={card}>
          <div style={row}>
            <div>
              <h3 style={schoolName}>{school.name}</h3>
              <div style={muted}>📍 {school.address}</div>
              <div style={muted}>🌐 {school.languages}</div>
            </div>

            <div style={ratingBox}>
              <div style={rating}>{school.rating}</div>
              <div style={reviews}>⭐ {school.reviews}</div>
            </div>
          </div>

          <div style={tagRow}>
            {school.tags.map((tag) => (
              <span key={tag} style={tagStyle}>
                {tag}
              </span>
            ))}
          </div>

          <div style={actions}>
            <a
              href={school.website}
              target="_blank"
              rel="noreferrer"
              style={primaryLink}
            >
              📝 Anmeldung
            </a>

            <a
              href={school.maps}
              target="_blank"
              rel="noreferrer"
              style={secondaryLink}
            >
              🗺 Route
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

const hero = {
  background: "linear-gradient(135deg,#1a2f52,#0A2540)",
  border: "1px solid #1e3a5f",
  borderRadius: 20,
  padding: 20,
  marginBottom: 16
};

const title = {
  fontSize: 24,
  fontWeight: 900,
  marginTop: 0,
  marginBottom: 8
};

const subtitle = {
  color: "#8B949E",
  lineHeight: 1.9,
  fontSize: 13
};

const warning = {
  marginTop: 14,
  background: "rgba(255,149,0,0.1)",
  border: "1px solid rgba(255,149,0,0.3)",
  borderRadius: 12,
  padding: 12,
  color: "#FFB340",
  fontSize: 12,
  lineHeight: 1.8
};

const card = {
  background: "#1a2f52",
  border: "1px solid #1e3a5f",
  borderRadius: 18,
  padding: 16,
  marginBottom: 14
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12
};

const schoolName = {
  margin: "0 0 6px",
  fontSize: 17
};

const muted = {
  color: "#8B949E",
  fontSize: 12,
  lineHeight: 1.8
};

const ratingBox = {
  textAlign: "center",
  minWidth: 70
};

const rating = {
  color: "#FFB340",
  fontSize: 24,
  fontWeight: 900
};

const reviews = {
  color: "#8B949E",
  fontSize: 11
};

const tagRow = {
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
  margin: "14px 0"
};

const tagStyle = {
  background: "#112240",
  border: "1px solid #1e3a5f",
  borderRadius: 8,
  padding: "4px 8px",
  color: "#60A5FA",
  fontSize: 11
};

const actions = {
  display: "flex",
  gap: 8
};

const primaryLink = {
  flex: 2,
  background: "#FF9500",
  color: "#0A2540",
  borderRadius: 12,
  padding: "12px 0",
  textAlign: "center",
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 13
};

const secondaryLink = {
  flex: 1,
  background: "#112240",
  color: "#8B949E",
  border: "1px solid #1e3a5f",
  borderRadius: 12,
  padding: "12px 0",
  textAlign: "center",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 13
};