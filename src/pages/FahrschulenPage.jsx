import { useMemo, useState } from "react";

const SCHOOLS = [
  {
    id: 1,
    city: "Hamburg",
    district: "Bergedorf",
    name: "Demo Fahrschule Hamburg",
    rating: 4.8,
    reviews: 124,
    address: "Hamburg, Bergedorf",
    languages: ["آلمانی", "انگلیسی", "فارسی"],
    tags: ["نمونه نمایشی", "تبدیل گواهینامه", "کلاس تئوری"],
    website: "https://www.google.com/search?q=Fahrschule+Hamburg+Bergedorf",
    maps: "https://www.google.com/maps/search/Fahrschule+Hamburg+Bergedorf"
  },
  {
    id: 2,
    city: "Hamburg",
    district: "Wandsbek",
    name: "Demo Fahrschule Wandsbek",
    rating: 4.5,
    reviews: 89,
    address: "Hamburg, Wandsbek",
    languages: ["آلمانی", "انگلیسی"],
    tags: ["نمونه نمایشی", "قیمت اقتصادی"],
    website: "https://www.google.com/search?q=Fahrschule+Hamburg+Wandsbek",
    maps: "https://www.google.com/maps/search/Fahrschule+Hamburg+Wandsbek"
  },
  {
    id: 3,
    city: "Berlin",
    district: "Mitte",
    name: "Demo Fahrschule Berlin",
    rating: 4.7,
    reviews: 156,
    address: "Berlin, Mitte",
    languages: ["آلمانی", "انگلیسی", "فارسی"],
    tags: ["نمونه نمایشی", "آنلاین", "چندزبانه"],
    website: "https://www.google.com/search?q=Fahrschule+Berlin+Mitte",
    maps: "https://www.google.com/maps/search/Fahrschule+Berlin+Mitte"
  },
  {
    id: 4,
    city: "Köln",
    district: "Ehrenfeld",
    name: "Demo Fahrschule Köln",
    rating: 4.4,
    reviews: 71,
    address: "Köln, Ehrenfeld",
    languages: ["آلمانی", "انگلیسی"],
    tags: ["نمونه نمایشی", "ماشین", "موتور"],
    website: "https://www.google.com/search?q=Fahrschule+Köln+Ehrenfeld",
    maps: "https://www.google.com/maps/search/Fahrschule+Köln+Ehrenfeld"
  }
];

const CITIES = ["همه", "Hamburg", "Berlin", "Köln"];

export default function FahrschulenPage() {
  const [city, setCity] = useState("همه");
  const [search, setSearch] = useState("");

  const results = useMemo(() => {
    return SCHOOLS.filter((school) => {
      const cityOk = city === "همه" || school.city === city;
      const text = `${school.name} ${school.city} ${school.district} ${school.languages.join(" ")} ${school.tags.join(" ")}`;
      const searchOk = text.toLowerCase().includes(search.toLowerCase());
      return cityOk && searchOk;
    });
  }, [city, search]);

  return (
    <div>
      <div style={hero}>
        <h2 style={title}>🏫 آموزشگاه‌های رانندگی</h2>
        <p style={subtitle}>
          لیست آموزشگاه‌ها برای فارسی‌زبانان آلمان؛ همراه با شهر، امتیاز، زبان‌ها، مسیر و لینک ثبت‌نام.
        </p>

        <div style={warning}>
          ⚠️ این لیست فعلاً نمونه نمایشی است. اطلاعات واقعی آموزشگاه‌ها باید قبل از انتشار عمومی راستی‌آزمایی شود.
        </div>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="جستجو: شهر، فارسی، تبدیل گواهینامه..."
        style={searchBox}
      />

      <div style={cityRow}>
        {CITIES.map((c) => (
          <button
            key={c}
            onClick={() => setCity(c)}
            style={{
              ...cityBtn,
              background: city === c ? "#FF9500" : "#1a2f52",
              color: city === c ? "#0A2540" : "#8B949E",
              borderColor: city === c ? "#FF9500" : "#1e3a5f"
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 12, color: "#8B949E", fontSize: 13 }}>
        {results.length} آموزشگاه یافت شد
      </div>

      {results.map((school) => (
        <SchoolCard key={school.id} school={school} />
      ))}
    </div>
  );
}

function SchoolCard({ school }) {
  return (
    <div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h3 style={{ margin: "0 0 6px", fontSize: 17 }}>{school.name}</h3>
          <div style={muted}>📍 {school.address}</div>
          <div style={muted}>🌐 زبان‌ها: {school.languages.join("، ")}</div>
        </div>

        <div style={{ textAlign: "center", minWidth: 70 }}>
          <div style={{ color: "#FFB340", fontSize: 24, fontWeight: 900 }}>
            {school.rating}
          </div>
          <div style={{ color: "#8B949E", fontSize: 11 }}>⭐ {school.reviews}</div>
        </div>
      </div>

      <div style={tagRow}>
        {school.tags.map((tag) => (
          <span key={tag} style={tagStyle}>
            {tag}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <a href={school.website} target="_blank" rel="noreferrer" style={primaryLink}>
          📝 ثبت‌نام / سایت
        </a>

        <a href={school.maps} target="_blank" rel="noreferrer" style={secondaryLink}>
          🗺 مسیر
        </a>
      </div>
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

const searchBox = {
  width: "100%",
  background: "#112240",
  border: "1px solid #1e3a5f",
  borderRadius: 12,
  padding: "12px 14px",
  color: "#E6EDF3",
  fontFamily: "inherit",
  marginBottom: 12,
  boxSizing: "border-box"
};

const cityRow = {
  display: "flex",
  gap: 8,
  overflowX: "auto",
  marginBottom: 16
};

const cityBtn = {
  border: "1px solid",
  borderRadius: 20,
  padding: "8px 14px",
  fontFamily: "inherit",
  fontWeight: 700,
  cursor: "pointer",
  whiteSpace: "nowrap"
};

const card = {
  background: "#1a2f52",
  border: "1px solid #1e3a5f",
  borderRadius: 18,
  padding: 16,
  marginBottom: 14
};

const muted = {
  color: "#8B949E",
  fontSize: 12,
  lineHeight: 1.8
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