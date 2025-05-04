
import { QuizQuestion } from "../types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which state in Nigeria is the scholarship program for?",
    options: ["Lagos State", "Plateau State", "Rivers State", "Kano State"],
    correctAnswer: "Plateau State",
    explanation: "This scholarship is specifically for indigenes of Plateau State."
  },
  {
    id: 2,
    question: "Which of the following is NOT a Local Government Area in Plateau State?",
    options: ["Jos North", "Wase", "Barkin Ladi", "Eti-Osa"],
    correctAnswer: "Eti-Osa",
    explanation: "Eti-Osa is a Local Government Area in Lagos State, not Plateau State."
  },
  {
    id: 3,
    question: "What document is required to prove you are an indigene of Plateau State?",
    options: ["Birth Certificate", "National ID Card", "Indigene Form", "International Passport"],
    correctAnswer: "Indigene Form",
    explanation: "The Indigene Form is the official document that proves you are an indigene of Plateau State."
  },
  {
    id: 4,
    question: "Which of these is required for a complete scholarship application?",
    options: ["Only Admission Letter", "Only Indigene Form", "Only Passport Photograph", "All of the above"],
    correctAnswer: "All of the above",
    explanation: "A complete application requires the Indigene Form, Admission Letter, and Passport Photograph."
  },
  {
    id: 5,
    question: "Who is eligible for the Plateau State Scholarship?",
    options: [
      "Any Nigerian student",
      "Only students studying outside Nigeria",
      "Students who are indigenes of Plateau State",
      "Only postgraduate students"
    ],
    correctAnswer: "Students who are indigenes of Plateau State",
    explanation: "The scholarship is specifically for students who are indigenes of Plateau State."
  }
];

export const lgaList: string[] = [
  "Barkin Ladi",
  "Bassa",
  "Bokkos",
  "Jos East",
  "Jos North",
  "Jos South",
  "Kanam",
  "Kanke",
  "Langtang North",
  "Langtang South",
  "Mangu",
  "Mikang",
  "Pankshin",
  "Qua'an Pan",
  "Riyom",
  "Shendam",
  "Wase"
];

export const passScore = 4; // Minimum score to pass (out of 5 questions)
