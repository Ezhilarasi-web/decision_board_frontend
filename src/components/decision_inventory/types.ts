// Define the exact node types specified
export type NodeType = 'root' | 'keyParadigm' | 'strategicInquiry' | 'guidingInquiry' | 'scenario' | 'kpi' | 'endDecision';

// Define data types for our nodes
export interface NodeData {
    id: string;
    title: string;
    type: NodeType;
    description?: string;
    color: string;
    icon: React.ReactElement | (() => React.ReactElement);
    expanded?: boolean;
    childCount?: number;
    expandDirection?: 'north' | 'east' | 'south' | 'west';
}

// Add this after the NodeData interface
export interface NodeWithDepth extends Node<NodeData> {
    depth?: number;
}

// Add type definitions for node sizes
export type NodeSizeConfig = {
    width: number;
    height: number;
    avatarSize?: number;
    iconSize?: number;
    textSize?: string;
};

export type NodeSizes = {
    [K in NodeType]: NodeSizeConfig;
};

// Fix by adding import:
import { Node } from 'reactflow';
import React from 'react'; 