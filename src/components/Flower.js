import React from 'react';
import { GiFlowerStar } from 'react-icons/gi';
import './Flower.css';

const Flower = ({ color, row, col, isSelected, isMatching, onClick }) => {
  if (!color) return <div className="flower-cell empty" data-testid={`flower-${row}-${col}`} />;

  return (
    <div
      className={`flower-cell flower-${color} ${isSelected ? 'selected' : ''} ${isMatching ? 'matching' : ''}`}
      onClick={onClick}
      data-testid={`flower-${row}-${col}`}
    >
      <div className="flower-3d">
        <GiFlowerStar className="flower-icon" />
      </div>
      <div className="flower-glow"></div>
    </div>
  );
};

export default Flower;

