import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import GameScreen from './GameScreen';

// Mock child components to avoid complex dependencies
jest.mock('./GameBoard', () => {
  return function MockGameBoard({ isGameActive, onScoreUpdate }) {
    return (
      <div data-testid="game-board">
        <button
          onClick={() => onScoreUpdate(15, 'coral', 3)}
          data-testid="score-button"
        >
          Test Score
        </button>
        <span data-testid="game-active">{isGameActive ? 'Active' : 'Inactive'}</span>
      </div>
    );
  };
});

jest.mock('./Timer', () => {
  return function MockTimer({ timeRemaining }) {
    return <div data-testid="timer">Time: {timeRemaining}</div>;
  };
});

jest.mock('./Score', () => {
  return function MockScore({ score }) {
    return <div data-testid="score">Score: {score}</div>;
  };
});

jest.mock('./CollectionBasket', () => {
  return function MockCollectionBasket({ collectedFlowers }) {
    return <div data-testid="collection-basket">Basket</div>;
  };
});

describe('GameScreen Component', () => {
  const mockOnGameEnd = jest.fn();
  const mockOnGoBack = jest.fn();

  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
    mockOnGameEnd.mockClear();
    mockOnGoBack.mockClear();
    window.confirm = jest.fn(() => true);
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('renders game board and components', () => {
    render(<GameScreen onGameEnd={mockOnGameEnd} onGoBack={mockOnGoBack} />);
    
    expect(screen.getByTestId('game-board')).toBeInTheDocument();
    expect(screen.getByTestId('timer')).toBeInTheDocument();
    expect(screen.getByTestId('score')).toBeInTheDocument();
    expect(screen.getByTestId('collection-basket')).toBeInTheDocument();
  });

  test('initializes with 120 seconds timer', () => {
    render(<GameScreen onGameEnd={mockOnGameEnd} onGoBack={mockOnGoBack} />);
    expect(screen.getByTestId('timer')).toHaveTextContent('Time: 120');
  });

  test('initializes with zero score', () => {
    render(<GameScreen onGameEnd={mockOnGameEnd} onGoBack={mockOnGoBack} />);
    expect(screen.getByTestId('score')).toHaveTextContent('Score: 0');
  });

  test('updates score when onScoreUpdate is called', () => {
    render(<GameScreen onGameEnd={mockOnGameEnd} onGoBack={mockOnGoBack} />);
    const scoreButton = screen.getByTestId('score-button');
    
    act(() => {
      fireEvent.click(scoreButton);
    });
    
    expect(screen.getByTestId('score')).toHaveTextContent('Score: 15');
  });

  test('timer counts down', async () => {
    render(<GameScreen onGameEnd={mockOnGameEnd} onGoBack={mockOnGoBack} />);
    
    expect(screen.getByTestId('timer')).toHaveTextContent('Time: 120');
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('timer')).toHaveTextContent('Time: 119');
    }, { timeout: 1000 });
  });

  test('shows back button', () => {
    render(<GameScreen onGameEnd={mockOnGameEnd} onGoBack={mockOnGoBack} />);
    const backButton = screen.getByLabelText(/go back/i);
    expect(backButton).toBeInTheDocument();
  });

  test('back button shows confirmation and calls onGoBack', () => {
    window.confirm = jest.fn(() => true);
    render(<GameScreen onGameEnd={mockOnGameEnd} onGoBack={mockOnGoBack} />);
    
    const backButton = screen.getByLabelText(/go back/i);
    
    act(() => {
      fireEvent.click(backButton);
    });
    
    expect(window.confirm).toHaveBeenCalledWith(
      expect.stringContaining('Are you sure')
    );
    expect(mockOnGoBack).toHaveBeenCalledTimes(1);
  });

  test('back button does not call onGoBack if user cancels', () => {
    window.confirm = jest.fn(() => false);
    render(<GameScreen onGameEnd={mockOnGameEnd} onGoBack={mockOnGoBack} />);
    
    const backButton = screen.getByLabelText(/go back/i);
    
    act(() => {
      fireEvent.click(backButton);
    });
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockOnGoBack).not.toHaveBeenCalled();
  });

  test('game board receives isGameActive prop correctly', () => {
    render(<GameScreen onGameEnd={mockOnGameEnd} onGoBack={mockOnGoBack} />);
    const gameBoard = screen.getByTestId('game-active');
    expect(gameBoard).toHaveTextContent('Active');
  });
});
