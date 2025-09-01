/**
 * @fileoverview InsightKPI component displays clickable KPI buttons that show 
 * detailed chart visualizations in a dialog.
 */
import React, { useState, useEffect } from "react";
import { BarChart2, LineChart, PieChart, AreaChart, X } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { CustomDialogContent } from "@/components/ui/custom-dialog-content";
import { InsightKPIData } from "../../lib/types";
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart as RechartsAreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/**
 * Props for the InsightKPI component
 * 
 * @interface
 * @property {InsightKPIData} kpi - The KPI data to display
 * @property {string} [color] - Optional color for the KPI button
 * @property {(open: boolean) => void} [onDialogChange] - Callback when dialog open state changes
 * @property {boolean} [isPlaceholder] - When true, displays a placeholder instead of actual content
 */
interface InsightKPIProps {
  kpi: InsightKPIData;
  color?: string;
  onDialogChange?: (open: boolean) => void;
  isPlaceholder?: boolean;
}

/**
 * Returns an appropriate icon based on the chart type
 * 
 * @param {string} chartType - The type of chart
 * @returns {JSX.Element} The icon component for the chart type
 */
const getChartIcon = (chartType: string) => {
  switch (chartType) {
    case "line":
      return <LineChart size={12} className="mr-0.5 sm:mr-1 lg:mr-1.5 lg:w-3.5 lg:h-3.5" />;
    case "area":
      return <AreaChart size={12} className="mr-0.5 sm:mr-1 lg:mr-1.5 lg:w-3.5 lg:h-3.5" />;
    case "pie":
      return <PieChart size={12} className="mr-0.5 sm:mr-1 lg:mr-1.5 lg:w-3.5 lg:h-3.5" />;
    case "bubble":
    case "scatter":
      // Use the circle dots of BarChart2 for bubble/scatter
      return <BarChart2 size={12} className="mr-0.5 sm:mr-1 lg:mr-1.5 lg:w-3.5 lg:h-3.5" style={{ transform: "rotate(45deg)" }} />;
    case "heatmap":
      // Use a rotated BarChart2 for heatmap
      return <BarChart2 size={12} className="mr-0.5 sm:mr-1 lg:mr-1.5 lg:w-3.5 lg:h-3.5" style={{ transform: "rotate(90deg)" }} />;
    case "waterfall":
      // Use a stylized BarChart for waterfall
      return <BarChart2 size={12} className="mr-0.5 sm:mr-1 lg:mr-1.5 lg:w-3.5 lg:h-3.5" style={{ opacity: 0.8 }} />;
    case "stacked":
    case "bar":
    default:
      return <BarChart2 size={12} className="mr-0.5 sm:mr-1 lg:mr-1.5 lg:w-3.5 lg:h-3.5" />;
  }
};

// Modern color palette for charts
const chartColors = {
  primary: '#4f46e5',   // indigo
  secondary: '#0ea5e9', // sky
  success: '#10b981',   // emerald
  warning: '#f59e0b',   // amber
  error: '#f43f5e',     // rose
  engagement: '#8b5cf6', // violet
  performance: '#06b6d4', // cyan
  branding: '#d946ef'    // fuchsia
};

// Array of chart colors for indexed access
const chartColorsArray = [
  chartColors.primary,
  chartColors.secondary,
  chartColors.success,
  chartColors.warning,
  chartColors.error,
  chartColors.engagement,
  chartColors.performance,
  chartColors.branding
];

/**
 * Transform a base color to a gradient pair
 * @param {string} color - The base color
 * @returns {object} - The gradient start and end colors
 */
