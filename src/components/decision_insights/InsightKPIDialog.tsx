/**
 * @fileoverview Dialog component for displaying detailed KPI chart visualizations
 */
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { InsightKPIData } from "../../lib/types";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ScatterChart,
  ZAxis,
  RadialBarChart,
  RadialBar,
} from "recharts";

/**
 * Props for the InsightKPIDialog component
 * 
 * @interface
 * @property {InsightKPIData} kpi - The KPI data to display
 * @property {() => void} onClose - Callback when the dialog is closed
 */
interface InsightKPIDialogProps {
  kpi: InsightKPIData;
  onClose: () => void;
}

/**
 * Custom dialog content for insight KPI charts
 * 
 * @param {InsightKPIDialogProps} props - Component props
 * @returns {JSX.Element} The rendered InsightKPIDialog component
 */
const InsightKPIDialog: React.FC<InsightKPIDialogProps> = ({ kpi, onClose }) => {
  const [isClosed, setIsClosed] = useState(false);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  
  // Function to handle clicks outside the dialog content
  const handleDialogClick = (e: MouseEvent) => {
    if (dialogContentRef.current && !dialogContentRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  useEffect(() => {
    // Add event listener to document for handling clicks
    document.addEventListener('click', handleDialogClick);
    
    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('click', handleDialogClick);
    };
  }, []);
  
  // Function to determine which chart type to render based on kpi.chartType
  const renderChart = () => {
  switch (kpi.chartType) {
    case "line":
      return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={kpi.chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      );
      
    case "bar":
      return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={kpi.chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="value" fill="#818cf8" />
          </BarChart>
        </ResponsiveContainer>
      );
      
    case "pie":
      return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
            <Pie
              data={kpi.chartData}
              cx="50%"
              cy="50%"
              labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {kpi.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
              ))}
            </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }} />
          </PieChart>
        </ResponsiveContainer>
      );
      
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={kpi.chartData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis yAxisId="left" orientation="left" stroke="#64748b" />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Area type="monotone" dataKey="value" stroke="#4f46e5" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      // Default to bar chart if no chartType is specified
    default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={kpi.chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="value" fill="#818cf8" />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };
  
  // Helper function to get trend indicator color class
  const getTrendColorClass = () => {
    if (!kpi.trend) return "text-amber-600";
    return kpi.trend === "up" ? "text-emerald-600" : kpi.trend === "down" ? "text-rose-600" : "text-amber-600";
  };
  
  // Helper function to render trend icon
  const renderTrendIcon = () => {
    if (!kpi.trend) return <Minus size={16} className="text-amber-600" />;
    
    if (kpi.trend === "up") {
      return <TrendingUp size={16} className="text-emerald-600" />;
    } else if (kpi.trend === "down") {
      return <TrendingDown size={16} className="text-rose-600" />;
    } else {
      return <Minus size={16} className="text-amber-600" />;
    }
  };

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
      <DialogPrimitive.Content
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          setIsClosed(true);
        }}
        onEscapeKeyDown={onClose}
        className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg overflow-hidden"
        ref={dialogContentRef}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 flex justify-between items-center">
            <span className="flex-1">{kpi.label}</span>
            {kpi.percent !== undefined && (
              <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm ml-4">
                <span className={`font-semibold ${getTrendColorClass()}`}>
                  {kpi.percent > 0 ? "+" : ""}{kpi.percent}%
                </span>
                {renderTrendIcon()}
              </div>
            )}
          <button 
              onClick={onClose} 
              className="ml-4 bg-gray-100 p-1.5 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <X size={16} />
          </button>
          </DialogTitle>

          <DialogDescription className="text-gray-600">
            {kpi.description || "Detailed performance metrics"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-6">
          {renderChart()}
      </div>
      
        <div className="flex justify-between items-center mt-2 border-t border-gray-200 pt-4">
          <div className="text-sm text-gray-500 flex items-center">
            <Calendar size={14} className="mr-1" />
            Last updated: {new Date().toLocaleDateString()}
          </div>
          {kpi.value !== undefined && (
            <div className="text-sm font-medium text-gray-600">
              Current value: {kpi.value.toLocaleString()}
            </div>
          )}
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export default InsightKPIDialog; 