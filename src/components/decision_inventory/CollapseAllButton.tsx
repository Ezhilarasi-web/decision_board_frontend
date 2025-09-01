/**
 * @fileoverview CollapseAllButton component that provides a button to collapse
 * all expanded nodes in the decision flowchart at once.
 */
import React from 'react';
import { Minimize2 } from 'lucide-react';
import { useReactFlow } from 'reactflow';

/**
 * Props for the CollapseAllButton component
 * 
 * @interface
 * @property {React.MutableRefObject<Set<string>>} processedCollapsedNodes - Reference to a set
 * of node IDs that have already been processed for collapse operations
 */
interface CollapseAllButtonProps {
  processedCollapsedNodes: React.MutableRefObject<Set<string>>;
}

/**
 * CollapseAllButton provides a UI button that collapses all expanded nodes
 * in the flowchart when clicked, removing their child nodes from the view.
 * 
 * @param {CollapseAllButtonProps} props - Component props
 * @returns {JSX.Element} The rendered button component
 */
const CollapseAllButton: React.FC<CollapseAllButtonProps> = ({ 
  processedCollapsedNodes 
}) => {
  const { getNodes, setNodes, setEdges, fitView } = useReactFlow();

  /**
   * Handles the collapse all operation when the button is clicked
   */
  const handleCollapseAll = () => {
    // console.log("COLLAPSE ALL: Starting collapse of all nodes");
    
    /**
     * Collapses all expanded nodes and removes their descendants from the graph
     */
    const collapseAllNodes = async () => {
      // console.log("COLLAPSE ALL: Beginning collapse process");
      
      try {
        // Temporarily disable collapse processing to avoid conflicts
        const originalCollapsedNodesRef = processedCollapsedNodes.current;
        processedCollapsedNodes.current = new Set();
        
        // Find all expanded nodes except root
        const expandedNodes = getNodes().filter(node => node.data.expanded && node.data.type !== 'root');
        
        if (expandedNodes.length === 0) {
          // console.log("COLLAPSE ALL: No expanded nodes found");
          return;
        }
        
        // console.log(`COLLAPSE ALL: Found ${expandedNodes.length} expanded nodes to collapse`);
        
        // Create a set of all expanded node IDs for quick lookup
        const expandedNodeIds = new Set(expandedNodes.map(node => node.id));
        
        // Find all nodes that need to be removed (all descendants of any expanded node)
        const nodesToRemove = new Set<string>();
        
        // Create a map of parent-to-children relationships
        const parentToChildren = new Map<string, string[]>();
        
        setEdges(prevEdges => {
          prevEdges.forEach(edge => {
            const { source, target } = edge;
            if (!parentToChildren.has(source)) {
              parentToChildren.set(source, []);
            }
            parentToChildren.get(source)?.push(target);
          });
          return prevEdges;
        });
        
        /**
         * Recursively collects all descendant nodes of a given node
         * 
         * @param {string} nodeId - ID of the node to collect descendants for
         */
        const collectDescendants = (nodeId: string) => {
          const children = parentToChildren.get(nodeId) || [];
          for (const childId of children) {
            if (!nodesToRemove.has(childId)) {
              nodesToRemove.add(childId);
              collectDescendants(childId);
            }
          }
        };
        
        // Process all expanded nodes to collect their descendants
        expandedNodeIds.forEach(nodeId => {
          collectDescendants(nodeId);
        });
        
        // console.log(`COLLAPSE ALL: Will remove ${nodesToRemove.size} descendant nodes`);
        
        // Update nodes: set expanded nodes to collapsed state and remove descendants
        setNodes(prevNodes => 
          prevNodes.map(node => 
            expandedNodeIds.has(node.id)
              ? { ...node, data: { ...node.data, expanded: false } }
              : node
          ).filter(node => !nodesToRemove.has(node.id))
        );
        
        // Remove all edges connected to removed nodes
        setEdges(prevEdges => 
          prevEdges.filter(edge => 
            !nodesToRemove.has(edge.source) && !nodesToRemove.has(edge.target)
          )
        );
        
        // Wait a brief moment for the UI to update
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Fit view to show the collapsed graph
        fitView({
          padding: 0.15,
          duration: 800
        });
        
        // Restore the original collapsed set after animation completes
        setTimeout(() => {
          processedCollapsedNodes.current = originalCollapsedNodesRef;
        }, 1000);
        
        // console.log("COLLAPSE ALL: Collapse process complete");
      } catch (error) {
        console.error("COLLAPSE ALL: Error during collapse process", error);
      }
    };
    
    collapseAllNodes();
  };

  return (
    <button
      className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100"
      onClick={handleCollapseAll}
      title="Collapse All Nodes"
    >
      <Minimize2 size={14} color="#1a192b" />
    </button>
  );
};

export default CollapseAllButton; 