const transformToGradient = (color: string): { start: string; end: string } => {
  // Check if the color is a hex color
  if (typeof color === 'string' && color.startsWith('#')) {
    // For indigo family colors (primary)
    if (color === chartColors.primary || color === '#4f46e5') {
      return {
        start: '#6366f1', // lighter indigo
        end: '#4338ca'    // darker indigo
      };
    } 
    // For sky family colors (secondary)
    else if (color === chartColors.secondary || color === '#0ea5e9') {
      return {
        start: '#38bdf8', // lighter sky
        end: '#0284c7'    // darker sky
      };
    }
    // For rose family colors (error)
    else if (color === chartColors.error || color === '#f43f5e') {
      return {
        start: '#fb7185', // lighter rose
        end: '#e11d48'    // darker rose
      };
    }
    // For emerald family colors (success)
    else if (color === chartColors.success || color === '#10b981') {
      return {
        start: '#34d399', // lighter emerald
        end: '#059669'    // darker emerald
      };
    }
    // For amber family colors (warning)
    else if (color === chartColors.warning || color === '#f59e0b') {
      return {
        start: '#fbbf24', // lighter amber
        end: '#d97706'    // darker amber
      };
    }
    // For violet family colors (engagement)
    else if (color === chartColors.engagement || color === '#8b5cf6') {
      return {
        start: '#a78bfa', // lighter violet
        end: '#7c3aed'    // darker violet
      };
    }
    // For cyan family colors (performance)
    else if (color === chartColors.performance || color === '#06b6d4') {
      return {
        start: '#22d3ee', // lighter cyan
        end: '#0891b2'    // darker cyan
      };
    }
    // For fuchsia family colors (branding)
    else if (color === chartColors.branding || color === '#d946ef') {
      return {
        start: '#e879f9', // lighter fuchsia
        end: '#c026d3'    // darker fuchsia
      };
    }
  }
  
  // Default gradient for fallback
  return {
    start: '#38bdf8', // light blue
    end: '#0284c7'    // dark blue
  };
};

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
 * Renders the appropriate chart based on the chart type
 * 
 * @param {InsightKPIData} kpi - The KPI data with chart information
 * @returns {JSX.Element} The rendered chart component
 */
