"use client"

/**
 * @fileoverview KpiPill component displays key performance indicators (KPIs) 
 * with expandable details and interactive visualizations.
 */
import React, { useEffect } from "react";
import { 
  ArrowUp, 
  ArrowDown, 
  Equal, 
  DollarSign, 
  Percent, 
  Users, 
  ShoppingCart, 
  BarChart2, 
  TrendingUp,
  Activity,
  Target,
  Star,
  MessageSquare,
  Heart,
  ThumbsUp,
  Clock,
  Calendar,
  Package,
  Scale,
  PieChart,
  LineChart,
  BarChart,
  AreaChart,
  CircleDollarSign,
  CirclePercent,
  User,
  ShoppingBag,
  BarChart3,
  X
} from "lucide-react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import KpiChartContent from "./KpiChartContent";
import { CustomDialogContent } from "@/components/ui/custom-dialog-content";

/**
 * Interface representing KPI data structure with metrics and optional chart data
 * 
 * @interface
 * @property {number} id - Unique identifier for the KPI
 * @property {string} label - Display label for the KPI
 * @property {number} value - Current value of the KPI
 * @property {number} percent - Percentage change
 * @property {"up" | "down" | "flat"} trend - Direction of change
 * @property {Array<{date: string, value: number}>} [history] - Optional historical values
 * @property {Array<Object>} [charts] - Optional visualizations for the KPI
 * @property {string} charts.type - Type of chart (bar, line, pie, area, bubble, heatmap, scatter, waterfall, stacked)
 * @property {string} [charts.header] - Optional chart title
 * @property {any[]} charts.data - Data points for the chart
 * @property {Object} [charts.config] - Optional configuration for the chart
 */
export type KPIData = {
  id: number;
  label: string;
  value: number;
  percent: number;
  trend: "up" | "down" | "flat";
  history?: { date: string; value: number }[];
  charts?: {
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
  }[];
};

/**
 * Props for the KpiPill component
 * 
 * @interface
 * @property {KPIData} kpi - The KPI data to display
 * @property {boolean} expanded - Whether the pill is in expanded state
 * @property {Function} [onDialogOpen] - Optional callback when dialog opens
 * @property {Function} [onDialogClose] - Optional callback when dialog closes
 */
interface KpiPillProps {
  kpi: KPIData;
  expanded: boolean;
  onDialogOpen?: () => void;
  onDialogClose?: () => void;
}

/**
 * Animation variants for the pill component
 */
