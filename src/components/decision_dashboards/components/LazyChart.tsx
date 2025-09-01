/**
 * @fileoverview LazyChart component for optimized chart rendering
 * 
 * Lazily loads charts based on viewport visibility for performance optimization
 */
import React, { useState, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { BarChart2, Table } from "lucide-react";

// Import utilities
import { validateChartData } from "../utils/chart-validators";
import { getFallbackData, getFriendlyChartName, getCommonNivoProps, isDoubleTileChart } from "../utils/chartUtils";

// Import chart wrapper components
import { DashboardTile } from "../types/dashboardTypes";
import { KPIOnlyTile } from "./KPIVisualizations";
import { DataValidationWarning } from "./DataValidationWarning";

// Import chart components
import { SafeAreaBump } from "../utils/chartCatalogue/SafeAreaBump";
import { SafeBar } from "../utils/chartCatalogue/SafeBar";
import { SafeBoxPlot } from "../utils/chartCatalogue/SafeBoxPlot";
import { SafeBullet } from "../utils/chartCatalogue/SafeBullet";
import { SafeBump } from "../utils/chartCatalogue/SafeBump";
import { SafeCalendar } from "../utils/chartCatalogue/SafeCalendar";
import { SafeChoropleth } from "../utils/chartCatalogue/SafeChoropleth";
import { SafeGeoMap } from "../utils/chartCatalogue/SafeGeoMap";
import { SafeChord } from "../utils/chartCatalogue/SafeChord";
import { SafeCirclePacking } from "../utils/chartCatalogue/SafeCirclePacking";
import { SafeFunnel } from "../utils/chartCatalogue/SafeFunnel";
import { SafeHeatmap } from "../utils/chartCatalogue/SafeHeatmap";
import { SafeLine } from "../utils/chartCatalogue/SafeLine";
import { SafeMarimekko } from "../utils/chartCatalogue/SafeMarimekko";
import { SafeNetwork } from "../utils/chartCatalogue/SafeNetwork";
import { SafeParallelCoordinates } from "../utils/chartCatalogue/SafeParallelCoordinates";
import { SafePie } from "../utils/chartCatalogue/SafePie";
import { SafeRadar } from "../utils/chartCatalogue/SafeRadar";
import { SafeRadialBar } from "../utils/chartCatalogue/SafeRadialBar";
import { SafeSankey } from "../utils/chartCatalogue/SafeSankey";
import { SafeScatterPlot } from "../utils/chartCatalogue/SafeScatterPlot";
import { SafeStream } from "../utils/chartCatalogue/SafeStream";
import { SafeSunburst } from "../utils/chartCatalogue/SafeSunburst";
import { SafeSwarmPlot } from "../utils/chartCatalogue/SafeSwarmPlot";
import { SafeTimeRange } from "../utils/chartCatalogue/SafeTimeRange";
import { SafeTree } from "../utils/chartCatalogue/SafeTree";
import { SafeTreeMap } from "../utils/chartCatalogue/SafeTreeMap";
import { SafeVoronoi } from "../utils/chartCatalogue/SafeVoronoi";
import { SafeWaffle } from "../utils/chartCatalogue/SafeWaffle";
import DataTable from "./DataTable";

/**
 * LazyChart component for performance-optimized chart rendering
 * 
 * @component
 * @param {Object} props - Component props
 * @param {DashboardTile} props.tile - The dashboard tile containing chart data
 * @param {string} props.chartType - The type of chart to render
 * @param {'chart' | 'table'} [props.initialViewMode='chart'] - Initial view mode (chart or table)
 * @param {function} [props.onViewModeChange] - Callback for view mode changes
 * @returns {JSX.Element} - The rendered chart or placeholder
 */
export const LazyChart = ({ 
    tile, 
    chartType, 
    initialViewMode = 'chart', 
    onViewModeChange 
}: { 
    tile: DashboardTile, 
    chartType: string, 
    initialViewMode?: 'chart' | 'table',
    onViewModeChange?: (viewMode: 'chart' | 'table') => void
}) => {
    // Track when chart enters/exits viewport with 10% threshold and 100px margin
    const [ref, isInView] = useInView({
        threshold: 0.1,
        rootMargin: '100px'
    });

    // State to handle delayed unmounting for better scrolling experience
    const [shouldRender, setShouldRender] = useState(false);
    
    // State to track whether to show chart or table view, initialized from props
    const [viewMode, setViewMode] = useState<'chart' | 'table'>(initialViewMode);

    // Update our internal state when parent view mode changes
    useEffect(() => {
        setViewMode(initialViewMode);
    }, [initialViewMode]);

    // Get validated data and check if fallback is used
    const validatedData = useMemo(() => {
        return validateChartData(chartType, tile.chartData);
    }, [chartType, tile.chartData]);

    // Get the appropriate fallback data based on chart type
    const fallbackData = useMemo(() => getFallbackData(chartType), [chartType]);

    // Control chart rendering/unrendering based on viewport visibility
    useEffect(() => {
        if (isInView) {
            // Immediately render when in view
            setShouldRender(true);
        } else {
            // Delay unmounting to avoid flickering during fast scrolling
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    /**
     * Common properties applied to all chart types
     * Optimized for performance and consistent styling
     */
    const commonNivoProps = useMemo(() => getCommonNivoProps(), []);

    // Check if this chart type requires double-tile width (full width)
    const isDoubleWidth = useMemo(() => isDoubleTileChart(chartType), [chartType]);

    // For double-tile charts, create props with 1.5x width
    const chartProps = useMemo(() => {
        if (isDoubleWidth) {
            return {
                ...commonNivoProps,
                width: commonNivoProps.width * 1.5 // Increase width by 1.5x for double-tile charts
            };
        }
        return commonNivoProps;
    }, [commonNivoProps, isDoubleWidth]);

    // Always use full height available
    const chartContainerClass = "h-full w-full relative";

    // Toggle view mode while notifying parent component
    const handleViewModeToggle = () => {
        const newViewMode = viewMode === 'chart' ? 'table' : 'chart';
        setViewMode(newViewMode);
        if (onViewModeChange) {
            onViewModeChange(newViewMode);
        }
    };

    // Toggle button to switch between chart and table views
    const ViewToggleButton = useMemo(() => (
        <div className="flex items-center">
            <button
                onClick={handleViewModeToggle}
                className={`flex items-center font-medium text-sm rounded-md px-3 py-1.5 transition-colors ${
                    viewMode === 'chart' 
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' 
                        : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
                }`}
                title={viewMode === 'chart' ? "View as table" : "View as chart"}
            >
                {viewMode === 'chart' ? (
                    <>
                        <Table className="w-4 h-4 mr-1.5" />
                        <span>Table View</span>
                    </>
                ) : (
                    <>
                        <BarChart2 className="w-4 h-4 mr-1.5" />
                        <span>Chart View</span>
                    </>
                )}
            </button>
        </div>
    ), [viewMode, onViewModeChange]);

    // If chart type is none, display a KPI-only tile with mini line charts
    if (chartType === "none") {
        return (
            <div
                ref={ref}
                className={chartContainerClass}
                style={{
                    height: "225px",  // Half the regular chart height (450px)
                    width: "100%"
                }}
            >
                <KPIOnlyTile tile={tile} />
            </div>
        );
    }

    // If not in view and not in render grace period, show placeholder
    if (!shouldRender) {
        return (
            <div ref={ref} className={chartContainerClass}>
                <div className="flex flex-col items-center justify-center h-full w-full bg-slate-800/30 rounded p-2">
                    <p className="text-xs text-slate-400 text-center">Chart loading...</p>
                </div>
            </div>
        );
    }

    // If in table view mode, show the data table
    if (viewMode === 'table') {
        return (
            <div ref={ref} className={`${chartContainerClass}`}>
                <div className="h-full p-2">
                    <DataTable 
                        data={validatedData.usedFallback ? fallbackData : validatedData.data} 
                        isFallbackData={validatedData.usedFallback} 
                        chartType={chartType} 
                    />
                </div>
            </div>
        );
    }

    // Chart type renderer selection
    // Each case follows the same pattern:
    // 1. Sets up a container with intersection observer reference
    // 2. Shows warning if data validation fails (missing or empty data)
    // 3. Validates data array is non-empty before passing to chart
    // 4. Applies common and chart-specific props
    // 5. Wraps in safe component that handles errors
    switch (chartType) {
        // Area Bump Chart - Shows changes in ranking over time with filled areas
        case "area-bump":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeAreaBump
                        data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData}
                        {...chartProps}
                    />
                </div>
            );

        // Bar Chart - Shows comparative data across categories
        case "bar":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeBar data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>
            );

        // Box Plot - Shows statistical distribution with quartiles
        case "box-plot":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeBoxPlot data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Bullet Chart - Shows progress toward a goal with comparative measures
        case "bullet":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeBullet data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Bump Chart - Shows ranking changes over time with connected lines
        case "bump":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeBump data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Calendar Chart - Shows activity/data intensity over a calendar period
        case "calendar":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    {/* Calendar chart for time-based data visualization */}
                    <SafeCalendar data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Choropleth Chart - Map-based visualization with color intensity
        case "choropleth":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    {/* Choropleth map for geographic data with color intensity */}
                    <SafeChoropleth data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Chord Chart - Shows relationships between entities
        case "chord":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    {/* Chord diagram for showing relationships between entities */}
                    <SafeChord data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Circle Packing - Hierarchical data visualization with nested circles
        case "circle-packing":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    {/* Circle packing for hierarchical data visualization */}
                    <SafeCirclePacking data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Funnel Chart - Shows values at each stage of a process
        case "funnel":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    {/* Funnel chart for visualizing stages in a process */}
                    <SafeFunnel data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Geographic Map - Map-based visualization with interactive elements
        case "geo-map":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeGeoMap {...chartProps} />
                </div>);

        // Heatmap - Shows data intensity with color
        case "heatmap":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeHeatmap data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Line Chart - Shows trends over time or sequences
        case "line":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeLine data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Marimekko Chart - Area-based visualization showing proportions
        case "marimekko":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeMarimekko data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Network Chart - Shows relationships and connections between nodes
        case "network":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeNetwork data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Parallel Coordinates - Multi-dimensional data visualization
        case "parallel-coordinates":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeParallelCoordinates data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Pie Chart - Shows parts of a whole as slices of a circle
        case "pie":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafePie data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Radar Chart - Shows multivariate data on a radial grid
        case "radar":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeRadar data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Radial Bar Chart - Bar chart in a circular layout
        case "radial-bar":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeRadialBar data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Sankey Chart - Flow diagram showing quantity transfers
        case "sankey":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeSankey data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Scatter Plot - Shows relationship between two variables
        case "scatter-plot":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeScatterPlot data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Stream Chart - Shows flow and change of values over time
        case "stream":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeStream data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Sunburst Chart - Hierarchical data visualization as concentric rings
        case "sunburst":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeSunburst data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Swarm Plot - Grouped data points with no overlapping
        case "swarm-plot":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeSwarmPlot data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Time Range Chart - Shows data over a time period
        case "time-range":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeTimeRange data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Tree Chart - Shows hierarchical data with parent-child relationships
        case "tree":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeTree data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Treemap Chart - Hierarchical data visualization with nested rectangles
        case "treemap":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeTreeMap data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Voronoi Chart - Shows regions closest to specific points
        case "voronoi":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeVoronoi data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        // Waffle Chart - Grid-based chart for showing parts of a whole
        case "waffle":
            return (
                <div ref={ref} className={`${chartContainerClass}`}>
                    {!tile.chartData && <DataValidationWarning chartType={getFriendlyChartName(chartType)} />}
                    <SafeWaffle data={Array.isArray(tile.chartData) && tile.chartData.length > 0 ? tile.chartData : fallbackData} {...chartProps} />
                </div>);

        default:
            return null;
    }
};