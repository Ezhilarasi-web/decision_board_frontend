import React, { memo } from 'react';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { DashboardSection as DashboardSectionType } from './types';
import DashboardTile from './DashboardTile';
import FilterDropdown from './FilterDropdown';
import { sectionPalettes, defaultPalette } from './dashboardPalettes';
import { fullWidthChartTypes } from './utils/dashboardUtils';

// Props for the Dashboard Section component
interface DashboardSectionProps {
  section: DashboardSectionType;
  selectedKPIs: string[];
  setSelectedKPIs: React.Dispatch<React.SetStateAction<string[]>>;
  allKPIIds: string[];
  sectionRef: (el: HTMLDivElement | null) => void;
}

// Memoized dashboard tile to prevent unnecessary re-renders
const MemoizedDashboardTile = memo(DashboardTile);

const DashboardSection: React.FC<DashboardSectionProps> = ({ 
  section, 
  selectedKPIs, 
  setSelectedKPIs,
  allKPIIds,
  sectionRef
}) => {
  return (
    <motion.div
      key={section.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      data-section-id={section.id}
      ref={sectionRef}
    >
      {/* Section Title with Color Indicator - Now Sticky */}
      <div 
        className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm py-3 mb-3 flex items-center justify-between shadow-sm"
        style={{ marginLeft: '-1rem', marginRight: '-1rem', paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        <div className="flex items-center">
          <div 
            className="w-2 h-6 rounded-sm mr-3" 
            style={{ 
              background: sectionPalettes[section.id]?.main || defaultPalette.main
            }}
          ></div>
          <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
        </div>
        
        <FilterDropdown
          allKPIIds={allKPIIds}
          selectedKPIs={selectedKPIs}
          setSelectedKPIs={setSelectedKPIs}
        />
      </div>
      
      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        {/* Initialize tile index counter */}
        {(() => {
          let tileIndex = 0;
          return section.tiles.map((tile) => {
            // Increment tile index for each tile
            const currentIndex = tileIndex++;

            // Determine if this tile needs full width
            const needsFullWidth = tile.chart && fullWidthChartTypes.includes(tile.chart.type);

            // Determine if this tile has no chart
            const hasNoChart = !tile.chart || tile.chart.type === 'none';

            // Calculate grid size: 
            // - full width (12) for wide charts
            // - small width (3) for no-chart tiles
            // - default width (6) for regular charts
            const gridSize = needsFullWidth ? 12 : (hasNoChart ? 3 : 6);

            // Get the section palette or default if not found
            const sectionPalette = sectionPalettes[section.id] || defaultPalette;

            return (
              <Grid item xs={12} md={gridSize} key={tile.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 * (currentIndex % 4) }}
                >
                  <MemoizedDashboardTile
                    data={tile}
                    index={currentIndex}
                    sectionPalette={sectionPalette}
                  />
                </motion.div>
              </Grid>
            );
          });
        })()}
      </Grid>
    </motion.div>
  );
};

export default DashboardSection;