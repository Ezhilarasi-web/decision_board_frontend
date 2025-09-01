/**
 * @fileoverview Main App component that manages navigation between different pages,
 * handles page transitions, and controls the cursor state.
 */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DecisionBoard from "./pages/DecisionArchive";
import DecisionInsights from "./pages/DecisionInsights";
import ExceptionTracking from "./pages/ExceptionTracking";
import DecisionDashboard from "./pages/DecisionDashboard";
import PageNavbar from "./components/PageNavbar";
import PageTransition from "./components/PageTransition";
import CustomCursor from "./components/CustomCursor";
import { UserNav } from "./components/UserNav";
import ContactUs from "./components/ContactUs";
import PoweredByGanit from "./components/PoweredByGanit";
import ReactFlowchartUpdated from "./pages/DecisionInventory";
import clientLogo from "./assets/client-logo.jpg";
import Overview from "./pages/Overview";
import "./App.css";

/**
 * Total number of pages in the application
 */
const TOTAL_PAGES = 6;

/**
 * Page definitions with their titles, descriptions, and paths
 */
const PAGES = [
  { 
    id: 1, 
    title: "Overview", 
    description: "High-level view of decisions and performance",
    path: "/overview"
  },
  { 
    id: 2, 
    title: "Decision Insights", 
    description: "AI-driven analytics and recommendations",
    path: "/insights"
  },
  { 
    id: 3, 
    title: "Exception Tracking", 
    description: "Monitor and resolve decision anomalies",
    path: "/exceptions"
  },
  { 
    id: 4, 
    title: "Decision Archive", 
    description: "Historical record of all decisions",
    path: "/archive"
  },
  { 
    id: 5, 
    title: "Dashboards", 
    description: "Key metrics and performance indicators",
    path: "/dashboards"
  },
  { 
    id: 6, 
    title: "Decision Inventory", 
    description: "Visual mapping of decision flows",
    path: "/inventory"
  },
];

/**
 * Main App component that sets up routing
 * 
 * @returns {JSX.Element} The rendered App component
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/overview" element={<AppContent initialPage={1} />} />
        <Route path="/insights" element={<AppContent initialPage={2} />} />
        <Route path="/exceptions" element={<AppContent initialPage={3} />} />
        <Route path="/archive" element={<AppContent initialPage={4} />} />
        <Route path="/archive/quarter" element={<AppContent initialPage={4} viewMode="quarter" />} />
        <Route path="/archive/insight" element={<AppContent initialPage={4} viewMode="insight" />} />
        <Route path="/archive/insight/:insightId" element={<AppContent initialPage={4} viewMode="insight" />} />
        <Route path="/dashboards" element={<AppContent initialPage={5} />} />
        <Route path="/inventory" element={<AppContent initialPage={6} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

/**
 * AppContent component serves as the main application container and manages navigation state
 * 
 * @param {Object} props - Component props
 * @param {number} [props.initialPage] - Initial page ID to display
 * @param {string} [props.viewMode] - View mode for specific pages (e.g., "quarter" or "insight" for archive)
 * @returns {JSX.Element} The rendered AppContent component
 */
