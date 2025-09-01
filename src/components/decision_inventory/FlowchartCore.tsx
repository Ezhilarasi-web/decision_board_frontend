import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, {
    Background,
    useNodesState,
    useEdgesState,
    useReactFlow,
    NodeTypes,
    ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { CircularNode, RectangularNode } from '@/components/decision_inventory';
import { Legend, LoadingSpinner, ErrorDisplay, FlowControls } from '@/components/decision_inventory';
import { useNodeOperations } from './useNodeOperations';
import { useInitialGraph } from './useInitialGraph';
import { calculateDirectionalPadding } from './nodePositioning';
import { Graph } from '@/lib/parseXML';

// Create custom node types object with both circular and rectangular nodes
const nodeTypes: NodeTypes = {
    circularNode: CircularNode,
    rectangularNode: RectangularNode,
};

interface FlowchartCoreProps {
    graph: Graph | null;
    loading: boolean;
    error: string | null;
}

const FlowchartCore = ({ graph, loading, error }: FlowchartCoreProps) => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [expandingAll, setExpandingAll] = useState(false);
    const { fitView } = useReactFlow();
    
    // Get initialization functions
    const { createInitialGraph } = useInitialGraph();
    
    // Use node operations hooks
    const { processedExpandedNodes, processedCollapsedNodes } = useNodeOperations(
        nodes,
        setNodes,
        edges,
        setEdges,
        graph
    );

    // Initialize graph data
    useEffect(() => {
        if (graph && nodes.length === 0) {
            const { nodes: initialNodes, edges: initialEdges } = createInitialGraph(graph);
            setNodes(initialNodes);
            setEdges(initialEdges);
            
            // Fit view after nodes are rendered
            setTimeout(() => {
                fitView({ padding: 0.2 });
            }, 100);
        }
    }, [graph, createInitialGraph, setNodes, setEdges, fitView, nodes.length]);

    return (
        <div className="w-full h-full bg-black/40 backdrop-blur-sm rounded-lg border border-gray-700 relative">
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorDisplay message={error} />
            ) : (
                <div className="w-full h-full" ref={reactFlowWrapper}>
                    {expandingAll && (
                        <LoadingSpinner size="lg" message="Expanding all nodes..." />
                    )}
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        nodeTypes={nodeTypes}
                        connectionLineType={ConnectionLineType.Straight}
                        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                        minZoom={0.2}
                        maxZoom={2}
                        fitView
                        proOptions={{ hideAttribution: true }}
                    >
                        <Background color="#444" gap={16} />
                        <FlowControls 
                            processedExpandedNodes={processedExpandedNodes}
                            processedCollapsedNodes={processedCollapsedNodes}
                            setExpandingAll={setExpandingAll}
                            cachedGraph={graph}
                        />
                        <Legend />
                    </ReactFlow>
                </div>
            )}
        </div>
    );
};

export default FlowchartCore;