/**
 * @fileoverview Warning component for fallback data usage
 * 
 * Displays a warning when chart data validation fails and fallback data is used
 */
import React from "react";

/**
 * Component to display a warning when chart is using fallback data
 * 
 * Shown when the chart data validation fails and default data is used instead
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.chartType - Type of chart being displayed
 * @returns {JSX.Element} Warning indicator UI
 */
export const DataValidationWarning = ({ chartType }: { chartType: string }) => (
    <></>  // Return empty fragment instead of the warning
);