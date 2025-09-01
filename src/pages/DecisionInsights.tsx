/**
 * @fileoverview DecisionInsights component that displays various charts and metrics related to
 * business decisions, campaign performance, and brand sentiment.
 */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart4,
  ArrowUpRight,
  DollarSign,
  Award,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Minus,
  Package,
  ShoppingCart,
  Calendar,
  MapPin,
  Target,
  PieChart as PieChartIcon,
  TrendingDown,
  CircleDollarSign,
  BarChart3,
  ChevronDown,
  MessageSquare
} from "lucide-react";
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
  FunnelChart,
  Funnel,
  LabelList,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import InsightCard from "../components/decision_insights/InsightCard";

import {
  colors,
  decisionStatsData,
  brandSentimentData,
  marketShareInsight,
  brandAwarenessInsight,
  marketPerformanceInsight,
  customerEngagementInsight
} from "../components/decision_insights/data";

/**
 * Props for the DecisionInsights component
 * 
 * @interface
 * @property {(page: number, insightId?: string) => void} [onNavigate] - Optional callback for navigation between pages
 */
interface DecisionInsightsProps {
  onNavigate?: (page: number, insightId?: string) => void;
}

/**
 * DecisionInsights component displays various metrics, charts and KPIs related to
 * business performance and decision insights.
 * 
 * @param {DecisionInsightsProps} props - Component props
 * @returns {JSX.Element} The rendered DecisionInsights component
 */
