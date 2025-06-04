
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { getCurrentUser } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token?: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user on app load
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = (user: User, token?: string) => {
    setUser(user);
    if (token) {
      localStorage.setItem('auth_token', token);
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
