/**
 * @fileoverview InsightCard component that displays business insights
 * with clickable KPI metrics that show detailed charts in a dialog.
 */
import React, { useRef, useEffect, useState } from "react";
import { InsightKPIData, InsightData } from "../../lib/types";
import { InsightKPI } from "./insights";

/**
 * Props for the InsightCard component
 * 
 * @interface
 * @property {InsightData} insight - The insight data to display
 * @property {(page: number, insightId?: string) => void} [onNavigate] - Optional callback for navigation
 * @property {string} [tileColor] - Optional color from parent tile to theme the card
 */
interface InsightCardProps {
  insight: InsightData;
  onNavigate?: (page: number, insightId?: string) => void;
  tileColor?: string;
}

/**
 * Map of colors for different KPI types
 */
const kpiColors: Record<string, string> = {
  "market": "rgba(255, 0, 68, 0.25)",       // Red
  "growth": "rgba(0, 112, 243, 0.25)",      // Blue
  "revenue": "rgba(255, 156, 0, 0.25)",     // Orange
  "satisfaction": "rgba(123, 97, 255, 0.25)", // Purple
  "sentiment": "rgba(0, 183, 74, 0.25)"     // Green
};

/**
 * Determines the color for a KPI based on its ID
 */
const getKpiColor = (kpiId: number): string => {
  // Convert to string for comparison and get the first part before any numbers
  const idStr = String(kpiId);
  const type = idStr.replace(/[0-9]/g, '');
  
  // Check for keywords in the ID string
  for (const key of Object.keys(kpiColors)) {
    if (idStr.includes(key)) {
      return kpiColors[key];
    }
  }
  
  // Default color if no match found
  return "rgba(255, 0, 68, 0.25)";
};

/**
 * Gets a contrasting inner gradient for an insight based on its ID type
 * These are designed to be distinct from but complement the outer tile gradients
 */
const getCardGradient = (insightId: number, tileColor?: string): string => {
  // If a tile color is provided, use it to create a themed gradient
  if (tileColor) {
    // Create a light mode version for the gradient
    return `linear-gradient(135deg, #ffffff, #f5f5f5), linear-gradient(135deg, ${tileColor}15, ${tileColor}05)`;
  }
  
  const idStr = String(insightId);
  
  if (idStr.includes('market')) {
    return 'linear-gradient(135deg, #ffffff, #f1f5f9)'; // Light slate inner gradient
  } else if (idStr.includes('revenue')) {
    return 'linear-gradient(135deg, #ffffff, #eef2ff)'; // White to light indigo
  } else if (idStr.includes('growth')) {
    return 'linear-gradient(135deg, #f8fafc, #e0f2fe)'; // Light slate to light blue
  } else if (idStr.includes('satisfaction')) {
    return 'linear-gradient(135deg, #ffffff, #f5f3ff)'; // White to light purple
  } else if (idStr.includes('sentiment')) {
    return 'linear-gradient(135deg, #f8fafc, #ecfdf5)'; // Light slate to light emerald
  }
  
  // Default gradient with subtle shine effect
  return 'linear-gradient(135deg, #ffffff, #f8fafc)';
};

/**
 * InsightCard component that displays an insight with clickable KPI metrics
 * 
 * @param {InsightCardProps} props - Component props
 * @returns {JSX.Element} The rendered InsightCard component
 */
