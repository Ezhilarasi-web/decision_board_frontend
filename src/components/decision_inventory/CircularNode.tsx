/**
 * @fileoverview CircularNode component for rendering circular nodes in the decision flowchart.
 * Provides a visually distinct representation for root and key paradigm nodes with
 * expandable/collapsible functionality and dynamic sizing based on content.
 */
import React, { useRef, useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { NodeData } from './types';
import { nodeSizes } from './constants';
import { Minus, Plus } from 'lucide-react';
import accountAvatar from '@/assets/account-avatar.png';

/**
 * CircularNode component that renders a circular node with handles for connections,
 * dynamic sizing based on content, and expand/collapse functionality.
 * 
 * @param {Object} props - Component props
 * @param {NodeData} props.data - Data for the node including title, description, color, etc.
 * @param {boolean} props.isConnectable - Whether the node can be connected to other nodes
 * @param {boolean} props.selected - Whether the node is currently selected
 * @returns {JSX.Element} Rendered circular node component
 */
const CircularNode: React.FC<{ data: NodeData, isConnectable: boolean, selected: boolean }> = ({ data, isConnectable, selected }) => {
    const { title, description, color, icon, expanded, type, childCount } = data;
    const reactFlow = useReactFlow();
    const baseSize = nodeSizes[type]; // Use as base size
    
    /**
     * Reference to the content div for measuring text dimensions
     */
    const contentRef = useRef<HTMLDivElement>(null);
    
    /**
     * State to track and update node dimensions based on content
     */
    const [nodeSize, setNodeSize] = useState({
        width: baseSize.width,
        height: baseSize.height
    });

    /**
     * Effect to measure text content and adjust node size accordingly
     */
    useEffect(() => {
        if (contentRef.current) {
            const contentWidth = contentRef.current.scrollWidth;
            const contentHeight = contentRef.current.scrollHeight;
            
            // For root, maintain circle shape with fixed min size
            if (type === 'root') {
                const minSize = 200;
                const maxContentSize = Math.max(contentWidth, contentHeight);
                const newSize = Math.max(minSize, maxContentSize + 80); // Add padding
                setNodeSize({
                    width: newSize,
                    height: newSize
                });
            } else {
                // For other circular nodes, ensure width and height are equal, min size from base
                const minSize = Math.max(baseSize.width, baseSize.height);
                const maxContentSize = Math.max(contentWidth, contentHeight);
                const newSize = Math.max(minSize, maxContentSize + 60); // Add padding
                setNodeSize({
                    width: newSize,
                    height: newSize
                });
            }
        }
    }, [title, type, baseSize]);

    /**
     * Toggles the expanded state of the node when the expand/collapse button is clicked
     * 
     * @param {React.MouseEvent} e - Click event
     */
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

    /**
     * Renders text content with special formatting based on node type
     * 
     * @param {string} text - Text content to render
     * @returns {React.ReactNode} Formatted text content
     */
    const renderText = (text: string) => {
        if (type === 'kpi') {
            // Format KPI nodes with bullet points and whitespace handling
            return (
                <div className="flex flex-col items-start w-full">
                    {text.split('\n').map((line, index) => (
                        <div key={index} className="flex items-start w-full text-left mb-0.5 whitespace-nowrap">
                            <span className="flex-1 whitespace-normal font-normal overflow-visible">{line}</span>
                        </div>
                    ))}
                </div>
            );
        } else if (type === 'endDecision') {
            // Format endDecision nodes with reference code highlighting
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
            className={`relative flex flex-col items-center justify-center rounded-full transition-all duration-300 
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
            {/* Connection handles in cardinal directions */}
            <Handle
                type="source"
                position={Position.Right}
                id="east-source"
                style={{ background: color, width: 8, height: 8 }}
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Right}
                id="east-target"
                style={{ background: color, width: 8, height: 8 }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="south-source"
                style={{ background: color, width: 8, height: 8 }}
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Bottom}
                id="south-target"
                style={{ background: color, width: 8, height: 8 }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Left}
                id="west-source"
                style={{ background: color, width: 8, height: 8 }}
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Left}
                id="west-target"
                style={{ background: color, width: 8, height: 8 }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Top}
                id="north-source"
                style={{ background: color, width: 8, height: 8 }}
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Top}
                id="north-target"
                style={{ background: color, width: 8, height: 8 }}
                isConnectable={isConnectable}
            />

            {/* Special rendering for root node with avatar */}
            {type === 'root' ? (
                <div className="flex flex-col items-center">
                    <div
                        className="rounded-full overflow-hidden mb-3 border-2 border-white"
                        style={{
                            width: baseSize.avatarSize,
                            height: baseSize.avatarSize
                        }}
                    >
                        <img src={accountAvatar} alt="VP of Marketing" className="w-full h-full object-cover" />
                    </div>
                    <div 
                        ref={contentRef}
                        className={`text-white text-${textSize} text-center px-2 overflow-auto max-h-[80%]`}
                        style={{
                            maxWidth: '90%',
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-wrap'
                        }}>
                        {renderText(title)}
                    </div>
                </div>
            ) : (
                /* Rendering for other circular nodes with icon */
                <>
                    <div className="text-white mb-2">
                        {typeof icon === 'function' 
                            ? icon() 
                            : React.cloneElement(icon as React.ReactElement<any>, {
                                size: baseSize.iconSize
                            })}
                    </div>
                    <div
                        ref={contentRef}
                        className={`text-white text-${textSize} text-center px-2 py-2 overflow-auto max-h-[80%]`}
                        style={{
                            maxWidth: '90%',
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-wrap'
                        }}
                    >
                        {renderText(title)}
                    </div>
                </>
            )}

            {/* Expand/collapse button - only shown for nodes with children */}
            {(childCount ?? 0) > 0 && (
                <button
                    className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gray-900 
                   flex items-center justify-center border border-gray-700 text-white hover:bg-gray-800 cursor-pointer"
                    onClick={handleExpand}
                    style={{ 
                        touchAction: 'none',
                        zIndex: 10
                    }}
                >
                    <div className="w-full h-full flex items-center justify-center">
                        {expanded ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                </button>
            )}
        </div>
    );
};

export default CircularNode; 