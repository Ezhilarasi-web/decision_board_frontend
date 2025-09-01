# ReactFlowchart Abstraction

This directory contains the abstracted components and utilities from the original `ReactFlowchart.tsx` file. Below is an explanation of how the abstraction was performed.

## File Structure

- **types.ts**: Contains type definitions including `NodeType`, `NodeData`, `NodeWithDepth`, and size configurations.
- **constants.ts**: Contains constant values like colors, node sizes, and icon mappings.
- **utils.tsx**: Contains utility functions like icon selection, title extraction, and node categorization.
- **CircularNode.tsx**: Component for rendering circular nodes.
- **RectangularNode.tsx**: Component for rendering rectangular nodes.
- **index.ts**: Exports all components and utilities for easy importing.

## Implementation Details

The original monolithic `ReactFlowchart.tsx` has been split into modular components:

1. **Types and Interfaces**: All type definitions have been extracted to `types.ts`.
2. **Constants**: Colors, sizes, and other constant values moved to `constants.ts`.
3. **Utility Functions**: Helper functions extracted to `utils.tsx`.
4. **Node Components**: The core UI components for nodes separated into their own files.

## How to Use

To use these abstracted components, import them in your React component:

```tsx
import { 
  CircularNode, 
  RectangularNode,
  typeColors,
  NodeWithDepth,
  shouldBeCircular,
  categorizeNode,
  getNodeIcon,
  extractTitle,
  getHandlePositions
} from './flowchart';
```

A sample implementation can be found in `ReactFlowchartUpdated.tsx` which demonstrates how to use these abstracted components.

## Original Implementation

The original implementation remains in `ReactFlowchart.tsx` for reference.

## Note

This abstraction was performed using cut-and-paste operations only, ensuring the code logic remains unchanged while improving maintainability and readability. 