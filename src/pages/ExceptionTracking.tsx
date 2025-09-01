/**
 * @fileoverview ExceptionTracking component displays significant outliers from expected decision outcomes,
 * highlighting both positive surprises and concerning deviations.
 */
import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Bell, 
  Mail, 
  MessageSquare, 
  Calendar, 
  SortAsc, 
  Clock,
  CornerDownRight,
  Lightbulb
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

import { ExceptionData, allExceptions, sections } from "../components/exception_tracking/data";

type SortOption = "recency" | "urgency";

const ExceptionTracking: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortOption>("recency");
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  // Set component as mounted after initial render for animations
  useEffect(() => {
    setIsComponentMounted(true);
  }, []);
  
  /**
   * Renders an individual exception tile with metrics and styling based on exception type
   * 
   * @param {ExceptionData} exception - The exception data to render
   * @returns {JSX.Element} A styled motion div containing the exception information
   */
  const renderExceptionTile = (exception: ExceptionData) => {
    const isPositive = exception.type === "positive";
    const borderColor = isPositive ? "border-emerald-400" : "border-rose-400";
    const bgGradient = isPositive
      ? "bg-gradient-to-br from-emerald-50 to-white"
      : "bg-gradient-to-br from-rose-50 to-white";

    // Map urgency to colors and styles
    const urgencyColors: Record<string, string> = {
      "P0": "bg-red-100 text-red-800 border-red-200",
      "P1": "bg-orange-100 text-orange-800 border-orange-200",
      "P2": "bg-amber-100 text-amber-800 border-amber-200",
      "P3": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "P4": "bg-lime-100 text-lime-800 border-lime-200",
      "P5": "bg-green-100 text-green-800 border-green-200"
    };

    return (
      <motion.div
        className={`${bgGradient} border ${borderColor} rounded-xl p-4 h-auto overflow-hidden shadow-sm`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.15)",
          borderColor: isPositive ? "rgba(16, 185, 129, 0.8)" : "rgba(244, 63, 94, 0.8)"
        }}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start flex-1">
            <div className={`p-1.5 rounded-lg mr-2 ${isPositive ? "bg-emerald-100" : "bg-rose-100"}`}>
              {isPositive ? <TrendingUp size={20} className="text-emerald-600" /> : <TrendingDown size={20} className="text-rose-600" />}
            </div>
            <h3 className={`text-base font-semibold ${isPositive ? "text-emerald-700" : "text-rose-700"} line-clamp-2`}>
              {exception.title}
            </h3>
          </div>
          <Badge 
            variant="outline" 
            className={`ml-2 ${urgencyColors[exception.urgency]}`}
          >
            {exception.urgency}
          </Badge>
        </div>

        <div className="space-y-2 mt-3">
          {exception.metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{metric.label}</span>
                {metric.isPositive ? (
                  <span className="text-sm text-emerald-600 flex items-center">
                    <CheckCircle size={14} className="mr-1" />
                  </span>
                ) : (
                  <span className="text-sm text-rose-600 flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-1 mt-1">
                <div className="bg-gray-100 rounded px-2 py-1">
                  <span className="text-sm text-gray-600">Expected</span>
                  <p className="text-sm font-medium text-gray-800">{metric.expected}</p>
                </div>
                <div className={`rounded px-2 py-1 ${metric.isPositive
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-rose-100 text-rose-800"
                  }`}>
                  <span className="text-sm opacity-80">Actual</span>
                  <p className="text-sm font-medium">{metric.actual}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Suggested Actions Section */}
          {exception.suggestedActions && exception.suggestedActions.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1 mb-1.5">
                <Lightbulb size={14} className={isPositive ? "text-emerald-500" : "text-amber-500"} />
                <span className="text-xs font-medium text-gray-700">SUGGESTED ACTIONS</span>
              </div>
              <ul className="space-y-1">
                {exception.suggestedActions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CornerDownRight size={12} className="text-gray-400 mt-1" />
                    <span className="text-sm text-gray-700">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  // Sort controls component
  const SortButtonGroup = () => (
    <div 
      className={`inline-flex rounded-md mt-1 shadow-sm transition-opacity duration-300 ${isComponentMounted ? 'opacity-100' : 'opacity-0'}`} 
      style={{ minWidth: '180px' }}
    >
      <button
        type="button"
        className={`px-3 py-1.5 text-sm font-medium border border-gray-200 rounded-l-lg flex items-center gap-1.5
          ${sortBy === "recency"
            ? 'text-white bg-indigo-600 hover:bg-indigo-700'
            : 'text-gray-700 bg-white hover:bg-gray-50'
          }`}
        onClick={() => setSortBy("recency")}
        aria-current={sortBy === "recency" ? "page" : undefined}
      >
        <Clock size={14} className={sortBy === "recency" ? "text-white" : "text-gray-500"} />
        Recency
      </button>
      <button
        type="button"
        className={`px-3 py-1.5 text-sm font-medium border border-gray-200 rounded-r-lg flex items-center gap-1.5
          ${sortBy === "urgency"
            ? 'text-white bg-indigo-600 hover:bg-indigo-700'
            : 'text-gray-700 bg-white hover:bg-gray-50'
          }`}
        onClick={() => setSortBy("urgency")}
        aria-current={sortBy === "urgency" ? "page" : undefined}
      >
        <SortAsc size={14} className={sortBy === "urgency" ? "text-white" : "text-gray-500"} />
        Urgency
      </button>
    </div>
  );

  // Prepare data based on sorting option
  const organizedData = useMemo(() => {
    if (sortBy === "recency") {
      // Return original sections (grouped by time period)
      return sections;
    } else {
      // Group by urgency
      const urgencyGroups: Record<string, { id: string, title: string, tiles: ExceptionData[] }> = {
        "P0": { id: "p0", title: "Critical Priority (P0)", tiles: [] },
        "P1": { id: "p1", title: "High Priority (P1)", tiles: [] },
        "P2": { id: "p2", title: "Medium-High Priority (P2)", tiles: [] },
        "P3": { id: "p3", title: "Medium Priority (P3)", tiles: [] },
        "P4": { id: "p4", title: "Low-Medium Priority (P4)", tiles: [] },
        "P5": { id: "p5", title: "Low Priority (P5)", tiles: [] },
      };
      
      // Sort all exceptions into urgency groups
      allExceptions.forEach(exception => {
        urgencyGroups[exception.urgency].tiles.push(exception);
      });
      
      return Object.values(urgencyGroups);
    }
  }, [sortBy]);

  return (
    <div className="container mx-auto px-6 py-8 max-w-[92%] md:max-w-[91%]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-gray-800 md:max-w-[475px] py-3 min-h-[4.4rem] shadow-sm">
            <Bell className="text-blue-600 h-5 w-5 mt-0.5 relative top-[1px]" />
            <AlertTitle className="text-blue-800 text-lg">Quarterly Exception Alerts</AlertTitle>
            <AlertDescription className="text-gray-700 mt-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex items-center whitespace-nowrap bg-blue-100 px-2 py-1 rounded-md">
                    <Mail className="w-4 h-4 mr-1.5 text-blue-600" />
                    <span className="text-sm">Email Digest</span>
                  </span>
                  <span className="flex items-center whitespace-nowrap bg-green-100 px-2 py-1 rounded-md">
                    <MessageSquare className="w-4 h-4 mr-1.5 text-green-600" />
                    <span className="text-sm">Instant Alerts</span>
                  </span>
                </div>
                <span className="pl-4 text-xs text-blue-600 whitespace-nowrap">Customize in settings</span>
              </div>
            </AlertDescription>
          </Alert>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="self-center"
        >
          <SortButtonGroup />
        </motion.div>
      </div>

      <div className="space-y-10 mb-12">
        {organizedData.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + (sectionIndex * 0.1) }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                {sortBy === "recency" && (
                  <span className="text-sm pt-0.5 text-gray-600">({(section as any).quarter})</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.tiles.length > 0 ? (
                section.tiles.map((exception, index) => (
                  <div key={`${section.id}-tile-${index}`}>
                    {renderExceptionTile(exception)}
                  </div>
                ))
              ) : (
                <div className="col-span-2 p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-600">No exceptions found in this category</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExceptionTracking;