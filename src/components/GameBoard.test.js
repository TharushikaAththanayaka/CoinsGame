import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import GameBoard from './GameBoard';

describe('GameBoard Component', () => {
  const mockOnScoreUpdate = jest.fn();

  beforeEach(() => {
    mockOnScoreUpdate.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('renders game board container', async () => {
    render(<GameBoard isGameActive={true} onScoreUpdate={mockOnScoreUpdate} />);
    
    await waitFor(() => {
      const gameBoard = screen.getByTestId('game-board');
      expect(gameBoard).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('renders 5x5 grid of flowers', async () => {
    render(<GameBoard isGameActive={true} onScoreUpdate={mockOnScoreUpdate} />);
    
    await waitFor(() => {
      const flowers = screen.queryAllByTestId(/flower-/);
      expect(flowers.length).toBe(25); // 5x5 = 25
    }, { timeout: 3000 });
  });

  test('initializes board without matches', async () => {
    render(<GameBoard isGameActive={true} onScoreUpdate={mockOnScoreUpdate} />);
    
    await waitFor(() => {
      // Should not call score update on initialization
      expect(mockOnScoreUpdate).not.toHaveBeenCalled();
    }, { timeout: 2000 });
  });

  test('renders flowers with different colors', async () => {
    render(<GameBoard isGameActive={true} onScoreUpdate={mockOnScoreUpdate} />);
    
    await waitFor(() => {
      const flowers = screen.queryAllByTestId(/flower-/);
      expect(flowers.length).toBeGreaterThan(0);
      
      // Check that flowers have color classes
      const hasColorClass = flowers.some(flower => 
        flower.className.includes('flower-coral') ||
        flower.className.includes('flower-skyblue') ||
        flower.className.includes('flower-gold') ||
        flower.className.includes('flower-lime') ||
        flower.className.includes('flower-magenta')
      );
      expect(hasColorClass).toBe(true);
    }, { timeout: 3000 });
  });
});
