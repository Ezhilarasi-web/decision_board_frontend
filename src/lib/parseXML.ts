// Type definitions for the graph data
export interface GraphNode {
  id: string;
  content?: string;
  type?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/**
 * Parses XML string into a graph structure
 * @param xmlString The XML string to parse
 * @returns A graph object with nodes and edges
 */
export function parseXML(xmlString: string): Graph | null {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    
    // Check for parser errors
    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
      console.error("XML parsing error:", parserError.textContent);
      return null;
    }
    
    const graph: Graph = {
      nodes: [],
      edges: []
    };
    
    // Parse nodes
    const nodeElements = xmlDoc.querySelectorAll("graph > nodes > node");
    nodeElements.forEach(nodeElement => {
      const id = nodeElement.getAttribute("id");
      if (!id) return;
      
      // Get content from the node, if it exists
      const contentElement = nodeElement.querySelector("content");
      const content = contentElement ? contentElement.textContent : "";
      
      // Get type from the node attribute instead of looking for a child element
      const type = nodeElement.getAttribute("type") || "";
      
      // Create node
      const node: GraphNode = { id };
      if (content) node.content = content;
      if (type) node.type = type;
      
      graph.nodes.push(node);
    });
    
    // Parse edges
    const edgeElements = xmlDoc.querySelectorAll("graph > edges > edge");
    edgeElements.forEach(edgeElement => {
      const id = edgeElement.getAttribute("id");
      const source = edgeElement.getAttribute("source");
      const target = edgeElement.getAttribute("target");
      
      if (!id || !source || !target) return;
      
      // Create edge
      const edge: GraphEdge = { id, source, target };
      graph.edges.push(edge);
    });
    
    // Filter out edges with empty targets
    graph.edges = graph.edges.filter(edge => edge.target !== "");
    
    // If no edges were successfully parsed, try to infer them from the node order
    if (graph.edges.length === 0 && graph.nodes.length > 1) {
      console.warn("No edges found in XML, inferring parent-child relationships");
      
      // Use the first node as the root
      const rootNode = graph.nodes[0];
      
      // Create edges from root to all other nodes
      for (let i = 1; i < graph.nodes.length; i++) {
        graph.edges.push({
          id: `inferred-${i}`,
          source: rootNode.id,
          target: graph.nodes[i].id
        });
      }
    }
    
    return graph;
  } catch (error) {
    console.error("Error parsing XML:", error);
    return null;
  }
} 