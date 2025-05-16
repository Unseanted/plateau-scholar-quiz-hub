export type LGA = 
  | "Barkin Ladi"
  | "Bassa"
  | "Bokkos"
  | "Jos East"
  | "Jos North"
  | "Jos South"
  | "Kanam"
  | "Kanke"
  | "Langtang North"
  | "Langtang South"
  | "Mangu"
  | "Mikang"
  | "Pankshin"
  | "Qua'an Pan"
  | "Riyom"
  | "Shendam"
  | "Wase";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface ApplicationForm {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "other";
  dateOfBirth: Date | string;
  address: string;
  lga: LGA;
  institution: string;
  course: string;
  level: string;
  matricNumber: string;
  indigeneFormUrl?: string;
  admissionLetterUrl?: string;
  passportPhotoUrl?: string;
  quizScore?: number;
  status: "pending" | "approved" | "rejected";
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "viewer" | "student";
  authProvider?: "email" | "google";
  createdAt: string;
  registrationDate: string;
  status: "active" | "inactive" | "suspended";
}

export interface StudentProfile extends ApplicationForm {
  scholarshipAmount: number;
  scholarshipType: "full" | "partial" | "merit";
  academicYear: string;
  disbursements: Disbursement[];
  performanceMetrics?: {
    cgpa: number;
    attendance: number;
    lastSemesterGrade: string;
  };
}

export interface Disbursement {
  id: string;
  amount: number;
  date: Date | string;
  status: "pending" | "processed" | "completed";
  description?: string;
}