
import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading Library..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4" role="status" aria-label="Loading content">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div>
      <p className="text-lg text-slate-600">{message}</p>
    </div>
  );
};

export default LoadingSpinner;