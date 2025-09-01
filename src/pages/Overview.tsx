/**
 * @fileoverview Overview component that displays a comprehensive dashboard with decision archive and metrics.
 * 
 * This page consists of two main sections:
 * 1. Left Column: Decision Archive displaying decisions organized by quarter or insight
 * 2. Right Column: Performance metrics including execution excellence and decision performance
 * 
 * The component supports auto-scrolling to a specific insight when provided with a targetInsight prop.
 */
import React, { useRef, useEffect, useLayoutEffect } from "react";
import { 
  DecisionBoardOverview, 
  ExecutionExcellence,
  DecisionPerformance 
} from "../components/overview";

/**
 * Props for the Overview component
 * 
 * @interface OverviewProps
 * @property {string} [targetInsight] - Optional target insight ID to navigate to in Decision Archive
 *                                     Used to auto-scroll to a specific insight section
 */
interface OverviewProps {
  targetInsight?: string;
}

/**
 * Overview component serving as the main dashboard view with multiple sections
 * 
 * The layout consists of two main columns:
 * 1. Left Column: Decision Archive with filtering and grouping options
 * 2. Right Column: Performance metrics divided into two cards
 *    - Execution Excellence (campaign performance, product launch, retail, media)
 *    - Decision Performance (ROI, achievements, quality metrics, impact)
 * 
 * @component
 * @param {OverviewProps} props - Component props
 * @param {string} [props.targetInsight] - Optional insight ID to auto-scroll to
 * @returns {JSX.Element} The rendered Overview component
 */
const Overview: React.FC<OverviewProps> = ({ targetInsight }) => {
  // Reference to the container element
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use the Layout Effect hook to ensure scroll reset happens before paint
  useLayoutEffect(() => {
    // Reset scroll position for both window and container
    window.scrollTo(0, 0);
    
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    
    // Also reset any parent scrollable elements
    const scrollableParents = document.querySelectorAll('.overflow-y-auto');
    scrollableParents.forEach(element => {
      if (element instanceof HTMLElement) {
        element.scrollTop = 0;
      }
    });
    
    // Add listener to page transition events to reset scroll
    const handlePageTransition = () => {
      window.scrollTo(0, 0);
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    };
    
    window.addEventListener('pageTransitionClick', handlePageTransition);
    
    return () => {
      window.removeEventListener('pageTransitionClick', handlePageTransition);
    };
  }, []);

  useEffect(() => {
    // Apply global styles via CSS injection
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Thin scrollbar for all three tiles in overview */
      .overview-scroll::-webkit-scrollbar {
        width: 4px;
      }
      
      .overview-scroll::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.03);
        border-radius: 10px;
      }
      
      .overview-scroll::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
      }
      
      .overview-scroll::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }
      
      /* Unique styles for each scrollbar area */
      .archive-scroll::-webkit-scrollbar-thumb {
        background-color: rgba(79, 70, 229, 0.4);
      }
      
      .execution-scroll::-webkit-scrollbar-thumb {
        background-color: rgba(16, 185, 129, 0.4);
      }
      
      .performance-scroll::-webkit-scrollbar-thumb {
        background-color: rgba(236, 72, 153, 0.4);
      }
    `;
    document.head.appendChild(styleElement);

    // Cleanup function to remove the style element when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[calc(100vh-64px)] flex flex-col md:flex-row gap-4 lg:gap-6 p-4 md:p-6 justify-center overflow-hidden"
    >
      {/* LEFT COLUMN - Decision Archive and Filtering */}
      <div className="w-full md:w-4/9 h-full relative rounded-xl overflow-hidden border border-gray-200 bg-white shadow-md">
        <DecisionBoardOverview cardWidth="90%" targetInsight={targetInsight} customScrollClass="overview-scroll archive-scroll" />
      </div>

      {/* RIGHT COLUMN - Performance Metrics */}
      <div className="w-full md:w-4/9 flex flex-col gap-4 lg:gap-6 h-full">
        {/* Execution Excellence Card - 65% height with custom scrollbar */}
        <div className="h-[65%] overflow-hidden">
          <ExecutionExcellence customScrollClass="overview-scroll execution-scroll" />
        </div>

        {/* Decision Performance Card - 32% height with custom scrollbar */}
        <div className="h-[33%] overflow-hidden">
          <DecisionPerformance customScrollClass="overview-scroll performance-scroll" />
        </div>
      </div>
    </div>
  );
};

export default Overview;