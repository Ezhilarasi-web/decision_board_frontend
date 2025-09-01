import { DashboardSection, DashboardTileData } from '../types';

/**
 * Filters sections based on selected KPIs
 * @param sections All dashboard sections
 * @param selectedKPIs Array of selected KPI IDs
 * @returns Filtered sections
 */
export const filterSections = (
  sections: DashboardSection[],
  selectedKPIs: string[]
): DashboardSection[] => {
  if (selectedKPIs.length === 0) return sections;

  return sections
    .map(section => ({
      ...section,
      tiles: section.tiles.filter(tile =>
        tile.kpis.some(kpi => selectedKPIs.includes(kpi.id))
      ),
    }))
    .filter(section => section.tiles.length > 0);
};

/**
 * Determines which chart types require full width display
 */
export const fullWidthChartTypes = [
  'voronoi', 'calendar', 'waffle', 'bullet', 'treemap', 'geomap',
  'time-range', 'bump', 'area-bump', 'radar', 'scatter-plot',
  'parallel-coordinates', 'marimekko', 'box-plot', 'stream',
  'bar', 'sankey', 'choropleth', 'swarm-plot', 'radial-bar',
  'line', 'tree', 'heatmap'
];

/**
 * Organizes dashboard tiles to ensure proper layout with full width and small tiles
 * @param sections Filtered dashboard sections
 * @returns Reorganized sections with optimized tile ordering
 */
export const organizeSections = (
  sections: DashboardSection[]
): DashboardSection[] => {
  return sections.map(section => {
    // Deep clone the section to avoid mutating the original data
    const newSection = { ...section, tiles: [...section.tiles] };
    
    // Identify which tiles are full-width (double) and which are not
    const fullWidthTiles: DashboardTileData[] = [];
    const regularTiles: DashboardTileData[] = [];
    const smallTiles: DashboardTileData[] = [];
    
    newSection.tiles.forEach(tile => {
      // Check if tile needs full width
      const needsFullWidth = tile.chart && fullWidthChartTypes.includes(tile.chart.type);
      
      // Check if tile has no chart (small tile)
      const hasNoChart = !tile.chart || tile.chart.type === 'none';
      
      // Ensuring tiles are in their correct section
      // Override the section value to ensure consistency
      const tileCopy = { ...tile, section: section.id };
      
      if (needsFullWidth) {
        fullWidthTiles.push(tileCopy);
      } else if (hasNoChart) {
        smallTiles.push(tileCopy);
      } else {
        regularTiles.push(tileCopy);
      }
    });
    
    // Prepare the new ordered tiles array
    const orderedTiles: DashboardTileData[] = [];
    
    // Helper to add a pair of tiles or insert a full width tile between pairs
    const processRemainingTiles = (tiles: DashboardTileData[], fullWidthPool: DashboardTileData[]) => {
      // Process tiles in pairs
      let i = 0;
      while (i < tiles.length) {
        // Add a pair of tiles
        if (i + 1 < tiles.length) {
          // We have a pair
          orderedTiles.push(tiles[i], tiles[i+1]);
          i += 2;
        } else {
          // We have a single tile remaining
          orderedTiles.push(tiles[i]);
          i += 1;
        }
        
        // Insert a full width tile between pairs if available
        if (fullWidthPool.length > 0 && i < tiles.length) {
          orderedTiles.push(fullWidthPool.shift()!);
        }
      }
    };
    
    // First, handle small tiles (no-chart tiles) in pairs
    processRemainingTiles(smallTiles, []);
    
    // Next, handle regular tiles (medium width) in pairs
    processRemainingTiles(regularTiles, fullWidthTiles);
    
    // Add any remaining full width tiles
    orderedTiles.push(...fullWidthTiles);
    
    return {
      ...newSection,
      tiles: orderedTiles
    };
  });
};

/**
 * Extract all unique KPI IDs from dashboard sections
 * @param sections Dashboard sections
 * @returns Array of unique KPI IDs
 */
export const getAllKPIIds = (sections: DashboardSection[]): string[] => {
  const ids = new Set<string>();
  sections.forEach(section => {
    section.tiles.forEach(tile => {
      tile.kpis.forEach(kpi => ids.add(kpi.id));
    });
  });
  return Array.from(ids);
};