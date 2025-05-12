
import { StudentProfile } from "../types";

// Mock student profiles data
export const MOCK_STUDENT_PROFILES: StudentProfile[] = [
  {
    id: "SP-001",
    fullName: "John Danladi",
    email: "john.danladi@example.com",
    phone: "+234 812 345 6789",
    gender: "male",
    dateOfBirth: "1998-05-15",
    address: "23 Plateau Road, Jos",
    lga: "Jos North",
    institution: "University of Jos",
    course: "Computer Science",
    level: "300 Level",
    matricNumber: "UJ/2019/CS/0123",
    status: "approved",
    scholarshipAmount: 500000,
    scholarshipType: "full",
    academicYear: "2023/2024",
    passportPhotoUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    indigeneFormUrl: "#",
    admissionLetterUrl: "#",
    createdAt: "2023-01-15",
    updatedAt: "2023-01-20",
    disbursements: [
      {
        id: "DIS-001",
        amount: 250000,
        date: "2023-03-01",
        status: "completed",
        description: "First semester payment"
      },
      {
        id: "DIS-002",
        amount: 250000,
        date: "2023-08-15",
        status: "pending",
        description: "Second semester payment"
      }
    ],
    performanceMetrics: {
      cgpa: 4.2,
      attendance: 96,
      lastSemesterGrade: "A"
    }
  },
  {
    id: "SP-002",
    fullName: "Sarah Musa",
    email: "sarah.musa@example.com",
    phone: "+234 803 456 7890",
    gender: "female",
    dateOfBirth: "1999-08-23",
    address: "45 Bauchi Road, Jos",
    lga: "Jos South",
    institution: "Plateau State University",
    course: "Biochemistry",
    level: "400 Level",
    matricNumber: "PSU/2018/BIO/0456",
    status: "approved",
    scholarshipAmount: 350000,
    scholarshipType: "partial",
    academicYear: "2023/2024",
    passportPhotoUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    indigeneFormUrl: "#",
    admissionLetterUrl: "#",
    createdAt: "2023-01-10",
    updatedAt: "2023-01-18",
    disbursements: [
      {
        id: "DIS-003",
        amount: 175000,
        date: "2023-03-05",
        status: "completed",
        description: "First semester payment"
      },
      {
        id: "DIS-004",
        amount: 175000,
        date: "2023-09-01",
        status: "processed",
        description: "Second semester payment"
      }
    ],
    performanceMetrics: {
      cgpa: 4.5,
      attendance: 98,
      lastSemesterGrade: "A"
    }
  },
  {
    id: "SP-003",
    fullName: "Ibrahim Hassan",
    email: "ibrahim.hassan@example.com",
    phone: "+234 705 678 1234",
    gender: "male",
    dateOfBirth: "1997-11-30",
    address: "78 Zaria Road, Jos",
    lga: "Mangu",
    institution: "Federal College of Education",
    course: "Education",
    level: "NCE III",
    matricNumber: "FCE/2020/EDU/0789",
    status: "approved",
    scholarshipAmount: 400000,
    scholarshipType: "merit",
    academicYear: "2023/2024",
    passportPhotoUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    indigeneFormUrl: "#",
    admissionLetterUrl: "#",
    createdAt: "2023-01-12",
    updatedAt: "2023-01-19",
    disbursements: [
      {
        id: "DIS-005",
        amount: 200000,
        date: "2023-03-10",
        status: "completed",
        description: "First semester payment"
      },
      {
        id: "DIS-006",
        amount: 200000,
        date: "2023-08-25",
        status: "pending",
        description: "Second semester payment"
      }
    ],
    performanceMetrics: {
      cgpa: 3.8,
      attendance: 92,
      lastSemesterGrade: "B"
    }
  }
];

export const getStudentProfiles = async (): Promise<StudentProfile[]> => {
  // This would be an API call in a real application
  return Promise.resolve(MOCK_STUDENT_PROFILES);
};

export const getStudentProfileById = async (id: string): Promise<StudentProfile | undefined> => {
  // This would be an API call in a real application
  return Promise.resolve(MOCK_STUDENT_PROFILES.find(profile => profile.id === id));
};
