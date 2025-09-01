import React from 'react';

// Mock the chart components that cause ESM issues
export const MockChartComponent = ({ children }: { children?: React.ReactNode }) => (
  <div data-testid="mock-chart">Mock Chart Component {children}</div>
);

// Mock other problematic components as needed
export const MockNavbar = () => <div data-testid="mock-navbar">Mock Navbar</div>;

export const MockTransition = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="mock-transition">{children}</div>
);

// Add any other mocks needed for testing