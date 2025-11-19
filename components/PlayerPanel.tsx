import React, { useEffect, useState } from 'react';
import { Player } from '../types';
import { NeonIcon } from './NeonIcon';

interface PlayerPanelProps {
  player: Player;
  isTurn: boolean;
  score: number;
  movesCount: number;
  alignment: 'left' | 'right';
}

export const PlayerPanel: React.FC<PlayerPanelProps> = ({ player, isTurn, score, movesCount, alignment }) => {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (isTurn) {
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isTurn]);

  const piecesLeftToPlace = Math.max(0, 3 - movesCount);
  const isRotateMode = movesCount === 3;

  const themeColor = player === 'X' ? 'text-neon-red' : 'text-neon-blue';
  const borderColor = player === 'X' ? 'border-pink-500' : 'border-cyan-500';
  const shadowClass = player === 'X' ? 'shadow-neon-red' : 'shadow-neon-blue';

  return (
    <div 
      className={`
        relative flex flex-col items-center justify-center
        w-full p-4 md:p-6 rounded-xl 
        border-2 transition-all duration-500 ease-out
        ${isTurn ? `${borderColor} bg-white/5 scale-105` : 'border-white/5 bg-transparent opacity-50 scale-95'}
        ${flash ? 'animate-panel-flash' : ''}
      `}
    >
      {/* Large Identity Icon */}
      <div className="mb-4 relative">
        <NeonIcon 
          type={player} 
          size={80} 
          className={`${isTurn ? 'filter brightness-125' : 'grayscale opacity-50'} transition-all duration-500`} 
        />
        
        {/* Turn Badge Overlay */}
        {isTurn && (
          <div className={`
            absolute -bottom-2 left-1/2 -translate-x-1/2 
            px-3 py-0.5 rounded-full bg-black border ${borderColor}
            whitespace-nowrap
          `}>
            <span className={`text-[10px] font-bold tracking-widest ${themeColor}`}>YOUR TURN</span>
          </div>
        )}
      </div>

      {/* Score Display */}
      <div className="flex flex-col items-center w-full border-t border-white/10 pt-4 mt-2">
        <div className="text-5xl font-[Rajdhani] font-bold text-white leading-none mb-1">
          {score}
        </div>
        <div className="text-[10px] text-slate-400 tracking-[0.3em] uppercase">
          Wins
        </div>
      </div>

      {/* Pieces Indicator */}
      <div className="mt-6 w-full flex flex-col items-center">
        {isRotateMode ? (
           <div className="text-yellow-400 text-xs font-mono font-bold animate-pulse tracking-widest text-center">
             ⚠ MAX CAPACITY<br/>OLDEST WILL VANISH
           </div>
        ) : (
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${i < (3 - piecesLeftToPlace) 
                    ? 'bg-white/20' // Used pieces
                    : (player === 'X' ? 'bg-pink-500 shadow-[0_0_8px_#ff0055]' : 'bg-cyan-500 shadow-[0_0_8px_#00eaff]') // Available pieces
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};