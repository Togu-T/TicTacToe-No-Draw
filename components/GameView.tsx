import React, { useState, useCallback } from 'react';
import { Player, Scores, WinState } from '../types';
import { NeonGrid } from './NeonGrid';
import { PlayerPanel } from './PlayerPanel';
import { WinModal } from './WinModal';

interface GameViewProps {
  scores: Scores;
  onWin: (winner: Player) => void;
  onBack: () => void;
}

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diags
];

export const GameView: React.FC<GameViewProps> = ({ scores, onWin, onBack }) => {
  // Track who started the current game
  const [startingPlayer, setStartingPlayer] = useState<Player>('O');
  
  const [currentPlayer, setCurrentPlayer] = useState<Player>('O');
  const [xMoves, setXMoves] = useState<number[]>([]);
  const [oMoves, setOMoves] = useState<number[]>([]);
  const [winState, setWinState] = useState<WinState>({ winner: null, line: null });

  const getBoardPiece = useCallback((index: number): Player | null => {
    if (xMoves.includes(index)) return 'X';
    if (oMoves.includes(index)) return 'O';
    return null;
  }, [xMoves, oMoves]);

  const checkWin = (currentXMoves: number[], currentOMoves: number[]) => {
    for (const pattern of WIN_PATTERNS) {
      if (pattern.every(idx => currentXMoves.includes(idx))) {
        return { winner: 'X', line: pattern } as WinState;
      }
    }
    for (const pattern of WIN_PATTERNS) {
      if (pattern.every(idx => currentOMoves.includes(idx))) {
        return { winner: 'O', line: pattern } as WinState;
      }
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (winState.winner || getBoardPiece(index)) return;

    const isX = currentPlayer === 'X';
    const currentMoves = isX ? [...xMoves] : [...oMoves];
    
    currentMoves.push(index);
    
    if (currentMoves.length > 3) {
      currentMoves.shift();
    }

    let nextWinState: WinState | null = null;
    if (isX) {
      setXMoves(currentMoves);
      nextWinState = checkWin(currentMoves, oMoves);
    } else {
      setOMoves(currentMoves);
      nextWinState = checkWin(xMoves, currentMoves);
    }

    if (nextWinState) {
      setWinState(nextWinState);
      onWin(nextWinState.winner!);
    } else {
      setCurrentPlayer(isX ? 'O' : 'X');
    }
  };

  const handleReset = () => {
    setXMoves([]);
    setOMoves([]);
    setWinState({ winner: null, line: null });
    
    // Alternate starting player
    const nextStarter = startingPlayer === 'O' ? 'X' : 'O';
    setStartingPlayer(nextStarter);
    setCurrentPlayer(nextStarter);
  };

  const dyingPieceIndex = (() => {
    if (winState.winner) return null;
    if (currentPlayer === 'X' && xMoves.length === 3) return xMoves[0];
    if (currentPlayer === 'O' && oMoves.length === 3) return oMoves[0];
    return null;
  })();

  return (
    <div className="relative z-10 flex flex-col items-center w-full h-screen">
      
      {/* Top Bar with Navigation */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20">
        <button 
          onClick={onBack}
          className="text-slate-500 hover:text-white font-mono text-xs md:text-sm tracking-widest uppercase transition-colors flex items-center gap-2"
        >
          <span className="text-lg">&lsaquo;</span> MENU
        </button>
        
        <button 
          onClick={handleReset}
          className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all"
        >
          <span className="text-xs font-mono tracking-wider text-slate-300 group-hover:text-white">RESTART</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:rotate-180 transition-transform duration-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>

      {/* Main Content Area - Centered */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl px-4 gap-8 md:gap-16">
        
        {/* Mobile Header: Player O */}
        <div className="md:hidden w-full max-w-[300px]">
           <PlayerPanel 
             player="O" 
             isTurn={currentPlayer === 'O'} 
             score={scores.O} 
             movesCount={oMoves.length} 
             alignment="left"
           />
        </div>

        {/* Left Panel (Desktop): Player O */}
        <div className="hidden md:block w-56">
          <PlayerPanel 
             player="O" 
             isTurn={currentPlayer === 'O'} 
             score={scores.O} 
             movesCount={oMoves.length} 
             alignment="left"
           />
        </div>

        {/* Game Board Area */}
        <div className="relative flex items-center justify-center p-6">
          {/* Background glow for grid */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
          
          <NeonGrid 
            xMoves={xMoves}
            oMoves={oMoves}
            dyingPieceIndex={dyingPieceIndex}
            onCellClick={handleCellClick}
            winLine={winState.line}
            currentPlayer={currentPlayer}
          />
        </div>

        {/* Mobile Footer: Player X */}
        <div className="md:hidden w-full max-w-[300px]">
           <PlayerPanel 
             player="X" 
             isTurn={currentPlayer === 'X'} 
             score={scores.X} 
             movesCount={xMoves.length} 
             alignment="right"
           />
        </div>

        {/* Right Panel (Desktop): Player X */}
        <div className="hidden md:block w-56">
          <PlayerPanel 
             player="X" 
             isTurn={currentPlayer === 'X'} 
             score={scores.X} 
             movesCount={xMoves.length} 
             alignment="right"
           />
        </div>
      </div>

      {/* Win Modal Overlay */}
      {winState.winner && (
        <WinModal 
          winner={winState.winner} 
          onPlayAgain={handleReset} 
        />
      )}

    </div>
  );
};