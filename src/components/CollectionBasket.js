import React from 'react';
import { GiFlowerStar } from 'react-icons/gi';
import './CollectionBasket.css';

const CollectionBasket = ({ collectedFlowers }) => {
  const colors = ['coral', 'skyblue', 'gold', 'lime', 'magenta'];

  return (
    <div className="collection-basket">
      <h3 className="basket-title">Collected Flowers</h3>
      <div className="basket-content">
        {colors.map((color) => (
          <div key={color} className="basket-item">
            <div className={`basket-flower flower-${color}`}>
              <GiFlowerStar className="basket-icon" />
            </div>
            <div className="basket-count">{collectedFlowers[color]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionBasket;

