/**
 * @fileoverview Common types used across multiple components
 */

/**
 * Represents the data structure for an insight KPI with chart data
 */
export type InsightKPIData = {
  id: number;
  label: string;
  chartTitle: string;
  chartType: "bar" | "line" | "area" | "pie" | "stacked" | "bubble" | "heatmap" | "scatter" | "waterfall";
  chartData: any[];
  value?: number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  percent?: number;
};

export type DashboardKPIData = {
  id: number;
  label: string;
  chartTitle: string;
  chartType: 'line' | 'pie' | 'radar' | 'scatter-plot' | 'treemap' | 'stream' | 'bullet' | 'sunburst' | 'calendar' | 'chord' | 'waffle' | 'parallel-coordinates' | 'sankey' | 'voronoi' | 'radial-bar' | 'bump' | 'network' | 'marimekko' | 'tree' | 'box-plot' | 'heatmap' | 'funnel' | 'choropleth' | 'circle-packing' | 'bar' | 'area-bump' | 'time-range' | 'swarm-plot' | 'geo-map';
  chartData: any[];
};

/**
 * Represents the data structure for a business insight
 * 
 * @interface
 * @property {number} id - Unique identifier for the insight
 * @property {string} title - Title describing the insight
 * @property {string} [description] - Optional detailed description
 * @property {InsightKPIData[]} kpis - Array of KPI metrics associated with the insight
 */
export type InsightData = {
  id: number;
  title: string;
  description?: string;
  kpis: InsightKPIData[];
};

/**
 * Represents the data structure for a dashboard insight
 * 
 * @interface
 * @property {number} id - Unique identifier for the insight
 * @property {string} title - Title describing the insight
 * @property {string} [description] - Optional detailed description
 * @property {DashboardKPIData[]} kpis - Array of KPI metrics associated with the insight
 */
export type DashboardInsightData = {
  id: number;
  title: string;
  description?: string;
  kpis: DashboardKPIData[];
};