const pillVariants = {
  initial: {
    opacity: 0,
    y: 10
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

/**
 * Animation variants for the glimmer effect
 */
const glimmerVariants = {
  initial: {
    backgroundPosition: "200% 0",
  },
  animate: {
    backgroundPosition: "-200% 0",
    transition: {
      duration: 1,
      ease: "linear",
      delay: 0.1
    }
  }
};

/**
 * Returns an appropriate icon based on the KPI label
 * 
 * @param {string} label - Label of the KPI to derive icon from
 * @returns {JSX.Element} The icon component for the KPI type
 */
const getUnitIcon = (label: string) => {
  const l = label.toLowerCase();
  
  // Currency/Monetary
  if (l.includes("sales") || l.includes("revenue") || l.includes("aov") || l.includes("arpu"))
    return <CircleDollarSign size={18} className="ml-1 inline" />;
  
  // Percentage
  if (l.includes("rate") || l.includes("percentage") || l.includes("percent") || 
      l.includes("conversion") || l.includes("growth") || l.includes("share"))
    return <CirclePercent size={18} className="ml-1 inline" />;
  
  // Users/Customers
  if (l.includes("users") || l.includes("customers") || l.includes("visitors") || 
      l.includes("audience") || l.includes("subscribers"))
    return <User size={18} className="ml-1 inline" />;
  
  // Sales/Orders
  if (l.includes("orders") || l.includes("transactions") || l.includes("purchases"))
    return <ShoppingBag size={18} className="ml-1 inline" />;
  
  // Metrics/Performance
  if (l.includes("nps") || l.includes("csat") || l.includes("satisfaction") || 
      l.includes("engagement") || l.includes("interaction"))
    return <Star size={18} className="ml-1 inline" />;
  
  // Time-based
  if (l.includes("time") || l.includes("duration") || l.includes("period"))
    return <Clock size={18} className="ml-1 inline" />;
  
  // Activity/Performance
  if (l.includes("activity") || l.includes("performance") || l.includes("efficiency"))
    return <Activity size={18} className="ml-1 inline" />;
  
  // Goals/Targets
  if (l.includes("target") || l.includes("goal") || l.includes("objective"))
    return <Target size={18} className="ml-1 inline" />;
  
  // Fallback icon for any other metrics
  return <BarChart3 size={18} className="ml-1 inline" />;
};

/**
 * KpiPill component displays KPI data in either a compact or expanded state
 * with option to open a dialog with detailed chart visualizations.
 * 
 * @param {KpiPillProps} props - Component props
 * @returns {JSX.Element} The rendered KpiPill component
 */
const KpiPill: React.FC<KpiPillProps> = ({ kpi, expanded, onDialogOpen, onDialogClose }) => {
  const controls = useAnimation();

  /**
   * Update animation state when expanded prop changes
   */
  useEffect(() => {
    controls.start(expanded ? "expanded" : "contracted");
  }, [expanded, controls]);

  // Render different components based on expanded state
  if (expanded) {
    return (
      <div className="w-full">
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes borderTravel {
              0% { 
                background-position: 0% 0%;
              }
              100% { 
                background-position: 200% 0%;
              }
            }
            @keyframes borderPulse {
              0%, 100% { 
                box-shadow: 0 0 8px rgba(99, 102, 241, 0.2), 0 0 12px rgba(79, 70, 229, 0.1);
              }
              50% { 
                box-shadow: 0 0 12px rgba(99, 102, 241, 0.3), 0 0 18px rgba(79, 70, 229, 0.2);
              }
            }
            .gradient-border-hover {
              border: 2px solid transparent;
              background-image: linear-gradient(white, white), linear-gradient(90deg, transparent, transparent);
              background-origin: border-box;
              background-clip: padding-box, border-box;
              background-size: 200% 100%;
              transition: all 0.3s ease;
            }
            .gradient-border-hover:hover {
              background-image: linear-gradient(white, white), linear-gradient(90deg, #6366f1, #4f46e5, #6366f1);
              animation: 
                borderTravel 1.5s linear infinite,
                borderPulse 2s ease-in-out infinite;
            }
            .pill-gradient {
              background: linear-gradient(135deg, rgba(237, 233, 254, 0.5), rgba(243, 244, 246, 0.5));
              border: 1px solid rgba(139, 92, 246, 0.3);
            }
            .pill-gradient:hover {
              background: linear-gradient(135deg, rgba(237, 233, 254, 0.8), rgba(243, 244, 246, 0.8));
            }
            .dialog-close-button {
              position: absolute;
              top: -1.5rem;
              right: -1.5rem;
              z-index: 9999;
            }
            .chart-container-padding {
              padding-bottom: 3rem !important;
            }
          `
        }} />
        <Dialog
          onOpenChange={(open: boolean) => {
            if (open) {
              onDialogOpen && onDialogOpen();
              setTimeout(() => window.dispatchEvent(new Event("resize")), 50);
            } else {
              onDialogClose && onDialogClose();
            }
          }}
        >
          <DialogTrigger className="w-full block">
            <motion.div
              onPointerDown={(e) => e.stopPropagation()}
              onHoverStart={(e) => {
                const event = new CustomEvent('cursorOverWhite', { detail: true });
                window.dispatchEvent(event);
              }}
              onHoverEnd={(e) => {
                const event = new CustomEvent('cursorOverWhite', { detail: false });
                window.dispatchEvent(event);
              }}
              className="w-full flex flex-col items-center cursor-pointer rounded-lg py-2 px-2 relative overflow-hidden group gradient-border-hover pill-gradient"
              variants={pillVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-50/20 to-transparent"
                variants={glimmerVariants}
                initial="initial"
                animate="animate"
              />
              <Card className="w-full text-gray-800 bg-transparent border-0 shadow-none relative z-10 !p-0">
                <CardHeader className="!p-0 !pb-1 flex items-center justify-center px-1 pt-1">
                  <CardTitle className="text-sm font-medium truncate text-center">
                    {kpi.label} {getUnitIcon(kpi.label)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="!p-0 px-1 pb-1">
                  <div className="flex items-center justify-center space-x-1">
                    <div className="text-base font-bold truncate text-gray-800">
                      {kpi.value} ({kpi.percent > 0 ? "+" : ""}{kpi.percent}%)
                    </div>
                    {kpi.trend === "up" ? (
                      <ArrowUp size={16} className="text-emerald-600 flex-shrink-0" />
                    ) : kpi.trend === "down" ? (
                      <ArrowDown size={16} className="text-rose-600 flex-shrink-0" />
                    ) : (
                      <Equal size={16} className="text-amber-600 flex-shrink-0" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </DialogTrigger>
          
          <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
              className="fixed top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[95vw] h-[75vh] max-h-[calc(100vh-160px)] bg-white text-gray-800 z-50 p-6 md:p-8 mt-12 mb-16 rounded-lg border border-gray-200 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            >
              <style dangerouslySetInnerHTML={{
                __html: `
                  .dialog-scroll {
                    overflow-y: auto;
                    scrollbar-width: thin;
                    scrollbar-color: #6366f1 transparent;
                  }
                  .dialog-scroll::-webkit-scrollbar {
                    width: 8px;
                  }
                  .dialog-scroll::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  .dialog-scroll::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #6366f1, #8b5cf6);
                    border-radius: 4px;
                    border: 2px solid transparent;
                    background-clip: padding-box;
                  }
                  .dialog-scroll::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #4f46e5, #7c3aed);
                    border: 2px solid transparent;
                    background-clip: padding-box;
                  }
                `
              }} />
              <div className="dialog-scroll h-full">
                <div className="chart-container-padding">
                <KpiChartContent kpi={kpi} />
                </div>
              </div>
              <DialogClose className="dialog-close-button bg-white rounded-full p-3 text-gray-800 opacity-100 hover:bg-gray-100 transition-colors border-2 border-gray-200 hover:border-gray-300 shadow-lg">
                <X className="w-6 h-6 text-gray-800" />
              </DialogClose>
            </DialogPrimitive.Content>
          </DialogPortal>
        </Dialog>
      </div>
    );
  } else {
    // Render compact version of KPI pill
    return (
      <div className="w-full">
        <motion.div
          className="w-full flex flex-col items-center cursor-pointer"
          variants={pillVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <span className="text-sm font-medium text-gray-800 w-full text-center truncate bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-md shadow-sm">
            {kpi.label}{" "}
            {kpi.trend === "up" ? (
              <ArrowUp size={16} className="inline text-emerald-600" />
            ) : kpi.trend === "down" ? (
              <ArrowDown size={16} className="inline text-rose-600" />
            ) : (
              <Equal size={16} className="inline text-amber-600" />
            )}
          </span>
        </motion.div>
      </div>
    );
  }
};

export default KpiPill;
