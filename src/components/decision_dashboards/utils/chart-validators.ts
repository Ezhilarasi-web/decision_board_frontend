/**
 * @fileoverview Validation functions for chart data to ensure proper structure and fallback data
 * for all chart types used in the application.
 */

/**
 * Common interface for validation results
 */
export interface ValidationResult<T> {
  data: T;
  usedFallback: boolean;
}

/**
 * Validates and ensures Line chart data has the correct structure
 * 
 * @param {any} data - The line chart data to validate
 * @returns {ValidationResult} Validated and structured line chart data
 */
export function validateLineData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Radar chart data has the correct structure
 * 
 * @param {any} data - The radar chart data to validate
 * @returns {ValidationResult} Validated and structured radar chart data
 */
export function validateRadarData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures ScatterPlot data has the correct structure
 * 
 * @param {any} data - The scatter plot data to validate
 * @returns {ValidationResult} Validated and structured scatter plot data
 */
export function validateScatterData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures TreeMap data has the correct hierarchical structure
 * 
 * @param {any} data - The treemap data to validate
 * @returns {ValidationResult} Validated and structured treemap data
 */
export function validateTreeMapData(data: any): ValidationResult<any> {
  if (!data || typeof data !== 'object' || !data.name) {
    return {
      data: { name: "root", children: [] },
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Stream chart data has the correct structure
 * 
 * @param {any} data - The stream chart data to validate
 * @returns {ValidationResult} Validated and structured stream chart data
 */
export function validateStreamData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Bullet chart data has the correct structure
 * 
 * @param {any} data - The bullet chart data to validate
 * @returns {ValidationResult} Validated and structured bullet chart data
 */
export function validateBulletData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Sunburst data has the correct hierarchical structure
 * 
 * @param {any} data - The sunburst data to validate
 * @returns {ValidationResult} Validated and structured sunburst data
 */
export function validateSunburstData(data: any): ValidationResult<any> {
  if (!data || typeof data !== 'object' || !data.name) {
    return {
      data: { name: "root", children: [] },
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Calendar data has the correct structure
 * 
 * @param {any} data - The calendar data to validate
 * @returns {ValidationResult} Validated and structured calendar data
 */
export function validateCalendarData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Chord chart data has correct matrix and keys
 * 
 * @param {any} data - The chord data to validate
 * @returns {ValidationResult} Validated and structured chord data
 */
export function validateChordData(data: any): ValidationResult<any> {
  if (!data || !Array.isArray(data)) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Waffle chart data has correct structure
 * 
 * @param {any} data - The waffle data to validate
 * @returns {ValidationResult} Validated and structured waffle data
 */
export function validateWaffleData(data: any): ValidationResult<any> {
  if (!data || !Array.isArray(data.data)) {
    return {
      data: {
        total: 100,
        rows: 10,
        columns: 10,
        data: []
      },
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Parallel Coordinates data has the correct structure
 * 
 * @param {any} data - The parallel coordinates data to validate
 * @returns {ValidationResult} Validated and structured parallel coordinates data
 */
export function validateParallelData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Sankey data has the correct nodes/links structure
 * 
 * @param {any} data - The sankey data to validate
 * @returns {ValidationResult} Validated and structured sankey data
 */
export function validateSankeyData(data: any): ValidationResult<any> {
  if (!data || !Array.isArray(data.nodes) || !Array.isArray(data.links)) {
    return {
      data: {
        nodes: [],
        links: []
      },
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Voronoi data has the correct structure
 * 
 * @param {any} data - The voronoi data to validate
 * @returns {ValidationResult} Validated and structured voronoi data
 */
export function validateVoronoiData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Radial Bar data has the correct structure
 * 
 * @param {any} data - The radial bar data to validate
 * @returns {ValidationResult} Validated and structured radial bar data
 */
export function validateRadialBarData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Bump chart data has the correct structure
 * 
 * @param {any} data - The bump chart data to validate
 * @returns {ValidationResult} Validated and structured bump chart data
 */
export function validateBumpData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Network data has the correct nodes/links structure
 * 
 * @param {any} data - The network data to validate
 * @returns {ValidationResult} Validated and structured network data
 */
export function validateNetworkData(data: any): ValidationResult<any> {
  if (!data || !Array.isArray(data.nodes) || !Array.isArray(data.links)) {
    return {
      data: {
        nodes: [],
        links: []
      },
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Funnel data has the correct structure
 * 
 * @param {any} data - The funnel data to validate
 * @returns {ValidationResult} Validated and structured funnel data
 */
export function validateFunnelData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Choropleth data has the correct structure
 * 
 * @param {any} data - The choropleth data to validate
 * @returns {ValidationResult} Validated and structured choropleth data
 */
export function validateChoroplethData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures BoxPlot data has the correct structure
 * 
 * @param {any} data - The boxplot data to validate
 * @returns {ValidationResult} Validated and structured boxplot data
 */
export function validateBoxPlotData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Marimekko data has the correct structure
 * 
 * @param {any} data - The marimekko data to validate
 * @returns {ValidationResult} Validated and structured marimekko data
 */
export function validateMarimekkoData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Validates and ensures Pie chart data has the correct structure
 * 
 * @param {any} data - The pie chart data to validate
 * @returns {ValidationResult} Validated and structured pie chart data
 */
export function validatePieData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }

  // Validate each item
  const validData = data.map(item => {
    if (!item.id) {
      return { ...item, id: "Category" };
    }

    if (typeof item.value !== 'number') {
      return { ...item, value: 0 };
    }

    return item;
  });

  return { data: validData, usedFallback: false };
}

/**
 * Validates and ensures Heatmap data has the correct structure
 * 
 * @param {any} data - The heatmap data to validate
 * @returns {ValidationResult} Validated and structured heatmap data
 */
export function validateHeatmapData(data: any): ValidationResult<any[]> {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      usedFallback: true
    };
  }
  return { data, usedFallback: false };
}

/**
 * Generic validation function that selects the appropriate validator based on chart type
 * 
 * @param {string} chartType - The type of chart
 * @param {any} data - The chart data to validate
 * @returns {ValidationResult} Validated and structured chart data
 */
export function validateChartData(chartType: string, data: any): ValidationResult<any> {
  switch (chartType) {
    case "line":
      return validateLineData(data);
    case "radar":
      return validateRadarData(data);
    case "scatter":
      return validateScatterData(data);
    case "treemap":
    case "tree":
      return validateTreeMapData(data);
    case "stream":
      return validateStreamData(data);
    case "bullet":
      return validateBulletData(data);
    case "sunburst":
      return validateSunburstData(data);
    case "calendar":
      return validateCalendarData(data);
    case "chord":
      return validateChordData(data);
    case "waffle":
      return validateWaffleData(data);
    case "parallel":
      return validateParallelData(data);
    case "sankey":
      return validateSankeyData(data);
    case "voronoi":
      return validateVoronoiData(data);
    case "radial-bar":
      return validateRadialBarData(data);
    case "bump":
      return validateBumpData(data);
    case "network":
      return validateNetworkData(data);
    case "funnel":
      return validateFunnelData(data);
    case "geo":
    case "choropleth":
      return validateChoroplethData(data);
    case "boxplot":
      return validateBoxPlotData(data);
    case "marimekko":
      return validateMarimekkoData(data);
    case "pie":
      return validatePieData(data);
    case "heatmap":
      return validateHeatmapData(data);
    default:
      return {
        data: Array.isArray(data) ? data : [],
        usedFallback: !data
      };
  }
} 