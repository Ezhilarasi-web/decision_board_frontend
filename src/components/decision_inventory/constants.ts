import { PieChart, MessageCircle, HelpCircle, AlertCircle, BarChart, CheckCircle, User } from 'lucide-react';
import { NodeSizes, NodeType } from './types';
import React from 'react';

// Map of node types to colors
export const typeColors = {
    root: '#4361ee', // Root node color
    keyParadigm: '#FF6B6B', // Vibrant coral
    strategicInquiry: '#4ECDC4', // Turquoise
    guidingInquiry: '#FFD93D', // Bright yellow
    scenario: '#6C5CE7', // Purple
    kpi: '#A8E6CF', // Mint green
    endDecision: '#FF8B94', // Soft pink
};

// Update node size configuration with more appropriate icon sizes
export const nodeSizes: NodeSizes = {
    root: { width: 200, height: 200, avatarSize: 64, iconSize: 32, textSize: 'lg' },
    keyParadigm: { width: 180, height: 180, iconSize: 32, textSize: 'lg' },
    strategicInquiry: { width: 200, height: 170, iconSize: 28, textSize: 'lg' },
    guidingInquiry: { width: 220, height: 170, iconSize: 28, textSize: 'lg' },
    scenario: { width: 200, height: 180, iconSize: 28, textSize: 'lg' },
    kpi: { width: 250, height: 120, iconSize: 28, textSize: 'lg' },
    endDecision: { width: 300, height: 300, iconSize: 28, textSize: 'base' },
};

// Map of node types to icon components (using functions to avoid JSX in constants)
export const typeIcons = {
    keyParadigm: () => React.createElement(PieChart, { size: 32 }),
    strategicInquiry: () => React.createElement(MessageCircle, { size: 32 }),
    guidingInquiry: () => React.createElement(HelpCircle, { size: 32 }),
    scenario: () => React.createElement(AlertCircle, { size: 32 }),
    kpi: () => React.createElement(BarChart, { size: 32 }),
    endDecision: () => React.createElement(CheckCircle, { size: 32 }),
    root: () => React.createElement(User, { size: 32 }),
}; 