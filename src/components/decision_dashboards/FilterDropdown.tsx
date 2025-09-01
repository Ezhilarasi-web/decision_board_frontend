import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

// Modern Filter Dropdown component with improved styling
const FilterDropdown: React.FC<{
  allKPIIds: string[];
  selectedKPIs: string[];
  setSelectedKPIs: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ allKPIIds, selectedKPIs, setSelectedKPIs }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleKPISelection = (kpiId: string) => {
    if (selectedKPIs.includes(kpiId)) {
      setSelectedKPIs(selectedKPIs.filter(id => id !== kpiId));
    } else {
      setSelectedKPIs([...selectedKPIs, kpiId]);
    }
  };

  const clearAllFilters = () => {
    setSelectedKPIs([]);
    setIsOpen(false);
  };

  return (
    <div className="relative z-30">
      <button
        className="hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-gray-200 inline-flex items-center gap-1.5 shadow-sm"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Filter size={14} className="text-gray-500" />
        <span>{selectedKPIs.length > 0 ? `Filters (${selectedKPIs.length})` : 'Filter'}</span>
        <ChevronDown size={14} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg z-10">
          <div className="p-2.5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-600">Filter by KPI</span>
              {selectedKPIs.length > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {allKPIIds.map((kpiId) => (
                <button
                  key={kpiId}
                  onClick={() => handleKPISelection(kpiId)}
                  className={`px-2.5 py-1 text-xs rounded-md transition-all ${selectedKPIs.includes(kpiId)
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {kpiId}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;