export default function FahrschulenPage() {
  return (
    <div
      style={{
        background: "#1a2f52",
        border: "1px solid #1e3a5f",
        borderRadius: 18,
        padding: 20
      }}
    >
      <h2 style={{ marginTop: 0 }}>🏫 Fahrschulen</h2>

      <p style={{ color: "#8B949E", lineHeight: 1.9 }}>
        این بخش در حال توسعه است. در نسخه بعدی، لیست آموزشگاه‌های رانندگی آلمان
        همراه با شهر، آدرس، امتیاز، مسیر و لینک ثبت‌نام اضافه می‌شود.
      </p>

      <div
        style={{
          marginTop: 16,
          background: "#112240",
          border: "1px dashed #1e3a5f",
          borderRadius: 14,
          padding: 16,
          color: "#FFB340",
          lineHeight: 1.8
        }}
      >
        🚧 Coming soon
        <br />
        Fahrschulen · Bewertungen · Anmeldung · Route
      </div>
    </div>
  );
}