import React, { useState, useMemo } from 'react';
import { AlertTriangle, ChevronRight, ChevronDown } from "lucide-react";

/**
 * Component to display chart data in a tabular format
 * 
 * @component
 * @param {Object} props - Component props
 * @param {any} props.data - The data to display in the table
 * @param {boolean} props.isFallbackData - Whether the data shown is fallback data
 * @param {string} props.chartType - Type of chart the data is for (e.g., 'heatmap')
 * @returns {JSX.Element} A table representation of the chart data
 */
const DataTable: React.FC<{ 
  data: any, 
  isFallbackData?: boolean,
  chartType?: string
}> = ({ data, isFallbackData = false, chartType = '' }) => {
  // If no data is provided, show a message
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <div className="flex items-center justify-center p-6">
        <p className="text-gray-500">No data available for table view</p>
      </div>
    );
  }

  // Check if chart is a heatmap - always add horizontal scrollbar
  const isHeatmap = chartType?.toLowerCase() === 'heatmap';
  
  // Show data too large warning for heatmaps with many data points
  const isHeatmapDataTooBig = useMemo(() => {
    if (!isHeatmap) return false;
    
    // For heatmaps, check the total number of data points
    if (Array.isArray(data)) {
      // Count total cells in the heatmap data
      let totalCells = 0;
      data.forEach(row => {
        if (row.data && Array.isArray(row.data)) {
          totalCells += row.data.length;
        }
      });
      
      return totalCells > 200; // Consider data too big if there are more than 200 cells
    }
    return false;
  }, [isHeatmap, data]);

  // Set height and width constraints for table container
  const getTableContainerStyle = () => {
    return {
      width: '100%',
      // No minimum height, allow it to be determined by content
      height: 'fit-content',
      overflowY: 'auto' as const,
      overflowX: 'auto' as const,
    };
  };

  // Get class names for table cells based on chart type
  const getTableCellClassNames = () => {
    const baseClasses = "px-4 py-2.5 text-sm text-gray-600";
    
    // Use smaller font and reduced padding for heatmaps
    if (isHeatmap) {
      return "px-2 py-1.5 text-xs text-gray-600";
    }
    
    return baseClasses;
  };

  // Get class names for table headers based on chart type
  const getTableHeaderClassNames = (isFirstColumn = false) => {
    const baseClasses = `px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${isFirstColumn ? 'min-w-[120px]' : ''}`;
    
    // Use smaller font and reduced padding for heatmaps
    if (isHeatmap) {
      return `px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${isFirstColumn ? 'min-w-[80px]' : ''}`;
    }
    
    return baseClasses;
  };

  // Check if data is in the {id, data} format where we should flatten it
  // with ids as column headers and data keys as row headers
  if (Array.isArray(data) && data.length > 0 && 
      data.every(item => item.hasOwnProperty('id') && item.hasOwnProperty('data'))) {
    
    // Extract all unique keys from all data objects to use as row headers
    const allDataKeys = new Set<string>();
    data.forEach(item => {
      if (typeof item.data === 'object' && item.data !== null) {
        Object.keys(item.data).forEach(key => allDataKeys.add(key));
      }
    });
    
    // Convert to array for table rows
    const rowKeys = Array.from(allDataKeys);
    
    // If heatmap data is too big, show table only with warning message
    if (isHeatmapDataTooBig) {
      return (
        <div className="flex flex-col h-full w-full">
          <div className="mb-3 flex items-center text-amber-600 text-sm">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span>Data too big to visualize as a chart. Table view provided instead.</span>
          </div>
          <div className="rounded-lg border border-gray-200 overflow-x-hidden scrollbar-visible overflow-y-auto overflow-scroll shadow-sm w-full h-full">
            <div className="overflow-x-hidden scrollbar-visible overflow-y-auto w-full h-full" style={getTableContainerStyle()}>
              <table className="w-full divide-y divide-gray-200 table-auto" style={{ 
                minWidth: `${Math.max(data.length * (isHeatmap ? 90 : 120), 500)}px`,
              }}>
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    {/* Skip the empty first column header entirely */}
                    {data.map((item) => (
                      <th key={item.id} className={getTableHeaderClassNames()}>
                        {formatHeaderText(String(item.id))}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {rowKeys.map((key, rowIndex) => (
                    <tr 
                      key={key} 
                      className={`hover:bg-gray-50 transition-colors ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}
                    >
                      {/* Note: First column now contains the key name */}
                      {data.map((item, columnIndex) => {
                        // For the first column, show the row key name
                        if (columnIndex === 0) {
                          return (
                            <td 
                              key={`rowkey-${key}`}
                              className={`${getTableCellClassNames()} font-medium bg-inherit whitespace-nowrap`}
                            >
                              <div className="flex items-center">
                                <span>{formatHeaderText(key)}</span>
                                <span className="mx-2 text-gray-400">:</span>
                                <span className="text-gray-600">
                                  <TableCellValue 
                                    value={item.data && item.data[key] !== undefined ? item.data[key] : '-'} 
                                    isHeatmap={isHeatmap}
                                  />
                                </span>
                              </div>
                            </td>
                          );
                        }
                        // For other columns, just show the values
                        return (
                          <td 
                            key={`${item.id}-${key}`} 
                            className={getTableCellClassNames()}
                          >
                            <TableCellValue 
                              value={item.data && item.data[key] !== undefined ? item.data[key] : '-'} 
                              isHeatmap={isHeatmap}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Custom scrollbar styles */}
          <style>{`
            .scrollbar-visible ::-webkit-scrollbar {
              width: 8px;
              height: 8px;
              display: block !important;
            }
            .scrollbar-visible ::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 4px;
            }
            .scrollbar-visible ::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 6px;
              border: 2px solid #f1f1f1;
            }
            .scrollbar-visible overflow-y-auto::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
            .scrollbar-visible {
              scrollbar-width: auto;
              scrollbar-color: #888 #f1f1f1;
            }
            /* For Firefox */
            .scrollbar-visible {
              scrollbar-width: thin;
              scrollbar-color: #888 #f1f1f1;
            }
            /* Ensure table container always respects parent width */
            .overflow-control {
              max-width: 100%;
              box-sizing: border-box;
            }
          `}</style>
        </div>
      );
    }
    
    return (
      <div className="flex max-h-full overflow-x-hidden scrollbar-visible overflow-y-auto w-full">
        <div className="rounded-lg border border-gray-200 overflow-scroll shadow-sm w-full overflow-x-hidden scrollbar-visible overflow-y-auto max-h-full">
          <div className="overflow-x-hidden scrollbar-visible overflow-y-auto w-full max-h-full" style={getTableContainerStyle()}>
            <table className="w-full divide-y divide-gray-200 table-auto" style={{ 
              minWidth: `${Math.max(data.length * (isHeatmap ? 90 : 120), 500)}px`,
            }}>
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  {/* Skip the empty first column header entirely */}
                  {data.map((item) => (
                    <th key={item.id} className={getTableHeaderClassNames()}>
                      {formatHeaderText(String(item.id))}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {rowKeys.map((key, rowIndex) => (
                  <tr 
                    key={key} 
                    className={`hover:bg-gray-50 transition-colors ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}
                  >
                    {/* Note: First column now contains the key name */}
                    {data.map((item, columnIndex) => {
                      // For the first column, show the row key name
                      if (columnIndex === 0) {
                        return (
                          <td 
                            key={`rowkey-${key}`}
                            className={`${getTableCellClassNames()} font-medium bg-inherit whitespace-nowrap`}
                          >
                            <div className="flex items-center">
                              <span>{formatHeaderText(key)}</span>
                              <span className="mx-2 text-gray-400">:</span>
                              <span className="text-gray-600">
                                <TableCellValue 
                                  value={item.data && item.data[key] !== undefined ? item.data[key] : '-'} 
                                  isHeatmap={isHeatmap}
                                />
                              </span>
                            </div>
                          </td>
                        );
                      }
                      // For other columns, just show the values
                      return (
                        <td 
                          key={`${item.id}-${key}`} 
                          className={getTableCellClassNames()}
                        >
                          <TableCellValue 
                            value={item.data && item.data[key] !== undefined ? item.data[key] : '-'} 
                            isHeatmap={isHeatmap}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom scrollbar styles */}
        <style>{`
          .scrollbar-visible ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
            display: block !important;
          }
          .scrollbar-visible ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }
          .scrollbar-visible ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 6px;
            border: 2px solid #f1f1f1;
          }
          .scrollbar-visible ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          .scrollbar-visible {
            scrollbar-width: auto;
            scrollbar-color: #888 #f1f1f1;
          }
          /* For Firefox */
          .scrollbar-visible {
            scrollbar-width: thin;
            scrollbar-color: #888 #f1f1f1;
          }
          /* Ensure table container always respects parent width */
          .overflow-control {
            max-width: 100%;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    );
  }

  // Handle non-array data objects (like hierarchical data for treemap, sunburst, etc.)
  if (!Array.isArray(data)) {
    // Convert object to array of key-value pairs for display
    const flatData = flattenObjectToArray(data);
    
    return (
      <div className="flex flex-col max-h-full overflow-x-hidden scrollbar-visible overflow-y-auto w-full">
        <div className="rounded-lg border border-gray-200 overflow-x-hidden scrollbar-visible overflow-y-auto overflow-scroll shadow-sm w-full max-h-full">
          <div className="overflow-x-hidden scrollbar-visible overflow-y-auto overflow-control w-full max-h-full" style={getTableContainerStyle()}>
            <table className="w-full divide-y divide-gray-200">
              {/* Remove the entire table header */}
              <tbody className="bg-white divide-y divide-gray-100">
                {flatData.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}
                  >
                    {/* Combine key and value in one cell */}
                    <td className={isHeatmap ? "px-2 py-1.5 text-xs" : "px-4 py-2.5 text-medium"}>
                      <div className="flex flex-row items-center">
                        <span className="font-medium text-gray-700 mr-2">{item.key}:</span>
                        <span className="text-gray-600">
                          <TableCellValue value={item.value} isHeatmap={isHeatmap} />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Custom scrollbar styles */}
        <style>{`
          .scrollbar-visible ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
            display: block !important;
          }
          .scrollbar-visible ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }
          .scrollbar-visible ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 6px;
            border: 2px solid #f1f1f1;
          }
          .scrollbar-visible ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          .scrollbar-visible  {
            scrollbar-width: auto;
            scrollbar-color: #888 #f1f1f1;
          }
        `}</style>
      </div>
    );
  }

  // Filter out formatting columns (like color, _color, etc)
  // and also filter out "pointless" columns
  const filteredData = useMemo(() => {
    // Identify columns to keep - remove both formatting and generic/pointless columns
    let columnsToKeep: string[] = [];
    
    // Check first data row for columns
    if (data && data.length > 0) {
      const firstRow = data[0];
      
      columnsToKeep = Object.keys(firstRow).filter(key => {
        // Skip formatting columns
        if (key.toLowerCase().includes('color') || 
            key.startsWith('_') || 
            key.toLowerCase().includes('format') || 
            key.toLowerCase().includes('style')) {
          return false;
        }
        
        // Skip columns with generic/pointless names
        const lowercaseKey = key.toLowerCase();
        const pointlessColumns = ['datakeys', 'data keys', 'data-keys', 'data_keys', 'key', 'keys', 'label', 'labels'];
        if (pointlessColumns.includes(lowercaseKey) || lowercaseKey === 'data') {
          return false;
        }
        
        return true;
      });
    }
    
    // Filter the data to only keep meaningful columns
    return data.map((row: any) => {
      const newRow: Record<string, any> = {};
      columnsToKeep.forEach(key => {
        newRow[key] = row[key];
      });
      return newRow;
    });
  }, [data]);

  // Get all keys from the first object to use as table headers
  const headers = useMemo(() => {
    return Object.keys(filteredData[0] || {});
  }, [filteredData]);
  
  // Skip rendering if no meaningful columns remain
  if (headers.length === 0) {
    return (
      <div className="flex items-center justify-center p-6">
        <p className="text-gray-500">No meaningful data available for table view</p>
      </div>
    );
  }

  // If heatmap data is too big, show warning message
  if (isHeatmapDataTooBig) {
    return (
      <div className="flex flex-col max-h-full overflow-x-hidden scrollbar-visible overflow-y-auto w-full">
        <div className="mb-3 flex items-center text-amber-600 text-sm">
          <AlertTriangle className="w-4 h-4 mr-1" />
          <span>Data too big to visualize as a chart. Table view provided instead.</span>
        </div>
        <div className="rounded-lg border border-gray-200 overflow-x-hidden scrollbar-visible overflow-y-auto overflow-scroll shadow-sm w-full max-h-full">
          <div className="overflow-x-hidden scrollbar-visible overflow-y-auto overflow-control w-full max-h-full" style={getTableContainerStyle()}>
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={header}
                      scope="col"
                      className={getTableHeaderClassNames(index === 0)}
                    >
                      {formatHeaderText(header)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredData.map((row: any, rowIndex: number) => (
                  <tr 
                    key={rowIndex} 
                    className={`hover:bg-gray-50 transition-colors ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}
                  >
                    {headers.map((header, colIndex) => {
                      const cellValue = row[header];
                      return (
                        <td 
                          key={`${rowIndex}-${header}`} 
                          className={getTableCellClassNames()}
                        >
                          <TableCellValue value={cellValue} isHeatmap={isHeatmap} />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Custom scrollbar styles */}
        <style>{`
          .scrollbar-visible ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
            display: block !important;
          }
          .scrollbar-visible ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }
          .scrollbar-visible ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 6px;
            border: 2px solid #f1f1f1;
          }
          .scrollbar-visible ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          .scrollbar-visible {
            scrollbar-width: auto;
            scrollbar-color: #888 #f1f1f1;
          }
          /* For Firefox */
          .scrollbar-visible {
            scrollbar-width: thin;
            scrollbar-color: #888 #f1f1f1;
          }
          /* Ensure table container always respects parent width */
          .overflow-control {
            max-width: 100%;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-h-full overflow-x-hidden scrollbar-visible overflow-y-auto w-full">
      <div className="rounded-lg border border-gray-200 overflow-x-hidden scrollbar-visible overflow-y-auto overflow-scroll shadow-sm w-full max-h-full">
        <div className="scrollbar-visible overflow-y-auto overflow-x-hidden overflow-control w-full max-h-full" style={getTableContainerStyle()}>
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={header}
                    scope="col"
                    className={getTableHeaderClassNames(index === 0)}
                  >
                    {formatHeaderText(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredData.map((row: any, rowIndex: number) => (
                <tr 
                  key={rowIndex} 
                  className={`hover:bg-gray-50 transition-colors ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}
                >
                  {headers.map((header, colIndex) => {
                    const cellValue = row[header];
                    return (
                      <td 
                        key={`${rowIndex}-${header}`} 
                        className={getTableCellClassNames()}
                      >
                        <TableCellValue value={cellValue} isHeatmap={isHeatmap} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-visible ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          display: block !important;
        }
        .scrollbar-visible ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .scrollbar-visible ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 6px;
          border: 2px solid #f1f1f1;
        }
        .scrollbar-visible ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .scrollbar-visible {
          scrollbar-width: auto;
          scrollbar-color: #888 #f1f1f1;
        }
        /* For Firefox */
        .scrollbar-visible {
          scrollbar-width: thin;
          scrollbar-color: #888 #f1f1f1;
        }
        /* Ensure table container always respects parent width */
        .overflow-control {
          max-width: 100%;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

/**
 * Format header text to be more readable
 */
const formatHeaderText = (header: string): string => {
  return header
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/^\w/, c => c.toUpperCase()) // Capitalize first letter
    .trim(); // Remove any extra spaces
};

/**
 * Checks if an object contains nested objects or arrays
 * @param obj Object to check
 * @returns Boolean indicating if object has nested objects/arrays
 */
const hasNestedObjects = (obj: any): boolean => {
  if (!obj || typeof obj !== 'object') return false;
  
  return Object.values(obj).some(value => 
    value !== null && typeof value === 'object'
  );
};

/**
 * Component to render cell values with expandable nested objects
 */
const TableCellValue: React.FC<{ 
  value: any,
  isHeatmap?: boolean 
}> = ({ value, isHeatmap = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Simple values (not objects or arrays)
  if (value === null || value === undefined) {
    return <>-</>;
  } else if (typeof value !== 'object') {
    return <>{formatSimpleValue(value, isHeatmap)}</>;
  } 
  
  // Handle arrays
  if (Array.isArray(value)) {
    // Empty array
    if (value.length === 0) return <>[]</>;
    
    // Array with simple values
    if (typeof value[0] !== 'object' || value[0] === null) {
      return <>{value.join(', ')}</>;
    }
    
    // Array with objects - make expandable
    return (
      <div className="max-w-full">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center text-blue-600 hover:text-blue-800 font-medium ${isHeatmap ? 'text-xs' : 'text-sm'}`}
        >
          {isExpanded ? 
            <ChevronDown className={`${isHeatmap ? 'w-4 h-4 mr-0.5' : 'w-4 h-4 mr-1'} flex-shrink-0`} /> : 
            <ChevronRight className={`${isHeatmap ? 'w-4 h-4 mr-0.5' : 'w-4 h-4 mr-1'} flex-shrink-0`} />
          }
          <span className="truncate">Array ({value.length} items)</span>
        </button>
        
        {isExpanded && (
          <div className={`${isHeatmap ? 'pl-2' : 'pl-4'} mt-1 border-l-2 border-gray-200 max-w-full overflow-scroll`}>
            <table className="w-full">
              <tbody>
                {value.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className={`${isHeatmap ? 'py-0.5 pr-1 text-sm' : 'py-1 pr-2 text-sm'} text-gray-500 align-top`}>{idx}:</td>
                    <td className={`${isHeatmap ? 'py-0.5 max-w-[150px]' : 'py-1 max-w-sm'}`}>
                      {typeof item === 'object' && item !== null ? (
                        <ExpandableObject object={item} isHeatmap={isHeatmap} />
                      ) : (
                        formatSimpleValue(item, isHeatmap)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
  
  // Handle objects
  return <ExpandableObject object={value} isHeatmap={isHeatmap} />;
};

/**
 * Component to render expandable objects
 */
const ExpandableObject: React.FC<{ 
  object: any,
  isHeatmap?: boolean 
}> = ({ object, isHeatmap = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const keys = Object.keys(object);
  
  // Check if the object has 3 or fewer keys and no nested objects
  const isSmallSimpleObject = keys.length <= 3 && !hasNestedObjects(object);
  
  // For small simple objects (3 or fewer keys, no nested objects), display as inline
  if (isSmallSimpleObject) {
    return (
      <div className={`flex flex-wrap items-center gap-1 bg-gray-50 ${isHeatmap ? 'px-1 py-0.5' : 'px-2 py-1'} rounded max-w-full overflow-scroll`}>
        {keys.map((key) => (
          <div key={key} className={`flex items-center ${isHeatmap ? 'text-sm' : 'text-sm'} overflow-scroll`}>
            <span className="font-medium text-gray-600 truncate">{key}:</span>
            <span className="ml-1 text-gray-800 truncate">{formatSimpleValue(object[key], isHeatmap)}</span>
          </div>
        ))}
      </div>
    );
  }
  
  // Default expandable view for larger or more complex objects
  return (
    <div className="max-w-full">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center text-blue-600 hover:text-blue-800 font-medium ${isHeatmap ? 'text-xs' : 'text-sm'}`}
      >
        {isExpanded ? 
          <ChevronDown className={`${isHeatmap ? 'w-4 h-4 mr-0.5' : 'w-4 h-4 mr-1'} flex-shrink-0`} /> : 
          <ChevronRight className={`${isHeatmap ? 'w-4 h-4 mr-0.5' : 'w-4 h-4 mr-1'} flex-shrink-0`} />
        }
        <span className="truncate">{keys.length > 0 ? `Object (${keys.length} properties)` : 'Empty Object'}</span>
      </button>
      
      {isExpanded && keys.length > 0 && (
        <div className={`${isHeatmap ? 'pl-2' : 'pl-4'} mt-1 border-l-2 border-gray-200 max-w-full overflow-scroll`}>
          <table className="w-full">
            <tbody>
              {keys.map((key) => (
                <tr key={key} className="border-b border-gray-100">
                  <td className={`${isHeatmap ? 'py-0.5 pr-1 text-sm' : 'py-1 pr-2 text-sm'} text-gray-500 font-medium align-top truncate`}>{key}:</td>
                  <td className={`${isHeatmap ? 'py-0.5 max-w-[150px]' : 'py-1 max-w-xs'}`}>
                    <TableCellValue value={object[key]} isHeatmap={isHeatmap} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/**
 * Format simple (non-object) cell values
 */
const formatSimpleValue = (value: any, isHeatmap = false): string | JSX.Element => {
  if (typeof value === 'number') {
    // Format numbers with commas for thousands but no trailing zeros
    return value.toLocaleString().replace(/\.0+$/, '');
  }
  
  if (typeof value === 'boolean') {
    return value ? 
      <span className={`px-2 py-1 ${isHeatmap ? 'text-[12px]' : 'text-xs'} font-medium rounded-full bg-emerald-50 text-emerald-700`}>True</span> : 
      <span className={`px-2 py-1 ${isHeatmap ? 'text-[12px]' : 'text-xs'} font-medium rounded-full bg-gray-50 text-gray-600`}>False</span>;
  }
  
  // Clean up strings by removing extra punctuation
  return String(value).trim();
};

/**
 * Converts a nested object into an array of key-value pairs
 */
const flattenObjectToArray = (obj: any, prefix = ''): Array<{key: string, value: any}> => {
  let result: Array<{key: string, value: any}> = [];
  
  // Process object properties
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Skip formatting properties
      if (key.toLowerCase().includes('color') || 
          key.startsWith('_') || 
          key.toLowerCase().includes('format') ||
          key.toLowerCase().includes('style')) {
        continue;
      }
      
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      // Format keys to be more readable - capitalize and add spaces
      const formattedKey = newKey
        .replace(/([A-Z])/g, ' $1')
        .replace(/\./g, ' › ')
        .replace(/^\w/, c => c.toUpperCase());
      
      result.push({ key: formattedKey, value });
    }
  }
  
  return result;
};

export default DataTable;