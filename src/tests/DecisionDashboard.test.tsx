import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DecisionDashboard from '@/pages/DecisionDashboard';

// Mock PageTransition component
jest.mock('@/components/PageTransition', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="page-transition">{children}</div>
  };
});

// Mock chart wrapper components
jest.mock('@/components/decision_dashboards/chartWrapperComponents', () => {
  return {
    __esModule: true,
    ChartErrorBoundary: ({ children }: { children: React.ReactNode }) => <div data-testid="chart-error-boundary">{children}</div>,
    LazyChart: ({ tile, chartType }: { tile: any, chartType: string }) => 
      <div data-testid={`lazy-chart-${chartType}`}>Chart: {chartType}</div>,
    DataValidationWarning: () => <div data-testid="data-validation-warning">Data Validation Warning</div>
  };
});

// Mock the dummy data to avoid async loading issues
jest.mock('@/components/decision_dashboards/dummyData', () => {
  return {
    dummyData: {
      sections: [
        {
          id: 'marketing',
          title: 'Marketing Analytics',
          tiles: []
        }
      ]
    }
  };
});

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  return {
    motion: {
      div: ({ children, ...props }: React.PropsWithChildren<any>) => (
        <div data-testid="motion-div" {...props}>{children}</div>
      ),
    },
    AnimatePresence: ({ children }: React.PropsWithChildren<{}>) => <>{children}</>,
  };
});

// This is needed to ensure our Nivo mocks are picked up
jest.mock('@nivo/bar', () => {
  return {
    ResponsiveBar: () => <div data-testid="nivo-bar">Bar Chart</div>
  };
});

describe('DecisionDashboard', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <DecisionDashboard />
      </MemoryRouter>
    );
    
    // Check for the loading UI with flex container
    const loadingElement = screen.getByText('', { selector: 'div.flex.h-screen.mx-auto.w-full' });
    expect(loadingElement).toBeInTheDocument();
    
    // Check for animation elements that should be present in the loading state
    const animatedElements = screen.getAllByText('', { selector: 'div.animate-pulse' });
    expect(animatedElements.length).toBeGreaterThan(0);
  });
});