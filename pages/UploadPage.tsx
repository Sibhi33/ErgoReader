import React, { useState, useCallback } from 'react';
import { FileIcon } from '../components/icons/FileIcon';
import { UploadIcon } from '../components/icons/UploadIcon';

interface UploadPageProps {
  onFileUpload: (file: File) => void;
}

const UploadPage: React.FC<UploadPageProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileValidation = (file: File | null): boolean => {
    if (!file) return false;
    if (file.type !== 'application/pdf') {
      setError('Invalid file type. Please upload a PDF file.');
      return false;
    }
    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      setError('File is too large. Please upload a PDF under 10MB.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleFileSelect = (files: FileList | null) => {
    const file = files?.[0];
    if (file && handleFileValidation(file)) {
      onFileUpload(file);
    }
  };

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, isEntering: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEntering);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in-up">
       <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
      `}</style>
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Upload Your Document</h1>
        <p className="mt-3 text-lg text-slate-600">Add a new PDF to your personal library. Files are stored locally in your browser.</p>

        <div
          onDragEnter={(e) => handleDragEvents(e, true)}
          onDragLeave={(e) => handleDragEvents(e, false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`mt-8 w-full border-2 border-dashed rounded-lg p-10 sm:p-16 transition-colors duration-300 ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-slate-300 bg-white'}`}
        >
          <div className="flex flex-col items-center">
            <FileIcon className="w-16 h-16 text-slate-400" />
            <p className="mt-4 font-semibold text-slate-700">
              {isDragging ? 'Drop the file to upload' : 'Drag & drop a PDF here'}
            </p>
            <p className="mt-1 text-sm text-slate-500">or</p>
            <label className="mt-4 inline-flex items-center gap-2 px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer">
              <UploadIcon className="w-5 h-5" />
              Select File
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </label>
            <p className="mt-4 text-xs text-slate-500">Maximum file size: 10MB</p>
          </div>
        </div>
        {error && (
            <div className="mt-4 text-sm text-red-600 bg-red-100 p-3 rounded-md">
                {error}
            </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
