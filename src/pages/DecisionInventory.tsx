import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { useGraphData } from '@/components/decision_inventory/useGraphData';
import FlowchartCore from '@/components/decision_inventory/FlowchartCore';

// Main component that wraps the flowchart with a provider
export default function DecisionInventory() {
    // Use the extracted data loading hook
    const { graph, loading, error } = useGraphData();
    
    return (
        <ReactFlowProvider>
            <FlowchartCore 
                graph={graph}
                loading={loading} 
                error={error} 
            />
        </ReactFlowProvider>
    );
}