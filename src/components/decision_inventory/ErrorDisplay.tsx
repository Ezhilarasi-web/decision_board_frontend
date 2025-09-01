/**
 * @fileoverview ErrorDisplay component that renders an error message in the flowchart
 * when something goes wrong during data loading or processing.
 */
import React from 'react';

/**
 * Props for the ErrorDisplay component
 * 
 * @interface
 * @property {string} message - The error message to display
 */
interface ErrorDisplayProps {
  message: string;
}

/**
 * ErrorDisplay component renders a visually distinct error message
 * in a semi-transparent red container for visibility against dark backgrounds.
 * 
 * @param {ErrorDisplayProps} props - Component props
 * @returns {JSX.Element} The rendered error display component
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-red-500/20 p-4 rounded-lg border border-red-500">
        <p className="text-white">{message}</p>
      </div>
    </div>
  );
};

export default ErrorDisplay; 