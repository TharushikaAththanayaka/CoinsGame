import React, { useState } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';

function App() {
  const [gameState, setGameState] = useState('home'); // 'home', 'playing', 'ended'
  const [finalScore, setFinalScore] = useState(0);

  const handleStartGame = () => {
    setGameState('playing');
  };

  const handleGameEnd = (score) => {
    setFinalScore(score);
    setGameState('ended');
  };

  const handlePlayAgain = () => {
    setGameState('home');
    setFinalScore(0);
  };

  const handleGoBack = () => {
    setGameState('home');
    setFinalScore(0);
  };

  return (
    <div className="App">
      {gameState === 'home' && <HomeScreen onStart={handleStartGame} />}
      {gameState === 'playing' && <GameScreen onGameEnd={handleGameEnd} onGoBack={handleGoBack} />}
      {gameState === 'ended' && <EndScreen score={finalScore} onPlayAgain={handlePlayAgain} onGoBack={handleGoBack} />}
    </div>
  );
}

export default App;
