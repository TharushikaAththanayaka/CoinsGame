import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import './Score.css';

const Score = ({ score }) => {
  return (
    <div className="score-container">
      <div className="score-header">
        <FaTrophy className="score-icon" />
        <h3 className="score-label">Score</h3>
      </div>
      <div className="score-value">{score.toLocaleString()}</div>
    </div>
  );
};

export default Score;

