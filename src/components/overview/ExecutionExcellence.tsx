/**
 * @fileoverview ExecutionExcellence component that displays key performance metrics
 * 
 * This component displays execution metrics across different business areas:
 * - Campaign Performance (CTR, Engagement, Conversion)
 * - Product Launch Performance
 * - Retail Distribution
 * - Media Performance
 */
import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, ShoppingCart, Users, Percent, ChevronRight, Package,
  Calendar, ArrowUpRight, ShoppingBag
} from "lucide-react";

/**
 * Props for the ExecutionExcellence component
 * @interface ExecutionExcellenceProps
 * @property {string} [customScrollClass] - Optional CSS class for custom scrollbar styling
 */
interface ExecutionExcellenceProps {
  customScrollClass?: string;
}

/**
 * ExecutionExcellence component showing performance metrics
 * 
 * @component
 * @param {ExecutionExcellenceProps} props - Component props
 * @returns {JSX.Element} Rendered ExecutionExcellence component
 */
const ExecutionExcellence: React.FC<ExecutionExcellenceProps> = ({ customScrollClass = "" }) => {
  return (
    <motion.div
      className="h-full w-full rounded-xl border border-gray-200 bg-white shadow-md p-4 md:p-6 flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Card header */}
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">
          Execution Excellence
        </h2>
        <span className="text-sm text-gray-500">Last 30 days</span>
      </div>

      {/* Scrollable content area */}
      <div className={`flex-1 overflow-y-auto pr-2 space-y-4 ${customScrollClass} decision-board-scroll`}>
        {/* Campaign Performance Section */}
        <div className="bg-gray-50 rounded-lg p-3 md:p-4 border border-gray-200">
          <div className="flex justify-between mb-3">
            <h3 className="text-gray-700 font-semibold text-sm md:text-base">Campaign Conversion</h3>
            <div className="flex items-center text-emerald-600 text-xs md:text-sm font-medium">
              <TrendingUp size={14} className="mr-1" /> +12.3%
            </div>
          </div>
          {/* Campaign metrics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4">
            {/* CTR Metric */}
            <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <ShoppingCart size={16} className="text-indigo-600" />
                </div>
                <span className="text-xs text-indigo-600">CTR</span>
              </div>
              <div className="mt-2">
                <span className="text-lg md:text-xl font-bold text-gray-800">4.2%</span>
                <span className="text-emerald-600 text-xs ml-1">↑ 0.8%</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">vs. benchmark: 3.1%</div>
            </div>

            {/* Engagement Metric */}
            <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <Users size={16} className="text-amber-600" />
                </div>
                <span className="text-xs text-amber-600">Engagement</span>
              </div>
              <div className="mt-2">
                <span className="text-lg md:text-xl font-bold text-gray-800">7.8M</span>
                <span className="text-emerald-600 text-xs ml-1">↑ 22%</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Across all channels</div>
            </div>

            {/* Conversion Metric */}
            <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div className="bg-rose-100 p-2 rounded-lg">
                  <Percent size={16} className="text-rose-600" />
                </div>
                <span className="text-xs text-rose-600">Conversion</span>
              </div>
              <div className="mt-2">
                <span className="text-lg md:text-xl font-bold text-gray-800">6.5%</span>
                <span className="text-emerald-600 text-xs ml-1">↑ 1.2%</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">From impression to sale</div>
            </div>
          </div>
        </div>

        {/* Product Launch Performance */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between mb-3">
            <h3 className="text-gray-700 font-semibold">New Product Performance</h3>
            <div className="flex items-center text-gray-500 text-sm">
              <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full">Q3 Launch</span>
            </div>
          </div>

          <div className="space-y-3">
            {/* Replace bar chart with progress bars */}
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700 pr-3 text-nowrap">Week 1</span>
                <div className="w-[85%] h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: '85%' }}></div>
                </div>
                <span className="text-xs text-indigo-600 ml-2 w-8 text-right">85%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700 pr-2 text-nowrap">Week 2</span>
                <div className="w-[85%] h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: '72%' }}></div>
                </div>
                <span className="text-xs text-indigo-600 ml-2 w-8 text-right">72%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700 pr-2 text-nowrap">Week 3</span>
                <div className="w-[85%] h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: '92%' }}></div>
                </div>
                <span className="text-xs text-indigo-600 ml-2 w-8 text-right">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700 pr-2 text-nowrap">Week 4</span>
                <div className="w-[85%] h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: '78%' }}></div>
                </div>
                <span className="text-xs text-indigo-600 ml-2 w-8 text-right">78%</span>
              </div>
            </div>

            <div className="flex justify-between mt-2">
              <div className="flex space-x-4">
                <div>
                  <div className="text-xs text-gray-500">Units Sold</div>
                  <div className="text-lg font-bold text-gray-800">384.5K</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Revenue</div>
                  <div className="text-lg font-bold text-gray-800">$2.7M</div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-700 mr-1">View Details</span>
                <ChevronRight size={16} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Retail Performance Section */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between mb-3">
            <h3 className="text-gray-700 font-semibold">Retail Distribution</h3>
            <div className="flex items-center text-emerald-600 text-sm font-medium">
              <Package size={14} className="mr-1" /> +8 new locations
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between">
                <div>
                  <div className="text-xs text-gray-500">Store Count</div>
                  <div className="text-lg font-bold text-gray-800">1,248</div>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg self-start">
                  <ShoppingBag size={16} className="text-blue-600" />
                </div>
              </div>
              <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: '78%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">78% of target coverage</div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between">
                <div>
                  <div className="text-xs text-gray-500">Shelf Share</div>
                  <div className="text-lg font-bold text-gray-800">42.3%</div>
                </div>
                <div className="bg-purple-100 p-2 rounded-lg self-start">
                  <ArrowUpRight size={16} className="text-purple-600" />
                </div>
              </div>
              <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full" style={{ width: '42.3%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">+3.7% vs last quarter</div>
            </div>
          </div>
        </div>

        {/* Media Performance Section */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between mb-3">
            <h3 className="text-gray-700 font-semibold">Media Performance</h3>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar size={14} className="mr-1" /> Last 90 days
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                <span className="text-xs text-gray-700">Digital</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-xs text-gray-700">TV</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-rose-500 mr-2"></div>
                <span className="text-xs text-gray-700">Print</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                <span className="text-xs text-gray-700">OOH</span>
              </div>
            </div>

            {/* Media spend distribution chart */}
            <div className="w-full h-6 flex rounded-md overflow-hidden">
              <div className="bg-indigo-500" style={{ width: '48%' }}></div>
              <div className="bg-amber-500" style={{ width: '32%' }}></div>
              <div className="bg-rose-500" style={{ width: '12%' }}></div>
              <div className="bg-emerald-500" style={{ width: '8%' }}></div>
            </div>

            <div className="mt-2 grid grid-cols-4 gap-2">
              <div>
                <div className="text-xs text-gray-500">Digital</div>
                <div className="text-sm font-bold text-gray-800">$4.8M</div>
                <div className="text-xs text-indigo-600">48%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">TV</div>
                <div className="text-sm font-bold text-gray-800">$3.2M</div>
                <div className="text-xs text-amber-600">32%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Print</div>
                <div className="text-sm font-bold text-gray-800">$1.2M</div>
                <div className="text-xs text-rose-600">12%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">OOH</div>
                <div className="text-sm font-bold text-gray-800">$0.8M</div>
                <div className="text-xs text-emerald-600">8%</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add bottom padding for graceful scrolling */}
        <div className="h-4"></div>
      </div>
    </motion.div>
  );
};

export default ExecutionExcellence;