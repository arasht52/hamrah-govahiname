import PageHeader from "../components/PageHeader";
import { COLORS } from "../theme/colors";

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

export default function FahrschulenPage({ onBack }) {
  return (
    <div>
      <PageHeader title="آموزشگاه‌های رانندگی" onBack={onBack} />

      <div style={hero}>
        <h2 style={title}>🏫 آموزشگاه‌های رانندگی</h2>
        <p style={subtitle}>
          لیست نمایشی آموزشگاه‌ها برای ارائه MVP. اطلاعات واقعی باید قبل از
          انتشار عمومی راستی‌آزمایی شود.
        </p>
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
              ثبت‌نام / Anmeldung
            </a>

            <a
              href={school.maps}
              target="_blank"
              rel="noreferrer"
              style={secondaryLink}
            >
              مسیر
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

const hero = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 22,
  padding: 20,
  marginBottom: 16,
  boxShadow: "0 8px 24px rgba(22,138,58,0.08)"
};

const title = {
  margin: "0 0 8px",
  color: COLORS.text,
  fontSize: 24,
  fontWeight: 950
};

const subtitle = {
  color: COLORS.muted,
  lineHeight: 1.9,
  fontSize: 13
};

const card = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
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
  fontSize: 17,
  color: COLORS.text
};

const muted = {
  color: COLORS.muted,
  fontSize: 12,
  lineHeight: 1.8
};

const ratingBox = {
  textAlign: "center",
  minWidth: 70
};

const rating = {
  color: COLORS.green,
  fontSize: 24,
  fontWeight: 950
};

const reviews = {
  color: COLORS.muted,
  fontSize: 11
};

const tagRow = {
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
  margin: "14px 0"
};

const tagStyle = {
  background: COLORS.cardSoft,
  border: `1px solid ${COLORS.borderSoft}`,
  borderRadius: 8,
  padding: "4px 8px",
  color: COLORS.green,
  fontSize: 11,
  fontWeight: 800
};

const actions = {
  display: "flex",
  gap: 8
};

const primaryLink = {
  flex: 2,
  background: COLORS.green,
  color: COLORS.white,
  borderRadius: 12,
  padding: "12px 0",
  textAlign: "center",
  textDecoration: "none",
  fontWeight: 950,
  fontSize: 13
};

const secondaryLink = {
  flex: 1,
  background: COLORS.white,
  color: COLORS.green,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 12,
  padding: "12px 0",
  textAlign: "center",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: 13
};