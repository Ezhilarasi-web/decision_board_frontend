import { Node, XYPosition } from 'reactflow';
import { NodeWithDepth } from './types';
import { nodeSizes } from './constants';

// Utility function to calculate dynamic padding based on node count
export const calculateDynamicPadding = (nodeCount: number): number => {
    if (nodeCount >= 10) return 0.05;
    if (nodeCount >= 5) return 0.08;
    if (nodeCount >= 3) return 0.1;
    return 0.15;
};

// Enhanced padding function that considers direction and adds extra padding for East nodes
export const calculateDirectionalPadding = (nodeCount: number, expandedNode: NodeWithDepth | null): number => {
    const basePadding = calculateDynamicPadding(nodeCount);
    
    // If expanding eastward, add extra padding on the right
    if (expandedNode) {
        // Check if this is a branch that expands eastward
        const branchIndex = determineNodeBranchIndex(expandedNode);
        if (branchIndex === 0) { // East branch
            // For east expansion, return a larger padding value
            return Math.max(basePadding + 0.15, 0.25); // Minimum 0.25 padding
        }
    }
    
    return basePadding;
};

// Helper to determine branch index/direction of a node
export const determineNodeBranchIndex = (node: NodeWithDepth): number => {
    // Root nodes expand in all directions
    if (node.data.type === 'root') return -1;
    
    // Check position relative to center to determine likely branch direction
    const x = node.position.x;
    const y = node.position.y;
    
    // Determine quadrant based on position
    if (x >= 0 && Math.abs(y) < Math.abs(x)) return 0;      // East
    if (y >= 0 && Math.abs(x) < Math.abs(y)) return 1;      // South
    if (x < 0 && Math.abs(y) < Math.abs(x)) return 2;       // West
    if (y < 0 && Math.abs(x) < Math.abs(y)) return 3;       // North
    
    return 0; // Default to East
};

/**
 * Checks if two nodes overlap based on their dimensions and positions
 * 
 * @param {NodeWithDepth} nodeA - First node to check
 * @param {NodeWithDepth} nodeB - Second node to check
 * @returns {boolean} True if nodes overlap, false otherwise
 */
export const checkOverlap = (nodeA: NodeWithDepth, nodeB: NodeWithDepth) => {
    // Standard buffer for spacing between nodes
    const buffer = 75; // Increased from 50 for better separation

    /**
     * Gets the effective size of a node based on its type
     * 
     * @param {NodeWithDepth} node - Node to get size for
     * @returns {Object} Width, height and shape information
     */
    const getNodeSize = (node: NodeWithDepth) => {
        const baseSize = nodeSizes[node.data.type];
        const isCircular = node.type === 'circularNode';
        
        // For circular nodes, use max of width/height as diameter
        if (isCircular) {
            const diameter = Math.max(baseSize.width, baseSize.height);
            return {
                width: diameter * 1.2, // Add 20% for safety
                height: diameter * 1.2,
                isCircular: true
            };
        }
                          
        // For rectangular nodes, use base dimensions with safety margin
        // KPI and endDecision nodes are typically larger
        let width = baseSize.width;
        let height = baseSize.height;
        
        if (node.data.type === 'kpi') {
            width = nodeSizes.kpi.width;
            height = nodeSizes.kpi.height;
        } else if (node.data.type === 'endDecision') {
            width = nodeSizes.endDecision.width;
            height = nodeSizes.endDecision.height;
        }
        
        // Add safety margin
        return {
            width: width * 1.3, // Increased from 1.2 for rectangular nodes
            height: height * 1.3, // Increased from 1.2
            isCircular: false
        };
    };
    
    const sizeA = getNodeSize(nodeA);
    const sizeB = getNodeSize(nodeB);
    
    // Distance between centers
    const dx = Math.abs(nodeA.position.x - nodeB.position.x);
    const dy = Math.abs(nodeA.position.y - nodeB.position.y);
    
    // Check for overlap based on node shapes
    if (sizeA.isCircular && sizeB.isCircular) {
        // Circle-circle: check if distance is less than sum of radii plus buffer
        const distanceAB = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (sizeA.width / 2) + (sizeB.width / 2) + buffer;
        return distanceAB < minDistance;
    } else if (!sizeA.isCircular && !sizeB.isCircular) {
        // Rectangle-rectangle: check if bounding boxes overlap
        return (
            dx < (sizeA.width / 2 + sizeB.width / 2 + buffer) &&
            dy < (sizeA.height / 2 + sizeB.height / 2 + buffer)
        );
    } else {
        // Circle-rectangle: use the larger of the two dimensions for the rectangle
        const rect = !sizeA.isCircular ? sizeA : sizeB;
        const circle = sizeA.isCircular ? sizeA : sizeB;
        
        // Use a hybrid approach for circle-rectangle
        const effectiveRadius = circle.width / 2;
        return (
            dx < (effectiveRadius + rect.width / 2 + buffer) &&
            dy < (effectiveRadius + rect.height / 2 + buffer)
        );
    }
};

// Fixed vectors for cardinal directions
export const directions = [
    { x: 1, y: 0 },   // East (0°)
    { x: 0, y: 1 },   // South (90°)
    { x: -1, y: 0 },  // West (180°)
    { x: 0, y: -1 },  // North (270°)
];

// Fixed handles for each direction
export const directionHandles = [
    { source: "east-source", target: "west-target" },   // East
    { source: "south-source", target: "north-target" }, // South
    { source: "west-source", target: "east-target" },   // West
    { source: "north-source", target: "south-target" }, // North
];