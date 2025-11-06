import React from 'react';
import { render, screen } from '@testing-library/react';
import Score from './Score';

describe('Score Component', () => {
  test('displays score with comma formatting', () => {
    render(<Score score={12345} />);
    expect(screen.getByText(/12,345/i)).toBeInTheDocument();
  });

  test('displays zero score', () => {
    render(<Score score={0} />);
    expect(screen.getByText(/0/i)).toBeInTheDocument();
  });

  test('displays large scores correctly', () => {
    render(<Score score={999999} />);
    expect(screen.getByText(/999,999/i)).toBeInTheDocument();
  });

  test('displays score label', () => {
    render(<Score score={100} />);
    expect(screen.getByText(/Score/i)).toBeInTheDocument();
  });

  test('renders score container', () => {
    const { container } = render(<Score score={100} />);
    const scoreContainer = container.querySelector('.score-container');
    expect(scoreContainer).toBeInTheDocument();
  });

  test('updates score display when prop changes', () => {
    const { rerender } = render(<Score score={100} />);
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    
    rerender(<Score score={250} />);
    expect(screen.getByText(/250/i)).toBeInTheDocument();
    
    rerender(<Score score={1000} />);
    expect(screen.getByText(/1,000/i)).toBeInTheDocument();
  });

  test('displays score value in correct element', () => {
    const { container } = render(<Score score={500} />);
    const scoreValue = container.querySelector('.score-value');
    expect(scoreValue).toBeInTheDocument();
    expect(scoreValue).toHaveTextContent('500');
  });
});
