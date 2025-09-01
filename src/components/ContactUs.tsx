/**
 * @fileoverview Contact Us component that displays a footer with contact information in a popover
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ganitLogo from '../assets/ganitinc-logo.svg';

/**
 * ContactUs component properties
 */
interface ContactUsProps {
    className?: string;
}

/**
 * ContactUs component displays a modern footer with contact information in an upward-opening popover
 * 
 * @param {ContactUsProps} props - Component props
 * @returns {JSX.Element} The rendered ContactUs component
 */
const ContactUs: React.FC<ContactUsProps> = ({ className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Toggle the popover visibility
     */
    const togglePopover = () => {
        setIsOpen(!isOpen);
    };

    /**
     * Close the popover
     */
    const closePopover = () => {
        setIsOpen(false);
    };

    return (
        <footer className={`w-full py-4 sm:py-6 md:py-8 mt-6 sm:mt-8 md:mt-12 border-t border-gray-200 bg-gray-50 ${className}`}>
            <div className="container mx-auto px-3 sm:px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo and copyright section */}
                    <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
                        <div className="flex items-center">
                            <img src={ganitLogo} alt="Ganit Logo" className="h-6 sm:h-8 mr-2" />
                            <span className="text-base sm:text-lg font-bold text-gray-800">Decision Boards</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                            © {new Date().getFullYear()} Ganit Inc. All rights reserved.
                        </p>
                    </div>
                    
                    {/* Quick links - hidden on very small screens, condensed on small screens */}
                    <div className="hidden sm:block mb-4 md:mb-0">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Quick Links</h3>
                        <div className="flex flex-wrap gap-2 sm:gap-4">
                            <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600">Privacy</a>
                            <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600">Terms</a>
                            <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600">Docs</a>
                        </div>
                    </div>
                    
                    {/* Contact section - moved slightly to the left on all screen sizes */}
                    <div className="relative md:mr-8">
                        {/* Contact link with hover effect */}
                        <motion.div
                            className="text-xs sm:text-sm text-gray-600 flex items-center justify-center cursor-pointer select-none"
                            whileHover={{ scale: 1.02 }}
                            onClick={togglePopover}
                            onMouseEnter={() => {
                                // Signal the custom cursor that we're hovering over a clickable element
                                const event = new CustomEvent('cursorOverWhite', { detail: false });
                                window.dispatchEvent(event);
                            }}
                            onMouseLeave={() => {
                                const event = new CustomEvent('cursorOverWhite', { detail: true });
                                window.dispatchEvent(event);
                            }}
                        >
                            <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:shadow-lg transition-all">
                                Contact Us
                            </span>
                        </motion.div>

                        {/* Popover with contact information - now opens upward */}
                        <AnimatePresence>
                            {isOpen && (
                                <>
                                    {/* Backdrop to close popover when clicking outside */}
                                    <motion.div
                                        className="fixed inset-0 z-40"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={closePopover}
                                    />

                                    {/* Contact information popover - compact design with smaller font */}
                                    <motion.div
                                        className="absolute z-50 bottom-full mb-3 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 w-64 overflow-hidden"
                                        initial={{ 
                                            opacity: 0, 
                                            y: 10, 
                                            scale: 0.95,
                                            backgroundSize: "200% 200%",
                                            backgroundImage: "linear-gradient(to right, rgba(254, 110, 6, 0.2), rgba(26, 0, 217, 0.2), rgba(255, 255, 255, 0.2))",
                                            backgroundPosition: "200% 100%",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                        animate={{ 
                                            opacity: 1, 
                                            y: 0, 
                                            scale: 1,
                                            backgroundPosition: "0% 0%",
                                            transition: {
                                                opacity: { duration: 0.2 },
                                                y: { duration: 0.2 },
                                                scale: { duration: 0.2 },
                                                backgroundPosition: { 
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    repeatType: "reverse"
                                                }
                                            }
                                        }}
                                        exit={{ 
                                            opacity: 0, 
                                            y: 10, 
                                            scale: 0.95 
                                        }}
                                    >
                                        {/* Arrow pointing down */}
                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-r border-b border-gray-200" />

                                        {/* Close button - redesigned as an X in the top right */}
                                        <motion.button
                                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={closePopover}
                                            aria-label="Close"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </motion.button>

                                        <div className="text-center pt-1">
                                            <h3 className="text-base font-bold text-gray-800 mb-1">Contact Information</h3>
                                            <p className="text-xs text-gray-600 mb-2">Our team is ready to assist you</p>

                                            <div className="space-y-2 text-left px-2">
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="text-gray-700" viewBox="0 0 16 16">
                                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/>
                                                    </svg>
                                                    <a
                                                        href="mailto:decision_board@ganitinc.com"
                                                        className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                                                    >
                                                        decision_board@ganitinc.com
                                                    </a>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="text-gray-700" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                                                    </svg>
                                                    <a
                                                        href="tel:+919840848459"
                                                        className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                                                    >
                                                        +(91) 98408 48459
                                                    </a>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="text-gray-700" viewBox="0 0 16 16">
                                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                                    </svg>
                                                    <p className="text-xs text-gray-600">Mon-Fri, 9AM - 5PM IST</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ContactUs;