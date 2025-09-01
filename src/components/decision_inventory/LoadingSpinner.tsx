import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = '', 
  size = 'sm',
}) => {
  const spinnerSize = size === 'sm' ? 'h-12 w-12' : 'h-16 w-16 mb-4';
  
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className={`animate-spin rounded-full ${spinnerSize} border-t-2 border-b-2 border-blue-500`}></div>
      {message && <p className="text-white text-xl">{message}</p>}
    </div>
  );
};

export default LoadingSpinner; 