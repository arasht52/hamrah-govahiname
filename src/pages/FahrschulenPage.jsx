import { useMemo, useState } from "react";

const SCHOOLS = [
  {
    id: 1,
    city: "Hamburg",
    district: "Barmbek Süd",
    name: "AB Fahrschule Hamburg",
    nameFA: "آ ب فارشوله — هامبورگ",
    rating: 4.6,
    reviews: 89,
    address: "Tornberg 32, 22337 Hamburg",
    phone: "040 55635102",
    mobile: "017634499531",
    email: "info@ab-fahrschule.de",
    website: "https://www.ab-fahrschule.de",
    maps: "https://maps.google.com/?q=AB+Fahrschule+Hamburg+Tornberg+32",
    languages: ["فارسی", "آلمانی", "انگلیسی"],
    hours: "دوشنبه تا چهارشنبه ۱۴–۱۷",
    tags: ["فارسی", "دوره فشرده", "موتور", "تبدیل گواهینامه"],
    description: "آموزشگاه فارسی‌زبان در هامبورگ. دوره فشرده ۲ هفته‌ای، کلاس تئوری فارسی دوشنبه و سه‌شنبه ۱۷:۳۰–۱۹:۰۰.",
    highlight: "فارسی",
  },
  {
    id: 2,
    city: "Hamburg",
    district: "Wandsbek",
    name: "Fahrschule Wandsbek S&K",
    nameFA: "فارشوله واندسبک — هامبورگ",
    rating: 4.5,
    reviews: 124,
    address: "Wandsbeker Zollstr. 115, 22041 Hamburg",
    phone: "+49 40 72002933",
    mobile: null,
    email: "info@fahrschule-wandsbek.de",
    website: "https://fahrschule-wandsbek.de",
    maps: "https://maps.google.com/?q=Fahrschule+Wandsbek+Wandsbeker+Zollstr+115",
    languages: ["فارسی", "آلمانی", "انگلیسی", "ترکی"],
    hours: "دوشنبه تا جمعه ۱۵–۱۸",
    tags: ["فارسی", "تئوری ۷ روزه", "آنلاین"],
    description: "آموزشگاه چندزبانه با مدرس ایرانی (Ehsan Safarzadeh). تئوری در ۷ روز، برنامه‌ریزی انعطاف‌پذیر. ثبت‌نام پایه: ۵۹۹ یورو.",
    highlight: "فارسی",
  },
  {
    id: 3,
    city: "Duisburg",
    district: "Hochfeld",
    name: "Fahrschule Rezai",
    nameFA: "فارشوله رضایی — دوئیسبورگ",
    rating: 4.7,
    reviews: 67,
    address: "Eigenstrasse 63, 47053 Duisburg-Hochfeld",
    phone: "0171 5301344",
    mobile: "0171 5301344",
    email: null,
    website: "https://www.fahrschule-rezai.de",
    maps: "https://maps.google.com/?q=Fahrschule+Rezai+Eigenstrasse+63+Duisburg",
    languages: ["فارسی", "آلمانی", "انگلیسی"],
    hours: "با هماهنگ قبلی",
    tags: ["فارسی", "تبدیل گواهینامه", "اتوماتیک و دنده"],
    description: "آموزشگاه فارسی‌زبان در دویسبورگ برای تبدیل گواهینامه ایرانی.",
highlight: "فارسی"
}
];

export default function FahrschulenPage() {
  return (
    <div
      style={{
        background: "#1a2f52",
        border: "1px solid #1e3a5f",
        borderRadius: 16,
        padding: 20
      }}
    >
      <h2>🏫 آموزشگاه‌های رانندگی</h2>

      {FAHRSCHULEN.map((f) => (
        <div
          key={f.id}
          style={{
            marginTop: 16,
            padding: 14,
            border: "1px solid #1e3a5f",
            borderRadius: 12
          }}
        >
          <h3>{f.nameFA}</h3>
          <div>{f.address}</div>
          <div>⭐ {f.rating}</div>
          <div>{f.phone}</div>
        </div>
      ))}
    </div>
  );
}

