import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EndScreen from './EndScreen';

describe('EndScreen Component', () => {
  const mockOnPlayAgain = jest.fn();
  const mockOnGoBack = jest.fn();

  beforeEach(() => {
    mockOnPlayAgain.mockClear();
    mockOnGoBack.mockClear();
  });

  test('displays end title', () => {
    render(<EndScreen score={1000} onPlayAgain={mockOnPlayAgain} onGoBack={mockOnGoBack} />);
    expect(screen.getByText(/Time's Up!/i)).toBeInTheDocument();
  });

  test('displays final score', () => {
    render(<EndScreen score={1234} onPlayAgain={mockOnPlayAgain} onGoBack={mockOnGoBack} />);
    expect(screen.getByText(/1,234/i)).toBeInTheDocument();
  });

  test('displays score label', () => {
    render(<EndScreen score={500} onPlayAgain={mockOnPlayAgain} onGoBack={mockOnGoBack} />);
    expect(screen.getByText(/Your Total Score/i)).toBeInTheDocument();
  });

  test('displays zero score correctly', () => {
    render(<EndScreen score={0} onPlayAgain={mockOnPlayAgain} onGoBack={mockOnGoBack} />);
    expect(screen.getByText(/0/i)).toBeInTheDocument();
  });

  test('formats large scores with commas', () => {
    render(<EndScreen score={999999} onPlayAgain={mockOnPlayAgain} onGoBack={mockOnGoBack} />);
    expect(screen.getByText(/999,999/i)).toBeInTheDocument();
  });

  test('renders Play Again button', () => {
    render(<EndScreen score={1000} onPlayAgain={mockOnPlayAgain} onGoBack={mockOnGoBack} />);
    const playAgainButton = screen.getByText(/Play Again/i);
    expect(playAgainButton).toBeInTheDocument();
    expect(playAgainButton.tagName).toBe('BUTTON');
  });

  test('calls onPlayAgain when Play Again button is clicked', () => {
    render(<EndScreen score={1000} onPlayAgain={mockOnPlayAgain} onGoBack={mockOnGoBack} />);
    const playAgainButton = screen.getByText(/Play Again/i);
    fireEvent.click(playAgainButton);
    expect(mockOnPlayAgain).toHaveBeenCalledTimes(1);
  });

  test('renders back button', () => {
    render(<EndScreen score={1000} onPlayAgain={mockOnPlayAgain} onGoBack={mockOnGoBack} />);
    const backButton = screen.getByLabelText(/go back/i);
    expect(backButton).toBeInTheDocument();
  });

  test('calls onGoBack when back button is clicked', () => {
    render(<EndScreen score={1000} onPlayAgain={mockOnPlayAgain} onGoBack={mockOnGoBack} />);
    const backButton = screen.getByLabelText(/go back/i);
    fireEvent.click(backButton);
    expect(mockOnGoBack).toHaveBeenCalledTimes(1);
  });

  test('displays score correctly for different values', () => {
    const { rerender } = render(
      <EndScreen score={100} onPlayAgain={mockOnPlayAgain} onGoBack={mockOnGoBack} />
    );
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    
    rerender(<EndScreen score={5000} onPlayAgain={mockOnPlayAgain} onGoBack={mockOnGoBack} />);
    expect(screen.getByText(/5,000/i)).toBeInTheDocument();
  });
});
