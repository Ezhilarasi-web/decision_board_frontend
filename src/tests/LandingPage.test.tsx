import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';

jest.mock('@/components/PageTransition', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="page-transition">{children}</div>
  };
});

describe('LandingPage', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <LandingPage onStartClick={() => {}} />
      </MemoryRouter>
    );
    
    // Look for something that should be on the landing page
    expect(screen.getByTestId('page-transition')).toBeInTheDocument();
  });
});