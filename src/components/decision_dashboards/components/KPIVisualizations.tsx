/**
 * @fileoverview KPI visualization components
 * 
 * Contains components for displaying key performance indicators with mini charts
 */
import React, { useMemo } from "react";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { DashboardTile, DashboardMiniTile } from "../types/dashboardTypes";

/**
 * Component to display a mini line chart for the KPI tile
 * 
 * @component
 * @param {Object} props - Component props
 * @param {DashboardMiniTile} props.data - Data for the mini line chart
 * @returns {JSX.Element} Mini line chart visualization
 */
export const MiniLineChart = ({ data }: { data: DashboardMiniTile }) => {
    const chartHeight = 50;
    const chartWidth = 120;

    // Calculate points for the mini line chart
    const points = useMemo(() => {
        const values = data.values.slice(0, 4); // Ensure we only use up to 4 values
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);
        const range = maxValue - minValue || 1; // Avoid division by zero

        // Calculate normalized points with padding
        return values.map((value, index) => {
            const x = (index / (values.length - 1)) * chartWidth;
            const normalizedValue = (value - minValue) / range;
            const y = chartHeight - (normalizedValue * (chartHeight * 0.8) + 5); // 5px padding
            return `${x},${y}`;
        }).join(' ');
    }, [data.values, chartHeight, chartWidth]);

    // Determine color based on trend
    const lineColor = useMemo(() => {
        if (data.color) return data.color;
        switch (data.trend) {
            case 'up': return '#34D399'; // green
            case 'down': return '#F87171'; // red
            default: return '#94A3B8'; // slate-400
        }
    }, [data.trend, data.color]);

    // Get trend icon component
    const TrendIcon = useMemo(() => {
        switch (data.trend) {
            case 'up': return ArrowUp;
            case 'down': return ArrowDown;
            default: return ArrowRight;
        }
    }, [data.trend]);

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
                <div className="text-sm font-medium text-gray-700">{data.metricName}</div>
                <div className={`flex items-center ${data.trend === 'up' ? 'text-green-500' :
                        data.trend === 'down' ? 'text-red-500' :
                            'text-gray-500'
                    }`}>
                    <TrendIcon className="h-4 w-4 mr-1" />
                    {data.unit && <span className="text-xs">{data.unit}</span>}
                </div>
            </div>

            <div className="relative h-[50px] w-full">
                <svg width={chartWidth} height={chartHeight} className="overflow-visible">
                    {/* Line */}
                    <polyline
                        points={points}
                        fill="none"
                        stroke={lineColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Dots for each data point */}
                    {data.values.slice(0, 4).map((value, index) => {
                        const x = (index / (data.values.slice(0, 4).length - 1)) * chartWidth;
                        const maxValue = Math.max(...data.values.slice(0, 4));
                        const minValue = Math.min(...data.values.slice(0, 4));
                        const range = maxValue - minValue || 1;
                        const normalizedValue = (value - minValue) / range;
                        const y = chartHeight - (normalizedValue * (chartHeight * 0.8) + 5);

                        return (
                            <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="3"
                                fill="white"
                                stroke={lineColor}
                                strokeWidth="1"
                            />
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};

/**
 * Component to display a KPI-only tile without a chart
 * Now renders a mini line chart for each KPI
 * 
 * @component
 * @param {Object} props - Component props
 * @param {DashboardTile} props.tile - The tile containing KPI data
 * @returns {JSX.Element} KPI display UI with mini charts
 */
export const KPIOnlyTile = ({ tile }: { tile: DashboardTile }) => {
    // Format large numbers with appropriate suffixes (K, M, B)
    const formatLargeNumber = (num: number): string => {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    // Convert KPI data to mini tile data format
    const miniTileData = useMemo(() => {
        if (!tile.kpis || tile.kpis.length === 0) {
            return [];
        }

        // Extract common name and unit (assuming all KPIs have the same name and unit)
        const commonName = tile.kpis[0]?.name || 'Metric';
        const commonUnit = tile.kpis[0]?.unit || '';

        // Generate simulated trend data points (4 points) based on the KPI value and trend
        // Each KPI becomes its own mini line chart
        return tile.kpis.slice(0, 4).map(kpi => {
            // Determine trend direction
            const trendDirection: 'up' | 'down' | 'flat' =
                kpi.trend === undefined || kpi.trend === 0 ? 'flat' :
                    kpi.trend > 0 ? 'up' : 'down';

            // Create data points - simulate trend with 4 points
            // The last point is always the current value
            const multiplier = Math.abs(kpi.trend || 0.05) / 100;
            const baseValue = kpi.value;

            let values: number[];

            if (trendDirection === 'up') {
                // For upward trend, create ascending values
                values = [
                    baseValue * (1 - multiplier * 3),
                    baseValue * (1 - multiplier * 2),
                    baseValue * (1 - multiplier),
                    baseValue
                ];
            } else if (trendDirection === 'down') {
                // For downward trend, create descending values
                values = [
                    baseValue * (1 + multiplier * 3),
                    baseValue * (1 + multiplier * 2),
                    baseValue * (1 + multiplier),
                    baseValue
                ];
            } else {
                // For flat trend, create slight variations around the base value
                const variation = baseValue * 0.02;
                values = [
                    baseValue - variation,
                    baseValue + variation,
                    baseValue - variation / 2,
                    baseValue
                ];
            }

            // Return formatted mini tile data
            return {
                metricName: commonName,
                unit: commonUnit,
                values,
                trend: trendDirection
            };
        });
    }, [tile.kpis]);

    return (
        <div className="flex flex-col h-full w-full bg-white rounded-md shadow-sm p-4 relative">
            <h3 className="text-sm font-semibold mb-2">{tile.title}</h3>

            {miniTileData.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                    {miniTileData.map((data, index) => (
                        <div key={index} className="border rounded p-2 shadow-sm">
                            <MiniLineChart data={data} />
                            <div className="mt-2 text-center">
                                <span className="text-lg font-bold">
                                    {formatLargeNumber(tile.kpis?.[index]?.value || 0)}
                                </span>
                                <span className="text-xs ml-1">{data.unit}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                    No KPI data available
                </div>
            )}
        </div>
    );
};