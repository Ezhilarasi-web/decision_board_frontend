import React from 'react';

// Declare custom attributes for JSX elements
declare namespace JSX {
  interface IntrinsicElements {
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  }
}

// This mock will be used for all @nivo/* imports
const MockChart = jest.fn(() => React.createElement("div", { "data-testid": "mock-nivo-chart" }, "Nivo Chart Mock"));

// Create mock exports for all the Nivo chart components we need
const mockExports = {
  Bar: MockChart,
  ResponsiveBar: MockChart,
  Line: MockChart,
  ResponsiveLine: MockChart,
  Pie: MockChart,
  ResponsivePie: MockChart,
  AreaBump: MockChart,
  ResponsiveAreaBump: MockChart,
  Bump: MockChart,
  ResponsiveBump: MockChart,
  Scatter: MockChart,
  ResponsiveScatterPlot: MockChart,
  Heatmap: MockChart,
  ResponsiveHeatMap: MockChart,
  // Add other chart types as needed
};

export default mockExports;
module.exports = mockExports;