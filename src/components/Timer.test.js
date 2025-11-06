import React from 'react';
import { render, screen } from '@testing-library/react';
import Timer from './Timer';

describe('Timer Component', () => {
  test('displays time in MM:SS format', () => {
    render(<Timer timeRemaining={120} />);
    expect(screen.getByText(/02:00/i)).toBeInTheDocument();
  });

  test('displays single digit minutes and seconds correctly', () => {
    render(<Timer timeRemaining={65} />);
    expect(screen.getByText(/01:05/i)).toBeInTheDocument();
  });

  test('displays zero seconds correctly', () => {
    render(<Timer timeRemaining={60} />);
    expect(screen.getByText(/01:00/i)).toBeInTheDocument();
  });

  test('displays zero time correctly', () => {
    render(<Timer timeRemaining={0} />);
    expect(screen.getByText(/00:00/i)).toBeInTheDocument();
  });

  test('calculates progress bar correctly for 2 minutes', () => {
    const { container } = render(<Timer timeRemaining={60} />);
    const progressBar = container.querySelector('.timer-progress');
    
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle({ width: '50%' });
  });

  test('shows 100% progress at start', () => {
    const { container } = render(<Timer timeRemaining={120} />);
    const progressBar = container.querySelector('.timer-progress');
    
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle({ width: '100%' });
  });

  test('shows 0% progress at end', () => {
    const { container } = render(<Timer timeRemaining={0} />);
    const progressBar = container.querySelector('.timer-progress');
    
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle({ width: '0%' });
  });

  test('displays correct label', () => {
    render(<Timer timeRemaining={120} />);
    expect(screen.getByText(/Time Remaining/i)).toBeInTheDocument();
  });

  test('formats time correctly for various values', () => {
    const { rerender } = render(<Timer timeRemaining={90} />);
    expect(screen.getByText(/01:30/i)).toBeInTheDocument();
    
    rerender(<Timer timeRemaining={30} />);
    expect(screen.getByText(/00:30/i)).toBeInTheDocument();
    
    rerender(<Timer timeRemaining={15} />);
    expect(screen.getByText(/00:15/i)).toBeInTheDocument();
    
    rerender(<Timer timeRemaining={119} />);
    expect(screen.getByText(/01:59/i)).toBeInTheDocument();
  });
});
