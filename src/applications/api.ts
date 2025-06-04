import { Application, ApplicationStatus } from './types';

const API_BASE_URL = '/api/applications';

export const createApplication = async (data: Partial<Application>): Promise<Application> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create application');
  }

  return response.json();
};

export const getApplication = async (id: string): Promise<Application> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch application');
  }

  return response.json();
};

export const updateApplicationStatus = async (
  id: string,
  status: ApplicationStatus
): Promise<Application> => {
  const response = await fetch(`${API_BASE_URL}/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(status),
  });

  if (!response.ok) {
    throw new Error('Failed to update application status');
  }

  return response.json();
};

export const uploadApplicationDocument = async (
  applicationId: string,
  type: string,
  file: File
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  const response = await fetch(`${API_BASE_URL}/${applicationId}/documents`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload document');
  }

  const data = await response.json();
  return data.url;
};

export const getApplicationDocuments = async (applicationId: string) => {
  const response = await fetch(`${API_BASE_URL}/${applicationId}/documents`);

  if (!response.ok) {
    throw new Error('Failed to fetch application documents');
  }

  return response.json();
};