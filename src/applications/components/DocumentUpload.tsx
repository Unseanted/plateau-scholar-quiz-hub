import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { uploadApplicationDocument } from '../api';

interface DocumentUploadProps {
  applicationId: string;
  documentType: string;
  onUploadComplete: (url: string) => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  applicationId,
  documentType,
  onUploadComplete,
}) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      try {
        const url = await uploadApplicationDocument(applicationId, documentType, file);
        onUploadComplete(url);
        toast.success('Document uploaded successfully');
      } catch (error) {
        toast.error('Failed to upload document');
        console.error('Document upload error:', error);
      }
    },
    [applicationId, documentType, onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here...</p>
      ) : (
        <div className="space-y-2">
          <p>Drag & drop a file here, or click to select</p>
          <p className="text-sm text-muted-foreground">
            Supported formats: JPEG, PNG, PDF
          </p>
          <Button type="button" variant="outline">
            Select File
          </Button>
        </div>
      )}
    </div>
  );
};