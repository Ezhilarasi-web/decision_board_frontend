/**
 * @fileoverview ExpandAllButton component that provides functionality to expand
 * all nodes in the decision flowchart at once, showing the complete hierarchy.
 */
import React from 'react';
import { FolderTree } from 'lucide-react';
import { useReactFlow } from 'reactflow';
import { Graph } from '@/lib/parseXML';
import { calculateDirectionalPadding } from './utils';

/**
 * Props for the ExpandAllButton component
 * 
 * @interface
 * @property {React.MutableRefObject<Set<string>>} processedExpandedNodes - Reference to a set
 * of node IDs that have already been processed for expansion
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setExpandingAll - State setter
 * to track and display the expanding state
 * @property {Graph | null} cachedGraph - The cached graph data containing nodes and edges
 */
interface ExpandAllButtonProps {
  processedExpandedNodes: React.MutableRefObject<Set<string>>;
  setExpandingAll: React.Dispatch<React.SetStateAction<boolean>>;
  cachedGraph: Graph | null;
}

/**
 * ExpandAllButton provides a UI button that expands all nodes in the flowchart
 * when clicked, showing the complete hierarchy with proper positioning and spacing.
 * 
 * @param {ExpandAllButtonProps} props - Component props
 * @returns {JSX.Element} The rendered button component
 */
const ExpandAllButton: React.FC<ExpandAllButtonProps> = ({ 
  processedExpandedNodes, 
  setExpandingAll, 
  cachedGraph 
}) => {
  const { getNodes, setNodes, fitView, setViewport } = useReactFlow();

  /**
   * Handles the expand all operation when the button is clicked
   */
  const handleExpandAll = () => {
    // console.log("EXPAND ALL: Starting expansion of all nodes");
    setExpandingAll(true);
    
    /**
     * Recursively expands all nodes in the flowchart by setting their expanded
     * state and waiting for child nodes to be created between iterations
     */
    const expandAllNodesRecursively = async () => {
      // console.log("EXPAND ALL: Beginning recursive expansion");
      
      // Disable automatic expansion effects for duration of expand all
      const originalExpandedNodesRef = processedExpandedNodes.current;
      processedExpandedNodes.current = new Set();
      
      try {
        // Find all nodes with children in the cached graph
        const nodesWithChildren = new Map();

        if (cachedGraph) {
          cachedGraph.edges.forEach(edge => {
            if (edge.source) {
              nodesWithChildren.set(edge.source, true);
            }
          });
        }

        // console.log(`EXPAND ALL: Found ${nodesWithChildren.size} nodes with children`);

        // Keep track of which nodes have been expanded in this recursion
        const expandedInThisIteration = new Set<string>();
        
        /**
         * Updates nodes to expanded state and returns count of newly expanded nodes
         * 
         * @returns {Promise<number>} Number of nodes that were expanded in this iteration
         */
        const expandNodes = () => {
          return new Promise<number>(resolve => {
            setNodes(prevNodes => {
              let expandedCount = 0;
              
              const newNodes = prevNodes.map(node => {
                // If the node has children and isn't already expanded
                if (!node.data.expanded && 
                  (nodesWithChildren.has(node.id) ||
                  (node.data.childCount && node.data.childCount > 0))) {
                  // console.log(`EXPAND ALL: Setting node ${node.id} (${node.data.type}) to expanded`);
                  expandedInThisIteration.add(node.id);
                  expandedCount++;
                  return {
                    ...node,
                    data: {
                      ...node.data,
                      expanded: true
                    }
                  };
                }
                return node;
              });
              
              // After updating state, return the count of newly expanded nodes
              setTimeout(() => resolve(expandedCount), 0);
              return newNodes;
            });
          });
        };
        
        /**
         * Runs expansion recursively until all nodes are expanded
         */
        const runExpansion = async () => {
          // Wait for the node expansion effect to create new nodes
          let expandedCount = await expandNodes();
          // console.log(`EXPAND ALL: Expanded ${expandedCount} nodes in this iteration`);
          
          if (expandedCount > 0) {
            // Wait for the new nodes to be created and rendered
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Run another expansion iteration
            await runExpansion();
          } else {
            // Done expanding
            // Don't hide the loader yet, wait until after centering
          }
        };
        
        // Start the recursive expansion
        await runExpansion();
        
        // Find the root node to center on
        const rootNode = getNodes().find(node => node.data.type === 'root');
        
        // Final fit view after all expansions are complete
        setTimeout(() => {
          // Calculate a minimum viable zoom level based on the node count
          const nodeCount = getNodes().length;
          const targetZoom = Math.max(
            0.2, // Minimum zoom level
            Math.min(0.5, 3 / Math.sqrt(nodeCount)) // Dynamic zoom based on node count
          );
          
          // If we have a root node, center on it
          if (rootNode) {
            setViewport({
              x: window.innerWidth / 2 - rootNode.position.x * targetZoom,
              y: window.innerHeight / 2 - rootNode.position.y * targetZoom,
              zoom: targetZoom
            }, { duration: 800 });
          } else {
            // Otherwise just fit the view
            fitView({
              padding: calculateDirectionalPadding(nodeCount, null),
              duration: 800,
              maxZoom: 0.5 // Limit maximum zoom to ensure we see a good overview
            });
          }
          
          // Only hide the loader after the viewport adjustment
          // Add extra delay to ensure animation completes
          setTimeout(() => {
            setExpandingAll(false);
          }, 1000);
        }, 1000);
      }
      finally {
        // Restore the original reference after everything is done
        setTimeout(() => {
          processedExpandedNodes.current = originalExpandedNodesRef;
        }, 2000);
      }
    };
    
    // Start the expansion process
    expandAllNodesRecursively();
  };

  return (
    <button
      className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100"
      onClick={handleExpandAll}
      title="Expand All Nodes"
    >
      <FolderTree size={14} color="#1a192b" />
    </button>
  );
};

export default ExpandAllButton; 