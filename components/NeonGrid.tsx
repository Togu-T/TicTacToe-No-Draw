import React, { useState } from 'react';
import { NeonIcon } from './NeonIcon';
import { Player } from '../types';

interface NeonGridProps {
  xMoves: number[];
  oMoves: number[];
  dyingPieceIndex: number | null;
  onCellClick: (index: number) => void;
  winLine: number[] | null;
  currentPlayer: Player;
}

export const NeonGrid: React.FC<NeonGridProps> = ({ 
  xMoves, 
  oMoves, 
  dyingPieceIndex, 
  onCellClick, 
  winLine,
  currentPlayer
}) => {
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getCellContent = (index: number) => {
    const isX = xMoves.includes(index);
    const isO = oMoves.includes(index);
    
    // Existing piece
    if (isX || isO) {
      const type = isX ? 'X' : 'O';
      const isDying = index === dyingPieceIndex;
      return <NeonIcon type={type} flicker={isDying} size={isDying ? 50 : 60} />;
    }

    // Ghost piece on hover
    if (hoveredIndex === index && !winLine) {
      return (
        <div className="opacity-20 scale-90 transition-all duration-200 grayscale-[0.3]">
          <NeonIcon type={currentPlayer} size={60} />
        </div>
      );
    }

    return null;
  };

  const getLineCoords = (indices: number[]) => {
    const cellSize = 100;
    const half = cellSize / 2;
    
    const getCoord = (idx: number) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      return { x: col * cellSize + half, y: row * cellSize + half };
    };

    const start = getCoord(indices[0]);
    const end = getCoord(indices[2]);

    return { x1: start.x, y1: start.y, x2: end.x, y2: end.y };
  };

  return (
    <div className="relative w-[300px] h-[300px] md:w-[360px] md:h-[360px] bg-black/20 rounded-xl backdrop-blur-sm border border-white/5 shadow-2xl">
      
      {/* Layer 1: The SVG Lines (Visuals) */}
      {/* Using CSS drop-shadow is more reliable than SVG filters for this specific effect in React */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 0 4px #fff) drop-shadow(0 0 8px #fff)' }}
      >
        {/* Vertical Lines */}
        <line x1="100" y1="15" x2="100" y2="285" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <line x1="200" y1="15" x2="200" y2="285" stroke="white" strokeWidth="4" strokeLinecap="round" />
        
        {/* Horizontal Lines */}
        <line x1="15" y1="100" x2="285" y2="100" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <line x1="15" y1="200" x2="285" y2="200" stroke="white" strokeWidth="4" strokeLinecap="round" />

        {/* Winning Line */}
        {winLine && (
          <line 
            {...getLineCoords(winLine)} 
            stroke="white" 
            strokeWidth="10" 
            strokeLinecap="round"
            className="animate-in fade-in duration-300"
            style={{ filter: 'drop-shadow(0 0 10px #fff) drop-shadow(0 0 20px #fff)' }}
          />
        )}
      </svg>

      {/* Layer 2: Interactive Cells */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 z-10">
        {[...Array(9)].map((_, i) => (
          <div 
            key={i}
            onClick={() => onCellClick(i)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors duration-200 active:bg-white/10"
          >
            {getCellContent(i)}
          </div>
        ))}
      </div>
    </div>
  );
};