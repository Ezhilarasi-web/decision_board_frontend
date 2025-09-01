import { SectionPalette } from './types';

// Define enhanced color palettes for different sections with more distinct colors
export const sectionPalettes: Record<string, SectionPalette> = {
  // Campaign & Channel Efficiency - Blue-Purple Theme
  campaign_channel_efficiency: {
    main: '#4f46e5', // Indigo
    light: '#c7d2fe', // Light indigo
    dark: '#3730a3', // Dark indigo
    gradient: {
      start: '#e0e7ff', // Very light indigo
      end: 'rgba(79, 70, 229, 0.06)' // Super light indigo
    },
    accent: '#4f46e5', // Accent color for smaller elements
    border: 'rgba(79, 70, 229, 0.2)', // Border with transparency
    chartColors: ['#4f46e5', '#818cf8', '#6366f1', '#a5b4fc', '#3730a3']
  },
  
  // Customer Engagement & Conversion - Green Theme
  customer_engagement_conversion: {
    main: '#10b981', // Emerald
    light: '#a7f3d0', // Light emerald
    dark: '#047857', // Dark emerald
    gradient: {
      start: '#d1fae5', // Very light emerald
      end: 'rgba(16, 185, 129, 0.06)' // Super light emerald
    },
    accent: '#10b981', // Accent color
    border: 'rgba(16, 185, 129, 0.2)', // Border with transparency
    chartColors: ['#10b981', '#34d399', '#059669', '#6ee7b7', '#047857']
  },
  
  // Content, Social & Influencer Metrics - Orange Theme
  content_social_influencer_metrics: {
    main: '#f97316', // Orange
    light: '#fed7aa', // Light orange
    dark: '#c2410c', // Dark orange
    gradient: {
      start: '#fff7ed', // Very light orange
      end: 'rgba(249, 115, 22, 0.06)' // Super light orange
    },
    accent: '#f97316', // Accent color
    border: 'rgba(249, 115, 22, 0.2)', // Border with transparency
    chartColors: ['#f97316', '#fb923c', '#ea580c', '#fdba74', '#c2410c']
  },
  
  // Product & Operational Performance - Cyan Theme
  product_operational_performance: {
    main: '#0891b2', // Cyan
    light: '#a5f3fc', // Light cyan
    dark: '#0e7490', // Dark cyan
    gradient: {
      start: '#ecfeff', // Very light cyan
      end: 'rgba(8, 145, 178, 0.06)' // Super light cyan
    },
    accent: '#0891b2', // Accent color
    border: 'rgba(8, 145, 178, 0.2)', // Border with transparency
    chartColors: ['#0891b2', '#06b6d4', '#0e7490', '#67e8f9', '#155e75']
  }
};

// Backup palette for missing section references
export const defaultPalette: SectionPalette = {
  main: '#1a00d9', // Dark blue
  light: '#5e9eff', // Medium blue
  dark: '#0b0065', // Darker blue
  gradient: {
    start: '#dbeaff', // Light blue
    end: 'rgba(26, 0, 217, 0.05)' // Super light blue
  },
  accent: '#1a00d9', // Accent color
  border: 'rgba(26, 0, 217, 0.2)', // Border with transparency
  chartColors: ['#1a00d9', '#5e9eff', '#0b0065', '#dbeaff', '#3822e3']
};