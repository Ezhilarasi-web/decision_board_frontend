/**
 * @fileoverview PageNavbar component that provides navigation between different
 * pages/sections of the application in a stylized sidebar.
 */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Library, GitBranch, AlertTriangle, LayoutDashboard, LayoutGrid } from "lucide-react";

/**
 * Props for the PageNavbar component
 * 
 * @interface
 * @property {number} currentPage - The index of the currently active page
 * @property {number} totalPages - The total number of available pages
 * @property {function} onNavigate - Callback function that handles navigation to a page
 */
interface PageNavbarProps {
  currentPage: number;
  totalPages: number;
  onNavigate: (page: number) => void;
}

/**
 * PageNavbar component that displays an animated sidebar with navigation icons
 * and labels for different application pages.
 * 
 * @param {PageNavbarProps} props - Component props
 * @returns {JSX.Element} The rendered PageNavbar component
 */
const PageNavbar: React.FC<PageNavbarProps> = ({ 
  currentPage, 
  totalPages,
  onNavigate
}) => {
  /**
   * State to track if the navbar is expanded to show page labels
   */
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Array of page definitions with their IDs, names, and icons
   */
  const pages = [
    { id: 1, name: "Overview", icon: <LayoutGrid size={16} /> },
    { id: 2, name: "Decision Insights", icon: <BrainCircuit size={16} /> },
    { id: 3, name: "Exception Tracking", icon: <AlertTriangle size={16} /> },
    { id: 4, name: "Decision Archive", icon: <Library size={16} /> },
    { id: 5, name: "Dashboards", icon: <LayoutDashboard size={16} /> },
    { id: 6, name: "Decision Inventory", icon: <GitBranch size={16} /> }
  ];

  return (
    <motion.div 
      className="fixed right-5 md:right-10 top-1/2 transform -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <motion.div 
        className={`bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg overflow-hidden shadow-md p-1.5 ${isExpanded ? 'w-[18rem] md:w-[20rem]' : 'w-[3.5rem] md:w-[4.2rem]'}`}
        animate={{ width: isExpanded ? "18rem" : "3.5rem" }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex flex-col space-y-2">
          {pages.map((page) => (
            <motion.div 
              key={page.id}
              className={`flex items-center justify-${isExpanded ? 'start' : 'center'} cursor-pointer p-1 rounded-lg transition-all duration-200 ${
                page.id === currentPage 
                  ? 'bg-gradient-to-r from-[#fe6e06]/10 to-[#1a00d9]/10' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onNavigate(page.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Icon container with conditional styling */}
              <motion.div 
                className={`w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center ${isExpanded ? 'mr-2' : 'mr-0'} ${
                  page.id === currentPage 
                    ? 'bg-gradient-to-br from-[#fe6e06] to-[#1a00d9]' 
                    : 'bg-gray-100'
                }`}
                whileHover={{ rotate: page.id === currentPage ? 0 : 5 }}
              >
                <span className={`${page.id === currentPage ? 'text-white' : 'text-gray-700'}`}>
                  {page.icon}
                </span>
              </motion.div>
              
              {/* Page label (only visible when expanded) */}
              {isExpanded && (
                <motion.div 
                  className="text-gray-800 font-medium text-sm md:text-md whitespace-nowrap overflow-hidden text-ellipsis"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ duration: 0.2 }}
                >
                  {page.name}
                </motion.div>
              )}
              
              {/* Active page indicator (only visible when expanded) */}
              {page.id === currentPage && isExpanded && (
                <motion.div 
                  className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-[#fe6e06] to-[#1a00d9] ml-auto"
                  layoutId="activeIndicator"
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PageNavbar;