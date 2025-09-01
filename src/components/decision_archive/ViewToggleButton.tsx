import React from "react";
import { Calendar, BarChart } from "lucide-react";

/**
 * Type definition for grouping options
 */
export type GroupingOption = "quarter" | "insight";

interface ViewToggleButtonProps {
  groupingOption: GroupingOption;
  onToggle: (option: GroupingOption) => void;
  isComponentMounted: boolean;
}

/**
 * ButtonGroup component for toggling between quarter and insight views
 * Designed to avoid FOUC with opacity transition and fixed dimensions
 */
const ViewToggleButton: React.FC<ViewToggleButtonProps> = ({ 
  groupingOption, 
  onToggle,
  isComponentMounted 
}) => (
  <div
    className={`inline-flex rounded-md shadow-sm transition-opacity duration-300 ${isComponentMounted ? 'opacity-100' : 'opacity-0'}`}
    style={{ minWidth: '180px' }}
  >
    <button
      type="button"
      className={`px-3 py-2 text-sm font-medium border border-gray-200 rounded-l-lg flex items-center gap-1.5
        ${groupingOption === "quarter"
          ? 'text-white bg-indigo-600 hover:bg-indigo-700'
          : 'text-gray-700 bg-white hover:bg-gray-50'
        }`}
      onClick={() => onToggle("quarter")}
      aria-current={groupingOption === "quarter" ? "page" : undefined}
    >
      <Calendar size={16} className={groupingOption === "quarter" ? "text-white" : "text-gray-500"} />
      Quarter
    </button>
    <button
      type="button"
      className={`px-3 py-2 text-sm font-medium border border-gray-200 rounded-r-lg flex items-center gap-1.5
        ${groupingOption === "insight"
          ? 'text-white bg-indigo-600 hover:bg-indigo-700'
          : 'text-gray-700 bg-white hover:bg-gray-50'
        }`}
      onClick={() => onToggle("insight")}
      aria-current={groupingOption === "insight" ? "page" : undefined}
    >
      <BarChart size={16} className={groupingOption === "insight" ? "text-white" : "text-gray-500"} />
      Insight
    </button>
  </div>
);

export default ViewToggleButton;