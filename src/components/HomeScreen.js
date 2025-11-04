import React from 'react';
import { GiFlowerStar } from 'react-icons/gi';
import './HomeScreen.css';

const HomeScreen = ({ onStart }) => {
  return (
    <div className="home-screen">
      <div className="home-content">
        <h1 className="game-title">
          <GiFlowerStar className="title-icon" />
          Flower Quest
          <GiFlowerStar className="title-icon" />
        </h1>
        <div className="instructions">
          <h2>How to Play</h2>
          <ul>
            <li>Swap adjacent flowers to match 3 or more of the same color</li>
            <li>Matches can be horizontal or vertical</li>
            <li>Each match scores +5 points per flower</li>
            <li>Chain matches for bonus points!</li>
            <li>You have 2 minutes to score as many points as possible</li>
          </ul>
        </div>
        <button className="start-button" onClick={onStart}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;