const DecisionInsights: React.FC<DecisionInsightsProps> = ({ onNavigate }) => {
  // State to track viewport height for responsive sizing
  const [viewportHeight, setViewportHeight] = useState(0);
  // Reference to the container element
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the Layout Effect hook to ensure scroll reset happens before paint
  useLayoutEffect(() => {
    // Reset scroll position for both window and container
    window.scrollTo(0, 0);
    
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    
    // Also reset any parent scrollable elements
    const scrollableParents = document.querySelectorAll('.overflow-y-auto');
    scrollableParents.forEach(element => {
      if (element instanceof HTMLElement) {
        element.scrollTop = 0;
      }
    });
    
    // Add listener to page transition events to reset scroll
    const handlePageTransition = () => {
      window.scrollTo(0, 0);
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    };
    
    window.addEventListener('pageTransitionClick', handlePageTransition);
    
    return () => {
      window.removeEventListener('pageTransitionClick', handlePageTransition);
    };
  }, []);

  // Effect to update viewport height on mount and resize
  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };
    
    // Set initial height
    updateViewportHeight();
    
    // Listen for resize events
    window.addEventListener('resize', updateViewportHeight);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateViewportHeight);
    };
  }, []);
  
  // Calculate dynamic grid sizing values based on viewport height
  const gridStyle = {
    // Dynamically calculate row heights based on viewport
    gridTemplateRows: viewportHeight >= 800 
      ? 'repeat(14, minmax(2rem, auto))' 
      : viewportHeight >= 600 
        ? 'repeat(14, minmax(1.75rem, auto))' 
        : 'repeat(14, minmax(1.5rem, auto))',
    // Set a minimum height that scales with viewport
    minHeight: viewportHeight ? `${Math.max(viewportHeight * 0.75, 500)}px` : '70vh',
    // Add dynamic spacing for larger viewports
    gap: viewportHeight >= 800 ? '1rem' : viewportHeight >= 600 ? '0.75rem' : '0.5rem',
  };

  // Dynamic header sizing based on viewport height
  const headerFontSize = viewportHeight >= 800 
    ? 'text-[11px] sm:text-sm md:text-base' 
    : viewportHeight >= 600 
      ? 'text-[10px] sm:text-sm' 
      : 'text-[9px] sm:text-xs';
  
  const subheaderFontSize = viewportHeight >= 800 
    ? 'text-[9px] sm:text-[10px] md:text-xs' 
    : viewportHeight >= 600 
      ? 'text-[8px] sm:text-[9px]' 
      : 'text-[7px] sm:text-[8px]';

  return (
    <div ref={containerRef} className="mx-auto px-2 sm:px-4 max-w-[95%] sm:max-w-[92%] h-full pt-2">
      {/* Grid layout with dynamic sizing based on viewport height */}
      <div 
        className="grid grid-cols-10 w-full mx-auto" 
        style={gridStyle}
      >
        {/* Tile 1: Brand Awareness (formerly Campaign Sentiment) (x1-x5, y1-y5) */}
        <motion.div
          className="col-span-5 row-[1/6] bg-gradient-to-br rounded-2xl shadow-md overflow-hidden border border-gray-200"
          style={{
            background: `linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(168, 85, 247, 0.05))`,
            borderColor: `${colors.tile1}40`
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-2 sm:p-3 h-full">
            <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center bg-violet-100">
                <MessageSquare className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-violet-600" />
              </div>
              <div>
                <h2 className={`font-bold text-gray-800 ${headerFontSize}`}>Brand Awareness</h2>
                <p className={`text-gray-500 ${subheaderFontSize}`}>Brand Recognition & Recall</p>
              </div>
            </div>

            <div className="mt-0.5 h-[calc(100%-2rem)] sm:h-[calc(100%-2.5rem)] flex flex-col justify-center">
              <div className="grid grid-cols-1 gap-1.5 sm:gap-3 h-full">
                {brandAwarenessInsight.map(insight => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    onNavigate={onNavigate}
                    tileColor={colors.tile1}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tile 2: Market Share and Revenue (formerly Brand Sentiment) (x6-x10, y1-y3) */}
        <motion.div
          className="col-span-5 row-[1/4] bg-gradient-to-br rounded-2xl shadow-md overflow-hidden border border-gray-200"
          style={{
            background: `linear-gradient(135deg, rgba(244, 63, 94, 0.08), rgba(225, 29, 72, 0.05))`,
            borderColor: `${colors.tile2}40`
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-2 sm:p-3 h-full">
            <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center bg-rose-100">
                <PieChartIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-600" />
              </div>
              <div>
                <h2 className={`font-bold text-gray-800 ${headerFontSize}`}>Market Share and Revenue</h2>
                <p className={`text-gray-500 ${subheaderFontSize} sm:mb-[4px]`}>Competitive Position & ROI</p>
              </div>
            </div>

            <div className="mt-0.5 h-[calc(100%-2rem)] sm:h-[calc(100%-2.5rem)] flex flex-col justify-center">
              <div className="grid grid-cols-1 gap-1.5 sm:gap-3 h-full">
                {marketShareInsight.map(insight => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    onNavigate={onNavigate}
                    tileColor={colors.tile2}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tile 3: Market Performance (formerly Conversion Rate) (x1-x5, y6-y10) */}
        <motion.div
          className="col-span-5 row-[6/11] bg-gradient-to-br rounded-2xl shadow-md overflow-hidden border border-gray-200"
          style={{
            background: `linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(8, 145, 178, 0.05))`,
            borderColor: `${colors.tile3}40`
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-2 sm:p-3 h-full">
            <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center bg-cyan-100">
                <Target className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-600" />
              </div>
              <div>
                <h2 className={`font-bold text-gray-800 ${headerFontSize}`}>Market Performance</h2>
                <p className={`text-gray-500 ${subheaderFontSize} sm:mb-[2px]`}>Sales Trends & Growth Metrics</p>
              </div>
            </div>

            <div className="mt-0.5 h-[calc(100%-2rem)] sm:h-[calc(100%-2.5rem)] flex flex-col justify-center">
              <div className="grid grid-cols-1 gap-1.5 sm:gap-3 h-full">
                {marketPerformanceInsight.map(insight => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    onNavigate={onNavigate}
                    tileColor={colors.tile3}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tile 4: Customer Engagement & Loyalty (formerly CTR Performance) (x6-x10, y4-y12) */}
        <motion.div
          className="col-span-5 row-[4/11] bg-gradient-to-br rounded-2xl shadow-md overflow-hidden border border-gray-200"
          style={{
            background: `linear-gradient(135deg, rgba(79, 70, 229, 0.08), rgba(67, 56, 202, 0.05))`,
            borderColor: `${colors.tile4}40`
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-2 sm:p-3 h-full">
            <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center bg-indigo-100">
                <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-600" />
              </div>
              <div>
                <h2 className={`font-bold text-gray-800 ${headerFontSize}`}>Customer Engagement & Loyalty</h2>
                <p className={`text-gray-500 ${subheaderFontSize} sm:mb-[3px]`}>Retention & Satisfaction Metrics</p>
              </div>
            </div>

            <div className="mt-0.5 h-[calc(100%-2rem)] sm:h-[calc(100%-2.5rem)] flex flex-col justify-center">
              <div className="grid grid-cols-1 gap-1.5 sm:gap-3 h-full">
                {customerEngagementInsight.map(insight => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    onNavigate={onNavigate}
                    tileColor={colors.tile4}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tile 5: Combined Decision Info (x1-x10, y11-y14) */}
        <motion.div
          className="col-span-10 row-[11/14] bg-gradient-to-br rounded-2xl shadow-md overflow-hidden border border-gray-200"
          style={{
            background: `linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(2, 132, 199, 0.05))`,
            borderColor: `${colors.tile5}40`
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-1.5 sm:p-2.5 h-full">
            <div className="grid grid-cols-2 gap-1.5 sm:gap-3 h-full">
              {/* Most Recent Decision Section */}
              <div className="h-full flex flex-col">
                <div className="flex items-center gap-1.5 h-5 sm:h-7">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center bg-sky-100">
                    <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-600" />
                  </div>
                  <h2 className={`font-bold text-gray-800 ${headerFontSize}`}>Most Recent Decision</h2>
                </div>

                <div
                  className="rounded-lg p-1.5 sm:p-2 flex flex-col justify-between border flex-1 bg-white"
                  style={{
                    borderColor: `${colors.sky}30`
                  }}
                >
                  <div className="pt-0 sm:pt-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-gray-800 text-[10px] sm:text-xs font-medium">Increased Marketing Spend</span>
                      <div className="px-1.5 sm:px-2 py-0.5 text-[7px] sm:text-[9px] rounded-full whitespace-nowrap bg-violet-100 text-violet-600">Excellent Impact</div>
                    </div>
                    <p className="text-gray-500 text-[8px] sm:text-[10px] mt-0.5 line-clamp-2">Boost advertising and promotions by 15% to capture more market share.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                    <div className="flex items-center gap-0.5 whitespace-nowrap">
                      <TrendingUp className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0 text-emerald-600" />
                      <span className="text-gray-500 text-[8px] sm:text-[10px]">ROI: +32%</span>
                    </div>
                    <div className="flex items-center gap-0.5 whitespace-nowrap">
                      <MapPin className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0 text-sky-600" />
                      <span className="text-gray-500 text-[8px] sm:text-[10px]">National Campaign</span>
                    </div>
                    <div className="flex items-center gap-0.5 whitespace-nowrap">
                      <Calendar className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0 text-indigo-600" />
                      <span className="text-gray-500 text-[8px] sm:text-[10px]">Feb 5, 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decision Performance Section */}
              <div className="h-full flex flex-col">
                <div className="flex items-center gap-1.5 h-5 sm:h-7">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center bg-sky-100">
                    <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-600" />
                  </div>
                  <h2 className={`font-bold text-gray-800 ${headerFontSize}`}>Decision Performance</h2>
                </div>

                <div
                  className="rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border flex-1 bg-white"
                  style={{
                    borderColor: `${colors.sky}30`
                  }}
                >
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 h-full">
                    {/* Left side: Chart */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative w-20 sm:w-24 h-10 sm:h-12">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={decisionStatsData}
                              cx="50%"
                              cy="100%"
                              startAngle={180}
                              endAngle={0}
                              innerRadius={18}
                              outerRadius={30}
                              dataKey="value"
                            >
                              {decisionStatsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="flex flex-col items-center -mt-1.5">
                        <div className="text-sm sm:text-base font-bold text-gray-800">30</div>
                        <div className="text-[8px] sm:text-[10px] text-gray-500">Total Decisions</div>
                      </div>
                    </div>

                    {/* Right side: Legend and Stats */}
                    <div className="flex flex-col justify-center space-y-0.5 sm:space-y-1">
                      {decisionStatsData.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                            <span className="text-gray-700 text-[8px] sm:text-[10px]">{entry.name}</span>
                          </div>
                          <div className="flex items-center gap-0.5 sm:gap-1">
                            <span className="text-gray-800 text-[8px] sm:text-[10px] font-medium">{entry.value}</span>
                            <span className="text-gray-500 text-[7px] sm:text-[9px]">({Math.round(entry.value / 30 * 100)}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DecisionInsights;