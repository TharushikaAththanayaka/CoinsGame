import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import GameBoard from './GameBoard';
import Timer from './Timer';
import Score from './Score';
import CollectionBasket from './CollectionBasket';
import './GameScreen.css';

const GameScreen = ({ onGameEnd, onGoBack }) => {
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds
  const [isGameActive, setIsGameActive] = useState(true);
  const [collectedFlowers, setCollectedFlowers] = useState({
    coral: 0,
    skyblue: 0,
    gold: 0,
    lime: 0,
    magenta: 0
  });

  // Handle timer
  useEffect(() => {
    if (!isGameActive || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameActive, timeRemaining]);

  // Handle game end
  useEffect(() => {
    if (!isGameActive && timeRemaining === 0) {
      // Small delay to show final state before ending
      const timeout = setTimeout(() => {
        onGameEnd(score);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isGameActive, timeRemaining, score, onGameEnd]);

  const handleScoreUpdate = (points, flowerType, count) => {
    setScore((prev) => prev + points);
    setCollectedFlowers((prev) => ({
      ...prev,
      [flowerType]: prev[flowerType] + count
    }));
  };

  const handleBackClick = () => {
    if (window.confirm('Are you sure you want to go back? Your progress will be lost.')) {
      onGoBack();
    }
  };

  return (
    <div className="game-screen">
      <button className="back-button" onClick={handleBackClick} aria-label="Go back">
        <FaArrowLeft className="back-icon" />
        <span className="back-text">Back</span>
      </button>
      <div className="game-header">
        <Timer timeRemaining={timeRemaining} />
      </div>
      <div className="game-content">
        <div className="game-main">
          <GameBoard
            isGameActive={isGameActive}
            onScoreUpdate={handleScoreUpdate}
          />
        </div>
        <div className="game-sidebar">
          <Score score={score} />
          <CollectionBasket collectedFlowers={collectedFlowers} />
        </div>
      </div>
      {!isGameActive && timeRemaining === 0 && (
        <div className="time-up-overlay">
          <h2>Time's Up!</h2>
        </div>
      )}
    </div>
  );
};

export default GameScreen;

