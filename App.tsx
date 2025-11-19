import React, { useState } from 'react';
import { HomeView } from './components/HomeView';
import { GameView } from './components/GameView';
import { GameState, Scores } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<GameState>('MENU');
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0 });

  const handleStartGame = () => {
    setView('PLAYING');
  };

  const handleBackToMenu = () => {
    setView('MENU');
    setScores({ X: 0, O: 0 });
  };

  const handleUpdateScore = (winner: 'X' | 'O') => {
    setScores(prev => ({
      ...prev,
      [winner]: prev[winner] + 1
    }));
  };

  return (
    <div className="relative w-full h-full scanlines flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-900/10 rounded-full blur-[80px] pointer-events-none" />

      {view === 'MENU' ? (
        <HomeView onStart={handleStartGame} />
      ) : (
        <GameView 
          scores={scores} 
          onWin={handleUpdateScore} 
          onBack={handleBackToMenu}
        />
      )}
    </div>
  );
};

export default App;