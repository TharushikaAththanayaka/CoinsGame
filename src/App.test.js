import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock the child components to avoid complex dependencies
jest.mock('./components/HomeScreen', () => {
  return function MockHomeScreen({ onStart }) {
    return (
      <div data-testid="home-screen">
        <h1>Flower Quest</h1>
        <button onClick={onStart}>Start Game</button>
      </div>
    );
  };
});

jest.mock('./components/GameScreen', () => {
  return function MockGameScreen({ onGameEnd, onGoBack }) {
    return (
      <div data-testid="game-screen">
        <button onClick={() => onGameEnd(100)}>End Game</button>
        <button onClick={onGoBack} aria-label="Go back">Back</button>
      </div>
    );
  };
});

jest.mock('./components/EndScreen', () => {
  return function MockEndScreen({ score, onPlayAgain, onGoBack }) {
    return (
      <div data-testid="end-screen">
        <p>Score: {score}</p>
        <button onClick={onPlayAgain}>Play Again</button>
        <button onClick={onGoBack} aria-label="Go back">Back</button>
      </div>
    );
  };
});

describe('App Component', () => {
  test('renders home screen initially', () => {
    render(<App />);
    expect(screen.getByTestId('home-screen')).toBeInTheDocument();
    expect(screen.getByText(/Flower Quest/i)).toBeInTheDocument();
  });

  test('navigates to game screen when start button is clicked', () => {
    render(<App />);
    const startButton = screen.getByText(/Start Game/i);
    fireEvent.click(startButton);
    
    expect(screen.getByTestId('game-screen')).toBeInTheDocument();
    expect(screen.queryByTestId('home-screen')).not.toBeInTheDocument();
  });

  test('navigates to end screen when game ends', () => {
    render(<App />);
    
    // Start game
    fireEvent.click(screen.getByText(/Start Game/i));
    expect(screen.getByTestId('game-screen')).toBeInTheDocument();
    
    // End game
    fireEvent.click(screen.getByText(/End Game/i));
    expect(screen.getByTestId('end-screen')).toBeInTheDocument();
    expect(screen.getByText(/Score: 100/i)).toBeInTheDocument();
  });

  test('navigates back to home from end screen', () => {
    render(<App />);
    
    // Start and end game
    fireEvent.click(screen.getByText(/Start Game/i));
    fireEvent.click(screen.getByText(/End Game/i));
    
    // Play again
    fireEvent.click(screen.getByText(/Play Again/i));
    expect(screen.getByTestId('home-screen')).toBeInTheDocument();
  });

  test('back button from game screen navigates to home', () => {
    window.confirm = jest.fn(() => true);
    
    render(<App />);
    
    // Start game
    fireEvent.click(screen.getByText(/Start Game/i));
    expect(screen.getByTestId('game-screen')).toBeInTheDocument();
    
    // Click back
    const backButtons = screen.getAllByLabelText(/go back/i);
    fireEvent.click(backButtons[0]);
    
    expect(screen.getByTestId('home-screen')).toBeInTheDocument();
  });
});
