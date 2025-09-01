import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DecisionInsights from '@/pages/DecisionInsights';

// Mock any chart components that might be used
jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="line-chart">Line Chart Mock</div>
}));

jest.mock('@nivo/bar', () => ({
  ResponsiveBar: () => <div data-testid="bar-chart">Bar Chart Mock</div>
}));

// Mock recharts components
jest.mock('recharts', () => {
  const React = require('react');
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
    LineChart: () => <div data-testid="line-chart">Line Chart Mock</div>,
    BarChart: () => <div data-testid="bar-chart">Bar Chart Mock</div>,
    AreaChart: () => <div data-testid="area-chart">Area Chart Mock</div>,
    PieChart: () => <div data-testid="pie-chart">Pie Chart Mock</div>
  };
});

describe('DecisionInsights', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <DecisionInsights />
      </MemoryRouter>
    );
    
    // Check for elements that should be in the insights page
    const insightsContainer = screen.getByText('', { 
      selector: 'div.mx-auto.px-2.sm\\:px-4.max-w-\\[95\\%\\].sm\\:max-w-\\[92\\%\\]' 
    });
    expect(insightsContainer).toBeInTheDocument();
    
    // Check for a specific heading or element that should always be there
    expect(screen.getByText('Brand Awareness')).toBeInTheDocument();
  });
});