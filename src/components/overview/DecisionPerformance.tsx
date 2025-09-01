/**
 * @fileoverview DecisionPerformance component displaying decision metrics
 * 
 * This component displays various decision performance metrics including:
 * - Marketing ROI and Target Achievement metrics
 * - Consumer insights and decision quality metrics
 * - Decision impact metrics with progress bars
 * - Process performance and top performing decisions
 */
import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, Award, Target, Newspaper, Calendar, DollarSign,
  Users, Globe, ShoppingBag
} from "lucide-react";

/**
 * Props for the DecisionPerformance component
 * @interface DecisionPerformanceProps
 * @property {string} [customScrollClass] - Optional CSS class for custom scrollbar styling
 */
interface DecisionPerformanceProps {
  customScrollClass?: string;
}

/**
 * DecisionPerformance component showing performance metrics for decisions
 * 
 * @component
 * @param {DecisionPerformanceProps} props - Component props
 * @returns {JSX.Element} Rendered DecisionPerformance component
 */
const DecisionPerformance: React.FC<DecisionPerformanceProps> = ({ customScrollClass = "" }) => {
  return (
    <motion.div
      className="h-full w-full rounded-xl border border-gray-200 bg-white shadow-md p-4 md:p-6 flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Card header */}
      <div className="flex justify-between items-center mb-3 shrink-0">
        <h2 className="text-xl md:text-xl font-bold text-gray-800">
          Decision Performance
        </h2>
        <span className="text-sm text-gray-500">Q3 2024</span>
      </div>

      {/* Scrollable content area */}
      <div className={`flex-1 overflow-y-auto pr-2 ${customScrollClass} decision-board-scroll`}>
        {/* Key performance indicators - ROI and Target metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {/* Marketing ROI metric with circular progress */}
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex">
            <div className="w-1/2 flex flex-col justify-center">
              <div className="text-xs text-gray-500 mb-1">Marketing ROI</div>
              <div className="text-2xl font-bold text-gray-800">3.8x</div>
              <div className="flex items-center text-emerald-600 text-xs mt-1">
                <TrendingUp size={12} className="mr-1" /> +0.6x vs Q2
              </div>
            </div>

            {/* Circular progress indicator */}
            <div className="w-1/2 flex items-center justify-center">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200 stroke-current"
                    strokeWidth="10"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-emerald-500 stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    strokeDasharray="251.2"
                    strokeDashoffset="75"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award size={20} className="text-emerald-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Target Achievement metric with linear progress */}
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex">
            <div className="w-1/2 flex flex-col justify-center">
              <div className="text-xs text-gray-500 mb-1">Target Achievement</div>
              <div className="text-2xl font-bold text-gray-800">92%</div>
              <div className="flex items-center text-amber-600 text-xs mt-1">
                <Target size={12} className="mr-1" /> 8% to goal
              </div>
            </div>

            {/* Linear progress indicator */}
            <div className="w-1/2 flex items-center justify-center">
              <div className="w-full">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: '92%' }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">0</span>
                  <span className="text-amber-600 font-medium">92%</span>
                  <span className="text-gray-500">100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary metrics - three key indicators */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {/* Consumer Insights metric */}
          <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
            <div className="flex items-center mb-1">
              <div className="bg-blue-100 p-1 rounded-md mr-1">
                <Newspaper size={12} className="text-blue-600" />
              </div>
              <span className="text-xs text-gray-700">Consumer Insights</span>
            </div>
            <div className="text-lg font-bold text-gray-800">86%</div>
            <div className="text-xs text-gray-500">Decision Confidence</div>
          </div>

          {/* Time to Market metric */}
          <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
            <div className="flex items-center mb-1">
              <div className="bg-purple-100 p-1 rounded-md mr-1">
                <Calendar size={12} className="text-purple-600" />
              </div>
              <span className="text-xs text-gray-700">Time to Market</span>
            </div>
            <div className="text-lg font-bold text-gray-800">-18%</div>
            <div className="text-xs text-gray-500">vs. Industry Avg.</div>
          </div>

          {/* Cost Efficiency metric */}
          <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
            <div className="flex items-center mb-1">
              <div className="bg-emerald-100 p-1 rounded-md mr-1">
                <DollarSign size={12} className="text-emerald-600" />
              </div>
              <span className="text-xs text-gray-700">Cost Efficiency</span>
            </div>
            <div className="text-lg font-bold text-gray-800">+24%</div>
            <div className="text-xs text-gray-500">YoY Improvement</div>
          </div>
        </div>

        {/* Additional metrics section */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Decision Quality Metrics</h4>
          <div className="grid grid-cols-2 gap-3">
            {/* Stakeholder Alignment metric */}
            <div className="flex items-center">
              <div className="bg-violet-100 p-2 rounded-lg mr-3">
                <Users size={14} className="text-violet-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Stakeholder Alignment</div>
                <div className="text-lg font-bold text-gray-800">92%</div>
              </div>
            </div>

            {/* Outcome Consistency metric */}
            <div className="flex items-center">
              <div className="bg-rose-100 p-2 rounded-lg mr-3">
                <Target size={14} className="text-rose-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Outcome Consistency</div>
                <div className="text-lg font-bold text-gray-800">84%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact metrics section - progress bars showing decision impact */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Decision Impact</h4>
          <div className="space-y-2">
            {/* Revenue Generation impact */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">Revenue Generation</span>
                <span className="text-xs text-emerald-600">Very High</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '95%' }}></div>
              </div>
            </div>

            {/* Cost Reduction impact */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">Cost Reduction</span>
                <span className="text-xs text-amber-600">Medium</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: '60%' }}></div>
              </div>
            </div>

            {/* Brand Enhancement impact */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">Brand Enhancement</span>
                <span className="text-xs text-indigo-600">High</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Process metrics section - key performance indicators for decision-making process */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Process Performance</h4>
          <div className="grid grid-cols-3 gap-2">
            {/* Decision Time metric */}
            <div>
              <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-gray-800">4.2</div>
                <div className="text-xs text-gray-500 mt-1">days avg.</div>
                <div className="text-xs text-emerald-600">Decision Time</div>
              </div>
            </div>

            {/* Implementation Success metric */}
            <div>
              <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-gray-800">97%</div>
                <div className="text-xs text-gray-500 mt-1">success rate</div>
                <div className="text-xs text-emerald-600">Implementation</div>
              </div>
            </div>

            {/* Team Satisfaction metric */}
            <div>
              <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-gray-800">8.9</div>
                <div className="text-xs text-gray-500 mt-1">out of 10</div>
                <div className="text-xs text-emerald-600">Team Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top performing decisions section - showcases best decision outcomes */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Top Performing Decisions</h4>
          <div className="space-y-2">
            {/* Product Mix Optimization decision */}
            <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="bg-indigo-100 p-1.5 rounded-md mr-2">
                  <ShoppingBag size={14} className="text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">Product Mix Optimization</div>
                  <div className="text-xs text-gray-500">Q2 2023</div>
                </div>
              </div>
              <div className="text-emerald-600 text-sm font-medium">+32% ROI</div>
            </div>

            {/* Market Expansion decision */}
            <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="bg-amber-100 p-1.5 rounded-md mr-2">
                  <Globe size={14} className="text-amber-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">Market Expansion</div>
                  <div className="text-xs text-gray-500">Q1 2023</div>
                </div>
              </div>
              <div className="text-emerald-600 text-sm font-medium">+28% Revenue</div>
            </div>
          </div>
        </div>
        
        {/* Add bottom padding for graceful scrolling */}
        <div className="h-4"></div>
      </div>
    </motion.div>
  );
};

export default DecisionPerformance;