export interface Application {
  id: string;
  studentId: string;
  academicYear: string;
  institution: string;
  course: string;
  level: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  updatedAt: Date;
  documents: {
    indigeneForm: string;
    admissionLetter: string;
    passportPhoto: string;
  };
  academicRecords?: {
    cgpa: number;
    transcriptUrl: string;
  };
  financialInfo?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

export interface ApplicationStatus {
  id: string;
  applicationId: string;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
  updatedBy: string;
  updatedAt: Date;
}

export interface ApplicationDocument {
  id: string;
  applicationId: string;
  type: 'indigeneForm' | 'admissionLetter' | 'passportPhoto' | 'transcript';
  url: string;
  uploadedAt: Date;
}