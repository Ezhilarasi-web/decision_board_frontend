import { useCallback } from 'react';
import { Edge, MarkerType } from 'reactflow';
import { extractTitle, getNodeIcon, shouldBeCircular, categorizeNode } from './utils';
import { typeColors } from './constants';
import { directions, directionHandles } from './nodePositioning';
import { NodeWithDepth } from './types';
import { Graph } from '@/lib/parseXML';
import { buildChildrenMap, findRootNode } from './useGraphData';

/**
 * Custom hook that handles setting up the initial graph structure
 */
export const useInitialGraph = () => {
    /**
     * Creates the initial graph structure with root node and its immediate children
     */
    const createInitialGraph = useCallback((graph: Graph) => {
        if (!graph) return { nodes: [], edges: [] };
        
        // Build child map for quick lookups
        const childMap = buildChildrenMap(graph);
        
        // Find root node
        const rootNode = findRootNode(graph);
        if (!rootNode) return { nodes: [], edges: [] };
        
        // Get children of root node
        const rootChildren = childMap[rootNode.id] || [];
        
        // Position the root perfectly at the center
        const rootPosition = { x: 0, y: 0 };
        
        // Create the root node
        const rootNodeData: NodeWithDepth = {
            id: rootNode.id,
            type: 'circularNode',
            position: rootPosition,
            data: {
                id: rootNode.id,
                title: extractTitle(rootNode.content, 'root'),
                type: 'root',
                color: typeColors.root,
                icon: () => getNodeIcon('root'),
                description: rootNode.content,
                expanded: true,
                childCount: rootChildren.length,
            },
        };
        
        // Create nodes for direct children
        const childNodes: NodeWithDepth[] = [];
        const flowEdges: Edge[] = [];

        // Fixed radius for positioning first level nodes
        const radius = 350; // Increased radius for better spacing with dynamic sizing
        
        // Process immediate children of the root (exactly 4)
        rootChildren.slice(0, 4).forEach((childId, index) => {
            const childNode = graph.nodes.find(node => node.id === childId);
            if (!childNode) return;
            
            // Count grandchildren
            const grandchildCount = childMap[childId]?.length || 0;
            
            // Determine node type
            const nodeType = categorizeNode(childId, graph);
            
            // Use fixed cardinal direction - always use the exact direction vectors
            const direction = directions[index % 4]; // Ensure we only use 0-3 indexes
            const x = direction.x * radius;
            const y = direction.y * radius;
            
            // Create the node - direct children of root with keyParadigm type should be circular
            const isDirectChildOfRoot = true;
            const nodeComponentType = shouldBeCircular(nodeType, isDirectChildOfRoot) ? 'circularNode' : 'rectangularNode';
            
            childNodes.push({
                id: childId,
                type: nodeComponentType,
                position: { 
                    x: Math.round(x), // Round to nearest integer to avoid subpixel issues
                    y: Math.round(y)
                },
                data: {
                    id: childId,
                    title: extractTitle(childNode.content, nodeType),
                    type: nodeType,
                    color: typeColors[nodeType],
                    icon: () => getNodeIcon(nodeType, childNode.content),
                    description: childNode.content,
                    expanded: false,
                    childCount: grandchildCount,
                },
            });
            
            // Get appropriate handles based on direction
            const { source: sourceHandle, target: targetHandle } = directionHandles[index % 4];
            
            // Create edge from root to this child with explicit handles
            flowEdges.push({
                id: `edge-${rootNode.id}-${childId}`,
                source: rootNode.id,
                target: childId,
                sourceHandle: sourceHandle,
                targetHandle: targetHandle,
                type: 'straight',
                style: { 
                    stroke: typeColors[nodeType], 
                    strokeWidth: 3,
                    opacity: 0.8,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                },
                markerEnd: {
                    type: MarkerType.Arrow,
                    width: 20,
                    height: 20,
                    color: typeColors[nodeType],
                },
            });
        });
        
        return {
            nodes: [...childNodes, rootNodeData],
            edges: flowEdges
        };
    }, []);
    
    return { createInitialGraph };
};