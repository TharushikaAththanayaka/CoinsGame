import React from 'react';
import './Timer.css';

const Timer = ({ timeRemaining }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const progress = (timeRemaining / 120) * 100; 

  return (
    <div className="timer-container">
      <div className="timer-label">Time Remaining</div>
      <div className="timer-display">{formattedTime}</div>
      <div className="timer-bar">
        <div 
          className="timer-progress" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;

