/**
 * @fileoverview Legend component that displays a color-coded legend
 * for the different node types in the decision flowchart.
 */
import React from 'react';
import { Panel } from 'reactflow';
import { typeColors } from './constants';

/**
 * Legend component renders a floating panel with a color key for
 * each type of node in the flowchart, helping users understand the
 * meaning of different node colors.
 * 
 * @returns {JSX.Element} The rendered legend panel
 */
const Legend: React.FC = () => {
  return (
    <Panel position="bottom-left" className="mb-2 pb-15 mr-2">
      <div className="bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-gray-700 shadow-lg">
        <h3 className="text-white text-sm font-medium mb-2">Legend</h3>
        
        {/* Legend items for each node type */}
        <div className="flex flex-col gap-2">
          {/* Root node - typically represents the main user or starting point */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColors.root }}></div>
            <span className="text-white text-xs">Root</span>
          </div>
          
          {/* Key Paradigm nodes - major decision categories */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColors.keyParadigm }}></div>
            <span className="text-white text-xs">Key Paradigm</span>
          </div>
          
          {/* Strategic Inquiry nodes - high-level strategic questions */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColors.strategicInquiry }}></div>
            <span className="text-white text-xs">Strategic Inquiry</span>
          </div>
          
          {/* Guiding Inquiry nodes - specific questions guiding decisions */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColors.guidingInquiry }}></div>
            <span className="text-white text-xs">Guiding Inquiry</span>
          </div>
          
          {/* Scenario nodes - hypothetical situations or contexts */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColors.scenario }}></div>
            <span className="text-white text-xs">Scenario</span>
          </div>
          
          {/* KPI nodes - performance indicators and metrics */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColors.kpi }}></div>
            <span className="text-white text-xs">KPI</span>
          </div>
          
          {/* End Decision nodes - final choices or outcomes */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColors.endDecision }}></div>
            <span className="text-white text-xs">End Decision</span>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default Legend; 