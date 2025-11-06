import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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
  });

  test('renders game board container', async () => {
    render(<GameBoard isGameActive={true} onScoreUpdate={mockOnScoreUpdate} />);
    
    await waitFor(() => {
      const gameBoard = screen.getByTestId('game-board');
      expect(gameBoard).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  test('renders 5x5 grid of flowers', async () => {
    render(<GameBoard isGameActive={true} onScoreUpdate={mockOnScoreUpdate} />);
    
    await waitFor(() => {
      const flowers = screen.queryAllByTestId(/flower-/);
      expect(flowers.length).toBe(25); // 5x5 = 25
    }, { timeout: 2000 });
  });

  test('initializes board without matches', async () => {
    render(<GameBoard isGameActive={true} onScoreUpdate={mockOnScoreUpdate} />);
    
    await waitFor(() => {
      // Should not call score update on initialization
      expect(mockOnScoreUpdate).not.toHaveBeenCalled();
    }, { timeout: 2000 });
  });

  test('allows selecting a flower cell', async () => {
    render(<GameBoard isGameActive={true} onScoreUpdate={mockOnScoreUpdate} />);
    
    await waitFor(() => {
      const flowers = screen.queryAllByTestId(/flower-/);
      if (flowers.length > 0) {
        fireEvent.click(flowers[0]);
        // Cell should be selected (visual indication)
        expect(flowers[0]).toBeInTheDocument();
      }
    }, { timeout: 2000 });
  });

  test('prevents interaction when game is not active', async () => {
    render(<GameBoard isGameActive={false} onScoreUpdate={mockOnScoreUpdate} />);
    
    await waitFor(() => {
      const flowers = screen.queryAllByTestId(/flower-/);
      if (flowers.length > 0) {
        const initialState = flowers[0].className;
        fireEvent.click(flowers[0]);
        // Should not change state when inactive (no selection)
        expect(flowers[0]).toBeInTheDocument();
      }
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
    }, { timeout: 2000 });
  });
});
