import { useState, useEffect } from 'react';
import { parseXML, Graph } from '@/lib/parseXML';

// Add TypeScript declaration for window property
declare global {
    interface Window {
        __preloadedXML?: string;
    }
}

// Cache for graph data
let cachedGraph: Graph | null = null;

/**
 * Custom hook that handles loading XML data for the decision inventory
 * Uses multiple strategies to ensure data is loaded correctly
 */
export const useGraphData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [graph, setGraph] = useState<Graph | null>(null);

    useEffect(() => {
        // Preload XML data - this will be included in the build
        // Using dynamic import to avoid blocking the initial load
        import('@/assets/decision_inventory_minified.xml?raw')
            .then(module => {
                if (module.default) {
                    // Store for later use
                    window.__preloadedXML = module.default;
                }
            })
            .catch(err => console.warn('Failed to preload XML:', err));
    }, []);

    // Load the XML data and parse it
    useEffect(() => {
        const loadXMLData = async () => {
            try {
                setLoading(true);
                
                // Only fetch and parse XML if not cached
                if (!cachedGraph) {
                    // console.log('Loading XML data...');
                    
                    // Import XML file from assets directly for production builds
                    let xmlData: string | null = null;
                    let successPath = '';
                    
                    // Determine base URL for asset loading
                    const baseUrl = window.location.origin;
                    // console.log('Base URL:', baseUrl);
                    
                    // Try different approaches to load the XML
                    const loadingStrategies = [
                        // Strategy 0: Use preloaded XML if available (fastest)
                        async () => {
                            if (window.__preloadedXML) {
                                xmlData = window.__preloadedXML;
                                successPath = 'preloaded XML';
                                return true;
                            }
                            return false;
                        },
                        
                        // Strategy 1: Try to fetch directly from public folder with base URL
                        async () => {
                            try {
                                const response = await fetch(`${baseUrl}/decision_inventory_minified.xml`);
                                if (response.ok) {
                                    xmlData = await response.text();
                                    successPath = `${baseUrl}/decision_inventory_minified.xml`;
                                    return true;
                                }
                            } catch (e) {
                                console.warn('Strategy 1 failed:', e);
                            }
                            return false;
                        },
                        
                        // Strategy 2: Try to fetch from public folder (relative path)
                        async () => {
                            try {
                                const response = await fetch('/decision_inventory_minified.xml');
                                if (response.ok) {
                                    xmlData = await response.text();
                                    successPath = '/decision_inventory_minified.xml';
                                    return true;
                                }
                            } catch (e) {
                                console.warn('Strategy 2 failed:', e);
                            }
                            return false;
                        },
                        
                        // Strategy 3: Try to import from assets folder with direct import
                        async () => {
                            try {
                                // Type-safe way to import the file
                                const xmlModule = await import('@/assets/decision_inventory_minified.xml?raw');
                                if (xmlModule) {
                                    // Handle different possible return types from import
                                    if (typeof xmlModule === 'string') {
                                        xmlData = xmlModule;
                                    } else if (xmlModule.default && typeof xmlModule.default === 'string') {
                                        xmlData = xmlModule.default;
                                    } else {
                                        // Convert to string if it's another type
                                        xmlData = String(xmlModule.default || xmlModule);
                                    }
                                    
                                    successPath = 'src/assets/decision_inventory_minified.xml (direct import)';
                                    return true;
                                }
                            } catch (e) {
                                console.warn('Strategy 3 failed:', e);
                            }
                            return false;
                        },
                        
                        // Strategy 4: Try simplified fetch from assets in src
                        async () => {
                            try {
                                const response = await fetch('/src/assets/decision_inventory_minified.xml');
                                if (response.ok) {
                                    xmlData = await response.text();
                                    successPath = '/src/assets/decision_inventory_minified.xml';
                                    return true;
                                }
                            } catch (e) {
                                console.warn('Strategy 3 failed:', e);
                            }
                            return false;
                        },
                        
                        // Strategy 5: Try relative paths
                        async () => {
                            const relativePaths = [
                                './assets/decision_inventory_minified.xml',
                                '/assets/decision_inventory_minified.xml'
                            ];
                            
                            for (const path of relativePaths) {
                                try {
                                    const response = await fetch(path);
                                    if (response.ok) {
                                        xmlData = await response.text();
                                        successPath = path;
                                        return true;
                                    }
                                } catch (e) {
                                    console.warn(`Failed to load from ${path}:`, e);
                                }
                            }
                            return false;
                        }
                    ];
                    
                    // Try each strategy until one succeeds
                    for (const strategy of loadingStrategies) {
                        if (await strategy()) {
                            // console.log(`XML loaded successfully via: ${successPath}`);
                            break;
                        }
                    }
                    
                    // Last resort fallback - use minimal hardcoded XML if all strategies fail
                    if (!xmlData) {
                        console.warn('All XML loading strategies failed. Using minimal fallback data.');
                        
                        // Minimal XML structure with just a single root node and 4 children
                        // This is encoded to keep the code clean
                        const fallbackXmlBase64 = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48bXhmaWxlIGhvc3Q9ImFwcC5kaWFncmFtcy5uZXQiIG1vZGlmaWVkPSIyMDIzLTAzLTIxVDIwOjQ4OjQ3LjcwM1oiIGFnZW50PSJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xNV83KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTA5LjAuMC4wIFNhZmFyaS81MzcuMzYiIGV0YWc9InhmaDRjMnNubFFIZFhEMXB0LURRIiB2ZXJzaW9uPSIyMS4xLjgiIHR5cGU9ImRldmljZSI+PGRpYWdyYW0gaWQ9IjhkOHdmOHRBR1BneXlsQUtsWGxyIiBuYW1lPSJQYWdlLTEiPjxteFJvb3Q+PG14Q2VsbCBpZD0iOC1OeDlMak56elJIZTVQcTJ4WlgtMCIgdmFsdWU9IlJvb3QgTm9kZSIgc3R5bGU9IndoaXRlU3BhY2U9d3JhcDtodG1sPTE7Zm9udFNpemU9MTIiIHBhcmVudD0iMSIgdmVydGV4PSIxIj48bXhHZW9tZXRyeSB4PSIxMjAiIHk9IjEyMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2MCIgYXM9Imdlb21ldHJ5IiAvPjxteFJlY3RhbmdsZSByb3VuZGVkPSIxIiByeD0iOTYiIHJ5PSI5NiIgYXM9Imdlb21ldHJ5IiBoZWlnaHQ9IjEyMCIgc3R5bGU9ImZpbGw9I2E3YzdjYztzdHJva2U9I2EwYTBhMCIgd2lkdGg9IjEyMCIgeT0iMTIwIiB4PSIxMjAiIC8+PG14Q2VsbCBpZD0iRytqcXlGTkJyd202MXlxRm9jcFYtMSIgdmFsdWU9IktleSBQYXJhZGlnbSAocGFzdCwgcHJlc2VudCBhbmQgZnV0dXJlIHRyZW5kcykiIHN0eWxlPSJ3aGl0ZVNwYWNlPXdyYXA7aHRtbD0xO2ZvbnRTaXplPTEyIiB2ZXJ0ZXg9IjEiPjxteFJlY3RhbmdsZSB4PSIxMzAiIHk9IjE1MCIgd2lkdGg9IjIyMCIgaGVpZ2h0PSI2MCIgYXM9Imdlb21ldHJ5IiAvPjwvbXhDZWxsPjwvbXhDZWxsPjxteFJvb3Q+PG14Q2VsbCBpZD0iRytqcXlGTkJyd202MXlxRm9jcFYtMiIgdmFsdWU9IlN0YWdlIDEgRGVjaXNpb24iIHN0eWxlPSJ3aGl0ZVNwYWNlPXdyYXA7aHRtbD0xO2ZvbnRTaXplPTEyIiBwYXJlbnQ9IkcrYjk1c0wxQXJ3bTYxeXFGb2NwVi0wIiB2ZXJ0ZXg9IjEiPjxteFJlY3RhbmdsZSB4PSI0MDAiIHk9IjE1MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2MCIgYXM9Imdlb21ldHJ5IiAvPjwvbXhDZWxsPjxteFJvb3Q+PG14Q2VsbCBpZD0iRytqcXlGTkJyd202MXlxRm9jcFYtMyIgdmFsdWU9IlZhbGlkYXRpb24gUGhhc2UiIHN0eWxlPSJ3aGl0ZVNwYWNlPXdyYXA7aHRtbD0xO2ZvbnRTaXplPTEyIiB2ZXJ0ZXg9IjEiPjxteFJlY3RhbmdsZSB4PSIyNTAiIHk9IjI3MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2MCIgYXM9Imdlb21ldHJ5IiAvPjwvbXhDZWxsPjxteFJvb3Q+PG14Q2VsbCBpZD0iRytqcXlGTkJyd202MXlxRm9jcFYtNCIgdmFsdWU9IkVuZCBEZWNpc2lvbiBQb2ludCIgc3R5bGU9IndoaXRlU3BhY2U9d3JhcDtodG1sPTE7Zm9udFNpemU9MTIiIHZlcnRleD0iMSI+PG14UmVjdGFuZ2xlIHg9IjI1MCIgdmFsdWU9IktQSSIgeT0iMTAwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiBhcz0iZ2VvbWV0cnkiIC8+PC9teENlbGw+PG14Q2VsbCBpZD0iRytqcXlGTkJyd202MXlxRm9jcFYtNSIgZWRnZT0iMSIgdmFsdWU9IiIgc291cmNlPSI4LU54OUxqTnp6UkhlNVBxMnhaWC0wIiB0YXJnZXQ9IkcrYjk1c0wxQXJ3bTYxeXFGb2NwVi0xIiBzdHlsZT0id2hpdGVTcGFjZT13cmFwO2h0bWw9MTtmb250U2l6ZT0xMiI+PG14R2VvbWV0cnkgcmVsYXRpdmU9IjEiIGFzPSJnZW9tZXRyeSIgLz48L214Q2VsbD48bXhDZWxsIGlkPSJHK2pxeUZOQnJ3bTYxeXFGb2NwVi02IiBlZGdlPSIxIiB2YWx1ZT0iIiBzb3VyY2U9IjgtTng5TGpOenpSSGU1UHEyeFpYLTAiIHRhcmdldD0iRytqcXlGTkJyd202MXlxRm9jcFYtMiIgc3R5bGU9IndoaXRlU3BhY2U9d3JhcDtodG1sPTE7Zm9udFNpemU9MTIiPjxteEdlb21ldHJ5IHJlbGF0aXZlPSIxIiBhcz0iZ2VvbWV0cnkiIC8+PC9teENlbGw+PG14Q2VsbCBpZD0iRytqcXlGTkJyd202MXlxRm9jcFYtNyIgZWRnZT0iMSIgdmFsdWU9IiIgc291cmNlPSI4LU54OUxqTnp6UkhlNVBxMnhaWC0wIiB0YXJnZXQ9IkcrYjk1c0wxQXJ3bTYxeXFGb2NwVi0zIiBzdHlsZT0id2hpdGVTcGFjZT13cmFwO2h0bWw9MTtmb250U2l6ZT0xMiI+PG14R2VvbWV0cnkgcmVsYXRpdmU9IjEiIGFzPSJnZW9tZXRyeSIgLz48L214Q2VsbD48bXhDZWxsIGlkPSJHK2pxeUZOQnJ3bTYxeXFGb2NwVi04IiBlZGdlPSIxIiB2YWx1ZT0iIiBzb3VyY2U9IjgtTng5TGpOenpSSGU1UHEyeFpYLTAiIHRhcmdldD0iRytqcXlGTkJyd202MXlxRm9jcFYtNCIgc3R5bGU9IndoaXRlU3BhY2U9d3JhcDtodG1sPTE7Zm9udFNpemU9MTIiPjxteEdlb21ldHJ5IHJlbGF0aXZlPSIxIiBhcz0iZ2VvbWV0cnkiIC8+PC9teENlbGw+PC9teVJvb3Q+PC9teENlbGw+PC9teENlbGw+PC9kaWFncmFtPjwvbXhmaWxlPg==";
                        
                        try {
                            xmlData = atob(fallbackXmlBase64);
                            successPath = 'fallback minimal XML';
                        } catch (e) {
                            console.error('Failed to decode fallback XML:', e);
                            setError('Failed to load XML data. All loading strategies failed.');
                            setLoading(false);
                            return;
                        }
                    }
                    
                    // console.log(`Successfully loaded XML from ${successPath}, parsing...`);
                    const parsedGraph = parseXML(xmlData);
                    if (!parsedGraph) {
                        setError('Failed to parse XML data. The file may be corrupted or in an incorrect format.');
                        setLoading(false);
                        return;
                    }
                    
                    // console.log(`XML parsed successfully, found ${parsedGraph.nodes.length} nodes and ${parsedGraph.edges.length} edges.`);
                    cachedGraph = parsedGraph;
                }
                
                setGraph(cachedGraph);
                setLoading(false);
                
            } catch (err) {
                console.error('Error loading graph data:', err);
                setError('Failed to load graph data. Please check the console for details.');
                setLoading(false);
            }
        };
        
        loadXMLData();
    }, []);

    return { graph, loading, error };
};