const renderChart = (kpi: InsightKPIData) => {
  switch (kpi.chartType) {
    case "line":
      return (
        <ResponsiveContainer width="100%" height={400}>
          <RechartsLineChart data={kpi.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              {/* Gradient definitions for lines */}
              <linearGradient id="colorCompany" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0.3}/>
              </linearGradient>
              <linearGradient id="colorCompetitor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors.error} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={chartColors.error} stopOpacity={0.3}/>
              </linearGradient>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors.success} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={chartColors.success} stopOpacity={0.3}/>
              </linearGradient>
              <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors.secondary} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={chartColors.secondary} stopOpacity={0.3}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey="name" 
              stroke="#ffffff80" 
              fontSize={10} 
              tickLine={false}
              axisLine={{ stroke: '#ffffff40' }}
            />
            <YAxis 
              stroke="#ffffff80" 
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#ffffff40' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#333', 
                borderColor: '#555',
                borderRadius: '4px',
                color: '#fff' 
              }}
              itemStyle={{
                color: '#fff'
              }}
              labelStyle={{
                color: '#fff',
                fontWeight: 'bold',
                marginBottom: '5px',
                borderBottom: '1px solid #555',
                paddingBottom: '5px'
              }}
              formatter={(value: number, name: string) => [`${value}%`, name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')]}
            />
            <Legend 
              wrapperStyle={{ color: '#FFFFFF' }} 
              formatter={(value: string) => <span style={{ color: '#FFFFFF' }}>{value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>}
            />
            {kpi.chartData[0] && Object.keys(kpi.chartData[0])
              .filter(key => key !== 'name' && key !== 'action')
              .map((key, index) => {
                // Assign different colors and styles based on data keys
                let strokeColor = chartColorsArray[index % chartColorsArray.length];
                let strokeWidth = 2;
                let fillUrl = undefined;
                
                // Apply special styling for company vs competitor
                if (key === 'company') {
                  strokeColor = chartColors.primary;
                  fillUrl = "url(#colorCompany)";
                  strokeWidth = 3;
                } else if (key === 'competitor') {
                  strokeColor = chartColors.error;
                  fillUrl = "url(#colorCompetitor)";
                } else if (key === 'actual') {
                  strokeColor = chartColors.success;
                  fillUrl = "url(#colorActual)";
                  strokeWidth = 3; 
                } else if (key === 'projected') {
                  strokeColor = chartColors.secondary;
                  fillUrl = "url(#colorProjected)";
                  strokeWidth = 2;
                  // Use dashed line for projections
                  return (
                    <Line 
                      key={key}
                      type="monotone" 
                      dataKey={key} 
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray="5 5"
                      dot={{ r: 4, fill: strokeColor }}
                      activeDot={{ r: 8, fill: strokeColor, stroke: "#fff" }}
                    />
                  );
                }
                
                return (
                  <Line 
                    key={key}
                    type="monotone" 
                    dataKey={key} 
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    dot={{ r: 4, fill: strokeColor }}
                    activeDot={{ r: 8, fill: strokeColor, stroke: "#fff" }}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                );
              })}
          </RechartsLineChart>
        </ResponsiveContainer>
      );
      
    case "bar":
      return (
        <ResponsiveContainer width="100%" height={400}>
          <RechartsBarChart data={kpi.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              {/* Gradient definitions for bars */}
              {kpi.chartData[0] && Object.keys(kpi.chartData[0])
                .filter(key => key !== 'name')
                .map((key, index) => (
                  <linearGradient 
                    key={`gradientBar-${key}`}
                    id={`colorBar${key}`}
                    x1="0" y1="0" 
                    x2="0" y2="1"
                  >
                    <stop offset="5%" stopColor={chartColorsArray[index % chartColorsArray.length]} stopOpacity={0.9}/>
                    <stop offset="95%" stopColor={chartColorsArray[index % chartColorsArray.length]} stopOpacity={0.6}/>
                  </linearGradient>
                ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" tick={{ fill: '#FFFFFF' }} />
            <YAxis tick={{ fill: '#FFFFFF' }} tickFormatter={(value) => `${value}%`} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(30, 27, 75, 0.95)', 
                border: '1px solid #4f46e5', 
                borderRadius: '0.5rem',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
              }}
              cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
              itemStyle={{ color: '#FFFFFF' }}
              labelStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
              formatter={(value: number, name: string) => [`${value}%`, name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')]}
            />
            <Legend 
              wrapperStyle={{ color: '#FFFFFF' }} 
              formatter={(value: string) => <span style={{ color: '#FFFFFF' }}>{value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>}
            />
            {kpi.chartData[0] && Object.keys(kpi.chartData[0])
              .filter(key => key !== 'name')
              .map((key, index) => (
                <Bar 
                  key={key}
                  dataKey={key} 
                  fill={`url(#colorBar${key})`}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      );
      
    case "stacked":
      return (
        <ResponsiveContainer width="100%" height={400}>
          <RechartsBarChart data={kpi.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              {/* Gradient definitions for stacked bars */}
              {kpi.chartData[0] && Object.keys(kpi.chartData[0])
                .filter(key => key !== 'name')
                .map((key, index) => (
                  <linearGradient 
                    key={`gradientStack-${key}`}
                    id={`colorStack${key}`}
                    x1="0" y1="0" 
                    x2="0" y2="1"
                  >
                    <stop offset="5%" stopColor={chartColorsArray[index % chartColorsArray.length]} stopOpacity={0.9}/>
                    <stop offset="95%" stopColor={chartColorsArray[index % chartColorsArray.length]} stopOpacity={0.6}/>
                  </linearGradient>
                ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" tick={{ fill: '#FFFFFF' }} />
            <YAxis tick={{ fill: '#FFFFFF' }} tickFormatter={(value) => `${value}`} domain={[0, 250]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(30, 27, 75, 0.95)', 
                border: '1px solid #4f46e5', 
                borderRadius: '0.5rem',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
              }}
              cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
              itemStyle={{ color: '#FFFFFF' }}
              labelStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
              formatter={(value: number, name: string) => [`${value}`, name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')]}
            />
            <Legend 
              wrapperStyle={{ color: '#FFFFFF' }} 
              formatter={(value: string) => <span style={{ color: '#FFFFFF' }}>{value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>}
            />
            {kpi.chartData[0] && Object.keys(kpi.chartData[0])
              .filter(key => key !== 'name')
              .map((key, index) => (
                <Bar 
                  key={key}
                  dataKey={key} 
                  stackId="a"
                  fill={`url(#colorStack${key})`}
                  radius={index === 0 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      );
      
    case "area":
      return (
        <ResponsiveContainer width="100%" height={400}>
          <RechartsAreaChart data={kpi.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              {/* Gradient definitions for areas */}
              {kpi.chartData[0] && Object.keys(kpi.chartData[0])
                .filter(key => key !== 'name')
                .map((key, index) => (
                  <linearGradient 
                    key={`gradientArea-${key}`}
                    id={`colorArea${key}`}
                    x1="0" y1="0" 
                    x2="0" y2="1"
                  >
                    <stop offset="5%" stopColor={chartColorsArray[index % chartColorsArray.length]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={chartColorsArray[index % chartColorsArray.length]} stopOpacity={0.1}/>
                  </linearGradient>
                ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" tick={{ fill: '#FFFFFF' }} />
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              tick={{ fill: '#FFFFFF' }}
              tickFormatter={(value) => `${value}%`} 
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              tick={{ fill: '#FFFFFF' }} 
              tickFormatter={(value) => `$${value}M`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(30, 27, 75, 0.95)', 
                border: '1px solid #4f46e5', 
                borderRadius: '0.5rem',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
              }}
              itemStyle={{ color: '#FFFFFF' }}
              labelStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
              formatter={(value, name, props) => {
                // Determine if this is a revenue metric (right axis) based on name
                // since we can't directly access yAxisId from the props
                const revenueMetrics = ['revenue', 'sales', 'profit', 'income'];
                const isRightAxis = typeof name === 'string' && 
                  revenueMetrics.some(metric => name.toLowerCase().includes(metric));
                
                return [
                  isRightAxis ? `$${value}M` : `${value}%`, 
                  typeof name === 'string' ? name.charAt(0).toUpperCase() + name.slice(1) : name
                ];
              }}
            />
            <Legend 
              wrapperStyle={{ color: '#FFFFFF' }} 
              formatter={(value) => <span style={{ color: '#FFFFFF' }}>
                {typeof value === 'string' 
                  ? value.split('_')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                  : value
                }
              </span>}
            />
            {kpi.chartData[0] && Object.keys(kpi.chartData[0])
              .filter(key => key !== 'name')
              .map((key, index) => (
                <Area 
                  key={key}
                  type="monotone" 
                  dataKey={key} 
                  stroke={chartColorsArray[index % chartColorsArray.length]}
                  strokeWidth={2}
                  fill={`url(#colorArea${key})`}
                  activeDot={{ r: 8, fill: chartColorsArray[index % chartColorsArray.length], stroke: "#fff" }}
                  animationDuration={1500}
                  animationEasing="ease-out"
                  yAxisId={index % 2 === 0 ? "left" : "right"}
                />
              ))}
          </RechartsAreaChart>
        </ResponsiveContainer>
      );
      
    case "pie":
      return (
        <ResponsiveContainer width="100%" height={400}>
          <RechartsPieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              {/* Gradient definitions for pie sectors */}
              {kpi.chartData.map((entry, index) => (
                <linearGradient 
                  key={`gradientPie-${index}`} 
                  id={`colorPie${index}`} 
                  x1="0" y1="0" 
                  x2="1" y2="1"
                >
                  <stop offset="5%" stopColor={chartColorsArray[index % chartColorsArray.length]} stopOpacity={1}/>
                  <stop offset="95%" stopColor={chartColorsArray[(index + 3) % chartColorsArray.length]} stopOpacity={0.8}/>
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={kpi.chartData}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={150}
              innerRadius={60} // Add inner radius for donut chart
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              paddingAngle={2} // Add padding between sectors
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {kpi.chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#colorPie${index})`} 
                  stroke="#1e1e1e"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(30, 27, 75, 0.95)', 
                border: '1px solid #4f46e5', 
                borderRadius: '0.5rem',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
              }}
              itemStyle={{ color: '#FFFFFF' }}
              labelStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
              formatter={(value, name) => {
                const total = kpi.chartData.reduce((sum, item) => sum + (typeof item.value === 'number' ? item.value : 0), 0);
                const numValue = typeof value === 'number' ? value : 0;
                return [`${numValue} (${((total > 0 ? (numValue / total) : 0) * 100).toFixed(1)}%)`, name];
              }}
            />
            <Legend 
              wrapperStyle={{ color: '#FFFFFF', paddingTop: '20px' }} 
              formatter={(value) => <span style={{ color: '#FFFFFF' }}>{typeof value === 'string' ? value.charAt(0).toUpperCase() + value.slice(1) : value}</span>}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      );
      
    default:
      return <div className="text-white">No chart data available</div>;
  }
};

/**
 * InsightKPIDialog component displays detailed chart visualizations
 * in a dialog when a KPI is clicked.
 * 
 * @param {InsightKPIDialogProps} props - Component props
 * @returns {JSX.Element} The rendered InsightKPIDialog component
 */
const InsightKPIDialog: React.FC<InsightKPIDialogProps> = ({ kpi, onClose }) => {
  // Fix TypeScript errors with event listeners
  useEffect(() => {
    const handleDialogClick = (e: MouseEvent) => {
      e.stopPropagation();
    };

    // Query for dialog content once mounted
    const dialogElement = document.querySelector('.dialog-content');
    if (dialogElement) {
      dialogElement.addEventListener('click', handleDialogClick as EventListener);
    }

    return () => {
      if (dialogElement) {
        dialogElement.removeEventListener('click', handleDialogClick as EventListener);
      }
    };
  }, []);

  return (
    <CustomDialogContent
      className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-indigo-500/30 shadow-xl max-w-3xl mx-auto dialog-content"
      style={{ 
        boxShadow: '0 8px 32px rgba(79, 70, 229, 0.2)',
        maxHeight: '80vh',
        overflowY: 'auto',
        zIndex: 999
      }}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
          {kpi.chartTitle}
        </h2>
        <DialogClose asChild>
          <button 
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onClose();
            }}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-800/80 hover:bg-indigo-700 transition-colors"
            style={{ 
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 10px rgba(79, 70, 229, 0.3)'
            }}
          >
            <X size={16} className="text-indigo-200" />
          </button>
        </DialogClose>
      </div>
      
      <div className="p-2 rounded-lg bg-slate-900/50 backdrop-blur-sm border border-indigo-500/20">
        {renderChart(kpi)}
      </div>
    </CustomDialogContent>
  );
};

/**
 * InsightKPI component displays a clickable KPI button that opens a dialog
 * with detailed chart visualizations.
 * 
 * @param {InsightKPIProps} props - Component props
 * @returns {JSX.Element} The rendered InsightKPI component
 */
const InsightKPI: React.FC<InsightKPIProps> = ({ kpi, color, onDialogChange, isPlaceholder = false }) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Calculate size factors based on screen size
  const isLargeScreen = screenSize.width >= 1280; // xl breakpoint
  const isMediumScreen = screenSize.width >= 768 && screenSize.width < 1280; // md to lg
  
  // Dynamic sizing for KPI buttons
  const paddingX = isLargeScreen ? 'px-3' : isMediumScreen ? 'px-2' : 'px-1.5';
  const paddingY = isLargeScreen ? 'py-1.5' : isMediumScreen ? 'py-1' : 'py-0.5';
  const fontSize = isLargeScreen ? 'text-xs' : isMediumScreen ? 'text-[10px]' : 'text-[9px]';
  
  // Notify parent component when dialog state changes
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (onDialogChange) {
      onDialogChange(newOpen);
    }
  };
  
  // Default colors based on theme
  const baseColor = color || "rgba(79, 70, 229, 0.25)";
  
  // Get vibrant gradient colors
  const { start, end } = transformToGradient(baseColor);
  
  // Determine if the color is from a tile (passed as hex)
  const isFromTile = typeof color === 'string' && color.startsWith('#');
  
  // Light mode gradient backgrounds with distinct colors
  const gradientStyle = isHovered ? {
    backgroundImage: `linear-gradient(135deg, ${start}20, ${end}30)`,
    boxShadow: `0 4px 12px ${isFromTile ? color + '30' : 'rgba(79, 70, 229, 0.2)'}`,
    borderColor: isFromTile ? `${color}70` : 'rgba(129, 140, 248, 0.6)',
    color: isFromTile ? `${end}` : '#4338ca'
  } : {
    backgroundImage: `linear-gradient(135deg, ${end}10, ${start}20)`,
    borderColor: isFromTile ? `${color}40` : 'rgba(79, 70, 229, 0.25)',
    boxShadow: 'none',
    color: isFromTile ? `${end}` : '#4338ca'
  };

  // If placeholder, render a disabled button with similar styling
  if (isPlaceholder) {
    return (
      <button 
        className={`inline-flex items-center ${paddingX} ${paddingY} text-gray-400 ${fontSize} font-medium rounded-full transition-colors duration-200 border opacity-40 cursor-not-allowed`}
        style={{
          backgroundImage: `linear-gradient(135deg, ${end}10, ${start}10)`,
          borderColor: isFromTile ? `${color}20` : 'rgba(79, 70, 229, 0.1)',
        }}
        disabled
      >
        <span className="w-14 h-3 bg-gray-300 rounded-full"></span>
      </button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button 
          className={`inline-flex items-center ${paddingX} ${paddingY} ${fontSize} font-medium rounded-full transition-colors duration-200 border`}
          style={{
            ...gradientStyle
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            e.stopPropagation(); // Prevent the click from bubbling up to the card
            handleOpenChange(true);
          }}
        >
          {getChartIcon(kpi.chartType)}
          {kpi.label}
        </button>
      </DialogTrigger>
      
      <InsightKPIDialog kpi={kpi} onClose={() => handleOpenChange(false)} />
    </Dialog>
  );
};

// Export both components
export { InsightKPI, InsightKPIDialog };