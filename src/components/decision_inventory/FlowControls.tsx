/**
 * @fileoverview FlowControls component that provides a control panel 
 * with various buttons for manipulating the flowchart visualization.
 */
import React from 'react';
import { Panel } from 'reactflow';
import { Graph } from '@/lib/parseXML';
import FitViewButton from './FitViewButton';
import ZoomButtons from './ZoomButtons';
import ExpandAllButton from './ExpandAllButton';
import CollapseAllButton from './CollapseAllButton';

/**
 * Props for the FlowControls component
 * 
 * @interface
 * @property {React.MutableRefObject<Set<string>>} processedExpandedNodes - Reference to a set
 * of node IDs that have already been processed for expansion
 * @property {React.MutableRefObject<Set<string>>} processedCollapsedNodes - Reference to a set
 * of node IDs that have already been processed for collapse operations
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setExpandingAll - State setter
 * to track and display the expanding state
 * @property {Graph | null} cachedGraph - The cached graph data containing nodes and edges
 */
interface FlowControlsProps {
  processedExpandedNodes: React.MutableRefObject<Set<string>>;
  processedCollapsedNodes: React.MutableRefObject<Set<string>>;
  setExpandingAll: React.Dispatch<React.SetStateAction<boolean>>;
  cachedGraph: Graph | null;
}

/**
 * FlowControls component renders a control panel with buttons for common
 * flowchart operations: fit view, zoom in/out, expand all nodes, and collapse all nodes.
 * 
 * @param {FlowControlsProps} props - Component props
 * @returns {JSX.Element} The rendered control panel
 */
const FlowControls: React.FC<FlowControlsProps> = ({
  processedExpandedNodes,
  processedCollapsedNodes,
  setExpandingAll,
  cachedGraph
}) => {
  return (
    <Panel position="top-left">
      <div className="flex flex-col gap-1 bg-white rounded-sm shadow-md">
        {/* Fit view to show all nodes */}
        <FitViewButton />
        
        {/* Zoom in/out controls */}
        <ZoomButtons />
        
        {/* Expand all nodes in the flowchart */}
        {/* <ExpandAllButton
          processedExpandedNodes={processedExpandedNodes}
          setExpandingAll={setExpandingAll}
          cachedGraph={cachedGraph}
        /> */}
        
        {/* Collapse all expanded nodes */}
        <CollapseAllButton 
          processedCollapsedNodes={processedCollapsedNodes} 
        />
      </div>
    </Panel>
  );
};

export default FlowControls; 