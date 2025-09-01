import { useCallback, useRef, useEffect } from 'react';
import { Node, Edge, useReactFlow } from 'reactflow';
import { MarkerType } from 'reactflow';
import { NodeWithDepth } from './types';
import { Graph } from '@/lib/parseXML';
import { categorizeNode, shouldBeCircular, extractTitle, getNodeIcon, getHandlePositions } from './utils';
import { typeColors } from './constants';
import { checkOverlap, directions, directionHandles, determineNodeBranchIndex, calculateDirectionalPadding } from './nodePositioning';

/**
 * Custom hook that handles node expansion and collapse operations
 */
export const useNodeOperations = (
    nodes: NodeWithDepth[], 
    setNodes: (nodes: any) => void,
    edges: Edge[],
    setEdges: (edges: any) => void,
    graph: Graph | null
) => {
    const { fitView } = useReactFlow();
    const processedExpandedNodes = useRef(new Set<string>());
    const processedCollapsedNodes = useRef(new Set<string>());
    
    // Handle node expansion
    useEffect(() => {
        if (!graph) return;

        // Find a node that's marked as expanded but doesn't have any outgoing edges yet
        const expandedNode = nodes.find(node =>
            node.data.expanded &&
            !edges.some(edge => edge.source === node.id)
        ) as NodeWithDepth;

        // Skip if no newly expanded node or if we've already processed this node
        if (!expandedNode || processedExpandedNodes.current.has(expandedNode.id)) return;

        // Mark this node as processed to avoid duplicate expansion
        processedExpandedNodes.current.add(expandedNode.id);

        // Prevent excessive depth expansion (limit to 7 levels)
        const currentDepth = expandedNode.depth || 0;
        if (currentDepth >= 7) {
            setNodes((prevNodes: NodeWithDepth[]) =>
                prevNodes.map((node: NodeWithDepth) => node.id === expandedNode.id
                    ? { ...node, data: { ...node.data, expanded: false } }
                    : node
                )
            );
            return;
        }

        /**
         * Determines which branch/direction a node belongs to by tracing back to the root
         * 
         * @param {string} nodeId - ID of the node to determine branch direction for
         * @returns {number} Branch index (0-3) representing East, South, West, North
         */
        const determineExpansionDirection = (nodeId: string): number => {
            if (expandedNode.data.type === 'root') return 0; // Root expands in all directions
            
            // Find branch index by tracing back to root
            let currentNodeId = nodeId;
            let branchIndex = 0;
            
            // Set to track visited nodes and prevent infinite loops
            const visited = new Set<string>();

            // Trace back until we reach the root or a keyParadigm node
            while (!visited.has(currentNodeId)) {
                visited.add(currentNodeId);

                // Find parent edge and node
                const parentEdge = edges.find(e => e.target === currentNodeId);
                if (!parentEdge) break;

                const parentNode = nodes.find(n => n.id === parentEdge.source);
                if (!parentNode) break;

                // If parent is root, get the quadrant index
                if (parentNode.data.type === 'root') {
                    // Find which cardinal direction this node is from root
                    const rootEdges = edges.filter(e => e.source === parentNode.id);
                    const edgeIndex = rootEdges.findIndex(e => e.target === parentEdge.target);
                    
                    if (edgeIndex !== -1) {
                        branchIndex = edgeIndex % 4;
                    break;
                    }
                }

                // Move up to parent node
                currentNodeId = parentNode.id;
            }

            return branchIndex;
        };
        
        // Get the branch direction and corresponding handle positions
        const branchIndex = determineExpansionDirection(expandedNode.id);
        const { sourceHandle, targetHandle } = getHandlePositions(branchIndex);

        // Get all child nodes of the expanded node from the graph data
        const expandedNodeChildIds = graph.edges
            .filter(edge => edge.source === expandedNode.id)
            .map(edge => edge.target);

        // If the node has no children, update its childCount and exit
        if (expandedNodeChildIds.length === 0) {
            setNodes((prevNodes: NodeWithDepth[]) =>
                prevNodes.map((node: NodeWithDepth) => node.id === expandedNode.id
                    ? { ...node, data: { ...node.data, childCount: 0 } }
                    : node
                )
            );
            return;
        }

        const isRootNode = expandedNode.data.type === 'root';

        // Separate endDecision nodes from other node types for special positioning
        const endDecisionIds: string[] = [];
        const otherIds: string[] = [];

        expandedNodeChildIds.forEach(childId => {
            const node = graph.nodes.find(n => n.id === childId);
            if (!node) return;

            const nodeType = categorizeNode(childId, graph);
            if (nodeType === 'endDecision') {
                endDecisionIds.push(childId);
            } else {
                otherIds.push(childId);
            }
        });

        // Spacing configuration for node positioning based on depth and type
        const baseRadius = isRootNode ? 180 : 280;
        const normalRadius = baseRadius + (currentDepth * 50);
        const endDecisionRadius = normalRadius + 250; // Increased from 180 for better separation

        const newNodes: NodeWithDepth[] = [];
        const newEdges: Edge[] = [];

        // Different expansion logic for root versus regular nodes
        if (isRootNode) {
            // Process each non-endDecision child node of the root
            otherIds.forEach((childId, index) => {
                const childNode = graph.nodes.find(node => node.id === childId);
                if (!childNode) return;

                const grandchildCount = graph.edges.filter(edge => edge.source === childId).length;
                const nodeType = categorizeNode(childId, graph);

                // Position calculation - for first 4 children use cardinal directions, 
                // for additional children use positions in between
                let x, y, dirIndex, srcHandle, tgtHandle;
                
                if (index < 4) {
                    // Use exact cardinal direction for first 4
                    dirIndex = index;
                    const direction = directions[dirIndex];
                    x = expandedNode.position.x + direction.x * normalRadius;
                    y = expandedNode.position.y + direction.y * normalRadius;
                    const handleInfo = directionHandles[dirIndex];
                    srcHandle = handleInfo.source;
                    tgtHandle = handleInfo.target;
                } else {
                    // For additional children, place between cardinal directions
                    // Calculate position based on even spacing around circle
                    const angle = (index * (2 * Math.PI / otherIds.length));
                    x = expandedNode.position.x + Math.cos(angle) * normalRadius;
                    y = expandedNode.position.y + Math.sin(angle) * normalRadius;
                    
                    // Determine closest cardinal direction
                    const cardinalIndex = Math.round(angle / (Math.PI / 2)) % 4;
                    const handleInfo = directionHandles[cardinalIndex];
                    srcHandle = handleInfo.source;
                    tgtHandle = handleInfo.target;
                }

                // Determine if node should be circular (direct children of root with keyParadigm type)
                const isDirectChildOfRoot = true;
                const nodeComponentType = shouldBeCircular(nodeType, isDirectChildOfRoot) ? 'circularNode' : 'rectangularNode';

                // Create node
                newNodes.push({
                    id: childId,
                    type: nodeComponentType,
                    position: { 
                        x: Math.round(x), // Use Math.round to ensure integer coordinates
                        y: Math.round(y)  // This helps avoid sub-pixel positioning issues
                    },
                    depth: currentDepth + 1,
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

                // Create edge connecting parent to child node
                newEdges.push({
                    id: `edge-${expandedNode.id}-${childId}`,
                    source: expandedNode.id,
                    target: childId,
                    sourceHandle: srcHandle,
                    targetHandle: tgtHandle,
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
        } else {
            // Non-root node expansion uses the branch direction
            // Fixed angles for each direction
            const baseAngles = [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2]; // East, South, West, North
            const baseAngle = baseAngles[branchIndex % 4];
            const angleSpread = Math.PI / 5; // 36 degrees
            
            // Process non-endDecision nodes
            otherIds.forEach((childId, index) => {
                const childNode = graph.nodes.find(node => node.id === childId);
                if (!childNode) return;

                const grandchildCount = graph.edges.filter(edge => edge.source === childId).length;
                const nodeType = categorizeNode(childId, graph);

                // Calculate angle with a fan-out pattern in the proper direction
                const childCount = otherIds.length;
                let angle: number;
                let x: number;
                let y: number;
                
                if (childCount === 1) {
                    // For a single child, ensure perfect cardinal alignment by using exact coordinates
                    // based on the branch direction instead of angle calculations to avoid any rounding issues
                    switch (branchIndex % 4) {
                        case 0: // East
                            x = expandedNode.position.x + normalRadius;
                            y = expandedNode.position.y;
                            break;
                        case 1: // South
                            x = expandedNode.position.x;
                            y = expandedNode.position.y + normalRadius;
                            break;
                        case 2: // West
                            x = expandedNode.position.x - normalRadius;
                            y = expandedNode.position.y;
                            break;
                        case 3: // North
                        default:
                            x = expandedNode.position.x;
                            y = expandedNode.position.y - normalRadius;
                            break;
                    }
                    
                    // Create node with explicit position to avoid any floating point rounding issues
                    newNodes.push({
                        id: childId,
                        type: 'rectangularNode',
                        position: { 
                            x: Math.round(x), // Use Math.round to ensure integer coordinates
                            y: Math.round(y)  // This helps avoid sub-pixel positioning issues
                        },
                        depth: currentDepth + 1,
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
                } else {
                    // Fan out the nodes within the sector
                    angle = baseAngle + ((index - (childCount - 1) / 2) * angleSpread);
                    
                    // Calculate position
                    x = expandedNode.position.x + Math.cos(angle) * normalRadius;
                    y = expandedNode.position.y + Math.sin(angle) * normalRadius;

                    // Create node (all non-root children use rectangular nodes)
                    newNodes.push({
                        id: childId,
                        type: 'rectangularNode',
                        position: { x, y },
                        depth: currentDepth + 1,
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
                }

                // Create edge connecting parent to child
                newEdges.push({
                    id: `edge-${expandedNode.id}-${childId}`,
                    source: expandedNode.id,
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
        }

        // Position endDecision nodes with extra spacing
        endDecisionIds.forEach((childId, index) => {
            const childNode = graph.nodes.find(node => node.id === childId);
            if (!childNode) return;

            const grandchildCount = graph.edges.filter(edge => edge.source === childId).length;
            const nodeType = 'endDecision';

            // Position endDecision nodes along the same axis as other nodes, but with extra distance
            let x, y;
            
            if (isRootNode) {
                // From root, position in cardinal directions with increased distance
                const dirIndex = index % 4; // Use same pattern as other nodes
                const direction = directions[dirIndex];
                
                // Use a larger radius for endDecision nodes
                x = expandedNode.position.x + direction.x * endDecisionRadius;
                y = expandedNode.position.y + direction.y * endDecisionRadius;
            } else {
                // For non-root nodes, maintain the same branch direction but increase distance
                switch (branchIndex % 4) {
                    case 0: // East
                        x = expandedNode.position.x + endDecisionRadius;
                        y = expandedNode.position.y + (index * 150) - ((endDecisionIds.length - 1) * 75); // Increased spacing
                        break;
                    case 1: // South
                        x = expandedNode.position.x + (index * 150) - ((endDecisionIds.length - 1) * 75); // Increased spacing
                        y = expandedNode.position.y + endDecisionRadius;
                        break;
                    case 2: // West
                        x = expandedNode.position.x - endDecisionRadius;
                        y = expandedNode.position.y + (index * 150) - ((endDecisionIds.length - 1) * 75); // Increased spacing
                        break;
                    case 3: // North
                    default:
                        x = expandedNode.position.x + (index * 150) - ((endDecisionIds.length - 1) * 75); // Increased spacing
                        y = expandedNode.position.y - endDecisionRadius;
                        break;
                }
            }

            // Create endDecision node
            newNodes.push({
                id: childId,
                type: 'rectangularNode',
                position: { 
                    x: Math.round(x), // Use Math.round to ensure integer coordinates
                    y: Math.round(y)  // This helps avoid sub-pixel positioning issues
                },
                depth: currentDepth + 1,
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

            // Create edge connecting to endDecision node
            newEdges.push({
                id: `edge-${expandedNode.id}-${childId}`,
                source: expandedNode.id,
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

        // Add all the new nodes and edges
        if (newNodes.length > 0) {
            // Run overlap detection and resolution BEFORE adding nodes to the graph
            const allExistingNodes = [...nodes];
            const adjustedNewNodes = [...newNodes];

            // Track if any positions have been adjusted for overlaps
            let hasAdjustedPositions = false;
            
            // First, check for overlaps among new nodes themselves
            for (let i = 0; i < adjustedNewNodes.length; i++) {
                for (let j = i + 1; j < adjustedNewNodes.length; j++) {
                    const nodeA = adjustedNewNodes[i];
                    const nodeB = adjustedNewNodes[j];
                    
                    if (checkOverlap(nodeA, nodeB)) {
                        hasAdjustedPositions = true;
                        
                        // Adjust nodeB's position (move further from parent node)
                        const parentNode = expandedNode;
                        
                        // Direction vector from parent to nodeB
                        const dx = nodeB.position.x - parentNode.position.x;
                        const dy = nodeB.position.y - parentNode.position.y;
                        
                        // Current distance from parent
                        const currentDistance = Math.sqrt(dx * dx + dy * dy);
                        
                        // Increase distance to resolve overlap
                        const adjustmentFactor = 1.3;
                        const newDistance = currentDistance * adjustmentFactor;
                        
                        // Normalized direction vector
                        const dirX = dx / currentDistance;
                        const dirY = dy / currentDistance;
                        
                        // Calculate new position
                        const newX = parentNode.position.x + dirX * newDistance;
                        const newY = parentNode.position.y + dirY * newDistance;
                        
                        // Update nodeB's position
                        nodeB.position = { 
                            x: Math.round(newX),
                            y: Math.round(newY)
                        };
                        
                        // Since we modified a node, check this node again against all others
                        j = i;
                    }
                }
            }
            
            // Then check new nodes against existing nodes
            for (let i = 0; i < adjustedNewNodes.length; i++) {
                const newNode = adjustedNewNodes[i];
                
                for (const existingNode of allExistingNodes) {
                    if (checkOverlap(newNode, existingNode)) {
                        hasAdjustedPositions = true;
                        
                        // Adjust new node's position (move further from parent node)
                        const parentNode = expandedNode;
                        
                        // Direction vector from parent to new node
                        const dx = newNode.position.x - parentNode.position.x;
                        const dy = newNode.position.y - parentNode.position.y;
                        
                        // Current distance from parent
                        const currentDistance = Math.sqrt(dx * dx + dy * dy);
                        
                        // Increase distance to resolve overlap
                        const adjustmentFactor = 1.5;
                        const newDistance = currentDistance * adjustmentFactor;
                        
                        // Normalized direction vector
                        const dirX = dx / currentDistance;
                        const dirY = dy / currentDistance;
                        
                        // Calculate new position
                        const newX = parentNode.position.x + dirX * newDistance;
                        const newY = parentNode.position.y + dirY * newDistance;
                        
                        // Update node's position
                        newNode.position = { 
                            x: Math.round(newX),
                            y: Math.round(newY)
                        };
                        
                        // Since we modified this node, check against all existing nodes again
                        // by resetting the inner loop
                        i--;
                        break;
                    }
                }
            }
            
            // Apply transition styles to all new nodes for smooth animation
            const transitionedNodes = adjustedNewNodes.map(node => ({
                ...node,
                style: {
                    ...node.style,
                    transition: 'all 0.5s ease-in-out' // Add smooth transition
                }
            }));
            
            // Add the adjusted nodes to the graph
            setNodes((prev: NodeWithDepth[]) => [...prev, ...transitionedNodes]);
            setEdges((prev: Edge[]) => [...prev, ...newEdges]);
            
            // Fit view after a short delay to ensure nodes are rendered
            setTimeout(() => {
                // Calculate dynamic padding based on node count
                const nodesToFocus = [expandedNode, ...transitionedNodes];
                const directionalPadding = calculateDirectionalPadding(nodesToFocus.length, expandedNode);
                
                fitView({
                    padding: directionalPadding,
                    includeHiddenNodes: false,
                    duration: 600,
                    nodes: nodesToFocus
                });
            }, 150);
        }

        return () => {
            processedExpandedNodes.current.delete(expandedNode.id);
        };
    }, [nodes, edges, graph, fitView, setNodes, setEdges]);

    // Node collapse useEffect
    useEffect(() => {
        if (!graph) return;
        
        const collapsedNode = nodes.find(node =>
            !node.data.expanded &&
            edges.some(e => e.source === node.id)
        );

        if (!collapsedNode || processedCollapsedNodes.current.has(collapsedNode.id)) return;

        // Mark this node as processed
        processedCollapsedNodes.current.add(collapsedNode.id);

        // Find all descendant nodes that need to be removed
        const nodesToRemove = new Set<string>();

        const collectDescendants = (nodeId: string) => {
            const childEdges = edges.filter(edge => edge.source === nodeId);
            childEdges.forEach(edge => {
                if (!nodesToRemove.has(edge.target)) {
                    nodesToRemove.add(edge.target);
                    collectDescendants(edge.target);
                }
            });
        };

        collectDescendants(collapsedNode.id);

        // Find the parent of the collapsed node
        const parentEdge = edges.find(edge => edge.target === collapsedNode.id);
        const parentId = parentEdge?.source;
        const parentNode = parentId ? nodes.find(node => node.id === parentId) : null;

        // Find siblings (all children of the parent)
        let siblingNodes: NodeWithDepth[] = [];
        if (parentId) {
            siblingNodes = nodes.filter(node => 
                edges.some(edge => edge.source === parentId && edge.target === node.id)
            );
        }

        // Update nodes and edges
        setNodes(nodes.filter(node => !nodesToRemove.has(node.id)));
        setEdges(edges.filter(edge =>
            !nodesToRemove.has(edge.source) && !nodesToRemove.has(edge.target)
        ));

        // If we have siblings, fit view to include parent and all siblings
        if (siblingNodes.length > 0 && parentNode) {
            setTimeout(() => {
                // Include parent and all siblings in the focus
                const nodesToFocus = [parentNode, ...siblingNodes];
                const directionalPadding = calculateDirectionalPadding(nodesToFocus.length, parentNode);
                
                fitView({
                    padding: directionalPadding,
                    includeHiddenNodes: false,
                    duration: 800,
                    nodes: nodesToFocus
                });
            }, 150);
        }

        return () => {
            // Clean up processed node on unmount or when dependencies change
            processedCollapsedNodes.current.delete(collapsedNode.id);
        };
    }, [nodes, edges, graph, setNodes, setEdges, fitView]);

    return { processedExpandedNodes, processedCollapsedNodes };
};