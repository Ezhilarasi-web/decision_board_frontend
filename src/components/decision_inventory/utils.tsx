import { PieChart, TrendingUp, BarChart, Heart, Award } from 'lucide-react';
import { Graph } from '@/lib/parseXML';
import { NodeType } from './types';
import React from 'react';

// Add missing imports
import { MessageCircle, HelpCircle, AlertCircle, CheckCircle, User } from 'lucide-react';
import { typeColors, nodeSizes } from './constants';
import { NodeWithDepth } from './types';

// Function to determine keyParadigm icon based on content
export const getKeyParadigmIcon = (content: string): React.ReactElement => {
    if (!content) return React.createElement(PieChart, { size: nodeSizes.keyParadigm.iconSize });

    const lowerContent = content.toLowerCase();

    if (lowerContent.includes('market share') || lowerContent.includes('revenue')) {
        return React.createElement(TrendingUp, { size: nodeSizes.keyParadigm.iconSize }); // Market Share & Revenue
    } else if (lowerContent.includes('market performance')) {
        return React.createElement(BarChart, { size: nodeSizes.keyParadigm.iconSize }); // Market Performance
    } else if (lowerContent.includes('customer engagement') || lowerContent.includes('loyalty')) {
        return React.createElement(Heart, { size: nodeSizes.keyParadigm.iconSize }); // Customer Engagement & Loyalty
    } else if (lowerContent.includes('brand awareness')) {
        return React.createElement(Award, { size: nodeSizes.keyParadigm.iconSize }); // Brand Awareness
    }

    // Default icon
    return React.createElement(PieChart, { size: nodeSizes.keyParadigm.iconSize });
};

// Define the getNodeIcon function to replace typeIcons
export const getNodeIcon = (nodeType: NodeType, content?: string): React.ReactElement => {
    const iconSize = nodeSizes[nodeType].iconSize;
    
    switch (nodeType) {
        case 'keyParadigm':
            return content ? getKeyParadigmIcon(content) : React.createElement(PieChart, { size: iconSize });
        case 'strategicInquiry':
            return React.createElement(MessageCircle, { size: iconSize });
        case 'guidingInquiry':
            return React.createElement(HelpCircle, { size: iconSize });
        case 'scenario':
            return React.createElement(AlertCircle, { size: iconSize });
        case 'kpi':
            return React.createElement(BarChart, { size: iconSize });
        case 'endDecision':
            return React.createElement(CheckCircle, { size: iconSize });
        case 'root':
        default:
            return React.createElement(User, { size: iconSize });
    }
};

// Function to determine if a node should be circular
export const shouldBeCircular = (nodeType: NodeType, isDirectChildOfRoot: boolean): boolean => {
    return nodeType === 'root' || (nodeType === 'keyParadigm' && isDirectChildOfRoot);
};

// Add debug function to help identify what types are coming from XML
export const logNodeTypes = (graph: Graph) => {
    // console.log('Node Types from XML:');
    graph.nodes.forEach(node => {
        // console.log(`Node ${node.id}: Type = "${node.type}"`);
    });
};

// Update the categorizeNode function to directly use XML types
export const categorizeNode = (nodeId: string, graph: Graph): NodeType => {
    const node = graph.nodes.find(n => n.id === nodeId);
    if (!node) return 'keyParadigm'; // fallback

    // Check for root node first
    if (node.content?.toLowerCase().includes('vp of marketing') || nodeId === '8-Nx9LjNzzRHe5Pq2xZX-0') {
        return 'root';
    }

    // Use the type directly from the XML
    if (node.type) {
        // The XML now has types that exactly match our NodeType enum
        const nodeType = node.type as NodeType;

        // Verify the type is valid
        if (Object.keys(typeColors).includes(nodeType)) {
            return nodeType;
        }

        console.warn(`Unknown node type from XML: "${node.type}" for node ${nodeId}`);
    }

    return 'keyParadigm'; // default fallback
};

// Update the extractTitle function to handle KPI formatting and fix endDecision trailing "0"
export const extractTitle = (content: string | undefined, nodeType?: string): string => {
    if (!content) return 'Untitled Node';
    
    // For KPI nodes, format each line with bullet points but be careful with wrapped text
    if (nodeType === 'kpi') {
        // First, trim and clean the content
        const cleanedContent = content.trim();
        
        // Split by explicit newlines only
        const lines = cleanedContent.split('\n');
        
        // Process each line, only adding bullet points to main entries
        const formattedLines = lines.map(line => {
            const trimmedLine = line.trim();
            // Only add bullet points to lines that don't already have them
            // and appear to be new entries (not continuations of wrapped text)
            if (trimmedLine.length > 0 && !trimmedLine.startsWith('• ')) {
                return `• ${trimmedLine}`;
            }
            return trimmedLine;
        });
        
        return formattedLines.join('\n');
    }
    
    // For all other nodes, just return the trimmed content
    return content.trim();
};

// Update the getHandlePositions function to directly map to the pattern
export const getHandlePositions = (branchIndex: number): { sourceHandle: string, targetHandle: string } => {
    // Always use the exact pattern requested
    switch (branchIndex % 4) {
        case 0: // 3 o'clock branch
            return { sourceHandle: 'east-source', targetHandle: 'west-target' };
        case 1: // 6 o'clock branch
            return { sourceHandle: 'south-source', targetHandle: 'north-target' };
        case 2: // 9 o'clock branch
            return { sourceHandle: 'west-source', targetHandle: 'east-target' };
        case 3: // 12 o'clock branch
        default:
            return { sourceHandle: 'north-source', targetHandle: 'south-target' };
    }
};

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