/**
 * @fileoverview FitViewButton component that provides a button to fit the
 * flowchart view to display all nodes optimally in the viewport.
 */
import React from 'react';
import { useReactFlow } from 'reactflow';
import { calculateDirectionalPadding } from './utils';

/**
 * Props for the FitViewButton component
 * 
 * @interface
 * @property {string} [className] - Optional additional CSS class names to apply to the button
 */
interface FitViewButtonProps {
  className?: string;
}

/**
 * FitViewButton provides a UI button that adjusts the viewport to optimally
 * display all nodes in the flowchart when clicked.
 * 
 * @param {FitViewButtonProps} props - Component props
 * @returns {JSX.Element} The rendered button component
 */
const FitViewButton: React.FC<FitViewButtonProps> = ({ className = '' }) => {
  const { getNodes, fitView } = useReactFlow();

  return (
    <button
      className={`w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 ${className}`}
      onClick={() => {
        // Get current nodes and find root node
        const currentNodes = getNodes();
        const rootNode = currentNodes.find(node => node.data.type === 'root');
        
        // Calculate appropriate padding based on node count and root node position
        fitView({ 
          duration: 800, 
          padding: calculateDirectionalPadding(currentNodes.length, rootNode || null) 
        });
      }}
      title="Fit View"
    >
      {/* Expand icon SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a192b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
      </svg>
    </button>
  );
};

export default FitViewButton; 