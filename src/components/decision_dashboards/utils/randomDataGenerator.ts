/**
 * @fileoverview Utility functions for generating random marketing KPI data
 * 
 * This file provides functions to generate consistent random data for marketing KPIs
 * that can be used to fill empty space in dashboard tiles.
 */

import { useMemo } from 'react';

// Define types for our random data generation
export interface RandomKpiData {
  id: string;
  name: string;
  value: number;
  unit?: string;
  trend?: number;
}

export interface RandomChartData {
  type: string;
  data: any[];
}

export interface RandomTileData {
  id: string;
  title: string;
  section: string;
  kpis: RandomKpiData[];
  chart?: RandomChartData;
}

// Marketing-related KPI templates for random generation
const marketingKpiTemplates = [
  { name: "Conversion Rate", unit: "%", minValue: 1.5, maxValue: 8.5, hasTrend: true },
  { name: "Click-Through Rate", unit: "%", minValue: 0.5, maxValue: 7.2, hasTrend: true },
  { name: "Cost Per Click", unit: "$", minValue: 0.3, maxValue: 5.0, hasTrend: true },
  { name: "Cost Per Acquisition", unit: "$", minValue: 5, maxValue: 120, hasTrend: true },
  { name: "Return On Ad Spend", unit: "x", minValue: 1.2, maxValue: 10.0, hasTrend: true },
  { name: "Engagement Rate", unit: "%", minValue: 1.0, maxValue: 15.0, hasTrend: true },
  { name: "Bounce Rate", unit: "%", minValue: 25, maxValue: 80, hasTrend: true },
  { name: "Average Session Duration", unit: "min", minValue: 1.0, maxValue: 8.5, hasTrend: true },
  { name: "Pages Per Session", unit: "", minValue: 1.2, maxValue: 6.5, hasTrend: true },
  { name: "Email Open Rate", unit: "%", minValue: 12, maxValue: 35, hasTrend: true },
  { name: "Email Click Rate", unit: "%", minValue: 1.5, maxValue: 12, hasTrend: true },
  { name: "Social Media Reach", unit: "K", minValue: 5, maxValue: 500, hasTrend: true },
  { name: "Social Media Engagement", unit: "%", minValue: 0.5, maxValue: 8.5, hasTrend: true },
  { name: "Brand Awareness", unit: "%", minValue: 15, maxValue: 85, hasTrend: true },
  { name: "Customer Satisfaction", unit: "", minValue: 3.0, maxValue: 4.9, hasTrend: true },
  { name: "Net Promoter Score", unit: "", minValue: -20, maxValue: 70, hasTrend: true },
  { name: "Customer Lifetime Value", unit: "$", minValue: 50, maxValue: 5000, hasTrend: true },
  { name: "Churn Rate", unit: "%", minValue: 1, maxValue: 25, hasTrend: true },
  { name: "Organic Traffic Growth", unit: "%", minValue: 5, maxValue: 150, hasTrend: true },
  { name: "Marketing ROI", unit: "%", minValue: 50, maxValue: 400, hasTrend: true },
];

// Tile title templates for marketing data
const marketingTitleTemplates = [
  "Marketing Channel Performance",
  "Campaign Attribution",
  "Content Engagement",
  "Audience Segmentation",
  "Conversion Funnel",
  "Customer Journey Metrics",
  "Digital Marketing KPIs",
  "Social Media Analytics",
  "Email Marketing Performance",
  "SEO Performance",
  "Paid Advertising Results",
  "Landing Page Optimization",
  "Mobile Marketing Metrics",
  "Video Marketing Analytics",
  "Customer Retention Metrics",
  "Influencer Marketing Impact",
  "Marketing Campaign ROI",
  "Brand Sentiment Analysis",
  "Traffic Source Analysis",
  "User Behavior Insights"
];

