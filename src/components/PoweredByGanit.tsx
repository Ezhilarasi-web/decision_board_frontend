/**
 * @fileoverview PoweredByGanit component displays a small "Powered by Ganit" logo in the corner
 */
import React from "react";
import { motion } from "framer-motion";
import ganitLogo from "../assets/ganitinc-logo.svg";

/**
 * Props for the PoweredByGanit component
 * 
 * @interface
 * @property {boolean} [isTranslucent=false] - Whether the component should be rendered with reduced opacity
 */
interface PoweredByGanitProps {
  isTranslucent?: boolean;
}

/**
 * PoweredByGanit component that shows the Ganit branding with animation
 * 
 * @param {PoweredByGanitProps} props - Component props
 * @returns {JSX.Element} The rendered PoweredByGanit component
 */
const PoweredByGanit: React.FC<PoweredByGanitProps> = ({ isTranslucent = false }) => {
  // Calculate base opacity and apply additional translucency if needed
  const baseOpacity = 0.8;
  const finalOpacity = isTranslucent ? 0.3 : baseOpacity;

  return (
    <motion.div 
      className="fixed bottom-2 left-4 flex flex-col items-center text-[11px] px-3 py-1.5 w-[70px] select-none z-[90]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: finalOpacity, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ opacity: isTranslucent ? 0.5 : 1 }} // Still allow hover effect but with adjusted opacity
      style={{
        background: 'linear-gradient(to right, #fe6e06, #1a00d9)',
        borderRadius: '8px',
        padding: '1px',  // This creates the border width
        transition: 'opacity 0.3s ease',
      }}
    >
      <div style={{
        background: 'rgba(249, 250, 251, 0.8)', // Equivalent to bg-gray-100/70
        borderRadius: '7px', // Slightly smaller than parent to show gradient
        width: '100%',
        height: '100%',
        padding: '0.375rem 0.75rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
      }}>
        <span className="text-[11px] text-bold text-[#1a00d9] whitespace-nowrap">Powered by</span>
        <img 
          src={ganitLogo} 
          alt="Ganit Logo" 
          className="w-full h-6 mt-0.5"
        />
      </div>
    </motion.div>
  );
};

export default PoweredByGanit;