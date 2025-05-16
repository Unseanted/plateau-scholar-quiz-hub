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
  return applications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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

// User Auth API
export const registerUser = async (name: string, email: string, password: string): Promise<{ success: boolean; user?: User }> => {
  await delay(800);
  
  // Check if user already exists
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const userExists = existingUsers.find((user: User) => user.email === email);
  
  if (userExists) {
    return { success: false };
  }
  
  // Create new user
  const newUser: User = {
    id: `user_${Math.floor(Math.random() * 1000000)}`,
    email,
    name,
    role: "student", // Changed default role to student
    createdAt: new Date().toISOString(),
    registrationDate: new Date().toISOString(), // Added registration date
    status: "active" // Added status field
  };
  
  // Store password separately in a real app you'd hash this
  localStorage.setItem(`user_pwd_${newUser.id}`, password);
  
  // Add to users list
  existingUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(existingUsers));
  
  return { success: true, user: newUser };
};

export const loginUser = async (email: string, password: string): Promise<{ success: boolean; user?: User }> => {
  await delay(800);
  
  // Get all users
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u: User) => u.email === email);
  
  if (!user) {
    return { success: false };
  }
  
  // Check password
  const storedPassword = localStorage.getItem(`user_pwd_${user.id}`);
  if (storedPassword !== password) {
    return { success: false };
  }
  
  return { success: true, user };
};

// Google Auth API
export const loginWithGoogle = async (): Promise<{ success: boolean; user?: User }> => {
  await delay(800);
  
  // In a real app, this would handle Google OAuth flow
  const googleUser: User = {
    id: `google_${Math.floor(Math.random() * 1000000)}`,
    email: `user${Math.floor(Math.random() * 10000)}@gmail.com`,
    name: `Google User ${Math.floor(Math.random() * 1000)}`,
    role: "student",
    authProvider: "google",
    createdAt: new Date().toISOString(),
    registrationDate: new Date().toISOString(),
    status: "active"
  };
  
  // Get existing users or create new array
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
  existingUsers.push(googleUser);
  localStorage.setItem("users", JSON.stringify(existingUsers));
  
  return { success: true, user: googleUser };
};

// Admin Auth API
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
      registrationDate: new Date().toISOString(),
      status: "active"
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
  // Get all users from localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  // Add admin users
  const adminUsers = [
    {
      id: "1",
      email: "admin@plateauscholarship.gov.ng",
      name: "Admin User",
      role: "admin",
      createdAt: new Date().toISOString(),
      registrationDate: new Date().toISOString(),
      status: "active"
    },
    {
      id: "2",
      email: "manager@plateauscholarship.gov.ng",
      name: "Manager User",
      role: "manager",
      createdAt: new Date().toISOString(),
      registrationDate: new Date().toISOString(),
      status: "active"
    }
  ];
  
  return [...adminUsers, ...users].sort((a, b) => 
    new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()
  );
};

// Mock file upload function
export const uploadFile = async (file: File): Promise<string> => {
  await delay(1500);
  // In a real app, this would upload to cloud storage and return URL
  return `https://example.com/uploads/${file.name}`;
};