/**
 * @fileoverview LandingPage component that serves as the entry point for the application,
 * featuring an animated title, tagline, and start button.
 */
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import landingBackground from "../assets/landing_background.mp4";

/**
 * Props for the LandingPage component
 * 
 * @interface
 * @property {Function} onStartClick - Callback function triggered when the user clicks the start button
 */
interface LandingPageProps {
  onStartClick: () => void;
}

/**
 * LandingPage component with animated elements and background video
 * 
 * @param {LandingPageProps} props - Component props
 * @returns {JSX.Element} The rendered LandingPage component
 */
const LandingPage: React.FC<LandingPageProps> = ({ onStartClick }) => {
  /**
   * Changes cursor color to inverted (colored gradient) for dark elements
   * Dispatches a custom event for the CustomCursor component
   */
  const setCursorBlack = () => {
    const event = new CustomEvent('cursorOverWhite', { detail: false });
    window.dispatchEvent(event);
  };

  /**
   * Changes cursor color to default (black) for light backgrounds
   * Dispatches a custom event for the CustomCursor component
   */
  const setCursorWhite = () => {
    const event = new CustomEvent('cursorOverWhite', { detail: true });
    window.dispatchEvent(event);
  };

  /**
   * Sets initial cursor color and ensures it resets on component unmount
   */
  useEffect(() => {
    setCursorWhite(); // Set initial cursor color to black for light background
    return () => setCursorWhite(); // Reset on unmount
  }, []);

  return (
    <motion.div
      className="h-screen w-screen flex flex-col items-center justify-center bg-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
        delay: 0.5
      }}
    >
      {/* Video Background - smaller and centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <video
          className="w-[640px] h-[360px] object-cover opacity-40 rounded-lg"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={landingBackground} type="video/mp4" />
        </video>
      </div>

      <motion.div
        className="space-y-8 text-center z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-6xl font-bold bg-gradient-to-r from-[#fe6e06] to-[#1a00d9] text-transparent bg-clip-text"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={setCursorBlack}
          onMouseLeave={setCursorWhite}
        >
          Decision Board
        </motion.h1>
        <motion.p
          className="text-xl text-gray-700 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Monitor your decisions, not just your KPIs
        </motion.p>
      </motion.div>

      <PageTransition
        currentPage={0}
        totalPages={3}
        onNextPage={onStartClick}
        onPrevPage={() => { }}
        isStartButton={true}
      />
    </motion.div>
  );
};

export default LandingPage; 