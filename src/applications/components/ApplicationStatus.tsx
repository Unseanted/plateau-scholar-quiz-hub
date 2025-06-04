import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Application } from '../types';

interface ApplicationStatusProps {
  status: Application['status'];
}

export const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <Badge className={getStatusColor()}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};