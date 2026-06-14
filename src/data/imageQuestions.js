import { QUESTION_IMAGES } from "../assets/questions";

// سوالات تصویری آزمون گواهینامه آلمان

export const IMAGE_QUESTIONS = [
  {
    id: 1001,

    topic: "Vorfahrt",

    points: 5,

    q_de: "Wer darf zuerst fahren?",

    q_fa: "کدام وسیله نقلیه باید ابتدا حرکت کند؟",

    image_url: QUESTION_IMAGES.q1,

    opts_de: [
      "Das rote Fahrzeug",
      "Das grüne Fahrzeug",
      "Ich"
    ],

    opts_fa: [
      "خودروی قرمز",
      "خودروی سبز",
      "وسیله نقلیه من"
    ],

    ok: [1],

    exp_fa:
      "در این وضعیت، خودروی سبز حق تقدم دارد و باید قبل از بقیه حرکت کند.",

    tip_fa:
      "ابتدا علائم و جهت حرکت وسایل نقلیه را بررسی کن و سپس حق تقدم را تعیین کن."
  }
];