function AppContent({ initialPage, viewMode }: { initialPage?: number, viewMode?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Always start with the landing page shown if we're at the root path
  const [showLanding, setShowLanding] = useState(location.pathname === "/");
  const [currentPage, setCurrentPage] = useState(initialPage || 2);
  const [isHoveringWhite, setIsHoveringWhite] = useState(false);
  
  // State to track footer intersection
  const [isIntersectingFooter, setIsIntersectingFooter] = useState(false);
  
  // State to force remounts of components when navigating to the same page
  const [navigationKey, setNavigationKey] = useState(Date.now());
  
  // References to elements for intersection observation
  const footerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Extract insight ID from URL parameters or hash
  const { pathname, hash } = location;
  
  // If the path contains an insight ID parameter, use that
  let insightId = pathname.startsWith('/archive/insight/') ? pathname.split('/').pop() : undefined;
  
  // If there's a hash in the URL and no insight ID from the path, use the hash value 
  // (removing the # symbol)
  if (!insightId && hash && hash.length > 1) {
    insightId = hash.substring(1);
  }
  
  // Update the current page when route changes
  useEffect(() => {
    if (initialPage) {
      setCurrentPage(initialPage);
      setShowLanding(false);
    }
  }, [initialPage]);

  // Function to check intersection with better timing management
  const checkIntersection = useCallback((entries?: IntersectionObserverEntry[]) => {
    // Reset intersection state when page changes first
    if (!entries) {
      setIsIntersectingFooter(false);
      return;
    }

    // If entries are provided (from observer), use them
    if (entries && entries.length > 0) {
      setIsIntersectingFooter(entries[0].isIntersecting);
    }
  }, []);

  // Set up intersection observer to detect when footer is visible with proper cleanup
  useEffect(() => {
    // Reset intersection state when page changes
    setIsIntersectingFooter(false);
    
    // Wait for content to be fully rendered before setting up observer
    const setupObserver = () => {
      if (!footerRef.current) return;

      // Disconnect previous observer if it exists
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // Create an observer with specific options for better trigger control
      observerRef.current = new IntersectionObserver(
        checkIntersection,
        { 
          // Root margin adds a buffer above the footer to trigger earlier
          // Negative bottom margin ensures it only triggers when nearing the footer from above
          rootMargin: '0px 0px -50px 0px',
          threshold: 0.1 // Trigger when at least 10% of the footer is visible
        }
      );

      observerRef.current.observe(footerRef.current);
    };

    // Add delay to ensure DOM is ready
    const timerId = setTimeout(setupObserver, 200);

    return () => {
      clearTimeout(timerId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [currentPage, navigationKey, checkIntersection]); 

  // Add event listener to update intersection state after content changes
  useEffect(() => {
    // Function to handle content load or update
    const handleContentChange = () => {
      // Short delay to ensure new content has rendered
      setTimeout(() => {
        if (footerRef.current && observerRef.current) {
          // Manually check initial state
          const rect = footerRef.current.getBoundingClientRect();
          const isVisible = 
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0;
          setIsIntersectingFooter(isVisible);
        }
      }, 250);
    };

    // Listen for navigation events
    window.addEventListener('popstate', handleContentChange);
    window.addEventListener('pageTransitionClick', handleContentChange);
    
    // Call once on mount and page change
    handleContentChange();

    return () => {
      window.removeEventListener('popstate', handleContentChange);
      window.removeEventListener('pageTransitionClick', handleContentChange);
    };
  }, [currentPage, navigationKey]);

  /**
   * Gets the current page info
   */
  const getCurrentPageInfo = () => {
    return PAGES.find(page => page.id === currentPage) || PAGES[0];
  };
  
  /**
   * Handles transition from landing page to main application
   */
  const handleStartClick = () => {
    setShowLanding(false);
    setCurrentPage(1); // Navigate to Overview page first (page 1)
    navigate("/overview");
    // Generate new key to ensure remount
    setNavigationKey(Date.now());
  };
  
  /**
   * Handles navigation back to landing page with smooth transition
   */
  const handleReturnToLanding = () => {
    /**
     * Callback after animation completes to actually change state
     */
    const handleComplete = () => {
      setShowLanding(true);
      navigate("/");
      // Generate new key to ensure remount
      setNavigationKey(Date.now());
    };
    
    // First fade out current content
    const currentContent = document.querySelector(`.page-${currentPage}`);
    if (currentContent) {
      currentContent.classList.add('fade-out');
      setTimeout(handleComplete, 400); // Match with animation duration
    } else {
      handleComplete();
    }
  };

  /**
   * Handles navigation to a specific page
   * 
   * @param {number} page - Page number to navigate to
   */
  const handleNavigate = (page: number) => {
    // Reset footer intersection state when navigating
    setIsIntersectingFooter(false);
    
    // Set the current page
    setCurrentPage(page);
    
    // Update the URL to match the new page
    const targetPage = PAGES.find(p => p.id === page);
    if (targetPage) {
      navigate(targetPage.path);
      // Generate new key to ensure remount
      setNavigationKey(Date.now());
    }
  };

  /**
   * Navigates to the next page if not at the last page
   */
  const handleNextPage = () => {
    if (currentPage < TOTAL_PAGES) {
      // Reset footer intersection state when navigating
      setIsIntersectingFooter(false);
      
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      const targetPage = PAGES.find(p => p.id === nextPage);
      if (targetPage) {
        navigate(targetPage.path);
        // Generate new key to ensure remount
        setNavigationKey(Date.now());
      }
    }
  };

  /**
   * Navigates to the previous page if not at the first page
   */
  const handlePrevPage = () => {
    if (currentPage > 1) {
      // Reset footer intersection state when navigating
      setIsIntersectingFooter(false);
      
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      const targetPage = PAGES.find(p => p.id === prevPage);
      if (targetPage) {
        navigate(targetPage.path);
        // Generate new key to ensure remount
        setNavigationKey(Date.now());
      }
    }
  };

  return (
    <>
      <style>
        {`
          * {
            cursor: none !important;
          }
          
          *:hover {
            cursor: none !important;
          }
          
          button, a, input, select {
            cursor: none !important;
          }
        `}
      </style>
      <CustomCursor isHoveringWhite={isHoveringWhite} />
      <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <AnimatePresence mode="wait">
          {showLanding ? (
            <LandingPage key="landing" onStartClick={handleStartClick} />
          ) : (
            <>
              {/* Header with app title and navigation - reduced height and padding */}
              <motion.header
                className="w-full px-5 py-2.5 flex justify-between items-center bg-white shadow-md z-[100] fixed top-0 left-0 border-b border-gray-200"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3,
                  ease: [0.1, 0.4, 0.2, 1],
                }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleReturnToLanding}
                  >
                    <div className="flex flex-col cursor-pointer">
                      <span className="text-2xl font-bold text-black inline-block relative">
                        {getCurrentPageInfo().title}
                        <span className="block h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#ffa76d] to-[#4f3eff] transition-all duration-300 absolute bottom-0 left-0"></span>
                      </span>
                      <span className="text-xs text-gray-500 mt-0.5">{getCurrentPageInfo().description}</span>
                    </div>
                  </motion.div>
                </div>
                <div className="flex items-center gap-4">
                  <UserNav />
                  <img 
                    src={clientLogo} 
                    alt="Client Logo" 
                    className="h-12 w-12 object-cover rounded-full"
                  />
                </div>
              </motion.header>

              {/* Main content area with reduced padding for smaller fixed header */}
              <div ref={contentRef} className="pt-20 h-screen overflow-y-auto relative flex flex-col">
                <PageNavbar
                  currentPage={currentPage}
                  totalPages={TOTAL_PAGES}
                  onNavigate={handleNavigate}
                />

                {/* Pass isIntersectingFooter to PageTransition */}
                <PageTransition
                  currentPage={currentPage}
                  totalPages={TOTAL_PAGES}
                  onNextPage={handleNextPage}
                  onPrevPage={handlePrevPage}
                  isIntersectingFooter={isIntersectingFooter}
                />

                {/* Page content with transitions */}
                <div className="flex-grow">
                  <AnimatePresence mode="wait">
                    {currentPage === 1 && (
                      <motion.div
                        key={`overview-${navigationKey}`} /* Unique key to force remount */
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full px-8 h-[calc(100vh-7rem)] page-1"
                        onAnimationComplete={() => {
                          // Reset and recheck intersection when animation completes
                          if (footerRef.current && observerRef.current) {
                            checkIntersection();
                          }
                        }}
                      >
                        <Overview />
                      </motion.div>
                    )}

                    {/* The rest of the components remain similar but we'll add onAnimationComplete to each */}
                    {currentPage === 2 && (
                      <motion.div
                        key={`insights-${navigationKey}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full px-8 h-[calc(100vh-7rem)] page-2"
                        onAnimationComplete={() => {
                          if (footerRef.current && observerRef.current) {
                            checkIntersection();
                          }
                        }}
                      >
                        <DecisionInsights onNavigate={handleNavigate} />
                      </motion.div>
                    )}

                    {currentPage === 3 && (
                      <motion.div
                        key={`exception-tracking-${navigationKey}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full px-8 min-h-[calc(100vh-12rem)] page-3"
                        onAnimationComplete={() => {
                          if (footerRef.current && observerRef.current) {
                            checkIntersection();
                          }
                        }}
                      >
                        <ExceptionTracking />
                      </motion.div>
                    )}

                    {currentPage === 4 && (
                      <motion.div
                        key={`decisions-${navigationKey}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full px-8 min-h-[calc(100vh-12rem)] page-4"
                        onAnimationComplete={() => {
                          if (footerRef.current && observerRef.current) {
                            checkIntersection();
                          }
                        }}
                      >
                        <DecisionBoard 
                          cardWidth="72%" 
                          initialGroupingOption={viewMode as "quarter" | "insight" | undefined}
                          targetInsight={insightId}
                        />
                      </motion.div>
                    )}

                    {currentPage === 5 && (
                      <motion.div
                        key={`dashboard-${navigationKey}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full px-8 min-h-[calc(100vh-12rem)] page-5"
                        onAnimationComplete={() => {
                          if (footerRef.current && observerRef.current) {
                            checkIntersection();
                          }
                        }}
                      >
                        <DecisionDashboard />
                      </motion.div>
                    )}

                    {currentPage === 6 && (
                      <motion.div
                        key={`flowchart-${navigationKey}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full px-8 h-[calc(100vh-7rem)] page-6"
                        onAnimationComplete={() => {
                          if (footerRef.current && observerRef.current) {
                            checkIntersection();
                          }
                        }}
                      >
                        <ReactFlowchartUpdated />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer with responsive adjustments and shifted Contact Us button */}
                <div ref={footerRef} className="w-full relative">
                  <ContactUs className="transform-none" />
                </div>
              </div>

              {/* Using the PoweredByGanit component with intersection state */}
              <PoweredByGanit isTranslucent={isIntersectingFooter} />
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
