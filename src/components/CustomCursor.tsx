/**
 * @fileoverview CustomCursor component that replaces the default cursor with a
 * custom triangle shape that changes color based on context.
 */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Props for the CustomCursor component
 * 
 * @interface
 * @property {boolean} [isHoveringWhite=false] - Whether the cursor is hovering over a white/light element
 *                                             which requires a different cursor color
 */
interface CustomCursorProps {
  isHoveringWhite?: boolean;
}

/**
 * CustomCursor component that follows the mouse and changes appearance based on context
 * 
 * @param {CustomCursorProps} props - Component props
 * @returns {JSX.Element} The rendered CustomCursor component
 */
const CustomCursor: React.FC<CustomCursorProps> = ({ isHoveringWhite = false }) => {
  /**
   * State to track the current mouse position
   */
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  /**
   * Set up mouse position tracking on component mount
   */
  useEffect(() => {
    /**
     * Updates the mouse position state when the mouse moves
     * 
     * @param {MouseEvent} e - The mouse move event
     */
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Add event listener for mouse movement
    window.addEventListener('mousemove', updateMousePosition);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        x: mousePosition.x - 8,
        y: mousePosition.y - 8,
      }}
    >
      <div
        style={{
          width: '16px',
          height: '16px',
          transform: 'rotate(-15deg)',
          backgroundImage: isHoveringWhite 
            ? 'linear-gradient(135deg, #000000, #333333)' 
            : 'linear-gradient(135deg, #3f2cff, #ff9d4d)',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }}
      />
    </motion.div>
  );
};

export default CustomCursor; 