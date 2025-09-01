/**
 * @fileoverview PageTransition component that provides navigation controls
 * for moving between pages/sections of the application.
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Props for the PageTransition component
 * 
 * @interface
 * @property {number} currentPage - Index of the currently active page
 * @property {number} totalPages - Total number of pages in the application
 * @property {Function} onNextPage - Callback function for navigating to the next page
 * @property {Function} onPrevPage - Callback function for navigating to the previous page
 * @property {boolean} [isStartButton=false] - Whether the component is being used as a start button
 * @property {boolean} [isIntersectingFooter=false] - Whether the component is intersecting with the footer
 */
interface PageTransitionProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  isStartButton?: boolean;
  isIntersectingFooter?: boolean;
}

/**
 * PageTransition component provides floating navigation buttons for moving
 * between pages with animated transitions and context-aware functionality.
 * 
 * @param {PageTransitionProps} props - Component props
 * @returns {JSX.Element} The rendered PageTransition component
 */
const PageTransition: React.FC<PageTransitionProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  isStartButton = false,
  isIntersectingFooter = false,
}) => {
  // Local state for button opacity to handle transitions better
  const [buttonOpacity, setButtonOpacity] = useState(1);
  
  /**
   * Determines if the up navigation button should be displayed
   * (only visible on pages after the first page)
   */
  const isNavigatingUp = currentPage > 1;
  
  /**
   * Determines if the down/next navigation button should be displayed
   * (only visible when there are more pages to navigate to)
   */
  const hasNextPage = currentPage < totalPages;
  
  /**
   * Special case flag for the decision library page
   */
  const isDecisionLibrary = currentPage === 2;

  // Update button opacity when the intersection state changes or on page transitions
  useEffect(() => {
    // Reset opacity first on page changes to avoid persistence
    setButtonOpacity(1);
    
    // Small delay to ensure page content has loaded before applying footer intersection
    const timer = setTimeout(() => {
      setButtonOpacity(isIntersectingFooter ? 0.4 : 1);
    }, 150);
    
    return () => clearTimeout(timer);
  }, [isIntersectingFooter, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      // Dispatch custom event before navigation
      window.dispatchEvent(new CustomEvent('pageTransitionClick'));
      onNextPage();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      // Dispatch custom event before navigation
      window.dispatchEvent(new CustomEvent('pageTransitionClick'));
      onPrevPage();
    }
  };

  return (
    <motion.div
      className="fixed bottom-10 right-11 z-50 flex flex-col gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Previous page button - only shown when not on the first page */}
      {isNavigatingUp && (
        <motion.button
          onClick={handlePrevPage}
          className="w-5 h-5 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 bg-gradient-to-br from-[#fe6e06]/90 to-[#1a00d9]/90 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(255,156,77,0.4)] border border-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous page"
          style={{ opacity: buttonOpacity, transition: 'opacity 0.3s ease' }}
        >
          <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </motion.button>
      )}
      
      {/* Next page button - only shown when not on the last page */}
      {hasNextPage && (
        <motion.button
          onClick={handleNextPage}
          className="w-5 h-5 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 bg-gradient-to-br from-[#1a00d9]/90 to-[#fe6e06]/90 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(63,44,255,0.4)] border border-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next page"
          style={{ opacity: buttonOpacity, transition: 'opacity 0.3s ease' }}
        >
          <ChevronDown className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
        </motion.button>
      )}
    </motion.div>
  );
};

export default PageTransition;