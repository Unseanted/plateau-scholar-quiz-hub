import { ApplicationForm, User } from "../types";
import { Application, ApplicationStatus } from "../applications/types";

// Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3000/api';

// Helper function for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('auth_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API call failed: ${response.statusText}`);
  }

  return response.json();
};

// Simulate delay for development
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Applications API
export const submitApplication = async (application: ApplicationForm): Promise<{ success: boolean; id: string }> => {
  try {
    // Always try the backend first
    try {
      const response = await apiCall('/applications', {
        method: 'POST',
        body: JSON.stringify(application),
      });
      return { success: true, id: response._id || response.id };
    } catch (backendError) {
      console.warn('Backend not available, using localStorage fallback:', backendError);
      
      // Fallback to localStorage for development
      await delay(1000);
      const id = `APP-${Math.floor(Math.random() * 1000000)}`;
      localStorage.setItem(`application_${id}`, JSON.stringify({ 
        ...application, 
        id, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }));
      return { success: true, id };
    }
  } catch (error) {
    console.error('Submit application error:', error);
    throw error;
  }
};

export const getApplications = async (): Promise<ApplicationForm[]> => {
  try {
    // Try backend first
    try {
      return await apiCall('/applications');
    } catch (backendError) {
      console.warn('Backend not available, using localStorage fallback:', backendError);
      
      // Fallback to localStorage for development
      await delay(500);
      const applications: ApplicationForm[] = [];
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
    }
  } catch (error) {
    console.error('Get applications error:', error);
    throw error;
  }
};

export const getApplication = async (id: string): Promise<Application> => {
  try {
    // Try backend first
    try {
      return await apiCall(`/applications/${id}`);
    } catch (backendError) {
      console.warn('Backend not available, using localStorage fallback:', backendError);
      
      // Fallback to localStorage for development
      await delay(500);
      const data = localStorage.getItem(`application_${id}`);
      if (!data) {
        throw new Error('Application not found');
      }
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Get application error:', error);
    throw error;
  }
};

export const updateApplicationStatus = async (id: string, status: "pending" | "approved" | "rejected"): Promise<boolean> => {
  try {
    // Try backend first
    try {
      await apiCall(`/applications/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      return true;
    } catch (backendError) {
      console.warn('Backend not available, using localStorage fallback:', backendError);
      
      // Fallback to localStorage for development
      await delay(500);
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
    }
  } catch (error) {
    console.error('Update application status error:', error);
    throw error;
  }
};

// User Auth API
export const registerUser = async (name: string, email: string, password: string): Promise<{ success: boolean; user?: User; token?: string }> => {
  try {
    // Try backend first
    try {
      const response = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role: 'student' }),
      });
      
      if (response.access_token) {
        localStorage.setItem('auth_token', response.access_token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
      }
      
      return { success: true, user: response.user, token: response.access_token };
    } catch (backendError) {
      console.warn('Backend not available, using localStorage fallback:', backendError);
      
      // Fallback to localStorage for development
      await delay(800);
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = existingUsers.find((user: User) => user.email === email);
      
      if (userExists) {
        return { success: false };
      }
      
      const newUser: User = {
        id: `user_${Math.floor(Math.random() * 1000000)}`,
        email,
        name,
        role: "student",
        createdAt: new Date().toISOString(),
        registrationDate: new Date().toISOString(),
        status: "active"
      };
      
      localStorage.setItem(`user_pwd_${newUser.id}`, password);
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      
      return { success: true, user: newUser };
    }
  } catch (error) {
    console.error('Register user error:', error);
    return { success: false };
  }
};

export const loginUser = async (email: string, password: string): Promise<{ success: boolean; user?: User; token?: string }> => {
  try {
    // Try backend first
    try {
      const response = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      if (response.access_token) {
        localStorage.setItem('auth_token', response.access_token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
      }
      
      return { success: true, user: response.user, token: response.access_token };
    } catch (backendError) {
      console.warn('Backend not available, using localStorage fallback:', backendError);
      
      // Fallback to localStorage for development
      await delay(800);
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: User) => u.email === email);
      
      if (!user) {
        return { success: false };
      }
      
      const storedPassword = localStorage.getItem(`user_pwd_${user.id}`);
      if (storedPassword !== password) {
        return { success: false };
      }
      
      localStorage.setItem("currentUser", JSON.stringify(user));
      return { success: true, user };
    }
  } catch (error) {
    console.error('Login user error:', error);
    return { success: false };
  }
};

// Google Auth API
export const loginWithGoogle = async (): Promise<{ success: boolean; user?: User }> => {
  try {
    // Try backend first
    try {
      // Redirect to Google OAuth
      window.location.href = `${API_BASE_URL}/auth/google`;
      return { success: true };
    } catch (backendError) {
      console.warn('Backend not available, using localStorage fallback:', backendError);
      
      // Fallback for development
      await delay(800);
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
      
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      existingUsers.push(googleUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      localStorage.setItem("currentUser", JSON.stringify(googleUser));
      
      return { success: true, user: googleUser };
    }
  } catch (error) {
    console.error('Google login error:', error);
    return { success: false };
  }
};

// Admin Auth API
export const loginAdmin = async (email: string, password: string): Promise<{ success: boolean; user?: User }> => {
  try {
    // Try backend first
    try {
      const response = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      if (response.access_token && response.user.role === 'admin') {
        localStorage.setItem('auth_token', response.access_token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        return { success: true, user: response.user };
      }
      
      return { success: false };
    } catch (backendError) {
      console.warn('Backend not available, using localStorage fallback:', backendError);
      
      // Fallback for development
      await delay(800);
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
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return { success: false };
  }
};

export const logoutAdmin = async (): Promise<boolean> => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("auth_token");
  return true;
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
};

// Users API
export const getUsers = async (): Promise<User[]> => {
  try {
    // Try backend first
    try {
      return await apiCall('/users');
    } catch (backendError) {
      console.warn('Backend not available, using localStorage fallback:', backendError);
      
      // Fallback for development
      await delay(500);
      const users = JSON.parse(localStorage.getItem("users") || "[]");
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
    }
  } catch (error) {
    console.error('Get users error:', error);
    throw error;
  }
};

// File upload function
export const uploadFile = async (file: File): Promise<string> => {
  try {
    // Try backend first
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const token = localStorage.getItem('auth_token');
      const headers: HeadersInit = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers,
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      return data.url;
    } catch (backendError) {
      console.warn('Backend not available, using mock URL:', backendError);
      
      // Fallback for development
      await delay(1500);
      return `https://example.com/uploads/${file.name}`;
    }
  } catch (error) {
    console.error('Upload file error:', error);
    throw error;
  }
};

// Document upload for applications
export const uploadApplicationDocument = async (
  applicationId: string,
  type: string,
  file: File
): Promise<string> => {
  try {
    // Try backend first
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const token = localStorage.getItem('auth_token');
      const headers: HeadersInit = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/documents`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload document');
      }

      const data = await response.json();
      return data.url;
    } catch (backendError) {
      console.warn('Backend not available, using mock URL:', backendError);
      
      // Fallback for development
      await delay(1500);
      return `https://example.com/uploads/applications/${applicationId}/${type}/${file.name}`;
    }
  } catch (error) {
    console.error('Upload application document error:', error);
    throw error;
  }
};