/**
 * Deterministically generates a random number based on a seed string
 * This ensures the same "random" values are generated for the same inputs
 * 
 * @param seed - String to use as seed for the random number
 * @param index - Optional index for additional variation
 * @returns A deterministic random number between 0 and 1
 */
export const seededRandom = (seed: string, index: number = 0): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i) + index;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Normalize to [0, 1]
  return (Math.abs(hash) / 2147483647);
};

/**
 * Generates a random number within a range based on a seed
 * 
 * @param min - Minimum value
 * @param max - Maximum value
 * @param seed - Seed string for deterministic generation
 * @param index - Optional index for additional variation
 * @returns A random number within the specified range
 */
export const seededRandomInRange = (
  min: number, 
  max: number, 
  seed: string, 
  index: number = 0
): number => {
  const random = seededRandom(`${seed}-${index}`, index);
  return min + random * (max - min);
};

/**
 * Round a number to a specific number of decimal places
 * 
 * @param value - Number to round
 * @param decimals - Number of decimal places
 * @returns Rounded number
 */
export const roundToDecimals = (value: number, decimals: number): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

/**
 * Generate a random KPI value based on a template and section
 * 
 * @param template - KPI template to use
 * @param section - Section for the KPI (used as part of the seed)
 * @param index - Index for variation
 * @returns A random KPI value object
 */
export const generateRandomKPI = (
  template: typeof marketingKpiTemplates[0], 
  section: string, 
  index: number
): RandomKpiData => {
  const seed = `${section}-${template.name}-${index}`;
  const value = seededRandomInRange(template.minValue, template.maxValue, seed);
  
  // Round the value based on the typical precision for this type of metric
  const roundedValue = template.unit === "%" ? 
    roundToDecimals(value, 1) : 
    template.unit === "$" ? 
      roundToDecimals(value, 2) : 
      roundToDecimals(value, 1);
  
  const trend = template.hasTrend ? 
    roundToDecimals(seededRandomInRange(-15, 15, `${seed}-trend`), 1) : 
    undefined;
  
  return {
    id: `random-${template.name.toLowerCase().replace(/\s+/g, '-')}-${index}`,
    name: template.name,
    value: roundedValue,
    unit: template.unit,
    trend
  };
};

/**
 * Generate a random tile data object with KPIs appropriate for the section
 * 
 * @param section - Section ID for the tile
 * @param index - Unique index for the tile
 * @returns A random tile data object
 */
export const generateRandomTile = (section: string, index: number): RandomTileData => {
  // Use deterministic "randomness" based on section and index
  const seed = `${section}-${index}`;
  
  // Select a title template
  const titleIndex = Math.floor(seededRandom(seed) * marketingTitleTemplates.length);
  const title = marketingTitleTemplates[titleIndex];
  
  // Select 1-2 KPI templates
  const kpiCount = seededRandom(`${seed}-kpiCount`) > 0.7 ? 2 : 1;
  const kpis: RandomKpiData[] = [];
  
  for (let i = 0; i < kpiCount; i++) {
    const templateIndex = Math.floor(seededRandom(`${seed}-kpi-${i}`) * marketingKpiTemplates.length);
    const template = marketingKpiTemplates[templateIndex];
    kpis.push(generateRandomKPI(template, section, index + i));
  }
  
  // Don't create charts for these tiles; they're just for KPI display
  return {
    id: `random-${section}-${index}`,
    title,
    section,
    kpis
  };
};

/**
 * React hook that returns memoized random tiles that won't change on refresh
 * 
 * @param section - Section ID
 * @param count - Number of tiles to generate
 * @param seedOffset - Optional offset to create different batches of tiles
 * @returns Array of random tile data objects
 */
export const useRandomTiles = (section: string, count: number, seedOffset: number = 0): RandomTileData[] => {
  return useMemo(() => {
    const tiles: RandomTileData[] = [];
    for (let i = 0; i < count; i++) {
      tiles.push(generateRandomTile(section, i + seedOffset));
    }
    return tiles;
  }, [section, count, seedOffset]);
};