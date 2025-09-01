/**
 * @fileoverview Types for dashboard tile interfaces and chart components
 */
import { ReactNode } from 'react';

/**
 * Interface defining dashboard tile structure for chart displays
 * 
 * @interface DashboardTile
 * @property {number} id - Unique identifier for the tile
 * @property {string} title - Title displayed on the dashboard tile
 * @property {string} [description] - Optional description of the chart data
 * @property {any} tileProps - Additional properties for the tile container
 * @property {ReactNode} chart - Chart component to render
 * @property {any} chartData - Data to be displayed in the chart
 * @property {string[]} keys - Data keys/series to display in the chart
 * @property {string} indexBy - Property to use as the index for data points
 * @property {Array<{ id: string; name: string; value: number; unit?: string; trend?: number; }>} [kpis] - Optional KPI data for "none" chart type
 * @property {string} [section] - Optional section name for categorizing the tile
 */
export interface DashboardTile {
    id: number;
    title: string;
    description?: string;
    tileProps: any;
    chart: ReactNode;
    chartData: any;
    keys: string[];
    indexBy: string;
    kpis?: Array<{
        id: string;
        name: string;
        value: number;
        unit?: string;
        trend?: number;
    }>;
    section?: string;
}

/**
 * Interface defining mini dashboard tile structure for KPI visualizations
 * 
 * @interface DashboardMiniTile
 * @property {string} metricName - Name of the metric being displayed
 * @property {string} [unit] - Unit of measurement for the metric
 * @property {number[]} values - Array of 4 values to display in the line chart
 * @property {'up' | 'down' | 'flat'} trend - Overall trend direction
 * @property {string} [color] - Optional color for the chart line
 */
export interface DashboardMiniTile {
    metricName: string;
    unit?: string;
    values: number[];
    trend: 'up' | 'down' | 'flat';
    color?: string;
}

/**
 * Props for the ChartErrorBoundary component
 * 
 * @interface ChartErrorBoundaryProps
 * @property {ReactNode} [fallback] - Optional custom fallback UI to display when errors occur
 * @property {ReactNode} children - Chart content to render and monitor for errors
 * @property {string} [chartType] - Optional chart type name for error reporting
 */
export type ChartErrorBoundaryProps = {
    fallback?: ReactNode;
    children: ReactNode;
    chartType?: string
};