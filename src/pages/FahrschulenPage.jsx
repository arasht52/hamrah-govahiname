import PageHeader from "../components/PageHeader";
import { COLORS } from "../theme/colors";
import {
  card,
  heroCard,
  mutedText,
  page,
  pageTitle,
  primaryButton,
  secondaryButton
} from "../theme/components";

const SCHOOLS = [
  {
    id: 1,
    city: "Hamburg",
    name: "AB Fahrschule Hamburg",
    address: "Tornberg 32, 22337 Hamburg — Barmbek Süd",
    rating: "4.6",
    reviews: "89",
    languages: "فارسی / Deutsch / English",
    tags: ["فارسی", "دوره فشرده", "موتور", "تبدیل گواهینامه"],
    description:
      "دوره فشرده ۲ هفته‌ای. کلاس تئوری فارسی دوشنبه و سه‌شنبه ۱۷:۳۰–۱۹:۰۰. تلفن: 040 55635102",
    website: "https://www.ab-fahrschule.de",
    maps: "https://maps.google.com/?q=Tornberg+32+22337+Hamburg"
  },
  {
    id: 2,
    city: "Hamburg",
    name: "Fahrschule Wandsbek S&K",
    address: "Wandsbeker Zollstr. 115, 22041 Hamburg",
    rating: "4.5",
    reviews: "124",
    languages: "فارسی / Deutsch / English / Türkçe",
    tags: ["فارسی", "تئوری ۷ روزه", "آنلاین"],
    description:
      "مدرس ایرانی (Ehsan Safarzadeh). ثبت‌نام پایه ۵۹۹ یورو. تلفن: 040 72002933",
    website: "https://fahrschule-wandsbek.de",
    maps: "https://maps.google.com/?q=Wandsbeker+Zollstr+115+22041+Hamburg"
  },
  {
    id: 3,
    city: "Duisburg",
    name: "Fahrschule Rezai",
    address: "Eigenstrasse 63, 47053 Duisburg-Hochfeld",
    rating: "4.7",
    reviews: "67",
    languages: "فارسی / Deutsch / English",
    tags: ["فارسی", "تبدیل گواهینامه", "از ۱۹۹۷"],
    description:
      "Hossein Rezai فارسی صحبت می‌کند. کلاس تئوری فارسی روزهای شنبه. ماشین‌های Mercedes. تلفن: 0171 5301344",
    website: "https://www.fahrschule-rezai.de",
    maps: "https://maps.google.com/?q=Eigenstrasse+63+47053+Duisburg"
  }
];

export default function FahrschulenPage({ onBack }) {
  return (
    <div style={page}>
      <PageHeader title="آموزشگاه‌های رانندگی" onBack={onBack} />

      <div style={heroCard}>
        <h2 style={pageTitle}>🏫 آموزشگاه‌های رانندگی</h2>

        <p style={mutedText}>
          لیست نمایشی آموزشگاه‌ها برای ارائه MVP. اطلاعات واقعی باید قبل از
          انتشار عمومی راستی‌آزمایی شود.
        </p>
      </div>

      {SCHOOLS.map((school) => (
        <div key={school.id} style={card}>
          <div style={row}>
            <div style={{ flex: 1 }}>
              <h3 style={schoolName}>{school.name}</h3>
              <div style={muted}>📍 {school.address}</div>
              <div style={muted}>🌐 {school.languages}</div>
              <div style={muted}>💬 {school.description}</div>
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

const row = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12
};

const schoolName = {
  margin: "0 0 6px",
  fontSize: 17,
  color: COLORS.text,
  fontWeight: 950
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
  ...primaryButton,
  flex: 2,
  borderRadius: 12,
  padding: "12px 0",
  textAlign: "center",
  textDecoration: "none",
  fontSize: 13
};

const secondaryLink = {
  ...secondaryButton,
  flex: 1,
  borderRadius: 12,
  padding: "12px 0",
  textAlign: "center",
  textDecoration: "none",
  fontSize: 13
};