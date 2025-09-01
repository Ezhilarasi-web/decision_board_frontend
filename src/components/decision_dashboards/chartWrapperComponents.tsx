/**
 * @fileoverview Defines wrapper components and utilities for chart visualization in decision dashboards.
 * 
 * This file provides several key components:
 * - ChartErrorBoundary: Catches and handles errors in chart rendering
 * - DataValidationWarning: Shows warnings for fallback data usage
 * - LazyChart: Lazily loads charts based on viewport visibility for performance optimization
 * 
 * The file also exports common chart properties and types for dashboard tiles.
 */

// Re-export abstracted components
export { ChartErrorBoundary } from './components/ChartErrorBoundary';
export { DataValidationWarning } from './components/DataValidationWarning';
export { LazyChart } from './components/LazyChart';
export { KPIOnlyTile, MiniLineChart } from './components/KPIVisualizations';

// Re-export types
export { 
    type DashboardTile,
    type DashboardMiniTile,
    type ChartErrorBoundaryProps 
} from './types/dashboardTypes';

// Re-export utility functions
export { 
    getFriendlyChartName,
    getFallbackData,
    getCommonNivoProps,
    isDoubleTileChart
} from './utils/chartUtils';