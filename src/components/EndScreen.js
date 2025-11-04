import React from 'react';
import { GiFlowerStar } from 'react-icons/gi';
import { FaArrowLeft } from 'react-icons/fa';
import './EndScreen.css';

const EndScreen = ({ score, onPlayAgain, onGoBack }) => {
  return (
    <div className="end-screen">
      <button className="back-button end-back-button" onClick={onGoBack} aria-label="Go back">
        <FaArrowLeft className="back-icon" />
        <span className="back-text">Back</span>
      </button>
      <div className="end-content">
        <GiFlowerStar className="end-icon" />
        <h1 className="end-title">Time's Up!</h1>
        <div className="final-score-container">
          <p className="final-score-label">Your Total Score</p>
          <p className="final-score-value">{score.toLocaleString()}</p>
        </div>
        <button className="play-again-button" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default EndScreen;

