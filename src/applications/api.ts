
import { Application, ApplicationStatus } from './types';
import * as mainApi from '../services/api';

// Re-export functions from main API service to maintain consistency
export const createApplication = mainApi.submitApplication;
export const getApplication = mainApi.getApplication;
export const updateApplicationStatus = async (
  id: string,
  status: "pending" | "approved" | "rejected"
): Promise<Application> => {
  await mainApi.updateApplicationStatus(id, status);
  return mainApi.getApplication(id);
};

export const uploadApplicationDocument = mainApi.uploadApplicationDocument;

export const getApplicationDocuments = async (applicationId: string) => {
  // This would typically fetch documents from the backend
  // For now, return empty array as documents are handled differently
  return [];
};
