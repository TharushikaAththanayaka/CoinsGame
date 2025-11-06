import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomeScreen from './HomeScreen';

describe('HomeScreen Component', () => {
  const mockOnStart = jest.fn();

  beforeEach(() => {
    mockOnStart.mockClear();
  });

  test('renders game title', () => {
    render(<HomeScreen onStart={mockOnStart} />);
    expect(screen.getByText(/Flower Quest/i)).toBeInTheDocument();
  });

  test('renders instructions heading', () => {
    render(<HomeScreen onStart={mockOnStart} />);
    expect(screen.getByText(/How to Play/i)).toBeInTheDocument();
  });

  test('renders all instruction items', () => {
    render(<HomeScreen onStart={mockOnStart} />);
    expect(screen.getByText(/Swap adjacent flowers to match 3 or more of the same color/i)).toBeInTheDocument();
    expect(screen.getByText(/Matches can be horizontal or vertical/i)).toBeInTheDocument();
    expect(screen.getByText(/Each match scores \+5 points per flower/i)).toBeInTheDocument();
    expect(screen.getByText(/Chain matches for bonus points/i)).toBeInTheDocument();
    expect(screen.getByText(/You have 2 minutes to score as many points as possible/i)).toBeInTheDocument();
  });

  test('renders start button', () => {
    render(<HomeScreen onStart={mockOnStart} />);
    const startButton = screen.getByText(/Start Game/i);
    expect(startButton).toBeInTheDocument();
    expect(startButton.tagName).toBe('BUTTON');
  });

  test('calls onStart when start button is clicked', () => {
    render(<HomeScreen onStart={mockOnStart} />);
    const startButton = screen.getByText(/Start Game/i);
    fireEvent.click(startButton);
    expect(mockOnStart).toHaveBeenCalledTimes(1);
  });
});
