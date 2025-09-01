import React, { useRef, useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { NodeData } from './types';
import { nodeSizes } from './constants';
import { Minus, Plus, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

// Update RectangularNode for dynamic sizing
const RectangularNode: React.FC<{ data: NodeData, isConnectable: boolean, selected: boolean }> = ({ data, isConnectable, selected }) => {
    const { title, description, color, icon, expanded, type, childCount } = data;
    const reactFlow = useReactFlow();
    const baseSize = nodeSizes[type]; // Use as base size
    const contentRef = useRef<HTMLDivElement>(null);
    const [nodeSize, setNodeSize] = useState({
        width: baseSize.width,
        height: baseSize.height
    });
    
    // Determine expand direction based on connections
    const getExpandDirection = (): 'north' | 'east' | 'south' | 'west' => {
        if (data.expandDirection) return data.expandDirection;
        
        const edges = reactFlow.getEdges();
        // Find edges where this node is the target (incoming connections - likely parent)
        const incomingEdges = edges.filter(edge => edge.target === data.id);
        
        if (incomingEdges.length > 0) {
            // Get the handle of the first incoming edge
            const parentHandle = incomingEdges[0].targetHandle || '';
            
            // Determine direction based on the handle
            if (parentHandle.includes('north')) return 'south';
            if (parentHandle.includes('east')) return 'west';
            if (parentHandle.includes('south')) return 'north';
            if (parentHandle.includes('west')) return 'east';
        }
        
        // If no incoming edges found, use default direction
        return 'east';
    };
    
    // Get the direction for expansion
    const expandDirection = getExpandDirection();

    // Measure text content and adjust size
    useEffect(() => {
        if (contentRef.current) {
            const contentWidth = contentRef.current.scrollWidth;
            const contentHeight = contentRef.current.scrollHeight;
            
            // Add padding to content dimensions
            let paddingX = 40; // Default horizontal padding
            let paddingY = 60; // Default vertical padding (includes space for icon)
            
            // Calculate new dimensions with minimums from base size
            const newWidth = Math.max(baseSize.width, contentWidth + paddingX);
            const newHeight = Math.max(baseSize.height, contentHeight + paddingY);
            
            // Set node size based on content - use same logic for all node types
            setNodeSize({
                width: newWidth,
                height: newHeight
            });
        }
    }, [title, type, baseSize]);

    // Toggle expanded state for the node
    const handleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();

        // Get the current node
        const currentNode = reactFlow.getNode(data.id);
        if (!currentNode) return;

        // Update expanded state
        reactFlow.setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === data.id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            expanded: !node.data.expanded,
                        },
                    };
                }
                return node;
            })
        );
    };

    // Get text size with fallback
    const textSize = baseSize.textSize || 'sm';

    // Function to render text with bullet points in KPI nodes
    const renderText = (text: string) => {
        if (type === 'kpi') {
            return (
                <div className="flex flex-col items-start w-full">
                    {text.split('\n').map((line, index) => (
                        <div key={index} className="flex items-start w-full mb-0.5 text-nowrap overflow-visible mr-10">
                            <span className="flex-1 font-normal overflow-visible">{line}</span>
                        </div>
                    ))}
                </div>
            );
        } else if (type === 'endDecision') {
            return (
                <div className="flex flex-col items-start w-full">
                    {text.split('\n').map((line, index) => {
                        // Match a reference code pattern (like M34., 1.2.3., etc.) at the beginning of a line
                        const refCodeMatch = line.match(/^([A-Z][0-9]+\.|\d+\.\d+\.\d+\.|\d+\.\d+\.|\d+\.|[A-Z][0-9]+\.[0-9]+\.)/);
                        if (refCodeMatch) {
                            const [fullMatch] = refCodeMatch;
                            const restOfLine = line.substring(fullMatch.length);
                            return (
                                <div key={index} className="flex text-left w-full mb-1">
                                    <span className="font-bold text-nowrap">{fullMatch}</span>
                                    <span className="pl-1">{restOfLine.trim()}</span>
                                </div>
                            );
                        }
                        return <div key={index} className="text-left">{line}</div>;
                    })}
                </div>
            );
        }
        return text;
    };

    return (
        <div
            className={`relative flex flex-col items-center justify-center transition-all duration-300 rounded-lg
      ${selected ? 'ring-2 ring-white ring-opacity-70' : ''}`}
            style={{
                width: nodeSize.width,
                height: nodeSize.height,
                backgroundColor: `${color}99`,
                backdropFilter: 'blur(4px)',
                border: `2px solid ${color}`,
                boxShadow: `0 0 15px ${color}50`,
            }}
        >
            {/* Handles - hiding the one that overlaps with the expand button */}
            <Handle
                type="source"
                position={Position.Right}
                id="east-source"
                style={{ 
                    background: color, 
                    width: 8, 
                    height: 8,
                    opacity: expandDirection === 'east' ? 0 : 1 
                }}
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Right}
                id="east-target"
                style={{ 
                    background: color, 
                    width: 8, 
                    height: 8,
                    opacity: expandDirection === 'east' ? 0 : 1
                }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="south-source"
                style={{ 
                    background: color, 
                    width: 8, 
                    height: 8,
                    opacity: expandDirection === 'south' ? 0 : 1
                }}
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Bottom}
                id="south-target"
                style={{ 
                    background: color, 
                    width: 8, 
                    height: 8,
                    opacity: expandDirection === 'south' ? 0 : 1
                }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Left}
                id="west-source"
                style={{ 
                    background: color, 
                    width: 8, 
                    height: 8,
                    opacity: expandDirection === 'west' ? 0 : 1
                }}
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Left}
                id="west-target"
                style={{ 
                    background: color, 
                    width: 8, 
                    height: 8,
                    opacity: expandDirection === 'west' ? 0 : 1
                }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Top}
                id="north-source"
                style={{ 
                    background: color, 
                    width: 8, 
                    height: 8,
                    opacity: expandDirection === 'north' ? 0 : 1
                }}
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Top}
                id="north-target"
                style={{ 
                    background: color, 
                    width: 8, 
                    height: 8,
                    opacity: expandDirection === 'north' ? 0 : 1
                }}
                isConnectable={isConnectable}
            />

            <div className="flex flex-col items-center p-3">
                <div className="text-white mb-2">
                    {typeof icon === 'function' 
                        ? icon() 
                        : React.cloneElement(icon as React.ReactElement<any>, {
                            size: baseSize.iconSize
                        })}
                </div>
                <div
                    ref={contentRef}
                    className={`text-white text-${textSize} text-center px-2 py-1 overflow-auto`}
                    style={{
                        maxWidth: '95%', // Increased from 90%
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap'
                    }}
                >
                    {renderText(title)}
                </div>
            </div>

            {/* Only show expand/collapse button if the node has children */}
            {(childCount ?? 0) > 0 && (
                <button
                    className="absolute w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer shadow-md hover:brightness-110 transition-all"
                    onClick={handleExpand}
                    style={{ 
                        touchAction: 'none',
                        zIndex: 10,
                        padding: 0,
                        margin: 0,
                        // Position correctly on each side without intersection
                        right: expandDirection === 'east' ? '-14px' : 'auto',
                        left: expandDirection === 'west' ? '-14px' : (expandDirection === 'east' ? 'auto' : '50%'),
                        bottom: expandDirection === 'south' ? '-14px' : 'auto',
                        top: expandDirection === 'north' ? '-14px' : 'auto',
                        // Center on the edge for side buttons, center horizontally for top/bottom buttons
                        transform: expandDirection === 'east' || expandDirection === 'west' ? 
                            'translateY(-50%)' : 
                            (expandDirection === 'south' || expandDirection === 'north' ? 'translateX(-50%)' : 'none'),
                        // For east/west buttons, position exactly in the middle of the node height
                        ...(expandDirection === 'east' || expandDirection === 'west' ? {
                            top: '50%'
                        } : {}),
                        backgroundColor: `${color}cc`,
                        border: `2px solid ${color}`,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1,
                        boxSizing: 'border-box'
                    }}
                >
                    <div className="flex items-center justify-center" style={{ lineHeight: 0 }}>
                        {expanded ? <Minus size={16} /> : 
                            expandDirection === 'east' ? <ChevronRight size={16} /> :
                            expandDirection === 'west' ? <ChevronLeft size={16} /> :
                            expandDirection === 'north' ? <ChevronUp size={16} /> :
                            <ChevronDown size={16} />
                        }
                    </div>
                </button>
            )}
        </div>
    );
};

export default RectangularNode;