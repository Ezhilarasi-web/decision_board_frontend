import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Overview from '@/pages/Overview';

// Mock window.scrollTo to fix JSDOM error
beforeAll(() => {
  // Create mock for window.scrollTo
  Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: jest.fn()
  });
});

// Mock PageTransition component (even though it's not used directly in Overview)
jest.mock('@/components/PageTransition', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="page-transition">{children}</div>
  };
});

// Mock the overview components to avoid deeper rendering issues
jest.mock('@/components/overview', () => ({
  DecisionBoardOverview: () => <div data-testid="decision-board-overview">Decision Board Overview Mock</div>,
  ExecutionExcellence: () => <div data-testid="execution-excellence">Execution Excellence Mock</div>,
  DecisionPerformance: () => <div data-testid="decision-performance">Decision Performance Mock</div>
}));

// Mock any chart components (if used in the page)
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
    LineChart: () => <div data-testid="line-chart">Line Chart Mock</div>,
    BarChart: () => <div data-testid="bar-chart">Bar Chart Mock</div>,
    AreaChart: () => <div data-testid="area-chart">Area Chart Mock</div>
  };
});

describe('Overview', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Overview />
      </MemoryRouter>
    );
    
    // Check for the main container with the updated class pattern
    const overviewContainer = screen.getByText('', { 
      selector: 'div.w-full.h-\\[calc\\(100vh-64px\\)\\].flex.flex-col.md\\:flex-row.gap-4.lg\\:gap-6.p-4.md\\:p-6.justify-center.overflow-hidden' 
    });
    expect(overviewContainer).toBeInTheDocument();
    
    // Check for the mocked components instead of specific text
    expect(screen.getByTestId('decision-board-overview')).toBeInTheDocument();
    expect(screen.getByTestId('execution-excellence')).toBeInTheDocument();
    expect(screen.getByTestId('decision-performance')).toBeInTheDocument();
  });
});