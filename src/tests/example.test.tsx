import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// This is just a simple component for testing
const Button = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button onClick={onClick}>{children}</button>
);

describe('Example Test', () => {
  it('renders correctly', async () => {
    // Setup userEvent
    const user = userEvent.setup();
    const mockFn = jest.fn();
    
    render(<Button onClick={mockFn}>Click me</Button>);
    
    // Check if the button is in the document
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    
    // Click the button with await
    await user.click(screen.getByRole('button', { name: /click me/i }));
    
    // Check if onClick was called
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});