import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { dummyData } from '../components/decision_dashboards/data';
import { motion } from 'framer-motion';

// Import extracted components and utilities
import DashboardSection from '../components/decision_dashboards/DashboardSection';
import DashboardSkeleton from '../components/decision_dashboards/DashboardSkeleton';
import { DashboardSection as DashboardSectionType } from '../components/decision_dashboards/types';
import { filterSections, organizeSections, getAllKPIIds } from '../components/decision_dashboards/utils/dashboardUtils';

// Main dashboard component
const DecisionDashboard: React.FC = () => {
  const [sections, setSections] = useState<DashboardSectionType[]>([]);
  const [selectedKPIs, setSelectedKPIs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Create refs for each section and track scroll container
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Fetch dashboard data with pre-loading
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Simulate pre-loading of chart components
        const preloadPromise = new Promise(resolve => {
          // Pre-fetch and pre-parse data
          setTimeout(resolve, 100);
        });

        await preloadPromise;

        // Use the dummy data
        const data = dummyData;
        setSections(data.sections);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Setup scroll handler to initialize section positions
  useEffect(() => {
    if (loading || sections.length === 0) return;

    // Calculate and store section positions for faster lookup during scroll
    const calculateSectionPositions = () => {
      Object.entries(sectionRefs.current).forEach(([id, element]) => {
        if (element && scrollContainerRef.current) {
          // This will ensure all sections are properly tracked
          const rect = element.getBoundingClientRect();
        }
      });
    };
    
    // Initial calculation of section positions
    calculateSectionPositions();
    
    // Set up the resize observer to recalculate positions
    const container = scrollContainerRef.current;
    if (container) {      
      // Recalculate positions on window resize
      const resizeObserver = new ResizeObserver(() => {
        calculateSectionPositions();
      });
      
      resizeObserver.observe(container);
      
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [loading, sections]);

  // Get all unique KPI IDs for filtering - memoized for performance
  const allKPIIds = useMemo(() => getAllKPIIds(sections), [sections]);

  // Filter tiles based on selected KPIs - memoized for performance
  const filteredSections = useMemo(() => 
    filterSections(sections, selectedKPIs),
  [sections, selectedKPIs]);

  // Reorder tiles to ensure small tiles appear in pairs - memoized for performance
  const organizedSections = useMemo(() => 
    organizeSections(filteredSections),
  [filteredSections]);

  // Loading skeleton for better UX
  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div className="flex h-screen mx-auto w-full">
      <div className="w-full h-full relative max-w-[calc(100%-4rem)] mx-auto">
        <div 
          className="w-full h-full overflow-y-auto px-12 pb-8"
          ref={scrollContainerRef}
        >
          {/* Dashboard Sections */}
          <Stack spacing={4} sx={{ pb: 4, pt: 2 }}>
            {organizedSections.map((section) => (
              <DashboardSection
                key={section.id}
                section={section}
                selectedKPIs={selectedKPIs}
                setSelectedKPIs={setSelectedKPIs}
                allKPIIds={allKPIIds}
                sectionRef={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
              />
            ))}
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default DecisionDashboard;