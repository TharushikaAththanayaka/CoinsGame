import React from 'react';
import { render, screen } from '@testing-library/react';
import CollectionBasket from './CollectionBasket';

describe('CollectionBasket Component', () => {
  const defaultCollectedFlowers = {
    coral: 0,
    skyblue: 0,
    gold: 0,
    lime: 0,
    magenta: 0
  };

  test('renders basket title', () => {
    render(<CollectionBasket collectedFlowers={defaultCollectedFlowers} />);
    expect(screen.getByText(/Collected Flowers/i)).toBeInTheDocument();
  });

  test('displays all flower types', () => {
    render(<CollectionBasket collectedFlowers={defaultCollectedFlowers} />);
    
    // Check that all 5 colors are rendered
    const { container } = render(<CollectionBasket collectedFlowers={defaultCollectedFlowers} />);
    const basketItems = container.querySelectorAll('.basket-item');
    expect(basketItems.length).toBe(5);
  });

  test('displays correct counts for each flower type', () => {
    const flowers = {
      coral: 5,
      skyblue: 3,
      gold: 10,
      lime: 2,
      magenta: 7
    };
    
    render(<CollectionBasket collectedFlowers={flowers} />);
    
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  test('displays zero for flower types with no collections', () => {
    render(<CollectionBasket collectedFlowers={defaultCollectedFlowers} />);
    
    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBe(5);
  });

  test('updates counts when flowers are collected', () => {
    const { rerender } = render(
      <CollectionBasket collectedFlowers={defaultCollectedFlowers} />
    );
    
    const newFlowers = {
      coral: 10,
      skyblue: 5,
      gold: 15,
      lime: 3,
      magenta: 8
    };
    
    rerender(<CollectionBasket collectedFlowers={newFlowers} />);
    
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  test('renders basket container', () => {
    const { container } = render(
      <CollectionBasket collectedFlowers={defaultCollectedFlowers} />
    );
    const basket = container.querySelector('.collection-basket');
    expect(basket).toBeInTheDocument();
  });
});
