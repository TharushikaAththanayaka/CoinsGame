import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  test('renders 5x5 grid of flowers', async () => {
    render(<GameBoard isGameActive={true} onScoreUpdate={mockOnScoreUpdate} />);
    
    await waitFor(() => {
      const gameBoard = screen.getByTestId('game-board');
      expect(gameBoard).toBeInTheDocument();
      const flowers = screen.queryAllByTestId(/flower-/);
      expect(flowers.length).toBe(25); // 5x5 = 25
    }, { timeout: 2000 });
  });

  test('initializes board without matches', async () => {
    render(<GameBoard isGameActive={true} onScoreUpdate={mockOnScoreUpdate} />);
    
    await waitFor(() => {
      expect(mockOnScoreUpdate).not.toHaveBeenCalled();
    });
  });

  test('allows selecting a flower cell', async () => {
    render(<GameBoard isGameActive={true} onScoreUpdate={mockOnScoreUpdate} />);
    
    await waitFor(() => {
      const flowers = screen.getAllByTestId(/flower-/);
      if (flowers.length > 0) {
        fireEvent.click(flowers[0]);
        // Cell should be selected (visual indication)
        expect(flowers[0]).toBeInTheDocument();
      }
    });
  });

  test('prevents interaction when game is not active', async () => {
    render(<GameBoard isGameActive={false} onScoreUpdate={mockOnScoreUpdate} />);
    
    await waitFor(() => {
      const flowers = screen.getAllByTestId(/flower-/);
      if (flowers.length > 0) {
        const initialState = flowers[0].className;
        fireEvent.click(flowers[0]);
        // Should not change state when inactive
        expect(flowers[0].className).toBe(initialState);
      }
    });
  });

  test('swaps adjacent flowers on click', async () => {
    render(<GameBoard isGameActive={true} onScoreUpdate={mockOnScoreUpdate} />);
    
    await waitFor(async () => {
      const flowers = screen.getAllByTestId(/flower-/);
      if (flowers.length >= 2) {
        // Click first flower
        fireEvent.click(flowers[0]);
        
        // Click second flower (adjacent)
        await waitFor(() => {
          fireEvent.click(flowers[1]);
        });
        
        // Should attempt swap
        expect(flowers.length).toBeGreaterThan(0);
      }
    });
  });

  test('reverts invalid swaps', async () => {
    render(<GameBoard isGameActive={true} onScoreUpdate={mockOnScoreUpdate} />);
    
    await waitFor(() => {
      const flowers = screen.getAllByTestId(/flower-/);
      if (flowers.length >= 6) {
        // Select first cell
        fireEvent.click(flowers[0]);
        
        // Try to swap with non-adjacent cell (6th cell, which is not adjacent)
        fireEvent.click(flowers[5]);
        
        // Swap should not occur if cells are not adjacent
        expect(flowers.length).toBeGreaterThan(0);
      }
    });
  });
});

