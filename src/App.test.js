import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders home screen initially', () => {
    render(<App />);
    expect(screen.getByText(/Flower Quest/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Game/i)).toBeInTheDocument();
  });

  test('navigates to game screen when start button is clicked', () => {
    render(<App />);
    const startButton = screen.getByText(/Start Game/i);
    fireEvent.click(startButton);
    
    // Game screen should show timer
    expect(screen.getByText(/Time Remaining/i)).toBeInTheDocument();
  });

  test('game state changes correctly', () => {
    const { rerender } = render(<App />);
    
    // Initially on home
    expect(screen.getByText(/Flower Quest/i)).toBeInTheDocument();
    
    // After clicking start
    const startButton = screen.getByText(/Start Game/i);
    fireEvent.click(startButton);
    
    // Should be on game screen
    expect(screen.queryByText(/Flower Quest/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Time Remaining/i)).toBeInTheDocument();
  });

  test('back button navigates to home screen', () => {
    render(<App />);
    
    // Start game
    fireEvent.click(screen.getByText(/Start Game/i));
    
    // Find and click back button
    const backButton = screen.getByLabelText(/go back/i);
    fireEvent.click(backButton);
    
    // Should confirm first
    // Then should be back to home
    expect(screen.getByText(/Flower Quest/i)).toBeInTheDocument();
  });
});
