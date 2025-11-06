import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Flower from './Flower';

describe('Flower Component', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders flower with color', () => {
    render(
      <Flower 
        color="coral" 
        row={0} 
        col={0} 
        isSelected={false}
        isMatching={false}
        onClick={mockOnClick}
      />
    );
    
    const flower = screen.getByTestId('flower-0-0');
    expect(flower).toBeInTheDocument();
    expect(flower).toHaveClass('flower-coral');
  });

  test('renders empty cell when color is null', () => {
    render(
      <Flower 
        color={null}
        row={0}
        col={0}
        isSelected={false}
        isMatching={false}
        onClick={mockOnClick}
      />
    );
    
    const emptyCell = screen.getByTestId('flower-0-0');
    expect(emptyCell).toBeInTheDocument();
    expect(emptyCell).toHaveClass('empty');
  });

  test('applies selected class when isSelected is true', () => {
    render(
      <Flower 
        color="gold"
        row={1}
        col={1}
        isSelected={true}
        isMatching={false}
        onClick={mockOnClick}
      />
    );
    
    const flower = screen.getByTestId('flower-1-1');
    expect(flower).toHaveClass('selected');
  });

  test('applies matching class when isMatching is true', () => {
    render(
      <Flower 
        color="magenta"
        row={2}
        col={2}
        isSelected={false}
        isMatching={true}
        onClick={mockOnClick}
      />
    );
    
    const flower = screen.getByTestId('flower-2-2');
    expect(flower).toHaveClass('matching');
  });

  test('calls onClick when clicked', () => {
    render(
      <Flower 
        color="skyblue"
        row={0}
        col={1}
        isSelected={false}
        isMatching={false}
        onClick={mockOnClick}
      />
    );
    
    const flower = screen.getByTestId('flower-0-1');
    fireEvent.click(flower);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('renders different flower colors correctly', () => {
    const colors = ['coral', 'skyblue', 'gold', 'lime', 'magenta'];
    
    colors.forEach((color, index) => {
      const { unmount } = render(
        <Flower 
          color={color}
          row={0}
          col={index}
          isSelected={false}
          isMatching={false}
          onClick={mockOnClick}
        />
      );
      
      const flower = screen.getByTestId(`flower-0-${index}`);
      expect(flower).toHaveClass(`flower-${color}`);
      unmount();
    });
  });

  test('can be both selected and matching', () => {
    render(
      <Flower 
        color="lime"
        row={3}
        col={3}
        isSelected={true}
        isMatching={true}
        onClick={mockOnClick}
      />
    );
    
    const flower = screen.getByTestId('flower-3-3');
    expect(flower).toHaveClass('selected');
    expect(flower).toHaveClass('matching');
  });
});
