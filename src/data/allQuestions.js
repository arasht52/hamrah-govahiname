import { QUESTIONS } from "./questions";
import { IMAGE_QUESTIONS } from "./imageQuestions";
import { CUSTOM_QUESTIONS } from "./customQuestions";

export const ALL_QUESTIONS = [
  ...QUESTIONS,
  ...IMAGE_QUESTIONS,
  ...CUSTOM_QUESTIONS
];