
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'manager' | 'viewer' | 'student';
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = '/signin'
}) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // If user doesn't have required role, redirect based on their actual role
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};
