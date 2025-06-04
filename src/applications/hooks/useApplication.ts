
import { useState, useCallback } from 'react';
import { Application, ApplicationStatus } from '../types';
import { getApplication, updateApplicationStatus as updateStatus, uploadApplicationDocument } from '../api';

export const useApplication = (applicationId?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [application, setApplication] = useState<Application | null>(null);

  const fetchApplication = useCallback(async () => {
    if (!applicationId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getApplication(applicationId);
      setApplication(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch application'));
    } finally {
      setLoading(false);
    }
  }, [applicationId]);

  const updateApplicationStatus = useCallback(async (status: ApplicationStatus) => {
    if (!applicationId) return;

    setLoading(true);
    setError(null);

    try {
      const updatedApplication = await updateStatus(applicationId, status);
      setApplication(updatedApplication);
      return updatedApplication;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update status'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [applicationId]);

  const uploadDocument = useCallback(async (type: string, file: File) => {
    if (!applicationId) return;

    setLoading(true);
    setError(null);

    try {
      const documentUrl = await uploadApplicationDocument(applicationId, type, file);
      return documentUrl;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to upload document'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [applicationId]);

  return {
    application,
    loading,
    error,
    fetchApplication,
    updateStatus: updateApplicationStatus,
    uploadDocument,
  };
};
