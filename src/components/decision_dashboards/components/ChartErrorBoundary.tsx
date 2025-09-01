/**
 * @fileoverview Error boundary component for chart rendering
 * 
 * Provides error handling for chart visualizations to prevent dashboard crashes
 */
import React, { Component, ReactNode, ErrorInfo } from "react";
import { AlertTriangle } from "lucide-react";
import { ChartErrorBoundaryProps } from "../types/dashboardTypes";

/**
 * Error boundary component that catches and handles errors in chart rendering
 * 
 * Prevents chart rendering failures from crashing the entire dashboard
 * Displays a user-friendly error message with details when possible
 * 
 * @class ChartErrorBoundary
 * @extends {Component<ChartErrorBoundaryProps, { hasError: boolean; error: Error | null }>}
 */
export class ChartErrorBoundary extends Component<
    ChartErrorBoundaryProps,
    { hasError: boolean; error: Error | null }
> {
    /**
     * Initialize the error boundary component
     * 
     * @param {ChartErrorBoundaryProps} props - Component props
     */
    constructor(props: ChartErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    /**
     * Update state when an error occurs during rendering
     * 
     * @static
     * @param {Error} error - The error that was caught
     * @returns {{ hasError: boolean; error: Error }} New state with error information
     */
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    /**
     * Handle caught errors and log them for debugging
     * 
     * @param {Error} error - The error that was caught
     * @param {ErrorInfo} errorInfo - Additional information about the error
     */
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Chart rendering error:", error, errorInfo);
    }

    /**
     * Render either the children or fallback UI based on error state
     * 
     * @returns {ReactNode} The rendered UI
     */
    render() {
        if (this.state.hasError) {
            // Render fallback UI
            return this.props.fallback || (
                <div className="flex flex-col items-center justify-center h-full w-full bg-slate-800/30 rounded p-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400 mb-1" />
                    <p className="text-xs text-slate-400 text-center">
                        {this.props.chartType ? `${this.props.chartType} chart` : 'Chart'} could not be displayed
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1 text-center">
                        {this.state.error?.message || "Unknown error"}
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}