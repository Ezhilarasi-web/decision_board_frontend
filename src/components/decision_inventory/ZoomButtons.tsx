import React from 'react';
import { useReactFlow } from 'reactflow';

const ZoomButtons: React.FC = () => {
  const { getViewport, setViewport } = useReactFlow();
  
  const handleZoomIn = () => {
    const { zoom } = getViewport();
    setViewport({ x: 0, y: 0, zoom: zoom + 0.4 }, { duration: 800 });
  };
  
  const handleZoomOut = () => {
    const { zoom } = getViewport();
    setViewport({ x: 0, y: 0, zoom: zoom - 0.4 }, { duration: 800 });
  };
  
  return (
    <>
      <button
        className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100"
        onClick={handleZoomIn}
        title="Zoom In"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a192b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </button>
      <button
        className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100"
        onClick={handleZoomOut}
        title="Zoom Out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a192b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </button>
    </>
  );
};

export default ZoomButtons; 