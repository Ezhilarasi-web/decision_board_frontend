/**
 * @fileoverview Utility functions for chart components
 * 
 * Contains helper functions for chart rendering and data handling
 */

/**
 * Converts chart type ID to user-friendly display name
 * Used for error messages and warnings
 * 
 * @param {string} chartType - The internal chart type identifier
 * @returns {string} Human-readable chart name
 */
export const getFriendlyChartName = (chartType: string): string => {
    switch (chartType) {
        case "area-bump": return "Area Bump";
        case "bar": return "Bar";
        case "box-plot": return "Box Plot";
        case "bullet": return "Bullet";
        case "bump": return "Bump";
        case "calendar": return "Calendar";
        case "choropleth": return "Choropleth";
        case "chord": return "Chord";
        case "circle-packing": return "Circle Packing";
        case "funnel": return "Funnel";
        case "geo-map": return "Geo Map";
        case "heatmap": return "Heat Map";
        case "line": return "Line";
        case "marimekko": return "Marimekko";
        case "network": return "Network";
        case "parallel-coordinates": return "Parallel Coordinates";
        case "pie": return "Pie";
        case "radar": return "Radar";
        case "radial-bar": return "Radial Bar";
        case "sankey": return "Sankey";
        case "scatter-plot": return "Scatter Plot";
        case "stream": return "Stream";
        case "sunburst": return "Sunburst";
        case "swarm-plot": return "Swarm Plot";
        case "time-range": return "Time Range";
        case "tree": return "Tree";
        case "treemap": return "Tree Map";
        case "voronoi": return "Voronoi";
        case "waffle": return "Waffle";
        case "none": return "None";
        default: return "Data Visualization";
    }
};

// Import all fallback data from chart catalogue
import { fallbackData as areaBumpData } from "../utils/chartCatalogue/SafeAreaBump";
import { fallbackData as barData } from "../utils/chartCatalogue/SafeBar";
import { fallbackData as boxPlotData } from "../utils/chartCatalogue/SafeBoxPlot";
import { fallbackData as bulletData } from "../utils/chartCatalogue/SafeBullet";
import { fallbackData as bumpData } from "../utils/chartCatalogue/SafeBump";
import { fallbackData as calendarData } from "../utils/chartCatalogue/SafeCalendar";
import { fallbackData as choroplethData } from "../utils/chartCatalogue/SafeChoropleth";
import { fallbackData as chordData } from "../utils/chartCatalogue/SafeChord";
import { fallbackData as circlePackingData } from "../utils/chartCatalogue/SafeCirclePacking";
import { fallbackData as funnelData } from "../utils/chartCatalogue/SafeFunnel";
import { fallbackData as heatmapData } from "../utils/chartCatalogue/SafeHeatmap";
import { fallbackData as lineData } from "../utils/chartCatalogue/SafeLine";
import { fallbackData as marimekkoData } from "../utils/chartCatalogue/SafeMarimekko";
import { fallbackData as networkData } from "../utils/chartCatalogue/SafeNetwork";
import { fallbackData as parallelCoordinatesData } from "../utils/chartCatalogue/SafeParallelCoordinates";
import { fallbackData as pieData } from "../utils/chartCatalogue/SafePie";
import { fallbackData as radarData } from "../utils/chartCatalogue/SafeRadar";
import { fallbackData as radialBarData } from "../utils/chartCatalogue/SafeRadialBar";
import { fallbackData as sankeyData } from "../utils/chartCatalogue/SafeSankey";
import { fallbackData as scatterPlotData } from "../utils/chartCatalogue/SafeScatterPlot";
import { fallbackData as streamData } from "../utils/chartCatalogue/SafeStream";
import { fallbackData as sunburstData } from "../utils/chartCatalogue/SafeSunburst";
import { fallbackData as swarmPlotData } from "../utils/chartCatalogue/SafeSwarmPlot";
import { fallbackData as timeRangeData } from "../utils/chartCatalogue/SafeTimeRange";
import { fallbackData as treeData } from "../utils/chartCatalogue/SafeTree";
import { fallbackData as treeMapData } from "../utils/chartCatalogue/SafeTreeMap";
import { fallbackData as voronoiData } from "../utils/chartCatalogue/SafeVoronoi";
import { fallbackData as waffleData } from "../utils/chartCatalogue/SafeWaffle";

/**
 * Get fallback data based on chart type
 * 
 * @param {string} chartType - The type of chart to get fallback data for
 * @returns {any} Appropriate fallback data for the chart type (can be array or object)
 */
