/**
 * @fileoverview KpiChartContent component for rendering various chart visualizations
 * for Key Performance Indicators (KPIs). Supports line, bar, pie, area, bubble, heatmap,
 * scatter, and waterfall charts with configurable time ranges and responsive layouts.
 */
import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    LineChart,
    Line,
    CartesianGrid,
    PieChart,
    Pie,
    AreaChart,
    Area,
    Cell,
    Legend,
    Label,
    ScatterChart,
    Scatter,
    ZAxis,
    ReferenceArea,
    ReferenceLine
} from "recharts";
import { GitCommitVertical, TrendingUp, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart";
import {
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { KPIData } from "./KpiPill";

/**
 * Props for the KpiChartContent component
 * 
 * @interface
 * @property {KPIData} kpi - The KPI data containing metrics and chart configurations
 */
interface KpiChartContentProps {
    kpi: KPIData;
}

/**
 * Configuration for chart visualization
 * 
 * @interface
 * @property {string} type - The type of chart to render (bar, line, pie, area, etc.)
 * @property {string} [header] - Optional title for the chart
 * @property {any[]} data - Data points to visualize in the chart
 * @property {Object} [config] - Optional configuration for the chart appearance and behavior
 * @property {string} [config.xAxis] - Field name to use for the X-axis
 * @property {string} [config.yAxis] - Field name to use for the Y-axis
 * @property {string[]} [config.metrics] - Array of metric field names to display
 * @property {string[]} [config.colors] - Array of colors to use for chart elements
 * @property {boolean} [config.stacked] - Whether to stack elements in the chart
 * @property {string} [config.zAxis] - Field name to use for Z-axis (for bubble charts)
 * @property {string} [config.sizeKey] - Field name to determine bubble size
 */
interface ChartConfig {
    type: "bar" | "line" | "pie" | "area" | "bubble" | "heatmap" | "scatter" | "waterfall" | "stacked";
    header?: string;
    data: any[];
    config?: {
        xAxis?: string;
        yAxis?: string;
        metrics?: string[];
        colors?: string[];
        stacked?: boolean;
        zAxis?: string;
        sizeKey?: string;
    };
}

/**
 * Primary vibrant color palette for chart visualizations
 */
const COLOR_PALETTE = ["#ff2534", "#0066ff", "#00b359", "#ad00b2"];

/**
 * Secondary palette with lighter/darker variations for hover states and accents
 */
const SECONDARY_PALETTE = ["#ff5a67", "#4d94ff", "#4dd680", "#c14dc7"];

/**
 * Extended palette with more contrast for multi-series charts and pie charts
 */
const EXTENDED_PALETTE = [
    "#ff2534", // bright red
    "#0066ff", // blue
    "#00b359", // green
    "#ad00b2", // purple
    "#ffb700", // amber
    "#00cccc", // teal
    "#fd7e14", // orange
    "#6f42c1", // indigo
    "#e83e8c", // pink
    "#20c997"  // mint
];

/**
 * Formats a date string into a localized date format
 * 
 * @param {string} dateStr - The date string to format
 * @returns {string} Formatted date string
 */
const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

/**
 * Analyzes date ranges in the data to determine appropriate time range selection
 * 
 * @param {any[]} data - The chart data array containing date information
 * @param {string} [dateKey='date'] - The key in the data objects that contains the date
 * @returns {string} Time range identifier (7d, 30d, or 90d)
 */
const getTimeRangeFromData = (data: any[], dateKey: string = 'date'): string => {
    if (!data || data.length === 0) return "90d";

    // Get first and last date from data
    const firstDate = new Date(data[0][dateKey]);
    const lastDate = new Date(data[data.length - 1][dateKey]);

    // Calculate difference in days
    const diffTime = Math.abs(lastDate.getTime() - firstDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 10) return "7d";
    if (diffDays <= 35) return "30d";
    return "90d";
};

/**
 * Renders different chart types based on provided configuration
 * 
 * @param {ChartConfig | undefined} chartConfig - Configuration for the chart to render
 * @param {string} [timeRange] - Optional time range filter for the chart
 * @returns {JSX.Element | null} The rendered chart component or null if no config
 */
const renderChart = (chartConfig: ChartConfig | undefined, timeRange?: string) => {
    if (!chartConfig) return null;

    const { type, data, config } = chartConfig;
    const chartTheme = {
        primaryColor: COLOR_PALETTE[0],
        secondaryColor: COLOR_PALETTE[1],
        accentColor: COLOR_PALETTE[2],
        tertiaryColor: COLOR_PALETTE[3],
        fontSize: 14,
        fontFamily: "Inter, sans-serif"
    };

    // Custom tooltip style with vibrant border
    const tooltipStyle = {
        backgroundColor: "#fff",
        border: `2px solid ${COLOR_PALETTE[1]}`,
        borderRadius: "6px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        padding: "8px 12px"
    };

    switch (type) {
        case 'bar':
            return (
                <div>
                    <ResponsiveContainer width="100%" height={320} minHeight={300}>
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{ left: 70, right: 70 }}
                        >
                            <YAxis
                                dataKey={config?.xAxis || "label"}
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                style={chartTheme}
                                width={100}
                                fontSize={13}
                            />
                            <XAxis
                                type="number"
                                domain={[0, 'dataMax + 2']}
                                tickFormatter={(value) => `${value}${data[0]?.unit ? data[0].unit : ''}`}
                                padding={{ left: 10, right: 10 }}
                            />
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                            <RechartsTooltip
                                formatter={(value, name) => [`${value}${data[0]?.unit ? data[0].unit : ''}`, name]}
                                contentStyle={tooltipStyle}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                wrapperStyle={{ paddingTop: 30, bottom: 0 }}
                            />
                            <Bar
                                name={config?.metrics?.[0] || "Value"}
                                dataKey="value"
                                fill={chartTheme.primaryColor}
                                radius={[0, 4, 4, 0]}
                                barSize={20}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color || EXTENDED_PALETTE[index % EXTENDED_PALETTE.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );

        case 'stacked':
            // Extract metrics from first data point excluding the category field
            const stackedMetrics = config?.metrics ||
                (data[0] ? Object.keys(data[0]).filter(key => key !== 'name' && key !== 'date') : []);

            return (
                <div>
                    <ResponsiveContainer width="100%" height={400} minHeight={300}>
                        <BarChart
                            data={data}
                            margin={{ left: 50, right: 50, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis
                                dataKey={config?.xAxis || "name"}
                                tickLine={false}
                                tickMargin={10}
                                style={chartTheme}
                                fontSize={13}
                            />
                            <YAxis
                                tickLine={false}
                                tickMargin={10}
                                style={chartTheme}
                                fontSize={13}
                                tickFormatter={(value) => `${value}${data[0]?.unit ? data[0].unit : ''}`}
                            />
                            <RechartsTooltip
                                formatter={(value, name) => [`${value}${data[0]?.unit ? data[0].unit : ''}`, name]}
                                contentStyle={tooltipStyle}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                wrapperStyle={{ paddingTop: 30, bottom: 0 }}
                            />
                            {stackedMetrics.map((metric, index) => (
                                <Bar
                                    key={metric}
                                    dataKey={metric}
                                    name={metric.charAt(0).toUpperCase() + metric.slice(1)}
                                    stackId="a"
                                    fill={EXTENDED_PALETTE[index % EXTENDED_PALETTE.length]}
                                    radius={index === stackedMetrics.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                                />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );

        case 'line':

            return (
                <div className="pt-8 pb-14 px-10">
                    <ResponsiveContainer width="100%" height={320} minHeight={300}>
                        <LineChart data={data} margin={{ left: 50, right: 50 }}>
                            <CartesianGrid vertical={false} stroke="#e2e8f0" />
                            <XAxis
                                dataKey={config?.xAxis || "date"}
                                tickFormatter={(value) => formatDate(value).split(',')[0]}
                                style={chartTheme}
                                fontSize={13}
                                tickMargin={15}
                                padding={{ left: 10, right: 10 }}
                            />
                            <YAxis
                                style={chartTheme}
                                fontSize={13}
                                tickMargin={10}
                                domain={['dataMin - 5%', 'dataMax + 5%']}
                                tickFormatter={(value) => `${value}${data[0]?.unit ? data[0].unit : ''}`}
                            />
                            <RechartsTooltip
                                formatter={(value, name) => [`${value}${data[0]?.unit ? data[0].unit : ''}`, name]}
                                labelFormatter={(value) => formatDate(value)}
                                contentStyle={tooltipStyle}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                wrapperStyle={{ paddingTop: 30, bottom: 0 }}
                            />

                            {config?.metrics?.map((metric, index) => {
                                // Skip confidence interval bounds in legend
                                if (metric === 'lower' || metric === 'upper') return null;

                                // Use custom colors if provided, otherwise use extended palette
                                const color = config?.colors ?
                                    config.colors[index % config.colors.length] :
                                    EXTENDED_PALETTE[index % EXTENDED_PALETTE.length];

                                // Use different line patterns for better distinction
                                const strokeDasharray = index === 0 ? undefined :
                                    index === 1 ? "5 5" :
                                        index === 2 ? "3 3" : "1 1";

                                // For revenue specifically, use a distinct style
                                const isRevenue = metric.toLowerCase().includes('revenue');
                                const revenueColor = "#00b359"; // Green for revenue

                                return (
                                    <Line
                                        key={metric}
                                        name={metric.charAt(0).toUpperCase() + metric.slice(1)}
                                        dataKey={metric}
                                        type="monotone"
                                        stroke={isRevenue ? revenueColor : color}
                                        strokeWidth={isRevenue ? 3 : 2}
                                        strokeDasharray={isRevenue ? undefined : strokeDasharray}
                                        dot={{
                                            fill: "#fff",
                                            stroke: isRevenue ? revenueColor : color,
                                            strokeWidth: 2,
                                            r: isRevenue ? 5 : 4
                                        }}
                                        activeDot={{
                                            r: isRevenue ? 8 : 7,
                                            fill: isRevenue ? revenueColor : color,
                                            stroke: "#fff",
                                            strokeWidth: 2
                                        }}
                                        connectNulls={true}
                                    />
                                );
                            })}

                            {/* Add annotations if present */}
                            {data.map((entry, index) => {
                                if (entry.annotation && entry.annotation.length > 0) {
                                    return (
                                        <ReferenceLine
                                            key={`annotation-${index}`}
                                            x={entry.date}
                                            stroke="#ad00b2" // Use purple for annotations
                                            strokeDasharray="3 3"
                                            label={{
                                                value: entry.annotation,
                                                position: 'top',
                                                fill: "#ad00b2",
                                                fontSize: 12
                                            }}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            );


        case 'pie':
            // Ensure we have enough distinct colors for the pie chart
            const pieColors = data.map((_, index) =>
                EXTENDED_PALETTE[index % EXTENDED_PALETTE.length]
            );

            return (
                <div>
                    <ResponsiveContainer width="100%" height={360} minHeight={340}>
                        <PieChart margin={{ left: 30, right: 30, top: 20, bottom: 20 }}>
                            <RechartsTooltip
                                formatter={(value, name) => [`${value}${data[0]?.unit ? data[0].unit : ''}`, name]}
                                contentStyle={tooltipStyle}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={80}
                                wrapperStyle={{
                                    bottom: 0,
                                    fontSize: 12,
                                    fontWeight: 500
                                }}
                                layout="vertical"
                                align="center"
                                formatter={(value, entry) => {
                                    // Find the corresponding entry in the data
                                    const dataEntry = data.find(item => item.label === value);
                                    if (dataEntry) {
                                        return `${value}: ${(dataEntry.value * 100 /
                                            data.reduce((sum, item) => sum + item.value, 0)).toFixed(1)}%`;
                                    }
                                    return value;
                                }}
                            />
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="label"
                                cx="50%"
                                cy="42%"
                                outerRadius={110}
                                innerRadius={45}
                                label={({ name, value, percent, x, y, midAngle }) => {
                                    // Only show percent inside the slices for better visibility
                                    return (
                                        <text
                                            x={x}
                                            y={y}
                                            fill="#000000"
                                            textAnchor="middle"
                                            dominantBaseline="central"
                                            fontSize={11}
                                        >
                                            {`${(percent * 100).toFixed(0)}%`}
                                        </text>
                                    );
                                }}
                                labelLine={false}
                                fontSize={11}
                            >
                                {data.map((entry, index) => {
                                    // Use entry.color if provided, otherwise use our extended palette
                                    const fillColor = entry.color || pieColors[index];
                                    return <Cell
                                        key={`cell-${index}`}
                                        fill={fillColor}
                                        stroke="#fff"
                                        strokeWidth={2}
                                    />
                                })}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            );

        case 'area':
            const areaMetrics = config?.metrics || Object.keys(data[0]).filter(key => key !== config?.xAxis);
            return (
                <div className="pt-8 pb-14 px-10">
                    <ResponsiveContainer width="100%" height={320} minHeight={300}>
                        <AreaChart data={data} margin={{ left: 50, right: 50 }}>
                            <CartesianGrid vertical={false} stroke="#e2e8f0" />
                            <XAxis
                                dataKey={config?.xAxis || "name"}
                                tickFormatter={(value) => formatDate(value).split(',')[0]}
                                style={chartTheme}
                                fontSize={13}
                                tickMargin={15}
                                padding={{ left: 10, right: 10 }}
                            />
                            <YAxis
                                style={chartTheme}
                                fontSize={13}
                                tickMargin={10}
                                domain={['dataMin - 5%', 'dataMax + 5%']}
                                padding={{ top: 10, bottom: 10 }}
                            />
                            <RechartsTooltip
                                formatter={(value, name) => {
                                    if (name === "lower" || name === "upper") {
                                        return [value, name === "lower" ? "Lower Bound" : "Upper Bound"];
                                    }
                                    return [value, name];
                                }}
                                labelFormatter={(value) => formatDate(value)}
                                contentStyle={tooltipStyle}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                wrapperStyle={{ paddingTop: 30, bottom: 0 }}
                                formatter={(value) => {
                                    if (value === "lower" || value === "upper") return null;
                                    return value.charAt(0).toUpperCase() + value.slice(1);
                                }}
                            />

                            {/* Special case for confidence interval */}
                            {areaMetrics.includes('lower') && areaMetrics.includes('upper') && (
                                <defs>
                                    <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                            )}

                            {/* Render confidence interval area if lower and upper bounds exist */}
                            {areaMetrics.includes('lower') && areaMetrics.includes('upper') && (
                                <Area
                                    type="monotone"
                                    dataKey="lower"
                                    stroke="none"
                                    fill="none"
                                    stackId="confidence"
                                />
                            )}

                            {areaMetrics.includes('lower') && areaMetrics.includes('upper') && (
                                <Area
                                    type="monotone"
                                    dataKey="upper"
                                    stroke="none"
                                    fillOpacity={1}
                                    fill="url(#confidenceGradient)"
                                    stackId="confidence"
                                />
                            )}

                            {/* Render main data lines */}
                            {areaMetrics
                                .filter(metric => metric !== 'lower' && metric !== 'upper')
                                .map((metric, i) => {
                                    const colorIndex = Math.min(i, COLOR_PALETTE.length - 1);
                                    return metric === 'predicted' ? (
                                        <Area
                                            key={metric}
                                            type="monotone"
                                            name={metric.charAt(0).toUpperCase() + metric.slice(1)}
                                            dataKey={metric}
                                            stroke={COLOR_PALETTE[colorIndex]}
                                            fill={COLOR_PALETTE[colorIndex]}
                                            fillOpacity={0.2}
                                            strokeWidth={2}
                                            activeDot={{ r: 8, fill: COLOR_PALETTE[colorIndex], stroke: '#fff' }}
                                            isAnimationActive={true}
                                        />
                                    ) : (
                                        <Line
                                            key={metric}
                                            type="monotone"
                                            name={metric.charAt(0).toUpperCase() + metric.slice(1)}
                                            dataKey={metric}
                                            stroke={COLOR_PALETTE[colorIndex]}
                                            strokeWidth={2}
                                            dot={{ r: 3, fill: COLOR_PALETTE[colorIndex] }}
                                            activeDot={{ r: 8, fill: COLOR_PALETTE[colorIndex], stroke: '#fff' }}
                                            isAnimationActive={true}
                                        />
                                    );
                                })
                            }
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            );

        case 'bubble':
            // Bubble chart - displays data with 3 dimensions (x, y, and size)
            const bubbleMetric = config?.metrics?.[0] || Object.keys(data[0]).find(key => key !== 'date' && key !== config?.xAxis);
            const bubbleSizeKey = config?.sizeKey || "value";
            return (
                <div className="pt-8 pb-14 px-10">
                    <ResponsiveContainer width="100%" height={320} minHeight={300}>
                        <ScatterChart margin={{ left: 50, right: 50, top: 20, bottom: 20 }}>
                            <CartesianGrid vertical={false} stroke="#e2e8f0" />
                            <XAxis
                                dataKey={config?.xAxis || "x"}
                                type="number"
                                name={config?.xAxis || "X"}
                                domain={['dataMin - 5%', 'dataMax + 5%']}
                                style={chartTheme}
                                fontSize={13}
                                tickMargin={15}
                            />
                            <YAxis
                                dataKey={config?.yAxis || "y"}
                                type="number"
                                name={config?.yAxis || "Y"}
                                domain={['dataMin - 5%', 'dataMax + 5%']}
                                style={chartTheme}
                                fontSize={13}
                                tickMargin={10}
                            />
                            <ZAxis
                                dataKey={bubbleSizeKey}
                                range={[50, 500]}
                                name="Size"
                            />
                            <RechartsTooltip
                                formatter={(value, name, props) => {
                                    if (name === "Size") {
                                        return [`${value}${data[0]?.unit ? data[0].unit : ''}`, "Size"];
                                    }
                                    return [`${value}${data[0]?.unit ? data[0].unit : ''}`, name];
                                }}
                                contentStyle={tooltipStyle}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                            <Scatter
                                name={bubbleMetric || "Bubble"}
                                data={data}
                                fill={COLOR_PALETTE[0]}
                                fillOpacity={0.7}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color || EXTENDED_PALETTE[index % EXTENDED_PALETTE.length]}
                                    />
                                ))}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            );

        case 'heatmap':
            // Create a heatmap-like visualization
            const heatmapMetric = config?.metrics?.[0] || "value";
            // Convert data for heatmap format if needed
            const formattedHeatmapData = data.map(item => ({
                ...item,
                // Ensure the heat value is normalized between 0-1
                heat: (item[heatmapMetric] - Math.min(...data.map(d => d[heatmapMetric]))) /
                    (Math.max(...data.map(d => d[heatmapMetric])) - Math.min(...data.map(d => d[heatmapMetric])))
            }));

            return (
                <div className="pt-8 pb-14 px-10">
                    <ResponsiveContainer width="100%" height={320} minHeight={300}>
                        <ScatterChart margin={{ left: 50, right: 50, top: 20, bottom: 20 }}>
                            <CartesianGrid stroke="#e2e8f0" />
                            <XAxis
                                dataKey={config?.xAxis || "x"}
                                type="category"
                                name={config?.xAxis || "X"}
                                style={chartTheme}
                                fontSize={13}
                                tickMargin={15}
                            />
                            <YAxis
                                dataKey={config?.yAxis || "y"}
                                type="category"
                                name={config?.yAxis || "Y"}
                                style={chartTheme}
                                fontSize={13}
                                tickMargin={10}
                            />
                            <RechartsTooltip
                                formatter={(value, name, props) => [`${value}${data[0]?.unit ? data[0].unit : ''}`, name]}
                                contentStyle={tooltipStyle}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                            <Scatter
                                name={heatmapMetric}
                                data={formattedHeatmapData}
                                shape="square"
                            >
                                {formattedHeatmapData.map((entry, index) => {
                                    // Generate color based on heat value (red for high, blue for low)
                                    const heatColor = entry.heat > 0.7 ? COLOR_PALETTE[0] :
                                        entry.heat > 0.4 ? COLOR_PALETTE[1] :
                                            EXTENDED_PALETTE[3];
                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={heatColor}
                                            fillOpacity={0.2 + (entry.heat * 0.8)} // Higher opacity for higher values
                                        />
                                    );
                                })}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            );

        case 'scatter':
            // Scatter plot for showing correlation between two variables
            const scatterXAxis = config?.xAxis || "x";
            const scatterYAxis = config?.yAxis || "y";

            return (
                <div className="pt-8 pb-14 px-10">
                    <ResponsiveContainer width="100%" height={320} minHeight={300}>
                        <ScatterChart margin={{ left: 50, right: 50, top: 20, bottom: 20 }}>
                            <CartesianGrid vertical={false} stroke="#e2e8f0" />
                            <XAxis
                                dataKey={scatterXAxis}
                                type="number"
                                name={scatterXAxis}
                                domain={['dataMin - 5%', 'dataMax + 5%']}
                                style={chartTheme}
                                fontSize={13}
                                tickMargin={15}
                            >
                                <Label value={scatterXAxis} offset={-10} position="insideBottom" />
                            </XAxis>
                            <YAxis
                                dataKey={scatterYAxis}
                                type="number"
                                name={scatterYAxis}
                                domain={['dataMin - 5%', 'dataMax + 5%']}
                                style={chartTheme}
                                fontSize={13}
                                tickMargin={10}
                            >
                                <Label
                                    value={scatterYAxis}
                                    angle={-90}
                                    position="insideLeft"
                                    style={{ textAnchor: 'middle' }}
                                    offset={-35}
                                />
                            </YAxis>
                            <RechartsTooltip
                                formatter={(value, name, props) => [`${value}${data[0]?.unit ? data[0].unit : ''}`, name]}
                                contentStyle={tooltipStyle}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                            <Scatter
                                name="Data Points"
                                data={data}
                                fill={COLOR_PALETTE[0]}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color || COLOR_PALETTE[1]}
                                    />
                                ))}
                            </Scatter>

                            {/* Add a trend line or reference line if appropriate */}
                            <ReferenceLine
                                stroke={COLOR_PALETTE[3]}
                                strokeDasharray="3 3"
                                segment={[
                                    { x: Math.min(...data.map(d => d[scatterXAxis])), y: Math.min(...data.map(d => d[scatterYAxis])) },
                                    { x: Math.max(...data.map(d => d[scatterXAxis])), y: Math.max(...data.map(d => d[scatterYAxis])) }
                                ]}
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            );

        case 'waterfall':
            // Waterfall chart for showing cumulative effect of sequential data
            // Transform data to calculate the cumulative change
            const waterfallData = [...data];
            let cumulative = 0;

            waterfallData.forEach((item, index) => {
                if (index === 0) {
                    item.start = 0;
                    item.end = item.value;
                    cumulative = item.value;
                } else if (index === data.length - 1) {
                    // The last bar is the total
                    item.start = 0;
                    item.end = cumulative;
                    item.isTotal = true;
                } else {
                    item.start = cumulative;
                    cumulative += item.value;
                    item.end = cumulative;
                }

                // Determine if it's an increase or decrease
                item.isIncrease = item.value >= 0;
            });

            return (
                <div className="pt-8 pb-14 px-10">
                    <ResponsiveContainer width="100%" height={320} minHeight={300}>
                        <BarChart
                            data={waterfallData}
                            margin={{ left: 70, right: 70 }}
                        >
                            <CartesianGrid vertical={false} stroke="#e2e8f0" />
                            <XAxis
                                dataKey={config?.xAxis || "name"}
                                tickLine={false}
                                axisLine={false}
                                style={chartTheme}
                                fontSize={13}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                style={chartTheme}
                                fontSize={13}
                                tickFormatter={(value) => `${value}${data[0]?.unit ? data[0].unit : ''}`}
                            />
                            <RechartsTooltip
                                formatter={(value, name) => {
                                    if (name === "start" || name === "end") return [null, null];
                                    return [`${value}${data[0]?.unit ? data[0].unit : ''}`, name];
                                }}
                                contentStyle={tooltipStyle}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                            <defs>
                                {/* Define gradient fills for increase and decrease */}
                                <linearGradient id="increaseGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={COLOR_PALETTE[2]} stopOpacity={0.8} />
                                    <stop offset="100%" stopColor={COLOR_PALETTE[2]} stopOpacity={0.4} />
                                </linearGradient>
                                <linearGradient id="decreaseGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={COLOR_PALETTE[0]} stopOpacity={0.8} />
                                    <stop offset="100%" stopColor={COLOR_PALETTE[0]} stopOpacity={0.4} />
                                </linearGradient>
                                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={COLOR_PALETTE[3]} stopOpacity={0.8} />
                                    <stop offset="100%" stopColor={COLOR_PALETTE[3]} stopOpacity={0.4} />
                                </linearGradient>
                            </defs>

                            {/* Render the start bars (invisible, just for positioning) */}
                            <Bar
                                dataKey="start"
                                stackId="stack"
                                fill="transparent"
                                isAnimationActive={false}
                            />

                            {/* Render the end bars with different colors based on increase/decrease */}
                            <Bar
                                name="Value"
                                dataKey="value"
                                stackId="stack"
                                radius={[4, 4, 0, 0]}
                            >
                                {waterfallData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.isTotal ? "url(#totalGradient)" :
                                            entry.isIncrease ? "url(#increaseGradient)" : "url(#decreaseGradient)"}
                                    />
                                ))}
                            </Bar>

                            {/* Add connecting lines between bars */}
                            {waterfallData.map((entry, index) => {
                                if (index === waterfallData.length - 1) return null;
                                const x1 = index * (100 / (waterfallData.length - 1)) + 10;
                                const x2 = (index + 1) * (100 / (waterfallData.length - 1)) - 10;
                                return (
                                    <ReferenceLine
                                        key={`line-${index}`}
                                        x={index}
                                        stroke="#cccccc"
                                        strokeDasharray="3 3"
                                        segment={[
                                            { x: x1, y: entry.end },
                                            { x: x2, y: entry.end }
                                        ]}
                                    />
                                );
                            })}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );

        default:
            return null;
    }
};

/**
 * KpiChartContent component renders various chart visualizations for a KPI
 * with appropriate layouts for different chart types and time range filtering.
 * 
 * @param {KpiChartContentProps} props - The component props
 * @returns {JSX.Element} The rendered chart content component
 */
const KpiChartContent: React.FC<KpiChartContentProps> = ({ kpi }) => {
    /**
     * State for selected time range filter
     */
    const [timeRange, setTimeRange] = useState<string>("90d");

    /**
     * Effect to determine appropriate time range based on data
     */
    useEffect(() => {
        if (kpi.charts && kpi.charts.length > 0) {
            const lineChart = kpi.charts.find(chart => chart.type === "line");
            if (lineChart && lineChart.data && lineChart.data.length > 0) {
                const suggestedRange = getTimeRangeFromData(lineChart.data, lineChart.config?.xAxis || 'date');
                setTimeRange(suggestedRange);
            }
        }
    }, [kpi]);

    // Return message when no charts are available
    if (!kpi.charts || kpi.charts.length === 0) {
        return (
            <div className="p-8 text-center text-white">
                No charts available for this KPI
            </div>
        );
    }

    /**
     * Extract line chart for main display and other charts for secondary display
     */
    const lineChart = kpi.charts.find(chart => chart.type === "line");
    const otherCharts = kpi.charts.filter(chart => chart.type !== "line");

    return (
        <ChartContainer config={{}}>
            <div className="space-y-12 overflow-y-auto pr-8 pb-6">
                {/* Custom scrollbar styling */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                        .dialog-content {
                            scrollbar-width: thin;
                            scrollbar-color: #fe6e06 transparent;
                        }
                        .dialog-content::-webkit-scrollbar {
                            width: 8px;
                            height: 66%;
                            position: fixed;
                        }
                        .dialog-content::-webkit-scrollbar-track {
                            background: transparent;
                            margin-top: 33%;
                        }
                        .dialog-content::-webkit-scrollbar-thumb {
                            background: linear-gradient(to bottom, #fe6e06, #1a00d9);
                            border-radius: 4px;
                            border: 2px solid transparent;
                            background-clip: padding-box;
                        }
                        .dialog-content::-webkit-scrollbar-thumb:hover {
                            background: linear-gradient(to bottom, #ff7e2a, #2b14d9);
                            border: 2px solid transparent;
                            background-clip: padding-box;
                        }
                    `
                }} />

                {/* KPI title and description */}
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{kpi.label} Details</DialogTitle>
                    <DialogDescription className="text-base">
                        Detailed KPI charts and trends for {formatDate(lineChart?.data[0]?.date || '')} to {formatDate(lineChart?.data[lineChart?.data.length - 1]?.date || '')}
                    </DialogDescription>
                </DialogHeader>

                {/* Secondary charts grid layout */}
                {otherCharts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {otherCharts.map((chart, index) => (
                            <Card
                                key={index}
                                className={`overflow-visible ${chart.type === 'pie' ? 'p-5 mb-4' : 'p-4'}`}
                            >
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xl font-semibold">
                                        {chart.header || (chart.type === 'pie' ? 'Distribution' : 'Comparison')}
                                    </CardTitle>
                                    <CardDescription>
                                        {chart.type === 'pie' ? 'Percentage breakdown' :
                                            chart.type === 'bar' ? 'Comparative analysis' :
                                                chart.type === 'area' ? 'Channel performance' : 'Data analysis'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className={`p-0 ${chart.type === 'pie' ? 'overflow-visible' : ''}`}>
                                    {renderChart(chart)}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Main line chart with time range controls */}
                {lineChart && (
                    <Card className="overflow-visible p-6 mt-10">
                        <CardHeader className="flex items-center gap-2 border-b py-5 px-6">
                            <CardTitle className="text-xl font-semibold">
                                {lineChart.header || "Trend Analysis"}
                            </CardTitle>
                            <CardDescription className="text-base flex items-center gap-1">
                                <Calendar size={14} className="inline" />
                                {formatDate(lineChart.data[0]?.date || '')} - {formatDate(lineChart.data[lineChart.data.length - 1]?.date || '')}
                            </CardDescription>
                            <Select value={timeRange} onValueChange={setTimeRange}>
                                <SelectTrigger className="w-[160px]">
                                    <SelectValue placeholder="Select time range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="90d">Last 3 months</SelectItem>
                                    <SelectItem value="30d">Last 30 days</SelectItem>
                                    <SelectItem value="7d">Last 7 days</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardHeader>
                        <CardContent className="p-0">
                            {renderChart(lineChart, timeRange)}
                        </CardContent>
                    </Card>
                )}
            </div>
        </ChartContainer>
    );
};

export default KpiChartContent;
