
import React from 'react';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-red-50 border border-red-200 rounded-lg">
      <AlertTriangleIcon className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-2xl font-semibold text-red-800">An Error Occurred</h2>
      <p className="mt-2 text-red-700 max-w-md">{message}</p>
      <button
        onClick={onRetry}
        className="mt-6 inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;
