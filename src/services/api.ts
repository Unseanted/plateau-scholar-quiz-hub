
import { ApplicationForm, User } from "../types";

// Mock API functions that would be replaced with actual API calls
// These would connect to a backend or database like Firebase, Supabase, etc.

// Simulate delay to mimic API call latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Applications API
export const submitApplication = async (application: ApplicationForm): Promise<{ success: boolean; id: string }> => {
  await delay(1000);
  // In a real app, this would send data to a backend
  const id = `APP-${Math.floor(Math.random() * 1000000)}`;
  localStorage.setItem(`application_${id}`, JSON.stringify({ ...application, id, createdAt: new Date(), updatedAt: new Date() }));
  return { success: true, id };
};

export const getApplications = async (): Promise<ApplicationForm[]> => {
  await delay(500);
  const applications: ApplicationForm[] = [];
  // In a real app, this would fetch data from a backend
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('application_')) {
      const data = localStorage.getItem(key);
      if (data) {
        applications.push(JSON.parse(data));
      }
    }
  }
  return applications;
};

export const updateApplicationStatus = async (id: string, status: "pending" | "approved" | "rejected"): Promise<boolean> => {
  await delay(500);
  // In a real app, this would update data in a backend
  const key = `application_${id}`;
  const data = localStorage.getItem(key);
  if (data) {
    const application = JSON.parse(data) as ApplicationForm;
    application.status = status;
    application.updatedAt = new Date();
    localStorage.setItem(key, JSON.stringify(application));
    return true;
  }
  return false;
};

// Auth API
export const loginAdmin = async (email: string, password: string): Promise<{ success: boolean; user?: User }> => {
  await delay(800);
  // This is a mock implementation - in a real app, you'd validate against a backend
  if (email === "admin@plateauscholarship.gov.ng" && password === "admin123") {
    const user: User = {
      id: "1",
      email,
      name: "Admin User",
      role: "admin",
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false };
};

export const logoutAdmin = async (): Promise<boolean> => {
  localStorage.removeItem("currentUser");
  return true;
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
};

// Users API
export const getUsers = async (): Promise<User[]> => {
  await delay(500);
  // In a real app, this would fetch data from a backend
  return [
    {
      id: "1",
      email: "admin@plateauscholarship.gov.ng",
      name: "Admin User",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      email: "manager@plateauscholarship.gov.ng",
      name: "Manager User",
      role: "manager",
      createdAt: new Date().toISOString(),
    }
  ];
};

// Mock file upload function
export const uploadFile = async (file: File): Promise<string> => {
  await delay(1500);
  // In a real app, this would upload to cloud storage and return URL
  return `https://example.com/uploads/${file.name}`;
};