export const getFallbackData = (chartType: string): any => {
    // Using imported data from ES modules
    switch (chartType) {
        case "area-bump": return areaBumpData;
        case "bar": return barData;
        case "box-plot": return boxPlotData;
        case "bullet": return bulletData;
        case "bump": return bumpData;
        case "calendar": return calendarData;
        case "choropleth": return choroplethData;
        case "chord": return chordData;
        case "circle-packing": return circlePackingData;
        case "funnel": return funnelData;
        case "heatmap": return heatmapData;
        case "line": return lineData;
        case "marimekko": return marimekkoData;
        case "network": return networkData;
        case "parallel-coordinates": return parallelCoordinatesData;
        case "pie": return pieData;
        case "radar": return radarData;
        case "radial-bar": return radialBarData;
        case "sankey": return sankeyData;
        case "scatter-plot": return scatterPlotData;
        case "stream": return streamData;
        case "sunburst": return sunburstData;
        case "swarm-plot": return swarmPlotData;
        case "time-range": return timeRangeData;
        case "tree": return treeData;
        case "treemap": return treeMapData;
        case "voronoi": return voronoiData;
        case "waffle": return waffleData;
        default: return [];
    }
};

/**
 * Common Nivo chart properties with optimized settings
 * Provides consistent styling and performance optimizations
 */
export const getCommonNivoProps = () => ({
    animate: false,
    // Force fixed sizing to prevent layout shift and gravity issues
    width: 713,
    height: 450,
    // Disable animations and limit interactions
    isInteractive: true,
    motionConfig: "gentle",
    // Reduce iterations and forces for physics-based charts
    iterations: 40,
    repulsivity: 2,
    // Establish boundaries to prevent elements from leaving viewport
    boundingBoxPadding: 8,
    // Enforce container boundaries
    enableSlices: 'x',
    // Optimize rendering
    renderTooltipPerSlice: false,
    // Lower detail for better performance
    pixelRatio: 1,
    // Updated theme with black text for axes and tooltips
    theme: {
        textColor: '#000000', // Changed to black
        tooltip: {
            container: {
                background: 'white',
                color: '#000000', // Changed to black
                fontSize: 12,
            },
        },
        axis: {
            domain: {
                line: {
                    stroke: '#000000', // Changed to black
                    strokeWidth: 1,
                },
            },
            ticks: {
                line: {
                    stroke: '#000000', // Changed to black
                    strokeWidth: 1,
                },
                text: {
                    fill: '#000000', // Changed to black
                    fontSize: 10,
                },
            },
            legend: {
                text: {
                    fill: '#000000', // Changed to black
                    fontSize: 11,
                    fontWeight: 'bold',
                },
            },
        },
        grid: {
            line: {
                stroke: 'rgba(0, 0, 0, 0.1)', // Very light black
            },
        },
        labels: {
            text: {
                fill: '#000000', // Changed to black
                fontSize: 10,
            },
        },
        legends: {
            title: {
                text: {
                    fill: '#000000', // Changed to black
                    fontWeight: 'bold',
                },
            },
            text: {
                fill: '#000000', // Changed to black
                fontSize: 10,
            },
            ticks: {
                text: {
                    fill: '#000000', // Changed to black
                    fontSize: 10,
                },
            },
        },
        annotations: {
            text: {
                fill: '#000000', // Changed to black
                fontSize: 10,
            },
            link: {
                stroke: '#000000', // Changed to black
                strokeWidth: 1,
            },
            outline: {
                stroke: '#000000', // Changed to black
                strokeWidth: 1,
            },
            symbol: {
                fill: '#000000', // Changed to black
            },
        },
    },
});

/**
 * Check if a chart type requires a double-width tile
 * 
 * @param {string} chartType - The chart type to check
 * @returns {boolean} True if the chart needs double-tile width
 */
export const isDoubleTileChart = (chartType: string): boolean => {
    // List of chart types that need double-tile width
    return [
        'voronoi',
        'calendar',
        'waffle',
        'bullet',
        'treemap',
        'geomap',
        'time-range',
        'bump',
        'area-bump',
        'radar',
        'scatter-plot',
        'parallel-coordinates',
        'marimekko',
        'box-plot',
        'stream',
        'bar',
        'sankey',
        'choropleth',
        'swarm-plot',
        'radial-bar',
        'line',
        'tree'
    ].includes(chartType);
};