/**
 * Helper function to build a map of parent nodes to their children
 */
export const buildChildrenMap = (graph: Graph): { [key: string]: string[] } => {
    const childMap: { [key: string]: string[] } = {};

    graph.nodes.forEach(node => {
        childMap[node.id] = [];
    });

    graph.edges.forEach(edge => {
        if (edge.source && edge.target) {
            if (!childMap[edge.source]) {
                childMap[edge.source] = [];
            }
            childMap[edge.source].push(edge.target);
        }
    });

    return childMap;
};

/**
 * Helper function to find the root node in a graph
 */
export const findRootNode = (graph: Graph) => {
    // First try to find by content
    let rootNode = graph.nodes.find(node => 
        node.content?.toLowerCase().includes('vp') || 
        node.content?.toLowerCase().includes('evie bloom')
    );
    
    // Then try by ID
    if (!rootNode) {
        rootNode = graph.nodes.find(node => node.id === '8-Nx9LjNzzRHe5Pq2xZX-0');
    }
    
    // Then try to find node that has outgoing edges
    if (!rootNode) {
        const nodeWithEdges = graph.nodes.find(node => 
            graph.edges.some(edge => edge.source === node.id)
        );
        rootNode = nodeWithEdges || graph.nodes[0];
    }
    
    return rootNode;
};