const InsightCard: React.FC<InsightCardProps> = ({ insight, onNavigate, tileColor }) => {
  // Reference to track dialog state
  const dialogOpenRef = useRef(false);
  
  // State to track screen size for responsive scaling
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Calculate size factors based on screen size
  const isLargeScreen = screenSize.width >= 1280; // xl breakpoint
  const isMediumScreen = screenSize.width >= 768 && screenSize.width < 1280; // md to lg
  
  // Calculate text size based on title length - simpler approach to avoid flickering
  const titleLength = insight.title.length;
  let fontSizeTitle;
  
  if (isLargeScreen) {
    fontSizeTitle = titleLength > 30 ? 'text-xs' : 'text-sm';
  } else if (isMediumScreen) {
    fontSizeTitle = titleLength > 20 ? 'text-[10px]' : 'text-xs';
  } else {
    fontSizeTitle = titleLength > 15 ? 'text-[8px]' : 'text-[10px]';
  }
  
  const paddingY = isLargeScreen ? 'py-1' : isMediumScreen ? 'py-0.75' : 'py-0.5';
  const paddingX = isLargeScreen ? 'px-3' : isMediumScreen ? 'px-2' : 'px-1.5';
  const gapSize = isLargeScreen ? 'gap-2' : isMediumScreen ? 'gap-1.5' : 'gap-1';
  
  // Fixed height for the title - keeping it minimal
  const titleHeight = isLargeScreen ? 'h-5' : isMediumScreen ? 'h-4.5' : 'h-4';
  
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only navigate if dialog is not open and onNavigate is provided
    if (!dialogOpenRef.current && onNavigate) {
      e.stopPropagation(); // Prevent event bubbling just in case
      
      // Map insight IDs to appropriate target insights
      let insightCategory: string | undefined;
      if (insight.id === 2 || insight.id === 21) {
        insightCategory = "brand_awareness";
      } else if (insight.id === 1) {
        insightCategory = "market_share";
      } else if (insight.id === 5 || insight.id === 51) {
        insightCategory = "market_performance";
      } else if (insight.id === 8 || insight.id === 81 || insight.id === 82) {
        insightCategory = "customer_engagement";
      }
      
      // Navigate via URL to the archive with the insight category
      if (insightCategory) {
        window.location.href = `/archive/insight#${insightCategory}`;
      } else {
        window.location.href = '/archive'; // Fallback to main archive if no category
      }
    }
  };
  
  // Get appropriate gradient based on insight ID and tile color
  const backgroundGradient = getCardGradient(insight.id, tileColor);
  
  // Derive hover border color from tile color with higher opacity
  const hoverBorderColor = tileColor ? `${tileColor}80` : 'rgba(99, 102, 241, 0.8)';
  
  return (
    <div 
      className={`${paddingX} ${paddingY} border border-gray-200 rounded-lg shadow-sm cursor-pointer relative group flex flex-col`}
      style={{ 
        background: backgroundGradient,
        pointerEvents: dialogOpenRef.current ? 'none' : 'auto', // Disable pointer events when dialog is open
        borderColor: tileColor ? `${tileColor}30` : 'rgba(203, 213, 225, 0.8)',
        transition: 'border-color 0.15s ease-in-out',
      }}
      onClick={handleCardClick}
    >
      {/* Hover border overlay - absolute positioned to avoid layout shifts */}
      <div 
        className="absolute inset-0 rounded-lg border opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ 
          borderColor: hoverBorderColor,
          borderWidth: '1px',
          transition: 'opacity 0.15s ease-in-out',
        }}
      ></div>
      
      {/* Title section with minimal fixed height - simplified to prevent flickering */}
      <div className={`${titleHeight} flex items-center justify-center mb-1`}>
        <h3 
          className={`${fontSizeTitle} font-semibold text-gray-800 text-center w-full break-words hyphens-auto px-0.5`}
          title={insight.title} // Add tooltip to see full title on hover
          style={{ 
            display: '-webkit-box',
            WebkitLineClamp: isLargeScreen ? 2 : 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxHeight: '100%'
          }}
        >
          {insight.title}
        </h3>
      </div>
      
      {/* KPI container - allows natural wrapping when needed */}
      <div className={`flex flex-row justify-center items-center ${gapSize} flex-wrap`}>
        {insight.kpis.map((kpi) => (
          <InsightKPI 
            key={kpi.id} 
            kpi={kpi} 
            color={tileColor || getKpiColor(kpi.id)}
            onDialogChange={(open) => {
              dialogOpenRef.current = open;
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InsightCard;